import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";
import { MongoClient, Db, Collection } from "mongodb";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = !!process.env.VERCEL;

// --- File paths ---
const configPath = isVercel
  ? path.join("/tmp", "config.json")
  : path.join(process.cwd(), "data", "config.json");

const leadsPath = isVercel
  ? path.join("/tmp", "leads.json")
  : path.join(process.cwd(), "data", "leads.json");

// --- Ensure files exist ---
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

// --- MongoDB (lazy connection) ---
let db: Db | null = null;
let leadCollection: Collection | null = null;
let configCollection: Collection | null = null;

async function getDb(): Promise<Db | null> {
  if (db) return db;
  if (!process.env.MONGODB_URI) return null;
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db("mentor");
    leadCollection = db.collection("leads");
    configCollection = db.collection("config");
    console.log("MongoDB connected");
    return db;
  } catch (e) {
    console.error("MongoDB connection failed:", e);
    db = null;
    return null;
  }
}

function getLeadCollection(): Collection | null { return leadCollection; }
function getConfigCollection(): Collection | null { return configCollection; }

// --- Express app ---
const app = express();
app.use(express.json());
app.use(cookieParser());

// --- Status ---
app.get("/api/status", (_req, res) => {
  res.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    vercel: isVercel,
    adminSet: !!process.env.ADMIN_PASSWORD,
    mongoUriSet: !!process.env.MONGODB_URI
  });
});

// --- Admin middleware ---
const checkAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.cookies?.admin_token === "mentor_arena_admin_session") {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

// --- Admin login ---
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

// --- Admin logout ---
app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});

// --- Config GET ---
app.get("/api/config", (_req, res) => {
  // Try JSON file first (always works)
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

  // Fallback: try MongoDB
  getDb().then((db) => {
    if (db && getConfigCollection()) {
      getConfigCollection()!.findOne({ _id: "site" }).then((doc) => {
        if (doc && doc.data) return res.json(doc.data);
        res.json({});
      }).catch(() => res.json({}));
    } else {
      res.json({});
    }
  }).catch(() => res.json({}));
});

// --- Config POST (admin) ---
app.post("/api/admin/config", checkAdmin, (req, res) => {
  try {
    // Save to JSON file first (always works)
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));

    // Also save to MongoDB if connected
    getDb().then((db) => {
      if (db && getConfigCollection()) {
        getConfigCollection()!.findOneAndUpdate(
          { _id: "site" },
          { $set: { _id: "site", data: req.body } },
          { upsert: true, returnDocument: "after" }
        ).catch((err) => console.error("MongoDB config save error:", err));
      }
    }).catch(() => {});

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save config" });
  }
});

// --- Leads POST ---
app.post("/api/leads", (req, res) => {
  try {
    const newLead = { ...req.body, id: Date.now().toString(), timestamp: new Date().toISOString() };

    // Save to JSON file first (always works)
    let leads: Array<Record<string, unknown>> = [];
    if (fs.existsSync(leadsPath)) {
      leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
    }
    leads.push(newLead);
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));

    // Also save to MongoDB if connected
    getDb().then((db) => {
      if (db && getLeadCollection()) {
        getLeadCollection()!.insertOne(newLead).catch((err) =>
          console.error("MongoDB lead save error:", err)
        );
      }
    }).catch(() => {});

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save lead" });
  }
});

// --- Admin leads GET ---
app.get("/api/admin/leads", checkAdmin, (_req, res) => {
  // Try MongoDB first
  getDb().then((db) => {
    if (db && getLeadCollection()) {
      getLeadCollection()!.find({}).sort({ timestamp: -1 }).toArray().then((leads) => {
        res.json(leads);
      }).catch(() => {
        // Fallback to JSON
        try {
          if (fs.existsSync(leadsPath)) {
            const leads = fs.readFileSync(leadsPath, "utf8");
            return res.json(JSON.parse(leads));
          }
        } catch (e) {}
        res.json([]);
      });
    } else {
      // Fallback to JSON file
      try {
        if (fs.existsSync(leadsPath)) {
          const leads = fs.readFileSync(leadsPath, "utf8");
          return res.json(JSON.parse(leads));
        }
      } catch (e) {}
      res.json([]);
    }
  }).catch(() => {
    // MongoDB unavailable — JSON fallback
    try {
      if (fs.existsSync(leadsPath)) {
        const leads = fs.readFileSync(leadsPath, "utf8");
        return res.json(JSON.parse(leads));
      }
    } catch (e) {}
    res.json([]);
  });
});

export default app;
