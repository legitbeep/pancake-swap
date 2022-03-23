import { useState } from 'react';
import { Button, Box, Flex} from '@chakra-ui/react';

import ExchangeBox from 'components/exchangeBox';
import Liquidity from 'components/liquidity';

const Main = () => {
    const [activeSec, setActiveSec] = useState(0);

    return (
        <Box >
            <Flex margin="20px auto" maxW={240} justifyContent="space-between" background="brand.srShadow" borderRadius="20px">
                <Button onClick={() => setActiveSec(0)} size="sm" fontSize="14px" margin="0 10px 0 0" variant="secondary" backgroundColor={activeSec == 0 ? "brand.secondary" : "transparent"}>Swap</Button>
                <Button onClick={() => setActiveSec(1)} size="sm" fontSize="14px" margin="0 10px 0 0" variant="secondary" backgroundColor={activeSec == 1 ? "brand.secondary" : "transparent"}>Liquidity</Button>
                <Button onClick={() => setActiveSec(2)} size="sm" fontSize="14px" variant="secondary" backgroundColor={activeSec == 2 ? "brand.secondary" : "transparent"}>Bridge</Button>
            </Flex>
            {
                activeSec == 0  
                ? <ExchangeBox />
                : <Liquidity />
            }
        </Box>
    );
}

export default Main;