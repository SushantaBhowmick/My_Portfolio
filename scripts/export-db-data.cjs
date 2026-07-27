/**
 * Export all portfolio CMS tables to docs/prisma-archive/data-backup.json
 * Usage: node scripts/export-db-data.cjs
 */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function serialize(value) {
  return JSON.parse(
    JSON.stringify(value, (_key, v) =>
      typeof v === "bigint" ? v.toString() : v instanceof Date ? v.toISOString() : v
    )
  );
}

async function main() {
  const data = {
    exportedAt: new Date().toISOString(),
    profiles: serialize(await prisma.profile.findMany()),
    heroRoles: serialize(await prisma.heroRole.findMany()),
    resumes: serialize(await prisma.resume.findMany()),
    projects: serialize(await prisma.project.findMany()),
    skillCategories: serialize(await prisma.skillCategory.findMany()),
    skills: serialize(await prisma.skill.findMany()),
    learningTags: serialize(await prisma.learningTag.findMany()),
    aboutHighlights: serialize(await prisma.aboutHighlight.findMany()),
    journeyItems: serialize(await prisma.journeyItem.findMany()),
    funFacts: serialize(await prisma.funFact.findMany()),
    contactSubmissions: serialize(await prisma.contactSubmission.findMany()),
    automations: serialize(await prisma.automation.findMany()),
    automationLogs: serialize(await prisma.automationLog.findMany()),
    siteSettings: serialize(await prisma.siteSettings.findMany()),
  };

  const outDir = path.join(__dirname, "..", "docs", "prisma-archive");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "data-backup.json");
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2));

  const counts = Object.fromEntries(
    Object.entries(data)
      .filter(([, v]) => Array.isArray(v))
      .map(([k, v]) => [k, v.length])
  );
  console.log("Backup written:", outFile);
  console.log("Counts:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
