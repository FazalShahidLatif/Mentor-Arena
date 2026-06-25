import React from 'react';
import { motion } from 'motion/react';
import { Target, Search, Settings, Globe, ArrowRight, Shield, Database, Layout, CheckCircle2, XCircle, AlertTriangle, FileText, Sparkles, Copy, Check } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

// Clean, high-performance syllable counter heuristic
function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 2) return 1;
  // Handle silent 'e' at end
  if (word.endsWith('e')) {
    word = word.slice(0, -1);
  }
  // Count groups of consecutive vowels (aeiouy)
  const vowelMatches = word.match(/[aeiouy]+/g);
  return vowelMatches ? vowelMatches.length : 1;
}

// Custom Flesch Reading Ease Calculator
function calculateFleschReadingEase(text: string): number {
  const cleanText = text.replace(/Q:\s*|A:\s*/gi, '').trim();
  if (!cleanText) return 100;

  // Split into sentences using punctuation triggers
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length || 1;

  // Split into words
  const words = cleanText.split(/\s+/).filter(w => w.trim().length > 0);
  const wordCount = words.length || 1;

  // Accumulate syllables
  let syllableCount = 0;
  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (cleanWord) {
      syllableCount += countSyllables(cleanWord);
    }
  }

  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = syllableCount / wordCount;

  // Flesch Reading Ease standard formula
  let score = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
  
  // Constrain rating safely between 0% and 100%
  score = Math.max(0, Math.min(100, score));
  return Math.round(score);
}

interface SEOPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const SEOPage: React.FC<SEOPageProps> = ({ onBackToHome, onBookCall, selectedCity }) => {
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  // Tab State
  const [labTab, setLabTab] = React.useState<'gmb' | 'article'>('gmb');

