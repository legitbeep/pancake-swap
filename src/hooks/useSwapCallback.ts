import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { SwapParameters, Trade } from '@pancakeswap/sdk'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'

export function useSwapCallback(
    trade: Trade | undefined, // trade to execute, required
    //allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
    recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  ) //: { state: SwapCallbackState; callback: null | (() => Promise<string>); error: string | null } 
  {
    const { account, chainId, library } = useWeb3React()
    const gasPrice = 210000000
  
    const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName)
  
    const addTransaction = useTransactionAdder()
  
    const { address: recipientAddress } = useENS(recipientAddressOrName)
    const recipient = recipientAddressOrName === null ? account : recipientAddress
  
    return useMemo(() => {
      if (!trade || !library || !account || !chainId) {
        return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
      }
      if (!recipient) {
        if (recipientAddressOrName !== null) {
          return { state: SwapCallbackState.INVALID, callback: null, error: 'Invalid recipient' }
        }
        return { state: SwapCallbackState.LOADING, callback: null, error: null }
      }
  
      return {
        state: SwapCallbackState.VALID,
        callback: async function onSwap(): Promise<string> {
          const estimatedCalls: SwapCallEstimate[] = await Promise.all(
            swapCalls.map((call) => {
              const {
                parameters: { methodName, args, value },
                contract,
              } = call
              const options = !value || isZero(value) ? {} : { value }
  
              return contract.estimateGas[methodName](...args, options)
                .then((gasEstimate) => {
                  return {
                    call,
                    gasEstimate,
                  }
                })
                .catch((gasError) => {
                  console.error('Gas estimate failed, trying eth_call to extract error', call)
  
                  return contract.callStatic[methodName](...args, options)
                    .then((result) => {
                      console.error('Unexpected successful call after failed estimate gas', call, gasError, result)
                      return { call, error: t('Unexpected issue with estimating the gas. Please try again.') }
                    })
                    .catch((callError) => {
                      console.error('Call threw error', call, callError)
  
                      return { call, error: swapErrorToUserReadableMessage(callError, t) }
                    })
                })
            }),
          )
  
          // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
          const successfulEstimation = estimatedCalls.find(
            (el, ix, list): el is SuccessfulCall =>
              'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
          )
  
          if (!successfulEstimation) {
            const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
            if (errorCalls.length > 0) throw new Error(errorCalls[errorCalls.length - 1].error)
            throw new Error(t('Unexpected error. Could not estimate gas for the swap.'))
          }
  
          const {
            call: {
              contract,
              parameters: { methodName, args, value },
            },
            gasEstimate,
          } = successfulEstimation
  
          return contract[methodName](...args, {
            gasLimit: calculateGasMargin(gasEstimate),
            gasPrice,
            ...(value && !isZero(value) ? { value, from: account } : { from: account }),
          })
            .then((response: any) => {
              const inputSymbol = trade.inputAmount.currency.symbol
              const outputSymbol = trade.outputAmount.currency.symbol
              const inputAmount = trade.inputAmount.toSignificant(3)
              const outputAmount = trade.outputAmount.toSignificant(3)
  
              const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`
              const withRecipient =
                recipient === account
                  ? base
                  : `${base} to ${
                      recipientAddressOrName && isAddress(recipientAddressOrName)
                        ? truncateHash(recipientAddressOrName)
                        : recipientAddressOrName
                    }`
  
              addTransaction(response, {
                summary: withRecipient,
              })
  
              return response.hash
            })
            .catch((error: any) => {
              // if the user rejected the tx, pass this along
              if (error?.code === 4001) {
                throw new Error('Transaction rejected.')
              } else {
                // otherwise, the error was unexpected and we need to convey that
                console.error(`Swap failed`, error, methodName, args, value)
                throw new Error(t('Swap failed: %message%', { message: swapErrorToUserReadableMessage(error, t) }))
              }
            })
        },
        error: null,
      }
    }, [trade, library, account, chainId, recipient, recipientAddressOrName, swapCalls, gasPrice, t, addTransaction])
  }
  