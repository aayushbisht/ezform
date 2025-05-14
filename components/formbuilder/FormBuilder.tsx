import React, { useState, useEffect } from 'react';
import FormHeader from './ui/FormHeader';
import BlockList from './ui/BlockList';
import { BlockType, FormBlock } from '../../types/formTypes';
import BlockSelector from './ui/BlockSelector';
import FormSidebar from './ui/FormSidebar';
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
  const [currentFormId, setCurrentFormId] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSavedForms();
    }
  }, [user]);

  const fetchSavedForms = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setSavedForms(data);
    }
  };

  const handleSaveForm = async () => {
    // When trying to explicitly save, prompt for login if not logged in
    if (!user) {
      setShowSaveModal(true);
      return;
    }

    if (currentFormId) {
      // Update existing form
      const { error } = await supabase
        .from('forms')
        .update({
          title: formTitle,
          blocks: blocks,
        })
        .eq('id', currentFormId);

      if (!error) {
        fetchSavedForms();
      }
    } else {
      // Create new form
      const { data, error } = await supabase.from('forms').insert({
        user_id: user.id,
        title: formTitle,
        blocks: blocks,
        created_at: new Date().toISOString(),
      }).select().single();

      if (!error && data) {
        setCurrentFormId(data.id);
        fetchSavedForms();
      }
    }
  };

  const handleAddBlock = async (type: BlockType, blockType: string) => {
    const newBlock: FormBlock = {
      id: `block-${Date.now()}`,
      type,
      blockType,
      content: '',
      options: type === 'question' && (blockType === 'multiple_choice' || blockType === 'checkbox' || blockType === 'dropdown') 
        ? ['Option 1', 'Option 2'] 
        : []
    };

    let newBlocks;
    if (insertIndex !== null) {
      newBlocks = [...blocks];
      newBlocks.splice(insertIndex + 1, 0, newBlock);
    } else {
      newBlocks = [...blocks, newBlock];
    }
    
    // Update local state (and localStorage via FormContext)
    updateBlocks(newBlocks);
    setShowBlockSelector(false);
    setInsertIndex(null);

    // Only save to database if user is logged in
    if (user) {
      if (currentFormId) {
        // Update existing form
        const { error } = await supabase
          .from('forms')
          .update({
            blocks: newBlocks,
          })
          .eq('id', currentFormId);

        if (!error) {
          fetchSavedForms();
        }
      } else {
        // Create new form if it doesn't exist
        const { data, error } = await supabase.from('forms').insert({
          user_id: user.id,
          title: formTitle,
          blocks: newBlocks,
          created_at: new Date().toISOString(),
        }).select().single();

        if (!error && data) {
          setCurrentFormId(data.id);
          fetchSavedForms();
        }
      }
    }
  };

  const handleDeleteBlock = async (id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id);
    
    // Update local state (and localStorage via FormContext)
    updateBlocks(newBlocks);

    // Only save to database if user is logged in
    if (user && currentFormId) {
      const { error } = await supabase
        .from('forms')
        .update({
          blocks: newBlocks,
        })
        .eq('id', currentFormId);

      if (!error) {
        fetchSavedForms();
      }
    }
  };

  const handleUpdateBlock = async (id: string, updates: Partial<FormBlock>) => {
    const newBlocks = blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    );
    
    // Update local state (and localStorage via FormContext)
    updateBlocks(newBlocks);

    // Only save to database if user is logged in
    if (user && currentFormId) {
      const { error } = await supabase
        .from('forms')
        .update({
          blocks: newBlocks,
        })
        .eq('id', currentFormId);

      if (!error) {
        fetchSavedForms();
      }
    }
  };

  const handleMoveBlock = async (dragIndex: number, hoverIndex: number) => {
    const dragBlock = blocks[dragIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, dragBlock);
    
    // Update local state (and localStorage via FormContext)
    updateBlocks(newBlocks);

    // Only save to database if user is logged in
    if (user && currentFormId) {
      const { error } = await supabase
        .from('forms')
        .update({
          blocks: newBlocks,
        })
        .eq('id', currentFormId);

      if (!error) {
        fetchSavedForms();
      }
    }
  };

  const openBlockSelector = (index: number) => {
    setInsertIndex(index);
    setShowBlockSelector(true);
  };

  const goToPreview = () => {
    if (currentFormId) {
      router.push(`/preview?formId=${currentFormId}`);
    } else {
      router.push('/preview');
    }
  };

  const handleCreateNew = async () => {
    // When trying to create a new saved form, prompt for login if not logged in
    if (!user) {
      setShowSaveModal(true);
      return;
    }

    // Create a new empty form in the database
    const { data, error } = await supabase.from('forms').insert({
      user_id: user.id,
      title: 'Untitled Form',
      blocks: [],
      created_at: new Date().toISOString(),
    }).select().single();

    if (!error && data) {
      setCurrentFormId(data.id);
      updateFormTitle(data.title);
      updateBlocks(data.blocks);
      fetchSavedForms();
    }
  };

  const handleFormSelect = (form: any) => {
    updateFormTitle(form.title);
    updateBlocks(form.blocks);
    setCurrentFormId(form.id);
  };

  return (
    <div className="min-h-screen flex">
      {user && (
        <FormSidebar
          savedForms={savedForms}
          currentFormId={currentFormId}
          onFormSelect={handleFormSelect}
          onCreateNew={handleCreateNew}
        />
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
            <p className="mb-4">Your form is saved locally, but you need to be signed in to save it to your account.</p>
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