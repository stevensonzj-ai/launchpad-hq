import { hasAnyValue, sanitizeFirstTouch, type FirstTouch } from "./sanitize";

/** A request body bigger than this is refused before it is parsed. */
export const MAX_BODY_BYTES = 2048;

export type AttributionStore = {
  create(args: { data: FirstTouch }): Promise<unknown>;
};

export type PersistResult = "stored" | "empty" | "too_large" | "invalid";

/**
 * Validate an untrusted request body and write one row. Only the five
 * allowlisted, sanitized fields reach `create`; every other key is dropped.
 * There is deliberately no user id, IP, user agent or referrer parameter.
 */
export async function persistFirstTouch(rawBody: string, store: AttributionStore): Promise<PersistResult> {
  if (rawBody.length > MAX_BODY_BYTES) return "too_large";
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return "invalid";
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return "invalid";
  const data = sanitizeFirstTouch(parsed);
  if (!hasAnyValue(data)) return "empty";
  await store.create({ data });
  return "stored";
}
