import type { PlatformTutorialData } from "./types";

export const restbAiTutorial: PlatformTutorialData = {
  slug: "restb-ai-getting-started",
  platformSlug: "restb-ai",
  title: "Getting Started with Restb.ai",
  tagline:
    "AI that reads property photos and writes down what it sees — built for real-estate companies, with one way in for individuals.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://restb.ai/company/press-releases/",
  accessTier: "FREE",

  howItWorks:
    "Photos go in, facts about the property come back. There is no chat box and nothing to write. Software hands it a picture — a kitchen, a roof, a street view — and it returns labels: which room this is, what features it has, what condition the place looks to be in.",

  whatItIs: [
    "Restb.ai's AI does one thing: computer vision (software that looks at a photo and works out what's in it), trained specifically on property pictures. Point it at a listing's photos and it names the rooms, spots features and damage — the company says more than 500 distinct details — and rates how the place looks. Since May 2026 it has been owned by Clear Capital, an American property-valuation firm, which said it would keep the Restb.ai brand.",
    "Almost nobody buys it as a person. Its customers are the businesses behind property listings — the shared listing databases estate agents post homes to (in the US, an MLS), property portals, appraisal firms, insurers and lenders — and it reaches them as an **API** (a way for programs to talk to each other without a person clicking).",
    "There is one exception, and it is how an individual gets in: Restb Lens, a web tool from the same company, pitched at appraisers, lenders and valuation reviewers rather than the general public.",
  ],

  beforeYouStart: [
    "**The main product is not something you sign up for.** Restb.ai's site has no log-in, no sign-up and no self-serve access — the only buttons are \"Try our demos\" and \"contact us\", and its FAQ says plainly that it does not have an app. The pricing page promises \"accessible pricing\" and prints no numbers; the FAQ gives the shape instead: a fixed monthly fee covering an allowance of requests, an overage fee for each one beyond it, and separate pricing for large batches of property data.",
    "If you are a US estate agent, check before you buy anything — you may already have it. Restb.ai sells to MLSs, which switch it on for their members, and by the company's own April 2025 count that reached more than 800,000 agents and brokers across North America. No vendor page says whether those features are covered by your dues or billed on top, so ask your board rather than assuming.",
    "The one path that does not go through a salesperson is Restb Lens. Its published plans currently start around $99 a month for one user and up to fifteen property searches, rising to roughly $249 and $499 for more seats and more searches, and the site advertises a two-week free trial you request by form — \"We'll send you a promo code right away. No credit card needed.\" That trial is the only free look, and we could not confirm from outside whether it is still being offered.",
    "It is built around American property. Restb Lens runs on nationwide property data, and its condition and quality ratings follow the 1-to-6 scales Fannie Mae and Freddie Mac use in US appraisals. The photo labelling does not look country-specific — Restb.ai has European customers and was founded in Spain — but the scores, the recent-sales comparisons and the compliance rules are US-shaped.",
    "Restb Lens needs no coding; the API side genuinely does — Restb.ai's FAQ describes clients integrating it themselves. If you only want to see what AI makes of a photo you own, a general chatbot will describe one at no cost; property data is what brings you back here.",
  ],

  security: [
    {
      kind: "text",
      text: "What you hand this tool is photographs of the inside of someone's home — usually your client's, not yours. You are not typing your own secrets, you are forwarding other people's property.",
    },
    {
      kind: "list",
      label: "What the paperwork actually says",
      items: [
        "Restb.ai's terms and conditions, last updated 2 February 2026 and the version in force today, say the client \"shall retain all rights and ownership of such User Content\" and that Restb.ai \"will not use User Content in any way other than in connection with providing the services\".",
        "The same terms say that when an agreement ends, Restb.ai \"shall cease any and all use of Your Data and will destroy or return it to you\".",
        "The FAQ puts it more strongly: \"We don't have access to your data and do not control it. All responses are returned in real time.\" Those two documents do not quite agree — a contract promising to destroy or return your data is describing data it holds. The terms are the binding document, so read them as the floor and the FAQ as the friendlier summary.",
        "Those terms were revised three months before Clear Capital bought the company, and have not been reissued since the sale. If data handling matters to your work, put that question to them in writing.",
      ],
    },
    {
      kind: "text",
      text: "Restb.ai sells a photo-compliance tool for flagging listing images that break privacy and fair-housing rules — faces, people, things nobody meant to publish. Take that as evidence that listing photo sets routinely contain exactly that.",
    },
  ],

  triad: {
    bestAt: [
      "Naming what is in a property photo — room type, features, damage, architectural style",
      "Doing it at volume, applying the same judgement to every image in a listing set",
      "Turning photos into ratings an American appraisal form already has a box for",
      "Catching photos that should not go live — watermarks, duplicates, faces",
    ],
    okayAt: [
      "Being bought by one person — the API side is not sold to individuals at all",
      "Property outside the US — the photo labels travel, the scores do not",
      "Explaining itself — you get a rating and a confidence number, and nothing public describes showing you which photo drove the score",
    ],
    avoid: [
      "Treating a condition score as an inspection — it grades what was photographed, so an unphotographed room or a problem behind a wall is not in the number",
      "Judging people, households or neighbourhoods from listing imagery — in US housing the line between describing a property and describing who lives in it is a legal one",
    ],
  },

  starterActions: [
    {
      title: "Find out whether your MLS already switched it on",
      whatItDoes:
        "Next time you enter a listing, watch what happens once the photos upload. Restb.ai's MLS product fills listing fields in from the images rather than appearing as a separate app, so if room types and features arrive already ticked, there is a decent chance it is this.",
      whyHere:
        "Restb.ai does not sell to agents at all — it sells to the MLS platform vendors its own customers page names (Rapattoni, FBS, ICE, Cotality), who put it in front of members. So check your listing-entry screen, not an invoice or an app store.",
      tweak:
        "If nothing fills itself in, ask your MLS's support desk which AI features are on for your board — this varies by MLS, not by agent.",
    },
    {
      title: "Run the free trial against a house you know inside out",
      whatItDoes:
        "Request the two-week Restb Lens trial, then look up a property you have actually stood inside — your own home, a place you sold — and compare the condition and quality ratings it returns with what you already know about the building.",
      whyHere:
        "The ratings map onto the American appraisal scales noted above, so this is one of the few AI outputs a beginner can mark against a published external standard rather than a feeling.",
    },
    {
      title: "Walk the demos before you talk to anyone",
      whatItDoes:
        "Restb.ai's demo page links a separate demonstration for each product — image tagging, property condition, image captions, photo compliance, watermark detection, duplicate detection and visual similarities.",
      whyHere:
        "This is not one product with a price; it is ten separately sold solutions, and a quote depends entirely on which you name.",
      tweak:
        "The demos are listed as open to visitors, but we could not confirm from outside whether any of them ask for an email first, or whether they only show the company's own sample photos.",
    },
    {
      title: "Ask them to run your own photos",
      whatItDoes:
        "Restb.ai's FAQ offers \"complimentary PoCs\" — free trial runs the company sets up for you — \"where you can use our visualization tools to see the impact of our solutions without writing any code\", and its demo page carries a form headed \"Want to test our AI with your images?\"",
      whyHere:
        "It is the only route the company documents for getting your own images scored without a developer — openly a sales step, and described as costing nothing.",
    },
  ],

  pitfalls: [
    "**Two products, one name.** \"Restb.ai\" is the business product; \"Restb Lens\" is the web tool you can actually sign up for. Searching for Restb.ai pricing lands you on a page that talks about affordability and prints no figures — that is the real page, not a broken one.",
    "**Assuming that because it arrived through your MLS, you control it.** You get whichever features your board switched on; nothing public describes a setting you can change or an upgrade you can buy for yourself.",
    "**It meters by property, not by hours.** The Lens search allowance noted above is the real ceiling. The vendor's own user guide never defines what counts as one search, so treat re-runs and report exports as possible charges until someone tells you otherwise.",
    "**Trusting a score attached to stale photos.** A listing whose pictures predate a renovation — or a flood — scores the house that was photographed, and nothing in the output tells you when the shutter clicked.",
  ],

  whereToNext: [
    { label: "Finance & Real Estate AI", categorySlug: "finance-real-estate-ai" },
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
