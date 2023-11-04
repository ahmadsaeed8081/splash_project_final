import React, { useState, useEffect } from 'react'
import {PiCopySimpleFill} from 'react-icons/pi';
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { CopyIcon } from "../../assets/icons/CopyIcon";
import ManualReferral from '../../components/manual refreal/ManualReferral';
import { Location, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';        
import {FiEdit} from 'react-icons/fi';
import { t } from 'i18next';
import Web3 from 'web3';
import { Axios } from 'axios';
import axios  from 'axios';
import {
  cont_address,
  cont_abi,
} from "../../components/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { upload } from '@testing-library/user-event/dist/upload';
const Profile = ({usdt_balance,myNfts ,manualRefree,set_manualRefree,reg_referral,isReferred,ref_from}) => {
  const notify = () => toast("Referral is Copied Successfully!");

  const [image,setImage] = useState('');
  const [name,setName] = useState('');

  const [refModal,showModal_ref] = useState(false);

  console.log(image);
  const [imageCrop,setImageCrop] = useState('');
  



const [preview ,setPreview] = useState({})
const { address, isConnected,isConnecting ,isDisconnected} = useAccount()

console.log(preview);
if(image){
  const reader = new FileReader()
   reader.readAsDataURL(image[0])
  reader.onload = () =>{
      setPreview(reader.result)
  }
}







  const [allNfts, set_allNfts] = useState([]);

  const data = [ ];
  let count=0;

async function mount(){
if(count>0)
{
  return;
}
count++;
const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com"));
  
  const contract = new web3.eth.Contract(cont_abi, cont_address);

  
  let referral_data = await contract.methods.get_myAllComissions().call({from: address});
  
  set_allNfts(referral_data)
}

useEffect(()=>{
  mount();
  },[])













useEffect(()=>{
  if(isConnected)
  {
    get_data(); 

  }
},[address])


async function upload()
{
  
  const res0 =await axios.get("https://slashapi-production.up.railway.app/get?"+ new URLSearchParams({
    userAddress: address,}));

  if(res0.data[0]!=undefined)
  {

    const data={userAddress:address, Name: name,image:preview}
    const res =await axios.patch("https://slashapi-production.up.railway.app/user/"+ res0.data[0]._id,data);

      console.log(res)
    alert("Profile is updated")
  }
  else{
    const data={userAddress:address, Name: name,image:preview}

    const res =await axios.post("https://slashapi-production.up.railway.app/add",data)
    alert("Profile is updated")

  }



}
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
    <div className=' w-full   mb-36  grid  grid-cols-1  md:grid-cols-1 gap-12'>
        <div className=' bg-[#FCD06D]   rounded-b-3xl p-5 py-12'> 

             <div className='mx-auto text-center'>
             <h2 className=' text-2xl text-white'>{t('My_Profile')}</h2>
             <div className='w-36  h-36 text-center  mx-auto my-5 border-2 border-yellow-500  mb-3 rounded-full  overflow-hidden'>

           
                <img 
                
         

                src={!preview?require('../../assets/image/logo.png'):preview} className='w-full h-full' />
              </div>

           <div className='mx-auto'>
           <input
           

           onChange={(e)=>setImage(e.target.files)}
      
           
           type='file'      />
           </div>
           <div>

          <input className=' bg-gray-200 my-3 flex py-3 px-5 justify-between items-center  rounded-2xl   w-52 mx-auto' type="text" value={name} onChange={(e)=>{
          setName(e.target.value)
          }} /> 

          {/* <FiEdit    /> */}
          <button className="primary-btn  my-3 disabled py-2" type="button" onClick={upload}   >Update</button>

          </div>  
           {/* <button className="primary-btn  my-3 disabled py-2" type="button" onClick={upload}   >Update Profile</button> */}
<br></br>



               

             {/* <p className=' mb-2'>0xdC45730-213u-daf-as</p> */}
            <button className='     bg-[#DA3D4D]  rounded-lg w-72 py-3 text-lg text-white'>{t('BALANCE')} : {usdt_balance/10**6} USDT</button>
             </div>

        </div>

        <div className=' w-[100%] sm:w-[50%] mx-auto  p-6 shadow-lg rounded-md'>
          
              <h1 className=' text-3xl'>{t('My Referral')}</h1>

              {/* <div className=' bg-white  mt-3  w-80 mx-auto'> */}
      
                  <div className=' border-yellow-500 rounded-lg border p-4  flex justify-between items-center'>
                      <p>{window.location.origin}/?ref={isConnected? (address.slice(0,4)+"...."+address.slice(38,42)):(null)}</p>

                      <CopyToClipboard text={`${window.location.origin}/?ref=${address}`} >
                        <button className="copy-icon flex items-center justify-center" onClick={notify}>
                          <PiCopySimpleFill color='orange' className=' text-2xl'  />
                        </button>

                      </CopyToClipboard>      
                  </div>
              {/* </div> */}

            {!isReferred?(
              <button className='primary-btn w-full mt-4 py-2' onClick={()=>showModal_ref(true)}   >{t('REGISTER UPLINER')}</button>


            ):(
                <>
                    <h1 className=' text-3xl'>{t('MY Upliner')}</h1>

                    <div style={{ marginTop:10 }} className=' border-yellow-500 rounded-lg border p-4  flex justify-between items-center'>
                        <p>{window.location.origin}/?ref={isConnected? (ref_from.slice(0,4)+"...."+ref_from.slice(38,42)):(null)}</p>

                        <CopyToClipboard text={`${window.location.origin}/?ref=${ref_from}`} >
                          <button className="copy-icon flex items-center justify-center" >
                        <PiCopySimpleFill color='orange' className=' text-2xl'  />
                        </button>
                              </CopyToClipboard>      
                        {/* <PiCopySimpleFill color='orange' className=' text-2xl'  /> */}
                    </div>        
                </>
              

            )}
              


        </div>
        <div className='  w-[100%] sm:w-[50%] mx-auto  p-6 shadow-lg rounded-md'>
        <div>
            <h1 className=' text-3xl'>{t('Commissions')}</h1>
              
<div className="pt-7">


        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full mb-0">
                {allNfts.length>0?(
                  <thead className="border-b bg-gray-50 rounded-t-lg text-center">
                    <tr>
                      <th
                        scope="col"
                        className="rounded-tl-lg text-black text-sm font-semibold px-6 md:px-12 py-4"
                      >
                        refree
                      </th>
                      <th scope="col" className="text-sm  text-black font-semibold  px-6 md:px-12 py-4">
                        Amount
                      </th>
                      
                      <th scope="col" className="text-sm text-black   font-semibold  px-6 md:px-12 py-4">
                        Time
                      </th>
                      <th
                        scope="col"
                        className="rounded-tr-lg text-sm font-medium px-6 py-4"
                      />
                    </tr>
                  </thead>
                ):(null)}
                  
                  <tbody>

{
  allNfts.length>0?(
    allNfts.map((item, index) => {

      return (

      <tr className="border-b">
        <th
          scope="row"
          className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center"
        >
          <div className="flex flex-row items-center justify-center">
            
            <div className="ml-4">
            <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
        <button className='bg-[#919191] text-black p-2  rounded-full'>{item[1].slice(0,5)+"..."+ item[1].slice(38,42)}</button>
        </td>                           
            </div>
          </div>
        </th>
        <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
        <div className="flex flex-row items-center justify-center">
            
            <div className="ml-4">
              <p className="mb-0.5 font-medium">{item[2]/10**6}</p>
             
            </div>
          </div>                     
        </td>
        <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
        <div className="flex flex-row items-center justify-center">
            
            <div className="ml-4">
              <p className="mb-0.5 font-medium">{item[0]}</p>
             
            </div>
          </div>                     
        </td>
        
      </tr>



    );
    })

  ):(

     <span>No commissions yet</span>

  )
}
                  {/* {allNfts.map((item, index) => {

                    return (

                    <tr className="border-b">
                      <th
                        scope="row"
                        className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center"
                      >
                        <div className="flex flex-row items-center justify-center">
                          
                          <div className="ml-4">
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                      <button className='bg-[#919191] text-black p-2  rounded-full'>{item[1].slice(0,5)+"..."+ item[1].slice(38,42)}</button>
                      </td>                           
                          </div>
                        </div>
                      </th>
                      <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-row items-center justify-center">
                          
                          <div className="ml-4">
                            <p className="mb-0.5 font-medium">{item[2]/10**6}</p>
                           
                          </div>
                        </div>                     
                      </td>
                      <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-row items-center justify-center">
                          
                          <div className="ml-4">
                            <p className="mb-0.5 font-medium">{item[0]}</p>
                           
                          </div>
                        </div>                     
                      </td>
                      
                    </tr>



                  );
                  })} */}
                  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

</div>
               



        </div>
        </div>

        <div className='  w-[100%] sm:w-[50%] mx-auto  p-6 shadow-lg rounded-md'>
        <div>
            <h1 className=' text-3xl'>My NFTs</h1>
          
<div className=' bg-white  mt-3  w-80 mx-auto'>

  <span >{t('TOTAL_VALUE')}</span>

  <div className="flex gap-2 my-2">
    <div  className=" flex justify-center items-center bg-gray-300 w-[30px] h-[30px] rounded-md ">
    <img  src={require('../../assets/image/tether.png')} width="20px" />
    </div>
    <h1 className="text-2xl">{Number(myNfts.length)*80}  USDT</h1>
  </div>
    
<div className=' border-yellow-500 rounded-lg border p-4  flex justify-between items-center'>
                {/* <p>{t('OWNED')}</p> */}
                <p>{myNfts.length}</p>

            </div>

            {/* <button className='primary-btn w-full py-2 mt-4'>{t('COPY INVITE')}</button> */}
</div>


        </div>
        </div>
        <ManualReferral showModal_ref={showModal_ref} refModal={refModal} manualRefree={manualRefree} set_manualRefree={set_manualRefree} reg_referral={reg_referral}/>
        <ToastContainer />

    </div>
  )
}

export default Profile