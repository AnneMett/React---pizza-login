// Kræver installation "npm install firebase"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6ScZtymKbjX8ZpXk00eTlZ_G5qGPM-04",
  authDomain: "loginproj-2ef0d.firebaseapp.com",
  projectId: "loginproj-2ef0d",
  storageBucket: "loginproj-2ef0d.appspot.com",
  messagingSenderId: "921133593576",
  appId: "1:921133593576:web:e74032d30bd1b272122a5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
