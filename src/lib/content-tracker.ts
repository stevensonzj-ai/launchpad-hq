/**
 * Pure transform behind `npm run export:content-tracker`
 * (scripts/export-content-tracker.ts). No I/O: the script reads the database,
 * the repo's static content registries, the live sitemap and an optional audit
 * file, then hands everything here to build the Platforms / Content / Summary /
 * Notes sheets.
 *
 * Never invents values. A column with no source in the schema or the repo is
 * left blank and listed as a data gap on the Notes sheet.
 */
import { formatPlans } from "@/data/facts/overlay";
import { FACT_VALUE_KEYS, type ToolFacts } from "@/data/facts/types";
import type { PlatformTutorialData } from "@/data/tutorials/types";
import type { ComparePage } from "@/data/compare/pages";
import type { WorkflowTemplate } from "@/data/workflows/types";
import { AFFILIATE_LINKS, requiredDisclosure, type AffiliateEntry } from "@/data/affiliates";
import type { DisclosureKind, DisclosureMarker } from "@/data/disclosures";

/** A platform or content item is stale once its newest dated change is older than this. */
export const STALE_DAYS = 90;
/** Days-since-update cells turn amber above this, red above STALE_DAYS. */
export const AMBER_DAYS = 60;
export const SITE_ORIGIN = "https://launchpadhq.io";
export const DEFAULT_SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
export const TOP_STALE_LIMIT = 20;

const DAY_MS = 86_400_000;

// ── Inputs ──────────────────────────────────────────────────

/** One `platforms` row joined to its category, plus approved community counts. */
export type PlatformRecord = {
  slug: string;
  name: string;
  website: string | null;
  description: string | null;
  categoryName: string;
  categorySlug: string;
  costTier: string;
  currentPricing: string | null;
  apiAvailable: boolean;
  verified: boolean;
  updatedAt: Date;
  approvedPrompts: number;
  pendingPrompts: number;
  approvedDiscussions: number;
  pendingDiscussions: number;
};

export type TrackerInput = {
  platforms: PlatformRecord[];
  facts: ReadonlyMap<string, ToolFacts>;
  tutorials: readonly PlatformTutorialData[];
  comparePages: readonly ComparePage[];
  workflows: readonly WorkflowTemplate[];
  hiddenSlugs: ReadonlySet<string>;
  /** Normalized paths from the live sitemap; null when it was not fetched. */
  sitemapPaths: ReadonlySet<string> | null;
  /** Normalized audit key → result; null when no --audit file was given. */
  audit: ReadonlyMap<string, string> | null;
  now: Date;
  /** Affiliate / free-access registry; defaults to src/data/affiliates.ts. */
  affiliates?: Readonly<Record<string, AffiliateEntry>>;
};

// ── Column definitions (drive the workbook and the Notes sheet) ─────────

export type ColumnKind = "text" | "int" | "date" | "yn" | "url";

export type ColumnDef<K extends string> = {
  key: K;
  header: string;
  kind: ColumnKind;
  width: number;
  /** Where the value comes from. */
  source: string;
  /** Set when the column is always blank: why, for the Notes sheet. */
  blankReason?: string;
};

