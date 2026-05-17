-- supabase/migrations/20260516000000_add_membership_columns.sql
ALTER TABLE members
  ADD COLUMN IF NOT EXISTS payment_method text,
  ADD COLUMN IF NOT EXISTS payment_handle text,
  ADD COLUMN IF NOT EXISTS is_returning boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS children_count integer NOT NULL DEFAULT 0;
