/**
 * Gate G1 for the operator-run catalog scripts: decide whether a parsed
 * DATABASE_URL hostname may be written to, before any PrismaClient exists.
 *
 * Production is refused by default. It is allowed only when BOTH of these
 * are true:
 *   - argv contains `--confirm-production`, and
 *   - env CONFIRM_PROD_HOST equals PRODUCTION_ENDPOINT_ID exactly.
 *
 * Why the endpoint prefix and not the Neon branch id: production is Neon
 * branch br-purple-band-ajks38xk, but a connection URL only carries the
 * compute endpoint id in its hostname (`ep-…`, `ep-…-pooler`, plus the
 * region FQDN). The branch id cannot be derived from the URL, so the
 * confirmation binds to the endpoint prefix the hostname actually shows.
 *
 * Non-production hosts need no flag or env. Passing `--confirm-production`
 * against one is harmless: the check passes with production=false and a note.
 * Pure function: no I/O, never sees credentials (hostname only).
 */

export const PRODUCTION_ENDPOINT_ID = "ep-odd-mud-ajdk8f99";
export const CONFIRM_PRODUCTION_FLAG = "--confirm-production";
export const CONFIRM_PROD_HOST_ENV = "CONFIRM_PROD_HOST";

export type TargetHostCheck =
  | { ok: true; production: boolean; note?: string }
  | { ok: false; reason: string };

/** True for the production compute, its `-pooler` variant, and full FQDNs. */
export function isProductionHost(host: string): boolean {
  return host.toLowerCase().startsWith(PRODUCTION_ENDPOINT_ID);
}

export function checkTargetHost(
  host: string | null,
  argv: readonly string[],
  env: Record<string, string | undefined>,
): TargetHostCheck {
  if (!host) {
    return { ok: false, reason: "Could not parse a hostname from DATABASE_URL. Aborting before connect." };
  }

  const flag = argv.includes(CONFIRM_PRODUCTION_FLAG);

  if (!isProductionHost(host)) {
    return flag
      ? {
          ok: true,
          production: false,
          note: `${CONFIRM_PRODUCTION_FLAG} ignored: ${host} is not production.`,
        }
      : { ok: true, production: false };
  }

  const envMatches = env[CONFIRM_PROD_HOST_ENV] === PRODUCTION_ENDPOINT_ID;
  if (flag && envMatches) return { ok: true, production: true };

  const missing: string[] = [];
  if (!flag) missing.push(`the ${CONFIRM_PRODUCTION_FLAG} flag`);
  if (!envMatches) missing.push(`${CONFIRM_PROD_HOST_ENV}=${PRODUCTION_ENDPOINT_ID}`);
  return {
    ok: false,
    reason:
      `Refusing to run: hostname ${host} starts with ${PRODUCTION_ENDPOINT_ID} (production compute or pooler). ` +
      `Point DATABASE_URL at a Neon branch, or to target production deliberately supply both ` +
      `${CONFIRM_PRODUCTION_FLAG} and ${CONFIRM_PROD_HOST_ENV}=${PRODUCTION_ENDPOINT_ID}. Missing: ${missing.join(" and ")}.`,
  };
}
