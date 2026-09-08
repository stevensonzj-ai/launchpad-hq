import type { PlatformTutorialData } from "./types";

export const amazonQDeveloperTutorial: PlatformTutorialData = {
  slug: "amazon-q-developer-getting-started",
  platformSlug: "amazon-q-developer",
  title: "Getting Started with Amazon Q Developer",
  tagline:
    "Amazon's assistant for AWS — still live in the console, but closed to new coding-tool signups.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl:
    "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/doc-history.html",
  accessTier: "FREE",

  howItWorks:
    "You sign in to the AWS website, click the hexagonal Q icon in the top corner, and type your question into the panel that slides out. It answers in plain language, you ask follow-ups in the same panel, and it keeps the thread of the conversation as you go.",

  whatItIs: [
    "Amazon Q Developer is the AI assistant Amazon built into Amazon Web Services (AWS) — the cloud platform a large share of the internet runs on. It answers questions about AWS itself: what a service does, why a setting won't save, what a charge on your bill is for.",
    "It absorbed Amazon CodeWhisperer, Amazon's earlier code-suggestion tool, in April 2024. If you land on a CodeWhisperer tutorial, this is where that product went.",
    "Read this part before you start: the half of Q Developer that lived inside code editors is being retired. AWS stopped taking new signups for it on May 15, 2026 and ends support on April 30, 2027; the replacement is a separate AWS product, Kiro, at kiro.dev. What is still open to a newcomer is the assistant inside the AWS console and documentation, which AWS says the shutdown does not affect. That is what this page covers.",
  ],

  beforeYouStart: [
    "**This is for people using AWS, not a general assistant.** AWS builds and sells it to answer questions about AWS and about your own account; nothing about it is offered as a general chatbot, so don't judge it as one.",
    "You need a free AWS account, and creating one means giving AWS a payment method it can validate and passing an automated phone verification call. The assistant itself costs nothing at the Free Tier level.",
    "There is nothing to install — the assistant is the hexagonal Q icon on the AWS console and on AWS documentation pages. The paid tier (Pro, currently around $19 per user per month) is shut to newcomers, so the free level is all you get.",
    "Skip the code-editor add-ons: new accounts can no longer sign in to them. If an AI coding tool is what you actually want, try kiro.dev or one of the coding tools linked at the bottom of this page.",
  ],

  security: [
    {
      kind: "text",
      text: "Anything you type here is a conversation with Amazon about your account. On the Free Tier, AWS's own documentation says your questions and its answers may be stored and used for service improvement, including model training. The documented way to switch that off is an AWS Organizations opt-out policy — an administrator setting, not a checkbox in your profile. On a personal account, assume your conversations are used.",
    },
    {
      kind: "list",
      label: "Keep out of the chat panel",
      items: [
        "Access keys, secret keys and passwords — it never needs them to answer a question",
        "Customer or employee records you keep in AWS",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Explaining an AWS service in plain language while you are looking at it",
      "Turning a console error message into what it means and what to click next",
      "Turning a question it can't answer into an AWS support case",
    ],
    okayAt: [
      "Anything not about AWS — it will try, but that isn't what it is for",
      "Questions about your own resources — what it can see there is bounded by your AWS permissions",
    ],
    avoid: [
      "Building any habit on the code-editor add-ons — new accounts cannot sign in to them at all, and the whole add-on line is on a countdown to end of support.",
      "Treating a free-tier conversation as private: Amazon's documentation says free-tier questions and answers may be used for model training, and the opt-out is an organisation-level policy, not a personal setting.",
    ],
  },

  starterActions: [
    {
      title: "The service explainer",
      prompt:
        "I'm new to AWS. Explain what S3 is, what problem it solves, and the three things beginners most often get wrong about it. Keep it under 200 words.",
      whyHere:
        "Ask it with the S3 console open and Q answers for the service and region you are in — AWS shipped that console-context awareness in November 2024. A chatbot in another tab explains S3 just as well but has no idea which of your screens is on fire.",
      tweak:
        "Swap S3 for whichever service the tutorial you are following just told you to open.",
    },
    {
      title: "The error translator",
      prompt:
        "I got this error in the console: \"[paste the exact message]\". Explain what it means, what usually causes it, and how to fix it from where I am.",
      whyHere:
        "The panel opens on top of the page that failed, so the service, the region and the error are already in front of it — you paste one line instead of rebuilding the situation in another tab.",
      tweak:
        "If the fix needs a setting you can't find, ask \"where exactly in the console is that option?\"",
    },
    {
      title: "The bill question",
      prompt:
        "I'm being charged for [service] and I don't know why. Explain what usually causes that charge and what I'd change to stop it. If you can't tell from here, open a support case for me.",
      whyHere:
        "Q is the front door to AWS Support inside the console: AWS documents opening a support case and reaching a live agent as things you can just ask for, so a question it can't answer becomes a ticket rather than a dead end.",
      tweak:
        "When an answer is going nowhere, ask \"can you connect me with a person?\"",
    },
  ],

  pitfalls: [
    "AWS's own marketing pages have not caught up. The product page still shows \"Get started for free\" with download buttons and says nothing about the May 15, 2026 signup cutoff, which appears only in an AWS blog post and the documentation. If a download leads you to a sign-in you can't complete, this is why.",
    "\"Amazon Q\" is several products: Q Developer, this one, answers about AWS; Amazon Q Business answers about a company's internal documents; and another version lives in Slack and Microsoft Teams. Tutorials rarely say which they mean.",
  ],

  whereToNext: [
    { label: "AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Developer APIs and services", categorySlug: "ai-apis-developer-services" },
    { label: "General AI chatbots", categorySlug: "text-conversational-ai" },
  ],
};
