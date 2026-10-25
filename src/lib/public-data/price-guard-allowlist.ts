import type { AllowEntry } from "./price-guard";

/**
 * True exceptions to the no-typed-prices rule (see price-guard.ts). Keep
 * this short: a tool price belongs in the catalog, rendered through a
 * price token. `price-guard.test.ts` fails on entries that no longer match.
 */
export const PRICE_GUARD_ALLOWLIST: AllowEntry[] = [
  // Example data inside prompts the reader copies: not prices of the tool.
  {
    source: "tutorial:fireworks-ai",
    contains: "pens at 3 for $4",
    kind: "example",
    reason: "Maths word problem used to test the model's reasoning.",
  },
  {
    source: "tutorial:manus",
    contains: "cordless vacuums under $300",
    kind: "example",
    reason: "Shopping-research prompt; the budget is the reader's example.",
  },
  {
    source: "tutorial:manus",
    contains: "on a $1,500 budget",
    kind: "example",
    reason: "Trip-planning prompt; the budget is the reader's example.",
  },
  {
    source: "tutorial:ramp-intelligence",
    contains: "expense a $120 dinner",
    kind: "example",
    reason: "Expense-policy question used as a sample prompt.",
  },
  {
    source: "tutorial:zillow-ai-zestimate",
    contains: "median error",
    kind: "example",
    reason: "Worked example turning Zillow's error percentage into dollars on a sample house; no tool price.",
  },
  {
    source: "tutorial:make-integromat",
    contains: "A ten-step scenario running a hundred times spends a thousand credits",
    kind: "example",
    reason: "Arithmetic showing how per-module credits add up (10 steps x 100 runs); not an allowance.",
  },
  {
    source: "tutorial:make-integromat",
    contains: "A ten-step scenario running a hundred times costs a thousand credits",
    kind: "example",
    reason: "Same arithmetic in the pitfalls; explains the metering unit, not a plan limit.",
  },
  // Numbers the patterns mistake for plan prices or limits.
  {
    source: "tutorial:apollo-io",
    contains: "starting around 50 emails a day per mailbox",
    kind: "not-a-limit",
    reason: "Deliverability advice on sending volume per mailbox, not an Apollo plan limit.",
  },
  {
    source: "tutorial:outreach",
    contains: "Your sending ceiling is your mailbox's, not Outreach's",
    kind: "not-a-limit",
    reason: "Google and Microsoft mailbox sending limits, which the sentence contrasts with Outreach; not Outreach plan limits.",
  },
  {
    source: "tutorial:duolingo-max",
    contains: "five minutes a day",
    kind: "not-a-limit",
    reason: "Suggested study time, not a plan allowance.",
  },
  {
    source: "tutorial:unriddle",
    contains: "limited to 20MB or 120 pages",
    kind: "not-a-limit",
    reason: "Per-file upload size cap (size in MB and pages), which the brief keeps as a file-size spec.",
  },
  {
    source: "tutorial:scale-ai",
    contains: "worth about $144,000 in total",
    kind: "not-a-limit",
    reason: "Total value of the benchmark's freelance projects; describes the benchmark, not a price.",
  },
  {
    source: "tutorial:aiva",
    contains: "more than $300k of revenue",
    kind: "not-a-limit",
    reason: "Licence definition of an Enterprise customer (a revenue threshold), not a price.",
  },
  {
    source: "tutorial:ramp-intelligence",
    contains: "Ramp's application rules require",
    kind: "not-a-limit",
    reason: "Business eligibility requirement (cash balance), not a price; Ramp's card has no plan price in this sentence.",
  },
  {
    source: "tutorial:ramp-intelligence",
    contains: "if prices drop by $50 or more",
    kind: "not-a-limit",
    reason: "Quoted product rule for hotel rebooking (a hotel price change), not a Ramp price.",
  },
];
