import { ChangeEventHandler, useState } from 'react';
import { Button, Box, Heading, Text, Flex, Divider, Select, useDisclosure } from '@chakra-ui/react';
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap/sdk'
import { IoSettingsSharp } from 'react-icons/io5';
import { MdHistory } from "react-icons/md"; 
import { IoAdd } from 'react-icons/io5';
import { useWeb3React } from '@web3-react/core';

import CustomInput from 'components/input';
import CustomModal from 'components/modal';
import { tokens } from 'utils/constants';

import AddLiquidity from './AddLiquidity';

const Liquidity = () => {
    const { active, account, ...web3React } = useWeb3React(); 
    const [addLiquid, setAddLiquid] = useState(false);


    return (
                addLiquid
                    ? <AddLiquidity callback={() => setAddLiquid(false)} />
                    : <>
                        <Box maxW={400} bgColor="gray.700" mx="auto" my="30px" borderRadius="26px" padding="26px" >
                            <Box justifyContent="space-between" mb="14px">
                                <Box>
                                    <Heading color="white" as="h2" fontWeight="bold" fontSize="18px">Liquidity</Heading>
                                    <Text as="p" color="brand.secondary">Add liquidity to the pool.</Text>
                                </Box>
                                <Box>
                                    <Button disabled={!active} width="100%" mt="10px" variant="primary" onClick={() => setAddLiquid(true)}>
                                        {active ? "Add Liquidity" : "Unlock Wallet"}
                                    </Button>
                                </Box>
                            </Box>
                            <Divider orientation='horizontal' my="20px" />
                            <Box>
                                <Heading color="white" as="h2" fontWeight="bold" fontSize="18px">Your Liquidity</Heading>
                                <Text as="p" color="brand.secondary">Below are your liquidity pools.</Text>
                            </Box>
                            <Box bgColor="brand.srShadow" borderRadius="26px" p="18px" my="20px">
                                <Box>
                                    <Text as="p" color="brand.secondary">No pools found.</Text>
                                </Box>
                            </Box>
                        </Box>
                    </>
        )
}

export default Liquidity;