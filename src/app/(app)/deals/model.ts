/**
 * What /deals shows on a given day. Pure: no database and no request.
 * The page, the sitemap gate and the tests all call this so they cannot disagree.
 *
 * Affiliate status is read from src/data/affiliates.ts here and is never
 * stored on a deal. Sort order is the tool name, then the slug. Affiliate
 * status is not an input to that sort.
 */
import { AFFILIATE_LINKS, getAffiliateLink, requiredDisclosure, type AffiliateEntry } from "@/data/affiliates";
import { DEALS, type DealOffer, type DealOfferType } from "@/data/deals";
import type { DisclosureMarker } from "@/data/disclosures";
import { getToolFacts, listRegisteredToolFacts } from "@/data/facts";
import type { ToolFacts } from "@/data/facts/types";
import { isPublishedVerified } from "@/data/facts/walk";
import { isHiddenPlatform } from "@/lib/catalog-visibility";

export const DEAL_SECTION_ORDER = ["trial", "student", "codes", "free"] as const;
export type DealSectionId = (typeof DEAL_SECTION_ORDER)[number];

export const SECTION_TITLES: Record<DealSectionId, string> = {
  trial: "Free trials",
  student: "Student and education discounts",
  codes: "Discounts and promo codes",
  free: "Free plans",
};

/** Codes and discounts go stale faster than trials and student offers. */
export const STALE_AFTER_DAYS: Record<DealOfferType, number> = {
  trial: 90,
  student: 90,
  discount: 30,
  code: 30,
};

const TRACKING_PARAM = /^(?:utm_[^=&]*|via|ref|aff|affiliate)$/i;

export type ToolDirectoryEntry = { name: string; website: string | null };

export type DealsOfferView = {
  slug: string;
  name: string;
  title: string;
  details: string;
  eligibility: string;
  href: string;
  rel: string;
  /** Non-affiliate promo code. Affiliate codes stay on the disclosure. */
  code: string | null;
  endsLabel: string | null;
  sourceUrl: string;
  lastChecked: string;
  affiliate: AffiliateEntry | null;
  /** Hand-written deal, as opposed to a free plan read from facts. */
  curated: boolean;
};

export type DealsSectionView = {
  id: DealSectionId;
  title: string;
  collapsed: boolean;
  offers: DealsOfferView[];
};

export type DealsPageModel = {
  indexable: boolean;
  sections: DealsSectionView[];
  disclosure: DisclosureMarker;
  /** Live hand-written deals. The 20% affiliate cap uses this list. */
  curatedCount: number;
  affiliateCuratedCount: number;
};

export function trackingParamNames(url: string): string[] {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return ["invalid-url"];
  }
  const found: string[] = [];
  for (const key of parsed.searchParams.keys()) {
    if (TRACKING_PARAM.test(key)) found.push(key);
  }
  return found;
}

/** A listed tool we have a fact file for. Hidden and redirect slugs are not in the catalog for this page. */
export function isDealsCatalogSlug(slug: string): boolean {
  return Boolean(getToolFacts(slug)) && !isHiddenPlatform(slug);
}

export function dealProblems(offer: DealOffer): string[] {
  const problems: string[] = [];
  if (!offer.sourceUrl.trim()) problems.push("missing sourceUrl");
  if (!offer.lastChecked.trim()) problems.push("missing lastChecked");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(offer.lastChecked)) problems.push("lastChecked is not an ISO date");
  if (offer.expiresAt && !/^\d{4}-\d{2}-\d{2}$/.test(offer.expiresAt)) problems.push("expiresAt is not an ISO date");
  const timed = offer.offerType === "code" || offer.offerType === "discount";
  if (timed && !offer.expiresAt && offer.noEndDateStated !== true) {
    problems.push("code/discount needs expiresAt or noEndDateStated");
  }
  if (trackingParamNames(offer.url).length > 0) problems.push("tracking params in url");
  if (trackingParamNames(offer.sourceUrl).length > 0) problems.push("tracking params in sourceUrl");
  if (!isDealsCatalogSlug(offer.platformSlug)) problems.push("slug not in catalog");
  return problems;
}

/** Whole UTC days from lastChecked to `now`. Negative when the check date is still in the future. */
export function offerAgeDays(lastChecked: string, now: Date): number {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const checked = Date.parse(`${lastChecked.slice(0, 10)}T00:00:00Z`);
  return Math.floor((today - checked) / 86_400_000);
}

export function isOfferExpired(offer: DealOffer, now: Date): boolean {
  if (!offer.expiresAt) return false;
  return offerAgeDays(offer.expiresAt, now) > 0;
}

