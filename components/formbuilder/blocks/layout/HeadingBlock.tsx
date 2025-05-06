import React from 'react';
import { FormBlock } from '../../../../types/formTypes';

interface HeadingBlockProps {
  block: FormBlock;
  onChange: (updates: Partial<FormBlock>) => void;
  level: string; // 'heading_1', 'heading_2', or 'heading_3'
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ block, onChange, level }) => {
  const getHeadingSize = () => {
    switch (level) {
      case 'heading_1':
        return 'text-2xl font-bold';
      case 'heading_2':
        return 'text-xl font-semibold';
      case 'heading_3':
        return 'text-lg font-medium';
      default:
        return 'text-lg font-medium';
    }
  };

  return (
    <div>
      <input
        type="text"
        className={`w-full p-2 border-b border-transparent focus:border-gray-300 focus:outline-none ${getHeadingSize()}`}
        placeholder={`${level.replace('_', ' ').charAt(0).toUpperCase() + level.replace('_', ' ').slice(1)}`}
        value={block.content || ''}
        onChange={(e) => onChange({ content: e.target.value })}
      />
    </div>
  );
};

export default HeadingBlock; 