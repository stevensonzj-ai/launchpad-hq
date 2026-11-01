import type { ToolFacts } from "./types";

/**
 * Poe: hidden, catalog audit 28 (2026-11-01). Lifecycle stays "active":
 * nothing says the product is gone. poe.com and help.poe.com send logged-out
 * visitors to a login page or a 403, poe.com/pricing is a 404 and
 * poe.com/api_pricing shows no subscription prices, so no plan or free-tier
 * fact could be read on Poe's own pages; the row's old price ladder came from
 * third-party sources. Reversible: delete `visibility`, remove "poe" from
 * HIDDEN_PAGE_REDIRECTS and restore the guide from src/data/tutorials/retired/
 * once the plans can be read. No database change hides it.
 */
export default {
  slug: "poe",
  lifecycle: "active",
  visibility: "hidden",
  changelog: [
    {
      date: "2026-11-01",
      field: "visibility",
      summary:
        "Hidden (catalog audit 28): Poe's pages need a login or return 403/404 for logged-out visitors and show no subscription prices. /platform/poe 301s to /platform/openrouter; the guide moved to src/data/tutorials/retired/.",
    },
  ],
} satisfies ToolFacts;
