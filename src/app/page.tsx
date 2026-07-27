import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { getPortfolioData } from "@/lib/portfolio/data";

export const revalidate = 60;

export default async function Home() {
  const data = await getPortfolioData();
  const settings = data.settings;

  return (
    <div className="min-h-screen bg-background">
      <Navigation profile={data.profile} />
      <main>
        <HeroSection
          profile={data.profile}
          roles={data.heroRoles}
          resumeUrl={data.activeResume?.file_url ?? null}
        />
        {settings?.show_about !== false && (
          <AboutSection
            profile={data.profile}
            highlights={data.highlights}
            journey={data.journey}
            funFacts={data.funFacts}
          />
        )}
        {settings?.show_skills !== false && (
          <SkillsSection
            categories={data.skillCategories}
            skills={data.skills}
            learningTags={data.learningTags}
          />
        )}
        {settings?.show_projects !== false && (
          <ProjectsSection projects={data.projects} />
        )}
        {settings?.show_contact !== false && (
          <ContactSection profile={data.profile} />
        )}
      </main>
      <Footer profile={data.profile} />
    </div>
  );
}
