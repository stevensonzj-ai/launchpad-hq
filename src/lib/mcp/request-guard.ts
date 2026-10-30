/**
 * /mcp request guard, run BEFORE mcp-handler sees the request (G2, G3, G8).
 *
 * - Origin: an absent Origin is allowed. AI platforms (Claude, ChatGPT, Grok
 *   and others) call remote MCP servers from their own servers, which send
 *   no Origin. A browser Origin must be in MCP_ALLOWED_ORIGINS, otherwise
 *   the reply is 403 and only the rejected origin's host is logged
 *   (DNS-rebinding guidance in the MCP Streamable HTTP spec).
 * - Size: a body over MCP_MAX_BODY_BYTES is refused with 413. A declared
 *   Content-Length is checked first; a body without one (chunked) is
 *   counted while it streams and reading stops at the limit.
 * - Batches: a JSON-RPC batch over MCP_MAX_BATCH messages is refused with a
 *   400 JSON-RPC "Invalid Request" error.
 *
 * Errors are JSON-RPC 2.0 objects, the same shape as http-errors.ts.
 */
import { absoluteUrl } from "@/lib/site";

export const MCP_MAX_BODY_BYTES = 64 * 1024;
export const MCP_MAX_BATCH = 10;

/**
 * Browser origins allowed to call /mcp. Extend this list to add a client.
 * Our own site, plus the web apps of AI platforms we list on. Claude's docs
 * say its connectors call from Anthropic's servers (no Origin), so these
 * are a safe allowance for browser-side clients, not a requirement.
 */
export const MCP_ALLOWED_ORIGINS: readonly string[] = [
  "https://www.launchpadhq.io",
  "https://launchpadhq.io",
  "https://claude.ai",
  "https://claude.com",
  "https://chatgpt.com",
  "https://chat.openai.com",
  "https://grok.com",
  "https://x.ai",
  "https://x.com",
];

/** Our own deployment URLs (previews) are allowed too. */
function deploymentOrigins(env: Record<string, string | undefined> = process.env): string[] {
  return [env.VERCEL_URL, env.VERCEL_BRANCH_URL, env.VERCEL_PROJECT_PRODUCTION_URL]
    .filter((h): h is string => !!h)
    .map((h) => `https://${h}`);
}

export function isAllowedOrigin(origin: string | null, env?: Record<string, string | undefined>): boolean {
  if (origin === null || origin === "") return true;
  const o = origin.toLowerCase().replace(/\/$/, "");
  return MCP_ALLOWED_ORIGINS.includes(o) || deploymentOrigins(env).includes(o);
}

function originHost(origin: string): string {
  try {
    return new URL(origin).host.slice(0, 100);
  } catch {
    return "invalid";
  }
}

const CONNECTOR_URL = absoluteUrl("/connector");

function rpcError(status: number, code: number, message: string, dataCode: string, resolution: string): Response {
  return new Response(
    JSON.stringify({ jsonrpc: "2.0", error: { code, message, data: { code: dataCode, resolution } }, id: null }),
    { status, headers: { "content-type": "application/json", "cache-control": "no-store" } },
  );
}

export function tooLarge(): Response {
  return rpcError(
    413,
    -32600,
    `Invalid Request: body must not exceed ${MCP_MAX_BODY_BYTES} bytes`,
    "payload_too_large",
    `Send one small JSON-RPC message per request. Setup: ${CONNECTOR_URL}.`,
  );
}

/** Reads at most `limit` bytes; null when the body is larger. */
export async function readCapped(body: ReadableStream<Uint8Array> | null, limit: number): Promise<Uint8Array | null> {
  if (!body) return new Uint8Array(0);
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let at = 0;
  for (const c of chunks) {
    out.set(c, at);
    at += c.byteLength;
  }
  return out;
}

export type GuardResult = { response: Response } | { request: Request };

export async function guardMcpRequest(
  request: Request,
  opts: { log?: (line: string) => void; env?: Record<string, string | undefined> } = {},
): Promise<GuardResult> {
  const log = opts.log ?? ((line: string) => console.warn(line));
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin, opts.env)) {
    log(JSON.stringify({ evt: "mcp_origin_rejected", origin_host: originHost(origin!) }));
    return {
      response: rpcError(403, -32000, "Forbidden: Origin not allowed", "forbidden", `Browser origins must be allow-listed. Setup: ${CONNECTOR_URL}.`),
    };
  }
  if (request.method !== "POST") return { request };

  const declared = request.headers.get("content-length");
  if (declared !== null && Number(declared) > MCP_MAX_BODY_BYTES) return { response: tooLarge() };

  const bytes = await readCapped(request.body, MCP_MAX_BODY_BYTES);
  if (bytes === null) return { response: tooLarge() };

  const text = new TextDecoder().decode(bytes);
  try {
    const parsed: unknown = JSON.parse(text);
    if (Array.isArray(parsed) && parsed.length > MCP_MAX_BATCH) {
      return {
        response: rpcError(
          400,
          -32600,
          `Invalid Request: Batch must not exceed ${MCP_MAX_BATCH} messages`,
          "bad_request",
          `Send at most ${MCP_MAX_BATCH} JSON-RPC messages per batch, or one per request. Setup: ${CONNECTOR_URL}.`,
        ),
      };
    }
  } catch {
    // Not JSON: mcp-handler returns its own parse error.
  }

  // The body is re-sent as text, so its old length/encoding headers are dropped.
  const headers = new Headers(
    [...request.headers].filter(([name]) => !/^(content-length|transfer-encoding)$/i.test(name)),
  );
  return { request: new Request(request.url, { method: "POST", headers, body: text }) };
}
