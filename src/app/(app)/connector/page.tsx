import Link from "next/link";
import type { Metadata } from "next";

import { TOOL_SPECS } from "@/lib/mcp/server";
import { SCHEMA_VERSION } from "@/lib/public-data/schema";
import { publicPageMetadata } from "@/lib/seo-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = publicPageMetadata({
  title: "Launchpad HQ connector for AI assistants | Launchpad HQ",
  description:
    "Add Launchpad HQ to Claude or another AI assistant to search, compare and price AI tools with dated, sourced facts. Free, read-only, no sign-in.",
  path: "/connector",
});

const MCP_URL = absoluteUrl("/mcp");
const FEED_URL = absoluteUrl("/data/v1/index.json");

type AssistantSetup = {
  name: string;
  steps: string[];
  note?: string;
  docsUrl: string;
  docsLabel: string;
};

/** Self-serve setup steps, checked against each vendor's own docs on Oct 30, 2026. */
const ASSISTANT_SETUPS: AssistantSetup[] = [
  {
    name: "Grok",
    steps: [
      "Go to grok.com/connectors.",
      "Click New Connector, then select Custom.",
      "Enter the URL from step 1. No authentication is needed.",
    ],
    note: "On Grok Business and Enterprise, an admin may need to set it up first.",
    docsUrl: "https://docs.x.ai/grok/connectors",
    docsLabel: "Grok's connectors guide",
  },
  {
    name: "Gemini app",
    steps: [
      "On a computer, go to gemini.google.com and open Settings > Connected Apps.",
      "Under Custom apps, choose Add a custom app.",
      "Enter the URL from step 1. Once added on the web, it also works in the Gemini mobile app.",
    ],
    note: "Custom apps need a personal Google Account (not work or school), and you must be 18 or over, in the US, using Gemini in English, with Keep Activity on.",
    docsUrl: "https://support.google.com/gemini/answer/17209137",
    docsLabel: "Google's guide to custom apps in Gemini",
  },
  {
    name: "Perplexity",
    steps: [
      "Open Plugins in the sidebar (or Customize > Connectors if you don't see Plugins).",
      "Choose Add custom > Add MCP connector, then select Remote.",
      "Enter a name, such as Launchpad HQ, and the URL from step 1. Set authentication to None.",
    ],
    note: "In an organization, an admin must allow members to add custom connectors.",
    docsUrl: "https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors",
    docsLabel: "Perplexity's guide to custom remote connectors",
  },
  {
    name: "Mistral Le Chat",
    steps: [
      "Open the Connectors page and click + Add Connector.",
      "Switch to the Custom MCP Connector tab.",
      "Enter a connector name with no spaces (for example launchpadhq) and the URL from step 1, then click Connect. No sign-in is needed.",
    ],
    note: "Only admins can add connectors. On Free, Pro and Student plans, the account owner is the admin.",
    docsUrl: "https://docs.mistral.ai/vibe/work/connectors/mcp-connectors",
    docsLabel: "Mistral's guide to custom MCP connectors",
  },
  {
    name: "ChatGPT",
    steps: [
      "On ChatGPT on the web, go to chatgpt.com/plugins.",
      "Select the plus button, then Add custom MCP server.",
      "Enter a name and the URL from step 1, and choose No authentication.",
      "Review the warning, then select Create as a plugin.",
    ],
    note: "Custom MCP servers depend on your plan and, for workspaces, your admin's settings, so this option may not appear for every account.",
    docsUrl: "https://developers.openai.com/api/docs/guides/custom-mcp-server",
    docsLabel: "OpenAI's guide to custom MCP servers",
  },
  {
    name: "VS Code",
    steps: [
      "Open the Command Palette and run MCP: Add Server.",
      "Choose HTTP, then enter the URL from step 1.",
      "Enter a server ID, such as launchpad-hq, then choose Global to use it in all your workspaces.",
    ],
    docsUrl: "https://code.visualstudio.com/docs/copilot/customization/mcp-servers",
    docsLabel: "VS Code's MCP servers guide",
  },
];

const CURSOR_CONFIG = JSON.stringify(
  { mcpServers: { "launchpad-hq": { url: MCP_URL } } },
  null,
  2,
);

