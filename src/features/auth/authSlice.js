import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem("reddit_access_token");

const initialState = {
  isAuthenticated: !!storedToken, // If token exists, consider user authenticated
  accessToken: storedToken,
  user: null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("reddit_access_token", action.payload.accessToken);
      // Store only serializable data from the user object
      state.user = action.payload.user
        ? {
        uid: action.payload.user.uid, // Storing only UID
        email: action.payload.user.email, // Storing email (if needed)
        displayName: action.payload.user.displayName, // Storing displayName (if needed)
      } : null
    },
    setUser: (state, action) => {
      // Storing only serializable data
      state.user = {
        uid: action.payload.uid || null,
        email: action.payload.email || null,
        displayName: action.payload.displayName || null,
      };
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem("reddit_access_token"); // Remove token on logout
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("reddit_access_token", action.payload);
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("reddit_access_token");
    }
  },
});

export const { setAuth, setUser, clearUser, setAccessToken, clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
