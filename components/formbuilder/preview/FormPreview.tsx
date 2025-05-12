'use client';

import React, { useEffect, useState } from 'react';
import { FormBlock } from '../../../types/formTypes';
import PreviewBlockContent from './PreviewBlockContent';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

interface Form {
  id: string;
  title: string;
  blocks: FormBlock[];
}

const FormPreview: React.FC<{ onSubmit: (e: React.FormEvent) => void }> = ({ onSubmit }) => {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const formId = searchParams.get('formId');

  useEffect(() => {
    const fetchForm = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      if (!formId) {
        // If no formId in URL, try to get the most recent form
        const { data: recentForm, error: recentError } = await supabase
          .from('forms')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!recentError && recentForm) {
          setForm(recentForm);
        }
        setLoading(false);
        return;
      }

      // Fetch specific form
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('id', formId)
        .single();

      if (error) {
        console.error('Error fetching form:', error);
      } else {
        setForm(data);
      }
      setLoading(false);
    };

    fetchForm();

    // Set up real-time subscription
    const subscription = supabase
      .channel('form_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forms',
          filter: formId ? `id=eq.${formId}` : `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.new) {
            const newForm = payload.new as Form;
            // Only update if it's the form we're currently viewing
            if (!formId || newForm.id === formId) {
              setForm(newForm);
            }
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, formId]);

  const goToBuilder = () => {
    router.push('/builder');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">No form found. Please create a form first.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between bg-white py-2 px-4 border-b">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            EZForm
          </Link>
        </div>

        <div className="flex items-center">
          <button 
            onClick={goToBuilder}
            className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 mr-2"
          >
            Back to editor
          </button>
          
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">{form.title}</h1>
          </div>
          
          <div className="p-6">
            {form.blocks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No form blocks to preview. Go back to the builder and add some blocks.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-1">
                {form.blocks.map((block, index) => (
                  <div key={block.id} className="p-2">
                    <PreviewBlockContent block={block} />
                  </div>
                ))}
                
                <div className="pt-4 flex justify-center">
                  <button 
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPreview; 