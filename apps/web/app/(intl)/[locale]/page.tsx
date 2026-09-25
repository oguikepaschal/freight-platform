import type { Metadata } from "next";
import Image from "next/image";
import {
  buttonClassName,
  DarkCtaBand,
  DEFAULT_PRIMARY_ACTION,
  HOME_PRIMARY_ACTION,
  INDUSTRIES,
  LaneTicker,
  ManifestStrip,
  SERVICES,
  touchTarget,
} from "@freight/ui";
import { localePath } from "@/lib/locale/config";
import { getLocale } from "@/lib/locale/server";

export const metadata: Metadata = {
  title: "Meridian Freight — Global freight forwarding & logistics",
  description:
    "Sea, air, and road freight, customs, warehousing, and supply-chain consulting — quoted by a specialist and tracked by reference number.",
};

const LANES = [
  "Shanghai → Rotterdam",
  "Ho Chi Minh → Los Angeles",
  "Hamburg → Santos",
  "Chicago → Guadalajara",
  "Jebel Ali → Mombasa",
  "Busan → Long Beach",
  "Antwerp → Montreal",
  "Singapore → Sydney",
];

const QUOTE_STEPS = [
  {
    title: "Tell us the lane",
    description:
      "Send origin, destination, cargo details, and dates through the contact form. No account needed.",
  },
  {
    title: "A specialist reviews it",
    description:
      "A person checks routing, customs, and handling for your cargo. Pricing is worked out by them, not by a rate engine.",
  },
  {
    title: "You get a quote back",
    description:
      "The specialist replies with a quote and a recommended routing. Once it ships, track it by reference number.",
  },
];

/** First letter of up to the first two words — same lightweight monogram
 * ContentCard uses, kept local here rather than shared so restyling this
 * page's grids never risks changing ContentCard's own rendering on
 * /services, /industries, or /search. */
