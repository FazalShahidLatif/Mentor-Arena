import React from 'react';
import { 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Layout, 
  Code2, 
  Bot, 
  Zap, 
  ShieldCheck, 
  FileText,
  ExternalLink,
  Gift
} from 'lucide-react';

interface ProToolkitSectionProps {
  onOpenSyllabusModal: () => void;
  courseTrackName?: string;
}

export const ProToolkitSection: React.FC<ProToolkitSectionProps> = ({
  onOpenSyllabusModal,
  courseTrackName
}) => {
  const tools = [
    {
      id: 'ahrefs',
      icon: Search,
      name: 'Ahrefs Live Domain & Keyword Reports',
      retailValue: '$200 / month',
      category: 'SEO & Market Intelligence',
      badge: 'Live Data',
      description: 'On-demand backlink profile teardowns, competitor organic keyword gap matrices, and SERP difficulty exports for your live course projects and real freelancing clients.',
      features: [
        'Domain Rating (DR) & Backlink Health Audits',
        'Competitor Keyword Gap Spreadsheets',
        'Live SERP Volatility & Intent Analysis'
      ],
      color: 'from-orange-500/10 to-amber-500/10 border-orange-500/30 text-orange-600'
    },
    {
      id: 'semrush',
      icon: FileText,
      name: 'Semrush Technical Audit Checklists',
      retailValue: '$150 Value',
      category: 'Technical SEO & Client Decks',
      badge: 'Pitch Templates',
      description: 'Battle-tested commercial site audit frameworks, Core Web Vitals remediation spreadsheets, and client-ready technical proposal slide decks used to close $1,500+ deals.',
      features: [
        'Complete 150-Point Technical SEO Audit Checklist',
        'Client Pitch Deck & Retainer Proposal Deck',
        'Crawl Budget & Indexation Fix Playbooks'
      ],
      color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-600'
    },
    {
      id: 'figma',
      icon: Layout,
      name: 'Premium Figma UI/UX Design Kits',
      retailValue: '$300 Value',
      category: 'UI/UX & Product Design',
      badge: '100+ Components',
      description: 'Complete high-fidelity design systems with auto-layout v5, responsive grid structures, dark/light token variables, and conversion-optimized SaaS and e-commerce templates.',
      features: [
        '100+ Production-Ready Figma UI Components',
        'Automated Design Tokens (Typography, Spacing, Radii)',
        'Mobile App & Desktop Responsive Layout Grids'
      ],
      color: 'from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-600'
    },
    {
      id: 'tailwind',
      icon: Code2,
      name: 'Tailwind UI & shadcn Component Suite',
      retailValue: '$400 Value',
      category: 'Full-Stack Frontend Architecture',
      badge: 'Enterprise Blocks',
      description: 'Accessible, production-grade React components, enterprise dashboard layouts, interactive authentication flows, and responsive data tables ready to copy-paste into your apps.',
      features: [
        'Production Enterprise Dashboard & Admin UI',
        'Accessible Radix / shadcn Dialogs, Tables & Forms',
        'Zero-lock-in modular Tailwind CSS code'
      ],
      color: 'from-teal-500/10 to-emerald-500/10 border-teal-500/30 text-teal-600'
    },
    {
      id: 'ai-agents',
      icon: Bot,
      name: 'Enterprise AI Agent & API Sandbox',
      retailValue: '$350 Value',
      category: 'Generative AI & Autonomous Bots',
      badge: 'Claude 3.5 & GPT-4o',
      description: 'Pre-configured prompt engineering notebooks, LangChain & CrewAI multi-agent templates, and API starter repos to automate scraping, SEO content, and business analytics.',
      features: [
        'OpenAI GPT-4o & Claude 3.5 Sonnet Agent Templates',
        'Retrieval-Augmented Generation (RAG) Architecture',
        'Autonomous Web Scraping & Lead Enrichment Scripts'
      ],
      color: 'from-emerald-500/10 to-brand-green/10 border-emerald-500/30 text-emerald-600'
    }
  ];

  return (
    <section className="my-16 bg-gradient-to-b from-slate-950 via-brand-navy to-slate-950 text-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-emerald-500/30 relative overflow-hidden shadow-2xl">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Gift size={14} className="text-emerald-400" />
            <span>Included 100% Free with Enrolled Mentorship</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Bundled "Free Pro SEO & Dev Toolkit"
            <span className="block text-emerald-400 text-xl sm:text-2xl md:text-3xl mt-1">
              Worth $1,400+ (PKR 390,000+) Provided at Zero Added Cost
            </span>
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Traditional institutes and bootcamps force you to buy expensive subscriptions out of pocket. At Mentor Arena, all enrolled students gain direct shared access to enterprise-grade diagnostic tools and templates so you can work like an established agency from day one.
          </p>
        </div>

        {/* 5-Card Toolkit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div 
                key={tool.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-emerald-500/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <Icon size={20} />
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-black text-emerald-300">{tool.retailValue}</span>
                      <span className="block text-[10px] text-slate-400 uppercase tracking-wider">{tool.badge}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase">{tool.category}</span>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                    {tool.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Student Access: Unlocked</span>
                  <span className="text-emerald-400 font-bold">100% Free</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Summary & Direct Syllabus Download Trigger */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-[#0c2438] rounded-2xl p-6 border border-emerald-500/40 flex flex-col justify-between text-white shadow-lg">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full">
                <Sparkles size={12} />
                <span>Instant Syllabus Lead Magnet</span>
              </div>

              <h3 className="text-lg font-black text-white">
                Want the Complete 16-Week Lecture Plan & Toolkit Breakdown?
              </h3>

              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Download the official 2026 comprehensive roadmap PDF with week-by-week lecture milestones, tool access protocols, and 1-to-1 live screen guidelines.
              </p>
            </div>

            <div className="pt-5 space-y-3">
              <button
                onClick={onOpenSyllabusModal}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Download size={15} />
                <span>Download 2026 16-Week Syllabus (PDF)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-300/80">
                <ShieldCheck size={12} />
                <span>Auto-downloads high-resolution A4 document</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Callout with Lead Magnet trigger */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-black text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Ready to inspect the complete 150-hour curriculum?</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">2026 Cohorts</span>
            </h4>
            <p className="text-xs text-slate-300">
              Auto-collect verified WhatsApp and email to receive the direct download link instantly.
            </p>
          </div>

          <button
            onClick={onOpenSyllabusModal}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-brand-navy font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <Download size={14} className="text-brand-blue" />
            <span>Download 2026 Comprehensive 16-Week Roadmap &amp; Lecture Plan (PDF)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
