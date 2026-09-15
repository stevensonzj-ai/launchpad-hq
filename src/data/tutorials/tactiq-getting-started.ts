import type { PlatformTutorialData } from "./types";

export const tactiqTutorial: PlatformTutorialData = {
  slug: "tactiq-getting-started",
  platformSlug: "tactiq",
  title: "Getting Started with Tactiq",
  tagline:
    "Writes down what's said in your calls from inside your browser — nothing joins the meeting.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-15",
  changelogUrl: "https://tactiq.io/changelog",
  accessTier: "FREE",

  howItWorks:
    "You install an add-on into your browser and join a call as usual. A panel opens beside the meeting and fills with the words as people speak. You can tag a line while it's happening. When the call ends the transcript is waiting in your account, where you can search it, share it, or ask it questions.",

  whatItIs: [
    "Tactiq is a meeting notetaker for Google Meet, Zoom and Microsoft Teams. It runs as a **browser extension** — a small add-on that lives inside Chrome or Edge — so the transcript builds up in a panel next to the call while you're in it, and lands in your Tactiq account when the call ends, alongside summaries and action items you can generate from it.",
    "**What makes it different from Otter and tl;dv,** both also on this site: those send a **bot** — a robot participant that joins the call and records it, visible in the attendee list. Tactiq doesn't. It transcribes from your own browser, and Tactiq's docs put it plainly: \"nothing joins the meeting as a separate participant.\" If your workplace blocks notetaker bots, or you'd rather not put one in front of a client, that is the whole reason to pick this one.",
    "The flip side of the same design: Tactiq only captures meetings **you** are actually sitting in, in a browser. There's no calendar bot covering the meeting you skipped, and it can't attend on your behalf.",
  ],

  beforeYouStart: [
    "**Free forever, no card.** You install the extension from the Chrome Web Store or Edge Add-ons, sign in, and join a meeting — there's nothing to configure on a Google Meet call. Start there rather than on Zoom, which needs a setting you may not control.",
    "The free plan currently gives you **10 transcripts a month** and **5 AI credits** (Tactiq's unit of spend — each AI action on a meeting costs one). The shape here is unusual and worth knowing before you plan around it: the Pro plan, around $8 per user per month billed annually, lifts transcripts to unlimited but only raises AI credits to **10 a month**. Unlimited AI credits don't arrive until the Team plan, currently around $16.67 per user per month annually. So transcription is cheap to scale and AI is not.",
    "**Zoom and Teams each have a prerequisite; Google Meet has none.** For Zoom you must join in Chrome or Edge, and Zoom's own automated captions have to be switched on in the host's account — if you're not the host, that's their setting, not yours. For Teams, use the browser or the browser-installed Teams app; the desktop Teams app isn't supported. There's also a Mac-only app, still labelled beta, for transcribing Zoom's desktop app.",
    "Pick the language being spoken before the meeting starts. How many languages you can choose depends on the platform you're on — currently 60-plus on Google Meet, around 40 on Teams and around 30 on Zoom.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Install from tactiq.io/download — the vendor's own download page, which links to the Chrome Web Store and Edge Add-ons listings.",
    body: [
      "Install only from that page or from the store listing it links to. Search results for popular extensions attract copycats, and an extension that sits inside your meetings is a bad thing to get wrong.",
      "The extension asks to read the page you're on so it can see the meeting. If you also install the Mac app for Zoom desktop, it asks for two more permissions — microphone and system audio — because that version captures sound directly rather than reading the call from a browser tab.",
      "Sign in with the same account you use for your meetings, so transcripts attach to the right calendar entries.",
    ],
    vendorDocsUrl:
      "https://help.tactiq.io/en/collections/7464124-tactiq-for-google-meet-ms-team-zoom",
  },

  security: [
    {
      kind: "text",
      text: "The thing worth understanding about Tactiq is *where the work happens*. The extension transcribes from inside your browser tab, which is why nothing shows up in the participant list — and why, for AI features, your transcript text is sent on to Microsoft's enterprise version of OpenAI's models. Tactiq states that provider will not use the data to train its models and that content logging is switched off, so transcripts aren't retained there for review. Screenshots are the one thing Tactiq captures visually, and only when you press the button yourself.",
    },
    {
      kind: "list",
      label: "What the other people in the call actually see",
      items: [
        "**Tactiq announces itself in the meeting chat.** It posts a message in your name saying your Tactiq extension is transcribing. On the free plan this is always on and **cannot be turned off** — only Pro and above can disable it. Treat that as a feature: it does the disclosure for you.",
        "**The chat message is not the same thing as consent.** Tactiq's Terms of Use — last updated June 2019, and still the version published today — put the legal duty on you: \"It may be an offense in your jurisdiction to record other individuals without their prior written consent,\" and it is your responsibility to follow the law and to tell participants. The privacy policy sitting behind those terms was refreshed in May 2026, so where the two seem to disagree, the terms are the binding document. Say it out loud at the start; don't rely on a line of chat nobody read.",
        "**Sensitive calls deserve a decision, not a default.** Anything covering someone's health, pay, or an HR or legal matter is worth asking about first, whatever the law where you sit.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Getting a written record of a call in places where an outside notetaker would be blocked, rejected, or simply awkward to explain",
      "Meetings spread across Google Meet, Zoom and Teams landing in one searchable place instead of three",
      "Catching the exact wording of something while it's being said — you can tag or comment on a line in the live panel",
    ],
    okayAt: [
      "Calls that switch between languages. Tactiq runs one transcription language at a time and doesn't follow a conversation that changes language mid-way; you have to switch it by hand.",
      "Calls that aren't in English. Tactiq doesn't say anywhere public whether its summaries and in-meeting answers work as well in every language it transcribes, so it's worth reading the output yourself on a non-English call before you rely on it.",
    ],
    avoid: [
      "Meetings you don't personally attend — if that is what you need, tl;dv or Otter on this site are built the other way round.",
      "Treating your Tactiq account as your archive of record. The Terms state that on cancellation \"all of your content will be immediately deleted from the Service\" and \"can not be recovered.\" Export anything you'd miss.",
    ],
  },

  starterActions: [
    {
      title: "Transcribe one Google Meet you're already in",
      whatItDoes:
        "Install the extension, join any Google Meet, and watch the panel fill in on the right. Nothing else to switch on.",
      whyHere:
        "Google Meet is the only one of the three where Tactiq's own docs say you do **not** need the platform's captions turned on — so your first run can't fail on a setting the host controls, the way a Zoom attempt can.",
      tweak:
        "If the panel stays empty for the first minute, the usual fix is updating the extension rather than anything in the meeting.",
    },
    {
      title: "Set the spoken language before anyone talks",
      whatItDoes:
        "Open the Tactiq panel at the start of the call and set the transcription language to the one people are actually speaking.",
      whyHere:
        "Tactiq will not reprocess a finished transcript in another language — a language change applies only to speech captured after the switch, so a call transcribed under the wrong setting is a call you have to run again.",
    },
    {
      title: "Tag the line you'll need later, while it's on screen",
      whatItDoes:
        "When someone says the thing that matters — a decision, a number, a deadline — add a tag, label or comment to that line in the live panel, or take a screenshot if it's on a shared slide.",
      whyHere:
        "Tactiq builds the transcript in front of you during the call rather than after it, so the moment you can mark something is the moment it's said. A recorded-then-processed notetaker gives you that only once the meeting is over.",
    },
    {
      title: "Ask a question during the meeting instead of after it",
      prompt:
        "Summarise what we have agreed so far, and list anything that is still open with who needs to resolve it.",
      whyHere:
        "This goes in the Ask Tactiq AI tab inside the meeting panel, which Tactiq's help centre says is available on free and paid plans alike — so you can use the twenty seconds before the wrap-up to check nothing got dropped, rather than discovering it a day later.",
      tweak:
        "Swap in the question you actually need: \"What did we decide about the budget?\" works the same way. If the AI comes back unavailable rather than simply used up, check your credit balance before assuming the feature isn't on your plan.",
    },
    {
      title: "Turn the transcript into the follow-up you owe someone",
      prompt:
        "Write a short follow-up email to the people on this call. Open with the decision we reached, then list each action with the person responsible and the date it is due. Keep it under 150 words.",
      whyHere:
        "Pasted into the AI chat on a saved transcript, this uses one of the same monthly AI credits as everything else — so it's worth spending on the meeting that actually generates work for other people, not on every call.",
    },
  ],

  pitfalls: [
    "**Check the panel is showing words in the first minute.** Tactiq's own troubleshooting guide says it is \"not possible to retrieve transcripts from past meetings\" — if the capture didn't happen, there's nothing to go back for. Thirty seconds of glancing at the panel is the whole insurance policy.",
    "**Leave the meeting tab alone once it's running.** Tactiq doesn't document whether closing the tab, refreshing the page or letting your computer sleep interrupts a transcript in progress — and since the capture runs inside your browser, it is safest to assume it does.",
    "**Uploads spend the same allowance.** You can upload a recording, audio file or existing transcript (up to 2GB) to get Tactiq's AI onto a meeting it didn't attend — but each upload counts as one of your monthly transcripts, the same as a live call.",
    "**The transcript is yours, not the meeting's.** Because the capture happens in your browser, a colleague who wants their own copy appears to need their own Tactiq running in the same call — sharing yours looks like the intended route, but it's worth confirming once you're signed in.",
  ],

  whereToNext: [
    { label: "Meetings & Notes", categorySlug: "meetings-notes" },
    { label: "Voice & Speech", categorySlug: "voice-speech" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
  ],
};
