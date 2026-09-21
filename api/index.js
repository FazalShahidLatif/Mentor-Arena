import express from "express";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import crypto from "crypto";

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

const postsPath = isVercel
  ? path.join("/tmp", "social_posts.json")
  : path.join(process.cwd(), "data", "social_posts.json");

const postsSchedulePath = isVercel
  ? path.join("/tmp", "social_schedule.json")
  : path.join(process.cwd(), "data", "social_schedule.json");

// Ensure files exist
function ensureFiles() {
  try {
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, JSON.stringify({}, null, 2));
    }
    if (!fs.existsSync(leadsPath)) {
      fs.writeFileSync(leadsPath, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(postsPath)) {
      fs.writeFileSync(postsPath, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(postsSchedulePath)) {
      // Default bi-weekly posting schedule
      const defaultSchedule = {
        facebook: { frequency: "bi-weekly", day: 1, time: "10:00 AM PKT" },
        instagram: { frequency: "bi-weekly", day: 4, time: "6:00 PM PKT" },
        linkedin: { frequency: "bi-weekly", day: 3, time: "12:00 PM PKT" },
        twitter: { frequency: "bi-weekly", day: 6, time: "9:00 PM PKT" },
      };
      fs.writeFileSync(postsSchedulePath, JSON.stringify(defaultSchedule, null, 2));
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

// Verify email endpoint — sends a verification link to new registrants
app.post("/api/auth/send-verification", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email required." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const verificationUrl = `${process.env.SITE_URL || "https://mentorarena.online"}/verify-email/${token}`;

    // Store the verification token
    const verificationPath = isVercel
      ? path.join("/tmp", "verification.json")
      : path.join(process.cwd(), "data", "verification.json");
    
    let verifications = {};
    if (fs.existsSync(verificationPath)) {
      try { verifications = JSON.parse(fs.readFileSync(verificationPath, "utf8")); } catch (e) {}
    }
    verifications[email] = { token, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() };
    fs.writeFileSync(verificationPath, JSON.stringify(verifications, null, 2));

    // Send email via Resend
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
<p>You've created a Mentor Arena account. Click the button below to verify your email and start learning:</p>
<p><a href="${verificationUrl}" style="display:inline-block;padding:12px 24px;background:#1A4A7C;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Verify My Account</a></p>
<p>Or copy this link into your browser: <a href="${verificationUrl}">${verificationUrl}</a></p>
<p>If you didn't create this account, you can ignore this email.</p>
<p style="color:#888;font-size:12px;margin-top:20px;">— Mentor Arena Team</p>`,
          }),
        });
        if (!emailResp.ok) {
          console.warn("Resend email failed:", await emailResp.text());
        }
      } catch (sendErr) {
        console.warn("Email send error:", sendErr);
      }
    }

    res.json({ success: true, message: "Verification email sent. Check your inbox." });
  } catch (e) {
    res.status(500).json({ error: "Failed to send verification email." });
  }
});

// Verify email token endpoint
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

    if (!foundEmail) {
      return res.status(400).json({ error: "Invalid or expired verification link." });
    }

    // Clean up used token
    delete verifications[foundEmail];
    fs.writeFileSync(verificationPath, JSON.stringify(verifications, null, 2));

    // Log the verified email as a lead
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

    // Set the verified session
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
  } catch (e) {
    res.status(500).json({ error: "Verification failed." });
  }
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
    }

    // Save user data to config for session persistence
    try {
      const configData = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, "utf8")) : {};
      configData.lastGoogleUser = userData;
      configData.lastGoogleLogin = new Date().toISOString();
      fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
    } catch (e) {}

    res.json({ success: true, user: userData });
  } catch (e) {
    console.error("Google auth error:", e);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
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

// --- Social Media Posts API (Vercel serverless) ---

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
    if (fs.existsSync(postsPath)) {
      return res.json(JSON.parse(fs.readFileSync(postsPath, "utf8")));
    }
  } catch (e) {}
  res.json([]);
});

// Create a new social media post
app.post("/api/social/posts", checkAdmin, async (req, res) => {
  try {
    const { platform, content, imageUrl, linkUrl, postDate, isPublished, autoPostEnabled } = req.body;
    
    if (!platform || !content) {
      return res.status(400).json({ error: "Platform and content are required." });
    }

    const post = {
      id: Date.now().toString(),
      platform,
      content,
      imageUrl: imageUrl || "",
      linkUrl: linkUrl || "",
      postDate: postDate || new Date().toISOString(),
      isPublished: isPublished || false,
      autoPostEnabled: autoPostEnabled || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        await db.collection("social_posts").insertOne(post);
        return res.json(post);
      } catch (dbErr) {
        console.warn("MongoDB social post insert failed, using file fallback:", dbErr);
      }
    }

    let posts = [];
    if (fs.existsSync(postsPath)) {
      try {
        posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
      } catch (e) {}
    }
    posts.unshift(post);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Update a social media post
app.put("/api/social/posts/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, content, imageUrl, linkUrl, postDate, isPublished, autoPostEnabled } = req.body;

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        const updatedPost = {
          platform: platform || undefined,
          content: content || undefined,
          imageUrl: imageUrl !== undefined ? imageUrl : undefined,
          linkUrl: linkUrl || undefined,
          postDate: postDate || undefined,
          isPublished: isPublished !== undefined ? isPublished : undefined,
          autoPostEnabled: autoPostEnabled !== undefined ? autoPostEnabled : undefined,
          updatedAt: new Date().toISOString(),
        };
        const result = await db.collection("social_posts").updateOne(
          { id },
          { $set: updatedPost }
        );
        if (result.matchedCount > 0) {
          const post = await db.collection("social_posts").findOne({ id });
          return res.json(post);
        }
      } catch (dbErr) {
        console.warn("MongoDB social post update failed, using file fallback:", dbErr);
      }
    }

    if (fs.existsSync(postsPath)) {
      let posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts[index] = {
          ...posts[index],
          platform: platform || posts[index].platform,
          content: content || posts[index].content,
          imageUrl: imageUrl !== undefined ? imageUrl : posts[index].imageUrl,
          linkUrl: linkUrl || posts[index].linkUrl,
          postDate: postDate || posts[index].postDate,
          isPublished: isPublished !== undefined ? isPublished : posts[index].isPublished,
          autoPostEnabled: autoPostEnabled !== undefined ? autoPostEnabled : posts[index].autoPostEnabled,
          updatedAt: new Date().toISOString(),
        };
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
        return res.json(posts[index]);
      }
    }
    res.status(404).json({ error: "Post not found" });
  } catch (e) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// Delete a social media post
app.delete("/api/social/posts/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        await db.collection("social_posts").deleteOne({ id });
        return res.json({ success: true });
      } catch (dbErr) {
        console.warn("MongoDB social post delete failed, using file fallback:", dbErr);
      }
    }

    if (fs.existsSync(postsPath)) {
      let posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
      posts = posts.filter(p => p.id !== id);
      fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
      return res.json({ success: true });
    }
    res.status(404).json({ error: "Post not found" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Get posting schedule
app.get("/api/social/schedule", async (_req, res) => {
  try {
    const db = await getDb().catch(() => null);
    if (db) {
      const schedule = await db.collection("social_schedule").findOne({ _id: "posting_schedule" });
      if (schedule) return res.json(schedule);
    }
  } catch (e) {
    console.warn("MongoDB social schedule fetch failed, using file fallback:", e);
  }
  try {
    if (fs.existsSync(postsSchedulePath)) {
      return res.json(JSON.parse(fs.readFileSync(postsSchedulePath, "utf8")));
    }
  } catch (e) {}
  res.json({});
});

// Update posting schedule
app.put("/api/social/schedule", checkAdmin, async (req, res) => {
  try {
    const schedule = req.body;

    const db = await getDb().catch(() => null);
    if (db) {
      try {
        await db.collection("social_schedule").updateOne(
          { _id: "posting_schedule" },
          { $set: { ...schedule, updatedAt: new Date().toISOString() } },
          { upsert: true }
        );
        return res.json({ ...schedule, updatedAt: new Date().toISOString() });
      } catch (dbErr) {
        console.warn("MongoDB social schedule update failed, using file fallback:", dbErr);
      }
    }

    fs.writeFileSync(postsSchedulePath, JSON.stringify(schedule, null, 2));
    res.json({ ...schedule, updatedAt: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ error: "Failed to update schedule" });
  }
});

// Get next scheduled post for each platform (for auto-posting scheduler)
app.get("/api/social/next-scheduled", async (_req, res) => {
  try {
    const posts = await getSocialPosts();
    const schedule = await getSchedule();

    const now = new Date();
    const nextPosts = {};

    for (const [platform, platformSchedule] of Object.entries(schedule)) {
      // Find the most recent unpublished post for this platform that hasn't passed its scheduled date
      const platformPosts = posts
        .filter(p => p.platform === platform && !p.isPublished && p.autoPostEnabled)
        .sort((a, b) => new Date(a.postDate) - new Date(b.postDate));

      // Find the next post that should be published
      for (const post of platformPosts) {
        const postDate = new Date(post.postDate);
        if (postDate <= now) {
          nextPosts[platform] = post;
          break;
        }
      }

      // If no post is ready, suggest when the next one should be scheduled
      if (!nextPosts[platform] && platformPosts.length > 0) {
        const nextPost = platformPosts[0];
        nextPosts[platform] = {
          ...nextPost,
          scheduledFor: nextPost.postDate,
          ready: false,
        };
      }
    }

    res.json(nextPosts);
  } catch (e) {
    res.status(500).json({ error: "Failed to get next scheduled posts" });
  }
});

// Helper functions
async function getSocialPosts() {
  const db = await getDb().catch(() => null);
  if (db) {
    try {
      const posts = await db.collection("social_posts").find().sort({ createdAt: -1 }).toArray();
      if (posts && posts.length > 0) return posts;
    } catch (e) {
      console.warn("MongoDB social posts fetch failed:", e);
    }
  }
  if (fs.existsSync(postsPath)) {
    try {
      return JSON.parse(fs.readFileSync(postsPath, "utf8"));
    } catch (e) {}
  }
  return [];
}

async function getSchedule() {
  const db = await getDb().catch(() => null);
  if (db) {
    try {
      const schedule = await db.collection("social_schedule").findOne({ _id: "posting_schedule" });
      if (schedule) return schedule;
    } catch (e) {
      console.warn("MongoDB social schedule fetch failed:", e);
    }
  }
  if (fs.existsSync(postsSchedulePath)) {
    try {
      return JSON.parse(fs.readFileSync(postsSchedulePath, "utf8"));
    } catch (e) {}
  }
  return {};
}

// Check admin middleware
function checkAdmin(req, res, next) {
  const token = req.cookies?.admin_token;
  if (token === "mentor_arena_admin_session") {
    return next();
  }
  // Also check header for API calls
  const headerToken = req.headers["x-admin-token"];
  if (headerToken === process.env.ADMIN_PASSWORD) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

export default app;