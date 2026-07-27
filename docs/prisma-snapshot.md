# Prisma Snapshot (pre re-init)

Captured before cleaning and re-initializing Prisma with the official `prisma init` flow.

**Important:** This does **not** delete your live Supabase database. Tables and rows stay on Supabase. This snapshot only backs up local Prisma project files / seed content so we can restore them after a clean init.

## Also archived as files

| File | Path |
|------|------|
| Schema backup | [`docs/prisma-archive/schema.prisma.bak`](./prisma-archive/schema.prisma.bak) |
| Seed backup | [`docs/prisma-archive/seed.ts.bak`](./prisma-archive/seed.ts.bak) |
| Storage SQL notes | [`docs/prisma-archive/supabase_storage_reference.sql.bak`](./prisma-archive/supabase_storage_reference.sql.bak) |

## Env (already in `.env` — do not commit secrets)

```bash
DATABASE_URL=postgresql://...@...pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://...@...pooler.supabase.com:5432/postgres
# Password special chars URL-encoded (%40 for @)
```

## Models (tables)

| Prisma model | DB table | Purpose |
|--------------|----------|---------|
| Profile | profiles | Name, bio, contact, stats |
| HeroRole | hero_roles | Typing animation roles |
| Resume | resumes | PDF versions + active flag |
| Project | projects | Portfolio projects |
| SkillCategory | skill_categories | Frontend / Backend / Tools |
| Skill | skills | Skill levels |
| LearningTag | learning_tags | Currently learning chips |
| AboutHighlight | about_highlights | About highlight cards |
| JourneyItem | journey_items | Timeline |
| FunFact | fun_facts | Fun fact chips |
| ContactSubmission | contact_submissions | Contact form inbox |
| Automation | automations | Webhook notify config |
| AutomationLog | automation_logs | Automation run logs |
| SiteSettings | site_settings | SEO / section toggles |
| Test *(experimental)* | tests | Temporary test model — drop on restore unless needed |

## Seed data summary

### Profile
- **Name:** Sushanta Bhowmick / Sushanta
- **Headline:** Full-Stack Developer
- **Email:** bhosushanta922@gmail.com
- **Phone:** +91 8017068720
- **Location:** Kolkata, West Bengal, India
- **GitHub:** https://github.com/SushantaBhowmick
- **LinkedIn:** https://www.linkedin.com/in/sushanta-bhowmick
- **Stats:** 3+ years · 25+ projects · 100% satisfaction

### Hero roles
Full-Stack Developer, React Specialist, Node.js Expert, UI/UX Enthusiast, Problem Solver

### Projects (6)
1. Golf Course Management System (Featured)
2. Ecommerce App - MERN Stack (Featured)
3. Learning Management System (Featured)
4. Course Bundler
5. Real-Time Workspace (SaaS)
6. Social Media App

### Skill categories
- **frontend:** React.js, Next.js, TypeScript, Tailwind CSS, Angular, JavaScript
- **backend:** Node.js, Express.js, MongoDB, PostgreSQL, Supabase, Stripe
- **tools:** Git & GitHub, AWS, Swagger, Docker, Vercel, Prisma

### Learning tags
AI/ML, Web3, Rust, Go, Kubernetes, Microservices

### About highlights
Clean Code, Innovation, Results-Driven

### Journey
2020-22 Foundation → 2022 Professional Start → 2022-25 Academic → 2024-Present Senior Developer

### Fun facts
Coffee Enthusiast, Open Source, Clean Code

### Automation
`contact_notify` — New contact notification (webhook/email), default disabled

### Site settings
SEO title/description for Sushanta Bhowmick portfolio; all sections shown

## App code that uses Prisma

- `src/lib/prisma.ts` — PrismaClient singleton
- `src/lib/portfolio/data.ts` — public portfolio fetch
- `src/app/admin/(dashboard)/page.tsx` — admin dashboard counts

Auth / Storage remain on Supabase (`src/lib/supabase/*`).

## npm scripts (to restore)

```json
"db:generate": "prisma generate",
"db:migrate": "prisma migrate dev",
"db:migrate:deploy": "prisma migrate deploy",
"db:push": "prisma db push",
"db:seed": "prisma db seed",
"db:studio": "prisma studio",
"db:status": "prisma migrate status",
"postinstall": "prisma generate"
```

## Re-init checklist (after this snapshot)

1. Remove local Prisma install/files (DB untouched)
2. `npx prisma init`
3. Restore `schema.prisma` from archive (without experimental `Test` unless wanted)
4. Restore `seed.ts` from archive
5. Configure `prisma.config.ts` seed path
6. Baseline: create init migration + `prisma migrate resolve --applied ...` (tables already exist)
7. `npx prisma generate`
8. Optional: `npm run db:seed` (safe fill-empty)

## Full schema backup

See [`docs/prisma-archive/schema.prisma.bak`](./prisma-archive/schema.prisma.bak)

## Full seed backup

See [`docs/prisma-archive/seed.ts.bak`](./prisma-archive/seed.ts.bak)
