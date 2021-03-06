import abi from '../contract/abi.json';
import { Percent, ChainId, JSBI, Token } from '@pancakeswap/sdk';
import { mainnetTokens, testnetTokens } from 'utils/constants/tokens';

// a list of tokens by chain
type ChainTokenList = {
    readonly [chainId in ChainId]: Token[]
  }
  
export const contractAbi = abi;

export const CHAIN_ID = "97";

export const tokens = [
    { name: "BNB" },
    { name: "BSD" },
    { name: "CAKE" },
    { name: "DAI" },
    { name: "ETH" },
    { name: "SAFEMOON" },
    { name: "USDT" },
    { name: "WBNB" },
]

// BAKE Token: 0xb289b361a633A9D2b0B39BAE76BB458d83f58CEC
// BUSD Token: 0xE0dFffc2E01A7f051069649aD4eb3F518430B6a4
// ETH Token: 0xE282a15DBad45e3131620C1b8AF85B7330Cb3b4B
// USDT Token: 0x7afd064DaE94d73ee37d19ff2D264f5A2903bBB0
// XRP Token: 0x3833B175Af1900b457cf83B839727AF6C9cF0bEe
// DAI Token: 0x3Cf204795c4995cCf9C1a0B3191F00c01B03C56C
// CAKE Token: 0xB8F5B50ed77596b5E638359d828000747bb3dd89


// WBNB: 0x0dE8FCAE8421fc79B29adE9ffF97854a424Cad09
// PancakeFactory: 0x5Fe5cC0122403f06abE2A75DBba1860Edb762985
// INIT_CODE_HASH: 0xbb600ba95884f2c2837114fd2f157d00137e0b65b0fe5226523d720e4a4ce539
// PancakeRouter01: 0x3E2b14680108E8C5C45C3ab5Bc04E01397af14cB
// PancakeRouter: 0xCc7aDc94F3D80127849D2b41b6439b7CF1eB4Ae0
// Frontend: https://pcs.nhancv.com

export const contracts = {
    pancakeRouter : "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
    pancakeFactory : ""
}

// main net
//   master : 0x73feaa1eE314F8c655E354234017bE2193C9E24E
//   factory v2 : 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73
//   router v2 : 0x10ED43C718714eb63d5aA57B78B54704E256024E


export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')


export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
    [ChainId.MAINNET]: {},
}
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
    [ChainId.MAINNET]: [
        mainnetTokens.wbnb,
        mainnetTokens.cake,
        mainnetTokens.busd,
        mainnetTokens.usdt,
        mainnetTokens.btcb,
        mainnetTokens.ust,
        mainnetTokens.eth,
        mainnetTokens.usdc,
    ],
    [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
    [ChainId.MAINNET]: {},
}
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
  