// src/providers/ThemeProvider.jsx

import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Helper function to determine initial theme
const getInitialTheme = () => {
  if (typeof localStorage !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
  }
  // Check system preference if no saved theme
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

// 2. Create the Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // 3. Effect to update DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add the current theme class (Tailwind CSS will use this)
    root.classList.add(theme);

    // Save preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 4. Toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};