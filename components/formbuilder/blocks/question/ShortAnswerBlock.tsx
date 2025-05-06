import React from 'react';
import { FormBlock } from '../../../../types/formTypes';

interface ShortAnswerBlockProps {
  block: FormBlock;
  onChange: (updates: Partial<FormBlock>) => void;
}

const ShortAnswerBlock: React.FC<ShortAnswerBlockProps> = ({ block, onChange }) => {
  return (
    <div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Question"
          className="text-base font-medium w-full p-2 border-b border-transparent focus:border-gray-300 focus:outline-none"
          value={block.content || ''}
          onChange={(e) => onChange({ content: e.target.value })}
        />
      </div>
      
      <div className="flex">
        <input
          type="text"
          placeholder="Short answer text"
          className="bg-gray-50 p-2 border rounded-md w-full text-gray-400"
          disabled
        />
      </div>
      
      <div className="mt-2">
        <input
          type="text"
          placeholder="Placeholder text (optional)"
          className="text-sm w-full p-1 border-b border-transparent focus:border-gray-300 focus:outline-none text-gray-500"
          value={block.placeholder || ''}
          onChange={(e) => onChange({ placeholder: e.target.value })}
        />
      </div>
    </div>
  );
};

export default ShortAnswerBlock; 