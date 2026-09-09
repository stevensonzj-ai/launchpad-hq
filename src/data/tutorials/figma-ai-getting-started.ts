import type { PlatformTutorialData } from "./types";

export const figmaAiTutorial: PlatformTutorialData = {
  slug: "figma-ai-getting-started",
  platformSlug: "figma-ai",
  title: "Getting Started with Figma AI",
  tagline:
    "AI that acts on the layers in your Figma file — if your plan and your credit balance let it.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You work in a Figma file in your browser as normal. Select something on the canvas — a layer, a frame, a block of text — then right-click or open the actions menu and describe what you want in plain words. The change lands on the canvas, where you can undo it, adjust it, and ask again.",

  whatItIs: [
    "Figma AI isn't one button. It's a set of AI tools spread through Figma's products — inside design files, in FigJam boards, and in Figma Make, which builds a clickable web page from a written description — all drawing on one shared monthly balance of **credits** (the platform's unit of spend — each thing you make costs some).",
    "Which of them you can reach depends on your plan rather than on how much you use. Figma's help pages put the in-file tools — generating and editing images, rewriting text, renaming layers — on paid plans, while a free account's practical way in is Figma Make inside its own drafts.",
    "There is also a Figma **agent** (AI that takes actions on its own rather than only answering), which takes instructions in a side panel and changes the canvas itself. Figma's documentation still describes it as an open beta.",
  ],

  beforeYouStart: [
    "You need a Figma account and a file open in your browser; there is nothing to install. If you have never used Figma at all, learn to draw a frame and move a layer first.",
    "The honest money answer: a free Starter account does not unlock most of what people mean by \"Figma AI\". Full use of Figma Make needs a paid Full seat. A free account can still build unlimited Figma Make files in its own drafts, which is where the tour below starts.",
    "Figma currently gives a Starter Full seat around **500 credits a month with a 150-a-day ceiling**, and a Professional Full seat around 3,000 — roughly 50 to 70 Figma Make prompts, by Figma's own estimate. Credits expire at the monthly reset rather than rolling over, and Figma's documentation puts buying more in the admin dashboard, so if you are not the admin you wait.",
    "**Switching AI on for a Starter account is a one-way door.** Figma's settings documentation says that once AI features are turned on, they are \"permanently enabled on your account\". Decide before you flip it.",
  ],

  security: [
    {
      kind: "text",
      text: "Figma's default here is not the cautious one. Its own settings documentation says content training is turned **on** for Starter teams and for Professional teams, and off for Organization and Enterprise — so the cheaper the plan, the likelier your work is feeding model training. The switch is real and findable, but only a team or organisation admin can move it. On a solo Starter account that admin is you, which is the good news and the whole responsibility at once.",
    },
    {
      kind: "list",
      label: "Three things to settle before you point any of this at a client's file:",
      items: [
        "**Turn content training off first, then design.** Figma's AI Terms say that once an admin turns the toggle off, new content and edits added after that date will not be used to train AI models. It is forward-looking wording — it does not reach back.",
        "**What you select leaves Figma.** Figma publishes a sub-processor list that names outside model companies as recipients of AI feature data — OpenAI for Figma Design, FigJam and Figma Slides; Anthropic, Google and Amazon Bedrock among the providers behind Figma Make. If a contract names which companies may touch the material, that list is what to check it against.",
        "**A draft is not a private corner.** Figma's settings documentation says drafts organised into a team are treated the same as any other file in that team for training purposes, so \"I only did it in a draft\" protects less than it sounds like.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Bulk tidying nobody would do by hand — renaming a few hundred layers called `Frame 47` in one pass.",
      "Filling a mockup with plausible content instead of dummy text, so a stakeholder reacts to the design rather than to the placeholder.",
      "Getting a rough idea clickable in Figma Make before anyone spends a day drawing it.",
    ],
    okayAt: [
      "Generating imagery. Figma's image documentation says you pick a model from a dropdown rather than using one house model, and it does not tell you which to pick for what — so quality is partly a choice you are making blind.",
      "Wholesale layout generation. The agent works directly on the canvas, but treat what comes back as a sketch to react to.",
    ],
    avoid: [
      "Letting a Figma Make project become the only place a design lives. Figma's documentation says you can copy a Make preview into Figma Design as layers, but that changes to those layers are not applied back to the Make file — so the two quietly drift apart.",
      "Publishing what Make builds without reading it first. Figma puts a published Make project on the public web at its own address, and says plainly that you are responsible for the content that goes up there.",
      "Planning around any of this on a school or government account. Figma's own notes carve those out unevenly — Government plans are excluded from some of the newer tools, and K-12 education accounts cannot use Figma Make at all.",
    ],
  },

  starterActions: [
    {
      title: "Make an inherited file searchable again",
      whatItDoes:
        "When you open a file where every layer is named `Frame 47` → then select the lot, right-click, and choose **Rename layers** so Figma names them from what they contain. (This one is in the paid in-file set.)",
      whyHere:
        "Figma lists layer renaming among the handful of AI features that cost no credits, and it works on Figma's own layer tree rather than on pixels — Photoshop's generative tools cannot see a Figma layer at all.",
      tweak:
        "Rename a small selection first and read the result. Figma names from the content it sees, so a frame full of placeholder text gets named after the placeholder.",
    },
    {
      title: "Get dummy text out of a mockup",
      whatItDoes:
        "When a layout is drawn but every text box says the same filler sentence → then select the frame and use **Replace content** to drop in plausible names, headlines and prices.",
      whyHere:
        "Figma's docs describe it filling the text layers in the frame in place, rather than handing you a block of copy to paste. ChatGPT will write better copy and cannot put a word of it in the right layer.",
      tweak:
        "Run one duplicate through **Adjust tone** and keep both, so you can show the same layout reading formal and reading casual in the same review.",
    },
    {
      title: "Turn a flat picture into something you can recolour",
      whatItDoes:
        "When you have a logo or icon that only exists as an image file → then use **Vectorize image** to convert it into vector layers — shapes, so it stays sharp at any size, unlike a photo, which blurs when you enlarge it.",
      whyHere:
        "Figma's documentation describes the output landing as editable layers in the file you are already in. Illustrator's Image Trace does the same tracing job and leaves you with a separate document to bring across.",
      tweak:
        "Zoom in before you trust it. Tracing invents an edge wherever the picture was soft, and a logo is exactly where a wrong edge shows.",
    },
    {
      title: "Build a clickable version before you draw one",
      whatItDoes:
        "When an argument about how a flow should work has gone three rounds → then open Figma Make, describe the flow in a sentence, and get something people can click through.",
      whyHere:
        "This is the part of Figma AI a free account can genuinely reach, metered by credits rather than blocked outright. Lovable will build the same kind of clickable page from a sentence, but it does not run in the account where your design system already lives.",
      tweak:
        "Ask for one screen, not the whole product. Figma puts a Make prompt somewhere between 30 and 100-plus credits depending on complexity, so a sprawling first request is the quickest way to spend a free month's balance.",
    },
  ],

  pitfalls: [
    "**Free today is not free next month.** Figma said on 25 August 2026 that the Figma Design agent and the Weave tools would leave free beta \"in a few weeks\" and start consuming credits like everything else. That window has probably closed by the time you read this, so check what the agent costs before you build a habit around it.",
    "**Figma's own documentation disagrees with itself about who gets the agent.** One help article says the agent beta is \"available on all plans\"; the getting-started page and the Config 2026 round-up both say Professional, Organization and Enterprise. Assume the narrower answer and be pleasantly surprised.",
    "**The model choice is yours to get wrong.** If a result disappoints, change the model before you rewrite the prompt — nothing in the interface will suggest that as the cause.",
    "**On a free account, undo runs out.** Starter keeps only 30 days of version history, so a file you reshaped with AI four months ago has no earlier state left to compare against. Duplicate a file before a big AI pass.",
    "**\"Figma AI\" is a moving label.** Weave is Figma's new name for Weavy, a product it acquired that currently runs at its own address and keeps a credit balance separate from your Figma AI credits. Two balances, two products, one brand — read which one a help page is actually about.",
  ],

  whereToNext: [
    { label: "AI Plugins & Business Software", categorySlug: "ai-plugins-business-software" },
    { label: "Image Generation & Editing", categorySlug: "image-generation-editing" },
    { label: "AI Coding & Development", categorySlug: "ai-coding-development" },
  ],
};
