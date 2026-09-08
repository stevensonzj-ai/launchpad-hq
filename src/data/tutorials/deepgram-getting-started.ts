import type { PlatformTutorialData } from "./types";

export const deepgramTutorial: PlatformTutorialData = {
  slug: "deepgram-getting-started",
  platformSlug: "deepgram",
  title: "Getting Started with Deepgram",
  tagline:
    "Speech recognition priced by the minute of audio, built for developers putting it inside something else — plus one Mac app you can simply install.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://developers.deepgram.com/changelog",
  accessTier: "FREE",

  howItWorks:
    "You open Deepgram's playground in a browser, point it at a piece of audio, and a transcript comes back within a few seconds with the words laid out on screen. Change a setting, run it again, and compare. When you want it inside your own software, that same request comes from a code file instead.",

  whatItIs: [
    "Deepgram does one narrow thing at industrial scale: it listens to audio and writes down the words, usually faster than the audio took to play. It runs the trick backwards too, reading text aloud in a synthetic voice. What it does not do is keep anything — no library of your recordings, no notes app, no Friday summary.",
    "So the real decision is what you are shopping for. If the goal is your own meetings written down and searchable, tools built for that job — Otter and tl;dv on this site — will get you there sooner. Deepgram is sold to the people who build tools like those, which is why it is billed by the minute of audio rather than by the person using it.",
  ],

  beforeYouStart: [
    "You can look before committing anything. Deepgram runs a playground page in the browser, and its own getting-started documentation sends beginners there to try the service without writing code or signing up. What that documentation does not say is whether the playground takes audio of your own or only runs Deepgram's sample — check that first, because the question that matters is whether it is accurate enough on your kind of audio.",
    "Everything past the playground assumes code: using Deepgram properly means putting an **API key** (a password that identifies your app, and that spends your money) into a program. If you do not write code and have no plans to, that is not a shortcoming on your side — it is the shape of this product, and the meeting-notes tools under Where to next are the finished-article version of the same idea.",
    "Signing up is free, Deepgram's documentation says it includes $200 of credit, and the pricing page currently says no credit card is required. Its main **model** (the AI \"brain\" that does the actual thinking), Nova-3, currently lists at $0.0043 a minute for pre-recorded English — putting that $200 in the region of several hundred hours of audio. It is a fixed pot that drains as you use it, and at those rates most people evaluating Deepgram never reach the bottom.",
  ],

  security: [
    {
      kind: "text",
      text: "Your audio travels to Deepgram's servers, which it says sit in the US, and comes back as text. Its compliance position is unusually strong for a tool a beginner might meet: SOC 2 Type 1 and Type 2 certification (an independent audit of how a company handles customer data), stated readiness for European privacy law, and healthcare paperwork on request.",
    },
    {
      kind: "list",
      label: "Two things that are specific to Deepgram rather than to speech tools generally:",
      items: [
        "Deepgram's Terms of Service currently say it may use your content \"to improve our Services... including training and testing our Models,\" under a licence it calls perpetual and royalty-free. No account-level switch turns this off. The documented way out is adding `mip_opt_out=true` to each request — so it lives in the code, must be there from the first request, and cannot be applied backwards to audio already sent.",
        "Treat the API key as a card number rather than a password. It authorises spending, not merely access: whoever copies it can burn through the $200 and then whatever payment method the account carries, and a stolen key looks like ordinary use from Deepgram's side.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Transcribing recordings in bulk — billed per minute of audio, currently fractions of a cent, with no per-person charge",
      "Transcribing live, while somebody is still talking — which is why it sits inside voice assistants and phone systems",
      "Sorting out who said what in a multi-speaker recording — speaker labelling is a documented setting on the same request, not a separate product",
    ],
    okayAt: [
      "Non-English audio — 50-plus languages transcribe, but Deepgram's docs reserve the full set of readability formatters for English, so a correct transcript in another language can still come back looking raw",
      "Text-to-speech, priced per thousand characters — real, but not what Deepgram is known for",
    ],
    avoid: [
      "Judging it on your very first transcript — `smart_format` is documented as defaulting to `false`, so untouched output comes back accurate but with no punctuation and no paragraphs",
      "Budgeting from the headline streaming rates — the pricing page currently marks several of them limited-time promotional, and Flux text-to-speech is free only through 12 September 2026",
    ],
  },

  starterActions: [
    {
      title: "Look at what Deepgram returns before anything formats it",
      whyHere:
        "`smart_format` is documented as defaulting to `false`, so Deepgram's untouched output arrives as a single unpunctuated block. Meeting that once, deliberately, is what stops you from concluding the recognition is poor when what you are looking at is a setting nobody switched on.",
      tweak:
        "If the playground lets you supply your own file, use audio containing numbers, dates or a phone number — the parts the formatter visibly rewrites, and only for English.",
    },
    {
      title: "Do the arithmetic before you write a line of code",
      whyHere:
        "Hours of audio per month × 60 × the per-minute rate. Billing is by the minute, and pre-recorded Nova-3 English currently lists at $0.0043 — which makes the $200 credit several hundred hours rather than a weekend trial. That multiplication tells you whether you are evaluating a purchase or something that stays effectively free for a year.",
      tweak:
        "Run it twice, at the pre-recorded rate and at the streaming rate. Live transcription costs more per minute, and that gap is frequently the whole design decision.",
    },
    {
      title: "On a Mac and not writing code? Install Saga instead",
      whyHere:
        "Saga is Deepgram's own dictation app and the only route to its speech recognition with no program in between — currently free for early access, no card. It doubles as an accuracy test: if it mishears your accent, the paid service will too.",
      tweak:
        "Dictate something dense with names and technical terms. Generic prose flatters every speech tool; your own vocabulary is the real exam.",
    },
  ],

  pitfalls: [
    "Reading the $200 as a plan rather than a balance. How fast it disappears depends entirely on how many minutes of audio you push through.",
    "Copying model names and settings out of an old tutorial. Deepgram ships changes most weeks and has already deprecated one speaker-labelling parameter; the changelog is the source of truth.",
  ],

  whereToNext: [
    { label: "The rest of the developer-services category", categorySlug: "ai-apis-developer-services" },
    { label: "Speech tools that need no code", categorySlug: "voice-speech" },
    { label: "Apps that record and write up meetings", categorySlug: "meetings-notes" },
  ],
};
