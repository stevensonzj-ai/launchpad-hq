import type { PlatformTutorialData } from "./types";

export const assemblyaiTutorial: PlatformTutorialData = {
  slug: "assemblyai-getting-started",
  platformSlug: "assemblyai",
  title: "Getting Started with AssemblyAI",
  tagline:
    "Turn recordings into speaker-labelled text — a transcription service built for programs to call, with a browser playground for trying it on your own audio first.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://www.assemblyai.com/changelog",
  accessTier: "FREE",

  howItWorks:
    "You sign in, drag an audio or video file into the browser playground, and a transcript comes back with each speaker's lines separated. You flick switches to change what comes back, run the file again, and compare. When it looks right, you copy the code the page has written for you into your own project.",

  whatItIs: [
    "AssemblyAI is a speech-to-text service that programs talk to through an **API** (a way for programs to talk to each other without a person clicking): your code sends a recording, and it sends back the words, with timestamps, speaker labels and — if you ask — a summary. There is no consumer app and no meeting bot. It is the transcription engine other products are built on, sold by the hour of audio.",
    "So it is a component, not a destination. Speaker separation, translation, topic tagging and blanking out personal details are switches on one request rather than separate products, and the **model** (the AI \"brain\" that does the actual thinking) it routes to is chosen the same way.",
  ],

  beforeYouStart: [
    "You do not need to write code for the first hour. Signing up gets you a browser playground where you upload a recording, flip features on and off, and read the transcript on screen. Anything past that — a batch of files, an app of your own — means code. If you only want your own meetings transcribed, a meeting-notes tool does that with no code at all.",
    "New accounts get **$50 in credit** with no card asked for — a one-off grant rather than a monthly allowance, which AssemblyAI's FAQ says does not expire. Everything after that is billed by the hour of audio rather than by subscription, currently around $0.21 for the flagship model and roughly double for live transcription as someone speaks. Playground runs bill the same way.",
    "**Free accounts cannot opt out of model training.** The setting that stops AssemblyAI using your files to improve its models is, by its own docs, a paid-plan feature. Evaluate with audio you would not mind a stranger reading.",
  ],

  security: [
    {
      kind: "text",
      text: "AssemblyAI's security page says audio and transcripts are not stored after processing. Its own documentation is more specific and less absolute: with no special agreement in place, uploaded audio starts being deleted after about 24 hours and transcripts after around 30 days. Neither is instant, and the docs are the version to plan around.",
    },
    {
      kind: "list",
      label: "Two things to settle before you upload anything real:",
      items: [
        "Files sent to the API can be used to train AssemblyAI's models unless you have opted out, are on its European servers, or have signed a healthcare agreement. The opt-out lives on the dashboard's Data Controls page, for paid accounts only, and the docs say it cannot be applied retroactively.",
        "Your **API key** (a password that identifies your app, and that spends your money) belongs wherever your project keeps its secrets, never in a file you share. Free accounts get two, so you can retire one without breaking everything.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Long recordings — one file can run up to 10 hours, so a day of interviews needs no chopping up",
      "Sorting out who said what — speaker labels and timestamps arrive with the words",
      "Doing more than transcribing in one pass — summaries, topic tags and redaction are switches on the same request",
    ],
    okayAt: [
      "Live transcription as someone speaks — it works, but costs roughly double, and free accounts can open only 5 new connections a minute",
      "Languages outside the main set — 99 are supported, but the flagship model's full quality covers 18",
    ],
    avoid: [
      "Evaluating on confidential audio while on the free plan — the setting that stops your files training its models is for paying accounts only",
      "Reading \"not stored after processing\" as \"gone immediately\" — the docs put default transcript deletion at around 30 days",
      "Hard-coding a model name and forgetting it — AssemblyAI retired Universal-3 Pro on 2 September 2026, and requests naming it now return errors",
    ],
  },

  starterActions: [
    {
      title: "Run one of your own recordings through the playground",
      whatItDoes: "Uploads a file in the browser and shows the transcript, speaker by speaker.",
      whyHere:
        "Playground runs draw down the same $50 credit as production and appear in the dashboard's cost tab, so what you spend evaluating is a number you can multiply — not a free demo priced differently from the real thing.",
      tweak:
        "Use a difficult recording: crosstalk, an accent, background noise. A clean file only confirms what you assumed.",
    },
    {
      title: "Re-run the same file with speaker labels and language detection on",
      whyHere:
        "Every capability here is a flag on one request rather than a second service to buy, so re-running one file with switches on and off is how you size the job — and the playground then writes the code for the exact combination you chose.",
    },
    {
      title: "Decide between the cheaper model and the accurate one",
      whatItDoes: "Runs the same audio through Universal-2 and Universal-3.5 Pro and compares both.",
      whyHere:
        "About $0.15 an hour against about $0.21 — invisible on one file, decisive at volume, and a quality gap only your own audio can settle. The free credit covers both runs; rebuilding on the other one later will not be free.",
    },
    {
      title: "Turn on redaction of personal details before uploading anything sensitive",
      whatItDoes:
        "Blanks names, phone numbers and card numbers from the transcript, and can bleep them from the audio in the same request.",
      whyHere:
        "On a free account this is the only privacy control you actually have, because the training opt-out is paid-only. Redacting as you transcribe keeps identifying details out of a file you cannot opt out of.",
    },
  ],

  pitfalls: [
    "Treating the free credit as recurring. When the balance hits zero with no card on file, API access pauses until you top up.",
    "Forgetting the playground costs money — every browser run bills against the same credit.",
    "Judging speed from a free account: free runs about 5 jobs in parallel, paid about 200.",
  ],

  whereToNext: [
    { label: "Other developer APIs", categorySlug: "ai-apis-developer-services" },
    { label: "Voice and speech tools", categorySlug: "voice-speech" },
    { label: "Tools that capture and summarise meetings", categorySlug: "meetings-notes" },
  ],
};
