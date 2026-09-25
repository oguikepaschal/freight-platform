# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Shippers and logistics coordinators (B2B). On the public site they discover logistics services, request a quote through a structured inquiry that a specialist answers, find offices, and track shipments by reference number without logging in.

Scope: this file covers the public site (apps/web) only. The customer portal (apps/portal) and the admin platform (apps/admin) are separate authenticated apps and are out of scope for design work.

## Product Purpose

A global freight-forwarding and logistics platform. The public website is the acquisition, information and service-discovery layer. A separate authenticated portal handles shipment management, and an internal admin platform lets staff author tracking events, content and inquiries. On the public site, success is a shipper reaching the right service or industry page and starting a specialist conversation, or looking up a shipment.

## Positioning

Undecided. No mechanism that a neighboring freight forwarder could not truthfully copy has been stated. Future work must not invent one.

## Operating Context

- Markets follow a three-tier model. Tier 1 is a fully localized subsite at /{locale}. Tier 2 is a lightweight landing page at /countries/{slug}. Tier 3 has no page and is a country filter on the Locations directory.
- Quotes are requested through a structured inquiry (origin, destination, cargo details, dates, contact) that a specialist answers. Instant (Tier A) quoting would need a maintained rate engine, which the site does not have today. The UI must never imply a live calculation is running when the outcome is a specialist's response.
- Tracking data is authored by operations staff in the admin platform. There is no live carrier or port feed behind public tracking, so the site must not present it as one.
- The site is server-rendered by default, with client-side islands only for genuinely interactive pieces such as tracking and location search.

## Capabilities and Constraints

The public site covers service and industry pages, locations, shipment tracking, contact and search, company and careers pages, and country landing pages.

Binding constraints, recorded as given:

1. Only packages/config/tailwind/palette.css may contain hex values. Everything else uses semantic tokens.
2. The Tailwind default palette is wiped (--color-*: initial). Only token utilities exist.
3. Type is Archivo (display, width axis), IBM Plex Sans and IBM Plex Mono, loaded locally through @fontsource. Do not add or swap typefaces without asking.
4. apps/web is always light. Dark sections use a nested data-mode="dark" wrapper. No dark: variants.
5. Motion is restrained. Every animation must respect prefers-reduced-motion. No bounce or elastic easing.
6. Server-rendered by default. Client components only for genuinely interactive islands.
7. packages/ui ships raw TS to three apps. Design changes for apps/web must not leak into portal or admin.
8. Typography, including the current type scale, is approved. Do not run typeset or change sizes without asking.

Known exceptions to constraint 1:

- apps/web/app/(intl)/[locale]/style-guide/page.tsx repeats the palette hex values as display strings for its swatches. It is documentation, not styling, and it is deliberately left untouched.
- Exported brand assets (favicon, OG image and files under public/brand) will contain literal hex values copied from palette.css because they cannot read CSS variables. The React logo component stays token-only.
- DESIGN.md and its sidecar quote palette hex values as documentation.

## Brand Commitments

- Working name: Meridian Freight (logo implemented).
- Portfolio and demo build. The working name is used by other freight companies, so do not present this as a real company.
- Direction, as given: premium, global, technological, precise, trustworthy, industrial without feeling dated, data-driven.
- An independent brand language, not a copy of Kuehne+Nagel. Its structure and breadth are the reference; its visual identity and specific copy are not.

## Evidence on Hand

Undecided. Nothing has been confirmed as real customer, integration, testimonial or certification content. The homepage logo strips are explicitly invented placeholders (packages/ui/src/partner-data.ts says so). Stats, testimonials and certification content have not been verified as real. Future work must not fabricate any of these.

## Product Principles

1. Be honest about what happens next: a specialist responds, and nothing implies live pricing or live carrier data.
2. One dominant, contextual conversion action per page (talk to a specialist for that service), with tracking as the secondary path.
3. Service and industry pages stay short and benefit-led. Depth lives in separate guides, not on the commercial pages.
