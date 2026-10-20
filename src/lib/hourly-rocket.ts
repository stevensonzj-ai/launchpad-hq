export const HOURLY_ROCKET_STORAGE_KEY = "lp-hourly-rocket-chicago";
export const HOURLY_ROCKET_FLIGHT_MS = 9500;
export const ROCKET_DETACH_MS = 1400;
export const ROCKET_AFTERLAND_MS = 2400;
export const ROCKET_APPROACH_PITCH_MS = 500;
export const HOURLY_ROCKET_CRAFT = { width: 56, height: 80 };
/** Measured artwork axis: nose (193,4), plume tip (19,284), in 205×290 sprites. */
export const HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG = 31.9;
export const ROCKET_HOVER_OFFSET_PX = 100;
export const ROCKET_MIN_SETTLE_PX = 60;
export const ROCKET_PHASE = { takeoffEnd: 0.14, loopEnd: 0.56, approachEnd: 0.72, hoverEnd: 0.78 } as const;
export type RocketPoint = {
  x: number;
  y: number;
};
export type RocketViewport = {
  width: number;
  height: number;
};
export type RocketFlightPhase = "takeoff" | "loop" | "approach" | "hover" | "land";
type Curve = [
  RocketPoint,
  RocketPoint,
  RocketPoint,
  RocketPoint
];
export type RocketPose = {
  x: number;
  y: number;
  angle: number;
  phase: RocketFlightPhase;
  plume: {
    opacity: number;
    scaleY: number;
  };
};
export type RocketFlightPlan = {
  home: RocketPoint;
  viewport: RocketViewport;
  pad: number;
  origin: RocketPoint;
  hover: RocketPoint;
  land: RocketPoint;
  returnsHome: boolean;
  curves: Curve[];
  distances: number[];
  length: number;
};
export function craftPad(craft = HOURLY_ROCKET_CRAFT): number {
  return Math.hypot(craft.width, craft.height) / 2 + 36;
}
/** An image's visible top-center, with room for the complete hover and descent.
 * Reject unsafe targets instead of letting the flight planner move the touchdown.
 */
export function rocketImageLandingTarget(
  rect: { left: number; top: number; width: number; height: number } | null,
  viewport: RocketViewport,
): RocketPoint | null {
  if (!rect || rect.width <= 0 || rect.height <= 0) return null;
  const pad = craftPad();
  const settle = Math.min(ROCKET_HOVER_OFFSET_PX, (viewport.height - 2 * pad) / 2);
  const x = rect.left + rect.width / 2;
  if (x < pad || x > viewport.width - pad ||
      rect.top < pad + 12 + settle || rect.top > viewport.height - pad) return null;
  return { x, y: rect.top };
}
export function clamp01(t: number): number { return Math.min(1, Math.max(0, t)); }
/** Quintic easing has zero velocity AND acceleration at both ends. */
export function smoothStep(t: number): number {
  const x = clamp01(t);
  return x * x * x * (10 + x * (-15 + 6 * x));
}
export function headingDeg(dx: number, dy: number): number { return Math.atan2(dx, -dy) * 180 / Math.PI; }
export function shortestAngleDelta(from: number, to: number): number { return ((to - from) % 360 + 540) % 360 - 180; }
function bezier(curve: Curve, t: number) {
  const [a, b, c, d] = curve, s = 1 - t;
  return {
    p: { x: s * s * s * a.x + 3 * s * s * t * b.x + 3 * s * t * t * c.x + t * t * t * d.x, y: s * s * s * a.y + 3 * s * s * t * b.y + 3 * s * t * t * c.y + t * t * t * d.y },
    v: { x: 3 * s * s * (b.x - a.x) + 6 * s * t * (c.x - b.x) + 3 * t * t * (d.x - c.x), y: 3 * s * s * (b.y - a.y) + 6 * s * t * (c.y - b.y) + 3 * t * t * (d.y - c.y) },
  };
}
function curveAt(curves: Curve[], parameter: number) {
  const i = Math.min(curves.length - 1, Math.floor(parameter));
  return bezier(curves[i], parameter - i);
}
const SAMPLES = 480;
/** All control points lie inside the safe rectangle, so the entire Bézier does too.
 * A curvature-weighted distance table slows travel through tight bends. Cruise
 * follows the tangent; powered landing approach uses a speed-dependent lean.
 */
