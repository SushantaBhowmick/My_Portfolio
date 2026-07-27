import { prisma } from "@/lib/prisma";
import type {
  AboutHighlight,
  Automation,
  ContactSubmission,
  FunFact,
  HeroRole,
  JourneyItem,
  LearningTag,
  Profile,
  Project,
  Resume,
  Skill,
  SkillCategory,
} from "@/lib/supabase/types";

function iso(value: Date | null | undefined) {
  return value?.toISOString() ?? "";
}

export async function getAdminProfile() {
  const [profile, roles] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.heroRole.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!profile) {
    return { profile: null, roles: [] as HeroRole[] };
  }

  const mappedProfile: Profile = {
    id: profile.id,
    full_name: profile.fullName,
    display_name: profile.displayName,
    headline: profile.headline,
    bio_short: profile.bioShort,
    bio_long: profile.bioLong,
    availability_text: profile.availabilityText,
    is_available: profile.isAvailable ?? true,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    github_url: profile.githubUrl,
    linkedin_url: profile.linkedinUrl,
    calendar_url: profile.calendarUrl,
    years_experience: profile.yearsExperience,
    projects_completed: profile.projectsCompleted,
    client_satisfaction: profile.clientSatisfaction,
    updated_at: iso(profile.updatedAt),
  };

  const mappedRoles: HeroRole[] = roles.map((r) => ({
    id: r.id,
    label: r.label,
    sort_order: r.sortOrder ?? 0,
    is_active: r.isActive ?? true,
  }));

  return { profile: mappedProfile, roles: mappedRoles };
}

export async function getAdminProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return rows.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image_url: p.imageUrl,
    category: p.category,
    technologies: p.technologies ?? [],
    live_url: p.liveUrl,
    github_url: p.githubUrl,
    featured: p.featured ?? false,
    is_published: p.isPublished ?? true,
    sort_order: p.sortOrder ?? 0,
    created_at: iso(p.createdAt),
    updated_at: iso(p.updatedAt),
  }));
}

export async function getAdminSkills() {
  const [categories, skills, learningTags] = await Promise.all([
    prisma.skillCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.learningTag.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const mappedCategories: SkillCategory[] = categories.map((c) => ({
    id: c.id,
    key: c.key,
    title: c.title,
    color: c.color ?? "from-blue-500 to-cyan-500",
    icon_key: c.iconKey ?? "Code",
    sort_order: c.sortOrder ?? 0,
  }));

  const mappedSkills: Skill[] = skills.map((s) => ({
    id: s.id,
    category_id: s.categoryId,
    name: s.name,
    level: s.level,
    description: s.description ?? "",
    sort_order: s.sortOrder ?? 0,
    is_published: s.isPublished ?? true,
  }));

  const mappedTags: LearningTag[] = learningTags.map((t) => ({
    id: t.id,
    label: t.label,
    sort_order: t.sortOrder ?? 0,
  }));

  return {
    categories: mappedCategories,
    skills: mappedSkills,
    learningTags: mappedTags,
  };
}

export async function getAdminAbout() {
  const [highlights, journey, funFacts] = await Promise.all([
    prisma.aboutHighlight.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.journeyItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.funFact.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const mappedHighlights: AboutHighlight[] = highlights.map((h) => ({
    id: h.id,
    icon_key: h.iconKey ?? "Code2",
    title: h.title,
    description: h.description,
    sort_order: h.sortOrder ?? 0,
  }));

  const mappedJourney: JourneyItem[] = journey.map((j) => ({
    id: j.id,
    year: j.year,
    title: j.title,
    description: j.description,
    sort_order: j.sortOrder ?? 0,
  }));

  const mappedFacts: FunFact[] = funFacts.map((f) => ({
    id: f.id,
    label: f.label,
    icon_key: f.iconKey ?? "Coffee",
    sort_order: f.sortOrder ?? 0,
  }));

  return {
    highlights: mappedHighlights,
    journey: mappedJourney,
    funFacts: mappedFacts,
  };
}

export async function getAdminResumes(): Promise<Resume[]> {
  const rows = await prisma.resume.findMany({
    orderBy: { uploadedAt: "desc" },
  });
  return rows.map((r) => ({
    id: r.id,
    file_path: r.filePath,
    file_url: r.fileUrl,
    file_name: r.fileName,
    version_label: r.versionLabel,
    is_active: r.isActive ?? false,
    uploaded_at: iso(r.uploadedAt),
  }));
}

export async function getAdminMessages(): Promise<ContactSubmission[]> {
  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return rows.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    status: (m.status as ContactSubmission["status"]) ?? "new",
    created_at: iso(m.createdAt),
  }));
}

export async function getAdminAutomations(): Promise<Automation[]> {
  const rows = await prisma.automation.findMany({ orderBy: { name: "asc" } });
  return rows.map((a) => ({
    id: a.id,
    key: a.key,
    name: a.name,
    description: a.description,
    enabled: a.enabled ?? false,
    config: (a.config as Automation["config"]) ?? {},
    updated_at: iso(a.updatedAt),
  }));
}
