import React from 'react';

interface AddCategoryModalProps {
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  onAddCategory: () => void;
  onCancel: () => void;
  className?: string;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  newCategoryName,
  setNewCategoryName,
  onAddCategory,
  onCancel,
  className = ''
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory();
  };

  return (
    <div className={`add-category-modal ${className}`}>
      <div className="modal-content">
        <h3>Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="cancel-button"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="add-button"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal; 