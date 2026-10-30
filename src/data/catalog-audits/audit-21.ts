/**
 * Catalog audit #21 — batch-4 browser corrections, 2026-10-29. UPDATE-only.
 * Patch data and pure diff logic for scripts/update-catalog-audit-21.ts (the
 * DB runner lives there). Same shape and rules as audits 17 to 20.
 *
 * Source: the Research Analyst's browser check of the batch-4 rows
 * (2026-10-29, logged out, US/USD; "RA browser check 2026-10-29"), which
 * could read the vendor pages the batch-4 readers got 403s or empty shells
 * from (Clio, Scholarcy, Adobe Firefly, Restb.ai, Topaz, Cohere, Bedrock,
 * Azure, Acrobat, Antigravity). Every URL below is the vendor's own page from
 * that check. Naver (HyperCLOVA X / Cue:) could not be read even in a browser,
 * so its row stays as it is.
 *
 * Zach's decisions (2026-10-29), recorded here and in the fact files:
 *   - google-antigravity and antigravity-cli: privacy MEDIUM. The Enable
 *     Telemetry setting is the opt-out; the terms tie it to ML improvement and
 *     human review for individual accounts; CLAUDE.md's rubric "improvement
 *     with an opt-out" is MEDIUM;
 *   - restb-ai: cost tier ENTERPRISE (the API is sales-only and Restb Lens,
 *     a sign-up web app, shows no public prices); the description loses the
 *     "Lens has self-serve plans" claim;
 *   - cohere stays FREEMIUM (audit 20 sets it): the free key never expires, so
 *     it is a permanent free tier with a non-commercial use limit, not a
 *     time-limited trial (reasoning in src/data/facts/cohere.ts).
 *
 * Fields shared with audit 20 (and, for restb-ai and the Antigravity CLI row,
 * audit 19): audits 19 and 20 now import their targets from this file
 * (A21_TEXT, RESTB_DESCRIPTION, ANTIGRAVITY_DESCRIPTION_NEW), so re-running
 * either after this one cannot undo it. A row an earlier run already
 * patched to the old target is moved here from the old value (the `from`
 * lists below). audit-21.test.ts re-runs audits 17 to 20 against the patched
 * snapshot to prove it.
 *
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested. No import from audits 19 or 20, which import this.
 *   - fields: text set to exactly this value, written only where it differs;
 *   - guarded: costTier, privacyLevel and description change only while the row
 *     still holds an expected old value (a hand edit is logged and left alone).
 *
 * Never deletes or creates rows; never changes slug, name or categoryId.
 */

export const CHECKED_AT = "2026-10-29";
export const AS_OF = `(as of ${CHECKED_AT})`;

export type Audit21TextField = "primaryUse" | "currentPricing" | "freeTierFeatures" | "usageLimits" | "upgradeTriggers";

export type Audit21Guarded = {
  costTier?: { from: string[]; to: string };
  privacyLevel?: { from: string[]; to: string };
  description?: { from: (string | null)[]; to: string };
};

export type Audit21Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields: Partial<Record<Audit21TextField, string>>;
  guarded?: Audit21Guarded;
};

/** Rows audit 21 patches, in the order of the Research Analyst's report. */
export const AUDIT_21_SLUGS = [
  "antigravity-cli",
  "google-antigravity",
  "restb-ai",
  "clio-manage",
  "scholarcy",
  "adobe-firefly",
  "topaz-labs",
  "cohere",
  "amazon-bedrock",
  "azure-openai-service",
  "adobe-acrobat-ai-assistant",
];

/** Rows read in the browser check and left as the row has them, and why. */
export const AUDIT_21_NO_ROW_CHANGE: Record<string, string> = {
  "naver-hyperclova-x-cue": "CLOVA Studio page renders empty, clova-x.naver.com closes the connection, billing pages 404; prices stay off",
};

/** Antigravity CLI description as audit 19 created it (privacy LOW wording), kept to move an existing row. */
export const ANTIGRAVITY_DESCRIPTION_OLD =
  "Google's terminal coding agent: you type what you want in plain English, and its AI agent reads your project, edits files and runs commands. It replaced Gemini CLI for free individual use and for Google AI Pro and Ultra subscribers on 2026-06-18. Individuals can use it for $0 with a quota refreshed weekly; Google AI Pro and Ultra raise the limits. It is not open source. Google's Antigravity terms (as of 2026-10-29) say Google uses your interactions to improve its products and machine-learning technologies and that Google employees and contractors may review them, and ask you not to submit confidential information.";

