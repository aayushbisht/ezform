import React from 'react';
import { FormBlock } from '../../../types/formTypes';
import FormBlockComponent from '../blocks/FormBlock';

interface BlockListProps {
  blocks: FormBlock[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<FormBlock>) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onAddClick: (index: number) => void;
}

const BlockList: React.FC<BlockListProps> = ({
  blocks,
  onDelete,
  onUpdate,
  onMove,
  onAddClick,
}) => {
  return (
    <div className="px-4 py-2 space-y-3">
      {blocks.map((block, index) => (
        <div key={block.id} className="relative">
          <FormBlockComponent
            block={block}
            index={index}
            onDelete={() => onDelete(block.id)}
            onUpdate={(updates: Partial<FormBlock>) => onUpdate(block.id, updates)}
            onMove={onMove}
            onAddClick={() => onAddClick(index)}
          />
        </div>
      ))}
      
      <div className="flex justify-center py-4">
        <button
          onClick={() => onAddClick(blocks.length - 1)}
          className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <span className="mr-2">+</span> Add block
        </button>
      </div>
    </div>
  );
};

export default BlockList; 