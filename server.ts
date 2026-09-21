import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";
import crypto from "crypto";
import { MongoClient, Db } from "mongodb";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = !!process.env.VERCEL;

// --- MongoDB Database Connection (Atlas Free Tier or Custom URI) ---
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let isConnectingMongo = false;

async function getDb(): Promise<Db | null> {
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
  } catch (err: any) {
    console.warn("MongoDB connection failed, falling back to local file storage:", err.message);
    mongoDb = null;
    mongoClient = null;
    return null;
  } finally {
    isConnectingMongo = false;
  }
}

// File paths for local fallback
const configPath = isVercel
  ? path.join("/tmp", "config.json")
  : path.join(process.cwd(), "data", "config.json");

const leadsPath = isVercel
  ? path.join("/tmp", "leads.json")
  : path.join(process.cwd(), "data", "leads.json");

// Ensure files exist
function ensureFiles() {
  const dirs = isVercel ? [] : [path.dirname(configPath)];
  for (const d of dirs) {
    if (!fs.existsSync(d)) {
      try { fs.mkdirSync(d, { recursive: true }); } catch (e) {}
    }
  }
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

// Express app
const app = express();
app.use(express.json());
app.use(cookieParser());

// Status endpoint with DB and Google OAuth state
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

// Send verification email endpoint
app.post("/api/auth/send-verification", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email required." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const verificationUrl = `${process.env.SITE_URL || "https://mentorarena.online"}/verify-email/${token}`;

    const verificationPath = isVercel
      ? path.join("/tmp", "verification.json")
      : path.join(process.cwd(), "data", "verification.json");

    let verifications = {};
    if (fs.existsSync(verificationPath)) {
      try { verifications = JSON.parse(fs.readFileSync(verificationPath, "utf8")); } catch (e) {}
    }
    verifications[email] = { token, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() };
    fs.writeFileSync(verificationPath, JSON.stringify(verifications, null, 2));

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const emailResp = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Mentor Arena <onboarding@mentorarena.online>",
            to: [email],
            subject: "Verify your Mentor Arena account",
            html: `<p>Hi there,</p>
<p>You've created a Mentor Arena account. Click the button below to verify your email:</p>
<p><a href="${verificationUrl}" style="display:inline-block;padding:12px 24px;background:#1A4A7C;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Verify My Account</a></p>
<p>Or copy this link: <a href="${verificationUrl}">${verificationUrl}</a></p>
<p>If you didn't create this account, you can ignore this email.</p>`,
          }),
        });
        if (!emailResp.ok) console.warn("Resend email failed:", await emailResp.text());
      } catch (sendErr) { console.warn("Email send error:", sendErr); }
    }

    res.json({ success: true, message: "Verification email sent. Check your inbox." });
  } catch (e) { res.status(500).json({ error: "Failed to send verification email." }); }
});

// Verify email token
app.get("/api/auth/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const verificationPath = isVercel
      ? path.join("/tmp", "verification.json")
      : path.join(process.cwd(), "data", "verification.json");

    let verifications = {};
    if (fs.existsSync(verificationPath)) {
      try { verifications = JSON.parse(fs.readFileSync(verificationPath, "utf8")); } catch (e) {}
    }

    let foundEmail = null;
    for (const [email, data] of Object.entries(verifications)) {
      if (data.token === token && new Date(data.expiresAt) > new Date()) {
        foundEmail = email;
        break;
      }
    }

    if (!foundEmail) return res.status(400).json({ error: "Invalid or expired verification link." });

    delete verifications[foundEmail];
    fs.writeFileSync(verificationPath, JSON.stringify(verifications, null, 2));

    // Log as lead
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: foundEmail.split("@")[0],
          email: foundEmail,
          source: "email_verified",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {}

    const userData = {
      email: foundEmail,
      role: "student",
      name: foundEmail.split("@")[0],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    };

    res.cookie("ma_session", JSON.stringify(userData), {
      httpOnly: false,
      secure: process.env.VERCEL ? true : false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user: userData, message: "Email verified! You are now logged in." });
  } catch (e) { res.status(500).json({ error: "Verification failed." }); }
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
  } catch (err: any) {
    console.error("Error processing Google Auth:", err);
    res.status(500).json({ error: "Failed to process Google authentication" });
  }
});

