import type { PlatformTutorialData } from "./types";

export const trayAiTutorial: PlatformTutorialData = {
  slug: "tray-ai-getting-started",
  platformSlug: "tray-ai",
  title: "Getting Started with Tray.ai",
  tagline:
    "Enterprise-grade automation you get by asking a salesperson, not by signing up.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-17",
  changelogUrl: "https://tray.ai/documentation/releases",
  accessTier: "PREMIUM",

  howItWorks:
    'Tray\'s own walkthrough describes a browser canvas. You pick a **trigger** (the "when" — the event that starts an automation), then add steps underneath it, each one an app you have been given permission to use. You run the whole chain by hand and read what each step received, before you let it run on its own.',

  whatItIs: [
    "Tray.ai is the automation platform a company buys, not the one a person signs up for. It connects the systems a business runs on — Salesforce, NetSuite, Workday, Slack, a data warehouse — and keeps data moving between them without anyone copying it across by hand.",
    'There is no free plan and no credit-card signup. Pricing is not published: the three plans on the pricing page (Pro, Team and Enterprise) carry feature lists but no dollar amounts, and the buttons say "Get a demo" and "Talk to sales." A free trial exists, but you request it on a form and wait for someone at Tray to set it up. If you want to build an automation tonight, start with Zapier, Make or n8n instead — they are in the same category on this site and all three let you in on your own.',
    "The company renamed itself from Tray.io to Tray.ai in July 2024 and rebuilt its story around AI. Alongside the classic automation builder it now sells **Merlin** for building AI **agents** (AI that takes actions on its own rather than only answering). The platform is actively maintained — its public release notes show updates through 9 September 2026.",
    'Its public connector directory says "474+ pre-built connectors" while its homepage and pricing page say "700+ apps," so treat the exact number as approximate; either way the list covers the enterprise systems a small tool usually skips.',
  ],

  beforeYouStart: [
    "**You cannot buy this by yourself, and that is the single fact to plan around.** There is no self-serve signup — the login page has no create-account link — so every route in runs through a demo request or a sales conversation.",
    'The free trial runs about 14 days, according to Tray\'s own Academy page. You request it by filling in your name, work email, job title, company and employee count, and describing what you want to accomplish. The page calls it a "managed trial" and says someone from the team will reach out to get it set up — so the clock starts when they provision it, not when you decide you are ready.',
    "Tray's Master Subscription Agreement, last updated 28 January 2025 and in force today, is built around a negotiated Order Form and subscription terms that renew automatically for successive one-year periods unless either side gives 30 days' notice. This is an annual commitment with a contract behind it, not a monthly charge you cancel in a settings screen.",
    "If you are reading this to learn automation rather than to buy it for an employer, the concepts transfer completely. Triggers, steps, testing a run before switching it on — build those on a platform you can open right now, and come back to Tray when a company hands you a login. Our Workflow & Automation category has the self-serve options.",
    "Tray's documentation and connector directory are public and need no account, so you can read exactly what a given integration does before you ever speak to anyone.",
  ],

  security: [
    {
      kind: "text",
      text: 'On Tray you are usually not the account owner, and that changes the whole shape of the risk. An IT or platform team stands up your workspace, decides which connectors and stored connections you are allowed to touch — Tray\'s governance controls are per-workspace, per-connector, per-connection and per-tool — and reads the log afterwards. Every workflow run and agent action is recorded with who triggered it, what ran and what came back, and those logs can be streamed to the company\'s own monitoring system. The question to ask on day one is not "what should I connect?" but "what am I permitted to connect, and who reviews it?"',
    },
    {
      kind: "list",
      label: "Three things worth knowing before you build anything real:",
      items: [
        "**Ask which environment you are in.** Tray separates development, staging and production behind approval gates, so the version of your automation that touches live customer records is one somebody signed off. Find out early whether you have that sign-off or need to request it.",
        "**Masking happens in the workflow, not after it.** Tray can strip or mask personal and health data as it flows through a workflow. Whether it is switched on for your workspace is an admin's decision, so ask rather than assume.",
        "**Know where the AI steps send your data.** Tray's documentation says its built-in Merlin features run on foundation models hosted on AWS Bedrock from providers including Anthropic and Amazon, that the models do not retain customer data after processing, and that OpenAI powers Merlin Chat and Build as an opt-in sub-processor restricted from training on your data. Admins can disable Merlin features entirely. That is Tray's own account of it, worth confirming against your employer's policy.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Connecting the systems a company actually runs on — the CRM, the finance system, the HR system, the data warehouse — where the integration has to survive staff turnover and an audit.",
      "Letting several teams build their own automations inside boundaries one central team sets, rather than everyone wiring up their own accounts.",
      "Reshaping messy data mid-flow, without a separate step to do it in.",
    ],
    okayAt: [
      "A single person automating their own work. It will do it, but you are paying for governance machinery you have no use for.",
      "Getting started quickly. Between the trial request, the sales call and the provisioning, the gap between deciding and building is measured in days.",
    ],
    avoid: [
      "Learning automation from scratch on your own schedule. You do not choose when the trial starts, and its days tick down whether or not you have time that week.",
      "Assuming the compliance features come with the plan. Tray's pricing page lists HIPAA, single sign-on, regional hosting, 30-day log retention and 180-day insights as **add-ons**. Hosting defaults to the US (AWS-West); EU (Ireland) and APAC (Sydney) are available, but as something you buy rather than something you select.",
      "Anything you need to keep running after the trial. There is no free tier underneath to fall back to, so whatever you build stops when the trial does unless a purchase is already in motion.",
    ],
  },

  starterActions: [
    {
      title:
        "When a deal closes in Salesforce → then create the customer everywhere else it needs to exist",
      whatItDoes:
        "One closed-won record sets off the whole chain: the customer account in the finance system, the onboarding project in Jira, the channel in Slack, the row in the warehouse.",
      whyHere:
        "The account IDs and field mappings this needs live in a **project config** — one place every workflow in the project reads from — instead of being retyped into each step. That is what keeps the build standing the day someone renames a Salesforce field.",
      tweak:
        "Ask what happens on failure before you ask what happens on success — Tray's own first-workflow walkthrough adds error handling as a step of its own.",
    },
    {
      title:
        "When a support email arrives → then read it, look up the account, and route it",
      whatItDoes:
        "The workflow pulls the message, fetches that customer's contract terms from the system of record, has an AI step summarise and classify it, and sends it to the right queue.",
      whyHere:
        "This is where Tray's masking earns its keep: personal and health data can be stripped before it ever reaches the AI step — a control set above the person building the flow rather than inside it.",
    },
    {
      title:
        "Every night at a set time → then pull records, reshape them, and load them somewhere else",
      whatItDoes:
        "A schedule fires, the workflow reads from a database, rearranges the fields into the shape the destination expects, and writes them across.",
      whyHere:
        "Reshaping is the step that breaks most automations. Tray added inline expression queries in September 2026, so a transform can run directly in a step's input field rather than needing a separate transformer step of its own — fewer boxes, and fewer places for a mapping to rot.",
      tweak:
        "Run it by hand against one night's real data and read the execution log for every step before you put it on a schedule.",
    },
    {
      title:
        "When an AI agent needs to touch a real system → then it goes through a governed tool, not the system itself",
      whatItDoes:
        "Instead of handing an agent direct credentials, the agent calls a tool Tray exposes on its behalf, with a rule about which tool, which credential and which data it may reach.",
      whyHere:
        "The agent never holds the credential, and each tool it may call is permissioned separately. Note this sits in the Agent Development add-on rather than the base plans, so it is a purchase decision, not a switch you flip.",
    },
  ],

  pitfalls: [
    "**The trial is scoped to the sentence you wrote on the form.** You describe what you want to accomplish, and the workspace is set up around that. Write that field as the thing you genuinely most want to test, not a vague summary.",
    "**The absence of a published price is by design.** Go into the sales conversation with the shape of your usage already written down — which systems, how many people building, how often things run — or the quote will be built from someone else's assumptions.",
    '**You will probably not be the person who owns the connections.** In most Tray installations an admin creates and holds the credentials, so "connect my Gmail" is a request you file rather than a button you press. Find out who that person is on day one.',
    "**Log retention is shorter than you would guess.** The Pro tier's insights window is 7 days and Team's is 30. If your automation fails quietly and nobody looks for three weeks, on the lower tiers the evidence may already be gone.",
    "**Don't judge it against Zapier on first impressions.** Tray asks more of you up front — expression queries, environments, approvals — and pays it back on the kind of integration that has to survive an audit. On a two-app automation that trade is simply a bad deal.",
  ],

  whereToNext: [
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "AI Plugins for Business Software", categorySlug: "ai-plugins-business-software" },
    { label: "Sales, Marketing & SEO", categorySlug: "sales-marketing-seo-ai" },
  ],
};
