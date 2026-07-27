import type {
  AboutHighlight,
  FunFact,
  HeroRole,
  JourneyItem,
  LearningTag,
  PortfolioData,
  Profile,
  Project,
  Skill,
  SkillCategory,
  SiteSettings,
} from "@/lib/supabase/types";

export const fallbackProfile: Profile = {
  id: "fallback",
  full_name: "Sushanta Bhowmick",
  display_name: "Sushanta",
  headline: "Full-Stack Developer",
  bio_short:
    "I craft exceptional digital experiences using MERN & MEAN stack with 3+ years of experience. Specializing in React, Next.js, Node.js, TypeScript, and modern web technologies.",
  bio_long:
    "My journey in web development started with a BTech in Computer Science & Technology and has evolved into 3+ years of hands-on experience building scalable web applications. I specialize in both MERN and MEAN stacks, creating everything from e-commerce platforms to learning management systems.\n\nCurrently working at Xpliv Technologies as a Full-Stack Developer, I've built enterprise solutions including Golf Course Management Systems and client in-house products using cutting-edge technologies like TypeScript, React, Node.js, and AWS.",
  availability_text: "Available for new opportunities",
  is_available: true,
  email: "bhosushanta922@gmail.com",
  phone: "+91 8017068720",
  location: "Kolkata, West Bengal, India",
  github_url: "https://github.com/SushantaBhowmick",
  linkedin_url: "https://www.linkedin.com/in/sushanta-bhowmick",
  calendar_url: null,
  years_experience: "3+",
  projects_completed: "25+",
  client_satisfaction: "100%",
};

export const fallbackHeroRoles: HeroRole[] = [
  { id: "1", label: "Full-Stack Developer", sort_order: 1, is_active: true },
  { id: "2", label: "React Specialist", sort_order: 2, is_active: true },
  { id: "3", label: "Node.js Expert", sort_order: 3, is_active: true },
  { id: "4", label: "UI/UX Enthusiast", sort_order: 4, is_active: true },
  { id: "5", label: "Problem Solver", sort_order: 5, is_active: true },
];

export const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Golf Course Management System",
    description:
      "Enterprise-level management system for golf courses with client in-house product features, built using modern TypeScript and React technologies.",
    image_url: null,
    category: "Full-Stack",
    technologies: ["TypeScript", "React.js", "Node.js", "TailwindCSS", "AWS", "Swagger"],
    live_url: "https://example.com",
    github_url: "https://github.com/SushantaBhowmick",
    featured: true,
    is_published: true,
    sort_order: 1,
  },
  {
    id: "2",
    title: "Ecommerce App - MERN Stack",
    description:
      "Complete e-commerce solution with product catalog, cart, payments, and user management built with MERN stack technologies.",
    image_url: null,
    category: "Full-Stack",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    live_url: "https://example.com",
    github_url: "https://github.com/SushantaBhowmick",
    featured: true,
    is_published: true,
    sort_order: 2,
  },
  {
    id: "3",
    title: "Learning Management System",
    description:
      "Comprehensive LMS where students can attend live classes, access courses, get certificates, and age-based course recommendations.",
    image_url: null,
    category: "Full-Stack",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC"],
    live_url: "https://example.com",
    github_url: "https://github.com/SushantaBhowmick",
    featured: true,
    is_published: true,
    sort_order: 3,
  },
  {
    id: "4",
    title: "Course Bundler",
    description:
      "Full-stack course management platform with payment integration using Stripe and modern authentication systems.",
    image_url: null,
    category: "Full-Stack",
    technologies: ["React", "Next.js", "Node.js", "Stripe", "Supabase"],
    live_url: "https://example.com",
    github_url: "https://github.com/SushantaBhowmick",
    featured: false,
    is_published: true,
    sort_order: 4,
  },
  {
    id: "5",
    title: "Real-Time Workspace (SaaS)",
    description:
      "Scalable SaaS platform for real-time collaboration with workspace management and team features.",
    image_url: null,
    category: "Full-Stack",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "AWS"],
    live_url: "https://example.com",
    github_url: "https://github.com/SushantaBhowmick",
    featured: false,
    is_published: true,
    sort_order: 5,
  },
  {
    id: "6",
    title: "Social Media App",
    description:
      "Full-featured social media platform with user profiles, posts, comments, and real-time notifications.",
    image_url: null,
    category: "Full-Stack",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    live_url: "https://example.com",
    github_url: "https://github.com/SushantaBhowmick",
    featured: false,
    is_published: true,
    sort_order: 6,
  },
];

export const fallbackSkillCategories: SkillCategory[] = [
  {
    id: "frontend",
    key: "frontend",
    title: "Frontend",
    color: "from-blue-500 to-cyan-500",
    icon_key: "Code",
    sort_order: 1,
  },
  {
    id: "backend",
    key: "backend",
    title: "Backend",
    color: "from-green-500 to-emerald-500",
    icon_key: "Server",
    sort_order: 2,
  },
  {
    id: "tools",
    key: "tools",
    title: "Tools & Others",
    color: "from-purple-500 to-pink-500",
    icon_key: "Wrench",
    sort_order: 3,
  },
];

