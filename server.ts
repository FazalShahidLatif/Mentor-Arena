import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import { MongoClient, Db, Collection } from "mongodb";

// Load environment variables from .env file if it exists
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment detection
const isVercel = !!process.env.VERCEL;

// --- File paths (Vercel uses /tmp, local uses project dir) ---
const uploadsDir = isVercel ? path.join("/tmp", "uploads") : path.join(process.cwd(), "public", "uploads");
const configPath = isVercel ? path.join("/tmp", "config.json") : path.join(process.cwd(), "data", "config.json");
const leadsPath = isVercel ? path.join("/tmp", "leads.json") : path.join(process.cwd(), "data", "leads.json");

// Ensure directories and files exist safely
function initPaths() {
  if (!isVercel) {
    if (!fs.existsSync(uploadsDir)) {
      try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch (e) { console.error("Error creating uploads dir:", e); }
    }
    const dataDir = path.dirname(configPath);
    if (!fs.existsSync(dataDir)) {
      try { fs.mkdirSync(dataDir, { recursive: true }); } catch (e) { console.error("Error creating data dir:", e); }
    }
  } else {
    // Vercel serverless functions environment
    if (!fs.existsSync(uploadsDir)) {
      try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch (e) { console.error("Error creating /tmp/uploads dir:", e); }
    }
    
    const originalConfigPath = path.join(process.cwd(), "data", "config.json");
    if (fs.existsSync(originalConfigPath) && !fs.existsSync(configPath)) {
      try { fs.copyFileSync(originalConfigPath, configPath); } catch (e) { console.error("Error copying config to /tmp:", e); }
    } else if (!fs.existsSync(configPath)) {
      try { fs.writeFileSync(configPath, JSON.stringify({}, null, 2)); } catch (e) { console.error("Error creating default /tmp/config.json:", e); }
    }
    
    const originalLeadsPath = path.join(process.cwd(), "data", "leads.json");
    if (fs.existsSync(originalLeadsPath) && !fs.existsSync(leadsPath)) {
      try { fs.copyFileSync(originalLeadsPath, leadsPath); } catch (e) { console.error("Error copying leads to /tmp:", e); }
    } else if (!fs.existsSync(leadsPath)) {
      try { fs.writeFileSync(leadsPath, JSON.stringify([], null, 2)); } catch (e) { console.error("Error creating default /tmp/leads.json:", e); }
    }
  }
}

initPaths();

// --- MongoDB Database (free MongoDB Atlas tier) ---
// Falls back to JSON file storage if MONGODB_URI is not set (local dev without DB)
let db: Db | null = null;
let leadCollection: Collection | null = null;
let configCollection: Collection | null = null;
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  let client: MongoClient | null = null;
  async function initMongo() {
    try {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db("mentor");
      leadCollection = db.collection("leads");
      configCollection = db.collection("config");
      console.log("MongoDB connected — using Atlas for leads & config storage");
    } catch (err) {
      console.error("MongoDB connection failed, falling back to JSON file storage:", err);
      db = null;
    }
  }
  initMongo().catch(() => { db = null; });
} else {
  console.log("MONGODB_URI not set — using JSON file storage (data/config.json, data/leads.json)");
}

// --- Application Setup ---
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Permanent 301 Redirect Middleware for Canonical SEO Optimization
app.use((req, res, next) => {
  const hostname = req.hostname || req.headers.host?.split(":")[0] || "";
  const isLocalhost = req.hostname === "localhost" || req.hostname === "127.0.0.1" || req.headers.host?.includes("localhost");
  
  if (!isLocalhost && hostname !== "mentorarena.online" && hostname !== "www.mentorarena.online") {
    return res.redirect(301, `https://mentorarena.online${req.originalUrl}`);
  }
  next();
});

// Trust proxy for Vercel
app.set("trust proxy", 1);

