// src/pages/SignUpPage.js
import React from "react";
import styled from "styled-components";
import SignUp from "../features/auth/SignUp.js";

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

const SignUpPage = () => {
  return (
    <Container>
      <Card>
        <Title>Create Your Account</Title>
        <SignUp />

    <Button
  type="button"
  style={{
    marginTop: "1rem",
    background: "#0079d3",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "5px",
    cursor: "pointer",
  }}
  onClick={() => window.open("https://www.reddit.com/register", "_blank")}
>
  Prefer Reddit? Sign Up on Reddit 🔗
</Button>

      </Card>
    </Container>
  );
};

export default SignUpPage;
