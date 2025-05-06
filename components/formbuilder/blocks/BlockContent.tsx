import React from 'react';
import { FormBlock } from '../../../types/formTypes';
import ShortAnswerBlock from './question/ShortAnswerBlock';
import LongAnswerBlock from './question/LongAnswerBlock';
import MultipleChoiceBlock from './question/MultipleChoiceBlock';
import CheckboxBlock from './question/CheckboxBlock';
import DropdownBlock from './question/DropdownBlock';
import HeadingBlock from './layout/HeadingBlock';
import TextBlock from './layout/TextBlock';
import ImageBlock from './embed/ImageBlock';

interface BlockContentProps {
  block: FormBlock;
  onChange: (updates: Partial<FormBlock>) => void;
}

const BlockContent: React.FC<BlockContentProps> = ({ block, onChange }) => {
  const renderBlock = () => {
    const { type, blockType } = block;

    // Question blocks
    if (type === 'question') {
      switch (blockType) {
        case 'short_answer':
          return <ShortAnswerBlock block={block} onChange={onChange} />;
        case 'long_answer':
          return <LongAnswerBlock block={block} onChange={onChange} />;
        case 'multiple_choice':
          return <MultipleChoiceBlock block={block} onChange={onChange} />;
        case 'checkbox':
          return <CheckboxBlock block={block} onChange={onChange} />;
        case 'dropdown':
          return <DropdownBlock block={block} onChange={onChange} />;
        default:
          return <div>Unsupported question type: {blockType}</div>;
      }
    }

    // Layout blocks
    if (type === 'layout') {
      switch (blockType) {
        case 'text':
          return <TextBlock block={block} onChange={onChange} />;
        case 'heading_1':
        case 'heading_2':
        case 'heading_3':
          return <HeadingBlock block={block} onChange={onChange} level={blockType} />;
        default:
          return <div>Unsupported layout type: {blockType}</div>;
      }
    }

    // Embed blocks
    if (type === 'embed') {
      switch (blockType) {
        case 'image':
          return <ImageBlock block={block} onChange={onChange} />;
        default:
          return <div>Unsupported embed type: {blockType}</div>;
      }
    }

    return <div>Unsupported block type: {type}</div>;
  };

  return (
    <div className="w-full">
      {renderBlock()}
      
      {block.type === 'question' && (
        <div className="mt-2 flex items-center">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              className="mr-2"
              checked={block.required || false}
              onChange={(e) => onChange({ required: e.target.checked })}
            />
            Required
          </label>
        </div>
      )}
    </div>
  );
};

export default BlockContent; 