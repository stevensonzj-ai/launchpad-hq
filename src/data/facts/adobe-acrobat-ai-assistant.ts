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
      summary: "No free tier is described on the Individuals plans page, and no free-trial wording appears. The only Reader mention is the FAQ line that an Acrobat desktop subscription includes the Acrobat Reader mobile app."
    },
    sourceUrl: "https://www.adobe.com/acrobat/plans.html",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Acrobat Standard",
        price: "US$14.99",
        period: "month",
        limits: "Annual billed monthly. Annual prepaid US$179.88/yr. Monthly US$24.99/mo, cancel anytime, no fee. AI Assistant is not included."
      },
      {
        name: "Acrobat Pro",
        price: "US$19.99",
        period: "month",
        limits: "Annual billed monthly. Annual prepaid US$239.88/yr. Monthly US$29.99/mo, cancel anytime, no fee. AI Assistant is not included."
      },
      {
        name: "Acrobat Studio",
        price: "US$24.99",
        period: "month",
        limits: "Annual billed monthly. Annual prepaid US$299.88/yr. Monthly US$34.99/mo, cancel anytime, no fee. Includes everything in Acrobat Pro, plus AI Assistant."
      }
    ],
    note: "US$, Individuals tab, read 2026-11-20. Annual billed monthly: a fee applies up to half the remaining annual commitment if you cancel after 14 days. No Express plan is on this page.",
    sourceUrl: "https://www.adobe.com/acrobat/plans.html",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
