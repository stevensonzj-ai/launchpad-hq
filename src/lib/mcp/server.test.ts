import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { FIXTURE_ROWS, fixtureFacts } from "./fixtures";
import type { McpCallLog } from "./log";
import {
  MCP_SERVER_INFO,
  MCP_SERVER_INSTRUCTIONS,
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
  registerLaunchpadTools,
  runTool,
  TOOL_SPECS,
} from "./server";

function deps(logs: McpCallLog[] = []) {
  return {
    loadCatalog: async () => FIXTURE_ROWS,
    facts: fixtureFacts,
    log: (entry: McpCallLog) => logs.push(entry),
  };
}

function buildHandler(logs: McpCallLog[] = []) {
  return createMcpHandler((server) => registerLaunchpadTools(server, deps(logs)), {
    serverInfo: MCP_SERVER_INFO,
    instructions: MCP_SERVER_INSTRUCTIONS,
  });
}

/** Parses a JSON or single-event SSE body into the JSON-RPC message. */
async function rpcBody(res: Response): Promise<{ result?: Record<string, unknown>; error?: unknown }> {
  const text = await res.text();
  const type = res.headers.get("content-type") ?? "";
  if (type.includes("text/event-stream")) {
    const data = text
      .split("\n")
      .filter((l) => l.startsWith("data:"))
      .map((l) => l.slice(5).trim())
      .filter(Boolean);
    return JSON.parse(data[data.length - 1]);
  }
  return JSON.parse(text);
}

async function rpc(handler: (r: Request) => Promise<Response>, method: string, params: unknown, id = 1) {
  const res = await handler(
    new Request("https://www.launchpadhq.io/mcp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json, text/event-stream",
        "mcp-protocol-version": "2025-06-18",
      },
      body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
    }),
  );
  return { status: res.status, body: await rpcBody(res) };
}

describe("tool specs", () => {
  it("defines exactly four uniquely named tools with titles, schemas and descriptions", () => {
    assert.equal(TOOL_SPECS.length, 4);
    const names = TOOL_SPECS.map((t) => t.name);
    assert.deepEqual(new Set(names).size, 4);
    assert.deepEqual(names, ["search_tools", "compare", "get_pricing_facts", "find_free_alternatives"]);
    for (const t of TOOL_SPECS) {
      assert.ok(t.title.length > 0);
      assert.match(t.description, /^Use this when/);
      assert.ok(t.inputSchema instanceof z.ZodType);
      assert.ok(t.outputSchema instanceof z.ZodType);
    }
  });

  it("keeps the first 512 characters of the instructions self-contained", () => {
    const first = MCP_SERVER_INSTRUCTIONS.slice(0, 512);
    assert.match(first, /Launchpad HQ/);
    assert.match(first, /catalog_only/);
    assert.match(first, /launchpadhq\.io/);
    assert.match(first, /Sponsorship never affects results/);
  });

  it("fits the instructions in 512 characters and describes the data rather than directing the assistant", () => {
    assert.ok(MCP_SERVER_INSTRUCTIONS.length <= 512, String(MCP_SERVER_INSTRUCTIONS.length));
    assert.doesNotMatch(MCP_SERVER_INSTRUCTIONS, /say so|tell users/);
  });
});

describe("runTool", () => {
  it("returns structuredContent and the same JSON as text, and logs one line without PII", async () => {
    const logs: McpCallLog[] = [];
    const spec = TOOL_SPECS.find((t) => t.name === "search_tools")!;
    const result = await runTool(spec, { task: "meeting transcription" }, deps(logs));
    assert.ok("structuredContent" in result && result.structuredContent);
    assert.equal(result.content[0].text, JSON.stringify(result.structuredContent));
    assert.equal(logs.length, 1);
    assert.deepEqual(Object.keys(logs[0]).sort(), [
      "client", "evt", "latency_ms", "ok", "query", "result_count", "tool", "ts",
    ]);
    assert.equal(logs[0].evt, "mcp_call");
    assert.equal(logs[0].ok, true);
  });

  it("returns isError with a short message, never a stack trace", async () => {
    const spec = TOOL_SPECS.find((t) => t.name === "get_pricing_facts")!;
    const result = await runTool(spec, { platform: "not-a-tool" }, deps());
    assert.equal("isError" in result && result.isError, true);
    assert.equal(
      result.content[0].text,
      'Not in the Launchpad HQ catalog: "not-a-tool". Try search_tools to find the right name or slug.',
    );

    const tooLong = await runTool(spec, { platform: "x".repeat(201) }, deps());
    assert.equal("isError" in tooLong && tooLong.isError, true);
    assert.ok(!/at .*\.ts:\d+/.test(tooLong.content[0].text));
  });

  it("truncates logged queries to 200 characters", async () => {
    const logs: McpCallLog[] = [];
    const spec = TOOL_SPECS.find((t) => t.name === "compare")!;
    await runTool(spec, { platforms: ["notey", "freenote", "x".repeat(150)] }, deps(logs));
    assert.ok((logs[0].query ?? "").length <= 200);
  });
});

