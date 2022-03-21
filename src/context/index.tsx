import React , { useEffect, useState, createContext, ChangeEvent } from 'react';
import web3 from 'web3';

import { contractAbi, CHAIN_ID } from 'utils/constants';

export const TxContext = createContext({
    connectWallet: () => {},
    user:"",
    state: { loading: false, success: false, err: false },
    txHash: "",
    inVal: "",
    inCoin: "",
    outVal: "",
    outCoin: "",
    handleDataChange: (d: number) => (e: ChangeEvent<HTMLInputElement>) => {}
});

// @ts-ignore
const ethereum = typeof window != "undefined" && window.ethereum ? window.ethereum : null;

export const getEthereumContract = () => {
    // const provider = new ethers.providers.Web3Provider(ethereum,"ropsten"); //ethers.getDefaultProvider('ropsten');
    // const signer = provider.getSigner() //new ethers.Wallet(privateKey, provider);;
    // const transactionContract = new ethers.Contract(contractAddr, contractAbi, signer);  

    // return transactionContract;
} 

export const TxProvider: React.FC = ({ children }) => {
    const [user,setUser] = useState("");
    const [inVal, setInVal] = useState("");
    const [inCoin, setInCoin] = useState("");
    const [outVal, setOutVal] = useState("");
    const [txHash, setTxHash] = useState("");
    const [outCoin, setOutCoin] = useState("");
    const [state, setState] = useState({
        loading: false,
        success: false,
        err: false,
    });

    const handleDataChange = (d: number) => {
        return (e:ChangeEvent<HTMLInputElement>) => {
            if (d==0) setInVal(e.target.value)
            else if (d==1) setInCoin(e.target.value)
            else if (d==2) setOutVal(e.target.value)
            else if (d==3) setOutCoin(e.target.value)
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) alert("Please install metamask!");
            const acc = await ethereum.request({ method: "eth_requestAccounts"});
            if(acc.length)
                setUser(acc[0]);
            else 
                alert("No account found!")
        } catch (err) {
            console.log(err);
            throw new Error("No ethereum object!");
        }
    }
    return (
        <TxContext.Provider 
        value={{
                connectWallet,
                user,
                state,
                txHash,
                inVal,
                inCoin,
                outVal,
                outCoin,
                handleDataChange
            }}>
        </TxContext.Provider>
    )
}
