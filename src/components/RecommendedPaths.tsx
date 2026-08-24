import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Brain, 
  Laptop, 
  Search, 
  Globe, 
  FileSpreadsheet, 
  Calculator, 
  Palette, 
  FileText, 
  GraduationCap, 
  BookOpen, 
  Compass, 
  Award,
  Layers,
  LucideIcon
} from 'lucide-react';

export type TrackKey = 
  | 'web-development'
  | 'generative-ai'
  | 'seo'
  | 'uiux-digital-marketing'
  | 'advance-excel'
  | 'computerized-accounting'
  | 'graphic-design'
  | 'office-automation';

interface CoursePathItem {
  id: TrackKey;
  title: string;
  path: string;
  badge: string;
  reason: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  bgLight: string;
}

const ALL_COURSES: Record<TrackKey, CoursePathItem> = {
  'web-development': {
    id: 'web-development',
    title: 'MERN Stack Web Development',
    path: '/courses/web-development',
    badge: 'Full-Stack Architecture',
    reason: 'Build production React frontends, Node.js REST APIs, and MongoDB cloud databases.',
    desc: 'Turn ideas into scalable, production-ready SaaS applications deployed live on Vercel and cloud platforms.',
    icon: Laptop,
    color: 'text-blue-600',
    borderColor: 'border-blue-200',
    bgLight: 'bg-blue-50/70'
  },
  'generative-ai': {
    id: 'generative-ai',
    title: 'Generative AI & Autonomous Agents',
    path: '/courses/generative-ai',
    badge: 'Frontier AI & RAG Swarms',
    reason: 'Connect LLMs to vector databases, build RAG pipelines, and deploy autonomous multi-agent swarms.',
    desc: 'Move from casual prompt user to AI Systems Architect with LangGraph, CrewAI, Pinecone, and Gemini SDK.',
    icon: Brain,
    color: 'text-purple-600',
    borderColor: 'border-purple-200',
    bgLight: 'bg-purple-50/70'
  },
  'seo': {
    id: 'seo',
    title: 'Advanced Technical SEO & GEO',
    path: '/courses/seo',
    badge: 'Organic Search & SERP #1',
    reason: 'Structure semantic keyword silos, JSON-LD schemas, and Generative Engine Optimization (GEO).',
    desc: 'Dominate organic search results and secure direct citations in ChatGPT, Gemini, and Google AI Overviews.',
    icon: Search,
    color: 'text-amber-600',
    borderColor: 'border-amber-200',
    bgLight: 'bg-amber-50/70'
  },
  'uiux-digital-marketing': {
    id: 'uiux-digital-marketing',
    title: 'UI/UX Design & Growth Marketing',
    path: '/courses/uiux-digital-marketing',
    badge: 'Figma & Conversion Funnels',
    reason: 'Create interactive Figma design systems, auto-layout tokens, and high-converting Meta ad funnels.',
    desc: 'Bridge high-fidelity visual design with user psychology, wireframing, and paid ad acquisition strategy.',
    icon: Globe,
    color: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    bgLight: 'bg-indigo-50/70'
  },
  'advance-excel': {
    id: 'advance-excel',
    title: 'Advance Excel & Financial Modeling',
    path: '/courses/advance-excel',
    badge: 'Power Query & C-Suite DAX',
    reason: 'Master Dynamic Arrays (XLOOKUP, LET), Power Query ETL, and 3-statement valuation models.',
    desc: 'Clean messy data in seconds and build automated executive dashboards for high-paying corporate clients.',
    icon: FileSpreadsheet,
    color: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    bgLight: 'bg-emerald-50/70'
  },
  'computerized-accounting': {
    id: 'computerized-accounting',
    title: 'Computerized Accounting (QuickBooks & Xero)',
    path: '/courses/computerized-accounting',
    badge: 'Corporate Bookkeeping & Tax',
    reason: 'Master QuickBooks Online, Xero, Tally Prime, double-entry bookkeeping, and sales tax compliance.',
    desc: 'Manage global bookkeeping, bank reconciliations, and financial statements for local and international clients.',
    icon: Calculator,
    color: 'text-teal-600',
    borderColor: 'border-teal-200',
    bgLight: 'bg-teal-50/70'
  },
  'graphic-design': {
    id: 'graphic-design',
    title: 'Logo & Graphic Designing',
    path: '/courses/graphic-design',
    badge: 'Vector Branding & Manuals',
    reason: 'Master Illustrator Pen tool vectors, Golden Ratio logos, typography hierarchy, and Photoshop ads.',
    desc: 'Craft comprehensive corporate brand identity manuals, product packaging dielines, and social media sets.',
    icon: Palette,
    color: 'text-rose-600',
    borderColor: 'border-rose-200',
    bgLight: 'bg-rose-50/70'
  },
  'office-automation': {
    id: 'office-automation',
    title: 'Office Automation (Word & PPT 365)',
    path: '/courses/office-automation',
    badge: 'Executive Documents & Decks',
    reason: 'Build automated Word Mail Merges, dynamic tables of contents, and C-Suite PowerPoint Morph decks.',
    desc: 'Master executive document architectures, corporate policy manuals, and high-impact pitch presentations.',
    icon: FileText,
    color: 'text-sky-600',
    borderColor: 'border-sky-200',
    bgLight: 'bg-sky-50/70'
  }
};

