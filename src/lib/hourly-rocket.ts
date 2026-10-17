export const HOURLY_ROCKET_STORAGE_KEY = "lp-hourly-rocket-chicago";

/** Shared duration for hourly, ?rocket=1, and ?rocket=demo flights. */
export const HOURLY_ROCKET_FLIGHT_MS = 7500;
export const HOURLY_ROCKET_CRAFT = { width: 56, height: 80 };

/** Linear-time phase ends. Global motion uses easeInOut on this same 0–1 clock. */
export const ROCKET_PHASE = {
  takeoffEnd: 0.1,
  loopEnd: 0.7,
  approachEnd: 0.82,
  hoverEnd: 0.86,
} as const;

export type RocketPoint = { x: number; y: number };
export type RocketViewport = { width: number; height: number };
export type RocketFlightPhase = "takeoff" | "loop" | "approach" | "hover" | "land";

export type RocketPose = {
  x: number;
  y: number;
  angle: number;
  phase: RocketFlightPhase;
  plume: { opacity: number; scaleY: number };
};

export type RocketFlightPlan = {
  takeoff: RocketPoint;
  approach: RocketPoint;
  hover: RocketPoint;
  land: RocketPoint;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  entryTheta: number;
  sweep: number;
  viewport: RocketViewport;
  home: RocketPoint;
  pad: number;
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

function clampOff(
  off: RocketPoint,
  home: RocketPoint,
  viewport: RocketViewport,
  pad: number,
): RocketPoint {
  const abs = clampAbs({ x: home.x + off.x, y: home.y + off.y }, viewport, pad);
  return { x: abs.x - home.x, y: abs.y - home.y };
}

export function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

/** Smoothstep on a unit parameter; used on local segment time, not the global clock. */
export function easeInOutCubic(t: number): number {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

function headingDeg(dx: number, dy: number): number {
  return (Math.atan2(dx, -dy) * 180) / Math.PI;
}

export function shortestAngleDelta(from: number, to: number): number {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

export function lerpAngle(from: number, to: number, t: number): number {
  return from + shortestAngleDelta(from, to) * t;
}

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, theta: number): RocketPoint {
  return { x: cx + rx * Math.cos(theta), y: cy + ry * Math.sin(theta) };
}

function ellipseVelocity(rx: number, ry: number, theta: number, dTheta: number): RocketPoint {
  return {
    x: -rx * Math.sin(theta) * dTheta,
    y: ry * Math.cos(theta) * dTheta,
  };
}

function hermite(
  p0: RocketPoint,
  m0: RocketPoint,
  p1: RocketPoint,
  m1: RocketPoint,
  t: number,
): { p: RocketPoint; v: RocketPoint } {
  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;
  const d00 = 6 * t2 - 6 * t;
  const d10 = 3 * t2 - 4 * t + 1;
  const d01 = -6 * t2 + 6 * t;
  const d11 = 3 * t2 - 2 * t;
  return {
    p: {
      x: h00 * p0.x + h10 * m0.x + h01 * p1.x + h11 * m1.x,
      y: h00 * p0.y + h10 * m0.y + h01 * p1.y + h11 * m1.y,
    },
    v: {
      x: d00 * p0.x + d10 * m0.x + d01 * p1.x + d11 * m1.x,
      y: d00 * p0.y + d10 * m0.y + d01 * p1.y + d11 * m1.y,
    },
  };
}

function plumeFor(u: number): { opacity: number; scaleY: number } {
  const flicker = Math.sin(u * Math.PI * 4);
  if (u < ROCKET_PHASE.approachEnd) {
    return { opacity: 0.9 + 0.08 * flicker, scaleY: 0.96 + 0.06 * flicker };
  }
  if (u < ROCKET_PHASE.hoverEnd) {
    return { opacity: 0.55 + 0.08 * flicker, scaleY: 0.48 + 0.06 * flicker };
  }
  const descent = (u - ROCKET_PHASE.hoverEnd) / (1 - ROCKET_PHASE.hoverEnd);
  const fade = 1 - easeInOutCubic(descent);
  return { opacity: 0.45 * fade, scaleY: 0.12 + 0.28 * fade };
}

function phaseAt(u: number): RocketFlightPhase {
  if (u < ROCKET_PHASE.takeoffEnd) return "takeoff";
  if (u < ROCKET_PHASE.loopEnd) return "loop";
  if (u < ROCKET_PHASE.approachEnd) return "approach";
  if (u <= ROCKET_PHASE.hoverEnd) return "hover";
  return "land";
}

function ellipseHeadingUnwrapped(
  rx: number,
  ry: number,
  theta: number,
  expected: number,
): number {
  return headingDeg(-rx * Math.sin(theta), ry * Math.cos(theta)) +
    360 * Math.round((expected - headingDeg(-rx * Math.sin(theta), ry * Math.cos(theta))) / 360);
}

/**
 * Viewport-scaled oval plus pad anchors. Offsets are relative to `home`.
 * Sweep is one circuit that *ends* near the pad (not back at takeoff).
 */
export function createRocketFlightPlan(
  home: RocketPoint,
  land: RocketPoint,
  viewport: RocketViewport,
  craft = HOURLY_ROCKET_CRAFT,
): RocketFlightPlan {
  const pad = craftPad(craft);
  const landAbs = {
    x: Math.min(viewport.width - pad, Math.max(pad, home.x + land.x)),
    y: home.y + land.y,
  };
  const hoverAbs = clampAbs({ x: landAbs.x, y: landAbs.y - 150 }, viewport, 8);
  const takeoffAbs = clampAbs({ x: home.x, y: home.y - 72 }, viewport, 8);
  const approachAbs = clampAbs({ x: landAbs.x, y: landAbs.y + 70 }, viewport, pad);

  const cxAbs = viewport.width / 2;
  const cyAbs = viewport.height / 2;
  const rx = Math.max(36, viewport.width / 2 - pad - 16);
  const ry = Math.max(36, viewport.height / 2 - pad - 16);

  const entryTheta = Math.atan2((takeoffAbs.y - cyAbs) / ry, (takeoffAbs.x - cxAbs) / rx);
  const exitTheta = Math.atan2((approachAbs.y - cyAbs) / ry, (approachAbs.x - cxAbs) / rx);
  let sweep = exitTheta - entryTheta;
  while (sweep <= Math.PI * 1.15) sweep += Math.PI * 2;
  while (sweep > Math.PI * 2.15) sweep -= Math.PI * 2;

  const toOff = (abs: RocketPoint): RocketPoint => ({
    x: abs.x - home.x,
    y: abs.y - home.y,
  });

  return {
    takeoff: toOff(takeoffAbs),
    approach: toOff(approachAbs),
    hover: toOff(hoverAbs),
    land: toOff(landAbs),
    cx: cxAbs - home.x,
    cy: cyAbs - home.y,
    rx,
    ry,
    entryTheta,
    sweep,
    viewport,
    home,
    pad,
  };
}

function loopPoint(plan: RocketFlightPlan, s: number): { p: RocketPoint; v: RocketPoint } {
  const theta = plan.entryTheta + plan.sweep * s;
  const p = ellipsePoint(plan.cx, plan.cy, plan.rx, plan.ry, theta);
  const v = ellipseVelocity(plan.rx, plan.ry, theta, plan.sweep);
  return { p, v };
}

/**
 * Pose at linear flight progress `t` in [0, 1]. Phases use that same clock so
 * the oval keeps ~4.5s; each join is a C1 hermite (matched position + velocity).
 */
export function rocketPoseAt(plan: RocketFlightPlan, t: number): RocketPose {
  const u = clamp01(t);
  const origin = { x: 0, y: 0 };
  const loopStart = loopPoint(plan, 0);
  const loopEnd = loopPoint(plan, 1);
  const takeoffDur = ROCKET_PHASE.takeoffEnd;
  const loopDur = ROCKET_PHASE.loopEnd - ROCKET_PHASE.takeoffEnd;
  const approachDur = ROCKET_PHASE.approachEnd - ROCKET_PHASE.loopEnd;
  const halfApproach = approachDur / 2;
  const takeoffOut = {
    x: loopStart.v.x * (takeoffDur / loopDur),
    y: loopStart.v.y * (takeoffDur / loopDur),
  };
  const approachIn = {
    x: loopEnd.v.x * (halfApproach / loopDur),
    y: loopEnd.v.y * (halfApproach / loopDur),
  };
  const rise = { x: 0, y: (plan.hover.y - plan.approach.y) * 0.85 };

  let p: RocketPoint;

  if (u < ROCKET_PHASE.takeoffEnd) {
    const s = u / takeoffDur;
    p = hermite(origin, { x: 0, y: plan.takeoff.y * 2 }, loopStart.p, takeoffOut, s).p;
  } else if (u < ROCKET_PHASE.loopEnd) {
    const s = (u - ROCKET_PHASE.takeoffEnd) / loopDur;
    p = loopPoint(plan, s).p;
  } else if (u < ROCKET_PHASE.approachEnd) {
    const s = (u - ROCKET_PHASE.loopEnd) / approachDur;
    p =
      s < 0.5
        ? hermite(loopEnd.p, approachIn, plan.approach, rise, s * 2).p
        : hermite(plan.approach, rise, plan.hover, { x: 0, y: 0 }, (s - 0.5) * 2).p;
  } else if (u <= ROCKET_PHASE.hoverEnd) {
    p = plan.hover;
  } else {
    const s = (u - ROCKET_PHASE.hoverEnd) / (1 - ROCKET_PHASE.hoverEnd);
    p = hermite(plan.hover, { x: 0, y: 0 }, plan.land, { x: 0, y: 0 }, s).p;
  }

  const clamped = clampOff(p, plan.home, plan.viewport, 8);
  const entryExpected = headingDeg(-plan.rx * Math.sin(plan.entryTheta), plan.ry * Math.cos(plan.entryTheta));
  const loopS =
    u < ROCKET_PHASE.takeoffEnd
      ? 0
      : u < ROCKET_PHASE.loopEnd
        ? (u - ROCKET_PHASE.takeoffEnd) / loopDur
        : 1;
  const loopAngle = ellipseHeadingUnwrapped(
    plan.rx,
    plan.ry,
    plan.entryTheta + plan.sweep * loopS,
    entryExpected + (plan.sweep * loopS * 180) / Math.PI,
  );
  let angle = loopAngle;
  if (u < ROCKET_PHASE.takeoffEnd) {
    angle = lerpAngle(0, loopAngle, u / takeoffDur);
  } else if (u >= ROCKET_PHASE.loopEnd && u < ROCKET_PHASE.approachEnd) {
    angle = lerpAngle(loopAngle, 0, (u - ROCKET_PHASE.loopEnd) / approachDur);
  } else if (u >= ROCKET_PHASE.approachEnd) {
    angle = 0;
  }

  return {
    x: clamped.x,
    y: clamped.y,
    angle,
    phase: phaseAt(u),
    plume: plumeFor(u),
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
