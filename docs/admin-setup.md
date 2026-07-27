# Admin CMS Setup

## 1. Migrations (already applied if you ran the script)

```bash
node scripts/run-migrations.mjs
```

## 2. Create your admin user

```bash
node scripts/create-admin.mjs your-email@example.com YourSecurePassword
```

Or create a user in Supabase Dashboard → Authentication → Users → Add user (confirm email).

## 3. Sign in

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

- Keep `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for the client
- Prefer `SUPABASE_SERVICE_ROLE_KEY` (not `NEXT_PUBLIC_…`) for server-only automations
- `DB_PASS` + pooler host used by migration script
