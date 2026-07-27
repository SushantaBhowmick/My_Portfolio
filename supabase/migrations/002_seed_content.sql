-- Seed current portfolio content into CMS tables
-- Safe to re-run: clears content tables first (keeps contact_submissions)

TRUNCATE hero_roles, resumes, projects, skills, skill_categories, learning_tags,
  about_highlights, journey_items, fun_facts, automations, site_settings, profiles
  RESTART IDENTITY CASCADE;

INSERT INTO profiles (
  full_name, display_name, headline, bio_short, bio_long,
  availability_text, is_available, email, phone, location,
  github_url, linkedin_url,
  years_experience, projects_completed, client_satisfaction
) VALUES (
  'Sushanta Bhowmick',
  'Sushanta',
  'Full-Stack Developer',
  'I craft exceptional digital experiences using MERN & MEAN stack with 3+ years of experience. Specializing in React, Next.js, Node.js, TypeScript, and modern web technologies.',
  'My journey in web development started with a BTech in Computer Science & Technology and has evolved into 3+ years of hands-on experience building scalable web applications. I specialize in both MERN and MEAN stacks, creating everything from e-commerce platforms to learning management systems.

Currently working at Xpliv Technologies as a Full-Stack Developer, I''ve built enterprise solutions including Golf Course Management Systems and client in-house products using cutting-edge technologies like TypeScript, React, Node.js, and AWS.',
  'Available for new opportunities',
  true,
  'bhosushanta922@gmail.com',
  '+91 8017068720',
  'Kolkata, West Bengal, India',
  'https://github.com/SushantaBhowmick',
  'https://www.linkedin.com/in/sushanta-bhowmick',
  '3+',
  '25+',
  '100%'
);

INSERT INTO hero_roles (label, sort_order, is_active) VALUES
  ('Full-Stack Developer', 1, true),
  ('React Specialist', 2, true),
  ('Node.js Expert', 3, true),
  ('UI/UX Enthusiast', 4, true),
  ('Problem Solver', 5, true);

INSERT INTO projects (title, description, image_url, category, technologies, live_url, github_url, featured, is_published, sort_order) VALUES
  ('Golf Course Management System', 'Enterprise-level management system for golf courses with client in-house product features, built using modern TypeScript and React technologies.', NULL, 'Full-Stack', ARRAY['TypeScript','React.js','Node.js','TailwindCSS','AWS','Swagger'], 'https://example.com', 'https://github.com/SushantaBhowmick', true, true, 1),
  ('Ecommerce App - MERN Stack', 'Complete e-commerce solution with product catalog, cart, payments, and user management built with MERN stack technologies.', NULL, 'Full-Stack', ARRAY['React','Node.js','MongoDB','Express','Stripe'], 'https://example.com', 'https://github.com/SushantaBhowmick', true, true, 2),
  ('Learning Management System', 'Comprehensive LMS where students can attend live classes, access courses, get certificates, and age-based course recommendations.', NULL, 'Full-Stack', ARRAY['React','Node.js','MongoDB','Socket.io','WebRTC'], 'https://example.com', 'https://github.com/SushantaBhowmick', true, true, 3),
  ('Course Bundler', 'Full-stack course management platform with payment integration using Stripe and modern authentication systems.', NULL, 'Full-Stack', ARRAY['React','Next.js','Node.js','Stripe','Supabase'], 'https://example.com', 'https://github.com/SushantaBhowmick', false, true, 4),
  ('Real-Time Workspace (SaaS)', 'Scalable SaaS platform for real-time collaboration with workspace management and team features.', NULL, 'Full-Stack', ARRAY['React','Node.js','Socket.io','PostgreSQL','AWS'], 'https://example.com', 'https://github.com/SushantaBhowmick', false, true, 5),
  ('Social Media App', 'Full-featured social media platform with user profiles, posts, comments, and real-time notifications.', NULL, 'Full-Stack', ARRAY['React','Node.js','MongoDB','Socket.io','Express'], 'https://example.com', 'https://github.com/SushantaBhowmick', false, true, 6);

