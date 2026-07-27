"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { HeroRole, Profile } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export function ProfileForm({
  profile,
  roles,
}: {
  profile: Profile;
  roles: HeroRole[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(profile);
  const [roleList, setRoleList] = useState(roles);
  const [newRole, setNewRole] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (key: keyof Profile, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: form.full_name,
          display_name: form.display_name,
          headline: form.headline,
          bio_short: form.bio_short,
          bio_long: form.bio_long,
          availability_text: form.availability_text,
          is_available: form.is_available,
          email: form.email,
          phone: form.phone,
          location: form.location,
          github_url: form.github_url,
          linkedin_url: form.linkedin_url,
          calendar_url: form.calendar_url,
          years_experience: form.years_experience,
          projects_completed: form.projects_completed,
          client_satisfaction: form.client_satisfaction,
          updated_at: new Date().toISOString(),
        })
        .eq("id", form.id);
      if (error) throw error;
      toast.success("Profile saved");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const addRole = async () => {
    if (!newRole.trim()) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("hero_roles")
      .insert({
        label: newRole.trim(),
        sort_order: roleList.length + 1,
        is_active: true,
      })
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setRoleList((prev) => [...prev, data]);
    setNewRole("");
    toast.success("Role added");
    router.refresh();
  };

  const removeRole = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("hero_roles").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRoleList((prev) => prev.filter((r) => r.id !== id));
    toast.success("Role removed");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid gap-4 p-6 md:grid-cols-2">
          {(
            [
              ["full_name", "Full name"],
              ["display_name", "Display name"],
              ["headline", "Headline"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["location", "Location"],
              ["github_url", "GitHub URL"],
              ["linkedin_url", "LinkedIn URL"],
              ["calendar_url", "Calendar / Calendly URL"],
              ["availability_text", "Availability text"],
              ["years_experience", "Years experience"],
              ["projects_completed", "Projects completed"],
              ["client_satisfaction", "Client satisfaction"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium">{label}</label>
              <Input
                value={(form[key] as string) ?? ""}
                onChange={(e) => set(key, e.target.value)}
              />
            </div>
          ))}

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Short bio (hero)</label>
            <Textarea
              rows={3}
              value={form.bio_short ?? ""}
              onChange={(e) => set("bio_short", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Long bio (about)</label>
            <Textarea
              rows={6}
              value={form.bio_long ?? ""}
              onChange={(e) => set("bio_long", e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              checked={form.is_available}
              onChange={(e) => set("is_available", e.target.checked)}
            />
            Show available badge
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Hero typing roles</h2>
          <div className="space-y-2">
            {roleList.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span>{role.label}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeRole(role.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="New role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
            <Button type="button" onClick={addRole}>
              <Plus className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save profile"}
      </Button>
    </div>
  );
}