type ToolName = (typeof TOOL_SPECS)[number]["name"];

/** Plain-English summaries; names and titles come from the live tool specs. */
const TOOL_SUMMARIES: Record<ToolName, string> = {
  search_tools:
    "Finds AI tools for a task, such as transcribing meetings. It can filter by budget, skill level and platform.",
  compare: "Compares 2 to 4 tools side by side: plans, API pricing, usage limits and platforms.",
  get_pricing_facts: "Shows what one tool costs and what its free tier includes.",
  find_free_alternatives: "Finds free or freemium alternatives to a tool.",
};

const EXAMPLE_PROMPTS = [
  "What's a free AI tool to transcribe my Zoom meetings, for a beginner?",
  "Compare ChatGPT, Claude and Gemini plans and prices.",
  "What does ElevenLabs cost, and what's in its free tier?",
  "Is there a free alternative to Grammarly?",
  "I need an AI tool to make slides on a low budget. What do you suggest?",
];

export default function ConnectorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Use Launchpad HQ inside your AI assistant</h1>
      <p className="mt-4 text-sm text-gray-400">
        The Launchpad HQ connector lets an AI assistant look up our catalog of AI tools while
        you chat. Ask which tool fits a task, what it costs or what is free, and the answer
        comes with a date and a source instead of a guess. It is free, needs no sign-in, and
        is read-only: it can&apos;t change anything.
      </p>

      <ol className="mt-10 space-y-10">
        <li>
          <h2 className="text-xl font-semibold text-white">1. The connector address</h2>
          <p className="mt-2 text-sm text-gray-400">Copy this URL. You paste it in step 2.</p>
          <p className="mt-3 rounded-md border border-gray-800 bg-gray-900 px-3 py-2 font-mono text-sm text-gray-100">
            {MCP_URL}
          </p>
        </li>

        <li>
          <h2 id="add-to-assistant" className="scroll-mt-20 text-xl font-semibold text-white">
            2. Add Launchpad HQ to your assistant
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            In each app below, add the URL from step 1 as a custom (remote) MCP connector. No
            sign-in or API key is needed, so pick &ldquo;None&rdquo; or leave authentication
            empty. These are self-serve setups; Launchpad HQ isn&apos;t an official listing in
            these apps&apos; directories. Menus change often, so each app links to its own
            current guide.
          </p>

          <h3 className="mt-6 font-semibold text-gray-200">Claude</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-400">
            <li>
              In Claude, go to <strong className="text-gray-200">Customize &gt; Connectors</strong>.
            </li>
            <li>
              Choose <strong className="text-gray-200">Add custom connector</strong>.
            </li>
            <li>Give it a name, such as Launchpad HQ, and paste the URL from step 1.</li>
            <li>
              Leave the OAuth fields empty (no sign-in is needed), then click{" "}
              <strong className="text-gray-200">Add</strong>. On the Free plan you can add one
              custom connector.
            </li>
            <li>In a chat, turn the connector on from the chat&apos;s tools or connectors menu.</li>
          </ol>
          <p className="mt-2 text-sm text-gray-400">
            On Team and Enterprise plans, an owner adds it first in Organization settings &gt;
            Connectors. See{" "}
            <a
              href="https://claude.com/docs/connectors/custom/add-unlisted"
              className="text-orange-400 hover:underline"
            >
              Claude&apos;s guide to custom connectors
            </a>
            .
          </p>

          {ASSISTANT_SETUPS.map((setup) => (
            <div key={setup.name}>
              <h3 className="mt-6 font-semibold text-gray-200">{setup.name}</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-400">
                {setup.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              {setup.note ? <p className="mt-2 text-sm text-gray-400">{setup.note}</p> : null}
              <p className="mt-2 text-sm text-gray-400">
                <a href={setup.docsUrl} className="text-orange-400 hover:underline">
                  {setup.docsLabel}
                </a>
              </p>
            </div>
          ))}

          <h3 className="mt-6 font-semibold text-gray-200">Cursor</h3>
          <p className="mt-2 text-sm text-gray-400">
            Add this to <code className="text-xs text-gray-300">~/.cursor/mcp.json</code> (all
            projects) or <code className="text-xs text-gray-300">.cursor/mcp.json</code> (one
            project):
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md border border-gray-800 bg-gray-900 px-3 py-2 font-mono text-xs text-gray-100">
            {CURSOR_CONFIG}
          </pre>
          <p className="mt-2 text-sm text-gray-400">
            <a href="https://cursor.com/docs/context/mcp" className="text-orange-400 hover:underline">
              Cursor&apos;s MCP guide
            </a>
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">3. Other AI apps</h2>
          <p className="mt-2 text-sm text-gray-400">
            Any app that supports MCP (Model Context Protocol) servers over Streamable HTTP can
            use the same URL. Add it as a remote MCP server with no authentication.
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">4. Try asking</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-400">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <li key={prompt}>&ldquo;{prompt}&rdquo;</li>
            ))}
          </ul>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">5. What it can do</h2>
          <p className="mt-2 text-sm text-gray-400">
            Your assistant picks the right tool for your question. There are four:
          </p>
          <dl className="mt-3 space-y-3 text-sm">
            {TOOL_SPECS.map((tool) => (
              <div key={tool.name}>
                <dt className="font-semibold text-gray-200">
                  {tool.title} <code className="ml-1 text-xs text-gray-500">{tool.name}</code>
                </dt>
                <dd className="mt-1 text-gray-400">{TOOL_SUMMARIES[tool.name]}</dd>
              </div>
            ))}
          </dl>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">6. How to read the results</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-400">
            <li>
              <strong className="text-gray-200">verified</strong>: the fact comes from the
              vendor&apos;s own page and was checked on a stated date.
            </li>
            <li>
              <strong className="text-gray-200">unverified</strong>: the fact is recorded but
              not yet second-checked.
            </li>
            <li>
              <strong className="text-gray-200">catalog_only</strong>: general catalog text with
              no checked source. No source is invented for it.
            </li>
            <li>
              <strong className="text-gray-200">as_of</strong>: the date a fact was checked.
            </li>
            <li>
              <strong className="text-gray-200">source_url</strong>: the vendor page the fact
              came from.
            </li>
          </ul>
          <p className="mt-2 text-sm text-gray-400">
            Every result also links to its Launchpad HQ page. Prices change often, so confirm
            on the vendor&apos;s site before you buy.
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">7. Sponsorship</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sponsorship never affects connector results. Every result is marked{" "}
            <code className="text-xs text-gray-300">sponsored: false</code>, and the connector
            doesn&apos;t read sponsor data.{" "}
            <Link href="/how-we-make-money" className="text-orange-400 hover:underline">
              How we make money
            </Link>
            .
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">8. Privacy</h2>
          <p className="mt-2 text-sm text-gray-400">
            Each request logs one line: a random request ID, the tool used, the number of
            results, the response time and whether it succeeded. We don&apos;t log what you
            sent to the tool, the assistant app&apos;s name, IP addresses, headers, cookies or
            your conversation, though our host&apos;s own request logs record IP addresses.
            Connector logs are kept about 90 days.
            Details are in the{" "}
            <Link href="/privacy#mcp" className="text-orange-400 hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">9. Plain JSON feed</h2>
          <p className="mt-2 text-sm text-gray-400">
            Prefer plain files? The same facts are published as free, read-only JSON with no
            sign-in, starting at{" "}
            <a href={FEED_URL} className="text-orange-400 hover:underline">
              {FEED_URL}
            </a>
            . It has one file for the whole catalog, one per tool, an OpenAPI description and
            a JSON Schema (schema version {SCHEMA_VERSION}). Files are cached for up to an hour.
            Please credit Launchpad HQ and link to the tool&apos;s page.
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">10. Help</h2>
          <p className="mt-2 text-sm text-gray-400">
            Questions or a wrong fact? Email{" "}
            <a
              href="mailto:launchpadhq.admin@gmail.com"
              className="text-orange-400 hover:underline"
            >
              launchpadhq.admin@gmail.com
            </a>
            .
          </p>
        </li>
      </ol>
    </div>
  );
}
