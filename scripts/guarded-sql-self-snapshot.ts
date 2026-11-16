/**
 * Workflow step: create the pre-run Neon branch, or pass a supplied snapshot id through.
 * Prints the branch name and id only. API keys are masked and never written to outputs.
 */
import { appendFileSync } from "node:fs";
import { errorMessage, redactSecrets } from "../src/lib/guarded-sql/redact";
import { createPreRunSnapshot, shouldCreatePreRunSnapshot, SnapshotSetupError } from "../src/lib/guarded-sql/self-snapshot";

function mask(value: string | undefined) {
  if (value) console.log(`::add-mask::${value}`);
}

function writeOutput(key: string, value: string) {
  if (
    key !== "snapshot_id" &&
    key !== "snapshot_name" &&
    key !== "snapshot_parent" &&
    key !== "snapshot_project" &&
    key !== "key_slot" &&
    key !== "snapshot_note"
  ) {
    throw new Error("refusing to write an unexpected output");
  }
  if (/[\r\n=]/.test(value) && key !== "snapshot_name") throw new Error(`refusing unsafe ${key}`);
  if (/[\r\n]/.test(value)) throw new Error(`refusing multiline ${key}`);
  const line = `${key}=${value}\n`;
  const path = process.env.GITHUB_OUTPUT;
  if (path) appendFileSync(path, line);
  else console.log(`${key}=${value}`);
}

async function main(): Promise<number> {
  mask(process.env.NEON_API_KEY);
  mask(process.env.NEON_PROD_API_KEY);
  const secrets = [process.env.NEON_API_KEY, process.env.NEON_PROD_API_KEY];
  const target = process.env.IN_TARGET;
  const sqlFile = process.env.IN_SQL_FILE || "";
  const supplied = (process.env.IN_SNAPSHOT || "").trim();
  const dryRun = process.env.IN_DRY_RUN === "true";

  try {
    if (!shouldCreatePreRunSnapshot(dryRun, supplied) && !supplied) {
      writeOutput("snapshot_id", "");
      writeOutput("snapshot_name", "");
      writeOutput("snapshot_parent", "");
      writeOutput("snapshot_project", "");
      writeOutput("key_slot", "skipped");
      writeOutput("snapshot_note", "dry-run");
      console.log("Dry run: no pre-run Neon branch was created.");
      return 0;
    }
    if (supplied) {
      if (!/^br-[a-z0-9-]+$/.test(supplied)) {
        console.error("::error::snapshot_id must look like br-...");
        return 2;
      }
      writeOutput("snapshot_id", supplied);
      writeOutput("snapshot_name", "");
      writeOutput("snapshot_parent", "");
      writeOutput("snapshot_project", "");
      writeOutput("key_slot", "manual");
      console.log(`Using supplied snapshot ${supplied}`);
      return 0;
    }
    if (target !== "test" && target !== "production") {
      console.error("::error::target must be test or production");
      return 2;
    }
    const snap = await createPreRunSnapshot({
      target,
      sqlFile,
      now: new Date(),
      env: process.env,
      fetchFn: fetch as never,
    });
    if (!/^br-[a-z0-9-]+$/.test(snap.branchId) || !/^br-[a-z0-9-]+$/.test(snap.parentId)) {
      console.error("::error::Neon API returned an unexpected branch id");
      return 2;
    }
    if (!/^[A-Za-z0-9._-]{1,256}$/.test(snap.name)) {
      console.error("::error::snapshot branch name has an unexpected shape");
      return 2;
    }
    writeOutput("snapshot_id", snap.branchId);
    writeOutput("snapshot_name", snap.name);
    writeOutput("snapshot_parent", snap.parentId);
    writeOutput("snapshot_project", snap.projectId);
    writeOutput("key_slot", snap.keySlot);
    console.log(`Created snapshot branch ${snap.name} (${snap.branchId})`);
    return 0;
  } catch (err) {
    const message = redactSecrets(err instanceof SnapshotSetupError ? err.message : errorMessage(err), secrets);
    console.error(`::error::${message}`);
    return 2;
  }
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (err) => {
    console.error(`::error::snapshot step crashed: ${err instanceof Error ? err.constructor.name : "error"}`);
    process.exitCode = 1;
  },
);
