import { PLACEMENTS } from "../src/data/sponsors/placements";
import { validatePlacements } from "../src/data/sponsors/validate";

const issues = validatePlacements(PLACEMENTS);

if (issues.length === 0) {
  console.log(`Sponsor placements valid (${PLACEMENTS.length} row${PLACEMENTS.length === 1 ? "" : "s"}).`);
  process.exit(0);
}

console.error("Sponsor placement validation failed:");
for (const issue of issues) {
  console.error(`  [${issue.id}] ${issue.message}`);
}
process.exit(1);
