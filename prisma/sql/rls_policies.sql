-- Re-apply after public schema reset (Prisma owns tables; Supabase needs RLS + grants)

-- PostgREST (anon / authenticated) cannot see Prisma-created tables without grants.
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

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

-- Public read for portfolio content
DROP POLICY IF EXISTS "Public read profiles" ON profiles;
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read hero_roles" ON hero_roles;
CREATE POLICY "Public read hero_roles" ON hero_roles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read resumes" ON resumes;
CREATE POLICY "Public read resumes" ON resumes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read projects" ON projects;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read skill_categories" ON skill_categories;
CREATE POLICY "Public read skill_categories" ON skill_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read skills" ON skills;
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read learning_tags" ON learning_tags;
CREATE POLICY "Public read learning_tags" ON learning_tags FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read about_highlights" ON about_highlights;
CREATE POLICY "Public read about_highlights" ON about_highlights FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read journey_items" ON journey_items;
CREATE POLICY "Public read journey_items" ON journey_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read fun_facts" ON fun_facts;
CREATE POLICY "Public read fun_facts" ON fun_facts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- Authenticated full access for CMS writes via Supabase client
DROP POLICY IF EXISTS "Auth all profiles" ON profiles;
CREATE POLICY "Auth all profiles" ON profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all hero_roles" ON hero_roles;
CREATE POLICY "Auth all hero_roles" ON hero_roles FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all resumes" ON resumes;
CREATE POLICY "Auth all resumes" ON resumes FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all projects" ON projects;
CREATE POLICY "Auth all projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all skill_categories" ON skill_categories;
CREATE POLICY "Auth all skill_categories" ON skill_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all skills" ON skills;
CREATE POLICY "Auth all skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all learning_tags" ON learning_tags;
CREATE POLICY "Auth all learning_tags" ON learning_tags FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all about_highlights" ON about_highlights;
CREATE POLICY "Auth all about_highlights" ON about_highlights FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all journey_items" ON journey_items;
CREATE POLICY "Auth all journey_items" ON journey_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all fun_facts" ON fun_facts;
CREATE POLICY "Auth all fun_facts" ON fun_facts FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all automations" ON automations;
CREATE POLICY "Auth all automations" ON automations FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all automation_logs" ON automation_logs;
CREATE POLICY "Auth all automation_logs" ON automation_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Auth all site_settings" ON site_settings;
CREATE POLICY "Auth all site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

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
