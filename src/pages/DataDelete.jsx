import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function DataShow() {
  const [movieList, setMovieList] = useState([]);
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

  const deleteDocument = async (id) => {
    try {
      const docFile =doc(db, "movies", id);
      await deleteDoc(docFile);
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
          <button onClick={() => deleteDocument(movie?.id)}>delete</button>
        </div>
      ))}
    </div>
  )
}
