import express from "express";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";

const isVercel = !!process.env.VERCEL;

// --- MongoDB Database Connection ---
let mongoClient = null;
let mongoDb = null;
let isConnectingMongo = false;

async function getDb() {
  if (mongoDb) return mongoDb;
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("***") || uri.includes("<password>")) {
    return null;
  }
  if (isConnectingMongo) return null;
  try {
    isConnectingMongo = true;
    mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await mongoClient.connect();
    mongoDb = mongoClient.db("mentor");
    console.log("Connected to MongoDB Atlas database 'mentor'");
    return mongoDb;
  } catch (err) {
    console.warn("MongoDB connection failed, falling back to local file storage:", err.message);
    mongoDb = null;
    mongoClient = null;
    return null;
  } finally {
    isConnectingMongo = false;
  }
}

const configPath = isVercel
  ? path.join("/tmp", "config.json")
  : path.join(process.cwd(), "data", "config.json");

const leadsPath = isVercel
  ? path.join("/tmp", "leads.json")
  : path.join(process.cwd(), "data", "leads.json");

// Ensure files exist
function ensureFiles() {
  try {
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, JSON.stringify({}, null, 2));
    }
  } catch (e) {}
  try {
    if (!fs.existsSync(leadsPath)) {
      fs.writeFileSync(leadsPath, JSON.stringify([], null, 2));
    }
  } catch (e) {}
}
ensureFiles();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Status
app.get("/api/status", async (_req, res) => {
  const db = await getDb().catch(() => null);
  res.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    vercel: isVercel,
    adminSet: !!process.env.ADMIN_PASSWORD,
    mongodbConnected: !!db,
    googleOAuthConfigured: true,
    googleClientId: process.env.GOOGLE_CLIENT_ID || "524446216074-121be4jq4eloq5akpmskk1a83gkfbjp6.apps.googleusercontent.com",
    storageEngine: db ? "mongodb_atlas" : "json_fallback"
  });
});

// Google OAuth verification and session route
app.post("/api/auth/google", async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile || !profile.email) {
      return res.status(400).json({ error: "Missing Google profile data" });
    }

    const userData = {
      email: profile.email,
      name: profile.name || "Arena Student",
      picture: profile.picture || "",
      sub: profile.sub || "",
      verifiedEmail: profile.email_verified ?? true,
      lastLogin: new Date().toISOString(),
      provider: "google",
    };

    const db = await getDb().catch(() => null);
    if (db) {
      const usersCol = db.collection("users");
      await usersCol.updateOne(
        { email: userData.email },
        { $set: userData, $setOnInsert: { createdAt: new Date().toISOString() } },
        { upsert: true }
      );
      const leadsCol = db.collection("leads");
      await leadsCol.updateOne(
        { email: userData.email },
        {
          $setOnInsert: {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            phone: "---",
            track: "Google Auth Registered Student",
            source: "google_oauth",
            timestamp: new Date().toISOString(),
          }
        },
        { upsert: true }
      );
    }

    res.json({ success: true, user: userData });
  } catch (err) {
    console.error("Error processing Google Auth:", err);
    res.status(500).json({ error: "Failed to process Google authentication" });
  }
});

// Admin middleware
const checkAdmin = (req, res, next) => {
  if (req.cookies?.admin_token === "mentor_arena_admin_session") {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(503).json({ error: "Admin login not configured." });
  }
  if (password === adminPassword) {
    res.cookie("admin_token", "mentor_arena_admin_session", {
      httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000
    });
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Invalid password" });
});

// Admin logout
app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});

// Config GET
app.get("/api/config", async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const configDoc = await db.collection("config").findOne({ _id: "site_config" });
      if (configDoc && configDoc.data) {
        return res.json(configDoc.data);
      }
    }
  } catch (e) {
    console.warn("MongoDB config fetch failed, using file fallback:", e);
  }

  try {
    if (fs.existsSync(configPath)) {
      const config = fs.readFileSync(configPath, "utf8");
      if (config.trim()) {
        const parsed = JSON.parse(config);
        if (parsed && typeof parsed === "object") {
          return res.json(parsed);
        }
      }
    }
  } catch (e) {}
  res.json({});
});

// Config POST (admin)
app.post("/api/admin/config", checkAdmin, async (req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      await db.collection("config").updateOne(
        { _id: "site_config" },
        { $set: { data: req.body, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save config" });
  }
});

// Leads POST
app.post("/api/leads", async (req, res) => {
  try {
    const newLead = { ...req.body, id: Date.now().toString(), timestamp: new Date().toISOString() };
    
    const db = await getDb().catch(() => null);
    if (db) {
      try {
        await db.collection("leads").insertOne({ ...newLead });
      } catch (dbErr) {
        console.warn("Failed to insert lead into MongoDB, saving to file:", dbErr);
      }
    }

    let leads = [];
    if (fs.existsSync(leadsPath)) {
      try {
        leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
      } catch (e) {}
    }
    leads.push(newLead);
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save lead" });
  }
});

// Admin leads GET
app.get("/api/admin/leads", checkAdmin, async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const leads = await db.collection("leads").find().sort({ timestamp: -1 }).toArray();
      if (leads && leads.length > 0) {
        return res.json(leads);
      }
    }
  } catch (e) {
    console.warn("MongoDB leads fetch failed, using file fallback:", e);
  }

  try {
    if (fs.existsSync(leadsPath)) {
      const leads = fs.readFileSync(leadsPath, "utf8");
      return res.json(JSON.parse(leads));
    }
  } catch (e) {}
  res.json([]);
});