// --- Multer upload config ---
const upload = multer({
  storage: multer.diskStorage({
    destination: isVercel ? "/tmp/uploads" : path.join(process.cwd(), "public", "uploads"),
    filename: (_req, file) => `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_")}`
  }),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// --- Sitemap Generator (dynamic, SEO-optimized) ---
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = "https://mentorarena.online";
  const today = new Date().toISOString().split("T")[0];
  
  const baseUrls = [
    { url: baseUrl, priority: "1.0", changefreq: "daily" },
    { url: `${baseUrl}/about`, priority: "0.8", changefreq: "weekly" },
    { url: `${baseUrl}/courses/seo`, priority: "0.9", changefreq: "weekly" },
    { url: `${baseUrl}/courses/web-development`, priority: "0.9", changefreq: "weekly" },
    { url: `${baseUrl}/courses/uiux-digital-marketing`, priority: "0.9", changefreq: "weekly" },
    { url: `${baseUrl}/courses/generative-ai`, priority: "0.9", changefreq: "weekly" },
    { url: `${baseUrl}/courses/advance-excel`, priority: "0.8", changefreq: "weekly" },
    { url: `${baseUrl}/courses/computerized-accounting`, priority: "0.8", changefreq: "weekly" },
    { url: `${baseUrl}/pricing`, priority: "0.95", changefreq: "weekly" },
    { url: `${baseUrl}/contact`, priority: "0.9", changefreq: "weekly" },
    { url: `${baseUrl}/faq`, priority: "0.85", changefreq: "monthly" },
    { url: `${baseUrl}/reviews`, priority: "0.9", changefreq: "weekly" },
    { url: `${baseUrl}/audiences/students`, priority: "0.85", changefreq: "monthly" },
    { url: `${baseUrl}/audiences/parents`, priority: "0.85", changefreq: "monthly" },
    { url: `${baseUrl}/audiences/employers`, priority: "0.85", changefreq: "monthly" },
    { url: `${baseUrl}/blog`, priority: "0.9", changefreq: "weekly" },
    { url: `${baseUrl}/blog/best-budget-coding-laptop-mern-stack-pakistan`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/blog/remote-react-developer-job-lahore-karachi`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/blog/silo-semantic-content-architecture-pakistan-blog`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/blog/receiving-foreign-remittances-pakistan-alternatives-paypal`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/blog/integrating-server-side-gemini-ai-react-node`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/blog/project-based-learning-tech-freelancing-pakistan`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/blog/future-skills-children-teenagers-digital-mentors`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/blog/hire-job-ready-trained-interns-pakistan`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/tools`, priority: "0.95", changefreq: "daily" },
    { url: `${baseUrl}/tools/word-counter`, priority: "0.85", changefreq: "weekly" },
    { url: `${baseUrl}/tools/meta-tag-generator`, priority: "0.85", changefreq: "weekly" },
    { url: `${baseUrl}/tools/serp-simulator`, priority: "0.85", changefreq: "weekly" },
    { url: `${baseUrl}/tools/keyword-density`, priority: "0.85", changefreq: "weekly" },
    { url: `${baseUrl}/tools/robots-txt-generator`, priority: "0.85", changefreq: "weekly" },
    { url: `${baseUrl}/tools/schema-generator`, priority: "0.85", changefreq: "weekly" },
    { url: `${baseUrl}/auth`, priority: "0.9", changefreq: "monthly" },
    { url: `${baseUrl}/login`, priority: "0.9", changefreq: "monthly" },
  ];
  
  // Try to read config from JSON file for blog posts count
  let blogPosts = 0;
  try {
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
      blogPosts = config?.blogPosts || 0;
    }
  } catch (e) {
    console.error("Error reading config for sitemap:", e);
  }
  
  // Add dynamic blog post URLs up to the configured count
  for (let i = 1; i <= blogPosts; i++) {
    baseUrls.push({ url: `${baseUrl}/blog/post-${i}`, priority: "0.8", changefreq: "monthly" });
  }
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Core Institution Landing & Identity Pages -->
  <url>
    <loc>${baseUrls[0].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[0].changefreq}</changefreq>
    <priority>${baseUrls[0].priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/images/hero_web_dev_1786510034820.jpg</image:loc>
      <image:caption>AI generated hero banner - 1-to-1 MERN full-stack development mentorship in Pakistan - Mentor Arena</image:caption>
      <image:title>Mentor Arena - 1-to-1 Digital Skills Coaching</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrls[1].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[1].changefreq}</changefreq>
    <priority>${baseUrls[1].priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/images/hero_uiux_design_1786510085434.jpg</image:loc>
      <image:caption>AI generated hero banner - 1-to-1 UI/UX design mentorship in Pakistan - Mentor Arena</image:caption>
      <image:title>Mentor Arena - UI/UX Design Mentorship</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrls[2].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[2].changefreq}</changefreq>
    <priority>${baseUrls[2].priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/images/hero_seo_growth_1786510068606.jpg</image:loc>
      <image:caption>AI generated hero banner - 1-to-1 technical SEO mentorship in Pakistan - Mentor Arena</image:caption>
      <image:title>Mentor Arena - Technical SEO Mentorship</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrls[3].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[3].changefreq}</changefreq>
    <priority>${baseUrls[3].priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/images/hero_web_dev_1786510034820.jpg</image:loc>
      <image:caption>AI generated hero banner - 1-to-1 MERN full-stack development mentorship in Pakistan - Mentor Arena</image:caption>
      <image:title>Mentor Arena - MERN Stack Web Development</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrls[4].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[4].changefreq}</changefreq>
    <priority>${baseUrls[4].priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/images/hero_uiux_design_1786510085434.jpg</image:loc>
      <image:caption>AI generated hero banner - 1-to-1 UI/UX design mentorship in Pakistan - Mentor Arena</image:caption>
      <image:title>Mentor Arena - UI/UX Design & Digital Marketing</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrls[5].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[5].changefreq}</changefreq>
    <priority>${baseUrls[5].priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/images/hero_generative_ai_1786510052247.jpg</image:loc>
      <image:caption>AI generated hero banner - 1-to-1 Generative AI and autonomous agent engineering mentorship in Pakistan - Mentor Arena</image:caption>
      <image:title>Mentor Arena - Generative AI Mentorship</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrls[6].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[6].changefreq}</changefreq>
    <priority>${baseUrls[6].priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/images/hero_financial_excel_1786510102786.jpg</image:loc>
      <image:caption>AI generated hero banner - 1-to-1 advanced Excel and financial modeling mentorship in Pakistan - Mentor Arena</image:caption>
      <image:title>Mentor Arena - Advanced Excel & Financial Modeling</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrls[7].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[7].changefreq}</changefreq>
    <priority>${baseUrls[7].priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/assets/images/hero_financial_excel_1786510102786.jpg</image:loc>
      <image:caption>AI generated hero banner - 1-to-1 computerized accounting mentorship in Pakistan - Mentor Arena</image:caption>
      <image:title>Mentor Arena - Computerized Accounting</image:title>
    </image:image>
  </url>

  <url>
    <loc>${baseUrls[8].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[8].changefreq}</changefreq>
    <priority>${baseUrls[8].priority}</priority>
  </url>

  <url>
    <loc>${baseUrls[9].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[9].changefreq}</changefreq>
    <priority>${baseUrls[9].priority}</priority>
  </url>

  <url>
    <loc>${baseUrls[10].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[10].changefreq}</changefreq>
    <priority>${baseUrls[10].priority}</priority>
  </url>

  <url>
    <loc>${baseUrls[11].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[11].changefreq}</changefreq>
    <priority>${baseUrls[11].priority}</priority>
  </url>

  <!-- Direct Target Audience Portals -->
  <url>
    <loc>${baseUrls[12].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[12].changefreq}</changefreq>
    <priority>${baseUrls[12].priority}</priority>
  </url>

  <url>
    <loc>${baseUrls[13].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[13].changefreq}</changefreq>
    <priority>${baseUrls[13].priority}</priority>
  </url>

  <url>
    <loc>${baseUrls[14].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[14].changefreq}</changefreq>
    <priority>${baseUrls[14].priority}</priority>
  </url>

  <!-- Technical Blog Hub & In-Depth Articles -->
  <url>
    <loc>${baseUrls[15].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[15].changefreq}</changefreq>
    <priority>${baseUrls[15].priority}</priority>
  </url>

`.trim();

  // Add blog post URLs (static ones + dynamic ones)
  for (let i = 16; i < baseUrls.length; i++) {
    xml += `
  <url>
    <loc>${baseUrls[i].url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${baseUrls[i].changefreq}</changefreq>
    <priority>${baseUrls[i].priority}</priority>
  </url>
`;
  }

  xml += `
</urlset>`;

  res.header("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

// --- Robots.txt ---
app.get(["/robots.txt", "/Robots.txt"], (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*?*

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://mentorarena.online/sitemap.xml
Crawl-delay: 1
`;
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.send(robotsTxt);
});

// --- Health check / service status endpoint ---
app.get("/api/status", (req, res) => {
  res.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    vercel: isVercel,
    adminSet: !!process.env.ADMIN_PASSWORD
  });
});

