import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";

export default function RegisterUsingHook() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [
    createUserWithEmailAndPassword,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [
    signInWithEmailAndPassword,
  ] = useSignInWithEmailAndPassword(auth);
  const [signOut] = useSignOut(auth);
  const [signInWithGoogle,user] = useSignInWithGoogle(auth);
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await signOut();
      if(res){
        console.log("Sign out successful");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  if (user) {
    return (
      <div>
        <p>Registered User: {user.user.email}</p>
      </div>
    );
  }

  return (
    <div className="container">
    <p>Register Using Firebase Hook:</p>
      <div className="row mt-3">
        <div className="col-md-4 mb-3 input-group">
          <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div className="col-md-4 mb-3 input-group">
          <input type="password" className="form-control" value={password} onChange={e=> setPassword(e.target.value)}/>
        </div>
        <button
          className="btn btn-outline-success btn-block mb-2"
          onClick={() => createUserWithEmailAndPassword(email, password)}
        >
          Sign Up
        </button>
        <button
            type="submit"
            className="btn btn-outline-primary btn-block mb-2"
            onClick={()=> signInWithGoogle()}
          >
            Sign In With Google
          </button>
        <button
            type="submit"
            className="btn btn-outline-danger btn-block mb-2"
            onClick={logoutHandler}
          >
            Sign Out
          </button>
      </div>
      <p>Sign In Using Firebase Hook:</p>
      <div className="row mt-3">
        <div className="col-md-4 mb-3 input-group">
          <input type="email" className="form-control" value={signInEmail} onChange={e=>setSignInEmail(e.target.value)}/>
        </div>
        <div className="col-md-4 mb-3 input-group">
          <input type="password" className="form-control" value={signInPassword} onChange={e=> setSignInPassword(e.target.value)}/>
        </div>
        <button
          className="btn btn-outline-primary btn-block mb-2"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
