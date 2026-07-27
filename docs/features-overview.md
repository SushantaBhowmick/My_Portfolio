# Features Overview

> Portfolio of **Sushanta Bhowmick** — modern full-stack developer site, plus a planned **Supabase-powered Admin CMS** so content can be updated without redeploying code.

---

## 1. What Exists Today

### Product shape

Single-page portfolio (`src/app/page.tsx`) with:

| Section | Component | Content source today |
|---------|-----------|----------------------|
| Navigation | `navigation.tsx` | Hardcoded links + socials |
| Hero | `hero-section.tsx` | Hardcoded name, roles, bio, stats, resume button (no file wired) |
| About | `about-section.tsx` | Hardcoded story, highlights, journey timeline |
| Skills | `skills-section.tsx` | Hardcoded categories + levels + “currently learning” |
| Projects | `projects-section.tsx` | Hardcoded project list (placeholder images) |
| Contact | `contact-section.tsx` | Hardcoded contact info + **live Supabase form** |
| Footer | `footer.tsx` | Hardcoded brand, links, socials |

### Already dynamic ✅

- **Contact form** → inserts into Supabase `contact_submissions`
- Theme toggle (dark/light)
- Scroll / filter / animation interactions (UI-only)

### Still static (must edit code) ❌

- Name, tagline, typing roles, availability badge
- Resume download (button exists, no real PDF/file link)
- About story, highlights, timeline
- Skills + learning tags
- Projects (title, image, links, tech, featured)
- Contact details & social URLs
- SEO metadata in `layout.tsx`
- Stats (“3+ years”, “25+ projects”, etc.)

---

## 2. Goal: Fully Manageable Portfolio

Build an **Admin site** (`/admin`) so you can log in and update everything. Public site reads from Supabase and reflects changes immediately (or after short cache revalidation).

### Core requirements (your ask)

| Requirement | Plan |
|-------------|------|
| Login page | Supabase Auth (email/password), protected `/admin/*` |
| Dynamic resume | Upload PDF to Supabase Storage → public “Download Resume” uses latest file |
| Dynamic projects | CRUD: image, title, description, tech, live/github URLs, featured, category, order |
| Dynamic skills | CRUD: category, name, level, description, order; learning tags editable |
| Own details | Profile / site settings: name, bio, location, email, phone, socials, availability, stats |
| Automation block | Admin “Automations” area for workflows (email alerts, digests, content helpers) |

---

## 3. Feature Map — Public Site

### 3.1 Hero

| Feature | Today | After CMS |
|---------|-------|-----------|
| Name / headline | Hardcoded | From `profile` |
| Typing roles | Hardcoded array | Editable list |
| Short bio | Hardcoded | From `profile` |
| Availability badge | Hardcoded | Toggle + custom text |
| Stats (years / projects / satisfaction) | Hardcoded | Editable key-value stats |
| Download Resume | Button only | Links to latest Storage file |
| View My Work CTA | Works (scroll) | Same |

### 3.2 About

| Feature | Today | After CMS |
|---------|-------|-----------|
| Section title + intro | Hardcoded | Editable |
| Personal story paragraphs | Hardcoded | Rich text / markdown or multi-paragraph fields |
| Highlights (Clean Code, etc.) | Hardcoded | CRUD cards (icon key, title, description) |
| Journey timeline | Hardcoded | CRUD items (year, title, description, order) |
| Fun fact chips | Hardcoded | Editable tags |

### 3.3 Skills

| Feature | Today | After CMS |
|---------|-------|-----------|
| Categories (Frontend / Backend / Tools) | Hardcoded | Configurable categories |
| Skill name, %, description | Hardcoded | Full CRUD + reorder |
| Quick stats (20+ technologies…) | Hardcoded | Auto-count from DB **or** manual overrides |
| Currently learning badges | Hardcoded | Editable list |

### 3.4 Projects

| Feature | Today | After CMS |
|---------|-------|-----------|
| Title, description | Hardcoded | CRUD |
| Image | Placeholder gradient | Upload to Storage **or** image URL |
| Category / featured | Hardcoded | Editable + filters stay on public site |
| Live + GitHub URLs | Placeholder examples | Real URLs from admin |
| Tech tags | Hardcoded | Array / relation |
| Sort order | Array order | `sort_order` field |

### 3.5 Contact

