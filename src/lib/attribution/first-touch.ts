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

export type KeyValueStore = Pick<Storage, "getItem" | "setItem">;

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

/**
 * Record the first touch, only if none is stored yet. Returns true when this
 * call wrote it. A later visit with different UTM tags never overwrites it.
 */
export function captureFirstTouch(
  store: KeyValueStore,
  location: { pathname: string; search: string },
  nav?: Parameters<typeof privacySignalOn>[0],
): boolean {
  if (privacySignalOn(nav)) return false;
  try {
    if (store.getItem(FIRST_TOUCH_KEY) !== null) return false;
    const touch = firstTouchFromLocation(location.pathname, location.search);
    if (!hasAnyValue(touch)) return false;
    store.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
    return true;
  } catch {
    // Storage blocked (private mode, disabled cookies): attribution is optional.
    return false;
  }
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
