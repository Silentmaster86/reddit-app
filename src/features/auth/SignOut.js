// src/features/auth/SignOut.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import { logout } from "./authSlice.js";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = useSelector((state) => state.auth.provider); // reddit | firebase

  const handleSignOut = async () => {
    try {
      if (provider === "firebase") {
        await signOut(auth); // Sign out Firebase user
      }

      if (provider === "reddit") {
        localStorage.removeItem("reddit_access_token"); // Remove Reddit token
      }

      dispatch(logout()); // Reset Redux state
      navigate("/"); // Redirect
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        background: "#ff4500",
        color: "white",
        padding: "0.6rem 1rem",
        border: "none",
        borderRadius: "4px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOut;
