import React from 'react';

interface LinkCardProps {
  name: string;
  url: string;
  icon: string;
  color?: string;
  onDelete: () => void;
  className?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
  name,
  url,
  icon,
  color,
  onDelete,
  className = ''
}) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete();
    }
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`link-card ${className}`}
      style={color ? { 
        '--link-accent-color': color,
        borderTop: `3px solid ${color}`
      } as React.CSSProperties : undefined}
    >
      <button 
        className="delete-link-button"
        onClick={handleDeleteClick}
        aria-label={`Delete ${name}`}
      >
        ×
      </button>
      <div className="link-icon">{icon}</div>
      <div className="link-name">{name}</div>
    </a>
  );
};

export default LinkCard; 