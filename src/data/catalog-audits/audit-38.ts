/**
 * Catalog audit #38 (2026-11-26): Nov 26 AI X-watch.
 * Facts below were re-read on the vendor page that day. X posts were leads only.
 * checkedAt is 2026-11-26 only on facts that page confirmed that day.
 *
 * Guarded SQL: scripts/sql/catalog-xwatch-20261126.sql. Not run from here.
 * Updates only. No new platform slugs.
 */

export const CHECKED_AT = "2026-11-26";

export type Audit38Skip = {
  item: string;
  status: "confirmed-not-written";
  reason: string;
  source: string;
};

/**
 * Confirmed on a vendor page but not written. No new platform slugs.
 */
export const AUDIT_38_SKIPPED: Audit38Skip[] = [
  {
    item: "Sand AI MAGI-2",
    status: "confirmed-not-written",
    reason:
      "The 2026-11-24 research post says MAGI-2 has 480B total parameters and about 28B active parameters (the scaling section also says 28B active), generates up to 30 seconds of 1080p video with native audio, and says open-source releases will follow. That is a promise, not a release. The platform pricing page lists magi-2 at 1080p for 0.08 USD per second and says top-up is not supported for the time being. It states no end date for that rate. There is no Sand AI or MAGI platform row. This watch does not add one: the confirmed surface is a developer API, and the Nov 19 and Nov 23 watches did not open a slug for a vendor with no row.",
    source: "https://sand.ai/blog/magi-2/",
  },
  {
    item: "Amazon agreement for Decart's Optimization Stack",
    status: "confirmed-not-written",
    reason:
      "Amazon's post dated November 23, 2026 says Amazon has signed an agreement to purchase the technology behind the Decart Optimization Stack and to bring the Decart co-founders and their team to Amazon. Completion is subject to customary closing conditions, including regulatory clearance. The post does not say the purchase has closed, and it does not say a Decart product is discontinued. There is no Decart platform row, so nothing was updated.",
    source: "https://www.aboutamazon.com/news/company-news/amazon-decart-ai-optimization",
  },
];