export const fallbackSkills: Skill[] = [
  { id: "1", category_id: "frontend", name: "React.js", level: 95, description: "Advanced React patterns, hooks, and optimization", sort_order: 1, is_published: true },
  { id: "2", category_id: "frontend", name: "Next.js", level: 90, description: "App Router, SSR, SSG, and modern Next.js features", sort_order: 2, is_published: true },
  { id: "3", category_id: "frontend", name: "TypeScript", level: 90, description: "Type-safe development with advanced TS patterns", sort_order: 3, is_published: true },
  { id: "4", category_id: "frontend", name: "Tailwind CSS", level: 92, description: "Modern utility-first CSS framework", sort_order: 4, is_published: true },
  { id: "5", category_id: "frontend", name: "Angular", level: 85, description: "MEAN stack development and enterprise applications", sort_order: 5, is_published: true },
  { id: "6", category_id: "frontend", name: "JavaScript", level: 95, description: "ES6+, modern JavaScript and advanced patterns", sort_order: 6, is_published: true },
  { id: "7", category_id: "backend", name: "Node.js", level: 92, description: "Server-side JavaScript and API development", sort_order: 1, is_published: true },
  { id: "8", category_id: "backend", name: "Express.js", level: 90, description: "RESTful APIs and middleware development", sort_order: 2, is_published: true },
  { id: "9", category_id: "backend", name: "MongoDB", level: 88, description: "NoSQL database design and aggregation", sort_order: 3, is_published: true },
  { id: "10", category_id: "backend", name: "PostgreSQL", level: 85, description: "Relational database design and optimization", sort_order: 4, is_published: true },
  { id: "11", category_id: "backend", name: "Supabase", level: 85, description: "Modern backend-as-a-service platform", sort_order: 5, is_published: true },
  { id: "12", category_id: "backend", name: "Stripe", level: 88, description: "Payment integration and processing systems", sort_order: 6, is_published: true },
  { id: "13", category_id: "tools", name: "Git & GitHub", level: 95, description: "Version control and collaborative development", sort_order: 1, is_published: true },
  { id: "14", category_id: "tools", name: "AWS", level: 85, description: "Cloud services and deployment solutions", sort_order: 2, is_published: true },
  { id: "15", category_id: "tools", name: "Swagger", level: 88, description: "API documentation and testing", sort_order: 3, is_published: true },
  { id: "16", category_id: "tools", name: "Docker", level: 78, description: "Containerization and deployment", sort_order: 4, is_published: true },
  { id: "17", category_id: "tools", name: "Vercel", level: 90, description: "Modern deployment and hosting platform", sort_order: 5, is_published: true },
  { id: "18", category_id: "tools", name: "Prisma", level: 82, description: "Database ORM and query optimization", sort_order: 6, is_published: true },
];

export const fallbackLearningTags: LearningTag[] = [
  { id: "1", label: "AI/ML", sort_order: 1 },
  { id: "2", label: "Web3", sort_order: 2 },
  { id: "3", label: "Rust", sort_order: 3 },
  { id: "4", label: "Go", sort_order: 4 },
  { id: "5", label: "Kubernetes", sort_order: 5 },
  { id: "6", label: "Microservices", sort_order: 6 },
];

export const fallbackHighlights: AboutHighlight[] = [
  { id: "1", icon_key: "Code2", title: "Clean Code", description: "Writing maintainable, scalable, and efficient code is my passion.", sort_order: 1 },
  { id: "2", icon_key: "Lightbulb", title: "Innovation", description: "Always exploring new technologies and creative solutions.", sort_order: 2 },
  { id: "3", icon_key: "Target", title: "Results-Driven", description: "Focused on delivering exceptional results that exceed expectations.", sort_order: 3 },
];

export const fallbackJourney: JourneyItem[] = [
  { id: "1", year: "2020-22", title: "Foundation Building", description: "Completed Diploma in Computer Science & Technology from Elite Institute", sort_order: 1 },
  { id: "2", year: "2022", title: "Professional Start", description: "Started at Dhisar Infotech & Kalyani, building LMS and payment systems", sort_order: 2 },
  { id: "3", year: "2022-25", title: "Academic Excellence", description: "Pursuing BTech in Computer Science from Guru Nanak Institution Of Technology", sort_order: 3 },
  { id: "4", year: "2024-Present", title: "Senior Developer", description: "Full-Stack Developer at Xpliv Technologies, building enterprise solutions", sort_order: 4 },
];

export const fallbackFunFacts: FunFact[] = [
  { id: "1", label: "Coffee Enthusiast", icon_key: "Coffee", sort_order: 1 },
  { id: "2", label: "Open Source", icon_key: "Heart", sort_order: 2 },
  { id: "3", label: "Clean Code", icon_key: "Code2", sort_order: 3 },
];

export const fallbackSettings: SiteSettings = {
  id: "fallback",
  seo_title: "Sushanta Bhowmick | Full-Stack Developer",
  seo_description:
    "Full-Stack Developer specializing in MERN & MEAN stack with 3+ years of experience.",
  og_image_url: null,
  show_about: true,
  show_skills: true,
  show_projects: true,
  show_contact: true,
};

export const fallbackPortfolio: PortfolioData = {
  profile: fallbackProfile,
  heroRoles: fallbackHeroRoles,
  activeResume: null,
  projects: fallbackProjects,
  skillCategories: fallbackSkillCategories,
  skills: fallbackSkills,
  learningTags: fallbackLearningTags,
  highlights: fallbackHighlights,
  journey: fallbackJourney,
  funFacts: fallbackFunFacts,
  settings: fallbackSettings,
};
