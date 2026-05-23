-- Create indexes for performance optimization under load
CREATE INDEX IF NOT EXISTS "member_applications_email_season_idx" ON "member_applications" ("email", "season");
CREATE INDEX IF NOT EXISTS "member_applications_status_idx" ON "member_applications" ("status");
CREATE INDEX IF NOT EXISTS "child_members_parent_application_id_idx" ON "child_members" ("parent_application_id");
