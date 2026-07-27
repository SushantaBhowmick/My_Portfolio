import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminAppFrame } from "@/components/admin/admin-app-frame";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <AdminAppFrame userEmail={user.email}>{children}</AdminAppFrame>;
}