export const PLATFORM_COLUMNS = [
  { key: "name", header: "Name", kind: "text", width: 28, source: "platforms.name" },
  { key: "slug", header: "Slug", kind: "text", width: 26, source: "platforms.slug" },
  { key: "pageUrl", header: "Launchpad URL", kind: "url", width: 44, source: `${SITE_ORIGIN}/platform/{slug}` },
  { key: "website", header: "Official site", kind: "url", width: 36, source: "Fact file officialUrl, else platforms.website" },
  { key: "category", header: "Category", kind: "text", width: 22, source: "categories.name via platforms.categoryId" },
  { key: "pricing", header: "Pricing summary", kind: "text", width: 50, source: "Fact file plans (formatted), else platforms.currentPricing" },
  { key: "freePlan", header: "Free plan", kind: "yn", width: 10, source: "Fact file freeTier.available, else platforms.costTier (FREE/FREEMIUM = Y, PAID/ENTERPRISE = N)" },
  { key: "affiliate", header: "Affiliate", kind: "yn", width: 10, source: "Y when src/data/affiliates.ts has an entry for the slug (the only place an affiliate link can come from)" },
  { key: "sponsor", header: "Sponsor / free access", kind: "yn", width: 12, source: "Free access: src/data/affiliates.ts freeAccess.granted (N when no entry). Sponsor placements (src/data/sponsors/placements.ts) are keyed by sponsor name, not slug, so they are not counted here." },
  { key: "hasApi", header: "Has API", kind: "yn", width: 9, source: "platforms.apiAvailable" },
  { key: "hasMcp", header: "Has MCP", kind: "yn", width: 9, source: "none", blankReason: "No MCP-server field exists in the schema or the fact files." },
  { key: "descriptionPresent", header: "Description", kind: "yn", width: 12, source: "platforms.description is non-blank" },
  { key: "descriptionLength", header: "Description length", kind: "int", width: 12, source: "Character count of trimmed platforms.description" },
  { key: "tutorials", header: "Tutorials", kind: "int", width: 10, source: "src/data/tutorials registry entries with this platformSlug (/platform/{slug}/guide)" },
  { key: "guides", header: "Guides (workflows)", kind: "int", width: 11, source: "src/data/workflows templates naming this slug in any tier's tools or steps" },
  { key: "comparisons", header: "Comparisons", kind: "int", width: 12, source: "src/data/compare head-to-head pages with this slug as a or b" },
  { key: "alternatives", header: "Alternatives pages", kind: "int", width: 12, source: "src/data/compare free-alternatives pages with this slug as baseline or an alternative" },
  { key: "prompts", header: "Prompts", kind: "int", width: 9, source: "prompts rows with status APPROVED" },
  { key: "discussions", header: "Discussions", kind: "int", width: 11, source: "discussions rows with status APPROVED" },
  { key: "factsLastVerified", header: "Facts last verified", kind: "date", width: 13, source: "Latest verifiedAt (or checkedAt on a verified fact) across the fact file" },
  { key: "sourcesPresent", header: "Source links", kind: "yn", width: 10, source: "Fact file has at least one fact with a sourceUrl" },
  { key: "recordUpdatedAt", header: "Record updatedAt", kind: "date", width: 13, source: "platforms.updatedAt" },
  { key: "latestContentDate", header: "Most recent content date", kind: "date", width: 13, source: "Max of platforms.updatedAt, tutorial lastReviewedAt, fact checkedAt/verifiedAt" },
  { key: "daysSinceUpdate", header: "Days since update", kind: "int", width: 11, source: "Whole days from 'Most recent content date' to the export time" },
  { key: "stale", header: "Stale", kind: "yn", width: 8, source: `Y when days since update > ${STALE_DAYS} or no source links` },
  { key: "pageViews", header: "Page views", kind: "int", width: 10, source: "none", blankReason: "No page-view field exists in the schema (views live in Vercel Analytics, not the database)." },
  { key: "liveInSitemap", header: "In sitemap", kind: "yn", width: 10, source: "Platform page path appears in the fetched sitemap" },
  { key: "notes", header: "Notes", kind: "text", width: 60, source: "Derived flags (see Notes sheet)" },
] as const satisfies readonly ColumnDef<string>[];

