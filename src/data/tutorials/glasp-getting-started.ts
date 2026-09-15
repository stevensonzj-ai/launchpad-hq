import type { PlatformTutorialData } from "./types";

export const glaspTutorial: PlatformTutorialData = {
  slug: "glasp-getting-started",
  platformSlug: "glasp",
  title: "Getting Started with Glasp",
  tagline:
    "A highlighter for everything you read — and a decision about who gets to see it.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  accessTier: "FREE",

  howItWorks:
    "You install a small add-on in your browser, then select text on any page the way you would to copy it, pick a color, and it is saved. A sidebar shows what you have marked on that page, and everything lands in one library you can read back later.",

  whatItIs: [
    "Glasp is a highlighter for the web. It saves the passages you mark on articles, PDFs and YouTube transcripts into one searchable library, so the good bits of what you read stop vanishing into closed tabs.",
    "What makes it unusual is the social layer. Glasp is built on the belief that highlights are worth sharing — its stated mission is \"to democratize access to other people's learning\" — so you get a profile page other people can visit, and you can see where other readers stopped on the same article.",
    "There is AI on top of the highlighting: summaries of pages and YouTube videos, a chat box for questioning a PDF, and an \"AI Clone\" that answers from your own saved highlights instead of the open web.",
  ],

  beforeYouStart: [
    "**The first thing to do is not to highlight anything.** Open Settings and find the visibility control for highlights — and the separate one under **AI Clone & Hatch** — before you mark a single passage. Which way those switches start is genuinely unclear from outside Glasp (see Privacy below), and they decide whether your reading is public.",
    "Free to use with a sign-up and no card. The thing you would pay for here is privacy, not capability: Pro — currently around $15 a month, or $12.50 a month if you pay for a year, with a student discount — is what adds unlimited private highlights. Whether a free account gets any private highlights at all is not something Glasp's own pages settle either way.",
    "Highlighting itself is unlimited and unmetered, but the AI features are rationed on the free plan: currently around 20 chat **credits** (the platform's unit of spend — each thing you ask costs some) a month, three basic YouTube summaries a day, and 30 PDF uploads. Chatting with a PDF is metered too, on a separate allowance Glasp's pages do not describe consistently, so treat the exact numbers as current rather than fixed.",
    "It is a browser add-on, so it lives in a browser: Chrome, Safari, Edge and Firefox have published versions, and Brave and Opera install the Chrome one. Phone browsers cannot run add-ons at all, which is why there are separate iPhone, iPad and Android apps with their own built-in reader.",
    "You are not locked in. Glasp states plainly that export is not a paid feature — \"your highlights are yours, and we would rather you could leave than feel stuck.\"",
  ],

  security: [
    {
      kind: "text",
      text: "Glasp is a publishing tool wearing a highlighter's clothes, and that is the single most important thing to understand before you use it. Its mission statement is about sharing what you read, and its free plan is sold on public highlights. Some of that is not optional: Glasp's privacy policy (last updated **31 August 2026**) says it will publicly share your profile picture, name, user handle and any social media handles you have added to your profile. Anything marked public \"can be indexed by search engines.\"",
    },
    {
      kind: "list",
      label: "Check these three things before you highlight anything sensitive",
      items: [
        "**The visibility default, because Glasp's own pages contradict each other.** Its support page says \"Highlights are private to you unless you choose to make them public.\" Its plan comparison sells the free tier as \"unlimited public highlights\", and its own how-to guide says \"By default, Glasp highlights are public.\" Those cannot all be true. Look at the setting in your account and trust that rather than any of the three pages.",
        "**Your AI Clone**, which is a separate switch. It is set to Public, and Glasp says other people can ask someone's clone a question without an account at all. Settings → AI Clone & Hatch changes it to Private.",
        "**What Glasp does with the content regardless.** The policy says it \"may use information we collect through the Services, including content you create and save, to develop, train, evaluate, and improve machine learning and artificial intelligence models.\" It names no opt-out, and it names no exception for private highlights either.",
      ],
    },
    {
      kind: "text",
      text: "The one genuinely reassuring thing here is where Glasp refuses to run. The extension is switched off entirely on online banking, sign-in pages, password managers, tax and immigration portals, health records and adult sites, and on your own network's router and storage pages — so those never produce anything to save in the first place.",
    },
    {
      kind: "text",
      text: "Deletion is partial rather than instant. Deleting an item removes it from view while Glasp keeps a limited record of it to enforce usage quotas; deleting your account removes your content and profile but keeps billing records and a snapshot of account and usage facts for up to two years.",
    },
  ],

  triad: {
    bestAt: [
      "Highlighting a YouTube transcript — Glasp's own support pages discuss timestamps on highlights, so it appears to keep the timestamp alongside the line",
      "Seeing where other readers stopped on the same page — a genuinely different way of finding what is worth reading",
      "Pulling your Kindle highlights out of Amazon and into something you control",
    ],
    okayAt: [
      "Being your whole reading app; there is a built-in reader and a feed, but the highlighter is what the product is actually good at",
      "PDFs you did not open in a browser — they upload and work, but count against the monthly file cap",
    ],
    avoid: [
      "Anything you would not publish under your own name. Your profile picture, name and handle are public by Glasp's own policy whatever you do with individual highlights.",
      "Assuming the visibility setting is the whole privacy story — it governs who else can read a highlight, not what Glasp itself does with it (see Privacy above).",
    ],
  },

  starterActions: [
    {
      title: "Decide who your highlighting is for, before you do any",
      whatItDoes:
        "Set both switches — highlight visibility, and the separate one under **AI Clone & Hatch** — then open your profile page, where an already-saved highlight can be flipped between public and private one at a time.",
      whyHere:
        "Readwise gives you no public profile at all and nothing a stranger can query; Glasp ships you both by default, so your first five minutes here are spent switching things off rather than on.",
    },
    {
      title: "Highlight one article end to end",
      whatItDoes:
        "Pick a long article you were going to read anyway. Select a passage, choose a color, and add a tag while you are there. Open the sidebar to see everything you marked on that page in order.",
      whyHere:
        "Glasp captures the color and the tag at the moment you select the passage, not at an import step afterwards, so the reason it mattered is recorded while you still know it — which is the part you have forgotten by evening.",
      tweak:
        "Turn on the crowd-highlights view on the same article to see where other readers stopped.",
    },
    {
      title: "Ask your own reading a question",
      prompt:
        "Across everything I've highlighted, what are the three ideas that keep coming back? Quote the passage behind each one and tell me which article it came from.",
      whyHere:
        "The AI Clone answers only from passages you saved, so this question hands your own reading back to you — something ChatGPT cannot do unless you paste the material in first.",
      tweak: "Name a topic you highlight a lot to narrow it down.",
    },
    {
      title: "Put a PDF through the chat box",
      prompt:
        "Summarize this PDF in ten bullet points, then list every claim it makes that it doesn't back up with a citation.",
      whyHere:
        "Glasp keeps the chat box and the highlighter on the same file, so an answer worth keeping becomes a highlight in the same library — rather than a screenshot in a second app, which is what a standalone tool like ChatPDF leaves you with.",
    },
    {
      title: "Set up the way out before you need it",
      whatItDoes:
        "In Settings → Integrations, connect Notion, Obsidian, Readwise, Roam, Zotero, Tana, Workflowy or Anki — or just run **Export All Highlights** and take a Markdown or CSV file.",
      whyHere:
        "Re-running an export only sends the pages that changed since the last one, so this behaves as a backup you repeat weekly rather than a one-time escape hatch — which is the reason to wire it up on day one instead of the day you leave.",
    },
  ],

  pitfalls: [
    "Kindle highlights are imported, not synced — you re-run the import after each reading session. They only exist for books bought from Amazon and read on a Kindle device or app, and Amazon caps how much of any one book can be exported, so a long book can arrive incomplete. That cap is Amazon's, not Glasp's.",
    "Highlighting will sometimes do nothing at all, and the reason is rarely a bug. Text drawn as part of an image or inside an embedded frame from another site cannot be highlighted by any browser add-on, and Glasp also switches itself off on the excluded sites listed under Privacy above. Reloading the page first fixes a third case: the add-on has to be running before the page finishes loading.",
    "If a highlight shows in the add-on but is missing from the website, it is almost always an account mismatch — the add-on popup can be signed into a different account from the one in your browser tab.",
    "There is no way to share with just a few people. Glasp said in August 2026 that it has no group feature, so your only two settings are effectively \"just me\" and \"anyone.\"",
    "Do not read the public changelog as a sign of life. Glasp's \"What's new\" page has not been updated since February 2025, even though the mobile apps were rebuilt in 2026 and prices changed in May 2026. The blog and the pricing page are the pages that move.",
  ],

  whereToNext: [
    { label: "PDF and document tools", categorySlug: "document-pdf-processing" },
    { label: "Notes and meeting tools", categorySlug: "meetings-notes" },
    { label: "Learning tools", categorySlug: "education-learning-ai" },
  ],
};
