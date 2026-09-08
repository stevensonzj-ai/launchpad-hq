import type { PlatformTutorialData } from "./types";

export const tldvTutorial: PlatformTutorialData = {
  slug: "tldv-getting-started",
  platformSlug: "tl-dv",
  title: "Getting Started with tl;dv",
  tagline: "Sends a bot to your video calls so you can stop typing notes and actually listen.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-07",
  accessTier: "FREE",

  howItWorks:
    "You connect your calendar and your video-call app, and tl;dv sends a small bot that joins the meeting and records it. When the call ends you get a recording, a searchable transcript, and AI-written notes you can skim in a minute instead of rewatching an hour.",

  whatItIs: [
    "An AI meeting notetaker for Zoom, Google Meet and Microsoft Teams: it records the call, writes up what was said, and lets you search every meeting you have recorded — or ask its AI a question across a whole set of them. For people who sit in a lot of calls and lose the details.",
    "**Why this over Otter,** also on this site: Otter is strongest on straight transcription, tl;dv leans on the *video* — clip a 60-second moment and send it, though free plans allow only a handful — and its free tier has no monthly minutes budget.",
    "**Why this over Zoom's or Teams' own notetaker:** those cover only their own platform. tl;dv sits across all three, so meetings from different apps land in one library.",
  ],

  beforeYouStart: [
    "**Free to start, no card:** sign up, connect Google Calendar or Outlook, and choose which meetings get recorded. The calendar connection is the one to think about.",
    "**The free tier's shape matters more than its numbers.** Recording and transcription are generous; what is rationed is the *AI*: your first handful of meetings get full AI notes, then automatic notes cover only the opening minutes, and cross-meeting questions have a small allowance. Recordings age out — archived after days, deleted after months.",
    "Record a couple of calls a week and want only the notes, and you won't pay. You hit the wall wanting full AI notes on *every* meeting, recordings kept long-term, or them pushed into a **CRM**, the system a sales team keeps its customer records in. Paid plans currently start around $18 per person per month annually, roughly $29 monthly.",
    "**First step:** connect your calendar, set auto-record to internal only, and record one with your own team. Don't point a bot at a customer on day one.",
  ],

  security: [
    {
      kind: "text",
      text: "**Recording other people is a legal act, not a settings toggle.** Consent rules vary by where each person sits: some places need only one person on the call to agree (that can be you), others need *everyone* to agree first. Mixed country or US state on the call? Assume the strictest rule applies. Practically: say out loud at the start that you're recording and why, let people object, and don't record anything sensitive — HR issues, medical or legal matters, someone's pay — without written agreement. None of this is legal advice; if the stakes are real, ask someone qualified.",
    },
    {
      kind: "list",
      label: "What connecting your calendar actually hands over",
      items: [
        "Every event on your calendar — titles, times and the email addresses of everyone invited, including meetings tl;dv never records.",
        "Enough to auto-record meetings you don't even attend, if that setting is on — plus write access to edit your invites, if you turn on the consent flow.",
        "Attendee emails can be matched to contacts in a connected CRM, quietly turning your calendar into sales data.",
      ],
    },
    {
      kind: "list",
      label: "Where your meetings live afterwards",
      items: [
        "tl;dv states it holds **SOC 2** Type II — an audit of how a company handles customer data — encrypts stored data, keeps its data centres in Europe, and does not train AI models on customer data.",
        "Deleting a meeting in the app is described as a permanent wipe, not a hide.",
        "**Sharing rules can automatically make recordings visible to your team or whole organisation** based on things like the meeting title. Check those rules before you record anything you'd rather keep to yourself — a badly worded rule is how a 1:1 ends up org-wide.",
        "Retention on the free plan is a few months, and free recordings generally can't be downloaded. Get a call you care about out while you can.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Recurring internal meetings where nobody wants to be the notetaker",
      "Sales calls where you need to remember exactly what was promised",
      "User research and interviews, where the exact words matter",
    ],
    okayAt: [
      "Very large webinars — transcripts get long and speaker labels get muddled",
      "Being your only system of record; it captures what was said, not what was decided",
    ],
    avoid: [
      "Any call where you haven't told people you're recording",
      "Anything covered by medical, legal or financial confidentiality",
      "Genuinely private one-on-ones, especially with org-wide sharing rules on",
    ],
  },

  starterActions: [
    {
      title: "Record one internal meeting first",
      whyHere:
        "tl;dv's auto-record preference splits meetings by email domain, so \"internal\" means everyone on the invite shares your company domain — a safe sandbox where you learn what the bot looks like, how long processing takes and how good the notes are.",
    },
    {
      title: "Turn on consent collection before your first external call",
      whyHere:
        "tl;dv builds this in: it can rewrite the meeting link in your calendar invite so consent is asked before anyone joins, and you can scope it to external meetings.",
      tweak: "Test it with a friend first. A declined consent can't be undone for that meeting.",
    },
    {
      title: "Build a meeting template",
      whyHere:
        "tl;dv saves templates and applies them per meeting type, so your standup and your sales calls get written up differently — decisions, action items, objections rather than a generic summary. Most beginners skip it.",
    },
  ],

  pitfalls: [
    "**Auto-record on \"all meetings\" is a firehose you'll regret** — a library of five-minute check-ins, and a bot showing up somewhere awkward. Start narrow.",
    "**\"Internal only\" is decided by email domain, not by vibes.** A contractor, an agency or a co-founder on a personal Gmail counts as external, so your \"safe\" setting can still put a bot in front of an outsider.",
    "**Sharing rules are set once and forgotten.** A rule written to share \"all sales calls\" will happily share the one a customer assumed was private. Re-read them after a month.",
  ],

  whereToNext: [
    { label: "More meeting and note-taking tools", categorySlug: "meetings-notes" },
    { label: "Connect your notes to your other tools", categorySlug: "workflow-automation" },
  ],
};
