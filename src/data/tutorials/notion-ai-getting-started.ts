import type { PlatformTutorialData } from "./types";

export const notionAiTutorial: PlatformTutorialData = {
  slug: "notion-ai-getting-started",
  platformSlug: "notion-ai",
  title: "Getting Started with Notion AI",
  tagline:
    "AI built into the Notion workspace — draft and summarize in your docs, and ask questions across everything you've written.",
  archetype: "prompts",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://www.notion.com/releases",
  accessTier: "PREMIUM",

  howItWorks:
    "You trigger the AI inside a page (a keyboard shortcut or a menu) to write, edit, or summarize, or you open Ask Notion to query across your workspace. Because it's grounded in what you've actually written, its answers are anchored to your docs rather than the open web — and it's **permission-aware**, so it only reads content you already have access to. Under the hood it uses models from several AI labs (with an auto mode that picks per task).",

  whatItIs: [
    "Notion AI is the AI woven into **Notion**, the all-in-one workspace for notes, docs, wikis, and databases. Rather than a separate chatbot, it lives **inside your pages**: it drafts and rewrites text where you're working, summarizes and translates, autofills databases, and — the standout — **\"Ask Notion\"** answers questions using **your entire workspace** (and connected apps) as the source, with newer **agents** that carry out multi-step tasks. It's for people who already keep their work in Notion and want AI grounded in **their** content.",
  ],

  beforeYouStart: [
    "**The big change to know:** Notion **removed the standalone AI add-on.** Full Notion AI (Ask Notion, agents, AI meeting notes) now comes only with the **Business plan (~$20/user/month)**. The **Free and Plus plans include just a small trial** of AI (around 20 responses) — not a usable free tier. So while Notion-the-workspace has a great free plan, Notion-**AI** is effectively a paid feature.",
    "If you don't already live in Notion, the AI's main advantage (grounding in your own workspace) only shows up once you've got content in there.",
    "Try the free trial responses first to see if it fits before committing to Business.",
  ],

  security: [
    {
      kind: "text",
      text: "On privacy, Notion is strong: it **does not use your workspace content to train AI models**, and its AI providers are contractually barred from training on your data — on **all** plans. Your content stays yours.",
    },
    {
      kind: "list",
      label: "How it handles your workspace",
      items: [
        "**Permission-aware:** the AI can only see content **you already have access to** — it respects your existing page and database permissions, which matters a lot on a shared team workspace.",
        "**Grounded in your docs:** Ask Notion answers from your actual content with links back, so it's far less prone to inventing facts than an open chatbot — but it can still misread, so check the source page.",
        "**Data retention varies by plan:** Enterprise gets zero retention with the AI providers; other plans have the providers hold data briefly (up to about 30 days) before deletion.",
      ],
    },
    {
      kind: "text",
      text: "Because it can read across your whole workspace, be mindful of what you put in Notion in the first place — the AI is only as private as the workspace it's grounded in.",
    },
  ],

  triad: {
    bestAt: [
      "Drafting, summarizing, and rewriting right inside your docs",
      "Answering questions from your own workspace (Ask Notion), with links",
      "Turning plain-English requests into database formulas and autofills",
      "AI grounded in your content rather than the open web",
    ],
    okayAt: [
      "Value if you don't already use Notion (the grounding needs your content)",
      "Cost for solo users (full AI now means the Business plan)",
      "Absolute factual reliability (grounded, but still verify against the source page)",
    ],
    avoid: [
      "Expecting real AI on the free/Plus tiers (it's a small trial now)",
      "Assuming answers are infallible (check the linked source)",
      "Putting content in Notion you wouldn't want the workspace AI able to read",
    ],
  },

  starterActions: [
    {
      title: "Draft inside a doc",
      prompt:
        "Write a short, friendly project kickoff note for a team of five, covering the goal, the timeline, and who to contact with questions.",
      whyHere:
        "Writing where you already work — no copy-paste from a separate chatbot — is Notion AI's most immediate everyday win.",
      tweak: "Then highlight the draft and ask it to \"make this more concise\" or \"change the tone to more formal.\"",
    },
    {
      title: "Summarize a long page",
      prompt:
        "Summarize this page into five bullet points and pull out any action items with who owns them.",
      whyHere: "Turning a wall of meeting notes into a usable summary is the task people reach for most.",
      tweak: "Works on any long doc — paste in notes first, then summarize.",
    },
    {
      title: "Ask your workspace a question",
      whatItDoes:
        "Open Ask Notion and ask something only your own notes would know, like \"what did we decide about the launch date?\"",
      whyHere:
        "This is the feature that makes Notion AI different — a grounded answer from **your** content, with links to where it came from.",
      tweak: "It only knows what's in your workspace, so it works better the more you keep there.",
    },
  ],

  pitfalls: [
    "**Real Notion AI now means the Business plan.** The standalone add-on is gone; Free/Plus give only a ~20-response trial.",
    "**It's grounded, not infallible.** Ask Notion links its sources — click through and confirm before relying on an answer.",
    "**Its value scales with your content.** The workspace-grounding advantage only appears once your work actually lives in Notion.",
  ],

  whereToNext: [
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
    { label: "AI Plugins for Business Software", categorySlug: "ai-plugins-business-software" },
  ],
};
