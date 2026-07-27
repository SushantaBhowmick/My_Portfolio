# Admin CMS Plan

Detailed build plan for a password-protected admin area that makes the portfolio fully dynamic via Supabase.

**Status:** Awaiting your approval before coding.

---

## 1. Objectives

1. Log in securely at `/admin/login`
2. Manage **all** portfolio content without touching React files
3. Upload / replace **resume PDF** anytime; public “Download Resume” always points to the active file
4. CRUD for **projects**, **skills**, and **personal/about** content
5. Manage **contact messages**
6. Provide an **Automations** block for alerts and scheduled helpers

---

## 2. Information Architecture

```
/admin/login              → Public (unauthenticated)
/admin                    → Dashboard (protected)
/admin/profile            → Name, bio, roles, stats, socials, contact
/admin/resume             → Upload / activate resume versions
/admin/projects           → List + create/edit
/admin/projects/[id]      → Edit one project
/admin/skills             → Categories + skills + learning tags
/admin/about              → Story, highlights, timeline, fun facts
/admin/messages           → Contact inbox
/admin/automations        → Webhooks, email alerts, schedules
/admin/settings           → Site SEO, section toggles (optional phase)
```

Public site stays at `/` and reads published content from Supabase.

---

## 3. Auth Strategy

| Item | Choice |
|------|--------|
| Provider | Supabase Auth |
| Method | Email + password (one admin account) |
| Session | `@supabase/ssr` cookies for App Router |
| Guard | Middleware: redirect unauthenticated users from `/admin/*` (except login) |
| Writes | RLS: only `auth.role() = authenticated` (or specific user id) |
| Public reads | RLS: `SELECT` allowed for published rows |

Setup steps after approval:

1. Enable Email auth in Supabase
2. Create your admin user (Dashboard → Authentication → Users)
3. Tighten RLS so only that user can mutate content
4. Optional: disable public sign-ups

---

## 4. Database Schema (proposed)

### 4.1 `profiles` (singleton / site owner)

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| full_name | text | |
| display_name | text | Nav/footer short name |
| headline | text | Optional static headline |
| bio_short | text | Hero paragraph |
| bio_long | text | About story (or use markdown) |
| availability_text | text | e.g. “Available for new opportunities” |
| is_available | boolean | Controls badge visibility |
| email | text | |
| phone | text | |
| location | text | |
| github_url | text | |
| linkedin_url | text | |
| calendar_url | text | Optional Calendly |
| years_experience | text | e.g. `"3+"` |
| projects_completed | text | e.g. `"25+"` |
| client_satisfaction | text | e.g. `"100%"` |
| updated_at | timestamptz | |

### 4.2 `hero_roles`

Typing animation roles.

| Column | Type |
|--------|------|
| id | uuid PK |
| label | text |
| sort_order | int |
| is_active | boolean |

### 4.3 `resumes`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| file_path | text | Storage path |
| file_url | text | Public URL |
| file_name | text | |
| version_label | text | Optional “Mar 2026” |
| is_active | boolean | Only one active |
| uploaded_at | timestamptz | |

**Storage bucket:** `resumes` (public read, auth write)

### 4.4 `projects`

| Column | Type |
|--------|------|
| id | uuid PK |
| title | text |
| description | text |
| image_url | text |
| category | text |
| technologies | text[] |
| live_url | text |
| github_url | text |
| featured | boolean |
| is_published | boolean |
| sort_order | int |
| created_at / updated_at | timestamptz |

**Storage bucket:** `project-images`

### 4.5 `skill_categories` + `skills`

**skill_categories:** `id`, `key` (frontend/backend/tools), `title`, `color`, `icon_key`, `sort_order`

**skills:** `id`, `category_id`, `name`, `level` (0–100), `description`, `sort_order`, `is_published`

**learning_tags:** `id`, `label`, `sort_order` (Currently Learning chips)

### 4.6 About content

