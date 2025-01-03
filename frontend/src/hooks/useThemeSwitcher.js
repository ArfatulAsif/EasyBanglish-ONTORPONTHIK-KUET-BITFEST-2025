import { useState, useEffect } from "react";

export const useThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check local storage for the theme or default to dark mode
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    // Add or remove the `darkMode` class based on `isDark`
    const className = "darkMode";
    const rootElement = document.documentElement;

    if (isDark) {
      rootElement.classList.add(className);
    } else {
      rootElement.classList.remove(className);
    }

    // Save the current theme to localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleTheme };
};
