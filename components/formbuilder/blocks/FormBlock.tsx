import React, { useRef } from 'react';
import { FormBlock } from '../../../types/formTypes';
import BlockContent from './BlockContent';

interface FormBlockProps {
  block: FormBlock;
  index: number;
  onDelete: () => void;
  onUpdate: (updates: Partial<FormBlock>) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onAddClick: () => void;
}

const FormBlockComponent: React.FC<FormBlockProps> = ({
  block,
  index,
  onDelete,
  onUpdate,
  onMove,
  onAddClick,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== index) {
      onMove(dragIndex, index);
    }
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={blockRef}
      className={` rounded-lg p-4 bg-white ${isDragging ? 'opacity-50' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <div className="flex">
        <div className="mr-3 flex flex-col space-y-2 pt-1">
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-500"
            title="Delete block"
          >
            🗑️
          </button>
          <button
            onClick={onAddClick}
            className="text-gray-500 hover:text-blue-500"
            title="Add block below"
          >
            ➕
          </button>
          <div
            className="text-gray-500 cursor-move"
            title="Drag to reorder"
          >
            ⠿
          </div>
        </div>
        
        <div className="flex-1">
          <BlockContent
            block={block}
            onChange={onUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default FormBlockComponent; 