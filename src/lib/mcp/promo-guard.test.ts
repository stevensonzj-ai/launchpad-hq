import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AFFILIATE_LINKS } from "@/data/affiliates";
import { DEALS } from "@/data/deals";
import { getToolFacts } from "@/data/facts";
import { connectorPromoCodes } from "@/app/(app)/deals/model";
import { GOLDEN_QUERIES } from "@/lib/mcp/golden-queries";
import { snapshotRows } from "@/lib/mcp/snapshot";
import { compare, findFreeAlternatives, getPricingFacts, searchTools } from "@/lib/mcp/tools";

/**
 * The four read-only connector tools, over the catalog snapshot and the
 * representative search set. Output must not carry a promo code, an affiliate
 * href, or the deals-page notes.
 */
describe("connector output has no promo codes, affiliate links, or deals data", () => {
  it("search, compare, pricing and free-alternatives stay clear of them", () => {
    const rows = snapshotRows();
    const facts = getToolFacts;
    const outputs: unknown[] = [];
    for (const row of rows) outputs.push(getPricingFacts({ platform: row.slug }, rows, facts));
    for (const query of GOLDEN_QUERIES) outputs.push(searchTools(query.input, rows, facts));
    outputs.push(searchTools({ task: "squarespace website builder", limit: 10 }, rows, facts));
    outputs.push(searchTools({ task: "ai avatar training video", limit: 10 }, rows, facts));
    outputs.push(compare({ platforms: ["squarespace-ai", "wix-ai"] }, rows, facts));
    outputs.push(compare({ platforms: ["synthesia", "heygen"] }, rows, facts));
    outputs.push(findFreeAlternatives({ platform: "squarespace-ai", limit: 10 }, rows, facts));
    outputs.push(findFreeAlternatives({ platform: "synthesia", limit: 10 }, rows, facts));
    outputs.push(findFreeAlternatives({ platform: "chatgpt", limit: 10 }, rows, facts));

    const blob = JSON.stringify(outputs);
    for (const code of connectorPromoCodes()) assert.equal(blob.includes(code), false, code);
    for (const entry of Object.values(AFFILIATE_LINKS)) {
      assert.equal(blob.includes(entry.href), false, entry.slug);
      const query = new URL(entry.href).search;
      if (query) assert.equal(blob.includes(query), false, `${entry.slug} query`);
    }
    assert.equal(/(?:[?&])(?:utm_[^&=]*|via|ref|aff|affiliate)=/i.test(blob), false);
    for (const offer of DEALS) {
      if (offer.note) assert.equal(blob.includes(offer.note), false, offer.platformSlug);
    }
    assert.equal(blob.includes("noEndDateStated"), false);
    const priced = outputs.find((item) => {
      const row = item as { platform?: { slug?: string } };
      return row.platform?.slug === "squarespace-ai";
    }) as { platform: { slug: string }; free_tier: { value: { summary: string } } | null };
    assert.equal(priced.platform.slug, "squarespace-ai");
    assert.equal(priced.free_tier?.value.summary.includes("GIMME10"), false);
  });
});
