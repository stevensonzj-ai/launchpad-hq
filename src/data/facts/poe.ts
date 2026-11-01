import type { ToolFacts } from "./types";

/**
 * Poe: hidden by catalog audit 28 (2026-11-01), unhidden the same day (Zach).
 * Lifecycle stays "active". Poe shows plans and prices only after you sign in
 * at poe.com: logged out, poe.com redirects to /login, help.poe.com returns
 * 403 and poe.com/pricing is a 404 (checked 2026-11-01). So the catalog lists
 * no prices for Poe; the earlier price ladder came from third-party sources and
 * was removed by catalog audit 29. No database change hid it.
 */
export default {
  slug: "poe",
  lifecycle: "active",
  changelog: [
    {
      date: "2026-11-01",
      field: "visibility",
      summary: "Unhidden (Zach, 2026-11-01): price ladder removed; pricing requires sign-in at poe.com",
    },
  ],
} satisfies ToolFacts;
