/**
 * Curated trials, student offers, and discounts for /deals.
 *
 * Display only. Rankings, search, the quiz, the MCP connector, the public
 * data feed, llms.txt and the sitemap do not import this file (the sitemap
 * asks the deals page module whether /deals is indexable). Affiliate status
 * is not stored here: the page reads src/data/affiliates.ts at render time.
 * An affiliate program's promo code stays in that file. deals.test.ts checks
 * both rules.
 *
 * Free plans are not copied into this list. The page builds that section
 * from verified free-tier facts.
 */
export type DealOfferType = "trial" | "student" | "discount" | "code";

export type DealOffer = {
  /** Platform row slug. Must be a listed catalog tool. */
  platformSlug: string;
  offerType: DealOfferType;
  title: string;
  /** What the reader gets, in the vendor's own wording where the fact states it. */
  details: string;
  eligibility: string;
  /** Official page for the offer. No tracking parameters. */
  url: string;
  sourceUrl: string;
  /** ISO date (YYYY-MM-DD) the offer wording was last checked. */
  lastChecked: string;
  /**
   * ISO date the offer ends, inclusive. Required for `code` and `discount`
   * unless `noEndDateStated` is set.
   */
  expiresAt?: string;
  /** The source names no calendar end date. */
  noEndDateStated?: true;
  verified: boolean;
  /**
   * Promo code that is not an affiliate-program code. Affiliate codes stay
   * in src/data/affiliates.ts and the page reads them from there.
   */
  code?: string;
  /** Where a confirmation that is not on a public page was recorded. */
  note?: string;
};

/** The only modules allowed to import this file (deals.test.ts). Tests are exempt. */
export const DEALS_DATA_CONSUMERS = ["src/app/(app)/deals/model.ts"] as const;

const SQUARESPACE_PRICING = "https://www.squarespace.com/pricing";
const SQUARESPACE_COUPONS = "https://www.squarespace.com/coupons";

