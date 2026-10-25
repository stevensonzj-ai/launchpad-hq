import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { listRegisteredToolFacts } from "@/data/facts";
import { listRegisteredTutorials } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { staticPlansLookup } from "./content-view";
import {
  NON_PROSE_KEYS,
  UNRESOLVED_PRICE_TEXT,
  contentStrings,
  malformedTokens,
  mapContentStrings,
  parsePriceTokens,
  priceResolver,
  prosePlanPrice,
  resolvePriceTokens,
} from "./price-tokens";

const plan = (name: string, price: string, period = "", limits = "") => ({ name, price, period, limits });
const PLANS = [plan("Free", "$0"), plan("Plus", "$20", "month"), plan("Team", "$25", "user/month")];
const resolve = priceResolver((slug) => (slug === "demo" ? PLANS : undefined));

function allContent(): { source: string; path: string; text: string }[] {
  return [
    ...listRegisteredTutorials().map((t) => ({ source: `tutorial:${t.platformSlug}`, value: t as unknown })),
    ...WORKFLOWS.map((w) => ({ source: `workflow:${w.slug}`, value: w as unknown })),
  ].flatMap(({ source, value }) => contentStrings(value, NON_PROSE_KEYS).map((s) => ({ source, ...s })));
}

describe("price tokens", () => {
  it("parses price and from tokens", () => {
    assert.deepEqual(parsePriceTokens("A {{price:demo:Plus}} B {{from:demo}}"), [
      { kind: "price", raw: "{{price:demo:Plus}}", slug: "demo", plan: "Plus" },
      { kind: "from", raw: "{{from:demo}}", slug: "demo" },
    ]);
    assert.deepEqual(malformedTokens("{{price:demo}} {{from:demo:Plus}} {{nope}} {{from:demo}}"), [
      "{{price:demo}}",
      "{{from:demo:Plus}}",
      "{{nope}}",
    ]);
  });

  it("formats plan prices from the plan row only", () => {
    assert.equal(prosePlanPrice(plan("Plus", "$20", "month")), "$20/month");
    assert.equal(prosePlanPrice(plan("Plus", "$20", "Month")), "$20/month");
    assert.equal(prosePlanPrice(plan("Team", "$25", "user/month")), "$25/user/month");
    assert.equal(prosePlanPrice(plan("Pro", "$12", "billed annually")), "$12 (billed annually)");
    assert.equal(prosePlanPrice(plan("Enterprise", "Custom")), "Custom");
  });

  it("resolves tokens and never leaves a raw token", () => {
    assert.equal(
      resolvePriceTokens("Plus is {{price:demo:plus}}; paid from {{from:demo}}.", resolve),
      "Plus is $20/month; paid from $20/month.",
    );
    const missed: string[] = [];
    const out = resolvePriceTokens(
      "Free to start. **Paid plans are per user.** Gold is {{price:demo:Gold}}. Plus is {{price:demo:Plus}}. Old {{from:gone}} too. Typo {{oops}}.",
      resolve,
      (t) => missed.push(t.raw),
    );
    // Sentences with an unfillable token are dropped whole; no stand-in phrase mid-sentence.
    assert.equal(out, "Free to start. **Paid plans are per user.** Plus is $20/month.");
    assert.deepEqual(missed, ["{{price:demo:Gold}}", "{{from:gone}}"]);
  });

  it("an unresolvable token never reads badly: a fully dropped text becomes one full sentence", () => {
    for (const text of [
      "Pro at {{price:demo:Gold}}, with a discount.",
      "Paid plans start at {{from:gone}}.",
      "(Plus, currently {{price:demo:Gold}})",
    ]) {
      assert.equal(resolvePriceTokens(text, resolve), UNRESOLVED_PRICE_TEXT, text);
    }
    assert.match(UNRESOLVED_PRICE_TEXT, /^[A-Z].*\.$/);
    // Prompts keep their line layout.
    assert.equal(resolvePriceTokens("Line one.\nCosts {{from:gone}}.\nLine three.", resolve), "Line one.\n\nLine three.");
  });

  it("maps every prose string and skips identifiers", () => {
    const input = { slug: "{{from:demo}}", body: ["{{from:demo}}"], nested: { text: "{{price:demo:Plus}}" } };
    assert.deepEqual(mapContentStrings(input, (s) => resolvePriceTokens(s, resolve), NON_PROSE_KEYS), {
      slug: "{{from:demo}}",
      body: ["$20/month"],
      nested: { text: "$20/month" },
    });
  });
});

describe("every token in every guide and workflow resolves from the catalog", () => {
  const strings = allContent();
  const tokens = strings.flatMap((s) => parsePriceTokens(s.text).map((token) => ({ ...s, token })));
  const resolveStatic = priceResolver(staticPlansLookup);

  it("has no malformed tokens", () => {
    const bad = strings.flatMap((s) => malformedTokens(s.text).map((m) => `${s.source} ${s.path}: ${m}`));
    assert.deepEqual(bad, []);
  });

  it("every token names a listed, live tool with fact-file plans and a plan that exists", () => {
    const failures = tokens
      .filter(({ token }) => resolveStatic(token) === null)
      .map(({ source, path, token }) => `${source} ${path}: ${token.raw}`);
    assert.deepEqual(failures, []);
    assert.ok(tokens.length > 0, "expected the guides to use some price tokens");
  });

  it("only fact files with plans back tokens (so no value depends on an unseen DB row)", () => {
    const withPlans = new Set(listRegisteredToolFacts().filter((f) => f.plans?.value.length).map((f) => f.slug));
    for (const { source, token } of tokens) assert.ok(withPlans.has(token.slug), `${source}: ${token.raw}`);
  });

  it("keeps tokens out of titles, taglines and descriptions (they feed page metadata)", () => {
    const meta = strings.filter((s) => /^(title|tagline|description)$/.test(s.path));
    for (const s of meta) assert.equal(parsePriceTokens(s.text).length, 0, `${s.source} ${s.path}`);
  });
});

describe("concise starting price (guide header and workflow tier lines)", () => {
  it("keeps short prices with a real amount, and Free", async () => {
    const { conciseStartingPrice } = await import("./content-view");
    for (const ok of ["Free", "Free, from $8/month", "€20/month", "$79/month", "Free, from $14", "$0.10 input / $0.50 output per million tokens"]) {
      assert.equal(conciseStartingPrice(ok), ok, ok);
    }
    assert.equal(conciseStartingPrice(" free "), "Free");
  });

  it("omits fallbacks, non-amounts, prose and long strings", async () => {
    const { conciseStartingPrice } = await import("./content-view");
    for (const bad of [
      null,
      undefined,
      "",
      "See pricing",
      "See site",
      "Talk to sales",
      "Free, from Talk to sales",
      "Free, from custom pricing",
      "Contact us for a quote",
      "Free; Pro $10/mo; Team $20/user/mo",
      "Usage-based: $0.01 per credit, pay as you go, volume discounts on request",
      "Pricing unverified",
    ]) {
      assert.equal(conciseStartingPrice(bad), null, String(bad));
    }
  });
});
