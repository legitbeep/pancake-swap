import { useState, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from "@ethersproject/units";
import { parseUnits } from '@ethersproject/units'
import { Currency, CurrencyAmount, JSBI, Token, TokenAmount, Trade, ETHER, WETH, ChainId, Pair } from '@pancakeswap/sdk'
import { useAllCommonPairs, useTradeExactIn, useTradeExactOut } from './exact';

export enum Field {
    INPUT = 'INPUT',
    OUTPUT = 'OUTPUT',
}

export const useBalance = () => {
    const [balance, setBalance] = useState("");
    const { library, account } = useWeb3React();

    useEffect(() => {
        if ( account ) 
            library.getBalance(account).then(
                (bal:any) => setBalance(bal)
            )
    },[library, account])

    return balance ? `${formatEther(balance)} ETH` : null;
}

export const useBlockNumber = () => {
    const { library } = useWeb3React();
    const [blockNum, setBlockNum] = useState();

    useEffect(() => {
        const updateBlockNum =  (val:any) => setBlockNum(val);
        if(library)
            library.on("block", updateBlockNum)
        return () => { library.removeEventListener("block", updateBlockNum) }
    },[library])

    return blockNum;
} 

export const useSigner = (message?:string) => {
    const { library, account, connector} = useWeb3React();
    const [signer, setSigner] = useState();

    useEffect(() => {
        library
            .getSigner(account)
            .signMessage(message || "Signed by the user!")
            .then((sign:any) => setSigner(sign))
    },[library, account])

    return { message, account, signer };
}

const tryParseAmount = (value?: string, currency?: Currency): CurrencyAmount | TokenAmount | undefined => {
    if (!value || !currency) {
      return undefined
    }
    try {
      const typedValueParsed = parseUnits(value, currency.decimals).toString()
  
      if (typedValueParsed !== '0') {
        return currency instanceof Token
          ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
          : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
      }
    } catch (error) {
      // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
      console.debug(`Failed to parse input amount: "${value}"`, error)
    }
    // necessary for all paths to return a value
    return undefined
  }

export function useDerivedSwapInfo(
    independentField: Field,
    typedValue: string,
    inputCurrency: Currency,
    outputCurrency: Currency,
  ) {
      
    const isExactIn: boolean = independentField === Field.INPUT
    const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)
    
    const bestTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined)
    const bestTradeExactOut = useTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined)
    
    const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut

    console.log({
      v2Trade: v2Trade?.executionPrice?.toSignificant(6) ?? undefined
    })
  
    // const { account } = useWeb3React()
    //const recipientLookup = useENS(recipient ?? undefined)
    // const to: string | null = (recipient === null ? account : recipientLookup.address) ?? null
  
    // const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    //   inputCurrency ?? undefined,
    //   outputCurrency ?? undefined,
    // ])
  
  
    // const currencyBalances = {
    //   [Field.INPUT]: relevantTokenBalances[0],
    //   [Field.OUTPUT]: relevantTokenBalances[1],
    // }
  
    // const currencies: { [field in Field]?: Currency } = {
    //   [Field.INPUT]: inputCurrency ?? undefined,
    //   [Field.OUTPUT]: outputCurrency ?? undefined,
    // }
  
    // let inputError: string | undefined
    // if (!account) {
    //   inputError = t('Connect Wallet')
    // }
  
    // if (!parsedAmount) {
    //   inputError = inputError ?? t('Enter an amount')
    // }
  
    // if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    //   inputError = inputError ?? t('Select a token')
    // }
  
    // const formattedTo = isAddress(to)
    // if (!to || !formattedTo) {
    //   inputError = inputError ?? t('Enter a recipient')
    // } else if (
    //   BAD_RECIPIENT_ADDRESSES.indexOf(formattedTo) !== -1 ||
    //   (bestTradeExactIn && involvesAddress(bestTradeExactIn, formattedTo)) ||
    //   (bestTradeExactOut && involvesAddress(bestTradeExactOut, formattedTo))
    // ) {
    //   inputError = inputError ?? t('Invalid recipient')
    // }
  
    // const [allowedSlippage] = useUserSlippageTolerance()
  
    // const slippageAdjustedAmounts = v2Trade && allowedSlippage && computeSlippageAdjustedAmounts(v2Trade, allowedSlippage)
  
    // compare input balance to max input based on version
    // const [balanceIn, amountIn] = [
    //   currencyBalances[Field.INPUT],
    //   slippageAdjustedAmounts ? slippageAdjustedAmounts[Field.INPUT] : null,
    // ]
  
    // if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    //   inputError = 'Insufficient balance'
    // }
  
    return {
      v2Trade: v2Trade ?? undefined,
    }
  }

  
export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === ETHER ? WETH[chainId] : currency instanceof Token ? currency : undefined
}

export function useCurrency (value: string) {

} 

export const useTrade = (inputCurrency: Currency, outputCurrency: Currency, typedValue: string, isInput: boolean) => {
  const currencyAmount = tryParseAmount(typedValue, (isInput ? inputCurrency : outputCurrency) ?? undefined) as CurrencyAmount | TokenAmount;

  const allowedPairs = new Pair(new TokenAmount(inputCurrency), new TokenAmount(outputCurrency))seAllCommonPairs(inputCurrency, outputCurrency);

  return useMemo(() => {
    return isInput 
        ? Trade.bestTradeExactIn(allowedPairs, currencyAmount, outputCurrency, { maxHops: 1, maxNumResults: 1 })[0]
        : Trade.bestTradeExactOut(allowedPairs, inputCurrency, currencyAmount, { maxHops: 1, maxNumResults: 1 })[0]
  },[isInput, currencyAmount, outputCurrency, inputCurrency, allowedPairs])
}