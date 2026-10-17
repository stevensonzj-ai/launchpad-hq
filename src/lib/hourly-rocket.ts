export const HOURLY_ROCKET_STORAGE_KEY = "lp-hourly-rocket-chicago";

/** Shared duration for hourly, ?rocket=1, and ?rocket=demo flights. */
export const HOURLY_ROCKET_FLIGHT_MS = 6500;
export const HOURLY_ROCKET_CRAFT = { width: 56, height: 80 };

export type RocketPoint = { x: number; y: number };
export type RocketViewport = { width: number; height: number };

export type RocketStraightFlight = {
  takeoffX: number;
  takeoffY: number;
  hoverX: number;
  hoverY: number;
  landX: number;
  landY: number;
  /** CSS rotate (deg) so the nose follows takeoff → hover. */
  cruiseRotateDeg: number;
};

function craftPad(craft = HOURLY_ROCKET_CRAFT): number {
  return Math.max(craft.width, craft.height) / 2 + 10;
}

function clampAbs(
  abs: RocketPoint,
  viewport: RocketViewport,
  pad: number,
): RocketPoint {
  return {
    x: Math.min(viewport.width - pad, Math.max(pad, abs.x)),
    y: Math.min(viewport.height - pad, Math.max(pad, abs.y)),
  };
}

function dist(a: RocketPoint, b: RocketPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * One straight cruise: vertical takeoff, then a single vector to a hover
 * point directly above the pad. If that shot is short, the takeoff point is
 * pushed backward along the same vector (and hover is raised) so the line
 * still spans the viewport — no lateral waypoints.
 */
export function rocketStraightFlight(
  home: RocketPoint,
  land: RocketPoint,
  viewport: RocketViewport,
  craft = HOURLY_ROCKET_CRAFT,
): RocketStraightFlight {
  const pad = craftPad(craft);
  const landAbs = clampAbs({ x: home.x + land.x, y: home.y + land.y }, viewport, pad);
  let hoverAbs = clampAbs({ x: landAbs.x, y: landAbs.y - 112 }, viewport, pad);
  let takeoffAbs = clampAbs({ x: home.x, y: home.y - 72 }, viewport, pad);

  const minSpan = Math.max(160, Math.min(viewport.width, viewport.height) * 0.42);

  let dx = hoverAbs.x - takeoffAbs.x;
  let dy = hoverAbs.y - takeoffAbs.y;
  let length = Math.hypot(dx, dy);
  if (length < 1) {
    dx = 0;
    dy = -1;
    length = 1;
  }
  const ux = dx / length;
  const uy = dy / length;

  if (dist(takeoffAbs, hoverAbs) < minSpan) {
    const extra = minSpan - dist(takeoffAbs, hoverAbs);
    takeoffAbs = clampAbs(
      { x: takeoffAbs.x - ux * extra, y: takeoffAbs.y - uy * extra },
      viewport,
      pad,
    );
  }
  if (dist(takeoffAbs, hoverAbs) < minSpan) {
    const extra = minSpan - dist(takeoffAbs, hoverAbs);
    hoverAbs = clampAbs({ x: landAbs.x, y: hoverAbs.y - extra }, viewport, pad);
  }

  const cdx = hoverAbs.x - takeoffAbs.x;
  const cdy = hoverAbs.y - takeoffAbs.y;
  const cruiseRotateDeg = (Math.atan2(cdx, -cdy) * 180) / Math.PI;

  return {
    takeoffX: takeoffAbs.x - home.x,
    takeoffY: takeoffAbs.y - home.y,
    hoverX: hoverAbs.x - home.x,
    hoverY: hoverAbs.y - home.y,
    landX: landAbs.x - home.x,
    landY: landAbs.y - home.y,
    cruiseRotateDeg,
  };
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
