// src/components/Shared/ThemeSwitcher.js
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const ThemeSwitcher = ({ toggleTheme, currentTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      Switch to {currentTheme === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeSwitcher;
