"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useAdminTheme } from "@/components/admin/admin-theme-provider";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, hint: "Overview" },
  { href: "/admin/profile", label: "Profile", icon: User, hint: "Bio & socials" },
  { href: "/admin/resume", label: "Resume", icon: FileText, hint: "PDF upload" },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, hint: "Portfolio work" },
  { href: "/admin/skills", label: "Skills", icon: Wrench, hint: "Tech stack" },
  { href: "/admin/about", label: "About", icon: BookUser, hint: "Timeline" },
  { href: "/admin/messages", label: "Messages", icon: Mail, hint: "Inbox" },
  { href: "/admin/automations", label: "Automations", icon: Zap, hint: "Alerts" },
];

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: (typeof nav)[number];
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
        active
          ? "text-primary-foreground"
          : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      )}
    >
      {active && (
        <motion.span
          layoutId="admin-nav-pill"
          className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/20"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <item.icon className="relative z-10 h-4 w-4 shrink-0" />
      <span className="relative z-10 flex flex-col">
        <span className="font-medium leading-none">{item.label}</span>
        <span
          className={cn(
            "mt-1 text-[11px] leading-none",
            active ? "text-primary-foreground/75" : "text-muted-foreground/80"
          )}
        >
          {item.hint}
        </span>
      </span>
    </Link>
  );
}

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const pageTitle =
    nav.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href)
    )?.label ?? "Admin";

  return (
    <div className="relative h-dvh overflow-hidden bg-background text-foreground">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-400/5" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative flex h-full">
        {/* Desktop sidebar — fixed to viewport height */}
        <aside className="relative hidden h-full w-72 shrink-0 flex-col border-r border-border/60 bg-card/40 backdrop-blur-xl md:flex">
          <div className="shrink-0 border-b border-border/60 px-5 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg shadow-primary/25">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Portfolio CMS
                </p>
                <h1 className="text-lg font-semibold tracking-tight">Admin</h1>
              </div>
            </div>
          </div>

          <nav className="min-h-0 flex-1 space-y-1.5 overflow-y-auto p-3">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return <NavLink key={item.href} item={item} active={active} />;
            })}
          </nav>

          <div className="shrink-0 space-y-2 border-t border-border/60 p-3">
            {userEmail && (
              <div className="rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Signed in
                </p>
                <p className="truncate text-sm font-medium">{userEmail}</p>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-border/70 bg-background/50"
              asChild
            >
              <a href="/" target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View live site
              </a>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-xl text-muted-foreground hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* Main column — header fixed, content scrolls */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="z-30 flex shrink-0 items-center gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-8">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Managing
              </p>
              <h2 className="truncate text-lg font-semibold tracking-tight">
                {pageTitle}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-border/70"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                    className="flex"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </Button>
              <Button
                variant="outline"
                className="hidden rounded-xl sm:inline-flex"
                asChild
              >
                <a href="/" target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Site
                </a>
              </Button>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 md:p-8">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border/60 bg-card md:hidden"
            >
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Admin</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {nav.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  return (
                    <NavLink
                      key={item.href}
                      item={item}
                      active={active}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  );
                })}
              </nav>
              <div className="border-t border-border/60 p-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-xl text-muted-foreground"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
