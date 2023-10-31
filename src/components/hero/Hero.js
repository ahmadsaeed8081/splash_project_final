import React,{useState,useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'
const Hero = () => {



  const languages = [
        
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    
    {
      code: 'cn',
      name: 'Chinese',
      dir: 'rtl',
      country_code: 'sa',
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


  return (
    <div  className="bg-cover  bg-fixed bg-center   justify-center  items-center flex  md:h-[80vh]   h-[60vh] w-full hero" style={{backgroundImage:`url(${require('../../assets/image/bg.jpg')})`}} >
        <div className=' container mx-auto px-6 md:px-24'>
            <h1 className='md:text-[60px] text-[40px]  text-white font-bold'> {t('hero_title')} <br/> {t('sub_title')}</h1>

            <div className=' flex gap-6 mt-10'>
                <button className='success-btn'>{t('EXPLORE')}</button>
                <button className='secondary-btn'>{t('BUY NOW')}</button>
            </div>
        </div>
    </div>
  )
}

export default Hero