import React, { useState, useEffect } from 'react';
import FormHeader from './ui/FormHeader';
import BlockList from './ui/BlockList';
import { BlockType, FormBlock } from '../../types/formTypes';
import BlockSelector from './ui/BlockSelector';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../../contexts/FormContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const FormBuilder = () => {
  const { blocks, formTitle, updateBlocks, updateFormTitle, clearForm } = useFormContext();
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [savedForms, setSavedForms] = useState<any[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSavedForms();
    }
  }, [user]);

  const fetchSavedForms = async () => {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) {
      setSavedForms(data);
    }
  };

  const handleSaveForm = async () => {
    if (!user) {
      setShowSaveModal(true);
      return;
    }

    const { error } = await supabase.from('forms').insert({
      user_id: user.id,
      title: formTitle,
      blocks: blocks,
      created_at: new Date().toISOString(),
    });

    if (!error) {
      fetchSavedForms();
    }
  };

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
    <div className="min-h-screen flex">
      {user && (
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Forms</h2>
            <button
              onClick={() => {
                clearForm();
                updateFormTitle('Untitled Form');
              }}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create New
            </button>
          </div>
          <div className="space-y-2">
            {savedForms.map((form) => (
              <div
                key={form.id}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  updateFormTitle(form.title);
                  updateBlocks(form.blocks);
                }}
              >
                {form.title}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between bg-white py-2 px-4 sticky top-0 z-50 border-b">
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
              onClick={handleSaveForm}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Form
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white py-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg">
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

      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Sign in to save your form</h3>
            <p className="mb-4">You need to be signed in to save your form.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder; 