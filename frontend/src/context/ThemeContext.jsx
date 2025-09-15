import { createContext, useState, useContext } from "react";
import { themes } from "../data/themeconfig";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(themes.royal);

  const changeTheme = (themeKey) => {
    setCurrentTheme(themes[themeKey]);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      <div className={`${currentTheme.bg} min-h-screen transition-colors duration-500`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
