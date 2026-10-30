import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  AUDIT_22_NAME_RENAMES,
  AUDIT_22_RENAMES,
  audit22RefUpdates,
  audit22UpdateData,
  planAudit22Fields,
  preRenameSlug22,
} from "./audit-22";
import { REGISTERED_TOOL_FACTS } from "../facts/registry";
import { PLATFORM_REDIRECTS } from "../../lib/catalog-redirects";
import { NAME_ALIASES } from "../../lib/mcp/names";

describe("catalog audit 22: held renames", () => {
  it("slug renames 301 from the old slug; name-only renames keep their slugs", () => {
    assert.equal(PLATFORM_REDIRECTS["shopify-magic-sidekick"], "shopify-sidekick");
    assert.equal(PLATFORM_REDIRECTS["salesforce-einstein"], "salesforce-agentforce");
    for (const slug of ["google-lyria-3", "quizlet-q-chat", "gpt-image-1-5-dall-e-successor"]) {
      const r = AUDIT_22_RENAMES.find((x) => x.to === slug)!;
      assert.equal(r.from, slug);
      assert.equal(PLATFORM_REDIRECTS[slug], undefined, slug);
    }
  });

  it("every new name equals the fact file's displayName, and every row has an https source", () => {
    for (const r of AUDIT_22_RENAMES) {
      assert.equal(REGISTERED_TOOL_FACTS[r.to]?.displayName?.value, r.name, r.to);
      assert.ok(r.sources.length > 0 && r.sources.every((s) => s.startsWith("https://")), r.to);
      if (r.website) assert.equal(REGISTERED_TOOL_FACTS[r.to]?.officialUrl?.value, r.website, r.to);
    }
    assert.equal(REGISTERED_TOOL_FACTS["shopify-magic-sidekick"], undefined);
    assert.equal(REGISTERED_TOOL_FACTS["salesforce-einstein"], undefined);
  });

  it("MCP name aliases still resolve to slugs that keep a row (no MCP change needed)", () => {
    const renamedAway = new Set(AUDIT_22_RENAMES.filter((r) => r.from !== r.to).map((r) => r.from));
    for (const [alias, slug] of Object.entries(NAME_ALIASES)) {
      for (const target of [slug].flat()) assert.equal(renamedAway.has(target), false, alias);
    }
    assert.equal(NAME_ALIASES.lyria, "google-lyria-3");
    assert.equal(NAME_ALIASES.qchat, "quizlet-q-chat");
  });

  it("writes name/website only from the expected old value", () => {
    const shop = AUDIT_22_RENAMES[0];
    assert.deepEqual(audit22UpdateData(planAudit22Fields({ name: "Shopify Magic / Sidekick", website: "https://shopify.com/magic" }, shop)), {
      name: "Shopify Sidekick",
      website: "https://www.shopify.com/sidekick",
    });
    assert.deepEqual(audit22UpdateData(planAudit22Fields({ name: "Shopify Sidekick", website: "https://www.shopify.com/sidekick" }, shop)), {});
    const handEdited = planAudit22Fields({ name: "Something else", website: null }, shop);
    assert.deepEqual(handEdited.map((p) => p.action), ["differs", "differs"]);
    const lyria = AUDIT_22_RENAMES.find((r) => r.to === "google-lyria-3")!;
    assert.deepEqual(audit22UpdateData(planAudit22Fields({ name: "Google Lyria 3", website: "https://x" }, lyria)), { name: "Google Lyria 3.5" });
  });

  it("rewrites exact old-name references and leaves others alone", () => {
    const row = {
      directAlternatives: ["GPT Image 1.5", "Midjourney"],
      complementaryTools: ["Salesforce Einstein (CRM)", "HubSpot"],
      budgetAlternativeTo: ["Google Lyria 3 (music)"],
      privacyAlternativeTo: ["Quizlet Q-Chat (study)", "Shopify Magic (e-commerce)"],
    };
    const ups = audit22RefUpdates(row);
    assert.deepEqual(Object.fromEntries(ups.map((u) => [u.field, u.to])), {
      directAlternatives: ["GPT Image 2.5", "Midjourney"],
      complementaryTools: ["Salesforce Agentforce (CRM)", "HubSpot"],
      budgetAlternativeTo: ["Google Lyria 3.5 (music)"],
      privacyAlternativeTo: ["Ask Quizlet (study)", "Shopify Sidekick (e-commerce)"],
    });
    assert.deepEqual(audit22RefUpdates({ directAlternatives: ["GPT Image 2.5"], complementaryTools: [], budgetAlternativeTo: [], privacyAlternativeTo: [] }), []);
    assert.equal(new Set(AUDIT_22_NAME_RENAMES.map((r) => r.from.toLowerCase())).size, AUDIT_22_NAME_RENAMES.length);
  });

  it("dry runs read renamed rows under their old slug", () => {
    assert.equal(preRenameSlug22("shopify-sidekick"), "shopify-magic-sidekick");
    assert.equal(preRenameSlug22("google-lyria-3"), "google-lyria-3");
  });

  it("changes nothing under src/lib/mcp", () => {
    const names = readFileSync(join(process.cwd(), "src/lib/mcp/names.ts"), "utf8");
    assert.match(names, /"google-lyria-3"/);
    assert.match(names, /"quizlet-q-chat"/);
  });
});
