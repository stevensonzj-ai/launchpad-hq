import type { PlatformTutorialData } from "./types";

export const gensparkTutorial: PlatformTutorialData = {
  slug: "genspark-getting-started",
  platformSlug: "genspark",
  title: "Getting Started with Genspark",
  tagline:
    "An all-in-one AI workspace: ask its Super Agent for a finished deck, spreadsheet, document or podcast, and it plans the steps and builds it for you.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://www.genspark.ai/blog",
  accessTier: "FREE",

  howItWorks:
    "You describe what you want in one message. Genspark's **Super Agent** breaks the job into steps, picks the right tools — web research, a slide maker, a spreadsheet builder — and works in its own cloud computer until it hands back a finished file. Each action spends **credits**, Genspark's unit of usage.",

  whatItIs: [
    "Genspark is an AI workspace built around agents — AI that carries out tasks rather than only chatting. Its help centre describes the Super Agent as an autonomous assistant that thinks, plans and acts: it splits a request into steps, chooses tools, and delivers a finished result. It can browse the web, read files you upload and work with accounts you connect.",
    "Alongside it are specialist agents for particular outputs. **AI Slides** builds presentations you can export to PDF, PowerPoint or Google Slides. **AI Sheets** gathers and analyses data in spreadsheets. **AI Docs** writes documents you can export to Word, PDF or Markdown. **AI Pods** turns a topic, document or link into a podcast episode. There is also a plain **AI Chat**, which Genspark says offers more than 40 models and web search with sources.",
    "Genspark doesn't rely on one AI company. Its privacy policy names OpenAI, Anthropic, Google, xAI and ElevenLabs as its main AI providers, and its help centre says the standard slide mode runs on Genspark's own model. It runs in a web browser, on iPhone and Android, and as a free desktop app for Mac (Apple Silicon), Windows and Linux.",
  ],

  beforeYouStart: [
    "**Choose your sign-in carefully.** You can sign in with Google, Apple or email. Genspark's help centre says the sign-in method can't be changed later, the account email can't be changed, and signing in a different way creates a separate, empty account that support can't merge.",
    "**Free is a small daily allowance.** Genspark's membership page lists the Free plan at 100 credits a day, up to a lifetime limit, after which the daily refill stops. It doesn't say how big that lifetime limit is. Free users can present and share slides but need a paid plan to export them.",
    "**Plus is the usual paid step.** The membership page lists Plus at $24.99 a month, or $239.99 a year ($19.99 a month), starting at 10,000 credits a month, with commercial use of what you make. Pro is $249.99 a month. Credits reset each billing period and don't carry over.",
    "**Refund rules are strict.** Genspark's help centre says refunds are possible within 72 hours of a charge for most customers (longer in the EU, UK, Turkey and Korea), only if you've used less than half the subscription, and only once per customer.",
  ],

  security: [
    {
      kind: "text",
      text: "Genspark sends your prompts to several outside AI companies, so treat it like any cloud service: no passwords, ID numbers or confidential client data in prompts or uploads. Its privacy policy says data is stored on Microsoft Azure and deleted within 30 days of closing your account. Neither its privacy policy nor its terms says plainly whether your content is used to train Genspark's own models, and its terms grant it a licence to use your content to operate and improve the service.",
    },
    {
      kind: "list",
      label: "Settings and features to handle with care:",
      items: [
        "**Share links.** In Slides, Sheets, Docs and Pods you can share by email invite or with \"Anyone with the link\", which is public. A slides \"Project share\" also shows your whole creation process, not just the finished deck.",
        "**Connectors.** Connecting an app gives Genspark real access — its help centre says connecting Slack grants read and search access to channels, direct messages and files. Connect only what a task needs.",
        "**The Chrome extension.** It can click, fill in forms and extract data on pages you're using. Genspark advises testing automation on unimportant pages first and confirming before anything is ordered or sent.",
      ],
    },
    {
      kind: "text",
      text: "Genspark's terms say you can't rely on generated content and ask you to credit the source when republishing it. Check facts and figures before a deck or report goes to anyone else.",
    },
  ],

  triad: {
    bestAt: [
      "Going from a one-line request to a finished, designed slide deck, document or spreadsheet.",
      "Combining web research with a deliverable in one go, without stitching tools together yourself.",
      "Trying many AI models in one place through AI Chat.",
    ],
    okayAt: [
      "Cost control. The Super Agent does many steps on its own, and Genspark's credits guide says regenerating, retrying and long chats all add up.",
      "Accuracy. Genspark's own docs recommend human review, and AI Slides includes a fact-check option for that reason.",
    ],
    avoid: [
      "Making a project link public when it contains anything private.",
      "Burning a small free allowance on repeated regenerations.",
    ],
  },

  starterActions: [
    {
      title: "Start simple in AI Chat",
      prompt: "Explain the differences between Web3 and traditional web applications in simple terms.",
      whyHere:
        "This is one of Genspark's own examples. Genspark's help pages suggest working out what you want in AI Chat first, then handing a clear request to Super Agent so it doesn't spend credits on back-and-forth.",
    },
    {
      title: "Research into a deck",
      prompt: "Research electric vehicle market trends and create a 10-slide presentation.",
      whyHere:
        "Another of Genspark's own examples, and a good test of what the Super Agent adds: it researches, writes and designs in one task. Open the sources it cites before you present.",
      tweak: "Name your audience — \"for a high-school economics class\" — to change the depth and tone.",
    },
    {
      title: "Turn reading into listening",
      prompt: "Give me a daily news briefing podcast on today's tech headlines.",
      whyHere:
        "AI Pods is one of Genspark's more distinctive tools, and this is its own example. Genspark says an episode usually takes 5 to 15 minutes to make.",
    },
    {
      title: "Summarise the page you're on",
      prompt: "Summarize the key points of this page.",
      whyHere:
        "Use this in the Chrome extension on a long article. It's a low-risk way to try the extension, which only reads a page when you actively use it.",
    },
  ],

  pitfalls: [
    "**Regenerating costs the full price again.** Genspark's credits guide says each regeneration costs the same as the original; edit instead where you can.",
    "**Ultra mode is much more expensive.** Genspark's help centre puts standard slides at about 10 credits a page and Ultra at about 100.",
    "**Two subscriptions by accident.** Subscriptions bought in the iPhone or Android app are managed and cancelled in the app store, not on the website — and deleting your account doesn't cancel them.",
    "**Credits that don't last.** Plan credits reset every billing period; Genspark says separately purchased top-ups last three months.",
    "**Signing in the wrong way.** Using a different Google account or method later creates a new, empty account rather than opening your existing one — and support can't merge them.",
  ],

  whereToNext: [
    { label: "More workflow & automation tools", categorySlug: "workflow-automation" },
    { label: "Document & PDF tools", categorySlug: "document-pdf-processing" },
    { label: "Research & academic tools", categorySlug: "research-academic-tools" },
  ],
};
