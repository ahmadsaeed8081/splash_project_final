import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { TfiAngleRight } from 'react-icons/tfi'
import { HiMenuAlt2 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import MyModal from '../MyModal/MyModal';
import LanguageModal from '../language/LanguageModal';
import { BsWalletFill, BsQuestionCircle } from 'react-icons/bs'
import { LiaLanguageSolid } from 'react-icons/lia';
import { useTranslation } from 'react-i18next'
import { GrLanguage } from 'react-icons/gr'
import { MdOutlineAnnouncement } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { IoLogoUsd } from 'react-icons/io'
import WalletModal from '../WalletModal/WalletModal';
import MyBalanceModal from '../MyBalanceModal/MyBalanceModal';
import DestopLanguage from '../DestopLanguage/DestopLanguage';
import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'
import axios  from 'axios';

const Navbar = ({usdt_balance}) => {

    const [activeNav, setActiveNav] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)
    const [showModal5, setShowModal5] = useState(false)
    const handleClose = () => setShowModal(false)
    const handleClose2 = () => setShowModal2(false)
    const handleClose3 = () => setShowModal3(false)
    const handleClose5 = () => setShowModal5(false)

    const { open, close } = useWeb3Modal()



    const { t } = useTranslation()
    const { address, isConnected,isDisconnected } = useAccount()



    const [image,setImage] = useState('');
    const [name,setName] = useState('');
  
    const [refModal,showModal_ref] = useState(false);
  

    
  
  
  
  const [preview ,setPreview] = useState({})
  
  console.log(preview);
  if(image){
    const reader = new FileReader()
     reader.readAsDataURL(image[0])
    reader.onload = () =>{
        setPreview(reader.result)
    }
  }
  useEffect(()=>{
    if(isConnected)
    {
      get_data(); 
  
    }
  },[address])
    async function get_data()
    {
    
    
        const res =await axios.get("https://slashapi-production.up.railway.app/get?"+ new URLSearchParams({
          userAddress: address}))
          if(res.data[0]!=undefined)
          {
        setPreview(res.data[0].image);
        setName(res.data[0].Name)
      }
    
    
    
    
      
    }
    return (
        <>
            <div className=' bg-white flex justify-between items-center w-screen p-2 h-20 pl-5 pr-6 md:pl-24 container mx-auto'>

                <div className='lg:hidden block' onClick={() => { setActiveNav(true) }}>
                    <p>
                        <HiMenuAlt2 size={35} />
                    </p>
                </div>


                {/* logo  */}
                <div>
                    <Link to='/'>
                        <img src={require('../../assets/image/logo.png')} width="100px" alt='' />
                    </Link>
                </div>

                {/* menu bar */}

                <div className='hidden lg:block'>
                    <ul className=' flex justify-between items-start'>
                        <li className='list'>
                            <Link className='text-black  font-bold text-md' to='/'>{t('home')}</Link>
                        </li>
                        <li className='list'>
                            <Link className='text-black  font-bold text-md' to='/market_place'>{t('MARKETPLACE')}</Link>
                        </li>
                        <li className='list'>
                            <Link className='text-black  font-bold text-md' to='/faqs'>{t('FAQ')}</Link>
                        </li>
                        <li className='list'>
                            <Link className='text-black  font-bold text-md' to='/profile'>{t('Profile')}</Link>
                        </li>
                    </ul>
                </div>

                {/* button menu */}

                <div className='  hidden lg:block'>
                    <button class="primary-btn py-2"  onClick={open} >{isConnected?address.slice(0,5)+"..."+address.slice(38,42): t('Connect Wallet') }</button>
                </div>
                        

                        <div>
                            <DestopLanguage/>
                        </div>


                <MyModal onClose={handleClose} visible={showModal} />
                <LanguageModal onClose2={handleClose2} visible2={showModal2} />
                <WalletModal onClose3={handleClose3} visible3={showModal3} />
                <MyBalanceModal onClose5={handleClose5} visible5={showModal5} />

            </div>




            {/* mobile navbar */}


            <div className={`fixed h-[100%]   transition-transform  duration-500   z-40 bg-black/50 w-full  top-0 left-[-100%] ${activeNav === true ? "left-[0%]" : "left-[-100%]"}`}>


                <div className=' w-[350px] p-4 bg-white  overflow-x-auto overflow-y-auto h-full'>

                    <div className='flex justify-between items-center'>
                        <div className='lg:hidden block' onClick={() => { setActiveNav(false) }}>
                            <p><AiOutlineClose size={35} /></p>
                        </div>
                        <div>
                            <Link to='/'>
                                
                                <img src={require('../../assets/image/logo.png')} width="110px" alt='' />
                            </Link>
                        </div>

                        <div>

                        </div>

                    </div>

                    <Link onClick={() => { setActiveNav(false) }} to='/profile' className='border   border-blue-700 p-3  rounded-2xl mt-3 flex  items-center gap-3'>

                        <div className='bg-gray-200 w-12 h-12 rounded-full p-2'>
                            <img  src={!preview?require('../../assets/image/logo.png'):preview} className='w-full h-full' />
                        </div>
                        <div>
                            <p className=' text-lg' >{name}</p>
                            {/* <p>38903-23dldjkkl</p> */}

                        </div>


                    </Link>
                    <div onClick={() => setShowModal5(true)} className='border  border-orange-700  p-3  rounded-2xl mt-3 flex  items-center gap-3'>

                        <div className='bg-gray-200 rounded-md p-2'>
                            <IoLogoUsd />
                        </div>
                        <div>
                            <p className=' text-lg' >{t('my_balance')} {t('(USDT)')}</p>
                            <span >{usdt_balance/10**6}</span>
                        </div>


                    </div>
                    {/* <div onClick={() => setShowModal3(true)} className='border  border-yellow-700 p-3  rounded-2xl mt-3 flex  items-center gap-3'>

                        <div className='bg-gray-200 rounded-md p-2'>
                            <BsWalletFill />
                        </div>
                        <div>
                            <p className=' text-lg' >{t('my_wallet')}</p>
                        </div>



                    </div> */}


                    <div className='bg-white'>
                        <p className=' font-bold mt-5'>{t('Settings')}</p>

                        <div className='border  border-cyan-700 p-4  rounded-2xl mt-3'>
                            <div className=' flex justify-between items-center'>
                                <div onClick={() => setShowModal2(true)} className='flex items-center  gap-4'>
                                    <LiaLanguageSolid size={30} className=' bg-gray-200 p-1 rounded-md' />  <p className=' text-lg'>{t('language')}</p>
                                </div>

                                <TfiAngleRight />

                            </div>
                            <hr className=' my-4' />

                            <div className=' flex justify-between items-center'>
                                <div className='flex items-center gap-4 '>
                                    <GrLanguage size={30} className=' bg-gray-200 p-1 rounded-md' />
                                    <p>{t('website')}</p>
                                </div>
                                <TfiAngleRight />
                            </div>
                        </div>
                    </div>


                    <div className='bg-white'>
                        <p className=' font-bold pt-5'>{t('Support')}</p>

                        <div onClick={() => { setActiveNav(false) }} className='border  border-red-700 p-4  rounded-2xl mt-3'>
                            <div className=' flex  justify-between items-center'>
                                <Link to='/announcements' className=' flex items-center gap-4'>
                                    <MdOutlineAnnouncement size={30} className=' bg-gray-200 p-1 rounded-md' />
                                    <p>{t('Announcements')}</p>
                                </Link>

                                <TfiAngleRight />
                            </div>


                            <hr className=' my-4' />

                            <Link to="/faqs" onClick={() => { setActiveNav(false) }} className=' flex justify-between items-center'>
                                <div className='flex items-center gap-4'>
                                    <BsQuestionCircle className=' bg-gray-200 p-1 rounded-md' size={30} />
                                    <p>{t('FAQ/Help')}</p>
                                </div>
                                <TfiAngleRight />
                            </Link>

                        </div>

                        <button className='primary-btn bg-gray-800 w-full mt-5  py-2 mb-5' onClick={open} >{isConnected?address.slice(0,5)+"..."+address.slice(38,42): t('Connect Wallet') }</button>
                    </div>
                </div>



            </div>


        </>
    )
}

export default Navbar