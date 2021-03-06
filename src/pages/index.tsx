import { Box, Flex, Button } from "@chakra-ui/react";
import Link from 'next/link';
import ExchangeBox from 'components/exchangeBox';

const Home = () => {
  return (
    <Box mb={8} w="full">
      <Box >
            <Flex margin="20px auto" maxW={240} justifyContent="space-between" background="brand.srShadow" borderRadius="20px">
                <Link passHref href="/" >  
                  <Button size="sm" fontSize="14px" margin="0 10px 0 0" variant="secondary" backgroundColor={"brand.secondary"}>Swap</Button>
                </Link>
                <Link passHref href="/liquidity" >
                  <Button size="sm" fontSize="14px" margin="0 10px 0 0" variant="secondary" backgroundColor={"transparent"}>Liquidity</Button>
                </Link>
                <Button size="sm" fontSize="14px" variant="secondary" backgroundColor={ "transparent" }>Bridge</Button>
            </Flex>
            <ExchangeBox />
        </Box>
    </Box>
  );
};

export default Home;
