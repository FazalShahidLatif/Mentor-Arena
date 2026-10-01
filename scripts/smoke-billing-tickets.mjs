// Exercises the invoices, tickets and roles API against a REAL MongoDB
// (a scratch database that is dropped at the end). Run with MONGODB_URI set.
//
// Usage: MONGODB_URI=... node scripts/smoke-billing-tickets.mjs

import { MongoClient } from "mongodb";

const uri = (process.env.MONGODB_URI || "").trim();
if (!uri) {
  console.error("MONGODB_URI not set — skipping (this test needs the real DB).");
  process.exit(0);
}

process.env.ADMIN_PASSWORD = "test-admin-password";

const SCRATCH_DB = "mentor_smoketest";

// Point the app at the scratch DB by overriding the db name it opens.
const client = new MongoClient(uri, { retryWrites: false, serverSelectionTimeoutMS: 8000 });
await client.connect();
await client.db(SCRATCH_DB).collection("batches").deleteMany({});

const { default: app } = await import("../api/index.js");

// app hardcodes db("mentor"); monkeypatch to redirect to the scratch db.
const { MongoClient: MC } = await import("mongodb");
const origConnect = MC.prototype.connect;
MC.prototype.connect = async function () {
  const r = await origConnect.call(this);
  this.db = () => client.db(SCRATCH_DB);
  return r;
};

const PORT = 4401;
const server = app.listen(PORT);
await new Promise((r) => server.once("listening", r));
const BASE = `http://127.0.0.1:${PORT}`;

let pass = 0, fail = 0;
async function check(label, fn) {
  try {
    const d = await fn();
    console.log(`  PASS  ${label}${d ? ` — ${d}` : ""}`);
    pass++;
  } catch (e) {
    console.log(`  FAIL  ${label} — ${e.message}`);
    fail++;
  }
}
const assert = (c, m) => { if (!c) throw new Error(m); };

const ADMIN = { "Content-Type": "application/json", "x-admin-token": "test-admin-password" };
const db = client.db(SCRATCH_DB);

// seed: one confirmed enrollment so invoices have something to bill
await db.collection("batches").insertOne({
  id: "b-test", name: "Test Batch", maxSeats: 5, enrolled: 1, course: "SEO", monthlyFee: 12000,
});
await db.collection("enrollments").insertOne({
  id: "e-test", name: "Test Student", email: "student@test.local",
  batchId: "b-test", batchName: "Test Batch", status: "confirmed",
  enrolledAt: new Date().toISOString(),
});

console.log("\nInvoices — monthly generation");
let month;
await check("generates one invoice for the confirmed enrollment", async () => {
  const r = await fetch(`${BASE}/api/admin/invoices/generate`, { method: "POST", headers: ADMIN });
  assert(r.status === 200, `status ${r.status}`);
  const b = await r.json();
  assert(b.created === 1, `created=${b.created}`);
  month = b.month;
  return `${b.monthLabel} — PKR ${12000}`;
});

await check("is idempotent (second run creates nothing)", async () => {
  const r = await fetch(`${BASE}/api/admin/invoices/generate`, { method: "POST", headers: ADMIN });
  const b = await r.json();
  assert(b.created === 0, `created=${b.created} on rerun`);
  return `skipped ${b.skipped}`;
});

await check("admin sees all invoices", async () => {
  const r = await fetch(`${BASE}/api/invoices`, { headers: ADMIN });
  assert(r.status === 200, `status ${r.status}`);
  const list = await r.json();
  assert(list.length === 1, `expected 1, got ${list.length}`);
  assert(list[0]._id === undefined, "_id leaked");
  return `${list.length} invoice`;
});

await check("student sees only their own", async () => {
  const r = await fetch(`${BASE}/api/invoices?email=student@test.local`);
  const mine = await r.json();
  assert(mine.length === 1, `expected 1, got ${mine.length}`);
  const r2 = await fetch(`${BASE}/api/invoices?email=nobody@test.local`);
  assert((await r2.json()).length === 0, "leaked another user's invoices");
  return "scoped correctly";
});

await check("invoice list requires email for non-admins", async () => {
  const r = await fetch(`${BASE}/api/invoices`);
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "blocked";
});

let invId;
await check("mark invoice paid", async () => {
  const list = await (await fetch(`${BASE}/api/invoices`, { headers: ADMIN })).json();
  invId = list[0].id;
  const r = await fetch(`${BASE}/api/admin/invoices/${invId}`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ status: "paid" }),
  });
  assert(r.status === 200, `status ${r.status}`);
  const after = await (await fetch(`${BASE}/api/invoices`, { headers: ADMIN })).json();
  assert(after[0].status === "paid", `status ${after[0].status}`);
  assert(after[0].paidAt, "paidAt not set");
  return "paid";
});

await check("rejects an invalid status", async () => {
  const r = await fetch(`${BASE}/api/admin/invoices/${invId}`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ status: "banana" }),
  });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  return "validated";
});

await check("reminder run reports no unpaid after marking paid", async () => {
  const r = await fetch(`${BASE}/api/admin/invoices/remind`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ month }),
  });
  const b = await r.json();
  assert(b.total === 0, `total=${b.total}`);
  return b.message;
});

console.log("\nSupport tickets");
await check("creating a ticket without a session is 401", async () => {
  const r = await fetch(`${BASE}/api/tickets`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject: "hi", message: "there" }),
  });
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "blocked";
});

