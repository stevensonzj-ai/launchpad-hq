import type { ToolFacts } from "./types";

/**
 * Windsurf: renamed Devin Desktop by Cognition (blog post dated 2026-06-02). windsurf.com redirects to devin.ai/desktop.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "windsurf",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Cognition renamed Windsurf to Devin Desktop in June 2026. Existing users get the change as a routine update, and Cognition says plans, pricing and extensions stay the same.",
      formerName: "Windsurf",
      whatToDo: "Nothing to do. Our getting-started guide still uses the Windsurf name in places.",
    },
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  company: {
    value: "Cognition",
    note: "Devin Desktop is Cognition's product (Windsurf was renamed by Cognition). As of 2026-11-05.",
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  displayName: {
    value: "Devin Desktop",
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://devin.ai/desktop",
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "Light agent quota; unlimited inline edits and Tab completions" },
      { name: "Pro", price: "$20", period: "month", limits: "" },
      { name: "Max", price: "$200", period: "month", limits: "" },
      { name: "Teams", price: "$80", period: "month", limits: "Up to 100 users; SAML/OIDC SSO" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD. windsurf.com/pricing redirects to devin.ai/pricing (Windsurf is now Devin Desktop). Re-read 2026-11-20: Free $0, Pro $20, Max $200, and Teams $80 per month. The page does not show a $40 per-seat add-on.",
    sourceUrl: "https://devin.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "claude-sonnet",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  features: {
    value: [
      "SWE-2 Flash is Cognition's fast coding model, available in Devin Desktop and Devin CLI only (as of 2026-11-05). There is no public API and no public weights; Cognition says it is building a secure weight-share program.",
      "Cognition says SWE-2 Flash costs about one fifth as much as SWE-2 and runs about 3x faster (Cognition's own claim). Promotional pricing may apply; check the in-app model selector. Any end date for a Flash promotion is unverified.",
      "Devin Apps, announced 2026-11-13, are private web apps hosted on Devin's cloud computer. Everyone who opens one signs in to Devin, and the apps are never public. Sharing can be limited to people you add, your organization, or your enterprise. The post says billing is based on how long the machine is awake and does not publish a dollar price.",
      "SWE-2.1, posted 2026-11-24, is a coding model trained with pure reinforcement learning on Kimi K3, and Cognition describes it as an upgrade over SWE-2. SWE-2.1 Ultrafast is that same model, served through a Cerebras partnership at 10 times the speed. The post does not list a price. The post also says SWE-2.1 Cyber, a version with more permissive safeguards, is rolling out to Devin Security.",
    ],
    note: "SWE-2.1 was read 2026-11-26 at https://cognition.com/blog/swe-2-1. Devin Apps was checked 2026-11-16 and the SWE-2 Flash items were checked 2026-11-05; those bullets were not re-read. A \"free through November 30\" claim for Flash came from X and secondary sources and is not confirmed by Cognition's pages, so it is not recorded.",
    sourceUrl: "https://cognition.com/blog/swe-2-1",
    sourceKind: "announcement",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "features",
      summary:
        "X-watch: SWE-2.1 is trained with reinforcement learning on Kimi K3. Ultrafast is the same model through a Cerebras partnership at 10 times the speed. The post does not list a price.",
    },
    {
      date: "2026-11-16",
      field: "features",
      summary:
        "X-watch: Devin Apps are private web apps on Devin's cloud computer. The post does not publish a dollar price. Billing follows how long the machine is awake.",
    },
    { date: "2026-11-05", field: "features", summary: "X-watch: added SWE-2 Flash (Devin Desktop and Devin CLI only; no public API or weights) and company Cognition. Free-through-Nov-30 claim not recorded (unverified)." },
    { date: "2026-11-20", field: "plans", summary: "Pricing page re-read: Free $0, Pro $20, Max $200, and Teams $80 per month. The earlier $40 per full seat is not on the page. Teams lists up to 100 users and SAML/OIDC SSO." },
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://devin.ai/pricing and price facts added with source and date." },
    {
      date: "2026-10-20",
      field: "displayName",
      summary: "Windsurf renamed Devin Desktop; official link now devin.ai/desktop.",
    },
  ],
} satisfies ToolFacts;
