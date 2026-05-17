-- CreateTable
CREATE TABLE "member_applications" (
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
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "member_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "parent_application_id" TEXT NOT NULL,

    CONSTRAINT "child_members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "child_members" ADD CONSTRAINT "child_members_parent_application_id_fkey" FOREIGN KEY ("parent_application_id") REFERENCES "member_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
