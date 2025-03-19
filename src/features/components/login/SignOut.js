// src/components/SignOut.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

const SignOut = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Redirect to the home page or show a success message
      })
      .catch((err) => {
        // Handle errors here
      });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
