import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-12 absolute text-white bg-gradient-to-r from-black'>
        <h1 className=' text-2xl md:text-6xl font-bold my-1'>{title}</h1>
        <p className='hidden md:inline-block py-4 text-xl w-2/5 mt-4 '>{overview}</p>
        <div >
            <button className='bg-white text-black p-2 px-5 text-xl md:p-4 md:px-12 md:w-30  md:text-2xl rounded-md opacity-90 my-4 hover:bg-opacity-85' >▶︎Play</button>
            <button className='bg-gray-400 text-white p-2 px-5 text-xl md:p-4 md:px-12  md:w-30 md:text-2xl rounded-md mx-2 opacity-80 my-4 hover:opacity-60'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;
