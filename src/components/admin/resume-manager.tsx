"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Resume } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function ResumeManager({ resumes }: { resumes: Resume[] }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [label, setLabel] = useState("");
  const [list, setList] = useState(resumes);

  const upload = async (file: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF");
      return;
    }
    setUploading(true);
    try {
      const supabase = createClient();
      const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, file, { contentType: "application/pdf", upsert: false });
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("resumes").getPublicUrl(path);

      // Deactivate others first
      await supabase.from("resumes").update({ is_active: false }).eq("is_active", true);

      const { data, error } = await supabase
        .from("resumes")
        .insert({
          file_path: path,
          file_url: publicUrl,
          file_name: file.name,
          version_label: label || null,
          is_active: true,
        })
        .select()
        .single();
      if (error) throw error;

      setList((prev) => [
        data,
        ...prev.map((r) => ({ ...r, is_active: false })),
      ]);
      setLabel("");
      toast.success("Resume uploaded and set active");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const activate = async (id: string) => {
    const supabase = createClient();
    await supabase.from("resumes").update({ is_active: false }).eq("is_active", true);
    const { error } = await supabase
      .from("resumes")
      .update({ is_active: true })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setList((prev) =>
      prev.map((r) => ({ ...r, is_active: r.id === id }))
    );
    toast.success("Active resume updated");
    router.refresh();
  };

  const remove = async (resume: Resume) => {
    const supabase = createClient();
    await supabase.storage.from("resumes").remove([resume.file_path]);
    const { error } = await supabase.from("resumes").delete().eq("id", resume.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setList((prev) => prev.filter((r) => r.id !== resume.id));
    toast.success("Resume deleted");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Upload new resume</h2>
          <Input
            placeholder="Version label (optional) e.g. Mar 2026"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <Input
            type="file"
            accept="application/pdf"
            disabled={uploading}
            onChange={(e) => upload(e.target.files?.[0] ?? null)}
          />
          {uploading && (
            <p className="text-sm text-muted-foreground">Uploading...</p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        {list.map((resume) => (
          <Card key={resume.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{resume.file_name}</p>
                  {resume.is_active && <Badge>Active</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {resume.version_label ? `${resume.version_label} · ` : ""}
                  {new Date(resume.uploaded_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={resume.file_url} target="_blank" rel="noreferrer">
                    Preview
                  </a>
                </Button>
                {!resume.is_active && (
                  <Button size="sm" onClick={() => activate(resume.id)}>
                    Set active
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => remove(resume)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {list.length === 0 && (
          <p className="text-muted-foreground">No resumes uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
