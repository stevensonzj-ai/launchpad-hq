/**
 * What counts as a typed price or plan limit in guide and workflow text.
 *
 * `price-guard.test.ts` runs these over every tutorial and workflow string
 * (after removing price tokens) and fails on any hit that is not on the
 * allowlist in `price-guard-allowlist.ts`. Pure, no I/O.
 */

/**
 * Currency amounts: "$20", "US$ 0.01", "€19.90", "£5", "20 USD", "ten dollars".
 * Amounts in millions or billions ("$75M Series B", "$650 million
 * acquisition") are company figures, never a plan price.
 */
const CURRENCY_RE =
  /(?:US\$|[$€£¥₹])\s?\d(?![\d,.]*\s?(?:million|billion|bn|[MB])\b)|\b\d[\d,.]*\s?(?:USD|EUR|GBP|dollars?|euros?)\b|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty|fifty|a hundred)\s+(?:dollars|euros)\b/i;

const QUANTITY = String.raw`(?:\d[\d,.]*\s?k?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|sixty|a hundred|hundred|a thousand)`;

/** "100 tasks a month", "three a month", "5 downloads per day", "20 generations/week". */
const QUANTITY_PER_PERIOD_RE = new RegExp(
  String.raw`\b${QUANTITY}(?:[\s-]+(?!(?:a|per|each|every|times|in|under|inside|within|roughly|about|across|over|can|than|or|and|ended)\b)[a-z][a-z'-]*){0,3}\s*(?:\ba\b|\bper\b|\beach\b|\bevery\b|/)\s*(?:day|week|month|year|mo|yr)\b(?!\s+(?:ago|later|earlier|before|after)\b)`,
  "i",
);

/**
 * "1,000 credits", "50 free credits", "25 monthly credits". Plural only: "one
 * credit" / "costs a credit" describes the unit, not an allowance.
 */
const CREDITS_RE = new RegExp(
  String.raw`\b${QUANTITY}\s+(?:(?!separate\b|different\b|kinds?\b|types?\b)[a-z-]+\s+)?credits\b(?!\s+systems?\b)`,
  "i",
);

/**
 * "the free plan includes 25 ...", "free tier gives you 3 ...". Not a year
 * ("dropped its free plan in 2025"), a trial length ("a 14-day trial") or a
 * file size ("files up to 20MB"), which are not allowances.
 */
const FREE_PLAN_NUMBER_RE =
  /\bfree\s+(?:plan|tier|version|account)\b[^.;:!?]{0,60}?\b\d(?!\d{3}\b)(?![\d,.]*\s?-?\s?(?:days?|weeks?|KB|MB|GB|TB)\b)/i;

const ALLOWANCE_UNIT = String.raw`(?:tasks?|credits?|requests?|messages?|generations?|downloads?|transcripts?|searches|queries|executions?|operations?|exports?|reports?)`;

/** "20 free requests", "a maximum of 10,000 tasks", "a 20,000-task tier", "a 400-credit allowance". */
const ALLOWANCE_RE = new RegExp(
  String.raw`\b${QUANTITY}\s+free\s+${ALLOWANCE_UNIT}\b|\bmaximum\s+of\s+${QUANTITY}\s+${ALLOWANCE_UNIT}\b|\b\d[\d,.]*k?-(?:task|credit|request|message|generation|download|transcript|execution|operation)\s+(?:tier|plan|allowance|cap|limit)\b`,
  "i",
);

export type PriceHitKind = "currency" | "quantity-per-period" | "credits" | "free-plan-number" | "allowance";

const RULES: [PriceHitKind, RegExp][] = [
  ["currency", CURRENCY_RE],
  ["quantity-per-period", QUANTITY_PER_PERIOD_RE],
  ["credits", CREDITS_RE],
  ["free-plan-number", FREE_PLAN_NUMBER_RE],
  ["allowance", ALLOWANCE_RE],
];

export type PriceHit = { kind: PriceHitKind; match: string };

const TOKEN_RE = /\{\{[^}]*\}\}/g;

/** Typed prices / plan limits left in `text` once price tokens are removed. */
export function findPriceText(text: string): PriceHit[] {
  const plain = text.replace(TOKEN_RE, "");
  const hits: PriceHit[] = [];
  for (const [kind, re] of RULES) {
    const m = plain.match(re);
    if (m) hits.push({ kind, match: m[0] });
  }
  return hits;
}

export type AllowEntry = {
  /** "tutorial:<platformSlug>" or "workflow:<slug>". */
  source: string;
  /** A substring of the flagged string (exact, case-sensitive). */
  contains: string;
  /**
   * `example`: sample text inside a prompt (an invoice, a budget), not a
   *   price of the tool.
   * `not-a-limit`: a number the patterns mistake for a plan limit (a rate
   *   limit of a protocol, a product spec, a legal threshold).
   * `verified`: a vendor fact with no catalog home, checked on the official
   *   page; the text must carry "as of <checkedAt>".
   */
  kind: "example" | "not-a-limit" | "verified";
  reason: string;
  sourceUrl?: string;
  checkedAt?: string;
};
