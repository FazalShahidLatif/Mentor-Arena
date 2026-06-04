import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import axios from "axios";

// Load environment variables from .env file if it exists
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = !!process.env.VERCEL;

// Define directories and file paths dynamically
const uploadsDir = isVercel ? path.join('/tmp', 'uploads') : path.join(process.cwd(), 'public', 'uploads');
const configPath = isVercel ? path.join('/tmp', 'config.json') : path.join(process.cwd(), 'data', 'config.json');
const leadsPath = isVercel ? path.join('/tmp', 'leads.json') : path.join(process.cwd(), 'data', 'leads.json');

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
    
    const originalConfigPath = path.join(process.cwd(), 'data', 'config.json');
    if (fs.existsSync(originalConfigPath) && !fs.existsSync(configPath)) {
      try { fs.copyFileSync(originalConfigPath, configPath); } catch (e) { console.error("Error copying config to /tmp:", e); }
    } else if (!fs.existsSync(configPath)) {
      try { fs.writeFileSync(configPath, JSON.stringify({}, null, 2)); } catch (e) { console.error("Error creating default /tmp/config.json:", e); }
    }
    
    const originalLeadsPath = path.join(process.cwd(), 'data', 'leads.json');
    if (fs.existsSync(originalLeadsPath) && !fs.existsSync(leadsPath)) {
      try { fs.copyFileSync(originalLeadsPath, leadsPath); } catch (e) { console.error("Error copying leads to /tmp:", e); }
    } else if (!fs.existsSync(leadsPath)) {
      try { fs.writeFileSync(leadsPath, JSON.stringify([], null, 2)); } catch (e) { console.error("Error creating default /tmp/leads.json:", e); }
    }
  }
}

