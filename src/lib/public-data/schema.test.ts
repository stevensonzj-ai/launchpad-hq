import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { describe, it } from "node:test";
import { openApiDocument, SCHEMA_VERSION, TOOL_SCHEMA_ID, toolJsonSchema } from "./schema";

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
      "/index.json",
      "/openapi.json",
      "/schema/tool.json",
      "/tools/{slug}.json",
    ]);
    for (const name of ["PublicTool", "PublicCatalog", "PublicIndex", "Error"]) {
      assert.ok(doc.components.schemas[name], name);
    }
  });
});
