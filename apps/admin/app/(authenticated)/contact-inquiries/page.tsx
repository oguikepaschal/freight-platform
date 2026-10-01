import type { Metadata } from "next";
import { Card } from "@freight/ui";
import { getInquiryStatus, listContactInquiries } from "@freight/database";

import { ContactInquiriesTable } from "./ContactInquiriesTable";

export const metadata: Metadata = {
  title: "Contact inquiries | Meridian Freight Admin",
};

function formatAge(createdAt: Date, now: Date): string {
  const hours = Math.floor((now.getTime() - createdAt.getTime()) / (60 * 60 * 1000));
  return hours < 48 ? `${Math.max(hours, 0)}h` : `${Math.floor(hours / 24)}d`;
}

export default async function ContactInquiriesPage() {
  // The (authenticated) layout above already redirects unauthenticated
  // requests before this page renders.
  const now = new Date();
  const inquiries = (await listContactInquiries()).map((inquiry) => ({
    ...inquiry,
    status: getInquiryStatus(inquiry, now),
    ageLabel: formatAge(inquiry.createdAt, now),
  }));

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-comfortable px-comfortable py-expansive">
      <header className="flex flex-col gap-tight">
        <h1 className="font-display text-3xl font-semibold text-foreground">Contact inquiries</h1>
        <p className="text-base text-muted">All /contact submissions, most recent first.</p>
      </header>

      <Card>
        <ContactInquiriesTable inquiries={inquiries} />
      </Card>
    </div>
  );
}
