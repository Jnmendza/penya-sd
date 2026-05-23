-- supabase/migrations/20260516000000_add_membership_columns.sql
ALTER TABLE members
  ADD COLUMN IF NOT EXISTS payment_method text,
  ADD COLUMN IF NOT EXISTS payment_handle text,
  ADD COLUMN IF NOT EXISTS is_returning boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS children_count integer NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE IF NOT EXISTS "member_applications" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "is_returning" BOOLEAN NOT NULL DEFAULT false,
    "payment_method" TEXT NOT NULL,
    "payment_handle" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "season" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "child_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "parent_application_id" TEXT NOT NULL,

    CONSTRAINT "child_members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'child_members_parent_application_id_fkey'
  ) THEN
    ALTER TABLE "child_members" ADD CONSTRAINT "child_members_parent_application_id_fkey" FOREIGN KEY ("parent_application_id") REFERENCES "member_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
