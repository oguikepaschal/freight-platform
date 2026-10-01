"use client";

import { useTransition } from "react";
import { buttonClassName } from "@freight/ui";

import { assignToMeAction } from "./mark-actions";

// Client component for the same reason as MarkHandledButton: needs pending
// state around a server action call.
export function AssignToMeButton({ inquiryId }: { inquiryId: number }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await assignToMeAction(inquiryId);
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={buttonClassName("secondary", "sm")}
    >
      {isPending ? "Assigning…" : "Assign to me"}
    </button>
  );
}
