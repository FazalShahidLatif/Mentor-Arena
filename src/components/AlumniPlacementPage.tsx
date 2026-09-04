import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  ExternalLink, 
  Code, 
  Search, 
  Laptop, 
  Zap, 
  MessageSquare, 
  Calendar, 
  Check, 
  Award,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface AlumniPlacementPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  onNavigate: (path: string) => void;
  selectedCity?: 'all' | 'karachi' | 'lahore' | 'islamabad';
  onOpenSyllabusMagnet?: (trackName?: string) => void;
}

export const AlumniPlacementPage: React.FC<AlumniPlacementPageProps> = ({
  onBackToHome,
  onBookCall,
  onNavigate,
  selectedCity = 'all',
  onOpenSyllabusMagnet
}) => {
  const [activeCityTab, setActiveCityTab] = useState<'all' | 'karachi' | 'lahore' | 'islamabad'>('all');
  const [activePortalTab, setActivePortalTab] = useState<'hire' | 'student-roadmap' | 'alumni-stories'>('hire');
  const [partnerForm, setPartnerForm] = useState({
    agencyName: '',
    contactPerson: '',
    email: '',
    whatsapp: '',
    city: 'Karachi',
    roleNeeded: 'Junior Frontend / React Developer',
    openingsCount: '1-2',
    notes: ''
  });
  const [submittedPartner, setSubmittedPartner] = useState(false);

  const cityName = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const placementRoles = [
    {
      title: "Junior Frontend & MERN Developers",
      skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Node.js REST APIs", "Git Commits"],
      salary: "PKR 70,000 – 130,000 / mo",
      readiness: "Day-One Production Ready",
      description: "Graduates who write maintainable component structures, debug state bugs without panic, and deploy directly to Vercel and VPS cloud servers.",
      icon: Code,
      color: "blue"
    },
    {
      title: "Technical SEO & GEO Analysts",
      skills: ["Core Web Vitals", "JSON-LD Schema", "Programmatic SEO", "Ahrefs & SEMrush", "GSC Audits", "Python Scraping"],
      salary: "PKR 65,000 – 120,000 / mo",
      readiness: "Zero Slide Theory, Real SERP Wins",
      description: "Trained to diagnose real ranking drops, optimize slow TTFB/LCP on Pakistani eCommerce stores, and structure content for Google AI Overviews and ChatGPT search.",
      icon: Search,
      color: "emerald"
    },
    {
      title: "UI/UX & Product Designers",
      skills: ["Figma Design Systems", "Auto-Layout", "Interactive Prototypes", "Wireframing", "Conversion Architecture"],
      salary: "PKR 60,000 – 110,000 / mo",
      readiness: "Complete Client Portfolio",
      description: "Designers who understand mobile-first ergonomics, design-to-code handoffs, and micro-interactions that software engineers love to build.",
      icon: Laptop,
      color: "purple"
    },
    {
      title: "Financial & Operations Analysts",
      skills: ["Advance Excel", "Power Query", "Dynamic Dashboards", "Financial Modeling", "Quickbooks & Xero"],
      salary: "PKR 55,000 – 95,000 / mo",
      readiness: "Automated Enterprise Workflows",
      description: "Analysts capable of cleaning 100,000+ messy transaction rows in seconds, building automated P&L dashboards, and running financial forecasting models.",
      icon: TrendingUp,
      color: "amber"
    }
  ];

  const cityEcosystems = [
    {
      city: "Karachi",
      badge: "Commercial & Fintech Capital",
      corridors: "Shahrah-e-Faisal Tech Strip, Clifton, I.I. Chundrigar Road, Korangi Creek",
      description: "Pakistan's financial and eCommerce headquarters. High demand for MERN full-stack engineers, technical SEOs for international retail stores, and financial modeling specialists.",
      partnerTypes: ["Fintech SaaS Startups", "eCommerce Aggregators & Retailers", "Export & Logistics Software Houses", "Digital Performance Agencies"],
      avgHiringTime: "5–10 Business Days"
    },
    {
      city: "Lahore",
      badge: "Software Engineering & Agency Valley",
      corridors: "Arfa Software Technology Park, Gulberg IT District, DHA Phase 5, Johar Town",
      description: "The software outsourcing power-hub of Pakistan. Agencies seeking reliable frontend coders and programmatic SEO analysts for US/UK/Gulf clients.",
      partnerTypes: ["Enterprise Custom Software Houses", "US/UK Outsource Agencies", "Shopify & WordPress Growth Agencies", "Mobile App Studios"],
      avgHiringTime: "4–8 Business Days"
    },
    {
      city: "Islamabad & Rawalpindi",
      badge: "Enterprise, Telecom & Global IT Hub",
      corridors: "Blue Area, I-9 Tech & Industrial Sector, G-7 Software Corridor",
      description: "Hub for enterprise cloud software, international development agencies, and telecom tech teams requiring strict code quality and API integrations.",
      partnerTypes: ["International Consultancy Hubs", "Government & NGO Tech Implementers", "Remote Overseas Agency Teams", "Cloud Infrastructure Firms"],
      avgHiringTime: "7–12 Business Days"
    },
    {
      city: "Global Remote",
      badge: "US, UK & UAE Remote Accounts",
      corridors: "Direct US/UK Dollar Freelance & Full-time Remote Contracts",
      description: "Overseas founders and marketing directors looking for disciplined Pakistani talent who can work US/UK overlap hours and communicate cleanly in English.",
      partnerTypes: ["US Shopify Stores", "UK SEO & PR Boutiques", "UAE Real Estate Media Teams", "European Tech Startups"],
      avgHiringTime: "Direct Contract Basis"
    }
  ];

  const filteredEcosystems = activeCityTab === 'all' 
    ? cityEcosystems 
    : cityEcosystems.filter(c => c.city.toLowerCase().includes(activeCityTab));

  const studentRoadmapSteps = [
    {
      week: "Weeks 1–10: Production Rigor",
      title: "Building Real Systems Under 1-to-1 Code Scrutiny",
      description: "Zero tutorial copies. Every student authors real Next.js/React repositories, builds schema markup, or constructs financial models under live line-by-line inspection from Fazal."
    },
    {
      week: "Weeks 11–12: GitHub & Portfolio Vetting",
      title: "Packaging Technical Proof of Work",
      description: "We eliminate resume fluff. We audit your Git commit messages, README documentation, live preview URLs, and Core Web Vitals audit reports to impress senior engineering leads."
    },
    {
      week: "Weeks 13–14: Mock Technical Interviews",
      title: "Live Whiteboard & System Architecture Defense",
      description: "Fazal conducts 1-to-1 simulated technical interviews, grilling you on React state lifecycle, SEO canonical logic, or SQL relationships so you enter agency interviews with total confidence."
    },
    {
      week: "Post-Graduation: Direct Agency Referral",
      title: "Warm Introduction to Agency Hiring Partners",
      description: "We connect you directly to software house owners and agency directors in Karachi, Lahore, and Islamabad who bypass generic HR resume black holes."
    }
  ];

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'agency_partner_inquiry',
          ...partnerForm
        })
      });
    } catch (err) {
      console.error('Failed to submit partner lead', err);
    }
    setSubmittedPartner(true);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Top Header Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-gray-500 hover:text-brand-blue transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              &larr; Back to Home
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-xs font-bold text-brand-blue flex items-center gap-1.5">
              <Building2 size={14} className="text-emerald-700" />
              Alumni Agency Placement Network
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePortalTab('hire')}
              className="text-xs font-bold px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Briefcase size={13} />
              <span>Hire Vetted Talent (For Agencies)</span>
            </button>
            <button
              onClick={onBookCall}
              className="text-xs font-bold px-4 py-1.5 rounded-lg bg-brand-blue hover:bg-blue-900 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap size={13} />
              <span>Join Placement Track</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles size={14} className="text-emerald-400" />
              <span>Phase 3: Direct Career Pipeline (Karachi · Lahore · Islamabad)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              Alumni Agency Placement Network
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Connecting 1-to-1 mentored graduates directly with software houses, digital performance agencies, and remote foreign accounts. 
              <span className="text-emerald-400 font-semibold block mt-2">
                The "Zero-Retraining Guarantee": Our graduates have had their code audited line by line by a 30+ year Solutions Architect, meaning zero weeks lost retraining basics.
              </span>
            </p>

            {/* Portal Switcher Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md max-w-fit">
              {[
                { id: 'hire', label: '🏢 For Software Houses & Agencies', badge: 'Hire Talent' },
                { id: 'student-roadmap', label: '🎓 For Students: Placement Roadmap' },
                { id: 'alumni-stories', label: '🌟 Verified Hiring Tracks' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePortalTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activePortalTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* TAB 1: FOR AGENCIES / SOFTWARE HOUSES */}
        {activePortalTab === 'hire' && (
          <div className="space-y-12">
            {/* The Zero-Retraining Guarantee Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-md">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    <ShieldCheck size={16} className="text-emerald-700" />
                    <span>The Agency Advantage</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3">
                    Why Top Pakistani Agencies Hire Mentor Arena Graduates
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Most Pakistani bootcamp graduates copy identical tutorial clones off YouTube and lack basic understanding of Git branches, API error handling, or Core Web Vitals.
                    <br className="hidden sm:block" />
                    Mentor Arena graduates undergo <strong>150 hours of 1-to-1 private screen observation</strong>. They know how to read stack traces, write clean TypeScript types, and ship production-ready code from day one.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 shrink-0 w-full lg:w-80 space-y-3">
                  <div className="text-xs font-bold text-emerald-900 uppercase">Agency Placement Guarantee</div>
                  <div className="space-y-2 text-xs text-emerald-900">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-700 font-bold shrink-0" />
                      <span><strong>0% Placement Fee:</strong> Direct hiring with zero recruiter markup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-700 font-bold shrink-0" />
                      <span><strong>Verified GitHub Repos:</strong> Full code audit history</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-700 font-bold shrink-0" />
                      <span><strong>48-Hour Matching:</strong> Review candidate portfolios fast</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Demand Roles & Salary Benchmarks */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Disciplines We Feed
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 mb-2">
                  Specialized Roles Trained for Immediate Agency Impact
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Select candidate categories to inspect practical capabilities and market compensation ranges in Karachi, Lahore, and Islamabad.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {placementRoles.map((role, idx) => {
                  const RoleIcon = role.icon;
                  return (
                    <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 hover:border-brand-blue hover:shadow-lg transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="p-3 rounded-2xl bg-slate-100 text-brand-blue">
                            <RoleIcon size={22} />
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 block">
                              {role.salary}
                            </span>
                            <span className="text-[10px] text-gray-500 mt-1 block">Expected Junior Range</span>
                          </div>
                        </div>

                        <h4 className="text-lg font-bold text-gray-950 mb-2">
                          {role.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                          {role.description}
                        </p>

                        <div className="mb-6">
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
                            Verified Hands-On Capabilities:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {role.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-gray-700 font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-800">
                          {role.readiness}
                        </span>
                        <a
                          href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(`Hi Mentor Arena, our agency wants to hire a verified graduate for the role: ${role.title}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-brand-blue hover:text-blue-900 transition-colors flex items-center gap-1"
                        >
                          <span>Request Candidate Profiles</span>
                          <ArrowRight size={13} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Agency Partner Registration Form */}
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  For Agency Principals &amp; Tech Leads
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  Partner with Us &amp; Hire Vetted Graduates
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Tell us your tech stack requirements and open roles. We will review student repositories and share matching portfolios within 48 hours.
                </p>
              </div>

              {submittedPartner ? (
                <div className="p-8 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Agency Inquiry Logged!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Our placement director and Fazal Shahid Latif will review candidate availability and reach out via WhatsApp with candidate portfolios.
                  </p>
                  <button
                    onClick={() => setSubmittedPartner(false)}
                    className="text-xs font-bold text-emerald-400 underline cursor-pointer"
                  >
                    Submit another hiring requisition
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Agency / Software House Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Interactive / Systems Partner"
                        value={partnerForm.agencyName}
                        onChange={(e) => setPartnerForm({ ...partnerForm, agencyName: e.target.value })}
                        className="w-full p-3.5 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Contact Person &amp; Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Daniyal Siddiqui (Technical Lead)"
                        value={partnerForm.contactPerson}
                        onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                        className="w-full p-3.5 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Official Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="hiring@agency.com"
                        value={partnerForm.email}
                        onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                        className="w-full p-3.5 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0300 9876543"
                        value={partnerForm.whatsapp}
                        onChange={(e) => setPartnerForm({ ...partnerForm, whatsapp: e.target.value })}
                        className="w-full p-3.5 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">City Location</label>
                      <select
                        value={partnerForm.city}
                        onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                        className="w-full p-3.5 rounded-xl bg-slate-800 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad / Rawalpindi</option>
                        <option value="Remote">100% Remote</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Role Needed</label>
                      <select
                        value={partnerForm.roleNeeded}
                        onChange={(e) => setPartnerForm({ ...partnerForm, roleNeeded: e.target.value })}
                        className="w-full p-3.5 rounded-xl bg-slate-800 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="Junior Frontend / React Developer">Junior Frontend / React Developer</option>
                        <option value="Full-Stack MERN Developer">Full-Stack MERN Developer</option>
                        <option value="Technical SEO & GEO Analyst">Technical SEO & GEO Analyst</option>
                        <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                        <option value="Financial & Excel Analyst">Financial & Excel Analyst</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Openings Count</label>
                      <select
                        value={partnerForm.openingsCount}
                        onChange={(e) => setPartnerForm({ ...partnerForm, openingsCount: e.target.value })}
                        className="w-full p-3.5 rounded-xl bg-slate-800 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="1">1 Opening</option>
                        <option value="2-3">2–3 Openings</option>
                        <option value="4+">4+ Openings</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Stack Requirements or Job Description Link (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Next.js 15, Tailwind, PostgreSQL, Shopify, client communication skills..."
                      value={partnerForm.notes}
                      onChange={(e) => setPartnerForm({ ...partnerForm, notes: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg mt-4 cursor-pointer"
                  >
                    Request Matched Portfolios (0% Commission) &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: FOR ENROLLED STUDENTS ROADMAP */}
        {activePortalTab === 'student-roadmap' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                14-Week Career Pathway
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 mb-2">
                How We Prepare You for Immediate Agency Hiring
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                No empty certificate handouts. A structured, transparent progression from day one syntax drills to warm agency introductions.
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {studentRoadmapSteps.map((step, idx) => (
                <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200 hover:border-brand-blue transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    0{idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                      {step.week}
                    </span>
                    <h4 className="text-lg font-bold text-gray-950 mt-1 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 text-center max-w-2xl mx-auto space-y-4">
              <h4 className="text-lg font-bold text-gray-950">Ready to begin your 1-to-1 training?</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Tuition is transparent at PKR 6,000/month. No upfront 50k–80k fee locks.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onBookCall}
                  className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-900 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Book 1-to-1 Clarity Call
                </button>
                <button
                  onClick={() => onNavigate('/pricing')}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs border border-gray-200 transition-colors cursor-pointer"
                >
                  View Tuition Structure
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGIONAL ECOSYSTEM BREAKDOWN */}
        {activePortalTab === 'alumni-stories' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Pakistan City Corridors
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 mb-2">
                Where Our Graduates Work
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                From Shahrah-e-Faisal in Karachi to Arfa Software Technology Park in Lahore and Blue Area in Islamabad, our graduates fill in-demand agency seats.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEcosystems.map((eco, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
                        {eco.badge}
                      </span>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Avg Hire: {eco.avgHiringTime}
                      </span>
                    </div>

                    <h4 className="text-xl font-black text-gray-950 mb-2">
                      {eco.city} Tech Corridor
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      {eco.description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-100 text-xs text-gray-700 mb-5">
                      <strong className="text-gray-950 block mb-1">Key Corridors:</strong>
                      <span>{eco.corridors}</span>
                    </div>

                    <div className="space-y-1 mb-6">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                        Partner Agency Profiles:
                      </span>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {eco.partnerTypes.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-1.5">
                            <span className="text-emerald-700 font-bold">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">Active Hiring Hub</span>
                    <button
                      onClick={() => setActivePortalTab('hire')}
                      className="text-xs font-bold text-brand-blue hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Post Requisition</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