export const CONTENT_COLUMNS = [
  { key: "title", header: "Title", kind: "text", width: 48, source: "Registry title" },
  { key: "type", header: "Type", kind: "text", width: 13, source: "tutorial | workflow | comparison | alternatives" },
  { key: "platforms", header: "Platforms covered", kind: "text", width: 40, source: "platformSlug / compare a,b / baseline + alternatives / workflow tool slugs" },
  { key: "url", header: "URL", kind: "url", width: 50, source: `${SITE_ORIGIN} + the page's route` },
  { key: "status", header: "Status", kind: "text", width: 9, source: "live = URL in sitemap, draft = not in sitemap (a tutorial without a platforms row is always draft: its route 404s)" },
  { key: "published", header: "Published", kind: "date", width: 13, source: "none", blankReason: "No content registry records a publish date." },
  { key: "lastUpdated", header: "Last updated", kind: "date", width: 13, source: "Tutorial lastReviewedAt; workflows and compare pages carry no date" },
  { key: "daysSinceUpdate", header: "Days since update", kind: "int", width: 11, source: "Whole days from 'Last updated' to the export time" },
  { key: "stale", header: "Stale", kind: "yn", width: 8, source: `Y when days since update > ${STALE_DAYS}; blank when there is no date` },
  { key: "disclosure", header: "Disclosure present", kind: "yn", width: 11, source: "Y when the page's disclosure marker (tutorial or compare entry) covers every affiliate / free-access platform it renders, N when one is missing; blank when the page renders none. Workflows carry no marker." },
  { key: "auditResult", header: "Audit result", kind: "text", width: 30, source: "--audit file, matched by slug, platform slug, path or URL" },
] as const satisfies readonly ColumnDef<string>[];

type PlatformKey = (typeof PLATFORM_COLUMNS)[number]["key"];
type ContentKey = (typeof CONTENT_COLUMNS)[number]["key"];
export type CellValue = string | number | Date | null;
export type PlatformRow = Record<PlatformKey, CellValue>;
export type ContentRow = Record<ContentKey, CellValue>;

// ── Small helpers ───────────────────────────────────────────

export function yn(value: boolean | null | undefined): "Y" | "N" | null {
  if (value === null || value === undefined) return null;
  return value ? "Y" : "N";
}

/** "YYYY-MM-DD" (or a longer ISO string) → Date at UTC midnight; null if unparseable. */
export function parseIsoDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function maxDate(dates: readonly (Date | null | undefined)[]): Date | null {
  let best: Date | null = null;
  for (const d of dates) {
    if (d && (!best || d.getTime() > best.getTime())) best = d;
  }
  return best;
}

/** Whole days elapsed from `from` to `now` (never negative); null without a date. */
export function daysSince(from: Date | null, now: Date): number | null {
  if (!from) return null;
  return Math.max(0, Math.floor((now.getTime() - from.getTime()) / DAY_MS));
}

/** Platform rule: no dated change, older than STALE_DAYS, or no source links. */
export function isPlatformStale(days: number | null, hasSources: boolean): boolean {
  return days === null || days > STALE_DAYS || !hasSources;
}

/** Content rule: older than STALE_DAYS. Undated content is unknown (null), not stale. */
export function isContentStale(days: number | null): boolean | null {
  return days === null ? null : days > STALE_DAYS;
}

/** Path form used to match sitemap entries and audit keys: lowercase, no origin, no trailing slash. */
export function normalizePath(urlOrPath: string): string {
  let path = urlOrPath.trim();
  try {
    if (/^https?:\/\//i.test(path)) path = new URL(path).pathname;
  } catch {
    /* keep as given */
  }
  path = path.split(/[?#]/)[0].toLowerCase();
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path;
}

export function platformPath(slug: string): string {
  return `/platform/${slug}`;
}

/** `<loc>` values of a sitemap or sitemap index. */
export function parseSitemapLocs(xml: string): string[] {
  const locs: string[] = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) locs.push(m[1].replace(/&amp;/g, "&"));
  return locs;
}

export function isSitemapIndex(xml: string): boolean {
  return /<sitemapindex[\s>]/i.test(xml);
}

/** "2026-10-29 14:05 CDT" in America/Chicago. */
export function chicagoTimestamp(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")} ${get("timeZoneName")}`;
}

/** YYYY-MM-DD in America/Chicago, for the default file name. */
export function chicagoDate(date: Date): string {
  return chicagoTimestamp(date).slice(0, 10);
}

// ── Audit file ──────────────────────────────────────────────

const AUDIT_KEY_FIELDS = ["slug", "url", "path", "platformslug", "platform_slug", "key", "id"];
const AUDIT_RESULT_FIELDS = ["result", "audit", "auditresult", "audit_result", "status", "verdict", "outcome"];

function auditResultText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    const rec = lowerKeys(value as Record<string, unknown>);
    for (const f of AUDIT_RESULT_FIELDS) {
      if (f in rec) return auditResultText(rec[f]);
    }
    return JSON.stringify(value);
  }
  return null;
}

function lowerKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) out[k.toLowerCase()] = v;
  return out;
}

/** Audit keys are either a URL/path (normalized) or a bare slug (lowercased). */
export function normalizeAuditKey(key: string): string {
  const k = key.trim();
  return k.includes("/") ? normalizePath(k) : k.toLowerCase();
}

/** Minimal RFC 4180 CSV parser (quoted fields, escaped quotes, CRLF). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += ch;
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

/**
 * Parse an --audit file into key → result. Accepts:
 *  - JSON object map: { "<slug or url>": "pass" | { result: "..." } }
 *  - JSON array: [{ slug | url | path, result | status | verdict }]
 *  - CSV with a header containing a key column (slug/url/path) and a result column.
 */
export function parseAuditFile(text: string, format: "json" | "csv"): Map<string, string> {
  const out = new Map<string, string>();
  const add = (key: unknown, value: unknown) => {
    if (typeof key !== "string" || !key.trim()) return;
    const result = auditResultText(value);
    if (result !== null) out.set(normalizeAuditKey(key), result);
  };

  if (format === "json") {
    const data: unknown = JSON.parse(text);
    const list = Array.isArray(data)
      ? data
      : data && typeof data === "object" && Array.isArray((data as { results?: unknown }).results)
        ? (data as { results: unknown[] }).results
        : null;
    if (list) {
      for (const item of list) {
        if (!item || typeof item !== "object") continue;
        const rec = lowerKeys(item as Record<string, unknown>);
        const keyField = AUDIT_KEY_FIELDS.find((f) => typeof rec[f] === "string" && rec[f]);
        if (keyField) add(rec[keyField], item);
      }
    } else if (data && typeof data === "object") {
      for (const [k, v] of Object.entries(data as Record<string, unknown>)) add(k, v);
    } else {
      throw new Error("Audit JSON must be an object map or an array of results.");
    }
    return out;
  }

  const [header, ...rows] = parseCsv(text);
  if (!header) return out;
  const cols = header.map((h) => h.trim().toLowerCase());
  const keyIdx = cols.findIndex((c) => AUDIT_KEY_FIELDS.includes(c));
  const resultIdx = cols.findIndex((c) => AUDIT_RESULT_FIELDS.includes(c));
  if (keyIdx < 0 || resultIdx < 0) {
    throw new Error(
      `Audit CSV needs a key column (${AUDIT_KEY_FIELDS.join("/")}) and a result column (${AUDIT_RESULT_FIELDS.join("/")}).`,
    );
  }
  for (const r of rows) add(r[keyIdx], r[resultIdx]);
  return out;
}

// ── Facts ───────────────────────────────────────────────────

export type FactsSummary = {
  lastVerified: Date | null;
  lastChecked: Date | null;
  sourceCount: number;
  unverified: number;
  disputed: number;
};

export function summarizeFacts(facts: ToolFacts | undefined): FactsSummary {
  const summary: FactsSummary = { lastVerified: null, lastChecked: null, sourceCount: 0, unverified: 0, disputed: 0 };
  if (!facts) return summary;
  for (const key of FACT_VALUE_KEYS) {
    const fact = facts[key];
    if (!fact) continue;
    if (fact.sourceUrl?.trim()) summary.sourceCount++;
    if (fact.status === "unverified") summary.unverified++;
    if (fact.status === "disputed") summary.disputed++;
    const checked = parseIsoDate(fact.checkedAt);
    summary.lastChecked = maxDate([summary.lastChecked, checked]);
    const verified = parseIsoDate(fact.verifiedAt) ?? (fact.status === "verified" ? checked : null);
    summary.lastVerified = maxDate([summary.lastVerified, verified]);
  }
  return summary;
}

export function freePlanFrom(costTier: string, facts: ToolFacts | undefined): boolean | null {
  if (facts?.freeTier) return facts.freeTier.value.available;
  switch (costTier) {
    case "FREE":
    case "FREEMIUM":
      return true;
    case "PAID":
    case "ENTERPRISE":
      return false;
    default:
      return null;
  }
}

