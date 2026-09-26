"use server";

import { createContactInquiry } from "@freight/database";

import { SHIPMENT_TYPE_OPTIONS, validIndustrySlug, validServiceSlug } from "./contact-options";

export interface ContactFormResult {
  status: "success" | "error";
  message: string;
}

// Trimmed string, or null for a missing/blank field.
function textField(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() || null : null;
}

// numeric(12, 2) holds up to 10 integer digits.
const MAX_WEIGHT_KG = 10_000_000_000;
// integer column ceiling.
const MAX_PACKAGE_COUNT = 2_147_483_647;

function parseWeightKg(raw: string | null): number | null {
  if (raw === null) return null;
  const weight = Number(raw);
  if (!Number.isFinite(weight) || weight <= 0 || weight >= MAX_WEIGHT_KG) {
    throw new Error("Total weight must be a positive number of kilograms.");
  }
  return weight;
}

function parsePackageCount(raw: string | null): number | null {
  if (raw === null) return null;
  const count = /^\d+$/.test(raw) ? Number(raw) : NaN;
  if (!Number.isSafeInteger(count) || count < 1 || count > MAX_PACKAGE_COUNT) {
    throw new Error("Number of packages must be a whole number of at least 1.");
  }
  return count;
}

// Accepts only a real calendar date as <input type="date"> submits it.
function parseShippingDate(raw: string | null): string | null {
  if (raw === null) return null;
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? new Date(`${raw}T00:00:00Z`) : null;
  if (!parsed || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== raw) {
    throw new Error("Preferred shipping date must be a valid date.");
  }
  return raw;
}

// Public, unauthenticated form — unlike every other server action in this
// codebase, there's no session to re-check here. createContactInquiry does
// its own server-side validation of the required fields, since a public form
// is the one place in this app reachable by something other than our own
// UI. This action re-validates both slugs against the nav-data lists (the
// industry one arrives in a hidden field, which a client can set to
// anything), parses the numeric and date fields, and turns a thrown error
// into a result ContactForm can render instead of failing silently.
export async function submitContactInquiry(formData: FormData): Promise<ContactFormResult> {
  try {
    const shipmentType = textField(formData, "shipmentType");

    await createContactInquiry({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: textField(formData, "company"),
      phone: textField(formData, "phone"),
      message: textField(formData, "message"),
      serviceSlug: validServiceSlug(formData.get("service")) ?? null,
      industrySlug: validIndustrySlug(formData.get("industry")) ?? null,
      shipmentType: SHIPMENT_TYPE_OPTIONS.find((option) => option.value === shipmentType)?.value ?? null,
      origin: textField(formData, "origin"),
      destination: textField(formData, "destination"),
      cargoDescription: textField(formData, "cargoDescription"),
      totalWeightKg: parseWeightKg(textField(formData, "totalWeightKg")),
      packageCount: parsePackageCount(textField(formData, "packageCount")),
      dimensions: textField(formData, "dimensions"),
      containerRequirements: textField(formData, "containerRequirements"),
      specialHandling: textField(formData, "specialHandling"),
      preferredShippingDate: parseShippingDate(textField(formData, "preferredShippingDate")),
    });
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Thanks — we've received your message and will be in touch shortly.",
  };
}
