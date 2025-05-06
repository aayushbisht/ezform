'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { FormBlock } from '../types/formTypes';

interface FormContextType {
  blocks: FormBlock[];
  formTitle: string;
  updateBlocks: (blocks: FormBlock[]) => void;
  updateFormTitle: (title: string) => void;
  clearForm: () => void;
}

const defaultValue: FormContextType = {
  blocks: [],
  formTitle: 'Untitled Form',
  updateBlocks: () => {},
  updateFormTitle: () => {},
  clearForm: () => {},
};

const FormContext = createContext<FormContextType>(defaultValue);

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<FormBlock[]>([]);
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [isInitialized, setIsInitialized] = useState(false);

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
    
    setIsInitialized(true);
  }, []);

  // Save data to localStorage whenever blocks or title changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('formBlocks', JSON.stringify(blocks));
    }
  }, [blocks, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('formTitle', formTitle);
    }
  }, [formTitle, isInitialized]);

  const updateBlocks = (newBlocks: FormBlock[]) => {
    setBlocks(newBlocks);
  };

  const updateFormTitle = (newTitle: string) => {
    setFormTitle(newTitle);
  };

  const clearForm = () => {
    if (confirm('Are you sure you want to clear the form? This will delete all blocks.')) {
      setBlocks([]);
      localStorage.removeItem('formBlocks');
    }
  };

  return (
    <FormContext.Provider
      value={{
        blocks,
        formTitle,
        updateBlocks,
        updateFormTitle,
        clearForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}; 