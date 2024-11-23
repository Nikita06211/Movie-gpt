import React from 'react';
import Header from './Header';
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
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
                    displayName: name.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;

                        dispatch(addUser({uid: uid, email:email, displayName: displayName, photoURL: photoURL}));
          
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
            <img className = 'w-full' src={BG_URL} alt="img" />
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
