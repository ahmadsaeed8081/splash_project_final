import React, { useState } from 'react'
import {HiMiniHome} from 'react-icons/hi';
import {BsFillGridFill,BsHouseDoorFill} from 'react-icons/bs';
import {AiFillShop} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {FaUserAlt} from 'react-icons/fa';
import { t } from 'i18next';


const BottomNavbar = () => {

  const [navbarNav,setNavbar] = useState('/')
  return (
    <div className='   w-full  h-24  flex justify-center items-center   fixed  object-cover    bottom-0 bg-white '>

        <div className=' container px-6 md:px-0 w-screen mx-auto flex items-center justify-around'>

            
                <div className=' text-center'>
                  <Link to='/' className='' onClick={()=>setNavbar('/')}  >
                  <BsHouseDoorFill  size={35} className='m-0 p-0 ml-1' color={navbarNav==='/'?'#DA3D4D':'black'} />
                   {navbarNav==='/'? <h3 className=' font-semibold text-[#DA3D4D]'>{t('home')}</h3>:null}
                  </Link>
                </div>
                <div className='text-center'>
                  <Link to='/market_place' onClick={()=>setNavbar('/market')} >
                    <AiFillShop  className=' ml-2' size={40} color={navbarNav==='/market'?'#DA3D4D':'black'} />
                
                    {navbarNav==='/market'?<h3 className=' font-semibold text-[#DA3D4D]'  >{t('MARKETPLACE')}</h3>:null}

                    </Link>
                </div>
                <div className=''>
                  <Link to='/my_nfts' onClick={()=>setNavbar('/my_nfts')}>
                    <BsFillGridFill  className=' text-center ml-2' size={35} color={navbarNav==='/my_nfts'?'#DA3D4D':'black'} />
                

                    {navbarNav==='/my_nfts'?     <h3 className=' font-semibold text-[#DA3D4D]'>MY NFTs</h3>:null}
                    </Link>
                </div>
                <div className=''>
                  <Link to='/profile' onClick={()=>setNavbar('/profile')}>
                    <FaUserAlt  className=' text-center ml-2' size={35} color={navbarNav==='/profile'?'#DA3D4D':'black'} />
                   

                    {navbarNav==='/profile'?  <h3 className=' font-semibold  text-[#DA3D4D]'>{t('Profile')}</h3>:null}
                    </Link>
                </div>
        

        </div>

    </div>
  )
}

export default BottomNavbar