// sign the student in via cookie
const studentCookie = "ma_session=" + encodeURIComponent(
  JSON.stringify({ email: "student@test.local", role: "student", name: "Test Student" })
);
const STU = { "Content-Type": "application/json", Cookie: studentCookie };

await check("student opens a ticket", async () => {
  const r = await fetch(`${BASE}/api/tickets`, {
    method: "POST", headers: STU,
    body: JSON.stringify({ subject: "Zoom link not working", message: "Session 2 link 404s", priority: "high" }),
  });
  assert(r.status === 200, `status ${r.status}`);
  const b = await r.json();
  assert(b.ticket.messages.length === 1, "no initial message");
  assert(b.ticket.status === "open", `status ${b.ticket.status}`);
  return b.ticket.id;
});

await check("subject is required", async () => {
  const r = await fetch(`${BASE}/api/tickets`, {
    method: "POST", headers: STU, body: JSON.stringify({ message: "orphan" }),
  });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  return "validated";
});

let ticketId;
await check("admin sees the ticket", async () => {
  const list = await (await fetch(`${BASE}/api/tickets`, { headers: ADMIN })).json();
  assert(list.length === 1, `expected 1, got ${list.length}`);
  ticketId = list[0].id;
  return ticketId;
});

await check("admin replies and ticket stays scoped", async () => {
  const r = await fetch(`${BASE}/api/tickets/${ticketId}/reply`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ body: "Fixed — new link sent." }),
  });
  assert(r.status === 200, `status ${r.status}`);
  const list = await (await fetch(`${BASE}/api/tickets`, { headers: ADMIN })).json();
  assert(list[0].messages.length === 2, `messages=${list[0].messages.length}`);
  assert(list[0].messages[1].fromRole === "admin", "wrong role on reply");
  return "threaded reply added";
});

await check("student can read the reply", async () => {
  const list = await (await fetch(`${BASE}/api/tickets`, { headers: STU })).json();
  assert(list.length === 1, `expected 1, got ${list.length}`);
  assert(list[0].messages.length === 2, "reply not visible to student");
  return "visible";
});

await check("student cannot touch another user's ticket", async () => {
  const other = "ma_session=" + encodeURIComponent(JSON.stringify({ email: "intruder@test.local", role: "student" }));
  const r = await fetch(`${BASE}/api/tickets/${ticketId}/reply-student`, {
    method: "POST", headers: { "Content-Type": "application/json", Cookie: other },
    body: JSON.stringify({ body: "hijack" }),
  });
  assert(r.status === 404, `expected 404, got ${r.status}`);
  return "blocked";
});

await check("admin closes the ticket", async () => {
  const r = await fetch(`${BASE}/api/tickets/${ticketId}/reply`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ body: "All good.", status: "closed" }),
  });
  assert(r.status === 200, `status ${r.status}`);
  const list = await (await fetch(`${BASE}/api/tickets`, { headers: ADMIN })).json();
  assert(list[0].status === "closed", `status ${list[0].status}`);
  return "closed";
});

await check("replying requires auth", async () => {
  const r = await fetch(`${BASE}/api/tickets/${ticketId}/reply`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: "x" }),
  });
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "blocked";
});

console.log("\nRoles (superadmin only)");
await check("lists users", async () => {
  const r = await fetch(`${BASE}/api/admin/users`, { headers: ADMIN });
  assert(r.status === 200, `status ${r.status}`);
  assert(Array.isArray(await r.json()), "not an array");
  return "ok";
});

await check("superadmin assigns a role", async () => {
  const r = await fetch(`${BASE}/api/admin/users/role`, {
    method: "POST", headers: ADMIN,
    body: JSON.stringify({ email: "NewGuy@Test.local", role: "mentor" }),
  });
  assert(r.status === 200, `status ${r.status}`);
  const b = await r.json();
  assert(b.created === true, "not upserted");
  return "mentor assigned, email lowercased";
});

await check("rejects an unknown role", async () => {
  const r = await fetch(`${BASE}/api/admin/users/role`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ email: "x@y.z", role: "wizard" }),
  });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  return "validated";
});

await check("superadmin invites an admin account", async () => {
  const r = await fetch(`${BASE}/api/admin/users/invite`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ email: "admin2@test.local", role: "admin" }),
  });
  assert(r.status === 200, `status ${r.status}`);
  return "invited";
});

await check("refuses to invite a duplicate admin", async () => {
  const r = await fetch(`${BASE}/api/admin/users/invite`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ email: "admin2@test.local", role: "admin" }),
  });
  assert(r.status === 409, `expected 409, got ${r.status}`);
  return "blocked";
});

await check("cannot invite as superadmin (no privilege escalation)", async () => {
  const r = await fetch(`${BASE}/api/admin/users/invite`, {
    method: "POST", headers: ADMIN, body: JSON.stringify({ email: "sneaky@test.local", role: "superadmin" }),
  });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  return "blocked";
});

await check("role endpoints reject non-admins", async () => {
  const r = await fetch(`${BASE}/api/admin/users/role`, {
    method: "POST", headers: STU, body: JSON.stringify({ email: "a@b.c", role: "admin" }),
  });
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "blocked";
});

// cleanup
await client.db(SCRATCH_DB).dropDatabase();
MC.prototype.connect = origConnect;
server.close();
await client.close();
console.log(`\n${pass} passed, ${fail} failed — scratch DB dropped\n`);
process.exit(fail > 0 ? 1 : 0);