| Feature | Today | After CMS |
|---------|-------|-----------|
| Form → Supabase | ✅ | Keep + improve |
| Email / phone / location / availability | Hardcoded | From `profile` / `contact_info` |
| Inbox management | Helper fns only | Admin Messages inbox (status: new / read / replied) |

### 3.6 Global

| Feature | Today | After CMS |
|---------|-------|-----------|
| Nav social links | Hardcoded | From profile |
| Footer copy / socials | Hardcoded | From profile |
| SEO title / description / OG | Hardcoded in layout | From `site_settings` (optional phase) |

---

## 4. Feature Map — Admin Site

Route base: `/admin`

| Module | What you can do |
|--------|-----------------|
| **Login** | Email/password via Supabase Auth |
| **Dashboard** | Counts: projects, skills, unread messages, last resume upload |
| **Profile & site** | Name, roles, bio, stats, availability, contact, socials |
| **Resume** | Upload / replace PDF; preview; set active version |
| **Projects** | Create / edit / delete / reorder / feature toggle / image upload |
| **Skills** | Manage categories + skills + learning list |
| **About content** | Story, highlights, timeline, fun facts |
| **Messages** | View contact submissions; mark read / replied |
| **Automations** | Configure email alerts, digests, optional helpers |
| **Media library** (optional) | Browse uploaded images / resumes |

Security:

- Only authenticated users (your admin account) can write
- Public can **read** published content and **insert** contact messages
- RLS on every table; Storage policies for public read of resume/images, authenticated write

---

## 5. What Else Can Be Made Dynamic

Beyond what you listed — high value, low friction:

| Content | Why make it dynamic |
|---------|---------------------|
| **SEO / Open Graph** | Change title & social preview without deploy |
| **Section visibility** | Hide “Projects” or “Skills” temporarily |
| **CTA labels** | “Hire me”, “Book a call”, Calendly URL |
| **Testimonials** | New section managed from admin |
| **Experience / work history** | Separate from about timeline if needed |
| **Blog / notes** (optional) | Short posts to improve SEO & credibility |
| **Featured project highlight** | Pin one project in hero |
| **Announcement bar** | “Open to roles” / “Speaking at X” |
| **Custom pages** | Privacy, case-study pages later |

---

## 6. Automation Block (planned)

Admin → **Automations** — workflows that run when something happens:

| Automation | Trigger | Action |
|------------|---------|--------|
| New message alert | Contact form submit | Email / Discord / Slack webhook to you |
| Daily / weekly digest | Schedule (Edge Function cron) | Summary of new messages |
| Resume change log | Resume uploaded | Record version + timestamp (optional notify) |
| Low-content reminder | Optional cron | Nudge if no projects updated in N days |

Implementation options (choose in build phase):

1. **Supabase Database Webhooks** + Edge Functions  
2. **Resend / Nodemailer** for email  
3. Simple **webhook URL** field in admin (you paste Discord/Slack webhook)

Phase 1 recommendation: **New contact → email/webhook notification** + message status in admin.

---

## 7. Tech Approach (summary)

```
Public site (Next.js)  ──read──►  Supabase (Postgres + Storage)
Admin (/admin)         ──auth + CRUD──►  Supabase Auth + RLS
Contact form           ──insert──►  contact_submissions
Automations            ──Edge Function / webhook──►  Email or Discord
```

- **Auth**: Supabase Auth (single admin user is enough)
- **Storage buckets**: `resumes`, `project-images` (public read)
- **Data fetching**: Server Components + revalidate, or client fetch with SWR; keep public page fast
- **No code deploy** needed for normal content edits after CMS ships

Full schema, routes, and build phases → [admin-cms-plan.md](./admin-cms-plan.md)  
Interactive upgrade ideas → [enhancement-ideas.md](./enhancement-ideas.md)

---

## 8. Approval Checklist

Please confirm (edit as needed):

- [ ] Admin login with Supabase Auth
- [ ] Profile / personal details CMS
- [ ] Resume upload & dynamic download
- [ ] Projects CRUD + image upload
- [ ] Skills CMS
- [ ] About / timeline CMS
- [ ] Contact inbox in admin
- [ ] Automations (at least new-message notify)
- [ ] Extra sections from Enhancement Ideas (pick which)
- [ ] Defer: blog / testimonials / SEO CMS (if you want later)

**Once you approve**, implementation starts in this order: DB schema + Auth → Admin shell → Profile/Resume → Projects → Skills → About → Messages → Automations → wire public site to DB.
