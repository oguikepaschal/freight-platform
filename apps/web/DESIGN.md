---
name: Meridian Freight (apps/web)
description: Public-site design system for a global freight-forwarding platform, always light, with nested dark sections.
colors:
  ink: "#10151b"
  steel: "#191f27"
  graphite: "#2a323c"
  mist: "#5f6b7a"
  mist-on-dark: "#8b97a6"
  fog: "#dde2e8"
  paper: "#f7f8fa"
  chalk: "#ffffff"
  oxide: "#b5562b"
  oxide-on-light: "#a34a22"
  oxide-on-dark: "#e08a5a"
  transit: "#2f6bd0"
  transit-on-light: "#2457ac"
  transit-on-dark: "#7ba6f0"
  delivered: "#3e8f73"
  delivered-on-light: "#2e6e58"
  delivered-on-dark: "#6bc3a4"
  exception: "#c4462f"
  exception-on-dark: "#d9604a"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  headline-lg:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  title-lg:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.45
  caption:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "0.375rem"
  md: "0.625rem"
  lg: "1rem"
  full: "999px"
spacing:
  hairline: "0.0625rem"
  tight: "0.375rem"
  snug: "0.625rem"
  cozy: "1rem"
  comfortable: "1.5rem"
  loose: "2.5rem"
  expansive: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.oxide}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "2.5rem"
    padding: "0 {spacing.comfortable}"
  button-primary-sm:
    backgroundColor: "{colors.oxide}"
    textColor: "{colors.chalk}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    height: "2rem"
    padding: "0 {spacing.cozy}"
  button-secondary:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "2.5rem"
    padding: "0 {spacing.comfortable}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "2.5rem"
    padding: "0 {spacing.comfortable}"
  card:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.comfortable}"
  input:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    height: "2.5rem"
    padding: "0 {spacing.cozy}"
  badge:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.mist}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "0 {spacing.snug}"
  textarea:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "{spacing.snug} {spacing.cozy}"
  footer:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "{spacing.loose} {spacing.comfortable}"
---

# Design System: Meridian Freight (apps/web)

## Overview

**Creative North Star: "The Manifest"**

The Manifest. A shipment is understood as an ordered record. Hairline rules, tabular figures and numbering only where order is real. Cool neutral surfaces carry the data. Oxide is the single warm mark: it points to a position or the next action.

The public site reads as premium, global, technological, precise, trustworthy, industrial without feeling dated, and data-driven. The build expresses this with a cool-slate neutral family, a single warm brand hue (oxide) used sparingly for the primary action, links and small marks, and cool status hues that only ever name a shipment state. Headings are set in a width-extended grotesque; reference numbers, coordinates and timestamps are set in a monospace with tabular figures.

apps/web is always light: paper background, chalk surfaces, ink text. Dark sections (the homepage hero, the closing CTA band) are produced by a nested `data-mode="dark"` wrapper that remaps the same semantic tokens; there are no `dark:` variants. Depth is tonal first (paper to chalk) with a hairline border, and a soft shadow only on raised elements.

**Key Characteristics:**
- Cool slate neutrals, one warm brand hue, cool status hues kept in a separate family.
- Semantic tokens only in components; in code, hex exists solely in palette.css.
- Archivo display headings (wdth 112, 600) over IBM Plex Sans body and IBM Plex Mono data.
- Contained `max-w-6xl` column with full-bleed bands for chrome.
- A token-only logo: the word MERIDIAN as Archivo outlines in `currentColor`, closed by a single oxide dot.
- Restrained motion: short eased transitions and a scroll-bound entrance reveal, no bounce or elastic easing.

## Colors

Cool slate neutrals with one warm oxide accent and three cool status hues. Every accent ships as a solid fill plus `-on-light` / `-on-dark` variants for text, icons, dots and rules.

### Primary
- **Oxide** (`oxide`): the solid brand fill, used as the full-bleed primary button background, always with chalk text (never ink).
- **Oxide on light** (`oxide-on-light`): text, links, hover states, rules and the logo dot on paper and chalk. Resolves to `--color-oxide` in light mode.
- **Oxide on dark** (`oxide-on-dark`): the same role inside a dark section. Resolves to `--color-oxide` under `data-mode="dark"`.

