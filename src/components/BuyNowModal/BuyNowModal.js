import React, { useState } from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr'

import {BsPatchCheckFill} from 'react-icons/bs';
import { IoLogoUsd } from "react-icons/io";
import { BiLink } from "react-icons/bi";
export default function BuyNowModal({ visible6, onClose6,id,mintNFT }) {


    const [activeNav, setActiveNav] = useState(false);
    const [showModal6, setShowModal6] = useState(false)


    const handleClose = () => setShowModal6(false)




    const [tabs, setTabs] = useState('qr')

    if (!visible6) return null


    const handleClose6 = (e) => {

        if (e.target.id === "container") onClose6();
    }



    return (
        <div

            id="container"

            onClick={handleClose6} className="fixed  py-32  z-50 inset-0 bg-[#303439] bg-opacity-80 flex items-center justify-center">

            <div className=" w-[100%]    h-auto md:w-[50%] bg-white p-6 rounded-xl ">
                 
                <div className=" flex justify-between items-center">
                    <i onClick={onClose6} className="cursor-pointer" > <GrClose size={20} /> </i>
                    {/* <h1 className=" text-black font-semibold text-xl">Announcements</h1> */}
                    <span></span>
                </div>





                <div>
                <div className=" flex justify-between  items-center">
                    <div>
                    <h3 className=" text-black   font-medium pt-4">Slash # {id}</h3>
                    <div className=" flex  gap-10 items-center">
                    <span className="py-3">By Slash   </span>

<BsPatchCheckFill color="green" />
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
<span className="  text-gray-500" >MAKET PRICE</span>
    <p className=' text-lg' > 80 USDT</p>

</div>


</div>
    
                    <div className=" border p-3 rounded-lg mt-5">

<h2>Description</h2>

<p className=" text-gray-500"> 
                    Curabitur vehicula justo nisi, tincidunt hendrerit

                    turpis art elementum eget. Ut nec posuere

                    ipsum. Sed ut arcu at tellus suscipit feugiat a sit

                    amet lacus... Curabitur vehicula justo nisi,

                    tincidunt hendrerit turpis art elementum eget.

                    Ut nec posuere ipsum. Sed ut arcu at tellus

                    suscipit feugiat a sit amet lacus.....

                   
                </p>

                {/* <p className=" text-gray-500 pt-4"> Ut nec posuere ipsum. Sed ut arcu at tellus

suscipit feugiat a sit amet lacus... Curabitur

vehicula justo nisi, tincidunt hendrerit turpis art

elementum eget. Ut nec posuere ipsum. Sed ut

arcu at tellus suscipit feugiat a sit amet lacus.... Ut

nec posuere ipsum. Sed ut arcu at tellus suscipit

Another announcement

This message is a message with message intended

for the intended message to be read by intended user

for intended purposes only for intended use...
</p> */}
<button className="primary-btn  w-52 py-2" onClick={()=>mintNFT(id)}>BUY NOW</button>
</div>

    {/* <button className="primary-btn py-2 mt-10  w-full md:w-64">BUY NOW</button> */}


                </div>

                {/* <AnnouncementModal onClose3={handleClose4} visible3={showModal4} /> */}


            </div>
        </div>
    );
}