import { prisma } from "@/lib/prisma";
import type {
  AboutHighlight,
  Automation,
  FunFact,
  HeroRole,
  JourneyItem,
  LearningTag,
  PortfolioData,
  Profile,
  Project,
  Resume,
  Skill,
  SkillCategory,
  SiteSettings,
} from "@/lib/supabase/types";
import { fallbackPortfolio } from "@/lib/portfolio/fallbacks";

function mapProfile(row: {
  id: string;
  fullName: string;
  displayName: string;
  headline: string | null;
  bioShort: string | null;
  bioLong: string | null;
  availabilityText: string | null;
  isAvailable: boolean | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  calendarUrl: string | null;
  yearsExperience: string | null;
  projectsCompleted: string | null;
  clientSatisfaction: string | null;
}): Profile {
  return {
    id: row.id,
    full_name: row.fullName,
    display_name: row.displayName,
    headline: row.headline,
    bio_short: row.bioShort,
    bio_long: row.bioLong,
    availability_text: row.availabilityText,
    is_available: row.isAvailable ?? true,
    email: row.email,
    phone: row.phone,
    location: row.location,
    github_url: row.githubUrl,
    linkedin_url: row.linkedinUrl,
    calendar_url: row.calendarUrl,
    years_experience: row.yearsExperience,
    projects_completed: row.projectsCompleted,
    client_satisfaction: row.clientSatisfaction,
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const [
      profile,
      heroRoles,
      activeResume,
      projects,
      skillCategories,
      skills,
      learningTags,
      highlights,
      journey,
      funFacts,
      settings,
    ] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.heroRole.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.resume.findFirst({ where: { isActive: true } }),
      prisma.project.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.skillCategory.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.skill.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.learningTag.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.aboutHighlight.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.journeyItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.funFact.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.siteSettings.findFirst(),
    ]);

    if (!profile) {
      return fallbackPortfolio;
    }

    const mappedRoles: HeroRole[] = heroRoles.map((r) => ({
      id: r.id,
      label: r.label,
      sort_order: r.sortOrder ?? 0,
      is_active: r.isActive ?? true,
    }));

    const mappedResume: Resume | null = activeResume
      ? {
          id: activeResume.id,
          file_path: activeResume.filePath,
          file_url: activeResume.fileUrl,
          file_name: activeResume.fileName,
          version_label: activeResume.versionLabel,
          is_active: activeResume.isActive ?? false,
          uploaded_at: activeResume.uploadedAt?.toISOString() ?? "",
        }
      : null;

    const mappedProjects: Project[] = projects.map((p) => ({
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
    }));

    const mappedCategories: SkillCategory[] = skillCategories.map((c) => ({
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

    const mappedLearning: LearningTag[] = learningTags.map((t) => ({
      id: t.id,
      label: t.label,
      sort_order: t.sortOrder ?? 0,
    }));

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

    const mappedSettings: SiteSettings | null = settings
      ? {
          id: settings.id,
          seo_title: settings.seoTitle,
          seo_description: settings.seoDescription,
          og_image_url: settings.ogImageUrl,
          show_about: settings.showAbout ?? true,
          show_skills: settings.showSkills ?? true,
          show_projects: settings.showProjects ?? true,
          show_contact: settings.showContact ?? true,
        }
      : null;

    return {
      profile: mapProfile(profile),
      heroRoles: mappedRoles.length ? mappedRoles : fallbackPortfolio.heroRoles,
      activeResume: mappedResume,
      projects: mappedProjects.length
        ? mappedProjects
        : fallbackPortfolio.projects,
      skillCategories: mappedCategories.length
        ? mappedCategories
        : fallbackPortfolio.skillCategories,
      skills: mappedSkills.length ? mappedSkills : fallbackPortfolio.skills,
      learningTags: mappedLearning.length
        ? mappedLearning
        : fallbackPortfolio.learningTags,
      highlights: mappedHighlights.length
        ? mappedHighlights
        : fallbackPortfolio.highlights,
      journey: mappedJourney.length ? mappedJourney : fallbackPortfolio.journey,
      funFacts: mappedFacts.length ? mappedFacts : fallbackPortfolio.funFacts,
      settings: mappedSettings ?? fallbackPortfolio.settings,
    };
  } catch (error) {
    console.error("Failed to load portfolio data via Prisma:", error);
    return fallbackPortfolio;
  }
}

export async function getAutomations(): Promise<Automation[]> {
  const rows = await prisma.automation.findMany({ orderBy: { name: "asc" } });
  return rows.map((a) => ({
    id: a.id,
    key: a.key,
    name: a.name,
    description: a.description,
    enabled: a.enabled ?? false,
    config: (a.config as Automation["config"]) ?? {},
  }));
}
