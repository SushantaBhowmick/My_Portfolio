# Prisma + Admin Access

## Layout (after clean `prisma init`)

```
prisma.config.ts                 ← from prisma init (+ seed + DIRECT_URL for CLI)
prisma/
  schema.prisma                  ← models (restored from snapshot)
  seed.ts                        ← safe seed
  migrations/
    20260727120000_init/         ← baseline (marked applied; DB not wiped)
  sql/
    supabase_storage_reference.sql
docs/
  prisma-snapshot.md             ← human-readable backup
  prisma-archive/                ← schema.prisma.bak + seed.ts.bak
```

## Commands

```bash
# Stop npm run dev first on Windows (avoids EPERM on generate)

npx prisma generate
npx prisma migrate dev --name your_change   # new changes
npx prisma migrate deploy                   # CI / prod
npx prisma db seed
npx prisma studio
npx prisma migrate status
```

Or via npm scripts: `db:generate`, `db:migrate`, `db:seed`, etc.

## Env

- `DATABASE_URL` — transaction pooler `:6543?pgbouncer=true` (app queries in schema)
- `DIRECT_URL` — session pooler `:5432` (CLI migrate via `prisma.config.ts`)

## Important

- Live Supabase **data was not deleted** during re-init
- Experimental `Test` model was **not** restored (see archive if you need it)
- If `prisma generate` hits `EPERM`, stop Next.js, then regenerate
