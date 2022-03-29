import { InjectedConnector } from "@web3-react/injected-connector";
import { BscConnector } from '@binance-chain/bsc-connector'
import Web3 from 'web3';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const POLLING_INTERVAL = 12000
// const rpcUrl = getNodeUrl()

export const bscConnector = new BscConnector({ supportedChainIds: [56,97] })
export const injected = new InjectedConnector({ supportedChainIds: [56,97] });

export type ConnectorName = "injected" | "bsc"
export const connectorsByName = {
    "injected": injected,
    "bsc": bscConnector,
  }
  
export const getLibrary = (provider: any) => {
  const library = new Web3(provider)
  // library.pollingInterval = POLLING_INTERVAL
  return library
}
