import type { PlatformTutorialData } from "./types";

export const hubspotAiTutorial: PlatformTutorialData = {
  slug: "hubspot-ai-getting-started",
  platformSlug: "hubspot-ai",
  title: "Getting Started with HubSpot AI (Breeze)",
  tagline:
    "HubSpot's AI sits on top of your customer records rather than beside them — and it's billed per job, not per month.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You work inside HubSpot as usual — a list of people, a company record, a half-written email. A star icon in the top bar opens a chat panel beside whatever you are looking at. You type a request there, it answers using the records already in the account, and you accept the result, edit it, or ask again.",

  whatItIs: [
    "HubSpot is a **CRM** — the system a sales team keeps its customer records in — and its AI is built into that, not bolted on beside it. Ask it something and it is reading your contacts, your deals and your logged calls, not a blank chat window.",
    "The name has moved twice. The AI was ChatSpot, then Breeze; HubSpot's own AI product page is now headed **Agent Hub**, while its help centre still calls the underlying AI Breeze. \"HubSpot AI\" survives mostly in help-centre URLs and in the account setting that governs model training.",
    "What you actually meet day to day is **Breeze Assistant**: a panel that drafts emails, blog posts and images, summarises a record before a call, researches a company, and builds workflows — with citations back to the record or app an answer came from.",
    "Sitting behind it are **agents** — AI that takes actions on its own rather than only answering. HubSpot ships named ones (prospecting, customer, data, content) and a builder for making your own. Agents are the part that costs money per job.",
  ],

  beforeYouStart: [
    "HubSpot's free plan is a real product rather than a trial: up to two users, 1,000 contacts, no card, no expiry date. Open that account first even if the AI is what you came for — the assistant is close to useless until there is something in the records for it to read.",
    "The AI layer is priced apart from the plan, in **credits** — the platform's unit of spend, currently $0.010 each. HubSpot's product catalogue lists included monthly credits only from the paid tiers upward: around 500 a month on Starter, 3,000 on Professional, 5,000 on Enterprise. They reset monthly and unused ones expire. Starter is currently promoted at around $7 per user per month for new customers against a list price nearer $20.",
    "HubSpot's own pages disagree about whether Breeze Assistant is on the free plan. Its free-tools page lists the assistant among the free features and the assistant's product page says \"get started free\"; the pricing comparison and the legal product catalogue place it in the paid editions, while the help centre says \"all products and plans\". Sign up free, look for the star icon, and be ready for Starter to be the honest answer.",
    "**Building your own agent is not a free-tier activity.** Agent Hub and its agent builder entered public beta in July 2026 for Professional and Enterprise customers only — Marketing Hub Professional currently starts around $800 a month, and HubSpot lists a one-time $3,000 onboarding fee as a condition of purchase. Read the sections below as: assistant now, agents later or never.",
  ],

  security: [
    {
      kind: "text",
      text: "Most AI tools only see what you paste into them. This one is already sitting on every customer record, email thread and call note in the account, which means its usefulness and its exposure are the same fact — and the exposure is other people's contact details, not yours. The setting that matters most is on by default: HubSpot states it \"may use customer data ... to train and improve HubSpot's own AI models,\" and a Super Admin turns that off under Settings > Account Management > AI, on the **Access** tab.",
    },
    {
      kind: "list",
      label: "Three things to check on that same settings page:",
      items: [
        "**The data sources are three separate switches** — CRM data, customer conversation data, and files. You can also turn generative AI off in the account entirely, so \"all of it\" and \"none of it\" are both one toggle away.",
        "**Outside model providers are held to a stricter rule than HubSpot itself.** HubSpot says it does \"not permit HubSpot AI service providers that we engage to provide the Subscription Service to use your data for model training,\" and describes minimising retention \"including zero-day data retention where possible.\" That bar covers the third parties it sends work to — it is not the same promise as the one about HubSpot's own models above.",
        "**Sensitive data is handled separately.** Accounts using HubSpot's Sensitive Data feature — for things like government ID and limited financial data — are opted out of AI model training automatically and cannot opt back in. That feature is a paid Smart CRM tier, so on a free account the ordinary toggle is your only control.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Prepping for a specific conversation — summarising everything logged against one contact, then drafting the follow-up in the same panel.",
      "Writing that has to sound like the rest of your marketing, because it draws on the brand kit, company profile and buyer profiles you set up once in AI settings.",
      "Answering \"what is actually happening in my pipeline\" without you building a report first.",
    ],
    okayAt: [
      "Research on companies that aren't in your records. It will do it, but on a paid tier you are spending credits on something a general chatbot does for nothing.",
      "Reaching your other software. Breeze Assistant can search apps you have installed from HubSpot's marketplace, but the help centre marks that as a beta and does not publish which apps qualify.",
    ],
    avoid: [
      "Judging HubSpot's AI by what the free plan does. With no included credits below Starter, the parts that act on their own are precisely the parts you would not be trying.",
      "Turning an agent loose on a list you have not read. HubSpot moved the prospecting agent to outcome pricing in April 2026 at \"$1.00 per lead recommended for outreach\" — 100 credits — and a careless enrolment list is a bill rather than a mistake.",
      "Assuming an agent you built is cheap to leave running. HubSpot's answer to that is a **monthly agent run limit**, documented as a toggle you switch on per agent rather than something configured for you.",
    ],
  },

  starterActions: [
    {
      title: "Walk into a call knowing the account",
      whatItDoes:
        "When a meeting with a contact is an hour away → then open their record and ask the assistant to summarise every email, call and note logged against it.",
      whyHere:
        "HubSpot's AI-adoption guide tells you to get teams sending or logging emails in HubSpot and recording calls, and to merge duplicates with the duplicate management tool, **before** expecting anything from the AI. Running this on day one is the fastest way to find out how thin your records really are.",
      tweak:
        "Ask the same question about the company rather than the person — it reads the whole associated history, not just the thread you happen to remember.",
    },
    {
      title: "Turn a scrappy call note into the follow-up",
      whatItDoes:
        "When you have just come off a call and logged a note → then ask the assistant to draft the follow-up email from that note, inside the record it belongs to.",
      whyHere:
        "The draft lands attached to the customer instead of in a separate window you paste out of, and it inherits the brand kit, company profile and buyer profiles from your AI settings.",
      tweak:
        "Save the instruction as a reusable prompt. The assistant also keeps \"memories\" — your name, role and writing style — so you stop restating them every time.",
    },
    {
      title: "Describe an automation instead of building one",
      whatItDoes:
        "When you notice you do the same three-step chore after every form submission → then describe it to the assistant in plain English and let it assemble the workflow.",
      whyHere:
        "The automation ends up inside the same system as the records it touches, so nothing is being shuttled between two products and re-authenticated. Note that this is HubSpot's documentation describing the capability — whether the workflow builder is on your plan is one of the things you will see once you are signed in.",
      tweak:
        "Before switching anything on, be precise about the event that should set it off. A vague starting condition is what makes an automation fire fifty times in a row.",
    },
    {
      title: "Spend on exactly one agent job, deliberately",
      whatItDoes:
        "When you are on a paid plan and want to know what an agent actually produces → then enrol one contact — one — in the prospecting agent and read what comes back.",
      whyHere:
        "HubSpot's April 2026 announcement prices this agent per outcome, while its help centre says credits are consumed when a lead is **enrolled**. Those are not the same moment, and that gap is the entire reason to start with a single contact rather than a list.",
      tweak:
        "On Professional or Enterprise, HubSpot documents a Test feature that runs an agent as a simulation — reading CRM context and showing estimated credit usage without consuming credits or touching records.",
    },
  ],

  pitfalls: [
    "**Credits do not roll over.** Hoarding a quiet month to fund a busy one does not work.",
    "**Running out has two different endings.** By default, usage-based features pause until your next reset or until you buy a capacity pack — 1,000 credits for $10. Switch on Pay-as-You-Go and they keep running past your limit instead. Know which of those two your account is set to before an agent is doing anything at volume.",
    "**The naming will trip up your own research.** Most tutorials and screenshots you find will be describing an interface one or two names old.",
    "**The beta labels are doing real work here.** Agent Hub, the agent builder and connected-app search all carry one — worth knowing before you build a process on top of one, given that the agent pricing itself was rewritten in April 2026.",
  ],

  whereToNext: [
    {
      label: "More AI inside the business software you already use",
      categorySlug: "ai-plugins-business-software",
    },
    { label: "Sales, marketing and SEO tools", categorySlug: "sales-marketing-seo-ai" },
    {
      label: "Automation platforms that connect your apps",
      categorySlug: "workflow-automation",
    },
  ],
};
