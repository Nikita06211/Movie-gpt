// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import {apiKey} from "../../.env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflixgpt-66102.firebaseapp.com",
  projectId: "netflixgpt-66102",
  storageBucket: "netflixgpt-66102.firebasestorage.app",
  messagingSenderId: "1091031413515",
  appId: "1:1091031413515:web:69bd4b731e02dca7f6e80e",
  measurementId: "G-HX7T29ND30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();