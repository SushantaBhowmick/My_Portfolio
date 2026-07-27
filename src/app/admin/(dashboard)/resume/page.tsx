import { createClient } from "@/lib/supabase/server";
import { ResumeManager } from "@/components/admin/resume-manager";

export default async function AdminResumePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("resumes")
    .select("*")
    .order("uploaded_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Resume</h1>
        <p className="text-muted-foreground">
          Upload a PDF — the public Download Resume button uses the active file
        </p>
      </div>
      <ResumeManager resumes={data ?? []} />
    </div>
  );
}
