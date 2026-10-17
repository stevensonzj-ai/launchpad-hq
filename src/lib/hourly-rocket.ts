export const HOURLY_ROCKET_STORAGE_KEY = "lp-hourly-rocket-chicago";

/** Shared duration for hourly, ?rocket=1, and ?rocket=demo flights. */
export const HOURLY_ROCKET_FLIGHT_MS = 7500;
export const HOURLY_ROCKET_CRAFT = { width: 56, height: 80 };
export const HOURLY_ROCKET_LOOP_SAMPLES = 28;

export type RocketPoint = { x: number; y: number };
export type RocketViewport = { width: number; height: number };

export type RocketFlightFrame = {
  pct: number;
  x: number;
  y: number;
  rotate: number;
  scale?: number;
};

export type RocketLoopFlight = {
  frames: RocketFlightFrame[];
  loop: RocketPoint[];
  takeoff: RocketPoint;
  approach: RocketPoint;
  hover: RocketPoint;
  land: RocketPoint;
};

function craftPad(craft = HOURLY_ROCKET_CRAFT): number {
  return Math.max(craft.width, craft.height) / 2 + 8;
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

function headingDeg(dx: number, dy: number): number {
  return (Math.atan2(dx, -dy) * 180) / Math.PI;
}

function ellipsePoint(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  theta: number,
): RocketPoint {
  return { x: cx + rx * Math.cos(theta), y: cy + ry * Math.sin(theta) };
}

function ellipseHeading(rx: number, ry: number, theta: number, dTheta: number): number {
  const tx = -rx * Math.sin(theta) * Math.sign(dTheta || 1);
  const ty = ry * Math.cos(theta) * Math.sign(dTheta || 1);
  return headingDeg(tx, ty);
}

/**
 * Vertical takeoff, one viewport-scaled oval, rise/overshoot above the pad,
 * then a slow vertical landing. Coordinates are offsets from `home`.
 */
export function rocketLoopFlight(
  home: RocketPoint,
  land: RocketPoint,
  viewport: RocketViewport,
  craft = HOURLY_ROCKET_CRAFT,
): RocketLoopFlight {
  const pad = craftPad(craft);
  const landAbs = {
    x: Math.min(viewport.width - pad, Math.max(pad, home.x + land.x)),
    y: home.y + land.y,
  };
  const hoverAbs = clampAbs({ x: landAbs.x, y: landAbs.y - 150 }, viewport, 8);
  const takeoffAbs = clampAbs({ x: home.x, y: home.y - 72 }, viewport, 8);
  const approachAbs = clampAbs({ x: landAbs.x, y: landAbs.y + 70 }, viewport, pad);

  const cx = viewport.width / 2;
  const cy = viewport.height / 2;
  const rx = Math.max(36, viewport.width / 2 - pad - 16);
  const ry = Math.max(36, viewport.height / 2 - pad - 16);

  const entryTheta = Math.atan2((takeoffAbs.y - cy) / ry, (takeoffAbs.x - cx) / rx);
  const sweep = Math.PI * 2;

  const loopAbs: RocketPoint[] = [];
  const loopHeadings: number[] = [];
  for (let i = 0; i <= HOURLY_ROCKET_LOOP_SAMPLES; i++) {
    const t = i / HOURLY_ROCKET_LOOP_SAMPLES;
    const theta = entryTheta + sweep * t;
    loopAbs.push(clampAbs(ellipsePoint(cx, cy, rx, ry, theta), viewport, pad));
    loopHeadings.push(ellipseHeading(rx, ry, theta, sweep));
  }

  const toOff = (abs: RocketPoint): RocketPoint => ({
    x: abs.x - home.x,
    y: abs.y - home.y,
  });

  const takeoff = toOff(takeoffAbs);
  const hover = toOff(hoverAbs);
  const landOff = toOff(landAbs);
  const approach = toOff(approachAbs);
  const loop = loopAbs.map(toOff);

  const frames: RocketFlightFrame[] = [
    { pct: 0, x: 0, y: 0, rotate: 0 },
    { pct: 10, x: takeoff.x, y: takeoff.y, rotate: 0 },
    { pct: 13, x: loop[0].x, y: loop[0].y, rotate: loopHeadings[0] },
  ];

  for (let i = 1; i < loop.length; i++) {
    const pct = 13 + (59 * i) / (loop.length - 1);
    frames.push({ pct, x: loop[i].x, y: loop[i].y, rotate: loopHeadings[i] });
  }

  frames.push(
    { pct: 76, x: approach.x, y: approach.y, rotate: 0 },
    { pct: 82, x: hover.x, y: hover.y, rotate: 0 },
    { pct: 86, x: hover.x, y: hover.y, rotate: 0 },
    { pct: 96, x: landOff.x, y: landOff.y - 6, rotate: 0 },
    { pct: 100, x: landOff.x, y: landOff.y, rotate: 0, scale: 0.98 },
  );

  return { frames, loop, takeoff, approach, hover, land: landOff };
}

export function rocketFlightKeyframesCss(name: string, frames: RocketFlightFrame[]): string {
  const rules = frames
    .map((frame) => {
      const scale = frame.scale != null ? ` scale(${frame.scale})` : "";
      return `  ${frame.pct.toFixed(2)}% { transform: translate3d(${frame.x}px, ${frame.y}px, 0) rotate(${frame.rotate}deg)${scale}; animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1); }`;
    })
    .join("\n");
  return `@keyframes ${name} {\n${rules}\n}`;
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
