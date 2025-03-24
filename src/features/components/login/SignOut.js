// src/components/SignOut.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase.js';
import { useNavigate } from 'react-router-dom'; // Use history to redirect after sign out
import { useDispatch } from 'react-redux';
import { clearUser } from '../../auth/authSlice.js'; // Import clearUser

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase or your OAuth provider
      dispatch(clearUser()); // Update authentication state
      navigate('/signin'); // Redirect to the sign-in page after logging out
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
