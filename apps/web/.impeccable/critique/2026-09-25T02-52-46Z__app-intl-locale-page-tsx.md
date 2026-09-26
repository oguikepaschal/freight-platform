---
target: the homepage
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\admin\\Documents\\freight-platform\\apps\\web\\app\\(intl)\\[locale]\\page.tsx"
target_fingerprint: "sha256:ec567cee92c3ad04deef90653ac85215bb672bb273f15bb5ec3188afa5593cf5"
target_path: "C:\\Users\\admin\\Documents\\freight-platform\\apps\\web\\app\\(intl)\\[locale]\\page.tsx"
timestamp: 2026-09-25T02-52-46Z
slug: app-intl-locale-page-tsx
closed: true
---
# Critique: Meridian Freight homepage (app/(intl)/[locale]/page.tsx)
Method: dual-agent

## Heuristics (20/32, Acceptable; 7 and 10 n/a on a landing surface)
1 Status 2: "Live manifest" pulse and static "12,480 active bookings" imply a live system; disclaimer is small, muted, right-aligned.
2 Real world 3: good vocabulary; "24/7" shown as a stat; ↗ on internal links.
3 Control 3: 100vh pinned testimonial holds the scroll.
4 Consistency 2: two oxide primaries in view; specialist/expert wording mismatch; numbered unordered lists.
5 Error prevention 2: "booked and tracked from one platform" implies self-serve booking.
6 Recognition 3: GDP/AEO/C-TPAT/TEU unexplained.
7 n/a. 8 Minimalist 2: busy hero, empty Assurance. 9 Recovery 3. 10 n/a.

## Specificity
Standard B2B template with an authored Manifest type/colour language. The ManifestStrip is the only freight-specific element and it simulates liveness. Detector: CLI 0 findings; in-page: cramped-padding on LaneTicker.tsx:38 (real), 2x all-caps-body (likely FP), numbered labels + pulsing dot (deliberate).

## Priority issues
- P0 Conversion hierarchy inverted: DEFAULT_PRIMARY_ACTION = Track shipment (nav-data.ts:216) drives header CTA and hero primary (page.tsx:102-107); Portal login adds a third button. Fix: homepage primary "Talk to a specialist", Track secondary, drop Portal from hero.
- P1 Unverified evidence as fact: stats (page.tsx:28-33, 322), certifications (46-53), anonymous testimonial (295-299), logo strip disclaimed only in sr-only text (LogoStrip.tsx:117), "All rights reserved" footer. Fix: visible Illustrative labels or capability facts; demo-build footer line.
- P1 Implied live data/booking: ManifestStrip.tsx:271/320, page.tsx:94-98. Fix: "Sample manifest", illustrative note first, drop bookings count, rewrite lede.
- P2 Assurance void: page.tsx:267-301 pinned single quote; eyebrow is a <p>. Fix: unpin; "How a quote works" 3-step block with certs/integrations; h2.
- P2 Mobile cost: hero 991px on 812 viewport, 8,754px page, Track x3 above fold, 32px icons, 17px text links, ticker 0 padding. Fix: trim ManifestStrip below lg, dedupe Track, 44px targets, ticker padding.

## Personas
First-timer: three ambiguous entry points, jargon, believes "Live". Detail-checker: 96.2% no period, regenerating refs vs static count, booking promise, industries h2 over-promise. Phone: 150px header, 7 actions, 812px empty pin, oxide logo wall loudest. Coordinator: no quote prerequisites, "expert" not "quote", no coverage info, integration types missing, thin footer.

## Cognitive load: 5/8 failed (high). ~14 actions in desktop first screen.

## Minor
StatBand mobile stray rule; industries orphan gap; ManifestStrip empty first paint (CLS); 25px service strips; span titles, no skip link; seam before footer.

## Questions
Why is the brightest button for existing customers? What survives if every number had to be true? Why is the ManifestStrip ambience instead of an honest sample into /track?
