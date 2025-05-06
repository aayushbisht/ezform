import React from 'react';
import { FormBlock } from '../../../../types/formTypes';

interface DropdownBlockProps {
  block: FormBlock;
  onChange: (updates: Partial<FormBlock>) => void;
}

const DropdownBlock: React.FC<DropdownBlockProps> = ({ block, onChange }) => {
  const addOption = () => {
    if (block.options) {
      onChange({ options: [...block.options, `Option ${block.options.length + 1}`] });
    }
  };

  const updateOption = (index: number, value: string) => {
    if (block.options) {
      const newOptions = [...block.options];
      newOptions[index] = value;
      onChange({ options: newOptions });
    }
  };

  const removeOption = (index: number) => {
    if (block.options && block.options.length > 1) {
      const newOptions = [...block.options];
      newOptions.splice(index, 1);
      onChange({ options: newOptions });
    }
  };

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
      
      <div className="mb-4">
        <select
          className="bg-gray-50 p-2 border rounded-md w-full text-gray-400"
          disabled
        >
          <option>Select an option</option>
        </select>
      </div>
      
      <div className="space-y-2 border rounded-md p-3 bg-gray-50">
        <div className="text-sm font-medium mb-2">Dropdown options</div>
        {block.options?.map((option, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2 text-gray-400 text-sm">{index + 1}.</span>
            <input
              type="text"
              className="flex-1 p-2 border-b border-transparent focus:border-gray-300 focus:outline-none bg-white rounded"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="ml-2 text-gray-400 hover:text-red-500"
              title="Remove option"
            >
              ✕
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addOption}
          className="flex items-center text-gray-500 hover:text-gray-700 text-sm mt-2"
        >
          <span className="mr-1">+</span> Add option
        </button>
      </div>
    </div>
  );
};

export default DropdownBlock; 