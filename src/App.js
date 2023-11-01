
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home/Home';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import Faq from './screens/Faq/Faq';
import MarketPlace from './screens/MarketPlace/MarketPlace';
import Navbar from './components/navbar/Navbar';
import MyNfts from './screens/MyNfts/MyNfts';
import Profile from './screens/Profile/Profile';
import First_Landing from './First_Landing';

import Announcements from './screens/Announcements/Announcements';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai} from 'wagmi/chains'
import React,{useState} from 'react'
import { alchemyProvider } from 'wagmi/providers/alchemy'

// import Loader from "../../components/Loader";

import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction, usePublicClient } from 'wagmi'
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'

import {
  cont_address,
  cont_abi,
  tokenABI,
  usdt_address
} from "../src/components/config";
import Web3 from "web3";
import { useLocation } from "react-router-dom";

function App() {


/////////////////////////////////////////////////////////////////////////////////////////


    const [_address, set_address] = useState(null);
  
    const chains = [polygonMumbai]
  const projectId = '8b3cd7dcbfb565705532d880d73759f2'
  
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

  // const { chains, publicClient } = configureChains(
  //   [ polygonMumbai],
  //   [alchemyProvider({ apiKey: 'ZF4BW9pKbwOBedI1qGl0uiQHbNu-ISwi' })],
  // )
    const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)


/////////////////////////////////////////////////////////////////////////////////////////////



const [totalReferrals, settotalReferrals] = useState(0);
const [referral, setReferral] = useState("0x0000000000000000000000000000000000000000");
const [ref_from, set_ref_from] = useState("0");

const [usdt_balance, set_usdtBalance] = useState(0);

const [loader, setLoader] = useState(false);

// const { address, isConnecting ,isDisconnected} = useAccount()
// const { chain } = useNetwork()


  return (
    <div >

    <WagmiConfig config={wagmiConfig}>


     <First_Landing/>

        </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
};

export default App;
