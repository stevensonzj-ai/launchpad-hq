import type { PlatformTutorialData } from "./types";

export const mailchimpAiTutorial: PlatformTutorialData = {
  slug: "mailchimp-ai-getting-started",
  platformSlug: "mailchimp-ai",
  title: "Getting Started with Mailchimp AI",
  tagline:
    "Email marketing you run from a browser — with AI features scattered through it, most of which begin at Mailchimp's paid plans.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  changelogUrl: "https://mailchimp.com/whats-new/",
  accessTier: "FREE",

  howItWorks:
    "You work in a browser dashboard. You collect email addresses into an **audience** (Mailchimp's word for your contact list), build a message by dragging blocks of text and images into place, then either send it now or set it to go out on its own when something happens. Afterwards you see who opened it.",

  whatItIs: [
    "Mailchimp is an email and text-message marketing platform. It has been the default first choice for small businesses and newsletter writers for well over a decade, and it is owned by Intuit, the company behind QuickBooks and TurboTax.",
    "There is no single product called \"Mailchimp AI\". What exists is roughly a dozen separate features scattered through the app under their own names — **Write with AI** for copy, **Creative Assistant** for on-brand layouts, **Send Time Optimization** and **Content Optimizer** for tuning sends, **Analytics AI** for asking questions about your results — several of them badged **Intuit Assist**, the assistant Intuit puts across its products.",
    "\"Does Mailchimp have AI\" is the wrong question to ask: each feature carries its own plan requirement, and several carry a country list and a beta label on top of that.",
  ],

  beforeYouStart: [
    "Signing up is free and needs no card. The free plan currently gives you 250 contacts, 500 sends a month with a ceiling of 250 in any one day, one audience and one seat. That is enough to send a real newsletter to a small list, and Mailchimp's help centre notes that going over the contact limit stops live sending until you upgrade or cut the list.",
    "**The generative AI is not on the free plan, and not on Essentials either.** Mailchimp's plan comparison carries a single row called \"Generative AI Features\" and marks it not included on both Free and Essentials, reaching Standard and Premium as a no-additional-cost add-on. Send Time Optimization is a separate row and is likewise not included on Free or Essentials. So Creative Assistant, Write with AI, Content Optimizer, Analytics AI and the ChatGPT and Claude connectors all effectively begin at Standard — the \"Essentials plan or higher\" line you will find on Mailchimp's Creative Assistant help pages governs branded templates through Brand Kit, not Creative Assistant itself. Paid marketing plans currently begin around $13 a month at the smallest contact tier in US pricing, and the price is driven by how many contacts you hold rather than how many emails you send.",
    "There is a 14-day trial of Standard, advertised without a card on some versions of the offer. Mailchimp's promotional terms restrict it to new customers, or to free-plan accounts created within the last 90 days, in select countries, and it rolls into a paid month at the then-current rate unless you downgrade. That is the cheapest honest way to see whether the AI is worth the tier.",
    "Write with AI is available only to accounts whose primary mailing address is in Australia, Canada, the United Kingdom or the United States, and Mailchimp describes it as a beta released to a small percentage of users. If you are outside those four countries, plan the page's copy recipes around writing your own text.",
  ],

  security: [
    {
      kind: "text",
      text: "The difference from a chatbot: the sensitive material is not your prompts, it is a file of names and email addresses belonging to your customers. Mailchimp's data processing addendum puts you in the controller's seat and Mailchimp in the processor's, which means the duty to have collected those addresses properly — and to answer for them under **GDPR** (European privacy law governing what companies may do with your data) if any of them are European — sits with you, not with Mailchimp.",
    },
    {
      kind: "list",
      label: "Three things follow from that:",
      items: [
        "**Only upload people who asked.** Mailchimp's acceptable use policy says you must be able to point to an opt-in form or other evidence of consent for any marketing email, and it bans purchased, rented, third-party, co-registration and publicly available lists outright. Where it identifies abuse it says it may suspend, throttle or disable the account.",
        "**Treat the login as the list.** One password stands between anyone and an exportable copy of every contact you hold. Turn on two-factor authentication before your first import, not after your first campaign.",
        "**Know where the data goes.** The addendum says Mailchimp may transfer and process customer data in the United States and anywhere else it operates, and Mailchimp's privacy FAQ says it may share information with its parent Intuit and other Intuit companies to develop and improve other Intuit products.",
      ],
    },
    {
      kind: "text",
      text: "The beta terms Mailchimp publishes for its AI-assisted CRM say it may use your inputs and outputs, including customer data, for machine learning to develop and improve the product, with an opt-out in account settings. The Write with AI help page points instead to a separate \"Content Generator Beta\" terms document that is not published alongside it, so whether that same machine-learning wording covers the email copy generator is worth checking in your account settings when you switch the feature on.",
    },
  ],

  triad: {
    bestAt: [
      "Sending one well-designed email to a list of people who asked for it, and seeing afterwards who opened and clicked.",
      "Switching on a standard sequence from a named template rather than drawing the flow yourself.",
      "Sitting between an online shop and its customers: connect Shopify, WooCommerce, Squarespace Commerce, Stripe, BigCommerce, Magento or Square and the store data feeds both the automations and the reporting.",
    ],
    okayAt: [
      "Sounding like you. Write with AI leans on whatever you have put in your Brand Kit, so it reads generic until that is filled in.",
      "Being the place your customer records live. Mailchimp's own legal terms still carry its customer relationship management product as a beta.",
      "Answering questions about results rather than charting them. Analytics AI does that conversationally, but it launched in May 2026 and Mailchimp frames it around accounts with store data connected.",
    ],
    avoid: [
      "Emailing a list you bought, rented, or exported from somewhere else — this is the fastest way to lose the account entirely.",
      "Sending from a `gmail.com` or `yahoo.com` address. Mailchimp says free email addresses cannot be added to your verified domains, and it rewrites your From address onto a Mailchimp subdomain so that it matches what actually sent the message.",
      "Expecting Send Time Optimization to tune your automations. Mailchimp's help page limits it to regular, plain-text, A/B and multivariate emails, needs a send date at least 48 hours out, and falls back to a manual choice when it has too little history to work from.",
    ],
  },

  starterActions: [
    {
      title: "When you cannot settle on a subject line → get it scored as you type",
      whatItDoes:
        "As you type the subject line, Mailchimp rates it on length, word count, punctuation and emoji use, drawing on patterns across the volume it sends.",
      whyHere:
        "The subject line helper sits outside the \"Generative AI Features\" bucket that starts at Standard — it is its own row in Mailchimp's plan comparison — so it is the one recipe here that does not need the AI tier. Which plan it reaches is genuinely contested: Mailchimp's feature page says it is \"free with every Mailchimp account\", while the plan comparison table marks it not included on Free and included from Essentials up. Treat the comparison table as the one to plan around, and expect to find out which is true at the compose screen.",
      tweak:
        "Take the emoji advice with a pinch of salt on a business list — the scoring reflects Mailchimp senders in general, not the people on your list.",
    },
    {
      title: "When someone new joins your list → welcome them without you being there",
      whatItDoes:
        "Open Automations, pick the flow template for welcoming new contacts, choose your audience, edit the email, switch it on. The signup itself is the **trigger** (the \"when\" — the event that starts an automation); Mailchimp calls it the starting point.",
      whyHere:
        "Essentials caps a marketing automation flow at four steps, which happens to be exactly the shape of a welcome sequence — so this is the one automation you can grow into on the cheapest paid tier without paying for Standard's 200-step ceiling.",
      tweak:
        "Rather than building a second flow later, add a delay and a follow-up email inside this one while you still have steps spare.",
    },
    {
      title:
        "When you have written a rough paragraph → ask the editor to shorten it or shift its tone",
      whatItDoes:
        "Inside a Paragraph, Heading or Button block in the email builder, Write with AI takes your prompt or one of its preset suggestions and returns a rewrite you accept or discard.",
      whyHere:
        "Mailchimp also puts the same tool in the message box of the SMS builder, so one recipe covers cutting a paragraph you already like down to text-message length — the rewrite is anchored to copy you wrote rather than starting from a blank prompt.",
      tweak:
        "If it is missing on a plan that should have it, that is the staged beta rollout rather than a setting you got wrong.",
    },
    {
      title: "When a shopper abandons a cart → let the AI draft the whole recovery sequence",
      whatItDoes:
        "With a supported store connected, Mailchimp's AI-powered flow templates generate branded emails for nine standard sequences — abandoned cart, price drop on a cart item, birthday, sign-up anniversary, win-back and more — pulling design from your Brand Kit. You pick the audience, review what it wrote, then activate.",
      whyHere:
        "Three conditions have to be true at once — a Standard plan or higher, a US primary mailing address, and one of Mailchimp's supported store connectors — and Mailchimp's help page names all three, so you can rule this in or out before you commit to a contact tier.",
      tweak:
        "No store, or not in the US? The same sequences exist as ordinary flow templates in the same browser, with the timing pre-set and the writing left to you.",
    },
    {
      title: "When you want to know why last month worked → ask, instead of building a report",
      whatItDoes:
        "Analytics AI answers questions about campaign performance, audience behaviour and revenue in conversation, reading your connected store data alongside your send history.",
      whyHere:
        "Mailchimp launched it to remove the export-and-pivot step, so the answer comes back in revenue terms rather than as an open rate you then have to interpret.",
      tweak:
        "Mailchimp also publishes connectors for ChatGPT and Claude on the same tiers, so you can ask the same kind of question from whichever assistant you already have open.",
    },
  ],

  pitfalls: [
    "**Unsubscribed contacts carry on costing you.** Mailchimp counts subscribed, unsubscribed and non-subscribed contacts toward the plan limit you pay for; only cleaned, archived, pending and deleted ones stop counting. Archive people who have opted out, or you will pay a growing bill for a list you are not allowed to email.",
    "**Authenticate your domain before your first real send.** This means adding a couple of records at whoever manages your web address — Mailchimp's Entri tool can do it for you — and it is not optional at any scale: Gmail and Yahoo require it of anyone sending more than 5,000 messages to their addresses in a 24-hour period, and Mailchimp says authentication only works on a domain you own.",
    "**Check what the AI wrote before it goes out, because an email cannot be recalled.** Mailchimp's beta terms disclaim any warranty as to the accuracy of generated content and tell you to satisfy yourself that an output is accurate, lawful and appropriate before adding it to a campaign. A wrong chat answer is a nuisance; a wrong price in a send to your whole list is a day of apologies.",
    "**The free plan's daily ceiling catches people out.** 500 sends a month sounds like a list of 500 people, but a single send to a 250-contact list uses the whole day's allowance, so testing and sending on the same afternoon can stall.",
  ],

  whereToNext: [
    { label: "Sales, marketing and SEO tools", categorySlug: "sales-marketing-seo-ai" },
    {
      label: "AI built into the business software you already run",
      categorySlug: "ai-plugins-business-software",
    },
    { label: "Connecting your apps to each other", categorySlug: "workflow-automation" },
  ],
};
