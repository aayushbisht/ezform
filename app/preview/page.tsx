'use client';

import React from 'react';
import FormPreview from '../../components/formbuilder/preview/FormPreview';

export default function FormPreviewPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! (This is just a preview)');
  };

  return <FormPreview onSubmit={handleSubmit} />;
} 