describe("MCP handler (in-process, no network)", () => {
  it("lists exactly four read-only tools with annotations and output schemas", async () => {
    const handler = buildHandler();
    const init = await rpc(handler, "initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "test-client", version: "1.0.0" },
    });
    assert.equal(init.status, 200);
    const serverInfo = (
      init.body.result as {
        serverInfo?: { name: string; version: string; icons?: { src: string; mimeType?: string; sizes?: string[] }[] };
      }
    ).serverInfo;
    assert.equal(serverInfo?.name, MCP_SERVER_NAME);
    assert.equal(serverInfo?.version, MCP_SERVER_VERSION);
    // Brand icon for client UIs (Claude's connector list), same PNG as server.json.
    assert.deepEqual(serverInfo?.icons, [
      { src: "https://www.launchpadhq.io/brand/launchpad-hq-512.png", mimeType: "image/png", sizes: ["512x512"] },
    ]);

    const list = await rpc(handler, "tools/list", {}, 2);
    const tools = (list.body.result as { tools: Record<string, unknown>[] }).tools;
    assert.equal(tools.length, 4);
    for (const tool of tools) {
      const ann = tool.annotations as Record<string, unknown>;
      assert.equal(ann.readOnlyHint, true);
      assert.equal(ann.destructiveHint, false);
      assert.equal(ann.idempotentHint, true);
      assert.equal(ann.openWorldHint, false);
      assert.ok(tool.title);
      assert.ok(tool.outputSchema, `${tool.name} has an output schema`);
    }
  });

  it("answers a tools/call with structuredContent", async () => {
    const handler = buildHandler();
    await rpc(handler, "initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "test-client", version: "1.0.0" },
    });
    const call = await rpc(
      handler,
      "tools/call",
      { name: "get_pricing_facts", arguments: { platform: "notey" } },
      3,
    );
    const result = call.body.result as { structuredContent?: { verification: string }; isError?: boolean };
    assert.ok(!result.isError);
    assert.equal(result.structuredContent?.verification, "verified");
  });

  it("does not 500 on a plain browser GET", async () => {
    const handler = buildHandler();
    const res = await handler(new Request("https://www.launchpadhq.io/mcp", { method: "GET" }));
    assert.ok(res.status < 500, `status ${res.status}`);
  });

  it("advertises the 2026-07-28 protocol to modern clients", async () => {
    const handler = buildHandler();
    const res = await handler(
      new Request("https://www.launchpadhq.io/mcp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json, text/event-stream",
          "mcp-protocol-version": "2026-07-28",
          "mcp-method": "server/discover",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "server/discover",
          params: {
            _meta: {
              "io.modelcontextprotocol/protocolVersion": "2026-07-28",
              "io.modelcontextprotocol/clientInfo": { name: "test-client", version: "1.0.0" },
              "io.modelcontextprotocol/clientCapabilities": {},
            },
          },
        }),
      }),
    );
    assert.equal(res.status, 200);
    const body = await rpcBody(res);
    assert.deepEqual((body.result as { supportedVersions: string[] }).supportedVersions, ["2026-07-28"]);
  });

  it("negotiates a 2025 protocol version for legacy initialize clients", async () => {
    const handler = buildHandler();
    for (const version of ["2025-11-25", "2025-06-18"]) {
      const res = await handler(
        new Request("https://www.launchpadhq.io/mcp", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json, text/event-stream",
            "mcp-protocol-version": version,
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "initialize",
            params: { protocolVersion: version, capabilities: {}, clientInfo: { name: "t", version: "1" } },
          }),
        }),
      );
      const body = await rpcBody(res);
      assert.equal((body.result as { protocolVersion: string }).protocolVersion, version);
    }
  });
});
