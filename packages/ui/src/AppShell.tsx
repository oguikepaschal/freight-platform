import type { ReactNode } from "react";
import { buttonClassName } from "./Button";
import { Logo } from "./Logo";

export interface AppShellNavItem {
  label: string;
  href: string;
}

export interface AppShellProps {
  /**
   * Accessible name of the home link that wraps the logo. The logo itself is
   * decorative, so this string is the only thing a screen reader hears.
   */
  brand: string;
  /**
   * Optional sentence-case label rendered as plain text after the home link
   * (not inside it) — e.g. "Admin" — so the link name and the app label are
   * announced separately.
   */
  appLabel?: string;
  navItems: AppShellNavItem[];
  /**
   * Resolves an internal `href` before it's rendered — e.g. prefixing it
   * with an app-specific base path. Defaults to the identity function,
   * matching the `resolveHref` pattern every other shared nav component in
   * this package (Header, Footer) already follows.
   */
  resolveHref?: (href: string) => string;
  userEmail: string;
  signOutAction: () => Promise<void>;
  children: ReactNode;
}

/**
 * Top bar for an authenticated app (portal, admin): brand, nav links, the
 * signed-in user's email, and a sign-out control. Deliberately not
 * `Header` — no mega-menu, no locale awareness, no mobile disclosure. Does
 * not wrap `children` in a content width/padding container; pages own
 * that themselves (e.g. `max-w-5xl` vs `max-w-3xl` in apps/portal) and
 * shouldn't be forced to match.
 */
export function AppShell({
  brand,
  appLabel,
  navItems,
  resolveHref = (href) => href,
  userEmail,
  signOutAction,
  children,
}: AppShellProps) {
  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between lg:flex-nowrap gap-x-cozy gap-y-tight px-comfortable py-snug">
          <div className="flex flex-wrap items-center gap-x-comfortable gap-y-tight lg:flex-nowrap">
            <a href={resolveHref("/")} aria-label={brand} className="block shrink-0 text-foreground">
              <Logo variant="compact" className="h-[0.9rem] w-auto" />
            </a>
            {appLabel ? (
              <span className="-ml-cozy font-sans text-xs text-muted">{appLabel}</span>
            ) : null}
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-tight lg:flex-nowrap">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={resolveHref(item.href)}
                  className="rounded-sm px-tight py-tight font-sans text-sm text-foreground transition-colors duration-base hover:text-oxide"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-x-cozy gap-y-tight lg:flex-nowrap">
            <span className="min-w-0 break-words font-sans text-sm text-muted">{userEmail}</span>
            <form action={signOutAction}>
              <button type="submit" className={buttonClassName("secondary", "sm")}>
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
