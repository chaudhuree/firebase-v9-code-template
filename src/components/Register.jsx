import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth, provider } from "../config/firebase";

export default function Register() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await signOut(auth);
      if(res){
        alert("Sign out successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(auth?.currentUser?.email);

  return (
    <div className="container">
      <p>Register Using Vanilla Firebase:</p>
      <div className="row mt-3">
          
          <div className="col-md-4 mb-3 input-group">
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3 input-group">
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button
            type="submit"
            className="btn btn-outline-success btn-block mb-2"
            onClick={signUpHandler}
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="btn btn-outline-primary btn-block mb-2"
            onClick={() => signInWithPopup(auth, provider)}
          >
            Login In With Google
          </button>
          <button
            type="submit"
            className="btn btn-outline-danger btn-block mb-2"
            onClick={signOutHandler}
          >
            Sign Out
          </button>

      </div>
    </div>
  );
}
