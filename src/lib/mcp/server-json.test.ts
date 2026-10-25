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
    websiteUrl: string;
    icons: { src: string; mimeType: string; sizes: string[] }[];
    remotes: { type: string; url: string }[];
    packages?: { identifier?: string; version?: string }[];
  };

  it("points at the production Streamable HTTP endpoint", () => {
    assert.equal(json.remotes[0].type, "streamable-http");
    assert.equal(json.remotes[0].url, "https://www.launchpadhq.io/mcp");
  });

  it("matches the server version constant", () => {
    assert.equal(json.version, MCP_SERVER_VERSION);
  });

  it("keeps every package version equal to the server version constant", () => {
    // Remote-only today (no packages); any package added later must match.
    for (const pkg of json.packages ?? []) {
      assert.equal(pkg.version, MCP_SERVER_VERSION, pkg.identifier ?? "package");
    }
  });

  it("uses the approved registry name in reverse-DNS form", () => {
    assert.equal(json.name, "io.launchpadhq/launchpad-hq");
    assert.match(json.name, /^[a-zA-Z0-9.-]+\/[a-zA-Z0-9._-]+$/);
  });

  it("links the public connector docs page", () => {
    assert.equal(json.websiteUrl, "https://www.launchpadhq.io/connector");
  });

  it("serves every icon over https from www.launchpadhq.io with an allowed mime type", () => {
    const allowed = new Set(["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"]);
    assert.ok(json.icons.length > 0);
    for (const icon of json.icons) {
      assert.ok(icon.src.startsWith("https://www.launchpadhq.io/"), icon.src);
      assert.ok(allowed.has(icon.mimeType), icon.mimeType);
    }
  });

  it("uses the 2025-12-11 schema and fits its 100-character description limit", () => {
    assert.match(json.$schema, /schemas\/2025-12-11\/server\.schema\.json$/);
    assert.ok(json.description.length <= 100);
  });
});
