import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Wrench,
  Mail,
  FileText,
  User,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [projectCount, skillCount, newMessages, resume, profile] =
    await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.contactSubmission.count({ where: { status: "new" } }),
      prisma.resume.findFirst({
        where: { isActive: true },
        select: { fileName: true, uploadedAt: true },
      }),
      prisma.profile.findFirst({
        select: { fullName: true, isAvailable: true },
      }),
    ]);

  const cards = [
    {
      label: "Projects",
      value: projectCount,
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Skills",
      value: skillCount,
      href: "/admin/skills",
      icon: Wrench,
    },
    {
      label: "New messages",
      value: newMessages,
      href: "/admin/messages",
      icon: Mail,
    },
    {
      label: "Active resume",
      value: resume?.fileName ?? "None uploaded",
      href: "/admin/resume",
      icon: FileText,
      isText: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back{profile?.fullName ? `, ${profile.fullName}` : ""}.
            {profile?.isAvailable ? " You are marked available." : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/profile">
            <User className="mr-2 h-4 w-4" />
            Edit profile
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="h-full transition-colors hover:border-primary/40">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <card.icon className="h-5 w-5 text-primary" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p
                  className={`mt-1 font-semibold ${card.isText ? "text-base truncate" : "text-3xl"}`}
                >
                  {card.value}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Quick tips</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Upload your resume under Resume — the public download button uses
              the active file.
            </li>
            <li>
              Add project images and real live/GitHub URLs under Projects.
            </li>
            <li>Enable contact notifications under Automations.</li>
            <li>
              Admin routes are protected by <code>src/middleware.ts</code>{" "}
              (Supabase Auth). Data is loaded with Prisma.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
