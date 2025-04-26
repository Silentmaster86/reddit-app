// src/features/auth/SignOut.js
import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import { clearAuth } from "./authSlice.js";

const SignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearAuth());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button onClick={handleSignOut} style={{
      background: '#ff4500',
      color: 'white',
      padding: '0.6rem 1rem',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}>
      Sign Out
    </button>
  );
};

export default SignOut;