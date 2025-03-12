import React, { useRef, useState, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';
import ColorPicker from './ColorPicker';
import { getContrastColor } from '../utils/colorUtils';

interface LinkFormData {
  section: string;
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface AddLinkFormProps {
  sections: { title: string }[];
  formData: LinkFormData;
  onFormDataChange: (data: Partial<LinkFormData>) => void;
  onAddLink: () => void;
  onAddCategory: () => void;
  commonEmojis: string[];
  commonColors: string[];
  className?: string;
}

const AddLinkForm: React.FC<AddLinkFormProps> = ({
  sections,
  formData,
  onFormDataChange,
  onAddLink,
  onAddCategory,
  commonEmojis,
  commonColors,
  className = ''
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const emojiInputRef = useRef<HTMLInputElement>(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showEmojiPicker && 
          emojiInputRef.current && 
          !emojiInputRef.current.contains(e.target as Node) &&
          !(e.target as Element).closest('.emoji-picker')) {
        setShowEmojiPicker(false);
      }
      
      if (showColorPicker && 
          !(e.target as Element).closest('.color-picker-container')) {
        setShowColorPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker, showColorPicker]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLink();
  };

  return (
    <div className={`add-link-section ${className}`}>
      <h3>Add New Link</h3>
      <form className="add-link-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category</label>
          <div className="select-with-button">
            <select 
              value={formData.section}
              onChange={(e) => onFormDataChange({ section: e.target.value })}
            >
              {sections.map(section => (
                <option key={section.title} value={section.title}>{section.title}</option>
              ))}
            </select>
            <button 
              type="button"
              className="add-category-button"
              onClick={onAddCategory}
              title="Add new category"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="e.g. GitHub"
            value={formData.name}
            onChange={(e) => onFormDataChange({ name: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>URL</label>
          <input
            type="text"
            placeholder="e.g. https://github.com"
            value={formData.url}
            onChange={(e) => onFormDataChange({ url: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Icon</label>
          <div className="emoji-input-container">
            <input
              ref={emojiInputRef}
              type="text"
              placeholder="Select an emoji"
              value={formData.icon}
              onChange={(e) => onFormDataChange({ icon: e.target.value })}
              onClick={() => setShowEmojiPicker(true)}
              readOnly
            />
            <button 
              type="button"
              className="emoji-picker-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </button>
            
            {showEmojiPicker && (
              <EmojiPicker 
                emojis={commonEmojis}
                onSelectEmoji={(emoji) => {
                  onFormDataChange({ icon: emoji });
                  setShowEmojiPicker(false);
                }}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label>Color</label>
          <div className="color-input-container">
            <div 
              className="color-preview" 
              style={{ backgroundColor: formData.color }}
            >
              <span style={{ color: getContrastColor(formData.color) }}>
                {formData.color}
              </span>
            </div>
            <div className="color-picker-container">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => onFormDataChange({ color: e.target.value })}
                className="color-picker-input"
              />
              <button 
                type="button"
                className="color-palette-button"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                🎨
              </button>
              
              {showColorPicker && (
                <ColorPicker 
                  colors={commonColors}
                  onSelectColor={(color) => {
                    onFormDataChange({ color });
                    setShowColorPicker(false);
                  }}
                  onClose={() => setShowColorPicker(false)}
                />
              )}
            </div>
          </div>
        </div>
        
        <button type="submit" className="add-button">Add Link</button>
      </form>
    </div>
  );
};

export default AddLinkForm; 