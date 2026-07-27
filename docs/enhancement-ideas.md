# Enhancement Ideas

Ways to make the portfolio stronger and more interactive — beyond the Admin CMS.

Priorities assume CMS lands first so content is easy to update.

---

## High impact (recommended)

| Idea | Why it helps | Effort |
|------|--------------|--------|
| **Working resume download** | Recruiters expect this; currently the button has no file | Low (with CMS) |
| **Real project screenshots** | Placeholders hurt credibility | Medium |
| **Case-study modal / page** | Problem → solution → stack → outcome for 2–3 featured projects | Medium |
| **Live availability + Calendly** | Low friction booking | Low |
| **Contact inbox + email notify** | Don’t miss leads | Medium |
| **Testimonials section** | Social proof for freelance / hiring | Low–Medium |
| **Consistent contact emails** | Nav/contact/footer currently mix addresses — unify via CMS | Low |

---

## More interactive (polish)

| Idea | Description |
|------|-------------|
| **Project image hover preview** | Real screenshots with subtle parallax / tilt |
| **Skill radar / cloud** | Alternate visualization toggled with progress bars |
| **Command palette** (⌘K) | Jump to section, open GitHub, download resume |
| **Scroll progress + section progress** | Thin top bar showing reading progress |
| **Cursor spotlight** on project cards | Already have spotlight UI primitives — use them |
| **“Now” / currently building** | Small live status: what you’re learning or shipping |
| **GitHub contribution / pinned repos** | Pull public GitHub API (cache it) |
| **Tech stack filter chips** on projects | Filter by React, Node, etc. |
| **Before/after or metrics** | e.g. “reduced load time 40%” on case studies |
| **Micro-interactions on CTAs** | Stronger feedback without clutter |

---

## Credibility & SEO

| Idea | Description |
|------|-------------|
| **Blog / notes** | Short technical posts; great for Google + hiring managers |
| **Open Graph image** | Custom share card when link is pasted on LinkedIn/Twitter |
| **JSON-LD Person schema** | Richer Google knowledge |
| **Sitemap + robots** | Next.js metadata routes |
| **Performance pass** | Lazy-load Three.js; reduce hero cost on mobile |

---

## New sections worth considering

1. **Experience** — dedicated roles (company, title, dates, bullets) separate from About timeline  
2. **Services** — what you offer (fullstack apps, APIs, UI rebuilds) with clear outcomes  
3. **Testimonials** — quote, name, role, company, avatar  
4. **FAQ** — rates/availability/remote/stack questions  
5. **Uses** — “tools I use daily” (popular with indie/dev audiences)

All of these can be CMS-managed tables later.

---

## Automation ideas (beyond contact notify)

- Weekly unread-message digest  
- Auto-log resume versions with changelog note  
- Discord webhook when a new project is published  
- Optional: generate social caption draft when you publish a project (you approve before posting)

---

## Suggested v1.1 after Admin CMS

1. Real images + case-study detail for top 3 projects  
2. Calendly / booking link in hero + contact  
3. Testimonials (even 2–3)  
4. Unify branding details via profile CMS  
5. Performance: defer 3D on mobile  

---

Pick any items you want included in the first build (or leave them for after CMS). Mark them in your approval reply.
