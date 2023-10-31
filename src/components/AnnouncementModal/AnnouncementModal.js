import React, { useState } from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr'

import { BsPatchCheckFill } from 'react-icons/bs';
export default function AnnouncementModal({ visible4, onClose4 }) {


    const [activeNav, setActiveNav] = useState(false);
    const [showModal4, setShowModal4] = useState(false)


    const handleClose = () => setShowModal4(false)




    const [tabs, setTabs] = useState('qr')

    if (!visible4) return null


    const handleClose4 = (e) => {

        if (e.target.id === "container") onClose4();
    }



    return (
        <div

            id="container"

            onClick={handleClose4} className=" absolute  h-fit   z-50 inset-0 bg-[#303439] bg-opacity-80 flex items-center justify-center">

            <div className=" w-[90%]  my-20  bg-white gap-y-24 p-6 rounded-xl ">

                <div className=" flex justify-between items-center">
                    <i onClick={onClose4} className="cursor-pointer" > <GrClose size={25} /> </i>
                    <h1 className=" text-black font-semibold text-xl">Announcements</h1>
                    <span></span>
                </div>


                <div className="bg-gray-800  h-40 w-full rounded-lg mt-2">
                    {/* <img src={require('')} alt="" /> */}
                </div>



                <div>
                    <h3 className=" text-black   font-medium pt-4">Opening of new collection</h3>
                    <div className=" flex  gap-10 items-center">
                        <span className="py-3">By Slash   </span>

                        <BsPatchCheckFill color="green" />
                    </div>


                    <p className=" text-gray-500">
                        Curabitur vehicula justo nisi, tincidunt hendrerit

                        turpis art elementum eget. Ut nec posuere

                        ipsum. Sed ut arcu at tellus suscipit feugiat a sit

                        amet lacus... Curabitur vehicula justo nisi,

                        tincidunt hendrerit turpis art elementum eget.

                        Ut nec posuere ipsum. Sed ut arcu at tellus

                        suscipit feugiat a sit amet lacus..... Curabitur

                        vehicula justo nisi, tincidunt hendrerit turpis art

                        elementum eget.


                    </p>

                    <p className=" text-gray-500 pt-4"> Ut nec posuere ipsum. Sed ut arcu at tellus

                        suscipit feugiat a sit amet lacus... Curabitur

                        vehicula justo nisi, tincidunt hendrerit turpis art

                        elementum eget. Ut nec posuere ipsum. Sed ut

                        arcu at tellus suscipit feugiat a sit amet lacus.... Ut

                        nec posuere ipsum. Sed ut arcu at tellus suscipit

                        Another announcement

                        This message is a message with message intended

                        for the intended message to be read by intended user

                        for intended purposes only for intended use...
                    </p>
                </div>

                <AnnouncementModal onClose3={handleClose4} visible3={showModal4} />


            </div>
        </div>
    );
}