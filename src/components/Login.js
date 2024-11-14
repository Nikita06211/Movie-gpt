import React from 'react';
import Header from './Header';
import { useState } from 'react';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    }

  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img className = 'w-full' src="https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_medium.jpg" alt="img" />
        </div>
        <form className=' w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up" }</h1>
            {!isSignInForm && <input
                type='text' 
                placeholder='Full Name' 
                className='p-4 my-4 w-full bg-gray-800 rounded-md'
            />}
            <input
                type='text' 
                placeholder='Email or mobile number' 
                className='p-4 my-4 w-full bg-gray-800 rounded-md'
            />
            <input 
                type="text"
                placeholder='Password' 
                className='p-4 my-4 w-full bg-gray-800 rounded-md' 
            />
            <button className='p-4 my-4 bg-red-600 text-white font-semibold rounded-md w-full'>{isSignInForm ? "Sign In" : "Sign Up" }</button>
            <p className='p-4 my-4 text-md cursor-pointer' onClick={toggleSignInForm}>{ isSignInForm?"New to Netflix? Sign Up now": "Already a user? Sign In now"}</p>
        </form>
    </div>
  )
}

export default Login
