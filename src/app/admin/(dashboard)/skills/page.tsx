import { createClient } from "@/lib/supabase/server";
import { SkillsManager } from "@/components/admin/skills-manager";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const [categories, skills, learningTags] = await Promise.all([
    supabase.from("skill_categories").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("learning_tags").select("*").order("sort_order"),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Skills</h1>
        <p className="text-muted-foreground">
          Manage categories, skill levels, and learning tags
        </p>
      </div>
      <SkillsManager
        categories={categories.data ?? []}
        skills={skills.data ?? []}
        learningTags={learningTags.data ?? []}
      />
    </div>
  );
}