// --- Admin Auth Middleware ---
const checkAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.cookies?.admin_token === "mentor_arena_admin_session") {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

// --- Admin Login API ---
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set. Admin login is disabled.");
    return res.status(503).json({ error: "Admin login is not configured. Set ADMIN_PASSWORD environment variable." });
  }

  if (password === adminPassword) {
    console.log("Admin login successful");
    // Set a secure cookie for 24 hours
    res.cookie("admin_token", "mentor_arena_admin_session", {
      httpOnly: true,
      secure: true, // Required for SameSite=None
      sameSite: 'none', // Required for cross-origin iframe
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    return res.json({ success: true });
  }

  console.log("Admin login failed: Incorrect password");
  res.status(401).json({ success: false, message: "Invalid password" });
});

// --- Admin Logout API ---
app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});

// --- GitHub OAuth Routes ---
app.get("/api/auth/github/url", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(503).json({ error: "GitHub OAuth is not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables." });
  }

  const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
  const redirectUri = `${appUrl}/api/auth/github/callback`;
  const scopes = ["read:user", "user:email"];
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    allow_signup: "true"
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.json({ url: authUrl });
});

app.get(["/api/auth/github/callback", "/api/auth/github/callback/"], async (req, res) => {
  const code = req.query.code as string;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return res.status(400).json({ error: "Missing OAuth code or credentials" });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: `${process.env.APP_URL || `${req.protocol}://${req.get('host')}`}/api/auth/github/callback`,
        grant_type: "authorization_code"
      },
      {
        headers: { Accept: "application/json" }
      }
    );

    const { access_token } = tokenResponse.data;

    // Get user info
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" }
    });

    const githubUser = userResponse.data;
    
    // Get user emails
    const emailsResponse = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" }
    });
    
    const primaryEmail = emailsResponse.data.find((email: any) => email.primary)?.email || githubUser.login + "@github.com";

    // Set admin session
    res.cookie("admin_token", "mentor_arena_admin_session", {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: {
        email: primaryEmail,
        name: githubUser.name || githubUser.login,
        role: "admin",
        avatar: githubUser.avatar_url
      }
    });
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    res.status(500).json({ error: "Authentication failed. Please try again." });
  }
});

