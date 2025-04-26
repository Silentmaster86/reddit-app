// src/components/UI/Spinner.js
import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const SpinnerElement = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0,0,0,0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <SpinnerElement />
    </SpinnerWrapper>
  );
};

export default Spinner;