# Mentor Arena — Site Structure

**Property:** mentorarena.online  
**Date:** 2026-10-21

---

## Site Type

- **Type:** Client-rendered Single Page Application (SPA)
- **Framework:** React 19 + Vite 6 + TypeScript
- **Styling:** Tailwind CSS v4
- **Server:** Express 4 (serverless on Vercel)
- **Database:** MongoDB Atlas M0 (free tier) with JSON file fallback
- **Hosting:** Vercel (hobby tier, auto-deploy from main)

---

## Page Map

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | App (hero, CTAs, pricing) | Landing page — primary conversion |
| `/about` | AboutPage | Mentor bio, EEAT signals |
| `/auth` | AuthPage | Student registration + login |
| `/contact` | ContactPage | Contact form → Google Sheets |
| `/faq` | FAQPage | FAQ with schema |
| `/pricing` | PricingPage | PKR 6,000/month, payment methods |
| `/reviews` | ReviewsPage | Google + Trustpilot review CTAs |
| `/web-dev` | WebDevelopmentPage | MERN stack course |
| `/seo` | SEOPage | Technical SEO course |
| `/uiux` | UIUXPage | UI/UX design course |
| `/excel` | AdvanceExcelPage | Advanced Excel course |
| `/accounting` | ComputerizedAccountingPage | Accounting course |
| `/graphic-design` | GraphicDesignPage | Graphic design course |
| `/office-automation` | OfficeAutomationPage | Office automation course |
| `/generative-ai` | GenerativeAIPage | Generative AI course |
| `/tools` | ToolsHubPage | Free tools hub |
| `/blog` | BlogHubPage | Blog articles |
| `/alumni` | AlumniPlacementPage | Alumni outcomes |
| `/live-teardowns` | LiveTeardownsPage | Live coding sessions |
| `/compare-institutes` | CompareInstitutesPage | Comparison page |
| `/compare-iskills` | CompareIskillsPage | Skills comparison |
| `/admin` | AdminDashboard | Admin panel (auth-gated) |

---

## API Routes

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/status` | GET | Public | Health check |
| `/api/auth/register` | POST | Public | Student registration |
| `/api/auth/login` | POST | Public | Student login |
| `/api/auth/me` | GET | Student | Current session |
| `/api/auth/logout` | POST | Student | Logout |
| `/api/auth/send-verification` | POST | Public | Send verification email |
| `/api/auth/google` | POST | Public | Google OAuth |
| `/api/leads` | GET/POST | Public | Lead capture |
| `/api/admin/leads` | GET | Admin | View leads |
| `/api/admin/config` | GET/POST | Admin | Site config |
| `/api/batches` | GET | Public | Available batches |
| `/api/enroll` | POST | Public | Enroll in batch |
| `/api/admin/batches` | GET/PUT | Admin | Manage batches |
| `/api/admin/enrollments` | GET | Admin | View enrollments |
| `/api/invoices` | GET | Student | Student invoices |
| `/api/tickets` | GET/POST | Student | Support tickets |
| `/api/social/posts` | GET/POST/PUT/DELETE | Mixed | Social media posts |

---

## Free Tools (Lead Gen Entry Points)

| Tool | File | CTA Target |
|------|------|------------|
| Meta Tag Generator | MetaTagGeneratorTool.tsx | /seo |
| Keyword Density | KeywordDensityTool.tsx | /seo |
| SERP Simulator | SerpSimulatorTool.tsx | /seo |
| Robots.txt Generator | RobotsTxtGeneratorTool.tsx | /seo |
| Schema Generator | SchemaGeneratorTool.tsx | /seo |
| Case Converter | CaseConverterTool.tsx | /web-dev |
| Word Counter | WordCounterTool.tsx | /seo |
| Freelance Rate Calculator | FreelanceRateCalculatorTool.tsx | /pricing |
| Remittance Calculator | RemittanceCalculatorTool.tsx | /excel |

---

*Last updated: 2026-10-21*
