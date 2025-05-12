'use client'

import React from 'react'

interface FormSidebarProps {
  savedForms: any[]
  currentFormId: string | null
  onFormSelect: (form: any) => void
  onCreateNew: () => void
}

const FormSidebar: React.FC<FormSidebarProps> = ({
  savedForms,
  currentFormId,
  onFormSelect,
  onCreateNew
}) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Forms</h2>
        <button
          onClick={onCreateNew}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New
        </button>
      </div>
      <div className="space-y-2">
        {savedForms.map((form) => (
          <div
            key={form.id}
            className={`p-2 rounded cursor-pointer transition-colors ${
              currentFormId === form.id 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onFormSelect(form)}
          >
            {form.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormSidebar 