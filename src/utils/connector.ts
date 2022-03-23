import { InjectedConnector } from "@web3-react/injected-connector";
import { BscConnector } from '@binance-chain/bsc-connector'
import Web3 from 'web3';

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || "61", 10)

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })
export const injected = new InjectedConnector({ supportedChainIds: [1,3,4,5,42] });

export const connectorsByName = {
    "injected": injected,
    "bsc": bscConnector,
  }
  
export const getLibrary = (provider:any): Web3 => {
    return provider
}

export type ConnectorName = "injected" | "bsc"