// src/features/auth/SignIn.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { loginFirebase } from "./authSlice.js";
import { getLoginUrl } from "../../api/reddit.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  padding: 2rem;
`;

const Form = styled.form`
  background: #1a1a1b;
  padding: 2rem;
  border-radius: 8px;
  color: #fff;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: none;
  background: #272729;
  color: #fff;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 4px;
  background: #ff4500;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #e03d00;
  }
`;

const Divider = styled.hr`
  margin: 2rem 0;
  border: 1px solid #333;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Handle Firebase Email Sign In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginFirebase({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }));
      navigate("/");
    } catch (error) {
      console.error("❌ Firebase SignIn Error:", error.message);
      alert(error.message);
    }
  };

  // 🔹 Handle Reddit OAuth Sign In
  const handleRedditSignIn = () => {
    window.location.href = getLoginUrl(); // 🔥 Fixed
  };

  return (
    <Wrapper>
      <Form onSubmit={handleEmailSignIn}>
        <Heading>Sign In with Email</Heading>
        <Input
          type="email"
          placeholder="Email Address"
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
        <Button type="submit">Sign In</Button>
      </Form>

      <Divider />

      <Button onClick={handleRedditSignIn}>
        Sign In with Reddit 🚀
      </Button>
    </Wrapper>
  );
};

export default SignIn;
