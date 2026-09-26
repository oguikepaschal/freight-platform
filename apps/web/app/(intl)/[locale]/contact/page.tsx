import type { Metadata } from "next";
import { Card } from "@freight/ui";

import { ContactForm } from "./ContactForm";
import { validIndustrySlug, validServiceSlug } from "./contact-options";

export const metadata: Metadata = {
  title: "Contact us | Meridian Freight",
  description: "Get in touch with our team about a shipment, quote, or general enquiry.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[]; industry?: string | string[] }>;
}) {
  // A valid service or industry slug (from a service/industry CTA) puts the
  // form in shipment mode. Neither, or an unknown slug, leaves the general
  // form exactly as it was — a stale or mistyped link is never an error.
  const { service, industry } = await searchParams;
  const initialServiceSlug = validServiceSlug(service);
  const industrySlug = validIndustrySlug(industry);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-comfortable px-comfortable py-expansive">
      <header className="flex flex-col gap-tight">
        <h1 className="font-display text-3xl font-semibold text-foreground">Contact us</h1>
        <p className="max-w-2xl text-base text-muted">
          Tell us about your shipment or question and a member of our team will get back to you.
        </p>
      </header>

      <Card>
        <ContactForm initialServiceSlug={initialServiceSlug} industrySlug={industrySlug} />
      </Card>
    </div>
  );
}