### Secondary (status, never brand)
- **Transit** (`transit`), **Transit on light** (`transit-on-light`), **Transit on dark** (`transit-on-dark`): in-transit / active state. Also the global focus-ring hue and the input focus border.
- **Delivered** (`delivered`), **Delivered on light** (`delivered-on-light`), **Delivered on dark** (`delivered-on-dark`): cleared / delivered state. `delivered` also exists as a solid fill token.
- **Exception** (`exception`), **Exception on dark** (`exception-on-dark`): error, validation failure, customs hold. Light mode needs no darkened variant. Exposed as `--color-danger`.

### Neutral
- **Ink** (`ink`), **Steel** (`steel`), **Graphite** (`graphite`): dark-mode background, surface and hairline border.
- **Mist** (`mist`), **Mist on dark** (`mist-on-dark`): muted text in light and dark mode respectively.
- **Fog** (`fog`): light-mode hairline border.
- **Paper** (`paper`), **Chalk** (`chalk`): light background and light card surface; paper is also the foreground in dark mode.

### Mode mapping (modes.css)
| Semantic token | Light (`:root`, default) | Dark (`[data-mode="dark"]`) |
|---|---|---|
| `--color-background` | paper | ink |
| `--color-surface` | chalk | steel |
| `--color-foreground` | ink | paper |
| `--color-muted` | mist | mist-on-dark |
| `--color-border` | fog | graphite |
| `--color-oxide` | oxide-on-light | oxide-on-dark |
| `--color-transit` | transit-on-light | transit-on-dark |
| `--color-delivered` | delivered-on-light | delivered-on-dark |
| `--color-danger` | exception | exception-on-dark |
| `--color-{oxide,transit,delivered,danger}-soft` | 14% of the solid hue mixed into surface | 16% of the solid hue mixed into surface |

Static utilities that never flip: `ink`, `steel`, `paper`, `chalk`, `mist`, `oxide-solid` (oxide), `delivered-solid` (delivered). The Tailwind default palette is wiped, so only these names exist.

### Named Rules
**The Token-Only Rule.** In code, hex values live only in palette.css. Components use semantic utilities (`bg-surface`, `text-muted`, `text-oxide`) and never a literal color.

**The Two-Family Rule.** Oxide is brand and never a status; transit, delivered and exception are status and never a brand, CTA or navigation accent. The one non-status job of transit is the focus ring.

**The Paired-Shade Rule.** Text, icons, dots and rules use the accent's `-on-light` / `-on-dark` shade through the semantic token; solid fills use the solid hue. Oxide solid takes chalk text, not ink.

**The Soft-Wash Rule.** Badge and highlight backgrounds use the `-soft` tokens paired with their matching text token. `danger-soft` is a fill for an icon or inline alert rule, not a background for body-sized error text.

## Typography

