// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const FirebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: "journalapp-90a04.firebaseapp.com",
  projectId: "journalapp-90a04",
  storageBucket: "journalapp-90a04.appspot.com",
  messagingSenderId: "1008495981701",
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(FirebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
