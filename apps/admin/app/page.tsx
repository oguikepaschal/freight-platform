import { redirect } from "next/navigation";
import { requireAdmin } from "@/auth";

export default async function Page() {
  await requireAdmin();

  redirect("/shipments");
}
