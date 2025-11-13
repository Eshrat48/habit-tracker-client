// src/components/ThemeToggle.jsx

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{ 
        padding: '8px', 
        borderRadius: '50%', 
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        // Dynamic colors using inline CSS
        backgroundColor: theme === 'light' ? '#f3f4f6' : '#374151', // Light: bg-gray-100 | Dark: bg-gray-700
        color: theme === 'light' ? '#4b5563' : '#d1d5db',          // Light: text-gray-600 | Dark: text-gray-300
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme === 'light' ? '#e5e7eb' : '#4b5563'; // Slightly darker hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme === 'light' ? '#f3f4f6' : '#374151'; // Reset on leave
      }}
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;