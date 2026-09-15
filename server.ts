import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import axios from "axios";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vercel detection
const isVercel = !!process.env.VERCEL;
const isLocalhost = Boolean(process.env.LOCAL_SERVER);

// --- File paths ---
const uploadsDir = isVercel ? "/tmp/uploads" : path.join(process.cwd(), "public", "uploads");
const configPath = isVercel ? path.join("/tmp", "config.json") : path.join(process.cwd(), "data", "config.json");
const leadsPath = isVercel ? path.join("/tmp", "leads.json") : path.join(process.cwd(), "data", "leads.json");

// --- Ensure directories exist ---
function initPaths() {
  const dirs = isVercel ? [uploadsDir] : [uploadsDir, path.dirname(configPath)];
  for (const d of dirs) {
    if (!fs.existsSync(d)) {
      try { fs.mkdirSync(d, { recursive: true }); } catch (e) { console.error("mkdir error:", e); }
    }
  }
  // Copy data files to /tmp on Vercel if needed
  if (isVercel) {
    const copyFile = (src: string, dst: string) => {
      if (fs.existsSync(src) && !fs.existsSync(dst)) {
        try { fs.copyFileSync(src, dst); } catch (e) { console.error("copy error:", e); }
      } else if (!fs.existsSync(dst)) {
        try { fs.writeFileSync(dst, "[]"); } catch (e) { console.error("write error:", e); }
      }
    };
    copyFile(path.join(process.cwd(), "data", "config.json"), configPath);
    copyFile(path.join(process.cwd(), "data", "leads.json"), leadsPath);
  }
}
initPaths();

// --- Express app ---
const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(isVercel ? "/tmp/uploads" : path.join(process.cwd(), "public", "uploads")));

// Multer config
const upload = multer({
  storage: multer.diskStorage({
    destination: isVercel ? "/tmp/uploads" : path.join(process.cwd(), "public", "uploads"),
    filename: (_req, file) => `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_")}`
  }),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Redirect non-www to www
app.use((req, res, next) => {
  const hostname = req.hostname;
  if (!isLocalhost && hostname === "mentorarena.online") {
    return res.redirect(301, `https://www.mentorarena.online${req.originalUrl}`);
  }
  next();
});

app.set("trust proxy", 1);

// --- Status endpoint ---
app.get("/api/status", (_req, res) => {
  res.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    vercel: isVercel,
    adminSet: !!process.env.ADMIN_PASSWORD
  });
});

// --- Admin auth middleware ---
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
    console.error("ADMIN_PASSWORD not set. Admin login disabled.");
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

// --- GitHub OAuth URL ---
app.get("/api/auth/github/url", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(503).json({ error: "GitHub OAuth not configured." });
  }
  const appUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
  const redirectUri = `${appUrl}/api/auth/github/callback`;
  const scopes = ["read:user", "user:email"];
  const authUrl = `https://github.com/login/oauth/authorize?${new URLSearchParams({
    client_id: clientId, redirect_uri: redirectUri, scope: scopes.join(" "), allow_signup: "true"
  }).toString()}`;
  res.json({ url: authUrl });
});

// --- GitHub OAuth callback ---
app.get(["/api/auth/github/callback", "/api/auth/github/callback/"], async (req, res) => {
  const { code } = req.query as { code?: string };
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return res.status(400).json({ error: "Missing OAuth code or credentials" });
  }

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId, client_secret: clientSecret, code,
        redirect_uri: `${process.env.APP_URL || `${req.protocol}://${req.get("host")}`}/api/auth/github/callback`,
        grant_type: "authorization_code"
      },
      { headers: { Accept: "application/json" } }
    );
    const access_token = tokenResponse.data.access_token;
    if (!access_token) {
      return res.status(400).json({ error: "Failed to get access token" });
    }

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" }
    });
    const githubUser = userResponse.data;

    const emailsResponse = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" }
    });
    const primaryEmail = (emailsResponse.data as Array<{ email: string; primary: boolean }>)
      .find(e => e.primary)?.email || githubUser.email || "";

    res.cookie("admin_token", "mentor_arena_admin_session", {
      httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000
    });
    res.json({
      success: true,
      user: { email: primaryEmail, name: githubUser.name || githubUser.login, role: "admin", avatar: githubUser.avatar_url }
    });
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    res.status(500).json({ error: "Authentication failed. Please try again." });
  }
});

// --- Admin upload ---
app.post("/api/admin/upload", checkAdmin, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ success: true, filename: req.file.filename, path: `/uploads/${req.file.filename}`, size: req.file.size });
});

