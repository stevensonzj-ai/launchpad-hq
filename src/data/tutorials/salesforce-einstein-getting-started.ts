import type { PlatformTutorialData } from "./types";

export const salesforceEinsteinTutorial: PlatformTutorialData = {
  slug: "salesforce-einstein-getting-started",
  platformSlug: "salesforce-einstein",
  title: "Getting Started with Salesforce Einstein",
  tagline:
    "The AI that already reads your customer records — under a name Salesforce keeps changing.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  changelogUrl: "https://www.salesforce.com/agentforce/what-is-new/",
  accessTier: "FREE",

  howItWorks:
    "You are not opening a separate AI app. You work inside Salesforce as usual — a customer record, a list of leads — and the AI appears as a button on the record or a panel beside it. You click, or type a request in plain English, and an answer or a draft comes back in the same window.",

  whatItIs: [
    "Einstein is the name Salesforce gives the AI built into its **CRM** (the system a sales team keeps its customer records in). It is not one product: it covers older scoring and forecasting features that still carry the Einstein name, the Einstein Trust Layer that governs how your data reaches an outside AI model, and — under a newer name — the generative and **agent** side of the platform (AI that takes actions on its own rather than only answering).",
    "Since October 2025 Salesforce brands that newer half **Agentforce 360**, having previously called it Einstein GPT and then Einstein Copilot. The rename is not cosmetic for a beginner: much of what is written about \"Einstein\" describes something Salesforce now sells under a different name, and Salesforce's own training material still sits at addresses like `build-ai-assistants-with-einstein-copilot`.",
    "What every part of it has in common is that the AI reads your own account, contact and deal records rather than the open internet — which is the reason a company would let it near a customer's details at all.",
  ],

  beforeYouStart: [
    "**You can get in without talking to a salesperson.** Salesforce's **Free Suite** is $0 for up to two people, and Salesforce says it is \"completely free with no expiration date, as long as you log in at least once every 60 days\". It includes the click-based AI that summarises a record and drafts an email. That is a real starting point, not a demo.",
    "The Einstein-branded predictive features are the expensive half. Sales Cloud Einstein — lead scoring, opportunity scoring, Einstein Forecasting — is documented as available in Performance and Unlimited Editions and \"for an extra cost in Enterprise Edition\". Those need a paid plan and usually a sales conversation. Nothing in the starter list below depends on them.",
    "There are two other free doors: a 30-day trial of the full paid product, and a free developer account that Salesforce says \"doesn't expire as long as you keep using it\" and that now includes Agentforce. The developer account is a practice space rather than somewhere to run a business, but it is currently the cheapest way to see the agent builder.",
    "If you do end up paying, plans currently run from about $25 per user per month for Starter Suite to around $550 at the top, and the agent side is metered separately in Flex Credits — **credits** are the platform's unit of spend, each thing you do costs some — currently around $500 per 100,000 credits, or about $2 per customer conversation.",
    "In a company Salesforce, the licence is not the hard part; learning Salesforce is. Trailhead, which Salesforce calls \"the free online learning platform from Salesforce\", is where the vendor itself sends beginners, and it hands you a free practice environment to click around in.",
  ],

  security: [
    {
      kind: "text",
      text: "The sensitive material here is not the message you type; it is the customer database the AI is already standing on. Salesforce's published answer to that is the **Einstein Trust Layer**.",
    },
    {
      kind: "list",
      label: "What Salesforce commits to, in its own words",
      items: [
        "**Nothing is retained by the model provider.** Salesforce describes zero data retention as a policy where \"the prompts and generated responses are never stored or used to train the underlying third-party large language models\", and says it has \"agreements in place with LLM providers, such as OpenAI\" containing those commitments.",
        "**Your data is not training material.** Its Agentforce privacy FAQ states that \"Salesforce does not currently use Customer Data to train generative AI models.\" The word *currently* is Salesforce's, not ours, and it is worth keeping.",
        "**Masking has a documented gap.** Personal details are meant to be swapped for placeholder text before anything leaves — but Salesforce's own documents say \"Data masking is currently disabled for Agentforce to improve performance and accuracy of agents.\" If you are building an agent rather than clicking a summary button, that particular protection is not in play.",
      ],
    },
    {
      kind: "text",
      text: "Two practical consequences. It is your employer's Salesforce, so an administrator decides which of these features exist for you at all. And anything an agent does, it does with real permissions against real customer records — which is why Salesforce prices agent activity per action rather than per person.",
    },
  ],

  triad: {
    bestAt: [
      "Writing the email you were going to write anyway, from facts already on the record — the name, the stage the deal is at, when you last spoke.",
      "Catching you up on a customer nobody has touched in months, in one click on the record instead of reading its whole history.",
      "Filing itself: Einstein Activity Capture pulls emails and meetings onto the matching records.",
    ],
    okayAt: [
      "Scoring and forecasting. Genuinely useful once there is years of closed business to learn from, and close to meaningless when there are only a few dozen finished deals.",
      "Answering customers without a person watching. How well it goes depends almost entirely on how good the help documents you point it at are, not on the AI.",
      "Being picked up quickly. The AI part is the easy part; Salesforce itself is the learning curve.",
    ],
    avoid: [
      "Building anything on Einstein Prediction Builder. Salesforce is retiring it and tells customers to migrate 60 days before their subscription end date.",
      "Reading the free two-person Suite as a preview of the agent platform. The agents the marketing is about are metered separately and sit on paid plans.",
      "Documenting a process around a product name. Einstein GPT and Einstein Copilot were both replaced inside roughly two years, and every screenshot and internal note built on them had to be redone.",
    ],
  },

  starterActions: [
    {
      title: "When a deal has gone quiet, summarise it before you call",
      whatItDoes:
        "On an account or opportunity record -> click the summary button and get where the deal actually stands, in a paragraph.",
      whyHere:
        "HubSpot's built-in AI summarises a record too — the difference is which reader can reach it. Salesforce ships this particular button in **Free Suite**, so it is the one piece of the Einstein family you can use without a licence conversation, and it reads the record layout your own administrator has already customised rather than a generic one.",
      tweak:
        "Run it first on a customer you know well. That is how you find out what it quietly leaves out.",
    },
    {
      title: "When a reply is overdue, let it draft and you edit",
      whatItDoes:
        "On a contact, lead or case -> ask for a draft email and it writes one using that record's own details.",
      whyHere:
        "Set beside HubSpot's AI email writer, which starts from a blank composer, this one is invoked from the record — and Salesforce documents that what you get changes with your plan. Free Suite gives a fixed **Draft with AI** click; Starter Suite and above add an assistant you can ask for the draft in your own words.",
      tweak:
        "Keep the first sentence yours. The drafts are competent and slightly interchangeable, and the opening line is where that shows.",
    },
    {
      title: "When the same question keeps arriving, build an agent for it",
      whatItDoes:
        "Point Agentforce Builder at your help articles -> it answers that question for customers without a person in the loop.",
      whyHere:
        "The reason to practise agent-building here rather than in another CRM is the free developer account described above — a permanent, no-cost practice environment, which HubSpot has no equivalent of. Salesforce's documentation describes the builder step by step; we have not driven it ourselves, so treat the click path as their account of it rather than ours.",
      tweak:
        "Feed it three real past questions, including the awkward one. The awkward one is the answer.",
    },
    {
      title: "When email and meetings pile up, stop logging them by hand",
      whatItDoes:
        "Connect a mailbox -> Einstein Activity Capture files emails and meetings onto the matching customer records automatically.",
      whyHere:
        "HubSpot logs email automatically as well. The Salesforce-specific number is the retention split: Salesforce documents that the Standard version keeps roughly three to six months of captured activity on the timeline, while the paid Sales Cloud Einstein version keeps 24 months. Your plan, not your habits, decides how far back a colleague can see.",
      tweak:
        "Point it at one mailbox and check what actually lands on a record before switching a whole team on.",
    },
  ],

  pitfalls: [
    "**\"Einstein\" is not one switch.** Some features come on with your plan, some are a paid add-on, some are metered separately. Before believing an article, work out whether it is describing something you actually have.",
    "**The pricing pages and the help pages use different plan names.** Salesforce's public pricing currently lists Free Suite, Starter, Pro, Core, Advanced and Max, while many of its help articles still say Professional, Enterprise, Performance and Unlimited. They overlap, but do not assume an article's \"Enterprise Edition\" is the price you were quoted.",
    "**Flex Credits are consumption, not a seat.** An agent left pointed at a busy inbox spends money while nobody is watching it.",
    "**You probably cannot switch any of this on yourself.** The first move is finding out who administers your company's Salesforce rather than hunting through the settings menu.",
    "**It summarises the record you have, not the one you meant to keep.** A half-filled opportunity produces a confident-sounding summary of very little, and nothing in the output tells you which fields were empty.",
  ],

  whereToNext: [
    {
      label: "Gentler AI inside business tools you can sign up for yourself",
      categorySlug: "ai-plugins-business-software",
    },
    {
      label: "Connect a simpler CRM to the rest of your apps",
      categorySlug: "workflow-automation",
    },
    {
      label: "Just want something to talk to first?",
      categorySlug: "text-conversational-ai",
    },
  ],
};
