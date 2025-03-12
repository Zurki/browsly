import React from 'react';

interface SectionHeaderProps {
  title: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onDelete: () => void;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  collapsed,
  onToggleCollapse,
  onDelete,
  className = ''
}) => {
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the "${title}" category?`)) {
      onDelete();
    }
  };

  return (
    <div className={`section-header ${className}`}>
      <h2>{title}</h2>
      <div className="section-controls">
        <button 
          className="collapse-button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand section" : "Collapse section"}
        >
          {collapsed ? "+" : "-"}
        </button>
        <button 
          className="delete-section-button"
          onClick={handleDeleteClick}
          aria-label={`Delete ${title} section`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default SectionHeader; 