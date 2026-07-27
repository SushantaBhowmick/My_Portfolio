import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/admin/profile-form";
import { redirect } from "next/navigation";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();
  const { data: roles } = await supabase
    .from("hero_roles")
    .select("*")
    .order("sort_order");

  if (!profile) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="text-muted-foreground">
          Personal details, stats, socials, and hero roles
        </p>
      </div>
      <ProfileForm profile={profile} roles={roles ?? []} />
    </div>
  );
}
