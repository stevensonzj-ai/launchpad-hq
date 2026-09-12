import type { PlatformTutorialData } from "./types";

export const zillowAiZestimateTutorial: PlatformTutorialData = {
  slug: "zillow-ai-zestimate-getting-started",
  platformSlug: "zillow-ai-zestimate",
  title: "Getting Started with the Zillow Zestimate",
  tagline: "The free home-value number on Zillow listings — and how far off it usually is.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://www.zillow.com/news/",
  accessTier: "FREE",

  howItWorks:
    "You type an address into Zillow's search box, open that home's page, and scroll to the Zestimate — a dollar figure with an estimated sales range beneath it. There is nothing to install and nothing to set up. You read the number, read the range, and decide how much of it to believe.",

  whatItIs: [
    "The Zestimate is Zillow's guess at what a home is worth. It sits on the pages of well over 100 million US homes, and Zillow says it refreshes most of them multiple times a week, whether or not the home is for sale.",
    "There is no dashboard and no settings: it is a number someone else's computer already worked out about your house, and the whole skill is reading it properly.",
    "Zillow calls the current version the Neural Zestimate. It is a **model** (the AI \"brain\" that does the actual thinking) trained on public county records, prior sales, market trends and feeds from real-estate listing services. That is also the shape of its blind spot — it has never been inside the house.",
    "How wrong is it? For a home actually listed for sale, Zillow currently reports a median error of around 2% — *median* meaning the middle case, so half of all homes land further off. For a home that is not for sale — Zillow's word is \"off-market,\" the category your own house sits in — Zillow said in April 2026 that typical error has come down to about 7%. On a $400,000 house that is roughly $28,000 either way, and half of all homes are further out still.",
  ],

  beforeYouStart: [
    "Free, and you don't need an account to look. Type an address into the search box at zillow.com and the Zestimate is on the home's page. There's no paid version and no upgrade to hit.",
    "It's a US number. Zillow counts its coverage in US homes, so a house in another country won't have a Zestimate — though Zillow doesn't state a geographic limit outright anywhere we could find. Zillow does say plainly that estimates are for residential property only: large multi-family buildings, vacant land and commercial properties aren't eligible.",
    "Some homes simply don't have one. Zillow withholds the figure where it doesn't have, in its words, \"sufficient reliable data to generate an estimate that meets our accuracy standards\" — incomplete or inconsistent property records, or an area with few recent sales. If you find a blank where the number should be, nothing is broken.",
    "If the home is yours, you can claim it — confirm to Zillow that you're the owner, which opens an owner dashboard where you can correct the facts the estimate is built on: bedrooms, bathrooms, finished square footage, lot size, year built. Claiming is free, and expect to need a Zillow sign-in for it even though Zillow's claim page doesn't say so outright.",
  ],

  security: [
    {
      kind: "text",
      text: "The usual chatbot warning doesn't apply, because you aren't typing anything sensitive in. The flow runs the other way: Zillow has already published your home's bed and bath count, square footage, sale history and an estimated value on a page anyone can open, assembled from public county records, without asking you.",
    },
    {
      kind: "list",
      label: "What that means in practice",
      items: [
        "Looking up a home — yours, a neighbour's, anyone's — is invisible to whoever owns it.",
        "Claiming your home is the one place you hand Zillow something. In return you get an owner dashboard, which Zillow describes as tools to \"track your home's value, explore pricing options for a potential sale, and receive the Home Report email.\" That's a selling-oriented product and a recurring email. Go in expecting that, not a privacy control.",
        "If what you want is your home *off* Zillow rather than corrected, that's a different question — and not one Zillow's claim page answers.",
      ],
    },
    {
      kind: "text",
      text: "None of this makes looking at a Zestimate risky. It's worth knowing because the reflex this page invites — \"let me go fix my number\" — is the step that hands a company a verified owner and an address.",
    },
  ],

  triad: {
    bestAt: [
      "Telling you roughly what price neighbourhood a home is in, free, in about ten seconds",
      "Direction over time — whether an estimate is drifting up or down is steadier than the exact figure on any one day",
      "Homes that are ordinary for their street, where Zillow has plenty of recent nearby sales to learn from",
      "Being the number you walk in with, so a conversation with an agent starts somewhere",
    ],
    okayAt: [
      "Your own off-market house — the model works from records that may be years stale",
      "Rentals — there's a separate Rent Zestimate, built from rental listings and public data, which Zillow presents as a starting point rather than an appraisal or a guarantee",
    ],
    avoid: [
      "Anything an **appraisal** (a licensed professional's on-site valuation, the kind a lender orders) is for. Zillow's own Zestimate page says it flatly: \"It is not an appraisal and can't be used in place of an appraisal.\" A lender will order its own regardless.",
      "Treating it as advice you can act on. Zillow's Terms of Use, effective 28 October 2025, state that the services are provided \"AS IS,\" \"WITH ALL FAULTS\" and are \"NOT INTENDED TO provide you with any financial, real estate, or related advice of any kind.\" The number and that disclaimer come from the same company.",
      "Setting an asking price by it, or arguing an offer down with it. Zillow's own valuation guide says the estimate \"should be used as a starting point, but it shouldn't be the only data you use in determining a home's value.\"",
    ],
  },

  starterActions: [
    {
      title: "Look up the house you actually live in",
      whatItDoes:
        "Type your own address into Zillow's search box and open the home's page. Read the Zestimate, then the estimated sales range under it, then the home facts beside it: bedrooms, bathrooms, finished square footage, year built. You are the only person here who knows whether those are right.",
      whyHere:
        "Zillow's stated inputs for an off-market home are public county records, prior sales and market trends — nothing from inside the house. So the only correction available to you is fixing the facts underneath the number, which Zillow says feeds straight back into the estimate.",
      tweak:
        "If a fact is wrong, claiming the home is what lets you change it. Zillow says the update is instant, but that not every edit moves the value — a few square feet won't; an extra room should. That guidance comes from a 2015 Zillow help article and nothing newer contradicts it.",
    },
    {
      title: "Compare a listed home to an unlisted one",
      whatItDoes:
        "Pull up a home that's currently for sale and see how close its Zestimate sits to the asking price. Then pull up a neighbouring home that isn't for sale and look at that estimate instead — the second is the one telling you what the model can do unaided.",
      whyHere:
        "Zillow lists the asking price among the inputs it feeds the model for a home on the market. That's why the two error rates above diverge so sharply, and why the off-market figure is the one that applies to your house.",
      tweak:
        "Zillow breaks its accuracy statistics out by region as well as by listed/unlisted, so your own state's figures are worth more to you than the national one.",
    },
    {
      title: "Read the range before you read the number",
      whatItDoes:
        "Under the headline figure Zillow shows an estimated sales range — a low and a high, the span of prices the home could reasonably sell for. Read the width of that band first: a wide band is the model saying it isn't sure.",
      whyHere:
        "Zillow ties the width of that band to how much data it has for the area, which makes it the one place on the page where the model states its confidence rather than its answer.",
      tweak:
        "Then look the same home up on Redfin's estimate — where two independently built models diverge, that gap measures how little either one knows about this house.",
    },
    {
      title: "Ask Zillow's own AI about the number — if you have it",
      whatItDoes:
        "Zillow has been rolling out what it calls AI mode: a conversational layer where you type a question in plain English instead of setting filters. Zillow's March 2026 announcement lists \"explain and contextualize the Zestimate\" among its jobs, and gives \"How has this home's Zestimate changed over time?\" as a sample question. The catch is availability — as of Zillow's own July 2026 update it was still in beta, open to a limited group of users with access \"expanding over time,\" so there's a real chance you go looking and find no such box. Separately, Zillow's ordinary search bar does accept plain-English descriptions like \"Austin TX homes with backyard\" — though Zillow's own pages disagree about where: a September 2024 announcement says the iOS and Android apps with the website to follow, while a Zillow help page updated in April 2026 says the iOS app only.",
      whyHere:
        "This is the only Zillow surface where the Zestimate becomes something you can put a question to, and its own sample questions are about the estimate's history rather than about finding listings.",
      tweak:
        "If you can't find it, nothing is lost — the other three things on this page work from the plain listing page.",
    },
  ],

  pitfalls: [
    "Believing the precision. The Zestimate is printed to the dollar — a formatting choice, not a claim. The range underneath it is the truer statement of what Zillow knows.",
    "Assuming a renovation is in there. The off-market estimate is built from public records, so a new kitchen registers only if a permit or a reassessment put it on file — or if you told Zillow yourself.",
    "Editing your home facts too late. Zillow's guidance is that home-fact changes need to be made *before* the home is listed for sale on Zillow.",
    "Reading a missing Zestimate as a verdict on the house. Where the number is absent, that's a statement about Zillow's records, not about the property.",
  ],

  whereToNext: [
    { label: "Finance & Real Estate AI", categorySlug: "finance-real-estate-ai" },
    { label: "Research & Academic Tools", categorySlug: "research-academic-tools" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
