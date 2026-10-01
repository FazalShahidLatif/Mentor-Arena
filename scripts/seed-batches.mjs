// Seed the Mentor Arena MongoDB "batches" collection with the real cohort
// definitions. Safe to re-run: it only inserts batches that don't exist yet,
// keyed by id, so it will never duplicate or clobber enrolled counts.
//
// Usage: node scripts/seed-batches.mjs
// Requires MONGODB_URI in the environment (read from .env.local if present).

import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

// load .env.local if present (Vercel link writes it; do not commit it)
const envLocal = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocal)) {
  for (const line of fs.readFileSync(envLocal, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const uri = (process.env.MONGODB_URI || "").trim();
if (!uri || uri.includes("***") || uri.includes("<password>")) {
  console.error("MONGODB_URI is not set. Add it to .env.local and retry.");
  process.exit(1);
}

const BATCHES = [
  {
    id: "batch-seo-1",
    name: "SEO Batch A — Tue/Thu 10PM PKT",
    maxSeats: 6,
    enrolled: 0,
    course: "SEO",
    monthlyFee: 12000,
    schedule: {
      dayOfWeek: "Tuesday & Thursday",
      time: "10:00 PM – 12:00 AM PKT",
      session1: "10:00 PM – 10:50 PM PKT",
      break: "10:51 PM – 11:10 PM PKT",
      session2: "11:11 PM – 12:00 AM PKT",
      timeZone: "Asia/Karachi (PKT)",
    },
    zoomLinks: { session1: "", session2: "" },
    syllabus: [
      "Week 1: SEO foundations — how search works, keywords that matter",
      "Week 2: On-page SEO — title, meta, headings, content structure",
      "Week 3: Technical SEO basics — speed, mobile, crawlability",
      "Week 4: Local SEO — Google Business Profile, citations, NAP",
    ],
  },
  {
    id: "batch-webdev-1",
    name: "Web Dev Batch A — Sat/Sun 2PM PKT",
    maxSeats: 6,
    enrolled: 0,
    course: "Web Development",
    monthlyFee: 15000,
    schedule: {
      dayOfWeek: "Saturday & Sunday",
      time: "2:00 PM – 4:00 PM PKT",
      session1: "2:00 PM – 2:50 PM PKT",
      break: "2:51 PM – 3:10 PM PKT",
      session2: "3:11 PM – 4:00 PM PKT",
      timeZone: "Asia/Karachi (PKT)",
    },
    zoomLinks: { session1: "", session2: "" },
    syllabus: [
      "Week 1: HTML + CSS foundations — build your first page",
      "Week 2: JavaScript basics — variables, loops, functions",
      "Week 3: DOM manipulation — make pages come alive",
      "Week 4: Intro to React — components, props, state",
    ],
  },
];

const client = new MongoClient(uri, { retryWrites: false, serverSelectionTimeoutMS: 8000 });
await client.connect();
const db = client.db("mentor");

const existing = await db.collection("batches").find({}, { projection: { id: 1 } }).toArray();
const existingIds = new Set(existing.map((b) => b.id));

const toInsert = BATCHES.filter((b) => !existingIds.has(b.id));

if (toInsert.length === 0) {
  console.log(`Nothing to do — all ${BATCHES.length} batches already present.`);
} else {
  await db.collection("batches").insertMany(toInsert);
  console.log(`Inserted ${toInsert.length} batch(es):`);
  toInsert.forEach((b) => console.log(`  + ${b.id}  ${b.name}`));
}

await db.collection("batches").createIndex({ id: 1 }, { unique: true });
await db.collection("enrollments").createIndex({ id: 1 }, { unique: true }).catch(() => {});
await db.collection("leads").createIndex({ email: 1 }).catch(() => {});

console.log("\nIndexes ensured on batches(id), enrollments(id), leads(email).");

const total = await db.collection("batches").countDocuments();
console.log(`\nBatches now in database: ${total}`);
await client.close();
