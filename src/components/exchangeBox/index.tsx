import { ChangeEventHandler, useState } from 'react';
import { Button, Box, Heading, Text, Flex, Divider, Select, useDisclosure } from '@chakra-ui/react';
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { IoSettingsSharp } from 'react-icons/io5';
import { MdHistory } from "react-icons/md"; 
import { FiArrowDown } from 'react-icons/fi';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';

import CustomInput from 'components/input';
import CustomModal from 'components/modal';
import { mainnetTokens, testnetTokens } from 'utils/constants/tokens';
import { useTrade, useDerivedSwapInfo } from 'hooks/index';

const tokens = testnetTokens;

const Exchange = () => {
    const { active, account, library, ...web3React } = useWeb3React(); 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inVal, setInVal] = useState("");
    const [outVal, setOutVal] = useState("");
    
    const [inCoin, setInCoin] = useState<keyof typeof tokens>("wbnb");
    const [outCoin, setOutCoin] = useState<keyof typeof tokens>("cake");

    const [estimated, setEstimated] = useState([false,false]);
    
    
const addresses = {
    WBNB: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    recipient: 'recipient of the profit here'
}

const factory = new Contract(
    addresses.factory,
    ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
    library ? library.getSinger() : undefined
  );
const router = new Contract(
    addresses.router,
    [
      'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
      'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
    ],
    library ? library.getSinger() : undefined
  );
  
  const wbnb = new Contract(
    addresses.WBNB,
    [
      'function approve(address spender, uint amount) public returns(bool)',
    ],
    library ? library.getSinger() : undefined
  );

    const estimate = (isOutCoin: number) => {
        return (data: string) => {
            if (!isOutCoin) {
                // estimate out
                useDerivedSwapInfo(data,testnetTokens[inCoin].address,testnetTokens[outCoin].address,router,addresses);
                setEstimated([false,true]);
            } else {
                // estimate in
                useDerivedSwapInfo(data,testnetTokens[outCoin].address,testnetTokens[inCoin].address,router,addresses);
                setEstimated([true,false]);
            }
        }
    }

    const handleInputChange = (isOutCoin:number) => {
        return (e:any) => {
            let data = e;
            if (data.match(/^[0-9]*[.,]?[0-9]*$/))
            {
                isOutCoin 
                ? setOutVal(data)
                : setInVal(data)
                estimate(isOutCoin)(data);
            } else {
                setEstimated([false,false])
            }
        }
    }

    const handleCoin = (isOutCoin:number) => {
        return (e:any) => {
            isOutCoin ? setOutCoin(e.target.value) : setInCoin(e.target.value);
            estimate(isOutCoin)(e.target.value);
        }
    }

    const handleSwitch = () => {
        const tempVal = outVal;
        const tempCoin = outCoin;

        setOutVal(inVal);
        setOutCoin(inCoin);
        
        setInVal(tempVal);
        setInCoin(tempCoin);

        setEstimated([false,false])
    }

    return (
        <>
        <CustomModal isOpen={isOpen} onClose={onClose} title="Confirm Transaction" desc="OK" />
        <Box maxW={400} bgColor="gray.700" mx="auto" my="30px" borderRadius="26px" padding="26px" >
                <Flex justifyContent="space-between" mb="14px">
                    <Box>
                        <Heading color="white" as="h2" fontWeight="bold" fontSize="18px">Exchange</Heading>
                        <Text as="p" color="brand.secondary">Trade tokens in instant</Text>
                    </Box>
                    <Box>
                        <Button variant="icon" color="brand.primary" fontSize='30px'><IoSettingsSharp /></Button>
                        <Button variant="icon" color="brand.primary" fontSize='30px'><MdHistory /></Button>
                    </Box>
                </Flex>
                <Divider orientation='horizontal' my="20px" />
                <Box bgColor="brand.srShadow" borderRadius="26px" p="18px" mb="20px">
                    <Text as="h2" ml="14px" color="white">From {estimated[0] && ' (estimated)'}</Text>
                    <Flex justifyContent="space-between" mt="10px" >
                        <CustomInput val={inVal} onChange={handleInputChange(0)}/>
                        <Select bgColor="brand.secondary" value={inCoin} onChange={handleCoin(0)} variant="filled" maxW="100px" color="white" >
                            {
                                Object.keys(tokens).map(coin =>{
                                    return outCoin !== coin && 
                                    <option value={coin} key={coin}>{coin.toUpperCase()}</option>
                                    })
                            }
                        </Select>
                    </Flex>
                </Box>
                <Flex mb="20px" justifyContent="center">
                    <Button variant="secondary" onClick={handleSwitch}><FiArrowDown /></Button>
                </Flex>
                <Box bgColor="brand.srShadow" borderRadius="26px" p="18px" mb="20px">
                    <Text as="h2" ml="14px" color="white">To  {estimated[1] && ' (estimated)'}</Text>
                    <Flex justifyContent="space-between" mt="10px" >
                        <CustomInput val={outVal} onChange={handleInputChange(1)}/>
                        <Select bgColor="brand.secondary" value={outCoin} onChange={handleCoin(1)} variant="filled" maxW="100px" color="white" >
                        {
                                Object.keys(tokens).map(coin =>{
                                    return inCoin !== coin && 
                                    <option value={coin} key={coin}>{coin.toUpperCase()}</option>
                                    })
                            }
                        </Select>
                    </Flex>
                </Box>
                <Button disabled={!active} width="100%" mt="10px" variant="primary" onClick={onOpen}>
                    {active ? "Swap" : "Unlock Wallet"}
                </Button>
            </Box>
        </>
    )
}

export default Exchange;