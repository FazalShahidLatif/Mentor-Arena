import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Check, 
  Clock, 
  MessageSquare, 
  ArrowRight, 
  Terminal, 
  Globe, 
  Target, 
  CheckCircle, 
  Users, 
  ChevronRight, 
  HelpCircle,
  Code,
  Search,
  Palette,
  Heart,
  Layout,
  BookOpen,
  Award,
  DollarSign,
  FileSpreadsheet,
  Calculator,
  Bot,
  Database,
  Briefcase
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

export type TrackId = 'web-dev' | 'seo' | 'uiux' | 'advance-excel' | 'computerized-accounting' | 'generative-ai' | 'graphic-design' | 'office-automation';

interface SyllabusViewerModalProps {
  isOpen: boolean;
  initialTrack: TrackId;
  onClose: () => void;
  onBookClick?: () => void;
}

type TrackConfig = {
  id: TrackId;
  title: string;
  icon: any;
  tagline: string;
  badge: string;
  intro: string;
  shippedTitle: string;
  shippedIntro: string;
  shippedItems: { title: string; desc: string; badge?: string }[];
  stackTitle: string;
  stackSubtitle: string;
  stack: { category: string; skills: string[] }[];
  weeks: { title: string; skills: string[]; milestone: string }[];
  howFormat: string;
  howSchedule: string;
  fitFor: string[];
  notFitFor: string[];
  faqs: { q: string; a: string }[];
  careerPaths?: {
    title: string;
    subtitle: string;
    paths: { title: string; desc: string }[];
    disclaimer?: string;
  };
};

