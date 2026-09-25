import type { HTMLAttributes, Ref } from "react";
import { cx } from "./cx";
import { Logo } from "./Logo";
import type { NavLink } from "./nav-data";
import { COMPANY_LINKS, SERVICES, UTILITY_LINKS } from "./nav-data";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  /**
   * Resolves an internal `href` before it's rendered — e.g. prefixing it
   * with the current locale segment. A plain prop rather than context, for
   * the same reason Header's `locale` prop is (see its doc comment):
   * `AppShell` renders `Footer` directly and nothing else in this package
   * currently needs it. Defaults to the identity function so callers that
   * render `Footer` outside `AppShell` — e.g. the style-guide's standalone
   * preview — keep unprefixed hrefs.
   */
  resolveHref?: (href: string) => string;
}

function LinkColumn({
  title,
  links,
  resolveHref,
}: {
  title: string;
  links: NavLink[];
  resolveHref: (href: string) => string;
}) {
  return (
    <nav aria-label={title} className="flex flex-col gap-tight">
      <h2 className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </h2>
      <ul className="flex flex-col gap-tight">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={resolveHref(link.href)}
              className="font-sans text-sm text-foreground transition-colors duration-base hover:text-oxide"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer({ className, ref, resolveHref = (href) => href, ...props }: FooterProps) {
  return (
    <footer ref={ref} className={cx("border-t border-border bg-surface", className)} {...props}>
      <div className="mx-auto flex max-w-6xl flex-col gap-loose px-comfortable py-loose">
        <div className="grid grid-cols-1 gap-comfortable sm:grid-cols-3">
          <LinkColumn title="Services" links={SERVICES} resolveHref={resolveHref} />
          {/* The same three hot paths as Header's utility row (track, find a
              location, talk to a specialist), so the end of every page
              offers a next step rather than only corporate links. */}
          <LinkColumn title="Get in touch" links={UTILITY_LINKS} resolveHref={resolveHref} />
          {/* Careers lives in this Company column only — per
              Project_Overview.md's CTA-hierarchy principle, career links
              never share a list with commercial actions (track/contact),
              which have their own column. */}
          <LinkColumn title="Company" links={COMPANY_LINKS} resolveHref={resolveHref} />
        </div>

        <div className="flex flex-col gap-tight border-t border-border pt-comfortable sm:flex-row sm:items-center sm:justify-between">
          <Logo variant="header" className="h-3 w-auto text-foreground" />
          <p className="font-mono text-xs text-muted">
            Meridian Freight is a fictional company. This site is a portfolio demo.
          </p>
        </div>
      </div>
    </footer>
  );
}