// ── Content index ───────────────────────────────────────────

export type ContentItem = {
  title: string;
  type: "tutorial" | "workflow" | "comparison" | "alternatives";
  platformSlugs: string[];
  path: string;
  lastUpdated: Date | null;
  /** Extra audit keys besides the path (slugs). */
  auditKeys: string[];
  /** The page's disclosure marker (tutorials and compare pages; empty for workflows). */
  disclosure: DisclosureMarker;
};

// ── Disclosure check ────────────────────────────────────────

export type DisclosureGap = { where: string; slug: string; missing: DisclosureKind[] };

function missingKinds(required: readonly DisclosureKind[], shown: readonly DisclosureKind[]): DisclosureKind[] {
  return required.filter((k) => !shown.includes(k));
}

/** Disclosure each platform needs, by slug (affiliate, plus free-access when granted). */
export function requiredDisclosures(affiliates: Readonly<Record<string, AffiliateEntry>>): Map<string, DisclosureKind[]> {
  return new Map(Object.values(affiliates).map((e) => [e.slug, requiredDisclosure(e)]));
}

/** Gaps on one content item: platforms it renders that need a disclosure its marker lacks. */
export function contentDisclosureGaps(item: ContentItem, required: ReadonlyMap<string, DisclosureKind[]>): DisclosureGap[] {
  const gaps: DisclosureGap[] = [];
  for (const slug of item.platformSlugs) {
    const need = required.get(slug);
    if (!need) continue;
    const shown = item.disclosure.find((m) => m.slug === slug)?.kinds ?? [];
    const missing = missingKinds(need, shown);
    if (missing.length) gaps.push({ where: item.path, slug, missing });
  }
  return gaps;
}

/**
 * "Affiliate link but no disclosure": registry entries whose own disclosure
 * misses a required kind, and guides / comparisons / workflows that render
 * such a platform without disclosing it.
 */
export function disclosureGaps(
  affiliates: Readonly<Record<string, AffiliateEntry>>,
  items: readonly ContentItem[],
): DisclosureGap[] {
  const required = requiredDisclosures(affiliates);
  const gaps: DisclosureGap[] = [];
  for (const entry of Object.values(affiliates)) {
    const missing = missingKinds(requiredDisclosure(entry), entry.disclosure);
    if (missing.length) gaps.push({ where: platformPath(entry.slug), slug: entry.slug, missing });
  }
  for (const item of items) gaps.push(...contentDisclosureGaps(item, required));
  return gaps;
}

export function workflowSlugs(workflow: WorkflowTemplate): string[] {
  const slugs = new Set<string>();
  for (const tier of Object.values(workflow.tiers)) {
    for (const tool of tier.tools) if (tool.slug) slugs.add(tool.slug);
    for (const step of tier.steps ?? []) if (step.toolSlug) slugs.add(step.toolSlug);
  }
  return [...slugs].sort();
}

export function buildContentItems(input: Pick<TrackerInput, "tutorials" | "comparePages" | "workflows">): ContentItem[] {
  const items: ContentItem[] = [];
  for (const t of input.tutorials) {
    items.push({
      title: t.title,
      type: "tutorial",
      platformSlugs: [t.platformSlug],
      path: `/platform/${t.platformSlug}/guide`,
      lastUpdated: parseIsoDate(t.lastReviewedAt),
      auditKeys: [t.slug, t.platformSlug],
      disclosure: t.disclosure ?? [],
    });
  }
  for (const w of input.workflows) {
    items.push({
      title: w.title,
      type: "workflow",
      platformSlugs: workflowSlugs(w),
      path: `/workflows/${w.slug}`,
      lastUpdated: null,
      auditKeys: [w.slug],
      disclosure: [],
    });
  }
  for (const p of input.comparePages) {
    const head = p.kind === "head-to-head";
    items.push({
      title: p.title,
      type: head ? "comparison" : "alternatives",
      platformSlugs: head ? [p.a, p.b] : [p.baseline, ...p.alternatives.map((a) => a.slug)],
      path: head ? `/compare/${p.slug}` : `/alternatives/${p.slug}`,
      lastUpdated: null,
      auditKeys: [p.slug],
      disclosure: p.disclosure ?? [],
    });
  }
  return items;
}

