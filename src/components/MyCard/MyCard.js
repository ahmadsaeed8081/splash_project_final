import React from 'react'
import { HiShoppingCart } from 'react-icons/hi';
import {FaHeart} from 'react-icons/fa';

const MyCard = ({category,title,oldPrice,price,description,image,_id,isNew,onClick,id}) => {


    

  return (
   
        
          <div key={_id} className='w-full bg-white text-black p-3 md:p-7  shadow-lg border-gray-300  rounded-xl group overflow-hidden'>

          <div className='w-full h-[200px' >
              <img className=' h-full w-full object-cover  rounded-xl  transition-transform duration-300'  src={image} alt='' />
            
          </div> 


          <div className='px-3 py-3 flex flex-col gap-1'>
            
            <p className='text-gray-500 text-base  tracking-wide font-semibold'>SLASH # {id}</p>
            <p className='flex items-center gap-2'>
              {/* <span className='text-amazon_light text-xl text-black'>
                80
              </span> */}
              {/* <span className=' text-amazon_blue   text-xl text-black'>
                USDT
              </span> */}
            </p>


            {/* <button  onClick={onClick} className='primary-btn mt-8 py-1 ' >BUY NOW</button> */}
          </div>

          </div>
       
   
  )
}

export default MyCard


