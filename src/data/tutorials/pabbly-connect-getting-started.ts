import type { PlatformTutorialData } from "./types";

export const pabblyConnectTutorial: PlatformTutorialData = {
  slug: "pabbly-connect-getting-started",
  platformSlug: "pabbly-connect",
  title: "Getting Started with Pabbly Connect",
  tagline:
    'Automation you can buy once instead of renting — and what "lifetime" actually covers.',
  archetype: "recipes",
  lastReviewedAt: "2026-09-17",
  accessTier: "FREE",

  howItWorks:
    'You build workflows in your browser. Each one starts with a **trigger** (the "when" — the event that starts an automation), then you add one or more **actions** (the "then" — what happens once the trigger fires), picking apps and fields from menus rather than writing code. You run it manually to check the data, then switch it on.',

  whatItIs: [
    "Pabbly Connect links apps that don't naturally talk to each other — your email, your spreadsheets, your payment tool, your **CRM** (the system a sales team keeps its customer records in) — so something happening in one makes something happen in another. By Pabbly's own count it connects to around 2,000 apps.",
    "What makes it unusual isn't the automation. It's the price tag. Almost everything in this category is rented monthly; Pabbly also sells Connect as a **one-time purchase** — pay once, keep the software, with no recurring subscription.",
    "It is built and run from India by a company called Magnet Brains, and it positions itself openly as the cheap alternative to Zapier — its own pricing page runs Zapier's prices alongside its own.",
  ],

  beforeYouStart: [
    "**Start on the free plan, which is genuinely free and not a trial.** You get around 100 tasks a month, no card required, and unlimited separate workflows — but each one is limited to two steps (a trigger plus a single action). Sign up, connect one app you already use, and build something from the list below before you think about money.",
    'A "task" is Pabbly\'s unit of spend, and it is narrower than you\'d guess: only successful actions that touch an outside app count. The trigger is free, and so are Pabbly\'s own internal steps — filters, routers, formatting — so a workflow that looks like four steps may bill as one. Every plan is priced by that number.',
    'The one-time offer is the real decision. Pabbly currently sells three one-time Connect plans — around $349 for 3,000 tasks a month and ten workflows, around $799 for 10,000 tasks and unlimited multi-step workflows, and around $1,298 for 20,000 tasks. Prices display in your local currency, so you may see a rupee figure instead. The sales page promises all future integrations and updates at no extra cost. But "lifetime" covers the software, not the help: Pabbly\'s terms say lifetime plans include one year of support from purchase, after which you renew support by paying **one third of the original purchase price**. Treat it as a large payment now plus a possible recurring one later.',
    "There is a 30-day money-back guarantee, worded on the sales page as a full refund, no questions asked — which is the real safety net on a four-figure decision.",
  ],

  security: [
    {
      kind: "text",
      text: "A one-time purchase changes the security question. A subscription gets a second look every time the renewal invoice lands; something you bought outright has no invoice, so a workflow you set up today can still be running in five years, still holding a live connection into your email and your files. Buying once means you have to schedule the review yourself.",
    },
    {
      kind: "list",
      label: "Three habits that make that survivable:",
      items: [
        "**Diary a connection review.** Once a year, open the list of apps you've linked and disconnect everything you no longer recognise. Nothing else will prompt you to.",
        "**Protect the Pabbly account harder than the apps it connects to.** It is the one login that can reach every app you have joined to it, so a strong unique password and two-factor authentication matter more here than on most logins.",
        "**Revoke from both ends.** Any connection can also be cut from the connected app's own security settings, which is the faster route if you ever lose access to Pabbly itself.",
      ],
    },
    {
      kind: "text",
      text: "On data: Pabbly's privacy policy, last updated 18 February 2026, says data is stored with Amazon Web Services in the United States and Hetzner in Finland, and that Connect automatically removes workflow history older than 15 days. That short window helps privacy and hurts debugging. The policy states compliance with European privacy law, but Pabbly is an Indian company, so if where your data is handled matters to you contractually, check that before you commit money.",
    },
  ],

  triad: {
    bestAt: [
      "Replacing a monthly automation subscription when your volume is steady and predictable — that swap is the whole pitch, and the one-time plans are priced to win it.",
      'Straightforward "when this happens, do that" chains between common business apps: forms, spreadsheets, email, payments, CRM.',
    ],
    okayAt: [
      "Elaborate branching logic. Routers and filters exist, but the drag-and-wire visual canvas that Make and n8n are built around is not the model here.",
      "Newer or niche apps. The catalogue is large, and smaller than Zapier's.",
    ],
    avoid: [
      "Buying a one-time plan expecting to stack it, resell it or move it. Pabbly's terms state you can't buy multiple one-time plans or transfer one between accounts — it is tied to the account that bought it.",
      "Assuming the largest one-time plan is safe ground. Pabbly's terms say a one-time plan is capped at a maximum of 10,000 tasks, while the sales page advertises a 20,000-task one-time tier. Those two vendor documents disagree, and the terms are the binding one. Ask support in writing which governs before you buy the top plan.",
      "Assuming a dispute would be simple. The terms are governed by Indian law with any action filed in the courts of Bhopal, and the terms page carries no effective date or version.",
    ],
  },

  starterActions: [
    {
      title: "Find out how many small automations you actually need",
      whatItDoes:
        "When a new row is added to a Google Sheet → then send yourself an email.",
      whyHere:
        "Free workflows are unlimited but two steps each, so the useful first experiment is counting how many separate little automations your week really contains — the exact number the cheapest one-time plan caps. Zapier and Make both bill by volume rather than by how many automations you keep, so neither makes you ask that question.",
      tweak:
        "Build a second one for a different sheet rather than making the first one longer — on this plan that costs you nothing.",
    },
    {
      title: "Run something on a schedule, then go and read its history",
      whatItDoes:
        "When a set time arrives each morning → then email yourself a line pulled from a spreadsheet or a form.",
      whyHere:
        "With run history cleared after 15 days, a daily job is the cheapest way to build the habit of reading a run log while the log still exists — by the time a monthly automation misbehaves, the evidence may already have been cleared.",
      tweak:
        "Deliberately break it — point it at an empty sheet — and look at what the failed run records.",
    },
    {
      title: "Put one real lead somewhere it won't get lost",
      whatItDoes:
        "When someone submits your form → then create the record in your spreadsheet or CRM.",
      whyHere:
        "Because only the write at the end bills, this shape runs at one task per lead, which makes it the cleanest way to measure your true monthly volume against the smallest one-time plan's allowance before you commit the money. Neither Zapier nor Make asks you to do that sum, because neither sells you a plan upfront.",
      tweak:
        "Leave it running a full month before you decide — a single busy week is exactly the sample that makes people buy a bigger plan than they need.",
    },
  ],

  pitfalls: [
    '**The countdown doesn\'t mean what it looks like.** The one-time offer is sold behind a "limited time only" timer that has been a fixture of that page. If the price is right for your volume it will still be right tomorrow; don\'t let a clock make a four-figure decision.',
    "**Your allowance appears to reset each month rather than accumulate.** Pabbly's materials describe tasks as an amount you get every month, which would mean a plan sized for your busiest month is money you also spend in every quiet one. Size it from a measured week, and if carry-over matters to you, confirm it with support first.",
    "**A three-step idea can't be tested on the free plan at all.** The free version you evaluate is an approximation of the thing you would be buying — a real limitation when the decision is a single large payment.",
    "**Check your specific apps, not the headline number.** The integration count is a marketing figure; whether the two apps *you* need are both properly supported is a five-minute check in the integrations directory, and it matters more here than on a monthly tool, because the purchase can't be moved if it turns out not to fit.",
  ],

  whereToNext: [
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "AI Plugins & Business Software", categorySlug: "ai-plugins-business-software" },
    { label: "Sales, Marketing & SEO", categorySlug: "sales-marketing-seo-ai" },
  ],
};
