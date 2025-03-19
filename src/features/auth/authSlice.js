import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
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
      // Store only serializable data from the user object
      state.user = {
        uid: action.payload.user.uid, // Storing only UID
        email: action.payload.user.email, // Storing email (if needed)
        displayName: action.payload.user.displayName, // Storing displayName (if needed)
      };
    },
    setUser: (state, action) => {
      // Storing only serializable data
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
      };
            state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
