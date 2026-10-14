export const SPONSOR_SLOT_KEYS = ["discover-spotlight", "ai-of-the-week"] as const;
export type SponsorCalendarSlot = (typeof SPONSOR_SLOT_KEYS)[number];

export type SlotAvailability = "open" | "booked";

export type SponsorCalendarWeek = {
  /** Monday of the week in America/Chicago, YYYY-MM-DD. */
  weekStart: string;
  slots: Record<SponsorCalendarSlot, SlotAvailability>;
};

function week(
  weekStart: string,
  discover: SlotAvailability = "open",
  aiOfTheWeek: SlotAvailability = "open",
): SponsorCalendarWeek {
  return {
    weekStart,
    slots: {
      "discover-spotlight": discover,
      "ai-of-the-week": aiOfTheWeek,
    },
  };
}

/**
 * Static weekly inventory. Weeks start Monday, US Central Time.
 * Edit this list to mark slots booked; nothing writes to a database.
 */
export const SPONSOR_CALENDAR: readonly SponsorCalendarWeek[] = [
  week("2026-10-19"),
  week("2026-10-26"),
  week("2026-11-02"),
  week("2026-11-09"),
  week("2026-11-16"),
  week("2026-11-23"),
  week("2026-11-30"),
  week("2026-12-07"),
];

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
