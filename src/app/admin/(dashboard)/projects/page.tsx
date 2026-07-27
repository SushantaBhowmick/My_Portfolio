import { createClient } from "@/lib/supabase/server";
import { ProjectsManager } from "@/components/admin/projects-manager";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-muted-foreground">
          Add, edit, reorder, and upload project images
        </p>
      </div>
      <ProjectsManager projects={data ?? []} />
    </div>
  );
}
