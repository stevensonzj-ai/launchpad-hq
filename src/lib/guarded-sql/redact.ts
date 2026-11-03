/**
 * Secret redaction for anything the guarded SQL runner prints or logs.
 *
 * Belt and braces: (1) scrub known secret values we hold (DB password, user,
 * API key) literally, then (2) scrub anything shaped like a connection string,
 * a `password=` pair or a Neon API key.
 */

export const REDACTED = "[redacted]";

const URL_LIKE = /[a-z][a-z0-9+.-]*:\/\/[^\s'"<>]+/gi;
const KV_PASSWORD = /\b(password|passwd|pwd)\s*=\s*[^\s&;,'"]+/gi;
const NEON_API_KEY = /\bnapi_[A-Za-z0-9]+/g;
const NEON_PASSWORD = /\bnpg_[A-Za-z0-9]+/g;

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function redactSecrets(text: string, secrets: readonly (string | undefined)[] = []): string {
  let out = text;
  // Longest first so a secret containing another secret is fully removed.
  const known = secrets
    .filter((s): s is string => typeof s === "string" && s.length >= 3)
    .sort((a, b) => b.length - a.length);
  for (const s of known) out = out.replace(new RegExp(escapeRegExp(s), "g"), REDACTED);
  out = out.replace(URL_LIKE, REDACTED);
  out = out.replace(KV_PASSWORD, (_m, key: string) => `${key}=${REDACTED}`);
  out = out.replace(NEON_API_KEY, REDACTED).replace(NEON_PASSWORD, REDACTED);
  return out;
}

/** Redact, then cap to `max` characters (default 200). */
export function redactAndCap(text: string, secrets: readonly (string | undefined)[] = [], max = 200): string {
  const r = redactSecrets(text, secrets);
  return r.length > max ? r.slice(0, max) : r;
}

/** Secret fragments (user + password, raw and decoded) of a connection string. */
export function secretsFromConnectionString(conn: string): string[] {
  const found = new Set<string>();
  const add = (v: string | undefined) => {
    if (v && v.length >= 3) found.add(v);
  };
  try {
    const u = new URL(conn);
    add(u.username);
    add(u.password);
    try {
      add(decodeURIComponent(u.username));
      add(decodeURIComponent(u.password));
    } catch {
      /* undecodable: raw form already added */
    }
  } catch {
    const m = /:\/\/([^:@/\s]*):([^@\s]*)@/.exec(conn);
    if (m) {
      add(m[1]);
      add(m[2]);
    }
  }
  found.add(conn);
  return [...found];
}

export function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return String(err);
  } catch {
    return "unknown error";
  }
}
