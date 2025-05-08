// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const ThemeContext = createContext();

const redditLight = {
  body: "#f6f7f8",
  text: "#1c1c1c",
  card: "#ffffff",
  border: "#ccc",
  link: "#0079d3",
};

const redditDark = {
  body: "#1a1a1b",
  text: "#d7dadc",
  card: "#272729",
  border: "#343536",
  link: "#ff4500",
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("dark");

  const theme = useMemo(() => (themeName === "light" ? redditLight : redditDark), [themeName]);

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
