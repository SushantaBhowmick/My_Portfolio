# Portfolio Documentation

Documentation for **Sushanta Bhowmick's Portfolio** — public site + Supabase Admin CMS.

## Docs Index

| Doc | Purpose |
|-----|---------|
| [Features Overview](./features-overview.md) | Full feature map (public + admin) |
| [Admin CMS Plan](./admin-cms-plan.md) | Architecture, schema, phases |
| [Admin Setup](./admin-setup.md) | Create admin user + how to use CMS |
| [Prisma + Admin](./prisma-admin.md) | Prisma data layer + middleware guard |
| [Enhancement Ideas](./enhancement-ideas.md) | Future interactive upgrades |

## Stack

- **App**: Next.js 15 (App Router) + React 19 + TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui, Framer Motion, Three.js
- **DB**: Prisma 6 → Supabase Postgres
- **Auth / Storage**: Supabase Auth + Storage
- **Admin guard**: `src/middleware.ts` on `/admin/*`

## Status

CMS is **live**. Create your admin account and start editing:

```bash
npm run admin:create -- youremail@example.com YourSecurePassword
npm run dev
```

Then open [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
