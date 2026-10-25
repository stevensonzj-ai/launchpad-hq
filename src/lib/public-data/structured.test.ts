import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts, listRegisteredToolFacts } from "@/data/facts";
import { hiddenPlatformSlugs } from "@/lib/catalog-visibility";
import { buildPlatformStructuredData, planOffers } from "@/lib/seo-jsonld";
import { buildPlatformMetadata, buildTutorialMetadata } from "@/lib/seo-metadata";
import { FEED_ROWS, feedContext, feedFacts } from "./fixtures";
import { costBadge, normalizePlans, pricesCheckedAt } from "./pricing";
import { publicToolCore, toPublicTool } from "./serialize";

const ctx = feedContext();

function softwareNode(slug: string) {
  const row = FEED_ROWS.find((r) => r.slug === slug);
  assert.ok(row, slug);
  const out = toPublicTool(row, feedFacts(slug), ctx);
  const data = buildPlatformStructuredData({
    name: out.name,
    slug,
    categoryName: "Cat",
    categorySlug: "cat",
    website: out.website,
    description: out.description,
    dateModified: out.data_as_of,
    plans: out.plans,
  });
  const graph = data["@graph"] as Array<Record<string, unknown>>;
  return { out, software: graph.find((n) => n["@type"] === "SoftwareApplication")! };
}

describe("JSON-LD offers match the feed", () => {
  it("prices equal plans[].amount for every fixture row and every fact file", () => {
    for (const row of FEED_ROWS) {
      const { out, software } = softwareNode(row.slug);
      const offers = (software.offers ?? []) as Array<Record<string, unknown>>;
      const priced = out.plans.filter((p) => p.amount !== null);
      // A currency-less free plan borrows the paid plans' single currency, or is dropped.
      const paid = new Set(priced.filter((p) => !p.is_free).map((p) => p.currency));
      const borrowed = paid.size === 1 ? [...paid][0] : null;
      const expected = priced
        .map((p) => [p.name, p.amount, p.currency ?? (p.is_free ? borrowed : null), p.is_free] as const)
        .filter(([, , currency, isFree]) => !isFree || currency !== null)
        .map(([name, amount, currency]) => [name, amount, currency]);
      assert.deepEqual(
        offers.map((o) => [o.name, Number(o.price), o.priceCurrency ?? null]),
        expected,
        row.slug,
      );
      for (const offer of offers) assert.equal(typeof offer.price, "string", row.slug);
      if (out.lifecycle === "discontinued") assert.equal(software.offers, undefined, row.slug);
      assert.equal(software.description, out.description ?? undefined, row.slug);
      assert.equal(software.dateModified, out.data_as_of ?? undefined, row.slug);
    }
  });

  it("keeps sub-dollar prices and adds billing periods only for month/year", () => {
    const { software } = softwareNode("pricey");
    const [offer] = software.offers as Array<Record<string, unknown>>;
    assert.equal(offer.price, "0.01");
    assert.equal(offer.priceCurrency, "USD");
    assert.equal(offer.priceSpecification, undefined, "usage pricing has no billing duration");

    const offers = planOffers(
      normalizePlans([
        { name: "Pro", price: "$20", period: "month", limits: "" },
        { name: "Annual", price: "€200", period: "year", limits: "" },
        { name: "Images", price: "$0.048/image", period: "", limits: "" },
        { name: "Enterprise", price: "Custom", period: "", limits: "" },
      ]).plans,
    );
    assert.deepEqual(
      offers.map((o) => [o.name, o.price, o.priceCurrency, (o.priceSpecification as Record<string, unknown>)?.billingDuration]),
      [
        ["Pro", "20", "USD", "P1M"],
        ["Annual", "200", "EUR", "P1Y"],
        ["Images", "0.048", "USD", undefined],
      ],
    );
  });
});

