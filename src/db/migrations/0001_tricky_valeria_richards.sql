ALTER TABLE "users" ALTER COLUMN "refresh_token" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "refresh_token" SET NOT NULL;