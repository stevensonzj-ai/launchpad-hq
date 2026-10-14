import { PLACEMENTS } from "./placements";
import type { SponsorPlacement, SponsorSlot } from "./types";

export type { SponsorPlacement, SponsorSlot } from "./types";
export { PLACEMENTS } from "./placements";
export { SPONSOR_SLOTS } from "./types";

const CHICAGO = "America/Chicago";

/** Calendar date (YYYY-MM-DD) for `date` in America/Chicago. */
export function chicagoCalendarDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CHICAGO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  if (!year || !month || !day) {
    throw new Error("Could not format America/Chicago calendar date");
  }
  return `${year}-${month}-${day}`;
}

function isActiveOn(placement: SponsorPlacement, ymd: string): boolean {
  return placement.startDate <= ymd && ymd <= placement.endDate;
}

export function getActivePlacement(
  slot: SponsorSlot,
  date: Date = new Date(),
  categorySlug?: string,
  source: readonly SponsorPlacement[] = PLACEMENTS,
): SponsorPlacement | null {
  const ymd = chicagoCalendarDate(date);
  const match = source.find((placement) => {
    if (placement.slot !== slot) return false;
    if (!isActiveOn(placement, ymd)) return false;
    if (slot === "discover") {
      return Boolean(categorySlug) && placement.categorySlug === categorySlug;
    }
    return true;
  });
  return match ?? null;
}

export function listAiOfTheWeekArchive(
  date: Date = new Date(),
  source: readonly SponsorPlacement[] = PLACEMENTS,
): SponsorPlacement[] {
  const ymd = chicagoCalendarDate(date);
  return source
    .filter(
      (placement) =>
        placement.slot === "ai-of-the-week" && placement.endDate < ymd,
    )
    .sort((a, b) => b.endDate.localeCompare(a.endDate));
}
