// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../firebase.js'; // Import Firebase auth service
import { onAuthStateChanged } from 'firebase/auth'; // Firebase method to listen for auth state changes

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  return user; // Return the current user or null if not authenticated
};