**Display Font:** Archivo (variable, wght 100-900, wdth 62-125%; fallback `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** IBM Plex Sans (400, 500, 600; same fallbacks)
**Label/Mono Font:** IBM Plex Mono (400, 500; fallback `ui-monospace, "SFMono-Regular", monospace`)

All three load locally through `next/font/local` from `@fontsource` packages (`--font-archivo`, `--font-plex-sans`, `--font-plex-mono`), exposed as `font-display`, `font-sans`, `font-mono`.

**Character:** Headings get their contrast from an extended width axis and slightly tightened tracking rather than a second neutral sans. Data reads in Plex Mono with tabular numerals so columns of references line up.

### Hierarchy
The scale is approved and fixed; sizes and line-heights are exactly the `--text-*` tokens.
- **Display / `text-4xl`** (600, 3rem, 1.05): hero display (homepage h1).
- **Headline large / `text-3xl`** (600, 2.25rem, 1.15): hero subheads; DarkCtaBand heading from `sm` up.
- **Headline / `text-2xl`** (600, 1.75rem, 1.25): page and section headings.
- **Title large / `text-xl`** (1.375rem, 1.35): section headings.
- **Title / `text-lg`** (600, 1.125rem, 1.5): card titles, lead paragraphs.
- **Body / `text-base`** (400, 0.9375rem, 1.6): default body copy; set on `body`.
- **Label / `text-sm`** (500, 0.8125rem, 1.45): form labels, secondary UI text, button text (md), nav links.
- **Caption / `text-xs`** (0.75rem, 1.4): timestamps, meta, table captions, button text (sm), badges.
- **Data** (Plex Mono, `code, kbd, samp, pre` get `font-variant-numeric: tabular-nums`): reference numbers, coordinates, timestamps, stat figures.

`h1`, `h2`, `h3` are styled once in reset/base: Archivo, `font-variation-settings: "wdth" 112`, weight 600, letter-spacing -0.015em, inside `@layer base` so a utility can opt out.

### Named Rules
**The Approved-Type Rule.** Typefaces and the type scale are approved. Do not add, swap or resize them.

**The Width-Not-Family Rule.** Display contrast comes from Archivo's width axis (wdth 112) and tracking, never from introducing another display face.

## Layout

Contained content column of `max-w-6xl` centered with `px-comfortable`, with full-bleed bands (header, StatBand borders, dark hero, DarkCtaBand) whose inner content stays container-width. Vertical rhythm uses the named spacing tokens: `expansive` (64px) between page sections and as band padding, `loose` (40px) inside sections, `comfortable` (24px) for card padding and section gaps, `cozy` (16px) for control padding and grid gaps, `snug` (10px) for dense controls, `tight` (6px) for icon-to-label gaps, `hairline` (1px) for dividers. Grids collapse from three columns (`lg`) to two (`sm`) to one; StatBand goes from two to four columns at `sm`; the header switches to a mobile menu below `md`, and its main bar may wrap onto two lines below `md` (see Navigation). Body text blocks cap with `max-w-lg` / `max-w-xl`.

## Elevation & Depth

Hybrid, tonal first. Light surfaces step from paper to chalk with a `fog` hairline border; shadow is a soft reinforcement on raised elements. In dark mode the cast shadow is replaced by a faint paper-colored glow, since a dark cast is invisible against ink and steel. Shadows are derived with `color-mix` from palette tokens.

### Shadow Vocabulary
- **sm** (light: `0 1px 2px color-mix(in srgb, var(--palette-ink) 6%, transparent)`): cards, primary button, ManifestStrip. Dark swaps ink for paper at the same percentages.
- **md** (light: `0 6px 16px color-mix(in srgb, var(--palette-ink) 10%, transparent), 0 1px 2px color-mix(in srgb, var(--palette-ink) 6%, transparent)`): defined for mid-level raised surfaces.
- **lg** (light: `0 16px 40px color-mix(in srgb, var(--palette-ink) 16%, transparent), 0 2px 6px color-mix(in srgb, var(--palette-ink) 8%, transparent)`): dropdown and search popovers. Dark swaps ink for paper at the same percentages.

### Named Rules
**The Glow-In-Dark Rule.** Inside `data-mode="dark"`, elevation is a light glow from the paper token, never a dark cast.

**The Derived-Shadow Rule.** Shadow color is always `color-mix` from a palette token, never a literal rgba.

## Shapes

Softly rounded, hairline-bordered forms. Radius scale: `sm` 0.375rem (inputs, small buttons, nav links, focus ring), `md` 0.625rem (buttons, service and industry cards, image crops), `lg` 1rem (Card, panels, dropdowns, tables, ManifestStrip), `full` 999px (badges, status dots, skeleton bars). Borders are 1px `--color-border`; hover on cards shifts the border to `mist` (or `oxide` on homepage industry cards). Images sit in `aspect-video` crops with `object-cover`.

## Components

### Buttons
- **Shape:** medium radius (`md`, 0.625rem) at size md, small radius (`sm`) at size sm.
- **Primary:** `oxide-solid` fill, chalk text, `shadow-sm`, height 2.5rem (md, `px-comfortable`) or 2rem (sm, `px-cozy`). One per view. Hover `brightness-105`.
- **Secondary:** chalk surface fill, 1px border, foreground text; hover border shifts to mist.
- **Ghost:** transparent, foreground text; hover fills with surface.
- **Motion:** transitions on background, color, border, shadow and transform over `duration-base` with `ease-standard`; press scales to 0.98; disabled drops to 50% opacity.
- **Focus:** global 2px transit outline with 2px offset.

### Cards / Containers
- **Corner Style:** `lg` (1rem).
- **Background:** `--color-surface`, 1px border, `shadow-sm`, `p-comfortable`.
- **Hover:** border color transition over `duration-base`.

### Inputs / Fields
- **Style:** 2.5rem tall, `sm` radius, 1px border, surface fill, `px-cozy`, label above (label style, 6px gap).
- **Focus:** border shifts to transit (plus the global outline).
- **Error:** border and message in `danger`; required marker in `danger`.

### Badges
Pill (`full`) with 1px border at 30% of the state hue, `-soft` fill and matching text, plus a 6px status dot. Variants map to real states: in-transit, cleared, neutral (transparent, border and muted text).

### Logo (signature)
The mark is the word MERIDIAN in extended Archivo letterforms, converted to outlines, closed by one oxide dot that sits on the baseline. It is a token-only component (`Logo`, exported from `@freight/ui`) that draws SVG paths: the wordmark takes `currentColor` and the dot takes `fill-oxide`, so both follow the surrounding text color and the nearest `data-mode`. The dot is on-light oxide (`#a34a22`) in a light section and on-dark oxide (`#e08a5a`) inside a dark wrapper. The path data is generated from the exported SVGs and is never edited by hand.

Three variants, sized only by a height class (the viewBox is tight, so width follows):
- **Compact:** MERIDIAN and the dot. About 148px wide at 0.9rem tall. Used in the Header below `lg`, and in the shared AppShell of portal and admin at every width.
- **Header:** MERIDIAN and FREIGHT on one line, FREIGHT in a lighter, wider-set cut, with the dot closing the line. About 268px wide at 0.9rem tall. Used in the Header from `lg`, and in the Footer at 0.75rem tall.
- **Primary:** a stacked lockup: MERIDIAN, a 2-unit rule at 55% opacity that carries the dot, then FREIGHT beneath. Exported as a file only; no page renders it yet.

At 0.9rem the cap height is about 14px. The SVG is decorative (`aria-hidden`): the home link around it carries the accessible name "Meridian Freight". In the Footer there is no link, and the copyright line names the company.

Exported files carry literal hex copied from palette.css because a file cannot read CSS variables (a recorded exception to the Token-Only Rule): lockups in `public/brand` (primary on light and dark plus ink and paper monochrome, header and compact on light and dark), and per app an `icon.svg` (paper M and oxide dot on an ink rounded tile), `favicon.ico` and `apple-icon.png`. Web also carries a 1200 by 630 `opengraph-image.jpg` with alt text.

**The Currentcolor-Plus-Oxide Rule.** Render the brand only through `Logo`, with the wordmark in `currentColor` and the dot in `fill-oxide`. Do not set the brand in live text, pass any other fill or a literal color, or edit the path data. Check: `Logo.tsx` contains no hex, rgb or hsl value, and the only fill class in it is `fill-oxide`.

**The Decorative-Mark Rule.** Keep every `Logo` `aria-hidden`, and give the link around it an accessible name (`aria-label="Meridian Freight"`). Where no link wraps it, as in the Footer, the adjacent text must name the company. Do not label the SVG itself, and do not ship a logo-only link with no name. Check: every `<Logo` sits inside an element with an `aria-label` or beside text naming the company.

### Navigation (Header)
Surface-colored bar with a hairline bottom border. A utility bar (caption size, muted, from `md`) sits above a main bar with the logo (compact below `lg`, header lockup from `lg`, inside a home link named "Meridian Freight"), the primary nav (label size, hover to oxide, from `md`), dropdown panels (`lg` radius, `shadow-lg`), and one contextual primary CTA button (sm). Below `md` the nav becomes a full-screen background-colored menu with a focus trap, and the track, search and menu buttons sit beside the CTA.

The main bar wraps below `md` and never from `md` up. The logo is a fixed-width drawing and cannot wrap like text, so when it and the actions cluster no longer fit on one line (under about 447px) the logo keeps the first line and the actions cluster moves to a second line, right-aligned.

### Table
Bordered `lg`-radius region, surface header with caption-size uppercase muted column labels, hairline row dividers, `hover:bg-border/10` rows. Data columns render in Plex Mono. Loading uses skeleton bars (`full` radius); edge fades hint at horizontal scroll.

### StatBand
Full-bleed `border-y` row on the background color; 2 to 4 columns with hairline dividers; figures in Plex Mono 600 (`text-3xl`, `text-4xl` from `sm`).

### ManifestStrip (signature)
A Card-like panel (`lg`, border, `shadow-sm`) styled as a tracking feed: mono references, coordinates and timestamps; status dots in transit / delivered / muted / danger; oxide live dot. Rows fade and translate 6px as they enter and leave.

### LaneTicker (signature)
A hairline-topped strip of mono lane pairs (caption size, uppercase, muted), content rendered twice for a seamless -50% loop.

### DarkCtaBand
A `data-mode="dark"` band on the background token: `py-expansive`, Archivo heading (`text-2xl`, `text-3xl` from `sm`), primary plus secondary button, muted mono meta line.

### Textarea
Sibling of Input: label above (label style, 6px gap, required marker in `danger`), minimum height 8rem, `sm` radius, 1px border, surface fill, `px-cozy` and `py-snug`, placeholder in muted. Focus shifts the border to transit; the error state turns the border `danger` and shows a caption-size `danger` message announced as an alert. Transitions run over `duration-base` with `ease-standard`.

### Footer
A surface-colored band with a hairline top border, holding a contained `max-w-6xl` column (`px-comfortable`, `py-loose`, `gap-loose`) with one Company link column and a bottom bar. The column heading is caption size, semibold, uppercase, tracked and muted; links are label size in the foreground color and hover to oxide over `duration-base`. The bottom bar sits under a hairline: the header lockup of the logo at 0.75rem tall and the copyright in Plex Mono at caption size, muted. It stacks below `sm` and sits on one row from `sm`.

### LogoStrip
A labelled row of placeholder logotypes in a two-column grid that becomes four columns from `sm` (`gap-x-comfortable`, `gap-y-loose`). Each mark is a 36px-tall inline SVG: one of six geometric glyphs (chevron, hex, bar, ring, arc, slash) plus the name as real SVG text in Archivo, set at that brand's own width, weight and tracking. A strip carries one accent and nothing else colors it: customers resolve to `oxide`, integrations to `transit`. On hover-capable pointers the marks rest in `mist` and take the accent on hover or focus-within; coarse pointers get the accent immediately. The names are invented placeholders, and each strip says so in a visually hidden line.

### Detail page template (service and industry pages)
A `max-w-6xl` column with `expansive` (64px) between four blocks.
- **Hero:** two columns from `lg` (`gap-loose`). One side has a neutral Badge, an Archivo display headline (`text-4xl`) and a muted intro capped at `max-w-lg`. The other is a `lg`-radius bordered panel on the surface color, optionally topped by a full-bleed 16:9 image cropped to the panel's top corners, then a monogram tile (3rem, `md` radius, Plex Mono), the name in Archivo, a caption-size tagline and a hairline-separated checklist.
- **Value proposition:** a `lg`-radius bordered surface block (`p-comfortable`, `p-expansive` from `lg`) with a heading and a two-column grid of small Archivo titles over muted body text.
- **Key benefits:** a grid of Cards (one column, two from `sm`, three from `lg`), each with a 2.5rem monogram tile.
- **Closing block:** a `lg`-radius block on the background color with a 50% border, a heading, and a primary plus secondary button.

### Imagery
Photographs are decorative (empty alt text), cropped with `object-cover` inside a fixed frame, and served from `apps/web/public/images/` (`hero.jpg`, `services/`, `industries/`) as AVIF or WebP.
- **Hero image with overlay:** the homepage hero (a `data-mode="dark"` section) sits on a full-bleed photograph behind its grid and ticker, preloaded and cropped with `object-cover`. Below `lg` a flat `background` overlay at 90% keeps the full-width text legible. From `lg`, where the text sits on the left, the overlay becomes a left-to-right gradient from `background` through `background` at 90% to `background` at 30%, so the photograph opens up toward the tracking panel.
- **Ticker backing strip:** the lane ticker inside the hero is backed by `background` at 85%, so its mono lane text reads over the photograph while the image still shows faintly through.
- **Service cards (wallet stack):** horizontal cards, one per row, each `position: sticky` with `top` at 10vh plus 40px per card and a rising z-index, so later cards overlap earlier ones. Below `md` a card stacks with a 16:9 image on top; from `md` it is a row with the image filling the left 40%, cropped to the card's rounded corners, and a minimum height of 14rem. `md` radius, 1px border. The first card is the highlight: `oxide-soft` fill with an oxide 30% border. The others sit on the surface color and hover to a `mist` border.
- **Industry cards:** `md`-radius bordered surface cards in a grid (one column, two from `sm`, three from `lg`, `gap-cozy`), each opening with a 16:9 image (`md` radius, clipped) above an Archivo title and muted description. Hover lifts the card 2px and turns the border oxide.
- **ContentCard with image:** a Card (`lg`) whose first element is a 16:9 image clipped to `md`, then an Archivo `text-lg` title and a muted description. Hover shifts the border to `mist`. Without an image it falls back to a 2.5rem monogram tile (Plex Mono, `md` radius, hairline border).

### Motion
- **Easing and durations:** `ease-standard` `cubic-bezier(0.2, 0, 0, 1)` (precise settle, no overshoot); `duration-fast` 120ms (press); `duration-base` 180ms (hover and focus).
- **pulse-dot:** `2.6s ease-in-out infinite`, opacity 1 to 0.55 and scale 1 to 0.82. Used on live dots in ManifestStrip.
- **skeleton-shimmer:** `1.6s ease-in-out infinite` sweep over `--color-border`. Used in Table.
- **Reduced motion, CSS level:** reset.css sets `animation-duration` and `transition-duration` to 0.01ms, iteration count to 1 and `scroll-behavior: auto` under `prefers-reduced-motion: reduce`. The lane ticker is gated in CSS by `@media (prefers-reduced-motion: no-preference)` and `@supports (animation-timeline: scroll())`, because the blanket override cannot stop a scroll-bound animation; otherwise it renders as a static strip.
- **Scroll reveal (`.reveal`):** the `reveal-up` keyframes fade a block in from opacity 0 and 1rem (`spacing-cozy`) below its resting place. The animation is bound to scroll position, not a timer: `animation-timeline: view()` over `animation-range: entry 0% entry 4rem` (the first `spacing-expansive` of scroll after the block's leading edge enters the viewport), with `ease-standard` as the timing function. The fill is `backwards`, not `both`, so once the range ends the block returns to its natural style; `both` would leave an identity `transform` on every revealed block, which is still a stacking context and a containing block. The timeline is scroll position, so the reveal runs in reverse when the visitor scrolls back up.
- **Reveal gating:** the whole rule sits inside `@media screen and (prefers-reduced-motion: no-preference)` and `@supports (animation-timeline: view())`. Reduced-motion visitors, browsers without scroll timelines (Firefox stable) and print output (the `screen` media type keeps print from inheriting the hidden state) all see the content untouched. `animation-timeline` ships in Chromium 115+ and Safari 26+, per the note in theme.css.
- **Reveal placement:** used only on the homepage, below the hero: the "01 — Services" and "02 — Industries" heading rows, each industry card, the "Integrates with" LogoStrip and the certifications block. It is never used on anything already in view at load or on any ancestor of a sticky element, which is why the wallet stack of service cards is not revealed.
- **Reduced motion, component-level JS guards:** pulse-dot and skeleton-shimmer rely on a JS `prefers-reduced-motion` check in ManifestStrip and Table (flat `--color-border` fill for the skeleton, static dots), per theme.css's own comments. ManifestStrip also stops its interval row insertion under reduced motion.

## Do's and Don'ts

### Do:
- **Do** use semantic color utilities only, and pair accent text with the semantic token so it resolves to the `-on-light` or `-on-dark` shade for the active mode.
- **Do** put dark sections in a nested `data-mode="dark"` wrapper on the background token; keep the page itself light.
- **Do** keep oxide as the primary-action fill (with chalk text), and use transit, delivered and exception only for shipment state.
- **Do** use Archivo (wdth 112, 600, -0.015em) for h1-h3, Plex Sans for UI text, Plex Mono with tabular figures for references, coordinates and timestamps.
- **Do** use the named spacing and radius tokens and the `--shadow-*` tokens.
- **Do** transition with `ease-standard` over `duration-base` or `duration-fast`, and provide a reduced-motion path for every animation.
- **Do** put `.reveal` only on blocks that start below the fold, and keep it off any ancestor of a sticky element.
- **Do** render the brand through the `Logo` component (compact below `lg` in the Header, header lockup from `lg` and in the Footer), and give the link around it the accessible name.

### Don't:
- **Don't** write a hex or rgba value outside palette.css, or use a Tailwind default color.
- **Don't** use `dark:` variants or paint ink/steel as an apps/web page background.
- **Don't** use oxide for status, or a status hue for brand, CTA or navigation.
- **Don't** pair oxide solid with ink text.
- **Don't** add or swap typefaces, or change the approved type scale.
- **Don't** use bounce or elastic easing, or an animation with no reduced-motion path.
- **Don't** put `.reveal` on anything already in view at load or on an ancestor of a sticky element such as the wallet stack.
- **Don't** set the brand in live text, recolor the logo with a literal color, or edit its path data.
- **Don't** use a dark cast shadow inside a dark section.
