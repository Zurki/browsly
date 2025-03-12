import React from 'react';

interface FloatingAddButtonProps {
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  className?: string;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ 
  showAddForm, 
  setShowAddForm, 
  className = '' 
}) => {
  return (
    <div 
      className={`floating-add-button ${className}`} 
      onClick={() => setShowAddForm(!showAddForm)}
      aria-label={showAddForm ? "Close add form" : "Open add form"}
    >
      {showAddForm ? "✕" : "＋"}
    </div>
  );
};

export default FloatingAddButton; 