import { ProfileForm } from "@/components/admin/profile-form";
import { getAdminProfile } from "@/lib/admin/queries";
import { redirect } from "next/navigation";

export default async function AdminProfilePage() {
  const { profile, roles } = await getAdminProfile();

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
      <ProfileForm profile={profile} roles={roles} />
    </div>
  );
}