// --- Upload API ---
app.post("/api/admin/upload", checkAdmin, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    success: true,
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    size: req.file.size
  });
});

// --- Admin Stats API ---
app.get("/api/admin/stats", checkAdmin, (req, res) => {
  try {
    const stats = {
      totalLeads: 0,
      config: {},
      uploadedFiles: 0
    };
    
    try {
      if (fs.existsSync(leadsPath)) {
        const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
        stats.totalLeads = leads.length;
      }
    } catch (e) {
      console.error("Error reading leads:", e);
    }
    
    try {
      if (fs.existsSync(configPath)) {
        stats.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      }
    } catch (e) {
      console.error("Error reading config:", e);
    }
    
    try {
      if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir);
        stats.uploadedFiles = files.length;
      }
    } catch (e) {
      console.error("Error reading uploads:", e);
    }
    
    res.json(stats);
  } catch (e) {
    console.error("Error getting stats:", e);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

// --- Config API ---
app.get("/api/config", (req, res) => {
  // Primary: read from JSON file (fast, reliable on Vercel serverless)
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
  } catch (e) {
    console.error("Error reading config:", e);
  }
  // Fallback: try MongoDB if connected
  if (configCollection) {
    configCollection.findOne({ _id: "site" }).then(doc => {
      if (doc && doc.data) return res.json(doc.data);
      return res.json({});
    }).catch(() => {
      res.json({});
    });
    return;
  }
  res.json({});
});

