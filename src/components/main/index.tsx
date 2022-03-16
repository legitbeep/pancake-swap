import { useState } from 'react'; 
import { Button, Box, Heading, Text, IconButton, Flex, Divider } from '@chakra-ui/react';
import CustomInput from 'components/input';

const Main = () => {
    const [activeSec, setActiveSec] = useState(0);

    const [inVal, setInVal] = useState(0.0);
    const [outVal, setOutVal] = useState(0.0);

    return (
        <Box >
            <Box margin="0 auto" maxW={280} background="brand.srShadow" borderRadius="20px">
                <Button onClick={() => setActiveSec(0)} margin="0 10px 0 0" variant="secondary" backgroundColor={activeSec == 0 ? "brand.secondary" : "transparent"}>Swap</Button>
                <Button onClick={() => setActiveSec(1)} margin="0 10px 0 0" variant="secondary" backgroundColor={activeSec == 1 ? "brand.secondary" : "transparent"}>Liquidity</Button>
                <Button onClick={() => setActiveSec(2)} variant="secondary" backgroundColor={activeSec == 2 ? "brand.secondary" : "transparent"}>Bridge</Button>
            </Box>
            <Box maxW={640} bgColor="black" mx="auto" my="18px" borderRadius="26px" padding="26px" >
                <Flex justifyContent="space-between" mb="14px">
                    <Box>
                        <Heading as="h2" fontWeight="bold" fontSize="18px">Exchange</Heading>
                        <Text as="p" color="brand.secondary">Trade tokens in instant</Text>
                    </Box>
                    <Box>
                        <Button variant="icon">Yes</Button>
                        <Button variant="icon">No</Button>
                    </Box>
                </Flex>
                <Divider orientation='horizontal' my="20px" />
                <Box >
                    <CustomInput val={inVal} onChange={(e: any) => setInVal(parseFloat(e.target.value))}/>
                    <CustomInput val={outVal} onChange={(e: any) => setOutVal(parseFloat(e.target.value))}/>
                </Box>
            </Box>
        </Box>
    );
}

export default Main;