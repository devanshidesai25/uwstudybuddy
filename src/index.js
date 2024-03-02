import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDduc1FAgFcKJ9d6MxhTyDIg3orpTlBkkk",
  authDomain: "uw-studybuddy.firebaseapp.com",
  projectId: "uw-studybuddy",
  storageBucket: "uw-studybuddy.appspot.com",
  messagingSenderId: "772681900016",
  appId: "1:772681900016:web:464a5a1c01dafad5564735"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(
  document.getElementById('root')
).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
);