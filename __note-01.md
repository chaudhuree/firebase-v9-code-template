> how we do this before in firebase config

```
 import firebase from "firebase";
 const firebaseConfig = {

 };
 const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const storage = firebase.storage();
 const provider = new firebase.auth.GoogleAuthProvider()
 export { db, auth, provider, storage };
```

## collection means in mongodb --> model
