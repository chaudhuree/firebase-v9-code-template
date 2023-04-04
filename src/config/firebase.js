import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDw2SOEsCmooBdGRSqcdV1q58V-MAFqRE",
  authDomain: "fir-4april.firebaseapp.com",
  projectId: "fir-4april",
  storageBucket: "fir-4april.appspot.com",
  messagingSenderId: "127272966211",
  appId: "1:127272966211:web:094de066559c76f8e95cf6"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);
const storage = getStorage(firebase);
const provider = new GoogleAuthProvider();

export { db, auth, provider, storage };

