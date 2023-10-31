import React from 'react'
import NftProduct from '../../components/NftProduct/NftProduct'
import { CiSearch } from 'react-icons/ci'
import { t } from 'i18next'

const MarketPlace = ({mintNFT, set_choosedNFT}) => {
  return (
    <div>
      <div className='bg-[#F5F5F5] pt-12'>

      

      <NftProduct mintNFT={mintNFT} set_choosedNFT={set_choosedNFT}/>
      </div>
      
    </div>
  )
}

export default MarketPlace