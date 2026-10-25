/** Shared response helpers for the /data/v1 feed routes. */
import { apiErrorBody, apiErrorStatus, type ApiErrorCode, type ApiErrorOptions } from "@/lib/api-error";
import { absoluteUrl } from "@/lib/site";

const HOURLY = "public, s-maxage=3600, stale-while-revalidate=86400";
// Short so a newly added tool stops 404ing within a minute or two.
const NOT_FOUND_CACHE = "public, s-maxage=60, stale-while-revalidate=60";

const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "X-Robots-Tag": "noindex",
} as const;

export const FEED_INDEX_URL = absoluteUrl("/data/v1/index.json");

export function feedHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return { ...BASE_HEADERS, "Cache-Control": HOURLY, ...extra };
}

export function feedJson(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: feedHeaders(extra) });
}

/** The shared error envelope (src/lib/api-error.ts) with the feed's CORS and noindex headers. */
export function feedError(code: ApiErrorCode, options: ApiErrorOptions = {}, extra: Record<string, string> = {}): Response {
  return feedJson(apiErrorBody(code, options), apiErrorStatus(code), { "Cache-Control": "no-store", ...extra });
}

export function feedNotFound(): Response {
  return feedError(
    "not_found",
    {
      message: "Nothing is published at this feed URL.",
      resolution: `Check the slug against ${absoluteUrl("/data/v1/catalog.json")} (tools) or start from the feed index at ${FEED_INDEX_URL}. Retired tool slugs redirect; unknown and unlisted ones return 404.`,
    },
    { "Cache-Control": NOT_FOUND_CACHE },
  );
}

/** The feed is read-only: anything but GET/HEAD gets a JSON 405. */
export function feedMethodNotAllowed(): Response {
  return feedError(
    "method_not_allowed",
    { message: "The data feed is read-only.", resolution: "Use GET (or HEAD). No API key or sign-in is needed." },
    { Allow: "GET, HEAD" },
  );
}

export function feedRedirect(location: string, status: 301 | 308 = 301): Response {
  return new Response(null, { status, headers: feedHeaders({ Location: location }) });
}

/** DB unreachable: JSON (not Next's HTML 500), never cached. */
export function feedUnavailable(): Response {
  return feedError("unavailable", {
    message: "The data feed could not reach its database.",
    resolution: "Retry in a minute or two.",
  });
}

/** Run a DB-backed route body; any throw becomes a logged 503. */
export async function withFeedErrors(handler: () => Promise<Response>): Promise<Response> {
  try {
    return await handler();
  } catch (error) {
    // Message only: driver errors can carry connection details in other fields.
    console.error("[data/v1] feed unavailable:", error instanceof Error ? error.message : "unknown error");
    return feedUnavailable();
  }
}
