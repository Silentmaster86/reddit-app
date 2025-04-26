// src/components/UI/Button.js
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ variant }) =>
    variant === "primary" ? "#007bff" : variant === "danger" ? "#dc3545" : "#6c757d"};
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false }) => {
  return (
    <StyledButton type={type} variant={variant} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
