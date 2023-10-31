import React, { useState } from "react";
import { HiShoppingCart } from 'react-icons/hi';
import {FaHeart} from 'react-icons/fa';
import { useTranslation } from 'react-i18next'
import BuyNowModal from "../BuyNowModal/BuyNowModal";
import MyBalanceModal from "../MyBalanceModal/MyBalanceModal";

const NftCard = ({set_choosedNFT,category,title,oldPrice,price,description,image,_id,isNew,open_buy_popup,MobileClick,id,mintNFT}) => {
  const [showModal6, setShowModal6] = useState(false);
  const handleClose6 = () => setShowModal6(false);

  const [showModal4, setShowModal4] = useState(false);

  const handleClose4 = () => setShowModal4(false);
  const {t} = useTranslation()
  return (
   
        
          <div key={_id} className='w-full bg-white text-black p-3 md:p-7  shadow-lg border-gray-300  rounded-xl group overflow-hidden'>

          <div className='w-full h-[200px' >
              <img className=' h-full w-full object-cover rounded-xl  transition-transform duration-300'  src={image} alt='' />
            
          </div> 


          <div className='px-3 py-3 flex flex-col gap-1'>
            
            <p className='text-gray-500 text-base  tracking-wide font-semibold'>{title} </p>
            <p className='flex items-center gap-2'>
              <span className='text-amazon_light text-xl text-black'>
                80
              </span>
              <span className=' text-amazon_blue   text-xl text-black'>
                USDT
              </span>
            </p>
            <p className=' text-xs text-gray-600 text-justify    font-black'>{description}</p
            >

            <button  onClick={()=>setShowModal6(true)} className='primary-btn  mt-8 py-1  hidden  md:block' >{t('BUY NOW')}</button>
            <button  onClick={()=>setShowModal4(true)} className='primary-btn mt-8 py-1   block md:hidden' >{t('BUY NOW')}</button>
          </div>
          <BuyNowModal onClose6={handleClose6} visible6={showModal6} id={id} mintNFT={mintNFT}  />
          <MyBalanceModal onClose5={handleClose4} visible5={showModal4} id={id} mintNFT={mintNFT}/>

          </div>
       
   
  )
}

export default NftCard


