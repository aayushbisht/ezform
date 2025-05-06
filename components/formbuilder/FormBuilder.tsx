import React, { useState, useEffect } from 'react';
import FormHeader from './ui/FormHeader';
import BlockList from './ui/BlockList';
import { BlockType, FormBlock } from '../../types/formTypes';
import BlockSelector from './ui/BlockSelector';


const FormBuilder = () => {
  const [blocks, setBlocks] = useState<FormBlock[]>([]);
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBlocks = localStorage.getItem('formBlocks');
    const savedTitle = localStorage.getItem('formTitle');
    
    if (savedBlocks) {
      try {
        setBlocks(JSON.parse(savedBlocks));
      } catch (error) {
        console.error('Failed to parse saved blocks:', error);
      }
    }
    
    if (savedTitle) {
      setFormTitle(savedTitle);
    }
  }, []);

  // Save data to localStorage whenever blocks or title changes
  useEffect(() => {
    localStorage.setItem('formBlocks', JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    localStorage.setItem('formTitle', formTitle);
  }, [formTitle]);

  const handleAddBlock = (type: BlockType, blockType: string) => {
    const newBlock: FormBlock = {
      id: `block-${Date.now()}`,
      type,
      blockType,
      content: '',
      options: type === 'question' && (blockType === 'multiple_choice' || blockType === 'checkbox' || blockType === 'dropdown') 
        ? ['Option 1', 'Option 2'] 
        : []
    };

    if (insertIndex !== null) {
      const newBlocks = [...blocks];
      console.log(newBlocks);
      newBlocks.splice(insertIndex + 1, 0, newBlock);
      setBlocks(newBlocks);
      setShowBlockSelector(false);
      setInsertIndex(null);
    } else {
      setBlocks([...blocks, newBlock]);
      setShowBlockSelector(false);
    }
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const handleUpdateBlock = (id: string, updates: Partial<FormBlock>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const handleMoveBlock = (dragIndex: number, hoverIndex: number) => {
    const dragBlock = blocks[dragIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, dragBlock);
    setBlocks(newBlocks);
  };

  const openBlockSelector = (index: number) => {
    setInsertIndex(index);
    setShowBlockSelector(true);
  };

  const clearForm = () => {
    if (confirm('Are you sure you want to clear the form? This will delete all blocks.')) {
      setBlocks([]);
      localStorage.removeItem('formBlocks');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <FormHeader 
          title={formTitle} 
          onTitleChange={setFormTitle} 
        />
        {blocks.length > 0 && (
          <button 
            onClick={clearForm}
            className="mr-4 text-sm text-red-500 hover:text-red-700"
          >
            Clear Form
          </button>
        )}
      </div>
      
      {blocks.length === 0 ? (
        <div className="flex justify-center py-12">
          <button
            onClick={() => setShowBlockSelector(true)}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            <span className="mr-2">+</span> Add your first block
          </button>
        </div>
      ) : (
        <BlockList
          blocks={blocks}
          onDelete={handleDeleteBlock}
          onUpdate={handleUpdateBlock}
          onMove={handleMoveBlock}
          onAddClick={openBlockSelector}
        />
      )}

      {showBlockSelector && (
        <BlockSelector
          onSelect={handleAddBlock}
          onClose={() => {
            setShowBlockSelector(false);
            setInsertIndex(null);
          }}
        />
      )}
    </div>
  );
};

export default FormBuilder; 