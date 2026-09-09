import type { PlatformTutorialData } from "./types";

export const zoomAiCompanionTutorial: PlatformTutorialData = {
  slug: "zoom-ai-companion-getting-started",
  platformSlug: "zoom-ai-companion",
  title: "Getting Started with Zoom's Built-in AI",
  tagline:
    "The meeting summaries Zoom used to call AI Companion — already in the app, if your admin let you have it.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You're in a Zoom call. An AI icon sits in the meeting toolbar; the host clicks it to set the AI going, and everyone's icon changes colour while it runs. Mid-call you can type it a question without interrupting anyone. When the call ends, a write-up lands in your email and in the meeting chat.",

  whatItIs: [
    "Zoom's AI is the note-taking and summarising built into the Zoom app you already have. It writes up your meetings, answers questions while a call is still running, and drafts chat and email replies. Until recently all of it was branded **AI Companion**; Zoom began removing that name from Zoom Workplace in June 2026, so the settings are now labelled by what they do — meeting summary, chat compose — and searching your account settings for \"AI Companion\" may turn up nothing at all.",
    "**Why this rather than a separate notetaker:** there is no second vendor — nothing joins your call as a guest, no other company ends up holding your recordings, and nothing extra to buy if your employer already pays for Zoom.",
    "**What is not included:** **ZoomMate** is a separate paid product that searches across your files and other apps and carries out multi-step tasks. It replaces the old Custom AI Companion add-on and starts at around $20 per user a month. Everything else on this page comes with the plan you already have.",
  ],

  beforeYouStart: [
    "**The first question isn't what it costs — it's whether your admin has switched it on.** These are account settings, not personal ones. Whoever runs your organisation's Zoom account enables them for everyone or for particular groups, and can lock the choice so an individual can't override it. If the icon isn't in your toolbar, there is no setting of your own that will summon it.",
    "Assuming it is on, the core features come with the plan rather than as an extra charge. Zoom's own comparison page says AI is included at no extra cost with paid Zoom Workplace plans, which currently start at about $14 per user a month on an annual Pro subscription. Zoom's support articles list Pro, Business and Enterprise as the plans that qualify for meeting summary, and don't list the free Basic plan.",
    "The free plan isn't empty, but it is metered. Zoom's pricing page currently shows a small monthly allowance on free Basic — around three meeting summaries a month, with similarly small numbers attached to the other features. Zoom's help centre and its pricing page don't currently say the same thing about free access, so check what your own account actually offers before planning around it.",
    "**First step:** host one internal meeting, start the AI yourself, and read the write-up against your own memory of the call. Don't point it at a customer on day one.",
  ],

  security: [
    {
      kind: "text",
      text: "**Zoom's own terms put this on you, by name.** Section 7 of the Terms of Service says the host is responsible for compliance with all laws governing the monitoring or recording of conversations. Whether one person's agreement is enough or everyone's is required depends on where each person is physically sitting, and a call spanning several places is governed by whichever of those rules is strictest. The specifically Zoom-shaped trap is the gap between recording and summarising: Zoom documents a consent pop-up for **recording**, where a participant clicks OK or leaves the meeting, but its article on meeting summary describes something much quieter — the AI icon changing colour to show the feature is active. An icon is not a disclosure. Say it out loud when you start it, and keep pay, health, discipline and legal matters out of the transcript entirely. None of this is legal advice.",
    },
    {
      kind: "list",
      label: "What Zoom says it does with what it hears",
      items: [
        "Zoom's Terms of Service — the binding document, not a blog post — states that Zoom does not use your audio, video, chat, screen sharing, attachments or other communications-like content to train Zoom's or third-party AI **models** (the AI \"brain\" that does the actual thinking). That wording was added in August 2023 after an earlier version of the terms was widely read as granting Zoom exactly those rights; the reversal was reported at the time and the commitment has been repeated on Zoom's own pages since.",
        "Some answers are produced by outside model providers — Zoom names Anthropic, OpenAI and Perplexity — unless the account is configured to use only models Zoom runs itself. That is an account-level choice made by whoever administers the account, not by you.",
        "Zoom offers a choice of which region the processing happens in, which is the kind of control that only exists on a business plan and only if someone has actually set it.",
      ],
    },
    {
      kind: "list",
      label: "Where the write-up ends up",
      items: [
        "The write-up is addressed to the meeting, not to you — so a correction you make is a correction everyone sees.",
        "Zoom's documentation says people who joined without signing in to a Zoom account don't receive it automatically. The person most likely to be misquoted can be the one who can't read the write-up.",
        "Whether the transcript behind the summary is retained for other AI features to use is one account setting; whether you, as host, can see and delete that transcript is a second, separate one. You may end up with a summary you can read and a transcript you can't reach.",
        "Cloud recordings are described as retained for as long as the account is active, unless someone has set them to auto-delete.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Recurring internal calls, where the write-up only has to be good enough to jog four people's memories.",
      "Joining a call late and needing to know what was already decided without stopping the meeting to ask.",
      "Organisations already standardised on Zoom, where the notes need no purchase order.",
    ],
    okayAt: [
      "Meetings that aren't on Zoom. The AI can be sent into Google Meet and Microsoft Teams calls, but it takes more unlocking than anything else here.",
      "Being your record of what was **decided**. It's reliable about what was said, which isn't the same thing.",
      "Long webinars and calls with heavy cross-talk, where speaker labels get muddled.",
    ],
    avoid: [
      "Any meeting you're not hosting. Starting and stopping is a host and co-host control, so on someone else's call the most you can do is ask them.",
      "Planning around ZoomMate outside North America right now — Zoom launched it there on 1 June 2026 and says EMEA and APAC are expected later, so you may read the marketing before you can buy the product.",
      "Assuming a summary means you also have a recording. Zoom keeps meeting summary and cloud recording as separate settings, so a call can end with a tidy write-up and no video to check it against.",
    ],
  },

  starterActions: [
    {
      title: "When you're hosting an internal call → then start the AI before anyone speaks",
      whatItDoes:
        "The host clicks the AI icon at the top of the meeting, before anyone has started talking.",
      whyHere:
        "tl;dv and the other notetakers on this site send a bot that appears in the participant list and has to be admitted; Zoom's runs inside the meeting client itself, so there's no extra attendee for anyone to query and no waiting room to clear.",
      tweak:
        "Ask a colleague what appeared on **their** screen. That is the only honest way to learn what your participants are actually told.",
    },
    {
      title: "When you join twenty minutes late → then ask it what you missed",
      whatItDoes:
        "Type a question into the AI panel while the meeting is still running instead of interrupting to ask.",
      whyHere:
        "Otter is built around the transcript you read after the call ends. This one is documented as answering during the meeting, which is what makes it usable at the moment you actually need it — though only if the host has already started it.",
      tweak:
        "Ask it something you already know the answer to. Two minutes of that tells you more about its accuracy than a week of reading its summaries.",
    },
    {
      title: "When the meeting isn't on Zoom → then send Zoom's AI to it",
      whatItDoes:
        "With calendar sync set up, Zoom's AI can be invited into a Google Meet or Microsoft Teams meeting to transcribe and summarise it.",
      whyHere:
        "This one carries an admin setting of its own on top of calendar sync — so it's the feature most likely to be missing on a locked-down company account where everything else works fine. tl;dv covers all three platforms out of the box with nothing to unlock.",
      tweak:
        "Zoom describes this as inviting its AI to the meeting, so expect it to show up as a participant there — the no-extra-attendee advantage is a Zoom-calls-only benefit.",
    },
    {
      title: "When the icon isn't there on a work account → then ask for the setting by its name",
      whatItDoes:
        "Sends your admin to a specific switch in the admin portal rather than to a general question about AI.",
      whyHere:
        "Zoom didn't build one master toggle. Meeting summary, in-meeting questions and third-party meetings are each their own separately named account setting, so \"please turn on AI\" gets you a shrug and naming the one you want gets you the feature.",
      tweak:
        "If it comes back locked, that's a decision rather than a fault. A personal Zoom account on a paid plan is the way round it, at your own expense.",
    },
  ],

  pitfalls: [
    "**A summary nobody re-read is not a record.** It arrives fluent, fast and before anyone has had time to think about the meeting, which is exactly why it gets forwarded as if it were minutes.",
    "**Auto-start runs without you.** Zoom's settings allow a summary to begin automatically, and its own article notes this can happen without the host being present — so a call that starts before you join can already be being written up by the time you arrive.",
    "**It hears the two minutes before the meeting starts.** Small talk, a comment about a colleague, someone mentioning why they were off last week — it's all speech and it can all land in the transcript. Start it when the meeting starts, not when you open the room.",
    "**Nothing tells you when the free allowance runs out except the absence of a summary.** On a metered plan the button can still be there when the month's allowance isn't, so check that the write-up actually arrived rather than assuming it did.",
  ],

  whereToNext: [
    { label: "Notetakers that work across Zoom, Meet and Teams alike", categorySlug: "meetings-notes" },
    { label: "More AI hidden inside software you already pay for", categorySlug: "ai-plugins-business-software" },
    { label: "Push your meeting notes into your other tools", categorySlug: "workflow-automation" },
  ],
};
