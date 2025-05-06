import React from 'react';
import { FormBlock } from '../../../../types/formTypes';

interface TextBlockProps {
  block: FormBlock;
  onChange: (updates: Partial<FormBlock>) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({ block, onChange }) => {
  return (
    <div>
      <textarea
        className="w-full p-2 min-h-[100px] border-b border-transparent focus:border-gray-300 focus:outline-none text-base"
        placeholder="Enter text content here..."
        value={block.content || ''}
        onChange={(e) => onChange({ content: e.target.value })}
      />
    </div>
  );
};

export default TextBlock; 