// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5w9fvCql3ysks52bj44Qx7KwQpqpEm9U",
  authDomain: "lets-talk-with-me.firebaseapp.com",
  projectId: "lets-talk-with-me",
  storageBucket: "lets-talk-with-me.appspot.com",
  messagingSenderId: "605435566064",
  appId: "1:605435566064:web:7fcde69af9d24c8b57ef35",
  measurementId: "G-J100Q0GHK3"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);

export{firebase ,db}