// ── Sheets ──────────────────────────────────────────────────

export type PlatformComputed = {
  row: PlatformRow;
  slug: string;
  name: string;
  category: string;
  days: number | null;
  stale: boolean;
  hidden: boolean;
  hasEditorialContent: boolean;
  emptyDescription: boolean;
};

export function buildPlatformRows(input: TrackerInput, items: readonly ContentItem[]): PlatformComputed[] {
  const countBy = (type: ContentItem["type"], slug: string) =>
    items.filter((i) => i.type === type && i.platformSlugs.includes(slug)).length;

  const affiliates = input.affiliates ?? AFFILIATE_LINKS;
  const gaps = disclosureGaps(affiliates, items);
  return input.platforms.map((p) => {
    const facts = input.facts.get(p.slug);
    const affiliate = affiliates[p.slug];
    const fs = summarizeFacts(facts);
    const tutorial = input.tutorials.find((t) => t.platformSlug === p.slug);
    const latest = maxDate([p.updatedAt, parseIsoDate(tutorial?.lastReviewedAt), fs.lastChecked, fs.lastVerified]);
    const days = daysSince(latest, input.now);
    const hasSources = fs.sourceCount > 0;
    const stale = isPlatformStale(days, hasSources);
    const description = p.description?.trim() ?? "";
    const hidden = input.hiddenSlugs.has(p.slug);
    const counts = {
      tutorials: countBy("tutorial", p.slug),
      guides: countBy("workflow", p.slug),
      comparisons: countBy("comparison", p.slug),
      alternatives: countBy("alternatives", p.slug),
    };
    const inSitemap = input.sitemapPaths ? input.sitemapPaths.has(normalizePath(platformPath(p.slug))) : null;

    const notes: string[] = [];
    if (!description) notes.push("empty description");
    if (hidden) notes.push("hidden");
    if (facts && facts.lifecycle !== "active") notes.push(`lifecycle: ${facts.lifecycle}`);
    if (!facts) notes.push("no fact file");
    if (fs.unverified) notes.push(`${fs.unverified} unverified fact${fs.unverified === 1 ? "" : "s"}`);
    if (fs.disputed) notes.push(`${fs.disputed} disputed fact${fs.disputed === 1 ? "" : "s"}`);
    if (!p.verified) notes.push("platforms.verified = false");
    if (facts?.displayName && facts.displayName.value !== p.name) notes.push(`displays as "${facts.displayName.value}"`);
    if (p.pendingPrompts) notes.push(`${p.pendingPrompts} pending prompt${p.pendingPrompts === 1 ? "" : "s"}`);
    if (p.pendingDiscussions) notes.push(`${p.pendingDiscussions} pending discussion${p.pendingDiscussions === 1 ? "" : "s"}`);
    if (inSitemap === false && !hidden) notes.push("not in sitemap");
    const ownGaps = gaps.filter((g) => g.slug === p.slug);
    if (ownGaps.length) notes.push(`affiliate link but no disclosure: ${ownGaps.map((g) => g.where).join(", ")}`);

    const row: PlatformRow = {
      name: p.name,
      slug: p.slug,
      pageUrl: `${SITE_ORIGIN}${platformPath(p.slug)}`,
      website: facts?.officialUrl?.value ?? p.website ?? null,
      category: p.categoryName,
      pricing: facts?.plans?.value.length ? formatPlans(facts.plans.value) : (p.currentPricing?.trim() || null),
      freePlan: yn(freePlanFrom(p.costTier, facts)),
      affiliate: yn(affiliate !== undefined),
      sponsor: yn(affiliate?.freeAccess.granted ?? false),
      hasApi: yn(p.apiAvailable),
      hasMcp: null,
      descriptionPresent: yn(description.length > 0),
      descriptionLength: description.length,
      ...counts,
      prompts: p.approvedPrompts,
      discussions: p.approvedDiscussions,
      factsLastVerified: fs.lastVerified,
      sourcesPresent: yn(hasSources),
      recordUpdatedAt: p.updatedAt,
      latestContentDate: latest,
      daysSinceUpdate: days,
      stale: yn(stale),
      pageViews: null,
      liveInSitemap: yn(inSitemap),
      notes: notes.join("; ") || null,
    };

    return {
      row,
      slug: p.slug,
      name: p.name,
      category: p.categoryName,
      days,
      stale,
      hidden,
      hasEditorialContent: counts.tutorials + counts.guides + counts.comparisons + counts.alternatives > 0,
      emptyDescription: !description,
    };
  });
}

