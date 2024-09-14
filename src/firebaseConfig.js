// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"; // If using Realtime Database
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
import {child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTyB6_uyyvkl7XZcwZ3R4J4IEHYI93m_s",
  authDomain: "playlist-manager-661b3.firebaseapp.com",
  projectId: "playlist-manager-661b3",
  storageBucket: "playlist-manager-661b3.appspot.com",
  messagingSenderId: "64938321895",
  appId: "1:64938321895:web:ea0c8ee79ff5e420133f42",
  measurementId: "G-Y0B3244YMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // For Realtime Database
const firestore = getFirestore(app); // For Firestore
const analytics = getAnalytics(app);

const dbRef = ref(getDatabase());

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'user/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
  console.log("Data added",database);
}

writeUserData(13,"Bitu","bk@gmail.com","http://local")


export { app, database, firestore };