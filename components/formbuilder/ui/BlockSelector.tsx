import React, { useState } from 'react';
import { BlockType } from '../../../types/formTypes';

interface BlockSelectorProps {
  onSelect: (type: BlockType, blockType: string) => void;
  onClose: () => void;
}

const BlockSelector: React.FC<BlockSelectorProps> = ({ onSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<BlockType>('question');

  const categories = [
    { id: 'question', name: 'Questions' },
    { id: 'layout', name: 'Layout' },
    { id: 'embed', name: 'Embed' },
  ];

  const blockOptions = {
    question: [
      { id: 'short_answer', name: 'Short Answer', icon: '✏️' },
      { id: 'long_answer', name: 'Long Answer', icon: '📝' },
      { id: 'multiple_choice', name: 'Multiple Choice', icon: '○' },
      { id: 'checkbox', name: 'Checkbox', icon: '☑️' },
      { id: 'dropdown', name: 'Dropdown', icon: '▼' },
      { id: 'rating', name: 'Rating', icon: '★' },
      { id: 'email', name: 'Email', icon: '✉️' },
    ],
    layout: [
      { id: 'text', name: 'Text', icon: 'T' },
      { id: 'heading_1', name: 'Heading 1', icon: 'H1' },
      { id: 'heading_2', name: 'Heading 2', icon: 'H2' },
      { id: 'heading_3', name: 'Heading 3', icon: 'H3' },
      { id: 'title', name: 'Title', icon: '📋' },
      { id: 'label', name: 'Label', icon: '🏷️' },
    ],
    embed: [
      { id: 'image', name: 'Image', icon: '🖼️' },
      { id: 'video', name: 'Video', icon: '🎥' },
      { id: 'audio', name: 'Audio', icon: '🔊' },
    ],
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Add a block</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex border-b">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 ${activeCategory === category.id ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveCategory(category.id as BlockType)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="p-4 max-h-80 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {blockOptions[activeCategory].map((block) => (
              <button
                key={block.id}
                className="flex items-center p-3 hover:bg-gray-100 rounded border border-gray-200"
                onClick={() => onSelect(activeCategory, block.id)}
              >
                <span className="mr-2 text-xl">{block.icon}</span>
                <span>{block.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockSelector; 