import type { PlatformTutorialData } from "./types";

export const canopyTaxTutorial: PlatformTutorialData = {
  slug: "canopy-tax-getting-started",
  platformSlug: "canopy-tax",
  title: "Getting Started with Canopy",
  tagline:
    "Firm software for US accounting and tax practices — and the AI now doing work inside it.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://www.getcanopy.com/blog/topic/product-updates",
  accessTier: "FREE",

  howItWorks:
    "Canopy is a website your firm logs into. You click into a client's file and, in its AI thread, type what you want done — a **prompt** is just the message you type.",

  whatItIs: [
    "Canopy is practice-management software for US accounting and tax firms — one website holding the client records, documents, e-signatures, client portal, messages, task lists, time tracking and invoices that a firm otherwise scatters across five tools. It is a firm's filing cabinet and to-do list, not a chatbot you visit.",
    "The AI is layered on top of that filing cabinet, and that is the whole point of it. Canopy Coworker — the AI you would actually use — is an **agent** (AI that takes actions on its own rather than only answering), and because it sits inside the system that already holds your clients, documents and deadlines, \"chase everyone who hasn't sent their paperwork yet\" is a sentence it has something real to act on.",
  ],

  beforeYouStart: [
    "There is no price-and-buy button. Canopy's site offers a demo, a self-guided tour and a login — the buttons currently read \"Get a Demo\", \"Take a Tour\" and \"Log In\". There is also a multi-step \"Get started\" form that asks about your firm, but Canopy's own pricing FAQ says a trial is arranged by scheduling a demo and talking with a sales representative. The realistic first step is either working at a firm that already pays for it, or requesting a demo from getcanopy.com/pricing.",
    "It costs money on day one and there is no free tier. Canopy currently publishes around $74 per user per month on its entry plan and around $109 on the middle one, both billed annually; a third plan at around $149 is marked \"coming soon\", and the largest firms get a custom quote. Canopy's terms of service, last updated 29 May 2026, say fees are non-refundable and that a plan auto-renews unless you cancel before the renewal date. Canopy names solo practitioners among its customers and publishes no minimum seat count, though we could not confirm one either way.",
    "It is built for US firms. Canopy describes itself as built for U.S. accounting, CPA, tax and bookkeeping firms, its data is processed and stored in the United States, and its own feature table lists multi-currency and regional compliance as still to come. If your practice is outside the US, this is not your tool yet.",
    "Some of the AI runs on an allowance, and two allowances that look alike behave differently. In Canopy's plan-comparison table, the AI meeting notetaker shows \"8 hrs*\" on the entry plan and \"12 hrs*\" on the middle one, footnoted \"Hours per user/per month\" — that one refills. Smart Intake shows \"5 credits*\" on every plan, footnoted \"Trial Credits. More can be added to meet the firms needs\" — those five are a one-off sample you buy more of, not a monthly refill. **Credits** are the platform's unit of spend: each thing you run costs some.",
    "The AI you would sign up for is still being tested, and Canopy's own pages disagree about how plainly to say so. Its plan-comparison table marks both Canopy Coworker and Smart Tax Prep \"Beta\" on every tier, while its AI feature page presents them as part of the platform without using the word. Canopy's Coworker page says Coworker is free to customers during its open beta period — which also means today's price is not necessarily next year's, and Canopy has not published what it costs afterwards. If your firm is weighing Canopy for the AI, get that in writing from the salesperson.",
  ],

  security: [
    {
      kind: "text",
      text: "The sensitive data here isn't yours — it's your clients'. Tax returns, bank statements, Social Security numbers, things people hand an accountant and nobody else. That changes the question from \"what should I avoid typing in\" to \"what did the firm agree to on every client's behalf when it signed?\" Two Canopy documents answer that, and they do not obviously agree.",
    },
    {
      kind: "list",
      label: "What each document says, and the date on it",
      items: [
        "Canopy's AI governance page (last modified 10 July 2026) says: \"We never use your data for training or testing AI models unless you explicitly opt in,\" and separately that \"Your data is never used to train general-purpose models built by vendors like OpenAI or Anthropic.\" Opting in is a choice between testing-only and testing-and-training.",
        "Canopy's terms of service (last updated 29 May 2026) say you \"grant to Canopy permission to use, on an aggregated and de-identified basis, any Client Content or other information that Canopy learns, acquires, or obtains in connection with these Terms, for the purposes of providing and improving the Service and Canopy's products and services\" — that is client material with the names stripped out and pooled with other firms', used to improve the product, and it is not described as needing a separate opt-in.",
        "The terms are the binding document; the governance page is not. Both statements can be true at once if \"training AI models\" and \"improving the Service\" are meant as different things — but Canopy has not published where that line falls. It is a fair thing to make a salesperson answer before a firm signs.",
      ],
    },
    {
      kind: "list",
      label: "Three more things worth knowing before a firm signs",
      items: [
        "OpenAI and Anthropic sit behind Canopy's AI features. Canopy's privacy policy (last updated 29 May 2026) names OpenAI specifically as being used to generate emails and automate tasks.",
        "Canopy says personal details are removed \"using industry-standard techniques, unless it's essential to completing a specific task.\" In tax work it often is essential — a document request naming the wrong person is useless — so read that exception as doing real work.",
        "Canopy says it holds an independent audit of how it handles customer data (it calls this SOC 2).",
      ],
    },
    {
      kind: "text",
      text: "None of this is unusual for firm software, and none of it means Canopy is careless.",
    },
  ],

  triad: {
    bestAt: [
      "Acting on the firm's own records — its AI can see the clients, documents, tasks and deadlines already inside Canopy.",
      "Turning an inbox-shaped job into a tracked one: chasing missing paperwork, onboarding a new client, auditing a folder of files that nobody has looked at since March.",
      "Meetings — it joins, records, transcribes and writes up a summary with action items in language that assumes an accounting context.",
      "Naming and filing documents automatically.",
    ],
    okayAt: [
      "General AI help. Canopy describes its AI as an execution layer inside the firm's own system; it is not somewhere to ask questions, draft unrelated writing or make images, and no seat you buy includes any of that.",
      "Firms that have only half-moved in. The AI works from what is already in Canopy, so a practice still keeping half its documents in email inboxes gets noticeably less out of it than any demo suggests.",
    ],
    avoid: [
      "Relying on it for this season's return preparation. Canopy's own January 2026 announcement describes Smart Prep as a pilot built with a partner called Filed, initially covering basic and advanced individual US tax returns (Form 1040), with broader availability only after the 2026 tax season.",
      "Letting anything the AI drafted reach a client unread. Canopy's terms state plainly that neither Canopy nor anyone associated with it warrants that the Service, or any results generated from it, will be accurate, reliable or error-free.",
    ],
  },

  starterActions: [
    {
      title: "Chase the clients who haven't sent anything in",
      prompt:
        "Find every individual tax client for tax year 2025 who has uploaded nothing in the last 14 days. Draft a short, friendly reminder to each one naming the specific documents still missing from their intake checklist. Show me the full list to approve before anything sends.",
      whyHere:
        "It leans on the checklist Smart Intake built for that client rather than on anything you paste in, and Canopy's Coworker page says it answers an instruction with a step-by-step plan you must approve or refine before it runs — which is what makes an instruction this sweeping safe to type at all.",
      tweak:
        "Change 14 days to 3 and you have a pre-deadline sweep; name a single client instead and you have a much smaller first thing to try.",
    },
    {
      title: "Ask where a job actually stands",
      prompt:
        "Summarise this client's file for me: what we're engaged to do, what's outstanding, who on my team touched it last, and anything that's been sitting waiting on someone for more than a week.",
      whyHere:
        "Canopy's Coworker page describes tracking live multi-step jobs and \"Needs Attention\" items inside the same conversation thread you typed into, so the answer and the follow-up work stay in one place.",
      tweak:
        "Swap \"this client\" for \"my whole client list\" to get a standing-position view, then ask it to turn any line you care about into an assigned task.",
    },
    {
      title: "Let the notetaker sit in your next client call",
      whatItDoes:
        "It joins the meeting, records and transcribes it, and afterwards produces a written summary with action items, filed against that client's record.",
      whyHere:
        "The write-up lands inside the same system holding that client's documents and tasks, so its action items become work you can assign to someone, rather than a transcript sitting in a separate notes app that nobody reopens.",
      tweak:
        "Try it on an internal meeting first. Recording a client without saying so is a conversation to have before the tool makes it easy.",
    },
    {
      title: "Send one client a Smart Intake questionnaire",
      whatItDoes:
        "The client answers a short set of questions, Canopy builds a document checklist from their particular answers.",
      whyHere:
        "The checklist comes from that client's own answers rather than one fixed form the whole practice gets, which is exactly what gives the chasing prompt above something specific to name when it writes the reminder.",
      tweak:
        "Run it on a client whose paperwork is always late — that is where an answer-driven checklist earns its keep.",
    },
    {
      title: "Drop a pile of client documents in and let it name them",
      whatItDoes:
        "It reads uploaded files and renames and sorts them into the right client folders, instead of leaving \"scan_0012.pdf\" wherever the client dropped it.",
      whyHere:
        "This is the one AI row Canopy's plan-comparison table marks simply \"Included\" on every tier, with nothing metered or labelled beta beside it — making it the piece a firm on the entry plan can actually lean on today.",
      tweak:
        "Feed it a messy backlog rather than one tidy file; the value shows up at volume.",
    },
  ],

  pitfalls: [
    "You can't check what changed from outside. Canopy's detailed product updates moved into Canopy Community, which needs a Canopy login to read — so \"what happened to the AI last month\" is not a question you can answer before you are a customer.",
    "Buying the entry plan and finding the thing you wanted one tier up. Canopy's comparison table puts custom reporting, capacity planning, advanced task views and user roles and access controls above the entry plan. That last one is the one that bites, because it decides who at the firm can see which clients.",
    "Mistaking the tour for your firm. The self-guided tour on Canopy's site asks for an email address and then plays a canned demo — it shows the product working on sample data, not your data and not your plan's feature set.",
    "Landing on the wrong Canopy. The company renamed from Canopy Tax and its site moved from canopytax.com to getcanopy.com, and there are unrelated products called Canopy — check the address bar before you send anyone a link.",
    "Reading \"coming soon\" as soon. Canopy's own table marks single sign-on, multi-office and entity management, and auto-renewals as coming soon, with no date attached to any of them.",
  ],

  whereToNext: [
    { label: "Meetings & Notes", categorySlug: "meetings-notes" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
