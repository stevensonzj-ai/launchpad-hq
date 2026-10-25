/** Shared response helpers for the /data/v1 feed routes. */

const HOURLY = "public, s-maxage=3600, stale-while-revalidate=86400";

const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "X-Robots-Tag": "noindex",
} as const;

export function feedHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return { ...BASE_HEADERS, "Cache-Control": HOURLY, ...extra };
}

export function feedJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: feedHeaders() });
}

export function feedNotFound(): Response {
  return feedJson({ error: "not_found" }, 404);
}

export function feedRedirect(location: string): Response {
  return new Response(null, { status: 301, headers: feedHeaders({ Location: location }) });
}
