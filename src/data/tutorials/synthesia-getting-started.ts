import type { PlatformTutorialData } from "./types";

export const synthesiaTutorial: PlatformTutorialData = {
  slug: "synthesia-getting-started",
  platformSlug: "synthesia",
  title: "Getting Started with Synthesia",
  tagline:
    "Type a script, pick a presenter, get a finished video — no camera, no crew, no being on screen yourself.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-07",
  changelogUrl: "https://www.synthesia.io/updates",
  accessTier: "FREE",

  howItWorks:
    "You write what you want said, choose an **avatar** (a synthetic presenter — a person-shaped video generated from text rather than filmed), and Synthesia renders it delivering your words, lip movements matched to the audio. No camera involved.",

  whatItIs: [
    "A text-to-video tool built on synthetic presenters. You bring the script; it brings the face, the voice and the visuals.",
    "Aimed squarely at workplace video: onboarding, compliance training, internal explainers, product walkthroughs. Its other real strength is localisation — one script, many languages.",
    "Beginners pick it over filming for unglamorous reasons. You needn't be presentable, you re-render instead of re-shooting when a policy changes, and there's no editing to learn.",
    "Versus HeyGen, also listed here: heavy overlap, both good. Synthesia leans corporate — templates, brand controls, team workspaces, translation built for rolling one video across an organisation. HeyGen leans creator and social.",
  ],

  beforeYouStart: [
    "There's a genuinely free plan, not a time-limited trial. The Basic tier is currently $0, no credit card, and it doesn't expire.",
    "Free is small but real: currently around 10 minutes of video a month, a limited set of stock presenters, and a Synthesia logo on your output.",
    "The mechanism to learn is a **monthly allowance that resets and doesn't roll over**. Length is what spends it; anything unused at period end is gone. Think minutes per month, not minutes total.",
    "Will you need to pay? If you want the watermark gone or more than a few minutes monthly, yes. Paid self-serve currently starts around $18–$30 a month, with the next tier near $90, depending on billing period. Check the pricing page — it moves.",
    "First step: sign up free, open a template rather than a blank project, paste 60 seconds of your own words over the sample script, and render. Watch it back before committing to anything longer.",
  ],

  security: [
    {
      kind: "text",
      text: "Want an avatar of a specific real person, including yourself? Consent here isn't a checkbox, it's a recorded step. Synthesia requires that person to submit their own footage plus a separate consent video recorded live, reading an on-screen passcode aloud, and it checks both show the same person. You cannot upload someone else's video and make an avatar of them. The friction is deliberate.",
    },
    {
      kind: "list",
      label: "What Synthesia refuses, and what you should disclose",
      items: [
        "Impersonating a real person or organisation in a way likely to mislead. Stock avatars are licensed actors — implying one endorses your product is prohibited.",
        "News, political, election and other polarising content using stock avatars, without written permission.",
        "Removing markers that identify content as AI-generated. Stripping the watermark to pass a synthetic video off as filmed is a violation, not a workaround.",
        "Adult content, harassment, hate speech, fraud, and medical or legal advice presented as authoritative. Videos are moderated and do get rejected.",
        "Tell your viewers. No law may force you to, but one line saying the presenter is AI prevents the far worse moment where they work it out themselves.",
      ],
    },
    {
      kind: "text",
      text: "Your scripts and uploads live on Synthesia's servers so it can re-render them, under standard account terms on a free plan rather than a negotiated contract. Treat the script box like a shared drive: keep unreleased financials, customer names and anything under NDA out of it.",
    },
  ],

  triad: {
    bestAt: [
      "Training and compliance video that gets rewritten whenever a policy changes",
      "Turning a document or SOP into a watchable explainer, no camera",
      "Producing one script as video in many languages",
      "Short product walkthroughs and how-tos at volume",
    ],
    okayAt: [
      "Marketing and social video — works, but reads generic unless the script is good",
      "Talking-head segments inside a larger edited video",
      "Short sales clips, if you're honest about what they are",
    ],
    avoid: [
      "Anything needing trust that a specific human is speaking — an apology, a crisis message, a condolence, a hard announcement to staff. A synthetic presenter reads as evasion.",
      "Personal-brand work that depends on you being present: podcasts, vlogs, founder stories",
      "News, elections, contested public issues",
      "Emotional performance and comedy timing. Avatars deliver information well and feeling badly.",
      "Video of anyone who hasn't consented on camera. Hard line, not a preference.",
    ],
  },

  starterActions: [
    {
      title: "Turn one policy into a 60-second explainer",
      whatItDoes: "Gets your first finished video out of a script you paste straight in.",
      prompt:
        "Here is how expense claims work from this month. Submit within thirty days of the purchase. Attach a photo of the receipt — a bank statement is not enough. Anything over two hundred pounds needs manager approval first. Claims are paid on the last working day of the month. If one is rejected you will get an email explaining why, and you can fix it and resubmit.",
      whyHere:
        "Synthesia's editor is built around the script box, not a timeline, so paste-and-generate is the entire workflow. Start from one of its templates and the framing, background and captions are already handled.",
      tweak:
        "Use shorter sentences than you'd write for the page — every full stop becomes a pause.",
    },
    {
      title: "Rebuild the same video in a second language",
      whatItDoes: "Uses one-click translation to localise without rewriting anything.",
      prompt:
        "Welcome to the team. Over the next two weeks you will meet your manager, set up your accounts, and complete three short training modules. None of this is a test. If you get stuck, message your onboarding buddy — that is exactly what they are there for.",
      whyHere:
        "This is Synthesia's clearest edge over filming. Its 1-Click Translation currently spans 160+ languages and translates on-screen text alongside the spoken script, so an existing video becomes a second one in seconds rather than a second shoot.",
      tweak:
        "Strip idioms and puns from the source script. They translate badly and you'll hear it.",
    },
    {
      title: "Write a script that survives being spoken aloud",
      whatItDoes: "Gives you a script shaped for delivery, to hear against your own first draft.",
      prompt:
        "Three things change on Monday. First, the old login page stops working, so use the new one linked below. Second, passwords now expire every ninety days instead of thirty. Third, if you use the mobile app, update it before Monday or it will sign you out. That is all of it.",
      whyHere:
        "There's no fixing a weak script in the edit here — no performance to salvage, no second take, no cutaway. Text quality is the whole ceiling on video quality, which makes Synthesia a good place to learn writing for the ear.",
      tweak: "Read yours aloud first. Whatever you stumble over, the avatar will too.",
    },
  ],

  pitfalls: [
    "**Writing for the page, not the mouth.** Long clauses and nested parentheses read fine and sound terrible. Short sentences, one idea each, read aloud before rendering.",
    "**Expecting a human performance.** Avatars are reliably good at conveying information and reliably poor at warmth and humour. Pick subjects where clarity is the job and personality isn't.",
    "**Burning the allowance on drafts.** It resets without rolling over, and every render spends from it including ones you delete. Finish the script in a text editor first.",
    "**Treating a licensed stock face as a free-for-all.** Those are real actors. Making one appear to endorse your product or work at your company breaks Synthesia's rules.",
    "**Skipping disclosure because nobody asked.** The moment viewers work out for themselves that a presenter was synthetic, every other claim gets re-examined. One sentence prevents it.",
  ],

  whereToNext: [
    { label: "More AI video tools", categorySlug: "video-creation-editing" },
    { label: "AI voice and speech tools", categorySlug: "voice-speech" },
  ],
};
