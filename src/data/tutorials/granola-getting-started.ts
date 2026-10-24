import type { PlatformTutorialData } from "./types";

export const granolaTutorial: PlatformTutorialData = {
  slug: "granola-getting-started",
  platformSlug: "granola",
  title: "Getting Started with Granola",
  tagline:
    "An AI notepad for meetings: it listens through your computer instead of sending a bot to the call, then turns your rough notes into a clean write-up.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://www.granola.ai/updates",
  accessTier: "FREE",

  howItWorks:
    "Granola runs on your computer or phone and transcribes the meeting from your microphone and speakers — no bot joins the call. You jot a few words as you go. When the meeting ends, it combines the transcript, your jottings and the calendar invite into tidy notes, and you can ask it questions about any meeting afterwards.",

  whatItIs: [
    "Granola is a notes app for people who spend their day in meetings. You open a note for a meeting, type whatever short reminders you like while people talk, and Granola listens in the background. Afterwards it writes **enhanced notes** — a structured summary built from the transcript, your own notes and the calendar event. Your own words stay in black, and Granola's help centre says a magnifying glass next to each point shows whether it came from the transcript or from you.",
    "The difference from most AI note-takers is that nothing visible joins the call. Granola captures your computer's audio directly, so it works with Zoom, Google Meet, Microsoft Teams, Slack huddles and in-person conversations. Its help centre says it does not record or save audio or video; audio is held only long enough to transcribe and then deleted.",
    "Once you have a few meetings in it, the **chat** becomes the main event. Ask from the home screen and it searches across all your meetings; ask inside one meeting and it answers about just that one. Granola's own example question is \"What did I promise to do in my meetings this week?\" Prompts you use often can be saved as **recipes** and reused with a `/`.",
    "It runs on Mac (macOS 14 or newer), Windows, iPhone and Android. The phone apps are aimed at in-person meetings and conversations away from your desk.",
  ],

  beforeYouStart: [
    "**Free gets you started; history is the limit.** Granola's free Basic plan lets you see only your last 30 days of notes, and chat and AI connections only look at those 30 days too. Older notes are kept, not deleted — they reappear if you upgrade.",
    "**The paid step is a team plan.** Granola's pricing page lists Business at $14 per user per month, which removes the history limit and adds integrations with tools like Notion and HubSpot, and Enterprise at $35 per user per month. Its help centre says Business is billed monthly; annual billing is offered only on Enterprise contracts.",
    "**You sign in with Google or Microsoft.** Those are the only two sign-in options, and Granola works best with the account that holds your work calendar, because it reads your calendar to know which meeting you are in. Microsoft works with cloud Microsoft 365 calendars, not on-premises Exchange.",
    "**On a Mac, allow both audio permissions.** Setup asks for the microphone and for system audio. If you skip system audio, Granola's troubleshooting guide says it will hear you but not the other people on the call.",
  ],

  security: [
    {
      kind: "text",
      text: "The first responsibility is to the people you are meeting with. Because no bot appears, they may not realise anything is transcribing. Granola's own guidance calls it best practice to make sure participants know, including in person, and says recording-consent rules vary by place — when in doubt, check with your legal or IT team. It offers two built-in ways to tell people: an automatic chat message in the meeting, or a watermark on your camera.",
    },
    {
      kind: "list",
      label: "Settings worth checking on day one:",
      items: [
        "**Model training.** On free and Business accounts, Granola's help centre says it may use anonymised data to improve its services by default. Turn off \"Use my data to improve models for everyone\" in Settings → Preferences (on desktop or iPhone).",
        "**Transcript auto-deletion.** Transcripts are kept indefinitely unless you set auto-deletion (from one day to 12 months) under Settings → Preferences → Data & sharing. It deletes transcripts, not your notes, and can't be undone.",
        "**Sharing.** Notes are private by default. Anything you move into a shared team space or folder becomes visible to colleagues in your workspace.",
      ],
    },
    {
      kind: "text",
      text: "Granola states it holds a SOC 2 Type II report and stores data on AWS in the US. If you discuss something you would not want on paper, you can pause transcription during that part of the meeting.",
    },
  ],

  triad: {
    bestAt: [
      "Back-to-back calls where you want to listen rather than type, then get a clean summary a minute after hanging up.",
      "Finding what was said or promised across many meetings by asking in plain language.",
      "Meetings where a visible recording bot would feel awkward — though you should still tell people.",
    ],
    okayAt: [
      "Knowing who said what. In Zoom, Meet and Teams it can use participants' names; elsewhere the transcript just says \"Me\" and \"Them\".",
      "Noisy setups. It hears everything your computer plays, so music or videos in another window can end up in the transcript.",
    ],
    avoid: [
      "Using it on a free plan as your permanent record — you only see 30 days.",
      "Leaving people unaware they are being transcribed.",
    ],
  },

  starterActions: [
    {
      title: "Your week, in one question",
      prompt: "What did I promise to do in my meetings this week? List each item with who it's for and any deadline mentioned.",
      whyHere:
        "This is Granola's own headline example. Asked from the home screen, chat searches across all your recent meetings, which is the thing a stack of separate notes can't do.",
      tweak: "On the free plan, chat only looks back 30 days — ask about recent weeks.",
    },
    {
      title: "Check a summary against the source",
      prompt: "What exactly was agreed about the budget in this meeting? Quote the relevant part of the transcript.",
      whyHere:
        "Ask this inside a single meeting. AI summaries can smooth over disagreement or get a number wrong; asking for the transcript wording lets you confirm before you act on it.",
    },
    {
      title: "Draft the follow-up",
      prompt: "Write a short follow-up email to the attendees summarising the decisions and next steps from this meeting, in a friendly but brief tone.",
      whyHere:
        "Granola's chat can draft follow-up emails from the meeting it is open in. You review the draft before anything is sent, so you stay in control of what goes out.",
      tweak: "Ask for bullet points instead if your team prefers them.",
    },
    {
      title: "Spot patterns across calls",
      prompt: "Across my meetings from the last two weeks, what questions or objections came up more than once?",
      whyHere:
        "Granola's recipes guide suggests uses like spotting common sales objections and summarising feedback across calls. It works for any repeated meeting: interviews, customer calls, parent meetings.",
    },
    {
      title: "Save it as a recipe",
      prompt: "List the action items from this meeting as a checklist, grouped by person, with anything unassigned at the end.",
      whyHere:
        "Once a prompt earns its keep, save it as a recipe so you can run it after every meeting by typing `/`. Granola also has ready-made recipes under Discover in the Recipes tab.",
    },
  ],

  pitfalls: [
    "**Skipping the system-audio permission on a Mac.** You get a transcript of only your own voice.",
    "**Bluetooth headsets can lower the quality.** Granola's troubleshooting guide suggests setting your laptop's built-in microphone as Granola's mic instead.",
    "**VPNs and strict firewalls can block transcription.** If nothing appears, try without them.",
    "**Templates are desktop-only.** Notes taken on your phone can have a template applied once they sync to your computer.",
    "**Trusting the summary blindly.** Use the magnifying glass or ask chat for the transcript wording before quoting a decision.",
  ],

  whereToNext: [
    { label: "More meeting and note tools", categorySlug: "meetings-notes" },
    { label: "Voice & speech tools", categorySlug: "voice-speech" },
    { label: "Automate what happens after the meeting", categorySlug: "workflow-automation" },
  ],
};
