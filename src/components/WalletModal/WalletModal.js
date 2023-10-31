import React, { useState } from "react";
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {GrClose} from 'react-icons/gr'
export default function WalletModal({ visible3, onClose3 }) {

    const [tabs, setTabs] = useState('qr')

    if (!visible3) return null


    const handleClose3 = (e) => {

        if (e.target.id === "container") onClose3();
    }



    return (
        <div

            id="container"

            onClick={handleClose3} className="fixed  z-50 inset-0 bg-[#303439] bg-opacity-80 flex items-center justify-center">

            <div className=" w-[90%]  bg-white p-6 rounded-xl">
           
            <div className=" flex justify-between items-center">
               <i onClick={onClose3}  className="cursor-pointer" > <GrClose size={25}    /> </i>
            <h1 className=" text-black font-semibold text-xl">Wallet</h1>
            <span></span>
            </div>
     
                  
                  <div className=" border rounded-xl border-red-800 p-5 mt-10">


                    <div className="flex items-center my-3 justify-between">
                        <div className="flex items-center gap-5">
                            <div className="bg-gray-300 w-8 h-8 rounded-md ">
                              <img src={require('../../assets/image/en.png')} alt="" />
                            </div>
                            <div>
                                <h2>Meta Mask</h2>
                            </div>
                        </div>
                        <div>
                        <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

</label>
                        </div>
                    </div>
                     <hr/>
                    <div className="flex items-center my-3 justify-between">
                        <div className="flex items-center gap-5">
                            <div className="bg-gray-300 w-8 h-8 rounded-md">
                            <img src={require('../../assets/image/ch.png')} alt="" />
                            </div>
                            <div>
                                <h2>Token Pocket</h2>
                            </div>
                        </div>
                        <div>
       <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-yello-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-yellow-600"></div>

</label>
                        </div>
                    </div>

                  </div>
                
                    

            </div>
        </div>
    );
}