import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function DataShowUsingQuery() {
  const [movieList, setMovieList] = useState([]);
  // collection reference
  const collectionRef = collection(db, "movies");
  //  building query 
  const q = query(collectionRef, where("title", "==", "The Avengers"), orderBy("createdAt", "desc"));
  const q2 = query(collectionRef, where("title", "==", "The Avengers"),limit(1));



  // where takes 3 arguments: field, operator, value
  // field: the field you want to query like title,
  // operator: the operator you want to use like ==, >, <, >=, <=, !=, array-contains, array-contains-any, in, not-in, etc.
  // value: the value you want to compare with the field

  // note: orderBy korar time a first time a console a error dekhabe. so then console a error a j red link ta thakbe oitay click kore firebase indexing page a nea jabe. then oikhan theke enable kore dite hobe.

  // the message is like this:
  // "The query requires an index. You can create it here: https://console.firebase.google.com/project/your-project-id/firestore/indexes?create_index=your-collection-id"
  //ref: https://firebase.google.com/docs/firestore/query-data/queries


  
  useEffect(() => {
    // getMovieList();
    getSnapshot();
  }, []);


  // realtime data showing
  const getSnapshot = () => {
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      setMovieList(data);
    });
  }


  return (
    <div>
      Movie List:
      {movieList?.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  )
}
