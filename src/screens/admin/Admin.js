import { useAccount, useDisconnect } from 'wagmi'
import React, { useEffect, useState } from "react";

import Web3 from "web3";
import {
  cont_address,
  cont_abi,
} from "../../components/config";
const Table = () => {




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
  const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com"));
  
  const contract = new web3.eth.Contract(cont_abi, cont_address);

  
  let mintedList_arr = await contract.methods.get_MintedNFTs().call({from: address});

  for(let i=0; i < mintedList_arr.length;i++)
  {

    let owner = await contract.methods.ownerOf(mintedList_arr[i]).call();
    let refreal = await contract.methods.myreferee(address).call();

        let img= ("./images/"+mintedList_arr[i]+".png")
        // alert(img)
        data.push(
        {
        id: mintedList_arr[i],
        owner: owner,
        referee: refreal
        })
  }
  
  set_allNfts(data)
}

useEffect(()=>{
  mount();
  },[])

  return (
    <>
<>
  {/* Container for demo purpose */}
  <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
    {/*Section: Design Block*/}
    <section className="mb-20 text-gray-800">
      <div className="block rounded-lg w-[95%] md:w-[65%] mx-auto p-5 shadow-lg bg-white">
        <h2 className=' py-2 text-black font-semibold text-xl'>Admin Panel</h2>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full mb-0">
                  <thead className="border-b bg-gray-50 rounded-t-lg text-center">
                    <tr>
                      <th
                        scope="col"
                        className="rounded-tl-lg text-black text-sm font-semibold px-6 md:px-12 py-4"
                      >
                        Token ID
                      </th>
                      <th scope="col" className="text-sm  text-black font-semibold  px-6 md:px-12 py-4">
                        Token Owner
                      </th>
                      
                      <th scope="col" className="text-sm text-black   font-semibold  px-6 md:px-12 py-4">
                        Token Owner's Referee
                      </th>
                      <th
                        scope="col"
                        className="rounded-tr-lg text-sm font-medium px-6 py-4"
                      />
                    </tr>
                  </thead>
                  <tbody>


                  {allNfts.map((item, index) => {

                    return (

                    <tr className="border-b">
                      <th
                        scope="row"
                        className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center"
                      >
                        <div className="flex flex-row items-center justify-center">
                          
                          <div className="ml-4">
                            <p className="mb-0.5 font-medium">{item.id}</p>
                           
                          </div>
                        </div>
                      </th>
                      <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                      <button className='bg-[#e15764] text-white p-2  rounded-full'>{item.owner.slice(0,5)+"..."+ item.owner.slice(38,42)}</button>
                      </td>
                      <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                      <button className='bg-[#e15764] text-white p-2  rounded-full'>{item.referee.slice(0,5)+"..."+ item.referee.slice(38,42)}</button>
                      </td>
                      
                    </tr>



                  );
                  })}
                  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*Section: Design Block*/}
  </div>
  {/* Container for demo purpose */}
</>

    </>
  )
}

export default Table