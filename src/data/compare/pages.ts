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
      "Otter is often the first meeting note taker people try, and its free plan is where many of them first run into a cap.",
      "These tools also record or transcribe meetings and write up notes, and each has a free way in. The free plans differ in what they cap: minutes, meetings, history or the AI summaries themselves.",
    ],
    picks: [
      { slug: "fathom", text: "Pick this if you mostly take video calls and want recording and summaries with as little setup as possible." },
      { slug: "tactiq", text: "Pick this if you would rather work from a live transcript in the browser than have a bot join your calls." },
      { slug: "read-ai", text: "Pick this if you want meeting reports with extras like speaker and engagement stats." },
      { slug: "granola", text: "Pick this if you like taking your own rough notes and want AI to fill them out from the audio afterwards." },
      { slug: "tl-dv", text: "Pick this if you want to clip and share moments from recorded calls with teammates." },
    ],
    hitFirst: [
      "Most free plans cap something per month: meetings, minutes of transcription or AI summaries. Check which one matches how often you meet.",
      "Some tools keep transcripts but limit how far back you can search, or how many AI summaries you get.",
      "Tell people when a meeting is being recorded. Several of these tools send a visible bot into the call, which makes that obvious, while others listen through your computer's audio.",
    ],
    faq: [
      {
        question: "Can I switch from Otter without losing my old transcripts",
        answer: "Export what you want to keep from Otter before you cancel or downgrade. The alternatives here do not import an Otter archive for you.",
      },
      {
        question: "Do these tools need a bot to join my meeting",
        answer: "Some do and some do not. Bot-based tools show up as a participant, while bot-free tools capture audio on your own device. Each tool's page lists how it records.",
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
      "Zapier connects apps so one thing can trigger another, and it bills by the task. That is fine at first and gets expensive as your automations grow.",
      "These alternatives do the same job with different pricing, and each has a free way in. One of them is only free if you host it yourself, and that is labelled plainly below.",
    ],
    picks: [
      { slug: "make-integromat", text: "Pick this if you want a hosted tool with a visual builder and are happy to learn how it counts usage for each step." },
      { slug: "activepieces", text: "Pick this if you want a simple hosted builder with an open-source core you could move to your own server later." },
      { slug: "n8n", text: "Pick this only if you are comfortable running software on your own server, or you are willing to pay for the hosted cloud plan." },
    ],
    hitFirst: [
      "Free plans cap how many runs, tasks or operations you get each month, and the way each tool counts a single step differs.",
      "Some free plans also limit how often a trigger checks for new data, so an automation may not fire right away.",
      "Self-hosting avoids per-task bills, but you take on the server, the updates, the backups and the security yourself.",
    ],
    faq: [
      {
        question: "Is self-hosting really free",
        answer: "The software can be, but the server it runs on usually is not, and your time keeping it updated and secure is a real cost. If that sounds like a chore, choose a hosted plan.",
      },
      {
        question: "Can I move my existing Zaps over",
        answer: "Not automatically. Each tool has its own builder, so plan to rebuild your automations one at a time, starting with the ones that use the most tasks.",
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
      "ChatGPT is where most people start, but it is not the only good free AI chat assistant. Each of these has a free plan you can use today without paying.",
      "Free plans are usually limited by how many messages you can send in a period and which model you get. When you hit the limit you either wait or fall back to a lighter model.",
    ],
    picks: [
      { slug: "gemini", text: "Pick this if you live in Google apps like Gmail, Docs and Drive and want an assistant that sits close to them." },
      { slug: "mistral-ai-le-chat", text: "Pick this if you want a fast European alternative with a clean interface." },
      { slug: "claude", text: "Pick this if you do a lot of writing and long documents and want careful, readable answers." },
      { slug: "microsoft-copilot", text: "Pick this if you use Windows, Edge or Microsoft apps and want an assistant built into them." },
    ],
    hitFirst: [
      "Message caps come first. Free plans limit how much you can send in a window of time, and the window resets on its own schedule.",
      "The best model is often rationed on free plans, so long sessions may quietly drop to a lighter one.",
      "Extras like file uploads, image generation and voice are often capped more tightly than plain chat.",
    ],
    faq: [
      {
        question: "Which free assistant is the smartest",
        answer: "It changes often, and each one is stronger at different tasks. Try the same real question in two or three of them and keep the one whose answers you trust most.",
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
      "HeyGen and Synthesia both turn a script into a video of a talking AI presenter, so you can make explainers without a camera or studio.",
      "They overlap a lot. The differences that matter to a beginner are how much the free plan lets you make and which kind of video each one is built around.",
    ],
    picks: [
      { slug: "heygen", text: "Pick this if you make social or marketing videos and want lots of avatar styles and quick experiments." },
      { slug: "synthesia", text: "Pick this if you make training, onboarding or internal videos for a business and want a tidy team workflow." },
    ],
    hitFirst: [
      "Free plans cap video length and how many videos you can make each month, so a short test is easy and a full course is not.",
      "Free exports may carry a watermark or lower resolution, and custom avatars of yourself are usually a paid feature.",
      "Making an avatar of a real person requires their consent. Both tools have rules about this, so read them before you start.",
    ],
    faq: [
      {
        question: "Can I try both for free",
        answer: "Check the free plan rows above. Each tool's current free allowance comes from our catalog, with the date it was checked.",
      },
      {
        question: "Will viewers know the presenter is AI",
        answer: "Often, yes. Avatars have improved a lot, but it is good practice to say a video uses an AI presenter.",
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
      "Bolt.new and Lovable both build a working web app from a plain-English description. You describe what you want, they write the code, and you keep refining by chatting.",
      "Both run in the browser with nothing to install, and both use credits or messages that run out faster as your app grows.",
    ],
    picks: [
      { slug: "bolt-new", text: "Pick this if you want to see and poke at the code as it is written, with a full development environment in the browser." },
      { slug: "lovable", text: "Pick this if you would rather stay in a chat-first view and focus on what the app looks like and does." },
    ],
    hitFirst: [
      "Daily or monthly credit limits are the first wall. Each change you ask for uses some, and fixing bugs uses more than you expect.",
      "Bigger apps cost more per request, because the tool has to read more of your project each time.",
      "Publishing, custom domains and connecting a real database or login can sit behind paid plans.",
    ],
    faq: [
      {
        question: "Do I need to know how to code",
        answer: "Not to get started. You will get further, faster, if you learn to read error messages and describe exactly what is wrong.",
      },
      {
        question: "Can I take my app elsewhere later",
        answer: "Both let you get at the code your app is made of, which means you are not locked in if you outgrow the tool.",
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
      "To be upfront: both of these are for people ready to work in a code editor. If you want an app without touching code, an app builder like Bolt.new or Lovable is a better first step.",
      "Cursor is a full code editor with AI built in. GitHub Copilot is an assistant that plugs into editors you may already use, such as VS Code.",
    ],
    picks: [
      { slug: "cursor", text: "Pick this if you are happy to switch to a new editor in exchange for AI that can change several files at once." },
      { slug: "github-copilot", text: "Pick this if you already use VS Code or another supported editor and want to add AI without changing tools." },
    ],
    hitFirst: [
      "Free plans cap completions and chat or agent requests each month. Agent-style requests that edit many files use up the allowance fastest.",
      "The strongest models are often limited to paid plans or count more heavily against your allowance.",
      "AI-written code can look right and still be wrong. Run it, read it and test it before you rely on it.",
    ],
    faq: [
      {
        question: "Which is easier for a complete beginner",
        answer: "Neither removes the need to learn the basics of an editor and a terminal. If you already use VS Code, adding Copilot is the smaller step. If you are starting fresh, Cursor bundles everything in one download.",
      },
      {
        question: "Are students eligible for anything extra",
        answer: "Sometimes. Check each tool's official education offers, which change often.",
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
