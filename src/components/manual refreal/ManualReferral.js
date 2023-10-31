import React, { useState } from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr'

import {BsPatchCheckFill} from 'react-icons/bs';
import { IoLogoUsd } from "react-icons/io";
import { BiLink } from "react-icons/bi";
export default function ManualReferral({ refModal, showModal_ref,set_manualRefree,manualRefree,reg_referral }) {


    const [activeNav, setActiveNav] = useState(false);
    const [showModal6, setShowModal6] = useState(false)


    const handleClose = () => setShowModal6(false)




    const [tabs, setTabs] = useState('qr')

    if (!refModal) return null


    const handleClose6 = (e) => {

        if (e.target.id === "container") showModal_ref();
    }



    return (
        <div

            id="container"

            onClick={handleClose6} className="fixed  py-32  z-50 inset-0 bg-[#303439] bg-opacity-80 flex items-center justify-center">

            <div className=" w-[100%]    h-auto md:w-[40%] bg-white p-6 rounded-xl ">
                 
                <div className=" flex justify-between items-center">
                    <i  className="cursor-pointer" > <GrClose size={20} /> </i>
                </div>



                <div className='   md:w-[100%] p-5 mt-3   items-center' >
                    <input className='border  border-gray-700  md:w-[100%] p-5  rounded-2xl mt-3   items-center'   
                    type="text" 
                    placeholder="paste the address of your referral"
                    value={manualRefree}
                    onChange={(e)=>set_manualRefree(e.target.value)}
                    />
                </div>


    
                <div  className='   md:w-[100%] p-5 mt-3   items-center'>
                    <button className="primary-btn md:w-[100%] p-5 mt-3  " onClick={()=>{reg_referral()}} >Register Now</button>
                </div>


            </div>
        </div>
    );
}