export function createRocketFlightPlan(home: RocketPoint, land: RocketPoint, viewport: RocketViewport, craft = HOURLY_ROCKET_CRAFT): RocketFlightPlan {
  const pad = craftPad(craft);
  const safe = (x: number, y: number) => ({ x: Math.max(pad, Math.min(viewport.width - pad, x)), y: Math.max(pad, Math.min(viewport.height - pad, y)) });
  const returnsHome = Math.hypot(land.x, land.y) < 1;
  const top = pad + 12;
  const settle = Math.min(ROCKET_HOVER_OFFSET_PX, (viewport.height - 2 * pad) / 2);
  const landing = safe(home.x + land.x, Math.max(top + settle, home.y + land.y));
  const hover = { x: landing.x, y: landing.y - settle };
  const origin = safe(home.x, top + Math.min(75, settle));
  const right = viewport.width - pad;
  const bottom = viewport.height - pad;
  const middle = Math.max(top + 40, Math.min(bottom - 40, viewport.height * 0.48));
  const join = { x: right, y: middle };
  const returnY = Math.min(bottom - 30, Math.max(middle, hover.y + 80));
  const returnPoint = { x: pad + (hover.x - pad) * 0.2, y: returnY };
  const absCurves: Curve[] = [
    [origin, { x: origin.x, y: top }, { x: right, y: top }, join],
    [join, { x: right, y: bottom }, { x: pad, y: bottom }, returnPoint],
    [returnPoint, { x: returnPoint.x + (returnPoint.x - pad) * 0.5, y: returnY - (bottom - returnY) * 0.5 }, { x: hover.x, y: hover.y + (returnY - hover.y) * 0.5 }, hover],
  ];
  const offset = (p: RocketPoint) => ({ x: p.x - home.x, y: p.y - home.y });
  const curves = absCurves.map(c => c.map(offset) as Curve);
  const distances = [0];
  let previous = curveAt(curves, 0);
  for (let i = 1; i <= SAMPLES; i++) {
    const sample = curveAt(curves, i / SAMPLES * curves.length);
    const travel = Math.hypot(sample.p.x - previous.p.x, sample.p.y - previous.p.y);
    const turn = shortestAngleDelta(headingDeg(previous.v.x, previous.v.y), headingDeg(sample.v.x, sample.v.y)) * Math.PI / 180;
    // Slow the craft in tighter bends rather than allowing attitude to lag travel.
    distances.push(distances[i - 1] + Math.hypot(travel, 220 * turn));
    previous = sample;
  }
  return { home, viewport, pad, origin: offset(origin), hover: offset(hover), land: offset(landing), returnsHome, curves, distances, length: distances[SAMPLES] };
}
function flightAt(plan: RocketFlightPlan, progress: number) {
  const distance = smoothStep(progress) * plan.length;
  let lo = 0, hi = SAMPLES;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (plan.distances[mid] < distance)
      lo = mid;
    else
      hi = mid;
  }
  const span = plan.distances[hi] - plan.distances[lo];
  const parameter = (lo + (span ? (distance - plan.distances[lo]) / span : 0)) / SAMPLES * plan.curves.length;
  return curveAt(plan.curves, parameter);
}
function phaseAt(t: number): RocketFlightPhase {
  if (t < ROCKET_PHASE.takeoffEnd)
    return "takeoff";
  if (t < ROCKET_PHASE.loopEnd)
    return "loop";
  if (t < ROCKET_PHASE.approachEnd)
    return "approach";
  if (t <= ROCKET_PHASE.hoverEnd)
    return "hover";
  return "land";
}
export function rocketPoseAt(plan: RocketFlightPlan, t: number): RocketPose {
  const u = clamp01(t), phase = phaseAt(u);
  const flight = flightAt(plan, Math.min(1, u / ROCKET_PHASE.approachEnd));
  let p = flight.p;
  let heading = u < ROCKET_PHASE.approachEnd ? headingDeg(flight.v.x, flight.v.y) : 0;
  if (u >= ROCKET_PHASE.loopEnd && u < ROCKET_PHASE.approachEnd) {
    // Powered landing translation uses a modest thrust-vector lean. Measure
    // horizontal speed in screen widths/second so phones and desktops agree.
    const dt = 1 / HOURLY_ROCKET_FLIGHT_MS;
    const before = flightAt(plan, (u - dt) / ROCKET_PHASE.approachEnd).p;
    const after = flightAt(plan, (u + dt) / ROCKET_PHASE.approachEnd).p;
    const speed = (after.x - before.x) / 0.002 / plan.viewport.width;
    const lean = 20 * Math.tanh(speed / 0.08);
    const blend = smoothStep((u - ROCKET_PHASE.loopEnd) * HOURLY_ROCKET_FLIGHT_MS / ROCKET_APPROACH_PITCH_MS);
    heading += shortestAngleDelta(heading, lean) * blend;
  }
  if (u >= ROCKET_PHASE.approachEnd) {
    const descent = smoothStep((u - ROCKET_PHASE.hoverEnd) / (1 - ROCKET_PHASE.hoverEnd));
    p = { x: plan.hover.x, y: plan.hover.y + (plan.land.y - plan.hover.y) * descent };
  }
  const seconds = u * HOURLY_ROCKET_FLIGHT_MS / 1000;
  const pulse = 0.14 * Math.sin(seconds * 73) + 0.09 * Math.sin(seconds * 117);
  const thrust = phase === "takeoff" ? 1.35 : phase === "loop" ? 1.05 : phase === "approach" ? 1.25 : phase === "hover" ? 0.75 : 1.1;
  const cutoff = 1 - smoothStep((u - 0.96) / 0.04);
  return { ...p, angle: heading - HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG, phase,
    plume: { opacity: Math.min(1, 0.9 + pulse * 0.4) * cutoff, scaleY: (thrust + pulse) * cutoff } };
}

/** Engine-off detachment is intentional freefall, before nose-first powered flight.
 * Both ends come to rest, matching the flight curve without a position/velocity jump.
 */
export function rocketDetachAt(plan: RocketFlightPlan, progress: number) {
  const t = clamp01(progress);
  const drop = smoothStep(t);
  return {
    x: plan.origin.x * drop,
    y: plan.origin.y * drop,
    angle: 45 * (1 - smoothStep((t - 0.15) / 0.75)) - HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG,
    scale: 0.42 + 0.58 * smoothStep((t - 0.15) / 0.85),
    artwork: smoothStep((t - 0.25) / 0.35),
    ignition: smoothStep((t - 0.62) / 0.38),
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
