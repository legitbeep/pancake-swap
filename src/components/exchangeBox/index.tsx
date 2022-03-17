import { useState } from 'react';
import { Button, Box, Heading, Text, Flex, Divider, Select } from '@chakra-ui/react';

import CustomInput from 'components/input';

import { IoSettingsSharp } from 'react-icons/io5';
import { MdHistory } from "react-icons/md"; 
import { FiArrowDown } from 'react-icons/fi';

import { coins } from 'utils/constants';

const Exchange = () => {
    
    const [inVal, setInVal] = useState("0.0");
    const [outVal, setOutVal] = useState("0.0");
    
    const handleChange = (val:number) => {
        return (e:any) => {
            let data = e;
            if (data.match(/^[0-9]*[.,]?[0-9]*$/))
            val ? setOutVal(data)
            : setInVal(data);
        }
    }
    return (
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
                        <CustomInput val={inVal} onChange={handleChange(0)}/>
                        <Select variant="filled" maxW="100px" color="white">
                            {
                                coins.map(coin =>
                                    <option value={coin.name} key={coin.name}>{coin.name}</option>
                                )
                            }
                        </Select>
                    </Flex>
                </Box>
                <Flex mb="20px" justifyContent="center">
                    <Button variant="secondary"><FiArrowDown /></Button>
                </Flex>
                <Box bgColor="brand.srShadow" borderRadius="26px" p="18px" mb="20px">
                    <Text as="h2" ml="14px" color="white">To</Text>
                    <Flex justifyContent="space-between" mt="10px" >
                        <CustomInput val={outVal} onChange={handleChange(1)}/>
                        <Select variant="filled" maxW="100px" color="white">
                            {
                                coins.map(coin =>
                                    <option value={coin.name} key={coin.name}>{coin.name}</option>
                                )
                            }
                        </Select>
                    </Flex>
                </Box>
                <Button width="100%" mt="10px" variant="primary">Swap</Button>
            </Box>
    )
}

export default Exchange;