export function isOfferStale(offer: DealOffer, now: Date): boolean {
  return offerAgeDays(offer.lastChecked, now) > STALE_AFTER_DAYS[offer.offerType];
}

/** Live means verified, not expired, and checked recently enough for its type. */
export function isOfferLive(offer: DealOffer, now: Date): boolean {
  if (!offer.verified) return false;
  if (!offer.sourceUrl.trim() || !offer.lastChecked.trim()) return false;
  if (isOfferExpired(offer, now)) return false;
  if (isOfferStale(offer, now)) return false;
  return true;
}

export function liveDeals(now: Date, deals: readonly DealOffer[] = DEALS): DealOffer[] {
  return deals.filter((offer) => isOfferLive(offer, now));
}

/**
 * Tool name, then slug, then title. Affiliate status is not a parameter,
 * so it cannot change this order.
 */
export function compareOffers(a: { name: string; slug: string; title?: string }, b: { name: string; slug: string; title?: string }): number {
  const byName = a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  if (byName !== 0) return byName;
  const bySlug = a.slug.localeCompare(b.slug);
  if (bySlug !== 0) return bySlug;
  return (a.title ?? "").localeCompare(b.title ?? "", "en", { sensitivity: "base" });
}

function toolName(slug: string, names: ReadonlyMap<string, ToolDirectoryEntry>, facts: ToolFacts | undefined): string {
  const given = names.get(slug)?.name.trim();
  if (given) return given;
  const display = facts?.displayName;
  if (display && isPublishedVerified(display) && display.value.trim()) return display.value.trim();
  return slug;
}

function offerHref(slug: string, official: string): { href: string; rel: string; affiliate: AffiliateEntry | null } {
  const affiliate = getAffiliateLink(slug) ?? null;
  if (affiliate) return { href: affiliate.href, rel: "sponsored noopener noreferrer", affiliate };
  return { href: official, rel: "noopener noreferrer", affiliate: null };
}

function endsLabel(offer: DealOffer): string | null {
  if (offer.noEndDateStated) return "No end date stated";
  if (offer.expiresAt) return `Ends ${offer.expiresAt}`;
  return null;
}

export type FreePlanRecord = {
  slug: string;
  summary: string;
  sourceUrl: string;
  lastChecked: string;
  url: string;
};

/**
 * Verified, listed free tiers. Unverified facts and hidden tools (including
 * Hedra) are left out. Synthesia has no free-tier fact; its verified $0
 * Basic plan is the free plan, read from that fact rather than copied here.
 */
export function verifiedFreePlans(): FreePlanRecord[] {
  const plans: FreePlanRecord[] = [];
  for (const facts of listRegisteredToolFacts()) {
    if (facts.visibility === "hidden" || isHiddenPlatform(facts.slug)) continue;
    const fact = facts.freeTier;
    if (!fact || !isPublishedVerified(fact) || fact.value.available !== true) continue;
    const official = facts.officialUrl;
    const url = official && isPublishedVerified(official) && official.value.startsWith("https://") ? official.value : fact.sourceUrl;
    plans.push({
      slug: facts.slug,
      summary: fact.value.summary,
      sourceUrl: fact.sourceUrl,
      lastChecked: fact.checkedAt,
      url,
    });
  }
  const synthesia = getToolFacts("synthesia");
  const basic = synthesia?.plans && isPublishedVerified(synthesia.plans)
    ? synthesia.plans.value.find((plan) => plan.name === "Basic" && plan.price === "$0")
    : undefined;
  if (synthesia && basic && synthesia.plans && !plans.some((plan) => plan.slug === "synthesia")) {
    if (synthesia.visibility !== "hidden" && !isHiddenPlatform("synthesia")) {
      plans.push({
        slug: "synthesia",
        summary: `Free ${basic.name} plan (${basic.price}, ${basic.limits}).`,
        sourceUrl: synthesia.plans.sourceUrl,
        lastChecked: synthesia.plans.checkedAt,
        url: synthesia.plans.sourceUrl,
      });
    }
  }
  return plans;
}

function curatedView(offer: DealOffer, names: ReadonlyMap<string, ToolDirectoryEntry>): DealsOfferView {
  const facts = getToolFacts(offer.platformSlug);
  const link = offerHref(offer.platformSlug, offer.url);
  return {
    slug: offer.platformSlug,
    name: toolName(offer.platformSlug, names, facts),
    title: offer.title,
    details: offer.details,
    eligibility: offer.eligibility,
    href: link.href,
    rel: link.rel,
    code: link.affiliate ? null : (offer.code ?? null),
    endsLabel: endsLabel(offer),
    sourceUrl: offer.sourceUrl,
    lastChecked: offer.lastChecked,
    affiliate: link.affiliate,
    curated: true,
  };
}

