import React from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeUser, addUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const Header = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;

        dispatch(addUser({uid: uid, email:email, displayName: displayName, photoURL: photoURL}));
        
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser);
        navigate("/");
      }
    });

    
    // unsubscribe when component unmounts
    return () => unsubscribe();

  },[]);

  const handleSignOut=()=>{
    signOut(auth).then(() => {

    }).catch((error) => {
      navigate("/error");
    });
  }

  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src={LOGO}
      alt='logo'/>
      {user && <div className='flex p-2'>
        <img 
          className='w-12 h-12 '
          src = {user?.photoURL}
          alt="user icon"
        />
        <button onClick={handleSignOut} className='text-white font-bold'>Sign Out</button>
      </div>}
    </div>
  )
}

export default Header
