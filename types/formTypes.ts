export type BlockType = 'question' | 'layout' | 'embed';

export interface FormBlock {
  id: string;
  type: BlockType;
  blockType: string;
  content: string;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export type QuestionBlockTypes = 
  | 'short_answer'
  | 'long_answer'
  | 'multiple_choice'
  | 'checkbox'
  | 'dropdown'
  | 'rating'
  | 'email'
  | 'phone'
  | 'date';

export type LayoutBlockTypes = 
  | 'text'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'title'
  | 'label';

export type EmbedBlockTypes = 
  | 'image'
  | 'video'
  | 'audio';

export interface BlockCategory {
  id: string;
  name: string;
  blocks: {
    type: string;
    name: string;
    icon: string;
  }[];
} 