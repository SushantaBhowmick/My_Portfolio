# Portfolio Documentation

Documentation for **Sushanta Bhowmick's Portfolio** — public site + Admin CMS.

## Docs Index

| Doc | Purpose |
|-----|---------|
| [Features Overview](./features-overview.md) | Full feature map (public + admin) |
| [Admin CMS Plan](./admin-cms-plan.md) | Architecture, schema, phases |
| [Admin Setup](./admin-setup.md) | Create admin user + how to use CMS |
| [Prisma Snapshot](./prisma-snapshot.md) | Backup before Prisma re-init |
| [Data Backup](./prisma-archive/DATA-BACKUP.md) | Exported DB rows before reset |
| [Prisma Archive](./prisma-archive/) | schema/seed/data backups |
| [Prisma + Admin](./prisma-admin.md) | Prisma migrations, seed, admin proxy |
| [Enhancement Ideas](./enhancement-ideas.md) | Future interactive upgrades |

## Stack

- **App**: Next.js 16 (App Router) + React 19 + TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui, Framer Motion, Three.js
- **DB**: Prisma 6 migrations + seed → Supabase Postgres
- **Auth / Storage**: Supabase Auth + Storage
- **Admin guard**: `src/proxy.ts` on `/admin/*`

## Quick start

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run admin:create -- youremail@example.com YourSecurePassword
npm run dev
```

Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
