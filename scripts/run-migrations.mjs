/**
 * Run CMS migrations against Supabase Postgres.
 * Usage: node scripts/run-migrations.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

dotenv.config({ path: path.join(root, ".env") });
dotenv.config({ path: path.join(root, ".env.local") });

function buildConnectionString() {
  const password = process.env.DB_PASS;
  if (password) {
    const user = "postgres.hampiokftlozrrsersva";
    const host = "aws-0-ap-northeast-1.pooler.supabase.com";
    // Session mode (5432) is better for DDL / migrations
    return `postgresql://${user}:${encodeURIComponent(password)}@${host}:5432/postgres`;
  }

  const rawUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!rawUrl) return null;

  // Manual parse when password contains @
  const match = rawUrl.match(
    /^postgresql:\/\/([^:]+):(.+)@([^:/]+)(?::(\d+))?\/(.+)$/
  );
  if (!match) return rawUrl;
  const [, user, pass, host, port, db] = match;
  return `postgresql://${user}:${encodeURIComponent(pass)}@${host}:${port || 5432}/${db.split("?")[0]}`;
}

const connectionString = buildConnectionString();
if (!connectionString) {
  console.error("Missing DB_PASS or DATABASE_URL in .env");
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const migrationsDir = path.join(root, "supabase", "migrations");
const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

async function main() {
  await client.connect();
  console.log("Connected. Running migrations:", files.join(", "));

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`\n→ ${file}`);
    await client.query(sql);
    console.log(`✓ ${file}`);
  }

  console.log("\nAll migrations applied successfully.");
  await client.end();
}

main().catch(async (err) => {
  console.error("\nMigration failed:", err.message);
  try {
    await client.end();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
