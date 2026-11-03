import { decideForRequest } from "@/lib/attribution/eligibility";
import { isUnmet, normalizeUnmetQuery } from "./unmet";

/** A beacon body bigger than this (bytes) is refused before it is parsed. */
export const MAX_UNMET_BODY_BYTES = 1024;

/** At most this many writes per minute per server instance, for all visitors together. */
export const UNMET_WRITES_PER_MINUTE = 30;

/**
 * One statement, one write. First sight inserts; every later sight bumps the
 * counters. noClickCount ($2) is 1 for a search with no click, 0 otherwise.
 * Values are bound parameters, never string-built.
 */
export const UNMET_UPSERT_SQL =
  'INSERT INTO "unmet_searches" ("normalizedQuery", "searchCount", "noClickCount", "lastResultCount", "minResultCount", "firstSeen", "lastSeen") ' +
  'VALUES ($1, 1, $2::int, $3::int, $3::int, current_date, current_date) ' +
  'ON CONFLICT ("normalizedQuery") DO UPDATE SET ' +
  '"searchCount" = "unmet_searches"."searchCount" + 1, ' +
  '"noClickCount" = "unmet_searches"."noClickCount" + $2::int, ' +
  '"lastResultCount" = $3::int, ' +
  '"minResultCount" = LEAST("unmet_searches"."minResultCount", $3::int), ' +
  '"lastSeen" = current_date';

export type UnmetSearchStore = {
  /** Upsert one aggregate row. The only thing ever written. */
  record(entry: { normalizedQuery: string; noClick: boolean; resultCount: number }): Promise<void>;
};

/** Bots, crawlers, scripted clients and headless browsers. An empty user agent also counts. */
const BOT_UA =
  /bot|crawl|spider|slurp|headless|lighthouse|puppeteer|playwright|selenium|phantom|curl|wget|python|httpclient|http-client|java\/|go-http|okhttp|axios|node-fetch|undici|libwww|scrapy|monitor|preview|facebookexternalhit|pingdom|uptime/i;

export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  const ua = userAgent?.trim();
  if (!ua) return true;
  return BOT_UA.test(ua);
}

/**
 * Burst guard: a token bucket held in this instance's memory only. It has no
 * key, so it never sees an IP or any visitor identifier. A cold start resets
 * it, which is fine for a flood limiter.
 */
export class WriteBudget {
  private tokens: number;
  private last: number;
  constructor(
    private readonly perMinute: number = UNMET_WRITES_PER_MINUTE,
    private readonly now: () => number = Date.now,
  ) {
    this.tokens = perMinute;
    this.last = now();
  }
  take(): boolean {
    const t = this.now();
    const elapsed = Math.max(0, t - this.last);
    this.last = t;
    this.tokens = Math.min(this.perMinute, this.tokens + (elapsed * this.perMinute) / 60_000);
    if (this.tokens < 1) return false;
    this.tokens -= 1;
    return true;
  }
}

/** The instance-wide default budget used by the route. */
export const defaultWriteBudget = new WriteBudget();

type HeaderReader = { get(name: string): string | null };

export type UnmetOutcome =
  | "stored"
  | "ineligible"
  | "bot"
  | "invalid"
  | "above_threshold"
  | "rate_limited"
  | "store_error";

/**
 * Handle one beacon. Never throws and never reports back to the client: the
 * route answers 204 whatever this returns. At most one store write.
 *
 * Order matters: privacy checks (DNT / Sec-GPC / country, unknown country
 * skips) come before anything is parsed, and nothing is stored but the
 * normalized query, a result count and a clicked flag.
 */
export async function recordUnmetSearch(input: {
  headers: HeaderReader;
  body: string | null;
  store: UnmetSearchStore;
  budget?: WriteBudget;
}): Promise<UnmetOutcome> {
  if (!decideForRequest(input.headers).allowed) return "ineligible";
  if (isBotUserAgent(input.headers.get("user-agent"))) return "bot";
  if (input.body === null) return "invalid";

  let parsed: unknown;
  try {
    parsed = JSON.parse(input.body);
  } catch {
    return "invalid";
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return "invalid";
  const { q, resultCount, clicked } = parsed as Record<string, unknown>;
  if (typeof clicked !== "boolean") return "invalid";
  if (typeof resultCount !== "number" || !Number.isInteger(resultCount) || resultCount < 0 || resultCount > 1000) {
    return "invalid";
  }
  if (!isUnmet(resultCount)) return "above_threshold";
  const normalizedQuery = normalizeUnmetQuery(q);
  if (normalizedQuery === null) return "invalid";

  if (!(input.budget ?? defaultWriteBudget).take()) return "rate_limited";
  try {
    await input.store.record({ normalizedQuery, noClick: !clicked, resultCount });
    return "stored";
  } catch {
    return "store_error";
  }
}

/**
 * Read a request body but give up (null) once it passes the cap, so an
 * oversized or endless body is never held in memory in full.
 */
export async function readBodyCapped(
  body: ReadableStream<Uint8Array> | null,
  maxBytes: number = MAX_UNMET_BODY_BYTES,
): Promise<string | null> {
  if (!body) return null;
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => {});
        return null;
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}