  // GMB Lab state variables (Simple words, high readability >80% default)
  const [gmbDescription, setGmbDescription] = React.useState(
    "Grow your digital career with our direct 1-to-1 mentorship. We keep batches small and avoid crowded classes. Learn to build clean coding files. Master technical SEO structures. Design high-converting Figma prototypes. Build real SaaS apps under the guidance of our lead mentor Fazal Shahid Latif. Receive instant live feedback on your progress in real-time."
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
      text: "Grow your digital career with our direct 1-to-1 mentorship. We keep batches small and avoid crowded classes. Learn to build clean coding files. Master technical SEO structures. Design high-converting Figma prototypes. Build real SaaS apps under the guidance of our lead mentor Fazal Shahid Latif. Receive instant live feedback on your progress in real-time."
    }
  ];

  // GMB Real-time audits and analyzer metrics
  const hasUrl = /https?:\/\/\s*|www\.\s*|\b\w+\.(?:com|online|net|pk|org|edu|gov|info)\b/i.test(gmbDescription);
  const hasPhone = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/.test(gmbDescription) && gmbDescription.replace(/[^\d]/g, "").length >= 7;
  const hasPromo = /50%\s*off|discount|sale|promo|cheap|free\s*offer|pricing|price|usd|pkr/i.test(gmbDescription);

  const keyWordsFound = ["career coaching", "personalized mentoring", "professional growth", "mentorship", "small", "batches", "classes"].filter(kw => 
    gmbDescription.toLowerCase().includes(kw)
  );

  const highlightsUnique = ["1-to-1", "one-on-one", "1:1", "individual", "group classes", "crowded classes"].some(phrase => 
    gmbDescription.toLowerCase().includes(phrase)
  );

  // AI SEO & GEO Article Planner state variables
  const [primaryKeyword, setPrimaryKeyword] = React.useState("MERN Stack Mentorship Lahore");
  const [valueProp, setValueProp] = React.useState("1-to-1 customized mentoring bypasses overcrowded lecture halls.");
  const [h1Heading, setH1Heading] = React.useState("MERN Stack Mentorship Lahore: Elite 1-to-1 Web Development Guidance");
  const [quickAnswerText, setQuickAnswerText] = React.useState("Yes, you can secure first-page Google rankings and ChatGPT citations in 2026. Practical training depends on direct 1-to-1 optimization. We use simple Schema markups. Our custom curriculum has helped developers boost click-through rates by 35% in 14 weeks.");
  const [h2Text, setH2Text] = React.useState("2. The Direct 1-to-1 Coaching Advantage Over Massive Batches\nTypical programs pack dozens of students in one lecture hall. True system mastery is a dynamic science of instant code reviews. We teach you clear structural engineering with simple guidance. Over 92% of our graduates submit production apps to real Cloud instances.\nKEY TAKEAWAY: One-on-one custom reviews increase skill retention and boost execution speed by 3x.");
  const [faqText, setFaqText] = React.useState("Q: Is prior software layout coding required for this course?\nA: No, the curriculum tracks start with standard fundamentals. Everything is fully self-contained with no reference to secondary pages.");
  
  // Real-time dynamic Flesch Reading Ease calculations for active sandbox state
  const gmbReadability = calculateFleschReadingEase(gmbDescription);
  const articleDraftText = `${quickAnswerText} ${h2Text} ${faqText}`;
  const articleReadability = calculateFleschReadingEase(articleDraftText);

  const [copiedSchema, setCopiedSchema] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="seo-course-view">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="hover:text-brand-blue transition-colors">Home</a>
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
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl font-medium mb-8">
            Learn real, white-hat search optimization strategies to rank local Pakistani assets. Get direct mentorship from Fazal Shahid Latif and guest expert modules on live local audits. No slide decks—only raw console data, content silos, and real live rankings.
          </p>

          {/* Quick Answer Box (Above the fold for GEO and Google Featured Snippets) */}
          <div className="mb-10 p-6 bg-brand-blue/[0.03] border-2 border-brand-blue/20 rounded-3xl" id="quick-answer-above-fold">
            <div className="flex gap-2 items-center mb-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-xs font-mono text-brand-blue uppercase tracking-wider font-extrabold flex items-center gap-1">
                <Sparkles className="w-4 h-4 ml-1 text-brand-blue" /> Quick Answer Box (Google &amp; AI-Engine Extractable)
              </strong>
            </div>
            <p className="text-gray-950 leading-relaxed text-base font-semibold font-sans">
              Yes, you can rank #1 on Google and secure AI model citations in 2026. Practical SEO and Generative Engine Optimization (GEO) depend on structural answer nesting, 100% self-contained facts, schema-LD declaration, and direct 1-to-1 optimization. At Mentor Arena, graduates master these high-income techniques, boosting click-through-rates (CTR) by an average of 35% within 14 weeks.
            </p>
          </div>

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
          
          <section className="space-y-4" id="seo-section-1">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              1. Modern Search Engine Optimization &amp; Generative Engine Principles
            </h2>
            <p className="text-base">
              The balance of traditional SEO has changed. Securing high rankings is no longer a matter of keyword stuffing and low-quality links: over 40% of user clicks are shifting towards direct answers generated by AI platforms like ChatGPT, Gemini, Claude, and Google Search Generative Experience (SGE). To compete, modern websites need two parallel optimization paths: standard search engine compliance and GEO (Generative Engine Optimization) format architectures.
            </p>
            <p className="text-base">
              At <strong>Mentor Arena</strong>, we guide you behind the scenes of how crawlers and neural datasets query website content. You will learn how to build semantically organized pages, design custom schemas, deliver under 3.0 seconds mobile speeds, and formulate highly dense informational answers that both Google and AI engines love to cite and display.
            </p>
            <div className="p-5.5 bg-slate-50 border-l-4 border-brand-blue rounded-r-2xl font-sans my-4" id="key-takeaways-1">
              <strong className="block text-xs uppercase tracking-wider text-brand-blue font-mono font-bold mb-1">💡 KEY TAKEAWAY</strong>
              <p className="text-sm text-gray-950 leading-relaxed font-semibold">
                To maximize search visibility and click-through rates, you must structure your web pages so that AI LLMs and Google Crawlers can instantly extract self-contained fact pairs and citation credits.
              </p>
            </div>
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

            <div className="p-5.5 bg-slate-50 border-l-4 border-brand-blue rounded-r-2xl font-sans my-4" id="key-takeaways-2">
              <strong className="block text-xs uppercase tracking-wider text-brand-blue font-mono font-bold mb-1">💡 KEY TAKEAWAY</strong>
              <p className="text-sm text-gray-950 leading-relaxed font-semibold">
                Structuring your technical web assets around the four pillars of Semantics, Technical Site Health, Local MAP Pack optimization, and Real Console GSC Diagnostics improves CTR by up to 35%.
              </p>
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

            <div className="p-5.5 bg-slate-50 border-l-4 border-brand-blue rounded-r-2xl font-sans my-4" id="key-takeaways-3">
              <strong className="block text-xs uppercase tracking-wider text-brand-blue font-mono font-bold mb-1">💡 KEY TAKEAWAY</strong>
              <p className="text-sm text-gray-950 leading-relaxed font-semibold">
                Dominating regional map search spaces secures high-conversion local sales leads since more than 75% of local service queries result in direct phone calls or same-day physical actions.
              </p>
            </div>
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

            <div className="p-5.5 bg-slate-50 border-l-4 border-brand-blue rounded-r-2xl font-sans my-4" id="key-takeaways-4">
              <strong className="block text-xs uppercase tracking-wider text-brand-blue font-mono font-bold mb-1">💡 KEY TAKEAWAY</strong>
              <p className="text-sm text-gray-950 leading-relaxed font-semibold">
                Our structured 14-week curriculum matches technical site audits with live campaign executions, giving you a proven, ready-to-pitch professional portfolio for high-ticket remote retainers.
              </p>
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

          {/* Interactive Workspace: GMB or Article Planner */}
          <section className="p-6 md:p-10 bg-slate-50 border border-gray-200 rounded-[2.5rem] space-y-6" id="gmb-compliance-lab">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6 text-left">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-blue/10 text-brand-blue font-mono uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" /> Interactive SEO LABS
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
                  SEO &amp; GEO Compliance Sandbox Workspace
                </h2>
                <p className="text-sm text-gray-600 max-w-2xl">
                  Simulate GMB/GBP profile guidelines or draft fully optimized search articles adhering to strict SEO/GEO content templates.
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-gray-200/60 p-1 rounded-xl self-start md:self-center shrink-0">
                <button
                  onClick={() => setLabTab('gmb')}
                  className={`px-4 py-2 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 ${
                    labTab === 'gmb'
                      ? 'bg-white text-brand-blue shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" /> GMB Profile Lab
                </button>
                <button
                  onClick={() => setLabTab('article')}
                  className={`px-4 py-2 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 ${
                    labTab === 'article'
                      ? 'bg-white text-brand-blue shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" /> SEO/GEO Article Planner
                </button>
              </div>
            </div>

            {/* TAB CONTAINER 1: GMB PROFILE COUPLING */}
            {labTab === 'gmb' && (
              <div className="space-y-6">
                {/* Presets and selector buttons */}
                <div className="space-y-2 text-left">
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
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

                    {/* Live Readability Score Indicator below editor */}
                    <div className="p-3 bg-brand-blue/[0.02] border border-brand-blue/10 rounded-xl flex items-center justify-between text-xs" id="gmb-readability-bar">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${gmbReadability >= 80 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        <span className="font-bold text-gray-700">Flesch Reading Ease Score:</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono font-black text-sm ${gmbReadability >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {gmbReadability}%
                        </span>
                        <span className="text-gray-500 font-medium">
                          ({gmbReadability >= 80 ? 'Easy 80+ Passed' : 'Below 80. Make sentences shorter!'})
                        </span>
                      </div>
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
                            <span className="block text-sm font-bold text-gray-900 text-left">Relevant Keywords Index</span>
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
                            <span className="block text-sm font-bold text-gray-950 text-left">Unique Value Highlight</span>
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
                            <span className="block text-sm font-bold text-gray-950 text-left font-sans">Google GMB/GBP Terms Alignment</span>
                            <p className="text-xs text-gray-500">
                              Google policies strictly prohibit list links, web URLs, phone numbers, or promotional pricing / sales jargon in custom description boxes to maintain platform honesty.
                            </p>
                            
                            <div className="flex flex-col gap-1 mt-1.5">
                              {hasUrl && (
                                <span className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 font-medium font-sans">
                                  ❌ URL Link detected. (Website URLs violate description terms)
                                </span>
                              )}
                              {hasPhone && (
                                <span className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 font-medium font-sans">
                                  ❌ Direct phone number detected. (Phone digits violate Google guidelines here)
                                </span>
                              )}
                              {hasPromo && (
                                <span className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 font-medium font-sans">
                                  ❌ Promotional jargon / Sales deals detected (e.g. &quot;50% off&quot;, prices, or discounts).
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

                        {/* Check 4: Conversational Readability Score (80+) */}
                        <div className="flex items-start gap-3 border-t border-gray-100 pt-3" id="gmb-readability-check">
                          {gmbReadability >= 80 ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="block text-sm font-bold text-gray-950 text-left">Conversational Readability Standard (80+)</span>
                            <p className="text-xs text-gray-500">
                              Flesch index must be above 80% to ensure perfect comprehension by local audiences. Current: <strong className={gmbReadability >= 80 ? "text-emerald-700" : "text-amber-700 font-mono"}>{gmbReadability}%</strong>.
                            </p>
                            {gmbReadability < 80 && (
                              <span className="inline-block mt-1 text-[10px] text-amber-605 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                Try using shorter sentences or simpler words.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Score and status recap */}
                    <div className="pt-4 border-t border-gray-150 flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-[10px] text-gray-400 font-mono uppercase font-bold tracking-wider text-left">Estimated Compliance Score</span>
                        <strong className="text-2xl font-black text-gray-900">
                          {(() => {
                            let score = 100;
                            if (hasUrl) score -= 30;
                            if (hasPhone) score -= 30;
                            if (hasPromo) score -= 20;
                            if (keyWordsFound.length === 0) score -= 10;
                            if (!highlightsUnique) score -= 10;
                            if (gmbReadability < 80) score -= 15;
                            if (characterCount > 750 || characterCount === 0) score = 0;
                            return `${Math.max(0, score)}%`;
                          })()}
                        </strong>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        characterCount > 750 || hasUrl || hasPhone || hasPromo || gmbReadability < 80
                          ? "text-red-700 bg-red-50 border border-red-100"
                          : keyWordsFound.length > 0 && highlightsUnique
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                          : "text-amber-700 bg-amber-50 border border-amber-100"
                      }`}>
                        {characterCount > 750 ? "Out of Chars" : (hasUrl || hasPhone || hasPromo) ? "Violation Flagged" : gmbReadability < 80 ? "Low Readability" : (keyWordsFound.length > 0 && highlightsUnique) ? "Fully Compliant" : "Needs Improvement"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTAINER 2: AI SEO & GEO ARTICLE PLANNER */}
            {labTab === 'article' && (
              <div className="space-y-6">
                
                {/* Selector Templates */}
                <div className="space-y-2 text-left">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest font-mono font-sans">Select a Draft Template:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPrimaryKeyword("MERN Stack Mentorship Lahore");
                        setValueProp("1-to-1 customized mentoring bypasses overcrowded lecture halls.");
                        setH1Heading("MERN Stack Mentorship Lahore: Elite 1-to-1 Web Development Guidance");
                        setQuickAnswerText("Yes, you can secure first-page Google rankings and ChatGPT citations in 2026. Practical training depends on direct 1-to-1 optimization and Schema markups. Our custom curriculum has helped developers boost click-through rates (CTR) by an average of 35% within 14 weeks.");
                        setH2Text("2. The Direct 1-to-1 Coaching Advantage Over Massive Batches\nTypical programs pack dozens of students. True system mastery is a dynamic science of instant code reviews, structural engineering, and customized guidance. Over 92% of our graduates submit production apps to real Cloud instances.\nKEY TAKEAWAY: One-on-one custom reviews increase skill retention and boost execution speed by 3x.");
                        setFaqText("Q: Is prior software layout coding required for this course?\nA: No, the curriculum tracks start with standard fundamentals, making everything fully self-contained with no reference to secondary pages.");
                      }}
                      className="px-3.5 py-2 text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-all font-sans"
                    >
                      ✨ Fully Compliant SEO/GEO Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPrimaryKeyword("Best Dentist Clinic Karachi");
                        setValueProp("We have high tech equipment.");
                        setH1Heading("The Best Dentist Clinic Karachi and Orthodontics for All Your Teeth Problems with Great Care and High Satisfaction");
                        setQuickAnswerText("We are the best dentist clinic in Karachi with many years of experience. We offer services like scaling, root canals, and metal braces. Come check out our teeth center today where our team loves to offer free scaling.");
                        setH2Text("Teeth Care is very important for all people.\nPlease do call us at any time to receive further instructions.");
                        setFaqText("Q: What is your clinic schedule?\nA: We are open from 9 AM to 9 PM daily, offering general treatments as we previously discussed on our homepage.");
                      }}
                      className="px-3.5 py-2 text-xs font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 rounded-xl hover:bg-rose-100 transition-all font-sans font-medium"
                    >
                      ❌ Flabby / Unoptimized Copy (Stuffing &amp; No stats)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Inputs Column */}
                  <div className="lg:col-span-7 space-y-4 text-left">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">Primary Search Keyword</label>
                        <input
                          type="text"
                          value={primaryKeyword}
                          onChange={(e) => setPrimaryKeyword(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-355 rounded-xl focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">Value Proposition</label>
                        <input
                          type="text"
                          value={valueProp}
                          onChange={(e) => setValueProp(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-355 rounded-xl focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">H1 Heading / Title Tag (Must be under 60 chars &amp; keyword front-loaded)</label>
                      <input
                        type="text"
                        value={h1Heading}
                        onChange={(e) => setH1Heading(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-355 rounded-xl focus:ring-2 focus:ring-brand-blue font-bold font-sans"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono font-bold text-gray-500 mb-1">
                        <label className="uppercase tracking-wider">Above-The-Fold Quick Answer Box (2-3 sentences with 1-2 stats)</label>
                        <span>{quickAnswerText.length} Chars</span>
                      </div>
                      <textarea
                        rows={3}
                        value={quickAnswerText}
                        onChange={(e) => setQuickAnswerText(e.target.value)}
                        className="w-full p-3 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">H2 Section &amp; Copy (Must end with &#39;KEY TAKEAWAY: [One sentence insight]&#39;)</label>
                      <textarea
                        rows={4}
                        value={h2Text}
                        onChange={(e) => setH2Text(e.target.value)}
                        className="w-full p-3 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-1">FAQ Module Row (Q&amp;A format, self-contained answer, no fluff references)</label>
                      <textarea
                        rows={3}
                        value={faqText}
                        onChange={(e) => setFaqText(e.target.value)}
                        className="w-full p-3 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue font-mono"
                      />
                    </div>

                    {/* Live Readability Score Indicator below the editor panels */}
                    <div className="p-3 bg-brand-blue/[0.02] border border-brand-blue/10 rounded-xl flex items-center justify-between text-xs mt-4" id="article-readability-bar">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${articleReadability >= 80 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        <span className="font-bold text-gray-700">Combined Draft Readability (Goal: 80+):</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono font-black text-sm ${articleReadability >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {articleReadability}%
                        </span>
                        <span className="text-gray-500 font-medium font-sans">
                          ({articleReadability >= 80 ? 'Comprehensible / Easy' : 'Hard. Keep sentences shorter!'})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Audits & Schema Column */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Live Auditing checklist */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 text-left space-y-4">
                      <strong className="block text-xs uppercase tracking-wider text-gray-400 font-mono">GEO Search Compliance Scorecard</strong>
                      
                      {/* Grid lists */}
                      <div className="space-y-3.5">
                        {/* H1 Frontloaded Check */}
                        <div className="flex items-start gap-2 text-xs">
                          {h1Heading.toLowerCase().includes(primaryKeyword.toLowerCase()) ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold text-gray-900 block font-sans text-left">Keyword Front-Loaded in Title</span>
                            <span className="text-gray-500 font-sans text-left block">H1 should contain &quot;{primaryKeyword}&quot; prominently.</span>
                          </div>
                        </div>

                        {/* Title Length Check */}
                        <div className="flex items-start gap-2 text-xs">
                          {h1Heading.length <= 60 ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold text-gray-900 block font-sans text-left">Title Length Optimiser (≤60 Chars)</span>
                            <span className="text-gray-500 font-sans text-left block">Currently: <strong className={h1Heading.length <= 60 ? "text-emerald-700" : "text-amber-700 font-mono"}>{h1Heading.length} chars</strong>. Google truncates tags above 60 chars.</span>
                          </div>
                        </div>

                        {/* Quick Answer Box sentence count */}
                        {(() => {
                          const sentenceCount = quickAnswerText.split(/[.?!]+/).filter(s => s.trim().length > 4).length;
                          const hasMetric = /\d+/.test(quickAnswerText);
                          const passes = sentenceCount >= 2 && sentenceCount <= 3 && hasMetric;
                          return (
                            <div className="flex items-start gap-2 text-xs">
                              {passes ? (
                                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                              ) : (
                                <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="font-bold text-gray-900 block font-sans text-left font-sans">Quick Answer Format &amp; Metrics</span>
                                <span className="text-gray-500 font-sans text-left block">
                                  Should be 2-3 sentences with at least one key metric (number). Detected:{" "}
                                  <strong>{sentenceCount} sentences</strong>, metric count:{" "}
                                  <strong>{hasMetric ? "✓ Passed" : "✗ Missing"}</strong>.
                                </span>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Key Takeaway box format */}
                        {(() => {
                          const hasTakeaway = /KEY TAKEAWAY:/i.test(h2Text);
                          return (
                            <div className="flex items-start gap-2 text-xs">
                              {hasTakeaway ? (
                                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="font-bold text-gray-900 block font-sans text-left">H2 Key Takeaway Callout Box</span>
                                <span className="text-gray-500 font-sans text-left block">
                                  Section body must include standard &#39;KEY TAKEAWAY: [sentence]&#39;.
                                </span>
                              </div>
                            </div>
                          );
                        })()}

                        {/* FAQ and fluff check */}
                        {(() => {
                          const hasQA = faqText.toLowerCase().includes("q:") && faqText.toLowerCase().includes("a:");
                          const hasFluff = /mentioned above|as stated before|previously discussed|this page/i.test(faqText);
                          const passes = hasQA && !hasFluff;
                          return (
                            <div className="flex items-start gap-2 text-xs">
                              {passes ? (
                                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                              ) : (
                                <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="font-bold text-gray-900 block font-sans text-left font-sans">FAQ No-Fluff Integrity</span>
                                <span className="text-gray-500 font-sans text-left block">
                                  Self-contained answer with zero back-referencing fluff (No &#39;as mentioned above&#39;).{" "}
                                  <strong>{hasFluff ? "⚠️ Found fluff terms" : "✓ Safe"}</strong>.
                                </span>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Check 6: Conversational Readability Score (80+) */}
                        <div className="flex items-start gap-2 text-xs border-t border-gray-100 pt-3" id="article-readability-check">
                          {articleReadability >= 80 ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold text-gray-900 block font-sans text-left">Conversational Readability Standard (80+)</span>
                            <span className="text-gray-500 font-sans text-left block">
                              Must rank above 80 on the Flesch scale. Detected: <strong className={articleReadability >= 80 ? "text-emerald-700 font-mono" : "text-amber-700 font-mono"}>{articleReadability}%</strong>.
                            </span>
                            {articleReadability < 80 && (
                              <span className="inline-block mt-1 text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100 font-sans">
                                Keep sentences crisp to help local readers.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Cumulative Score */}
                      <div className="pt-3 border-t border-gray-150 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-gray-400">ARTICLE GEO GRADE</span>
                        {(() => {
                          let score = 100;
                          if (!h1Heading.toLowerCase().includes(primaryKeyword.toLowerCase())) score -= 25;
                          if (h1Heading.length > 60) score -= 15;
                          const sentenceCount = quickAnswerText.split(/[.?!]+/).filter(s => s.trim().length > 4).length;
                          const hasMetric = /\d+/.test(quickAnswerText);
                          if (sentenceCount < 2 || sentenceCount > 3 || !hasMetric) score -= 20;
                          if (!/KEY TAKEAWAY:/i.test(h2Text)) score -= 20;
                          if (/mentioned above|as stated before|previously discussed/i.test(faqText)) score -= 20;
                          if (articleReadability < 80) score -= 15;
                          const displayScore = Math.max(0, score);
                          return (
                            <strong className={`text-xl font-black ${displayScore === 100 ? "text-emerald-600" : displayScore >= 60 ? "text-amber-600" : "text-red-600"}`}>
                              {displayScore === 100 ? "👑 Rank Ready (100%)" : `${displayScore}%`}
                            </strong>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Live generated Schema markups */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 text-left relative">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[10px] font-mono font-extrabold text-[#38bdf8] uppercase tracking-wider">
                          Auto-Generated JSON-LD Structured Schema Graph
                        </span>
                        <button
                          onClick={() => {
                            const qText = faqText.split(/a:/i)[0]?.replace(/^q:\s*/i, '').trim() || "";
                            const aText = faqText.split(/a:/i)[1]?.trim() || "";
                            const code = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "${h1Heading.replace(/"/g, '\\"')}",
      "description": "${quickAnswerText.replace(/"/g, '\\"')}",
      "author": {
        "@type": "Person",
        "name": "Fazal Shahid Latif"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "${qText.replace(/"/g, '\\"')}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${aText.replace(/"/g, '\\"')}"
          }
        }
      ]
    }
  ]
}
</script>`;
                            navigator.clipboard.writeText(code);
                            setCopiedSchema(true);
                            setTimeout(() => setCopiedSchema(false), 2000);
                          }}
                          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-all flex items-center gap-1 text-[10px] font-mono font-bold"
                          title="Copy JSON-LD"
                        >
                          {copiedSchema ? <Check className="w-3" /> : <Copy className="w-3" />}
                          {copiedSchema ? "Copied!" : "Copy Segment"}
                        </button>
                      </div>

                      {/* Displaying raw JSON-LD structure nicely in jetbrains mono */}
                      <pre className="text-[11px] text-slate-300 font-mono max-h-[170px] overflow-y-auto leading-relaxed scrollbar-thin">
                        <code>{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "${h1Heading.replace(/"/g, '\\"')}",
      "description": "${quickAnswerText.replace(/"/g, '\\"')}"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "${faqText.split(/a:/i)[0]?.replace(/^q:\s*/i, '').trim() || "What is the training standard?"}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${faqText.split(/a:/i)[1]?.trim() || "Fully self-contained 1-to-1 customized curriculum."}"
          }
        }
      ]
    }
  ]
}`}</code>
                      </pre>
                    </div>

                  </div>
                </div>
              </div>
            )}

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