// --- Admin stats ---
app.get("/api/admin/stats", checkAdmin, (_req, res) => {
  try {
    let leads: Array<Record<string, unknown>> = [];
    if (fs.existsSync(leadsPath)) {
      leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
    }
    let config: Record<string, unknown> = {};
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    }
    let uploadedFiles = 0;
    if (fs.existsSync(uploadsDir)) {
      uploadedFiles = fs.readdirSync(uploadsDir).length;
    }
    res.json({ totalLeads: leads.length, config, uploadedFiles });
  } catch (e) {
    console.error("Error getting stats:", e);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

// --- Config API (GET) ---
app.get("/api/config", (_req, res) => {
  try {
    if (fs.existsSync(configPath)) {
      const config = fs.readFileSync(configPath, "utf8");
      if (config.trim()) {
        const parsed = JSON.parse(config);
        if (parsed && typeof parsed === "object") return res.json(parsed);
      }
    }
  } catch (e) {
    console.error("Error reading config:", e);
  }
  res.json({});
});

// --- Config API (POST, admin only) ---
app.post("/api/admin/config", checkAdmin, (req, res) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (e) {
    console.error("Error saving config:", e);
    res.status(500).json({ error: "Failed to save config" });
  }
});

// --- Leads API (POST) ---
app.post("/api/leads", (req, res) => {
  try {
    const newLead = { ...req.body, id: Date.now().toString(), timestamp: new Date().toISOString() };
    let leads: Array<Record<string, unknown>> = [];
    if (fs.existsSync(leadsPath)) {
      leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
    }
    leads.push(newLead);
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
    res.json({ success: true });
  } catch (e) {
    console.error("Error saving lead:", e);
    res.status(500).json({ error: "Failed to save lead" });
  }
});

// --- Admin leads (GET) ---
app.get("/api/admin/leads", checkAdmin, (_req, res) => {
  try {
    if (fs.existsSync(leadsPath)) {
      const leads = fs.readFileSync(leadsPath, "utf8");
      return res.json(JSON.parse(leads));
    }
  } catch (e) {
    console.error("Error reading leads:", e);
  }
  res.json([]);
});

// --- Sitemap ---
app.get("/sitemap.xml", (_req, res) => {
  const baseUrl = "https://mentorarena.online";
  const today = new Date().toISOString().split("T")[0];
  const config: Record<string, unknown> = {};
  if (fs.existsSync(configPath)) {
    try { const c = JSON.parse(fs.readFileSync(configPath, "utf8")); if (c && typeof c === "object") Object.assign(config, c); } catch {}
  }
  const blogPosts = Math.min(Math.max(Number(config.blogPosts || 0), 0), 50);
  const baseUrls: Array<{ url: string; priority: string; changefreq: string }> = [
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
  for (let i = 1; i <= blogPosts; i++) {
    baseUrls.push({ url: `${baseUrl}/blog/post-${i}`, priority: "0.8", changefreq: "monthly" });
  }
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url><loc>${baseUrls[0].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[0].changefreq}</changefreq><priority>${baseUrls[0].priority}</priority><image:image><image:loc>${baseUrl}/assets/images/hero_web_dev_1786510034820.jpg</image:loc><image:caption>AI generated hero banner - 1-to-1 MERN full-stack development mentorship in Pakistan - Mentor Arena</image:caption><image:title>Mentor Arena - 1-to-1 Digital Skills Coaching</image:title></image:image></url>
  <url><loc>${baseUrls[1].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[1].changefreq}</changefreq><priority>${baseUrls[1].priority}</priority><image:image><image:loc>${baseUrl}/assets/images/hero_uiux_design_1786510085434.jpg</image:loc><image:caption>AI generated hero banner - 1-to-1 UI/UX design mentorship in Pakistan - Mentor Arena</image:caption><image:title>Mentor Arena - UI/UX Design Mentorship</image:title></image:image></url>
  <url><loc>${baseUrls[2].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[2].changefreq}</changefreq><priority>${baseUrls[2].priority}</priority><image:image><image:loc>${baseUrl}/assets/images/hero_seo_growth_1786510068606.jpg</image:loc><image:caption>AI generated hero banner - 1-to-1 technical SEO mentorship in Pakistan - Mentor Arena</image:caption><image:title>Mentor Arena - Technical SEO Mentorship</image:title></image:image></url>
  <url><loc>${baseUrls[3].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[3].changefreq}</changefreq><priority>${baseUrls[3].priority}</priority><image:image><image:loc>${baseUrl}/assets/images/hero_web_dev_1786510034820.jpg</image:loc><image:caption>AI generated hero banner - 1-to-1 MERN full-stack development mentorship in Pakistan - Mentor Arena</image:caption><image:title>Mentor Arena - MERN Stack Web Development</image:title></image:image></url>
  <url><loc>${baseUrls[4].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[4].changefreq}</changefreq><priority>${baseUrls[4].priority}</priority><image:image><image:loc>${baseUrl}/assets/images/hero_uiux_design_1786510085434.jpg</image:loc><image:caption>AI generated hero banner - 1-to-1 UI/UX design mentorship in Pakistan - Mentor Arena</image:caption><image:title>Mentor Arena - UI/UX Design & Digital Marketing</image:title></image:image></url>
  <url><loc>${baseUrls[5].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[5].changefreq}</changefreq><priority>${baseUrls[5].priority}</priority><image:image><image:loc>${baseUrl}/assets/images/hero_generative_ai_1786510052247.jpg</image:loc><image:caption>AI generated hero banner - 1-to-1 Generative AI and autonomous agent engineering mentorship in Pakistan - Mentor Arena</image:caption><image:title>Mentor Arena - Generative AI Mentorship</image:title></image:image></url>
  <url><loc>${baseUrls[6].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[6].changefreq}</changefreq><priority>${baseUrls[6].priority}</priority><image:image><image:loc>${baseUrl}/assets/images/hero_financial_excel_1786510102786.jpg</image:loc><image:caption>AI generated hero banner - 1-to-1 advanced Excel and financial modeling mentorship in Pakistan - Mentor Arena</image:caption><image:title>Mentor Arena - Advanced Excel & Financial Modeling</image:title></image:image></url>
  <url><loc>${baseUrls[7].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[7].changefreq}</changefreq><priority>${baseUrls[7].priority}</priority><image:image><image:loc>${baseUrl}/assets/images/hero_financial_excel_1786510102786.jpg</image:loc><image:caption>AI generated hero banner - 1-to-1 computerized accounting mentorship in Pakistan - Mentor Arena</image:caption><image:title>Mentor Arena - Computerized Accounting</image:title></image:image></url>
  <url><loc>${baseUrls[8].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[8].changefreq}</changefreq><priority>${baseUrls[8].priority}</priority></url>
  <url><loc>${baseUrls[9].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[9].changefreq}</changefreq><priority>${baseUrls[9].priority}</priority></url>
  <url><loc>${baseUrls[10].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[10].changefreq}</changefreq><priority>${baseUrls[10].priority}</priority></url>
  <url><loc>${baseUrls[11].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[11].changefreq}</changefreq><priority>${baseUrls[11].priority}</priority></url>
  <url><loc>${baseUrls[12].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[12].changefreq}</changefreq><priority>${baseUrls[12].priority}</priority></url>
  <url><loc>${baseUrls[13].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[13].changefreq}</changefreq><priority>${baseUrls[13].priority}</priority></url>
  <url><loc>${baseUrls[14].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[14].changefreq}</changefreq><priority>${baseUrls[14].priority}</priority></url>
  <url><loc>${baseUrls[15].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[15].changefreq}</changefreq><priority>${baseUrls[15].priority}</priority></url>
  <url><loc>${baseUrls[16].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[16].changefreq}</changefreq><priority>${baseUrls[16].priority}</priority></url>
  <url><loc>${baseUrls[17].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[17].changefreq}</changefreq><priority>${baseUrls[17].priority}</priority></url>
  <url><loc>${baseUrls[18].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[18].changefreq}</changefreq><priority>${baseUrls[18].priority}</priority></url>
  <url><loc>${baseUrls[19].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[19].changefreq}</changefreq><priority>${baseUrls[19].priority}</priority></url>
  <url><loc>${baseUrls[20].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[20].changefreq}</changefreq><priority>${baseUrls[20].priority}</priority></url>
  <url><loc>${baseUrls[21].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[21].changefreq}</changefreq><priority>${baseUrls[21].priority}</priority></url>
  <url><loc>${baseUrls[22].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[22].changefreq}</changefreq><priority>${baseUrls[22].priority}</priority></url>
  <url><loc>${baseUrls[23].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[23].changefreq}</changefreq><priority>${baseUrls[23].priority}</priority></url>
</urlset>`;
  for (let i = 16; i < baseUrls.length; i++) {
    xml += `\n  <url><loc>${baseUrls[i].url}</loc><lastmod>${today}</lastmod><changefreq>${baseUrls[i].changefreq}</changefreq><priority>${baseUrls[i].priority}</priority></url>`;
  }
  res.header("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

// --- Robots.txt ---
app.get(["/robots.txt", "/Robots.txt"], (_req, res) => {
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

// --- Serve static + SPA fallback ---
if (!isVercel) {
  // Dev: use Vite middleware
  import("vite").then(({ createServer }) => {
    createServer({ server: { middlewareMode: true }, appType: "spa" }).then(vite => {
      app.use(vite.middlewares);
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Admin Password Set: ${!!process.env.ADMIN_PASSWORD}`);
        if (!process.env.ADMIN_PASSWORD) {
          console.warn("WARNING: ADMIN_PASSWORD not set. Admin login requires ADMIN_PASSWORD env var.");
        }
      });
    }).catch(err => console.error("Vite error:", err));
  });
} else {
  // Production: serve dist
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    fs.readFile(indexPath, "utf8", (err, html) => {
      if (err) return res.status(500).send("Internal Server Error");
      const currentPath = req.path;
      const canonicalUrl = `https://mentorarena.online${currentPath}`;
      const ogUrl = canonicalUrl;
      html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);
      html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${ogUrl}"`);
      html = html.replace(/<meta name="twitter:url" content="[^"]*"/, `<meta name="twitter:url" content="${ogUrl}"`);
      res.send(html);
    });
  });
}

export default app;
