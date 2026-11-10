import type { ReactNode } from "react";
import { AppShell } from "@freight/ui";

import { requireAdmin, signOut } from "@/auth";

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();

  return (
    <AppShell
      brand="Meridian Freight"
      appLabel="Admin"
      navItems={[
        { label: "Shipments", href: "/shipments" },
        { label: "Customers", href: "/customers" },
        { label: "Inquiries", href: "/contact-inquiries" },
      ]}
      userEmail={session.user.email ?? ""}
      signOutAction={async () => {
        "use server";
        await signOut();
      }}
    >
      {children}
    </AppShell>
  );
}
