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
  DollarSign
} from 'lucide-react';

interface SyllabusViewerModalProps {
  isOpen: boolean;
  initialTrack: 'web-dev' | 'seo' | 'uiux';
  onClose: () => void;
}

type TrackConfig = {
  id: 'web-dev' | 'seo' | 'uiux';
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

const TRACKS: Record<'web-dev' | 'seo' | 'uiux', TrackConfig> = {
  'web-dev': {
    id: 'web-dev',
    title: 'Full-Stack Web Development',
    icon: Terminal,
    badge: '150 Live Hours · 16 Weeks',
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
        title: 'Weeks 1–4 · Foundations',
        skills: ['HTML, CSS, modern JavaScript, the browser dev tools', 'Git & GitHub basics: commit, branch, pull request', 'React fundamentals: components, props, state, hooks', 'Tailwind CSS for fast, responsive UI'],
        milestone: 'A static multi-page React site deployed on Vercel'
      },
      {
        title: 'Weeks 5–8 · Backend & Data',
        skills: ['Node.js and Express.js: routes, middleware, REST APIs', 'MongoDB and Mongoose: modeling, queries, indexes', 'Authentication: signup, login, sessions, JWT', 'Connecting frontend to backend: fetch, async, error handling'],
        milestone: 'A full-stack CRUD app deployed with auth'
      },
      {
        title: 'Weeks 9–12 · Your Real Project',
        skills: ['Project scoping: pick a problem, define MVP, draft user stories', 'Build the core features, weekly mentor review of your code', 'Polish: accessibility, error states, mobile responsiveness', 'Deploy with custom domain, set up analytics, write README'],
        milestone: 'Working deployed v1 of your chosen project'
      },
      {
        title: 'Weeks 13–16 · Ship & Showcase',
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
      'You can\'t commit 8-12 hours/week for 16 weeks',
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
    intro: "Pakistan's digital economy is growing fast, and skilled SEOs are in short supply. In this 150-hour live program, you pick a real local business — a Karachi restaurant, a Lahore clinic, a Pakistani e-commerce store — and ship a documented before-and-after SEO audit. Awais Ghani (Lahore, SEO specialist, 5+ years in international SEO) joins as guest mentor.",
    shippedTitle: "What you'll ship",
    shippedIntro: 'A documented SEO case study on a real business. You will select a real local business website (with the owner\'s consent), run a full audit, implement improvements, and document the before-and-after in a public case study. By the end of the program, you have a portfolio piece that shows measurable ranking and traffic improvements — the kind of artifact an SEO agency or in-house team will actually respect.',
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
      { q: 'Will I work on a real site?', a: 'Yes! We strongly recommend and help you pick a real local business website (with the owner\'s consent) so you apply all tools in a production environment, not a simulated sandbox.' }
    ],
    careerPaths: {
      title: 'Where SEO students in Pakistan go',
      subtitle: 'Where SEO students in Pakistan go after building professional experience',
      paths: [
        { title: 'In-house SEO', desc: 'Karachi and Lahore companies (especially in e-commerce, real estate, and SaaS) hire full-time SEO specialists at PKR 80,000–250,000/month.' },
        { title: 'Agency work', desc: 'Local agencies (and international ones hiring remote from Pakistan) take on SEOs at PKR 100,000–300,000+/month for mid-level work.' },
        { title: 'Freelance international', desc: 'Upwork, Fiverr Pro, direct clients in the US/UK/AU. Senior freelancers in Pakistan charge USD 1,500–5,000/month per client.' },
        { title: 'Founding your own agency', desc: 'Several Mentor Arena graduates now run small SEO agencies in Karachi and Lahore serving local restaurants, clinics, and e-commerce brands.' }
      ],
      disclaimer: 'Salary ranges are based on 2026 Pakistani market data from Rozee.pk, Mustakbil.com, and recent alumni placements. We do not guarantee specific outcomes.'
    }
  },
  'uiux': {
    id: 'uiux',
    title: 'UI/UX Design & Digital Marketing',
    icon: Target,
    badge: '150 Live Hours · 16 Weeks',
    tagline: 'Design high-converting Figma interfaces and run live Meta Ad campaigns — designed for founders & creators.',
    intro: 'A 150-hour live, project-based program. Design interactive wireframes, build high-fidelity Figma layouts, write high-converting copy, and configure real ad campaigns on Facebook, Instagram, and Google. Ship custom digital assets ready to capture real customers.',
    shippedTitle: "What you'll ship",
    shippedIntro: 'An interactive high-fidelity Figma application prototype paired with a complete Meta Ads campaign framework. You will identify an innovative startup idea, design its user interface, create stunning marketing graphics, and construct the actual funnel ready to receive real budgets.',
    shippedItems: [
      { title: 'Interactive Figma Prototype', desc: 'A mobile-responsive application or landing design fully linked with transitions and micro-animations.', badge: 'Figma System' },
      { title: 'Brand Style Guide', desc: 'A complete custom design system: color schemes, typography guides, customized component libraries, and assets.' },
      { title: 'Meta / Google Ad Funnels', desc: 'Draft campaigns, targeted audiences, custom pixel structures, and tested ad copy.' },
      { title: 'High-Converting Copy Blueprint', desc: 'A landing page mockup written according to psychological conversion frameworks to maximize signups.' }
    ],
    stackTitle: 'The professional toolset',
    stackSubtitle: 'Modern creative software you will master',
    stack: [
      { category: 'Designing Interface', skills: ['Figma (Auto-layout, custom component variants, prototyping)', 'FigJam', 'Wireframe systems'] },
      { category: 'Creative Graphic Assets', skills: ['Canva Pro workflows', 'AI vector generation', 'Creative asset optimization for mobile'] },
      { category: 'Advertising Tech', skills: ['Meta Ads Manager (Facebook, Instagram)', 'Google Ads portal', 'Conversion pixel configuration'] },
      { category: 'Copywriting Frameworks', skills: ['AIDA formula copywriting', 'High-converting title formulas', 'Hooks & call-to-actions'] },
      { category: 'Micro Video Ads', skills: ['CapCut editor', 'Short-form video layout structures', 'Reels & Stories ad template designs'] },
      { category: 'Behavioral Analytics', skills: ['Hotjar visual heatmaps setup', 'A/B testing basics', 'Google Analytics page events'] }
    ],
    weeks: [
      {
        title: 'Weeks 1–4 · UX Research & UI Foundations',
        skills: ['User persona development, empathy maps, UX flows', 'Figma layout grids, visual hierarchy, typography systems', 'Figma components, variants, and Auto-Layout rules', 'Creating low-fidelity layout wireframes'],
        milestone: 'A low-fidelity user flow wireframe and verified style guide'
      },
      {
        title: 'Weeks 5–8 · Interactive High-Fidelity Design',
        skills: ['Responsive design nodes for mobile, desktop, and tablet', 'Figma advanced interaction logic, scroll states, transitions', 'Figma design variables and library assets structuring', 'Basic usability testing protocols'],
        milestone: 'A fully clickable and interactive Figma mobile & desktop prototype'
      },
      {
        title: 'Weeks 9–12 · Copywriting & Funnels',
        skills: ['Copywriting formulas: AIDA, PAS (Pain-Agitate-Solve)', 'Layout design of long-form landing pages that sell', 'Configuring signup flows and checkout screens', 'Creating ad assets using Canva and basic editing in CapCut'],
        milestone: 'Fully custom landing mockup loaded with optimized high-converting copy'
      },
      {
        title: 'Weeks 13–16 · Growth Ads & Launch',
        skills: ['Setting up Meta Business Suite & Pixels', 'Configuring custom audiences, Lookalikes, and demographic filters', 'Configuring Meta conversion campaigns inside Ads Manager', 'Budget mapping, testing CTR, CPC, ROAS analytics'],
        milestone: 'A launched mock campaign with localized ad assets ready to publish'
      }
    ],
    howFormat: '1-to-1: Flexible pacing tailored to your startup concept, personalized design reviews with Fazal Shahid Latif. Small batch: Max 6 students with collaborative design workshops and campaign sharing.',
    howSchedule: 'Sessions scheduled in PKT around student schedules. Evening classes and Saturday mornings. Fully remote or with Karachi-based meetups.',
    fitFor: [
      'Creative individuals looking to start a lucrative styling and social media consultant career',
      'Startup founders and solo-entrepreneurs who want to mock and market their products without agency markup',
      'Product managers or junior designers hoping to learn data-driven ad funnels'
    ],
    notFitFor: [
      'You are looking for mathematical back-end programming (this is 100% design & marketing focused)',
      'You want automated clicks without putting in structural asset and design labor',
      'You want a CS degree'
    ],
    faqs: [
      { q: 'Is there coding in this program?', a: 'No coding is required. This focuses on interactive UI/UX prototyping, layout psychology, and performance marketing. However, we do teach how to prepare clean handoffs for engineers.' },
      { q: 'What software do I need to pay for?', a: 'We use the free version of Figma, which is completely enough for this track. Basic Meta/Google setups are done without requiring a paid ad budget, though setting up a real card is useful.' },
      { q: 'Will this help me market my own business?', a: 'This is the ultimate stack for founders. You learn how to take any raw business vision, build a high-fidelity visual prototype, and then reach customers directly on social networks.' }
    ],
    careerPaths: {
      title: 'Where UI/UX & Digital Marketing grads go',
      subtitle: 'Opportunities inside product design & modern direct ad agencies',
      paths: [
        { title: 'UI/UX Designer', desc: 'Design modern interfaces and landing pages for software agencies or tech teams starting at PKR 70,000–150,000/month.' },
        { title: 'Digital Growth Marketer', desc: 'Manage Facebook, Instagram, and Google ad spend for local brands at PKR 80,000–200,000/month.' },
        { title: 'Creative Entrepreneur', desc: 'Launch and market your own SaaS, e-commerce brand, or service studio without hiring expensive agencies.' }
      ],
      disclaimer: 'Salary estimations based on local tech & digital media recruitment patterns as of 2026.'
    }
  }
};

