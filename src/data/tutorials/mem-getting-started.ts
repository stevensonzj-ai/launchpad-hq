import type { PlatformTutorialData } from "./types";

export const memTutorial: PlatformTutorialData = {
  slug: "mem-getting-started",
  platformSlug: "mem",
  title: "Getting Started with Mem",
  tagline: "A notes app that files everything for you, then answers questions about what you saved.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  changelogUrl: "https://get.mem.ai/blog",
  accessTier: "FREE",

  howItWorks:
    "You type or speak a note and it lands in one searchable pile — there are no folders to choose first. When you want something back, you open a panel beside your notes and ask in plain English; it reads across everything you have saved and answers there. You keep going from that answer.",

  whatItIs: [
    "Mem is a notes app built around the idea that filing is the part people give up on. Anything you throw at it — a typed note, a spoken thought, a forwarded email, a clipped web page — gets read, structured and grouped for you.",
    "On top of that sits Mem Agent, an **agent** (AI that takes actions on its own rather than only answering) that watches for tasks and unfinished threads in what you have written and checks in about them.",
    "The reason to pick it over Notion AI or Obsidian is narrow and worth being honest about: those two are better places to **build** something and expect you to decide where each thing lives, while Mem is the one that will take a half-formed thought at 11pm and put it somewhere sensible without asking you where.",
  ],

  beforeYouStart: [
    "Signing up currently means signing in with Google — Mem's help centre says a Google account is the only supported login, though its privacy policy also mentions Apple, so you may find more options on the sign-in screen than the help pages describe. If you do not want Mem attached to a Google identity, this is your stopping point, and Obsidian is the obvious alternative in the same category.",
    "The free plan is real but small, and it is metered by activity rather than by time: currently around 25 messages to Mem and 25 new notes a month, task tracking across those 25 notes, and about 3 hours of Voice Mode. Free is enough to find out whether the recall actually works on your own material, which is the only question worth answering first. You would move up when the counters bite — currently around $9/month for Mem Plus, which roughly doubles the allowances, and around $29/month for Mem Pro, which is where connecting Gmail, Slack or Todoist and setting up scheduled routines first become available at all.",
    "It runs on Mac, Windows, iOS and the web. There is no Android app, and Mem's help centre says it has no timeline to share for one, so an Android phone means the web app.",
    "English is the only officially supported language across Voice Mode, Deep Search and Chat. Mem says other languages may work but are not supported, so treat non-English results as something to test before you rely on them.",
  ],

  gettingSetUpSafely: {
    officialSource: "Mem's own download page: https://get.mem.ai/download",
    body: [
      "Get the Mac and Windows apps from Mem's own download page and the browser clipper from the Chrome Web Store. Search results for a popular AI notes app are exactly the kind of thing that attracts lookalike installers, so the source matters more than usual.",
      "You do not have to install anything to start. The web app covers the note-taking and the chat; the desktop app is what adds meeting capture and the hold-a-key voice capture, and the Chrome extension is what adds web clipping.",
      "When you first turn on Voice Mode in the desktop app it will ask for system-audio permission. That is the setting that lets it record the other side of a call, so grant it only if capturing meetings is why you installed it.",
    ],
    vendorDocsUrl: "https://help.mem.ai/",
  },

  security: [
    {
      kind: "text",
      text: "Mem is not a tool you decide what to paste into — the whole product assumes you will put everything in, and it is only useful in proportion to how much you do. That inverts the usual advice.",
    },
    {
      kind: "text",
      text: "The vendor is unusually direct about the trade. Mem's security page (revised 2026-01-15) says content is encrypted in transit and at rest, and that it **is unencrypted for AI processing by third-party vendors** so the product can do the capture, organising and recall it advertises. Its pricing FAQ says the same thing more plainly: your data is not end-to-end encrypted, \"because Mem needs to process your knowledge to provide intelligence on top of it.\" Mem states it is SOC 2 Type II compliant — **SOC 2** being an audit of how a company handles customer data — and hosts on Google Cloud.",
    },
    {
      kind: "text",
      text: "On the question that matters most for a notes app: Mem's privacy policy, **revised 2026-08-13 and in force as of 2026-09-13**, states that it does not use your personal information, your notes, or information collected via third parties such as Google Workspace APIs \"to develop, improve, or train any generalized AI and/or ML models,\" and that queries sent through its integrations with other AI platforms are not used to train models either. Read the word **generalized** rather than skimming it: the commitment as written is about general-purpose models, and it is not the same sentence as \"nothing derived from your notes is ever used for anything.\"",
    },
    {
      kind: "list",
      label: "Two more things a reader should know before their whole working life is in here",
      items: [
        "**Deleted is a process, not a moment.** Trash empties itself after 30 days. The Terms of Service (revised 2026-09-11) say deleted content is removed from Mem's systems within 90 days, and that activity logs which may include partial copies of deleted content are kept for up to 400 days.",
        "**A Connection is a standing read on another account.** Once linked, the assistant is answering from your inbox as well as your notes, which quietly changes what a shared note or a stray screen-share can reveal. The privacy policy says you can revoke access by disconnecting the service at any time; link one only when you have a specific reason.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Getting a thought out of your head before it evaporates, without naming or filing it.",
      "Answering questions about your own past that you could not construct a keyword search for.",
      "Turning a recorded meeting into a usable note, with the original audio and the transcript attached to it.",
    ],
    okayAt: [
      "Being the place you build things. The editor, templates and collections are competent, but there is no database or table-driven workspace of the kind Notion is bought for.",
      "Team knowledge. Sharing works per note and per shared collection, but the current pricing table lists personal plans only — there is no separate team tier in it.",
      "Large clean-up jobs. Mem's docs say Chat works through bulk operations in batches of around 50 notes and pauses to check in, so \"organise everything\" is a session, not a click.",
    ],
    avoid: [
      "Moving a big existing library in and expecting it to survive intact. Imports accept Markdown and plain text only, around 1,000 files at a time, and Mem's own import docs say folder structure does not come across and attachments are not imported with the note.",
      "Making Mem the only copy of anything. Its export gives you your current notes as plain-text files, and the vendor's version-history page states plainly that exports do not include a note's version history.",
    ],
  },

  starterActions: [
    {
      title: "Record the meeting, then ask for the shape you actually need",
      prompt:
        "Rewrite this as three sections: decisions we made, action items with an owner for each, and anything we left unresolved.",
      whyHere:
        "Voice Mode records your microphone and the system audio locally from inside the note without joining the call as a participant, and when it stops you can hit Refine and re-run the same transcript into a different structure as many times as you like. Notion AI can summarise a transcript you give it; it has no recorder of its own to re-run from, which is what makes the second and third attempt cheap here.",
    },
    {
      title: "Ask the question you could never have searched for",
      prompt: "What did I decide about pricing, and what changed my mind?",
      whyHere:
        "Chat searches your whole workspace by default rather than matching words, and Mem's own docs recommend describing what you want in plain language instead of attaching a big collection, because pointing it at a 200-note collection fills up what the chat can hold and the answers get worse. That is the opposite of the Obsidian workflow, where finding something still starts with you knowing roughly which note it is in.",
    },
    {
      title: "Tell the web clipper what you want out of the page",
      prompt: "Pull out just the pricing claims and the launch date, then file this under #Competitors.",
      whyHere:
        "The Chrome extension's popup has its own input field, and typing `#` targets a collection while `@` appends the clip to an existing note — so the summarising and the filing both happen at clip time, in the browser, before you ever open the app. Obsidian's clipper saves the page into a vault folder you pick yourself and leaves the reading to you.",
    },
    {
      title: "Speak it without opening anything",
      prompt:
        "Remind me Thursday to send Priya the offsite budget, and keep it with the offsite note.",
      whyHere:
        "Hold Right Option on Mac or Right Ctrl on Windows and the desktop app sends what you say straight to the agent from on top of whatever you were doing, with the app hidden — the vendor describes this as a request the agent interprets rather than dictation into the current window. There is no equivalent global push-to-talk key in Notion AI. Note that Mem says which actions the agent can then take depend on your plan, so on the free plan expect the thought to be captured reliably and treat the follow-up reminder as the thing to verify.",
      tweak:
        "Double-tap the same key instead of holding it to go hands-free, then press once more to send. You can change or disable the shortcut in Settings → Mem Agent.",
    },
  ],

  pitfalls: [
    "**The monthly counter counts more than you would guess.** A message in the chat, a push-to-talk request, a message through a channel like WhatsApp and an email to `save@mem.ai` all count as Messages to Mem, and Mem's pricing FAQ notes that a forwarded email that creates a note also spends one of your new-note allowances. On the free plan an enthusiastic first afternoon can eat the month.",
    "**Long chats get worse, not better.** Mem's own docs say answers degrade as a conversation fills up, and advise starting a fresh chat rather than trying to rescue one that has gone off the rails. Beginners instinctively do the opposite and keep pushing.",
    "**Trash is on a timer.** Version history cannot recover a permanently deleted note, so if you bulk-delete duplicates after an import, check the results well inside that 30-day window.",
    "**What your plan includes is not all in one table.** The plan comparison lists eight metered allowances. Separately, individual feature pages and the help centre mark Briefings, Heads Up Live, choosing your own model and even Dark Mode as Pro features, and none of those four appear as rows in the comparison table. If one of them is the reason you are upgrading, confirm it before you pay rather than assuming the table is complete.",
  ],

  whereToNext: [
    { label: "Meetings & Notes", categorySlug: "meetings-notes" },
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
  ],
};
