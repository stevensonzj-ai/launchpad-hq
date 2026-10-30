import type { ToolFacts } from "./types";

/**
 * AIVA: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Free forever (3 downloads a month, up to 3 minutes, AIVA owns the
 * copyright). The pricing page shows Standard €11 and Pro €33 a month
 * billed annually (+ VAT); only on Pro do you own the copyright. One
 * reader also found the monthly-billing prices (€15 / €49) in the page's
 * script, so those stay unverified.
 */
export default {
  slug: "aiva",
  lifecycle: "active",
  company: {
    value: "Aiva Technologies SARL",
    note: "Luxembourg.",
    sourceUrl: "https://www.aiva.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free forever, no card: 3 downloads a month, tracks up to 3 minutes, MP3 and MIDI; AIVA owns the copyright.",
    },
    sourceUrl: "https://www.aiva.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "€0",
        period: "",
        limits: "3 downloads a month; up to 3 minutes; copyright owned by AIVA",
      },
      {
        name: "Standard",
        price: "€11",
        period: "month",
        limits: "+ VAT, billed annually; 15 downloads a month; up to 5 minutes; copyright owned by AIVA",
      },
      {
        name: "Pro",
        price: "€33",
        period: "month",
        limits: "+ VAT, billed annually; 300 downloads a month; up to 5 min 30 s; all formats; copyright owned by you",
      },
    ],
    note: "EUR, as of 2026-10-29; no USD shown. Monthly-billing prices (one reader, from the page script): Standard €15, Pro €49 + VAT.",
    sourceUrl: "https://www.aiva.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: Standard €11 and Pro €33 a month billed annually (+ VAT); free 3 downloads/mo; copyright yours only on Pro.",
    },
  ],
} satisfies ToolFacts;