// Recommended pathway configurations per current course track
const PATHWAY_CONFIGS: Record<TrackKey, {
  primaryNext: TrackKey;
  primaryRationale: string;
  relatedKeys: TrackKey[];
}> = {
  'web-development': {
    primaryNext: 'generative-ai',
    primaryRationale: 'Empower your MERN web apps with server-side AI integrations, RAG vector retrieval, and autonomous agents to build high-value SaaS products.',
    relatedKeys: ['generative-ai', 'uiux-digital-marketing', 'seo', 'advance-excel']
  },
  'generative-ai': {
    primaryNext: 'web-development',
    primaryRationale: 'Wrap your AI agents, LangGraph workflows, and RAG pipelines into full-stack web applications with authentication and subscription billing.',
    relatedKeys: ['web-development', 'advance-excel', 'uiux-digital-marketing', 'office-automation']
  },
  'seo': {
    primaryNext: 'web-development',
    primaryRationale: 'Implement technical SEO directly at the code level — configure server-side rendering, dynamic canonical tags, and structured JSON-LD schemas.',
    relatedKeys: ['web-development', 'uiux-digital-marketing', 'generative-ai', 'graphic-design']
  },
  'uiux-digital-marketing': {
    primaryNext: 'graphic-design',
    primaryRationale: 'Deepen your visual craft with vector mathematics, custom typography, Golden Ratio logo construction, and comprehensive corporate brand manuals.',
    relatedKeys: ['graphic-design', 'web-development', 'generative-ai', 'seo']
  },
  'advance-excel': {
    primaryNext: 'computerized-accounting',
    primaryRationale: 'Combine financial modeling with hands-on cloud bookkeeping in QuickBooks Online and Xero to offer complete corporate finance solutions.',
    relatedKeys: ['computerized-accounting', 'office-automation', 'generative-ai', 'web-development']
  },
  'computerized-accounting': {
    primaryNext: 'advance-excel',
    primaryRationale: 'Upgrade from standard bookkeeping to advanced Power Query ETL automation, DAX data modeling, and 3-statement financial valuation.',
    relatedKeys: ['advance-excel', 'office-automation', 'web-development', 'generative-ai']
  },
  'graphic-design': {
    primaryNext: 'uiux-digital-marketing',
    primaryRationale: 'Expand your graphic branding skills into digital product design — build interactive mobile prototypes in Figma and launch Meta ad funnels.',
    relatedKeys: ['uiux-digital-marketing', 'office-automation', 'generative-ai', 'web-development']
  },
  'office-automation': {
    primaryNext: 'advance-excel',
    primaryRationale: 'Link your Word Mail Merge pipelines and PowerPoint pitch decks to dynamic Excel databases, Power Query models, and automated KPI charts.',
    relatedKeys: ['advance-excel', 'graphic-design', 'computerized-accounting', 'generative-ai']
  }
};

interface RecommendedPathsProps {
  currentTrack: TrackKey;
  onNavigate?: (path: string) => void;
  onBookCall?: () => void;
}

