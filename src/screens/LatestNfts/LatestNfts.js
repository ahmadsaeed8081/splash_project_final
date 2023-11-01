import { t } from 'i18next';
import React, { useEffect, useState } from "react";
import {CiSearch} from 'react-icons/ci';
import { useAccount, useDisconnect } from 'wagmi'

import Web3 from "web3";
import {
  cont_address,
  cont_abi,
} from "../../components/config";
const LatestNfts = ({mintednfts}) => {
  const { address, isConnected,isConnecting ,isDisconnected} = useAccount()
  const [allNfts, set_allNfts] = useState([]);

  const data = [ ];
  let count=0;

async function mount(){
if(count>0)
{
  return;
}
count++;
const web3= new Web3(new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/matic/mumbai/public	"));
  
  const contract = new web3.eth.Contract(cont_abi, cont_address);

  
  let mintedList_arr = await contract.methods.get_MintedNFTs().call({from: address});

  for(let i=0; i < mintedList_arr.length;i++)
  {

    let owner = await contract.methods.ownerOf(mintedList_arr[i]).call();

        let img= ("./images/"+mintedList_arr[i]+".png")
        // alert(img)
        data.push(
        {
        id: mintedList_arr[i],
        owner: owner,
        price: "80 USDT",
        image: img,
        })
  }
  
  set_allNfts(data)
}

useEffect(()=>{
  mount();
  },[])




  return (
    <div className='  ml-6 md:ml-12  pt-10 '>


          
        <h2 className=' text-black  text-2xl mt-8   font-semibold'>{t('Sold')} </h2>

        <div className=' flex w-full overflow-x-auto  no-scrollbar  items-center gap-8 mt-10'>

        {allNfts.toReversed().map((item, index) => {
              return (
                <>

                  <div className='  bg-white   rounded-lg p-4 md:flex flex-none  w-[50%] md:w-[30%] items-center gap-2'>

                  <div className=' w-12 h-12 rounded-full'>
                    <img src={item.image}   className=' w-full rounded-full' />
                  </div>

                  <div>
                      <h2 className=' text-black font-semibold'>NFT # {item.id}</h2>
                      <p className=' text-gray-400'>80 USDT Owner : {item.owner.slice(0,4)+"...."+item.owner.slice(38,42)}</p>
                  </div>
                      
                  </div>
                  </>
              );
            })}
            
           
            {/* <div className='  bg-white rounded-lg p-4  w-[50%] md:w-[30%]  md:flex flex-none items-center gap-2'>

            <div className=' w-12 h-12 rounded-full'>
              <img src={require('../../assets/image/1.png')}   className=' w-full rounded-full' />
            </div>

            <div>
                <h2 className=' text-black font-semibold'>#NFT-000809</h2>
                <p className=' text-gray-400'>248 USDT Owner : 0 X 4...bh5</p>
            </div>
                
            </div>
            <div className='  bg-white rounded-lg p-4  w-[50%] md:w-[30%]   md:flex flex-none  items-center gap-2'>

            <div className=' w-12 h-12 rounded-full'>
              <img src={require('../../assets/image/1.png')}   className=' w-full rounded-full' />
            </div>

            <div>
                <h2 className=' text-black font-semibold'>#NFT-000809</h2>
                <p className=' text-gray-400'>248 USDT Owner : 0 X 4...bh5</p>
            </div>
                
            </div>
            <div className='  bg-white rounded-lg p-4  w-[50%] md:w-[30%]   md:flex flex-none  items-center gap-2'>

            <div className=' w-12 h-12 rounded-full'>
              <img src={require('../../assets/image/1.png')}   className=' w-full rounded-full' />
            </div>

            <div>
                <h2 className=' text-black font-semibold'>#NFT-000809</h2>
                <p className=' text-gray-400'>248 USDT Owner : 0 X 4...bh5</p>
            </div>
                
            </div> */}
        </div>
    </div>
  )
}

export default LatestNfts