import { ResumeManager } from "@/components/admin/resume-manager";
import { getAdminResumes } from "@/lib/admin/queries";

export default async function AdminResumePage() {
  const resumes = await getAdminResumes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Resume</h1>
        <p className="text-muted-foreground">
          Upload a PDF — the public Download Resume button uses the active file
        </p>
      </div>
      <ResumeManager resumes={resumes} />
    </div>
  );
}
