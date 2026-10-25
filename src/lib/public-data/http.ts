/** Shared response helpers for the /data/v1 feed routes. */

const HOURLY = "public, s-maxage=3600, stale-while-revalidate=86400";
// Short so a newly added tool stops 404ing within a minute or two.
const NOT_FOUND_CACHE = "public, s-maxage=60, stale-while-revalidate=60";

const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "X-Robots-Tag": "noindex",
} as const;

export function feedHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return { ...BASE_HEADERS, "Cache-Control": HOURLY, ...extra };
}

export function feedJson(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: feedHeaders(extra) });
}

export function feedNotFound(): Response {
  return feedJson({ error: "not_found" }, 404, { "Cache-Control": NOT_FOUND_CACHE });
}

export function feedRedirect(location: string): Response {
  return new Response(null, { status: 301, headers: feedHeaders({ Location: location }) });
}

/** DB unreachable: JSON (not Next's HTML 500), never cached. */
export function feedUnavailable(): Response {
  return feedJson({ error: "unavailable" }, 503, { "Cache-Control": "no-store" });
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
