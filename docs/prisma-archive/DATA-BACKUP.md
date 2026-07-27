# Database Data Backup

Exported before Prisma reset on **2026-07-27**.

Full JSON: [`data-backup.json`](./data-backup.json)

## Counts

| Table | Rows |
|-------|------|
| profiles | 1 |
| hero_roles | 5 |
| resumes | 1 |
| projects | 6 |
| skill_categories | 3 |
| skills | 18 |
| learning_tags | 6 |
| about_highlights | 3 |
| journey_items | 4 |
| fun_facts | 3 |
| contact_submissions | 0 |
| automations | 1 |
| automation_logs | 0 |
| site_settings | 1 |

## Highlights

- Profile: **Sushanta Bhowmick** (`bhosushanta922@gmail.com`)
- Active resume: `Sushanta_Bhowmick_Resume.pdf` (July 2026) — Storage URL preserved in JSON
- 6 projects, 18 skills across 3 categories
- Automation: `contact_notify`

## Restore

After a clean migrate:

```bash
node scripts/import-db-data.cjs
```

Or use the seed script if you only need default content (won’t restore resume file row / exact IDs).
