import {
  collection,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function DataUpdate() {
  const [movieList, setMovieList] = useState([]);
  const [update, setUpdate] = useState("");
  // collection reference
  const collectionRef = collection(db, "movies");

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    try {
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      setMovieList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (id) => {
    try {
      const docFile = doc(db, "movies", id);
      await updateDoc(docFile, {
        title: update
      });
      setUpdate("");
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Movie List:
      {movieList?.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <input type="text" placeholder="update it.." onChange={e => setUpdate(e.target.value)} />

          <button onClick={() => updateData(movie?.id)}>update it</button>
        </div>
      ))}

    </div>
  )
}
