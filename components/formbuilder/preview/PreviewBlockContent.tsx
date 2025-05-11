import React from 'react';
import { FormBlock } from '../../../types/formTypes';

interface PreviewBlockContentProps {
  block: FormBlock;
}

const PreviewBlockContent: React.FC<PreviewBlockContentProps> = ({ block }) => {
  const { type, blockType, content, options, required, placeholder } = block;
  
  // Question blocks
  if (type === 'question') {
    switch (blockType) {
      case 'short_answer':
        return (
          <div>
            <div className="text-base font-medium mb-2">{content || 'Question'} {required && <span className="text-red-500">*</span>}</div>
            <input 
              type="text" 
              className="border rounded-md p-2 w-full"
              placeholder={placeholder || 'Short answer text'}
            />
          </div>
        );
        
      case 'long_answer':
        return (
          <div>
            <div className="text-base font-medium mb-2">{content || 'Question'} {required && <span className="text-red-500">*</span>}</div>
            <textarea 
              className="border rounded-md p-2 w-full h-24 resize-none"
              placeholder={placeholder || 'Long answer text'}
            />
          </div>
        );
        
      case 'multiple_choice':
        return (
          <div>
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
          <div>
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
          <div>
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
        return <p className="text-sm">{content || 'Text content'}</p>;
        
      case 'heading_1':
        return <h1 className="text-2xl font-bold">{content || 'Heading 1'}</h1>;
        
      case 'heading_2':
        return <h2 className="text-xl font-semibold">{content || 'Heading 2'}</h2>;
        
      case 'heading_3':
        return <h3 className="text-lg font-medium">{content || 'Heading 3'}</h3>;
        
      default:
        return <div>Unsupported layout type: {blockType}</div>;
    }
  }
  
  // Embed blocks
  if (type === 'embed') {
    switch (blockType) {
      case 'image':
        return (
          <div className="text-center">
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
  
  return <div>Unsupported block type: {type}</div>;
};

export default PreviewBlockContent; 