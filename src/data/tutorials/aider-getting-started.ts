import type { PlatformTutorialData } from "./types";

export const aiderTutorial: PlatformTutorialData = {
  slug: "aider-getting-started",
  platformSlug: "aider",
  title: "Getting Started with Aider",
  tagline:
    "Free software with no AI inside it. Aider works in your terminal, edits the files you name, and commits each change — using an AI service you sign up and pay for separately.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://aider.chat/HISTORY.html",
  accessTier: "FREE",

  howItWorks:
    "You open a **terminal** — a text window where you type instructions instead of clicking — in your project's folder, start Aider, and name the files you want changed. You describe the change in plain English; it edits those files and saves the result. You read what it did, then ask for the next change.",

  whatItIs: [
    "Aider installs on your own computer and edits the files of a coding project you already have. Its code is public for anyone to inspect.",
    "It contains no AI of its own. You point it at somebody else's AI service — a dozen or so are documented, from OpenAI and Anthropic to a model running on your own machine — using an **API key**, a password that identifies your app and that spends your money.",
    "Development has slowed considerably. The last packaged release was February 2026, the last change to the code was May 2026, and the homepage still recommends AI models from early 2025. It works and it is not abandoned, but it is not moving quickly either.",
  ],

  beforeYouStart: [
    "The gate here is your starting position, not the install. Aider expects a project already on your computer, kept in **Git** — which tracks a folder of code so you can see and undo every change — and you drive it by typing. Not there yet? The AI coding tools category on this site has applications you click instead, Cursor and GitHub Copilot among them.",
    "Aider is free; the AI is not. You pay a model provider by usage, and the cost follows how much code is in the conversation rather than how many questions you ask.",
    "A genuinely free route exists: Aider's documentation points to OpenRouter's free models, capped by daily usage, and to running a model on your own computer through Ollama. The same documentation warns that Aider works poorly with weaker models, so treat that route as a way to try it rather than the finished setup.",
    "Choose your model yourself. The release you install predates the current lineup, so pointing it at a very new one can print \"Unknown context window size and costs, using sane defaults\" — harmless, but it means Aider cannot tell you what you are spending.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Install only from aider.chat's own instructions. Aider is a Python program published as the package `aider-chat`. Lookalike package names are a known trick — copy the command from the docs, not from a blog post or a video.",
    body: [
      "Run it the first time on work you have already saved, or on a copy you can throw away.",
    ],
    vendorDocsUrl: "https://aider.chat/docs/install.html",
  },

  security: [
    {
      kind: "text",
      text: "Aider has no servers of its own. It runs on your computer and sends your code to whichever AI service you supplied a key for, which means the privacy question here is one you answer rather than one the vendor answers for you. Pointed at a cloud provider, your code goes to that company under that company's terms. Pointed at a model running on your own machine, nothing leaves it.",
    },
    {
      kind: "list",
      label: "Worth settling before you point it at anything real",
      items: [
        "It sends more than the files you named — it also builds and sends a compact map of the whole project. An `.aiderignore` file and the `--subtree-only` option limit that.",
        "Its own usage analytics are opt-in and, its documentation states, never include your code, prompts, chats or keys. `aider --analytics-disable` ends them permanently.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Changes to files you can name",
      "Working inside a project that already exists, rather than starting one from nothing",
      "Leaving a reviewable trail — each edit is its own commit, with a written message",
    ],
    okayAt: [
      "Large codebases, where its map of the project crowds out the code you want it reading",
      "Telling you what it is spending, which it can only do for models it has cost data for",
    ],
    avoid: [
      "Running it over work you have not saved — it commits as it goes, and that history is your undo button",
      "Learning to code with it, because it writes and commits in one motion and the review it hands back assumes you can read a diff",
    ],
  },

  starterActions: [
    {
      title: "Ask before you let it edit",
      prompt:
        "/ask What does this project do, and which files would need to change to add a \"remember me\" option to the login?",
      whyHere:
        "Aider commits its edits as it makes them, so nothing sits in your editor waiting to be accepted the way Cursor's changes do. `/ask` is the one mode where nothing is written.",
      tweak: "Stay in `/ask` for the whole plan, then say \"go ahead\".",
    },
    {
      title: "Hand it one change, in files you chose",
      prompt:
        "Add validation to this form so an empty name is rejected, and match the error style already used in this file.",
      whyHere:
        "It only edits files you have added to the chat, and its own tips say extra files \"distract and confuse\" the model and raise your bill. Claude Code goes and finds its own files; here the choice is yours, and it is your main lever on both quality and cost.",
      tweak:
        "`/drop` a file when it is done and `/add` the next one. Keeping the set small is the technique.",
    },
    {
      title: "Undo something it did",
      prompt: "/undo",
      whyHere:
        "`/undo` reverses the last commit only if Aider made it, and the \"(aider)\" it writes into the commit author is what makes that distinction possible. Worth doing once on purpose, before you need it.",
      tweak: "It steps back one commit, not back to the start.",
    },
    {
      title: "Leave it an instruction inside your code",
      prompt: "# handle the case where this list is empty AI!",
      whyHere:
        "Started with `--watch-files`, Aider watches your files and acts on any comment ending in `AI!`, then goes back to waiting — so you steer it from whatever editor you already have open, not only from ones a plugin supports, as GitHub Copilot does.",
      tweak: "End the comment with `AI?` instead and it answers rather than edits.",
    },
  ],

  pitfalls: [
    "Many files and a long session is the expensive shape.",
    "It commits as it goes — a session you were not watching leaves a run of commits you now have to read.",
    "A weak free model is the fastest route to a bad first impression, and Aider's docs say as much. Suspect the model before the tool.",
  ],

  whereToNext: [
    { label: "More AI coding tools", categorySlug: "ai-coding-development" },
    { label: "Run AI on your own computer", categorySlug: "local-open-source-ai" },
    { label: "Model APIs and keys", categorySlug: "ai-apis-developer-services" },
  ],
};