export const SyllabusViewerModal: React.FC<SyllabusViewerModalProps> = ({ isOpen, initialTrack, onClose }) => {
  const [activeTrackId, setActiveTrackId] = useState<'web-dev' | 'seo' | 'uiux'>(initialTrack);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const activeTrack = TRACKS[activeTrackId];

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex justify-center items-stretch md:items-center md:p-6 overflow-y-auto">
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
            {(Object.keys(TRACKS) as Array<keyof typeof TRACKS>).map((trackId) => {
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
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
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
                  onClose();
                  // Give modal some time to close before scrolling
                  setTimeout(() => {
                    const el = document.getElementById('booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }}
                className="px-6 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue/95 transition-all text-center shadow-lg"
              >
                Book a free clarity call
              </a>
              <a 
                href={`https://wa.me/923322137898?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Mentor%20Arena%20-%20${encodeURIComponent(activeTrack.title)}`}
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
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">{activeTrack.stackTitle}</h2>
              <p className="text-gray-500 text-sm">{activeTrack.stackSubtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTrack.stack.map((group, idx) => (
                <div key={idx} className="p-5 bg-white border border-gray-150 rounded-2xl shadow-sm">
                  <h3 className="font-extrabold text-brand-blue text-xs uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                    {group.category}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.skills.map((skill, skIdx) => (
                      <li key={skIdx} className="flex items-start gap-2 text-xs text-gray-600 leading-tight">
                        <Check size={14} className="text-brand-green shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Curriculum (Typical 16-week arc) */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Curriculum (typical 16-week arc)</h2>
              <p className="text-gray-500 text-sm">Four phases centered purely on production milestones</p>
            </div>

            <div className="space-y-4">
              {activeTrack.weeks.map((week, idx) => (
                <div key={idx} className="border border-gray-150 rounded-2xl hover:border-gray-250 transition-colors bg-white overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="font-extrabold text-gray-950 text-sm sm:text-base">
                      {week.title}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white border border-gray-150 px-2.5 py-1 rounded-md">
                      Phase 0{idx + 1}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {week.skills.map((skillItem, skIdx) => (
                        <li key={skIdx} className="flex items-start gap-2 text-xs text-gray-650 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-2 shrink-0"></span>
                          <span>{skillItem}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Award size={14} className="text-brand-green shrink-0" />
                        <span className="text-xs font-bold text-gray-950">Milestone</span>
                      </div>
                      <span className="text-xs font-bold text-brand-green leading-relaxed">
                        {week.milestone}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: How you'll learn */}
          <div className="grid md:grid-cols-2 gap-8 bg-brand-blue/5 border border-brand-blue/10 p-6 md:p-8 rounded-[2rem]">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">How You'll Learn</span>
              <h3 className="font-extrabold text-gray-950 text-lg sm:text-xl">Live sessions, weekly reviews, no giant Zoom</h3>
              <p className="text-xs text-gray-650 leading-relaxed">
                We believe learning digitally happens best when you can ask questions instantly instead of searching a forum.
              </p>
            </div>
            
            <div className="space-y-4 text-xs font-medium text-gray-700">
              <div className="space-y-1">
                <span className="font-extrabold text-gray-950 block">Format</span>
                <p className="text-gray-650 leading-relaxed">{activeTrack.howFormat}</p>
              </div>
              <div className="space-y-1">
                <span className="font-extrabold text-gray-950 block">Schedule</span>
                <p className="text-gray-650 leading-relaxed">{activeTrack.howSchedule}</p>
              </div>
            </div>
          </div>

          {/* Section: Fit assessment */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Who this is for — and who it isn't</h2>
            
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
              Ready to ship your first {activeTrack.id === 'web-dev' ? 'full-stack app' : activeTrack.id === 'seo' ? 'SEO upgrade' : 'prototype'}?
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Book a free 20-minute clarity call. We will tell you honestly whether the program is a fit, what your first project could be, and what the next 16 weeks will look like.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-3">
              <a 
                href="#booking"
                onClick={(e) => {
                  onClose();
                  setTimeout(() => {
                    const el = document.getElementById('booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }}
                className="px-6 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue/95 transition-all text-center shadow-md"
              >
                Book a clarity call
              </a>
              <a 
                href={`https://wa.me/923322137898?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Mentor%20Arena%20-%20${encodeURIComponent(activeTrack.title)}`}
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
            <span>Fazal Shahid Latif · hello@mentorarena.online · +92 332 2137898</span>
          </div>
          <div className="text-gray-400">
            © 2026 Mentor Arena · Karachi, Pakistan · Mon–Sat 10:00–20:00 PKT
          </div>
        </div>
      </motion.div>
    </div>
  );
};
