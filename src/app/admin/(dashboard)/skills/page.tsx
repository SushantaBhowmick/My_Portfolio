import { SkillsManager } from "@/components/admin/skills-manager";
import { getAdminSkills } from "@/lib/admin/queries";

export default async function AdminSkillsPage() {
  const { categories, skills, learningTags } = await getAdminSkills();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Skills</h1>
        <p className="text-muted-foreground">
          Manage categories, skill levels, and learning tags
        </p>
      </div>
      <SkillsManager
        categories={categories}
        skills={skills}
        learningTags={learningTags}
      />
    </div>
  );
}
