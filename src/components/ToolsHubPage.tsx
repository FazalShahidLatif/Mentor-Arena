import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  FileText,
  Code,
  Bot,
  BarChart2,
  Cpu,
  DollarSign,
  TrendingUp,
  Type,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Award,
  Zap,
  BookOpen,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { TOOLS_CATALOG, ToolDefinition, ToolCategory } from '../types/tools';
import { WordCounterTool } from './tools/WordCounterTool';
import { MetaTagGeneratorTool } from './tools/MetaTagGeneratorTool';
import { SerpSimulatorTool } from './tools/SerpSimulatorTool';
import { KeywordDensityTool } from './tools/KeywordDensityTool';
import { RobotsTxtGeneratorTool } from './tools/RobotsTxtGeneratorTool';
import { SchemaGeneratorTool } from './tools/SchemaGeneratorTool';
import { FreelanceRateCalculatorTool } from './tools/FreelanceRateCalculatorTool';
import { RemittanceCalculatorTool } from './tools/RemittanceCalculatorTool';
import { CaseConverterTool } from './tools/CaseConverterTool';
import { BUSINESS_INFO } from '../constants';

interface ToolsHubPageProps {
  onBackToHome: () => void;
  onNavigateToCourse: (courseTrack: string) => void;
  onBookCall: () => void;
  onNavigate?: (path: string) => void;
  initialToolSlug?: string | null;
}

