/**
 * Privacy-light first-touch attribution: the only five fields we ever keep.
 * Pure (no Next, React or Prisma imports) so the browser capture code, the API
 * route and the tests all share one definition of "allowed".
 */

export const MAX_TOKEN_LENGTH = 100;
export const MAX_PATH_LENGTH = 200;

/** The complete list of stored fields. Anything else in a payload is dropped. */
export const FIRST_TOUCH_FIELDS = [
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "landingPath",
  "signupSource",
] as const;

export type FirstTouchField = (typeof FIRST_TOUCH_FIELDS)[number];
export type FirstTouch = Record<FirstTouchField, string | null>;

const TOKEN_CHARSET = /^[a-z0-9._-]+$/;
const PATH_CHARSET = /^\/[a-z0-9._~%/-]*$/;

/**
 * Trim, lowercase, collapse inner whitespace to "-", cap the length. A value
 * with any character outside [a-z0-9._-] is dropped whole rather than
 * "cleaned": stripping "@" from an email would still leave most of an address.
 */
export function sanitizeToken(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().toLowerCase().replace(/\s+/g, "-").slice(0, MAX_TOKEN_LENGTH);
  return cleaned && TOKEN_CHARSET.test(cleaned) ? cleaned : null;
}

/**
 * Pathname only. Anything after "?" or "#" is cut off, so a query string can
 * never be stored even if a caller passes a full relative URL.
 */
export function sanitizePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const pathOnly = value.trim().split(/[?#]/, 1)[0].toLowerCase().slice(0, MAX_PATH_LENGTH);
  if (!pathOnly.startsWith("/") || pathOnly.startsWith("//")) return null;
  return PATH_CHARSET.test(pathOnly) ? pathOnly : null;
}

export function emptyFirstTouch(): FirstTouch {
  return { utmSource: null, utmMedium: null, utmCampaign: null, landingPath: null, signupSource: null };
}

export function hasAnyValue(touch: FirstTouch): boolean {
  return FIRST_TOUCH_FIELDS.some((field) => touch[field] !== null);
}

/**
 * Whitelist-copy an untrusted object into a FirstTouch. Unknown keys (an IP,
 * a user agent, a referrer, an email, anything) are never read, so they cannot
 * be passed along.
 */
export function sanitizeFirstTouch(input: unknown): FirstTouch {
  const out = emptyFirstTouch();
  if (!input || typeof input !== "object" || Array.isArray(input)) return out;
  const record = input as Record<string, unknown>;
  out.utmSource = sanitizeToken(record.utmSource);
  out.utmMedium = sanitizeToken(record.utmMedium);
  out.utmCampaign = sanitizeToken(record.utmCampaign);
  out.landingPath = sanitizePath(record.landingPath);
  out.signupSource = sanitizeToken(record.signupSource);
  return out;
}

/** First-touch fields from a landing URL's pathname and query string. */
export function firstTouchFromLocation(pathname: string, search: string): FirstTouch {
  const params = new URLSearchParams(search);
  return sanitizeFirstTouch({
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    landingPath: pathname,
  });
}
