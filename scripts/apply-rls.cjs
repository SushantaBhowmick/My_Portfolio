/**
 * Apply Supabase role grants + RLS so PostgREST (admin writes via supabase-js) works
 * after Prisma recreate/reset.
 */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function stripSqlComments(sql) {
  return sql
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("--")) return "";
      const commentAt = line.indexOf("--");
      if (commentAt === -1) return line;
      return line.slice(0, commentAt);
    })
    .join("\n");
}

async function main() {
  const sqlPath = path.join(__dirname, "..", "prisma", "sql", "rls_policies.sql");
  const sql = stripSqlComments(fs.readFileSync(sqlPath, "utf8"));

  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);
    console.log("OK:", statement.slice(0, 72).replace(/\s+/g, " "));
  }

  console.log(`Applied ${statements.length} SQL statements (grants + RLS).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
