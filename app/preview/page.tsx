'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../../contexts/FormContext';
import { FormBlock } from '../../types/formTypes';

export default function FormPreviewPage() {
  const { blocks, formTitle } = useFormContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! (This is just a preview)');
  };

  const goToBuilder = () => {
    router.push('/builder');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading preview...</div>
      </div>
    );
  }

  const renderPreviewBlock = (block: FormBlock) => {
    const { type, blockType, content, options, required, placeholder } = block;
    
    // Question blocks
    if (type === 'question') {
      switch (blockType) {
        case 'short_answer':
          return (
            <div className="mb-6">
              <div className="text-base font-medium mb-2">{content || 'Question'} {required && <span className="text-red-500">*</span>}</div>
              <input 
                type="text" 
                className="border rounded-md p-2 w-full"
                placeholder={placeholder || 'Short answer text'}
                disabled={false}
              />
            </div>
          );
          
        case 'long_answer':
          return (
            <div className="mb-6">
              <div className="text-base font-medium mb-2">{content || 'Question'} {required && <span className="text-red-500">*</span>}</div>
              <textarea 
                className="border rounded-md p-2 w-full h-24 resize-none"
                placeholder={placeholder || 'Long answer text'}
                disabled={false}
              />
            </div>
          );
          
        case 'multiple_choice':
          return (
            <div className="mb-6">
              <div className="text-base font-medium mb-2">{content || 'Question'} {required && <span className="text-red-500">*</span>}</div>
              <div className="space-y-2">
                {options?.map((option, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      type="radio"
                      name={`radio-${block.id}`}
                      id={`radio-${block.id}-${i}`}
                      className="mr-2"
                    />
                    <label htmlFor={`radio-${block.id}-${i}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          );
          
        case 'checkbox':
          return (
            <div className="mb-6">
              <div className="text-base font-medium mb-2">{content || 'Question'} {required && <span className="text-red-500">*</span>}</div>
              <div className="space-y-2">
                {options?.map((option, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`checkbox-${block.id}-${i}`}
                      className="mr-2"
                    />
                    <label htmlFor={`checkbox-${block.id}-${i}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          );
          
        case 'dropdown':
          return (
            <div className="mb-6">
              <div className="text-base font-medium mb-2">{content || 'Question'} {required && <span className="text-red-500">*</span>}</div>
              <select className="border rounded-md p-2 w-full">
                <option value="" disabled selected>Select an option</option>
                {options?.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            </div>
          );
          
        default:
          return <div>Unsupported question type: {blockType}</div>;
      }
    }
    
    // Layout blocks
    if (type === 'layout') {
      switch (blockType) {
        case 'text':
          return <p className="text-sm mb-6">{content || 'Text content'}</p>;
          
        case 'heading_1':
          return <h1 className="text-2xl font-bold mb-6">{content || 'Heading 1'}</h1>;
          
        case 'heading_2':
          return <h2 className="text-xl font-semibold mb-6">{content || 'Heading 2'}</h2>;
          
        case 'heading_3':
          return <h3 className="text-lg font-medium mb-6">{content || 'Heading 3'}</h3>;
          
        default:
          return <div>Unsupported layout type: {blockType}</div>;
      }
    }
    
    // Embed blocks
    if (type === 'embed') {
      switch (blockType) {
        case 'image':
          return (
            <div className="text-center mb-6">
              {content ? (
                <div>
                  <img 
                    src={content} 
                    alt={placeholder || "Embedded image"} 
                    className="max-w-full max-h-64 mx-auto"
                  />
                  {placeholder && (
                    <p className="text-sm text-gray-500 mt-1">{placeholder}</p>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 p-8 rounded-md">
                  <div className="text-gray-400 text-center">Image Preview</div>
                </div>
              )}
            </div>
          );
          
        default:
          return <div>Unsupported embed type: {blockType}</div>;
      }
    }
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
              <form onSubmit={handleSubmit} className="space-y-2">
                {blocks.map((block, index) => (
                  <div key={index} className="p-4 border-b">
                    {renderPreviewBlock(block)}
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
} 