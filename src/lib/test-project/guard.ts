/**
 * Guards for copying preview -> the separate launchpad-test Neon project (Option C, Nov 3 2026).
 * Pure functions; never log a URL, password or key. Messages name endpoint IDs only.
 */
export const PROD_PROJECT_ID = "billowing-river-00654156";
/** Every compute endpoint in the production project as of 2026-11-03 (prod, dev-local, snapshot, preview). */
export const PROD_PROJECT_ENDPOINTS = [
  "ep-odd-mud-ajdk8f99", // production
  "ep-hidden-truth-aj8wfxc2", // dev-local
  "ep-twilight-mountain-ajp58gg4", // snapshot br-bold-dew
  "ep-nameless-mud-ajlqrb02", // preview
] as const;
export const PROD_ENDPOINT = "ep-odd-mud-ajdk8f99";
export const PREVIEW_ENDPOINT = "ep-nameless-mud-ajlqrb02";
export const PREVIEW_ROLE = "launchpad_ro";

export class GuardError extends Error {}

export interface ParsedDbUrl {
  endpointId: string;
  user: string;
  database: string;
}

/** Parse a Neon postgres URL into endpoint ID, user and database. Throws GuardError without echoing the URL. */
export function parseNeonUrl(raw: string | undefined, label: string): ParsedDbUrl {
  if (!raw || !raw.trim()) throw new GuardError(`${label} is not set`);
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    throw new GuardError(`${label} is not a valid URL`);
  }
  if (u.protocol !== "postgres:" && u.protocol !== "postgresql:") {
    throw new GuardError(`${label} must be a postgres:// URL`);
  }
  const first = u.hostname.split(".")[0] ?? "";
  const endpointId = first.replace(/-pooler$/, "");
  if (!/^ep-[a-z0-9-]+$/.test(endpointId) || !u.hostname.endsWith(".neon.tech")) {
    throw new GuardError(`${label} host is not a Neon endpoint`);
  }
  return {
    endpointId,
    user: decodeURIComponent(u.username),
    database: decodeURIComponent(u.pathname.replace(/^\//, "")) || "neondb",
  };
}

export interface CheckInput {
  previewUrl: string | undefined;
  testUrl: string | undefined;
  testProjectId: string | undefined;
}

export interface CheckResult {
  source: ParsedDbUrl;
  target: ParsedDbUrl;
  testProjectId: string;
}

/** Static checks: source must be preview as launchpad_ro; target must not be any production-project endpoint. */
export function checkInputs(i: CheckInput): CheckResult {
  const source = parseNeonUrl(i.previewUrl, "PREVIEW_RO_URL");
  const target = parseNeonUrl(i.testUrl, "TEST_PROJECT_URL");
  const testProjectId = (i.testProjectId ?? "").trim();
  if (!/^[a-z0-9-]{1,60}$/.test(testProjectId)) throw new GuardError("TEST_PROJECT_ID is not set or invalid");
  if (testProjectId === PROD_PROJECT_ID) throw new GuardError("TEST_PROJECT_ID is the production project; refusing");
  if (source.endpointId !== PREVIEW_ENDPOINT) {
    throw new GuardError(`PREVIEW_RO_URL must point at the preview endpoint ${PREVIEW_ENDPOINT} (got ${source.endpointId})`);
  }
  if (source.user !== PREVIEW_ROLE) throw new GuardError(`PREVIEW_RO_URL must log in as ${PREVIEW_ROLE}`);
  if (target.endpointId === PROD_ENDPOINT || (PROD_PROJECT_ENDPOINTS as readonly string[]).includes(target.endpointId)) {
    throw new GuardError(`TEST_PROJECT_URL points at ${target.endpointId} in the production project; refusing`);
  }
  if (target.endpointId === source.endpointId) throw new GuardError("source and target are the same endpoint; refusing");
  return { source, target, testProjectId };
}

export type FetchLike = (url: string, init: { headers: Record<string, string> }) => Promise<{
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}>;

/**
 * Positive proof: the target endpoint must be listed under TEST_PROJECT_ID by the Neon API, and must not
 * be listed under the production project. With a project-scoped key for launchpad-test, the second call
 * is expected to fail (403/404), which is fine; a 200 that contains the endpoint is a refusal.
 */
export async function verifyTargetProject(
  r: CheckResult,
  apiKey: string | undefined,
  fetchImpl: FetchLike,
): Promise<void> {
  if (!apiKey) throw new GuardError("NEON_API_KEY is not set (needed to prove the target is in the test project)");
  const headers = { Authorization: `Bearer ${apiKey}`, Accept: "application/json" };
  const list = async (projectId: string) => {
    const res = await fetchImpl(`https://console.neon.tech/api/v2/projects/${projectId}/endpoints`, { headers });
    if (!res.ok) return { ok: false as const, status: res.status, ids: [] as string[] };
    const body = (await res.json()) as { endpoints?: { id?: string }[] };
    return { ok: true as const, status: res.status, ids: (body.endpoints ?? []).map((e) => String(e.id)) };
  };
  const test = await list(r.testProjectId);
  if (!test.ok) throw new GuardError(`Neon API could not list endpoints of TEST_PROJECT_ID (HTTP ${test.status})`);
  if (!test.ids.includes(r.target.endpointId)) {
    throw new GuardError(`TEST_PROJECT_URL endpoint ${r.target.endpointId} is not in TEST_PROJECT_ID`);
  }
  const prod = await list(PROD_PROJECT_ID);
  if (prod.ok && prod.ids.includes(r.target.endpointId)) {
    throw new GuardError(`TEST_PROJECT_URL endpoint ${r.target.endpointId} is in the production project; refusing`);
  }
}

/** Tables copied with data (catalog). Everything else in public is copied structure-only. */
export const CATALOG_TABLES = ["_prisma_migrations", "categories", "platforms", "tutorials"] as const;

/** Tables that hold user data or user-generated content: structure only, then fake rows. */
export const USER_TABLE_PATTERNS = [
  /^users$/,
  /^user_/,
  /^discussion/,
  /^first_touch_attributions$/,
  /^unmet_searches$/,
  /^reviews$/,
  /^prompts$/,
  /^prompt_/,
];

export function classifyTables(names: string[]): { catalog: string[]; structureOnly: string[] } {
  const catalog: string[] = [];
  const structureOnly: string[] = [];
  for (const n of names) {
    if ((CATALOG_TABLES as readonly string[]).includes(n)) catalog.push(n);
    else structureOnly.push(n); // default-deny: unknown new tables never get data copied
  }
  return { catalog, structureOnly };
}

export function isUserTable(name: string): boolean {
  return USER_TABLE_PATTERNS.some((re) => re.test(name));
}

/** Remove anything that looks like a URL with credentials from a message. */
export function redact(msg: string, secrets: (string | undefined)[] = []): string {
  let out = msg.replace(/postgres(?:ql)?:\/\/[^\s'"]+/g, "postgres://***");
  for (const s of secrets) if (s && s.length >= 6) out = out.split(s).join("***");
  return out;
}
