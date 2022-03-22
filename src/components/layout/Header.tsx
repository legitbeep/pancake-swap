import {useEffect} from 'react';
import { Box, Flex, Heading, Button, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { injected } from 'utils/connector';

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  
  const { active, account, library, connector, error, activate, deactivate } = useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;  
  const toast = useToast();

  useEffect(() => {
    // @ts-ignore
    if (typeof window.ethereum === 'undefined') {
      alert('Please install metamask to continue!');
    }
  },[]);

  useEffect(() =>{
    active && isUnsupportedChainIdError && toast({
      title: 'Error.',
      description: "Connected to unsupported chain.",
      status: 'error',
      duration: 6000,
      isClosable: true,
    })
  },[account,isUnsupportedChainIdError,active])

  const connect = async () => {
    if(!active){
      try {
        await activate(injected);
      } catch(err) {
        console.error(err);
      }
    }
  }

  return(
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="md" display="flex">
        <Link href="/" passHref >
          <>
            <svg viewBox="0 0 32 32" color="text" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.84199 5.00181C5.35647 2.40193 7.35138 0 9.9962 0C12.3302 0 14.2222 1.89206 14.2222 4.22603V9.43607C14.806 9.39487 15.3992 9.37374 16 9.37374C16.5772 9.37374 17.1474 9.39324 17.709 9.43131V4.22603C17.709 1.89206 19.601 0 21.935 0C24.5798 0 26.5747 2.40193 26.0892 5.00181L24.9456 11.1259C28.8705 12.8395 31.8384 15.8157 31.8384 19.5556V21.8182C31.8384 24.8936 29.8038 27.4686 26.9594 29.2068C24.0928 30.9586 20.2149 32 16 32C11.7851 32 7.90719 30.9586 5.04062 29.2068C2.19624 27.4686 0.161621 24.8936 0.161621 21.8182V19.5556C0.161621 15.8355 3.09899 12.8708 6.99084 11.1538L5.84199 5.00181ZM23.48 11.9305L24.8183 4.76446C25.1552 2.96 23.7707 1.29293 21.935 1.29293C20.3151 1.29293 19.0019 2.60612 19.0019 4.22603V10.8562C18.5774 10.8018 18.1462 10.7586 17.709 10.7274C17.1484 10.6873 16.5782 10.6667 16 10.6667C15.3982 10.6667 14.8049 10.689 14.2222 10.7324C13.785 10.765 13.3537 10.8094 12.9293 10.8651V4.22603C12.9293 2.60612 11.6161 1.29293 9.9962 1.29293C8.16055 1.29293 6.77597 2.96 7.11295 4.76446L8.45562 11.9543C4.25822 13.5135 1.45455 16.3344 1.45455 19.5556V21.8182C1.45455 26.7274 7.96677 30.7071 16 30.7071C24.0332 30.7071 30.5455 26.7274 30.5455 21.8182V19.5556C30.5455 16.318 27.7131 13.4847 23.48 11.9305Z" fill="#633001"></path><path d="M30.5455 21.8183C30.5455 26.7275 24.0333 30.7072 16 30.7072C7.96681 30.7072 1.45459 26.7275 1.45459 21.8183V19.5557H30.5455V21.8183Z" fill="#FEDC90"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.11298 4.7645C6.77601 2.96004 8.16058 1.29297 9.99624 1.29297C11.6161 1.29297 12.9293 2.60616 12.9293 4.22607V10.8652C13.9192 10.7351 14.9466 10.6667 16 10.6667C17.0291 10.6667 18.0333 10.732 19.0019 10.8562V4.22607C19.0019 2.60616 20.3151 1.29297 21.935 1.29297C23.7707 1.29297 25.1553 2.96004 24.8183 4.7645L23.4801 11.9306C27.7131 13.4847 30.5455 16.318 30.5455 19.5556C30.5455 24.4648 24.0333 28.4445 16 28.4445C7.96681 28.4445 1.45459 24.4648 1.45459 19.5556C1.45459 16.3345 4.25826 13.5135 8.45566 11.9543L7.11298 4.7645Z" fill="#D1884F"></path><path d="M11.9595 18.9091C11.9595 20.248 11.2359 21.3333 10.3433 21.3333C9.45075 21.3333 8.72717 20.248 8.72717 18.9091C8.72717 17.5702 9.45075 16.4849 10.3433 16.4849C11.2359 16.4849 11.9595 17.5702 11.9595 18.9091Z" fill="#633001"></path><path d="M23.1111 18.9091C23.1111 20.248 22.3875 21.3333 21.4949 21.3333C20.6024 21.3333 19.8788 20.248 19.8788 18.9091C19.8788 17.5702 20.6024 16.4849 21.4949 16.4849C22.3875 16.4849 23.1111 17.5702 23.1111 18.9091Z" fill="#633001">
              </path>
            </svg>{" "}PancakeSwap
          </>
        </Link>
      </Heading>

      <Box marginLeft="auto">
        <Button size="sm" margin="0 12px" variant="primary" onClick={connect} >
            {active ? account?.slice(0,5)+"..."+account?.slice(-4) : "Connect"}
        </Button>
        <ThemeToggle />
      </Box>
    </Flex>
)};

export default Header;
