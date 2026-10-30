import { randomUUID } from "node:crypto";

/**
 * One structured JSON line per MCP tool call, written to stdout (Vercel
 * runtime logs). Records ONLY these fields:
 *   evt, request_id (random, per call), tool, result_count, latency_ms, ok.
 * Never logs what was sent to the tool (task text, tool names), client info,
 * IP, headers, user agent, cookies or the request body.
 */
export type McpCallLog = {
  evt: "mcp_call";
  request_id: string;
  tool: string;
  result_count: number;
  latency_ms: number;
  ok: boolean;
};

export function buildCallLog(input: {
  tool: string;
  resultCount: number;
  latencyMs: number;
  ok: boolean;
  requestId?: string;
}): McpCallLog {
  return {
    evt: "mcp_call",
    request_id: input.requestId ?? randomUUID(),
    tool: input.tool,
    result_count: input.resultCount,
    latency_ms: Math.max(0, Math.round(input.latencyMs)),
    ok: input.ok,
  };
}

export function logCall(entry: McpCallLog): void {
  console.log(JSON.stringify(entry));
}
