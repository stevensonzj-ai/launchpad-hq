import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

// G10: public catalog reads use the SELECT-only client; writes stay on `prisma`.
const READ_ONLY_FILES = [
  "src/app/api/platforms/[slug]/route.ts",
  "src/app/api/platforms/route.ts",
  "src/app/api/search/route.ts",
  "src/lib/platforms.ts",
  "src/lib/catalog-queries.ts",
  "src/lib/catalog-names.ts",
  "src/lib/platform-slugs.ts",
  "src/lib/compare-data.ts",
  "src/lib/mcp/catalog.ts",
  "src/lib/recommendations-core.ts",
];

describe("G10 read-only database client", () => {
  it("db.ts uses DATABASE_URL_READONLY when set and falls back to the main client", () => {
    const src = read("src/lib/db.ts");
    assert.match(src, /export const prismaRead/);
    assert.match(src, /process\.env\.DATABASE_URL_READONLY\s*\?\s*createPrisma\(getDirectUrl\(process\.env\.DATABASE_URL_READONLY\)\)\s*:\s*prisma/);
  });

  for (const rel of READ_ONLY_FILES) {
    it(`${rel} reads through prismaRead and never writes`, () => {
      const src = read(rel);
      assert.match(src, /import \{ prismaRead as prisma \} from "@\/lib\/db";/);
      assert.doesNotMatch(src, /\.(create|createMany|update|updateMany|upsert|delete|deleteMany)\(|\$executeRaw|\$queryRaw|\$transaction/);
    });
  }
});
