// src/components/Shared/ThemeSwitcher.js
import React from "react";
import styled from "styled-components";
import { Sun, Moon } from "lucide-react";

const SwitchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 0.95rem;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ThemeSwitcher = ({ toggleTheme, currentTheme }) => {
  const isLight = currentTheme === "light";

  return (
    <SwitchButton onClick={toggleTheme} title="Toggle theme">
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
      {isLight ? "Dark Mode" : "Light Mode"}
    </SwitchButton>
  );
};

export default ThemeSwitcher;