INSERT INTO skill_categories (key, title, color, icon_key, sort_order) VALUES
  ('frontend', 'Frontend', 'from-blue-500 to-cyan-500', 'Code', 1),
  ('backend', 'Backend', 'from-green-500 to-emerald-500', 'Server', 2),
  ('tools', 'Tools & Others', 'from-purple-500 to-pink-500', 'Wrench', 3);

INSERT INTO skills (category_id, name, level, description, sort_order)
SELECT c.id, s.name, s.level, s.description, s.sort_order
FROM skill_categories c
JOIN (
  VALUES
    ('frontend', 'React.js', 95, 'Advanced React patterns, hooks, and optimization', 1),
    ('frontend', 'Next.js', 90, 'App Router, SSR, SSG, and modern Next.js features', 2),
    ('frontend', 'TypeScript', 90, 'Type-safe development with advanced TS patterns', 3),
    ('frontend', 'Tailwind CSS', 92, 'Modern utility-first CSS framework', 4),
    ('frontend', 'Angular', 85, 'MEAN stack development and enterprise applications', 5),
    ('frontend', 'JavaScript', 95, 'ES6+, modern JavaScript and advanced patterns', 6),
    ('backend', 'Node.js', 92, 'Server-side JavaScript and API development', 1),
    ('backend', 'Express.js', 90, 'RESTful APIs and middleware development', 2),
    ('backend', 'MongoDB', 88, 'NoSQL database design and aggregation', 3),
    ('backend', 'PostgreSQL', 85, 'Relational database design and optimization', 4),
    ('backend', 'Supabase', 85, 'Modern backend-as-a-service platform', 5),
    ('backend', 'Stripe', 88, 'Payment integration and processing systems', 6),
    ('tools', 'Git & GitHub', 95, 'Version control and collaborative development', 1),
    ('tools', 'AWS', 85, 'Cloud services and deployment solutions', 2),
    ('tools', 'Swagger', 88, 'API documentation and testing', 3),
    ('tools', 'Docker', 78, 'Containerization and deployment', 4),
    ('tools', 'Vercel', 90, 'Modern deployment and hosting platform', 5),
    ('tools', 'Prisma', 82, 'Database ORM and query optimization', 6)
) AS s(cat_key, name, level, description, sort_order)
  ON c.key = s.cat_key;

INSERT INTO learning_tags (label, sort_order) VALUES
  ('AI/ML', 1), ('Web3', 2), ('Rust', 3), ('Go', 4), ('Kubernetes', 5), ('Microservices', 6);

INSERT INTO about_highlights (icon_key, title, description, sort_order) VALUES
  ('Code2', 'Clean Code', 'Writing maintainable, scalable, and efficient code is my passion.', 1),
  ('Lightbulb', 'Innovation', 'Always exploring new technologies and creative solutions.', 2),
  ('Target', 'Results-Driven', 'Focused on delivering exceptional results that exceed expectations.', 3);

INSERT INTO journey_items (year, title, description, sort_order) VALUES
  ('2020-22', 'Foundation Building', 'Completed Diploma in Computer Science & Technology from Elite Institute', 1),
  ('2022', 'Professional Start', 'Started at Dhisar Infotech & Kalyani, building LMS and payment systems', 2),
  ('2022-25', 'Academic Excellence', 'Pursuing BTech in Computer Science from Guru Nanak Institution Of Technology', 3),
  ('2024-Present', 'Senior Developer', 'Full-Stack Developer at Xpliv Technologies, building enterprise solutions', 4);

INSERT INTO fun_facts (label, icon_key, sort_order) VALUES
  ('Coffee Enthusiast', 'Coffee', 1),
  ('Open Source', 'Heart', 2),
  ('Clean Code', 'Code2', 3);

INSERT INTO automations (key, name, description, enabled, config) VALUES
  (
    'contact_notify',
    'New contact notification',
    'Send a webhook or email alert when someone submits the contact form.',
    false,
    '{"webhook_url":"","email":""}'::jsonb
  );

INSERT INTO site_settings (seo_title, seo_description, show_about, show_skills, show_projects, show_contact)
VALUES (
  'Sushanta Bhowmick | Full-Stack Developer',
  'Full-Stack Developer specializing in MERN & MEAN stack with 3+ years of experience. Expert in React, Next.js, Node.js, and modern web technologies.',
  true, true, true, true
);
