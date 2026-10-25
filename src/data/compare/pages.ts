/**
 * Comparison page registry: /compare/<a>-vs-<b> head-to-heads and
 * /alternatives/free-<slug>-alternatives pages, plus the /compare hub.
 *
 * Kept dependency-free (no "@/" imports) so `next.config.ts` can import it
 * for the reverse-order redirects.
 *
 * Every price, free-tier line and limit on these pages comes from the
 * catalog (Platform row + fact-file overlay, the same path /platform/[slug]
 * uses). The hand-written copy below must never carry a number, a currency
 * sign or a question mark; `src/data/compare/compare.test.ts` enforces that
 * over every copy string. FAQ questions are stored without their question
 * mark and the renderer adds it.
 *
 * Order is editorial and fixed. Sponsorship never changes inclusion or order.
 *
 * TODO(feat/data-feed-v1): expose each page as JSON at /data/v1/compare/{slug}.json.
 */

export type CompareFaq = { question: string; answer: string };

/** "Who should pick which": one line per tool. */
export type ComparePick = { slug: string; text: string };

export type CompareRelatedLink = { href: string; label: string };

/** Free option that only exists if you run the software yourself. */
export type FreeOptionKind = "self-hosted";

export type CompareAlternative = {
  slug: string;
  freeOption?: FreeOptionKind;
};

type ComparePageBase = {
  /** URL segment after /compare/ or /alternatives/. */
  slug: string;
  title: string;
  description: string;
  intro: string[];
  picks: ComparePick[];
  /** "What you hit first" on the free plans. */
  hitFirst: string[];
  faq: CompareFaq[];
  /** Mentioned as plain links only, and only when the platform page is visible. */
  alsoConsider?: string[];
  related?: CompareRelatedLink[];
};

export type HeadToHeadPage = ComparePageBase & {
  kind: "head-to-head";
  /** Alphabetical: `a < b`. */
  a: string;
  b: string;
};

export type FreeAlternativesPage = ComparePageBase & {
  kind: "free-alternatives";
  baseline: string;
  alternatives: CompareAlternative[];
};

export type ComparePage = HeadToHeadPage | FreeAlternativesPage;

/** Visible label for alternatives whose only free option is self-hosting. */
export const FREE_OPTION_LABEL: Record<FreeOptionKind, string> = {
  "self-hosted":
    "Free option is self-hosted: the Community Edition is software you install and run yourself, on your own server. The cloud plans are paid.",
};

export const COMPARE_HUB_PATH = "/compare";

export const COMPARE_HUB = {
  title: "AI tool comparisons and free alternatives | Launchpad HQ",
  description:
    "Side-by-side comparisons and free alternatives for popular AI tools. Prices, free plans and limits come straight from our catalog, with dates and sources.",
  intro: [
    "Head-to-head comparisons for tools people often weigh against each other, and free alternatives for tools that charge sooner than you might like.",
    "Every price, free plan and limit on these pages comes from the same catalog data as each tool's own page, with the date it was checked and a source link.",
  ],
} as const;

