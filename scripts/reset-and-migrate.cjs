/**
 * Destructive reset of public schema + clean Prisma migrate deploy.
 * Does NOT delete docs backup. Auth schema / Storage buckets are untouched.
 *
 * Prerequisites: node scripts/export-db-data.cjs
 * Usage: node scripts/reset-and-migrate.cjs
 * Then:   node scripts/import-db-data.cjs
 */
require("dotenv").config();
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const root = path.join(__dirname, "..");
const migName = "20260727140000_init";
const migDir = path.join(root, "prisma", "migrations", migName);

function run(cmd) {
  console.log("\n>", cmd);
  execSync(cmd, { stdio: "inherit", cwd: root, env: process.env });
}

async function main() {
  const backup = path.join(root, "docs", "prisma-archive", "data-backup.json");
  if (!fs.existsSync(backup)) {
    throw new Error("Backup missing. Run: node scripts/export-db-data.cjs first");
  }

  // Fresh single migration from schema
  fs.rmSync(path.join(root, "prisma", "migrations"), {
    recursive: true,
    force: true,
  });
  fs.mkdirSync(migDir, { recursive: true });
  const sql = execSync(
    "npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script",
    { encoding: "utf8", cwd: root, env: process.env }
  );
  fs.writeFileSync(path.join(migDir, "migration.sql"), sql);
  console.log("Created migration:", migName, `(${sql.length} chars)`);

  const prisma = new PrismaClient();
  try {
    console.log("Dropping public schema (CMS tables only)...");
    await prisma.$executeRawUnsafe("DROP SCHEMA IF EXISTS public CASCADE");
    await prisma.$executeRawUnsafe("CREATE SCHEMA public");
    await prisma.$executeRawUnsafe("GRANT ALL ON SCHEMA public TO postgres");
    await prisma.$executeRawUnsafe("GRANT ALL ON SCHEMA public TO public");
    await prisma.$executeRawUnsafe("GRANT ALL ON SCHEMA public TO anon");
    await prisma.$executeRawUnsafe("GRANT ALL ON SCHEMA public TO authenticated");
    await prisma.$executeRawUnsafe("GRANT ALL ON SCHEMA public TO service_role");
  } finally {
    await prisma.$disconnect();
  }

  // Apply migration SQL + record in _prisma_migrations
  run("npx prisma migrate deploy");
  run("npx prisma migrate status");
  console.log("\nReset + migrate done. Next: node scripts/import-db-data.cjs");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
