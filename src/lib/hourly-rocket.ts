export const HOURLY_ROCKET_STORAGE_KEY = "lp-hourly-rocket-chicago";

/** Shared duration for hourly, ?rocket=1, and ?rocket=demo flights. */
export const HOURLY_ROCKET_FLIGHT_MS = 6500;
export const HOURLY_ROCKET_CRAFT = { width: 56, height: 80 };

export type RocketPoint = { x: number; y: number };
export type RocketTourOffsets = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
};

/**
 * Viewport-relative cruise waypoints as offsets from the header home.
 * Clamped so the craft stays fully inside the overlay.
 */
export function rocketTourOffsets(
  home: RocketPoint,
  viewport: { width: number; height: number },
  craft = HOURLY_ROCKET_CRAFT,
): RocketTourOffsets {
  const pad = Math.max(craft.width, craft.height) / 2 + 10;
  const clampOffset = (absX: number, absY: number): RocketPoint => ({
    x: Math.min(viewport.width - pad, Math.max(pad, absX)) - home.x,
    y: Math.min(viewport.height - pad, Math.max(pad, absY)) - home.y,
  });
  const a = clampOffset(viewport.width * 0.82, viewport.height * 0.2);
  const b = clampOffset(viewport.width * 0.18, viewport.height * 0.74);
  const c = clampOffset(viewport.width * 0.7, viewport.height * 0.16);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y, x3: c.x, y3: c.y };
}

/** Upright hover point above the landing pad, still inside the viewport. */
export function rocketHoverOffset(
  home: RocketPoint,
  land: RocketPoint,
  viewport: { width: number; height: number },
  craft = HOURLY_ROCKET_CRAFT,
): RocketPoint {
  const pad = Math.max(craft.width, craft.height) / 2 + 10;
  const absX = Math.min(viewport.width - pad, Math.max(pad, home.x + land.x));
  const absY = Math.min(
    viewport.height - pad,
    Math.max(pad, home.y + land.y - 112),
  );
  return { x: absX - home.x, y: absY - home.y };
}

const CHICAGO = "America/Chicago";

export type ChicagoClockParts = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
};

export function chicagoClockParts(date: Date): ChicagoClockParts {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CHICAGO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;
  const year = read("year");
  const month = read("month");
  const day = read("day");
  const hour = read("hour");
  const minute = read("minute");
  const second = read("second");
  if (!year || !month || !day || !hour || !minute || !second) {
    throw new Error("Could not format America/Chicago clock parts");
  }
  return { year, month, day, hour, minute, second };
}

/** Stable key for one clock-hour in US Central. */
export function chicagoHourKey(date: Date): string {
  const parts = chicagoClockParts(date);
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}`;
}

/** True during the first `windowSeconds` of a US Central hour. */
export function isChicagoTopOfHour(date: Date, windowSeconds = 10): boolean {
  const parts = chicagoClockParts(date);
  return Number(parts.minute) === 0 && Number(parts.second) < windowSeconds;
}

export function shouldLaunchHourlyRocket(
  now: Date,
  lastPlayedHourKey: string | null,
  windowSeconds = 10,
): boolean {
  if (!isChicagoTopOfHour(now, windowSeconds)) return false;
  return lastPlayedHourKey !== chicagoHourKey(now);
}

function rocketQueryValue(search: string): string | null {
  const query = search.startsWith("?") ? search.slice(1) : search;
  return new URLSearchParams(query).get("rocket");
}

/** True only for the exact preview query `rocket=1`. */
export function isRocketPreview(search: string): boolean {
  return rocketQueryValue(search) === "1";
}

/** True only for the exact demo query `rocket=demo`. */
export function isRocketDemo(search: string): boolean {
  return rocketQueryValue(search) === "demo";
}

export type HourlyRocketDecision = {
  launch: boolean;
  persistHourKey: boolean;
};

/**
 * `?rocket=1` and `?rocket=demo` launch immediately and never write the hourly key.
 * With neither param, production gating is unchanged.
 */
export function decideHourlyRocketLaunch(input: {
  now: Date;
  lastPlayedHourKey: string | null;
  search: string;
  windowSeconds?: number;
}): HourlyRocketDecision {
  if (isRocketPreview(input.search) || isRocketDemo(input.search)) {
    return { launch: true, persistHourKey: false };
  }
  const launch = shouldLaunchHourlyRocket(
    input.now,
    input.lastPlayedHourKey,
    input.windowSeconds,
  );
  return { launch, persistHourKey: launch };
}

export function readLastPlayedHourKey(
  storage: Pick<Storage, "getItem"> | null | undefined,
): string | null {
  if (!storage) return null;
  try {
    return storage.getItem(HOURLY_ROCKET_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeLastPlayedHourKey(
  storage: Pick<Storage, "setItem"> | null | undefined,
  hourKey: string,
): void {
  if (!storage) return;
  try {
    storage.setItem(HOURLY_ROCKET_STORAGE_KEY, hourKey);
  } catch {
    // Private mode / quota — skip persistence rather than throw.
  }
}