export const ANTIGRAVITY_DESCRIPTION_NEW =
  "Google's terminal coding agent: you type what you want in plain English, and its AI agent reads your project, edits files and runs commands. It replaced Gemini CLI for free individual use and for Google AI Pro and Ultra subscribers on 2026-06-18. Individuals can use it for $0 with a quota refreshed weekly; Google AI Pro and Ultra raise the limits. It is not open source. Google's Antigravity terms (as of 2026-10-29) say that for individual accounts Google uses your interactions to improve its products and machine-learning technologies, and that Google employees and contractors may review them; the Enable Telemetry setting is the opt-out, and business accounts (Workspace, Gemini Enterprise) have it always off. With it off, Google still uses your data to provide the service, process feedback and keep Antigravity safe. The terms ask you not to submit confidential information.";

/** Restb.ai description as audit 20 first wrote it (PAID wording), kept to move an existing row. */
export const RESTB_DESCRIPTION_OLD = `AI computer vision for property photos: names rooms, spots features and rates condition for listings, appraisals and lending. The API is sold through sales only (enterprise contracts); Restb Lens, its web tool, has self-serve plans (as of ${CHECKED_AT}).`;

export const RESTB_DESCRIPTION = `AI computer vision for property photos: names rooms, spots features and rates condition for listings, appraisals and lending. The API is sold through sales only (enterprise contracts, no published prices); Restb Lens, its web tool, is a sign-up web app with no public prices (as of ${CHECKED_AT}).`;

/**
 * Row text audit 21 owns on rows that audit 20 also writes. Audit 20's
 * patches take these values, so the two cannot disagree.
 */
export const A21_TEXT = {
  "adobe-firefly": {
    currentPricing: `Free daily generations (limit not stated); paid monthly plans: Standard $9.99 (2,000 credits), Pro $19.99 (4,000), Pro Plus $49.99 (10,000), Premium $199.99 (50,000); credit add-ons are available ${AS_OF}`,
  },
  "topaz-labs": {
    currentPricing: `No free plan; subscriptions only, no perpetual licence listed: Photo $199/yr or $39/mo, Gigapixel $149/yr or $29/mo, Video $299/yr or $59/mo; Topaz Studio (all apps) $399/yr, $45/mo billed annually or $69/mo month to month; Pro versions and Enterprise cost more; list prices, sales are frequent ${AS_OF}`,
  },
  cohere: {
    freeTierFeatures: `Free Trial API key: calls are free but capped at 1,000 API calls a month and rate limited, and trial keys may not be used for production or commercial purposes; a production key needs a Go to Production application ${AS_OF}`,
  },
  "amazon-bedrock": {
    freeTierFeatures: `No Bedrock free tier of its own: the only credits are the general new-AWS-account ones (up to $200 over 6 months), which any eligible service can use, Bedrock included ${AS_OF}`,
  },
  "azure-openai-service": {
    freeTierFeatures: `No free tier for the service itself: the only credit is the general new-Azure-account one ($200, usable for up to 30 days, new customers only), not specific to Azure OpenAI ${AS_OF}`,
  },
  "adobe-acrobat-ai-assistant": {
    currentPricing: `AI Assistant is included in Acrobat Studio ($24.99/mo, annual plan billed monthly), not in Acrobat Standard ($14.99) or Pro ($19.99); Acrobat Express ($9.99/mo) is marketed as AI-powered document insights; no standalone AI Assistant price was seen (US, individuals) ${AS_OF}`,
    upgradeTriggers: "Moving to Acrobat Studio for the AI Assistant; Acrobat Express for AI-powered document insights",
  },
} as const;

