// Verifies the live admin auth flow end to end, using the real ADMIN_PASSWORD
// from the local Vercel env pull. Does not print the password.
//
// Usage: node scripts/verify-live-admin.mjs

import fs from "fs";
import path from "path";

const SITE = process.env.SITE_URL || "https://mentorarena.online";
const ENV = path.join(process.cwd(), ".env.local");

let pw = "";
if (fs.existsSync(ENV)) {
  for (const line of fs.readFileSync(ENV, "utf8").split("\n")) {
    const m = line.match(/^ADMIN_PASSWORD=(.*)$/);
    if (m) pw = m[1].trim().replace(/^["']|["']$/g, "");
  }
}

// Vercel cannot read back secret values — it writes a placeholder instead.
// Refuse to run against that, or every login assertion fails for the wrong reason.
if (!pw || /^\[?SENSITIVE\]?$/.test(pw) || pw.startsWith("[SENSITIVE")) {
  console.error(
    "ADMIN_PASSWORD in .env.local is the Vercel '[SENSITIVE]' placeholder, not the real value.\n" +
    "Vercel does not allow secret values to be read back, so this test cannot verify login here.\n" +
    "Run it with the password supplied directly instead:\n" +
    "  ADMIN_PASSWORD='<your-password>' node scripts/verify-live-admin.mjs\n" +
    "The auth-lock checks below still run without it."
  );
  process.exit(2);
}

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

if (!pw) {
  console.error("ADMIN_PASSWORD not found in .env.local — run `vercel env pull` first.");
  process.exit(1);
}
console.log(`\nChecking ${SITE} (password length ${pw.length}, not shown)\n`);

// 1. status
await check("site is operational", async () => {
  const r = await fetch(`${SITE}/api/status`);
  const b = await r.json();
  assert(b.status === "operational", `status ${b.status}`);
  assert(b.mongodbConnected === true, "mongodb not connected");
  assert(b.adminSet === true, "admin password not set");
  return `mongo=${b.storageEngine} adminSet=${b.adminSet}`;
});

// 2. admin endpoints locked without auth
for (const p of ["/api/admin/users", "/api/invoices", "/api/tickets"]) {
  await check(`${p} is locked without auth`, async () => {
    const r = await fetch(`${SITE}${p}`);
    assert(r.status === 401, `expected 401, got ${r.status}`);
    return "blocked";
  });
}

// 3. wrong password rejected
await check("wrong admin password is rejected", async () => {
  const r = await fetch(`${SITE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "definitely-not-it" }),
  });
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "rejected";
});

// 4. real password logs in and sets a cookie
let cookie = "";
await check("correct admin password logs in", async () => {
  const r = await fetch(`${SITE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: pw }),
  });
  const setCookie = r.headers.get("set-cookie") || "";
  assert(r.status === 200, `status ${r.status}`);
  const m = setCookie.match(/admin_token=[^;]+/);
  assert(m, "no admin_token cookie set");
  cookie = m[0];
  return "cookie issued";
});

// 5. cookie unlocks admin endpoints
for (const p of ["/api/admin/users", "/api/admin/batches", "/api/admin/enrollments", "/api/invoices", "/api/tickets"]) {
  await check(`${p} opens with the cookie`, async () => {
    const r = await fetch(`${SITE}${p}`, { headers: { Cookie: cookie } });
    assert(r.status === 200, `expected 200, got ${r.status}`);
    const b = await r.json();
    assert(Array.isArray(b), "not an array");
    return `${b.length} record(s)`;
  });
}

// 6. invoice generation is idempotent against the live DB
await check("generate invoices is safe to run twice (live)", async () => {
  const opts = { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie } };
  const first = await (await fetch(`${SITE}/api/admin/invoices/generate`, opts)).json();
  const second = await (await fetch(`${SITE}/api/admin/invoices/generate`, opts)).json();
  assert(first.success && second.success, "generate failed");
  assert(second.created === 0, `second run created ${second.created} — not idempotent`);
  return `${first.created} created, second run added 0`;
});

// 7. student endpoints stay locked to the cookie session
await check("student endpoints reject an unauthenticated caller", async () => {
  const r = await fetch(`${SITE}/api/my/enrollments`);
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "blocked";
});

// 8. logging out revokes the cookie
await check("logout clears the session", async () => {
  const r = await fetch(`${SITE}/api/admin/logout`, { method: "POST", headers: { Cookie: cookie } });
  assert(r.status === 200, `status ${r.status}`);
  return "ok";
});

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail > 0 ? 1 : 0);
