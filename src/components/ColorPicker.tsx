import React from 'react';

interface ColorPickerProps {
  onSelectColor: (color: string) => void;
  onClose: () => void;
  colors: string[];
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onSelectColor,
  onClose,
  colors,
  className = ''
}) => {
  return (
    <div className={`color-palette ${className}`}>
      <div className="color-palette-header">
        <span>Select a color</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="color-grid">
        {colors.map((color, index) => (
          <button 
            key={index} 
            className="color-item" 
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker; 