const TRACKS: Record<TrackId, TrackConfig> = {
  'web-dev': {
    id: 'web-dev',
    title: 'Full-Stack Web Development',
    icon: Terminal,
    badge: '150 Live Hours · 14 Weeks',
    tagline: 'Build and deploy a real MERN-stack web app — with 1-to-1 mentorship in Karachi.',
    intro: 'A 150-hour live program for Pakistani students who want to ship a working full-stack web application — not just finish a video playlist. You finish with a deployed app, a GitHub repo, a custom domain, and a portfolio piece you can show employers or clients.',
    shippedTitle: "What you'll ship",
    shippedIntro: 'One deployed full-stack web app. You will pick a real-world problem you want to solve — a marketplace, a SaaS tool, a community platform, an e-commerce store, a directory — and ship a deployed, working version. The project is yours. We help you scope it, build it, deploy it, and document it.',
    shippedItems: [
      { title: 'One Deployed Web App', desc: 'A real-world customized application tailored to your chosen niche (marketplace, directory, dashboard, portal).', badge: 'MVP Status' },
      { title: 'Live URL', desc: 'Deployed on Vercel or Railway with a custom domain you own.' },
      { title: 'GitHub Repo', desc: 'Public, with a professional README so employers can review your code.' },
      { title: 'Real Users', desc: 'Optional: share with friends, family, or a small audience for real feedback.' }
    ],
    stackTitle: 'The stack',
    stackSubtitle: 'What you will learn to use, properly',
    stack: [
      { category: 'Frontend', skills: ['React', 'Modern JavaScript (ES6+)', 'Tailwind CSS', 'Responsive design', 'Accessibility basics'] },
      { category: 'Backend', skills: ['Node.js', 'Express.js', 'RESTful API design', 'Authentication', 'File uploads'] },
      { category: 'Database', skills: ['MongoDB', 'Mongoose ODM', 'Data modeling', 'Basic indexing'] },
      { category: 'DevOps', skills: ['Git', 'GitHub', 'Environment variables', 'Vercel & Railway deployment', 'Custom domain setup', 'Basic CI'] },
      { category: 'Testing & Quality', skills: ['Manual QA', 'Basic unit testing', 'Code review with your mentor', 'Lighthouse audits'] },
      { category: 'Professional Habits', skills: ['Git workflow', 'README writing', 'Project documentation', 'Weekly mentor reviews'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–3 · Foundations',
        skills: ['HTML, CSS, modern JavaScript, the browser dev tools', 'Git & GitHub basics: commit, branch, pull request', 'React fundamentals: components, props, state, hooks', 'Tailwind CSS for fast, responsive UI'],
        milestone: 'A static multi-page React site deployed on Vercel'
      },
      {
        title: 'Weeks 4–7 · Backend & Data',
        skills: ['Node.js and Express.js: routes, middleware, REST APIs', 'MongoDB and Mongoose: modeling, queries, indexes', 'Authentication: signup, login, sessions, JWT', 'Connecting frontend to backend: fetch, async, error handling'],
        milestone: 'A full-stack CRUD app deployed with auth'
      },
      {
        title: 'Weeks 8–11 · Your Real Project',
        skills: ['Project scoping: pick a problem, define MVP, draft user stories', 'Build the core features, weekly mentor review of your code', 'Polish: accessibility, error states, mobile responsiveness', 'Deploy with custom domain, set up analytics, write README'],
        milestone: 'Working deployed v1 of your chosen project'
      },
      {
        title: 'Weeks 12–14 · Ship & Showcase',
        skills: ['Iterate on real user feedback (optional, if you share with testers)', 'Add 1-2 "stretch" features', 'Write a project case study for your portfolio', 'Mock interview and code-review session with mentor'],
        milestone: 'Publicly deployed app + GitHub repo + case study + certificate'
      }
    ],
    howFormat: '1-to-1: Pace set by you, 2-4 sessions/week, mentor reviews your code every week. Small batch: Max 6 students per cohort, scheduled sessions, weekly group code review plus 1-to-1 office hours.',
    howSchedule: 'Sessions in PKT. Most students do weekday evenings (7-9 PM) and Saturday mornings. We work around your availability.',
    fitFor: [
      'A student or recent graduate in Karachi, Lahore, Islamabad, or anywhere in Pakistan',
      'Looking to switch careers into web development',
      'A freelancer who wants to ship bigger, paid projects',
      'Someone who has tried YouTube tutorials and wants real feedback'
    ],
    notFitFor: [
      'You want a 200-person cohort (we don\'t run those)',
      'You want a "guaranteed job" promise (no program can honestly make that)',
      'You can\'t commit 8-12 hours/week for 14 weeks',
      'You want a CS degree, not a deployable skill'
    ],
    faqs: [
      { q: 'What stack will I learn?', a: 'You will learn the MERN stack: MongoDB, Express.js, React, and Node.js along with Tailwind CSS and Git/GitHub.' },
      { q: 'Do I need a CS degree?', a: 'Absolutely not. This is a practical, direct training designed to teach raw software building skills. Having raw curiosity and commit hours is all it takes.' },
      { q: 'What project will I ship?', a: 'You will pick a real-world problem you want to solve, such as a localized directory, a rental marketplace, a community forum, an e-commerce shop, or a custom internal tool.' },
      { q: 'How is this different from YouTube or Udemy?', a: 'No tutorial hell. Instead of passive watching, you write actual code and get line-by-line feedback from an expert practitioner with 30+ years of raw experience.' }
    ],
    careerPaths: {
      title: 'Where our web-dev graduates go',
      subtitle: 'Typical entry opportunities inside the digital marketplace',
      paths: [
        { title: 'Junior Full-Stack Developer', desc: 'Join local software houses in Karachi/Lahore or work remotely for international startups. Entry salary ranges PKR 60,000–120,000/month.' },
        { title: 'React Frontend Specialist', desc: 'Work exclusively building user interfaces and interactive dashboards. Highly sought after by modern product startups.' },
        { title: 'Full-Stack Freelancer', desc: 'Launch professional services on Upwork/Fiverr or direct outreach to build custom web applications for international clients.' }
      ],
      disclaimer: 'Salary ranges are estimated based on local remote entry roles as of 2026.'
    }
  },
  'seo': {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    icon: Globe,
    badge: '150 Live Hours · 14 Weeks',
    tagline: 'Audit and rank a real local business website — with 1-to-1 SEO mentorship in Karachi.',
    intro: "Pakistan's digital economy is growing fast, and skilled SEOs are in short supply. In this 150-hour live program, you pick a real local business — a Karachi restaurant, a Lahore clinic, a Pakistani e-commerce store — and ship a documented before-and-after SEO audit with 1-to-1 mentorship.",
    shippedTitle: "What you'll ship",
    shippedIntro: 'A documented SEO case study on a real business. You will select a real local business website (with the owner\'s consent), run a full audit, implement improvements, and document the before-and-after in a public case study. By the end of the program, you have a portfolio piece that shows measurable ranking and traffic improvements.',
    shippedItems: [
      { title: 'Site chosen by you', desc: 'A real local business. We help you approach the owner; many are happy to host a student audit.' },
      { title: 'Full technical audit', desc: 'Crawl, index, schema, Core Web Vitals, internal linking, content gaps.' },
      { title: 'Documented results', desc: 'Before/after screenshots, ranking deltas, traffic deltas, recommendations followed up over 90 days.' }
    ],
    stackTitle: 'Tools you\'ll master',
    stackSubtitle: 'The SEO stack Pakistani agencies use',
    stack: [
      { category: 'Free tools', skills: ['Google Search Console', 'Google Analytics 4', 'Google Trends', 'Google Business Profile', 'Ubersuggest (limited)', 'PageSpeed Insights', 'Lighthouse'] },
      { category: 'Paid (free trials OK)', skills: ['Ahrefs', 'Semrush', 'Screaming Frog (free under 500 URLs)', 'Mangools (KWFinder)', 'Looker Studio'] },
      { category: 'Auxiliary', skills: ['Canva for content visuals', 'Basic WordPress (you\'ll audit at least one WP site)', 'Google Docs for reporting', 'Notion for project tracking'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–4 · Foundations & audit',
        skills: [
          'How Google ranks: crawling, indexing, ranking signals (the modern 2026 model)',
          'Keyword research with Ahrefs, Semrush, Google Trends, Ubersuggest',
          'On-page SEO: titles, meta descriptions, headings, content structure, internal linking',
          'Technical SEO audit with Screaming Frog and GSC: crawl errors, index bloat, schema, canonicals'
        ],
        milestone: 'A complete audit of your chosen business site'
      },
      {
        title: 'Weeks 5–8 · Implementation',
        skills: [
          'Content strategy: pillar pages, topic clusters, search intent mapping',
          'Local SEO: Google Business Profile, citations, NAP consistency, reviews',
          'Link building: outreach, guest posts, digital PR, white-hat Pakistani backlink sources',
          'Analytics setup: GA4, GSC, Search Console Insights, basic Looker Studio dashboards'
        ],
        milestone: 'All audit fixes implemented; early ranking changes visible'
      },
      {
        title: 'Weeks 9–14 · Document & showcase',
        skills: [
          'Tracking: weekly rank + traffic check-ins, 90-day report for the business owner',
          'Case study write-up for your portfolio (the artifact you\'ll show employers)',
          'Optional: pitch the business owner on a paid monthly retainer',
          'Mock client presentation with your mentor'
        ],
        milestone: 'Public case study + certificate + ready-to-apply SEO skill set'
      }
    ],
    howFormat: '1-to-1: Pace set by you, 2-4 sessions/week, mentor reviews your work every week. Small batch: Max 6 students per cohort, scheduled sessions, weekly group review plus 1-to-1 office hours.',
    howSchedule: 'Sessions in PKT. Most students do weekday evenings (7-9 PM) and Saturday mornings. We work around your availability.',
    fitFor: [
      'A student or recent graduate in Karachi, Lahore, Islamabad, or anywhere in Pakistan',
      'An entrepreneur who wants to rank their own business web presence without hiring agencies',
      'Content creators, writers, or marketing pros looking to unlock massive high-paid SEO skills',
      'Someone who has tried YouTube tutorials and wants real feedback'
    ],
    notFitFor: [
      'You want automatic overnight rankings (SEO requires weeks of real strategic pacing)',
      'You don\'t like researching, writing, or studying data structures',
      'You want a "guaranteed job" promise (no program can honestly make that)',
      'You can\'t commit 8-12 hours/week for 14 weeks'
    ],
    faqs: [
      { q: 'What is the SEO program?', a: 'A 150-hour live, project-based mentoring track where you choose a real business, audit its search performance, fix critical SEO blockers, and track its ranking improvements live on Google.' },
      { q: 'What SEO tools will I learn?', a: 'We teach you the top-tier resources used by international marketers: Ahrefs, Semrush, Google Search Console, Google Analytics 4, Screaming Frog, PageSpeed Insights, and Looker Studio.' },
      { q: 'Is SEO a good career in Pakistan?', a: 'Yes! With the explosive growth of e-commerce, real estate, and SaaS startups in Karachi, Lahore, and Islamabad, companies are actively seeking SEO professionals who can deliver measurable organic lead generation.' },
      { q: 'Will I work on a real site?', a: 'Yes! We strongly recommend and help you pick a real local business website (with the owner\'s consent) so you apply all tools in a production environment.' }
    ],
    careerPaths: {
      title: 'Where SEO students in Pakistan go',
      subtitle: 'Where SEO students in Pakistan go after building professional experience',
      paths: [
        { title: 'In-house SEO', desc: 'Karachi and Lahore companies (especially in e-commerce, real estate, and SaaS) hire full-time SEO specialists at PKR 80,000–250,000/month.' },
        { title: 'Agency work', desc: 'Local agencies (and international ones hiring remote from Pakistan) take on SEOs at PKR 100,000–300,000+/month for mid-level work.' },
        { title: 'Freelance international', desc: 'Upwork, Fiverr Pro, direct clients in the US/UK/AU. Senior freelancers charge USD 1,500–5,000/month per client.' },
        { title: 'Founding your own agency', desc: 'Mentor Arena graduates run boutique SEO agencies in Karachi and Lahore serving restaurants, clinics, and e-commerce brands.' }
      ],
      disclaimer: 'Salary ranges are based on 2026 Pakistani market data. We do not guarantee specific outcomes.'
    }
  },
  'uiux': {
    id: 'uiux',
    title: 'UI/UX Design & Digital Marketing',
    icon: Target,
    badge: '150 Live Hours · 14 Weeks',
    tagline: 'Design a Figma prototype and ship a Meta Ads campaign plan — with 1-to-1 mentorship in Karachi.',
    intro: 'A 150-hour live program for Pakistani students who want to design and market real products, not just make pretty mockups. You finish with a Figma prototype for a real local business plus a 4-week Meta Ads campaign plan with creative assets, ready to pitch and ready to run.',
    shippedTitle: "What you'll ship",
    shippedIntro: 'A Figma prototype + a 4-week Meta Ads campaign. You will pick a real local business — a restaurant, a clothing brand, a service provider — and design a marketing-ready prototype plus a runnable Meta Ads campaign.',
    shippedItems: [
      { title: 'Figma prototype', desc: 'Mobile-first, clickable, with design system and accessibility considerations.' },
      { title: 'Meta Ads campaign plan', desc: 'Audience research, creative brief, ad copy, 4-week calendar, budget allocation, KPIs.' },
      { title: 'Creative assets', desc: 'Ad creatives (static + video) ready to upload. Canva or Figma — your call.' }
    ],
    stackTitle: "Tools you'll master",
    stackSubtitle: 'The UI/UX + marketing stack',
    stack: [
      { category: 'Design', skills: ['Figma (primary)', 'FigJam', 'Canva', 'Whimsical or Miro for flows'] },
      { category: 'Marketing', skills: ['Meta Ads Manager', 'Meta Business Suite', 'Google Ads (overview)', 'Mailchimp or Brevo for email'] },
      { category: 'Auxiliary', skills: ['Notion for project tracking', 'Loom for video briefs', 'Google Docs for the campaign plan deliverable'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–4 · Design foundations',
        skills: ['Design thinking: research, define, ideate, prototype, test', 'Figma essentials: frames, components, auto-layout, variants, design tokens', 'Design systems: creating and maintaining reusable component libraries', 'User research: conducting interviews, creating personas, journey mapping'],
        milestone: 'A clickable mid-fidelity prototype tested with 3 real users'
      },
      {
        title: 'Weeks 5–8 · Advanced UI/UX',
        skills: ['High-fidelity visual design: typography, color systems, micro-interactions', 'Responsive design for web, tablet, and mobile breakpoints', 'Information architecture and navigation pattern design', 'Accessibility (WCAG AA) compliance in Figma'],
        milestone: 'A complete high-fidelity interactive prototype ready for development handoff'
      },
      {
        title: 'Weeks 9–11 · Digital Marketing & Meta Ads',
        skills: ['Marketing funnel architecture: Top of Funnel (TOFU) to Bottom of Funnel (BOFU)', 'Meta Ads Manager: Campaign structure, pixel tracking, custom audiences, lookalikes', 'Ad creative strategy: Hooks, body copy, CTA frameworks, A/B testing variations', 'Google Performance Max & Search ads setup fundamentals'],
        milestone: 'A 4-week structured paid advertising campaign plan with creatives'
      },
      {
        title: 'Weeks 12–14 · Conversion Optimization & Pitch',
        skills: ['Conversion Rate Optimization (CRO): Landing page audit frameworks', 'Email marketing sequences: Welcome flows, abandoned cart, lead nurture', 'Building your client pitch deck and service proposal templates', 'Portfolio presentation and client negotiation strategies'],
        milestone: 'Complete design case study + marketing proposal portfolio piece'
      }
    ],
    howFormat: '1-to-1: Pace set by you, 2-4 sessions/week, weekly review of designs and ad copy. Small batch: Max 6 students per cohort.',
    howSchedule: 'Sessions in PKT. Weekday evenings and weekends available.',
    fitFor: [
      'Anyone wanting to build visual and growth skills in parallel',
      'Graphic designers looking to level up into UI/UX product design',
      'E-commerce brand owners wanting to design and run their own ad funnels',
      'Freelancers who want to charge higher rates for full-stack design + marketing packages'
    ],
    notFitFor: [
      'You only want to study graphic art theory without marketing numbers',
      'You are looking for passive video lecture watching',
      'You cannot commit 8-12 hours per week for 14 weeks'
    ],
    faqs: [
      { q: 'Do I need prior drawing or design experience?', a: 'No. Modern UI/UX uses structured design systems, component libraries, and user research methodologies.' },
      { q: 'Will I run real paid ads?', a: 'You will build real campaign structures in Meta Ads Manager. If you choose to work with a local business, you can deploy the ads with their budget.' },
      { q: 'What is the tuition fee?', a: 'PKR 6,000 / month across the 14-week program with no hidden extra charges.' }
    ]
  },
  'advance-excel': {
    id: 'advance-excel',
    title: 'Advance Excel & Financial Modeling',
    icon: FileSpreadsheet,
    badge: '150 Live Hours · 14 Weeks',
    tagline: 'Master Dynamic Arrays, Power Query ETL, DAX Data Models & C-Suite Dashboards in Pakistan.',
    intro: 'A 150-hour hands-on program for students, finance graduates, and business operators who want to build industrial spreadsheet engines. Move beyond basic lookup formulas into automated Power Query ETL pipelines, multi-table Power Pivot DAX models, interactive executive KPI dashboards, and integrated 3-statement financial valuation models.',
    shippedTitle: "What you'll ship",
    shippedIntro: 'An automated Power Query data cleaning pipeline and an interactive executive financial dashboard connected to an integrated 3-statement valuation model.',
    shippedItems: [
      { title: 'Integrated 3-Statement Model', desc: 'Linked Income Statement, Balance Sheet, and Cash Flow with dynamic scenario toggles.', badge: 'Production Model' },
      { title: 'Power Query ETL Pipeline', desc: 'One-click multi-branch automated sales and expense data transformation system.' },
      { title: 'Executive KPI Dashboard', desc: 'Custom DAX measures, dynamic slicers, sparklines, and C-Suite summary cards.' },
      { title: 'Upwork Financial Consultant Kit', desc: 'Templates, audit checklists, and client proposal scripts.' }
    ],
    stackTitle: "Tools you'll master",
    stackSubtitle: 'The modern business analytics stack',
    stack: [
      { category: 'Core Excel', skills: ['Dynamic Arrays (XLOOKUP, FILTER, LET, LAMBDA)', 'INDEX/MATCH', 'Nested Conditionals', 'Data Validation'] },
      { category: 'Data Automation', skills: ['Power Query ETL', 'M-Code Parameters', 'Multi-Source Appending & Merging', 'Automated Refresh'] },
      { category: 'Data Modeling & DAX', skills: ['Power Pivot', 'Star Schema Relationships', 'DAX Measures (CALCULATE, RELATED, Time Intelligence)'] },
      { category: 'Financial Valuation', skills: ['3-Statement Modeling', 'DCF Valuation', 'Sensitivity & Scenario Tables', 'WACC Analysis'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–2 · Advanced Formula Architecture',
        skills: ['Dynamic Arrays: XLOOKUP, FILTER, UNIQUE, SORT, SEQUENCE', 'LET and LAMBDA custom functions', 'Two-way lookups with INDEX & MATCH', 'Error handling & formula auditing'],
        milestone: 'Dynamic multi-criteria search and filter spreadsheet engine'
      },
      {
        title: 'Weeks 3–5 · Power Query ETL Automation',
        skills: ['Connecting to sheets, CSVs, SQL databases, and web folders', 'Unpivoting, splitting, merging queries, appending tables', 'Conditional columns, custom date dimension tables, and M-Code basics', 'Setting up one-click automated refresh pipelines'],
        milestone: 'Automated multi-branch sales & inventory consolidation pipeline'
      },
      {
        title: 'Weeks 6–8 · Power Pivot & DAX Measures',
        skills: ['Relational Data Modeling & Star Schema design (1-to-many)', 'DAX formulas: CALCULATE, ALL, FILTER, RELATEDTABLE', 'Time intelligence measures: YTD, MTD, SAMEPERIODLASTYEAR', 'Handling 1,000,000+ row datasets smoothly'],
        milestone: 'Enterprise multi-table data model with custom DAX KPIs'
      },
      {
        title: 'Weeks 9–11 · Interactive Executive Dashboards',
        skills: ['Pivot Tables & Pivot Charts with multi-slicer synchronization', 'Executive layout design, color hierarchy, dynamic KPI cards', 'Dynamic chart switching using form controls and named ranges', 'Workbook security and professional PDF reporting'],
        milestone: 'Interactive C-Suite financial and operations KPI dashboard'
      },
      {
        title: 'Weeks 12–14 · Financial Modeling & VBA Automation',
        skills: ['Building integrated 3-Statement Financial Models (P&L, Balance Sheet, Cash Flow)', 'Discounted Cash Flow (DCF) valuation and sensitivity analysis', 'Introduction to VBA macros for repetitive report automation', 'Client presentation and Upwork proposal frameworks'],
        milestone: 'Integrated financial valuation model + portfolio case study'
      }
    ],
    howFormat: '1-to-1 screen-by-screen code and spreadsheet review. Max 6 students per cohort.',
    howSchedule: 'Flexible weekday evening (7-9 PM / 8-12 AM PKT) and weekend batches.',
    fitFor: [
      'B.Com, BBA, MBA, ACCA students and finance graduates',
      'Business analysts, accountants, and corporate operations managers',
      'Freelancers who want to offer high-paying Excel automation services on Upwork ($30–$80/hr)',
      'Anyone tired of slow, manual spreadsheet copy-pasting'
    ],
    notFitFor: [
      'You only want to type simple SUM and AVERAGE formulas',
      'You are not willing to practice with real corporate datasets',
      'You cannot commit 8-12 hours per week for 14 weeks'
    ],
    faqs: [
      { q: 'What version of Excel is required?', a: 'Microsoft 365 or Excel 2021+ is recommended to take full advantage of Dynamic Arrays and Power Query.' },
      { q: 'Do I need prior accounting knowledge?', a: 'No, we explain accounting and financial modeling concepts clearly from first principles.' },
      { q: 'What is the tuition fee?', a: 'PKR 6,000 / month across the 14-week duration (payable via JazzCash Business / Zindigi Raast 03322137898).' }
    ],
    careerPaths: {
      title: 'Career & Freelancing Paths for Advance Excel Graduates',
      subtitle: 'High-demand corporate and remote consulting roles',
      paths: [
        { title: 'Financial Analyst / Modeler', desc: 'Build corporate budgets, valuation models, and forecasts for mid to large enterprises. PKR 80,000–200,000/month.' },
        { title: 'BI & Excel Automation Consultant', desc: 'Automate legacy manual reporting pipelines for US/UK/Gulf clients on Upwork at $35–$80/hour.' },
        { title: 'Operations & Business Analyst', desc: 'Create executive KPI dashboards and supply chain trackers for local corporate houses.' }
      ]
    }
  },
  'computerized-accounting': {
    id: 'computerized-accounting',
    title: 'Computerized Accounting (QuickBooks, Xero, Tally)',
    icon: Calculator,
    badge: '150 Live Hours · 14 Weeks',
    tagline: 'Master QuickBooks Online, Xero, Tally Prime & Zoho Books with Real Corporate Ledgers.',
    intro: 'A 150-hour hands-on program for aspiring accountants, commerce students, and freelance bookkeepers. Learn how to configure Chart of Accounts, manage Accounts Payable and Receivable, perform zero-difference automated bank reconciliations, ensure tax compliance (FBR / Sales Tax), and generate audited Profit & Loss statements and Balance Sheets.',
    shippedTitle: "What you'll ship",
    shippedIntro: 'A fully audited multi-company accounting file in QuickBooks Online and Xero with reconciled bank statements, payroll schedules, and complete financial reports.',
    shippedItems: [
      { title: 'QuickBooks Online Audit File', desc: 'Complete sales cycle, bill payments, inventory, and reconciled bank feeds.', badge: 'Audited File' },
      { title: 'Xero Cloud Accounting Setup', desc: 'Multi-currency handling, bank rules, Stripe sync, and tracking categories.' },
      { title: 'Audited Financial Statements', desc: 'Formal Profit & Loss, Balance Sheet, and Statement of Cash Flows.' },
      { title: 'Remote Bookkeeper Launch Kit', desc: 'Upwork & Fiverr client intake forms, onboarding templates, and service agreements.' }
    ],
    stackTitle: "Softwares you'll master",
    stackSubtitle: 'The global standard in computerized bookkeeping',
    stack: [
      { category: 'Cloud Accounting', skills: ['QuickBooks Online (QBO)', 'Xero Cloud Accounting', 'Zoho Books'] },
      { category: 'Desktop & Enterprise', skills: ['QuickBooks Desktop', 'Tally Prime', 'ERP Voucher Processing'] },
      { category: 'Compliance & Banking', skills: ['Automated Bank Feeds', 'Bank Reconciliation', 'Sales Tax / VAT Compliance', 'Withholding Tax (WHT)'] },
      { category: 'Financial Reporting', skills: ['Profit & Loss Statements', 'Balance Sheets', 'Cash Flow Forecasts', 'AR/AP Aging Reports'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–2 · Accounting Framework & Chart of Accounts',
        skills: ['Double-entry logic review: Journals, Ledgers, Trial Balance', 'Optimized Chart of Accounts (COA) for Trading, Services & Manufacturing', 'Multi-currency setup, fiscal years, tax IDs, opening balances', 'Internal controls, audit trails, and segregation of duties'],
        milestone: 'Configured Chart of Accounts and company master profile'
      },
      {
        title: 'Weeks 3–6 · QuickBooks Online & Desktop Mastery',
        skills: ['Sales Cycle: Estimates, invoices, sales receipts, customer aging', 'Purchase Cycle: Vendor bills, POs, expenses, payment scheduling', 'Automated Bank Feeds & zero-difference Bank Reconciliation', 'Inventory tracking, credit memos, discounts, and write-offs'],
        milestone: '1-Year commercial ledger audit in QuickBooks Online'
      },
      {
        title: 'Weeks 7–9 · Xero Cloud Accounting',
        skills: ['Xero setup, organization settings, and bank matching algorithms', 'Repeating invoices, Stripe/PayPal payment gateway integrations', 'Fixed asset register tracking with automated depreciation schedules', 'Tracking categories for departmental and project profitability'],
        milestone: 'End-to-end Xero setup for an international remote agency'
      },
      {
        title: 'Weeks 10–11 · Tally Prime & Zoho Books',
        skills: ['Tally Prime voucher entry (Contra, Payment, Receipt, Journal, Sales, Purchase)', 'GST/VAT configuration and statutory report generation', 'Zoho Books cloud ecosystem and client portal workflows', 'Payroll processing: Salary structures, allowances, pay slips'],
        milestone: 'Dual implementation: Tally Prime manufacturing + Zoho Books cloud'
      },
      {
        title: 'Weeks 12–14 · Tax Compliance, Reporting & Remote Freelancing',
        skills: ['Generating P&L, Balance Sheet, and Statement of Cash Flows', 'Sales Tax, Withholding Tax (WHT) reconciliations (FBR/SRB/PRA)', 'Month-end and year-end closing adjustments and accruals', 'Upwork and remote bookkeeping client acquisition strategies ($25–$60/hr)'],
        milestone: 'Audited Financial Statements + Upwork Freelance Proposal Portfolio'
      }
    ],
    howFormat: '1-to-1 ledger inspections and live software screen-sharing. Max 6 students per cohort.',
    howSchedule: 'Flexible weekday evening (7-9 PM / 8-12 AM PKT) and weekend batches.',
    fitFor: [
      'B.Com, BBA, MBA, ACCA, CA, and CMA students',
      'Current bookkeepers wanting to transition to modern cloud software (QBO/Xero)',
      'Freelancers who want to manage bookkeeping for overseas clients on Upwork/Fiverr',
      'Business owners who want complete visibility over their company financials'
    ],
    notFitFor: [
      'You are looking for passive video lectures without real software practice',
      'You do not want to practice actual bank reconciliations and ledger entries',
      'You cannot commit 8-12 hours per week for 14 weeks'
    ],
    faqs: [
      { q: 'Do you provide software access?', a: 'Yes! We guide you on setting up free QuickBooks Online Accountant trial accounts, Xero demo sandbox environments, and desktop software setups.' },
      { q: 'Can I get remote bookkeeping jobs after this?', a: 'Yes! Certified QuickBooks and Xero bookkeepers are among the highest-demand freelance professionals on Upwork, earning $20–$50/hour.' },
      { q: 'What is the tuition fee?', a: 'PKR 6,000 / month across the 14-week duration (payable via JazzCash Business / Zindigi Raast 03322137898).' }
    ],
    careerPaths: {
      title: 'Career & Freelancing Paths for Accounting Graduates',
      subtitle: 'Local and global corporate bookkeeping pathways',
      paths: [
        { title: 'Remote Bookkeeper (US/UK/Gulf)', desc: 'Manage daily reconciliations, AP/AR, and payroll for international clients on Upwork at $20–$50/hour.' },
        { title: 'Corporate Accounts Officer', desc: 'Handle multi-currency accounting, ERP entries, and FBR tax compliance for local firms. PKR 60,000–150,000/month.' },
        { title: 'Cloud Accounting Consultant', desc: 'Help legacy businesses migrate from paper/Excel books to QuickBooks Online and Xero.' }
      ]
    }
  },
  'generative-ai': {
    id: 'generative-ai',
    title: 'Generative AI & Agentic Automation',
    icon: Bot,
    badge: '150 Live Hours · 14 Weeks',
    tagline: 'Architect Autonomous AI Agents, RAG Pipelines & Multi-Modal LLM Apps in Pakistan.',
    intro: 'A 150-hour hands-on engineering program for software developers, builders, and technical professionals. Move beyond casual ChatGPT prompting into architecting enterprise-grade Autonomous Multi-Agent Teams (CrewAI, LangGraph), Retrieval-Augmented Generation (RAG) with Vector Databases (Pinecone/Chroma), and production OpenAI/Gemini API integrations deployed live to the cloud.',
    shippedTitle: "What you'll ship",
    shippedIntro: 'A production-grade AI application featuring a live multi-agent workflow and an enterprise RAG knowledge bot deployed on the cloud with custom domain.',
    shippedItems: [
      { title: 'Live Deployed AI SaaS Web App', desc: 'Full-stack AI app with authentication, streaming responses, and quota management.', badge: 'Production AI' },
      { title: 'Enterprise Document RAG Bot', desc: 'Vector database embeddings, hybrid search, and source citation generator.' },
      { title: 'Autonomous Multi-Agent Crew', desc: 'CrewAI / LangGraph autonomous team that plans, researches, codes, and audits.' },
      { title: 'AI Automation Consultant Portfolio', desc: 'Client proposal frameworks and workflow blueprints for $50–$100/hr Upwork gigs.' }
    ],
    stackTitle: "Tools you'll master",
    stackSubtitle: 'The frontier Artificial Intelligence stack',
    stack: [
      { category: 'Frontier Models & APIs', skills: ['OpenAI API (GPT-4o)', 'Google GenAI SDK (Gemini 1.5)', 'Anthropic Claude 3.5 API', 'Function Calling & Structured Outputs'] },
      { category: 'RAG & Vector Databases', skills: ['Pinecone', 'ChromaDB', 'Text Embeddings', 'Hybrid Search & Re-ranking', 'Chunking Strategies'] },
      { category: 'Agent Frameworks', skills: ['CrewAI', 'LangChain', 'LangGraph', 'LlamaIndex', 'Autonomous Task Loops'] },
      { category: 'Deployment & Tools', skills: ['TypeScript / Python', 'Vercel / Railway Cloud Deployment', 'FastAPI / Node.js', 'Zapier / Make AI Webhooks'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–2 · LLM Architecture & Advanced Prompt Engineering',
        skills: ['Transformers, tokenization, context windows, temperature, and hallucination reduction', 'Chain-of-Thought (CoT), Few-Shot In-Context Learning, Tree-of-Thought, ReAct prompting', 'Deterministic output conditioning: Strict JSON schemas with Zod & Pydantic', 'Token economics, latency reduction, and prompt caching strategies'],
        milestone: 'Multi-stage deterministic prompt engine for content and code generation'
      },
      {
        title: 'Weeks 3–5 · Programmatic API Integration & Tool Calling',
        skills: ['OpenAI API, Google GenAI SDK (Gemini), and Claude APIs in TypeScript/Python', 'Function Calling & Tool Use: Enabling LLMs to query databases and execute APIs', 'Building multi-turn streaming conversational interfaces in Node.js / Python', 'Rate limit management, exponential backoff retries, and API key security'],
        milestone: 'Full-stack conversational AI app with real-time function calling'
      },
      {
        title: 'Weeks 6–9 · Production RAG & Vector Databases',
        skills: ['Embeddings deep dive, cosine similarity, semantic chunking algorithms', 'Vector DBs: Pinecone, ChromaDB, and pgvector relational integration', 'Hybrid search (Keyword + Vector), Cohere re-ranking, and citation generation', 'Evaluating RAG accuracy with Ragas and eliminating hallucinations'],
        milestone: 'Production RAG system: Chat accurately with 500+ page company PDFs'
      },
      {
        title: 'Weeks 10–12 · Autonomous AI Agents & Multi-Agent Teams',
        skills: ['Agentic loops: Planning, reflection, short/long-term memory, and execution', 'Building autonomous agents with LangChain, LangGraph, and CrewAI', 'Multi-Agent collaboration: Specializing personas (Researcher, Writer, Coder, Reviewer)', 'Grounding with Google Search API and autonomous file system tools'],
        milestone: 'Autonomous multi-agent market research and lead generation team'
      },
      {
        title: 'Weeks 13–14 · Cloud Deployment & High-Ticket AI Consulting',
        skills: ['Deploying AI web apps to Vercel/Railway with user authentication and token quotas', 'Building enterprise AI automation workflows (Zapier/Make + AI webhooks)', 'Pitching high-ticket AI automation services to local businesses and Upwork clients ($50–$100/hr)', 'Ethical AI safeguards, privacy compliance, and commercial licensing'],
        milestone: 'Live deployed custom AI SaaS product + portfolio case study'
      }
    ],
    howFormat: '1-to-1 code architecture walkthroughs and live debugging. Max 6 students per cohort.',
    howSchedule: 'Flexible weekday evening (7-9 PM / 8-12 AM PKT) and weekend batches.',
    fitFor: [
      'Software developers, engineers, and CS students wanting to specialize in AI',
      'Product managers and tech founders building AI-native products',
      'Freelancers who want to charge premium rates for AI agent automation ($50–$100/hr)',
      'Anyone passionate about mastering the cutting edge of Generative AI'
    ],
    notFitFor: [
      'You only want to type casual prompts in a ChatGPT window',
      'You are unwilling to write code and debug API schemas',
      'You cannot commit 8-12 hours per week for 14 weeks'
    ],
    faqs: [
      { q: 'Do I need a PhD in AI or machine learning?', a: 'No! This course focuses on applied AI systems engineering—leveraging frontier model APIs, vector databases, and agent frameworks to build real applications.' },
      { q: 'Are API token costs included?', a: 'We teach you cost-caching and efficient token management so your monthly practice costs remain under $3–$5. We also use generous free tiers from Google Gemini and open-source models.' },
      { q: 'What is the tuition fee?', a: 'PKR 6,000 / month across the 14-week duration (payable via JazzCash Business / Zindigi Raast 03322137898).' }
    ],
    careerPaths: {
      title: 'Career & Freelancing Paths for AI Graduates',
      subtitle: 'The fastest-growing segment of the global technology market',
      paths: [
        { title: 'AI Solutions Engineer / Architect', desc: 'Build RAG pipelines, custom LLM integrations, and internal AI tools for tech startups. PKR 120,000–350,000+/month.' },
        { title: 'AI Automation Consultant', desc: 'Build autonomous agent workflows for US/UK/EU enterprises on Upwork at $50–$100+/hour.' },
        { title: 'AI SaaS Founder', desc: 'Launch and monetize specialized AI micro-SaaS tools with custom models and cloud deployment.' }
      ]
    }
  },
  'graphic-design': {
    id: 'graphic-design',
    title: 'Logo & Graphic Designing',
    icon: Palette,
    badge: '150 Live Hours · 14 Weeks',
    tagline: 'Master vector logo design, brand identity systems, and Adobe Suite with 1-to-1 mentorship.',
    intro: 'A rigorous 14-week 1-to-1 program teaching vector precision in Adobe Illustrator, photo manipulation and advertising creatives in Photoshop, and commercial Behance portfolio case studies that attract international clients.',
    shippedTitle: "What you'll ship",
    shippedIntro: 'A complete corporate brand identity package and a live Behance portfolio. You will craft scalable vector marks, brand guidelines, and high-CTR social media ad creatives.',
    shippedItems: [
      { title: '3 Commercial Vector Logos', desc: 'Crafted with precision geometric grids and Golden Ratio alignment.', badge: 'Vector Master' },
      { title: '20-Page Brand Guidelines PDF', desc: 'Complete corporate style guide with typography, color codes, and packaging mockups.' },
      { title: '10 Ad Creatives & Mockups', desc: 'High-converting social media marketing visuals and realistic 3D product mockups.' },
      { title: 'Published Behance Portfolio', desc: 'Polished client-ready case studies optimized for Upwork, Fiverr, and agencies.' }
    ],
    stackTitle: 'The toolchain',
    stackSubtitle: 'Industry-standard vector and raster suites',
    stack: [
      { category: 'Vector Suite', skills: ['Adobe Illustrator', 'Pen Tool Bezier Control', 'Pathfinder', 'Shape Builder', 'Grid Systems'] },
      { category: 'Raster Suite', skills: ['Adobe Photoshop', 'Layer Masks', 'Smart Objects', 'Frequency Separation', 'Mockup Displacement'] },
      { category: 'Color & Print', skills: ['Pantone Color Bridge', 'CMYK vs RGB', 'Pre-Press 300 DPI', 'Bleed & Crop Marks', 'Die-cut Packaging'] },
      { category: 'Commercial Portfolio', skills: ['Behance Case Studies', 'Dribbble Shots', 'Upwork Proposal Crafting', 'Value-Based Pricing'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–2 · Visual Foundations & Grids',
        skills: ['Contrast, hierarchy, balance, whitespace, and color psychology', 'Typography anatomy, font pairing, and kerning rules', 'Adobe Illustrator setup and Pen Tool Bezier curve mechanics'],
        milestone: 'Geometric grid icons and vector precision test'
      },
      {
        title: 'Weeks 3–5 · Logo Architecture & Vector Marks',
        skills: ['7 Logo classifications: Monograms, Wordmarks, Mascot, Abstract, and Emblems', 'Client brief analysis, sketching, and digital vectorization', 'Scalability testing from 16px Favicon to large format billboards'],
        milestone: '3 Complete commercial vector logo presentations'
      },
      {
        title: 'Weeks 6–8 · Corporate Brand Identity Guidelines',
        skills: ['Constructing 20-page brand manuals with clearance zones and forbidden usage', 'Corporate stationery: business cards, letterheads, envelopes with print bleeds', 'Packaging die-lines, label designs, and Pantone color specifications'],
        milestone: '20-Page Corporate Brand Identity Guidelines PDF'
      },
      {
        title: 'Weeks 9–11 · Photoshop Mastery & Marketing Creatives',
        skills: ['Non-destructive editing, advanced layer masking, and smart objects', 'High-end photo retouching, color grading, and hair selection', 'High-CTR social media ad creatives and 3D product mockups'],
        milestone: '10-Piece social media advertising campaign & mockup suite'
      },
      {
        title: 'Weeks 12–14 · Print Production & Behance Portfolio',
        skills: ['Pre-press color separations, 300 DPI exports, and client file organization', 'Publishing interactive Behance case studies with design breakdown', 'Freelance pitching on Upwork/Fiverr with contract and copyright models'],
        milestone: 'Live published Behance portfolio & graduation certification'
      }
    ],
    howFormat: '1-to-1 live screen shares and live vector curve critique. Max 6 students per cohort.',
    howSchedule: 'Flexible weekday evening (7-9 PM / 8-12 AM PKT) and weekend batches.',
    fitFor: [
      'Beginners wanting to break into digital design from scratch',
      'Marketers and content creators wanting to design their own high-converting visuals',
      'Freelancers looking to sell premium brand identity packages ($300–$1,500/project)',
      'Anyone passionate about creative visual communication'
    ],
    notFitFor: [
      'You only want to use drag-and-drop Canva templates without mastering vector fundamentals',
      'You cannot commit 8-12 hours per week for 14 weeks'
    ],
    faqs: [
      { q: 'Do I need drawing skills?', a: 'No! Modern graphic and logo design is based on geometry, vector grids, typography, and optical balance, which we teach step-by-step.' },
      { q: 'What software is covered?', a: 'Adobe Illustrator and Adobe Photoshop, plus Figma and Pantone color matching systems.' },
      { q: 'What is the tuition fee?', a: 'PKR 6,000 / month across the 14-week duration (payable via JazzCash Business / Zindigi Raast 03322137898).' }
    ],
    careerPaths: {
      title: 'Career & Freelancing Paths for Graphic Designers',
      subtitle: 'High demand across local software houses, advertising agencies, and global freelance platforms',
      paths: [
        { title: 'Brand Identity Designer', desc: 'Design comprehensive brand guidelines for tech startups and corporate clients. PKR 90,000–180,000/month.' },
        { title: 'Freelance Logo Specialist', desc: 'Command $300 to $1,500 per brand identity package on Upwork, Fiverr Pro, and 99designs.' },
        { title: 'Creative Marketing Lead', desc: 'Lead visual asset and social ad creative production for high-growth e-commerce brands.' }
      ]
    }
  },
  'office-automation': {
    id: 'office-automation',
    title: 'Office Automation (Word & PowerPoint)',
    icon: FileSpreadsheet,
    badge: '150 Live Hours · 14 Weeks',
    tagline: 'Master advanced Word formatting, automated Mail Merge, and C-Suite PowerPoint pitch decks.',
    intro: 'A 14-week 1-to-1 executive productivity program transforming basic computer operators into high-speed documentation and presentation engineering specialists.',
    shippedTitle: "What you'll ship",
    shippedIntro: 'An enterprise corporate document suite, automated Mail Merge distribution pipeline, and an interactive investor pitch deck with cinematic Morph transitions.',
    shippedItems: [
      { title: '50-Page Enterprise Policy Manual', desc: 'Constructed with custom Heading style hierarchies and dynamic 1-click Table of Contents.', badge: 'Word Master' },
      { title: '1-Click Mail Merge Engine', desc: 'Automated certificate, contract, and personalized invoice generation linked to Excel data.', badge: 'Automation' },
      { title: 'C-Suite Slide Master Template', desc: 'Corporate presentation system with 15 locked layouts and standardized typography.' },
      { title: '25-Slide Morph Pitch Deck', desc: 'Interactive boardroom deck featuring seamless cinematic object morphing and data infographics.' }
    ],
    stackTitle: 'The productivity toolchain',
    stackSubtitle: 'Enterprise Microsoft 365 and presentation tools',
    stack: [
      { category: 'Word Processing', skills: ['Microsoft Word 365', 'Custom Style Hierarchies', 'Multi-Level Numbering', 'Automated TOC & Index', 'Section Breaks'] },
      { category: 'Data & Merge', skills: ['Mail Merge Automation', 'Excel-Word Data Link', 'Form Controls & Field Shading', 'PDF/A Archiving'] },
      { category: 'Presentation Engineering', skills: ['Microsoft PowerPoint 365', 'Slide Master Architecture', 'Cinematic Morph Transitions', 'Data Infographics', 'Interactive Zooms'] },
      { category: 'Collaboration & Security', skills: ['OneDrive Multi-User Editing', 'Track Changes & Comments', 'Password Encryption', 'Document Watermarking'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–2 · Advanced Document Architecture',
        skills: ['Ribbon customization, section breaks, margins, and custom style hierarchies', 'Advanced typography, tab stops with dot leaders, and mixed portrait/landscape layouts'],
        milestone: 'Standardized Corporate Document Template with Custom Styles'
      },
      {
        title: 'Weeks 3–5 · Long Document Engineering & Citations',
        skills: ['Multi-level numbering linked to Heading styles (1.1, 1.1.1)', 'Dynamic Table of Contents (TOC), List of Figures, footnotes, and cross-referencing', 'Academic and corporate citation managers (APA, Harvard, IEEE)'],
        milestone: '50-Page Enterprise Policy Manual with Dynamic Cross-Referencing'
      },
      {
        title: 'Weeks 6–8 · Mail Merge Automation & Forms',
        skills: ['Excel-linked Mail Merge for bulk personalized certificates, invoices, and contracts', 'Interactive form controls: dropdowns, date pickers, and editing restrictions', 'Document comparison, track changes merging, watermarking, and security encryption'],
        milestone: 'Automated 1-Click Mail Merge Certificate & Invoice Engine'
      },
      {
        title: 'Weeks 9–11 · PowerPoint Slide Master Architecture',
        skills: ['Slide Master hierarchy, theme colors, locked placeholders, and slide sorter workflows', 'Cognitive load reduction, 3-second rule, and executive headline writing', 'Converting complex Excel data tables into dynamic native PowerPoint infographics'],
        milestone: 'Corporate Slide Master Template Suite with 15 Layouts'
      },
      {
        title: 'Weeks 12–14 · Cinematic Morph Transitions & Pitch Decks',
        skills: ['Mastering the Morph transition for fluid object movement and 3D rotations', 'Interactive presentation structures: summary zooms, hyperlinked menus, and agenda branching', 'Delivering high-stakes investor pitch decks with Presenter View'],
        milestone: '25-Slide Interactive Investor Pitch Deck with Cinematic Morph'
      }
    ],
    howFormat: '1-to-1 live document inspection and shortcut drill sessions. Max 6 students per cohort.',
    howSchedule: 'Flexible weekday evening (7-9 PM / 8-12 AM PKT) and weekend batches.',
    fitFor: [
      'Executive assistants, office administrators, and document controllers wanting 5x speed',
      'Business analysts, accountants, and consultants delivering high-stakes client reports',
      'Freelancers who want to charge $25–$80 per slide designing pitch decks on Upwork',
      'Anyone who wants complete mastery of corporate documentation standards'
    ],
    notFitFor: [
      'You only want to type simple short letters without learning formatting architecture',
      'You are unwilling to practice keyboard shortcuts and formatting discipline'
    ],
    faqs: [
      { q: 'How does this differ from basic computer training?', a: 'We focus on enterprise-level automation: custom Style hierarchies, automated 100-page Table of Contents, Excel-linked Mail Merge pipelines, Slide Master engineering, and cinematic PowerPoint Morph transitions.' },
      { q: 'Which software is covered?', a: 'The latest Microsoft 365 Apps for Enterprise (Word & PowerPoint), covering both desktop and collaborative cloud workflows.' },
      { q: 'What is the tuition fee?', a: 'PKR 6,000 / month across the 14-week duration (payable via JazzCash Business / Zindigi Raast 03322137898).' }
    ],
    careerPaths: {
      title: 'Career Opportunities in Corporate Administration & Presentation Design',
      subtitle: 'Essential productivity skills required by every enterprise and international startup',
      paths: [
        { title: 'Executive Assistant / Office Manager', desc: 'Produce high-precision executive reports and documentation. PKR 70,000–140,000/month.' },
        { title: 'Freelance Presentation Designer', desc: 'Design investor pitch decks on Upwork and Fiverr at $25 to $80 per slide.' },
        { title: 'Corporate Document Controller', desc: 'Manage enterprise document hierarchies and audit compliance in engineering/finance.' }
      ]
    }
  }
};

export const SyllabusViewerModal: React.FC<SyllabusViewerModalProps> = ({
  isOpen,
  initialTrack,
  onClose,
  onBookClick,
}) => {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>(initialTrack || 'web-dev');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Sync state if initialTrack changes when opening modal
  React.useEffect(() => {
    if (initialTrack && TRACKS[initialTrack]) {
      setActiveTrackId(initialTrack);
    }
  }, [initialTrack, isOpen]);

  if (!isOpen) return null;

  const activeTrack = TRACKS[activeTrackId] || TRACKS['web-dev'];
  const IconComponent = activeTrack.icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-gray-950/80 backdrop-blur-md overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="syllabus-modal-title"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        className="w-full max-w-5xl bg-white shadow-2xl md:rounded-[2rem] flex flex-col overflow-hidden relative"
        style={{ maxHeight: '100dvh', height: '100%' }}
      >
        {/* Top Control Bar with Tabs */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 shadow-sm shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse"></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Curriculum Prospectus</span>
          </div>
          
          {/* Tracker Selection Tabs */}
          <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-150 gap-1 w-full sm:w-auto overflow-x-auto scroller-none max-w-full">
            {(Object.keys(TRACKS) as TrackId[]).map((trackId) => {
              const tr = TRACKS[trackId];
              const IconComp = tr.icon;
              const isActive = activeTrackId === trackId;
              return (
                <button
                  key={trackId}
                  onClick={() => {
                    setActiveTrackId(trackId);
                    setExpandedFaq(null);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'bg-brand-blue text-white shadow-md' 
                      : 'text-gray-650 hover:bg-gray-100 hover:text-brand-blue'
                  }`}
                >
                  <IconComp size={14} className="shrink-0" />
                  <span>{tr.title}</span>
                </button>
              );
            })}
          </div>

          <button 
            type="button"
            onClick={onClose}
            aria-label="Close prospectus panel"
            className="absolute top-4 right-4 sm:static p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scroll Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 space-y-12">
          {/* Headline block */}
          <div className="space-y-4">
            <span className="text-xs font-extrabold text-brand-blue bg-brand-blue/5 px-3.5 py-1.5 rounded-full border border-brand-blue/10 uppercase tracking-widest">
              {activeTrack.badge}
            </span>
            <h1 id="syllabus-modal-title" className="text-3xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.15]">
              {activeTrack.title}
            </h1>
            <p className="text-lg md:text-xl font-bold text-gray-800 leading-snug">
              {activeTrack.tagline}
            </p>
            <p className="text-gray-650 text-sm md:text-base leading-relaxed max-w-4xl">
              {activeTrack.intro}
            </p>

            {/* Quick CTA panel */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  setTimeout(() => {
                    const el = document.getElementById('booking');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else if (onBookClick) {
                      onBookClick();
                    }
                  }, 200);
                }}
                className="px-6 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue/95 transition-all text-center shadow-lg"
              >
                Book a free clarity call
              </a>
              <a 
                href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(`Hi, I want to know more about Mentor Arena - ${activeTrack.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare size={14} /> WhatsApp us
              </a>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: What You'll Ship */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-widest inline-block">
                Shipped Outcome
              </span>
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">{activeTrack.shippedTitle}</h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">{activeTrack.shippedIntro}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {activeTrack.shippedItems.map((item, idx) => (
                <div key={idx} className="p-6 bg-gray-50 border border-gray-150 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-extrabold text-gray-950 text-sm">{item.title}</h3>
                      {item.badge && (
                        <span className="text-[9px] font-bold text-brand-green bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-650 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: The Stack */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                Curriculum Core
              </span>
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">{activeTrack.stackTitle}</h2>
              <p className="text-gray-500 text-sm">{activeTrack.stackSubtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activeTrack.stack.map((item, idx) => (
                <div key={idx} className="p-5 bg-white border border-gray-150 rounded-2xl space-y-3 shadow-sm">
                  <h3 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider text-brand-blue">
                    {item.category}
                  </h3>
                  <ul className="space-y-1.5">
                    {item.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-xs text-gray-650 flex items-start gap-2">
                        <span className="text-brand-green font-bold shrink-0">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Week by Week */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                Timeline
              </span>
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Week-by-week structure</h2>
              <p className="text-gray-500 text-sm">How the 14-week curriculum is paced</p>
            </div>

            <div className="space-y-4">
              {activeTrack.weeks.map((week, idx) => (
                <div key={idx} className="p-6 bg-gray-50/70 border border-gray-150 rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-3">
                    <h3 className="font-extrabold text-gray-950 text-base">{week.title}</h3>
                    <div className="flex items-center gap-1.5 text-brand-green text-xs font-bold">
                      <Award size={14} />
                      <span>Milestone: {week.milestone}</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {week.skills.map((s, sIdx) => (
                      <div key={sIdx} className="text-xs text-gray-700 flex items-start gap-2">
                        <Check size={14} className="text-brand-blue shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: How It Works & Schedule */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-brand-blue font-extrabold text-sm uppercase tracking-wider">
                <Users size={16} />
                <span>Format Options</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{activeTrack.howFormat}</p>
            </div>

            <div className="p-6 bg-brand-green/5 border border-brand-green/10 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-brand-green font-extrabold text-sm uppercase tracking-wider">
                <Clock size={16} />
                <span>Schedule &amp; Availability</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{activeTrack.howSchedule}</p>
            </div>
          </div>

          {/* Section: Who It's For / Not For */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                Fit Assessment
              </span>
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Is this program right for you?</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Great Fit */}
              <div className="p-6 bg-emerald-50/40 border border-emerald-100 rounded-[2rem] space-y-4">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm uppercase tracking-wider">
                  <CheckCircle size={18} className="text-emerald-700 shrink-0" />
                  <span>Great fit if you are</span>
                </div>
                <ul className="space-y-3">
                  {activeTrack.fitFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not a Fit */}
              <div className="p-6 bg-rose-50/40 border border-rose-100 rounded-[2rem] space-y-4">
                <div className="flex items-center gap-2 text-rose-950 font-bold text-sm uppercase tracking-wider">
                  <span className="w-4.5 h-4.5 bg-rose-200/50 text-rose-700 rounded-full flex items-center justify-center font-bold text-[10px] select-none shrink-0 border border-rose-200">✗</span>
                  <span>Not a fit if</span>
                </div>
                <ul className="space-y-3">
                  {activeTrack.notFitFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed">
                      <span className="text-rose-700 font-bold shrink-0">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Career paths */}
          {activeTrack.careerPaths && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                  Career Acceleration
                </span>
                <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">{activeTrack.careerPaths.title}</h2>
                <p className="text-gray-500 text-sm">{activeTrack.careerPaths.subtitle}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {activeTrack.careerPaths.paths.map((p, pIdx) => (
                  <div key={pIdx} className="p-5 bg-white border border-gray-150 rounded-2xl shadow-sm flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/5 text-brand-blue text-xs font-black flex items-center justify-center shrink-0 border border-brand-blue/10">
                      0{pIdx + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-gray-900 text-sm">{p.title}</h4>
                      <p className="text-gray-650 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {activeTrack.careerPaths.disclaimer && (
                <p className="text-[10px] text-gray-500 leading-relaxed italic border-l-2 border-brand-green/30 pl-3">
                  {activeTrack.careerPaths.disclaimer}
                </p>
              )}
            </div>
          )}

          {/* Section: Accordion FAQ */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle size={20} className="text-brand-blue" />
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">FAQ Answers</h2>
            </div>

            <div className="space-y-3">
              {activeTrack.faqs.map((faq, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <div key={idx} className="border border-gray-150 rounded-xl bg-white overflow-hidden transition-all duration-200">
                    <button 
                      type="button"
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-gray-900 hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                    >
                      <span>{faq.q}</span>
                      <ChevronRight size={16} className={`text-gray-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 text-xs text-gray-650 leading-relaxed border-t border-gray-100/50 bg-gray-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Closing call-to-action */}
          <div className="text-center space-y-4 max-w-2xl mx-auto py-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-950">
              Ready to master {activeTrack.title}?
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Book a free 15-minute diagnostic clarity call with Fazal Shahid Latif. We will tell you honestly whether the program is a fit, discuss batch schedule options, and outline your customized roadmap.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-3">
              <button 
                type="button"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.getElementById('booking');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else if (onBookClick) {
                      onBookClick();
                    }
                  }, 200);
                }}
                className="px-6 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue/95 transition-all text-center shadow-md cursor-pointer"
              >
                Book a clarity call
              </button>
              <a 
                href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(`Hi, I want to know more about Mentor Arena - ${activeTrack.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare size={14} /> WhatsApp us
              </a>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Contact Status bar */}
        <div className="sticky bottom-0 bg-gray-900 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-gray-800 z-20 shrink-0 text-[10px] md:text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Fazal Shahid Latif · support@mentorarena.online · +92 332 2137898</span>
          </div>
          <div className="text-gray-400">
            © 2026 Mentor Arena · Karachi, Pakistan · Mon–Sat 10:00–20:00 PKT
          </div>
        </div>
      </motion.div>
    </div>
  );
};
