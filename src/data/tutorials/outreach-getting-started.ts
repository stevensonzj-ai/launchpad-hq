import type { PlatformTutorialData } from "./types";

export const outreachTutorial: PlatformTutorialData = {
  slug: "outreach-getting-started",
  platformSlug: "outreach",
  title: "Getting Started with Outreach",
  tagline:
    "The sales platform your employer buys for you — and how to get something out of its AI once you have a seat.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-15",
  changelogUrl: "https://support.outreach.io/support/solutions/159000556245",
  accessTier: "PREMIUM",

  howItWorks:
    "You sign in to a web dashboard that already holds your company's accounts, deals and email history. You type a question in plain English — about a customer, a deal, a call — and it answers from those records, then offers to draft the next email. You edit what it wrote and send it.",

  whatItIs: [
    "Outreach is the system a sales team runs its day out of — customer records, call recordings, scheduled emails and pipeline in one place — with a layer of **agents** (AI that takes actions on its own rather than only answering) sitting on top of all of it.",
    "It is not a tool you go and get: Outreach is sold by its sales team to whole revenue teams, so the realistic way you meet it is that your employer already bought it and gave you a seat. This page is written for that moment.",
    "Its AI headline is **Outreach Omni**, a chat box in the web app, the mobile app and Slack that answers questions about your accounts and deals from your company's own records and drafts follow-ups from them. Alongside it sit Kaia, which records and transcribes your sales calls, and a set of narrower agents for meeting prep, deal risk and email personalisation.",
    "The company rebranded to **outreach.ai** in April 2026. The old outreach.io address now redirects there, though the support site and its release notes deliberately stayed on the old domain, so a link that still says outreach.io is not necessarily out of date.",
  ],

  beforeYouStart: [
    "**You cannot buy this by yourself, and there is nothing here you can sign up for tonight.** Outreach publishes no prices — every plan on the pricing page ends in \"Request pricing\" — and its Terms of Service (last updated 12 April 2024) say service begins on the effective date in a signed Order and then auto-renews in successive twelve-month periods. No free trial is advertised anywhere on the site; it is possible one exists inside a sales conversation, but nothing public says so. Outreach also publishes no seat minimum and no floor contract value. If you want to learn how AI inside a sales system actually behaves before an employer hands you one, HubSpot's free tier gives you a real account with customer records and AI drafting in it, and most of what you learn there transfers directly to this.",
    "Billing is two things at once, which matters even when it is not your money: Outreach charges per seat and per use, through **credits** (the platform's unit of spend — each AI task costs some). Each plan includes a fixed pool — currently 10,000 credits at Amplify Essentials up to 100,000 at Amplify Pro — and a credit is spent on \"a specific AI-powered task performed by the platform—such as generating a personalized message or completing an individual search.\" Outreach does not publish what any given action costs, so how far a pool goes for your team is something you only learn from watching it. Extra credit packs can be bought at any time, so nothing stops mid-task; the cost just moves.",
    "The four plans are not a ladder, and which one you are on decides which AI you actually have. On Outreach's own plan comparison, the Omni chat is on all four, but **sequences and the email Personalization Agent start at Amplify Core**, **call recording and conversation intelligence start at Amplify Essentials**, and **AI forecasting is Amplify Pro only**.",
    "You will also need your admin to have switched the AI on. Omni is an explicit toggle an Outreach Admin sets under Administration > Agents & AI > Features, so \"I don't see it\" is usually a permissions answer rather than a you answer. Outreach's August 2026 release notes also mention an AI Control Hub, but what an ordinary user can see or change there is not documented publicly, so it may well turn out to be another admin-only screen.",
    "Everything on this page about how Omni behaves comes from Outreach's own documentation and marketing rather than from hands-on use, because the product cannot be reached without a paid seat. Treat the interface detail as Outreach's account of its own software.",
  ],

  security: [
    {
      kind: "text",
      text: "The people with the most at stake in this system are not you and not your employer. Outreach holds your customers' contact details and, where your company uses Kaia, recordings and transcripts of calls those customers were on. Outreach's security page lists SOC 2 Type II, ISO 27001, ISO 27701, ISO 42001 (the AI-management standard) and HIPAA, which is a genuinely strong shelf of audits; the full trust documentation behind it is not public, and the page tells you to ask your account executive for Trust Center access.",
    },
    {
      kind: "list",
      label: "Three things worth knowing about the AI specifically",
      items: [
        "**The training commitment is narrower than the certificate list suggests.** Outreach's privacy statement says \"Google Workspace Data is not used to develop, improve, or train AI and/or ML models.\" That is one named source, and the statement makes no promise about anything else in your instance — a gap in the public documentation rather than a confirmed practice in either direction.",
        "**Read the document, not the index.** Outreach's legal-documents page lists the privacy statement as last updated 17 February 2026, while the statement itself says last modified 21 August 2026. Where a vendor's index and its binding document disagree, the document governs.",
        "**International transfers are covered by paperwork, not by keeping data local.** Outreach relies on the EU-US, UK and Swiss Data Privacy Frameworks and on standard contractual clauses rather than promising your data stays in a region.",
      ],
    },
    {
      kind: "text",
      text: "None of this is a reason to be nervous about using the tool your employer handed you. It is a reason to ask, once, who at your company decided what gets recorded.",
    },
  ],

  triad: {
    bestAt: [
      "Answering \"what is going on with this account\" without you building a report first — it reads the emails, calls and fields already logged against it.",
      "Turning a call you just had into a transcript, a summary and the follow-up email, in the same place the deal record lives.",
      "Making a multi-step outreach plan run the same way across a whole team, which is the original job the product was built for and still the thing it is least replaceable at.",
    ],
    okayAt: [
      "Calls that are not in English. Kaia transcribes in around 28 languages, but Outreach's own documentation is explicit that \"real time content cards, action items, recording search by topic are not supported in additional languages\" — so on a French or Japanese call you get words, not the AI layer on top of them.",
      "Forecasting. The AI projection is a model built over your own pipeline data, so it inherits your team's habits rather than correcting them.",
    ],
    avoid: [
      "Firing a sequence at a list you did not earn. Outreach's Acceptable Use Policy — last updated 10 January 2021 and still in force — requires that \"you must have permission to email the recipient when using our service to send bulk campaigns,\" requires an opt-out method and your valid physical mailing address in commercial messages, bans sending from a pseudonym or assumed identity, bans group addresses like `hello@` and `sales@`, and prohibits sending that \"generates an unacceptable number of bounces\" or spam complaints. Those are contract terms you are personally agreeing to, not etiquette — and that policy predates every AI feature on this page and contains no AI-specific clauses, so how it applies to agent-generated sending is not spelled out.",
      "Trusting a confident summary of an account nobody has been logging into. Omni answers from your company's records; when the records are thin it produces a fluent, specific, wrong answer rather than an error, and there is nothing on screen to tell the two apart.",
    ],
  },

  starterActions: [
    {
      title: "Find out what you actually have",
      whatItDoes:
        "Before you look for any feature, ask your Outreach admin two questions: which Amplify plan the company is on, and whether the Omni agent is switched on for your team.",
      whyHere:
        "Outreach publishes its admin documentation openly while keeping the product behind a contract, so you can read exactly which switch controls Omni and still have no way to see it from your own seat. Compared with HubSpot, where the tier you are on is printed in your own account settings, the first move here is a conversation rather than a click.",
      tweak:
        "Ask the same person how many AI credits the plan includes and who watches the balance. It is a shared pool, and you are about to start spending from it.",
    },
    {
      title: "Ask where a deal stands",
      prompt:
        "Summarise where this deal stands, what has happened on it in the last two weeks, and what is most at risk. At the end, list anything you inferred rather than read from an actual record.",
      whyHere:
        "Outreach's own examples of Omni questions run to \"Summarize where this deal stands and what's at risk.\" The last sentence is the part Outreach does not suggest, and the one that makes the answer checkable — it separates what is in your **CRM** (the system your sales team keeps its customer records in) from what the AI filled in around the gaps.",
      tweak:
        "Run it on a deal you already know cold. That is how you calibrate how much of the answer to believe on the deals you don't.",
    },
    {
      title: "Make it show its evidence",
      prompt:
        "Which of my accounts should I prioritise today? For each one, name the specific email, call or field you based that on, and the date.",
      whyHere:
        "Omni answers out of rows your colleagues logged rather than out of a judgement about the account, so it can name the email, call or field behind each recommendation and date it — which turns a ranked list into something you can spot-check in thirty seconds instead of taking on trust.",
      tweak:
        "If it cites nothing older than today, it is reading activity rather than judging accounts. Ask it what it would need to do better.",
    },
    {
      title: "Draft the follow-up, then take it back",
      prompt:
        "Draft a follow-up email to [name] addressing the pricing objection from our last call. Under 120 words, no superlatives, plain sentences. Do not invent any commitment, discount or date we have not already agreed.",
      whyHere:
        "Outreach markets \"Draft a follow-up to address the pricing objection\" as a one-line request. The constraints matter because this draft goes out from your own connected mailbox under your name, and an AI reading a deal record will cheerfully promise a timeline it found in a note.",
      tweak:
        "Paste the reply you actually sent back in and ask what it got wrong. Two or three rounds of that is worth more than a better first prompt.",
    },
    {
      title: "Send one sequence to yourself first",
      whatItDoes:
        "Put your own address into a one-person version of any sequence before it touches a customer, and read every step as it arrives — timing, signature, the unsubscribe line, how the AI-personalised opener actually reads.",
      whyHere:
        "Outreach sends through the mailbox you connect rather than its own servers, so what lands in your inbox is exactly what a prospect gets, rendered by the same provider. It is the only test that catches a personalisation token resolving to a blank.",
      tweak:
        "Do it again from a phone. Most sales email is opened there, and a paragraph that reads fine on a laptop often does not.",
    },
  ],

  pitfalls: [
    "Your sending ceiling is your mailbox's, not Outreach's. Outreach's own documentation puts Google at 2,000 emails per account per day — dropping to 500 if the account is new or flagged — Microsoft 365 business at 10,000 per day and 30 per minute, and Outlook 365 personal at 300 per day. A sequence built for a big list does not warn you before it runs into that wall.",
    "Deliverability damage lands on your company's domain, not on the software. A burst of bounces or spam complaints costs your colleagues their inbox placement too, and it is slow to undo.",
    "Recorded calls have a consent question attached, and it is not answered by the software. Outreach's privacy statement does not set out recording-consent requirements; those come from where you and the other person are sitting, and some places require both sides to agree. Worth asking your admin what your company's policy is rather than assuming the default setting is the legal one.",
  ],

  whereToNext: [
    { label: "Sales, marketing and SEO tools", categorySlug: "sales-marketing-seo-ai" },
    { label: "Meeting and note-taking AI", categorySlug: "meetings-notes" },
    { label: "AI inside business software", categorySlug: "ai-plugins-business-software" },
  ],
};
