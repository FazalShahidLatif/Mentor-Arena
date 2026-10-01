// Smoke test for the batch/enrollment API in api/index.js.
// Boots the Express app on a spare port and exercises the endpoints the
// frontend actually calls, so a 404 in production cannot slip through again.

process.env.MONGODB_URI = ""; // force the file-fallback path
process.env.ADMIN_PASSWORD = "test-admin-password";

const { default: app } = await import("../api/index.js");

const PORT = 4399;
const server = app.listen(PORT);
await new Promise((r) => server.once("listening", r));

const BASE = `http://127.0.0.1:${PORT}`;
let pass = 0;
let fail = 0;

async function check(label, fn) {
  try {
    const detail = await fn();
    console.log(`  PASS  ${label}${detail ? ` — ${detail}` : ""}`);
    pass++;
  } catch (e) {
    console.log(`  FAIL  ${label} — ${e.message}`);
    fail++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

console.log("\nUnauthenticated endpoints");
await check("GET /api/batches returns JSON array", async () => {
  const r = await fetch(`${BASE}/api/batches`);
  assert(r.status === 200, `status ${r.status}`);
  const body = await r.json();
  assert(Array.isArray(body), "not an array");
  return `${body.length} batches`;
});

console.log("\nAdmin endpoints require auth");
for (const p of ["/api/admin/batches", "/api/admin/enrollments"]) {
  await check(`GET ${p} is 401 without token`, async () => {
    const r = await fetch(`${BASE}${p}`);
    assert(r.status === 401, `expected 401, got ${r.status}`);
    return "correctly blocked";
  });
}
await check("POST /api/admin/enrollment/pay is 401 without token", async () => {
  const r = await fetch(`${BASE}/api/admin/enrollment/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enrollmentId: "x" }),
  });
  assert(r.status === 401, `expected 401, got ${r.status}`);
  return "correctly blocked";
});

console.log("\nAdmin endpoints with token");
const H = {
  "Content-Type": "application/json",
  "x-admin-token": process.env.ADMIN_PASSWORD,
};

await check("GET /api/admin/batches returns array", async () => {
  const r = await fetch(`${BASE}/api/admin/batches`, { headers: H });
  assert(r.status === 200, `status ${r.status}`);
  const body = await r.json();
  assert(Array.isArray(body), "not an array");
  return `${body.length} batches`;
});

await check("GET /api/admin/enrollments returns array", async () => {
  const r = await fetch(`${BASE}/api/admin/enrollments`, { headers: H });
  assert(r.status === 200, `status ${r.status}`);
  const body = await r.json();
  assert(Array.isArray(body), "not an array");
  return `${body.length} enrollments`;
});

console.log("\nEnrollment flow");
await check("POST /api/enroll rejects missing fields", async () => {
  const r = await fetch(`${BASE}/api/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Only Name" }),
  });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  return "validation works";
});

// Seed a batch via the DB-free file path by writing one the enroll route reads.
const fs = await import("fs");
const path = await import("path");
const dataDir = path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });
const batchesFile = path.join(dataDir, "batches.json");
const enrollmentsFile = path.join(dataDir, "enrollments.json");
const leadsFile = path.join(dataDir, "leads.json");
fs.writeFileSync(
  batchesFile,
  JSON.stringify(
    [{ id: "smoke-batch", name: "Smoke Test Batch", maxSeats: 2, enrolled: 0, zoomLinks: {} }],
    null,
    2
  )
);
fs.writeFileSync(enrollmentsFile, "[]");
fs.writeFileSync(leadsFile, "[]");

let createdId = null;
await check("POST /api/enroll creates a pending enrollment", async () => {
  const r = await fetch(`${BASE}/api/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Smoke Tester",
      email: "smoke@example.com",
      phone: "03000000000",
      city: "Karachi",
      batchId: "smoke-batch",
      note: "automated test",
    }),
  });
  assert(r.status === 200, `status ${r.status}`);
  const body = await r.json();
  assert(body.success, "success flag false");
  assert(body.enrollment?.status === "pending_payment", `status ${body.enrollment?.status}`);
  createdId = body.enrollment.id;
  return `id ${createdId}`;
});

await check("enrollment also lands in the leads capture", async () => {
  const leads = JSON.parse(fs.readFileSync(leadsFile, "utf8"));
  assert(leads.length === 1, `expected 1 lead, got ${leads.length}`);
  assert(leads[0].type === "enrollment", "missing enrollment type");
  assert(leads[0].email === "smoke@example.com", "wrong email");
  return "lead captured";
});

await check("batch seat count incremented", async () => {
  const batches = JSON.parse(fs.readFileSync(batchesFile, "utf8"));
  assert(batches[0].enrolled === 1, `enrolled=${batches[0].enrolled}`);
  return "enrolled=1";
});

await check("POST /api/admin/enrollment/pay marks it confirmed", async () => {
  const r = await fetch(`${BASE}/api/admin/enrollment/pay`, {
    method: "POST",
    headers: H,
    body: JSON.stringify({ enrollmentId: createdId }),
  });
  assert(r.status === 200, `status ${r.status}`);
  const enrollments = JSON.parse(fs.readFileSync(enrollmentsFile, "utf8"));
  const e = enrollments.find((x) => x.id === createdId);
  assert(e.status === "confirmed", `status ${e.status}`);
  assert(e.paidAt, "paidAt not set");
  return "confirmed";
});

await check("POST /api/enroll rejects a full batch", async () => {
  fs.writeFileSync(
    batchesFile,
    JSON.stringify(
      [{ id: "smoke-batch", name: "Smoke Test Batch", maxSeats: 1, enrolled: 1, zoomLinks: {} }],
      null,
      2
    )
  );
  const r = await fetch(`${BASE}/api/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Too Late", email: "late@example.com", batchId: "smoke-batch" }),
  });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  const body = await r.json();
  assert(/full/i.test(body.error), `unexpected error: ${body.error}`);
  return body.error;
});

console.log("\nPublic list hides enrolled students");
await check("GET /api/batches anonymizes student data", async () => {
  const r = await fetch(`${BASE}/api/batches`);
  const body = await r.json();
  const b = body[0];
  assert(b.enrolledStudents === undefined, "enrolledStudents leaked");
  assert(typeof b.availableSeats === "number", "availableSeats missing");
  return `availableSeats=${b.availableSeats}`;
});

// clean up
fs.writeFileSync(batchesFile, "[]");
fs.writeFileSync(enrollmentsFile, "[]");
fs.writeFileSync(leadsFile, "[]");

server.close();
console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail > 0 ? 1 : 0);