// Leads GET (public)
app.get("/api/leads", async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const leads = await db.collection("leads").find().sort({ timestamp: -1 }).toArray();
      if (leads && leads.length > 0) {
        return res.json(leads);
      }
    }
  } catch (e) {
    console.warn("MongoDB leads fetch failed, using file fallback:", e);
  }

  try {
    if (fs.existsSync(leadsPath)) {
      const leads = fs.readFileSync(leadsPath, "utf8");
      return res.json(JSON.parse(leads));
    }
  } catch (e) {}
  res.json([]);
});

// --- Batches API (Vercel serverless) ---

const batchesPathVercel = path.join("/tmp", "batches.json");
const enrollmentsPathVercel = path.join("/tmp", "enrollments.json");

function ensureBatchesFileVercel() {
  if (!fs.existsSync(batchesPathVercel)) {
    fs.writeFileSync(batchesPathVercel, JSON.stringify([
      {
        id: "batch-seo-1",
        name: "SEO Batch A — Tue/Thu 10PM PKT",
        maxSeats: 6,
        enrolled: 0,
        course: "SEO",
        schedule: {
          dayOfWeek: "Tuesday & Thursday",
          time: "10:00 PM – 12:00 AM PKT",
          session1: "10:00 PM – 10:50 PM PKT",
          break: "10:51 PM – 11:10 PM PKT",
          session2: "11:11 PM – 12:00 AM PKT",
          timeZone: "Asia/Karachi (PKT)",
        },
        zoomLinks: {
          session1: "https://zoom.us/j/YOUR-ZOOM-LINK-1",
          session2: "https://zoom.us/j/YOUR-ZOOM-LINK-2",
        },
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
        schedule: {
          dayOfWeek: "Saturday & Sunday",
          time: "2:00 PM – 4:00 PM PKT",
          session1: "2:00 PM – 2:50 PM PKT",
          break: "2:51 PM – 3:10 PM PKT",
          session2: "3:11 PM – 4:00 PM PKT",
          timeZone: "Asia/Karachi (PKT)",
        },
        zoomLinks: {
          session1: "https://zoom.us/j/YOUR-ZOOM-LINK-3",
          session2: "https://zoom.us/j/YOUR-ZOOM-LINK-4",
        },
        syllabus: [
          "Week 1: HTML + CSS foundations — build your first page",
          "Week 2: JavaScript basics — variables, loops, functions",
          "Week 3: DOM manipulation — make pages come alive",
          "Week 4: Intro to React — components, props, state",
        ],
      },
    ], null, 2));
  }
}
ensureBatchesFileVercel();

// Batches GET (public)
app.get("/api/batches", async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const batches = await db.collection("batches").find().sort({ name: 1 }).toArray();
      if (batches && batches.length > 0) return res.json(batches);
    }
  } catch (e) {
    console.warn("MongoDB batches fetch failed, using file fallback:", e);
  }
  try {
    if (fs.existsSync(batchesPathVercel)) {
      const batches = JSON.parse(fs.readFileSync(batchesPathVercel, "utf8"));
      return res.json(batches.map((b) => ({
        ...b,
        enrolledStudents: undefined,
        availableSeats: Math.max(0, b.maxSeats - (b.enrolled || 0)),
      })));
    }
  } catch (e) {}
  res.json([]);
});

// Batches GET (admin)
app.get("/api/admin/batches", checkAdmin, async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const batches = await db.collection("batches").find().sort({ name: 1 }).toArray();
      if (batches && batches.length > 0) return res.json(batches);
    }
  } catch (e) {
    console.warn("MongoDB batches fetch failed, using file fallback:", e);
  }
  try {
    if (fs.existsSync(batchesPathVercel)) return res.json(JSON.parse(fs.readFileSync(batchesPathVercel, "utf8")));
  } catch (e) {}
  res.json([]);
});

