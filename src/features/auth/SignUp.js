// src/features/auth/SignUp.js
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";


const Form = styled.form`
  max-width: 400px;
  margin: 5rem auto;
  background: #1a1a1b;
  color: #d7dadc;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #343536;
  border-radius: 5px;
  background: #1a1a1b;
  color: #d7dadc;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #ff4500;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #e03d00;
  }
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      
dispatch(loginFirebase({ accessToken, user: { uid: user.uid, email: user.email, displayName: user.displayName } }))
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <Form onSubmit={handleSignUp}>
        <Title>Sign Up</Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Create Account</Button>
      </Form>
  );
};

export default SignUp;
