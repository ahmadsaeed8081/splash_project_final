
import { useState } from 'react'
import Accordion from '../../components/Accordion/Accordion';
import { t } from 'i18next';
  
const Faq = () => {
    const [accordions, setAccordion] = useState([
        {
            key: 1,
            title:t('What is Slash?'),
            data:t('splashText2'),
            isOpen: false
        },
        {
            key: 2,
            title:t('text2'),
            data:t('splashText3'),
            isOpen: false
        },
        {
            key: 3,
            title:t('text3'),
            data:t('splashText3'),
            isOpen: false
        },
    ]);
  
    const toggleAccordion = (accordionkey) => {
        const updatedAccordions = accordions.map((accord) => {
            if (accord.key === accordionkey) {
                return { ...accord, isOpen: !accord.isOpen };
            } else {
                return { ...accord, isOpen: false };
            }
        });
  
        setAccordion(updatedAccordions);
    };
  
    return (<>
     <div className='container mx-auto py-16 mb-7'>
     <h2 className='text-3xl mb-2 mx-auto   text-black pl-4 font-semibold'>{t('questions')}</h2>
 
        <div className=' container shadow-md rounded-2xl mx-auto mt-12 py-8'>
       
            <div className="p-2 m-8 w-[70%] mx-auto ">
            
                {accordions.map((accordion) => (
                    <Accordion
                        key={accordion.key}
                        title={t(accordion.title)}
                        data={t(accordion.data)}
                        isOpen={accordion.isOpen}
                        toggleAccordion={() => toggleAccordion(accordion.key)}
                    />
                ))}
            </div>
        </div>
        </div>

        <div className='container mx-auto  mb-24'>
     <h2 className=' text-3xl mb-2 mx-auto pl-4  text-black  font-semibold'>{t('center')}</h2>
 
        <div className=' container shadow-md rounded-2xl mx-auto mt-12 py-8 mb-20'>
       
            <div className="p-2 m-8 w-[70%] mx-auto ">
            
                {accordions.map((accordion) => (
                    <Accordion
                        key={accordion.key}
                        title={t(accordion.title)}
                        data={accordion.data}
                        isOpen={accordion.isOpen}
                        toggleAccordion={() => toggleAccordion(accordion.key)}
                    />
                ))}
            </div>
        </div>
        </div>
        </>
    );
};
  
export default Faq;