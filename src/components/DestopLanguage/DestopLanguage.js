import React, { useState, useEffect } from 'react'
import { GrLanguage } from 'react-icons/gr';
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'
import { BsFillCheckCircleFill } from 'react-icons/bs';


const DestopLanguage = () => {

    const [active, setActive] = useState(false);

    const [change, setChange] = useState('en');

    const [changeLanguage, setChangeLanguage] = useState('Language');
    const languages = [

        {
            code: 'en',
            name: 'English',
            country_code: 'gb',
            image: require('../../assets/image/en.png')
        },

        {
            code: 'cn',
            name: 'Chinese',
            dir: 'rtl',
            country_code: 'sa',
            image: require('../../assets/image/ch.png')
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
        <div>
            <div class="relative inline-block text-left">
                <div>
                      {active===true ? <button onClick={() => setActive(false)} type="button" class="inline-flex  items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <GrLanguage /> {changeLanguage}
                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>: <button onClick={() => setActive(true)} type="button" class="inline-flex  items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <GrLanguage /> {changeLanguage}
                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>}
                   
                </div>

                {active === true ? <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1 p-3" role="none">

                        {languages.map(({ code, name, country_code, image }) => (
                            <>

                                <div onClick={() => {
                                    i18next.changeLanguage(code)

                                    setChange(code)
                                    setActive(false)
                                    setChangeLanguage(name)

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
                                        {/* <BsFillCheckCircleFill className=" text-green-800" /> */}
                                    </div>
                                </div>
                                <hr />
                            </>
                        ))}

                    </div>

                </div> : null}

            </div>

        </div>
    )
}

export default DestopLanguage