import type { ToolFacts } from "./types";

/**
 * Quizlet (row and slug keep the Q-Chat name): first fact file, from the
 * Research Analyst's browser check of 2026-10-29 (logged out, US, USD;
 * data/quote file lp-stale-batch3-browser.md). The batch-3 readers got 403
 * on every quizlet.com page, so nothing was readable until then.
 *
 * Plans: Plus, Plus Unlimited and Family, each billed yearly; the monthly
 * price and the length of the free trial are not shown ("Monthly plan not
 * eligible for free trial"). The upgrade page names no AI feature. The AI
 * feature Quizlet documents today is Ask Quizlet (US only, 14+, login
 * required). Q-Chat: Quizlet's help search returns nothing for it and no page
 * says it was retired or replaced, so this file does not call it retired.
 */
export default {
  slug: "quizlet-q-chat",
  lifecycle: "active",
  plans: {
    value: [
      {
        name: "Plus",
        price: "$35.99",
        period: "year",
        limits: "Shown as $2.99 a month billed yearly; 20 Learn rounds a month; practice tests; Expert Solutions",
      },
      {
        name: "Plus Unlimited",
        price: "$44.99",
        period: "year",
        limits: "Shown as $3.75 a month billed yearly; unlimited Learn rounds; practice tests; Expert Solutions",
      },
      {
        name: "Family",
        price: "$83.99",
        period: "year",
        limits: "Shown as $6.99 a month billed yearly; up to 5 accounts; unlimited Learn rounds",
      },
    ],
    note: "USD, browser check 2026-10-29, annual view (\"Annually (Save 62%)\"). The monthly price is not shown, and \"*Monthly plan not eligible for free trial\". The upgrade page names no AI feature.",
    sourceUrl: "https://quizlet.com/upgrade",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Ask Quizlet is the AI study chat inside Quizlet: step-by-step explanations that can be turned into study materials such as flashcards.",
      "Ask Quizlet is \"currently only available for users in the United States who are 14 years old or older\", and needs a login.",
      "Q-Chat is not mentioned in Quizlet's help centre, and no Quizlet page says what became of it or whether Ask Quizlet replaces it.",
    ],
    note: "Help article \"Studying with Ask Quizlet\": \"Ask Quizlet is a new way to study directly within Quizlet... step-by-step explanations... turn those explanations into study materials like flashcards\". Help search for \"Q-Chat\" returns no article or retirement notice (browser check 2026-10-29).",
    sourceUrl: "https://help.quizlet.com/hc/en-us/articles/42790350723725-Studying-with-Ask-Quizlet",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file (browser check): Plus $35.99, Plus Unlimited $44.99, Family $83.99 a year; Ask Quizlet is US-only, 14+, login required; Q-Chat not called retired.",
    },
  ],
} satisfies ToolFacts;
