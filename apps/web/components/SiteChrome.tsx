"use client";

import type { ReactNode } from "react";
import { Footer, Header } from "@freight/ui";
import { localePath, type Locale } from "@/lib/locale/config";

/**
 * Client-side half of `AppShell`, split out only because `resolveHref` is a
 * function: a Server Component can't pass a function prop across into a
 * Client Component (Header/Footer are both `"use client"`), so `locale`
 * (a plain, serializable string) crosses that boundary instead, and
 * `resolveHref` is built here, entirely on the client side of it.
 */
export function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const resolveHref = (href: string) => localePath(locale, href);

  return (
    <>
      {/* First focusable element on every page: keyboard users skip the
          utility bar and primary nav straight to the page content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-cozy focus:top-cozy focus:z-50 focus:rounded-sm focus:bg-surface focus:px-cozy focus:py-snug focus:font-sans focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg"
      >
        Skip to content
      </a>
      {/*
        primaryAction is left unset so Header falls back to its own default
        param, DEFAULT_PRIMARY_ACTION. A page's own contextual CTA (e.g. Sea
        Freight's "Talk to a Sea Freight specialist") is resolved by Header
        itself from the route and SERVICES/INDUSTRIES' `ctaLabel` (see
        resolveContextualCta in packages/ui/src/nav-data.ts) — a page never
        passes anything here to get its own CTA shown.
      */}
      <Header locale={locale} resolveHref={resolveHref} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer resolveHref={resolveHref} />
    </>
  );
}
