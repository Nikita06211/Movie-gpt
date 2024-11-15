import React from 'react';
import Header from './Header';
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = ()=>{
        const message = checkValidData(email.current.value,password.current.value);
        setErrorMessage(message);

        if(message) return;
        
        if(!isSignInForm){
            // signup logic
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/120494269?v=4"
                    }).then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;

                        dispatch(addUser({uid: uid, email:email, displayName: displayName, photoURL: photoURL}));
          
                        navigate("/browse");
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });                    
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                });
        }
        else{
            signInWithEmailAndPassword(auth,email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                });
            }
    }

  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img className = 'w-full' src="https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_medium.jpg" alt="img" />
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className=' w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up" }</h1>
            {!isSignInForm && <input
                ref={name}
                type='text' 
                placeholder='Full Name' 
                className='p-4 my-4 w-full bg-gray-800 rounded-md'
            />}
            <input
                ref={email}
                type='text' 
                placeholder='Email or mobile number' 
                className='p-4 my-4 w-full bg-gray-800 rounded-md'
            />
            <input 
                ref={password}
                type="text"
                placeholder='Password' 
                className='p-4 my-4 w-full bg-gray-800 rounded-md' 
            />
            <p className='text-red-500 text-sm py-2'>{errorMessage}</p>
            <button onClick={handleButtonClick} className='p-4 my-4 bg-red-600 text-white font-semibold rounded-md w-full'>{isSignInForm ? "Sign In" : "Sign Up" }</button>
            <p className='p-4 my-4 text-md cursor-pointer' onClick={toggleSignInForm}>{ isSignInForm?"New to Netflix? Sign Up now": "Already a user? Sign In now"}</p>
        </form>
    </div>
  )
}

export default Login
