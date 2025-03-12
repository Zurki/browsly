import React from 'react';

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
  emojis: string[];
  className?: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelectEmoji,
  onClose,
  emojis,
  className = ''
}) => {
  return (
    <div className={`emoji-picker ${className}`}>
      <div className="emoji-picker-header">
        <span>Select an emoji</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="emoji-grid">
        {emojis.map((emoji, index) => (
          <button 
            key={index} 
            className="emoji-item" 
            onClick={() => onSelectEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker; 