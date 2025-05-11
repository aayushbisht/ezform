import React, { useState, useRef, useEffect } from 'react';

interface FormHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue.trim()) {
      onTitleChange(inputValue);
    } else {
      setInputValue(title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div className="py-4 px-6 ">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="text-xl font-bold w-full outline-none border-b-2 border-gray-300 focus:border-black"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h1 
          className="text-xl font-bold cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      )}
    </div>
  );
};

export default FormHeader; 