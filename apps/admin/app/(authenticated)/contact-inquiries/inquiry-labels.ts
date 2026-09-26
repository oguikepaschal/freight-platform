import { SHIPMENT_TYPES } from "@freight/database/src/shipment-types";
import type { ShipmentType } from "@freight/database/src/shipment-types";
import { INDUSTRIES, SERVICES } from "@freight/ui";

// Slug -> label for the admin list and detail. A slug no longer in the
// nav-data lists (an entry renamed or removed since the inquiry was
// submitted) falls back to the raw stored slug rather than disappearing.
export function serviceLabel(slug: string | null): string | null {
  if (!slug) return null;
  return SERVICES.find((entry) => entry.slug === slug)?.label ?? slug;
}

export function industryLabel(slug: string | null): string | null {
  if (!slug) return null;
  return INDUSTRIES.find((entry) => entry.slug === slug)?.label ?? slug;
}

export const SHIPMENT_TYPE_LABELS = Object.fromEntries(
  SHIPMENT_TYPES.map((type) => [type.value, type.label]),
) as Record<ShipmentType, string>;
