import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { listRegisteredTutorials } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { findPriceText, type AllowEntry } from "./price-guard";
import { PRICE_GUARD_ALLOWLIST } from "./price-guard-allowlist";
import { NON_PROSE_KEYS, contentStrings } from "./price-tokens";

type Finding = { source: string; path: string; kind: string; match: string; text: string };

function sources(): { source: string; value: unknown }[] {
  return [
    ...listRegisteredTutorials().map((t) => ({ source: `tutorial:${t.platformSlug}`, value: t })),
    ...WORKFLOWS.map((w) => ({ source: `workflow:${w.slug}`, value: w })),
  ];
}

function allowed(entry: AllowEntry, source: string, text: string): boolean {
  return entry.source === source && text.includes(entry.contains);
}

function scan(): { findings: Finding[]; used: Set<AllowEntry> } {
  const findings: Finding[] = [];
  const used = new Set<AllowEntry>();
  for (const { source, value } of sources()) {
    for (const { path, text } of contentStrings(value, NON_PROSE_KEYS)) {
      const hits = findPriceText(text);
      if (!hits.length) continue;
      const entry = PRICE_GUARD_ALLOWLIST.find((e) => allowed(e, source, text));
      if (entry) {
        used.add(entry);
        continue;
      }
      for (const hit of hits) findings.push({ source, path, kind: hit.kind, match: hit.match, text });
    }
  }
  return { findings, used };
}

describe("price guard patterns", () => {
  it("flags typed prices and plan limits", () => {
    for (const text of [
      "Plus is $20 a month.",
      "Premium starts at €19.90/mo.",
      "It costs 20 USD.",
      "The free plan includes 25 generations.",
      "You get 100 tasks a month.",
      "Downloads are capped at three a month.",
      "New accounts get 1,000 credits.",
      "about 20 generations/week",
      "Jetpack gives 20 free requests per site.",
      "One-time plans are capped at a maximum of 10,000 tasks.",
      "the sales page advertises a 20,000-task tier",
      "Enterprise is from $36k/year.",
    ]) {
      assert.ok(findPriceText(text).length > 0, text);
    }
  });

  it("leaves tokens and non-price numbers alone", () => {
    for (const text of [
      "Plus is {{price:chatgpt:Plus}} and paid plans start at {{from:chatgpt}}.",
      "Step 3: press Ctrl+Enter.",
      "Files up to 25 MB upload fine.",
      "It has a 128,000-token context window.",
      "Wait 30 seconds, then refresh.",
      "The free plan has a monthly credit allowance; see current prices on the tool page.",
      "It raised a $75M Series B and closed a $650 million acquisition.",
      "Gumloop dropped its free plan in mid-2026, leaving a 14-day trial.",
      "On the free plan files are limited to 20MB.",
      "Every module execution costs one credit.",
      "It runs two separate credit systems.",
      "Use it three times a day.",
    ]) {
      assert.deepEqual(findPriceText(text), [], text);
    }
  });
});

describe("guides and workflows carry no typed prices", () => {
  it("no tutorial or workflow string has a raw price or plan limit outside the allowlist", () => {
    const { findings } = scan();
    const report = findings
      .map((f) => `${f.source} ${f.path} [${f.kind}] "${f.match}"`)
      .join("\n");
    assert.equal(findings.length, 0, `${findings.length} typed prices/limits:\n${report}`);
  });

  it("every allowlist entry is used, explained, and dated when verified", () => {
    const { used } = scan();
    for (const entry of PRICE_GUARD_ALLOWLIST) {
      assert.ok(used.has(entry), `stale allowlist entry: ${entry.source} "${entry.contains}"`);
      assert.ok(entry.reason.trim().length > 10, `allowlist entry needs a reason: ${entry.contains}`);
      if (entry.kind === "verified") {
        assert.match(entry.sourceUrl ?? "", /^https:\/\//, entry.contains);
        assert.match(entry.checkedAt ?? "", /^\d{4}-\d{2}-\d{2}$/, entry.contains);
        const shown = sources()
          .filter((s) => s.source === entry.source)
          .flatMap((s) => contentStrings(s.value, NON_PROSE_KEYS))
          .some(({ text }) => text.includes(entry.contains) && text.includes(`as of ${entry.checkedAt}`));
        assert.ok(shown, `verified entry must show "as of ${entry.checkedAt}": ${entry.contains}`);
      }
    }
  });
});