app.post("/api/admin/config", checkAdmin, (req, res) => {
  try {
    // Save to JSON file first (always works on Vercel)
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
    // Also update MongoDB if connected
    if (configCollection) {
      configCollection.findOneAndUpdate(
        { _id: "site" },
        { $set: { _id: "site", data: req.body } },
        { upsert: true, returnDocument: "after" }
      ).catch(err => {
        console.error("Error saving config to MongoDB:", err);
      });
    }
    res.json({ success: true });
  } catch (e) {
    console.error("Error saving config:", e);
    res.status(500).json({ error: "Failed to save config" });
  }
});

// --- Leads API ---
app.post("/api/leads", (req, res) => {
  try {
    const newLead = {
      ...req.body,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };

      // Save to MongoDB if connected, otherwise JSON file
      if (leadCollection) {
        leadCollection.insertOne(newLead).then(() => {
          res.json({ success: true });
        }).catch(err => {
          console.error("Error saving lead to MongoDB:", err);
            // Fallback to JSON file
            let leads = [];
            if (fs.existsSync(leadsPath)) {
              leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
            }
            leads.push(newLead);
            fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
            res.json({ success: true });
        });
        return;
      }
      let leads = [];
      if (fs.existsSync(leadsPath)) {
        leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
      }
      leads.push(newLead);
      fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
      res.json({ success: true });
    } catch (e) {
      console.error("Error saving lead:", e);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.get("/api/admin/leads", checkAdmin, (req, res) => {
    // Try MongoDB first if connected
    if (leadCollection) {
      leadCollection.find({}).sort({ timestamp: -1 }).toArray().then(leads => {
        res.json(leads);
      }).catch(err => {
        console.error("Error reading leads from MongoDB:", err);
        // Fall back to JSON file
        try {
          if (fs.existsSync(leadsPath)) {
            const leads = fs.readFileSync(leadsPath, 'utf8');
            return res.json(JSON.parse(leads));
          }
        } catch (e) {
          console.error("Error reading leads:", e);
        }
        res.json([]);
      });
      return;
    }
    // Fallback: JSON file storage
    try {
      if (fs.existsSync(leadsPath)) {
        const leads = fs.readFileSync(leadsPath, 'utf8');
        return res.json(JSON.parse(leads));
      }
    } catch (e) {
      console.error("Error reading leads:", e);
    }
    res.json([]);
  });

// --- Vite middleware for development (only when not on Vercel) ---
if (process.env.NODE_ENV !== "production" && !isVercel) {
  import("vite").then(({ createServer: createViteServer }) => {
    createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    }).then((vite) => {
      app.use(vite.middlewares);
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Admin Password Set: ${!!process.env.ADMIN_PASSWORD}`);
        if (!process.env.ADMIN_PASSWORD) {
          console.warn("WARNING: ADMIN_PASSWORD is not set. Admin login requires ADMIN_PASSWORD env var.");
        }
      });
    }).catch(err => {
      console.error("Failed to start development Vite: ", err);
    });
  });
} else {
  // Serve static files from the dist directory in production or under serverless execution (Vercel)
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  
  // Fallback to index.html for SPA routing with dynamic canonical mapping to avoid search index conflicts!
  app.get('*', (req, res) => {
    let indexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(process.cwd(), 'index.html');
    }
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(__dirname, 'index.html');
    }
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(__dirname, 'dist', 'index.html');
    }
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send("Index not found");
    }
    
    // Read the HTML
    fs.readFile(indexPath, 'utf8', (err, html) => {
      if (err) {
        console.error("Error reading index.html:", err);
        return res.status(500).send("Internal Server Error");
      }
      
      // Dynamically inject canonical URL and open graph URL based on the current path
      const currentPath = req.path;
      const canonicalUrl = `https://mentorarena.online${currentPath}`;
      const ogUrl = canonicalUrl;
      
      // Update canonical link
      html = html.replace(
        /<link rel="canonical" href="[^"]*"/,
        `<link rel="canonical" href="${canonicalUrl}"`
      );
      
      // Update OG URL
      html = html.replace(
        /<meta property="og:url" content="[^"]*"/,
        `<meta property="og:url" content="${ogUrl}"`
      );
      
      // Update Twitter URL
      html = html.replace(
        /<meta name="twitter:url" content="[^"]*"/,
        `<meta name="twitter:url" content="${ogUrl}"`
      );
      
      res.send(html);
    });
  });
}

export default app;
