"use client";

import Link from "next/link";
import { Badge, Table } from "@freight/ui";
import type { Column } from "@freight/ui";
import type { ContactInquiryWithAssignee, InquiryStatus } from "@freight/database";

import { formatDate } from "@/lib/shipment-labels";
import { serviceLabel } from "./inquiry-labels";

// Table's render/rowKey props are functions, which can't cross the
// server/client boundary as serialized props — so the column config lives
// here, inside the client component, rather than in the server page above.
// Status and age are computed once in the server page (one shared `now`) so
// this client component never reads the clock and can't hydrate differently.
export type InquiryRow = ContactInquiryWithAssignee & {
  status: InquiryStatus;
  ageLabel: string;
};

const columns: Column<InquiryRow>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => (
      <Link href={`/contact-inquiries/${row.id}`} className="text-oxide hover:underline">
        {row.name}
      </Link>
    ),
  },
  {
    key: "email",
    header: "Email",
    type: "data",
    render: (row) => (
      <Link
        href={`/contact-inquiries/${row.id}`}
        className="font-mono text-sm text-oxide hover:underline"
      >
        {row.email}
      </Link>
    ),
  },
  {
    key: "company",
    header: "Company",
    render: (row) => row.company ?? "—",
  },
  {
    key: "service",
    header: "Service",
    render: (row) => serviceLabel(row.serviceSlug) ?? "—",
  },
  {
    key: "createdAt",
    header: "Submitted",
    type: "data",
    render: (row) => formatDate(row.createdAt),
  },
  {
    key: "owner",
    header: "Owner",
    render: (row) => row.assigneeName ?? row.assigneeEmail ?? "Unassigned",
  },
  {
    key: "age",
    header: "Age",
    type: "data",
    render: (row) => row.ageLabel,
  },
  {
    key: "status",
    header: "Status",
    // "New" uses the variant NotificationsList.tsx uses for its unread
    // badge. The Badge union has no warning variant; "neutral" is what
    // STATUS_BADGE_VARIANTS already uses for the shipment "delayed" state.
    render: (row) => {
      if (row.status === "overdue") return <Badge variant="neutral">Overdue</Badge>;
      if (row.status === "new") return <Badge variant="in-transit">New</Badge>;
      return null;
    },
  },
];

export function ContactInquiriesTable({ inquiries }: { inquiries: InquiryRow[] }) {
  return (
    <Table
      columns={columns}
      data={inquiries}
      rowKey={(row) => row.id}
      caption="Contact inquiries"
      emptyState={<p className="text-sm text-muted">No inquiries yet.</p>}
    />
  );
}
