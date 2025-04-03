import { createContext, useState, useEffect } from "react";

// Create ThemeContext with a default empty object to prevent null errors
export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "dark-mode" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};
