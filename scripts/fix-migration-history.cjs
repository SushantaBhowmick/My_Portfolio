require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$executeRawUnsafe(
    "DELETE FROM _prisma_migrations WHERE migration_name = '20260727100000_init'"
  );
  console.log("Deleted orphaned migration rows:", result);

  const rows = await prisma.$queryRawUnsafe(
    "SELECT migration_name, finished_at FROM _prisma_migrations ORDER BY finished_at"
  );
  console.log(JSON.stringify(rows, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
