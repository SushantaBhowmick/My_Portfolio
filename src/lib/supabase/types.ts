export type Profile = {
  id: string;
  full_name: string;
  display_name: string;
  headline: string | null;
  bio_short: string | null;
  bio_long: string | null;
  availability_text: string | null;
  is_available: boolean;
  email: string | null;
  phone: string | null;
  location: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  calendar_url: string | null;
  years_experience: string | null;
  projects_completed: string | null;
  client_satisfaction: string | null;
  updated_at?: string;
};

export type HeroRole = {
  id: string;
  label: string;
  sort_order: number;
  is_active: boolean;
};

export type Resume = {
  id: string;
  file_path: string;
  file_url: string;
  file_name: string;
  version_label: string | null;
  is_active: boolean;
  uploaded_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string;
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type SkillCategory = {
  id: string;
  key: string;
  title: string;
  color: string;
  icon_key: string;
  sort_order: number;
};

export type Skill = {
  id: string;
  category_id: string;
  name: string;
  level: number;
  description: string;
  sort_order: number;
  is_published: boolean;
};

export type LearningTag = {
  id: string;
  label: string;
  sort_order: number;
};

export type AboutHighlight = {
  id: string;
  icon_key: string;
  title: string;
  description: string;
  sort_order: number;
};

export type JourneyItem = {
  id: string;
  year: string;
  title: string;
  description: string;
  sort_order: number;
};

export type FunFact = {
  id: string;
  label: string;
  icon_key: string;
  sort_order: number;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
};

export type Automation = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  enabled: boolean;
  config: {
    webhook_url?: string;
    email?: string;
  };
  updated_at?: string;
};

export type SiteSettings = {
  id: string;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  show_about: boolean;
  show_skills: boolean;
  show_projects: boolean;
  show_contact: boolean;
};

export type PortfolioData = {
  profile: Profile;
  heroRoles: HeroRole[];
  activeResume: Resume | null;
  projects: Project[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  learningTags: LearningTag[];
  highlights: AboutHighlight[];
  journey: JourneyItem[];
  funFacts: FunFact[];
  settings: SiteSettings | null;
};
