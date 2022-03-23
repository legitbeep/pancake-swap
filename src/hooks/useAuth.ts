import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { useToast } from '@chakra-ui/react'
import { connectorsByName, ConnectorName } from 'utils/connector';
import { setupNetwork } from 'utils/wallets'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const toast = useToast()

  const login = useCallback((connectorID: ConnectorName) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        } else {
          window.localStorage.removeItem("connectorKey")
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            toast({
              title: "Provider Error",
              description : "No provider was found",
              status: "error",
              isClosable: true,
              duration: 6000
            })
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector
              walletConnector.walletConnectProvider = null
            }
            toast({
              title: "Auth Err",
              description : "Please authorize yourself to access account.",
              status: "error",
              isClosable: true,
              duration: 6000
            })
          } else {
            toast({
              title: error.name,
              description : error.message,
              status: "error",
              isClosable: true,
              duration: 6000
            })
          }
        }
      })
    } else {
      toast({
        title: "Can't find connector",
        description : "The connector config is wrong",
        status: "error",
        isClosable: true,
        duration: 6000
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
