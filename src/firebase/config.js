import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB7eiDvRatA2UW62yzXEO7_MRtEupiE1bg",
    authDomain: "beyondfinance-b21b9.firebaseapp.com",
    projectId: "beyondfinance-b21b9",
    storageBucket: "beyondfinance-b21b9.appspot.com",
    messagingSenderId: "287936835544",
    appId: "1:287936835544:web:53038778dcf9f0ff4a0cad"
  };

// init firebase
const app = initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const projectAuth = getAuth()

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);


export{ db, projectAuth, storage }