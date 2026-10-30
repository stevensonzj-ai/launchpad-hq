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

export function scrubMcpEvent<E extends Event>(event: E): E {
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
