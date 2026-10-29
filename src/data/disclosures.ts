/**
 * Disclosure wording and the per-page disclosure marker. Holds no links, so
 * any page may import it (the affiliate links themselves stay in
 * src/data/affiliates.ts, which only AFFILIATE_LINK_CONSUMERS may import).
 *
 * Rule (owner, 2026-10-29): an affiliate link or free access must always be
 * disclosed, on the platform page and on every guide or comparison that
 * covers that platform. affiliates.test.ts fails when one is missing.
 */

/** What a disclosure covers: a commission-paying link, or free access given to us. */
export type DisclosureKind = "affiliate" | "free-access";

/**
 * Marker on a guide (src/data/tutorials) or comparison page
 * (src/data/compare/pages.ts): the page shows a disclosure for each listed
 * platform, covering `kinds`.
 */
export type DisclosureMarker = { slug: string; kinds: DisclosureKind[] }[];

/** The disclosure shown next to an affiliate button (platform page and its guide). */
export function affiliateDisclosureText(name: string): string {
  return `Affiliate link: if you subscribe to ${name} through it, ${name} pays Launchpad HQ a commission. It doesn't affect our rankings, quiz results or reviews.`;
}

export function freeAccessDisclosureText(name: string): string {
  return `${name} gave Launchpad HQ free access to review it. It doesn't affect our rankings, quiz results or reviews.`;
}

/** Platform page and guide: one sentence per kind. */
export function platformDisclosureText(name: string, kinds: readonly DisclosureKind[]): string {
  return kinds
    .map((kind) => (kind === "affiliate" ? affiliateDisclosureText(name) : freeAccessDisclosureText(name)))
    .join(" ");
}

/**
 * Comparison pages: the relationship is disclosed, but the page never uses
 * the affiliate link (its links go to our platform pages and vendor sources).
 */
export function comparisonDisclosureText(name: string, kinds: readonly DisclosureKind[]): string {
  const parts: string[] = [];
  if (kinds.includes("affiliate")) {
    parts.push(
      `Launchpad HQ earns a commission if you subscribe to ${name} through the affiliate link on its platform page. This comparison doesn't use that link.`,
    );
  }
  if (kinds.includes("free-access")) parts.push(`${name} gave Launchpad HQ free access to review it.`);
  parts.push("That relationship had no say in what this page says, the picks or the order.");
  return parts.join(" ");
}