// Admin middleware
const checkAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

// Config GET (Atlas MongoDB -> File fallback)
app.get("/api/config", async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const configDoc = await db.collection("config").findOne({ _id: "site_config" as any });
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
        { _id: "site_config" as any },
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

// Leads POST (Atlas MongoDB + File sync)
app.post("/api/leads", async (req, res) => {
  try {
    const newLead = { ...req.body, id: Date.now().toString(), timestamp: new Date().toISOString() };
    
    // Write to MongoDB if connected
    const db = await getDb().catch(() => null);
    if (db) {
      try {
        await db.collection("leads").insertOne({ ...newLead });
      } catch (dbErr) {
        console.warn("Failed to insert lead into MongoDB, saving to file:", dbErr);
      }
    }

    // Always maintain local file sync
    let leads: Array<Record<string, unknown>> = [];
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

// Admin leads GET (Atlas MongoDB -> File fallback)
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

// --- Batches API (Atlas MongoDB -> File fallback) ---

const batchesPath = isVercel
  ? path.join("/tmp", "batches.json")
  : path.join(__dirname, "..", "data", "batches.json");

// Ensure batches file exists
function ensureBatchesFile() {
  if (!fs.existsSync(batchesPath)) {
    const defaultBatches = [
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
    ];
    fs.writeFileSync(batchesPath, JSON.stringify(defaultBatches, null, 2));
  }
}
ensureBatchesFile();

// Batches GET (public) — list all batches with available seats
app.get("/api/batches", async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const batches = await db.collection("batches").find().sort({ name: 1 }).toArray();
      if (batches && batches.length > 0) {
        return res.json(batches);
      }
    }
  } catch (e) {
    console.warn("MongoDB batches fetch failed, using file fallback:", e);
  }

  try {
    if (fs.existsSync(batchesPath)) {
      const batches = JSON.parse(fs.readFileSync(batchesPath, "utf8"));
      // anonymize enrolled students list for public view
      const sanitized = batches.map((b) => ({
        ...b,
        enrolledStudents: undefined,
        availableSeats: Math.max(0, b.maxSeats - (b.enrolled || 0)),
      }));
      return res.json(sanitized);
    }
  } catch (e) {}
  res.json([]);
});

// Batches GET (admin) — full details including enrolled students
app.get("/api/admin/batches", checkAdmin, async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const batches = await db.collection("batches").find().sort({ name: 1 }).toArray();
      if (batches && batches.length > 0) {
        return res.json(batches);
      }
    }
  } catch (e) {
    console.warn("MongoDB batches fetch failed, using file fallback:", e);
  }

  try {
    if (fs.existsSync(batchesPath)) {
      return res.json(JSON.parse(fs.readFileSync(batchesPath, "utf8")));
    }
  } catch (e) {}
  res.json([]);
});

