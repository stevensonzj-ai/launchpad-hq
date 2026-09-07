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
    "You connect your calendar and your video-call app, and tl;dv sends a small bot that joins the meeting and records it. When the call ends, you get a recording, a full searchable transcript, and AI-written notes you can skim in a minute instead of rewatching an hour.",

  whatItIs: [
    "An AI meeting notetaker for Zoom, Google Meet and Microsoft Teams — it records the call, writes up what was said, and lets you search across every meeting you've ever recorded.",
    "Built for people who sit in a lot of calls and keep losing the details: salespeople, recruiters, founders, customer support, anyone running interviews or user research.",
    "**Why this over Otter,** which is also on this site: Otter is strongest on straight transcription. tl;dv leans harder on the *video* — you can clip a 60-second moment and send it to someone, and its free tier lets you record and transcribe without a monthly minutes budget hanging over you.",
    "**Why this over the notetaker already inside Zoom or Teams:** those only cover their own platform and their own recordings. tl;dv sits across all three, so meetings from different apps land in one searchable library.",
  ],

  beforeYouStart: [
    "**Free to start, no card.** You sign up, connect Google Calendar or Outlook, and choose which meetings get recorded.",
    "You're connecting two things: your **calendar** (so tl;dv knows what's coming and who's invited) and your **meeting platform**. The calendar connection is the one to think about — see the security section.",
    "**The free tier's shape matters more than its numbers.** Recording and transcription are generous. What's rationed is the *AI*: your first handful of meetings get full AI notes, and after that the automatic notes cover only the opening minutes of each call. Recordings also age out — they move to slow archived storage after a few days and are deleted after a few months, so the free plan is a working tool, not an archive.",
    "**Will you need to pay?** If you record a couple of calls a week and just want the notes, honestly no. You'll hit the wall the moment you want full AI notes on *every* meeting, want to keep recordings long-term, or want them pushed into a CRM. Paid plans currently start around $18 per person per month on annual billing, roughly $29 monthly.",
    "**First step:** connect your calendar, then set auto-record to internal meetings only and record one meeting with your own team. Don't point a bot at a customer on day one.",
  ],

  security: [
    {
      kind: "text",
      text: "**Recording other people is a legal act, not a settings toggle.** Consent rules vary by where each person is sitting: some places need only one person on the call to agree (that can be you), and others require *everyone* to agree before you press record. If your call has someone in a different country or a different US state, assume the strictest rule on the call applies. Practically: say out loud at the start that you're recording and why, let people object, and don't record anything sensitive — HR issues, medical or legal matters, someone's pay — without written agreement first. None of this is legal advice; if the stakes are real, ask someone qualified.",
    },
    {
      kind: "list",
      label: "What connecting your calendar actually hands over",
      items: [
        "Every event on your calendar — titles, times, and the email addresses of everyone invited, including meetings tl;dv never records.",
        "Enough to auto-record meetings you don't even attend, if you leave that setting on.",
        "Write access to your calendar, if you enable the consent flow — it needs to edit your invites to swap in the consent link.",
        "Attendee emails can be matched to contacts in a connected CRM, which quietly turns your calendar into sales data. Fine if that's the point; worth knowing if it isn't.",
      ],
    },
    {
      kind: "list",
      label: "Where your meetings live afterwards",
      items: [
        "tl;dv states it holds SOC 2 Type II, encrypts stored data, runs its data centres in Europe, and does not use customer data to train AI models. That's a better posture than most tools in this category.",
        "Deleting a meeting in the app is described as a permanent wipe, not a hide.",
        "**Sharing rules can automatically make recordings visible to your team or whole organisation** based on things like the meeting title. Check those rules before you record anything you'd rather keep to yourself — a badly worded rule is how a 1:1 ends up org-wide.",
        "Retention on the free plan is a few months, and free recordings generally can't be downloaded. If a call matters, get it out while you can.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Recurring internal meetings where nobody wants to be the notetaker",
      "Sales and customer calls where you need to remember exactly what was promised",
      "User research and interviews, where the exact words matter",
      "Finding that one thing someone said three weeks ago, by searching across every recording",
      "Sending a colleague a 60-second clip instead of \"watch this hour\"",
    ],
    okayAt: [
      "Very large webinars — transcripts get long and speaker labels get muddled",
      "Heavily accented or multilingual calls; it handles many languages, but accuracy varies",
      "Being your only system of record — it captures what was said, not what was decided",
    ],
    avoid: [
      "Any call where you haven't told people you're recording",
      "HR conversations, performance reviews, disciplinary meetings, terminations",
      "Anything covered by medical, legal or financial confidentiality",
      "Casual chats where a bot in the corner will visibly change how people speak — sometimes the right call is no recording",
      "Genuinely private one-on-ones, especially if org-wide sharing rules are on",
    ],
  },

  starterActions: [
    {
      title: "Record one internal meeting before anyone outside sees the bot",
      whatItDoes: "Connects your calendar and records a single low-stakes call with your own team.",
      whyHere:
        "tl;dv's auto-record preference splits meetings by email domain — \"internal\" means everyone on the invite shares your company domain. That gives you a genuinely safe sandbox: you learn what the bot looks like, how long processing takes, and how good the notes are, without a customer watching you figure it out.",
      tweak: "Tell your team beforehand and ask them afterwards whether the bot bothered them. Their answer is useful data.",
    },
    {
      title: "Turn on consent collection before your first external call",
      whatItDoes:
        "Makes attendees see a consent page, or get an email, explaining that the meeting will be recorded.",
      whyHere:
        "tl;dv builds this in rather than leaving it to you — it can rewrite the meeting link in your calendar invite so consent is asked before anyone joins, and you can scope it to external meetings only. Set it up once and it protects every call after that.",
      tweak: "Test it on a meeting with a friend first. A declined consent can't be undone for that meeting, so you want to see the flow before it surprises a prospect.",
    },
    {
      title: "Build a meeting template so the notes come out in the shape you need",
      whatItDoes:
        "Tells the AI which sections to produce — decisions, action items, objections, next steps — instead of a generic summary.",
      whyHere:
        "tl;dv lets you save templates and apply them per meeting type, so your weekly standup and your sales calls get written up differently. This is the single biggest jump in usefulness, and it's the step most beginners skip.",
      tweak: "Write the template as the questions you'd ask a colleague who attended: what did they push back on, what did we commit to.",
    },
    {
      title: "Ask a question across several meetings at once",
      whatItDoes:
        "Uses tl;dv's AI to answer over a set of recordings rather than one — \"what pricing objections came up this month?\"",
      whyHere:
        "This is where tl;dv separates from a plain transcription tool, and it's why the library is worth building. The free tier gives you a small allowance of these cross-meeting prompts, which is enough to find out whether the feature is worth paying for.",
      tweak: "Set a recurring report so the answer arrives weekly instead of you remembering to ask.",
    },
    {
      title: "Share a clip instead of the whole recording",
      whatItDoes: "Cuts a short highlight from a meeting and sends a link to just that.",
      whyHere:
        "tl;dv keeps the video, not just the text, so a clip carries tone and context a pasted quote can't. It's also the privacy-respecting move: the recipient sees ninety seconds, not an hour of unrelated conversation.",
      tweak: "Free plans allow only a handful of clips, so save them for moments that will actually change someone's mind.",
    },
  ],

  pitfalls: [
    "**Auto-record on \"all meetings\" is a firehose you'll regret.** You end up with a library full of five-minute check-ins and a bot showing up somewhere awkward. Start narrow and widen deliberately.",
    "**\"Internal only\" is decided by email domain, not by vibes.** A contractor, an agency, or a co-founder using a personal Gmail counts as external — which means your \"safe\" internal setting can still put a bot in front of an outsider.",
    "**The free plan runs out of AI, not recording.** People assume they've hit a time limit when actually the automatic notes have dropped to covering only the first few minutes. If summaries suddenly look thin, that's what happened.",
    "**Nobody reads the calendar invite.** A pre-meeting email is not the same as consent. Say it out loud in the first ten seconds of the call — it takes one sentence and it's the thing that protects you.",
    "**Sharing rules are set once and forgotten.** A rule written to share \"all sales calls\" with the team will happily share the one where a customer said something they assumed was private. Re-read your rules after a month of real use.",
  ],

  whereToNext: [
    { label: "More meeting and note-taking tools", categorySlug: "meetings-notes" },
    { label: "Connect your notes to the rest of your tools", categorySlug: "workflow-automation" },
  ],
};
