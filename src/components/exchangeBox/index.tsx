import { ChangeEventHandler, useState } from 'react';
import { Button, Box, Heading, Text, Flex, Divider, Select, useDisclosure } from '@chakra-ui/react';
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { IoSettingsSharp } from 'react-icons/io5';
import { MdHistory } from "react-icons/md"; 
import { FiArrowDown } from 'react-icons/fi';
import { useWeb3React } from '@web3-react/core';

import CustomInput from 'components/input';
import CustomModal from 'components/modal';
import { mainnetTokens, testnetTokens } from 'utils/constants/tokens';
import { useTrade } from 'hooks/index';

const tokens = testnetTokens;

const Exchange = () => {
    const { active, account, ...web3React } = useWeb3React(); 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inVal, setInVal] = useState("");
    const [outVal, setOutVal] = useState("");
    
    const [inCoin, setInCoin] = useState<keyof typeof tokens>("wbnb");
    const [outCoin, setOutCoin] = useState<keyof typeof tokens>("cake");

    const [estimated, setEstimated] = useState([false,false]);
    
    const estimate = (isOutCoin: number) => {
        return (data: string) => {
            if (!isOutCoin) {
                // estimate out
                console.log(
                useTrade(tokens[inCoin], tokens[outCoin], data,true)
                )
                setEstimated([false,true]);
            } else {
                // estimate in
                console.log(
                useTrade(tokens[inCoin], tokens[outCoin], data,false)
                )
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