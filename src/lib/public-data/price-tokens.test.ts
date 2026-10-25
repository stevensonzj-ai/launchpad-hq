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
    const out = resolvePriceTokens("X {{price:demo:Gold}} Y {{from:gone}} Z {{oops}}", resolve, (t) => missed.push(t.raw));
    assert.equal(out, `X ${UNRESOLVED_PRICE_TEXT} Y ${UNRESOLVED_PRICE_TEXT} Z ${UNRESOLVED_PRICE_TEXT}`);
    assert.deepEqual(missed, ["{{price:demo:Gold}}", "{{from:gone}}"]);
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
