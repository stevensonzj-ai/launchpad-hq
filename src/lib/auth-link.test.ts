import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveDbUser, type AuthLinkDeps, type ClerkEmailProfile } from "@/lib/auth-link";

type Row = { id: string; clerkId: string; email: string };

function uniqueViolation() {
  return Object.assign(new Error("Unique constraint failed"), { code: "P2002" });
}

/** In-memory users table with the same two unique constraints as Prisma. */
function fakeDeps(rows: Row[], hooks: { beforeCreate?: () => void } = {}) {
  const warnings: string[] = [];
  let nextId = rows.length + 1;
  const deps: AuthLinkDeps<Row> = {
    async findByClerkId(clerkId) {
      return rows.find((r) => r.clerkId === clerkId) ?? null;
    },
    async findByEmail(email) {
      return rows.find((r) => r.email === email) ?? null;
    },
    async create({ clerkId, email }) {
      hooks.beforeCreate?.();
      if (rows.some((r) => r.clerkId === clerkId || r.email === email)) throw uniqueViolation();
      const row = { id: `row_${nextId++}`, clerkId, email };
      rows.push(row);
      return row;
    },
    async relink(id, fromClerkId, toClerkId) {
      const row = rows.find((r) => r.id === id && r.clerkId === fromClerkId);
      if (!row) return null;
      row.clerkId = toClerkId;
      return row;
    },
    async warn(event, { clerkIdPrefix, reason }) {
      warnings.push(`${event}:${clerkIdPrefix}:${reason}`);
    },
  };
  return { deps, rows, warnings };
}

function clerkUser(email: string, status: string | null): () => Promise<ClerkEmailProfile> {
  return async () => ({ primaryEmailAddress: { emailAddress: email, verification: { status } } });
}

const NEW_ID = "user_NEWabcdefghijklmnop";

test("new user: creates a row", async () => {
  const { deps, rows, warnings } = fakeDeps([]);
  const user = await resolveDbUser(NEW_ID, clerkUser("a@example.com", "verified"), deps);
  assert.equal(user?.clerkId, NEW_ID);
  assert.equal(rows.length, 1);
  assert.deepEqual(warnings, []);
});

test("existing clerkId: reuses the row without calling Clerk", async () => {
  const { deps, rows } = fakeDeps([{ id: "row_1", clerkId: NEW_ID, email: "a@example.com" }]);
  const user = await resolveDbUser(NEW_ID, async () => assert.fail("Clerk should not be called"), deps);
  assert.equal(user?.id, "row_1");
  assert.equal(rows.length, 1);
});

test("email match with verified primary email: relinks the existing row", async () => {
  const { deps, rows, warnings } = fakeDeps([{ id: "row_1", clerkId: "user_OLD", email: "a@example.com" }]);
  const user = await resolveDbUser(NEW_ID, clerkUser("a@example.com", "verified"), deps);
  assert.equal(user?.id, "row_1");
  assert.equal(rows[0].clerkId, NEW_ID);
  assert.equal(rows.length, 1);
  assert.deepEqual(warnings, ["relinked:user_NEWa:verified-email-match"]);
});

test("email match with unverified primary email: does not relink, returns null", async () => {
  const { deps, rows, warnings } = fakeDeps([{ id: "row_1", clerkId: "user_OLD", email: "a@example.com" }]);
  const user = await resolveDbUser(NEW_ID, clerkUser("a@example.com", "unverified"), deps);
  assert.equal(user, null);
  assert.equal(rows[0].clerkId, "user_OLD");
  assert.deepEqual(warnings, ["unresolved:user_NEWa:email-row-exists-unverified"]);
});

test("P2002 race: a concurrent request created the row first, so it is reused", async () => {
  const rows: Row[] = [];
  const { deps, warnings } = fakeDeps(rows, {
    // The other request's create lands between our lookup and our create.
    beforeCreate: () => {
      if (!rows.length) rows.push({ id: "row_race", clerkId: NEW_ID, email: "a@example.com" });
    },
  });
  const user = await resolveDbUser(NEW_ID, clerkUser("a@example.com", "verified"), deps);
  assert.equal(user?.id, "row_race");
  assert.equal(rows.length, 1);
  assert.deepEqual(warnings, []);
});

test("P2002 race on the email: relinks the row that appeared under an old clerkId", async () => {
  const rows: Row[] = [];
  const { deps, warnings } = fakeDeps(rows, {
    beforeCreate: () => {
      if (!rows.length) rows.push({ id: "row_old", clerkId: "user_OLD", email: "a@example.com" });
    },
  });
  const user = await resolveDbUser(NEW_ID, clerkUser("a@example.com", "verified"), deps);
  assert.equal(user?.id, "row_old");
  assert.equal(rows[0].clerkId, NEW_ID);
  assert.deepEqual(warnings, ["relinked:user_NEWa:verified-email-match"]);
});

test("uses the primary email, not the first address, and warns with no email in the payload", async () => {
  const { deps, warnings } = fakeDeps([]);
  const user = await resolveDbUser(NEW_ID, async () => ({ primaryEmailAddress: null }), deps);
  assert.equal(user, null);
  assert.deepEqual(warnings, ["unresolved:user_NEWa:no-primary-email"]);
  assert.ok(warnings.every((w) => !w.includes("@")));
});

test("a non-unique create failure resolves to null instead of throwing", async () => {
  const { deps, warnings } = fakeDeps([]);
  deps.create = async () => {
    throw new Error("database unreachable");
  };
  const user = await resolveDbUser(NEW_ID, clerkUser("a@example.com", "verified"), deps);
  assert.equal(user, null);
  assert.deepEqual(warnings, ["unresolved:user_NEWa:create-failed"]);
});
