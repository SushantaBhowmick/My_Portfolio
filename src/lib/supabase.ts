import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL and/or Anon Key not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (you can generate these with Supabase CLI)
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  status?: 'new' | 'read' | 'replied';
}

// Contact form submission function
export async function submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
  try {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          ...data,
          status: 'new',
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get all contact submissions (for admin panel)
export async function getContactSubmissions() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact submissions:', error);
      throw new Error('Failed to fetch contact submissions');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Update contact submission status
export async function updateContactSubmissionStatus(id: string, status: ContactSubmission['status']) {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating contact submission:', error);
      throw new Error('Failed to update contact submission');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating contact submission:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}