export type ContentComputed = { row: ContentRow; item: ContentItem; days: number | null; stale: boolean | null };

export function contentStatus(
  item: ContentItem,
  sitemapPaths: ReadonlySet<string> | null,
  platformSlugs: ReadonlySet<string>,
): "live" | "draft" | null {
  if (item.type === "tutorial" && !platformSlugs.has(item.platformSlugs[0])) return "draft";
  if (!sitemapPaths) return null;
  return sitemapPaths.has(normalizePath(item.path)) ? "live" : "draft";
}

export function lookupAudit(item: ContentItem, audit: ReadonlyMap<string, string> | null): string | null {
  if (!audit) return null;
  for (const key of [normalizePath(item.path), ...item.auditKeys.map((k) => k.toLowerCase())]) {
    const hit = audit.get(key);
    if (hit !== undefined) return hit;
  }
  return null;
}

export function buildContentRows(input: TrackerInput, items: readonly ContentItem[]): ContentComputed[] {
  const platformSlugs = new Set(input.platforms.map((p) => p.slug));
  const required = requiredDisclosures(input.affiliates ?? AFFILIATE_LINKS);
  return items.map((item) => {
    const needsDisclosure = item.platformSlugs.some((slug) => required.has(slug));
    const days = daysSince(item.lastUpdated, input.now);
    const stale = isContentStale(days);
    return {
      item,
      days,
      stale,
      row: {
        title: item.title,
        type: item.type,
        platforms: item.platformSlugs.join(", "),
        url: `${SITE_ORIGIN}${item.path}`,
        status: contentStatus(item, input.sitemapPaths, platformSlugs),
        published: null,
        lastUpdated: item.lastUpdated,
        daysSinceUpdate: days,
        stale: yn(stale),
        disclosure: needsDisclosure ? yn(contentDisclosureGaps(item, required).length === 0) : null,
        auditResult: lookupAudit(item, input.audit),
      },
    };
  });
}

export type TrackerSummary = {
  generatedAt: string;
  platformCount: number;
  listedPlatformCount: number;
  hiddenPlatformCount: number;
  contentCount: number;
  contentByType: [string, number][];
  platformsByCategory: [string, number, number][]; // category, platforms, stale
  stalePlatforms: number;
  stalePlatformPct: number;
  datedContent: number;
  staleContent: number;
  staleContentPct: number | null;
  undatedContent: number;
  topStale: { name: string; slug: string; days: number | null; notes: string | null }[];
  noContentPlatforms: { name: string; slug: string; category: string }[];
  emptyDescriptions: { name: string; slug: string }[];
  /** "Affiliate link but no disclosure" check; empty when every disclosure is in place. */
  disclosureGaps: DisclosureGap[];
};

export function pct(part: number, whole: number): number {
  return whole === 0 ? 0 : Math.round((part / whole) * 1000) / 10;
}

