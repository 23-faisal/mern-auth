// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-8ff91.firebaseapp.com",
  projectId: "mern-auth-8ff91",
  storageBucket: "mern-auth-8ff91.appspot.com",
  messagingSenderId: "983586481943",
  appId: "1:983586481943:web:5f89361ba9fe70129ef952",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
