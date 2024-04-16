import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyCm8ePOTLaZS2LsO9sUE5fSGYWIbD-1-PQ",
  authDomain: "todo-app-dbd69.firebaseapp.com",
  projectId: "todo-app-dbd69",
  storageBucket: "todo-app-dbd69.appspot.com",
  messagingSenderId: "575906417294",
  appId: "1:575906417294:web:ce027d2c0b3a83176297df"
});

const db = firebaseApp.firestore();
export default db;