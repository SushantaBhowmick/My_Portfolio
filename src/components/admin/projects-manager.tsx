"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  image_url: null,
  category: "Full-Stack",
  technologies: [],
  live_url: "",
  github_url: "",
  featured: false,
  is_published: true,
  sort_order: 0,
};

export function ProjectsManager({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [list, setList] = useState(projects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);

  const startNew = () => {
    setEditing({
      id: "new",
      ...emptyProject,
      sort_order: list.length + 1,
    });
    setTechInput("");
  };

  const startEdit = (project: Project) => {
    setEditing(project);
    setTechInput(project.technologies?.join(", ") ?? "");
  };

  const uploadImage = async (file: File | null) => {
    if (!file || !editing) return;
    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage
      .from("project-images")
      .upload(path, file, { upsert: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("project-images").getPublicUrl(path);
    setEditing({ ...editing, image_url: publicUrl });
    toast.success("Image uploaded");
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        title: editing.title,
        description: editing.description,
        image_url: editing.image_url,
        category: editing.category,
        technologies: techInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        live_url: editing.live_url,
        github_url: editing.github_url,
        featured: editing.featured,
        is_published: editing.is_published,
        sort_order: editing.sort_order,
        updated_at: new Date().toISOString(),
      };

      if (editing.id === "new") {
        const { data, error } = await supabase
          .from("projects")
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        setList((prev) => [...prev, data]);
      } else {
        const { data, error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editing.id)
          .select()
          .single();
        if (error) throw error;
        setList((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      }
      setEditing(null);
      toast.success("Project saved");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setList((prev) => prev.filter((p) => p.id !== id));
    if (editing?.id === id) setEditing(null);
    toast.success("Project deleted");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={startNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add project
        </Button>
      </div>

      {editing && (
        <Card>
          <CardContent className="grid gap-4 p-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                rows={4}
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort order</label>
              <Input
                type="number"
                value={editing.sort_order}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    sort_order: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Live URL</label>
              <Input
                value={editing.live_url ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, live_url: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub URL</label>
              <Input
                value={editing.github_url ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, github_url: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Technologies (comma separated)
              </label>
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                value={editing.image_url ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, image_url: e.target.value })
                }
                placeholder="Or upload below"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e.target.files?.[0] ?? null)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) =>
                  setEditing({ ...editing, featured: e.target.checked })
                }
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.is_published}
                onChange={(e) =>
                  setEditing({ ...editing, is_published: e.target.checked })
                }
              />
              Published
            </label>
            <div className="flex gap-2 md:col-span-2">
              <Button onClick={save} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {list.map((project) => (
          <Card key={project.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{project.title}</p>
                  {project.featured && <Badge>Featured</Badge>}
                  {!project.is_published && (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.category} · order {project.sort_order}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(project)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => remove(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