function freeView(plan: FreePlanRecord, names: ReadonlyMap<string, ToolDirectoryEntry>): DealsOfferView {
  const facts = getToolFacts(plan.slug);
  const link = offerHref(plan.slug, plan.url);
  return {
    slug: plan.slug,
    name: toolName(plan.slug, names, facts),
    title: "Free plan",
    details: plan.summary,
    eligibility: "",
    href: link.href,
    rel: link.rel,
    code: null,
    endsLabel: null,
    sourceUrl: plan.sourceUrl,
    lastChecked: plan.lastChecked,
    affiliate: link.affiliate,
    curated: false,
  };
}

export function disclosureForOffers(offers: readonly { slug: string; affiliate: AffiliateEntry | null }[]): DisclosureMarker {
  const seen = new Set<string>();
  const markers: DisclosureMarker = [];
  for (const offer of offers) {
    if (!offer.affiliate || seen.has(offer.slug)) continue;
    seen.add(offer.slug);
    markers.push({ slug: offer.slug, kinds: [...requiredDisclosure(offer.affiliate)] });
  }
  return markers;
}

/**
 * Index the page when at least 12 live offers span at least 3 sections and
 * affiliate offers are at most 20% of the curated (hand-written) offers.
 * Affiliate offers include a free-plan card whose link is an affiliate link.
 * "Exceed 20%" is strict: exactly 20% stays indexable.
 */
export function dealsIndexableFromCounts(input: {
  offerCount: number;
  sectionCount: number;
  curatedCount: number;
  affiliateCount: number;
}): boolean {
  if (input.offerCount < 12 || input.sectionCount < 3) return false;
  if (input.curatedCount === 0) return false;
  return input.affiliateCount / input.curatedCount <= 0.2;
}

function sectionIdFor(offer: DealOffer): DealSectionId {
  if (offer.offerType === "trial") return "trial";
  if (offer.offerType === "student") return "student";
  return "codes";
}

export function buildDealsPage(args: { now?: Date; names?: ReadonlyMap<string, ToolDirectoryEntry> } = {}): DealsPageModel {
  const now = args.now ?? new Date();
  const names = args.names ?? new Map<string, ToolDirectoryEntry>();
  const grouped: Record<DealSectionId, DealsOfferView[]> = {
    trial: [],
    student: [],
    codes: [],
    free: verifiedFreePlans().map((plan) => freeView(plan, names)),
  };
  const curatedViews: DealsOfferView[] = [];
  for (const offer of liveDeals(now)) {
    const view = curatedView(offer, names);
    curatedViews.push(view);
    grouped[sectionIdFor(offer)].push(view);
  }
  for (const id of DEAL_SECTION_ORDER) grouped[id].sort(compareOffers);

  const sections: DealsSectionView[] = DEAL_SECTION_ORDER.map((id) => ({
    id,
    title: SECTION_TITLES[id],
    collapsed: id === "free",
    offers: grouped[id],
  }));
  const visible = sections.filter((section) => section.offers.length > 0);
  const affiliateCount = sections.reduce(
    (sum, section) => sum + section.offers.filter((offer) => offer.affiliate).length,
    0,
  );
  const indexable = dealsIndexableFromCounts({
    offerCount: visible.reduce((sum, section) => sum + section.offers.length, 0),
    sectionCount: visible.length,
    curatedCount: curatedViews.length,
    affiliateCount,
  });
  return {
    indexable,
    sections,
    disclosure: disclosureForOffers(sections.flatMap((section) => section.offers)),
    curatedCount: curatedViews.length,
    affiliateCuratedCount: curatedViews.filter((offer) => offer.affiliate).length,
  };
}

export function dealsPageIndexable(now: Date = new Date()): boolean {
  return buildDealsPage({ now }).indexable;
}

/** Promo codes the connector must never repeat: deals.ts codes plus affiliate codes. */
export function connectorPromoCodes(): string[] {
  const codes = new Set<string>();
  for (const offer of DEALS) {
    if (offer.code) codes.add(offer.code);
  }
  for (const entry of Object.values(AFFILIATE_LINKS)) {
    if (entry.promoCode?.code) codes.add(entry.promoCode.code);
  }
  return [...codes];
}
