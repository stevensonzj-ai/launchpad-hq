import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { MCP_SERVER_VERSION } from "./server";

describe("server.json (MCP Registry metadata)", () => {
  const json = JSON.parse(readFileSync("server.json", "utf8")) as {
    $schema: string;
    name: string;
    description: string;
    version: string;
    remotes: { type: string; url: string }[];
  };

  it("points at the production Streamable HTTP endpoint", () => {
    assert.equal(json.remotes[0].type, "streamable-http");
    assert.equal(json.remotes[0].url, "https://www.launchpadhq.io/mcp");
  });

  it("matches the server version constant", () => {
    assert.equal(json.version, MCP_SERVER_VERSION);
  });

  it("keeps the deliberately unpublishable placeholder name", () => {
    assert.equal(json.name, "PLACEHOLDER/launchpad-hq");
  });

  it("uses the 2025-12-11 schema and fits its 100-character description limit", () => {
    assert.match(json.$schema, /schemas\/2025-12-11\/server\.schema\.json$/);
    assert.ok(json.description.length <= 100);
  });
});
