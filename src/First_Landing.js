
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home/Home';
import BottomNavbar from './components/bottomNavbar/BottomNavbar';
import Faq from './screens/Faq/Faq';
import MarketPlace from './screens/MarketPlace/MarketPlace';
import Navbar from './components/navbar/Navbar';
import MyNfts from './screens/MyNfts/MyNfts';
import Profile from './screens/Profile/Profile';
import Announcements from './screens/Announcements/Announcements';
import React, { useState, useEffect } from "react";
// import Loader from "../../components/Loader";
import Admin from './screens/admin/Admin';

import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction, usePublicClient } from 'wagmi'
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'

import {
  cont_address,
  cont_abi,
  tokenABI,
  usdt_address
} from "./components/config";
import Web3 from "web3";
import { useLocation } from "react-router-dom";

function First_Landing() {


const [totalReferrals, settotalReferrals] = useState(0);
const [referral, setReferral] = useState("0x0000000000000000000000000000000000000000");
const [ref_from, set_ref_from] = useState("0");

const [usdt_balance, set_usdtBalance] = useState(0);
const [choosedNFT, set_choosedNFT] = useState(0);
const [mintedNfts, set_mintedNfts] = useState([]);
const [myNfts, set_myNfts] = useState([]);
const [manualRefree, set_manualRefree] = useState("");
const [isReferred, set_isReferred] = useState(false);

const [loader, setLoader] = useState(false);

const { address, isConnected,isConnecting ,isDisconnected} = useAccount()
const { chain } = useNetwork()



const CHAIN_ID = "80001";
const CHAIN_ID1 = "0x13881";

const search = useLocation().search;
const id = new URLSearchParams(search).get("ref");

useEffect(()=>{

  if(isConnected)
  {
    mount();

  }
  if(id!=null)
  {
    setReferral(id);

  }
},[address,mintedNfts])





const { config: usdtConfig } = usePrepareContractWrite({
  address: usdt_address,
  abi: tokenABI,
  functionName: "approve",
  args: [cont_address,"80000000"],
});


const {
  data: MintResult,
  isLoading: isLoading_Mint,
  isSuccess: MintSuccess,
  write: Mint,
} = useContractWrite({
  address: cont_address,
  abi: cont_abi,
  functionName: 'mint',
  args: [choosedNFT, referral],
  onSuccess(data) {
    alert("Congrats yout NFT Has been n=minted successfully")

    mount();
    console.log('Success', data)
  },
});


const {
  data: reg_refResult,
  isLoading: isLoading_reg_ref,
  isSuccess: reg_refSuccess,
  write: reg_ref,
} = useContractWrite({
  address: cont_address,
  abi: cont_abi,
  functionName: 'referreeRegister',
  args: [referral],
  onSuccess(data) {
    mount();
    console.log('Success', data)
  },
});

const {
  data: data_usdt,
  isLoading: isLoading_usdt,
  isSuccess: isSuccess_usdt,
  write: usdt_approval,
} = useContractWrite(usdtConfig);

const {switchNetwork:Mint_Switch } =
useSwitchNetwork({
  chainId: CHAIN_ID1,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    usdt_approval?.();
  }

})
const {switchNetwork:ref_Switch } =
useSwitchNetwork({
  chainId: CHAIN_ID1,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    reg_ref?.();
  }

})


const waitForTransaction = useWaitForTransaction({
  hash: data_usdt?.hash,
  onSuccess(data) {
    Mint?.();
    console.log("Success", data);
  },
});




async function mount() {
  if (isDisconnected) {
    return;
  }
  try {
    console.log("my balanace mount "+address);
    setLoader(true)
    const web3= new Web3(new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/matic/mumbai/public	"));

    const contract = new web3.eth.Contract(cont_abi, cont_address);
    const contract_usdt = new web3.eth.Contract(tokenABI, usdt_address);

    let usdt_balance = await contract_usdt.methods.balanceOf(address).call();
    set_usdtBalance(usdt_balance);
    let supply = await contract.methods.totalSupply().call();
    console.log("object2");

    // let ref_percentage = await contract.methods.ref_percentage().call();
    console.log("object4");

    console.log("object5");

    let maxSupply = await contract.methods.MAX_SUPPLY().call();
    let max_per_wallet = await contract.methods.max_per_wallet().call();
    let isReferred = await contract.methods.isReferred(address).call();
    let refreal = await contract.methods.myreferee(address).call();

    let mintedList_arr = await contract.methods.get_MintedNFTs().call();
    let myNFTS = await contract.methods.get_myAllNFTs().call({from: address});
    console.log("my nfs arr "+myNFTS);

    console.log("hello minted arr "+mintedList_arr);
    set_mintedNfts(mintedList_arr)
    set_myNfts(myNFTS)
    set_isReferred(isReferred)

    if (id != null) {


      setReferral(id);
    }
    



    set_ref_from(refreal);
    // setLoader(false);

    
    console.log("its id " + referral);

  } catch (error) {
    // Catch any errors for any of the above operations.

    console.error(error);
  }
}




function reg_referral() {

  if(!isConnected)
  {
    alert("Kindly Connect your wallet");
    return;
  }

  if(manualRefree==""||manualRefree==" ")
  {
    alert("Kidnly Write your upliner Adress")
    return
  }
  console.log("object ref"+manualRefree);

  if (chain.id != CHAIN_ID) {
    ref_Switch?.();
  } else {
    reg_ref?.();
    
  }
}





 function mintNft(value) {

  if(!isConnected)
  {
    alert("Kindly Connect your wallet");
    return;
  }
  if(80000000 > Number(usdt_balance) )
  {
    alert("you dont have enough usdt to buy");
    return
  }
  set_choosedNFT(value);
  console.log("object mint");
// Mint_Switch?.();

  if (chain.id != CHAIN_ID) {
    Mint_Switch?.();

  } else {

    usdt_approval?.();
  }
}
  return (
    <div >



      <Navbar usdt_balance={usdt_balance} />
        <Routes>




          <Route  path='/' element={<Home  mintNFT={mintNft} set_choosedNFT={set_choosedNFT} mintedNfts={mintedNfts} />} />
          <Route  path='/faqs' element={<Faq     />} />
          <Route  path='/market_place' element={<MarketPlace  mintNFT={mintNft} set_choosedNFT={set_choosedNFT} mintedNfts={mintedNfts}/>} />
          <Route  path='/my_nfts' element={<MyNfts  myNfts={myNfts} />} />
          <Route  path='/profile' element={<Profile ref_from={ref_from} isReferred={isReferred} reg_referral={reg_referral} manualRefree={manualRefree} set_manualRefree={set_manualRefree} usdt_balance={usdt_balance}  myNfts={myNfts}/>} />
          <Route  path='/announcements' element={<Announcements     />} />
       
          <Route  path='/admin' element={<Admin/>} />

       
       
        </Routes>
        <BottomNavbar/>


    </div>
  );
};

export default First_Landing;
