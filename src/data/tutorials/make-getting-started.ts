import type { PlatformTutorialData } from "./types";

export const makeTutorial: PlatformTutorialData = {
  slug: "make-getting-started",
  platformSlug: "make-integromat",
  title: "Getting Started with Make",
  tagline: `Visual automation that connects your apps — and a meter that counts differently from its best-known rival.`,
  archetype: "recipes",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://www.make.com/en/help/release-notes",
  accessTier: "FREE",

  howItWorks: `Make connects apps so that something happening in one causes something to happen in another. You build these connections on a visual canvas, dragging modules onto it and drawing the path between them. A scenario starts with a trigger — a new form response, an incoming email — and then runs each module in turn. Every module that runs consumes one credit, which is the detail that governs both what you can build and what it costs.`,

  whatItIs: [
    `A no-code automation platform connecting thousands of apps through a visual builder.`,
    `Best suited to workflows with real logic — branches, filters, loops — rather than simple two-app connections.`,
    `Priced by credits consumed rather than by workflow count, with a free tier sufficient for learning.`,
    `A direct alternative to other automation platforms, with a **materially different billing model** that changes which one is cheaper for your specific work.`,
  ],

  beforeYouStart: [
    `The free plan gives 1,000 credits a month, two active scenarios, and a fifteen-minute minimum gap between runs. Enough to learn on; not enough to depend on.`,
    `Paid plans begin around $9 a month for 10,000 credits, which also removes the scenario cap and drops the minimum interval to one minute.`,
    `**Every module execution costs one credit, not every workflow run.** A ten-step scenario running a hundred times spends a thousand credits.`,
    `Since 2025-08-27 the meter has been called credits rather than operations, and AI features and code execution consume more per use than ordinary modules.`,
    `Sketch your workflow on paper first. Counting the modules before you build tells you the monthly cost before you commit.`,
  ],

  security: [
    {
      kind: "text",
      text: `Automation platforms carry a different risk from assistants: you are handing over **standing access to your accounts**, not a single conversation. Connecting a scenario to your email, files, or customer records grants a persistent permission that keeps working while you are asleep, and keeps working after you have forgotten the scenario exists.`,
    },
    {
      kind: "list",
      label: "Sensible practice",
      items: [
        `Connect the narrowest account you can. A dedicated account with access to one folder beats your primary login.`,
        `Review your connected accounts periodically and revoke anything belonging to a scenario you no longer run.`,
        `Test with harmless sample data before pointing a scenario at anything real. Automations fail in bulk, and quickly.`,
        `Be deliberate about scenarios that delete, send, or overwrite. Those are the ones where a mistake is not recoverable.`,
      ],
    },
    {
      kind: "text",
      text: `Data passing through a scenario is processed on the platform's servers, so a workflow moving personal or customer information puts that data in a third party's hands. That is often perfectly acceptable — it is the same trade as any cloud tool — but it should be a decision you made rather than one you discovered.`,
    },
  ],

  triad: {
    bestAt: [
      `Multi-step workflows with conditional branching and filtering`,
      `Reshaping data between apps that do not agree on format`,
      `Scheduled jobs that gather from several sources`,
      `Work where seeing the flow laid out visually helps you reason about it`,
    ],
    okayAt: [
      `Simple two-app connections, which work but where simpler tools have less setup`,
      `Real-time responsiveness, which is constrained on lower tiers`,
      `Error handling, which is capable but needs deliberate configuration`,
    ],
    avoid: [
      `Anything where a silent failure would go unnoticed and matter`,
      `High-volume record processing on a small plan, where credits vanish fast`,
      `Automating a process you have not yet done manually enough times to understand`,
    ],
  },

  starterActions: [
    {
      title: "Count the modules before you build",
      whatItDoes: `Estimates monthly credit use as records times modules times runs.`,
      whyHere: `This one calculation prevents the most common and most expensive misunderstanding on the platform.`,
      tweak: `If the number surprises you, look for modules to remove rather than a bigger plan to buy.`,
    },
    {
      title: "Automate a form-to-spreadsheet flow first",
      whyHere: `Few modules, obvious success criterion, and it exercises the trigger-and-action pattern everything else builds on.`,
      tweak: `Add a filter so only some submissions pass through. Filters are where Make starts to be worth its complexity.`,
    },
    {
      title: "Build a scheduled digest",
      whatItDoes: `Gathers from a source on a schedule and sends one summary rather than many alerts.`,
      whyHere: `Teaches scheduling and aggregation together, and produces something you will actually keep using.`,
      tweak: `Lengthen the interval before shortening it — frequent runs are the fastest way to burn credits.`,
    },
    {
      title: "Run a scenario once manually and read every step",
      whyHere: `The execution view shows exactly what data each module received and emitted. It is the debugging skill the platform rewards most.`,
      tweak: `Do this while it works, not only when it breaks. Knowing what correct looks like makes broken obvious.`,
    },
  ],

  pitfalls: [
    `**Credits count modules, not runs.** A ten-step scenario running a hundred times costs a thousand credits, not a hundred. Budget by multiplying steps by runs, not by counting workflows.`,
    `**Comparisons with other platforms are not like for like.** Rival tools meter differently, so one of their units can equal several credits here. The cheaper platform depends on your workflow shape — benchmark your own before switching.`,
    `**AI modules cost more per use.** Anything invoking a model or running code consumes credits at a higher rate than ordinary modules. A workflow that looked affordable can double when you add one.`,
    `**Connected accounts are standing permissions.** A scenario keeps its access until you revoke it, including scenarios you stopped using months ago. Audit connections periodically.`,
    `**Broken automations fail quietly.** Something that silently stopped running two weeks ago is worse than something that never worked. Build in a notification for failure, not just success.`,
  ],

  whereToNext: [
    { label: "Other automation platforms", categorySlug: "workflow-automation" },
    { label: "AI inside business software", categorySlug: "ai-plugins-business-software" },
  ],
};
