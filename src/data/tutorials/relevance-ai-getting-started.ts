import type { PlatformTutorialData } from "./types";

export const relevanceAiTutorial: PlatformTutorialData = {
  slug: "relevance-ai-getting-started",
  platformSlug: "relevance-ai",
  title: "Getting Started with Relevance AI",
  tagline:
    "Describe a job in plain English and get an AI specialist that does it — no flowchart, no code.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-17",
  changelogUrl: "https://relevanceai.com/changelog",
  accessTier: "PREMIUM",

  howItWorks:
    "You open a builder and describe, in plain English, one job — who this **agent** (AI that takes actions on its own rather than only answering) is and how it should behave. You pick what it is allowed to reach: your email, your files, the web. Then you chat with it, see what it did, and adjust the wording.",

  whatItIs: [
    'Relevance AI sells what it calls an "AI Workforce." Instead of drawing a flowchart of steps, you write down who a worker is and what it is allowed to touch, give it a name, and let it work out the steps itself. Several of these specialists can then be grouped into a **Workforce** that handles a bigger job between them.',
    "That framing cuts both ways. Describing a job is far easier than diagramming one, which is why people who bounced off flowchart tools often get further here. But you give up knowing the exact route in advance.",
    'The company is Australian — the site footer reads "© 2026 OnSearch Pty Ltd T/A Relevance AI" — and it has moved on from where it started, which was a product for searching messy data. A separate marketplace holds over a thousand ready-made agents you can copy into your own account rather than starting from a blank box.',
  ],

  beforeYouStart: [
    '**There is no free plan any more, and this is very recent.** Relevance\'s pricing documentation now reads "The Free plan is retired and closed to new signups" — a change merged into the vendor\'s own documentation on 11 September 2026. The cheapest way in is the Pro plan at roughly US$19 a month paid annually, or about US$29 month to month. You pay by card and sign up yourself; no demo call is required, despite "Book a demo" being the loudest button on the homepage. Note that Relevance\'s own marketplace site still advertises "Start for free." The pricing docs are the binding source; the marketing has not caught up.',
    'Two separate meters run while you work, and Relevance\'s word for one of them is confusing. **Actions** are counted each time one of your agent\'s tools runs — so "action" here means a unit of spend, not the "then" half of an automation the way most tools use it. **Vendor Credits** are the AI model bill itself, passed through with no markup. Pro currently includes about 2,500 Actions and US$20 of Vendor Credits a month; run out of either and you buy top-ups rather than being cut off, currently around US$80 per 1,000 Actions and US$20 per 10,000 Vendor Credits. Unused Actions from a top-up carry forward; the ones included with your plan reset when it renews.',
    "You choose where your data physically lives when you sign up — US (N. Virginia), EU (London) or AU (Sydney) — and the docs say that choice cannot be changed afterwards without contacting support. Thirty seconds of thought at signup saves a support ticket later, and if you have any obligation to keep data in a particular region, decide before you click.",
    "If you already pay for an AI service of your own, you can plug your own key in and skip the Vendor Credits meter entirely. The docs list this as available on every tier. It does not help with Actions, which are charged either way.",
  ],

  security: [
    {
      kind: "text",
      text: "A flowchart tool does what you drew. A Relevance agent is handed a set of tools and decides for itself which to reach for on any given run, so the same agent can take two different routes on two different days. That is the bill the workforce metaphor quietly presents: what you approve is a capability, not a sequence. The strongest steering you have is what you write in the agent's instructions — including the things you forbid.",
    },
    {
      kind: "list",
      label: "What that means in practice",
      items: [
        'Write your prohibitions down. "Do not send email to anyone, only show me the draft" belongs in the agent\'s own instructions, because there is no step you can simply leave out.',
        "Give an agent the narrowest account you can, and prefer ones that read over ones that send or delete.",
        "Run it against a test folder or label a few times and read what it actually did, not just whether it finished.",
      ],
    },
    {
      kind: "text",
      text: "On the company's side, the position is better than average and worth knowing: Relevance says it is **SOC 2 Type II** compliant (an audit of how a company handles customer data), encrypts data in transit and at rest, and states plainly that it does not use your data to train its models unless you have signed a specific partnership agreement. Model requests go to vendors including OpenAI and Anthropic; Relevance says nothing is stored or trained on in that process. That is a clear commitment rather than silence — but it is still a third party processing whatever you route through it.",
    },
  ],

  triad: {
    bestAt: [
      'Jobs you can describe but could never diagram — "read these support emails, work out which are about billing, and summarise each one" is one sentence here and a branching chain anywhere else.',
      "Reusing one specialist across several jobs. An agent you wrote once is a thing with a name that other agents and Workforces can call on.",
    ],
    okayAt: [
      'Simple two-step plumbing. "New form row → append to a sheet" works, but you are paying agent prices for something a basic connector tool does more cheaply and more predictably.',
      "Exact timing. Each plan has a limit on how many tasks run at once, and anything over it is queued until capacity frees up rather than failing outright.",
      "Long single jobs. A tool run currently stops at 15 minutes, and an agent times out 15 minutes after your last message to it, so very long tasks need to be broken up.",
    ],
    avoid: [
      "Anything where you must know in advance exactly what will happen. Non-determinism is the design, not a defect — if a wrong route on one run out of fifty is unacceptable, this is the wrong shape of tool.",
      "Learning what automation is in general. With the free plan gone, your first afternoon of clicking around and getting it wrong now costs money, and a tool with a standing free tier is a cheaper classroom.",
      "Trusting a marketplace agent because it is listed. Some of them depend on third-party services you must supply your own key for, which carry their own separate bills.",
    ],
  },

  starterActions: [
    {
      title: "Copy a working agent before you write one",
      whatItDoes:
        "When you open the marketplace → then clone an agent that is near what you want into your project, and read its instructions before changing a word.",
      whyHere:
        "What you inherit here is prose, not wiring. A Zapier template hands you a configured chain with nothing written down to read, because on Zapier there is nothing to write — the logic is the diagram. Reading someone else's finished instructions is the fastest way to learn how specific yours need to be.",
      tweak:
        "Change one sentence, run it, and see what moved. That loop teaches more than building from empty.",
    },
    {
      title: "An inbox triage agent that is not allowed to reply",
      prompt:
        "You are my inbox triage assistant. Each morning, read the unread email in my inbox and sort it into three lists: needs a reply from me today, can wait until later this week, and needs no reply. For each item in the first list, write one sentence saying what the sender wants. Do not send, reply to, archive or delete anything. Post the three lists back to me as a message.",
      whyHere:
        "The refusal line is the load-bearing part. On Zapier you keep an agent from sending mail by simply not adding a send step; here the agent picks its own tools, so a prohibition written into the instructions is the control you actually have. It is also the cheap shape — Actions are counted per tool run, so a read-and-report agent costs a fraction of one that writes.",
      tweak:
        "Once you trust it, change the last line to have it draft replies without sending them.",
    },
    {
      title: "A scheduled research agent that files what it finds",
      whatItDoes:
        'When a schedule fires each weekday morning — your **trigger**, the "when" that starts an automation → then the agent searches the web for mentions of a name you give it, and writes one row per find into a spreadsheet.',
      whyHere:
        "This is the card that makes Relevance's bill visible before it surprises you. One scheduled run that searches, reads two pages and writes a row is four Actions, not one — so a daily agent is roughly eighty Actions a month against the 2,500 Pro currently includes. Zapier's per-task counter and Lindy's per-task credits meter the job; this one meters every tool the agent chose to pick up.",
      tweak:
        "Start it weekly. You can always shorten the interval once you have seen a month of real consumption.",
    },
    {
      title: "A second specialist, so you can see what a Workforce is for",
      prompt:
        "You are a research summariser. You will be given a web page or a block of text. Write three bullets covering what it says, who it is aimed at, and anything that looks time-sensitive or out of date. Then write one line saying what you could not determine from the text. Do not search for anything else and do not guess.",
      whyHere:
        "Relevance's unit is a named worker you can hand to other jobs, so this one summariser gets reused by the agent above and by whatever you build next. Lindy's assistants and Zapier's Zaps are both built around one flow doing one job end to end; the reason to accept this platform's unpredictability is that the pieces are people-shaped and reusable, not path-shaped and single-use.",
      tweak:
        "Give it a deliberately bad page and see whether it uses that last line honestly. An agent that never admits a gap is one you cannot delegate to.",
    },
  ],

  pitfalls: [
    '**"It worked when I tested it" means less here.** Two runs of the same agent can take different routes, so run anything consequential several times on harmless data before pointing it at the real thing.',
    "**The meter counts tools, not runs.** A loop over twenty items multiplies every Action inside it, and that is where a month's allowance disappears without anyone noticing.",
    "**Almost every guide and review you find is now out of date on price.** Anything written before September 2026 describes a free tier that no longer accepts signups. Check the pricing page yourself before planning around a number you read elsewhere.",
  ],

  whereToNext: [
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "Sales, Marketing & SEO", categorySlug: "sales-marketing-seo-ai" },
  ],
};
