"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { LearningTag, Skill, SkillCategory } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export function SkillsManager({
  categories,
  skills,
  learningTags,
}: {
  categories: SkillCategory[];
  skills: Skill[];
  learningTags: LearningTag[];
}) {
  const router = useRouter();
  const [skillList, setSkillList] = useState(skills);
  const [tags, setTags] = useState(learningTags);
  const [form, setForm] = useState({
    category_id: categories[0]?.id ?? "",
    name: "",
    level: 80,
    description: "",
  });
  const [newTag, setNewTag] = useState("");

  const addSkill = async () => {
    if (!form.name || !form.category_id) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("skills")
      .insert({
        ...form,
        sort_order: skillList.filter((s) => s.category_id === form.category_id).length + 1,
        is_published: true,
      })
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setSkillList((prev) => [...prev, data]);
    setForm((prev) => ({ ...prev, name: "", description: "", level: 80 }));
    toast.success("Skill added");
    router.refresh();
  };

  const updateSkill = async (skill: Skill, patch: Partial<Skill>) => {
    const supabase = createClient();
    const next = { ...skill, ...patch };
    const { error } = await supabase
      .from("skills")
      .update({
        name: next.name,
        level: next.level,
        description: next.description,
      })
      .eq("id", skill.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSkillList((prev) => prev.map((s) => (s.id === skill.id ? next : s)));
  };

  const removeSkill = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSkillList((prev) => prev.filter((s) => s.id !== id));
    toast.success("Skill deleted");
    router.refresh();
  };

  const addTag = async () => {
    if (!newTag.trim()) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("learning_tags")
      .insert({ label: newTag.trim(), sort_order: tags.length + 1 })
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setTags((prev) => [...prev, data]);
    setNewTag("");
    router.refresh();
  };

  const removeTag = async (id: string) => {
    const supabase = createClient();
    await supabase.from("learning_tags").delete().eq("id", id);
    setTags((prev) => prev.filter((t) => t.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="grid gap-3 p-6 md:grid-cols-4">
          <select
            className="h-9 rounded-md border bg-transparent px-3 text-sm"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <Input
            placeholder="Skill name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            type="number"
            min={0}
            max={100}
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: Number(e.target.value) || 0 })
            }
          />
          <Button onClick={addSkill}>
            <Plus className="mr-2 h-4 w-4" />
            Add skill
          </Button>
          <Input
            className="md:col-span-4"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </CardContent>
      </Card>

      {categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <h2 className="text-xl font-semibold">{category.title}</h2>
          {skillList
            .filter((s) => s.category_id === category.id)
            .map((skill) => (
              <Card key={skill.id}>
                <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_100px_1fr_auto]">
                  <Input
                    value={skill.name}
                    onChange={(e) =>
                      setSkillList((prev) =>
                        prev.map((s) =>
                          s.id === skill.id ? { ...s, name: e.target.value } : s
                        )
                      )
                    }
                    onBlur={(e) =>
                      updateSkill(skill, { name: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    value={skill.level}
                    onChange={(e) =>
                      setSkillList((prev) =>
                        prev.map((s) =>
                          s.id === skill.id
                            ? { ...s, level: Number(e.target.value) || 0 }
                            : s
                        )
                      )
                    }
                    onBlur={(e) =>
                      updateSkill(skill, {
                        level: Number(e.target.value) || 0,
                      })
                    }
                  />
                  <Input
                    value={skill.description}
                    onChange={(e) =>
                      setSkillList((prev) =>
                        prev.map((s) =>
                          s.id === skill.id
                            ? { ...s, description: e.target.value }
                            : s
                        )
                      )
                    }
                    onBlur={(e) =>
                      updateSkill(skill, { description: e.target.value })
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      ))}

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Currently learning</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
              >
                {tag.label}
                <button onClick={() => removeTag(tag.id)} type="button">
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="New tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <Button onClick={addTag}>Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
