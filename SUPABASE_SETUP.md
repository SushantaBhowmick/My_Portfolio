# Supabase Setup Guide

This portfolio uses Supabase for backend functionality, specifically for the contact form submissions.

## Quick Setup

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Create a new project

### 2. Get Your Credentials
1. Go to your project settings
2. Copy your Project URL and anon public key
3. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Create the Database Table
Run this SQL in your Supabase SQL editor:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for better performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts from anyone (for contact form)
CREATE POLICY "Allow contact form submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Create a policy for reading (you might want to restrict this to authenticated users)
CREATE POLICY "Allow reading contact submissions" ON contact_submissions
    FOR SELECT USING (true);
```

### 4. Test the Integration
1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your Supabase dashboard to see the submission

## Features Included

- ✅ Contact form submissions
- ✅ Form validation
- ✅ Success/error handling
- ✅ Real-time notifications
- 🔄 Admin panel (coming soon)

## Optional: Admin Panel
To view and manage contact submissions, you can create an admin panel by:
1. Setting up authentication
2. Creating protected routes
3. Building admin interface components

## Production Deployment
When deploying to production:
1. Add your environment variables to your hosting platform
2. Ensure your database policies are properly configured
3. Consider adding rate limiting for form submissions

## Security Notes
- The current setup allows public form submissions
- Consider adding CAPTCHA or rate limiting in production
- Row Level Security policies can be customized based on your needs