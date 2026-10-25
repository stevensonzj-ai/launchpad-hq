import Link from "next/link";
import type { Metadata } from "next";

import { TOOL_SPECS } from "@/lib/mcp/server";
import { publicPageMetadata } from "@/lib/seo-metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = publicPageMetadata({
  title: "Launchpad HQ connector for AI assistants | Launchpad HQ",
  description:
    "Add Launchpad HQ to Claude or another AI assistant to search, compare and price AI tools with dated, sourced facts. Free, read-only, no sign-in.",
  path: "/connector",
});

const MCP_URL = absoluteUrl("/mcp");

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
          <h2 className="text-xl font-semibold text-white">2. Add it to Claude</h2>
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
            Menu names vary between Claude apps and plans. See{" "}
            <a
              href="https://claude.com/docs/connectors/custom/add-unlisted"
              className="text-orange-400 hover:underline"
            >
              Claude&apos;s guide to custom connectors
            </a>{" "}
            for the current steps.
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
            Each request logs one line: the tool used, the text sent to it (up to 200
            characters), the result count, timing, success, and the assistant app&apos;s
            self-reported name. These lines don&apos;t include IP addresses, cookies or your
            conversation, though our host&apos;s own request logs record IP addresses.
            Details are in the{" "}
            <Link href="/privacy#mcp" className="text-orange-400 hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-white">9. Help</h2>
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
