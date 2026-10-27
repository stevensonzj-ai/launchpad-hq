/**
 * Label-consistency check over the committed catalog snapshot plus the fact
 * files (src/lib/mcp/label-consistency.ts). Offline: no database, no network.
 * Exits non-zero on any offender. The same check runs in
 * src/lib/mcp/label-consistency.test.ts.
 *
 * Usage: npm run check:labels
 */
import { getToolFacts } from "../src/data/facts";
import { checkLabels, summarizeOffenders } from "../src/lib/mcp/label-consistency";
import { snapshotRows } from "../src/lib/mcp/snapshot";

const offenders = checkLabels(snapshotRows(), getToolFacts);
console.log(summarizeOffenders(offenders));
if (offenders.length > 0) process.exit(1);