export const ToolsHubPage: React.FC<ToolsHubPageProps> = ({
  onBackToHome,
  onNavigateToCourse,
  onBookCall,
  onNavigate,
  initialToolSlug,
}) => {
  // Routing / Active Tool State
  const [activeSlug, setActiveSlug] = useState<string | null>(() => {
    if (initialToolSlug) return initialToolSlug;
    const parts = window.location.pathname.split('/');
    if (parts[1] === 'tools' && parts[2]) {
      return parts[2];
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync when initialToolSlug changes from parent App router
  useEffect(() => {
    if (initialToolSlug !== undefined) {
      setActiveSlug(initialToolSlug || null);
    }
  }, [initialToolSlug]);

  // Sync with browser history
  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/');
      if (parts[1] === 'tools' && parts[2]) {
        setActiveSlug(parts[2]);
      } else {
        setActiveSlug(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const selectTool = (slug: string | null) => {
    setActiveSlug(slug);
    const targetUrl = slug ? `/tools/${slug}` : '/tools';
    if (onNavigate) {
      onNavigate(targetUrl);
    } else {
      window.history.pushState({}, '', targetUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Find active tool definition if open
  const currentTool = useMemo(() => {
    if (!activeSlug) return null;
    return TOOLS_CATALOG.find(t => t.slug === activeSlug) || null;
  }, [activeSlug]);

  // Filtered tools catalog
  const filteredTools = useMemo(() => {
    return TOOLS_CATALOG.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some(k => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Icon mapping
  const renderIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'FileText':
        return <FileText className={className} />;
      case 'Code':
        return <Code className={className} />;
      case 'Search':
        return <Search className={className} />;
      case 'BarChart2':
        return <BarChart2 className={className} />;
      case 'Bot':
        return <Bot className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'DollarSign':
        return <DollarSign className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'Type':
        return <Type className={className} />;
      default:
        return <Zap className={className} />;
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      {/* ------------------------------------------------------------- */}
      {/* SCENARIO 1: ACTIVE INDIVIDUAL TOOL VIEW                       */}
      {/* ------------------------------------------------------------- */}
      {currentTool ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-8">
          {/* Breadcrumbs & Share Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button
                onClick={onBackToHome}
                className="hover:text-brand-blue transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <button
                onClick={() => selectTool(null)}
                className="hover:text-brand-blue transition-colors cursor-pointer flex items-center gap-1"
              >
                Tools Hub
              </button>
              <span>/</span>
              <span className="text-slate-900 font-bold">{currentTool.shortName}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => selectTool(null)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-slate-700 text-xs font-bold hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeft size={13} /> All Tools
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-blue/10 text-brand-blue text-xs font-bold hover:bg-brand-blue/20 transition-colors cursor-pointer"
              >
                {copiedLink ? <Check size={13} /> : <Share2 size={13} />}
                {copiedLink ? 'Link Copied!' : 'Share Tool'}
              </button>
            </div>
          </div>

          {/* Tool Title & Header Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 shadow-inner">
                  {renderIcon(currentTool.iconName, 'w-7 h-7')}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-100">
                      {currentTool.categoryLabel}
                    </span>
                    {currentTool.badge && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {currentTool.badge}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {currentTool.name}
                  </h1>
                  <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {currentTool.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Switcher Carousel / Tabs */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider shrink-0 mr-1">
                  Quick Switch:
                </span>
                {TOOLS_CATALOG.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => selectTool(tool.slug)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      tool.slug === currentTool.slug
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    {renderIcon(tool.iconName, 'w-3.5 h-3.5')}
                    {tool.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* The Interactive Tool Body */}
          <div className="space-y-6">
            {currentTool.id === 'word-counter' && <WordCounterTool />}
            {currentTool.id === 'meta-tag-generator' && <MetaTagGeneratorTool />}
            {currentTool.id === 'serp-simulator' && <SerpSimulatorTool />}
            {currentTool.id === 'keyword-density' && <KeywordDensityTool />}
            {currentTool.id === 'robots-txt-generator' && <RobotsTxtGeneratorTool />}
            {currentTool.id === 'schema-generator' && <SchemaGeneratorTool />}
            {currentTool.id === 'freelance-rate-calculator' && <FreelanceRateCalculatorTool />}
            {currentTool.id === 'remittance-calculator' && <RemittanceCalculatorTool />}
            {currentTool.id === 'case-converter' && <CaseConverterTool />}
          </div>

          {/* Educational Best Practice & Mentorship Integration Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {/* Why Use & How to Apply (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-brand-blue">
                <BookOpen size={20} />
                <h3 className="text-base font-bold text-gray-900">
                  Best Practices &amp; Industry Standards
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Utilizing free utilities like {currentTool.name} allows developers, digital marketers, and freelancers to audit technical correctness before deploying code or publishing content. In Google&apos;s modern ranking systems, accurate metadata, crawl efficiency, and structured JSON-LD schemas directly impact click-through rate (CTR) and organic rankings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <ShieldCheck size={15} className="text-emerald-500" /> 100% Client-Side
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Your data is never transmitted to external servers or stored in third-party databases.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <Zap size={15} className="text-amber-500" /> Instant Real-Time
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Zero lag calculations with instant clipboard copy and download capabilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Cross-Sell Mentorship Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-blue to-blue-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-2.5 py-1 rounded-full inline-block">
                  Master This Professionally
                </span>
                <h4 className="text-lg sm:text-xl font-black text-white leading-tight">
                  Want to build full-stack tools &amp; master SEO end-to-end?
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Join lead mentor Fazal Shahid Latif in our <strong>{currentTool.relatedCourseName}</strong>. 150 hours of intensive 1-to-1 coaching with max 6 students per cohort.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onNavigateToCourse(currentTool.relatedCourseTrack)}
                  className="w-full py-3 px-4 rounded-xl bg-white text-brand-blue font-bold text-xs hover:bg-blue-50 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Course Syllabus <ArrowRight size={14} />
                </button>
                <button
                  onClick={onBookCall}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-semibold text-xs transition-colors border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Book 1-on-1 Diagnostic Call
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* SCENARIO 2: DIRECTORY HUB OVERVIEW VIEW                       */
        /* ------------------------------------------------------------- */
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-12">
          {/* Header & Search Hero */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold border border-blue-100">
              <Sparkles size={14} /> Free SEO &amp; Freelance Utilities
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Small SEO &amp; Webmaster Tools
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Fast, production-grade tools for content writers, web developers, SEO specialists, and remote freelancers. 100% free, secure, and client-side executed.
            </p>

            {/* Instant Search Bar */}
            <div className="relative max-w-xl mx-auto pt-2">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g., word counter, meta tags, schema, remittance)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-sm shadow-sm focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition-all placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Free Tools', count: TOOLS_CATALOG.length },
              { id: 'seo', label: 'SEO & Webmaster', count: 4 },
              { id: 'content', label: 'Content & Text', count: 2 },
              { id: 'dev', label: 'Code & Schema', count: 1 },
              { id: 'finance', label: 'Freelance & Finance', count: 2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as ToolCategory)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === tab.id
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tool Cards Grid */}
          {filteredTools.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-200/80 text-center space-y-3">
              <HelpCircle size={36} className="mx-auto text-gray-300" />
              <h3 className="text-base font-bold text-gray-800">No tools matched your search</h3>
              <p className="text-xs text-gray-500">
                Try searching for keywords like &ldquo;meta&rdquo;, &ldquo;counter&rdquo;, &ldquo;schema&rdquo;, or &ldquo;freelance&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 text-xs font-bold text-brand-blue hover:underline cursor-pointer"
              >
                Reset search filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => selectTool(tool.slug)}
                  className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header: Icon + Badges */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center group-hover:scale-105 transition-transform">
                        {renderIcon(tool.iconName, 'w-6 h-6')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {tool.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {tool.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {tool.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-blue transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {tool.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-blue group-hover:underline flex items-center gap-1">
                      Open Tool <ArrowRight size={13} />
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">Free &amp; Live</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mentorship Promotion Spotlight Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-brand-blue to-blue-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full inline-block">
                Architectural Software Linage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Don&apos;t Just Use Tools — Learn How to Architect &amp; Build Them
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Mentor Arena offers 150 hours of intensive 1-to-1 mentorship with lead mentor Fazal Shahid Latif. Master the MERN stack, technical SEO, and conversion UI/UX with transparent PKR 6,000/mo tuition.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateToCourse('web-development')}
                  className="px-5 py-3 rounded-xl bg-white text-brand-blue font-bold text-xs hover:bg-blue-50 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  View MERN Stack Syllabus <ArrowRight size={14} />
                </button>
                <button
                  onClick={onBookCall}
                  className="px-5 py-3 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-xs transition-colors border border-white/20 flex items-center gap-1.5 cursor-pointer"
                >
                  Book Free Consultation Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
