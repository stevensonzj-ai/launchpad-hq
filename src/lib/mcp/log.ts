/**
 * One structured JSON line per MCP tool call, written to stdout (Vercel
 * runtime logs). Records ONLY these fields:
 *   evt, ts, tool, query (the task/platform input, truncated to 200 chars),
 *   result_count, latency_ms, ok, client (MCP clientInfo name/version if sent).
 * Never logs IP, headers, user agent, cookies or the full request body.
 */
export type McpCallLog = {
  evt: "mcp_call";
  ts: string;
  tool: string;
  query: string | null;
  result_count: number;
  latency_ms: number;
  ok: boolean;
  client: string | null;
};

export function buildCallLog(input: {
  tool: string;
  query?: string | null;
  resultCount: number;
  latencyMs: number;
  ok: boolean;
  client?: { name?: string; version?: string } | null;
  now?: Date;
}): McpCallLog {
  const client = input.client?.name
    ? `${input.client.name}${input.client.version ? `/${input.client.version}` : ""}`.slice(0, 100)
    : null;
  return {
    evt: "mcp_call",
    ts: (input.now ?? new Date()).toISOString(),
    tool: input.tool,
    query: input.query ? input.query.slice(0, 200) : null,
    result_count: input.resultCount,
    latency_ms: Math.max(0, Math.round(input.latencyMs)),
    ok: input.ok,
    client,
  };
}

export function logCall(entry: McpCallLog): void {
  console.log(JSON.stringify(entry));
}
