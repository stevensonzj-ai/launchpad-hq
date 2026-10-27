import { createMcpHandler } from "mcp-handler";
import { loadCatalog } from "@/lib/mcp/catalog";
import { MCP_HANDLER_OPTIONS, registerLaunchpadTools } from "@/lib/mcp/server";
import { withMcpErrorHints } from "@/lib/mcp/http-errors";
import { capEventStream } from "@/lib/mcp/stream-cap";

/**
 * Launchpad HQ read-only MCP connector (v0.1): https://www.launchpadhq.io/mcp
 * Stateless Streamable HTTP via mcp-handler v2. No auth, no writes.
 * Public in src/proxy.ts (isPublicRoute) and disallowed in robots.ts.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

/** Any SSE body is ended by then, before maxDuration kills the function. */
const MCP_STREAM_CAP_MS = 8_000;

const mcpHandler = createMcpHandler((server) => {
  registerLaunchpadTools(server, { loadCatalog });
}, MCP_HANDLER_OPTIONS);

async function handler(request: Request): Promise<Response> {
  // Transport errors (405, 400, 406) gain a resolution hint in error.data.
  const response = capEventStream(await withMcpErrorHints(await mcpHandler(request)), MCP_STREAM_CAP_MS);
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// PUT and PATCH reach mcp-handler too, so they get its JSON-RPC 405 rather
// than Next's empty one.
export { handler as GET, handler as POST, handler as DELETE, handler as PUT, handler as PATCH };
