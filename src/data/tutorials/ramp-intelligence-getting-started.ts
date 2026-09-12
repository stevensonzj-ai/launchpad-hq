import type { PlatformTutorialData } from "./types";

export const rampIntelligenceTutorial: PlatformTutorialData = {
  slug: "ramp-intelligence-getting-started",
  platformSlug: "ramp-intelligence",
  title: "Getting Started with Ramp Intelligence",
  tagline:
    "AI that works on your company's card spending — receipts, policy questions, and whether you're overpaying for software.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://ramp.com/blog",
  accessTier: "FREE",

  howItWorks:
    "Your company's card spending arrives in Ramp on its own. You text a photo of a receipt, or type a question into a chat box, and an answer comes back in plain English. Most of it happens while you aren't looking; your part is checking what it got wrong.",

  whatItIs: [
    "Ramp is a corporate card and spend-management platform — cards, bills, reimbursements and travel bookings in one place. **Ramp Intelligence** is the name it has given the AI layer running across all of that since May 2023.",
    "Most of it isn't something you open. It reads receipts and invoices, checks transactions for fraud, suggests how each expense should be categorised, and answers \"can I expense this?\" over text message. Ramp increasingly calls these pieces **agents** (AI that takes actions on its own rather than only answering) rather than features.",
    "Ramp Intelligence is a reason to notice Ramp, not a reason to move your company's money.",
  ],

  beforeYouStart: [
    "**This is not something an individual can sign up for.** Ramp's application rules require a corporation, limited liability company or LP registered in the United States, a US physical address (no PO box, virtual office or mail-forwarding address), an employer identification number — the federal tax ID a registered business gets, which Ramp says cannot be waived — and at least $25,000 in cash in a US business bank account you link to the application. Ramp is \"not accepting individuals, sole proprietors, and other types of unregistered businesses.\" If that isn't you, a general assistant like ChatGPT is the substitute — it just won't sit on your company's cards.",
    "Outside the US we could not establish whether there is a path at all. The help article we read is titled for US-based applicants, implying a non-US counterpart, and Ramp publishes an international number for texting receipts — yet the qualification text says the business must be registered in the United States. We found no vendor page describing a Canadian, UK or EU entity route, so treat the US-only line as what Ramp's own document says rather than a settled answer.",
    "You are applying for a corporate charge card, not a subscription you cancel: 30-day statement cycles, the full balance due at the end of each one and debited from the bank account you linked, no carried balance and, Ramp says, no interest and no personal guarantee.",
    "The base plan is genuinely $0 per user, and everything below on this page sits inside it. The accounting half is where the money is — AI coding of fields, approval recommendations, AI-driven expense reviews and building reports by describing them are all marked excluded from the free plan on Ramp's own comparison table and included on **Plus**, currently around $15 per user per month plus a platform fee that scales with team size, with a 30-day trial and around 20% off for annual billing.",
    "Then apply at ramp.com: formation details, a corporate officer's address and the last four digits of their Social Security number, and either a live connection to the business bank account or its three most recent statements as PDFs. That is an approval decision, not a signup, so expect a yes or a no at the end of it.",
  ],

  security: [
    {
      kind: "text",
      text: "Unlike a chatbot, Ramp holds your company's actual money. The login to protect hardest is whichever one carries the admin role — that is the account that can issue cards and move money.",
    },
    {
      kind: "list",
      label: "What Ramp says about your data — and what we could not check",
      items: [
        "Ramp's own engineering post of 13 June 2024 says it does not train models end-to-end on private customer data, that its general **models** (the AI \"brain\" that does the actual thinking) learn from \"aggregated and masked\" customer data by understanding its structure rather than its contents, and that contract data improves Ramp's models \"only if they explicitly opt in.\"",
        "That is the company describing itself, not the contract. Ramp's binding terms and privacy policy live at ramp.com/legal, which does not render without JavaScript, so we could not read the version in force today or confirm it says the same thing. If your business has rules about AI and vendor data, read those pages yourself once signed in.",
        "Ramp's security page says it undergoes annual **SOC 2** Type II audits (an audit of how a company handles customer data), abides by PCI standards for card data, and encrypts data at rest and in transit.",
        "Receipts and memos you text travel over ordinary SMS to a published shortcode. Whatever is visible in that photo has gone by text message.",
        "Uploading a vendor contract for a price check hands Ramp the contract — its help centre says it extracts amounts paid, products purchased and payment terms. Check whether yours carry confidentiality clauses first.",
        "Ramp's documentation says assistant conversations are visible only to the person who started them.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Expense admin by text message — send the receipt photo, Ramp matches the transaction",
      "Answering \"can I expense this?\" from your own written policy, in Slack, by text, or in Microsoft Teams",
      "Spotting software you overpay for — Ramp claims a benchmark base of over 70,000 businesses",
    ],
    okayAt: [
      "Open-ended analysis — Ramp scopes the assistant to its products, your account and acting on your behalf, not \"why did travel spend jump 40% in August?\", and we could not test it without an account",
      "Newness — the 29 April 2026 procurement agents include \"Zero-Touch Sourcing\", marked Early Access, so what you can switch on may be narrower than the marketing",
      "Starting from nothing — the expense-policy agent works from a policy document you upload, and offers to draft one if you have none",
    ],
    avoid: [
      "Reading ramp.com/intelligence as a list of what you get — it names a dozen AI features, says \"Get started for free\" and attaches no plan labels, while Ramp's own pricing comparison marks the accounting-side AI as excluded from free. The two vendor pages disagree; believe the one with columns.",
      "Booking hotels *because of* the price-drop rebooking — Ramp rebooks only \"if prices drop by $50 or more\"",
      "Treating a policy answer as an approval — it answers from whatever policy document was loaded, however stale",
    ],
  },

  starterActions: [
    {
      title: "Ask Ramp what you owe it",
      prompt:
        "I'm new to Ramp. Walk me through what I need to do this week to keep my expenses in good standing: what's outstanding on my account, which transactions are missing a receipt, and what I should do first.",
      whyHere:
        "Ramp's plan table leaves one AI row ticked in the $0 column: \"Instant, 24/7 AI help for any Ramp question or task\". Two hedges. The pricing page never uses the name \"Ask Ramp\", so equating that row with the assistant its help centre documents is our inference; and that help centre puts the assistant at app.ramp.com/chat behind a left-sidebar icon we could not see without an account.",
      tweak:
        "It can act on your behalf as well as answer — see the pitfalls — so phrase your first few messages as questions.",
    },
    {
      title: "Text the policy question everyone is embarrassed to ask",
      prompt:
        "Can I expense a $120 dinner with two clients? What does our policy say, and what do you need from me?",
      whyHere:
        "Text it to HIRAMP (447-267), the shortcode Ramp publishes in its help centre, with 844-331-1023 for international users. Navan and Brex route this through their apps; a published SMS shortcode on the free plan is Ramp's. The reply comes from your own expense policy, so it is as current as that document is.",
      tweak:
        "The same conversation works in Slack (type `/ramp`, press enter) and Microsoft Teams — though Ramp's docs say its full assistant is *not* available inside Slack's AI chat, so Slack gets the expense bot, not the whole thing.",
    },
    {
      title: "Send a receipt with the memo already written",
      prompt: "Client dinner with Acme — 2 attendees, Q4 renewal discussion",
      whyHere:
        "Text that line in the same message as the receipt photo and Ramp attaches it as the memo. Its help centre lists the memo alongside merchant, amount, department, receipt content and your past coding as the inputs it uses to predict the category — so eight words change where the expense lands.",
      tweak:
        "By email the same text needs the prefix `memo:` in the body; by text it does not. And a texted memo attaches to your *latest* transaction — see the pitfalls.",
    },
    {
      title: "Find out if you are overpaying for a piece of software",
      whatItDoes:
        "Go to Insights → Price Intelligence and upload a contract for a vendor you already pay. Ramp compares it against anonymised spending data from other Ramp customers and shows an average price and how many businesses contributed to it. That is where the documentation puts the screen; we could not confirm it without an account.",
      whyHere:
        "This works only because of what a card company can see: Ramp benchmarks against transactions flowing through its own cards, which a tool that does not issue the card, like Navan, has no way to build.",
      tweak:
        "Start with the subscription you are least sure about rather than the biggest one — the benchmark only helps where enough other businesses buy the same product.",
    },
    {
      title: "Connect your work inbox and stop chasing receipts",
      whatItDoes:
        "Connect your Gmail or Outlook work account and Ramp collects emailed receipts on its own and attaches them to matching transactions.",
      whyHere:
        "Ramp's documentation flags the limitation that makes this worth understanding rather than just switching on: the email connection does not support submitting memos or accounting fields, only the receipt itself.",
      tweak:
        "Do this one first if most of what you buy is software and subscriptions, where the receipt arrives by email.",
    },
  ],

  pitfalls: [
    "**A texted memo lands on your latest transaction.** Buy lunch, buy petrol, then text the lunch memo, and it goes on the petrol.",
    "**The assistant can act, not just answer.** Ramp's documentation says it can approve requests and update transactions on your behalf, so a question phrased as an instruction changes your account while you thought you were asking about it.",
    "**Price Intelligence may simply not be there.** It is on by default for Admins, Owners and financial roles; enabling it for custom roles requires an admin on Plus. If you cannot find it in Insights, that is a permission, not a bug.",
    "**Features can exist and still be switched off.** Ramp's July 2025 agents launch told customers to find an \"Early Access tab and toggle it on\", so \"Ramp has this\" and \"your account has this\" are different claims. That launch also put the expense-policy agent behind Plus, while the current pricing table lists policy questions by SMS or Slack as free — we read the table as current, but if you are on the free plan and cannot find it, that history is the likeliest reason.",
    "**Slack is two steps, not one.** Ramp's instructions are to type `/ramp`, press enter, and attach the receipt picture to the *next* message.",
  ],

  whereToNext: [
    { label: "Finance & Real Estate AI", categorySlug: "finance-real-estate-ai" },
    { label: "AI Plugins & Business Software", categorySlug: "ai-plugins-business-software" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
  ],
};
