// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

const lightTheme = {
  background: "#ffffff",
  text: "#1a1a1b",
  sidebar: "#f6f7f8",
};

const darkTheme = {
  background: "#1a1a1b",
  text: "#ffffff",
  sidebar: "#272729",
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");
  const toggleTheme = () => setThemeName((prev) => (prev === "light" ? "dark" : "light"));

  const theme = themeName === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