**about_highlights:** icon_key, title, description, sort_order  
**journey_items:** year, title, description, sort_order  
**fun_facts:** label, icon_key, sort_order

### 4.7 `contact_submissions` (already exists)

Keep current table; admin UI uses existing helpers in `src/lib/supabase.ts` and tightens RLS so only authenticated users can `SELECT`/`UPDATE`.

### 4.8 `automations` + `automation_logs`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | |
| key | text | e.g. `contact_notify` |
| name | text | |
| enabled | boolean | |
| config | jsonb | webhook URL, email, schedule |
| updated_at | timestamptz | |

`automation_logs`: id, automation_id, status, payload, created_at

### 4.9 `site_settings` (optional)

SEO title, description, og image, section visibility flags.

---

## 5. Admin UX Notes

- Clean, utilitarian admin (not the public marketing design)
- Forms with validation + toasts (Sonner already in project)
- Image/resume upload with progress + preview
- Soft delete or `is_published` instead of hard-delete by default
- Drag-and-drop reorder where it matters (projects, skills, timeline)

---

## 6. Public Site Wiring

After CMS tables exist:

1. Replace hardcoded arrays in section components with data fetched from Supabase
2. Hero resume button → `resumes` where `is_active = true`
3. Fallback: if DB empty / offline, show safe static fallbacks so the site never looks broken
4. Revalidation strategy:
   - `revalidate: 60` (ISR) **or**
   - `revalidatePath` via admin Server Action after save

---

## 7. Automations — Phase Detail

### Phase A (ship with CMS v1)

- Toggle: **Notify on new contact**
- Config: email address and/or webhook URL
- Implementation: Supabase Edge Function triggered on `contact_submissions` INSERT

### Phase B (later)

- Weekly digest of unread messages
- Resume upload confirmation email
- Optional: auto-tweet / LinkedIn draft (manual approve first — don’t auto-post without consent)

---

## 8. Implementation Phases

### Phase 0 — Foundations

- [ ] SQL migrations / schema in Supabase
- [ ] Storage buckets + policies
- [ ] Auth user + middleware
- [ ] Admin layout shell + login page

### Phase 1 — Profile & Resume

- [ ] Profile CRUD
- [ ] Resume upload / activate
- [ ] Wire Hero + Contact + Footer to profile + active resume

### Phase 2 — Projects & Skills

- [ ] Projects CRUD + image upload
- [ ] Skills / categories / learning tags
- [ ] Wire public Projects + Skills sections

### Phase 3 — About & Messages

- [ ] Highlights, journey, fun facts editors
- [ ] Messages inbox + status updates
- [ ] Tighten contact RLS

### Phase 4 — Automations & polish

- [ ] Automations UI + Edge Function for new-message notify
- [ ] Dashboard stats
- [ ] Optional SEO settings
- [ ] Seed script: migrate current hardcoded content into DB

---

## 9. Seed / Migration

One-time seed from current hardcoded content in:

- `hero-section.tsx`
- `about-section.tsx`
- `skills-section.tsx`
- `projects-section.tsx`
- `contact-section.tsx` / `footer.tsx` / `navigation.tsx`

So the live site looks the same on day one of CMS switchover.

---

## 10. Security Checklist

- [ ] Public cannot write profile/projects/skills
- [ ] Public can insert contact only (rate-limit recommended later)
- [ ] Contact SELECT restricted to authenticated admin
- [ ] Service role key never exposed to client
- [ ] Storage: public read for published assets only
- [ ] CSRF/session handled by Supabase SSR cookies
- [ ] Admin routes blocked by middleware

---

## 11. Out of Scope for v1 (unless you say otherwise)

- Multi-admin roles / team permissions
- Full blog CMS
- Visual page builder / drag sections
- Analytics dashboard (can add Plausible/Vercel Analytics separately)
- AI auto-writing content

---

## 12. Approval

Reply with:

1. **Approve as written**, or  
2. **Approve with changes** (list cuts / must-haves), or  
3. Questions on schema / phases

Then implementation begins from **Phase 0**.