describe("JSON-LD free plan currency", () => {
  const offersFor = (plans: { name: string; price: string; period: string }[]) =>
    planOffers(normalizePlans(plans.map((p) => ({ ...p, limits: "" }))).plans).map((o) => [
      o.name,
      o.price,
      o.priceCurrency,
    ]);

  it("borrows the paid plans' currency when they all agree", () => {
    assert.deepEqual(
      offersFor([
        { name: "Free", price: "Free", period: "" },
        { name: "Pro", price: "$20", period: "month" },
        { name: "Team", price: "$30", period: "month" },
      ]),
      [
        ["Free", "0", "USD"],
        ["Pro", "20", "USD"],
        ["Team", "30", "USD"],
      ],
    );
  });

  it("omits the free Offer when currencies disagree or there is no paid plan", () => {
    assert.deepEqual(
      offersFor([
        { name: "Free", price: "Free", period: "" },
        { name: "Pro", price: "$20", period: "month" },
        { name: "EU", price: "€18", period: "month" },
      ]),
      [
        ["Pro", "20", "USD"],
        ["EU", "18", "EUR"],
      ],
    );
    assert.deepEqual(offersFor([{ name: "Free", price: "Free", period: "" }]), []);
  });

  it("keeps a free plan's own currency", () => {
    assert.deepEqual(
      offersFor([
        { name: "Free", price: "€0", period: "month" },
        { name: "Pro", price: "$20", period: "month" },
      ]),
      [
        ["Free", "0", "EUR"],
        ["Pro", "20", "USD"],
      ],
    );
  });
});

describe("Prices checked date", () => {
  it("uses the plans fact date, else prose dates, else nothing", () => {
    const chatgpt = getToolFacts("chatgpt");
    assert.ok(chatgpt?.plans);
    assert.equal(pricesCheckedAt(chatgpt, ["Pro $5 (as of 2020-01-01)"]), chatgpt.plans.checkedAt);
    assert.equal(
      pricesCheckedAt(undefined, ["Pro $5 (as of 2026-09-30)", "5 a day, as of 2026-10-02"]),
      "2026-10-02",
    );
    assert.equal(pricesCheckedAt(undefined, ["Pro $5", null]), null);
    assert.equal(pricesCheckedAt(getToolFacts("play-ht"), ["Pro $5 (as of 2026-09-30)"]), null);
  });
});

describe("card cost badge", () => {
  it("never says free or Freemium for a discontinued tool, and agrees with the feed", () => {
    const playht = costBadge("FREEMIUM", getToolFacts("play-ht"));
    assert.equal(playht.label, "Discontinued");
    for (const facts of listRegisteredToolFacts()) {
      const row = FEED_ROWS.find((r) => r.slug === facts.slug)!;
      const badge = costBadge(row.costTier, facts);
      const core = publicToolCore(row, facts);
      if (core.lifecycle === "discontinued") {
        assert.equal(badge.label, "Discontinued", facts.slug);
      } else if (facts.freeTier) {
        assert.equal(badge.label, core.free_tier.available ? "Free plan" : "No free plan", facts.slug);
      }
    }
    assert.equal(costBadge("FREEMIUM", undefined).label, "Freemium");
  });
});

describe("JSON feed alternate link", () => {
  const json = (meta: { alternates?: { types?: unknown } | null }) =>
    (meta.alternates?.types as Record<string, string> | undefined)?.["application/json"];

  it("points tool and guide pages at the tool's /data/v1 record, never for hidden tools", () => {
    const url = "https://www.launchpadhq.io/data/v1/tools/chatgpt.json";
    assert.equal(json(buildPlatformMetadata({ slug: "chatgpt", name: "ChatGPT", facts: getToolFacts("chatgpt") })), url);
    // Guide pages link their own guide record first, then the tool record.
    assert.deepEqual(
      json(buildTutorialMetadata({ platformSlug: "chatgpt", name: "ChatGPT", tagline: "t", lastReviewedAt: "2026-10-01" })),
      [{ url: "https://www.launchpadhq.io/data/v1/guides/chatgpt.json" }, { url }],
    );
    assert.ok(json(buildPlatformMetadata({ slug: "play-ht", name: "PlayHT", facts: getToolFacts("play-ht") })));
    for (const slug of hiddenPlatformSlugs()) {
      assert.equal(json(buildPlatformMetadata({ slug, name: slug, facts: getToolFacts(slug) })), undefined, slug);
    }
    const canonical = buildPlatformMetadata({ slug: "chatgpt", name: "ChatGPT" }).alternates?.canonical;
    assert.equal(canonical, "https://www.launchpadhq.io/platform/chatgpt");
  });
});