initPaths();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Permanent 301 Redirect Middleware for Canonical SEO Optimization
app.use((req, res, next) => {
  const host = req.get("host") || "";
  const url = req.url;
  const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";

  let targetHost = host;
  let targetProto = protocol;
  let redirected = false;

  // 1. Force HTTPS in production
  if (process.env.NODE_ENV === "production" && protocol === "http") {
    targetProto = "https";
    redirected = true;
  }

  // 2. Remove "www." prefix for cohesive, error-free search indexing
  if (host.toLowerCase().startsWith("www.")) {
    targetHost = host.slice(4);
    redirected = true;
  }

  // 3. Normalize path: remove trailing slash (except for home path '/') and redirect /index.html, /index.php, /home to canonical paths
  let pathname = req.path;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
    redirected = true;
  }

  const legacyRedirects: Record<string, string> = {
    "/home": "/",
    "/index.html": "/",
    "/index.php": "/",
    "/index": "/",
    "/courses": "/",
    "/tracks": "/",
  };

  if (legacyRedirects[pathname.toLowerCase()]) {
    pathname = legacyRedirects[pathname.toLowerCase()];
    redirected = true;
  }

  if (redirected) {
    const queryStr = url.includes("?") ? url.split("?")[1] : "";
    const targetUrl = `${targetProto}://${targetHost}${pathname}${queryStr ? "?" + queryStr : ""}`;
    console.log(`[SEO Permanent 301 Redirect] ${protocol}://${host}${url} -> ${targetUrl}`);
    res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache 301 for optimal search spider indexing
    return res.redirect(301, targetUrl);
  }

  next();
});

  // Serve dynamic robots.txt mapped to the incoming requester domain to prevent GSC warnings
  app.get("/robots.txt", (req, res) => {
    const host = req.get("host") || "mentorarena.online";
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const currentDomain = `${protocol}://${host}`;

    const rob = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*?*

# Sitemap
Sitemap: ${currentDomain}/sitemap.xml

# AI crawlers - control indexing of training models
User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

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

# Standard block of aggressive crawlers
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

Crawl-delay: 1
`;
    res.type("text/plain");
    res.send(rob);
  });

  // Serve dynamic sitemap.xml mapped to the incoming requester domain
  app.get("/sitemap.xml", (req, res) => {
    const host = req.get("host") || "mentorarena.online";
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const currentDomain = `${protocol}://${host}`;

    const sitem = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>${currentDomain}/</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${currentDomain}/courses/web-development</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${currentDomain}/courses/seo</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${currentDomain}/courses/uiux-digital-marketing</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${currentDomain}/about</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${currentDomain}/pricing</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${currentDomain}/contact</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${currentDomain}/faq</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${currentDomain}/reviews</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${currentDomain}/blog</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${currentDomain}/blog/best-budget-coding-laptop-mern-stack-pakistan</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${currentDomain}/blog/remote-react-developer-job-lahore-karachi</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${currentDomain}/blog/silo-semantic-content-architecture-pakistan-blog</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${currentDomain}/blog/receiving-foreign-remittances-pakistan-alternatives-paypal</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${currentDomain}/blog/integrating-server-side-gemini-ai-react-node</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
`;
    res.type("application/xml");
    res.send(sitem);
  });

  // Serve uploads statically
  app.use('/uploads', express.static(uploadsDir));

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      }
      cb(new Error("Only images and videos are allowed"));
    }
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "Mentor Arena API is running",
      env: process.env.NODE_ENV,
      adminSet: !!process.env.ADMIN_PASSWORD
    });
  });

  // Admin Login API
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // Default for dev if not set

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

  // Admin Logout API
  app.post("/api/admin/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ success: true });
  });

  // GitHub OAuth Routes
  app.get("/api/auth/github/url", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: "GITHUB_CLIENT_ID not configured" });
    }

    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    const redirectUri = `${appUrl}/api/auth/github/callback`;

    const params = new URLSearchParams({
      client_id: clientId,
      scope: "read:user user:email",
      redirect_uri: redirectUri
    });

    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    res.json({ url: authUrl });
  });

  app.get(["/api/auth/github/callback", "/api/auth/github/callback/"], async (req, res) => {
    const { code } = req.query;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!code || !clientId || !clientSecret) {
      return res.status(400).send("Missing OAuth parameters");
    }

    try {
      // Exchange code for token
      const tokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        { headers: { Accept: "application/json" } }
      );

      const accessToken = tokenResponse.data.access_token;

      if (!accessToken) {
        throw new Error("Failed to obtain access token");
      }

      // Get user info
      const userResponse = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Here you would normally verify if this GitHub user is an allowed admin
      // For now, we'll allow any successful GitHub login to set the admin cookie
      console.log(`GitHub login successful for user: ${userResponse.data.login}`);

      res.cookie("admin_token", "mentor_arena_admin_session", {
        httpOnly: true,
        secure: true, // Required for SameSite=None
        sameSite: 'none', // Required for cross-origin iframe
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("GitHub OAuth Error:", error);
      res.status(500).send("Authentication failed");
    }
  });

  // Middleware to check if user is admin
  const checkAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.cookies.admin_token === "mentor_arena_admin_session") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  // Upload API
  app.post("/api/admin/upload", checkAdmin, upload.single('file'), (req, res) => {
    const multerReq = req as any;
    if (!multerReq.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `/uploads/${multerReq.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Example protected API route
  app.get("/api/admin/stats", checkAdmin, (req, res) => {
    let totalLeads = 0;
    try {
      if (fs.existsSync(leadsPath)) {
        const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
        totalLeads = leads.length;
      }
    } catch (e) {
      console.error("Error reading leads for stats:", e);
    }
    res.json({ totalStudents: 15, activeCourses: 4, totalLeads });
  });

  // Resolve Google Photos link to direct image URL
  app.get("/api/resolve-photo", async (req, res) => {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: "Missing url parameter" });
    }
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        maxRedirects: 5
      });
      const html = response.data;
      
      // Match og:image URL or googleusercontent URLs
      let imageUrl = "";
      const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                           html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
      
      if (ogImageMatch && ogImageMatch[1]) {
        imageUrl = ogImageMatch[1];
      } else {
        // Fallback to searching googleusercontent link inside script/html
        const googleUserContentMatch = html.match(/"(https:\/\/lh\d+\.googleusercontent\.com\/[^"]+)"/) ||
                                       html.match(/(https:\/\/lh\d+\.googleusercontent\.com\/[^\s"'>]+)/);
        if (googleUserContentMatch && googleUserContentMatch[1]) {
          imageUrl = googleUserContentMatch[1];
        }
      }

      if (imageUrl) {
        imageUrl = imageUrl.replace(/&amp;/g, '&');
        // Cache the result or redirect directly
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
        return res.redirect(imageUrl);
      }

      res.status(404).json({ error: "Could not extract image URL from page" });
    } catch (error: any) {
      console.error("Error resolving photo:", error.message);
      res.status(500).json({ error: "Failed to fetch/resolve photo url" });
    }
  });

  // Config API
  app.get("/api/config", (req, res) => {
    try {
      if (fs.existsSync(configPath)) {
        const config = fs.readFileSync(configPath, 'utf8');
        return res.json(JSON.parse(config));
      }
    } catch (e) {
      console.error("Error reading config:", e);
    }
    res.json({}); // Return empty if not found
  });

  app.post("/api/admin/config", checkAdmin, (req, res) => {
    try {
      fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (e) {
      console.error("Error saving config:", e);
      res.status(500).json({ error: "Failed to save config" });
    }
  });

  // Leads API
  app.post("/api/leads", (req, res) => {
    try {
      const newLead = {
        ...req.body,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
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

  // Vite middleware for development (only when not on Vercel)
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
            console.warn("WARNING: ADMIN_PASSWORD is not set. Using default 'admin123'");
          }
        });
      });
    }).catch(err => {
      console.error("Failed to start development Vite: ", err);
    });
  } else {
    // Serve static files from the dist directory in production or under serverless execution (Vercel)
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Fallback to index.html for SPA routing with dynamic canonical mapping to avoid search index conflicts!
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        fs.readFile(indexPath, 'utf8', (err, data) => {
          if (err) {
            console.error("Error reading index.html:", err);
            return res.sendFile(indexPath);
          }
          const host = req.get("host") || "mentorarena.online";
          const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
          const currentDomain = `${protocol}://${host}`;
          
          // Dynamically replace mentorarena.online with the active domain to prevent SEO duplicate content penalties!
          const dynamicHtml = data.replace(/https:\/\/mentorarena\.online/g, currentDomain);
          res.send(dynamicHtml);
        });
      } else {
        res.status(404).send("Index not found");
      }
    });

    // Only listen on port if not running in Vercel serverless environment
    if (!isVercel) {
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Admin Password Set: ${!!process.env.ADMIN_PASSWORD}`);
        if (!process.env.ADMIN_PASSWORD) {
          console.warn("WARNING: ADMIN_PASSWORD is not set. Using default 'admin123'");
        }
      });
    }
  }

export default app;
