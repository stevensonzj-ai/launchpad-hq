import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { describe, it } from "node:test";
import { FEED_CHANGELOG } from "./changelog";
import { openApiDocument, PublicIndex, SCHEMA_VERSION, TOOL_SCHEMA_ID, toolJsonSchema } from "./schema";
import { toPublicIndex } from "./serialize";

const SNAPSHOT = "src/lib/public-data/tool-schema.snapshot.json";

describe("PublicTool JSON Schema", () => {
  it("matches the committed snapshot", () => {
    const current = toolJsonSchema();
    // Regenerate with: UPDATE_SCHEMA_SNAPSHOT=1 npx tsx --test src/lib/public-data/schema.test.ts
    if (process.env.UPDATE_SCHEMA_SNAPSHOT === "1") {
      writeFileSync(SNAPSHOT, `${JSON.stringify(current, null, 2)}\n`);
    }
    const committed = JSON.parse(readFileSync(SNAPSHOT, "utf8"));
    assert.deepEqual(
      current,
      committed,
      "The public tool schema changed. Bump SCHEMA_VERSION in src/lib/public-data/schema.ts, then regenerate the snapshot.",
    );
  });

  it("pins schema_version and carries an $id", () => {
    const schema = toolJsonSchema() as { $id: string; properties: { schema_version: { const: string } } };
    assert.equal(schema.$id, TOOL_SCHEMA_ID);
    assert.equal(schema.properties.schema_version.const, SCHEMA_VERSION);
  });

  it("describes every feed route in OpenAPI 3.1", () => {
    const doc = openApiDocument() as { openapi: string; paths: Record<string, unknown>; components: { schemas: Record<string, unknown> } };
    assert.equal(doc.openapi, "3.1.0");
    assert.deepEqual(Object.keys(doc.paths).sort(), [
      "/catalog.json",
      "/compare/index.json",
      "/compare/{slug}.json",
      "/guides/index.json",
      "/guides/{slug}.json",
      "/index.json",
      "/models/compare/claude-vs-gpt.json",
      "/models/index.json",
      "/models/{slug}.json",
      "/openapi.json",
      "/quiz.json",
      "/schema/tool.json",
      "/tools/{slug}.json",
      "/workflows/index.json",
      "/workflows/{slug}.json",
    ]);
    const compare = (doc.paths["/compare/{slug}.json"] as { get: { responses: Record<string, unknown> } }).get;
    assert.deepEqual(Object.keys(compare.responses).sort(), ["200", "301", "404"]);
    for (const name of [
      "PublicTool",
      "PublicCatalog",
      "PublicIndex",
      "PublicToolSummary",
      "PublicComparePage",
      "PublicCompareIndex",
      "PublicGuide",
      "PublicGuideIndex",
      "PublicWorkflow",
      "PublicWorkflowIndex",
      "PublicModelFamily",
      "PublicModelsIndex",
      "PublicModelCompare",
      "PublicQuiz",
      "Error",
    ]) {
      assert.ok(doc.components.schemas[name], name);
    }
  });

  it("gives every operation a unique operationId, a description and a typed 200", () => {
    const doc = openApiDocument() as {
      info: { description: string };
      paths: Record<string, Record<string, { operationId?: string; description?: string; summary?: string; responses: Record<string, { content?: unknown }> }>>;
    };
    const ops = Object.entries(doc.paths).flatMap(([path, methods]) =>
      Object.entries(methods).map(([method, op]) => ({ path, method, ...op })),
    );
    assert.equal(ops.length, 15);
    const ids = ops.map((op) => op.operationId);
    assert.equal(new Set(ids).size, ops.length, "operationIds are unique");
    for (const op of ops) {
      assert.equal(op.method, "get", op.path);
      assert.match(op.operationId ?? "", /^[a-z][A-Za-z]+$/, op.path);
      assert.ok((op.description ?? "").length > 20, `${op.path} description`);
      assert.ok(op.summary, `${op.path} summary`);
      assert.ok(op.responses["200"].content, `${op.path} 200 has a schema`);
    }
    assert.deepEqual(ids.sort(), [
      "getCatalog",
      "getClaudeVsGpt",
      "getComparePage",
      "getFeedIndex",
      "getGuide",
      "getModelFamily",
      "getOpenApi",
      "getQuiz",
      "getTool",
      "getToolJsonSchema",
      "getWorkflow",
      "listComparePages",
      "listGuides",
      "listModelFamilies",
      "listWorkflows",
    ]);
    assert.match(doc.info.description, /DISCONTINUED/);
    assert.match(doc.info.description, /"error": \{ "code", "message", "resolution" \}/);
  });

  it("documents the error envelope as the Error schema", () => {
    const doc = openApiDocument() as { components: { schemas: { Error: { properties: { error: { properties: Record<string, unknown> } } } } } };
    assert.deepEqual(Object.keys(doc.components.schemas.Error.properties.error.properties).sort(), ["code", "field", "message", "resolution"]);
  });
});

describe("feed changelog", () => {
  it("is in the index, newest first, and records the DISCONTINUED cost tier", () => {
    const index = toPublicIndex({ generated_at: "2026-10-25T00:00:00.000Z", count: 1, categories: [] });
    assert.deepEqual(index.changelog, [...FEED_CHANGELOG]);
    const dates = index.changelog.map((c) => c.date);
    assert.deepEqual([...dates].sort().reverse(), dates);
    assert.ok(index.changelog.some((c) => /cost_tier can be "DISCONTINUED"/.test(c.summary)));
    assert.equal(index.links.developers, "https://www.launchpadhq.io/developers");
    PublicIndex.parse(index);
  });
});
