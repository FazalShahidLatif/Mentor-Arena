import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, Clock, Heart, Share2, Tag, Play, ArrowRight, Award, Shield, DollarSign, ToggleLeft, Percent, Compass, MessageSquare, Newspaper } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import { HeroBanner } from './HeroBanner';

import { getBlogPosts, BlogPost, BlogImage } from '../data/blogArticles';
export type { BlogPost, BlogImage };

interface BlogHubPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const BlogHubPage: React.FC<BlogHubPageProps> = ({ onBackToHome, onBookCall, selectedCity }) => {
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);
  
  // State variables
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web-dev' | 'seo' | 'uiux' | 'freelance' | 'ai-growth'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize from exact URL pathname if visiting a deep blog page direct reference
  const initialSlug = React.useMemo(() => {
    const parts = window.location.pathname.split('/');
    if (parts[1] === 'blog' && parts[2]) {
      return parts[2];
    }
    return null;
  }, []);

  const [readArticleSlug, setReadArticleSlug] = useState<string | null>(initialSlug);
  const [enableAdsMode, setEnableAdsMode] = useState<boolean>(true);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  // Sync state cleanly back/forward with popstate actions
  useEffect(() => {
    const handleLocationSync = () => {
      const parts = window.location.pathname.split('/');
      if (parts[1] === 'blog' && parts[2]) {
        // Prevent infinite render loops by guarding state updates
        setReadArticleSlug(prev => prev !== parts[2] ? parts[2] : prev);
      } else {
        setReadArticleSlug(prev => prev !== null ? null : prev);
      }
    };
    
    window.addEventListener('popstate', handleLocationSync);
    return () => window.removeEventListener('popstate', handleLocationSync);
  }, []);

  // Update browser history bar address dynamically as user focuses different content views
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (readArticleSlug) {
      const expectedPath = `/blog/${readArticleSlug}`;
      if (currentPath !== expectedPath) {
        window.history.pushState(null, '', expectedPath);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Transition out of reading mode back to normal list view
      if (currentPath.startsWith('/blog/') && currentPath !== '/blog') {
        window.history.pushState(null, '', '/blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [readArticleSlug]);

  // High-authority semantic blog posts with optimized featured images for search indexing
  const blogPosts: BlogPost[] = useMemo(() => getBlogPosts(citySuffix), [citySuffix]);

  // Categories helper
  const categories = useMemo(() => [
    { id: 'all', label: 'All Articles' },
    { id: 'web-dev', label: 'MERN Web Dev' },
    { id: 'seo', label: 'SEO & Search' },
    { id: 'uiux', label: 'UI/UX Design' },
    { id: 'freelance', label: 'Freelance & Business' },
    { id: 'ai-growth', label: 'Generative Tech & AI' }
  ], []);

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.longTailKeywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  const activeArticle = useMemo(() => {
    if (!readArticleSlug) return null;
    return blogPosts.find(post => post.slug === readArticleSlug) || null;
  }, [blogPosts, readArticleSlug]);

  const handleLike = (slug: string) => {
    setLikedArticles(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="generative-seo-blog-hub">
      
      {/* Full Width Hero Banner for Blog Hub */}
      {!activeArticle && (
        <HeroBanner
          id="blog-hub-hero-banner"
          theme="indigo"
          badge={{
            text: `🚀 20 Semantic Search & Tech Guides (${citySuffix})`,
            icon: Newspaper
          }}
          breadcrumbs={[
            { label: 'Home', onClick: onBackToHome },
            { label: 'Knowledge Hub & Blog' }
          ]}
          title={
            <>
              The Generative Knowledge Corpus: Master Pakistan's Tech &amp; SEO in <span className="text-indigo-400">{citySuffix}</span>
            </>
          }
          description={
            <>
              Explore in-depth technical guides, MERN coding tutorials, Technical SEO audit breakdowns, UI/UX design heuristics, and freelancing playbooks curated by <strong>Fazal Shahid Latif</strong>. Engineered using pristine semantic SILO rules.
            </>
          }
          stats={[
            { label: 'Published Guides', value: '20 Deep Articles', subtext: 'Keyword-Targeted' },
            { label: 'Domains Covered', value: '5 SILO Tracks', subtext: 'Web, SEO, UI, AI' },
            { label: 'Instruction Quality', value: '100% Practical', subtext: 'Real Code & Data' },
            { label: 'Mentorship', value: '1-to-1 Available', subtext: '150 Live Hours' }
          ]}
          primaryCta={{
            text: 'Book Free Clarity Dialogue',
            onClick: onBookCall
          }}
          secondaryCta={{
            text: 'WhatsApp Lead Instructor',
            whatsappMessage: `Hi Mentor Arena, I was reading your tech articles and would like to learn more about the 1-to-1 mentorship program in ${citySuffix}.`
          }}
          image={{
            src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200',
            alt: `Tech guides, MERN tutorials, SEO audits, and freelancing roadmaps in ${citySuffix} curated by Fazal Shahid Latif`,
            badgeText: 'Technical Articles & Career Playbooks',
            badgeSubtext: '20 Semantic SILO Guides · Written by Fazal Shahid Latif'
          }}
        />
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${activeArticle ? 'pt-32 pb-24' : 'py-12'}`}>
        
        {/* AdSense Top Banner Mock (Monetization Demo) */}
        {enableAdsMode && (
          <div className="mb-8 p-4 bg-gray-50 border border-dashed border-gray-200 rounded-3xl text-center relative overflow-hidden group">
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-200 text-gray-500 text-[9px] font-mono rounded uppercase font-bold tracking-wider">Sponsored Ad Unit</div>
            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-[9px] text-emerald-600 font-bold font-mono">ADSENSE LIVE SLOT</span>
            </div>
            <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
              <div className="text-left">
                <span className="text-xs font-bold text-brand-blue font-mono uppercase tracking-widest">Sponsored Deal • Hostinger PK</span>
                <p className="text-sm text-gray-600 font-medium mt-1">Get Elite NVMe WordPress &amp; Node Hosting with 1 Free Domain. Starter deals from PKR 599/month.</p>
              </div>
              <a href="https://hostinger.pk" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-gray-900 text-white font-bold text-xs rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap shrink-0">Claim 10% Discount Code</a>
            </div>
          </div>
        )}

        {/* Header Breadcrumb & Controls */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
            <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="hover:text-brand-blue transition-colors">Home</a>
            <span>/</span>
            {activeArticle ? (
              <>
                <button onClick={() => setReadArticleSlug(null)} className="hover:text-brand-blue transition-colors uppercase">Generative SEO Blog</button>
                <span>/</span>
                <span className="text-brand-blue font-bold truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl bg-blue-50/80 border border-blue-100/90 text-brand-blue px-2.5 py-1 rounded-lg text-xs tracking-normal font-sans shadow-xs inline-flex items-center gap-1.5" title={activeArticle.title}>
                  {activeArticle.title}
                </span>
              </>
            ) : (
              <span className="text-brand-blue font-bold">Generative SEO Blog</span>
            )}
          </div>

          {/* AdSense Switch Widget */}
          <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded-2xl">
            <div className="text-right">
              <strong className="block text-[11px] text-gray-900 font-black">Monetization Engine</strong>
              <span className="text-[9px] text-gray-500 font-mono">Simulate Google AdSense Integration</span>
            </div>
            <button
              onClick={() => setEnableAdsMode(!enableAdsMode)}
              className={`p-1.5 rounded-xl transition-all ${enableAdsMode ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-400'}`}
              title="Toggle Ad Units visibility to inspect layout with live Google Ads setup"
            >
              <ToggleLeft size={20} className={`transform transition-transform ${enableAdsMode ? 'rotate-180 text-emerald-300' : ''}`} />
            </button>
          </div>
        </div>

        {/* Regular Reading Portal */}
        {!activeArticle ? (
          <div>

            {/* Filter and Search Bar */}
            <div className="mb-12 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search long-tail keywords (e.g. laptop, Upwork, figma auto layout)..."
                    className="w-full pl-11 pr-4 py-4 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>

                {/* Categories Slider */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as any)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border ${selectedCategory === cat.id ? 'bg-brand-blue text-white border-brand-blue shadow-md' : 'bg-gray-50 hover:bg-gray-150 text-gray-600 border-gray-100'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtering Count Indicator */}
              <div className="text-xs text-gray-400 font-mono flex items-center justify-between">
                <span>Displaying <strong>{filteredPosts.length}</strong> semantic target articles</span>
                {searchQuery && <button onClick={() => setSearchQuery('')} className="text-brand-blue hover:underline">Clear Search</button>}
              </div>
            </div>

            {/* Large Grid of Filtering Blog Posts with Featured Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-gray-150 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Featured Image with SEO-optimized attributes */}
                    <div 
                      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 mb-5 cursor-pointer"
                      onClick={() => setReadArticleSlug(post.slug)}
                    >
                      <img
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        loading="lazy"
                        decoding="async"
                        width={post.featuredImage.width}
                        height={post.featuredImage.height}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      
                      {/* Image corner badges */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-white/95 backdrop-blur-sm text-brand-blue rounded-full uppercase tracking-wider shadow-xs">
                          {post.categoryLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-mono">
                        <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded flex items-center gap-1">
                          <Clock size={11} /> {post.readTime}
                        </span>
                        <span className="bg-brand-blue/90 font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Read Guide →
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-gray-950 leading-snug mb-3 hover:text-brand-blue transition-colors">
                      <button onClick={() => setReadArticleSlug(post.slug)} className="text-left w-full">
                        {post.title}
                      </button>
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    {/* Display some tags for SEO lookup */}
                    <div className="flex gap-1 flex-wrap mb-4">
                      {post.longTailKeywords.slice(0, 2).map((kw, i) => (
                        <span key={i} className="text-[9px] bg-gray-50 text-gray-500 font-mono border border-gray-100 rounded px-1.5 py-0.5">#{kw}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <button
                        onClick={() => setReadArticleSlug(post.slug)}
                        className="text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors flex items-center gap-1 font-mono uppercase tracking-wider"
                      >
                        Read Deep Analysis <ArrowRight size={14} />
                      </button>

                      <button
                        onClick={() => handleLike(post.slug)}
                        className={`p-2 rounded-xl transition-colors ${likedArticles[post.slug] ? 'bg-rose-50 text-rose-500' : 'hover:bg-gray-50 text-gray-400'}`}
                        aria-label="Like"
                      >
                        <Heart size={16} className={likedArticles[post.slug] ? 'fill-rose-500' : ''} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {/* No items fallback */}
              {filteredPosts.length === 0 && (
                <div className="col-span-full py-16 text-center border border-dashed border-gray-200 rounded-3xl bg-gray-50/50 space-y-3">
                  <BookOpen size={36} className="text-gray-300 mx-auto" />
                  <strong className="block text-gray-955 font-bold">No semantic articles matched your parameters</strong>
                  <p className="text-xs text-gray-400">Try adjusting your category filter, or delete key terms inside your search bar.</p>
                </div>
              )}
            </div>

            {/* Simulated Ads Revenue Stats Dashboard */}
            {enableAdsMode && (
              <div className="mt-16 p-8 bg-gray-50 border border-gray-200 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="text-lg font-bold text-gray-950 mb-2 flex items-center gap-2">
                  <DollarSign size={20} className="text-emerald-600" />
                  Future Publishers Monetization Projection Panel (Google AdSense Ready)
                </h3>
                <p className="text-xs text-gray-500 leading-normal mb-8 max-w-4xl">
                  Inspect simulated income projection parameters when this semantic SILO content layout ranks on standard Pakistani search volumes, utilizing standard digital advertisements and local sponsored blocks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-5 bg-white border border-gray-100 rounded-2xl">
                    <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">Estimated Monthly Volume</span>
                    <strong className="block text-2xl font-black text-gray-950 mt-1">45,000+</strong>
                    <span className="text-[9px] text-emerald-600 font-mono font-bold">Organic Search Clicks</span>
                  </div>

                  <div className="p-5 bg-white border border-gray-100 rounded-2xl">
                    <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">Average CPC Niche Value</span>
                    <strong className="block text-2xl font-black text-brand-blue mt-1">PKR 45.00</strong>
                    <span className="text-[9px] text-gray-505 font-mono">Per Transactional Click</span>
                  </div>

                  <div className="p-5 bg-white border border-gray-100 rounded-2xl">
                    <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">Estimated Monthly Ad Revenue</span>
                    <strong className="block text-2xl font-black text-emerald-600 mt-1">USD 650.00</strong>
                    <span className="text-[9px] text-emerald-600 font-mono font-bold">Compound Passive Income</span>
                  </div>

                  <div className="p-5 bg-white border border-gray-100 rounded-2xl">
                    <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">SGE Citation Rating</span>
                    <strong className="block text-2xl font-black text-amber-500 mt-1">94%</strong>
                    <span className="text-[9px] text-gray-500 font-mono">Direct AI Engine Preference</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Detailed Single-Article Reading Portal */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Main Content Block */}
            <div className="lg:col-span-8">
              <button
                onClick={() => setReadArticleSlug(null)}
                className="mb-8 font-mono text-xs font-bold text-gray-400 hover:text-brand-blue transition-colors uppercase tracking-widest flex items-center gap-1"
              >
                ← Back to Article list
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-brand-blue/5 text-brand-blue border border-brand-blue/10 rounded-full uppercase">
                  {activeArticle.categoryLabel}
                </span>
                <span className="text-xs text-gray-405 font-mono">{activeArticle.date}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
                {activeArticle.title}
              </h1>

              {/* Quick interactive sharing widgets */}
              <div className="flex gap-4 border-y border-gray-100 py-4 mb-6 text-xs text-gray-500 font-mono font-bold flex-wrap items-center">
                <span>Author: Fazal Shahid Latif</span>
                <span>•</span>
                <span>Type: Exhaustive SILO Guide</span>
                <span>•</span>
                <button 
                  onClick={() => handleLike(activeArticle.slug)}
                  className={`flex items-center gap-1 ${likedArticles[activeArticle.slug] ? 'text-rose-500' : 'hover:text-rose-500'}`}
                >
                  <Heart size={14} className={likedArticles[activeArticle.slug] ? 'fill-rose-500' : ''} />
                  {likedArticles[activeArticle.slug] ? 'Saved to Favorites' : 'Save to Favorites'}
                </button>
              </div>

              {/* Primary Featured Image with Google Image Indexing Rules Compliance */}
              <figure className="my-8 rounded-3xl overflow-hidden border border-gray-150 bg-gray-50 shadow-sm" id="featured-article-hero-image">
                <img
                  src={activeArticle.featuredImage.url}
                  alt={activeArticle.featuredImage.alt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={activeArticle.featuredImage.width}
                  height={activeArticle.featuredImage.height}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/9] object-cover"
                />
                {activeArticle.featuredImage.caption && (
                  <figcaption className="p-3.5 text-center text-xs text-gray-500 font-mono border-t border-gray-100 bg-white/80 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>
                    <span>{activeArticle.featuredImage.caption}</span>
                  </figcaption>
                )}
              </figure>

              {/* Injected Article JSON-LD Structured Data */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": activeArticle.title,
                    "description": activeArticle.excerpt,
                    "image": [activeArticle.featuredImage.url],
                    "datePublished": "2026-06-03",
                    "dateModified": "2026-06-04",
                    "author": {
                      "@type": "Person",
                      "name": "Fazal Shahid Latif",
                      "jobTitle": "Lead Solutions Architect & Systems Engineer",
                      "url": "https://mentorarena.com"
                    },
                    "publisher": {
                      "@type": "EducationalOrganization",
                      "name": "Mentor Arena",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://mentorarena.com/logo_placeholder.svg"
                      }
                    },
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": typeof window !== 'undefined' ? window.location.href : `https://mentorarena.com/blog/${activeArticle.slug}`
                    }
                  })
                }}
              />

              {/* Rich rendered body text */}
              <div 
                className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6 text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: activeArticle.content }}
              />

              {/* Inner Article Mock AdSense Display */}
              {enableAdsMode && (
                <div className="my-10 p-6 bg-slate-50 border border-dashed border-gray-200 rounded-3xl text-center relative overflow-hidden group">
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-gray-200 text-gray-500 text-[8px] font-mono rounded uppercase font-bold tracking-wider">Dynamic In-Line Ad Unit</div>
                  <div className="py-4">
                    <span className="block text-xs font-bold text-gray-400 font-mono uppercase tracking-widest mb-1">Simulated Ads Block: Hostinger PK Hosting Deals</span>
                    <p className="text-sm font-bold text-gray-900 mb-4">Turbocharge your portfolio projects! Get ultra-responsive cloud node services starting from PKR 599.</p>
                    <a href="https://hostinger.pk" target="_blank" rel="noopener" className="px-6 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold font-mono uppercase tracking-widest hover:bg-opacity-90">Host Your Web App Today</a>
                  </div>
                </div>
              )}

              {/* Return CTA */}
              <div className="border-t border-gray-100 pt-8 mt-12 flex justify-between items-center gap-4 flex-wrap">
                <button
                  onClick={() => setReadArticleSlug(null)}
                  className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm"
                >
                  Return to Blog Hub
                </button>
                <button
                  onClick={onBookCall}
                  className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-opacity-95"
                >
                  Book Priority Clarity Session
                </button>
              </div>
            </div>

            {/* Right Sidebar Columns */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* AdSense Square Ad block */}
              {enableAdsMode && (
                <div className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-3xl text-center relative overflow-hidden">
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-gray-200 text-gray-500 text-[8px] font-mono rounded uppercase font-bold tracking-wider">Sponsored Sidebar Ad</div>
                  <div className="pt-6 pb-2 space-y-4">
                    <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-2xl flex items-center justify-center mx-auto">
                      <Compass size={28} />
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-900 font-bold uppercase tracking-tight">Need Foreign Client Leads?</strong>
                      <p className="text-xs text-gray-500 mt-1">Get our complete Direct Client Acquisition blueprint and bypass Upwork competitions safely.</p>
                    </div>
                    <button onClick={onBookCall} className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider">Claim Free Consultation Guide</button>
                  </div>
                </div>
              )}

              {/* Structured SILO Linking Map Widget */}
              <div className="p-6 bg-blue-50/40 border border-blue-100 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 text-brand-blue">
                  <Shield size={18} />
                  <strong className="text-sm font-black text-gray-955 uppercase tracking-wider font-mono">Immaculate SILO Map</strong>
                </div>
                <p className="text-xs text-gray-600 leading-normal">
                  In compliance with search algorithm spiders, this article belongs to the <strong>"{activeArticle.categoryLabel}"</strong> content silo. It anchors relevance by linking supporting informational nodes back to parent course modules.
                </p>

                <div className="border-t border-blue-100/60 pt-3 space-y-2.5">
                  <span className="block text-[10px] text-gray-400 font-mono uppercase font-bold tracking-widest">Linked Semantic Nodes:</span>
                  {blogPosts
                    .filter(post => post.category === activeArticle.category && post.slug !== activeArticle.slug)
                    .map(post => (
                      <button
                        key={post.slug}
                        onClick={() => {
                          setReadArticleSlug(post.slug);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2.5 w-full text-left group p-1.5 rounded-xl hover:bg-blue-100/50 transition-colors"
                      >
                        <img 
                          src={post.featuredImage.url} 
                          alt={post.featuredImage.alt} 
                          loading="lazy"
                          decoding="async"
                          width={48}
                          height={32}
                          referrerPolicy="no-referrer"
                          className="w-12 h-9 object-cover rounded-lg shrink-0 border border-blue-150"
                        />
                        <span className="text-xs font-bold text-brand-blue group-hover:underline line-clamp-2 leading-tight">
                          {post.title}
                        </span>
                      </button>
                    ))}
                </div>
              </div>

              {/* GMB NAP consistency details card */}
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl space-y-3">
                <strong className="block text-xs uppercase tracking-wider text-gray-500 font-mono">NAP Structured Address:</strong>
                <p className="text-sm text-gray-900 font-bold font-mono">Mentor Arena</p>
                <p className="text-xs text-gray-555 leading-relaxed">
                  26/792 Cantt Bazar, Drigh Road, Karachi - 75350, Pakistan
                </p>
                <p className="text-xs text-gray-500 font-mono font-bold">+92 332 2137898</p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
