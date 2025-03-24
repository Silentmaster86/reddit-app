import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem("reddit_access_token");

const initialState = {
  isAuthenticated: storedToken ? true : false, // Check if token exists
  user: null,
  accessToken: storedToken,
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
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem("reddit_access_token"); // Remove token on logout
    }
  },
});

export const { setAuth, clearUser } = authSlice.actions;
export default authSlice.reducer;
