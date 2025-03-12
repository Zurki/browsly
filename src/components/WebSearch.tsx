import { useState, useEffect } from 'react';
import { SearchEngine } from '../types';
import { loadSearchEngine, saveSearchEngine } from '../utils/storageUtils';

interface WebSearchProps {
  className?: string;
  onNotify?: (message: string, type: 'success' | 'error' | 'info') => void;
}

const WebSearch: React.FC<WebSearchProps> = ({ 
  className = '',
  onNotify 
}) => {
  // State for web search
  const [webSearchQuery, setWebSearchQuery] = useState('');
  const [selectedSearchEngine, setSelectedSearchEngine] = useState(() => {
    return loadSearchEngine('google');
  });

  // Available search engines
  const searchEngines: Record<string, SearchEngine> = {
    google: {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      icon: '🔍'
    },
    bing: {
      name: 'Bing',
      url: 'https://www.bing.com/search?q=',
      icon: '🔎'
    },
    duckduckgo: {
      name: 'DuckDuckGo',
      url: 'https://duckduckgo.com/?q=',
      icon: '🦆'
    },
    youtube: {
      name: 'YouTube',
      url: 'https://www.youtube.com/results?search_query=',
      icon: '▶️'
    },
    github: {
      name: 'GitHub',
      url: 'https://github.com/search?q=',
      icon: '📦'
    }
  };

  // Save selected search engine when it changes
  useEffect(() => {
    saveSearchEngine(selectedSearchEngine);
  }, [selectedSearchEngine]);

  // Function to handle web search submission
  const handleWebSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webSearchQuery.trim()) return;
    
    const engine = searchEngines[selectedSearchEngine];
    const searchUrl = `${engine.url}${encodeURIComponent(webSearchQuery)}`;
    
    try {
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
      if (onNotify) {
        onNotify(`Searching ${engine.name} for "${webSearchQuery}"`, 'info');
      }
      setWebSearchQuery('');
    } catch {
      if (onNotify) {
        onNotify('Failed to open search. Please check your popup settings.', 'error');
      }
    }
  };

  return (
    <div className={`web-search-container ${className}`}>
      <form onSubmit={handleWebSearch} className="web-search-form">
        <div className="search-engine-selector">
          <select
            value={selectedSearchEngine}
            onChange={(e) => setSelectedSearchEngine(e.target.value)}
            aria-label="Select search engine"
          >
            {Object.entries(searchEngines).map(([key, engine]) => (
              <option key={key} value={key}>
                {engine.icon} {engine.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search the web..."
          value={webSearchQuery}
          onChange={(e) => setWebSearchQuery(e.target.value)}
          className="web-search-input"
        />
        <button type="submit" className="web-search-button">
          {searchEngines[selectedSearchEngine].icon}
        </button>
      </form>
    </div>
  );
};

export default WebSearch; 