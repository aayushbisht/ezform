import React, { useState, useEffect } from 'react';
import FormHeader from './ui/FormHeader';
import BlockList from './ui/BlockList';
import { BlockType, FormBlock } from '../../types/formTypes';
import BlockSelector from './ui/BlockSelector';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../../contexts/FormContext';

const FormBuilder = () => {
  const { blocks, formTitle, updateBlocks, updateFormTitle, clearForm } = useFormContext();
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const router = useRouter();

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
      updateBlocks(newBlocks);
      setShowBlockSelector(false);
      setInsertIndex(null);
    } else {
      updateBlocks([...blocks, newBlock]);
      setShowBlockSelector(false);
    }
  };

  const handleDeleteBlock = (id: string) => {
    updateBlocks(blocks.filter(block => block.id !== id));
  };

  const handleUpdateBlock = (id: string, updates: Partial<FormBlock>) => {
    updateBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const handleMoveBlock = (dragIndex: number, hoverIndex: number) => {
    const dragBlock = blocks[dragIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, dragBlock);
    updateBlocks(newBlocks);
  };

  const openBlockSelector = (index: number) => {
    setInsertIndex(index);
    setShowBlockSelector(true);
  };

  const goToPreview = () => {
    router.push('/preview');
  };

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between bg-white py-2 px-4 ">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            EZForm
          </Link>
        </div>

        <div className="flex items-center">
          <button 
            onClick={goToPreview}
            className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 mr-2"
          >
            Preview
          </button>
          
          <button 
            onClick={clearForm}
            className="text-gray-600 hover:text-red-500 mr-4"
            title="Clear Form"
          >
            Clear
          </button>
          
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1  bg-white py-6 ">
        <div className="max-w-3xl mx-auto bg-white rounded-lg ">
          <FormHeader 
            title={formTitle} 
            onTitleChange={updateFormTitle} 
          />
          
          {blocks.length === 0 ? (
            <div className="flex justify-center py-6 px-2">
              <button
                onClick={() => setShowBlockSelector(true)}
                className="flex items-center px-4 py-2 bg-white hover:bg-gray-200 rounded-md"
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
        </div>
      </div>

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