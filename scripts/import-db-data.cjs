/**
 * Restore docs/prisma-archive/data-backup.json into an empty DB.
 * Usage: node scripts/import-db-data.cjs
 */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const file = path.join(
    __dirname,
    "..",
    "docs",
    "prisma-archive",
    "data-backup.json"
  );
  if (!fs.existsSync(file)) {
    throw new Error("Missing backup file: " + file);
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  // Order matters for FKs
  if (data.profiles?.length) {
    for (const row of data.profiles) {
      await prisma.profile.create({ data: row });
    }
  }
  if (data.heroRoles?.length) {
    await prisma.heroRole.createMany({ data: data.heroRoles });
  }
  if (data.resumes?.length) {
    await prisma.resume.createMany({ data: data.resumes });
  }
  if (data.projects?.length) {
    await prisma.project.createMany({ data: data.projects });
  }
  if (data.skillCategories?.length) {
    await prisma.skillCategory.createMany({ data: data.skillCategories });
  }
  if (data.skills?.length) {
    await prisma.skill.createMany({ data: data.skills });
  }
  if (data.learningTags?.length) {
    await prisma.learningTag.createMany({ data: data.learningTags });
  }
  if (data.aboutHighlights?.length) {
    await prisma.aboutHighlight.createMany({ data: data.aboutHighlights });
  }
  if (data.journeyItems?.length) {
    await prisma.journeyItem.createMany({ data: data.journeyItems });
  }
  if (data.funFacts?.length) {
    await prisma.funFact.createMany({ data: data.funFacts });
  }
  if (data.contactSubmissions?.length) {
    await prisma.contactSubmission.createMany({ data: data.contactSubmissions });
  }
  if (data.automations?.length) {
    await prisma.automation.createMany({ data: data.automations });
  }
  if (data.automationLogs?.length) {
    await prisma.automationLog.createMany({ data: data.automationLogs });
  }
  if (data.siteSettings?.length) {
    await prisma.siteSettings.createMany({ data: data.siteSettings });
  }

  console.log("Import completed from", file);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
