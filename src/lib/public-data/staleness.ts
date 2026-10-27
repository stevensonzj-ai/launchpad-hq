/**
 * The stale-facts honesty label (fix plan P1.2/P1.3), shared by the MCP
 * connector and the /data/v1 feed so the two use one rule. Labelling beats
 * hiding: stale tools stay listed but say how old their facts are.
 */

/** A record whose newest check date is older than this many days is stale. */
export const STALE_AFTER_DAYS = 90;

/** True when `asOf` is more than STALE_AFTER_DAYS before `today` (both YYYY-MM-DD). */
export function isStale(asOf: string | null, today: string = new Date().toISOString().slice(0, 10)): boolean {
  if (!asOf) return false;
  const age = (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${asOf}T00:00:00Z`)) / 86_400_000;
  return age > STALE_AFTER_DAYS;
}
