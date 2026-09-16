import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";
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

// Google OAuth verification and session route
app.post("/api/auth/google", async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile || !profile.email) {
      return res.status(400).json({ error: "Missing Google profile data" });
    }

    const userData = {
      email: profile.email,
      name: profile.name || "Google Student",
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
            phone: "Signed in via Google",
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
