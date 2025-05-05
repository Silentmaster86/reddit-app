// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  provider: null, // 'firebase' | 'reddit' | null
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // For Firebase login
    loginFirebase(state, action) {
      state.isAuthenticated = true;
      state.provider = "firebase";
      state.user = {
        id: action.payload.uid,
        email: action.payload.email,
        name: action.payload.displayName,
        avatar: action.payload.photoURL,
      };
    },
    // For Reddit OAuth login
    loginReddit(state, action) {
      const { accessToken, user } = action.payload;
      state.isAuthenticated = true;
      state.provider = "reddit";
      state.user = {
        id: user.id,
        name: user.name,
        avatar: user.icon_img || null, // 👈 avatar from Reddit
        accessToken,
      };
    },
    // Logout
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.provider = null;
      localStorage.removeItem("reddit_access_token");
    },
  },
});

// Export actions
export const { loginFirebase, loginReddit, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
