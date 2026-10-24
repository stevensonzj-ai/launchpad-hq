import { createMcpHandler } from "mcp-handler";
import { loadCatalog } from "@/lib/mcp/catalog";
import {
  MCP_SERVER_INSTRUCTIONS,
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
  registerLaunchpadTools,
} from "@/lib/mcp/server";

/**
 * Launchpad HQ read-only MCP connector (v0.1): https://www.launchpadhq.io/mcp
 * Stateless Streamable HTTP via mcp-handler v2. No auth, no writes.
 * Public in src/proxy.ts (isPublicRoute) and disallowed in robots.ts.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

const mcpHandler = createMcpHandler(
  (server) => {
    registerLaunchpadTools(server, { loadCatalog });
  },
  {
    serverInfo: { name: MCP_SERVER_NAME, version: MCP_SERVER_VERSION },
    instructions: MCP_SERVER_INSTRUCTIONS,
  },
);

async function handler(request: Request): Promise<Response> {
  const response = await mcpHandler(request);
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export { handler as GET, handler as POST, handler as DELETE };
