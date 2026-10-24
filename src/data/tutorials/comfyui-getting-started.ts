import type { PlatformTutorialData } from "./types";

export const comfyuiTutorial: PlatformTutorialData = {
  slug: "comfyui-getting-started",
  platformSlug: "comfyui",
  title: "Getting Started with ComfyUI",
  tagline:
    "A free, open-source workbench for AI image, video and audio generation, where you wire the steps together like a flowchart — and run it on your own computer.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-10-23",
  changelogUrl: "https://docs.comfy.org/changelog",
  accessTier: "FREE",

  howItWorks:
    "You build a **workflow**: boxes called **nodes**, each doing one step — load a model, read your prompt, generate, save the image — joined by wires that pass the result along. You press Run, and your own graphics card does the work. Ready-made templates mean you rarely start from an empty canvas.",

  whatItIs: [
    "ComfyUI is a program for running generative AI models — the kind that make images, video and audio — with every step visible. Its docs describe it as a node-based interface and inference engine that is completely open source and can run on your own device. It is free, under the GNU GPL v3 licence.",
    "Where most image apps give you one prompt box, ComfyUI shows the whole recipe. A basic text-to-image workflow is a short chain: a node that loads a model, nodes that turn your positive and negative prompts into something the model understands, a **sampler** node that does the generating, and a node that saves the result. Change any box — the model, the size, the number of steps — and run again. That openness is why so many new open models get ComfyUI support first.",
    "Models are not included. You download them separately, often several gigabytes each, into ComfyUI's models folder. Built-in templates (sidebar → Templates) cover the models ComfyUI supports natively and tell you if a model they need is missing.",
    "There are two optional paid extras. **Partner Nodes** let a workflow call closed models from other companies, such as OpenAI or Kling, using prepaid Comfy credits. **Comfy Cloud** runs ComfyUI on Comfy's own graphics cards in your browser if your computer isn't up to it. You don't need either to use ComfyUI locally.",
  ],

  beforeYouStart: [
    "**Check your hardware first.** ComfyUI's docs list support for NVIDIA, AMD and Intel Arc graphics cards and Apple Silicon Macs; it can also run on a plain CPU, which the docs call slower. They don't publish a minimum amount of graphics memory (**VRAM**), but their beginner example says a small classic image model is about 4 GB and runs on a consumer card with around 6 GB of VRAM. Bigger, newer models need much more.",
    "**Pick an install.** The Desktop app (Windows, Apple Silicon Macs and Linux) is the beginner route and needs at least 4.85 GB of disk before models. Windows also has a portable build you unzip with 7-Zip, and advanced users can install manually with Python. Plan on tens of gigabytes of space once you collect a few models.",
    "**Local use costs nothing.** ComfyUI's credits page says ComfyUI is free for local use; credits only apply to Partner Nodes and Cloud. Partner Nodes show a price badge before you run them, and Comfy's docs say purchased credits are non-refundable. Comfy Cloud has subscription plans listed at comfy.org/pricing, starting at $20 a month ($16 a month billed yearly) for its Standard plan.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download ComfyUI only from comfy.org/download or the official Comfy-Org GitHub repository. On a Mac, macOS may ask you to click \"Open Anyway\" in Privacy & Security on first launch — that's expected for the genuine app, and a reason not to install a copy from anywhere else.",
    body: [
      "**Treat custom nodes as software you're installing.** ComfyUI's security policy says custom nodes are arbitrary Python code — they can do anything a program on your computer can. Its docs recommend installing only well-known nodes from trusted authors, through the built-in ComfyUI Manager, and avoiding obscure ones.",
      "**Keep it on your own machine.** ComfyUI only listens on your own computer by default. The `--listen` option opens it to your network, and the security policy says you're then responsible for securing it. Don't turn that on unless you know why you need it.",
      "**Confirm it works.** The default text-to-image workflow loads at launch; the Desktop app offers to download its starter model. Press Run (or Ctrl+Enter). An image appearing in the Save Image box means you're set up.",
    ],
    vendorDocsUrl: "https://docs.comfy.org/get_started/first_generation",
  },

  security: [
    {
      kind: "text",
      text: "Running locally is the privacy upside: prompts, images and models stay on your computer, and nothing is sent anywhere unless you use Partner Nodes or Comfy Cloud. Comfy's docs note you can turn Partner Nodes off entirely with a launch option, or run fully offline.",
    },
    {
      kind: "list",
      label: "Where the risk actually is:",
      items: [
        "**Custom nodes.** Most ComfyUI setups grow a collection of community add-ons. Each one is code with full access to your computer; stick to widely used ones and keep ComfyUI Manager's security setting at its default.",
        "**Shared workflows.** A workflow file someone posts may need custom nodes you don't have, and ComfyUI Manager will offer to install them all. Check what they are before clicking Install All.",
        "**Models from the internet.** Comfy's docs name Hugging Face, Civitai and GitHub as common sources. Download from the official model page where you can, and prefer the `.safetensors` files its examples use.",
        "**Your Comfy account.** If you buy credits, Comfy's docs warn that signing in from an insecure, network-exposed setup could let someone steal your login and spend them.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Running open image, video and audio models on your own hardware, privately and with no per-image cost.",
      "Seeing and controlling every step of a generation, then saving that exact recipe to reuse or share.",
      "Trying new open models quickly — ComfyUI tends to support them early through templates.",
    ],
    okayAt: [
      "Being beginner-friendly. Templates help a lot, but error messages assume you know what a checkpoint or a latent is.",
      "Running on modest hardware. Small models work on everyday graphics cards; the newest large models may not fit.",
    ],
    avoid: [
      "Installing every custom node a downloaded workflow asks for without checking what it is.",
      "Updating everything right before a project — Comfy's own docs warn updates can break custom nodes.",
    ],
  },

  starterActions: [
    {
      title: "Run the default workflow",
      whatItDoes:
        "Open ComfyUI, let it fetch the starter model if asked, type a short description in the positive prompt box, and press Run. Right-click the result to save it.",
      whyHere:
        "It proves your install and graphics card work, and every later workflow is a variation on this five-box chain.",
      tweak: "Change only the seed or the step count and run again, to see what each setting actually does.",
    },
    {
      title: "Open a template",
      whatItDoes:
        "Click Templates in the sidebar and open one for a different task, such as image editing or upscaling. If it flags missing models, let it download them.",
      whyHere:
        "Templates are maintained by Comfy and match the models ComfyUI supports, so they work without hunting for parts — the safest way to try something new.",
    },
    {
      title: "Recover a workflow from an image",
      whatItDoes:
        "Drag a PNG that ComfyUI saved back onto the canvas. The whole workflow that made it, settings included, reappears.",
      whyHere:
        "ComfyUI embeds the recipe in every image it saves. Knowing this means you never lose a setup you liked — and you can learn from images others share.",
    },
    {
      title: "Save your own version",
      whatItDoes:
        "After changing a workflow, press Ctrl+S to save it. It appears in the Workflows panel (press W) for next time; use Workflow → Export to keep a JSON copy.",
      whyHere:
        "Small, saved variations are how you build up a personal toolkit instead of rebuilding the same graph every session.",
    },
  ],

  pitfalls: [
    "**\"Out of memory\" errors.** Comfy's troubleshooting guide suggests lowering the image size or batch size and closing other programs that use the graphics card first.",
    "**Mixing models that don't belong together.** Errors about tensor or channel sizes usually mean an add-on model was made for a different base model.",
    "**Red boxes after loading a workflow.** They mark missing models or nodes; the Errors panel and ComfyUI Manager tell you what's needed.",
    "**Custom nodes behind most problems.** Comfy's troubleshooting page says most reported issues involve custom nodes; starting with them disabled is the quickest test.",
  ],

  whereToNext: [
    { label: "More local & open-source AI", categorySlug: "local-open-source-ai" },
    { label: "Image generation & editing", categorySlug: "image-generation-editing" },
    { label: "Video creation & editing", categorySlug: "video-creation-editing" },
  ],
};
