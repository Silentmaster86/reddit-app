// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
  color: #fff;
  text-align: center;
  padding: 2rem;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <h1>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/" style={{ color: "#61dafb", marginTop: "1rem", display: "inline-block" }}>
        Go Back Home
      </Link>
    </Wrapper>
  );
};

export default NotFound;
