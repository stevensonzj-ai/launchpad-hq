import { CONFIRM_PRODUCTION_FLAG, checkTargetHost, isProductionHost, PRODUCTION_ENDPOINT_ID } from "../prod-guard";
import { verifySnapshot, type FetchLike } from "./snapshot";

export type GuardResult =
  | { ok: true; production: boolean; notes: string[] }
  | { ok: false; production: boolean; reason: string };

export interface GuardInput {
  /** Endpoint ID only (never a full hostname or URL). */
  endpointId: string | null;
  confirmProduction: boolean;
  snapshotId: string | null;
  maxSnapshotAgeHours: number;
  env: Record<string, string | undefined>;
  now: Date;
  fetchFn: FetchLike;
  productionEndpointId: string;
  productionBranchId: string;
  neonProjectId: string;
}

/**
 * Production needs ALL of: --confirm-production, CONFIRM_PROD_HOST equal to the
 * endpoint, and a verified --snapshot. Non-production needs nothing.
 */
export async function evaluateGuard(input: GuardInput): Promise<GuardResult> {
  const { endpointId, productionEndpointId = PRODUCTION_ENDPOINT_ID } = input;
  const argv = input.confirmProduction ? [CONFIRM_PRODUCTION_FLAG] : [];

  const host = checkTargetHost(endpointId, argv, input.env, productionEndpointId);
  if (!host.ok) {
    return {
      ok: false,
      production: endpointId !== null && isProductionHost(endpointId, productionEndpointId),
      reason: host.reason,
    };
  }
  const notes = host.note ? [host.note] : [];
  if (!host.production) {
    if (input.snapshotId) notes.push("--snapshot ignored: target is not production.");
    return { ok: true, production: false, notes };
  }

  if (!input.snapshotId) {
    return {
      ok: false,
      production: true,
      reason: "Refusing to run against production without --snapshot <branch-id> (a recent Neon branch of production).",
    };
  }
  const snap = await verifySnapshot({
    snapshotId: input.snapshotId,
    apiKey: input.env.NEON_API_KEY,
    projectId: input.neonProjectId,
    productionBranchId: input.productionBranchId,
    maxAgeHours: input.maxSnapshotAgeHours,
    now: input.now,
    fetchFn: input.fetchFn,
  });
  if (!snap.ok) return { ok: false, production: true, reason: snap.reason };
  notes.push(`Snapshot ${input.snapshotId} verified.`);
  return { ok: true, production: true, notes };
}
