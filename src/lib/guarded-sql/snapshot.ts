import { errorMessage, redactAndCap } from "./redact";

export const DEFAULT_NEON_PROJECT_ID = "billowing-river-00654156";
export const PRODUCTION_BRANCH_ID = "br-purple-band-ajks38xk";
export const NEON_API_BASE = "https://console.neon.tech/api/v2";

export type FetchLike = (
  url: string,
  init?: { method?: string; headers?: Record<string, string>; signal?: AbortSignal },
) => Promise<{ ok: boolean; status: number; json(): Promise<unknown> }>;

export interface SnapshotCheckInput {
  snapshotId: string;
  apiKey: string | undefined;
  projectId: string;
  productionBranchId: string;
  maxAgeHours: number;
  now: Date;
  fetchFn: FetchLike;
}

export type SnapshotCheck = { ok: true } | { ok: false; reason: string };

const ID_SHAPE = /^[A-Za-z0-9][A-Za-z0-9-]*$/;
const CLOCK_SKEW_MS = 5 * 60_000;

/**
 * A "snapshot" is a Neon branch created from production. To count it must
 * exist, be a direct child of the production branch, be recent, and not BE the
 * production branch. Any failure (including API errors) is a refusal.
 */
export async function verifySnapshot(input: SnapshotCheckInput): Promise<SnapshotCheck> {
  const { snapshotId, apiKey, projectId, productionBranchId, maxAgeHours, now, fetchFn } = input;
  const secrets = [apiKey];
  const refuse = (reason: string): SnapshotCheck => ({ ok: false, reason: `Snapshot check failed: ${reason}` });

  if (snapshotId === productionBranchId) return refuse("snapshot id is the production branch itself");
  if (!ID_SHAPE.test(snapshotId)) return refuse("snapshot id has an invalid format");
  if (!ID_SHAPE.test(projectId)) return refuse("NEON_PROJECT_ID has an invalid format");
  if (!apiKey) return refuse("NEON_API_KEY is not set");

  let res: Awaited<ReturnType<FetchLike>>;
  try {
    res = await fetchFn(
      `${NEON_API_BASE}/projects/${encodeURIComponent(projectId)}/branches/${encodeURIComponent(snapshotId)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
        signal: AbortSignal.timeout(10_000),
      },
    );
  } catch (err) {
    return refuse(`Neon API request failed (${redactAndCap(errorMessage(err), secrets, 100)})`);
  }

  if (res.status === 404) return refuse("snapshot branch not found (HTTP 404)");
  if (!res.ok || res.status !== 200) return refuse(`Neon API returned HTTP ${res.status}`);

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    return refuse("Neon API returned invalid JSON");
  }

  const branch = (body as { branch?: Record<string, unknown> } | null)?.branch;
  if (!branch || typeof branch !== "object") return refuse("Neon API response has no branch object");
  if (typeof branch.id === "string" && branch.id !== snapshotId) return refuse("Neon API returned a different branch id");
  if (branch.id === productionBranchId) return refuse("snapshot id is the production branch itself");
  if (branch.parent_id !== productionBranchId) return refuse("snapshot is not a direct child of the production branch");

  const created = typeof branch.created_at === "string" ? Date.parse(branch.created_at) : NaN;
  if (!Number.isFinite(created)) return refuse("snapshot has no valid created_at");
  const ageMs = now.getTime() - created;
  if (ageMs < -CLOCK_SKEW_MS) return refuse("snapshot created_at is in the future");
  if (ageMs > maxAgeHours * 3_600_000) {
    return refuse(`snapshot is ${(ageMs / 3_600_000).toFixed(1)}h old, over the ${maxAgeHours}h limit`);
  }
  return { ok: true };
}