export const DEALS: readonly DealOffer[] = [
  {
    platformSlug: "tray-ai",
    offerType: "trial",
    title: "30-day free trial",
    details:
      "No free plan. A 30-day free trial includes 1 million Tasks on Tray iPaaS, with no card and no sales call.",
    eligibility: "No credit card and no sales call.",
    url: "https://tray.ai/pricing",
    sourceUrl: "https://tray.ai/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "ramp-intelligence",
    offerType: "trial",
    title: "30-day free trial",
    details:
      "Plus a platform fee based on team size; save 20% with annual billing; 30-day free trial; AI agents for bill pay (AP Agents)",
    eligibility: "The 30-day free trial is on the Plus plan.",
    url: "https://ramp.com/pricing",
    sourceUrl: "https://ramp.com/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "squarespace-ai",
    offerType: "trial",
    title: "14-day free trial",
    details:
      "No permanent free plan: a 14-day free trial, no credit card required, cancel anytime.",
    eligibility: "No credit card. Cancel anytime.",
    url: SQUARESPACE_PRICING,
    sourceUrl: SQUARESPACE_PRICING,
    lastChecked: "2026-11-23",
    verified: true,
  },
  {
    platformSlug: "docsumo",
    offerType: "trial",
    title: "14-day free trial",
    details:
      "No free plan. A 14-day free trial covers up to 1,000 pages and 10 user licences; after that, plans are quoted.",
    eligibility: "Up to 1,000 pages and 10 user licences.",
    url: "https://www.docsumo.com/pricing",
    sourceUrl: "https://www.docsumo.com/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "gumloop",
    offerType: "trial",
    title: "14-day free trial",
    details:
      "No free plan. Pro starts with a 14-day free trial, which needs a card and converts to the paid plan unless cancelled.",
    eligibility: "Needs a card. Converts to the paid Pro plan unless cancelled.",
    url: "https://docs.gumloop.com/core-concepts/credits",
    sourceUrl: "https://docs.gumloop.com/core-concepts/credits",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "mailchimp-ai",
    offerType: "trial",
    title: "14-day free trial",
    details:
      'Essentials: "Free for 14 days. Then, starts at $13/month". Standard: "Free for 14 days. Then, starts at $20/month".',
    eligibility: "Essentials and Standard. Generative AI features are not included on Essentials.",
    url: "https://mailchimp.com/pricing/marketing/",
    sourceUrl: "https://mailchimp.com/pricing/marketing/",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "speak-language-ai",
    offerType: "trial",
    title: "7-day free trial",
    details: "No free plan: a 7-day free trial, then a paid subscription.",
    eligibility: "The trial ends when the subscription begins.",
    url: "https://www.speak.com/",
    sourceUrl: "https://www.speak.com/",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "krisp",
    offerType: "trial",
    title: "7-day free trial",
    details: "No permanent free plan; 7-day free trial, no credit card required",
    eligibility: "No credit card required.",
    url: "https://krisp.ai/pricing/",
    sourceUrl: "https://krisp.ai/pricing/",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "clio-manage",
    offerType: "trial",
    title: "7-day free trial",
    details: "No free tier; a 7-day free trial with no credit card required.",
    eligibility: "No credit card required.",
    url: "https://www.clio.com/pricing/",
    sourceUrl: "https://www.clio.com/pricing/",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "scite",
    offerType: "trial",
    title: "7-day free trial",
    details:
      "No free plan. Basic and Pro each start with a 7-day free trial, after which the plan you chose is billed.",
    eligibility: "Basic and Pro. The trial's MCP credits are not stated.",
    url: "https://scite.ai/pricing",
    sourceUrl: "https://scite.ai/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "jasper",
    offerType: "trial",
    title: "7-day free trial",
    details: '"Start Free 7-Day Trial" is a trial, not a free plan',
    eligibility: "A trial of the paid plan, not a free plan.",
    url: "https://www.jasper.ai/pricing",
    sourceUrl: "https://www.jasper.ai/pricing",
    lastChecked: "2026-11-14",
    verified: true,
  },
  {
    platformSlug: "semrush-ai",
    offerType: "trial",
    title: "7-day free trial",
    details: "Paid plans also have a 7-day free trial.",
    eligibility: "Paid plans. A separate free account is listed under free plans.",
    url: "https://www.semrush.com/prices/",
    sourceUrl: "https://www.semrush.com/prices/",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "manus",
    offerType: "trial",
    title: "7-day free trial",
    details: "8,000 credits a month; 7-day free trial",
    eligibility: "Pro plan with 8,000 credits.",
    url: "https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus",
    sourceUrl: "https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "lindy-ai",
    offerType: "trial",
    title: "7-day free trial",
    details: '"$50 in credits for free… Free credits last 7 days" (no card)',
    eligibility: "No card. Free credits last 7 days.",
    url: "https://www.lindy.ai/pricing",
    sourceUrl: "https://www.lindy.ai/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "scholarcy",
    offerType: "trial",
    title: "1-week free trial",
    details:
      "1-week free trial; summaries, flashcards, Literature Matrix and bibliographies",
    eligibility: "Scholarcy Plus.",
    url: "https://www.scholarcy.com/pricing",
    sourceUrl: "https://www.scholarcy.com/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "ai21-labs-jamba",
    offerType: "trial",
    title: "$10 credit for 7 days",
    details:
      "The hosted API has no free plan: new accounts get a free trial of $10 in credits for 7 days, no card, then pay as you go.",
    eligibility: "New hosted-API accounts. No card.",
    url: "https://www.ai21.com/pricing/",
    sourceUrl: "https://www.ai21.com/pricing/",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "shopify-sidekick",
    offerType: "trial",
    title: "3-day free trial",
    details:
      "No free store plan: a 3-day free trial with no card, then $1/month for 3 months. Sidekick is included with paid plans.",
    eligibility: "No card for the 3-day trial.",
    url: "https://www.shopify.com/pricing",
    sourceUrl: "https://www.shopify.com/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "runway-for-education",
    offerType: "student",
    title: "25% off",
    details:
      "verified students and educators get 25% off any paid Runway plan, and schools buying 3 or more classroom licenses get up to 25% off.",
    eligibility: "Verified through SheerID. Classroom licenses need a school-issued email for each account.",
    url: "https://runway.com/educators",
    sourceUrl: "https://runway.com/educators",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "mistral-vibe",
    offerType: "student",
    title: "$5.99/month",
    details: "Excluding taxes; verified students $5.99/month for up to 12 months",
    eligibility: "Verified students, for up to 12 months.",
    url: "https://mistral.ai/pricing",
    sourceUrl: "https://mistral.ai/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "consensus",
    offerType: "student",
    title: "Up to 40% off",
    details: "students, faculty and clinicians get up to 40% off.",
    eligibility: "Students, faculty and clinicians.",
    url: "https://intercom.help/consensus-d118a252369c/en/articles/10087865-subscription-plans",
    sourceUrl: "https://intercom.help/consensus-d118a252369c/en/articles/10087865-subscription-plans",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "kickresume",
    offerType: "student",
    title: "Free for verified students",
    details: "Free for students verified through ISIC, ITIC or UNiDAYS.",
    eligibility: "Students verified through ISIC, ITIC or UNiDAYS.",
    url: "https://www.kickresume.com/en/pricing/sale/",
    sourceUrl: "https://www.kickresume.com/en/pricing/sale/",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "glasp",
    offerType: "student",
    title: "Free Student plan",
    details: "Free Student plan",
    eligibility: "Students.",
    url: "https://glasp.co/pricing",
    sourceUrl: "https://glasp.co/pricing",
    lastChecked: "2026-11-20",
    verified: true,
  },
  {
    platformSlug: "squarespace-ai",
    offerType: "code",
    title: "10% off a first annual website purchase",
    details:
      "10% off a first annual website purchase. The coupons page does not state a calendar end date, so this is not a list price.",
    eligibility: "First annual website purchase.",
    url: SQUARESPACE_COUPONS,
    sourceUrl: SQUARESPACE_COUPONS,
    lastChecked: "2026-11-23",
    noEndDateStated: true,
    verified: true,
    code: "GIMME10",
  },
  {
    platformSlug: "wordpress-ai-jetpack-ai",
    offerType: "discount",
    title: "50% off the first year",
    details:
      "Black Friday sale is 50% off the first year and ends Wed, Dec 2, 2026, 11:59 PM UTC.",
    eligibility: "First year of Pro or Complete, billed yearly. Renews at the regular price.",
    url: "https://jetpack.com/pricing/",
    sourceUrl: "https://jetpack.com/pricing/",
    lastChecked: "2026-11-20",
    expiresAt: "2026-12-02",
    verified: true,
  },
  {
    platformSlug: "adobe-firefly",
    offerType: "discount",
    title: "Up to 60% off",
    details:
      "Sale, not list: save up to 60% on select plans for the first 6 months, ends Dec 6. Pro is US$9.99/mo for the first 6 months; Pro Plus is US$19.99/mo for 6 months.",
    eligibility: "Select plans, for the first 6 months.",
    url: "https://www.adobe.com/products/firefly/plans.html",
    sourceUrl: "https://www.adobe.com/products/firefly/plans.html",
    lastChecked: "2026-11-20",
    expiresAt: "2026-12-06",
    verified: true,
  },
  {
    platformSlug: "manus",
    offerType: "discount",
    title: "Black Friday 2026, first billing period",
    details:
      "Time-limited Black Friday 2026 offer, not the regular price. Ends 30 November 2026 at 23:59:59 Eastern Time (UTC-5). The discount applies to the first billing period only. On the web, the Pro $100 tier is $90 for the first month or $900 for the first year, and the Max $200 tier is $160 for the first month or $1,600 for the first year. Pro tiers at $20, $40, $60, and $80 are not included. After that period the plan renews at the regular price.",
    eligibility:
      "Pro $100 tier and Max tiers from $200 up, monthly or annual, for the first billing period only. Team plans and lower Pro tiers are not included.",
    url: "https://help.manus.im/en/articles/18542127-how-does-the-manus-black-friday-2026-offer-work",
    sourceUrl: "https://help.manus.im/en/articles/18542127-how-does-the-manus-black-friday-2026-offer-work",
    lastChecked: "2026-11-26",
    expiresAt: "2026-11-30",
    verified: true,
  },
  {
    platformSlug: "klap",
    offerType: "code",
    title: "30% off your first payment",
    details: "30% off the first payment, plus a free one-video try with no card.",
    eligibility: "First payment. The one-video try needs no card.",
    url: "https://klap.app",
    sourceUrl:
      "https://www.notion.so/ziggapp/Klap-Affiliate-Program-Terms-and-Conditions-56bd7c6ae25744b4aaa9ea92171e8042",
    lastChecked: "2026-11-25",
    noEndDateStated: true,
    verified: true,
    note: "code reconfirmed by the owner from the Klap dashboard on 2026-11-25",
  },
];