// Enroll student in a batch (POST)
app.post("/api/enroll", async (req, res) => {
  try {
    const { name, email, phone, city, batchId, note } = req.body;
    if (!name || !email || !batchId) {
      return res.status(400).json({ error: "Name, email, and batch are required." });
    }

    const db = await getDb().catch(() => null);

    // Save to MongoDB if connected
    if (db) {
      try {
        // Check batch capacity
        const batch = await db.collection("batches").findOne({ id: batchId });
        if (batch && (batch.enrolled || 0) >= batch.maxSeats) {
          return res.status(400).json({ error: "This batch is full. Please pick another batch." });
        }

        // Increment enrolled count
        await db.collection("batches").updateOne(
          { id: batchId },
          { $inc: { enrolled: 1 } }
        );

        // Save enrollment record
        const enrollment = {
          id: Date.now().toString(),
          name,
          email,
          phone: phone || "",
          city: city || "",
          batchId,
          batchName: batch?.name || batchId,
          note: note || "",
          status: "pending_payment",
          enrolledAt: new Date().toISOString(),
          paidAt: null,
        };
        await db.collection("enrollments").insertOne(enrollment);

        // Also save as lead
        await db.collection("leads").insertOne({ ...enrollment, type: "enrollment" });
        return res.json({ success: true, enrollment });
      } catch (dbErr) {
        console.warn("MongoDB enroll failed, falling back to file:", dbErr);
      }
    }

    // File fallback
    let batches = [];
    if (fs.existsSync(batchesPath)) {
      try {
        batches = JSON.parse(fs.readFileSync(batchesPath, "utf8"));
      } catch (e) {}
    }
    const batch = batches.find((b) => b.id === batchId);
    if (batch && (batch.enrolled || 0) >= batch.maxSeats) {
      return res.status(400).json({ error: "This batch is full. Please pick another batch." });
    }
    if (batch) {
      batch.enrolled = (batch.enrolled || 0) + 1;
      fs.writeFileSync(batchesPath, JSON.stringify(batches, null, 2));
    }

    let enrollments = [];
    const enrollmentsPath = isVercel
      ? path.join("/tmp", "enrollments.json")
      : path.join(__dirname, "..", "data", "enrollments.json");
    if (fs.existsSync(enrollmentsPath)) {
      try {
        enrollments = JSON.parse(fs.readFileSync(enrollmentsPath, "utf8"));
      } catch (e) {}
    }
    const enrollment = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      city: city || "",
      batchId,
      batchName: batch?.name || batchId,
      note: note || "",
      status: "pending_payment",
      enrolledAt: new Date().toISOString(),
      paidAt: null,
    };
    enrollments.push(enrollment);
    fs.writeFileSync(enrollmentsPath, JSON.stringify(enrollments, null, 2));

    // Also save as lead
    let leads = [];
    if (fs.existsSync(leadsPath)) {
      try {
        leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
      } catch (e) {}
    }
    leads.push({ ...enrollment, type: "enrollment" });
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));

    res.json({ success: true, enrollment });
  } catch (e) {
    console.error("Enroll error:", e);
    res.status(500).json({ error: "Failed to enroll. Please try again." });
  }
});

// Update student payment status (admin calls this after confirming payment)
app.post("/api/admin/enrollment/pay", checkAdmin, async (req, res) => {
  try {
    const { enrollmentId } = req.body;
    if (!enrollmentId) return res.status(400).json({ error: "Enrollment ID required." });

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        await db.collection("enrollments").updateOne(
          { id: enrollmentId },
          { $set: { status: "confirmed", paidAt: new Date().toISOString() } }
        );
        return res.json({ success: true });
      } catch (dbErr) {}
    }

    // File fallback
    const enrollmentsPath = isVercel
      ? path.join("/tmp", "enrollments.json")
      : path.join(__dirname, "..", "data", "enrollments.json");
    if (fs.existsSync(enrollmentsPath)) {
      let enrollments = JSON.parse(fs.readFileSync(enrollmentsPath, "utf8"));
      const idx = enrollments.findIndex((e) => e.id === enrollmentId);
      if (idx !== -1) {
        enrollments[idx].status = "confirmed";
        enrollments[idx].paidAt = new Date().toISOString();
        fs.writeFileSync(enrollmentsPath, JSON.stringify(enrollments, null, 2));
        return res.json({ success: true });
      }
    }
    res.status(404).json({ error: "Enrollment not found." });
  } catch (e) {
    res.status(500).json({ error: "Failed to update payment status." });
  }
});

