"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FileText,
  FolderKanban,
  Wrench,
  BookUser,
  Mail,
  Zap,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/resume", label: "Resume", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/about", label: "About", icon: BookUser },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/automations", label: "Automations", icon: Zap },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
          <div className="border-b px-5 py-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Portfolio CMS
            </p>
            <h1 className="mt-1 text-lg font-semibold">Admin</h1>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-2 border-t p-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View site
              </a>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b bg-background px-4 py-3 md:px-8">
            <div className="md:hidden">
              <p className="font-semibold">Admin</p>
            </div>
            <div className="ml-auto flex items-center gap-2 overflow-x-auto md:hidden">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-md px-2 py-1 text-xs",
                    pathname.startsWith(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="hidden text-sm text-muted-foreground md:block">
              Changes reflect on the public portfolio
            </p>
          </header>
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