// Enroll student
app.post("/api/enroll", async (req, res) => {
  try {
    const { name, email, phone, city, batchId, note } = req.body;
    if (!name || !email || !batchId) return res.status(400).json({ error: "Name, email, and batch required." });

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        const batch = await db.collection("batches").findOne({ id: batchId });
        if (batch && (batch.enrolled || 0) >= batch.maxSeats) return res.status(400).json({ error: "Batch full." });
        await db.collection("batches").updateOne({ id: batchId }, { $inc: { enrolled: 1 } });
        const enrollment = { id: Date.now().toString(), name, email, phone: phone || "", city: city || "", batchId, batchName: batch?.name || batchId, note: note || "", status: "pending_payment", enrolledAt: new Date().toISOString(), paidAt: null };
        await db.collection("enrollments").insertOne(enrollment);
        await db.collection("leads").insertOne({ ...enrollment, type: "enrollment" });
        return res.json({ success: true, enrollment });
      } catch (dbErr) { console.warn("MongoDB enroll failed, file fallback:", dbErr); }
    }

    let batches = [];
    if (fs.existsSync(batchesPathVercel)) { try { batches = JSON.parse(fs.readFileSync(batchesPathVercel, "utf8")); } catch (e) {} }
    const batch = batches.find((b) => b.id === batchId);
    if (batch && (batch.enrolled || 0) >= batch.maxSeats) return res.status(400).json({ error: "Batch full." });
    if (batch) { batch.enrolled = (batch.enrolled || 0) + 1; fs.writeFileSync(batchesPathVercel, JSON.stringify(batches, null, 2)); }

    let enrollments = [];
    if (fs.existsSync(enrollmentsPathVercel)) { try { enrollments = JSON.parse(fs.readFileSync(enrollmentsPathVercel, "utf8")); } catch (e) {} }
    const enrollment = { id: Date.now().toString(), name, email, phone: phone || "", city: city || "", batchId, batchName: batch?.name || batchId, note: note || "", status: "pending_payment", enrolledAt: new Date().toISOString(), paidAt: null };
    enrollments.push(enrollment);
    fs.writeFileSync(enrollmentsPathVercel, JSON.stringify(enrollments, null, 2));

    let leads = [];
    if (fs.existsSync(leadsPath)) { try { leads = JSON.parse(fs.readFileSync(leadsPath, "utf8")); } catch (e) {} }
    leads.push({ ...enrollment, type: "enrollment" });
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));

    res.json({ success: true, enrollment });
  } catch (e) { console.error("Enroll error:", e); res.status(500).json({ error: "Failed to enroll." }); }
});

// Admin: confirm payment
app.post("/api/admin/enrollment/pay", checkAdmin, async (req, res) => {
  try {
    const { enrollmentId } = req.body;
    if (!enrollmentId) return res.status(400).json({ error: "Enrollment ID required." });
    const db = await getDb().catch(() => null);
    if (db) {
      try { await db.collection("enrollments").updateOne({ id: enrollmentId }, { $set: { status: "confirmed", paidAt: new Date().toISOString() } }); return res.json({ success: true }); } catch (e) {}
    }
    if (fs.existsSync(enrollmentsPathVercel)) {
      let enrollments = JSON.parse(fs.readFileSync(enrollmentsPathVercel, "utf8"));
      const idx = enrollments.findIndex((e) => e.id === enrollmentId);
      if (idx !== -1) { enrollments[idx].status = "confirmed"; enrollments[idx].paidAt = new Date().toISOString(); fs.writeFileSync(enrollmentsPathVercel, JSON.stringify(enrollments, null, 2)); return res.json({ success: true }); }
    }
    res.status(404).json({ error: "Not found." });
  } catch (e) { res.status(500).json({ error: "Failed." }); }
});

// Admin: get enrollments
app.get("/api/admin/enrollments", checkAdmin, async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) { const e = await db.collection("enrollments").find().sort({ enrolledAt: -1 }).toArray(); if (e && e.length > 0) return res.json(e); }
  } catch (e) { console.warn("MongoDB enrollments failed, file fallback:", e); }
  try { if (fs.existsSync(enrollmentsPathVercel)) return res.json(JSON.parse(fs.readFileSync(enrollmentsPathVercel, "utf8"))); } catch (e) {}
  res.json([]);
});

// Admin: update batch Zoom links
app.put("/api/admin/batches/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { session1, session2 } = req.body;
    const db = await getDb().catch(() => null);
    if (db) {
      try { const u = {}; if (session1) u["zoomLinks.session1"] = session1; if (session2) u["zoomLinks.session2"] = session2; await db.collection("batches").updateOne({ id }, { $set: u }); return res.json({ success: true }); } catch (e) {}
    }
    if (fs.existsSync(batchesPathVercel)) {
      let batches = JSON.parse(fs.readFileSync(batchesPathVercel, "utf8"));
      const batch = batches.find((b) => b.id === id);
      if (batch) { if (session1) batch.zoomLinks.session1 = session1; if (session2) batch.zoomLinks.session2 = session2; fs.writeFileSync(batchesPathVercel, JSON.stringify(batches, null, 2)); return res.json({ success: true }); }
    }
    res.status(404).json({ error: "Not found." });
  } catch (e) { res.status(500).json({ error: "Failed." }); }
});

export default app;
