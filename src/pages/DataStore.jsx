import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../config/firebase";

export default function DataStore() {
  const [movieTitle, setMovieTitle] = useState("");
  // collection reference
  const collectionRef = collection(db, "movies");


  const setMovie = async () => {
    try {
      if(!movieTitle) return alert("Please enter a movie title");
      const docRef = await addDoc(collectionRef, {
        title: movieTitle,
        userId: auth?.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
      setMovieTitle("");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  


  return (
    <div>
      <input type="text" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
      <button onClick={setMovie}>Add Movie</button>
    </div>
  )
}