// Admin: get all enrollments
app.get("/api/admin/enrollments", checkAdmin, async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const enrollments = await db.collection("enrollments").find().sort({ enrolledAt: -1 }).toArray();
      if (enrollments && enrollments.length > 0) {
        return res.json(enrollments);
      }
    }
  } catch (e) {
    console.warn("MongoDB enrollments fetch failed, using file fallback:", e);
  }

  const enrollmentsPath = isVercel
    ? path.join("/tmp", "enrollments.json")
    : path.join(__dirname, "..", "data", "enrollments.json");
  try {
    if (fs.existsSync(enrollmentsPath)) {
      return res.json(JSON.parse(fs.readFileSync(enrollmentsPath, "utf8")));
    }
  } catch (e) {}
  res.json([]);
});

// Admin: update batch Zoom links
app.put("/api/admin/batches/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { session1, session2 } = req.body;

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        const update: any = {};
        if (session1) update["zoomLinks.session1"] = session1;
        if (session2) update["zoomLinks.session2"] = session2;
        await db.collection("batches").updateOne({ id }, { $set: update });
        return res.json({ success: true });
      } catch (dbErr) {}
    }

    // File fallback
    if (fs.existsSync(batchesPath)) {
      let batches = JSON.parse(fs.readFileSync(batchesPath, "utf8"));
      const batch = batches.find((b) => b.id === id);
      if (batch) {
        if (session1) batch.zoomLinks.session1 = session1;
        if (session2) batch.zoomLinks.session2 = session2;
        fs.writeFileSync(batchesPath, JSON.stringify(batches, null, 2));
        return res.json({ success: true });
      }
    }
    res.status(404).json({ error: "Batch not found." });
  } catch (e) {
    res.status(500).json({ error: "Failed to update batch." });
  }
});

// --- Social Media Posts API ---

const postsPath = isVercel
  ? path.join("/tmp", "social_posts.json")
  : path.join(__dirname, "data", "social_posts.json");

const postsSchedulePath = isVercel
  ? path.join("/tmp", "social_schedule.json")
  : path.join(__dirname, "data", "social_schedule.json");

function ensureSocialFiles() {
  if (!fs.existsSync(postsPath)) {
    fs.writeFileSync(postsPath, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(postsSchedulePath)) {
    const defaultSchedule = {
      facebook: { frequency: "bi-weekly", day: 1, time: "10:00 AM PKT" },
      instagram: { frequency: "bi-weekly", day: 4, time: "6:00 PM PKT" },
      linkedin: { frequency: "bi-weekly", day: 3, time: "12:00 PM PKT" },
      twitter: { frequency: "bi-weekly", day: 6, time: "9:00 PM PKT" },
      youtube: { frequency: "bi-weekly", day: 2, time: "4:00 PM PKT" },
    };
    fs.writeFileSync(postsSchedulePath, JSON.stringify(defaultSchedule, null, 2));
  }
}
ensureSocialFiles();

// Get all social media posts
app.get("/api/social/posts", async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const posts = await db.collection("social_posts").find().sort({ createdAt: -1 }).toArray();
      if (posts && posts.length > 0) return res.json(posts);
    }
  } catch (e) {
    console.warn("MongoDB social posts fetch failed, using file fallback:", e);
  }
  try {
    if (fs.existsSync(postsPath)) return res.json(JSON.parse(fs.readFileSync(postsPath, "utf8")));
  } catch (e) {}
  res.json([]);
});

// Create a social media post
app.post("/api/social/posts", checkAdmin, async (req, res) => {
  try {
    const { platform, content, imageUrl, linkUrl, postDate, isPublished, autoPostEnabled } = req.body;
    if (!platform || !content) return res.status(400).json({ error: "Platform and content required." });

    const post = {
      id: Date.now().toString(),
      platform, content, imageUrl: imageUrl || "", linkUrl: linkUrl || "",
      postDate: postDate || new Date().toISOString(), isPublished: isPublished || false,
      autoPostEnabled: autoPostEnabled || false,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        await db.collection("social_posts").insertOne(post);
        return res.json(post);
      } catch (dbErr) { console.warn("MongoDB social post insert failed, file fallback:", dbErr); }
    }

    let posts = [];
    if (fs.existsSync(postsPath)) { try { posts = JSON.parse(fs.readFileSync(postsPath, "utf8")); } catch (e) {} }
    posts.unshift(post);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    res.json(post);
  } catch (e) { res.status(500).json({ error: "Failed to create post." }); }
});

