import { chicagoCalendarDate, PLACEMENTS } from "./index";
import type { SponsorPlacement, SponsorSlot } from "./types";

export const SPONSOR_SLOT_KEYS = ["discover-spotlight", "ai-of-the-week"] as const;
export type SponsorCalendarSlot = (typeof SPONSOR_SLOT_KEYS)[number];

export type SlotAvailability = "open" | "booked";

export type SponsorCalendarWeek = {
  /** Monday of the week in America/Chicago, YYYY-MM-DD. */
  weekStart: string;
  slots: Record<SponsorCalendarSlot, SlotAvailability>;
};

const SLOT_TO_PLACEMENT: Record<SponsorCalendarSlot, SponsorSlot> = {
  "discover-spotlight": "discover",
  "ai-of-the-week": "ai-of-the-week",
};

const SLOT_LABEL: Record<SponsorCalendarSlot, string> = {
  "discover-spotlight": "Discover Spotlight",
  "ai-of-the-week": "AI of the Week",
};

export function slotLabel(slot: SponsorCalendarSlot): string {
  return SLOT_LABEL[slot];
}

/** Inclusive Mon–Sun label in US Central Time. */
export function formatWeekRange(weekStart: string): string {
  const [y, m, d] = weekStart.split("-").map(Number);
  const start = new Date(Date.UTC(y, m - 1, d));
  const end = new Date(Date.UTC(y, m - 1, d + 6));
  const startFmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(start);
  const endFmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(end);
  return `${startFmt} – ${endFmt}`;
}

function addUtcDays(ymd: string, days: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Monday on or before `ymd` (YYYY-MM-DD treated as a calendar date). */
export function mondayOnOrBefore(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const weekday = date.getUTCDay(); // 0 Sun … 6 Sat
  const delta = weekday === 0 ? -6 : 1 - weekday;
  return addUtcDays(ymd, delta);
}

function weekOverlapsPlacement(weekStart: string, placement: SponsorPlacement): boolean {
  const weekEnd = addUtcDays(weekStart, 6);
  return placement.startDate <= weekEnd && weekStart <= placement.endDate;
}

function availabilityForSlot(
  weekStart: string,
  slot: SponsorCalendarSlot,
  placements: readonly SponsorPlacement[],
): SlotAvailability {
  const placementSlot = SLOT_TO_PLACEMENT[slot];
  return placements.some(
    (placement) =>
      placement.slot === placementSlot && weekOverlapsPlacement(weekStart, placement),
  )
    ? "booked"
    : "open";
}

/**
 * Upcoming inventory derived from `PLACEMENTS`. Weeks start Monday, US Central.
 * Do not hand-edit booked/open here — add or remove rows in placements.ts.
 */
export function getSponsorCalendar(
  date: Date = new Date(),
  placements: readonly SponsorPlacement[] = PLACEMENTS,
  weekCount = 8,
): SponsorCalendarWeek[] {
  let weekStart = mondayOnOrBefore(chicagoCalendarDate(date));
  const weeks: SponsorCalendarWeek[] = [];
  for (let i = 0; i < weekCount; i++) {
    weeks.push({
      weekStart,
      slots: {
        "discover-spotlight": availabilityForSlot(weekStart, "discover-spotlight", placements),
        "ai-of-the-week": availabilityForSlot(weekStart, "ai-of-the-week", placements),
      },
    });
    weekStart = addUtcDays(weekStart, 7);
  }
  return weeks;
}

/** Compat snapshot for callers that still import a constant list. */
export const SPONSOR_CALENDAR: readonly SponsorCalendarWeek[] = getSponsorCalendar();
