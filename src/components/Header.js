import React from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeUser, addUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);

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

  const handleGptSearch = ()=>{
    dispatch(toggleGptSearchView());
  }


  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src={LOGO}
      alt='logo'/>
      {user && <div className='flex p-2'>
        {showGptSearch && <select className='p-2 my-2 bg-slate-800 text-white rounded-md text-lg' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}
        {!showGptSearch && <button onClick={handleGptSearch} className='py-2 px-4 m-2 mx-8 bg-gray-200 rounded-md text-black text-lg font-semibold'>Smart Search ⌕</button>}
        {showGptSearch && <button onClick={handleGptSearch} className='py-2 px-4 m-2 mx-8 bg-gray-200 rounded-md text-black text-lg font-semibold'>Home</button>}
        <img 
          className='w-12 h-12 '
          src = {user?.photoURL}
          alt="user icon"
        />
        <button onClick={handleSignOut} className='text-white bg-slate-800 p-2 m-2 rounded-md'>Sign Out</button>
      </div>}
    </div>
  )
}

export default Header
