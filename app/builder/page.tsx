'use client';

import React from 'react';
import FormBuilder from '../../components/formbuilder/FormBuilder';

export default function BuilderPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Create a New Form</h1>
      <FormBuilder />
    </div>
  );
} 