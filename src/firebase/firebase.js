// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0VS12oVNF42SJ_FE2ZskBIlyqxBJTtJg",
  authDomain: "ozharvest-bb1f1.firebaseapp.com",
  projectId: "ozharvest-bb1f1",
  storageBucket: "ozharvest-bb1f1.appspot.com",
  messagingSenderId: "113912214356",
  appId: "1:113912214356:web:47a48267ec078d1f614ec1",
  measurementId: "G-ZWH07YNTDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };