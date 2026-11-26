import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it } from "node:test";
import { KLAP_ROW } from "@/data/catalog-audits/audit-13";
import { AFFILIATE_LINKS } from "@/data/affiliates";
import { DEALS, DEALS_DATA_CONSUMERS, type DealOffer } from "@/data/deals";
import { getToolFacts } from "@/data/facts";
import { isPublishedVerified } from "@/data/facts/walk";
import { snapshotRows } from "@/lib/mcp/snapshot";
import {
  buildDealsPage,
  compareOffers,
  connectorPromoCodes,
  dealProblems,
  dealsIndexableFromCounts,
  dealsPageIndexable,
  isOfferLive,
  offerAgeDays,
  trackingParamNames,
  verifiedFreePlans,
  type DealSectionId,
  type ToolDirectoryEntry,
} from "@/app/(app)/deals/model";
import { DealsPageView } from "@/app/(app)/deals/view";

const ROOT = process.cwd();
const LAUNCH = new Date("2026-11-25T12:00:00Z");
const STALE = new Date("2027-06-01T12:00:00Z");

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      out.push(...sourceFiles(full));
    } else if (/\.(ts|tsx|mjs|js)$/.test(name) && !/\.test\.tsx?$/.test(name)) {
      out.push(relative(ROOT, full).replace(/\\/g, "/"));
    }
  }
  return out;
}

const FILES = [...sourceFiles(join(ROOT, "src")), ...sourceFiles(join(ROOT, "scripts"))];
const read = (file: string) => readFileSync(join(ROOT, file), "utf8");
const IMPORTS_DEALS = /(?:from|import\()\s*["'](?:@\/data|\.{1,2}(?:\/\.\.)*(?:\/data)?)\/deals["']/;

function directory(): Map<string, ToolDirectoryEntry> {
  const names = new Map<string, ToolDirectoryEntry>();
  for (const row of snapshotRows()) names.set(row.slug, { name: row.name, website: row.website });
  names.set(KLAP_ROW.slug, { name: KLAP_ROW.name, website: KLAP_ROW.website });
  return names;
}

function baseOffer(overrides: Partial<DealOffer> = {}): DealOffer {
  return {
    platformSlug: "krisp",
    offerType: "code",
    title: "Example",
    details: "Example details",
    eligibility: "Anyone",
    url: "https://example.com/pricing",
    sourceUrl: "https://example.com/pricing",
    lastChecked: "2026-11-20",
    expiresAt: "2026-12-31",
    verified: true,
    ...overrides,
  };
}

describe("deal records", () => {
  it("every launch offer has a source, a check date, a catalog slug, and no tracking params", () => {
    assert.ok(DEALS.length >= 12);
    for (const offer of DEALS) assert.deepEqual(dealProblems(offer), [], offer.platformSlug);
  });

  it("fails when sourceUrl or lastChecked is missing", () => {
    assert.ok(dealProblems(baseOffer({ sourceUrl: "" })).includes("missing sourceUrl"));
    assert.ok(dealProblems(baseOffer({ lastChecked: "" })).includes("missing lastChecked"));
  });

  it("fails a code or discount that has no end date and does not say so", () => {
    const code = baseOffer({ offerType: "code", expiresAt: undefined, noEndDateStated: undefined });
    assert.ok(dealProblems(code).includes("code/discount needs expiresAt or noEndDateStated"));
    const discount = baseOffer({ offerType: "discount", expiresAt: undefined });
    assert.ok(dealProblems(discount).includes("code/discount needs expiresAt or noEndDateStated"));
    assert.deepEqual(dealProblems(baseOffer({ offerType: "code", expiresAt: undefined, noEndDateStated: true })), []);
    assert.deepEqual(dealProblems(baseOffer({ offerType: "trial", expiresAt: undefined })), []);
  });

  it("fails tracking parameters in url or sourceUrl", () => {
    assert.ok(dealProblems(baseOffer({ url: "https://example.com/?utm_source=newsletter" })).includes("tracking params in url"));
    assert.ok(dealProblems(baseOffer({ sourceUrl: "https://example.com/?via=partner" })).includes("tracking params in sourceUrl"));
    assert.ok(dealProblems(baseOffer({ url: "https://example.com/?ref=abc" })).includes("tracking params in url"));
    assert.deepEqual(trackingParamNames("https://example.com/pricing"), []);
  });

  it("fails a slug that is not a listed catalog tool", () => {
    assert.ok(dealProblems(baseOffer({ platformSlug: "not-a-real-tool" })).includes("slug not in catalog"));
    assert.ok(dealProblems(baseOffer({ platformSlug: "hedra" })).includes("slug not in catalog"));
  });

  it("leaves developer-only promos out", () => {
    for (const slug of ["tencent-hy4", "cohere", "murf-ai"]) {
      assert.equal(DEALS.some((offer) => offer.platformSlug === slug), false, slug);
    }
  });

  it("keeps GIMME10 on the Squarespace code offer and out of the fact file", () => {
    const code = DEALS.find((offer) => offer.platformSlug === "squarespace-ai" && offer.offerType === "code");
    assert.ok(code);
    assert.equal(code.code, "GIMME10");
    assert.equal(code.noEndDateStated, true);
    assert.equal(code.expiresAt, undefined);
    const summary = getToolFacts("squarespace-ai")?.freeTier?.value.summary;
    assert.equal(
      summary,
      "No permanent free plan: a 14-day free trial, no credit card required, cancel anytime. Plan AI credits are Basic 10 (one-time), Core 20 a month, Plus 40 a month, and Advanced 120 a month.",
    );
    assert.equal(summary.includes("GIMME10"), false);
    const hits = FILES.filter((file) => read(file).includes("GIMME10"));
    assert.deepEqual(hits, ["src/data/deals.ts"]);
  });

  it("records the Klap offer without copying the affiliate code", () => {
    const klap = DEALS.find((offer) => offer.platformSlug === "klap");
    assert.ok(klap);
    assert.equal(klap.offerType, "code");
    assert.equal(klap.code, undefined);
    assert.equal(klap.noEndDateStated, true);
    assert.equal(klap.lastChecked, "2026-11-25");
    assert.equal(klap.note, "code reconfirmed by the owner from the Klap dashboard on 2026-11-25");
    assert.equal(klap.details, "30% off the first payment, plus a free one-video try with no card.");
    assert.match(klap.sourceUrl, /^https:\/\/(www\.)?notion\.so\/ziggapp\/Klap-Affiliate-Program/);
    assert.equal(JSON.stringify(klap).includes(AFFILIATE_LINKS.klap.promoCode!.code), false);
    assert.equal(getToolFacts("klap")?.freeTier?.value.summary.includes("1 video"), true);
  });

  it("does not invent a Synthesia trial or code", () => {
    assert.equal(DEALS.some((offer) => offer.platformSlug === "synthesia"), false);
  });

  it("records the Manus Black Friday discount with its end date, and leaves the regular plan prices alone", () => {
    const offer = DEALS.find((row) => row.platformSlug === "manus" && row.offerType === "discount");
    assert.ok(offer);
    assert.equal(offer.expiresAt, "2026-11-30");
    assert.equal(offer.lastChecked, "2026-11-26");
    assert.equal(offer.noEndDateStated, undefined);
    assert.match(offer.details, /not the regular price/);
    assert.match(offer.details, /30 November 2026 at 23:59:59 Eastern Time \(UTC-5\)/);
    assert.equal(
      offer.sourceUrl,
      "https://help.manus.im/en/articles/18542127-how-does-the-manus-black-friday-2026-offer-work",
    );
    const plans = getToolFacts("manus")?.plans?.value ?? [];
    assert.equal(plans.find((plan) => plan.name === "Pro")?.price, "From $20");
    assert.equal(plans.some((plan) => plan.price === "$90" || plan.price === "$160"), false);
    const trial = DEALS.find((row) => row.platformSlug === "manus" && row.offerType === "trial");
    assert.ok(trial);
    assert.equal(trial.details, "8,000 credits a month; 7-day free trial");
  });

  it("quotes the fact file for every other offer", () => {
    const texts = (value: unknown): string => {
      if (typeof value === "string") return value;
      if (Array.isArray(value)) return value.map(texts).join("\n");
      if (value && typeof value === "object") return Object.values(value).map(texts).join("\n");
      return "";
    };
    for (const offer of DEALS) {
      if (offer.platformSlug === "squarespace-ai" && offer.offerType === "code") continue;
      if (offer.platformSlug === "klap") continue;
      const blob = texts(getToolFacts(offer.platformSlug));
      if (offer.platformSlug === "mailchimp-ai") {
        assert.ok(blob.includes("Free for 14 days. Then, starts at $13/month"), "mailchimp essentials");
        assert.ok(blob.includes("Free for 14 days. Then, starts at $20/month"), "mailchimp standard");
        continue;
      }
      assert.equal(blob.includes(offer.details), true, `${offer.platformSlug} ${offer.offerType}`);
    }
  });
});

describe("what stays on the page", () => {
  it("hides expired, unverified, and stale offers, using fixed dates", () => {
    const fresh = baseOffer({ lastChecked: "2026-11-20", expiresAt: "2026-12-02" });
    assert.equal(isOfferLive(fresh, new Date("2026-12-02T00:00:00Z")), true);
    assert.equal(isOfferLive(fresh, new Date("2026-12-03T00:00:00Z")), false);
    assert.equal(isOfferLive(baseOffer({ verified: false }), LAUNCH), false);

    const code = baseOffer({ offerType: "code", noEndDateStated: true, expiresAt: undefined, lastChecked: "2026-10-26" });
    assert.equal(offerAgeDays("2026-10-26", LAUNCH), 30);
    assert.equal(isOfferLive(code, LAUNCH), true);
    assert.equal(isOfferLive({ ...code, lastChecked: "2026-10-25" }, LAUNCH), false);

    const trial = baseOffer({ offerType: "trial", expiresAt: undefined, lastChecked: "2026-08-27" });
    assert.equal(offerAgeDays("2026-08-27", LAUNCH), 90);
    assert.equal(isOfferLive(trial, LAUNCH), true);
    assert.equal(isOfferLive({ ...trial, lastChecked: "2026-08-26" }, LAUNCH), false);

    const student = baseOffer({ offerType: "student", platformSlug: "glasp", expiresAt: undefined, lastChecked: "2026-08-27" });
    assert.equal(isOfferLive(student, LAUNCH), true);
    assert.equal(isOfferLive({ ...student, lastChecked: "2026-08-26" }, LAUNCH), false);
  });

  it("on the launch date keeps the curated sections and the gate open", () => {
    const page = buildDealsPage({ now: LAUNCH, names: directory() });
    const counts = Object.fromEntries(page.sections.map((section) => [section.id, section.offers.length]));
    assert.equal(counts.trial, 17);
    assert.equal(counts.student, 5);
    assert.equal(counts.codes, 5);
    assert.equal(counts.free, 111);
    assert.equal(page.indexable, true);
    assert.equal(dealsPageIndexable(LAUNCH), true);
    assert.equal(page.curatedCount, 27);
    assert.equal(page.affiliateCuratedCount, 1);
    const affiliateCards = page.sections.reduce(
      (sum, section) => sum + section.offers.filter((offer) => offer.affiliate).length,
      0,
    );
    assert.equal(affiliateCards, 2);
    assert.ok(affiliateCards / page.curatedCount <= 0.2);
  });

  it("after the curated offers go stale, only free plans remain and the gate closes", () => {
    const page = buildDealsPage({ now: STALE, names: directory() });
    assert.equal(page.sections.find((section) => section.id === "trial")?.offers.length, 0);
    assert.equal(page.sections.find((section) => section.id === "student")?.offers.length, 0);
    assert.equal(page.sections.find((section) => section.id === "codes")?.offers.length, 0);
    assert.ok((page.sections.find((section) => section.id === "free")?.offers.length ?? 0) > 100);
    assert.equal(page.indexable, false);
    assert.equal(dealsPageIndexable(STALE), false);
  });

  it("indexes only with 12 live offers across 3 sections and affiliate offers at or under 20% of curated offers", () => {
    assert.equal(dealsIndexableFromCounts({ offerCount: 12, sectionCount: 3, curatedCount: 12, affiliateCount: 2 }), true);
    assert.equal(dealsIndexableFromCounts({ offerCount: 11, sectionCount: 3, curatedCount: 11, affiliateCount: 0 }), false);
    assert.equal(dealsIndexableFromCounts({ offerCount: 20, sectionCount: 2, curatedCount: 20, affiliateCount: 0 }), false);
    assert.equal(dealsIndexableFromCounts({ offerCount: 12, sectionCount: 3, curatedCount: 10, affiliateCount: 2 }), true);
    assert.equal(dealsIndexableFromCounts({ offerCount: 12, sectionCount: 3, curatedCount: 10, affiliateCount: 3 }), false);
  });
});

describe("page order and free plans", () => {
  const page = buildDealsPage({ now: LAUNCH, names: directory() });

  it("keeps the four sections in a fixed order", () => {
    assert.deepEqual(
      page.sections.map((section) => section.id),
      ["trial", "student", "codes", "free"] satisfies DealSectionId[],
    );
    assert.deepEqual(
      page.sections.map((section) => section.title),
      ["Free trials", "Student and education discounts", "Discounts and promo codes", "Free plans"],
    );
    assert.equal(page.sections.find((section) => section.id === "free")?.collapsed, true);
    assert.equal(page.sections.filter((section) => section.id !== "free").every((section) => section.collapsed === false), true);
  });

  it("sorts each section A-Z by tool name, independent of affiliate status", () => {
    for (const section of page.sections) {
      const sorted = [...section.offers].sort(compareOffers);
      assert.deepEqual(
        section.offers.map((offer) => offer.slug),
        sorted.map((offer) => offer.slug),
        section.id,
      );
    }
    const codes = page.sections.find((section) => section.id === "codes");
    assert.ok(codes);
    assert.ok(codes.offers.some((offer) => offer.affiliate));
    assert.ok(codes.offers.some((offer) => !offer.affiliate));
    const affiliateFirst = [...codes.offers].sort(
      (a, b) => Number(Boolean(b.affiliate)) - Number(Boolean(a.affiliate)) || compareOffers(a, b),
    );
    assert.notDeepEqual(
      codes.offers.map((offer) => offer.slug),
      affiliateFirst.map((offer) => offer.slug),
    );
    const model = read("src/app/(app)/deals/model.ts");
    assert.match(model, /compareOffers/);
    assert.doesNotMatch(model, /sort\(\s*\([^)]*affiliate/);
    const view = read("src/app/(app)/deals/view.tsx");
    assert.doesNotMatch(`${model}\n${view}\n${read("src/app/(app)/deals/page.tsx")}`, /affiliate only|only affiliates|filter by affiliate/i);
  });

  it("builds free plans from verified free-tier facts and leaves unverified and hidden tools out", () => {
    const plans = verifiedFreePlans();
    const slugs = plans.map((plan) => plan.slug);
    for (const slug of ["gamma", "higgsfield", "jetbrains-ai", "perplexity-comet", "qwen", "wispr-flow", "longcat-2-5", "hedra"]) {
      assert.equal(slugs.includes(slug), false, slug);
    }
    const hedra = getToolFacts("hedra");
    assert.equal(hedra?.visibility, "hidden");
    for (const slug of ["gamma", "higgsfield", "jetbrains-ai", "perplexity-comet", "qwen", "wispr-flow", "longcat-2-5"]) {
      const fact = getToolFacts(slug)?.freeTier;
      const published = Boolean(fact && isPublishedVerified(fact) && fact.value.available);
      assert.equal(published, false, slug);
    }
    const synthesia = plans.find((plan) => plan.slug === "synthesia");
    assert.ok(synthesia);
    assert.match(synthesia.summary, /\$0/);
    assert.match(synthesia.summary, /10 minutes of video and 500 credits a month/);
    assert.equal(DEALS.some((offer) => offer.details === synthesia.summary), false);
  });

  it("reads the Klap code from affiliates and marks affiliate links sponsored", () => {
    const klap = page.sections.flatMap((section) => section.offers).find((offer) => offer.slug === "klap");
    assert.ok(klap);
    assert.equal(klap.code, null);
    assert.equal(klap.href, AFFILIATE_LINKS.klap.href);
    assert.equal(klap.rel, "sponsored noopener noreferrer");
    assert.equal(klap.affiliate?.promoCode?.code, AFFILIATE_LINKS.klap.promoCode?.code);
    const synthesia = page.sections.find((section) => section.id === "free")?.offers.find((offer) => offer.slug === "synthesia");
    assert.ok(synthesia);
    assert.equal(synthesia.href, AFFILIATE_LINKS.synthesia.href);
    assert.equal(synthesia.rel, "sponsored noopener noreferrer");
    const marked = new Set(page.disclosure.map((marker) => marker.slug));
    assert.equal(marked.has("klap"), true);
    assert.equal(marked.has("synthesia"), true);
    for (const marker of page.disclosure) assert.ok(marker.kinds.includes("affiliate"), marker.slug);
  });
});

describe("deals data stays off the connector and the catalog machinery", () => {
  it("only the deals page module imports src/data/deals.ts", () => {
    const importers = FILES.filter((file) => file !== "src/data/deals.ts" && IMPORTS_DEALS.test(read(file)));
    assert.deepEqual(importers.sort(), [...DEALS_DATA_CONSUMERS].sort());
  });

  it("MCP, the public feed, llms.txt, search, ranking, quiz and the sitemap do not import it", () => {
    const forbidden = /^(src\/lib\/mcp\/|src\/lib\/public-data\/|src\/app\/llms\.txt\/|src\/lib\/search\/|src\/app\/api\/search\/|src\/lib\/quiz|src\/app\/\(app\)\/quiz\/|src\/lib\/recommendations-score|src\/lib\/quiz-ranking|src\/data\/sponsors\/ordering|src\/app\/sitemap\.ts|src\/lib\/sitemap-coverage\.ts)/;
    const importers = FILES.filter((file) => IMPORTS_DEALS.test(read(file)));
    for (const file of importers) assert.equal(forbidden.test(file), false, file);
    for (const file of DEALS_DATA_CONSUMERS) assert.equal(forbidden.test(file), false, file);
  });
});

describe("deals page markup", () => {
  it("revalidates hourly, collapses free plans, and discloses affiliate links", () => {
    const page = read("src/app/(app)/deals/page.tsx");
    assert.match(page, /export const revalidate = 3600/);
    assert.match(page, /index: false/);
    const view = read("src/app/(app)/deals/view.tsx");
    assert.match(view, /<details/);
    assert.doesNotMatch(view, /<details open/);
    assert.match(view, /rel=\{offer\.rel\}/);
    assert.match(view, /AffiliateDisclosure/);
    assert.match(view, /href="\/how-we-make-money"/);
    const html = renderToStaticMarkup(createElement(DealsPageView, { model: buildDealsPage({ now: LAUNCH, names: directory() }) }));
    assert.match(html, /<details/);
    assert.doesNotMatch(html, /<details[^>]*\sopen/);
    assert.match(html, /rel="sponsored noopener noreferrer"/);
    assert.match(html, /rel="noopener noreferrer"/);
    assert.match(html, /How we make money/);
    assert.match(html, /GIMME10/);
    assert.match(html, new RegExp(AFFILIATE_LINKS.klap.promoCode!.code));
    const headingOrder = [...html.matchAll(/<h2[^>]*>([^<]+)/g)].map((match) => match[1]);
    assert.deepEqual(headingOrder, ["Free trials", "Student and education discounts", "Discounts and promo codes"]);
    assert.match(html, /Free plans \(\d+\)/);
  });

  it("lists the promo codes the connector test scans", () => {
    const codes = connectorPromoCodes();
    assert.ok(codes.includes("GIMME10"));
    assert.ok(codes.includes(AFFILIATE_LINKS.klap.promoCode!.code));
  });
});
