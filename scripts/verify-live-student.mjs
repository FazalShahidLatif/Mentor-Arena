// Live end-to-end check of the registration → verification → login → dashboard
// flow against the deployed site. Creates one clearly-labelled test account and
// verifies it directly in Atlas so the full path can be exercised.
//
// Usage: node scripts/verify-live-student.mjs

import { MongoClient } from "mongodb";

const SITE = process.env.SITE_URL || "https://mentorarena.online";
const URI = (process.env.MONGODB_URI || "").trim();

if (!URI) {
  console.error("MONGODB_URI not set — cannot run the live check.");
  process.exit(1);
}

const STAMP = Date.now();
const EMAIL = `hermes-smoke-${STAMP}@example.test`;
const PASSWORD = "temporary-smoke-pass-9182";

let pass = 0, fail = 0;
const check = async (label, fn) => {
  try {
    const d = await fn();
    console.log(`  PASS  ${label}${d ? ` — ${d}` : ""}`);
    pass++;
  } catch (e) {
    console.log(`  FAIL  ${label} — ${e.message}`);
    fail++;
  }
};
const assert = (c, m) => { if (!c) throw new Error(m); };
const J = { "Content-Type": "application/json" };
const post = (p, b) => fetch(`${SITE}${p}`, { method: "POST", headers: J, body: JSON.stringify(b) });

const client = new MongoClient(URI, { retryWrites: false, serverSelectionTimeoutMS: 8000 });
await client.connect();
const users = client.db("mentor").collection("users");

console.log(`\nLive student flow against ${SITE}`);
console.log(`test account: ${EMAIL}\n`);

let cookie = "";
const authed = () => ({ ...J, Cookie: cookie });

try {
  await check("registers a new student", async () => {
    const r = await post("/api/auth/register", {
      name: "Smoke Tester", email: EMAIL, password: PASSWORD, phone: "03000000000",
    });
    assert(r.status === 200, `status ${r.status}`);
    const u = await users.findOne({ email: EMAIL });
    assert(u, "account not in Atlas");
    assert(u.passwordHash.startsWith("scrypt:"), "password not hashed");
    assert(!u.passwordHash.includes(PASSWORD), "plaintext stored");
    assert(u.verified === false, "should start unverified");
    return "stored with scrypt hash, verified=false";
  });

  await check("login before verification is refused", async () => {
    const r = await post("/api/auth/login", { email: EMAIL, password: PASSWORD });
    assert(r.status === 403, `expected 403, got ${r.status}`);
    return (await r.json()).error;
  });

  await check("dashboard is locked before login (the reported 401)", async () => {
    const r = await fetch(`${SITE}/api/my/enrollments`);
    assert(r.status === 401, `expected 401, got ${r.status}`);
    return "401 as expected when signed out";
  });

  await check("wrong password is rejected", async () => {
    const r = await post("/api/auth/login", { email: EMAIL, password: "not-the-password" });
    assert(r.status === 401, `expected 401, got ${r.status}`);
    return "rejected";
  });

  await check("verifying the account (as the emailed link would)", async () => {
    await users.updateOne({ email: EMAIL }, { $set: { verified: true } });
    return "verified=true";
  });

  await check("correct password logs in and sets the cookie", async () => {
    const r = await post("/api/auth/login", { email: EMAIL, password: PASSWORD });
    assert(r.status === 200, `status ${r.status}`);
    const c = (r.headers.get("set-cookie") || "").split(";")[0];
    assert(c.startsWith("ma_session="), `no cookie, got "${c}"`);
    cookie = c;
    return "ma_session issued";
  });

  for (const p of ["/api/my/enrollments", "/api/my/batches", "/api/tickets"]) {
    await check(`${p} returns 200 after login`, async () => {
      const r = await fetch(`${SITE}${p}`, { headers: authed() });
      assert(r.status === 200, `expected 200, got ${r.status} — the reported failure`);
      return "200 OK";
    });
  }

  await check("/api/invoices returns 200 after login", async () => {
    const r = await fetch(`${SITE}/api/invoices?email=${encodeURIComponent(EMAIL)}`, { headers: authed() });
    assert(r.status === 200, `expected 200, got ${r.status}`);
    return "200 OK";
  });

  await check("/api/auth/me returns the signed-in student", async () => {
    const r = await fetch(`${SITE}/api/auth/me`, { headers: authed() });
    const b = await r.json();
    assert(r.status === 200, `status ${r.status}`);
    assert(b.user.email === EMAIL, `wrong email: ${b.user.email}`);
    return `${b.user.name} <${b.user.email}>`;
  });

  await check("a student still cannot reach admin endpoints", async () => {
    const r = await fetch(`${SITE}/api/admin/users`, { headers: authed() });
    assert(r.status === 401, `expected 401, got ${r.status}`);
    return "blocked";
  });

  await check("site status is healthy", async () => {
    const b = await (await fetch(`${SITE}/api/status`)).json();
    assert(b.mongodbConnected === true, "mongo not connected");
    assert(b.adminSet === true, "admin not configured");
    return `${b.storageEngine}, adminSet=${b.adminSet}`;
  });
} finally {
  await users.deleteOne({ email: EMAIL });
  await client.close();
  console.log(`\ncleaned up test account ${EMAIL}`);
}

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail > 0 ? 1 : 0);
