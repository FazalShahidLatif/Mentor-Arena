import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  MessageSquare, 
  Calendar, 
  Code, 
  Terminal, 
  Search, 
  Flame, 
  Laptop, 
  Eye, 
  AlertTriangle, 
  TrendingUp,
  Share2,
  Check,
  Download,
  Users
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface LiveTeardownsPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  onNavigate: (path: string) => void;
  selectedCity?: 'all' | 'karachi' | 'lahore' | 'islamabad';
  onOpenSyllabusMagnet?: (trackName?: string) => void;
}

export const LiveTeardownsPage: React.FC<LiveTeardownsPageProps> = ({
  onBackToHome,
  onBookCall,
  onNavigate,
  selectedCity = 'all',
  onOpenSyllabusMagnet
}) => {
  const [activeTab, setActiveTab] = useState<'featured' | 'schedule' | 'submit' | 'clips'>('featured');
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    storeUrl: '',
    ownerName: '',
    whatsapp: '',
    platform: 'Shopify',
    currentProblem: 'PageSpeed below 40 on mobile and zero organic sales'
  });
  const [submitted, setSubmitted] = useState(false);

  const cityName = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const featuredSession = {
    title: "Auditing a Pakistani eCommerce Store Live — Fixing PageSpeed & Schema in 30 Minutes",
    subtitle: "Real-world production diagnosis on a live Karachi fashion brand with 45,000+ monthly visits. Zero slides. 100% live code & terminal screen audit.",
    host: "Fazal Shahid Latif (30+ Years Veteran Solutions Architect)",
    duration: "45 Minutes Live Stream",
    platform: "YouTube Live & LinkedIn Stream",
    date: "Every Thursday @ 9:00 PM PKT",
    results: [
      { metric: "Mobile PageSpeed", before: "32 / 100", after: "94 / 100", change: "+193% Increase", color: "emerald" },
      { metric: "Core Web Vitals LCP", before: "5.4 seconds", after: "1.1 seconds", change: "79% Faster", color: "emerald" },
      { metric: "JSON-LD Schema", before: "0 Valid Tags (Broken)", after: "100% Rich Results Passed", change: "Google Merchant Ready", color: "blue" },
      { metric: "Render-Blocking JS", before: "2.8 MB Uncompressed", after: "420 KB Tree-shaken", change: "85% Payload Cut", color: "emerald" }
    ],
    chapters: [
      {
        time: "00:00 - 08:30",
        title: "Initial Lighthouse & Network Waterfall Teardown",
        description: "Diagnosing 14 uncompressed 3MB carousel images, 6 duplicate tracking pixels (TikTok, Facebook, GA4), and severe Time to First Byte (TTFB) server stalls on a Pakistani cloud VPS.",
        icon: Terminal
      },
      {
        time: "08:30 - 18:15",
        title: "Image Optimization & Next-Gen WebP Pipeline",
        description: "Implementing automated responsive srcset tags, native lazy loading, and priority fetch hints (fetchpriority='high') for the Largest Contentful Paint (LCP) banner image.",
        icon: Code
      },
      {
        time: "18:15 - 28:40",
        title: "Injecting Complete Product & AggregateRating Schema",
        description: "Authoring valid Schema.org microdata with Product, Offer, inStock availability (PKR currency), AggregateRating, and BreadcrumbList for rich Google Search snippet stars.",
        icon: Search
      },
      {
        time: "28:40 - 38:00",
        title: "Eliminating Render-Blocking jQuery & Vendor Script Bloat",
        description: "Deferring heavy third-party sliders, lazy-loading WhatsApp floating chat buttons, and converting bulky polyfills to modern ES6+ vanilla scripts.",
        icon: Zap
      },
      {
        time: "38:00 - 45:00",
        title: "Live Re-Test & Verification Against Google Rich Results Test",
        description: "Live browser reload showing immediate 94 mobile score, sub-second LCP, zero CLS shift, and verified schema eligibility in Google Search Console.",
        icon: TrendingUp
      }
    ]
  };

  const upcomingStreams = [
    {
      date: "Thursday, Next Week @ 9:00 PM PKT",
      title: "Auditing a Pakistani eCommerce Store Live — Fixing PageSpeed & Schema in 30 Minutes",
      category: "Technical SEO & Speed",
      target: "Fashion & Apparel Store (Karachi)",
      stack: "Shopify Liquid / Cloudflare / Schema.org",
      spots: "Open RSVP",
      status: "Featured This Week"
    },
    {
      date: "Thursday, Week 2 @ 9:00 PM PKT",
      title: "MERN Stack SaaS Production Teardown — Debugging Memory Leaks & Dockerizing Next.js 15",
      category: "Full-Stack Web Dev",
      target: "B2B Logistics Dashboard (Lahore)",
      stack: "React 19 / Node.js / PostgreSQL / Prisma",
      spots: "140 RSVPs",
      status: "Upcoming"
    },
    {
      date: "Thursday, Week 3 @ 9:00 PM PKT",
      title: "Local Business GMB & Local SEO Audit — Beating Competitors in Karachi & Lahore Maps",
      category: "Local SEO & GEO",
      target: "Dental Clinic & Real Estate Agency",
      stack: "Google Business Profile / Schema / Geo-Citations",
      spots: "98 RSVPs",
      status: "Upcoming"
    },
    {
      date: "Thursday, Week 4 @ 9:00 PM PKT",
      title: "Reverse Engineering Competitor Backlinks with Ahrefs Live — Zero-Cost White-Hat Links",
      category: "Organic Search & Digital PR",
      target: "B2B Exporter (Islamabad / Sialkot)",
      stack: "Ahrefs / Python Scraper / HARO Outreach",
      spots: "115 RSVPs",
      status: "Upcoming"
    }
  ];

  const viralClips = [
    {
      duration: "02:14",
      title: "Fixing a 500 Internal Server Error Live on a Client Next.js API in 90 Seconds",
      views: "18.4K Views",
      platform: "LinkedIn Video",
      takeaway: "Webinar marketers would call for a 2-week module; Fazal checks server environment variables, resolves JWT secret mismatch, and pushes the Git hotfix live on screen."
    },
    {
      duration: "01:45",
      title: "Why Pakistani WooCommerce Stores Stall at 8 Seconds on Mobile (The Slider Plugin Trap)",
      views: "24.1K Views",
      platform: "YouTube Shorts",
      takeaway: "Showing how a single bloated Revolution Slider plugin pulls 4.2MB of render-blocking JS on 3G cellular connections in Rawalpindi and Karachi."
    },
    {
      duration: "03:10",
      title: "Injecting Dynamic Schema.org Microdata Without Costly WordPress Plugins",
      views: "15.9K Views",
      platform: "LinkedIn Video",
      takeaway: "Writing pure JSON-LD schema with PHP hooks directly in functions.php, saving the client $79/year in redundant plugin subscription fees."
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSubmitStore = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'live_teardown_submission',
          ...submitForm
        })
      });
    } catch (err) {
      console.error('Failed to submit store lead', err);
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen">
      {/* Header Breadcrumbs & Action Bar */}
      <div className="bg-slate-950/80 border-b border-white/10 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              &larr; Back to Home
            </button>
            <span className="text-slate-700">/</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Code &amp; SEO Teardowns
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 size={13} />
              <span>{copiedLink ? "✓ Link Copied" : "Share Stream"}</span>
            </button>
            <a
              href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hi%20Mentor%20Arena%2C%20I%20want%20to%20attend%20the%20Weekly%20Live%20Code%20and%20SEO%20Teardown%20session`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare size={13} />
              <span>RSVP via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles size={14} className="text-emerald-400" />
              <span>Phase 3 Growth Flywheel: Anti-Fluff Live Engineering</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Weekly "Live Code &amp; SEO Teardown" Stream
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Watch 30+ year veteran Solutions Architect <strong>Fazal Shahid Latif</strong> dissect real Pakistani production websites, debug complex codebases on the fly, and fix slow Core Web Vitals live on screen. 
              <span className="text-emerald-400 font-semibold block mt-2">
                No prepared slides. No pre-recorded webinars. 100% unfiltered engineering that mass-market courses cannot replicate.
              </span>
            </p>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3 p-1.5 bg-slate-950/60 rounded-2xl border border-white/10 backdrop-blur-md max-w-fit">
              {[
                { id: 'featured', label: '🔥 Featured 45-Min Teardown', badge: 'Must Watch' },
                { id: 'schedule', label: '📅 Upcoming Stream Calendar' },
                { id: 'clips', label: '⚡ Unfiltered Shorts (LinkedIn)' },
                { id: 'submit', label: '🚀 Submit Your Store / Code' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TAB 1: FEATURED TEARDOWN SESSION */}
        {activeTab === 'featured' && (
          <div className="space-y-12">
            {/* The Live Video Player & Case Teaser */}
            <div className="bg-slate-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-6 sm:p-8 lg:p-10 border-b border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    FEATURED TEARDOWN EPISODE
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredSession.duration}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {featuredSession.date}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  {featuredSession.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
                  {featuredSession.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-8 h-8 rounded-full bg-brand-blue/30 border border-brand-blue/50 flex items-center justify-center font-bold text-white">FS</span>
                    <span>Host: <strong className="text-white">{featuredSession.host}</strong></span>
                  </div>
                  <span className="text-slate-600 hidden sm:inline">|</span>
                  <span className="text-emerald-400 font-medium">Broadcasted on YouTube &amp; LinkedIn</span>
                </div>
              </div>

              {/* Before & After Benchmark Metrics Grid */}
              <div className="p-6 sm:p-8 bg-slate-900/60 border-b border-white/10">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <TrendingUp size={15} className="text-emerald-400" />
                  Live Audited Outcomes (Before vs. 30 Minutes After)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredSession.results.map((res, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-emerald-500/30 transition-all">
                      <div className="text-xs font-semibold text-slate-400 mb-2">{res.metric}</div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs text-rose-400 line-through font-mono">{res.before}</span>
                        <span className="text-xs text-slate-600">&rarr;</span>
                        <span className="text-xl font-black text-emerald-400 font-mono">{res.after}</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                        {res.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Chapter Timeline */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock size={16} className="text-emerald-400" />
                    <span>Teardown Breakdown by Timecoded Chapters</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Click to inspect phase details</span>
                </div>

                <div className="space-y-3">
                  {featuredSession.chapters.map((chap, idx) => {
                    const ChapIcon = chap.icon;
                    const isSelected = activeChapter === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveChapter(idx)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/40'
                            : 'bg-slate-950/60 border-white/5 hover:border-white/20 hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className={`p-2.5 rounded-xl mt-0.5 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-slate-400'}`}>
                              <ChapIcon size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                                  {chap.time}
                                </span>
                                <h4 className="font-bold text-white text-sm sm:text-base">{chap.title}</h4>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1">
                                {chap.description}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xs font-bold shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {isSelected ? '✓ Viewing' : 'Inspect'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Strategic Callout: Why Webinar Marketers Cannot Replicate This */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Why Mass-Market Webinar Gurus Fear Live Code Audits
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    In a 500-student webinar cohort, the presenter relies strictly on PowerPoint slides, rehearsed scripts, and sanitized theoretical dashboards. If real code throws an unhandled runtime error or a CSS grid breaks in production, a junior trainer has no pre-written script to hide behind.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span className="text-slate-300"><strong>The Fluff Approach:</strong> Promising "100k/month freelancing" using outdated 2018 keyword stuffing and generic templates.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="text-slate-300"><strong>The Mentor Arena Approach:</strong> Direct browser terminal inspections, real DNS propagation, raw Schema validation, and line-by-line debugging.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UPCOMING STREAMS CALENDAR */}
        {activeTab === 'schedule' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Weekly Thursday Broadcast
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                Upcoming Live Teardown Calendar
              </h2>
              <p className="text-sm text-slate-400">
                Join our live sessions every Thursday at 9:00 PM PKT. Ask questions directly in the chat, submit your own issues, and get live architectural answers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingStreams.map((stream, idx) => (
                <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg">
                        {stream.date}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg">
                        {stream.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                      {stream.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-400 mb-6">
                      <div>🎯 <strong>Target Case:</strong> {stream.target}</div>
                      <div>🛠️ <strong>Stack Examined:</strong> <span className="font-mono text-slate-300">{stream.stack}</span></div>
                      <div>👥 <strong>Audience:</strong> {stream.spots}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-400 font-medium">{stream.category}</span>
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(`Hi Mentor Arena, I would like to RSVP for the live session: "${stream.title}" on ${stream.date}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar size={13} />
                      <span>RSVP Free</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VIRAL SHORTS & CLIPS */}
        {activeTab === 'clips' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                LinkedIn &amp; YouTube Shorts
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                Unfiltered Engineering Clips
              </h2>
              <p className="text-sm text-slate-400">
                Short 60-to-180 second micro-audits showing Fazal solving real client bugs on the fly. No fluff, just practical line-by-line solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {viralClips.map((clip, i) => (
                <div key={i} className="p-6 rounded-3xl bg-slate-950 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <Play size={10} className="fill-rose-400" /> {clip.duration}
                      </span>
                      <span className="text-[11px] text-slate-400">{clip.views}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-3 leading-snug">
                      {clip.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {clip.takeaway}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400">{clip.platform}</span>
                    <a
                      href="https://www.linkedin.com/in/fazal-shahid-mentor/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-1"
                    >
                      <span>Watch Clip</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SUBMIT YOUR STORE / CODE */}
        {activeTab === 'submit' && (
          <div className="max-w-2xl mx-auto bg-slate-950 p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                100% Free Live Audit
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                Submit Your Pakistani Website or Code for a Live Teardown
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Are you an eCommerce brand founder, agency owner, or developer in Karachi, Lahore, or Islamabad struggling with sluggish PageSpeed, broken schema, or unexplainable bugs? Submit below to be audited live by Fazal Shahid Latif.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Teardown Request Received!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Fazal will inspect your URL before the upcoming stream. If selected, we will send an invite to your WhatsApp with the stream slot and live link.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-emerald-400 underline cursor-pointer"
                >
                  Submit another URL
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitStore} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Website / Store URL or GitHub Repo *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourstore.pk or https://github.com/..."
                    value={submitForm.storeUrl}
                    onChange={(e) => setSubmitForm({ ...submitForm, storeUrl: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hammad Khan"
                      value={submitForm.ownerName}
                      onChange={(e) => setSubmitForm({ ...submitForm, ownerName: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={submitForm.whatsapp}
                      onChange={(e) => setSubmitForm({ ...submitForm, whatsapp: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Platform / Stack</label>
                    <select
                      value={submitForm.platform}
                      onChange={(e) => setSubmitForm({ ...submitForm, platform: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Shopify">Shopify</option>
                      <option value="WooCommerce / WordPress">WooCommerce / WordPress</option>
                      <option value="Custom MERN / Next.js">Custom MERN / Next.js</option>
                      <option value="Magento / OpenCart">Magento / OpenCart</option>
                      <option value="Other">Other Custom Stack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">Primary Pain Point</label>
                    <select
                      value={submitForm.currentProblem}
                      onChange={(e) => setSubmitForm({ ...submitForm, currentProblem: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="PageSpeed below 40 on mobile">PageSpeed below 40 on mobile</option>
                      <option value="Missing or broken Schema.org">Missing or broken Schema.org</option>
                      <option value="Zero Organic Google Ranking">Zero Organic Google Ranking</option>
                      <option value="High checkout cart abandonment">High checkout cart abandonment</option>
                      <option value="Server crashes during sales">Server crashes during sales</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-950 mt-4 cursor-pointer"
                >
                  Submit for Free Live Teardown Review &rarr;
                </button>
                <p className="text-[10px] text-slate-500 text-center">
                  * All audits are educational and constructive. Sensitive API keys or customer data are never displayed.
                </p>
              </form>
            )}
          </div>
        )}

        {/* Bottom CTA to enroll in 1-to-1 Mentorship */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-950 to-emerald-950/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Want 1-to-1 live screen audits on your private projects?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1 mb-2">
              Get 150 Hours of Dedicated Private Mentorship
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Don't settle for watching others build. Build your own production web apps, SEO architectures, and AI workflows with Fazal reviewing your code line by line.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Book 1-to-1 Clarity Call
            </button>
            <button
              onClick={() => onNavigate('/compare/positioning-matrix')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-xs rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              Inspect Positioning Matrix
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
