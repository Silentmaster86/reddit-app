import { createContext, useContext, useState } from "react";

const SoundBarContext = createContext();

export const SoundBarProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => setVisible((prev) => !prev);

  return (
    <SoundBarContext.Provider value={{ visible, toggleVisible }}>
      {children}
    </SoundBarContext.Provider>
  );
};

export const useSoundBarToggle = () => useContext(SoundBarContext);
