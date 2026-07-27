-- Supabase Auth / Storage policies (already applied on your project).
-- Prisma manages tables; keep this file as reference if you recreate a project.
-- Do NOT re-run casually — policies may already exist.

-- Storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Example: contact public insert (adjust if policies already exist)
-- CREATE POLICY "Public insert contact" ON contact_submissions
--   FOR INSERT WITH CHECK (true);
