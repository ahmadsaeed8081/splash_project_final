import React, { useState } from "react";

export default function MyModal({ visible, onClose }) {

    const [tabs, setTabs] = useState('qr')

    if (!visible) return null


    const handleOnClose = (e) => {

        if (e.target.id === "container") onClose();
    }



    return (
        <div

            id="container"

            onClick={handleOnClose} className="fixed z-50 inset-0 bg-[#303439] bg-opacity-80 flex items-center justify-center">

            <div className=" sm:w-[55%] md:w-[50%] lg:w-[40%] w-[90%]">
                <div className="flex    justify-between my-3 items-center">

                    <div className=" flex items-center gap-2">
                        <img src={require('../../assets/image/download.png')} width="40px" alt="" />
                        <h6 className=" text-white   font-normal">WalletConnect</h6>
                    </div>
                    <div>
                        <div
                            id="container" onClick={handleOnClose} className=" w-10 h-10  cursor-pointer  shadow-sm rounded-full flex justify-center items-center bg-white">

                            <span>x</span>

                        </div>
                    </div>
                </div>
                <div className="bg-white p-2  rounded-3xl">
                    <div className="  bg-gray-300 rounded-md p-1 w-[75%]  flex gap-1 my-3 mx-auto">
                        <button onClick={() => setTabs('qr')} className={`${tabs === 'qr' ? "bg-white" : ''} rounded-md w-[50%] text-sm py-1`}> QR Code</button>
                        <button onClick={() => setTabs('desktop')} className={`${tabs === 'desktop' ? "bg-white" : ''} rounded-md w-[50%] text-sm py-1`}>Desktop</button>
                    </div>

                    {tabs === 'qr' ? (<>
                        <p className="text-center text-lg text-gray-700 mb-5">Scan OR code with a WalletConnect-compatible wallet</p>
                        <div className=" h-[400px] w-full">

                            <img src={require('../../assets/image/qr-code.png')} className=" w-full h-full" alt="" />

                        </div>
                        
                        <p className=" text-center">Copy to clipboard</p>
                    </>) : (<>
                        <p className="text-center text-gray-700  text-lg">Choose your preferred wallet</p>
                        <div className=" h-[300px] w-full p-5">


                            <input placeholder="Search" className=" w-full rounded-md bg-gray-300 p-2" />


                            <div className=" flex  flex-wrap justify-between   gap-5 items-center w-full  mt-10">
                                <div className="text-center w-16">
                                    <img src={require('../../assets/image/icon1.png')} className="shadow-md" width="45px" />
                                    <p className=" text-lg">Ledger</p>
                                </div>
                                <div className="text-center w-16">
                                    <img src={require('../../assets/image/icon1.png')} className="shadow-md" width="45px" />
                                    <p className=" text-lg">Ledger</p>
                                </div>
                                <div className="text-center w-16">
                                    <img src={require('../../assets/image/icon1.png')} className="shadow-md" width="45px" />
                                    <p className=" text-lg">Ledger</p>
                                </div>
                                <div className="text-center w-16">
                                    <img src={require('../../assets/image/icon1.png')} className="shadow-md" width="45px" />
                                    <p className=" text-lg">Ledger</p>
                                </div>
                                
                            </div>

                        </div>
                    </>)}


                </div>
            </div>
        </div>
    );
}