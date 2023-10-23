// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth, signOut,signInWithPopup,GoogleAuthProvider,setPersistence,browserLocalPersistence} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-gikTA_ygtsR5alikr0CEnL7OJ1DzSc8",
  authDomain: "weather-f45d8.firebaseapp.com",
  projectId: "weather-f45d8",
  storageBucket: "weather-f45d8.appspot.com",
  messagingSenderId: "6446674052",
  appId: "1:6446674052:web:220fec630f2214454552d1",
  measurementId: "G-K583YQ3DVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth(app);
const googleAuthProvider= new GoogleAuthProvider();

export  {auth,signInWithPopup,googleAuthProvider,analytics,signOut,setPersistence,browserLocalPersistence};