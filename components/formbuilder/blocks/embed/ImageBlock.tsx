import React, { useState, useRef } from 'react';
import { FormBlock } from '../../../../types/formTypes';

interface ImageBlockProps {
  block: FormBlock;
  onChange: (updates: Partial<FormBlock>) => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block, onChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(block.content || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to a server
      // and get a URL back, but for this demo we'll use a local preview
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onChange({ content: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Image caption (optional)"
          className="text-base w-full p-2 border-b border-transparent focus:border-gray-300 focus:outline-none"
          value={block.placeholder || ''}
          onChange={(e) => onChange({ placeholder: e.target.value })}
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        {previewUrl ? (
          <div className="relative">
            <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto" />
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null);
                onChange({ content: '' });
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Choose Image
            </button>
            <p className="text-gray-500 text-sm mt-2">JPG, PNG or GIF files</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageBlock; 