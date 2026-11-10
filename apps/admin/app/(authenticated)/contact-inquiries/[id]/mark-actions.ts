"use server";

import { revalidatePath } from "next/cache";
import { assignContactInquiry, markContactInquiryHandled } from "@freight/database";

import { requireAdmin } from "@/auth";

// Server actions are reachable directly (not gated by the page render), so
// this re-checks auth itself — same pattern as every other action in this
// codebase.
export async function markContactInquiryHandledAction(inquiryId: number): Promise<void> {
  await requireAdmin();

  await markContactInquiryHandled(inquiryId);

  revalidatePath("/contact-inquiries");
  revalidatePath(`/contact-inquiries/${inquiryId}`);
}

export async function assignToMeAction(inquiryId: number): Promise<void> {
  const session = await requireAdmin();

  await assignContactInquiry(inquiryId, session.user.id);

  revalidatePath("/contact-inquiries");
  revalidatePath(`/contact-inquiries/${inquiryId}`);
}
