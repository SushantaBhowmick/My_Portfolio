# Admin CMS Setup

## 1. Database (Prisma)

```bash
npm install
npx prisma migrate deploy   # apply migrations
npm run db:seed             # safe seed if tables are empty
```

## 2. Create your admin user

```bash
npm run admin:create -- your-email@example.com YourSecurePassword
```

Or create a user in Supabase Dashboard → Authentication → Users → Add user (confirm email).

## 3. Sign in

```bash
npm run dev
```

Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 4. What you can manage

| Page | Actions |
|------|---------|
| Profile | Name, bio, stats, socials, hero roles |
| Resume | Upload PDF, set active version |
| Projects | CRUD + image upload |
| Skills | Levels, categories, learning tags |
| About | Highlights, journey, fun facts |
| Messages | Contact inbox |
| Automations | Webhook notify on new contact |

## Env notes

- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` for Auth / Storage / contact form
- `DATABASE_URL` + `DIRECT_URL` for Prisma
- Prefer `SUPABASE_SERVICE_ROLE_KEY` (server-only) for automations