export const COMPARE_PAGES: readonly ComparePage[] = [
  {
    kind: "free-alternatives",
    slug: "free-otter-ai-alternatives",
    title: "Free Otter.ai alternatives for meeting notes (2026)",
    description:
      "Free meeting note takers to try instead of Otter.ai, with each free plan, its limits and current pricing pulled from our catalog and dated.",
    baseline: "otter-ai",
    alternatives: [
      { slug: "fathom" },
      { slug: "tactiq" },
      { slug: "read-ai" },
      { slug: "granola" },
      { slug: "tl-dv" },
    ],
    intro: [
      "Otter's free Basic plan caps how many minutes it transcribes each month and how long each conversation can be.",
      "These tools also record or transcribe meetings and write up notes, and each has a free plan. The free plans differ in what they cap: transcripts, meetings with AI notes, AI credits or how much history you keep.",
    ],
    picks: [
      { slug: "fathom", text: "Pick this if you mostly meet on Zoom, Google Meet or Teams and want unlimited recordings and transcripts on the free plan." },
      { slug: "tactiq", text: "Pick this if you would rather work from a live transcript in the browser than have a bot join your calls." },
      { slug: "read-ai", text: "Pick this if you want meeting reports with participant-level metrics such as talk time." },
      { slug: "granola", text: "Pick this if you like taking your own rough notes and want AI to fill them out from the meeting afterwards." },
      { slug: "tl-dv", text: "Pick this if you want to turn parts of recorded calls into clips you can share." },
    ],
    hitFirst: [
      "Free plans cap different things. Otter caps minutes, Tactiq caps transcripts and AI credits, and tl;dv caps how many meetings get AI notes. Check which one matches how often you meet.",
      "Some cap history instead: Granola's free plan keeps only a limited meeting history.",
      "Let people know when a meeting is being recorded. Some of these tools can join a call as a visible participant, while others work without a bot, so nobody sees a recorder join.",
    ],
    faq: [
      {
        question: "Can I switch from Otter without losing my old transcripts",
        answer: "Yes, if you export them first. Otter's free Basic plan can export audio and text files, so save what you want to keep before you move.",
      },
      {
        question: "Do these tools need a bot to join my meeting",
        answer: "Not always. Granola, Tactiq and tl;dv each say they work without a bot joining, and Fathom offers both options.",
      },
    ],
  },
  {
    kind: "free-alternatives",
    slug: "free-zapier-alternatives",
    title: "Free Zapier alternatives: automation without the task bill",
    description:
      "Free and cheaper alternatives to Zapier for connecting apps, with each free plan, its limits and current pricing pulled from our catalog and dated.",
    baseline: "zapier",
    alternatives: [
      { slug: "make-integromat" },
      { slug: "activepieces" },
      { slug: "n8n", freeOption: "self-hosted" },
    ],
    intro: [
      "Zapier connects apps so one thing can trigger another, and it bills by the task. Each plan includes a monthly task allowance, and going over it costs more per task than the plan's base rate.",
      "These alternatives do the same job with different pricing, and each has a free way in. One of them is only free if you host it yourself, and that is labelled plainly below.",
    ],
    picks: [
      { slug: "make-integromat", text: "Pick this if you want a hosted tool with a visual builder and are happy to learn how it charges credits for each step." },
      { slug: "activepieces", text: "Pick this if you want a simple hosted builder with an open-source core you could move to your own server later." },
      { slug: "n8n", text: "Pick this only if you are comfortable running software on your own server, or you are willing to pay for the hosted cloud plan." },
    ],
    hitFirst: [
      "Free plans cap how many tasks or credits you get each month, and the way each tool counts a single step differs.",
      "Zapier's free plan checks for new trigger data less often than its paid plans, so an automation may not fire right away.",
      "Self-hosting avoids per-task bills, but you install, configure, secure and update the software yourself.",
    ],
    faq: [
      {
        question: "Is self-hosting really free",
        answer: "The software is free to run as a Community Edition, but you supply the server and keep it configured, secure and updated yourself. If that sounds like a chore, choose a hosted plan.",
      },
    ],
  },
  {
    kind: "free-alternatives",
    slug: "free-chatgpt-alternatives",
    title: "Free ChatGPT alternatives worth using in 2026",
    description:
      "Free AI chat assistants to try alongside or instead of ChatGPT, with each free plan, its limits and current pricing pulled from our catalog and dated.",
    baseline: "chatgpt",
    alternatives: [
      { slug: "gemini" },
      { slug: "mistral-ai-le-chat" },
      { slug: "claude" },
      { slug: "microsoft-copilot" },
    ],
    intro: [
      "ChatGPT is not the only AI chat assistant with a free plan. Each tool below has one you can use without paying.",
      "The free plans limit use in different ways. Some refresh an allowance every few hours, and some cap extras like uploads and image creation more tightly than plain chat.",
    ],
    picks: [
      { slug: "gemini", text: "Pick this if you already have a Google account. The paid plans add Gemini inside apps like Gmail and Docs." },
      { slug: "mistral-ai-le-chat", text: "Pick this if you want an assistant from a European company for quick answers, web search and simple tasks." },
      { slug: "claude", text: "Pick this if you want to group chats into projects and have the assistant create files and run code on the free plan." },
      { slug: "microsoft-copilot", text: "Pick this if you browse with Microsoft Edge, which has Copilot built in, or already pay for a Microsoft subscription that includes Copilot in apps like Word and Excel." },
    ],
    hitFirst: [
      "Usage windows come first on some plans. Gemini and Claude refresh free usage every five hours, and Gemini also has a weekly cap.",
      "Free plans usually leave out each company's most capable models, which are kept for paid plans.",
      "Extras are capped separately. ChatGPT's free plan, for example, limits uploads, image creation, voice and deep research even though everyday text chat is not capped.",
    ],
    faq: [
      {
        question: "Which free assistant is the smartest",
        answer: "There is no single answer, and the vendors change their models often. Try the same real question in two or three of them and keep the one whose answers you trust most.",
      },
      {
        question: "Where can I compare the underlying models",
        answer: "Our Claude vs GPT page compares the flagship and budget models from each family, with sourced API details.",
      },
    ],
    related: [{ href: "/models/compare/claude-vs-gpt", label: "Claude vs GPT models compared" }],
  },
  {
    kind: "head-to-head",
    slug: "heygen-vs-synthesia",
    title: "HeyGen vs Synthesia: which AI avatar video tool should you start with?",
    description:
      "HeyGen and Synthesia side by side for beginners: free plans, limits and current pricing pulled from our catalog and dated, plus who should pick which.",
    a: "heygen",
    b: "synthesia",
    intro: [
      "HeyGen and Synthesia both turn a script into a video of a talking AI presenter, so you can make explainers without filming yourself.",
      "They overlap a lot. The differences that matter to a beginner are how much the free plan lets you make and which kind of video each one is built around.",
    ],
    picks: [
      { slug: "heygen", text: "Pick this if you make marketing or creator videos and want a large library of ready-made presenters." },
      { slug: "synthesia", text: "Pick this if you make training, compliance or how-to videos for a business and want a shared team workspace." },
    ],
    hitFirst: [
      "Free plans cap how much video you can make each month: HeyGen by the number and length of videos, Synthesia by total minutes.",
      "Free videos carry a watermark on both tools. HeyGen's free plan does include one custom video avatar.",
      "Making an avatar of a real person requires that person's consent. Both tools have written rules about this, so read them before you start.",
    ],
    faq: [
      {
        question: "Can I try both for free",
        answer: "Yes. HeyGen has a free plan and Synthesia has a free Basic plan, both with watermarked videos. The current allowances are in the rows above, with the date they were checked.",
      },
    ],
  },
  {
    kind: "head-to-head",
    slug: "bolt-new-vs-lovable",
    title: "Bolt.new vs Lovable: build your first app without coding",
    description:
      "Bolt.new and Lovable side by side for first-time app builders: free plans, limits and current pricing pulled from our catalog and dated.",
    a: "bolt-new",
    b: "lovable",
    intro: [
      "Bolt.new and Lovable both build a working web app from a plain-language description. You describe what you want, they write the code, and you keep refining by chatting.",
      "Both run in the browser, and both meter AI use with a daily and a monthly allowance: Bolt counts tokens and Lovable counts credits.",
    ],
    picks: [
      { slug: "bolt-new", text: "Pick this if you want to start from a Figma design or an existing GitHub project, not just a prompt." },
      { slug: "lovable", text: "Pick this if you want a chat-first builder whose free plan tops up a few build credits every day." },
    ],
    hitFirst: [
      "The daily and monthly allowances are the first wall. Every change you ask for draws on them, and Lovable charges more for bigger changes than for small, focused edits.",
      "Bolt says the larger the project, the more tokens each message uses.",
      "Connecting your own custom domain is a paid feature on both.",
    ],
    faq: [
      {
        question: "Do I need to know how to code",
        answer: "Not to get started. Both build from a description you type in plain language.",
      },
      {
        question: "Can I take my app elsewhere later",
        answer: "Yes. Both can connect a project to GitHub, so the code sits in a repository you control.",
      },
    ],
    alsoConsider: ["v0"],
  },
  {
    kind: "head-to-head",
    slug: "cursor-vs-github-copilot",
    title: "Cursor vs GitHub Copilot: which AI coding assistant for a beginner?",
    description:
      "Cursor and GitHub Copilot side by side for new coders: free plans, limits and current pricing pulled from our catalog and dated, plus who should pick which.",
    a: "cursor",
    b: "github-copilot",
    intro: [
      "To be upfront: both of these are for people ready to work in a code editor. If you want an app without touching code, an app builder that works from a chat, like Bolt.new or Lovable, is a gentler first step.",
      "Cursor is a code editor with AI built in. GitHub Copilot is an assistant that plugs into editors you may already use, such as VS Code or JetBrains IDEs.",
    ],
    picks: [
      { slug: "cursor", text: "Pick this if you are happy to switch to a new editor in exchange for AI agents that can change several files at once." },
      { slug: "github-copilot", text: "Pick this if you already use VS Code or another supported editor and want to add AI without changing tools." },
    ],
    hitFirst: [
      "Both free plans are limited. Copilot Free caps completions and chat and agent use each month, and Cursor's usage pool refreshes weekly.",
      "Copilot Free comes with entry-level models, and on Cursor third-party models are billed separately by usage.",
      "GitHub's own guidance is to review and test the code Copilot writes before you rely on it. The same habit applies to any AI coding tool.",
    ],
    faq: [
      {
        question: "Which is easier for a complete beginner",
        answer: "If you already use VS Code or another supported editor, Copilot adds AI to the editor you know. Cursor is a separate desktop app you download, with the AI built in.",
      },
      {
        question: "Are students eligible for anything extra",
        answer: "GitHub gives free Copilot access to verified students and teachers through GitHub Education. Cursor points students to promotions at its campus and online events.",
      },
    ],
    related: [{ href: "/compare/bolt-new-vs-lovable", label: "Bolt.new vs Lovable" }],
    alsoConsider: ["claude-code", "windsurf"],
  },
];

