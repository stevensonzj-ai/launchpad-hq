import type { PlatformTutorialData } from "./types";

export const microsoftPowerAutomateTutorial: PlatformTutorialData = {
  slug: "microsoft-power-automate-getting-started",
  platformSlug: "microsoft-power-automate",
  title: "Getting Started with Microsoft Power Automate",
  tagline: "Microsoft's automation tool — already inside the licence your employer bought.",
  archetype: "recipes",
  lastReviewedAt: "2026-09-17",
  changelogUrl: "https://learn.microsoft.com/en-us/power-platform/important-changes-coming",
  accessTier: "FREE",

  howItWorks:
    "You sign in at make.powerautomate.com and open the flow designer. You choose a **trigger** — the \"when\", the event that starts an automation — then add the steps that should follow, picking each from a menu and filling in its boxes. Nothing runs until you test it with real data and switch it on.",

  whatItIs: [
    "Power Automate is Microsoft's tool for making the apps at work hand things to each other without you in the middle. It watches for something — an email arriving, a form being submitted, a file landing in a folder — and then does the next thing itself.",
    "What separates it from the other automation platforms is where it comes from. It is part of Microsoft 365, so for a great many office workers it is already paid for and already sitting in the app launcher next to Outlook and Teams, rather than being something you go out and buy.",
    "That inheritance sets its shape. It is strongest on Microsoft's own apps and reaches everything else through **connectors** — Microsoft's ready-made links to other services, published as a catalogue that currently runs to well over a thousand entries. It also has a separate Windows-only companion program that drives ordinary desktop software by recording and replaying what you click, for the programs that have no connector at all.",
  ],

  beforeYouStart: [
    "**What decides whether you can use Power Automate is your email address, not your experience.** Microsoft ended support for personal Microsoft accounts here on 26 July 2025: after that date accounts like gmail.com and outlook.com cannot sign into the Power Automate portal or create, edit or manage flows, and Microsoft's notice says the cloud flows attached to those accounts were deleted. A work or school Microsoft account is the way in. If you do not have one, Zapier and Make in this same category both take a personal address on day one.",
    "If your employer gives you Microsoft 365, a first automation usually costs nothing extra. Those licences carry limited Power Automate rights: flows built on Microsoft's \"standard\" connectors — Outlook, SharePoint, Teams, OneDrive for Business, Excel Online, Forms, Approvals — metered at around 6,000 actions per user per day. The paywall begins at the connector list, not at the number of flows. Salesforce, SQL Server, Jira, DocuSign, Amazon S3 and a plain web request are all classed premium, and reaching any of them needs Power Automate Premium, currently listed at about $15 per user per month paid yearly. Microsoft's own note on that price is that it is \"for marketing purposes only\" and varies by country and agreement, so treat it as the shape rather than the invoice.",
    "Two things your IT administrator controls, and neither is visible until you hit it. Administrators set data policies that decide which connectors may be used, and Microsoft's documentation says that when a policy changes a background job scans active flows and suspends the ones that violate it — an automation that worked yesterday can be stopped without you touching it. Separately, if your organisation runs in Europe, Canada or most regions outside the US, UK, Australia and India, the Copilot box that drafts a flow from a sentence only appears once an admin has switched on data movement for generative AI features.",
    "The desktop recorder is a separate download and a separate world. Microsoft's requirements page lists Windows 10, Windows 11 and Windows Server 2016-2025, rules out machines with ARM processors, and offers no macOS or Linux version. On Windows Home editions you can build and run recordings on your own machine but cannot trigger them from the cloud. Work and school accounts also need a Dataverse database provisioned in their default environment before desktop flows can be created at all — that is an administrator's job, not yours, and worth asking about before you install anything.",
  ],

  security: [
    {
      kind: "text",
      text: "Most automation tools answer only to you. Power Automate answers to your employer as well: a flow you build on a work account lives inside your organisation's Microsoft account, alongside its Outlook and Teams, where IT administrators can see it and set the rules it runs under.",
    },
    {
      kind: "list",
      label: "What that means in practice:",
      items: [
        "**Your automations are not private work.** They sit in the same place your IT department manages the rest of Microsoft 365 from, and they are visible and manageable there. Build accordingly.",
        "**A flow runs as you.** The connections it uses carry your work identity, so anything it sends, files, deletes or shares is attributed to you and can reach whatever you can reach. Point a new flow at a test folder and a test mailbox and watch one real run before you aim it at anything shared.",
        "**What you type into the Copilot box is handled under Microsoft's own terms, not a general AI policy.** Microsoft's published position, as of September 2026, is that prompts and responses stay within its cloud and are not used to train its AI models unless your organisation opts in to sharing them.",
        "**Don't bridge your personal accounts into a work flow.** A private Gmail or Dropbox connected from a work automation becomes a permanent two-way route between your own accounts and your employer's systems, and it is your work account that will be audited.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Joining up the Microsoft apps your workplace already runs — Outlook, SharePoint, Teams, OneDrive, Excel, Forms — without buying anything new.",
      "Approvals: sending a request out and holding the rest of the flow until someone answers, with the request arriving in Teams or Outlook where your colleagues already are.",
      "Driving old Windows software that has no web connection at all, by recording what you click and replaying it.",
    ],
    okayAt: [
      "Anything outside Microsoft's own apps. The connectors exist, but the ones people ask for first — Salesforce, SQL Server, Jira, DocuSign — are classed premium, so \"it supports that app\" and \"your licence can run it\" are two different claims.",
      "Being picked up quickly. The designer is click-through, but the first time a flow needs a condition, a loop or a date in a different format you are writing expressions in a formula language, and the page you land on assumes you already know it.",
    ],
    avoid: [
      "Treating the connector catalogue as the entitlement list. A connector's presence on Microsoft's published list tells you it exists, not that your licence may trigger it — that answer lives in the licensing plan table, and the two documents read very differently.",
      "Building your one critical automation around the mobile app. Microsoft deprecated the Power Automate app for iOS and Android effective 31 August 2026 and removed it from both stores; push notifications sent by flows and the home-screen \"run a flow\" widget stopped working with it.",
      "Planning to hand a flow to a colleague if you are on the standalone Power Automate Free licence rather than the rights that come with Microsoft 365. Microsoft's licensing documentation states flatly that you can't share flows on the Free licence, so the automation you build for the team stays yours alone.",
    ],
  },

  starterActions: [
    {
      title: "Never lose an email attachment again",
      whatItDoes:
        "When an email arrives with an attachment → then save the file to a OneDrive folder and mark the message as read.",
      whyHere:
        "Outlook, OneDrive for Business and SharePoint are all on Microsoft's standard connector list, so this flow runs on the Microsoft 365 licence your employer already pays for — no separate automation subscription, no monthly task bundle to spend down. Put Zapier in that sentence and it stops being true: there the same three steps are metered against a plan you buy on top.",
      tweak:
        "There is a box on the Power Automate home page that will draft a flow from a sentence you type — \"when I get an email with an attachment, save it to OneDrive\" — and show you the trigger and steps before anything is built. It works on an ordinary Microsoft 365 licence, but outside the US, UK, Australia and India an administrator has to have allowed data movement for generative AI features first. If the box isn't there, that is usually why.",
    },
    {
      title: "Turn a form into a row and a nudge",
      whatItDoes:
        "When someone submits a Microsoft Form → then add a row to an Excel file and post a note in a Teams channel.",
      whyHere:
        "Three apps, one sign-in. Forms, Excel Online (Business) and Teams normally authorise off the same work identity you are already signed in with, so there is usually nothing to connect before you start building. On Zapier each of the three is its own app connection you grant, name and later have to remember to revoke.",
    },
    {
      title: "Send yourself one summary instead of forty alerts",
      whatItDoes:
        "Every Monday at 8am → then gather last week's rows from a SharePoint list and email yourself a single digest.",
      whyHere:
        "The Power Automate rights inside Microsoft 365 are metered at around 6,000 actions per user per day rather than as a monthly bundle, so a weekly digest costs you nothing you would ever notice. On Zapier's free plan the same job draws down a monthly task allowance you also want for everything else you build that month.",
    },
    {
      title: "Automate the program that has no internet in it",
      whatItDoes:
        "When you start it yourself → then the desktop recorder opens a Windows program, copies the figures out and types them into a spreadsheet.",
      whyHere:
        "Zapier reaches an app through its web interface. Power Automate for desktop reaches it through the screen, clicking and typing like a person would, which is why a twenty-year-old Windows program with no web address at all is still automatable here. It is a separate Windows-only download, and Microsoft's requirements page lists Windows 10, 11 and Windows Server, rules out ARM machines, and offers no macOS or Linux version.",
      tweak:
        "Record the task once at normal speed and then read the list of steps it produced. That list, not the recording, is the thing you edit.",
    },
  ],

  pitfalls: [
    "**Saving is close to switching on.** An automated flow generally starts listening as soon as you save it, so the gap between \"I was just trying this\" and \"it fired on a live mailbox\" is one click. Run the test, watch one real execution end to end, then leave it.",
    "**A trigger that fires on every item really will fire on every item.** Point one at a busy shared mailbox and you get a run per message, each one drawing on your daily action allowance. Put the condition in before you switch it on, not after you've read the run history.",
    "**The desktop recorder watches the screen, not the program.** When the software it drives gets a new layout, the recording stops matching what it expects — usually the morning after an update nobody told you about. Anything built this way needs a person who notices when it goes quiet.",
    "**Two Microsoft pages will tell you two different things about the free plan.** The pricing page currently advertises a 30-day trial, while the licensing documentation still describes an ongoing Power Automate Free licence and even says personal accounts can use it — which the July 2025 deprecation notice contradicts. Where they disagree, the deprecation notice is the dated one and the sign-in screen you actually see is the final word.",
  ],

  whereToNext: [
    { label: "Workflow & Automation", categorySlug: "workflow-automation" },
    { label: "AI Plugins for Business Software", categorySlug: "ai-plugins-business-software" },
  ],
};
