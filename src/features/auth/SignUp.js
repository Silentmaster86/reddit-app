// src/features/auth/SignUp.js
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { loginFirebase } from "./authSlice.js";

// Styled Components
const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 5rem auto;
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

const TogglePassword = styled.button`
  background: none;
  border: none;
  color: #0079d3;
  cursor: pointer;
  margin-top: -0.75rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
  }
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

const ErrorText = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(
        loginFirebase({
          uid: user.uid,
          email: user.email,
        })
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSignUp}>
      <Title>Sign Up</Title>

      {error && <ErrorText>{error}</ErrorText>}

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <TogglePassword type="button" onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? "Hide Password" : "Show Password"}
      </TogglePassword>

      <Button type="submit">Create Account</Button>
    </Form>
  );
};

export default SignUp;
