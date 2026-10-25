import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { createMcpHandler } from "mcp-handler";
import { FIXTURE_ROWS, fixtureFacts } from "./fixtures";
import { withMcpErrorHints } from "./http-errors";
import { MCP_SERVER_INSTRUCTIONS, MCP_SERVER_NAME, MCP_SERVER_VERSION, registerLaunchpadTools } from "./server";

const inner = createMcpHandler(
  (server) => registerLaunchpadTools(server, { loadCatalog: async () => FIXTURE_ROWS, facts: fixtureFacts, log: () => {} }),
  { serverInfo: { name: MCP_SERVER_NAME, version: MCP_SERVER_VERSION }, instructions: MCP_SERVER_INSTRUCTIONS },
);
const handler = async (request: Request) => withMcpErrorHints(await inner(request));

const RPC_HEADERS = { "content-type": "application/json", accept: "application/json, text/event-stream" };

describe("/mcp transport errors", () => {
  it("a GET keeps the protocol's 405 and JSON-RPC error, plus a resolution in error.data", async () => {
    const res = await handler(new Request("https://www.launchpadhq.io/mcp", { method: "GET" }));
    assert.equal(res.status, 405);
    assert.equal(res.headers.get("allow"), "POST");
    const body = await res.json();
    assert.equal(body.jsonrpc, "2.0");
    assert.equal(body.error.code, -32000);
    assert.equal(typeof body.error.message, "string");
    assert.equal(body.error.data.code, "method_not_allowed");
    assert.match(body.error.data.resolution, /POST/);
    // Nothing beside code/message/data: clients validate the error object strictly.
    assert.deepEqual(Object.keys(body.error).sort(), ["code", "data", "message"]);
  });

  it("bad JSON keeps the -32700 parse error and gains a hint", async () => {
    const res = await handler(new Request("https://www.launchpadhq.io/mcp", { method: "POST", headers: RPC_HEADERS, body: "{nope" }));
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error.code, -32700);
    assert.equal(body.error.data.code, "bad_request");
  });

  it("a missing Accept says which header to send", async () => {
    const res = await handler(
      new Request("https://www.launchpadhq.io/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
      }),
    );
    assert.equal(res.status, 406);
    assert.match((await res.json()).error.data.resolution, /text\/event-stream/);
  });

  it("leaves successful protocol responses untouched", async () => {
    const res = await handler(
      new Request("https://www.launchpadhq.io/mcp", {
        method: "POST",
        headers: { ...RPC_HEADERS, "mcp-protocol-version": "2025-06-18" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "1" } },
        }),
      }),
    );
    assert.equal(res.status, 200);
    const text = await res.text();
    assert.match(text, /launchpad-hq/);
    assert.doesNotMatch(text, /resolution/);
  });

  it("the route wraps the handler and answers PUT/PATCH through it", () => {
    const route = readFileSync("src/app/mcp/route.ts", "utf8");
    assert.match(route, /withMcpErrorHints\(await mcpHandler\(request\)\)/);
    assert.match(route, /handler as PUT, handler as PATCH/);
  });
});
