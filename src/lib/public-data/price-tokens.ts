/**
 * Catalog price tokens for guide and workflow text.
 *
 * Guides and workflows never type a price. Where a sentence needs one, it
 * carries a token that is filled in at render time from the tool's catalog
 * plans (fact file over the DB row, through the serializer's `pagePlans`),
 * so the guide page, the workflow page and /data/v1 all print the price the
 * tool's own page prints:
 *
 *   {{price:chatgpt:Plus}}   that plan's price, e.g. "$20/month"
 *   {{from:chatgpt}}         the lowest paid plan's price, e.g. "$8/month"
 *
 * Tokens may only name a listed, non-discontinued tool whose fact file has
 * `plans` (so the value never depends on an unseen DB row), and a `price`
 * token's plan must exist there. `price-tokens.test.ts` checks every token
 * in every guide and workflow; a token that still fails at runtime drops
 * its sentence (resolvePriceTokens), and is never shown as raw `{{...}}`.
 *
 * Pure: no Prisma, no sponsor data.
 */
import type { DisplayPlan } from "./pricing";
import { lowestPaidPlan } from "./pricing";

export type PriceToken =
  | { kind: "price"; raw: string; slug: string; plan: string }
  | { kind: "from"; raw: string; slug: string };

const TOKEN_RE = /\{\{\s*(price|from)\s*:\s*([a-z0-9-]+)\s*(?::\s*([^{}]+?)\s*)?\}\}/g;

/** Anything that looks like a token, valid or not (used to catch typos). */
const ANY_TOKEN_RE = /\{\{[^}]*\}\}/g;

/**
 * Stands in for a text whose only sentences held unresolvable tokens (see
 * resolvePriceTokens). A full sentence, so it reads correctly on its own.
 */
export const UNRESOLVED_PRICE_TEXT = "Current prices are listed on its Launchpad page.";

export function parsePriceTokens(text: string): PriceToken[] {
  const out: PriceToken[] = [];
  for (const m of text.matchAll(TOKEN_RE)) {
    const [raw, kind, slug, plan] = m;
    if (kind === "price") {
      if (plan) out.push({ kind, raw, slug, plan });
    } else if (!plan) {
      out.push({ kind: "from", raw, slug });
    }
  }
  return out;
}

/** `{{...}}` spans that are not well-formed tokens. */
export function malformedTokens(text: string): string[] {
  const valid = new Set(parsePriceTokens(text).map((t) => t.raw));
  return [...text.matchAll(ANY_TOKEN_RE)].map((m) => m[0]).filter((raw) => !valid.has(raw));
}

const MONTH = /^(month|mo|monthly)$/i;

/**
 * A plan price as it reads in a sentence: "$20/month", "$20/user/month",
 * "$12 (billed annually)". Built only from the plan row's own price and
 * period, so it says what the pricing table says.
 */
export function prosePlanPrice(plan: DisplayPlan): string {
  const price = plan.price.trim();
  const period = plan.period.trim();
  if (!period) return price;
  if (MONTH.test(period)) return `${price}/month`;
  if (/^[a-z]+(?:\/[a-z]+)*$/i.test(period)) return `${price}/${period.toLowerCase()}`;
  return `${price} (${period})`;
}

/** Plans for a slug, or undefined when the tool may not be cited. */
export type PlansLookup = (slug: string) => DisplayPlan[] | undefined;

export type PriceResolver = (token: PriceToken) => string | null;

export function planByName(plans: DisplayPlan[], name: string): DisplayPlan | undefined {
  const key = name.trim().toLowerCase();
  return plans.find((p) => p.name.trim().toLowerCase() === key);
}

export function priceResolver(plansFor: PlansLookup): PriceResolver {
  return (token) => {
    const plans = plansFor(token.slug);
    if (!plans?.length) return null;
    const plan = token.kind === "price" ? planByName(plans, token.plan) : lowestPaidPlan(plans);
    return plan?.price.trim() ? prosePlanPrice(plan) : null;
  };
}

/** Marks a token that could not be filled in (never shown). */
const UNRESOLVED_MARK = "\u0000unresolved\u0000";

/** Sentence ends, allowing a closing ** after the stop ("**Lead.** Next"). */
const SENTENCE_SPLIT_RE = /(?<=[.!?](?:\*\*)?)\s+(?=[A-Z0-9("“'*])/;

/**
 * Replace every token with its catalog price. A token that cannot be filled
 * in is never shown and never patched with a stand-in phrase (no phrase
 * reads well in every slot: "Pro at …", "starts at …", "(Plus, currently …)").
 * Instead the whole sentence holding it is dropped; if that empties the
 * text, it becomes UNRESOLVED_PRICE_TEXT, a complete sentence of its own.
 * Multi-line text (prompts) is handled line by line to keep its layout.
 */
export function resolvePriceTokens(
  text: string,
  resolve: PriceResolver,
  onUnresolved?: (token: PriceToken) => void,
): string {
  let out = text;
  for (const token of parsePriceTokens(text)) {
    const value = resolve(token);
    if (value === null) onUnresolved?.(token);
    out = out.split(token.raw).join(value ?? UNRESOLVED_MARK);
  }
  // A malformed token must never reach a reader either.
  out = out.replace(ANY_TOKEN_RE, UNRESOLVED_MARK);
  if (!out.includes(UNRESOLVED_MARK)) return out;
  const kept = out
    .split("\n")
    .map((line) =>
      line
        .split(SENTENCE_SPLIT_RE)
        .filter((sentence) => !sentence.includes(UNRESOLVED_MARK))
        .join(" "),
    )
    .join("\n")
    .trim();
  return kept || UNRESOLVED_PRICE_TEXT;
}

/**
 * Deep-map every string in a content object (tutorial or workflow). Keys in
 * `skip` (slugs, URLs, dates) are copied as they are.
 */
export function mapContentStrings<T>(value: T, fn: (text: string) => string, skip: ReadonlySet<string>): T {
  const walk = (v: unknown, key: string | null): unknown => {
    if (typeof v === "string") return key !== null && skip.has(key) ? v : fn(v);
    if (Array.isArray(v)) return v.map((item) => walk(item, null));
    if (v && typeof v === "object") {
      return Object.fromEntries(Object.entries(v).map(([k, item]) => [k, walk(item, k)]));
    }
    return v;
  };
  return walk(value, null) as T;
}

/** Every reader-facing string in a content object, with a path for messages. */
export function contentStrings(value: unknown, skip: ReadonlySet<string>, path = ""): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, i) => contentStrings(item, skip, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, item]) =>
      skip.has(k) ? [] : contentStrings(item, skip, path ? `${path}.${k}` : k),
    );
  }
  return [];
}

/** Tutorial / workflow keys that are identifiers, not prose. */
export const NON_PROSE_KEYS: ReadonlySet<string> = new Set([
  "slug",
  "platformSlug",
  "toolSlug",
  "archetype",
  "lastReviewedAt",
  "changelogUrl",
  "accessTier",
  "vendorDocsUrl",
  "href",
  "categorySlug",
  "id",
]);
