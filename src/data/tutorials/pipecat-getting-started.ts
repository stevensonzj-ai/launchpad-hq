import type { PlatformTutorialData } from "./types";

export const pipecatTutorial: PlatformTutorialData = {
  slug: "pipecat-getting-started",
  platformSlug: "pipecat",
  title: "Getting Started with Pipecat",
  tagline:
    "A free, open-source Python framework for building voice AI agents you can talk to, with a quickstart that runs on your own computer.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-11-02",
  changelogUrl: "https://github.com/pipecat-ai/pipecat/releases",
  accessTier: "FREE",

  howItWorks:
    "You create a small Python project with one command and add three provider keys: one for speech-to-text, one for the AI model and one for text-to-speech. You start the bot on your computer and open a web page it serves. You click Connect, talk, and the bot answers out loud.",

  whatItIs: [
    "Pipecat is an **open-source framework**, a free toolkit of code, for building voice and multimodal AI agents: software you can talk to that answers in speech. It is written in Python and runs wherever Python runs. Its site describes it as the most widely used open-source ecosystem for this, which is the project's own claim.",
    "It does not include a voice, a transcriber or an AI model of its own. It connects the services you choose for each job, drawn from more than 200 integrated providers, and handles the live conversation around them: interruptions, working out when you have finished speaking, and remembering the conversation so far. It can connect over WebRTC, SIP or ordinary phone lines (PSTN).",
    "Pipecat is maintained by Daily. On 29 October 2026 Deepgram announced that it is acquiring Daily, and both companies say Pipecat stays open source and free under its existing BSD license, with an independent Pipecat Foundation. As of 2 November 2026 that deal is announced, not completed, and no Pipecat Foundation page exists yet.",
  ],

  beforeYouStart: [
    "This is a tool for people who write code. The quickstart needs **Python 3.11 or newer** and a Python tool called **uv**, and it asks you to type commands in a terminal, the text window where you give your computer written instructions. If you have never done that, Pipecat is probably not the place to start.",
    "Pipecat itself costs nothing, but the services it connects to are separate accounts. The quickstart uses three: Deepgram for speech-to-text, OpenAI for the AI model and Cartesia for text-to-speech. You need an **API key** from each, a long password that lets your project use that company's service and bills your account. Each provider charges in its own way, so check each one's own pricing page before you leave a bot running.",
    "Hosting is the optional paid part. Pipecat Cloud, run by Daily, runs your agent for you and is priced per active minute: the smallest size is {{price:pipecat:Pipecat Cloud agent-1x}} while the agent is in a session, with a lower rate while capacity is reserved and larger sizes costing more. Voice over Daily's WebRTC transport is free for one-to-one sessions there, and phone calls and recordings cost extra. Running Pipecat yourself needs none of this.",
    "If you would rather not code at all, Vapi and Retell AI are hosted voice-agent platforms in the same part of the catalog.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Pipecat's own documentation at docs.pipecat.ai and its code at github.com/pipecat-ai/pipecat. Follow the quickstart there rather than a copied command from a forum post.",
    body: [
      "The quickstart's commands are `uv tool install \"pipecat-ai[cli]\"`, then `pipecat init quickstart`, then `cd pipecat-quickstart`. Run them in a folder you made for this project.",
      "Copy the example settings file with `cp .env.example .env` and put your three keys in `.env`. Anyone who gets your keys can run up bills on your provider accounts, so keep that file out of anything you upload or share.",
      "Run `uv sync`, then `uv run bot.py`. Open http://localhost:7860/client in your browser and click Connect. Startup can take around 20 seconds the first time.",
      "That conversation working is your \"set up correctly\" checkpoint.",
    ],
    vendorDocsUrl: "https://docs.pipecat.ai/getting-started/quickstart",
  },

  security: [
    {
      kind: "text",
      text: "Where your voice goes depends on how you run Pipecat and which providers you connect.",
    },
    {
      kind: "list",
      label: "What to know before you point it at real conversations",
      items: [
        "Run on your own computer, Pipecat is code you control. Your speech and the conversation still go to the speech, language and voice providers you chose, each under its own policy. Read those policies, not Pipecat's.",
        "A voice agent listens through a microphone. Tell anyone you record or transcribe, and check the rules where you live before using it on phone calls.",
        "Pipecat Cloud is hosted by Daily. This guide did not review how Daily handles data there, so read its terms before putting customer calls through it.",
        "Your provider keys live in `.env`. Treat that file like a password, and rotate a key at the provider if it leaks.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Building a voice agent you control end to end, choosing a different speech, language or voice service for each part and swapping one later",
      "Natural back-and-forth conversation: it handles interruptions and turn detection for you",
      "Reaching people over a web page, an app or a phone call with the same agent",
    ],
    okayAt: [
      "Getting started if you are new to Python. The quickstart is short, but it assumes you can use a terminal and manage API keys.",
      "Predicting cost. Your bill is spread across several provider accounts, plus hosting if you choose it.",
    ],
    avoid: [
      "Expecting a finished voice assistant out of the box. It is a toolkit, and you write the bot.",
      "Leaving a running bot connected to paid provider accounts without checking each one's usage",
    ],
  },

  starterActions: [
    {
      title: "Get the prerequisites and three keys ready",
      whatItDoes:
        "Check that Python 3.11 or newer and uv are installed, then create accounts and API keys at Deepgram, OpenAI and Cartesia.",
      whyHere:
        "The quickstart bot uses all three, and it will not start until each key is in place. Doing this first means the install steps run in one go.",
    },
    {
      title: "Create the quickstart project",
      whatItDoes:
        "Run `uv tool install \"pipecat-ai[cli]\"`, then `pipecat init quickstart`, and move into the new `pipecat-quickstart` folder.",
      whyHere:
        "Pipecat's command-line tool builds a working example bot for you, so you start from something that runs instead of a blank file.",
    },
    {
      title: "Add your keys and talk to it",
      whatItDoes:
        "Copy `.env.example` to `.env`, add your keys, run `uv sync` and `uv run bot.py`, then open http://localhost:7860/client and click Connect.",
      whyHere:
        "A first spoken exchange shows whether the speech, language and voice services work together before you change anything, and tells you how it feels to talk to.",
      tweak: "Wait about 20 seconds on the first start before assuming something is wrong.",
    },
    {
      title: "Optional: deploy it to Pipecat Cloud",
      whatItDoes:
        "Run `pipecat cloud auth login`, then `pipecat cloud secrets set pipecat-quickstart-secrets --file .env`, then `pipecat cloud deploy`.",
      whyHere:
        "This moves the same bot onto Daily's hosting so it is not tied to your laptop. It is the paid route, so try it only after the local version works.",
    },
  ],

  pitfalls: [
    "**Three separate bills.** Speech-to-text, the AI model and text-to-speech each charge on their own account. A long test conversation spends money in three places.",
    "**Provider choices are yours.** The quickstart's three services are an example. Pipecat lets you swap them, but a swap means a new key and a new bill.",
    "**A fast-moving project.** Pipecat is updated often, so commands and file names can change between versions. If this guide does not match what you see, check the quickstart and the releases page.",
    "**Ownership is in transition.** Deepgram's acquisition of Daily is announced, not completed, and the Pipecat Foundation does not have a page yet. Both companies say the license and the open-source status stay the same.",
  ],

  whereToNext: [
    { label: "Deepgram, one of the quickstart's providers", href: "/platform/deepgram" },
    { label: "More AI APIs & developer services", categorySlug: "ai-apis-developer-services" },
    { label: "Local & open-source AI", categorySlug: "local-open-source-ai" },
  ],
};
