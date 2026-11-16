/**
 * Create the pre-run Neon branch the Guarded SQL workflow passes to the
 * existing snapshot check. No compute endpoint is requested: the API creates
 * one only when `endpoints` is present.
 * https://neon.com/docs/reference/api/branches/create-project-branch
 */
import { buildSnapshotBranchName, formatSnapshotDate, sqlFileStem } from "./branch-name";
import { errorMessage, redactSecrets } from "./redact";
import { DEFAULT_NEON_PROJECT_ID, NEON_API_BASE, PRODUCTION_BRANCH_ID } from "./snapshot";

export class SnapshotSetupError extends Error {}

export interface NeonFetch {
  (
    url: string,
    init?: { method?: string; headers?: Record<string, string>; body?: string; signal?: AbortSignal },
  ): Promise<{ ok: boolean; status: number; json(): Promise<unknown> }>;
}

export interface PreRunSnapshot {
  branchId: string;
  name: string;
  parentId: string;
  projectId: string;
  /** Which environment secret the following snapshot check should use. */
  keySlot: "prod" | "test";
}

export interface CreatePreRunSnapshotInput {
  target: "test" | "production";
  sqlFile: string;
  now: Date;
  env: Record<string, string | undefined>;
  fetchFn: NeonFetch;
  sleep?: (ms: number) => Promise<void>;
  /** How many times to re-read the branch while it is still `init`. Default 60. */
  maxPolls?: number;
  pollIntervalMs?: number;
  productionBranchId?: string;
  prodProjectId?: string;
}

interface BranchRow {
  id?: unknown;
  name?: unknown;
  primary?: unknown;
  default?: unknown;
  parent_id?: unknown;
  current_state?: unknown;
}

const PROJECT_ID = /^[A-Za-z0-9][A-Za-z0-9-]*$/;
const TEST_PROJECT_ID = /^[a-z0-9-]{1,60}$/;
const BRANCH_ID = /^br-[a-z0-9-]+$/;

const PROD_KEY_MISSING =
  "NEON_PROD_API_KEY is not set. Add this project-scoped key to the guarded-sql-production environment before a production run that creates its own snapshot.";
const TEST_KEY_MISSING =
  "NEON_API_KEY is not set. The guarded-sql-test environment must provide it when snapshot_id is empty.";
const TEST_PROJECT_MISSING =
  "TEST_PROJECT_ID is not set. The guarded-sql-test environment must provide it when snapshot_id is empty.";

function fail(message: string, secrets: readonly string[]): never {
  throw new SnapshotSetupError(redactSecrets(message, secrets));
}

function readCursor(body: unknown): string {
  const pagination = (body as { pagination?: { cursor?: unknown; next?: unknown } } | null)?.pagination;
  if (!pagination) return "";
  if (typeof pagination.cursor === "string" && pagination.cursor) return pagination.cursor;
  if (typeof pagination.next === "string" && pagination.next) return pagination.next;
  return "";
}

function asBranch(body: unknown): BranchRow | null {
  const branch = (body as { branch?: BranchRow } | null)?.branch;
  if (!branch || typeof branch !== "object") return null;
  return branch;
}

/**
 * Create a branch of the target project's primary branch and wait until it is ready.
 * Does not call the network when the API key (or, on test, TEST_PROJECT_ID) is missing.
 */
