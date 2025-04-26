// src/features/auth/AuthObserver.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { loginFirebase, logout } from "./authSlice.js";

const AuthObserver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ User logged in via Firebase
        dispatch(loginFirebase(user));
      } else {
        // ✅ No user logged in
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthObserver;
