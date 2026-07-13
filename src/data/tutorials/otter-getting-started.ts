import type { PlatformTutorialData } from "./types";

export const otterTutorial: PlatformTutorialData = {
  slug: "otter-getting-started",
  platformSlug: "otter-ai",
  title: "Getting Started with Otter AI",
  tagline:
    "An AI notetaker that joins your meetings, transcribes them live, and hands you a searchable summary afterward.",
  archetype: "recipes",
  lastReviewedAt: "2026-07-13",
  changelogUrl: "https://otter.ai/blog",
  accessTier: "FREE",

  howItWorks:
    "Otter works by **connecting once and then running automatically**. You link your calendar and grant access to your meeting tool; from then on, the Otter bot shows up as a participant in your scheduled calls, captures the audio, and turns it into a live transcript with speakers labeled. During the meeting you can ask its chat questions (\"what did we decide?\"); afterward you get a summary and a searchable record. Because it's cloud-based, everything it captures is uploaded to Otter's servers and needs an internet connection.",

  whatItIs: [
    "Otter is a **meeting assistant**. You connect it to your calendar, and its bot joins your Zoom, Microsoft Teams, or Google Meet calls, transcribes everyone in real time, and produces a summary with action items you can search later. It's aimed at people who sit in a lot of meetings — students in lectures, salespeople on calls, anyone who'd rather pay attention than scramble to take notes.",
  ],

  beforeYouStart: [
    "The **free Basic plan** gives you 300 transcription minutes a month, capped at 30 minutes per conversation, and only **three file uploads ever** (lifetime, not monthly). It's enough to test the quality and the meeting integration, but a couple of long meetings will exhaust it. **Pro** (around $17/month, or roughly half that billed annually) lifts the cap to 1,200 minutes.",
    "The single most important thing: **an AI bot joining a call to record it affects everyone on the call, not just you.** Handle consent before you turn it on (more below).",
    "Set up the calendar and meeting-tool connection first — that's the \"recipe\" that makes Otter run on its own.",
  ],

  security: [
    {
      kind: "text",
      text: "Otter's whole model is that a bot **joins your meeting and records everyone in it.** In many places, recording a conversation requires the other participants' knowledge or consent — and it's simply good practice regardless of the law. Tell people the notetaker is on, or let the visible bot do that for you, before the real conversation starts.",
    },
    {
      kind: "list",
      label: "Where your meetings go",
      items: [
        "Every recording and transcript is **uploaded to and stored in Otter's cloud** — nothing is processed locally, and it needs an internet connection.",
        "That means **don't** run it on conversations covered by confidentiality, legal privilege, HR sensitivity, or health information unless you've confirmed it's allowed. (HIPAA-grade handling is an enterprise-only add-on.)",
        "Anyone you share a transcript with can read everything that was said — check before forwarding.",
      ],
    },
    {
      kind: "text",
      text: "As of **early 2026, Google Meet began flagging third-party notetaker bots** (Otter among them) as a potential security concern, and organizations on strict security settings can auto-eject the bot. If your workplace runs a locked-down Meet, test that Otter can actually join before you rely on it.",
    },
  ],

  triad: {
    bestAt: [
      "Capturing lectures, interviews, and recurring meetings hands-free",
      "Turning a long call into a searchable summary with action items",
      "Letting you stay present in a conversation instead of typing notes",
    ],
    okayAt: [
      "Accuracy on crosstalk, heavy accents, or noisy audio (good, not perfect)",
      "Non-English meetings (a limited set of languages is supported)",
      "Bulk transcription of uploaded files (the free tier's import limit is tiny)",
    ],
    avoid: [
      "Confidential, privileged, or HR-sensitive conversations without clearance",
      "Recording people who haven't been told",
      "Relying on the summary verbatim for anything high-stakes without checking the transcript",
    ],
  },

  starterActions: [
    {
      title: "Connect your calendar and meeting tool",
      whatItDoes:
        "Link Otter to your calendar and grant access to Zoom, Teams, or Google Meet so its bot can auto-join scheduled calls.",
      whyHere:
        "This is the setup that makes everything else automatic; without it you're uploading files by hand.",
      tweak: "Only want it on some meetings? You can control which calls the bot joins.",
    },
    {
      title: "Turn on a consent habit",
      whatItDoes:
        "Decide how you'll let participants know they're being recorded — a note in the invite, a verbal heads-up, or relying on the visible bot — and make it your default.",
      whyHere:
        "It's the difference between a useful tool and an awkward (or non-compliant) surprise.",
      tweak: "For external calls, put the disclosure in the meeting invite so it's on record.",
    },
    {
      title: "Run one real meeting, then read the summary",
      whatItDoes:
        "Let Otter capture a low-stakes internal meeting, then open the transcript, try the search, and ask its chat \"what were the action items?\"",
      whyHere:
        "One real run shows you the accuracy and whether the summary is trustworthy for your use.",
      tweak:
        "Compare the summary against your own memory of the call to calibrate how much to trust it.",
    },
  ],

  pitfalls: [
    "**The free tier's caps bite fast.** 300 minutes a month, 30 minutes per conversation, and only three lifetime file uploads — a single all-hands can blow the per-meeting cap.",
    "**Minutes don't roll over and there's no pay-as-you-go.** Hit the cap and Otter simply stops until the cycle resets or you upgrade.",
    "**The bot is visible to everyone.** That's a feature for consent, but plan for the reaction on external calls.",
  ],

  whereToNext: [
    { label: "Meetings & Notes", categorySlug: "meetings-notes" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
  ],
};
