/**
 * Who may be attributed at all. Pure (no Next imports) so the eligibility
 * endpoint, the POST route and the tests share one decision.
 *
 * Blocked: EU27, the other EEA states (IS, LI, NO), the UK (GB) and
 * Switzerland (CH). A missing or unrecognised country is also blocked: when we
 * cannot tell where a visitor is, we capture nothing.
 */

export const BLOCKED_COUNTRIES: readonly string[] = [
  // EU27
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // EEA, not EU
  "IS", "LI", "NO",
  // UK and Switzerland
  "GB", "CH",
];

const BLOCKED = new Set(BLOCKED_COUNTRIES);

export type AttributionDecision =
  | { allowed: true }
  | { allowed: false; reason: "privacy_signal" | "unknown_country" | "blocked_country" };

type HeaderReader = { get(name: string): string | null };

/** Do Not Track ("1") or Global Privacy Control ("1") sent as request headers. */
export function headerPrivacySignal(headers: HeaderReader): boolean {
  return headers.get("dnt")?.trim() === "1" || headers.get("sec-gpc")?.trim() === "1";
}

export function decideAttribution(input: {
  country: string | null | undefined;
  privacySignal?: boolean;
}): AttributionDecision {
  if (input.privacySignal) return { allowed: false, reason: "privacy_signal" };
  const country = input.country?.trim().toUpperCase();
  // XX = unknown, T1 = Tor: neither tells us where the visitor is.
  if (!country || !/^[A-Z]{2}$/.test(country) || country === "XX" || country === "T1") {
    return { allowed: false, reason: "unknown_country" };
  }
  if (BLOCKED.has(country)) return { allowed: false, reason: "blocked_country" };
  return { allowed: true };
}

/** Decision for a request, from Vercel's x-vercel-ip-country plus the DNT / Sec-GPC headers. */
export function decideForRequest(headers: HeaderReader): AttributionDecision {
  return decideAttribution({
    country: headers.get("x-vercel-ip-country"),
    privacySignal: headerPrivacySignal(headers),
  });
}
