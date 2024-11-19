import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/4'>{overview}</p>
        <div>
            <button className='bg-white text-black p-2 px-12 w-30 text-xl rounded-md opacity-90 hover:bg-opacity-85' >▶︎Play</button>
            <button className='bg-gray-400 text-white p-2 px-12 w-30 text-xl rounded-md mx-2 opacity-70 hover:opacity-60'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;
