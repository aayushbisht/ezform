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
      className={`group relative rounded-lg p-4 bg-white ${isDragging ? 'opacity-50' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      {/* Control buttons that appear on hover */}
      <div className="absolute left-[-60px]  opacity-0 group-hover:opacity-100 flex  bg-white  p-1 transition-opacity z-10">
        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-red-500 p-1 hover:bg-gray-200 rounded-md"
          title="Delete block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
          </svg>
        </button>
        <button
          onClick={onAddClick}
          className="text-gray-500 hover:text-blue-500 p-1 hover:bg-gray-200 rounded-md"
          title="Add block below"
        >
          +
        </button>
        <div
          className="text-gray-500 cursor-move p-1 hover:bg-gray-200 rounded-md"
          title="Drag to reorder"
        >
          ⠿
        </div>
      </div>
      
      {/* Block content */}
      <BlockContent
        block={block}
        onChange={onUpdate}
      />
    </div>
  );
};

export default FormBlockComponent; 