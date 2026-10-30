import type { ToolFacts } from "./types";

/**
 * Adobe Acrobat AI Assistant: first fact file, stale-facts batch 4 (catalog
 * audit 20), 2026-10-29. Read twice, blind, on adobe.com. Both readers agree it
 * is no longer sold as its own plan: AI Assistant features are built into the
 * Acrobat Express and Acrobat Studio plans, and an "AI Assistant add-on" is
 * mentioned (the $1.99/mo price appears only in the students and teachers
 * section, so it is unverified). There is no permanent free AI tier: Reader is
 * free for viewing and commenting, and the paid plans have free trials of
 * unstated length. The row's "Included with Acrobat Pro $22.99/mo" is wrong.
 * One reader only: the privacy statement that content is never used to train
 * Adobe's AI models (generative-ai-pdf.html); the other could not read
 * the help-centre pages (403).
 *
 * Catalog audit 21 (Research Analyst browser check, 2026-10-29, annual
 * plans billed monthly, US): Standard $14.99, Pro $19.99 and Studio $24.99 a
 * month; Studio "Includes everything in Acrobat Pro, plus AI Assistant", so
 * AI Assistant is in Studio and not in Standard or Pro. Acrobat Express
 * ($9.99) is marketed as "AI-powered document insights, information sharing,
 * and content creation" (generative-ai-pdf.html); the page does not say the
 * Express plan includes AI Assistant by name, so the catalog says "marketed
 * as AI-powered". No standalone add-on price was seen. The privacy statement
 * (content never used to train Adobe's AI models) is now read twice.
 */
export default {
  slug: "adobe-acrobat-ai-assistant",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No permanent free AI tier: Acrobat Reader is free for viewing and commenting, and the paid plans offer free trials (length not stated)."
    },
    sourceUrl: "https://www.adobe.com/acrobat/pricing.html",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Acrobat Express",
        price: "$9.99",
        period: "month",
        limits: "Annual plan billed monthly; $10.99 month to month; $109.99 a year prepaid; marketed as AI-powered document insights, information sharing and content creation"
      },
      {
        name: "Acrobat Studio",
        price: "$24.99",
        period: "month",
        limits: "Annual plan billed monthly; $34.99 month to month; $299.88 a year prepaid; includes everything in Acrobat Pro, plus AI Assistant"
      },
      {
        name: "Acrobat Standard",
        price: "$14.99",
        period: "month",
        limits: "Annual plan billed monthly; $24.99 month to month; AI Assistant not included"
      },
      {
        name: "Acrobat Pro",
        price: "$19.99",
        period: "month",
        limits: "Annual plan billed monthly; $29.99 month to month; AI Assistant not included"
      }
    ],
    note: "USD, individuals, as of 2026-10-29. Express prices are from generative-ai-pdf.html; the two pages disagree on whether Express or Standard shows a trial. Team plans are priced per license. Cancelling an annual plan after 14 days carries a fee of up to half the remaining commitment.",
    sourceUrl: "https://www.adobe.com/acrobat/pricing.html",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  features: {
    value: [
      "AI Assistant is included in Acrobat Studio and not in Acrobat Standard or Pro; Acrobat Express is marketed as AI-powered document insights, and the page also mentions an AI Assistant add-on (price not confirmed)."
    ],
    sourceUrl: "https://www.adobe.com/acrobat/generative-ai-pdf.html",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      trainsOnData: false
    },
    note: "\"your content stays yours because it's never used to train Adobe's AI models\" (generative-ai-pdf.html; first reader, then the browser check of 2026-10-29). The help-centre pages could not be read (403).",
    sourceUrl: "https://www.adobe.com/acrobat/generative-ai-pdf.html",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Browser check (audit 21): AI Assistant is included in Studio ($24.99), not Standard or Pro; Express ($9.99) is marketed as AI-powered; content is never used to train Adobe's AI models."
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: AI Assistant is built into Express ($9.99/mo) and Studio ($24.99/mo) rather than Pro; no permanent free tier."
    }
  ],
} satisfies ToolFacts;
