import { absoluteUrl } from "@/lib/site";
import type { ApiErrorCode } from "@/lib/api-error";

/**
 * /mcp transport errors (wrong method, bad JSON, wrong Accept) are already
 * JSON-RPC errors from mcp-handler: { jsonrpc, id: null, error: { code: -32000, message } }.
 * The numeric code and message are protocol and stay as they are. The
 * shared envelope's `code` and `resolution` go in `error.data`, the member
 * JSON-RPC reserves for extra detail; MCP clients validate the error object
 * strictly, so nothing is added beside code/message/data.
 * Tool errors (200 with isError) and successful streams are never touched.
 */
const CONNECTOR_URL = absoluteUrl("/connector");

const HINTS: Record<number, { code: ApiErrorCode; resolution: string }> = {
  400: {
    code: "bad_request",
    resolution: `Send a JSON-RPC 2.0 message as the POST body. Setup and examples: ${CONNECTOR_URL}.`,
  },
  405: {
    code: "method_not_allowed",
    resolution: `This is a stateless Streamable HTTP MCP server: POST JSON-RPC messages to it (no GET event stream). Setup: ${CONNECTOR_URL}.`,
  },
  406: {
    code: "bad_request",
    resolution: "Send the header Accept: application/json, text/event-stream.",
  },
  415: {
    code: "bad_request",
    resolution: "Send the header Content-Type: application/json.",
  },
};

type RpcError = { jsonrpc?: unknown; error?: { code?: unknown; message?: unknown; data?: unknown } };

export async function withMcpErrorHints(response: Response): Promise<Response> {
  const hint = HINTS[response.status];
  if (!hint || !(response.headers.get("content-type") ?? "").includes("application/json")) return response;
  const text = await response.text();
  let body: RpcError;
  try {
    body = JSON.parse(text) as RpcError;
  } catch {
    return new Response(text, { status: response.status, statusText: response.statusText, headers: response.headers });
  }
  const error = body?.error;
  if (body?.jsonrpc === "2.0" && error && typeof error === "object" && error.data === undefined) {
    error.data = { code: hint.code, resolution: hint.resolution };
  }
  // The body length changed; drop the stale content-length.
  const headers = new Headers([...response.headers].filter(([name]) => name.toLowerCase() !== "content-length"));
  return new Response(JSON.stringify(body), { status: response.status, statusText: response.statusText, headers });
}
