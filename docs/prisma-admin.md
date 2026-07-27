# Prisma + Admin Access

## Architecture

| Concern | Tool |
|---------|------|
| Auth (login / session) | Supabase Auth + `src/middleware.ts` |
| File uploads (resume, images) | Supabase Storage |
| Typed DB reads/writes | **Prisma 6** → Postgres |
| Contact form insert | Supabase anon client (RLS insert) |

## Middleware

`src/middleware.ts` runs on `/admin` and `/admin/:path*`:

- Unauthenticated → redirect to `/admin/login?next=...`
- Already signed in on login page → redirect to dashboard
- Uses `supabase.auth.getUser()` (JWT validation), not `getSession()` alone

Dashboard layout also double-checks the user server-side.

## Prisma commands

```bash
npm run db:generate   # prisma generate
npm run db:pull       # introspect remote schema (optional)
npm run db:migrate    # our SQL seed/migration scripts
```

Connection strings live in `.env`:

- `DATABASE_URL` — pooler `:6543` with `?pgbouncer=true` (queries)
- `DIRECT_URL` — session pooler `:5432` (migrate / introspect)

Password special characters (`@`) must be URL-encoded as `%40`.

## ENOENT / `.next` errors

If you see missing `app-build-manifest.json` while `npm run dev` is running:

1. Stop the dev server (Ctrl+C)
2. Delete `.next`
3. Run `npm run dev` again

Do **not** run `next build` while `next dev` is active — they fight over the same `.next` folder.
