"use client";

import { AdminThemeProvider } from "@/components/admin/admin-theme-provider";
import { AdminShell } from "@/components/admin/admin-shell";

/** Client boundary so Turbopack HMR keeps theme + shell factories stable. */
export function AdminAppFrame({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  return (
    <AdminThemeProvider>
      <AdminShell userEmail={userEmail}>{children}</AdminShell>
    </AdminThemeProvider>
  );
}
