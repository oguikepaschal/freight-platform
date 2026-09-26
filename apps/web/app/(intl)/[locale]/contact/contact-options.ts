import { SHIPMENT_TYPES } from "@freight/database/src/shipment-types";
import { INDUSTRIES, SERVICES } from "@freight/ui";
import type { ContentNavLink } from "@freight/ui";

// Shared by the contact page, ContactForm and contact-actions.ts. Lives in
// its own module because a "use server" file can only export async functions.

// The list itself is owned by @freight/database, next to the shipmentType
// column it types.
export const SHIPMENT_TYPE_OPTIONS = SHIPMENT_TYPES;

function validSlug(entries: ContentNavLink[], value: unknown): string | undefined {
  // A repeated query param arrives as an array; only the first counts.
  const candidate = Array.isArray(value) ? value[0] : value;
  if (typeof candidate !== "string") return undefined;
  return entries.some((entry) => entry.slug === candidate) ? candidate : undefined;
}

/** The slug if it names a SERVICES entry, otherwise undefined (never an error). */
export function validServiceSlug(value: unknown): string | undefined {
  return validSlug(SERVICES, value);
}

/** The slug if it names an INDUSTRIES entry, otherwise undefined (never an error). */
export function validIndustrySlug(value: unknown): string | undefined {
  return validSlug(INDUSTRIES, value);
}
