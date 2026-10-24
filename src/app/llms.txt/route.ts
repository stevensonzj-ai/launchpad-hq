import { listRegisteredTutorials, tutorialGuidePath } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { SITE_URL } from "@/lib/site";
import { getActivePlacement } from "@/data/sponsors";

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

  const body = `# LaunchpadHQ

> LaunchpadHQ is a curated AI-platform discovery site for beginners and budget-conscious users. It helps people find real alternatives beyond ChatGPT and Claude — writing, image, video, audio, code, research, and automation tools, including free tiers and local/open-source options.

Browsing the directory, quiz, platform overviews, prompt library, and discussions is intended to stay free. Auth, account, and admin routes are omitted here.

## Sections

- [Home](${SITE_URL}/): Product overview and entry point
- [Discover](${SITE_URL}/discover): Browse and filter the AI tool directory
- [Quiz](${SITE_URL}/quiz): Matching quiz to recommend platforms
- [Quiz results](${SITE_URL}/quiz/results): Public results page (signed-out path)
- [Workflows](${SITE_URL}/workflows): Curated multi-tool workflow templates
- [Tutorials](${SITE_URL}/tutorials): Every getting-started guide, grouped by category
- [How we make money](${SITE_URL}/how-we-make-money): How Launchpad stays free, labeled sponsor placements, and affiliates
- [Advertise](${SITE_URL}/advertise): Sponsor rate card, weekly availability, rates and how to book by email${
    getActivePlacement("ai-of-the-week")
      ? `
- [AI of the Week](${SITE_URL}/ai-of-the-week): Sponsored feature with an honest-take box`
      : ""
  }

## Agent access

- MCP (Streamable HTTP, no auth, read-only): ${SITE_URL}/mcp
- Tools: search_tools, compare, get_pricing_facts, find_free_alternatives
- Results are dated and sourced; sponsorship never affects them.
- [Privacy policy](${SITE_URL}/privacy)

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
