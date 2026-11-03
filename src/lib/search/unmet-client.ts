import { privacySignalOn } from "@/lib/attribution/first-touch";
import { isUnmet, type UnmetSearchPayload } from "./unmet";

/** Endpoint the beacon is posted to. */
export const UNMET_ENDPOINT = "/api/search/unmet";

type Pending = { key: string; q: string; resultCount: number; clicked: boolean };

export type UnmetTrackerDeps = {
  /** Fire one beacon. Called at most once per query per page view. */
  send(payload: UnmetSearchPayload): void;
  /** Synchronous answer from the cached eligibility check; false until it resolves "allowed". */
  isEligible(): boolean;
  /** Called when a beacon might be needed, so the eligibility check can start early. */
  wantEligibility(): void;
};

function keyOf(q: string): string {
  return q.replace(/\s+/g, " ").trim().toLowerCase();
}

/**
 * Collects the latest unmet search and turns it into exactly one beacon:
 * on a result click, on a different new search, or when the page is hidden.
 * Typing "cha" then "chat" then "chatg" is one search, not three: a query
 * that extends (or trims back) the pending one replaces it unsent.
 * Pure and injectable; the browser wiring is getUnmetTracker below.
 */
export class UnmetSearchTracker {
  private pending: Pending | null = null;
  private readonly sent = new Set<string>();
  constructor(private readonly deps: UnmetTrackerDeps) {}

  observe(q: string, resultCount: number): void {
    const key = keyOf(q);
    const prev = this.pending;
    if (prev) {
      if (prev.key === key) {
        prev.resultCount = resultCount;
        if (!isUnmet(resultCount)) this.pending = null;
        return;
      }
      if (key.startsWith(prev.key) || prev.key.startsWith(key)) this.pending = null;
      else this.flush();
    }
    if (!key || !isUnmet(resultCount) || this.sent.has(key)) return;
    this.pending = { key, q, resultCount, clicked: false };
    this.deps.wantEligibility();
  }

  /** A result was clicked. If `q` is given it must be the pending query. Sends right away. */
  click(q?: string): void {
    const p = this.pending;
    if (!p) return;
    if (q !== undefined && keyOf(q) !== p.key) return;
    p.clicked = true;
    this.flush();
  }

  /** Send the pending search (if any, and if eligible) and forget it. */
  flush(): void {
    const p = this.pending;
    this.pending = null;
    if (!p || this.sent.has(p.key)) return;
    if (!this.deps.isEligible()) return;
    this.sent.add(p.key);
    this.deps.send({ q: p.q, resultCount: p.resultCount, clicked: p.clicked });
  }

  /** The user cleared the box or left it: the search is over. */
  abandon(): void {
    this.flush();
  }
}

let tracker: UnmetSearchTracker | null = null;

/** The one tracker for this page view, shared by the header box and Discover. Browser only. */
export function getUnmetTracker(): UnmetSearchTracker {
  if (tracker) return tracker;

  let eligible = false;
  let started = false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };

  tracker = new UnmetSearchTracker({
    isEligible: () => eligible,
    wantEligibility: () => {
      if (started) return;
      started = true;
      // DNT / GPC in the browser: never even ask the server.
      if (privacySignalOn(nav)) return;
      void fetch("/api/attribution/eligibility", { cache: "no-store", credentials: "omit" })
        .then((res) => (res.ok ? res.json() : null))
        .then((body: { allowed?: unknown } | null) => {
          eligible = body?.allowed === true;
        })
        .catch(() => {
          eligible = false;
        });
    },
    send: (payload) => {
      try {
        const body = new Blob([JSON.stringify(payload)], { type: "text/plain" });
        if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon(UNMET_ENDPOINT, body)) return;
        void fetch(UNMET_ENDPOINT, { method: "POST", body, keepalive: true, credentials: "omit" }).catch(() => {});
      } catch {
        // Logging is optional; never surface an error to the visitor.
      }
    },
  });

  const flush = () => tracker?.flush();
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  return tracker;
}
