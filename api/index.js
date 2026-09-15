import express from "express";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";

const isVercel = !!process.env.VERCEL;

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
app.get("/api/status", (_req, res) => {
  res.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    vercel: isVercel,
    adminSet: !!process.env.ADMIN_PASSWORD
  });
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
app.get("/api/config", (_req, res) => {
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
app.post("/api/admin/config", checkAdmin, (req, res) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save config" });
  }
});

// Leads POST
app.post("/api/leads", (req, res) => {
  try {
    const newLead = { ...req.body, id: Date.now().toString(), timestamp: new Date().toISOString() };
    let leads = [];
    if (fs.existsSync(leadsPath)) {
      leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
    }
    leads.push(newLead);
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save lead" });
  }
});

// Admin leads GET
app.get("/api/admin/leads", checkAdmin, (_req, res) => {
  try {
    if (fs.existsSync(leadsPath)) {
      const leads = fs.readFileSync(leadsPath, "utf8");
      return res.json(JSON.parse(leads));
    }
  } catch (e) {}
  res.json([]);
});

export default app;
