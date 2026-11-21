import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { CONTACT_EMAIL } from "@/lib/site-copy";

/** CONTACT_EMAIL (src/lib/site-copy.ts) is the only place the address is written. */

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mdx?)$/.test(name)) out.push(p.replace(/\\/g, "/"));
  }
  return out;
}

describe("contact email constant", () => {
  const files = [...walk("src/app"), ...walk("src/components")];

  it("the address is not hard-coded anywhere in src/app or src/components", () => {
    assert.ok(files.length > 50, "expected to scan the app and component trees");
    const hits = files.filter((f) => readFileSync(f, "utf8").toLowerCase().includes(CONTACT_EMAIL.toLowerCase()));
    assert.deepEqual(hits, []);
  });

  it("every page that shows the address imports the constant", () => {
    for (const f of [
      "src/app/(app)/advertise/page.tsx",
      "src/app/(app)/connector/page.tsx",
      "src/app/(app)/contact/page.tsx",
      "src/app/(app)/how-we-make-money/page.tsx",
      "src/app/(app)/privacy/page.tsx",
      "src/app/(app)/support/page.tsx",
      "src/app/(app)/terms/page.tsx",
      "src/components/sponsors/advertise-guidelines.tsx",
    ]) {
      assert.match(readFileSync(f, "utf8"), /import \{[^}]*\bCONTACT_EMAIL\b[^}]*\} from "@\/lib\/site-copy"/, f);
    }
  });
});
