ALTER TABLE "contact_inquiries" ALTER COLUMN "message" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "service_slug" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "industry_slug" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "shipment_type" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "origin" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "destination" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "cargo_description" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "total_weight_kg" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "package_count" integer;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "dimensions" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "container_requirements" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "special_handling" text;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD COLUMN "preferred_shipping_date" date;--> statement-breakpoint
ALTER TABLE "contact_inquiries" ADD CONSTRAINT "contact_inquiries_mode_check" CHECK (("contact_inquiries"."service_slug" IS NULL AND "contact_inquiries"."industry_slug" IS NULL AND "contact_inquiries"."message" IS NOT NULL) OR ("contact_inquiries"."origin" IS NOT NULL AND "contact_inquiries"."destination" IS NOT NULL AND "contact_inquiries"."service_slug" IS NOT NULL));