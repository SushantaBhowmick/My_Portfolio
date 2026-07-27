import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  Wrench,
  Mail,
  FileText,
  User,
  ArrowRight,
  Sparkles,
  Zap,
  BookUser,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [
    projectCount,
    skillCount,
    newMessages,
    totalMessages,
    resume,
    profile,
    featuredCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.contactSubmission.count(),
    prisma.resume.findFirst({
      where: { isActive: true },
      select: { fileName: true, uploadedAt: true, versionLabel: true },
    }),
    prisma.profile.findFirst({
      select: { fullName: true, isAvailable: true, displayName: true },
    }),
    prisma.project.count({ where: { featured: true } }),
  ]);

  const cards = [
    {
      label: "Projects",
      value: String(projectCount),
      meta: `${featuredCount} featured`,
      href: "/admin/projects",
      icon: FolderKanban,
      accent: "from-sky-500/20 to-transparent",
    },
    {
      label: "Skills",
      value: String(skillCount),
      meta: "Across categories",
      href: "/admin/skills",
      icon: Wrench,
      accent: "from-emerald-500/20 to-transparent",
    },
    {
      label: "New messages",
      value: String(newMessages),
      meta: `${totalMessages} total`,
      href: "/admin/messages",
      icon: Mail,
      accent: "from-amber-500/20 to-transparent",
    },
    {
      label: "Active resume",
      value: resume?.fileName ?? "None uploaded",
      meta: resume?.uploadedAt
        ? `Updated ${resume.uploadedAt.toLocaleDateString()}`
        : "Upload a PDF",
      href: "/admin/resume",
      icon: FileText,
      accent: "from-violet-500/20 to-transparent",
      isText: true,
    },
  ];

  const shortcuts = [
    {
      href: "/admin/profile",
      title: "Edit profile",
      desc: "Name, bio, socials, availability",
      icon: User,
    },
    {
      href: "/admin/projects",
      title: "Add a project",
      desc: "Ship new work with images & links",
      icon: FolderKanban,
    },
    {
      href: "/admin/about",
      title: "Update journey",
      desc: "Timeline, highlights, fun facts",
      icon: BookUser,
    },
    {
      href: "/admin/automations",
      title: "Automations",
      desc: "Webhook alerts for new contacts",
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/50 p-6 shadow-xl shadow-black/5 backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-sky-500/10" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full bg-primary/10 text-primary"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                CMS Dashboard
              </Badge>
              {profile?.isAvailable ? (
                <Badge className="rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Available
                </Badge>
              ) : (
                <Badge variant="secondary" className="rounded-full">
                  Busy
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Welcome back
              {profile?.displayName || profile?.fullName
                ? `, ${profile.displayName || profile.fullName}`
                : ""}
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Manage your portfolio content in one place. Changes sync to the
              public site automatically.
            </p>
          </div>
          <Button asChild className="rounded-xl">
            <Link href="/admin/profile">
              <User className="mr-2 h-4 w-4" />
              Edit profile
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group">
            <Card className="relative h-full overflow-hidden rounded-2xl border-border/70 bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80`}
              />
              <CardContent className="relative p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/70 border border-border/60">
                    <card.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p
                  className={`mt-1 font-semibold tracking-tight ${
                    card.isText ? "truncate text-base" : "text-3xl"
                  }`}
                >
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{card.meta}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/70 bg-card/60">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold tracking-tight">
              Quick actions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Jump into the most common edits
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {shortcuts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border border-border/60 bg-background/40 p-4 transition-all hover:border-primary/40 hover:bg-muted/50"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <p className="font-medium group-hover:text-primary">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 bg-card/60">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold tracking-tight">
              Getting the most out of CMS
            </h2>
            <ul className="mt-5 space-y-4">
              {[
                "Upload your latest resume PDF — the public Download button uses the active file.",
                "Replace placeholder project images and live/GitHub URLs.",
                "Enable Automations and paste a Discord/Slack webhook for contact alerts.",
                "Use the sun/moon toggle in the header anytime — dark mode is the default.",
              ].map((tip) => (
                <li key={tip} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
