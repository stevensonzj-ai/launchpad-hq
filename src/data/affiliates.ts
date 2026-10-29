/**
 * Affiliate links: the only place a platform's "Open" button may point at a
 * tracked link instead of the tool's own website. Also the record of free
 * access a vendor has given us, and of which disclosure each platform shows.
 *
 * Display only. The catalog row's `website`, the /data/v1 feed, MCP, JSON-LD,
 * comparison pages and every ranking (Discover sort, quiz/recommendations,
 * search, related tools, sponsor ordering) never read this file, so an
 * affiliate deal can't move a tool up or change what we say about it.
 * affiliates.test.ts checks that only the files in AFFILIATE_LINK_CONSUMERS
 * import it.
 *
 * Every entry renders its disclosure (src/data/disclosures.ts) next to the
 * button on the platform page and its guide, and the link carries
 * rel="sponsored". Guides and comparisons covering the platform carry a
 * DisclosureMarker; affiliates.test.ts fails if any is missing.
 */
import { platformDisclosureText, type DisclosureKind } from "./disclosures";

export { affiliateDisclosureText } from "./disclosures";

export type FreeAccess = {
  /** True when the vendor gave Launchpad HQ free access (a comp account, credits, etc.). */
  granted: boolean;
  /** Where that was recorded, dated. */
  source: string;
};

export type AffiliateEntry = {
  /** Platform row slug. */
  slug: string;
  /** The tracked link the "Open" button uses. */
  href: string;
  /**
   * A promo/reader code from the program, shown under the disclosure as
   * "<offer> with code <code>." `offer` is all we say about it, and `source`
   * records where that offer was confirmed, dated.
   */
  promoCode?: { code: string; offer: string; source: string };
  freeAccess: FreeAccess;
  /** The disclosure(s) the platform page and guide show: "affiliate", plus "free-access" when granted. */
  disclosure: DisclosureKind[];
};

/** Kept for the header and disclosure component props. */
export type AffiliateLink = AffiliateEntry;

export const AFFILIATE_LINKS: Record<string, AffiliateEntry> = {
  // Klap affiliate program (Rewardful), joined 2026-10. Terms:
  // https://www.notion.so/ziggapp/Klap-Affiliate-Program-Terms-and-Conditions-56bd7c6ae25744b4aaa9ea92171e8042
  // The public terms don't mention reader codes; the code's offer is from the
  // program dashboard, confirmed by Zach (catalog audit 14).
  klap: {
    slug: "klap",
    href: "https://klap.app?via=zach-stevenson",
    promoCode: {
      code: "NOTGFXEG",
      offer: "30% off your first payment",
      source: "Klap affiliate program dashboard (Rewardful), confirmed by Zach on 2026-10-29",
    },
    freeAccess: {
      granted: false,
      source: "Klap due-diligence notes and affiliate program terms, checked 2026-10-29: no free access documented.",
    },
    disclosure: ["affiliate"],
  },
};

export function getAffiliateLink(slug: string): AffiliateEntry | undefined {
  return AFFILIATE_LINKS[slug];
}

/** Disclosures an entry must show: "affiliate" always, "free-access" when granted. */
export function requiredDisclosure(entry: Pick<AffiliateEntry, "freeAccess">): DisclosureKind[] {
  return entry.freeAccess.granted ? ["affiliate", "free-access"] : ["affiliate"];
}

/** The text shown on the platform page and guide for `entry`. */
export function entryDisclosureText(name: string, entry: AffiliateEntry): string {
  return platformDisclosureText(name, entry.disclosure);
}

/** The only modules allowed to import this file (affiliates.test.ts). Tests are exempt. */
export const AFFILIATE_LINK_CONSUMERS = [
  "src/app/(app)/platform/[slug]/page.tsx",
  "src/app/(app)/platform/[slug]/guide/page.tsx",
  "src/components/platforms/platform-detail-header.tsx",
  "src/components/sponsors/affiliate-disclosure.tsx",
  "src/lib/content-tracker.ts",
] as const;
