> ## orderBy er jonne DataShowUsingQuery.js file e dekhte hobe. comments kora ase instructions ti.

## firestore rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
     allow read: if true; //everyone can read
     allow update, delete: if request.auth !=null;
      //only authenticated users can update or delete
     allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      //only authenticated users can create a document if the userId in the document matches the authenticated user's uid. as i have passed the userId in the data.means each movie.document will have a userId property.
  }
  }
}
```

## firebase query demo

```
import { getFirestore, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

const db = getFirestore();

// Query to get all documents in a collection
const queryAllDocuments = async () => {
  const documents = [];
  const querySnapshot = await getDocs(collection(db, "collection_name"));
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};

// Query to get a specific document in a collection by ID
const queryDocumentById = async (id) => {
  const docRef = collection(db, "collection_name", id);
  const docSnapshot = await getDocs(docRef);
  if (docSnapshot.empty) {
    console.log("No such document!");
    return null;
  }
  // Do something with the data
  return { id: docSnapshot.id, data: docSnapshot.data() };
};

// Query to get documents in a collection that match a specific condition
const queryDocumentsByCondition = async () => {
  const documents = [];
  const q = query(collection(db, "collection_name"), where("field", "==", "value"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};

// Query to order documents in a collection by a specific field
const queryDocumentsOrderByField = async () => {
  const documents = [];
  const q = query(collection(db, "collection_name"), orderBy("field_name"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};

// Query to limit the number of documents returned from a collection
const queryDocumentsWithLimit = async (limitNumber) => {
  const documents = [];
  const q = query(collection(db, "collection_name"), limit(limitNumber));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};

// Query to combine multiple conditions
const queryDocumentsWithMultipleConditions = async () => {
  const documents = [];
  const q = query(
    collection(db, "collection_name"),
    where("field1", "==", "value1"),
    where("field2", "==", "value2"),
    orderBy("field3"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};

//Query to use array-contains
const queryDocumentsWithArrayContains = async () => {
  const documents = [];
  const q = query(collection(db, "collection_name"), where("field", "array-contains", "value"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};
//here field is an array and value is an element of that array. like, field: religion, value: islam.

//Query to use array-contains-any
const queryDocumentsWithArrayContainsAny = async () => {
  const documents = [];
  const q = query(collection(db, "collection_name"), where("field", "array-contains-any", ["value1", "value2"]));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};

//Query to use in
const queryDocumentsWithIn = async () => {
  const documents = [];
  const q = query(collection(db, "collection_name"), where("field", "in", ["value1", "value2"]));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};
// field is an array. value is an array of elements of that array. like, field: religion, value: [islam, christianity]

//Query to use not-in
const queryDocumentsWithNotIn = async () => {
  const documents = [];
  const q = query(collection(db, "collection_name"), where("field", "not-in", ["value1", "value2"]));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // Do something with the data
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};

//Query to use OR
const q = query(citiesRef,
  or(where('capital', '==', true),
     where('population', '>=', 1000000)
  )
);

//Query to use AND
const q = query(citiesRef,
  and(where('capital', '==', true),
      where('population', '>=', 1000000)
  )
);


// combine and or
const q = query(citiesRef,
  or(and(where('capital', '==', true),
         where('population', '>=', 1000000)),
     where('country', '==', 'USA')
  )
);

const q = query(collection(db, "cities"), and(
  where('state', '==', 'CA'),
  or(
    where('capital', '==', true),
    where('population', '>=', 1000000)
  )
));
```
