ALTER TABLE "post_comments" RENAME COLUMN "user_id" TO "createdBy";--> statement-breakpoint
ALTER TABLE "post_comments" DROP CONSTRAINT "post_comments_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
