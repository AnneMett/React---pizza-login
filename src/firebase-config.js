// Kræver installation "npm install firebase"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcYlKXyG8R3Kc7bGC_1WiZMtiGFSykIKg",
  authDomain: "pizzaprojects.firebaseapp.com",
  databaseURL: "https://pizzaprojects-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pizzaprojects",
  storageBucket: "pizzaprojects.appspot.com",
  messagingSenderId: "363685546437",
  appId: "1:363685546437:web:032409c320dd43c732e3ac"
}; 


/* user@pizza.dk 
password */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