export const AUDIT_21_PATCHES: Audit21Patch[] = [
  {
    slug: "antigravity-cli",
    finding: "Zach: privacy MEDIUM. For individual accounts the Enable Telemetry setting is the opt-out from the ML-improvement and human-review use in the terms (rubric: improvement with an opt-out); business accounts have it always off; service, safety and feedback uses continue with it off. Audit 19 created the row at LOW",
    sources: ["https://antigravity.google/terms", "https://antigravity.google/docs/settings", "https://antigravity.google/docs/faq"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: {
      privacyLevel: { from: ["LOW"], to: "MEDIUM" },
      description: { from: [ANTIGRAVITY_DESCRIPTION_OLD], to: ANTIGRAVITY_DESCRIPTION_NEW },
    },
  },
  {
    slug: "google-antigravity",
    finding: "Zach: privacy MEDIUM, same terms and same Enable Telemetry opt-out as the CLI row. Audit 20 first wrote LOW (and now writes MEDIUM from HIGH); a row it already moved to LOW moves here",
    sources: ["https://antigravity.google/terms", "https://antigravity.google/docs/settings", "https://antigravity.google/docs/faq"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: { privacyLevel: { from: ["HIGH", "LOW"], to: "MEDIUM" } },
  },
  {
    slug: "restb-ai",
    finding: "Zach: cost tier ENTERPRISE. The API is sales-only with no published prices; Restb Lens is a sign-up web app whose plans are not visible logged out, and no page shows public self-serve paid plans, so the description no longer says Lens has self-serve plans",
    sources: ["https://restb.ai/company/pricing-2/", "https://lens.restb.ai/"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: {
      costTier: { from: ["FREEMIUM", "PAID"], to: "ENTERPRISE" },
      description: { from: [null, RESTB_DESCRIPTION_OLD], to: RESTB_DESCRIPTION },
    },
  },
  {
    slug: "clio-manage",
    finding: "Row said From $49 and listed EasyStart $39, Essentials $69, Advanced $99, Complete $129; Clio's pricing page shows Starter at $49 a user a month, Core, Signature and Elite as Get pricing, Enterprise as Book a demo, no free tier and a 7-day trial; AI is included from Core up and Clio Work is an add-on. Audit 11 owns the cost tier",
    sources: ["https://www.clio.com/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Starter $49 per user a month; Core, Signature and Elite: get pricing (no public price); Enterprise: book a demo; Clio Work, the legal AI add-on, is priced on request (US, logged out) ${AS_OF}`,
      freeTierFeatures: `No free tier; 7-day free trial, no credit card required ${AS_OF}`,
      usageLimits: `Priced per user; AI is included in the plan from Core up, and Clio Work is a separate add-on ${AS_OF}`,
      upgradeTriggers: "Trial expiry; billing and document automation; AI included from Core up; Clio Work add-on (research, analysis and drafting); client portal",
    },
  },
  {
    slug: "scholarcy",
    finding: "Row said Free tier; paid plans with no prices; Scholarcy's pricing page shows Plus at $9.99 a month or $90 a year with a 1-week free trial, and states the free limit two ways (a table says one number, the FAQ another), so no number is written. The row was FREE with a paid plan, so it moves to FREEMIUM",
    sources: ["https://www.scholarcy.com/pricing", "https://www.scholarcy.com/privacy-policy"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free Article Summarizer (limited); Scholarcy Plus $9.99 a month or $90 a year, with a 1-week free trial ${AS_OF}`,
      freeTierFeatures: `Free Article Summarizer with a limited allowance; Scholarcy's pricing table and its FAQ state different limits, so no number is given here ${AS_OF}`,
      usageLimits: `Free: a limited number of summaries (the pricing page and FAQ conflict, so none is stated); Plus: summaries, flashcards, Literature Matrix and bibliographies ${AS_OF}`,
      upgradeTriggers: "More than the free allowance; Literature Matrix and bibliographies (Plus)",
    },
    guarded: { costTier: { from: ["FREE"], to: "FREEMIUM" } },
  },
  {
    slug: "adobe-firefly",
    finding: "Row had no prices; Adobe's plans page shows free daily generations (limit not stated, no monthly credits) and Standard $9.99 / Pro $19.99 / Pro Plus $49.99 / Premium $199.99 a month with 2,000 / 4,000 / 10,000 / 50,000 credits. Audit 20 had written that $199.99 was the teams price and prices were unconfirmed",
    sources: ["https://www.adobe.com/products/firefly/plans.html"],
    checkedAt: CHECKED_AT,
    fields: { currentPricing: A21_TEXT["adobe-firefly"].currentPricing },
  },
  {
    slug: "topaz-labs",
    finding: "Topaz lists no free plan; Studio (all apps) is $399 a year, $45 a month billed annually or $69 a month month to month. The conflicting Studio Pro monthly price ($75 vs $79) is left off",
    sources: ["https://www.topazlabs.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: { currentPricing: A21_TEXT["topaz-labs"].currentPricing },
  },
  {
    slug: "cohere",
    finding: "Cohere's trial key is free but capped at 1,000 API calls a month and not for production or commercial use; the row's \"generous trial for testing\" goes. Cost tier stays FREEMIUM (audit 20): the key does not expire, so it is a permanent free tier with a non-commercial limit",
    sources: ["https://cohere.com/pricing", "https://docs.cohere.com/docs/rate-limits"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: A21_TEXT.cohere.freeTierFeatures,
      usageLimits: `Trial key: 1,000 API calls a month, plus per-minute rate limits (Chat 20 requests a minute per model); production key: pay as you go; Enterprise: custom ${AS_OF}`,
    },
  },
  {
    slug: "amazon-bedrock",
    finding: "No Bedrock-specific free tier; the only credits are the general new-AWS-account ones (up to $200 over 6 months)",
    sources: ["https://aws.amazon.com/free/", "https://aws.amazon.com/bedrock/pricing/"],
    checkedAt: CHECKED_AT,
    fields: { freeTierFeatures: A21_TEXT["amazon-bedrock"].freeTierFeatures },
  },
  {
    slug: "azure-openai-service",
    finding: "No Azure OpenAI free tier; the only credit is the general new-Azure-account one ($200, up to 30 days, new customers only), and the service is not on the free-services list",
    sources: ["https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account", "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/"],
    checkedAt: CHECKED_AT,
    fields: { freeTierFeatures: A21_TEXT["azure-openai-service"].freeTierFeatures },
  },
  {
    slug: "adobe-acrobat-ai-assistant",
    finding: "Adobe's plans page: AI Assistant is included in Acrobat Studio ($24.99 a month) and not in Standard or Pro; Express ($9.99) is marketed as AI-powered, and no standalone AI Assistant price was seen. Adobe says content is never used to train its AI models",
    sources: ["https://www.adobe.com/acrobat/plans.html", "https://www.adobe.com/acrobat/generative-ai-pdf.html"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: A21_TEXT["adobe-acrobat-ai-assistant"].currentPricing,
      upgradeTriggers: A21_TEXT["adobe-acrobat-ai-assistant"].upgradeTriggers,
    },
  },
];

export type Audit21Row = Partial<Record<Audit21TextField, string | null>> & {
  description?: string | null;
  costTier: string;
  privacyLevel?: string | null;
};

/** Prisma `data` for one row: text fields that differ; guarded fields only from an expected old value. */
export function audit21PatchData(row: Audit21Row, patch: Audit21Patch): Record<string, string> {
  const data: Record<string, string> = {};
  for (const [field, value] of Object.entries(patch.fields) as [Audit21TextField, string][]) {
    if (row[field] !== value) data[field] = value;
  }
  const g = patch.guarded ?? {};
  if (g.description && g.description.from.includes(row.description ?? null)) data.description = g.description.to;
  if (g.costTier && g.costTier.from.includes(row.costTier)) data.costTier = g.costTier.to;
  if (g.privacyLevel && row.privacyLevel != null && g.privacyLevel.from.includes(row.privacyLevel)) data.privacyLevel = g.privacyLevel.to;
  return data;
}

/** Guarded fields left alone because the row holds neither an old nor the new value (a hand edit). */
export function audit21GuardSkips(row: Audit21Row, patch: Audit21Patch): string[] {
  const g = patch.guarded ?? {};
  const skips: string[] = [];
  const description = row.description ?? null;
  if (g.description && description !== g.description.to && !g.description.from.includes(description)) skips.push("description");
  if (g.costTier && row.costTier !== g.costTier.to && !g.costTier.from.includes(row.costTier)) skips.push("costTier");
  if (g.privacyLevel && row.privacyLevel !== g.privacyLevel.to && !g.privacyLevel.from.includes(row.privacyLevel ?? "")) skips.push("privacyLevel");
  return skips;
}

export function audit21Slugs(): string[] {
  return AUDIT_21_PATCHES.map((p) => p.slug);
}
