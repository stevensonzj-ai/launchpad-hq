import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { createMcpHandler } from "mcp-handler";
import { FIXTURE_ROWS, fixtureFacts } from "./fixtures";
import { withMcpErrorHints } from "./http-errors";
import { MCP_HANDLER_OPTIONS, registerLaunchpadTools } from "./server";
import { capEventStream } from "./stream-cap";

/**
 * Every request shape that could hold the /mcp function open past Vercel's
 * 10 s maxDuration must finish (headers AND body) well inside it. Built from
 * the same options object the route uses, so a config drift fails here.
 */
const inner = createMcpHandler(
  (server) => registerLaunchpadTools(server, { loadCatalog: async () => FIXTURE_ROWS, facts: fixtureFacts, log: () => {} }),
  MCP_HANDLER_OPTIONS,
);
const handler = async (request: Request) => withMcpErrorHints(await inner(request));

const URL_ = "https://www.launchpadhq.io/mcp";
const BOTH = "application/json, text/event-stream";
const MODERN_META = {
  "io.modelcontextprotocol/protocolVersion": "2026-07-28",
  "io.modelcontextprotocol/clientInfo": { name: "test-client", version: "1.0.0" },
  "io.modelcontextprotocol/clientCapabilities": {},
};

/** Reads the whole body; fails if it hasn't ended within `ms`. */
async function settles(res: Response, ms = 2000): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`body still open after ${ms} ms; got: ${text.slice(0, 300)}`)), ms);
  });
  try {
    for (;;) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) return text;
      text += decoder.decode(value, { stream: true });
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function post(body: unknown, headers: Record<string, string> = {}) {
  return handler(
    new Request(URL_, {
      method: "POST",
      headers: { "content-type": "application/json", accept: BOTH, ...headers },
      body: JSON.stringify(body),
    }),
  );
}

describe("/mcp never holds the function open", () => {
  it("a modern subscriptions/listen asking for tool-list changes is acknowledged and closed", async () => {
    const res = await post(
      {
        jsonrpc: "2.0",
        id: 7,
        method: "subscriptions/listen",
        params: { notifications: { toolsListChanged: true }, _meta: MODERN_META },
      },
      { "mcp-protocol-version": "2026-07-28", "mcp-method": "subscriptions/listen" },
    );
    assert.equal(res.status, 200);
    const text = await settles(res);
    assert.match(text, /notifications\/subscriptions\/acknowledged/);
    assert.match(text, /"resultType":"complete"/);
  });

  it("a GET asking for an event stream gets a prompt 405 with Allow: POST", async () => {
    const res = await handler(new Request(URL_, { method: "GET", headers: { accept: "text/event-stream" } }));
    assert.equal(res.status, 405);
    assert.equal(res.headers.get("allow"), "POST");
    await settles(res);
  });

  it("a DELETE (session teardown) is answered promptly", async () => {
    const res = await handler(new Request(URL_, { method: "DELETE", headers: { "mcp-session-id": "abc" } }));
    assert.equal(res.status, 405);
    await settles(res);
  });

  it("a legacy notifications/initialized is acknowledged with 202 and no stream", async () => {
    const res = await post(
      { jsonrpc: "2.0", method: "notifications/initialized" },
      { "mcp-protocol-version": "2025-06-18" },
    );
    assert.equal(res.status, 202);
    assert.equal(await settles(res), "");
  });

  it("a posted JSON-RPC response is acknowledged with 202", async () => {
    const res = await post({ jsonrpc: "2.0", id: 1, result: {} }, { "mcp-protocol-version": "2025-06-18" });
    assert.equal(res.status, 202);
    await settles(res);
  });

  it("initialize without a session id, and a stray session id, both finish", async () => {
    const variants: Record<string, string>[] = [{}, { "mcp-session-id": "stale-session" }];
    for (const extra of variants) {
      const res = await post(
        {
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "1" } },
        },
        extra,
      );
      assert.ok(res.status < 500, `status ${res.status}`);
      await settles(res);
    }
  });

  it("a POST accepting only text/event-stream finishes", async () => {
    const res = await post(
      { jsonrpc: "2.0", id: 2, method: "tools/list" },
      { accept: "text/event-stream", "mcp-protocol-version": "2025-06-18" },
    );
    await settles(res);
  });

  it("legacy and modern tools/list both finish", async () => {
    await settles(await post({ jsonrpc: "2.0", id: 3, method: "tools/list" }, { "mcp-protocol-version": "2025-06-18" }));
    const modern = await post(
      { jsonrpc: "2.0", id: 4, method: "tools/list", params: { _meta: MODERN_META } },
      { "mcp-protocol-version": "2026-07-28", "mcp-method": "tools/list" },
    );
    assert.equal(modern.status, 200);
    assert.match(await settles(modern), /search_tools/);
  });
});

describe("capEventStream", () => {
  function endlessStream(): Response {
    let timer: ReturnType<typeof setInterval> | undefined;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(": open\n\n"));
        timer = setInterval(() => controller.enqueue(new TextEncoder().encode(": keepalive\n\n")), 20);
      },
      cancel() {
        clearInterval(timer);
      },
    });
    return new Response(body, { headers: { "content-type": "text/event-stream" } });
  }

  it("ends an event stream that would otherwise never close", async () => {
    const text = await settles(capEventStream(endlessStream(), 100), 1000);
    assert.match(text, /: open/);
  });

  it("passes a stream that ends on its own through unchanged", async () => {
    const res = new Response("event: message\ndata: {}\n\n", { headers: { "content-type": "text/event-stream" } });
    assert.equal(await settles(capEventStream(res, 1000)), "event: message\ndata: {}\n\n");
  });

  it("leaves JSON responses alone", () => {
    const res = Response.json({ ok: true });
    assert.equal(capEventStream(res, 10), res);
  });

  it("the route caps streams below its maxDuration and uses the shared options", () => {
    const route = readFileSync("src/app/mcp/route.ts", "utf8");
    const maxDuration = Number(/export const maxDuration = (\d+);/.exec(route)?.[1]);
    const cap = Number(/MCP_STREAM_CAP_MS = (\d[\d_]*);/.exec(route)?.[1].replace(/_/g, ""));
    assert.ok(cap > 0 && cap < maxDuration * 1000, `cap ${cap} ms vs maxDuration ${maxDuration} s`);
    assert.match(route, /capEventStream\(/);
    assert.match(route, /MCP_HANDLER_OPTIONS/);
  });
});