export async function createPreRunSnapshot(input: CreatePreRunSnapshotInput): Promise<PreRunSnapshot> {
  const { target, env } = input;
  const knownSecrets = [env.NEON_API_KEY, env.NEON_PROD_API_KEY].filter((s): s is string => !!s && s.length >= 3);

  if (target === "production") {
    if (!env.NEON_PROD_API_KEY) throw new SnapshotSetupError(PROD_KEY_MISSING);
  } else if (target === "test") {
    if (!env.NEON_API_KEY) throw new SnapshotSetupError(TEST_KEY_MISSING);
    if (!env.TEST_PROJECT_ID?.trim()) throw new SnapshotSetupError(TEST_PROJECT_MISSING);
  } else {
    throw new SnapshotSetupError("snapshot target must be test or production");
  }

  const apiKey = target === "production" ? env.NEON_PROD_API_KEY! : env.NEON_API_KEY!;
  const secrets = apiKey.length >= 3 ? [...knownSecrets, apiKey] : knownSecrets;
  const prodProject = (input.prodProjectId ?? DEFAULT_NEON_PROJECT_ID).trim();
  const requiredParent = input.productionBranchId ?? PRODUCTION_BRANCH_ID;
  const projectId = (target === "production" ? env.NEON_PROJECT_ID?.trim() || prodProject : env.TEST_PROJECT_ID!.trim());

  if (!PROJECT_ID.test(projectId)) fail("Neon project id has an invalid format", secrets);
  if (target === "test") {
    if (!TEST_PROJECT_ID.test(projectId)) fail(TEST_PROJECT_MISSING, secrets);
    if (projectId === prodProject) fail("TEST_PROJECT_ID is the production project; refusing", secrets);
  }
  if (target === "production" && env.TEST_PROJECT_ID?.trim() === projectId) {
    fail("Refusing to snapshot: the production project id is TEST_PROJECT_ID.", secrets);
  }

  const sleep = input.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const maxPolls = input.maxPolls ?? 60;
  const pollIntervalMs = input.pollIntervalMs ?? 2_000;

  const request = async (method: string, url: string, body?: string): Promise<{ status: number; body: unknown }> => {
    let res: Awaited<ReturnType<NeonFetch>>;
    try {
      res = await input.fetchFn(url, {
        method,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
          ...(body ? { "Content-Type": "application/json" } : {}),
        },
        ...(body ? { body } : {}),
        signal: AbortSignal.timeout(15_000),
      });
    } catch (err) {
      fail(`Neon API request failed (${errorMessage(err)})`, secrets);
    }
    let parsed: unknown = null;
    try {
      parsed = await res.json();
    } catch {
      parsed = null;
    }
    return { status: res.status, body: parsed };
  };

  const listUrl = (cursor: string) => {
    const url = new URL(`${NEON_API_BASE}/projects/${encodeURIComponent(projectId)}/branches`);
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);
    return url.toString();
  };

  const branches: BranchRow[] = [];
  let cursor = "";
  const seenCursors = new Set<string>();
  for (let page = 0; page < 20; page++) {
    const listed = await request("GET", listUrl(cursor));
    if (listed.status !== 200 || !listed.body) {
      fail(`Neon API could not list branches (HTTP ${listed.status})`, secrets);
    }
    const rows = (listed.body as { branches?: unknown }).branches;
    if (!Array.isArray(rows)) fail("Neon API branch list has no branches array", secrets);
    branches.push(...(rows as BranchRow[]));
    const next = readCursor(listed.body);
    if (!next || seenCursors.has(next)) break;
    seenCursors.add(next);
    cursor = next;
  }

  const primaries = branches.filter((b) => b.primary === true);
  const defaults = branches.filter((b) => b.default === true);
  const parentRow = primaries.length > 0 ? primaries : defaults;
  if (parentRow.length !== 1 || typeof parentRow[0]!.id !== "string") {
    fail("Neon API did not return exactly one primary branch to snapshot", secrets);
  }
  const parentId = parentRow[0]!.id as string;
  if (!BRANCH_ID.test(parentId)) fail("primary branch id has an unexpected shape", secrets);

  if (target === "production" && parentId !== requiredParent) {
    fail(
      `Refusing to snapshot: project primary is ${parentId}, not the production branch ${requiredParent}.`,
      secrets,
    );
  }
  if (target === "test" && parentId === requiredParent) {
    fail("TEST_PROJECT_ID primary is the production branch; refusing", secrets);
  }

  const taken = () =>
    branches
      .map((b) => (typeof b.name === "string" ? b.name : ""))
      .filter((name) => name.length > 0);

  let name: string;
  try {
    name = buildSnapshotBranchName(sqlFileStem(input.sqlFile), formatSnapshotDate(input.now), taken());
  } catch (err) {
    fail(errorMessage(err), secrets);
  }

  const createOnce = async (branchName: string) => {
    const payload = JSON.stringify({ branch: { name: branchName, parent_id: parentId } });
    return request("POST", `${NEON_API_BASE}/projects/${encodeURIComponent(projectId)}/branches`, payload);
  };

  let created = await createOnce(name);
  if (created.status === 409) {
    branches.push({ name });
    try {
      name = buildSnapshotBranchName(sqlFileStem(input.sqlFile), formatSnapshotDate(input.now), taken());
    } catch (err) {
      fail(errorMessage(err), secrets);
    }
    created = await createOnce(name);
  }
  if (created.status !== 201 && created.status !== 200) {
    fail(`Neon API could not create the snapshot branch (HTTP ${created.status})`, secrets);
  }
  const createdBranch = asBranch(created.body);
  if (!createdBranch || typeof createdBranch.id !== "string" || !BRANCH_ID.test(createdBranch.id)) {
    fail("Neon API create response did not include a branch id", secrets);
  }
  if (createdBranch.parent_id !== parentId) {
    fail("created snapshot is not a direct child of the target primary branch", secrets);
  }
  if (createdBranch.name !== name) fail("Neon API returned a different branch name", secrets);

  const readState = async (branchId: string): Promise<string> => {
    const got = await request(
      "GET",
      `${NEON_API_BASE}/projects/${encodeURIComponent(projectId)}/branches/${encodeURIComponent(branchId)}`,
    );
    if (got.status !== 200) fail(`Neon API could not read the snapshot branch (HTTP ${got.status})`, secrets);
    const row = asBranch(got.body);
    if (!row || row.id !== branchId) fail("Neon API returned a different branch id", secrets);
    return typeof row.current_state === "string" ? row.current_state : "";
  };

  let state = typeof createdBranch.current_state === "string" ? createdBranch.current_state : "";
  let polls = 0;
  while (state !== "ready") {
    if (state && state !== "init") fail(`snapshot branch entered state ${state}`, secrets);
    if (polls >= maxPolls) fail("snapshot branch was not ready in time", secrets);
    await sleep(pollIntervalMs);
    polls++;
    state = await readState(createdBranch.id);
  }

  return {
    branchId: createdBranch.id,
    name,
    parentId,
    projectId,
    keySlot: target === "production" ? "prod" : "test",
  };
}
