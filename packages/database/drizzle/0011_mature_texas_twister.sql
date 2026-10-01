ALTER TABLE "contact_inquiries" ADD COLUMN "assigned_to" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "assigned_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD CONSTRAINT "contact_inquiries_assigned_to_staff_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."staff"("id") ON DELETE set null ON UPDATE no action;