import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from "@ethersproject/units";

export const useBalance = () => {
    const [balance, setBalance] = useState("");
    const { library, account } = useWeb3React();

    useEffect(() => {
        if ( account ) 
            library.getBalance(account).then(
                (bal:any) => setBalance(bal)
            )
    },[library, account])

    return balance ? `${formatEther(balance)} ETH` : null;
}

export const useBlockNumber = () => {
    const { library } = useWeb3React();
    const [blockNum, setBlockNum] = useState();

    useEffect(() => {
        const updateBlockNum =  (val:any) => setBlockNum(val);
        if(library)
            library.on("block", updateBlockNum)
        return () => { library.removeEventListener("block", updateBlockNum) }
    },[library])

    return blockNum;
} 

export const useSigner = (message?:string) => {
    const { library, account } = useWeb3React();
    const [signer, setSigner] = useState();

    useEffect(() => {
        library
            .getSigner(account)
            .signMessage(message || "Signed by the user!")
            .then((sign:any) => setSigner(sign))
    },[library, account])

    return { message, account, signer };
}