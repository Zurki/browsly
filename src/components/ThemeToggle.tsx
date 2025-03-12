import React from 'react';

interface ThemeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  className = '' 
}) => {
  return (
    <button 
      className={`theme-toggle ${className}`}
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle; 