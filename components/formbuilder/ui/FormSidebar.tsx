'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'

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
  const { user } = useAuth();
  const username = user?.user_metadata?.username || 'User';
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      {/* User profile section */}
      <div className="flex justify-between items-center mb-4 ">
      <div className="flex items-center">
        <div className="h-6 w-6 rounded-full bg-[#8D6E63] flex items-center justify-center text-white font-medium mr-1">
          {initial}
        </div>
        <div className="font-bold text-sm">{username}</div>
     
      </div>

      <button
          onClick={onCreateNew}
          className="h-10 w-24 px-2   items-center justify-center bg-black text-white rounded-md hover:bg-gray-700"
          title="Create New"
        >
          <span className="text-sm">Create New</span>
        </button>
      </div>

      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Forms</h2>
        <button
          onClick={onCreateNew}
          className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700"
          title="Create New Form"
        >
          <span className="text-lg">+</span>
        </button>
      </div> */}
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

        {savedForms.length === 0 && (
          <div className="text-gray-500 text-center text-sm p-2">
            No saved forms yet. Create your first form!
          </div>
        )}
      </div>
    </div>
  )
}

export default FormSidebar 