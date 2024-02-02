import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAANkKHVD9GYQMdoEyJhZ28pl3ieKFP3k",
  authDomain: "reliant-rs-63bc6.firebaseapp.com",
  projectId: "reliant-rs-63bc6",
  storageBucket: "reliant-rs-63bc6.appspot.com",
  messagingSenderId: "148028614918",
  appId: "1:148028614918:web:ee39ef3087fd777b845687"
};

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)
  export const storage = getStorage(app);
  export const auth = getAuth(app);