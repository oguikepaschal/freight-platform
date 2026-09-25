import { cx } from "./cx";

/**
 * A small stack of rows styled like a shipment-tracking manifest, labelled
 * as sample data. Not wired to any real Shipments data.
 *
 * Deliberately static: no pulsing dots, no rows cycling in, no running
 * count. Public tracking has no live carrier or port feed behind it
 * (PRODUCT.md, Operating Context), so anything that reads as "live" here
 * would imply one. A fixed set of rows also renders identically on the
 * server and the client, so the panel is complete on first paint.
 */
export interface ManifestStripProps {
  /** Rows shown, from the top of the sample set. @default 5 */
  maxRows?: number;
  className?: string;
}

type Status = "in-transit" | "cleared" | "delivered" | "loading" | "booked" | "customs-hold";

interface ManifestRow {
  reference: string;
  coordinateLabel: string;
  timeLabel: string;
  status: Status;
}

/**
 * Real major port coordinates, so a row reads as internally coherent: the
 * reference's country suffix matches its location (an NL suffix pairs with
 * Rotterdam). Times are UTC time of day only, so the sample never shows a
 * stale date.
 */
const SAMPLE_ROWS: ManifestRow[] = [
  { reference: "FR-48213-NL", coordinateLabel: "51.92°N 4.48°E", timeLabel: "14:02Z", status: "in-transit" }, // Rotterdam
  { reference: "FR-71590-SG", coordinateLabel: "1.26°N 103.84°E", timeLabel: "13:47Z", status: "cleared" }, // Singapore
  { reference: "FR-30674-US", coordinateLabel: "33.74°N 118.26°W", timeLabel: "12:15Z", status: "delivered" }, // Los Angeles
  { reference: "FR-66128-DE", coordinateLabel: "53.55°N 9.97°E", timeLabel: "10:38Z", status: "customs-hold" }, // Hamburg
  { reference: "FR-25907-KR", coordinateLabel: "35.10°N 129.04°E", timeLabel: "09:21Z", status: "loading" }, // Busan
  { reference: "FR-83342-AE", coordinateLabel: "25.01°N 55.06°E", timeLabel: "07:54Z", status: "booked" }, // Jebel Ali
];

const statusStyles: Record<Status, { dot: string; text: string; label: string }> = {
  "in-transit": { dot: "bg-transit", text: "text-transit", label: "In transit" },
  cleared: { dot: "bg-delivered", text: "text-delivered", label: "Cleared" },
  // Delivered reuses the same token as cleared — it's the same "done"
  // family, just a later milestone, not a distinct accent.
  delivered: { dot: "bg-delivered", text: "text-delivered", label: "Delivered" },
  // Loading has no natural home in the palette (neutrals, oxide, and the
  // transit/delivered/exception statuses) — it borrows the neutral muted
  // token rather than introduce a new hue outside the design system.
  loading: { dot: "bg-muted", text: "text-muted", label: "Loading" },
  booked: { dot: "bg-muted", text: "text-muted", label: "Booked" },
  // The one status with a real exception state — reuses the existing
  // danger token rather than a new hue.
  "customs-hold": { dot: "bg-danger", text: "text-danger", label: "Customs hold" },
};

export function ManifestStrip({ maxRows = 5, className }: ManifestStripProps) {
  return (
    <div className={cx("rounded-lg border border-border bg-surface shadow-sm", className)}>
      <div className="flex items-center justify-between gap-cozy border-b border-border px-snug py-snug">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-foreground">
          Sample manifest
        </span>
        <span className="font-mono text-xs uppercase tracking-wide text-foreground">
          Illustrative data
        </span>
      </div>

      <span className="sr-only">Sample shipment manifest (illustrative data, not a live feed)</span>
      <div aria-hidden="true" className="divide-y divide-border">
        {SAMPLE_ROWS.slice(0, maxRows).map((row) => {
          const status = statusStyles[row.status];
          return (
            <div key={row.reference} className="flex items-center gap-tight px-snug py-snug">
              <div className="flex shrink-0 items-center gap-tight">
                <span className={cx("size-1.5 shrink-0 rounded-full", status.dot)} />
                <span className={cx("font-sans text-xs font-medium whitespace-nowrap", status.text)}>
                  {status.label}
                </span>
              </div>
              <span className="shrink-0 font-mono text-xs font-medium text-foreground">
                {row.reference}
              </span>
              <span className="hidden flex-1 truncate font-mono text-xs text-muted sm:block">
                {row.coordinateLabel}
              </span>
              <span className="ml-auto shrink-0 font-mono text-xs text-muted">{row.timeLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
