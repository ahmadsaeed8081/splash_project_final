import React, { useState ,useEffect} from "react";
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {GrClose} from 'react-icons/gr'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'

export default function LanguageModal({ visible2, onClose2 }) {


    const [change,setChange] = useState('en')
    const languages = [
        
        {
          code: 'en',
          name: 'English',
          country_code: 'gb',
          image:require('../../assets/image/en.png')
        },
        
        {
          code: 'cn',
          name: 'Chinese',
          dir: 'rtl',
          country_code: 'sa',
          image:require('../../assets/image/ch.png')
        },
      ]
      



      const currentLanguageCode = cookies.get('i18next') || 'en'
      const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
      const { t } = useTranslation()
    
      const releaseDate = new Date('2021-03-07')
      const timeDifference = new Date() - releaseDate
      const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    
      useEffect(() => {
        console.log('Setting page stuff')
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
      }, [currentLanguage, t])




    const [tabs, setTabs] = useState('qr')

    if (!visible2) return null


    const handleClose2 = (e) => {

        if (e.target.id === "container") onClose2();
    }



    return (
        <div

            id="container"

            onClick={handleClose2} className="fixed  z-50 inset-0 bg-[#303439] bg-opacity-80 flex items-center justify-center">

            <div className=" w-[90%]  bg-white p-6 rounded-xl">
           
            <div className=" flex justify-between items-center">
               <i onClick={onClose2}  className="cursor-pointer" > <GrClose size={25}    /> </i>
            <h1 className=" text-black font-semibold text-xl">{t('language')}</h1>
            <span></span>
            </div>
        
                  
                  <div className=" border rounded-xl border-red-800 p-5 mt-10">

                  {languages.map(({ code, name, country_code,image}) => (
<>

<div  onClick={() => {
                      i18next.changeLanguage(code)

                      onClose2()
                      setChange(code)
                      
                    }} className="flex items-center my-3 justify-between">
                        <div className="flex items-center gap-5">
                            <div className="bg-gray-300 w-8 h-8 rounded-md ">
                              <img src={image} alt="" />
                            </div>
                            <div>
                                <h2>{name}</h2>
                            </div>
                        </div>
                        <div>
<BsFillCheckCircleFill className=" text-green-800" />
                        </div>
                    </div>
                     <hr/>
</>
                  ))}
                  
                  

                  </div>
                
                    

            </div>
        </div>
    );
}