export const RecommendedPaths: React.FC<RecommendedPathsProps> = ({
  currentTrack,
  onNavigate,
  onBookCall
}) => {
  const config = PATHWAY_CONFIGS[currentTrack] || PATHWAY_CONFIGS['web-development'];
  const primaryCourse = ALL_COURSES[config.primaryNext];
  const PrimaryIcon = primaryCourse.icon;

  const navigateTo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = path;
    }
  };

  return (
    <section 
      id="recommended-paths" 
      className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm space-y-8 scroll-mt-28"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Compass size={14} />
            <span>Career Synergy &amp; Next Milestones</span>
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
          Recommended Learning Pathways
        </h2>
        <p className="text-gray-600 text-sm mt-1 max-w-2xl leading-relaxed">
          In-demand modern professionals stand out by stacking complementary capabilities. Explore recommended next steps and related tracks to amplify your freelancing rates and corporate market value:
        </p>
      </div>

      {/* Featured Next-Horizon Highlight Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-brand-green/20 text-brand-green border border-brand-green/30 rounded-lg uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} />
                <span>Primary Recommended Step</span>
              </span>
              <span className="text-xs text-blue-200 font-semibold">• High Market Synergy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <PrimaryIcon className="text-brand-green shrink-0" size={26} />
              <span>{primaryCourse.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
              {config.primaryRationale}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <button
              onClick={() => navigateTo(primaryCourse.path)}
              className="px-5 py-3 bg-brand-green hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore Course Syllabus</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            {onBookCall && (
              <button
                onClick={onBookCall}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs transition-all border border-white/20 text-center cursor-pointer"
              >
                Book Multi-Track Advisory Call
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Related Tracks */}
      <div className="space-y-4 pt-2">
        <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
          <Layers className="text-brand-blue" size={18} />
          <span>Complementary Skill Programs</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.relatedKeys.map((key) => {
            const course = ALL_COURSES[key];
            if (!course) return null;
            const Icon = course.icon;
            return (
              <div
                key={key}
                onClick={() => navigateTo(course.path)}
                className="p-5 rounded-2xl border border-gray-200 bg-slate-50/50 hover:bg-white hover:border-brand-blue hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${course.bgLight} ${course.borderColor} ${course.color}`}>
                      {course.badge}
                    </span>
                    <Icon size={18} className="text-gray-400 group-hover:text-brand-blue transition-colors" />
                  </div>
                  <h4 className="font-bold text-base text-gray-950 group-hover:text-brand-blue transition-colors flex items-center gap-1.5">
                    <span>{course.title}</span>
                    <ArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {course.reason}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-xs font-bold text-brand-blue gap-1 mt-2">
                  <span>View Program Details</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Audience Portals Cross-Linking */}
      <div className="pt-6 border-t border-gray-200 space-y-4">
        <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
          <GraduationCap className="text-brand-blue" size={20} />
          <span>Tailored Pathways by Audience</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => navigateTo('/audiences/students')}
            className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50/60 hover:border-blue-300 text-left transition-all group cursor-pointer"
          >
            <div className="font-bold text-xs text-gray-950 group-hover:text-brand-blue flex items-center justify-between">
              <span>For College Students</span>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-brand-blue" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Acquire job-ready technical skills and land remote freelance contracts before graduation.</p>
          </button>

          <button
            onClick={() => navigateTo('/audiences/parents')}
            className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50/60 hover:border-blue-300 text-left transition-all group cursor-pointer"
          >
            <div className="font-bold text-xs text-gray-950 group-hover:text-brand-blue flex items-center justify-between">
              <span>For Concerned Parents</span>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-brand-blue" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">100% verified 1-to-1 mentorship with transparent weekly milestone progress updates.</p>
          </button>

          <button
            onClick={() => navigateTo('/audiences/employers')}
            className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50/60 hover:border-blue-300 text-left transition-all group cursor-pointer"
          >
            <div className="font-bold text-xs text-gray-950 group-hover:text-brand-blue flex items-center justify-between">
              <span>For Tech Employers</span>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-brand-blue" />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Hire thoroughly vetted software developers, SEO auditors, and data specialists.</p>
          </button>
        </div>
      </div>

      {/* Free Knowledge Base & Freelance Guides */}
      <div className="pt-6 border-t border-gray-200 space-y-4">
        <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
          <BookOpen className="text-brand-blue" size={20} />
          <span>Freelance Career Guides &amp; Remittance Playbooks</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => navigateTo('/blog/receiving-foreign-remittances-pakistan-alternatives-paypal')}
            className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50/60 hover:border-blue-300 text-left transition-all group cursor-pointer"
          >
            <div className="font-bold text-gray-900 group-hover:text-brand-blue">Receiving Foreign Client Payments in Pakistan</div>
            <div className="text-[11px] text-gray-500 mt-0.5">How to withdraw Upwork and international client fees via Payoneer, Wise &amp; Raast.</div>
          </button>

          <button
            onClick={() => navigateTo('/blog/remote-react-developer-job-lahore-karachi')}
            className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50/60 hover:border-blue-300 text-left transition-all group cursor-pointer"
          >
            <div className="font-bold text-gray-900 group-hover:text-brand-blue">Landing High-Paying Remote Tech Jobs</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Portfolio frameworks to secure $1,500+ monthly remote developer contracts.</div>
          </button>
        </div>
      </div>

      {/* Footer Navigation Cluster */}
      <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-gray-600">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button onClick={() => navigateTo('/about')} className="hover:text-brand-blue transition-colors cursor-pointer">About Lead Mentor</button>
          <span>·</span>
          <button onClick={() => navigateTo('/pricing')} className="hover:text-brand-blue transition-colors cursor-pointer">All Tuition Plans</button>
          <span>·</span>
          <button onClick={() => navigateTo('/reviews')} className="hover:text-brand-blue transition-colors cursor-pointer">Student Reviews</button>
          <span>·</span>
          <button onClick={() => navigateTo('/faq')} className="hover:text-brand-blue transition-colors cursor-pointer">General FAQs</button>
          <span>·</span>
          <button onClick={() => navigateTo('/contact')} className="hover:text-brand-blue transition-colors cursor-pointer">Contact Admissions</button>
        </div>
      </div>
    </section>
  );
};
