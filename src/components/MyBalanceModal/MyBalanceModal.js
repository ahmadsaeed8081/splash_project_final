import React, { useState } from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr'
import {BiLink} from 'react-icons/bi'
import {BsPatchCheckFill} from 'react-icons/bs';
import AnnouncementModal from "../AnnouncementModal/AnnouncementModal";
import { IoLogoUsd } from "react-icons/io";
export default function MyBalanceModal({ visible5, onClose5 ,id,mintNFT}) {


    const [activeNav, setActiveNav] = useState(false);
    const [showModal5, setShowModal5] = useState(false)


    const handleClos5 = () => setShowModal5(false)




    const [tabs, setTabs] = useState('qr')

    if (!visible5) return null


    const handleClose5 = (e) => {

        if (e.target.id === "container") onClose5();
    }



    return (
        <div id="container" onClick={handleClose5} className="   fixed   z-50 inset-0 bg-[#303439] bg-opacity-80 flex items-center justify-center">

            <div className="  w-full   fixed  h-[60%] bottom-0   bg-white bottom  p-6 rounded-xl">

             
                <div className="   overflow-y-auto  no-scrollbar h-full">

                    <div className=" w-14 mx-auto">
                        <h2 className="border-4 w-25 rounded-lg border-gray-200"></h2>
                    </div>
      
                <div>
                    <div className=" flex justify-between  items-center">
                    <div>
                    <h3 className=" text-black   font-medium pt-4">Slash #{id}</h3>
                    <div className=" flex  gap-10 items-center">
                    <span className="py-3">By Slash</span><BsPatchCheckFill color="green" />
                    </div>
                    </div>

                    <div>
                       
                       <div className=" w-10 h-10 bg-gray-300 rounded-lg justify-center items-start p-3">
                        <BiLink color="red" />
                       </div>
                    </div>
                    </div>



                    
                <div   className='border  border-gray-700  p-5  rounded-2xl mt-3 flex  items-center gap-3'>

<div className='bg-gray-200 rounded-md p-2'>
    <IoLogoUsd/>
</div>
<div>
<span className="  text-gray-500" >NFT PRICE</span>
    <p className=' text-lg' > 801.00 USDT</p>

</div>


</div>

<div className=" border p-3 rounded-lg mt-5">

    <h2>Description</h2>
    
<p className=" text-gray-500"> 
Please be aware that NFT purchases are irreversible; once acquired, refunds are not possible. NFTs are unique digital assets with potential value fluctuations, and their purchase carries inherent risks. Ensure thorough research and understanding before making any NFT transactions.

                       
                    </p>


<button className="primary-btn w-full py-2" onClick={()=>mintNFT(id)} >BUY NOW</button>
</div>
                </div>


      </div>
                






                <AnnouncementModal onClose3={handleClose5} visible3={showModal5} />


            </div>
        </div>
    );
}