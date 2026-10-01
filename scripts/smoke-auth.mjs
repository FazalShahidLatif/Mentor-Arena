// Exercises registration → verification → login → dashboard access against a
// real MongoDB scratch database, including the exact regression that caused the
// 401: a password login must set the cookie the dashboards authenticate with.
//
// Usage: MONGODB_URI=... node scripts/smoke-auth.mjs

import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

const uri = (process.env.MONGODB_URI || "").trim();
if (!uri) {
  console.error("MONGODB_URI not set — skipping (this test needs the real DB).");
  process.exit(0);
}
process.env.ADMIN_PASSWORD = "test-admin-password";

const SCRATCH_DB = "mentor_authtest";
const client = new MongoClient(uri, { retryWrites: false, serverSelectionTimeoutMS: 8000 });
await client.connect();
await client.db(SCRATCH_DB).dropDatabase();

const { default: app } = await import("../api/index.js");
const { MongoClient: MC } = await import("mongodb");
const orig = MC.prototype.connect;
MC.prototype.connect = async function () {
  const r = await orig.call(this);
  this.db = () => client.db(SCRATCH_DB);
  return r;
};

const PORT = 4402;
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
const db = client.db(SCRATCH_DB);

const J = { "Content-Type": "application/json" };
const post = (p, body, headers = J) =>
  fetch(`${BASE}${p}`, { method: "POST", headers, body: JSON.stringify(body) });
const cookieOf = (res) => (res.headers.get("set-cookie") || "").split(";")[0];

const EMAIL = "student@example.test";
const PASS = "correct-horse-battery";

console.log("\nRegistration");
await check("creates an account", async () => {
  const r = await post("/api/auth/register", { name: "Test Student", email: EMAIL, password: PASS, phone: "0300" });
  assert(r.status === 200, `status ${r.status}`);
  return (await r.json()).message;
});

await check("stores a hash, never the plaintext", async () => {
  const u = await db.collection("users").findOne({ email: EMAIL });
  assert(u.passwordHash.startsWith("scrypt:"), "not a scrypt hash");
  assert(!u.passwordHash.includes(PASS), "plaintext password stored");
  assert(u.verified === false, "account should start unverified");
  return "scrypt hash, verified=false";
});

await check("two accounts with the same password get different hashes", async () => {
  await post("/api/auth/register", { name: "Other", email: "other@example.test", password: PASS });
  const a = await db.collection("users").findOne({ email: EMAIL });
  const b = await db.collection("users").findOne({ email: "other@example.test" });
  assert(a.passwordHash !== b.passwordHash, "identical hashes — salt is not random");
  return "salted";
});

await check("rejects a duplicate email", async () => {
  const r = await post("/api/auth/register", { name: "Dup", email: EMAIL, password: PASS });
  assert(r.status === 409, `expected 409, got ${r.status}`);
  return "blocked";
});

await check("rejects a short password", async () => {
  const r = await post("/api/auth/register", { name: "S", email: "s@example.test", password: "short" });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  return "minimum length enforced";
});

await check("rejects an invalid email", async () => {
  const r = await post("/api/auth/register", { name: "X", email: "+923190548017", password: PASS });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  return "phone number in email field rejected";
});

console.log("\nLogin before verification");
await check("unverified account cannot log in", async () => {
  const r = await post("/api/auth/login", { email: EMAIL, password: PASS });
  assert(r.status === 403, `expected 403, got ${r.status}`);
  return (await r.json()).error;
});

console.log("\nLogin after verification");
await check("verification flips the account to verified", async () => {
  await db.collection("users").updateOne({ email: EMAIL }, { $set: { verified: true } });
  const u = await db.collection("users").findOne({ email: EMAIL });
  assert(u.verified === true, "still unverified");
  return "verified=true";
});

