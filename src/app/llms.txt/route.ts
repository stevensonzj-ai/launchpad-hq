import { listRegisteredTutorials } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { SITE_URL } from "@/lib/site";

export function GET() {
  const tutorials = [...listRegisteredTutorials()].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const tutorialLinks = tutorials
    .map(
      (tutorial) =>
        `- [${tutorial.title}](${SITE_URL}/platform/${tutorial.platformSlug}): Getting-started guide (Tutorials tab)`,
    )
    .join("\n");

  const workflowLinks = WORKFLOWS.map(
    (workflow) => `- [${workflow.title}](${SITE_URL}/workflows/${workflow.slug}): ${workflow.description}`,
  ).join("\n");

  const body = `# LaunchpadHQ

> LaunchpadHQ is a curated AI-platform discovery site for beginners and budget-conscious users. It helps people find real alternatives beyond ChatGPT and Claude — writing, image, video, audio, code, research, and automation tools, including free tiers and local/open-source options.

${
  // TODO(launch): remove this sentence when SITE_IS_PUBLIC is flipped.
  "The site is not publicly launched. Browsing the directory, quiz, platform overviews, prompt library, and discussions is intended to stay free. Auth, account, and admin routes are omitted here."
}

## Sections

- [Home](${SITE_URL}/): Product overview and entry point
- [Discover](${SITE_URL}/discover): Browse and filter the AI tool directory
- [Quiz](${SITE_URL}/quiz): Matching quiz to recommend platforms
- [Quiz results](${SITE_URL}/quiz/results): Public results page (signed-out path)
- [Workflows](${SITE_URL}/workflows): Curated multi-tool workflow templates
- [Tutorials](${SITE_URL}/tutorials): Tutorial library index (guides live on each platform page)
- [Pricing](${SITE_URL}/pricing): Subscription pricing
- [How we make money](${SITE_URL}/how-we-make-money): Funding, subscriptions, and labeled sponsor placements
- [Sponsor guidelines](${SITE_URL}/sponsor-guidelines): Placement specs and what we will not accept
- [AI of the Week](${SITE_URL}/ai-of-the-week): Sponsored feature with an honest-take box (empty when unbooked)

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
