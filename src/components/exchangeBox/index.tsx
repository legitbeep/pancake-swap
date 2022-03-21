import { ChangeEventHandler, useState } from 'react';
import { Button, Box, Heading, Text, Flex, Divider, Select, useDisclosure } from '@chakra-ui/react';
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { IoSettingsSharp } from 'react-icons/io5';
import { MdHistory } from "react-icons/md"; 
import { FiArrowDown } from 'react-icons/fi';

import CustomInput from 'components/input';
import CustomModal from 'components/modal';
import { coins } from 'utils/constants';

const Exchange = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inVal, setInVal] = useState("");
    const [outVal, setOutVal] = useState("");
    
    const [inCoin, setInCoin] = useState("BNB");
    const [outCoin, setOutCoin] = useState("CAKE");

    const handleInputChange = (val:number) => {
        return (e:any) => {
            let data = e;
            if (data.match(/^[0-9]*[.,]?[0-9]*$/))
            val ? setOutVal(data)
            : setInVal(data);
        }
    }

    const handleCoin = (isOutCoin:number) => {
        return (e:any) => {
            isOutCoin ? setOutCoin(e.target.value) : setInCoin(e.target.value);
        }
    }

    const handleSwitch = () => {
        const tempVal = outVal;
        const tempCoin = outCoin;

        setOutVal(inVal);
        setOutCoin(inCoin);
        
        setInVal(tempVal);
        setInCoin(tempCoin);
    }

    return (
        <>
        <CustomModal isOpen={isOpen} onClose={onClose} title="Confirm Transaction" desc="OK" />
        <Box maxW={480} bgColor="gray.700" mx="auto" my="30px" borderRadius="26px" padding="26px" >
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
                    <Text as="h2" ml="14px" color="white">From</Text>
                    <Flex justifyContent="space-between" mt="10px" >
                        <CustomInput val={inVal} onChange={handleInputChange(0)}/>
                        <Select bgColor="brand.secondary" value={inCoin} onChange={handleCoin(0)} variant="filled" maxW="100px" color="white" >
                            {
                                coins.map(coin =>{
                                    return outCoin !== coin.name && 
                                    <option value={coin.name} key={coin.name}>{coin.name}</option>
                                    })
                            }
                        </Select>
                    </Flex>
                </Box>
                <Flex mb="20px" justifyContent="center">
                    <Button variant="secondary" onClick={handleSwitch}><FiArrowDown /></Button>
                </Flex>
                <Box bgColor="brand.srShadow" borderRadius="26px" p="18px" mb="20px">
                    <Text as="h2" ml="14px" color="white">To</Text>
                    <Flex justifyContent="space-between" mt="10px" >
                        <CustomInput val={outVal} onChange={handleInputChange(1)}/>
                        <Select bgColor="brand.secondary" value={outCoin} onChange={handleCoin(1)} variant="filled" maxW="100px" color="white" >
                            {
                                coins.map(coin =>{
                                    return inCoin !== coin.name && 
                                    <option value={coin.name} key={coin.name}>{coin.name}</option>
                                })
                            }
                        </Select>
                    </Flex>
                </Box>
                <Button width="100%" mt="10px" variant="primary" onClick={onOpen}>Swap</Button>
            </Box>
        </>
    )
}

export default Exchange;