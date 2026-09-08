import type { PlatformTutorialData } from "./types";

export const clarifaiTutorial: PlatformTutorialData = {
  slug: "clarifai-getting-started",
  platformSlug: "clarifai",
  title: "Getting Started with Clarifai",
  tagline:
    "Browse and test AI models in one browser tab, then call the same one from your own code — free to start, no credit card, and it can put a cloud address in front of a model running on your own machine.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-08",
  changelogUrl: "https://docs.clarifai.com/product-updates/changelog/",
  accessTier: "FREE",

  howItWorks:
    "You sign in, browse a library of AI **models** (the AI \"brain\" that does the actual thinking), open one in a browser chat box, type a question, and the reply streams back. When you want that same model inside your own software, the site hands you a ready-made code snippet for the exact model you just tried.",

  whatItIs: [
    "Clarifai is a catalogue of AI models with a control panel wrapped around it. You search the library, test a model in the browser, and — if you want — call that same model from your own software through an **API** (a way for programs to talk to each other without a person clicking).",
    "It started in 2013 doing image recognition, and that is still the part it does best. The newer work is about *where* a model runs — Clarifai's servers, a cloud you rent, or your own hardware — rather than about building the models themselves.",
    "**One thing to know before you invest time in it.** In May 2026 Nebius announced it had hired Clarifai's founder and core engineering team and licensed Clarifai's inference technology. Clarifai's older image models and its government work were explicitly excluded from that deal and stayed with the company; the site, the docs and signup all work normally today. But the newest dated release note in Clarifai's own changelog is 12.4, from 7 May 2026. Check that date yourself before you build anything on it — the changelog link is at the top of this page.",
  ],

  beforeYouStart: [
    "**Open the changelog before you open the signup page.** If it still says May 2026 when you read this, treat Clarifai as a good place to learn what a model platform is and to evaluate models — and think hard before making it something your work depends on.",
    "Free genuinely means free here. Signup asks for no credit card and the Community plan currently includes around 1,000 operations a month. It is a monthly allowance that refills, not a trial credit that runs out — but it is one shared meter, and predictions, training and stored files all draw on it.",
    "There is nothing to install to begin. Your first hour is a browser tab. A command-line tool only enters the picture if you decide to try Local Runners, which is the last step on this page and entirely optional.",
    "Clarifai is a developer platform, not a chatbot. There is no assistant that remembers you, no conversation history, no mobile app worth having. If what you want is something to ask questions of, start in Text & Conversational AI and come back here when you want to see how models actually get served.",
  ],

  security: [
    {
      kind: "text",
      text: "Clarifai's documentation is unusually direct about the question everyone asks: it states that it does not use your private data to train its models or any other model on the platform unless you explicitly choose to share your inputs and annotations with the Community. So the thing that decides your privacy here is not what you type — it is one visibility setting, and whether you left it alone.",
    },
    {
      kind: "list",
      label: "What that means in practice",
      items: [
        "Sharing to the Community is a licence, not a preference. Clarifai's terms say that by making a repository public you grant every other user a worldwide licence to use and display that content, and grant Clarifai a perpetual, irrevocable right to it. Read that clause before you publish a model or a dataset, not after.",
        "Clarifai calls its credential a PAT. It is an **API key** (a password that identifies your app, and that spends your money), and it draws on your monthly operations. Keep it out of screenshots, public code and chat messages, and delete and regenerate it the moment you think someone has seen it.",
        "If you try a Local Runner, check whether it is private. Release 12.4 changed the default to private, but the command still accepts a public flag — and \"public\" here means a public web address pointing at software on your own computer.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Trying a lot of different models in one place, in a browser, without opening an account with each vendor separately",
      "Image and video recognition",
      "Keeping a model and its data on your own hardware while still reaching it through an ordinary cloud address",
    ],
    okayAt: [
      "Being someone's first AI tool. The browser Playground genuinely works without code, but everything surrounding it is built for engineers and reads that way.",
      "Free-tier headroom. Around 1,000 operations a month at one request per second is enough to evaluate the platform properly and not enough to run anything on.",
    ],
    avoid: [
      "Publishing anything to the Community before reading the licence you grant by doing it. Public content is licensed to every other user and, perpetually, to Clarifai.",
      "Treating the $1/month Developer price as the standing rate. The pricing page labels it a promotion, and the plan has no published non-promotional price.",
    ],
  },

  starterActions: [
    {
      title: "Test a model in the browser before you do anything else",
      whatItDoes:
        "Opens a model from the Community library in the Playground — a chat box in the browser — and runs it. No key, no install, no code.",
      whyHere:
        "Clarifai's free meter counts \"operations\", and predictions, training and stored files all come out of the same monthly allowance. Testing models in the browser is the cheapest thing you can spend it on; uploading a dataset is the most expensive. Doing it in this order means you find out whether the models suit you while the meter is still full.",
      tweak:
        "The Playground shows a generated code snippet for whichever model you are looking at. Ignore it for now — you will want it in step four.",
    },
    {
      title: "Run a picture through one of the recognition models",
      whatItDoes:
        "Uploads an image and returns labels for what is in it, using a model Clarifai trained itself rather than one it is reselling.",
      whyHere:
        "Image recognition is what Clarifai has done since 2013, and it is the one part of the company the Nebius agreement explicitly left alone — the announcement named Clarifai's legacy computer vision models among the things not included in the deal. If you want to see this platform at its most settled rather than its most uncertain, look here.",
      tweak:
        "Use a photo the model should find hard — bad light, an odd angle, something half hidden. Clean stock images tell you nothing about where it breaks.",
    },
    {
      title: "Optional: point a Clarifai address at a model on your own computer",
      whatItDoes:
        "Installs Clarifai's command-line tool and runs a single local-runner command, which gives a model running on your laptop a working Clarifai web address.",
      whyHere:
        "This inverts the usual arrangement. The model and the data stay on your hardware and Clarifai supplies only the address and the authentication in front of them — hosted services like Replicate cannot do this at all, because running everything on their own machines is what they are. The free plan includes one runner with about two hours of runtime, which is enough to watch it work; the $1/month Developer promotion is what removes the hour limit.",
      tweak:
        "This is the only step that needs a terminal, and nothing else on the page depends on it, so skipping it costs you nothing.",
    },
    {
      title: "Make one call from your own code",
      whatItDoes:
        "Takes the snippet the Playground generated, drops in a PAT created in your account's Security settings, and runs it once.",
      whyHere:
        "Clarifai's authentication has a specific trap its own docs had to publish a notice about: to call Clarifai's own models you need a PAT rather than an app-scoped key, and you have to pass the literal values `clarifai` and `main` as the user and app IDs instead of your own. Almost every \"my Clarifai key doesn't work\" is this, and knowing it beforehand saves you the hour.",
      tweak:
        "Create the PAT only when you have code to put it in. Everything above this step works without one.",
    },
  ],

  pitfalls: [
    "The free plan allows one request per second. You will never notice this clicking around in the browser, and you will hit it instantly the first time you call the API in a loop.",
    "Use a PAT, with `clarifai` and `main` as the user and app IDs — this changed in 2025 and a lot of older tutorials still show the old way.",
    "Don't confuse Clarifai with Nebius Token Factory. Nebius licensed Clarifai's inference technology in May 2026, so the two now describe overlapping capabilities in similar words, but they are separate products with separate accounts and separate bills.",
  ],

  whereToNext: [
    { label: "More AI APIs and developer services", categorySlug: "ai-apis-developer-services" },
    { label: "Running open models on your own machine", categorySlug: "local-open-source-ai" },
  ],
};
