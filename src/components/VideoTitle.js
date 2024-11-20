import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-12 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-7xl font-bold my-2'>{title}</h1>
        <p className='py-6 text-xl w-2/5 mt-4 '>{overview}</p>
        <div>
            <button className='bg-white text-black p-4 px-12 w-30 text-2xl rounded-md opacity-90 my-4 hover:bg-opacity-85' >▶︎Play</button>
            <button className='bg-gray-400 text-white p-4 px-12 w-30 text-2xl rounded-md mx-2 opacity-80 my-4 hover:opacity-60'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;
