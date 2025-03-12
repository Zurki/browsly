import React from 'react';

interface KeyboardShortcutsHintProps {
  className?: string;
}

const KeyboardShortcutsHint: React.FC<KeyboardShortcutsHintProps> = ({ className = '' }) => {
  const showShortcutsInfo = () => {
    alert("Keyboard Shortcuts:\n\nCtrl+K: Search\nEsc: Close search or dialogs");
  };

  return (
    <div className={`keyboard-shortcuts-hint ${className}`}>
      <button 
        className="hint-button"
        onClick={showShortcutsInfo}
        aria-label="Keyboard shortcuts"
      >
        ⌨️
      </button>
    </div>
  );
};

export default KeyboardShortcutsHint; 