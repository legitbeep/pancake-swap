import { ChangeEventHandler, useState } from 'react';
import { Button, Box, Heading, Text, Flex, Divider, Select, useDisclosure } from '@chakra-ui/react';
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { IoSettingsSharp } from 'react-icons/io5';
import { MdHistory } from "react-icons/md"; 
import { IoAdd } from 'react-icons/io5';
import { useWeb3React } from '@web3-react/core';

import CustomInput from 'components/input';
import CustomModal from 'components/modal';
import { mainnetTokens, testnetTokens } from 'utils/constants/tokens';

const tokens = testnetTokens;
const AddLiquidity = ({ callback } : {callback : () => void}) => {
    const { active, account, ...web3React } = useWeb3React(); 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inVal, setInVal] = useState("");
    const [outVal, setOutVal] = useState("");
    
    const [inCoin, setInCoin] = useState("wbnb");
    const [outCoin, setOutCoin] = useState("cake");

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

    return (
        <>
        <CustomModal isOpen={isOpen} onClose={onClose} title="Confirm Transaction" desc="OK" />
        <Box maxW={400} bgColor="gray.700" mx="auto" my="30px" borderRadius="26px" padding="26px" >
                <Flex mb="14px" alignItems="center" >
                    <Box width="20%">
                        <Button onClick={callback} >{"<"}</Button>
                    </Box>
                    <Box width="60%" display="flex" justifyContent="center">
                        <Heading color="white" as="h2" my="auto" fontWeight="bold" fontSize="18px">Liquidity</Heading>
                    </Box>
                </Flex>
                <Divider orientation='horizontal' my="20px" />
                <Box bgColor="brand.srShadow" borderRadius="26px" p="18px" mb="20px">
                    <Text as="h2" ml="14px" color="white">Input</Text>
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
                    <Button variant="secondary" ><IoAdd /></Button>
                </Flex>
                <Box bgColor="brand.srShadow" borderRadius="26px" p="18px" mb="20px">
                    <Text as="h2" ml="14px" color="white">Input</Text>
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
                    {active ? "Add Liquidity" : "Unlock Wallet"}
                </Button>
            </Box>
        </>
    )
}

export default AddLiquidity;