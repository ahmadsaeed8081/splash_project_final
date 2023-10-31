import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import NftProduct from '../../components/NftProduct/NftProduct'
import Hero from '../../components/hero/Hero'
import Loader from '../../components/Loader/Loader'
import LatestNfts from '../LatestNfts/LatestNfts'

const Home = ({mintNFT,set_choosedNFT,mintedNfts}) => {


  return (
    <div>
        <Hero/>
        <div className='bg-[#F5F5F5]'>

        <LatestNfts mintedNfts={mintedNfts}/>
        <NftProduct mintNFT={mintNFT} mintedNfts={mintedNfts} set_choosedNFT={set_choosedNFT}/>
        </div>



        
        
    </div>
  )
}

export default Home