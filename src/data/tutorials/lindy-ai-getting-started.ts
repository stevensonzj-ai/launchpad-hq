import type { PlatformTutorialData } from "./types";

export const lindyAiTutorial: PlatformTutorialData = {
  slug: "lindy-ai-getting-started",
  platformSlug: "lindy-ai",
  title: "Getting Started with Lindy",
  tagline:
    "Give it your inbox and calendar, and it handles the admin around them — on a schedule, without being asked.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-17",
  changelogUrl: "https://www.lindy.ai/changelog",
  accessTier: "PREMIUM",

  howItWorks:
    "You message Lindy the way you'd message a colleague — in Slack or in a chat box on its website — and it comes back with the work done. For jobs you want repeated, you describe one in a box in plain English, and Lindy runs it on a schedule or on a **trigger** (the \"when\" — the event that starts an automation).",

  whatItIs: [
    "Lindy sells itself as an AI employee rather than an automation builder. Its own documentation opens: \"Lindy is an AI employee. It lives in your Slack, connects to your tools, and comes back with the work done.\" You give it standing access to your mailbox and calendar, and it works from those continuously rather than from one form submission at a time.",
    "The work it is built around is the admin layer of a job: labelling and archiving incoming mail, drafting replies in your phrasing, joining Meet, Zoom and Teams calls to record and write them up, prepping you before a meeting, chasing emails that got no reply, and scheduling. Those ship as built-in routines you switch on, not as flows you assemble.",
    "It also takes one-off requests — \"what's on my calendar today\", \"draft a reply to this one\" — and Lindy's docs say it connects to 1,000+ other tools through a sign-in or an access key, so a routine can reach into Notion, HubSpot or Linear as well as your inbox.",
    "Worth knowing before you go looking for help: Lindy used to be a visual builder where you wired steps together on a canvas, and most of the tutorial material still online describes that product. The company has since replaced it with this teammate model — its founder announced the change publicly as retiring the word \"agent\" — and the current documentation no longer covers the old builder.",
  ],

  beforeYouStart: [
    "**There is no free plan.** Lindy's pricing page currently lists paid seats only, starting around $30 per user per month for roughly 3,000 credits, and its own FAQ says direct signups are billed right away. Lindy's homepage does advertise a seven-day free trial, but the FAQ — the more specific of the two — scopes that week to people who join an existing workspace by mentioning Lindy in Slack. Unless a colleague already runs it, trying Lindy means paying for a month first.",
    "Setup starts by connecting your Google or Microsoft account so Lindy can, in its own words, \"run your inbox, prep and take notes on meetings, and handle scheduling.\" That is your live mailbox and your live calendar, not a copy. If the account belongs to an employer, expect a second obstacle: Google lets Workspace administrators decide which third-party apps may reach Workspace data, so on a locked-down work account the connection can be refused until an admin allows it. Lindy publishes nothing about this either way, so check with whoever runs your email before you plan around it.",
    "Usage is metered in **credits** (the platform's unit of spend — each thing you make costs some). Lindy's pricing page currently puts everyday asks at 2-250 credits, research-grade work at 250-1,000, and big builds at 1,000-2,500. Credits pool across everyone on the workspace and do not roll over. Run out and, per the same FAQ, \"Lindy pauses credit-using actions until your credits reset\" — nothing breaks and you are not billed extra.",
    "The documented starting point is Slack, and installing the Lindy app there is normally an administrator's job. There is a web app as well — its sidebar carries Home, Chat, Meetings, Files, Routines, Skills and Integrations — so you are not locked out without Slack, but the quickstart Lindy publishes assumes the Slack route, and how much of a solo setup works without it is not something we could confirm from the public docs.",
  ],

  security: [
    {
      kind: "text",
      text: "Lindy draws its safety line at the edge of your account, not at the edge of your inbox. Its pricing FAQ answers the question \"Will Lindy do anything without my approval?\" with \"No. Anything with outside impact waits for approval such as sending an email, updating a ticket, posting to another channel, publishing a doc.\" That promise is real and worth having. But read what it covers. Work inside your own mailbox is not outside impact: the built-in email labelling routine, in Lindy's own description, \"reads every incoming email and labels it, archiving what you don't need to see and keeping what matters visible,\" and it does that on its own once switched on. Nothing you did not approve leaves your account; a fair amount happens inside it.",
    },
    {
      kind: "list",
      label: "Four things worth settling before you connect a mailbox:",
      items: [
        "**Decide whose mail this really is.** Lindy reads the whole incoming stream to do its job, not only the messages a rule matched. If your inbox carries other people's confidential correspondence, that is the fact to weigh, and it is a different question from whether you trust the drafts it writes.",
        "**Treat archiving as the setting to watch.** A label is visible and reversible; archiving moves mail out of your inbox before you have seen it. Configure labels that only tag at first, and add archiving to one once a week of its choices has looked right.",
        "**Check the age of the binding document.** Lindy's security page says your data is \"never sold, never shared, never used to train models\" and lists an independent **SOC 2** Type II audit (an audit of how a company handles customer data) alongside GDPR and HIPAA. Its privacy policy — the document that actually binds — is dated 13 February 2024, before the product that reads your mail existed. It does commit that Google-sourced data will not be used \"for any artificial intelligence model training or evaluation purposes.\"",
        "**Know both ways to revoke.** Lindy stores connection secrets write-only — its docs say \"You cannot read the value back: not in the app, not through the API, not by asking Lindy\" — and offers a Revoke action. Access granted through a Google or Microsoft sign-in can also be withdrawn from that account's own security settings, which is the end that still works if you lose access to Lindy.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "The recurring admin around email and meetings — sorting a morning's mail, drafting replies in your own phrasing, recording a Zoom or Teams call and writing up what was decided.",
      "Turning a standing instruction into a scheduled job: you describe it once in ordinary English and it runs every weekday without you rebuilding it.",
      "Work you want done on your own accounts rather than passed between two other services. It starts from your inbox and calendar, not from a form submission.",
    ],
    okayAt: [
      "Precise, branching logic. Routines are described rather than drawn, so when the outcome is wrong you rewrite a sentence rather than inspect a step. Make and n8n show you exactly what each step received and emitted.",
      "Working alone. Everything is priced and documented around a shared Slack workspace with one pooled credit balance. One person on their own still works; nothing about the design is aimed at it.",
    ],
    avoid: [
      "Signing up just to have a look. Lindy's terms, last updated 14 March 2025, make all purchases non-refundable, so the minimum cost of deciding it is not for you is a full month's seat.",
      "Relying on the changelog to tell you what changed. Lindy's published changelog currently stops at 21 October 2025 and still describes the agent-builder product the documentation no longer covers, while the company's blog posts several times a week.",
      "Treating today's shape as settled. The builder people learned Lindy on in 2025 is not what the docs describe now, and the walkthroughs still circulating for it lead somewhere the product no longer goes.",
    ],
  },

  starterActions: [
    {
      title: "Let it sort one morning's mail",
      whatItDoes:
        "When a new email arrives → then Lindy labels it, and archives anything you have told it you do not need to see.",
      whyHere:
        "This is the built-in routine that makes the product's boundary concrete — it works from the whole incoming stream rather than from the messages a rule matched, which is the thing a Zapier or n8n flow structurally cannot do. Lindy's docs also note it does nothing at all until you have created at least one label.",
      tweak:
        "Start with tagging only. Add archiving to a label once a week of its choices has looked right.",
    },
    {
      title: "Describe a morning brief and let it run",
      prompt:
        "Every weekday at 8am, summarise the emails I haven't replied to in three days and the meetings on my calendar today, and send me the list.",
      whyHere:
        "Lindy's Routines page carries a \"Describe your routine\" box that takes a sentence like this one and derives the schedule, the accounts and the output from it. On Zapier or n8n the same brief is a flow you assemble and a set of fields you map before it will run once — here the sentence is the whole build.",
      tweak:
        "Change the three days to one and see how much noise that adds before you settle on a number.",
    },
    {
      title: "Send it to a meeting you are in",
      whatItDoes:
        "When a call starts on your calendar → then Lindy joins the Meet, Zoom or Teams call, records it, and files the notes where you can search them.",
      whyHere:
        "Lindy is present in the call itself. Zapier and n8n have no seat in a meeting; the most either can do is move a transcript some other product already made, which means paying for that product too.",
      tweak:
        "Tell the people on the call before the first one. A recorder arriving unannounced is its own problem.",
    },
    {
      title: "Chase the emails that went quiet",
      whatItDoes:
        "When something you sent gets no reply inside a window you choose → then a follow-up appears in your drafts.",
      whyHere:
        "The window is a setting with fixed choices — Lindy's docs list 1, 2, 3, 5 and 7 days — and the bump stops in your drafts folder rather than going out. On Zapier or n8n, detecting \"no reply\" is logic you have to build yourself, and once built it sends unattended.",
      tweak:
        "Read the first few before sending. The phrasing is learned from your own sent mail and takes a while to sound like you.",
    },
    {
      title: "Write down how you want something done",
      prompt:
        "When I ask for my weekly update, pull the numbers from the dashboard, lead with the top three changes, and keep it under a page.",
      whyHere:
        "This is a Skill, and Lindy's docs say the description is \"how Lindy decides when the skill applies\" — so the tool chooses whether to use it. Nothing on Zapier or n8n decides whether to run: a flow fires when its trigger matches, every time, or it does not fire at all.",
      tweak:
        "Name the thing you always have to correct. That is the instruction worth writing down first.",
    },
  ],

  pitfalls: [
    "**The seat is the unit, and mentioning Lindy creates one.** Per Lindy's own FAQ, anyone who uses it takes a seat, including someone who @mentions it in Slack. In a shared channel, a curious colleague adds to the bill.",
    "**One person's big job is everyone's.** Because credits pool across the workspace, the ceiling you are working against is not yours alone. Agree who runs the expensive things before anyone runs one.",
    "**Switching a routine on is not the same as configuring it.** Email labelling does nothing until you create a label; the follow-up routine needs a window. A routine that is on and idle looks identical to one that is working.",
    "**It learns from your edits, so early corrections stick.** Lindy's docs say it picks up on the changes you make to drafts over time. Fixing a draft carelessly teaches it the careless version.",
  ],

  whereToNext: [
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "Meetings & Notes", categorySlug: "meetings-notes" },
    { label: "AI Plugins for Business Software", categorySlug: "ai-plugins-business-software" },
  ],
};
