"use server";

import { revalidatePath } from "next/cache";
import {
  deleteShipmentDocument,
  getDocumentDownloadUrl,
  getShipmentIdByReference,
  listDocumentsForShipment,
  uploadShipmentDocument,
} from "@freight/database";
import type { Document } from "@freight/database";

import { requireAdmin } from "@/auth";

const DOCUMENT_TYPES = new Set<Document["documentType"]>([
  "bill_of_lading",
  "commercial_invoice",
  "packing_list",
  "customs_declaration",
  "certificate_of_origin",
  "other",
]);

function isDocumentType(value: string): value is Document["documentType"] {
  return DOCUMENT_TYPES.has(value as Document["documentType"]);
}

// Server actions are reachable directly (not gated by the page render), so
// this re-checks auth itself rather than trusting the form that called it —
// same pattern as logTrackingEvent and createShipmentAction.
export async function uploadDocument(formData: FormData): Promise<void> {
  await requireAdmin();

  const referenceNumber = String(formData.get("referenceNumber") ?? "");
  const documentTypeRaw = String(formData.get("documentType") ?? "");
  const file = formData.get("file");

  if (!referenceNumber) {
    throw new Error("Missing shipment reference");
  }
  if (!isDocumentType(documentTypeRaw)) {
    throw new Error("Invalid document type");
  }
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Missing file");
  }

  const shipmentId = await getShipmentIdByReference(referenceNumber);
  if (shipmentId === null) {
    throw new Error("Shipment not found");
  }

  await uploadShipmentDocument(shipmentId, file, documentTypeRaw);

  revalidatePath(`/shipments/${referenceNumber}`);
}

// Called directly from the client-side documents list (not a form) — same
// re-check-auth-here reasoning as uploadDocument above. Returns a fresh
// signed URL on every call rather than one baked into the page at render
// time, so the link can never outlive its own click.
export async function requestDocumentDownloadUrl(
  documentId: number,
  referenceNumber: string,
): Promise<string> {
  await requireAdmin();
  await assertDocumentBelongsToShipment(documentId, referenceNumber);

  return getDocumentDownloadUrl(documentId);
}

// Also called directly from the client-side documents list, after the user
// confirms the delete there — same re-check-auth-here reasoning as above.
// The ownership check runs before deleteShipmentDocument, so a mismatched
// pair errors out without touching Vercel Blob or the documents row.
export async function deleteDocument(documentId: number, referenceNumber: string): Promise<void> {
  await requireAdmin();
  await assertDocumentBelongsToShipment(documentId, referenceNumber);

  await deleteShipmentDocument(documentId);

  revalidatePath(`/shipments/${referenceNumber}`);
}

// Both ids arrive from the client, so the document must be one of the
// documents of the shipment the caller named, not just any existing row.
async function assertDocumentBelongsToShipment(
  documentId: number,
  referenceNumber: string,
): Promise<void> {
  const shipmentId = await getShipmentIdByReference(referenceNumber);
  if (shipmentId === null) {
    throw new Error("Shipment not found");
  }
  const documents = await listDocumentsForShipment(shipmentId);
  if (!documents.some((document) => document.id === documentId)) {
    throw new Error("Document not found on this shipment");
  }
}
