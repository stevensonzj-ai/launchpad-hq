import type { PlatformTutorialData } from "./types";

export const apolloIoTutorial: PlatformTutorialData = {
  slug: "apollo-io-getting-started",
  platformSlug: "apollo-io",
  title: "Getting Started with Apollo.io",
  tagline:
    "A searchable database of business contacts plus the tools to email and call them — powerful for sales outreach, and easy to waste credits in.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://knowledge.apollo.io/hc/en-us/articles/43226752968077-Release-Notes-2026",
  accessTier: "FREE",

  howItWorks:
    "You filter Apollo's database by things like job title, industry and company size to find people who match your ideal customer. Seeing someone's verified email or phone number costs **credits** (Apollo's unit of spend). You save them to lists, then contact them through **sequences** — scheduled series of emails, calls and tasks — sent from your own connected mailbox.",

  whatItIs: [
    "Apollo.io is a sales prospecting platform. Its homepage describes a database of more than 240 million contacts and 30 million companies, which you search with filters to build lists of people likely to buy what you sell. It is aimed at salespeople, founders and recruiters doing **outbound** — reaching out to people who haven't contacted you first.",
    "Finding someone is free; getting their details is not. Apollo's knowledge base says clicking to access a verified email or a phone number for a new contact spends credits and saves them as a contact in your account. Many other actions also draw on credits, including enrichment (filling in missing details on contacts you upload), AI research and writing, and calls made through the built-in dialer.",
    "Around the database sit the outreach tools: sequences, a dialer, a meeting scheduler, and a Chrome extension that shows Apollo data while you browse LinkedIn, Gmail, your CRM or a company's website. Apollo also has an AI assistant and AI email writing; its 2026 release notes describe the assistant as free on paid plans as an introductory offer, with free accounts limited to a few chats.",
  ],

  beforeYouStart: [
    "**Sign up with a work email if you have one.** Apollo's pricing page says free accounts on a verified company email domain have a limit of 10,000 credits a month (an anti-abuse cap), while free accounts without one — such as a personal Gmail address — are limited to 100 credits a month. Apollo recommends using an email with a valid company domain.",
    "**Credits don't roll over.** Apollo's pricing page says unused credits expire at the end of each billing cycle, including add-on credits you bought. Its credits page says an email never costs more than one credit per contact; phone numbers cost more, and Apollo doesn't refund credits for mobile numbers.",
    "**Paid plans and trials.** The pricing page lists Free, Basic, Professional and a custom tier, and offers a 14-day trial of a paid plan; after a trial you can stay on Free with no time limit. Plan prices load dynamically on that page and we couldn't confirm them from an official source on review day, so check apollo.io/pricing for current figures. Free plans can connect Gmail mailboxes only.",
    "**Read the contract terms before paying.** Apollo's terms carry an automatic-renewal notice and say fees are non-cancellable and non-refundable; its pricing FAQ says cancellations take effect at the end of the term and downgrades take effect immediately with no refund.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Sign up at apollo.io and install the Chrome extension only from the link inside Apollo or its official Chrome Web Store listing — the extension sees the pages you visit on LinkedIn, Gmail and your CRM.",
    body: [
      "**Link your mailbox before you send anything.** In Settings → Outbound → Mailbox, link the mailbox you'll send from. Apollo's getting-started checklist says to read its deliverability guidance before your first send.",
      "**Set conservative sending limits.** Apollo's deliverability articles suggest starting around 50 emails a day per mailbox, spacing them out, and setting up your domain's SPF, DKIM and DMARC records (settings that prove your emails are really from you). Apollo also recommends sending outreach from a separate subdomain, so a bad campaign can't damage your main email address.",
      "**Watch your credit usage from day one.** Settings → Credit usage shows what's been spent and on what; admins can cap credits per user. Check it after your first search-and-reveal session.",
    ],
    vendorDocsUrl: "https://knowledge.apollo.io/hc/en-us/articles/4409127280781-Welcome-to-Apollo",
  },

  security: [
    {
      kind: "text",
      text: "Apollo holds information about people who never signed up for it, and the legal duty to contact them properly is yours. Apollo's GDPR overview says you must give the people you email a way to opt out, and that you're responsible for setting Apollo up to meet your own privacy obligations. In the US, the FTC's CAN-SPAM guide says commercial email must include a working opt-out that you honour within 10 business days, a valid physical postal address, a subject line that matches the message, and accurate sender details; Apollo can add an unsubscribe link automatically. Many other countries are stricter, and some require consent before you email at all. This is general information, not legal advice — Apollo itself says to check your obligations with local counsel.",
    },
    {
      kind: "list",
      label: "Compliance tools to know about:",
      items: [
        "Apollo's GDPR settings (admin only, under Settings → Outbound → Prospecting configuration) can block prospecting, emailing and email tracking for people located in the EU. Apollo says they only work when it can determine a person's location, so check where someone is yourself before contacting them.",
        "Do-Not-Call screening checks numbers only against certain national registries — Apollo names the UK and Germany. Its GDPR overview notes calling rules vary by country, and some places require consent before certain calls rather than just letting people opt out.",
        "If you are in Apollo's database yourself, its privacy center lets you request a copy of your data or have it removed.",
      ],
    },
    {
      kind: "text",
      text: "Apollo states it holds SOC 2 and ISO 27001 certifications. Connecting your mailbox and CRM gives Apollo access to them, so connect only the accounts you mean to use for outreach.",
    },
  ],

  triad: {
    bestAt: [
      "Building targeted lists of people at companies that fit your ideal customer, fast.",
      "Running a whole outreach routine — find, email, call, book a meeting — from one place.",
      "Seeing contact and company details while you browse LinkedIn or your CRM, through the Chrome extension.",
    ],
    okayAt: [
      "Data accuracy. Apollo shows verification statuses as confidence levels, not guarantees, and only refunds bounced-email credits under specific conditions.",
      "Use by people who aren't in sales. It can help with recruiting or partnerships, but the product is built around selling.",
    ],
    avoid: [
      "Revealing phone numbers in bulk on a small credit budget.",
      "Blasting a new email address with hundreds of messages on day one.",
      "Treating a contact in the database as permission to email them.",
    ],
  },

  starterActions: [
    {
      title: "Describe your ideal customer",
      whatItDoes:
        "Before searching, write down two or three job titles, an industry, a company size range and a location for the people you want to reach. Then open People search and apply exactly those filters.",
      whyHere:
        "Apollo's own getting-started checklist starts with defining your ideal customer and buyer personas. A tight search means you spend credits only on people who fit.",
    },
    {
      title: "Save the search, not just the people",
      whatItDoes:
        "Save your filtered search so you can rerun it later, and set an alert if you want to hear when new matches appear.",
      whyHere:
        "Credits are spent when you access someone's details, not when you filter, so this builds your pipeline before you spend any.",
    },
    {
      title: "Reveal a small, deliberate batch",
      whatItDoes:
        "Pick ten people from your search, access their emails only, and add them to a new list. Then check Settings → Credit usage to see what it cost.",
      whyHere:
        "Emails cost at most one credit each; phone numbers cost more and aren't refundable. Starting with ten shows you the real cost of your workflow before you scale it.",
    },
    {
      title: "Build a short first sequence",
      whatItDoes:
        "Create a sequence with three steps — a short email, a follow-up a few days later, and a final check-in — and add your ten contacts. Make sure the unsubscribe link is on.",
      whyHere:
        "Sequences are where Apollo saves you time. Keeping the first one small means you can read every reply and adjust your message before sending more.",
    },
    {
      title: "Try the extension on a profile you know",
      whatItDoes:
        "Install the Chrome extension, open the LinkedIn page of a company you already work with, and see what Apollo shows about it.",
      whyHere:
        "Checking data on people and companies you know is the quickest way to judge how accurate Apollo is for your market.",
    },
  ],

  pitfalls: [
    "**Signing up with a personal email.** The 100-credit monthly limit makes the free plan hard to judge fairly.",
    "**Letting credits expire.** They don't carry over between billing cycles, so plan what you'll reveal each month.",
    "**Turning on every AI and enrichment feature.** Waterfall enrichment, AI research and the dialer all draw from the same credit pool.",
    "**Ignoring spam reports.** Apollo's deliverability guidance notes unsubscribes don't hurt your sending reputation, but spam reports do — write to fewer, better-matched people.",
  ],

  whereToNext: [
    { label: "Sales, Marketing & SEO AI", categorySlug: "sales-marketing-seo-ai" },
    { label: "Automate the steps between tools", categorySlug: "workflow-automation" },
    { label: "Record and summarise sales calls", categorySlug: "meetings-notes" },
  ],
};