let session = "";
await check("correct password logs in and sets ma_session", async () => {
  const r = await post("/api/auth/login", { email: EMAIL, password: PASS });
  assert(r.status === 200, `status ${r.status}`);
  const c = cookieOf(r);
  assert(c.startsWith("ma_session="), `no ma_session cookie, got: ${c}`);
  session = c;
  return "cookie issued";
});

await check("wrong password is rejected", async () => {
  const r = await post("/api/auth/login", { email: EMAIL, password: "wrong-password" });
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "rejected";
});

await check("unknown email gives the same message as a wrong password", async () => {
  const r = await post("/api/auth/login", { email: "nobody@example.test", password: PASS });
  const a = await r.json();
  const b = await (await post("/api/auth/login", { email: EMAIL, password: "wrong-password" })).json();
  assert(r.status === 401, `expected 401, got ${r.status}`);
  assert(a.error === b.error, `messages differ: "${a.error}" vs "${b.error}"`);
  return "no account enumeration";
});

console.log("\nTHE REGRESSION — dashboard access after password login");
const authed = { ...J, Cookie: session };

await check("GET /api/my/enrollments works with the login cookie", async () => {
  const r = await fetch(`${BASE}/api/my/enrollments`, { headers: authed });
  assert(r.status === 200, `expected 200, got ${r.status} — this was the 401 students hit`);
  return "200 OK";
});

await check("GET /api/my/batches works with the login cookie", async () => {
  const r = await fetch(`${BASE}/api/my/batches`, { headers: authed });
  assert(r.status === 200, `expected 200, got ${r.status}`);
  return "200 OK";
});

await check("GET /api/tickets works with the login cookie", async () => {
  const r = await fetch(`${BASE}/api/tickets`, { headers: authed });
  assert(r.status === 200, `expected 200, got ${r.status}`);
  return "200 OK";
});

await check("GET /api/invoices works with the login cookie", async () => {
  const r = await fetch(`${BASE}/api/invoices?email=${encodeURIComponent(EMAIL)}`, { headers: authed });
  assert(r.status === 200, `expected 200, got ${r.status}`);
  return "200 OK";
});

await check("GET /api/auth/me identifies the student", async () => {
  const r = await fetch(`${BASE}/api/auth/me`, { headers: authed });
  const b = await r.json();
  assert(r.status === 200, `status ${r.status}`);
  assert(b.user.email === EMAIL, `wrong email ${b.user.email}`);
  assert(b.user.name === "Test Student", `wrong name ${b.user.name}`);
  return b.user.name;
});

console.log("\nIsolation");
await check("a student cannot read another student's invoices", async () => {
  const other = "ma_session=" + encodeURIComponent(JSON.stringify({ email: "intruder@example.test", role: "student" }));
  const r = await fetch(`${BASE}/api/invoices?email=${encodeURIComponent(EMAIL)}`, { headers: { ...J, Cookie: other } });
  const b = await r.json();
  assert(!b.some?.((i) => i.studentEmail === EMAIL), "leaked another student's invoice");
  return "scoped";
});

await check("a student cannot reach admin endpoints", async () => {
  const r = await fetch(`${BASE}/api/admin/users`, { headers: authed });
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "blocked";
});

await check("logout clears the cookie", async () => {
  const r = await post("/api/auth/logout", {}, { ...J, Cookie: session });
  assert(r.status === 200, `status ${r.status}`);
  return "ok";
});

console.log("\nExisting Google users still work");
await check("google sign-in upserts without breaking a password account", async () => {
  const r = await post("/api/auth/google", {
    profile: { email: EMAIL, name: "Test Student", email_verified: true, sub: "g-123" },
  });
  assert(r.status === 200, `status ${r.status}`);
  const u = await db.collection("users").findOne({ email: EMAIL });
  assert(u.passwordHash, "google upsert wiped the password hash");
  return "password preserved";
});

await client.db(SCRATCH_DB).dropDatabase();
MC.prototype.connect = orig;
server.close();
await client.close();
console.log(`\n${pass} passed, ${fail} failed — scratch DB dropped\n`);
process.exit(fail > 0 ? 1 : 0);
