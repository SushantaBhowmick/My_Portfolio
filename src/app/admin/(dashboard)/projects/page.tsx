import { ProjectsManager } from "@/components/admin/projects-manager";
import { getAdminProjects } from "@/lib/admin/queries";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-muted-foreground">
          Add, edit, reorder, and upload project images
        </p>
      </div>
      <ProjectsManager projects={projects} />
    </div>
  );
}
