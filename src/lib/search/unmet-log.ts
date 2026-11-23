import type { UnmetOutcome } from "./unmet-record";

/**
 * One structured JSON line per unmet-search beacon, written to stdout (Vercel
 * runtime logs). `store_error` is written to stderr so the line is error level.
 *
 * Records ONLY these fields:
 *   evt, outcome, latency_ms,
 *   result_count_bucket when the result count passed validation,
 *   error_class on store_error, and error_code when it is a Prisma code (Pdddd).
 *
 * Never logs the query (raw or normalized), IP, user agent, country, any
 * request header, or the thrown text. A database error can echo the query.
 */
export type UnmetResultCountBucket = "0" | "1" | "2" | "3-9" | "10+";

export type UnmetBeaconLog = {
  evt: "unmet_search_beacon";
  outcome: UnmetOutcome;
  result_count_bucket?: UnmetResultCountBucket;
  latency_ms: number;
  error_class?: string;
  error_code?: string;
};

const SAFE_CLASS = /^[A-Za-z][A-Za-z0-9_]{0,63}$/;
const PRISMA_CODE = /^P\d{4}$/;

function readOwnString(error: unknown, field: "name" | "code"): string | undefined {
  if (typeof error !== "object" || error === null || !(field in error)) return undefined;
  const value = (error as Record<string, unknown>)[field];
  return typeof value === "string" ? value : undefined;
}

/** Coarse band for a result count that already passed validation (0 through 1000). */
export function unmetResultCountBucket(resultCount: number): UnmetResultCountBucket {
  if (resultCount <= 0) return "0";
  if (resultCount === 1) return "1";
  if (resultCount === 2) return "2";
  if (resultCount < 10) return "3-9";
  return "10+";
}

export function unmetStoreErrorClass(error: unknown): string {
  const name = readOwnString(error, "name");
  return name !== undefined && SAFE_CLASS.test(name) ? name : "Error";
}

/** Prisma's `P` + four digits. Anything else is dropped so a code cannot carry query text. */
export function unmetStoreErrorCode(error: unknown): string | undefined {
  const code = readOwnString(error, "code");
  return code !== undefined && PRISMA_CODE.test(code) ? code : undefined;
}

export function buildUnmetBeaconLog(input: {
  outcome: UnmetOutcome;
  latencyMs: number;
  resultCount?: number;
  error?: unknown;
}): UnmetBeaconLog {
  const bucket =
    input.resultCount !== undefined &&
    Number.isInteger(input.resultCount) &&
    input.resultCount >= 0 &&
    input.resultCount <= 1000
      ? unmetResultCountBucket(input.resultCount)
      : undefined;
  const code = input.outcome === "store_error" ? unmetStoreErrorCode(input.error) : undefined;
  // Field order is part of the log shape: bucket before latency, error fields last.
  return {
    evt: "unmet_search_beacon",
    outcome: input.outcome,
    ...(bucket !== undefined ? { result_count_bucket: bucket } : {}),
    latency_ms: Math.max(0, Math.round(input.latencyMs)),
    ...(input.outcome === "store_error" ? { error_class: unmetStoreErrorClass(input.error) } : {}),
    ...(code !== undefined ? { error_code: code } : {}),
  };
}

/** One line. Error level only for store_error. */
export function logUnmetBeacon(entry: UnmetBeaconLog): void {
  const line = JSON.stringify(entry);
  if (entry.outcome === "store_error") console.error(line);
  else console.log(line);
}
