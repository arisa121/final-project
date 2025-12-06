// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmFBQZMywC85DCm6SExMJTd-eje06KE78",
  authDomain: "final-project-d2289.firebaseapp.com",
  projectId: "final-project-d2289",
  storageBucket: "final-project-d2289.firebasestorage.app",
  messagingSenderId: "690459773914",
  appId: "1:690459773914:web:9202c36e51b3968babcee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);