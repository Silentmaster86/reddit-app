import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { setAuth } from './features/auth/authSlice.js'; // Import setAuth

const AuthObserver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          isAuthenticated: true,
          accessToken: localStorage.getItem("reddit_access_token"),
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
        };
        dispatch(setAuth(userData));
      } else {
            dispatch(setAuth({
              isAuthenticated: false,
              accessToken: null,
              user: null,
        }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthObserver;
