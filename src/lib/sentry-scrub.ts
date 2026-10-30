import type { Breadcrumb, Event } from "@sentry/nextjs";

/**
 * The /mcp connector's request bodies and query strings carry what an AI
 * assistant sent to a tool. Strip them from any Sentry event (error or
 * transaction) tied to /mcp, so Sentry never stores that text.
 */
function isMcpUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    return new URL(url, "https://www.launchpadhq.io").pathname.replace(/\/+$/, "") === "/mcp";
  } catch {
    return false;
  }
}

/**
 * /api/moderation carries a signed approve/reject token in its query string.
 * Strip the query from Sentry events for that route so the token is never
 * stored (security lead: moderation token URLs reaching Sentry).
 */
function isModerationUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    return new URL(url, "https://www.launchpadhq.io").pathname.replace(/\/+$/, "") === "/api/moderation";
  } catch {
    return false;
  }
}

function scrubModerationEvent<E extends Event>(event: E): E {
  if (event.request) {
    delete event.request.query_string;
    delete event.request.data;
    if (event.request.url) event.request.url = event.request.url.split("?")[0];
  }
  event.breadcrumbs = (event.breadcrumbs ?? []).map((b: Breadcrumb) =>
    typeof b.data?.url === "string" && b.data.url.includes("/api/moderation")
      ? { ...b, data: { ...b.data, url: b.data.url.split("?")[0] } }
      : b,
  );
  return event;
}

export function scrubMcpEvent<E extends Event>(event: E): E {
  if (
    isModerationUrl(event.request?.url) ||
    (event.transaction ?? "").replace(/^[A-Z]+ /, "").replace(/\/+$/, "") === "/api/moderation"
  ) {
    return scrubModerationEvent(event);
  }
  const isMcp =
    isMcpUrl(event.request?.url) ||
    (event.transaction ?? "").replace(/^[A-Z]+ /, "").replace(/\/+$/, "") === "/mcp";
  if (!isMcp) return event;
  if (event.request) {
    delete event.request.data;
    delete event.request.query_string;
    if (event.request.url) event.request.url = event.request.url.split("?")[0];
  }
  delete event.extra;
  event.breadcrumbs = (event.breadcrumbs ?? []).filter((b: Breadcrumb) => b.category !== "console");
  return event;
}
