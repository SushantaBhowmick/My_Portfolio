-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" TEXT NOT NULL DEFAULT 'Sushanta Bhowmick',
    "display_name" TEXT NOT NULL DEFAULT 'Sushanta',
    "headline" TEXT DEFAULT 'Full-Stack Developer',
    "bio_short" TEXT,
    "bio_long" TEXT,
    "availability_text" TEXT DEFAULT 'Available for new opportunities',
    "is_available" BOOLEAN DEFAULT true,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "github_url" TEXT,
    "linkedin_url" TEXT,
    "calendar_url" TEXT,
    "years_experience" TEXT DEFAULT '3+',
    "projects_completed" TEXT DEFAULT '25+',
    "client_satisfaction" TEXT DEFAULT '100%',
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "sort_order" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hero_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resumes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "file_path" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "version_label" TEXT,
    "is_active" BOOLEAN DEFAULT false,
    "uploaded_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Full-Stack',
    "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "live_url" TEXT,
    "github_url" TEXT,
    "featured" BOOLEAN DEFAULT false,
    "is_published" BOOLEAN DEFAULT true,
    "sort_order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT DEFAULT 'from-blue-500 to-cyan-500',
    "icon_key" TEXT DEFAULT 'Code',
    "sort_order" INTEGER DEFAULT 0,

    CONSTRAINT "skill_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 80,
    "description" TEXT DEFAULT '',
    "sort_order" INTEGER DEFAULT 0,
    "is_published" BOOLEAN DEFAULT true,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "sort_order" INTEGER DEFAULT 0,

    CONSTRAINT "learning_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_highlights" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "icon_key" TEXT DEFAULT 'Code2',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sort_order" INTEGER DEFAULT 0,

    CONSTRAINT "about_highlights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journey_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sort_order" INTEGER DEFAULT 0,

    CONSTRAINT "journey_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fun_facts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "icon_key" TEXT DEFAULT 'Coffee',
    "sort_order" INTEGER DEFAULT 0,

    CONSTRAINT "fun_facts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT DEFAULT 'new',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN DEFAULT false,
    "config" JSONB DEFAULT '{}',
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "automations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "automation_id" UUID,
    "status" TEXT NOT NULL,
    "payload" JSONB DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "automation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "seo_title" TEXT,
    "seo_description" TEXT,
    "og_image_url" TEXT,
    "show_about" BOOLEAN DEFAULT true,
    "show_skills" BOOLEAN DEFAULT true,
    "show_projects" BOOLEAN DEFAULT true,
    "show_contact" BOOLEAN DEFAULT true,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skill_categories_key_key" ON "skill_categories"("key");

-- CreateIndex
CREATE INDEX "idx_contact_submissions_created_at" ON "contact_submissions"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_contact_submissions_status" ON "contact_submissions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "automations_key_key" ON "automations"("key");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "skill_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "automation_logs" ADD CONSTRAINT "automation_logs_automation_id_fkey" FOREIGN KEY ("automation_id") REFERENCES "automations"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

