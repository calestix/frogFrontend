import React from 'react'
import { useLanguage } from '../context/LanguageContext';
import { getDictionary } from '../lib/dictionary';

function Overview() {
    const { locale } = useLanguage();
      const dict = getDictionary(locale);
       const lang=dict;
  return (
    <div className='text-center py-18 px-20'>
        <div className='flex justify-center'>
        <h3 className='heading'>{lang.overviewText}</h3>
        </div>
        <p className='text-center pt-6 text-white'>{lang.overview}</p>
    </div>
  )
}

export default Overview