import { useRef, useEffect } from 'react';

interface DashboardSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  className?: string;
}

const DashboardSearch: React.FC<DashboardSearchProps> = ({
  searchQuery,
  setSearchQuery,
  isSearching,
  setIsSearching,
  className = ''
}) => {
  // Reference for the search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the search input when isSearching becomes true
  useEffect(() => {
    if (isSearching) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearching]);

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearching(true);
      }
      
      // Escape to close search
      if (e.key === 'Escape' && isSearching) {
        setIsSearching(false);
        setSearchQuery('');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearching, setIsSearching, setSearchQuery]);

  if (!isSearching) return null;

  return (
    <div className={`search-container ${className}`}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search links... (Esc to close)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="search-shortcut">Ctrl+K</div>
    </div>
  );
};

export default DashboardSearch; 