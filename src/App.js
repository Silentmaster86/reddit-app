import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice.js";
import AuthObserver from "./features/auth/Authobserver.js";
import AppRoutes from "./routes/AppRoutes.js";
import Navbar from "./components/Layout/Navbar.js";
import SoundBar from "./components/Layout/SoundBar.js";
import "./styles/App.css";
import styled from "styled-components";


const Layout = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Router>
      <AuthObserver />
      <Navbar />
      <SoundBar />
      <AppRoutes />    
    </Router>
  );
}

export default App;
