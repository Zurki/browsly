import React from 'react';
import ThemeToggle from './ThemeToggle';

interface DashboardHeaderProps {
  title: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  setSearchQuery: (query: string) => void;
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  darkMode,
  toggleDarkMode,
  showAddForm,
  setShowAddForm,
  isSearching,
  setIsSearching,
  setSearchQuery,
  className = ''
}) => {
  return (
    <header className={className}>
      <h1>{title}</h1>
      <div className="header-controls">
        <button 
          className="search-toggle" 
          onClick={() => {
            setIsSearching(!isSearching);
            if (isSearching) {
              setSearchQuery('');
            }
          }}
          aria-label="Search"
        >
          🔍
        </button>
        <button 
          className="add-link-toggle" 
          onClick={() => setShowAddForm(!showAddForm)}
          aria-label="Add new link"
        >
          {showAddForm ? "✕" : "＋"}
        </button>
        <ThemeToggle 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
      </div>
    </header>
  );
};

export default DashboardHeader; 