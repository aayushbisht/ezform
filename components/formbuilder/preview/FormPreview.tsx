'use client';

import React from 'react';
import { FormBlock } from '../../../types/formTypes';
import PreviewBlockContent from './PreviewBlockContent';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../../../contexts/FormContext';

const FormPreview: React.FC<{ onSubmit: (e: React.FormEvent) => void }> = ({ onSubmit }) => {
  const { blocks, formTitle } = useFormContext();
  const router = useRouter();

  const goToBuilder = () => {
    router.push('/builder');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between bg-white py-2 px-4 border-b">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            EZForm
          </Link>
        </div>

        <div className="flex items-center">
          <button 
            onClick={goToBuilder}
            className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 mr-2"
          >
            Back to editor
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
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">{formTitle}</h1>
          </div>
          
          <div className="p-6">
            {blocks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No form blocks to preview. Go back to the builder and add some blocks.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-1">
                {blocks.map((block, index) => (
                  <div key={index} className="p-2">
                    <PreviewBlockContent block={block} />
                  </div>
                ))}
                
                <div className="pt-4 flex justify-center">
                  <button 
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPreview; 