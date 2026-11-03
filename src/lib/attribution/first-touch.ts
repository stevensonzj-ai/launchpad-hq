import {
  FIRST_TOUCH_FIELDS,
  firstTouchFromLocation,
  hasAnyValue,
  sanitizeFirstTouch,
  type FirstTouch,
} from "./sanitize";

/** localStorage key. Holds the five sanitized fields as JSON, nothing else. */
export const FIRST_TOUCH_KEY = "lphq_first_touch";
/** Set once the signup row has been sent, so a reload never sends a second one. */
export const FIRST_TOUCH_SENT_KEY = "lphq_first_touch_sent";

/** A stored first touch is dropped, and a new one may be captured, after 12 months (365 days). */
export const FIRST_TOUCH_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export type KeyValueStore = Pick<Storage, "getItem" | "setItem"> & Partial<Pick<Storage, "removeItem">>;

/** Do Not Track or Global Privacy Control: if either is on, we capture nothing. */
export function privacySignalOn(nav: {
  doNotTrack?: string | null;
  globalPrivacyControl?: boolean;
} | undefined): boolean {
  if (!nav) return false;
  return nav.doNotTrack === "1" || nav.doNotTrack === "yes" || nav.globalPrivacyControl === true;
}

export function readFirstTouch(store: KeyValueStore): FirstTouch | null {
  try {
    const raw = store.getItem(FIRST_TOUCH_KEY);
    if (!raw) return null;
    const touch = sanitizeFirstTouch(JSON.parse(raw));
    return hasAnyValue(touch) ? touch : null;
  } catch {
    return null;
  }
}

/** True when the query string carries at least one of the three UTM tags we keep. */
export function hasUtmParams(search: string): boolean {
  const params = new URLSearchParams(search);
  return ["utm_source", "utm_medium", "utm_campaign"].some((name) => params.has(name));
}

/**
 * The stored first touch if it is under 12 months old. An older entry, one
 * with no usable capturedAt, or one that cannot be parsed is removed (together
 * with its sent flag) and treated as absent, so a new first touch can be captured.
 */
export function readLiveFirstTouch(store: KeyValueStore, now: number = Date.now()): FirstTouch | null {
  try {
    const raw = store.getItem(FIRST_TOUCH_KEY);
    if (raw === null) return null;
    let touch: FirstTouch | null = null;
    let fresh = false;
    try {
      const parsed = JSON.parse(raw) as { capturedAt?: unknown } | null;
      const capturedAt = parsed?.capturedAt;
      fresh =
        typeof capturedAt === "number" &&
        Number.isFinite(capturedAt) &&
        capturedAt <= now &&
        now - capturedAt <= FIRST_TOUCH_MAX_AGE_MS;
      if (fresh) {
        const candidate = sanitizeFirstTouch(parsed);
        touch = hasAnyValue(candidate) ? candidate : null;
      }
    } catch {
      fresh = false;
    }
    if (!fresh) {
      store.removeItem?.(FIRST_TOUCH_KEY);
      store.removeItem?.(FIRST_TOUCH_SENT_KEY);
    }
    return touch;
  } catch {
    return null;
  }
}

/**
 * Record the first touch, only if none is stored (and unexpired) yet and the
 * landing URL carries UTM tags. Returns true when this call wrote it. A later
 * visit with different UTM tags never overwrites it. Stores nothing when a
 * Do Not Track / Global Privacy Control signal is on. Country eligibility is
 * checked by the caller (see captureIfEligible).
 */
export function captureFirstTouch(
  store: KeyValueStore,
  location: { pathname: string; search: string },
  nav?: Parameters<typeof privacySignalOn>[0],
  now: number = Date.now(),
): boolean {
  if (privacySignalOn(nav)) return false;
  try {
    if (!hasUtmParams(location.search)) return false;
    if (readLiveFirstTouch(store, now) !== null) return false;
    const touch = firstTouchFromLocation(location.pathname, location.search);
    if (!hasAnyValue(touch)) return false;
    store.setItem(FIRST_TOUCH_KEY, JSON.stringify({ ...touch, capturedAt: now }));
    return true;
  } catch {
    // Storage blocked (private mode, disabled cookies): attribution is optional.
    return false;
  }
}

/**
 * The browser-side flow: do nothing on a privacy signal, with no UTM tags, or
 * when a live first touch is already stored; otherwise ask the server whether
 * this visitor's country allows capture, and capture only on a clear yes. Any
 * failure to get an answer means no capture.
 */
export async function captureIfEligible(
  store: KeyValueStore,
  location: { pathname: string; search: string },
  nav: Parameters<typeof privacySignalOn>[0],
  fetchAllowed: () => Promise<boolean>,
  now: number = Date.now(),
): Promise<boolean> {
  if (privacySignalOn(nav)) return false;
  if (!hasUtmParams(location.search)) return false;
  if (readLiveFirstTouch(store, now) !== null) return false;
  let allowed = false;
  try {
    allowed = await fetchAllowed();
  } catch {
    allowed = false;
  }
  return allowed ? captureFirstTouch(store, location, nav, now) : false;
}

export function alreadySent(store: KeyValueStore): boolean {
  try {
    return store.getItem(FIRST_TOUCH_SENT_KEY) !== null;
  } catch {
    return true;
  }
}

export function markSent(store: KeyValueStore): void {
  try {
    store.setItem(FIRST_TOUCH_SENT_KEY, "1");
  } catch {
    // Ignore: worst case the signup page sends once more and the server stores a second row.
  }
}

/** The body for the signup POST: the stored touch plus where the signup happened. */
export function buildSignupPayload(touch: FirstTouch, signupSource: string): FirstTouch {
  return sanitizeFirstTouch({ ...touch, signupSource });
}

/** Event properties for the optional analytics event: the same five fields, snake_case, nulls dropped. */
export function analyticsProperties(touch: FirstTouch): Record<string, string> {
  const names: Record<(typeof FIRST_TOUCH_FIELDS)[number], string> = {
    utmSource: "utm_source",
    utmMedium: "utm_medium",
    utmCampaign: "utm_campaign",
    landingPath: "landing_path",
    signupSource: "signup_source",
  };
  const out: Record<string, string> = {};
  for (const field of FIRST_TOUCH_FIELDS) {
    const value = touch[field];
    if (value !== null) out[names[field]] = value;
  }
  return out;
}
