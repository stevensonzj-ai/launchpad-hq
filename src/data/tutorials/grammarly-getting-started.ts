import type { PlatformTutorialData } from "./types";

export const grammarlyTutorial: PlatformTutorialData = {
  slug: "grammarly-getting-started",
  platformSlug: "grammarly",
  title: "Getting Started with Grammarly",
  tagline: `A writing assistant that follows you across every app — which is both the point and the thing to think about.`,
  archetype: "recipes",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://www.grammarly.com/blog/product/",
  accessTier: "FREE",

  howItWorks: `Grammarly installs as a browser extension or desktop app and watches what you type wherever you type it — email, documents, forms, chat. It flags spelling and grammar as you go, and on paid plans suggests rewrites and tone adjustments. Unlike an assistant you visit, this one comes to you, which is why it feels effortless and also why deciding where it should and should not be running is the most important setup step.`,

  whatItIs: [
    `A writing assistant that works inside the applications you already use rather than in its own window.`,
    `Free for spelling, grammar, and basic tone; paid for rewrites, tone adjustment, and detection features.`,
    `Now one product within a company that renamed itself **Superhuman** — the writing tool is still called Grammarly.`,
    `Best understood as an always-on layer, not a tool you open.`,
  ],

  beforeYouStart: [
    `**The company is now called Superhuman.** It renamed itself on 2025-10-29, uniting the writing tool with an email client and a workspace product. You will see Superhuman branding and prompts for other products. The writing assistant you came for is still Grammarly.`,
    `The free plan covers spelling, grammar, and tone signals plus a limited monthly allowance of AI prompts — roughly a hundred.`,
    `The main paid tier runs about $12 per person a month paid annually, or about $30 month to month, and raises the AI prompt allowance to around two thousand. There is no published top-up if you exhaust it.`,
    `**Decide where it runs before you install it.** The extension can see what you type on the sites it is enabled for, and that choice is more consequential than any setting inside the product.`,
  ],

  security: [
    {
      kind: "text",
      text: `The company states it does not sell user content or use it to train third-party models, holds recognised security certifications, and performs basic checks on your device rather than in the cloud. Taken on its own that is a reassuring posture, and there is no reason to doubt it.`,
    },
    {
      kind: "text",
      text: `The exposure is a different shape: **surface area**. This is software with read access to text as you type it, across whatever sites and apps you enable. That is not a claim about misuse — it is a description of what the product is. The relevant question is not whether the vendor is trustworthy, but whether you want any third party positioned to read everything typed into your banking portal, your medical records, or your employer's internal systems.`,
    },
    {
      kind: "list",
      label: "Worth doing at install time",
      items: [
        `Disable it on financial, medical, and government sites explicitly rather than assuming it is off there.`,
        `Check with your employer before installing it on a work machine. Many organisations have a position on this, and some have a policy.`,
        `Review what the newer assistant features connect to — email, calendar, files — and enable only what you need.`,
        `Revisit the enabled-sites list occasionally. It grows quietly as you accept prompts.`,
      ],
    },
  ],

  triad: {
    bestAt: [
      `Catching mistakes in the moment, before you send`,
      `Consistency across everything you write, without switching tools`,
      `Tone checks on messages where the stakes are social rather than grammatical`,
      `Non-native writers wanting continuous, low-friction correction`,
    ],
    okayAt: [
      `Long-form structural editing, where a dedicated assistant does more`,
      `Style and voice, where it tends to flatten toward neutral professional prose`,
      `Technical or specialist writing, where it flags correct jargon as errors`,
    ],
    avoid: [
      `Sites handling money, health, or credentials`,
      `Work systems without your employer's agreement`,
      `Accepting every suggestion, which produces bland and slightly generic writing`,
    ],
  },

  starterActions: [
    {
      title: "Turn it off somewhere before you turn it on everywhere",
      whatItDoes: `Restricts the extension to the sites where you actually want help.`,
      whyHere: `The default is broad. Narrowing it deliberately is the highest-value five minutes you will spend with this tool.`,
      tweak: `Start with banking, health, and work systems disabled, then add exceptions as you find you want them.`,
    },
    {
      title: "Run one important email through the tone check before sending",
      whyHere: `Tone detection is more useful than grammar checking for most adults, and almost nobody uses it deliberately.`,
      tweak: `If the tone reading surprises you, that is the point. Rewrite before you send, not after they reply.`,
    },
    {
      title: "Reject a suggestion on purpose",
      whyHere: `Builds the habit of treating suggestions as opinions rather than corrections, which is what keeps your writing sounding like you.`,
      tweak: `Pay attention to how often it wants to remove a deliberate stylistic choice. Those are the ones to keep.`,
    },
    {
      title: "Watch your monthly AI allowance for one cycle",
      whyHere: `Free and paid tiers differ mostly in this number, so knowing your real usage tells you whether upgrading would change anything.`,
      tweak: `If you never approach the free limit, the paid tier is buying you features rather than capacity — decide on that basis.`,
    },
  ],

  pitfalls: [
    `**The company renamed itself; the product did not.** Superhuman is the company, Grammarly is still the writing assistant. Expect unfamiliar branding and prompts for products you did not ask for.`,
    `**It sees what you type where you enable it.** That includes forms, portals, and internal systems. Disable it on anything financial, medical, or confidential, and check your employer's policy before installing at work.`,
    `**Accepting everything flattens your writing.** Suggestions optimise for correct and neutral. Applied uncritically, they strip the voice out of anything with personality.`,
    `**It flags correct specialist language as wrong.** Technical terms, names, and domain jargon get marked routinely. In specialist writing you will override it constantly.`,
    `**The AI allowance is capped with no top-up.** Exhaust the monthly prompt limit and you wait for the cycle to reset or move up a tier. There is no published option to buy more.`,
  ],

  whereToNext: [
    { label: "Research and academic tools", categorySlug: "research-academic-tools" },
    { label: "Assistants for longer writing", categorySlug: "text-conversational-ai" },
  ],
};
