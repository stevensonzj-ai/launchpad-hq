import { listRegisteredTutorials, tutorialGuidePath } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { SITE_URL } from "@/lib/site";
import { getActivePlacement } from "@/data/sponsors";
import { compareLlmsLines, listedComparePages } from "@/data/compare/view";

export function GET() {
  const tutorials = [...listRegisteredTutorials()].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const tutorialLinks = tutorials
    .map(
      (tutorial) =>
        `- [${tutorial.title}](${SITE_URL}${tutorialGuidePath(tutorial.platformSlug)}): Getting-started guide`,
    )
    .join("\n");

  const workflowLinks = WORKFLOWS.map(
    (workflow) => `- [${workflow.title}](${SITE_URL}/workflows/${workflow.slug}): ${workflow.description}`,
  ).join("\n");

  // No DB here: hidden or discontinued tools drop a page; rows are assumed.
  const compareLinks = compareLlmsLines(SITE_URL, listedComparePages()).join("\n");

  const body = `# LaunchpadHQ

> LaunchpadHQ is a curated AI-platform discovery site for beginners and budget-conscious users. It helps people find real alternatives beyond ChatGPT and Claude â€” writing, image, video, audio, code, research, and automation tools, including free tiers and local/open-source options.

Browsing the directory, quiz, platform overviews, prompt library, and discussions is intended to stay free. Auth, account, and admin routes are omitted here.

## Sections

- [Home](${SITE_URL}/): Product overview and entry point
- [Discover](${SITE_URL}/discover): Browse and filter the AI tool directory
- [Quiz](${SITE_URL}/quiz): Matching quiz to recommend platforms
- [Quiz results](${SITE_URL}/quiz/results): Public results page (signed-out path)
- [Workflows](${SITE_URL}/workflows): Curated multi-tool workflow templates
- [Tutorials](${SITE_URL}/tutorials): Every getting-started guide, grouped by category
- [Models](${SITE_URL}/models): Current and prior versions of major LLM families, from official vendor docs
- [Claude vs GPT](${SITE_URL}/models/compare/claude-vs-gpt): Flagship and budget Claude and GPT versions, from official docs
- [How we make money](${SITE_URL}/how-we-make-money): How Launchpad stays free, labeled sponsor placements, and affiliates
- [Advertise](${SITE_URL}/advertise): Sponsor rate card, weekly availability, rates and how to book by email${
    getActivePlacement("ai-of-the-week")
      ? `
- [AI of the Week](${SITE_URL}/ai-of-the-week): Sponsored feature with an honest-take box`
      : ""
  }

## Agent access

- MCP (Streamable HTTP, no auth, read-only): ${SITE_URL}/mcp
- [Connector docs](${SITE_URL}/connector): What the connector does, how to add it, and how to read results
- Tools: search_tools, compare, get_pricing_facts, find_free_alternatives
- Results are dated and sourced; sponsorship never affects them.
- [Privacy policy](${SITE_URL}/privacy#mcp)

## Comparisons

${compareLinks}

## Data (JSON, free, read-only)

The same dated, sourced facts as the site and the MCP connector. No sign-in; cached hourly. Please credit Launchpad HQ and link to the tool's page.

- [Index](${SITE_URL}/data/v1/index.json): Counts and links
- [Catalog](${SITE_URL}/data/v1/catalog.json): Every listed tool in one file
- One tool: ${SITE_URL}/data/v1/tools/{slug}.json
- [Comparisons](${SITE_URL}/data/v1/compare/index.json): Every comparison page; one page at ${SITE_URL}/data/v1/compare/{slug}.json
- [Guides](${SITE_URL}/data/v1/guides/index.json): Every getting-started guide; one guide at ${SITE_URL}/data/v1/guides/{slug}.json
- [Workflows](${SITE_URL}/data/v1/workflows/index.json): Every workflow template; one workflow at ${SITE_URL}/data/v1/workflows/{slug}.json
- [Models](${SITE_URL}/data/v1/models/index.json): Every model family; one family at ${SITE_URL}/data/v1/models/{slug}.json
- [Claude vs GPT](${SITE_URL}/data/v1/models/compare/claude-vs-gpt.json): The Claude vs GPT models page
- [Quiz](${SITE_URL}/data/v1/quiz.json): Quiz questions, options and scoring map
- [OpenAPI](${SITE_URL}/data/v1/openapi.json): OpenAPI 3.1 description
- [JSON Schema](${SITE_URL}/data/v1/schema/tool.json): Schema for one tool
- [Full text export](${SITE_URL}/llms-full.txt): The catalog, comparisons, guides, workflows and models in one plain-text file

## Workflows

${workflowLinks}

## Tutorials

${tutorialLinks}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
