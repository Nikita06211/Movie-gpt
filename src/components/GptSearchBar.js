import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
  return (
    <div className='pt-[10%] flex justify-center'>
      <form className=' bg-white border-4 border-black w-1/2 grid grid-cols-12 rounded-full'>
        <input className='p-4 m-1 col-span-10 rounded-full text-lg' type="text" placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='bg-red-700 text-white col-span-2 py-2 px-4 rounded-full text-lg'>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar;
