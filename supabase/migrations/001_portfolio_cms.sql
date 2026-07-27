-- Portfolio CMS schema + RLS + storage
-- Run against your Supabase Postgres database

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================
-- PROFILES (singleton)
-- =====================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL DEFAULT 'Sushanta Bhowmick',
  display_name TEXT NOT NULL DEFAULT 'Sushanta',
  headline TEXT DEFAULT 'Full-Stack Developer',
  bio_short TEXT,
  bio_long TEXT,
  availability_text TEXT DEFAULT 'Available for new opportunities',
  is_available BOOLEAN DEFAULT true,
  email TEXT,
  phone TEXT,
  location TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  calendar_url TEXT,
  years_experience TEXT DEFAULT '3+',
  projects_completed TEXT DEFAULT '25+',
  client_satisfaction TEXT DEFAULT '100%',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- HERO ROLES
-- =====================
CREATE TABLE IF NOT EXISTS hero_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- RESUMES
-- =====================
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  version_label TEXT,
  is_active BOOLEAN DEFAULT false,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS resumes_one_active
  ON resumes (is_active)
  WHERE is_active = true;

-- =====================
-- PROJECTS
-- =====================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Full-Stack',
  technologies TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SKILLS
-- =====================
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  color TEXT DEFAULT 'from-blue-500 to-cyan-500',
  icon_key TEXT DEFAULT 'Code',
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INT NOT NULL DEFAULT 80 CHECK (level >= 0 AND level <= 100),
  description TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS learning_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- =====================
-- ABOUT
-- =====================
CREATE TABLE IF NOT EXISTS about_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_key TEXT DEFAULT 'Code2',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS journey_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS fun_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  icon_key TEXT DEFAULT 'Coffee',
  sort_order INT DEFAULT 0
);

-- =====================
-- CONTACT (ensure exists)
-- =====================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status
  ON contact_submissions(status);

-- =====================
-- AUTOMATIONS
-- =====================
CREATE TABLE IF NOT EXISTS automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT false,
  config JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id UUID REFERENCES automations(id) ON DELETE SET NULL,
  status TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  show_about BOOLEAN DEFAULT true,
  show_skills BOOLEAN DEFAULT true,
  show_projects BOOLEAN DEFAULT true,
  show_contact BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- RLS
-- =====================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE fun_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Drop old permissive contact policies if present
DROP POLICY IF EXISTS "Allow contact form submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow reading contact submissions" ON contact_submissions;

-- Helper: public read policies
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles','hero_roles','resumes','projects','skill_categories',
    'skills','learning_tags','about_highlights','journey_items',
    'fun_facts','site_settings'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public read %s" ON %I', t, t);
    EXECUTE format(
      'CREATE POLICY "Public read %s" ON %I FOR SELECT USING (true)',
      t, t
    );
  END LOOP;
END $$;

-- Authenticated full access for CMS tables
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles','hero_roles','resumes','projects','skill_categories',
    'skills','learning_tags','about_highlights','journey_items',
    'fun_facts','automations','automation_logs','site_settings'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Auth all %s" ON %I', t, t);
    EXECUTE format(
      'CREATE POLICY "Auth all %s" ON %I FOR ALL TO authenticated USING (true) WITH CHECK (true)',
      t, t
    );
  END LOOP;
END $$;

-- Contact: anyone can insert; only auth can read/update
DROP POLICY IF EXISTS "Public insert contact" ON contact_submissions;
CREATE POLICY "Public insert contact" ON contact_submissions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Auth read contact" ON contact_submissions;
CREATE POLICY "Auth read contact" ON contact_submissions
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Auth update contact" ON contact_submissions;
CREATE POLICY "Auth update contact" ON contact_submissions
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Auth delete contact" ON contact_submissions;
CREATE POLICY "Auth delete contact" ON contact_submissions
  FOR DELETE TO authenticated USING (true);

-- =====================
-- STORAGE BUCKETS
-- =====================
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read resumes" ON storage.objects;
CREATE POLICY "Public read resumes" ON storage.objects
  FOR SELECT USING (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Auth upload resumes" ON storage.objects;
CREATE POLICY "Auth upload resumes" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Auth update resumes" ON storage.objects;
CREATE POLICY "Auth update resumes" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Auth delete resumes" ON storage.objects;
CREATE POLICY "Auth delete resumes" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Public read project images" ON storage.objects;
CREATE POLICY "Public read project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Auth upload project images" ON storage.objects;
CREATE POLICY "Auth upload project images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Auth update project images" ON storage.objects;
CREATE POLICY "Auth update project images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Auth delete project images" ON storage.objects;
CREATE POLICY "Auth delete project images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-images');