// Update a social media post
app.put("/api/social/posts/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, content, imageUrl, linkUrl, postDate, isPublished, autoPostEnabled } = req.body;

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        const update = {};
        if (platform) update.platform = platform;
        if (content) update.content = content;
        if (imageUrl !== undefined) update.imageUrl = imageUrl;
        if (linkUrl) update.linkUrl = linkUrl;
        if (postDate) update.postDate = postDate;
        if (isPublished !== undefined) update.isPublished = isPublished;
        if (autoPostEnabled !== undefined) update.autoPostEnabled = autoPostEnabled;
        update.updatedAt = new Date().toISOString();
        const result = await db.collection("social_posts").updateOne({ id }, { $set: update });
        if (result.matchedCount > 0) { const post = await db.collection("social_posts").findOne({ id }); return res.json(post); }
      } catch (dbErr) { console.warn("MongoDB social post update failed, file fallback:", dbErr); }
    }

    if (fs.existsSync(postsPath)) {
      let posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts[index] = { ...posts[index], platform, content, imageUrl, linkUrl, postDate, isPublished, autoPostEnabled, updatedAt: new Date().toISOString() };
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
        return res.json(posts[index]);
      }
    }
    res.status(404).json({ error: "Post not found." });
  } catch (e) { res.status(500).json({ error: "Failed to update post." }); }
});

// Delete a social media post
app.delete("/api/social/posts/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDb().catch(() => null);
    if (db) {
      try { await db.collection("social_posts").deleteOne({ id }); return res.json({ success: true }); } catch (dbErr) { console.warn("MongoDB delete failed, file fallback:", dbErr); }
    }
    if (fs.existsSync(postsPath)) {
      let posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
      posts = posts.filter(p => p.id !== id);
      fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
      return res.json({ success: true });
    }
    res.status(404).json({ error: "Post not found." });
  } catch (e) { res.status(500).json({ error: "Failed to delete post." }); }
});

// Get posting schedule
app.get("/api/social/schedule", async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) { const s = await db.collection("social_schedule").findOne({ _id: "posting_schedule" }); if (s) return res.json(s); }
  } catch (e) { console.warn("MongoDB schedule fetch failed, file fallback:", e); }
  try { if (fs.existsSync(postsSchedulePath)) return res.json(JSON.parse(fs.readFileSync(postsSchedulePath, "utf8"))); } catch (e) {}
  res.json({});
});

// Update posting schedule
app.put("/api/social/schedule", checkAdmin, async (req, res) => {
  try {
    const schedule = req.body;
    const db = await getDb().catch(() => null);
    if (db) {
      try {
        await db.collection("social_schedule").updateOne({ _id: "posting_schedule" }, { $set: { ...schedule, updatedAt: new Date().toISOString() } }, { upsert: true });
        return res.json({ ...schedule, updatedAt: new Date().toISOString() });
      } catch (dbErr) { console.warn("MongoDB schedule update failed, file fallback:", dbErr); }
    }
    fs.writeFileSync(postsSchedulePath, JSON.stringify(schedule, null, 2));
    res.json({ ...schedule, updatedAt: new Date().toISOString() });
  } catch (e) { res.status(500).json({ error: "Failed to update schedule." }); }
});

// Leads GET (public)

const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== "production" && !isVercel) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (!isVercel) {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!isVercel || process.env.NODE_ENV !== "production") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

if (!isVercel || process.env.NODE_ENV !== "production") {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
  });
}

export default app;
// v1789509188
