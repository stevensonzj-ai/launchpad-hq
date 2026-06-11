import { createHmac, timingSafeEqual } from "crypto";

/**
 * Stateless signed tokens for the email moderation links.
 *
 * Design: HMAC-SHA256 over a base64url JSON payload, keyed by
 * MODERATION_SECRET. The action (approve/reject) and expiry live inside the
 * signed payload, so a recipient can't turn an approve link into a reject
 * link or extend its lifetime. TTL-based rather than single-use — no DB
 * table — per the agreed moderation-token design; replay within the 24h
 * window is handled by the action route's idempotency check (already
 * reviewed → plain confirmation, no re-processing).
 */

export type ModerationKind = "prompt" | "discussion" | "reply";
export type ModerationAction = "approve" | "reject";

export const MODERATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export type ModerationTokenPayload = {
  kind: ModerationKind;
  id: string;
  action: ModerationAction;
  /** Expiry as unix epoch milliseconds. */
  exp: number;
};

const KINDS: ModerationKind[] = ["prompt", "discussion", "reply"];
const ACTIONS: ModerationAction[] = ["approve", "reject"];

function getSecret(): string {
  const secret = process.env.MODERATION_SECRET;
  if (!secret) {
    throw new Error("MODERATION_SECRET environment variable is not set");
  }
  return secret;
}

function sign(encodedPayload: string): string {
  return createHmac("sha256", getSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createModerationToken(
  kind: ModerationKind,
  id: string,
  action: ModerationAction,
): string {
  const payload: ModerationTokenPayload = {
    kind,
    id,
    action,
    exp: Date.now() + MODERATION_TOKEN_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export type ModerationTokenResult =
  | { ok: true; payload: ModerationTokenPayload }
  | { ok: false; reason: "invalid" | "expired" };

export function verifyModerationToken(token: string): ModerationTokenResult {
  const dot = token.lastIndexOf(".");
  if (dot <= 0 || dot === token.length - 1) {
    return { ok: false, reason: "invalid" };
  }
  const encoded = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  const expected = Buffer.from(sign(encoded));
  const provided = Buffer.from(signature);
  if (
    expected.length !== provided.length ||
    !timingSafeEqual(expected, provided)
  ) {
    return { ok: false, reason: "invalid" };
  }

  let payload: ModerationTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "invalid" };
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !KINDS.includes(payload.kind) ||
    !ACTIONS.includes(payload.action) ||
    typeof payload.id !== "string" ||
    payload.id.length === 0 ||
    typeof payload.exp !== "number"
  ) {
    return { ok: false, reason: "invalid" };
  }

  if (payload.exp < Date.now()) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true, payload };
}