function initials(label: string): string {
  return label
    .split(/[\s,/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function Page() {
  const locale = await getLocale();
  const resolveHref = (href: string) => localePath(locale, href);

  return (
    <>
      <section data-mode="dark" className="relative isolate bg-background">
        {/* Full-bleed background behind the grid and ticker. `isolate` keeps
            the -z-10 layers above this section's own background. Below lg the
            text spans the full width, so the overlay is near-flat; from lg the
            text sits left, so it fades out toward the ManifestStrip side. */}
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-background/90 lg:bg-transparent lg:bg-linear-to-r lg:from-background lg:via-background/90 lg:to-background/30" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-loose px-comfortable py-expansive lg:grid-cols-2">
          <div className="flex flex-col gap-cozy">
            <p className="font-mono text-xs uppercase tracking-wide text-oxide">
              Global freight forwarding
            </p>
            <h1 className="font-display text-4xl font-semibold text-foreground">
              Move freight anywhere, with a specialist on every shipment.
            </h1>
            <p className="max-w-lg text-base text-muted">
              Sea, air, and road freight, customs clearance, warehousing, and supply-chain
              consulting. Tell us the lane and a specialist comes back with a quote; once it
              moves, you track it by reference number.
            </p>
            <div className="flex flex-wrap gap-cozy pt-tight">
              <a
                href={resolveHref(HOME_PRIMARY_ACTION.href)}
                className={buttonClassName("primary", "md", touchTarget)}
              >
                {HOME_PRIMARY_ACTION.label}
              </a>
              <a
                href={resolveHref(DEFAULT_PRIMARY_ACTION.href)}
                className={buttonClassName("secondary", "md", touchTarget)}
              >
                {DEFAULT_PRIMARY_ACTION.label}
              </a>
            </div>
          </div>

          {/* Only beside the hero copy, from lg. Below lg the grid is one
              column, where the panel stacked under the copy and pushed the
              first section a full screen down; the lane ticker still
              carries the freight texture there. */}
          <ManifestStrip className="hidden lg:block" />
        </div>

        <LaneTicker lanes={LANES} className="bg-background/85" />
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-expansive px-comfortable py-expansive">
        <section className="flex flex-col gap-comfortable">
          <div className="reveal flex flex-wrap items-end justify-between gap-cozy">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Every mode and value-added service, from a single partner.
            </h2>
            <a
              href={resolveHref("/services")}
              className="relative font-mono text-xs font-medium uppercase tracking-wide text-muted transition-colors duration-base after:absolute after:-inset-x-2 after:-inset-y-3.5 after:content-[''] hover:text-oxide"
            >
              All services <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Wallet Stack: each card is position:sticky with an increasing
              `top`, so later cards overlap and cover earlier ones as the
              section scrolls. A single column, not a responsive grid — the
              stacking effect only reads correctly with one card per row.
              `top`/`zIndex` are computed per index, so they have to be
              inline style rather than a Tailwind class: JIT needs literal
              class strings at build time (see ManifestStrip.tsx's
              `duration-[260ms]` comment for the same constraint). */}
          <div className="flex flex-col gap-cozy">
            {SERVICES.map((service, index) => (
              <div
                key={service.slug}
                className={`sticky flex flex-col rounded-lg border transition-colors duration-base md:min-h-56 md:flex-row ${
                  index === 0
                    ? "border-oxide/30 bg-oxide-soft"
                    : "border-border bg-surface hover:border-mist"
                }`}
                style={{ top: `calc(10vh + ${index * 40}px)`, zIndex: index + 1 }}
              >
                {/* Image wrapper has no intrinsic height at md+: the row's
                    text column sets the card height and the image crops to it. */}
                {service.image ? (
                  <div className="relative aspect-video shrink-0 overflow-hidden rounded-t-lg md:aspect-auto md:w-2/5 md:rounded-l-lg md:rounded-tr-none">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-cozy p-comfortable">
                  {service.image ? null : (
                    <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background font-mono text-xs font-medium text-foreground">
                      {initials(service.label)}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {service.label}
                  </h3>
                  <span className="text-sm text-muted">{service.shortDescription}</span>
                  <a
                    href={resolveHref(service.href)}
                    className="relative mt-auto inline-flex w-fit items-center gap-tight font-mono text-sm text-oxide after:absolute after:inset-0 after:content-['']"
                  >
                    View service
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-comfortable">
          <div className="reveal flex flex-wrap items-end justify-between gap-cozy">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Handling, documentation, and timing matched to your sector.
            </h2>
            <a
              href={resolveHref("/industries")}
              className="relative font-mono text-xs font-medium uppercase tracking-wide text-muted transition-colors duration-base after:absolute after:-inset-x-2 after:-inset-y-3.5 after:content-[''] hover:text-oxide"
            >
              All industries <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Five industries: the first card spans two columns, so the grid
              fills evenly at both two columns (2 + 2 + 2) and three (3 + 3)
              instead of leaving one card alone on the last row. Its image
              crop widens to 4:1 to keep the row's image heights equal. */}
          <div className="grid grid-cols-1 gap-cozy sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry, index) => (
              <a
                key={industry.slug}
                href={resolveHref(industry.href)}
                className={`reveal block h-full ${index === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className="flex h-full flex-col gap-cozy rounded-lg border border-border bg-surface p-comfortable transition-[border-color,transform] duration-base hover:-translate-y-0.5 hover:border-oxide">
                  {industry.image ? (
                    <div
                      className={`relative aspect-video overflow-hidden rounded-md ${index === 0 ? "sm:aspect-[4/1]" : ""}`}
                    >
                      <Image
                        src={industry.image}
                        alt=""
                        fill
                        sizes={
                          index === 0
                            ? "(min-width: 1024px) 66vw, 100vw"
                            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        }
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  {industry.image ? null : (
                    <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background font-mono text-xs font-medium text-foreground">
                      {initials(industry.label)}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {industry.label}
                  </h3>
                  <span className="mt-auto text-sm text-muted">{industry.shortDescription}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* The one numbered list on the page: here the order is the
            information. The copy follows the real flow (PRODUCT.md): the
            contact form takes a free-text message, a specialist answers it,
            and tracking is by reference number without an account. */}
        <section className="flex flex-col gap-comfortable">
          <h2 className="reveal font-display text-2xl font-semibold text-foreground">
            How a quote works
          </h2>
          <ol className="grid grid-cols-1 gap-comfortable md:grid-cols-3">
            {QUOTE_STEPS.map((step, index) => (
              <li key={step.title} className="reveal flex flex-col gap-tight border-t border-border pt-cozy">
                <span className="font-mono text-xs font-medium text-oxide">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="max-w-sm text-sm text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <DarkCtaBand
        eyebrow="Request a quote"
        heading="Tell us the lane. We will tell you the fastest compliant way to move it."
        meta="A specialist reviews every request · No automated pricing"
        primaryCta={{ label: HOME_PRIMARY_ACTION.label, href: resolveHref(HOME_PRIMARY_ACTION.href) }}
        secondaryCta={{ label: "Find a location", href: resolveHref("/locations") }}
      />
    </>
  );
}
