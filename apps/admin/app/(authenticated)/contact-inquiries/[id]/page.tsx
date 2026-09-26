import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge, Card } from "@freight/ui";
import { getContactInquiryById } from "@freight/database";

import { formatDate } from "@/lib/shipment-labels";
import { industryLabel, serviceLabel, SHIPMENT_TYPE_LABELS } from "../inquiry-labels";
import { MarkHandledButton } from "./MarkHandledButton";

export const metadata: Metadata = {
  title: "Contact inquiry | Meridian Freight Admin",
};

function DetailField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-tight">
      <dt className="font-sans text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="whitespace-pre-wrap text-sm text-foreground">{children}</dd>
    </div>
  );
}

export default async function ContactInquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // The (authenticated) layout above already redirects unauthenticated
  // requests before this page renders.
  const { id } = await params;
  const inquiryId = Number(id);
  const inquiry = Number.isNaN(inquiryId) ? null : await getContactInquiryById(inquiryId);

  if (!inquiry) {
    notFound();
  }

  const unhandled = inquiry.handledAt === null;
  // A service or industry slug is what makes an inquiry a shipment inquiry
  // (see contact_inquiries_mode_check); general inquiries have none of these
  // fields, so the block would only be a wall of dashes.
  const isShipmentInquiry = Boolean(inquiry.serviceSlug || inquiry.industrySlug);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-comfortable px-comfortable py-expansive">
      <header className="flex flex-col gap-tight">
        <h1 className="font-display text-3xl font-semibold text-foreground">Contact inquiry</h1>
      </header>

      <Card>
        <div className="flex flex-col gap-cozy">
          <div className="flex items-center justify-between gap-cozy">
            <h2 className="font-display text-lg font-semibold text-foreground">{inquiry.name}</h2>
            {unhandled ? <Badge variant="in-transit">New</Badge> : null}
          </div>

          <dl className="grid grid-cols-1 gap-cozy sm:grid-cols-2">
            <div className="flex flex-col gap-tight">
              <dt className="font-sans text-xs uppercase tracking-wide text-muted">Email</dt>
              <dd className="font-mono text-sm text-foreground">{inquiry.email}</dd>
            </div>
            <div className="flex flex-col gap-tight">
              <dt className="font-sans text-xs uppercase tracking-wide text-muted">Company</dt>
              <dd className="text-sm text-foreground">{inquiry.company ?? "—"}</dd>
            </div>
            <div className="flex flex-col gap-tight">
              <dt className="font-sans text-xs uppercase tracking-wide text-muted">Phone</dt>
              <dd className="text-sm text-foreground">{inquiry.phone ?? "—"}</dd>
            </div>
            <div className="flex flex-col gap-tight">
              <dt className="font-sans text-xs uppercase tracking-wide text-muted">Submitted</dt>
              <dd className="text-sm text-foreground">{formatDate(inquiry.createdAt)}</dd>
            </div>
            {inquiry.handledAt ? (
              <div className="flex flex-col gap-tight">
                <dt className="font-sans text-xs uppercase tracking-wide text-muted">Handled</dt>
                <dd className="text-sm text-foreground">{formatDate(inquiry.handledAt)}</dd>
              </div>
            ) : null}
          </dl>

          {isShipmentInquiry ? (
            <div className="flex flex-col gap-cozy">
              <h3 className="font-display text-base font-semibold text-foreground">
                Shipment details
              </h3>
              <dl className="grid grid-cols-1 gap-cozy sm:grid-cols-2">
                <DetailField label="Preferred service">
                  {serviceLabel(inquiry.serviceSlug) ?? "—"}
                </DetailField>
                <DetailField label="Industry">{industryLabel(inquiry.industrySlug) ?? "—"}</DetailField>
                <DetailField label="Origin">{inquiry.origin ?? "—"}</DetailField>
                <DetailField label="Destination">{inquiry.destination ?? "—"}</DetailField>
                <DetailField label="Shipment type">
                  {inquiry.shipmentType ? SHIPMENT_TYPE_LABELS[inquiry.shipmentType] : "—"}
                </DetailField>
                <DetailField label="Preferred shipping date">
                  {inquiry.preferredShippingDate ?? "—"}
                </DetailField>
                <DetailField label="Total weight">
                  {inquiry.totalWeightKg === null
                    ? "—"
                    : `${Number(inquiry.totalWeightKg).toLocaleString("en")} kg`}
                </DetailField>
                <DetailField label="Packages">{inquiry.packageCount ?? "—"}</DetailField>
                <DetailField label="Dimensions">{inquiry.dimensions ?? "—"}</DetailField>
                <DetailField label="Container requirements">
                  {inquiry.containerRequirements ?? "—"}
                </DetailField>
                <DetailField label="Cargo description">{inquiry.cargoDescription ?? "—"}</DetailField>
                <DetailField label="Special handling">{inquiry.specialHandling ?? "—"}</DetailField>
              </dl>
            </div>
          ) : null}

          <div className="flex flex-col gap-tight">
            <span className="font-sans text-xs uppercase tracking-wide text-muted">Message</span>
            <p className="whitespace-pre-wrap text-sm text-foreground">{inquiry.message ?? "—"}</p>
          </div>

          {unhandled ? (
            <div>
              <MarkHandledButton inquiryId={inquiry.id} />
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
