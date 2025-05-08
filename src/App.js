// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./context/ThemeContext.js";
import { fetchPosts } from "./features/posts/postsSlice.js";
import AuthObserver from "./features/auth/Authobserver.js";
import AppRoutes from "./routes/AppRoutes.js";
import Navbar from "./components/Layout/Navbar.js";
import SoundBar from "./components/Layout/SoundBar.js";
import "./styles/App.css";

const AppContent = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme(); // from ThemeContext

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <StyledThemeProvider theme={theme}>
      <Router>
        <AuthObserver />
        <AppRoutes />
      </Router>
    </StyledThemeProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
