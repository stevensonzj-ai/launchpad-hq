import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  MCP_ALLOWED_ORIGINS,
  MCP_MAX_BATCH,
  MCP_MAX_BODY_BYTES,
  guardMcpRequest,
  isAllowedOrigin,
} from "./request-guard";

const URL_ = "https://www.launchpadhq.io/mcp";
const H = { "content-type": "application/json", accept: "application/json, text/event-stream" };
const call = (id: number) => ({ jsonrpc: "2.0", id, method: "tools/call", params: { name: "search_tools", arguments: { task: "x" } } });
const quiet = { log: () => {}, env: {} };

describe("/mcp request guard: Origin (G8)", () => {
  it("allows an absent Origin (server-to-server clients)", async () => {
    const r = await guardMcpRequest(new Request(URL_, { method: "POST", headers: H, body: "{}" }), quiet);
    assert.ok("request" in r);
  });
  it("allows each listed origin, case-insensitively", () => {
    for (const o of MCP_ALLOWED_ORIGINS) assert.ok(isAllowedOrigin(o.toUpperCase(), {}), o);
    for (const o of ["https://claude.ai", "https://chatgpt.com", "https://grok.com", "https://x.ai"]) assert.ok(isAllowedOrigin(o, {}));
  });
  it("allows our own preview deployment origin", () => {
    assert.ok(isAllowedOrigin("https://launchpad-abc.vercel.app", { VERCEL_URL: "launchpad-abc.vercel.app" }));
  });
  it("rejects other origins with 403 JSON-RPC and logs only the host", async () => {
    const lines: string[] = [];
    const r = await guardMcpRequest(
      new Request(URL_, { method: "POST", headers: { ...H, origin: "https://evil.example:8443" }, body: "{}" }),
      { log: (l) => lines.push(l), env: {} },
    );
    assert.ok("response" in r);
    assert.equal(r.response.status, 403);
    const body = await r.response.json();
    assert.equal(body.jsonrpc, "2.0");
    assert.equal(body.id, null);
    assert.deepEqual(JSON.parse(lines[0]), { evt: "mcp_origin_rejected", origin_host: "evil.example:8443" });
  });
  it("rejects lookalike origins", () => {
    for (const o of ["https://claude.ai.evil.com", "http://claude.ai", "https://evilchatgpt.com", "null"]) assert.ok(!isAllowedOrigin(o, {}), o);
  });
});

describe("/mcp request guard: body size (G3)", () => {
  it("413s on a declared Content-Length over the cap without reading", async () => {
    const req = new Request(URL_, { method: "POST", headers: { ...H, "content-length": String(MCP_MAX_BODY_BYTES + 1) }, body: "{}" });
    const r = await guardMcpRequest(req, quiet);
    assert.ok("response" in r);
    assert.equal(r.response.status, 413);
  });
  it("413s on a chunked body (no Content-Length) that grows over the cap", async () => {
    let sent = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(c) {
        if (sent > MCP_MAX_BODY_BYTES * 4) return c.close();
        sent += 8192;
        c.enqueue(new Uint8Array(8192).fill(32));
      },
    });
    const req = new Request(URL_, { method: "POST", headers: H, body: stream, duplex: "half" } as RequestInit);
    const r = await guardMcpRequest(req, quiet);
    assert.ok("response" in r);
    assert.equal(r.response.status, 413);
    assert.ok(sent <= MCP_MAX_BODY_BYTES + 3 * 8192, "stopped reading near the cap");
  });
  it("passes a body at the cap through intact", async () => {
    const msg = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "ping", params: { p: "" } });
    const pad = "x".repeat(MCP_MAX_BODY_BYTES - msg.length);
    const body = msg.replace('"p":""', `"p":"${pad.slice(0, pad.length)}"`);
    assert.equal(new TextEncoder().encode(body).length, MCP_MAX_BODY_BYTES);
    const r = await guardMcpRequest(new Request(URL_, { method: "POST", headers: H, body }), quiet);
    assert.ok("request" in r);
    assert.equal(await r.request.text(), body);
  });
});

describe("/mcp request guard: batches (G2)", () => {
  it(`allows ${MCP_MAX_BATCH} messages`, async () => {
    const body = JSON.stringify(Array.from({ length: MCP_MAX_BATCH }, (_, i) => call(i)));
    const r = await guardMcpRequest(new Request(URL_, { method: "POST", headers: H, body }), quiet);
    assert.ok("request" in r);
  });
  it(`rejects ${MCP_MAX_BATCH + 1} with a JSON-RPC -32600 error`, async () => {
    const body = JSON.stringify(Array.from({ length: MCP_MAX_BATCH + 1 }, (_, i) => call(i)));
    const r = await guardMcpRequest(new Request(URL_, { method: "POST", headers: H, body }), quiet);
    assert.ok("response" in r);
    assert.equal(r.response.status, 400);
    const j = await r.response.json();
    assert.equal(j.error.code, -32600);
    assert.match(j.error.message, /Batch must not exceed 10/);
    assert.deepEqual(Object.keys(j.error).sort(), ["code", "data", "message"]);
  });
  it("leaves non-JSON bodies to mcp-handler", async () => {
    const r = await guardMcpRequest(new Request(URL_, { method: "POST", headers: H, body: "not json" }), quiet);
    assert.ok("request" in r);
  });
});
