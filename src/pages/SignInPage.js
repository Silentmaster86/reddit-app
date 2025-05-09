// src/pages/SignInPage.js
import React from "react";
import styled from "styled-components";
import SignIn from "../features/auth/SignIn.js";
import Sidebar from "../components/Layout/Navbar.js";
import SoundBar from "../components/Layout/SoundBar.js";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  height: 100vh;
  background-color:rgba(175, 255, 251, 0.69);
`;

const Card = styled.div`
  background-color: #272729;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #d7dadc;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SignInPage = () => {
  return (
    <>
    <Navbar />
    <SoundBar />
    <Container>
      <Card>
        <Title>Sign In to Reddit Clone</Title>
        <SignIn />
      </Card>
    </Container>
    </>
  );
};

export default SignInPage;
