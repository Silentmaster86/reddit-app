// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import postsReducer from '../features/posts/postsSlice.js';
import usersReducer from '../features/users/userSlice.js';
// Add other slices here as needed

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    // search: searchReducer (optional if you have one),
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(yourCustomMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