export function comparePagePath(page: ComparePage): string {
  return page.kind === "head-to-head" ? `/compare/${page.slug}` : `/alternatives/${page.slug}`;
}

/** Tools whose cards or columns the page renders (not also-consider links). */
export function comparePageToolSlugs(page: ComparePage): string[] {
  return page.kind === "head-to-head"
    ? [page.a, page.b]
    : [page.baseline, ...page.alternatives.map((alt) => alt.slug)];
}

/** Slugs that, if excluded, take the whole page down. */
export function comparePageRequiredSlugs(page: ComparePage): string[] {
  return page.kind === "head-to-head" ? [page.a, page.b] : [page.baseline];
}

export function headToHeadSlug(a: string, b: string): string {
  return `${a}-vs-${b}`;
}

export function findHeadToHead(pair: string): HeadToHeadPage | undefined {
  return COMPARE_PAGES.find(
    (page): page is HeadToHeadPage => page.kind === "head-to-head" && page.slug === pair,
  );
}

export function findFreeAlternatives(slug: string): FreeAlternativesPage | undefined {
  return COMPARE_PAGES.find(
    (page): page is FreeAlternativesPage => page.kind === "free-alternatives" && page.slug === slug,
  );
}

/** Pages whose rendered tools include `slug`, in registry order. */
export function comparePagesForSlug(slug: string): ComparePage[] {
  return COMPARE_PAGES.filter((page) => comparePageToolSlugs(page).includes(slug));
}

/**
 * Every copy string on a page, for the no-numbers test. Titles are excluded
 * (owner-approved, and two carry a year); slugs and hrefs are not copy.
 */
export function comparePageCopyStrings(page: ComparePage): string[] {
  return [
    page.description,
    ...page.intro,
    ...page.picks.map((pick) => pick.text),
    ...page.hitFirst,
    ...page.faq.flatMap((item) => [item.question, item.answer]),
    ...(page.related ?? []).map((link) => link.label),
  ];
}

export type CompareRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
};

/** /compare/<b>-vs-<a> 301s to the alphabetical /compare/<a>-vs-<b>. */
export function compareRedirects(pages: readonly ComparePage[] = COMPARE_PAGES): CompareRedirect[] {
  return pages
    .filter((page): page is HeadToHeadPage => page.kind === "head-to-head")
    .map((page) => ({
      source: `/compare/${headToHeadSlug(page.b, page.a)}`,
      destination: `/compare/${headToHeadSlug(page.a, page.b)}`,
      statusCode: 301 as const,
    }));
}
