// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-yuQSfBAnC05_mvTv98H4U57CnV6Ajbo",
  authDomain: "lavvr-355705.firebaseapp.com",
  projectId: "lavvr-355705",
  storageBucket: "lavvr-355705.appspot.com",
  messagingSenderId: "207958230794",
  appId: "1:207958230794:web:e05ff7cab2258a3489dcf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);