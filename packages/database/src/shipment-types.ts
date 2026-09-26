// The one list of shipment types: stored values and their labels. schema.ts
// derives the shipmentType column's union from it, and the web contact form
// and admin inquiry pages render from it, so they can't drift apart.
//
// Deliberately dependency-free and separate from schema.ts: schema.ts
// imports node:crypto, so client components (ContactForm, the admin table)
// can't import it. They import this file by path
// (`@freight/database/src/shipment-types`) instead of the package root,
// which also pulls in the Neon client.
export const SHIPMENT_TYPES = [
  { value: "full_load", label: "Full load" },
  { value: "part_load", label: "Part load" },
  { value: "not_sure", label: "Not sure" },
] as const;

export type ShipmentType = (typeof SHIPMENT_TYPES)[number]["value"];