export function buildSummary(
  platforms: readonly PlatformComputed[],
  content: readonly ContentComputed[],
  now: Date,
  affiliates: Readonly<Record<string, AffiliateEntry>> = AFFILIATE_LINKS,
): TrackerSummary {
  const byCategory = new Map<string, [number, number]>();
  for (const p of platforms) {
    const entry = byCategory.get(p.category) ?? [0, 0];
    entry[0]++;
    if (p.stale) entry[1]++;
    byCategory.set(p.category, entry);
  }
  const byType = new Map<string, number>();
  for (const c of content) byType.set(c.item.type, (byType.get(c.item.type) ?? 0) + 1);

  const stalePlatforms = platforms.filter((p) => p.stale).length;
  const dated = content.filter((c) => c.days !== null);
  const staleContent = dated.filter((c) => c.stale).length;

  // Most stale first: undated before dated, then by age, then name.
  const topStale = platforms
    .filter((p) => p.stale)
    .sort((a, b) => (b.days ?? Infinity) - (a.days ?? Infinity) || a.name.localeCompare(b.name))
    .slice(0, TOP_STALE_LIMIT)
    .map((p) => ({ name: p.name, slug: p.slug, days: p.days, notes: (p.row.notes as string | null) ?? null }));

  return {
    generatedAt: chicagoTimestamp(now),
    platformCount: platforms.length,
    listedPlatformCount: platforms.filter((p) => !p.hidden).length,
    hiddenPlatformCount: platforms.filter((p) => p.hidden).length,
    contentCount: content.length,
    contentByType: [...byType.entries()].sort((a, b) => a[0].localeCompare(b[0])),
    platformsByCategory: [...byCategory.entries()]
      .map(([cat, [n, s]]) => [cat, n, s] as [string, number, number])
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
    stalePlatforms,
    stalePlatformPct: pct(stalePlatforms, platforms.length),
    datedContent: dated.length,
    staleContent,
    staleContentPct: dated.length ? pct(staleContent, dated.length) : null,
    undatedContent: content.length - dated.length,
    topStale,
    noContentPlatforms: platforms
      .filter((p) => !p.hasEditorialContent)
      .map((p) => ({ name: p.name, slug: p.slug, category: p.category }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    emptyDescriptions: platforms
      .filter((p) => p.emptyDescription)
      .map((p) => ({ name: p.name, slug: p.slug }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    disclosureGaps: disclosureGaps(affiliates, content.map((c) => c.item)),
  };
}

// ── Notes sheet ─────────────────────────────────────────────

export type FieldDefinition = { sheet: string; column: string; source: string };

export function fieldDefinitions(): FieldDefinition[] {
  return [
    ...PLATFORM_COLUMNS.map((c) => ({ sheet: "Platforms", column: c.header, source: c.source })),
    ...CONTENT_COLUMNS.map((c) => ({ sheet: "Content", column: c.header, source: c.source })),
  ];
}

export type DataGap = { item: string; detail: string };

export function dataGaps(opts: { auditProvided: boolean; sitemapError: string | null; sitemapSkipped: boolean }): DataGap[] {
  const gaps: DataGap[] = [];
  for (const c of PLATFORM_COLUMNS) {
    if ("blankReason" in c) gaps.push({ item: `Platforms: ${c.header}`, detail: c.blankReason });
  }
  for (const c of CONTENT_COLUMNS) {
    if ("blankReason" in c) gaps.push({ item: `Content: ${c.header}`, detail: c.blankReason });
  }
  gaps.push({
    item: "Content: Last updated (workflows, comparisons, alternatives)",
    detail: "src/data/workflows and src/data/compare carry no per-page date, so these rows are undated and left out of % content stale.",
  });
  if (!opts.auditProvided) {
    gaps.push({ item: "Content: Audit result", detail: "No --audit file was passed; column left blank." });
  }
  if (opts.sitemapSkipped) {
    gaps.push({ item: "Status / In sitemap", detail: "Sitemap check skipped (--no-sitemap); live/draft only set for tutorials without a platforms row." });
  } else if (opts.sitemapError) {
    gaps.push({ item: "Status / In sitemap", detail: `Sitemap fetch failed (${opts.sitemapError}); live/draft only set for tutorials without a platforms row.` });
  }
  gaps.push({
    item: "Tutorials (database)",
    detail: "The Prisma Tutorial table is intentionally unwired; live tutorials are the file-based guides in src/data/tutorials, which is what this export counts.",
  });
  gaps.push({
    item: "Platforms with no content beyond overview",
    detail: "Counts tutorials, workflows, comparisons and alternatives pages only. Community prompts and discussions are not editorial content.",
  });
  return gaps;
}
