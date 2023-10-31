import React,{useState} from 'react'
import {FaAngleRight} from 'react-icons/fa';
import AnnouncementModal from '../../components/AnnouncementModal/AnnouncementModal';
const Announcements = () => {

    const [activeNav, setActiveNav] = useState(false);
    const [showModal4,setShowModal4] = useState(false)


    const handleClose4 = ()=>setShowModal4(false)
   

  return (
    <div>

<AnnouncementModal onClose4={handleClose4} visible4={showModal4} />
      <div  className=' p-3 bg-gray-100 mb-36 h-screen'>
        <h2 className=' text-black font-semibold'>Today</h2>
<div className='p-3  mt-3  rounded-md bg-white'>
    
<div  onClick={()=>setShowModal4(true)} className='bg-white  flex  p-1 items-center justify-between'>
            <div>
            <h3 className=' text-sm text-black font-semibold'>Opening of new collection</h3>

            <p className='text-sm'>This message is a message with message intended for the intended message to be read by intended user for intended purposes only for intended use.... </p>

            </div>


            

             <div>
               <FaAngleRight  color='red'  />
             </div>
        </div>


        <hr/>

<div onClick={()=>setShowModal4(true)} className='bg-white  flex  p-1 items-center justify-between'>
    <div>
    <h3 className=' text-sm text-black font-semibold'>Opening of new collection</h3>

    <p className='text-sm'>This message is a message with message intended for the intended message to be read by intended user for intended purposes only for intended use.... </p>

    </div>

     <div>
       <FaAngleRight  color='yellow'  />
     </div>
</div>
</div>


<h2 className=' text-black font-semibold mt-3'>Yesterday</h2>
<div className='p-3  mt-3  rounded-md bg-white'>
    
<div className='bg-white  flex  p-1 items-center justify-between' onClick={()=>setShowModal4(true)}>
            <div>
            <h3 className=' text-sm text-black font-semibold'>Opening of new collection</h3>

            <p className='text-sm'>This message is a message with message intended for the intended message to be read by intended user for intended purposes only for intended use.... </p>

            </div>


            

             <div>
               <FaAngleRight  color='red'  />
             </div>
        </div>


        <hr/>

<div onClick={()=>setShowModal4(true)} className='bg-white  flex  p-1 items-center justify-between'>
    <div>
    <h3 className=' text-sm text-black font-semibold'>Opening of new collection</h3>

    <p className='text-sm'>This message is a message with message intended for the intended message to be read by intended user for intended purposes only for intended use.... </p>

    </div>

     <div>
       <FaAngleRight  color='yellow'  />
     </div>
</div>
</div>


       
        
      </div>
    </div>
  )
}

export default Announcements
