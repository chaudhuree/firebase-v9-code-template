import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

export default function DataStore() {
  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  // collection reference
  const collectionRef = collection(db, "movies");

  useEffect(() => {
    const unsub=onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      setMovieList(data);
    });
    return ()=>unsub();
  }, []);
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
    <div className="container text-center">
      <input type="text" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
      <button onClick={setMovie}>Add Movie</button>

      <div>
      Movie List:
      {movieList?.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
    </div>
  )
}
