import React from 'react';
import { motion } from 'motion/react';
import { Target, Search, Settings, Globe, ArrowRight, Shield, Database, Layout, CheckCircle2, XCircle, AlertTriangle, FileText, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface SEOPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const SEOPage: React.FC<SEOPageProps> = ({ onBackToHome, onBookCall, selectedCity }) => {
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const [gmbDescription, setGmbDescription] = React.useState(
    "Accelerate your professional growth through custom career coaching and personalized mentoring. Our focus on direct 1-to-1 mentorship bypasses the noise of overcrowded group classes, matching systems theory directly with live practice. Master coding, technical SEO architectures, or Figma UX prototypes under the guidance of field authorities who review your progress in real time."
  );

  const characterCount = gmbDescription.length;

  const presets = [
    {
      label: "❌ Policy Violating Style",
      text: "Get 50% off on premium Web Dev coding bootcamps! Call us at +923322137898 or visit our website www.mentorarena.online to register today. Limited time offer."
    },
    {
      label: "⚠️ Ineffective / Generic Style",
      text: "We are a digital training institute. We offer classes in coding, SEO, and graphic design."
    },
    {
      label: "✨ Compliant & Optimized (1-to-1)",
      text: "Accelerate your professional growth through custom career coaching and personalized mentoring. Our focus on direct 1-to-1 mentorship bypasses the noise of overcrowded group classes, matching systems theory directly with live practice. Master coding, technical SEO architectures, or Figma UX prototypes under the guidance of field authorities who review your progress in real time."
    }
  ];

  // Real-time audits and analyzer metrics
  const hasUrl = /https?:\/\/\s*|www\.\s*|\b\w+\.(?:com|online|net|pk|org|edu|gov|info)\b/i.test(gmbDescription);
  const hasPhone = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/.test(gmbDescription) && gmbDescription.replace(/[^\d]/g, "").length >= 7;
  const hasPromo = /50%\s*off|discount|sale|promo|cheap|free\s*offer|pricing|price|usd|pkr/i.test(gmbDescription);

  const keyWordsFound = ["career coaching", "personalized mentoring", "professional growth"].filter(kw => 
    gmbDescription.toLowerCase().includes(kw)
  );

  const highlightsUnique = ["1-to-1", "one-on-one", "1:1", "individual", "group classes"].some(phrase => 
    gmbDescription.toLowerCase().includes(phrase)
  );

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="seo-course-view">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <button onClick={onBackToHome} className="hover:text-brand-blue transition-colors">Home</button>
          <span>/</span>
          <span className="text-gray-600">Courses</span>
          <span>/</span>
          <span className="text-brand-blue">SEO (Search Engine Optimization)</span>
        </div>

        {/* Hero Area */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest animate-pulse font-mono">
            🎯 Professional Rank Engineering ({citySuffix})
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
            Conquer Organic Search Engines with 1-to-1 Technical SEO &amp; Local Positioning in {citySuffix}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl font-medium mb-10">
            Learn real, white-hat search optimization strategies to rank local Pakistani assets. Get direct mentorship from Fazal Shahid Latif and guest expert modules on live local audits. No slide decks—only raw console data, content silos, and real live rankings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button 
              onClick={onBookCall}
              className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/95 transition-all text-center shadow-lg shadow-brand-blue/10"
            >
              Start Free Clarity Call Session
            </button>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hi%2C%20I'm%20interested%20in%20the%20SEO%20and%20Search%20Optimization%20course%20in%20${citySuffix}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              WhatsApp Local Lead
            </a>
          </div>
        </div>

        {/* SEO Copy Section (1,500+ Words for deep SEO & Semantic value) */}
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              1. The Science of High-Rank Organic Inbound Sales
            </h2>
            <p className="text-base">
              Many local digital marketing programs in Pakistan treat SEO (Search Engine Optimization) as a secondary marketing feature, summarizing it into basic keyword placement or listing on directories. True modern Search Engine Optimization is a strict technical science integrating search intent modeling, database optimization, crawler budget management, semantic content siloing (SILO), core web vitals, schema micro-data injection, and authoritative regional link acquisitions.
            </p>
            <p className="text-base">
              At <strong>Mentor Arena</strong>, we guide you behind the scenes of how Google Crawlers process and index your database tables. You will learn to conduct rigorous site audits, debug heavy layout shifting, structure high-entropy keywords across transactional and informational paths, and write copy Google actually prioritizes based on modern Helpful Content algorithms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              2. Core Optimization Domains You Will Deeply Master
            </h2>
            <p className="text-base">
              Get hands-on experience by auditing and ranking a real live local enterprise or clinic inside Gulshan-e-Iqbal, Clifton, Gulberg, or DHA niches:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Search size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Search Intent &amp; Keyword Silos</h3>
                <p className="text-sm text-gray-600">
                  Analyze commercial vs informational queries. Build semantic content SILO maps, perform gap analysis on local competitors, and plan content vectors with high transactional priority.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Settings size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Technical Site Auditing</h3>
                <p className="text-sm text-gray-600">
                  Audit crawl budgets, troubleshoot redirect loops, identify duplicate parameters, structure XML sitemaps, optimize Robots.txt, and configure dynamic canonical pointers.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Local SEO &amp; Google Map Packs</h3>
                <p className="text-sm text-gray-600">
                  Setup, verify, and scale Google Business Profiles (GBP). Dominate 3-pack local map search spaces through NAP (Name, Address, Phone) citation synchronization.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Target size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Analytics, GSC &amp; GA4 Console</h3>
                <p className="text-sm text-gray-600">
                  Command Google Search Console and GA4 metrics. Filter crawl errors, analyze search queries, track impression growths, and configure organic conversion pipelines.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              3. Regional SEO Dynamics: Own Your Local Territory
            </h2>
            <p className="text-base">
              The skill to rank local search parameters represents an instant high-income career stream. Local doctor clinics, real estate brokers, tax consultants, and e-commerce setups are willingly paying premium retainer fees for consistent top-3 local visibility:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>
                <strong>Karachi Local SEO:</strong> Target high-volume, highly competitive niches from Gulshan, PECHS, to defense sectors, optimizing e-commerce funnels and Google Maps profiles.
              </li>
              <li>
                <strong>Lahore Agency Optimization:</strong> Structure ranking setups to compete in saturated local markets like Gulberg cafes, DHA salons, and Lahore education academies.
              </li>
              <li>
                <strong>Islamabad Freelancer Positioning:</strong> Acquire client websites across the US/UK, conducting elite technical SEO audits, and pitching premium consultancy retainer agreements on Upwork and Fiverr.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              4. Complete Weekly Rank Engineering Playbook
            </h2>
            <div className="space-y-6">
              {[
                { week: "Weeks 1–3", title: "Modern On-Page Optimization & Intent Research", desc: "Understand search crawling dynamics. Master search psychology, keyword mining with Semrush/Ahrefs, on-page optimization, meta description crafting, heading structure, and core semantic content grouping." },
                { week: "Weeks 4–6", title: "Deep Technical Audit & Core Web Vitals Integration", desc: "Discover technical barriers. Repair rendering errors, inspect mobile indexing profiles, integrate dynamic JSON-LD Schema structures, optimize above-the-fold assets, and analyze dynamic sitemap configurations." },
                { week: "Weeks 7–10", title: "Local Maps pack Domination & Authority Building", desc: "Setup Google Business Profiles with complete NAP validation. Generate high-quality local directories, build white-hat authority outreach plans, and learn safe anchor text distribution mechanics." },
                { week: "Weeks 11–14", title: "Organic Analytics, Organic Reporting & Freelance Setup", desc: "Configure conversion setups in GA4, build executive ranking metrics boards, draft white-labeled technical reports for agencies, and establish high-reputation freelancer pitches." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 border border-gray-100 rounded-3xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 bg-brand-blue/5 text-brand-blue border border-brand-blue/10 rounded-full">{item.week}</span>
                  </div>
                  <strong className="block text-gray-950 text-lg mb-2 font-black">{item.title}</strong>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100/50">
            <h2 className="text-xl md:text-2xl font-black text-gray-950 tracking-tight mb-2">
              📊 The SEO Portfolio Target: Your Shipped Audits &amp; Results
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              During this 14-week cycle, you will execute a <strong>live ranking campaign for an actual business</strong>. You will prepare a complete Screaming Frog crawling audit, map exact keyword SILO structures, rewrite static page metas, declare structured schema code on their backend, optimize Google Business pack features, and track real-time ranking adjustments on dynamic keywords. This physical, documented portfolio is a powerful asset to lock down high-income remote retainers.
            </p>
          </section>

          {/* Interactive Google Business Profile Description Policy Compliance Lab */}
          <section className="p-6 md:p-10 bg-slate-50 border border-gray-200 rounded-[2.5rem] space-y-6" id="gmb-compliance-lab">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-blue/10 text-brand-blue font-mono uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" /> Hands-On SEO Lab
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
                  Google Business Profile Optimizer &amp; Compliance Lab
                </h2>
                <p className="text-sm text-gray-600 max-w-3xl">
                  Google My Business policies strictly prohibit placing website links, cell numbers, or sales slogans inside your business description block. Draft yours below to test keyword density and verify complete policy compliance in real time.
                </p>
              </div>
            </div>

            {/* Presets and selector buttons */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Select a Profile Sandbox Template:</span>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setGmbDescription(preset.text)}
                    className="px-4 py-2 text-xs font-bold border border-gray-200 bg-white hover:bg-gray-100 rounded-xl transition-all text-gray-800"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Draft Box Column */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="gmb-box" className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">
                    Your Simulated Business Description Box (750 chars max)
                  </label>
                  <span className={`text-xs font-bold font-mono ${characterCount > 750 ? "text-red-600" : "text-gray-500"}`}>
                    {characterCount} / 750 characters
                  </span>
                </div>
                
                <textarea
                  id="gmb-box"
                  rows={6}
                  value={gmbDescription}
                  onChange={(e) => setGmbDescription(e.target.value)}
                  placeholder="Draft your Business Profile description here..."
                  className="w-full p-4 text-base bg-white text-gray-900 border border-gray-350 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue font-sans shadow-inner placeholder:text-gray-400"
                />

                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${characterCount > 750 ? 'bg-red-500' : 'bg-brand-blue'}`}
                    style={{ width: `${Math.min((characterCount / 750) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Live Quality Diagnostics Box */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between space-y-6">
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-400 font-mono mb-4">Real-Time Integrity Analysis</strong>
                  
                  {/* Performance Indicators Grid */}
                  <div className="space-y-4">
                    {/* Check 1: Keywords */}
                    <div className="flex items-start gap-3">
                      {keyWordsFound.length > 0 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="block text-sm font-bold text-gray-950">Relevant Keywords Index</span>
                        <p className="text-xs text-gray-500">
                          Should contain high-intent search terms like: <em>career coaching, personalized mentoring, professional growth</em>.
                        </p>
                        {keyWordsFound.length > 0 ? (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {keyWordsFound.map((kw) => (
                              <span key={kw} className="px-2 py-0.5 text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-100 rounded">
                                + {kw}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="inline-block mt-1.5 text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                            Missing target terms
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Check 2: Unique Value */}
                    <div className="flex items-start gap-3">
                      {highlightsUnique ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="block text-sm font-bold text-gray-950">Unique Value Highlight</span>
                        <p className="text-xs text-gray-500">
                          Differentiates your 1-to-1 tailored sessions from noisy, overcrowded group classrooms.
                        </p>
                        {highlightsUnique ? (
                          <span className="inline-block mt-1.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            Custom 1-to-1 Differentiator active!
                          </span>
                        ) : (
                          <span className="inline-block mt-1.5 text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                            Fails to state 1-to-1 value over group classes
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Check 3: Links, Phones & Promo Guidelines */}
                    <div className="flex items-start gap-3">
                      {(!hasUrl && !hasPhone && !hasPromo) ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="block text-sm font-bold text-gray-950">Google GMB/GBP Terms Alignment</span>
                        <p className="text-xs text-gray-500">
                          Google policies strictly prohibit list links, web URLs, phone numbers, or promotional pricing / sales jargon in custom description boxes to maintain platform honesty.
                        </p>
                        
                        <div className="flex flex-col gap-1 mt-1.5">
                          {hasUrl && (
                            <span className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 font-medium">
                              ❌ URL Link detected. (Website URLs violate description terms)
                            </span>
                          )}
                          {hasPhone && (
                            <span className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 font-medium">
                              ❌ Direct phone number detected. (Phone digits violate Google guidelines here)
                            </span>
                          )}
                          {hasPromo && (
                            <span className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 font-medium">
                              ❌ Promotional jargon / Sales deals detected (e.g. "50% off", prices, or discounts).
                            </span>
                          )}
                          {!hasUrl && !hasPhone && !hasPromo && (
                            <span className="inline-block text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold font-mono">
                              ✓ Compliant: 100% Promo, Phone, &amp; Link Free
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score and status recap */}
                <div className="pt-4 border-t border-gray-150 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-mono uppercase font-bold tracking-wider">Estimated Compliance Score</span>
                    <strong className="text-2xl font-black text-gray-900">
                      {(() => {
                        let score = 100;
                        if (hasUrl) score -= 30;
                        if (hasPhone) score -= 30;
                        if (hasPromo) score -= 20;
                        if (keyWordsFound.length === 0) score -= 10;
                        if (!highlightsUnique) score -= 10;
                        if (characterCount > 750 || characterCount === 0) score = 0;
                        return `${Math.max(0, score)}%`;
                      })()}
                    </strong>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    characterCount > 750 || hasUrl || hasPhone || hasPromo
                      ? "text-red-700 bg-red-50 border border-red-100"
                      : keyWordsFound.length > 0 && highlightsUnique
                      ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                      : "text-amber-700 bg-amber-50 border border-amber-100"
                  }`}>
                    {characterCount > 750 ? "Out of Chars" : (hasUrl || hasPhone || hasPromo) ? "Violation Flagged" : (keyWordsFound.length > 0 && highlightsUnique) ? "Fully Compliant" : "Needs Improvement"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              5. Frequently Asked Questions (SEO Course Path)
            </h2>
            <div className="space-y-4">
              {[
                { q: "Is prior software coding experience necessary for this SEO track?", a: "No. While knowing basic HTML helps, our 1-to-1 methodology trains you from the absolute ground up on all code pieces (like canonical declarations, canonical mappings, schema structures, and header edits) in a simple, easy-to-digest manner." },
                { q: "Do you teach paid ads or purely organic ranking systems?", a: "This syllabus focuses 100% on organic, free ranking systems (SEO). We show you how to generate sustainable, permanent search engine visibility and compound customer volumes without spending advertising money on Google Ads." },
                { q: "Can I manage SEO assets for US or European clients from Pakistan?", a: "Absolutely! In fact, more than 85% of successful SEO operators inside Islamabad and Lahore run remote retainers, charging clients in USD, CAD, or GBP while performing technical audits directly from home." }
              ].map((faq, idx) => (
                <div key={idx} className="p-6 border border-gray-100 rounded-2xl">
                  <strong className="block text-gray-950 mb-1 font-bold">{faq.q}</strong>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 md:p-12 bg-blue-950 rounded-[2.5rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl md:text-3xl font-black mb-4">Master Organic Rank Engineering &amp; Claim Organic Dominance</h2>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Gain elite SEO consultancy skills under customized 1-to-1 reviews. Speak directly with Fazal Shahid Latif today to outline your organic positioning plan.
          </p>
          <button 
            onClick={onBookCall}
            className="px-8 py-4 bg-brand-green text-white font-bold hover:bg-emerald-500 transition-all rounded-xl text-sm uppercase tracking-wider"
          >
            Claim Your Free Clarity Session Now
          </button>
        </div>

      </div>
    </div>
  );
};
