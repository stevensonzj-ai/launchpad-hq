export const HOURLY_ROCKET_STORAGE_KEY = "lp-hourly-rocket-chicago";

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

/** True only for the exact preview query `rocket=1`. */
export function isRocketPreview(search: string): boolean {
  const query = search.startsWith("?") ? search.slice(1) : search;
  return new URLSearchParams(query).get("rocket") === "1";
}

export type HourlyRocketDecision = {
  launch: boolean;
  persistHourKey: boolean;
};

/**
 * Preview (`?rocket=1`) launches immediately and never writes the hourly key.
 * With no preview param, production gating is unchanged.
 */
export function decideHourlyRocketLaunch(input: {
  now: Date;
  lastPlayedHourKey: string | null;
  search: string;
  windowSeconds?: number;
}): HourlyRocketDecision {
  if (isRocketPreview(input.search)) {
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
