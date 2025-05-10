// src/context/SoundBarContext.js
import { createContext, useContext, useState } from "react";

const SoundBarContext = createContext();

export const SoundBarProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const [isCompact, setIsCompact] = useState(false);

  const toggleVisible = () => {
    if (!visible) {
      setVisible(true);
      setIsCompact(false);
    } else {
      setIsCompact((prev) => !prev);
    }
  };

  return (
    <SoundBarContext.Provider value={{ visible, isCompact, toggleVisible }}>
      {children}
    </SoundBarContext.Provider>
  );
};

export const useSoundBarToggle = () => useContext(SoundBarContext);
