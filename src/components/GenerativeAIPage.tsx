import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Cpu, 
  Sparkles, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Code, 
  Layers, 
  Wallet, 
  ArrowRight, 
  PhoneCall, 
  Award, 
  ChevronDown, 
  Check, 
  Database,
  Brain,
  Workflow,
  Download,
  Users,
  HelpCircle,
  Briefcase,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  GraduationCap,
  Laptop,
  FileSpreadsheet,
  FileText,
  Palette,
  Globe,
  Sliders,
  Share2
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';
import { HeroBanner } from './HeroBanner';
import { TrackId } from './SyllabusViewerModal';
import heroGenAiImg from '../assets/images/hero_generative_ai_1786510052247.jpg';

interface GenerativeAIPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
  onNavigate?: (path: string) => void;
  onOpenSyllabus?: (track: TrackId) => void;
}

export const GenerativeAIPage: React.FC<GenerativeAIPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity,
  onNavigate,
  onOpenSyllabus
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const navigateTo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = path;
    }
  };

  const modules = [
    {
      week: "Weeks 1–2",
      title: "Generative AI Foundations & Advanced Prompt Engineering",
      focus: "From Casual Chatting to Deterministic AI Output Engineering",
      topics: [
        "LLM internal mechanics: Transformers, Tokenization, Temperature, Top-P, Context Windows & Hallucination mitigation",
        "System Prompts architecture: Role conditioning, strict output formatting (JSON/YAML), and guardrails",
        "Advanced Prompting techniques: Chain-of-Thought (CoT), Few-Shot In-Context Learning, Tree-of-Thought, ReAct prompting",
        "Benchmarking leading frontier models: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek",
        "Cost optimization, token economics, latency reduction, and prompt caching strategies"
      ],
      milestone: "Build a Structured Multi-Stage Content & Code Generation Prompt Engine"
    },
    {
      week: "Weeks 3–5",
      title: "API Integration & Python / TypeScript AI Tooling",
      focus: "Programmatic AI Integrations in Real Software",
      topics: [
        "Connecting to OpenAI API, Google GenAI SDK (Gemini), and Anthropic Claude APIs programmatically",
        "Function Calling & Tool Use: Enabling LLMs to execute external APIs, query SQL databases, and call calculators",
        "Structured Outputs with Pydantic & Zod schemas: Ensuring 100% parseable JSON responses for backend systems",
        "Building multi-turn streaming conversational interfaces in Node.js / Python",
        "Error handling, rate limits, token exponential backoff retries, and API key security best practices"
      ],
      milestone: "Deploy an Interactive Full-Stack AI Chatbot with Live Function Calling & Tool Use"
    },
    {
      week: "Weeks 6–9",
      title: "RAG (Retrieval-Augmented Generation) & Vector Databases",
      focus: "Chat with Enterprise Documents & Custom Data Without Hallucinations",
      topics: [
        "Embeddings deep dive: Text-embedding-3, Voyage AI, and cosine similarity mathematical logic",
        "Document ingestion & Chunking strategies: Semantic chunking, recursive character splitters, and metadata tagging",
        "Vector Database architecture: Pinecone, ChromaDB, Weaviate, and PostgreSQL (pgvector)",
        "Building a production RAG pipeline: Query transformation, hybrid keyword + vector search, re-ranking (Cohere)",
        "Preventing knowledge contamination and evaluating RAG accuracy using Ragas metrics"
      ],
      milestone: "Production-Ready RAG System: Chat with 500+ Page Company Financial PDFs & Technical Docs"
    },
    {
      week: "Weeks 10–12",
      title: "Autonomous AI Agents & Multi-Agent Workflows",
      focus: "Building Autonomous Digital Workers That Plan, Iterate & Execute",
      topics: [
        "Agentic Architecture patterns: Planning, Reflection, Memory (Short-term & Long-term), and Execution loops",
        "Building AI agents with LangChain, LangGraph, LlamaIndex, and CrewAI frameworks",
        "Multi-Agent collaboration: Assigning specialized personas (e.g. Researcher, Writer, Reviewer, Coder)",
        "Integrating web search grounding (Google Search API / Tavily) and local file system manipulation",
        "Human-in-the-loop validation, step checkpoints, and state persistence"
      ],
      milestone: "Ship an Autonomous Market Research & Lead Generation Multi-Agent Team"
    },
    {
      week: "Weeks 13–14",
      title: "AI Product Deployment, Commercialization & Monetization",
      focus: "Packaging AI Apps into High-Value SaaS & Client Solutions",
      topics: [
        "Deploying AI applications on cloud platforms (Vercel, Railway, Modal, AWS Lambda / Cloud Run)",
        "Adding user authentication, usage quotas, rate limits, and Stripe / payment monetization logic",
        "Building custom enterprise AI automation workflows (Zapier + Make + AI webhooks)",
        "Pitching high-ticket AI automation services to local businesses and international Upwork clients ($50–$100/hr)",
        "Ethical AI guidelines, copyright compliance, and data privacy safeguards"
      ],
      milestone: "Live Deployed Custom AI SaaS Product with Authentication & Custom Domain"
    }
  ];

  const tools = [
    { name: "Google GenAI SDK (Gemini)", role: "Multimodal LLM & Vision", level: "Frontier Model Engine" },
    { name: "OpenAI API (GPT-4o)", role: "Function Calling & Schemas", level: "Core API Standard" },
    { name: "Anthropic Claude 3.5", role: "Coding & Reasoning", level: "Autonomous Logic" },
    { name: "LangChain & LangGraph", role: "Agent Cycles & State Graphs", level: "Orchestration Framework" },
    { name: "CrewAI", role: "Role-Playing Multi-Agent Crews", level: "Autonomous Swarms" },
    { name: "Pinecone / ChromaDB", role: "Vector Embeddings & RAG", level: "Semantic Storage" },
    { name: "FastAPI / Node.js", role: "AI Backend & Streaming", level: "Production API Server" },
    { name: "Cloud Run / Vercel", role: "Serverless Deployment", level: "Cloud Hosting" }
  ];

  const targetRoles = [
    { title: "AI Automation Consultant", salary: "$50 - $120 / hr", type: "Upwork & Global Founders", desc: "Build custom LLM workflows, automated email dispatchers, and CRM lead summarizers for international companies." },
    { title: "RAG & AI Integration Engineer", salary: "PKR 140k - 260k / mo", type: "Software Houses / Remote MNCs", desc: "Design high-speed vector retrieval pipelines, chat-with-PDF internal tools, and knowledge base search systems." },
    { title: "Autonomous Agent Architect", salary: "PKR 180k - 350k / mo", type: "FinTech & AI Startups", desc: "Orchestrate multi-agent LangGraph and CrewAI swarms that plan, code, audit, and execute complex business logic." },
    { title: "AI SaaS Founder / Micro-ISV", salary: "$1k - $8k / mo MRR", type: "Independent Product Maker", desc: "Build niche AI tools (summarizers, content engines, code assistants) with subscription billing and usage limits." }
  ];

  const relatedCourses = [
    {
      title: "MERN Stack Web Development",
      path: "/courses/web-development",
      badge: "Full-Stack Synergy",
      desc: "Master React, Node.js, Express, and MongoDB to wrap your AI models into scalable, secure full-stack web applications.",
      icon: Laptop,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "Advance Excel & Financial Modeling",
      path: "/courses/advance-excel",
      badge: "Data & Analytics",
      desc: "Combine LLM agents with Power Query and Excel automation to build automated corporate financial analysis pipelines.",
      icon: FileSpreadsheet,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      title: "UI/UX Design & Growth Marketing",
      path: "/courses/uiux-digital-marketing",
      badge: "Design AI Frontends",
      desc: "Design intuitive conversational interfaces, dark-mode AI canvases, and high-converting landing pages in Figma.",
      icon: Globe,
      color: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      title: "Office Automation (Word & PPT)",
      path: "/courses/office-automation",
      badge: "Executive Speed",
      desc: "Feed AI-generated insights into corporate Word templates, automated Mail Merges, and executive PowerPoint slide decks.",
      icon: FileText,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    }
  ];

  const faqs = [
    {
      q: "Do I need a PhD or advanced mathematical background in machine learning?",
      a: "No! Generative AI application engineering focuses on leveraging frontier foundation models (Gemini 1.5, GPT-4o, Claude 3.5) through API integration, vector databases, prompt architectures, and autonomous agent orchestration (LangGraph, CrewAI). Basic programming knowledge in Python or JavaScript is all you need—we teach you the rest step by step."
    },
    {
      q: "Are API tokens expensive during practice and development?",
      a: "Not at all. With modern hyper-efficient models like Gemini 1.5 Flash and GPT-4o-mini, practice costs are literally fractions of a cent per request. We also train you in prompt caching, token budgets, and local open-source models (Ollama/DeepSeek) so your entire 14-week development cost is practically negligible."
    },
    {
      q: "How does 1-to-1 mentorship work for Generative AI?",
      a: "You receive direct live screen-sharing instruction from veteran mentor Fazal Shahid Latif. Your mentor reviews your Python/Node.js code line by line, inspects your vector database embeddings, debugs agent infinite loops, and helps you architect production-grade RAG pipelines in real time."
    },
    {
      q: "Can I earn as an AI Automation freelancer on Upwork or Fiverr?",
      a: "Yes! High-ticket businesses worldwide are actively paying $50 to $120/hr for developers who can connect OpenAI or Gemini APIs to their internal databases, automate customer support via RAG, and orchestrate automated CrewAI researcher teams."
    },
    {
      q: "What are the admission requirements and installment schedule?",
      a: "Tuition is a transparent PKR 6,000 per month across the 14-week program (total 150 hours), payable via JazzCash Business or Zindigi Raast with zero hidden fees and a full 100% money-back guarantee after your first live orientation session."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24" id="generative-ai-page">
      {/* Dynamic SEO JSON-LD Course Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": `Generative AI & Autonomous Agent Engineering Course in ${citySuffix}`,
          "description": `Master Prompt Engineering, OpenAI & Gemini APIs, Vector Databases (Pinecone), RAG Architecture, LangChain, and CrewAI autonomous agents with 1-to-1 mentorship in ${citySuffix}.`,
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Mentor Arena",
            "sameAs": "https://mentorarena.online"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "duration": "P14W",
            "instructor": {
              "@type": "Person",
              "name": "Fazal Shahid Latif",
              "jobTitle": "Lead AI Systems Architect",
              "sameAs": "https://mentorarena.online/about"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": "6000",
            "priceCurrency": "PKR",
            "category": "Paid Education"
          }
        })
      }} />

      {/* Hero Section */}
      <HeroBanner 
        id="generative-ai-hero-banner"
        theme="purple"
        badge={{
          text: `🤖 150 Live Hours · 1-to-1 AI & Agent Engineering (${citySuffix})`,
          icon: Brain
        }}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigateTo('/') },
          { label: 'Courses', onClick: () => navigateTo('/courses') },
          { label: 'Generative AI & Agents' }
        ]}
        title={
          <>
            Generative AI &amp; Autonomous Agent Engineering in <span className="text-purple-400">{citySuffix}</span>
          </>
        }
        description={
          <>
            Move from a casual chatbot user to a high-earning AI Systems Architect. Master <strong>Advanced Prompt Engineering, OpenAI &amp; Gemini APIs, Vector Databases (Pinecone/Chroma), RAG Pipelines, LangGraph, and CrewAI Multi-Agent Swarms</strong> under 30+ year veteran systems mentor <strong>Fazal Shahid Latif</strong>. Strictly <strong>max 6 students per cohort</strong>.
          </>
        }
        stats={[
          { label: "Duration", value: "14 Weeks", subtext: "150 Live Hours" },
          { label: "Tuition", value: "PKR 6,000", subtext: "Monthly Plan" },
          { label: "Mentorship", value: "1-to-1", subtext: "Max 6 Students" },
          { label: "Cap Project", value: "Multi-Agent RAG", subtext: "Live SaaS Production" }
        ]}
        primaryCta={{
          text: "Enroll in AI Cohort (PKR 6,000/mo)",
          onClick: onBookCall
        }}
        secondaryCta={{
          text: "WhatsApp Fazal Shahid Latif",
          whatsappMessage: `Hi Mentor Arena, I want to enroll in the Generative AI & Autonomous Agent Engineering Course in ${citySuffix} (PKR 6,000/mo). Please share batch timings.`
        }}
        image={{
          src: heroGenAiImg,
          alt: "Generative AI, LLM RAG and Autonomous Agent Engineering Mentorship Pakistan with Fazal Shahid Latif",
          badgeText: "Autonomous Agents & RAG Shipped",
          badgeSubtext: "OpenAI · Gemini · LangChain · CrewAI"
        }}
      />

      {/* Silo Fast Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar text-xs font-semibold">
            <span className="text-gray-400 uppercase tracking-wider shrink-0 font-mono text-[11px]">Jump to:</span>
            <div className="flex items-center gap-2 shrink-0">
              <a href="#curriculum" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-purple-50 hover:text-purple-600 transition-colors">14-Week Curriculum</a>
              <a href="#deliverables" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-purple-50 hover:text-purple-600 transition-colors">Shipped Deliverables</a>
              <a href="#toolchain" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-purple-50 hover:text-purple-600 transition-colors">AI Stack &amp; Tools</a>
              <a href="#careers" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-purple-50 hover:text-purple-600 transition-colors">Career &amp; Freelancing</a>
              <a href="#pricing" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-purple-50 hover:text-purple-600 transition-colors">Tuition &amp; Payment</a>
              <a href="#faqs" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-purple-50 hover:text-purple-600 transition-colors">Course FAQs</a>
              <a href="#related" className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 font-bold border border-purple-200">Related Programs</a>
            </div>
            <button 
              onClick={onBookCall}
              className="ml-auto hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors shrink-0 shadow-xs"
            >
              <span>Enroll Now</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Syllabus, Value Prop & Deliverables */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Core Value Proposition */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full uppercase tracking-wider">
                Industrial-Grade AI Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight flex items-center gap-3">
                <Brain className="text-purple-600 shrink-0" size={30} />
                <span>Move from AI Consumer to AI Systems Architect</span>
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Typing casual prompts into a browser window is not a marketable engineering skill. Modern enterprises, global tech companies, and high-ticket freelance clients need developers who know how to connect LLMs to live vector databases, construct autonomous multi-agent loops, enforce deterministic JSON schemas, and deploy scalable cloud AI microservices.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
                  <Database className="text-purple-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Enterprise RAG Pipelines</h3>
                    <p className="text-xs text-gray-600 mt-1">Ground LLMs with vector search (Pinecone/pgvector) and hybrid re-ranking to query 500+ page private documents.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                  <Workflow className="text-emerald-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Autonomous Agent Swarms</h3>
                    <p className="text-xs text-gray-600 mt-1">Build multi-agent teams with CrewAI and LangGraph that autonomously plan, research, code, and execute business goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                  <Code className="text-blue-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Production APIs &amp; Schemas</h3>
                    <p className="text-xs text-gray-600 mt-1">Master OpenAI &amp; Gemini function calling with Pydantic/Zod structured outputs and streaming responses.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
                  <Briefcase className="text-amber-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">AI SaaS Deployment &amp; Upwork</h3>
                    <p className="text-xs text-gray-600 mt-1">Deploy full-stack AI SaaS apps with authentication, usage quotas, and pitch high-ticket automation gigs ($50–$120/hr).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div id="curriculum" className="space-y-6 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                    150 Live Instruction Hours
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mt-2">
                    14-Week Modular Deep Dive
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Structured progression from prompt engineering to production RAG &amp; autonomous agent swarms.</p>
                </div>
                {onOpenSyllabus && (
                  <button
                    onClick={() => onOpenSyllabus('generative-ai')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition-all shrink-0 cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Download Full Syllabus</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {modules.map((mod, index) => {
                  const isOpen = openModuleIndex === index;
                  return (
                    <div 
                      key={index}
                      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen ? 'border-purple-500 shadow-md ring-2 ring-purple-500/10' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? null : index)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono font-bold px-3 py-1.5 bg-purple-700 text-white rounded-xl shrink-0">
                            {mod.week}
                          </span>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-950">{mod.title}</h3>
                            <p className="text-xs text-purple-700 font-semibold">{mod.focus}</p>
                          </div>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-purple-600' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 border-t border-purple-100 bg-slate-50/50 space-y-4 animate-in fade-in duration-200">
                          <div>
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">Core Concepts Mastered:</h4>
                            <ul className="space-y-2.5">
                              {mod.topics.map((topic, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2.5 text-sm text-gray-700">
                                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-white p-4 rounded-xl border border-purple-100 flex items-center gap-3 mt-4">
                            <Award size={20} className="text-purple-600 shrink-0" />
                            <div className="text-xs text-gray-800">
                              <span className="font-bold text-gray-950">Shipped Milestone: </span>
                              {mod.milestone}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipped Deliverables Card */}
            <div id="deliverables" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 scroll-mt-28">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
                  Tangible AI Portfolio Assets
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 tracking-tight">
                  What You Will Build &amp; Deploy Live
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  You graduate with fully working, deployed production AI applications hosted on cloud infrastructure with complete GitHub documentation:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Enterprise Document RAG Pipeline</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Vector database embeddings, hybrid search, Cohere re-ranking, and real-time citation generation on 500+ page PDFs.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Autonomous Multi-Agent Crew</h4>
                    <p className="text-xs text-gray-600 mt-0.5">CrewAI &amp; LangGraph team with specialized personas (Researcher, Coder, Reviewer) executing autonomous research and reporting.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Live Deployed Custom AI SaaS Web App</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Hosted live on Vercel/Cloud Run with user authentication, database state, token usage rate limits, and billing hooks.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">AI Automation Consultant Portfolio</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Verified Upwork proposal templates, case study walkthroughs, and pitch decks for landing high-ticket clients ($50–$120/hr).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Software Stack & Toolchain */}
            <div id="toolchain" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-950 tracking-tight flex items-center gap-3">
                <Cpu className="text-purple-600" size={26} />
                <span>AI Engineering &amp; Software Toolchain Stack</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((tool, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-950">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.role}</div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-purple-700 shadow-xs">
                      {tool.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities & Salary Benchmarks */}
            <div id="careers" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 scroll-mt-28">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full uppercase tracking-wider">
                  High-Demand Market Careers
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 tracking-tight flex items-center gap-3">
                  <Briefcase className="text-purple-600" size={28} />
                  <span>Corporate Salaries &amp; Freelance Project Rates</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {targetRoles.map((role, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-gray-200 bg-slate-50/60 space-y-2">
                    <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">{role.type}</div>
                    <div className="text-base font-bold text-gray-950">{role.title}</div>
                    <div className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                      <Wallet size={16} />
                      <span>{role.salary}</span>
                    </div>
                    <p className="text-xs text-gray-600 pt-1 leading-relaxed">{role.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Verified Gateways */}
            <div id="pricing" className="p-8 md:p-10 bg-white rounded-3xl border-2 border-purple-600 shadow-xl scroll-mt-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                    100% Transparent Tuition
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 mb-2 tracking-tight">
                    Tuition &amp; Installment Schedule
                  </h2>
                  <div className="flex items-baseline gap-2 my-4">
                    <span className="text-4xl sm:text-5xl font-black text-purple-700">PKR 6,000</span>
                    <span className="text-gray-500 font-semibold text-sm">/ month (14 Weeks)</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    Structured into affordable monthly installments. Includes 150 hours of live 1-to-1 screen coding, private GitHub repositories, API architecture reviews, and lifelong WhatsApp mentor access.
                  </p>

                  <div className="space-y-2.5 text-xs text-gray-700">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Full Refund Guarantee after the first live orientation</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct 1-to-1 screen code reviews with Fazal Shahid Latif</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Cost-saving local model setup (Ollama/DeepSeek) &amp; API budget coaching</span>
                    </div>
                  </div>
                </div>

                {/* Local Payment Gateways Box */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 space-y-4">
                  <h3 className="font-bold text-gray-950 text-sm flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-purple-700" />
                    <span>Official Verified Gateways</span>
                  </h3>
                  <p className="text-xs text-gray-600">
                    Tuition fee of <strong>PKR 6,000</strong> can be paid instantly via local wallets or international remittance:
                  </p>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 bg-white rounded-xl border border-red-200">
                      <div className="flex justify-between items-center text-red-700 font-bold mb-1">
                        <span>JazzCash Business:</span>
                        <span>03322137898</span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-sans">Title: Fazal Shahid Latif</div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-emerald-200">
                      <div className="flex justify-between items-center text-emerald-800 font-bold mb-1">
                        <span>Zindigi (JS Bank / Raast):</span>
                        <span>03322137898</span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-sans">Title: Fazal Shahid Latif (0% Raast Fee)</div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={onBookCall}
                      className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all text-center text-sm shadow-md cursor-pointer"
                    >
                      Book Free 15-Min Clarity Call
                    </button>
                    <p className="text-[11px] text-center text-gray-500 italic">
                      After payment, send receipt screenshot on WhatsApp to <strong>0332 2137898</strong> for immediate batch seat reservation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course FAQs */}
            <div id="faqs" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight flex items-center gap-3">
                <HelpCircle className="text-purple-600" size={28} />
                <span>Frequently Asked Questions — Generative AI Track</span>
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-2">
                    <h3 className="text-sm font-bold text-gray-950">{faq.q}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* HIGH-VALUE SEO SILO INTERNAL LINKING CLUSTER */}
            <div id="related" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-8 scroll-mt-28">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full uppercase tracking-wider">
                  Complete Learning Pathway
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 tracking-tight">
                  Related Programs &amp; Complementary Skill Tracks
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Multiply your engineering market value by combining Generative AI with full-stack development, data modeling, UI/UX design, and office automation:
                </p>
              </div>

              {/* Related Courses Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCourses.map((course, idx) => {
                  const Icon = course.icon;
                  return (
                    <div 
                      key={idx}
                      onClick={() => navigateTo(course.path)}
                      className="p-5 rounded-2xl border border-gray-200 bg-slate-50/50 hover:bg-white hover:border-purple-400 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${course.color}`}>
                            {course.badge}
                          </span>
                          <Icon size={18} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                        <h3 className="font-bold text-base text-gray-950 group-hover:text-purple-600 transition-colors flex items-center gap-1.5">
                          <span>{course.title}</span>
                          <ArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {course.desc}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center text-xs font-bold text-purple-600 gap-1 mt-2">
                        <span>View Program Curriculum</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Target Audience Portals Cross-Linking */}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
                  <GraduationCap className="text-purple-600" size={20} />
                  <span>Personalized Pathways for Different Learners</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => navigateTo('/audiences/students')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-gray-950 group-hover:text-purple-600 flex items-center justify-between">
                      <span>For College Students</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Build cutting-edge AI apps &amp; land high-paying remote internships before graduating.</p>
                  </button>

                  <button
                    onClick={() => navigateTo('/audiences/parents')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-gray-950 group-hover:text-purple-600 flex items-center justify-between">
                      <span>For Concerned Parents</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">100% verified 1-to-1 mentorship with transparent weekly milestone progress updates.</p>
                  </button>

                  <button
                    onClick={() => navigateTo('/audiences/employers')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-gray-950 group-hover:text-purple-600 flex items-center justify-between">
                      <span>For Tech Employers</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Hire job-ready AI engineers trained in LangGraph, RAG pipelines, and vector DBs.</p>
                  </button>
                </div>
              </div>

              {/* Related Knowledge Base Blog Cross-Links */}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
                  <BookOpen className="text-purple-600" size={20} />
                  <span>Free Guides &amp; Industry Playbooks</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => navigateTo('/blog/receiving-foreign-remittances-pakistan-alternatives-paypal')}
                    className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-gray-900 group-hover:text-purple-600">Receiving Foreign AI Client Payments in Pakistan</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">How to withdraw Upwork and AI consulting fees via Payoneer, Wise &amp; Raast.</div>
                  </button>

                  <button
                    onClick={() => navigateTo('/blog/remote-react-developer-job-lahore-karachi')}
                    className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-gray-900 group-hover:text-purple-600">Landing High-Paying Remote AI Developer Jobs</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Portfolio frameworks to secure $1,500+ monthly remote contracts from US/UK startups.</div>
                  </button>
                </div>
              </div>

              {/* Core Site Pages Navigation */}
              <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-gray-600">
                <div className="flex flex-wrap items-center gap-4">
                  <button onClick={() => navigateTo('/about')} className="hover:text-purple-600 transition-colors cursor-pointer">About Fazal Shahid Latif</button>
                  <span>·</span>
                  <button onClick={() => navigateTo('/pricing')} className="hover:text-purple-600 transition-colors cursor-pointer">All Tuition Fees</button>
                  <span>·</span>
                  <button onClick={() => navigateTo('/reviews')} className="hover:text-purple-600 transition-colors cursor-pointer">Student Reviews &amp; Case Studies</button>
                  <span>·</span>
                  <button onClick={() => navigateTo('/faq')} className="hover:text-purple-600 transition-colors cursor-pointer">General FAQs</button>
                  <span>·</span>
                  <button onClick={() => navigateTo('/contact')} className="hover:text-purple-600 transition-colors cursor-pointer">Contact Admissions</button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Enrollment Card, Tuition & Mentor Bio */}
          <div className="space-y-8">
            
            {/* Enrollment Action Card */}
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-600 shadow-xl space-y-6 sticky top-28">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  Admission Open · 2026 Cohort
                </span>
                <h3 className="text-2xl font-black text-gray-950">Generative AI &amp; Agents</h3>
                <p className="text-xs text-gray-500">14-Week Live Mentorship (150 Hours) · Max 6 Students</p>
              </div>

              <div className="p-5 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-1">
                <div className="text-xs font-semibold text-gray-600">Monthly Tuition Installment</div>
                <div className="text-3xl font-black text-purple-700">PKR 6,000 <span className="text-sm font-medium text-gray-500">/ month</span></div>
                <div className="text-[11px] text-gray-500 font-medium pt-1">Total 14-Week Program Duration · 0% Interest Installments</div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Direct 1-to-1 screen reviews with Fazal Shahid Latif</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>OpenAI &amp; Gemini APIs with structured JSON schemas</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Production RAG pipelines with Pinecone &amp; ChromaDB</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Autonomous multi-agent teams with CrewAI &amp; LangGraph</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Verified payment via JazzCash &amp; Zindigi Raast</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <button
                  onClick={onBookCall}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall size={18} />
                  <span>Book Free 15-Min Clarity Call</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hello%20Mentor%20Arena,%20I%20would%20like%20to%20enroll%20in%20the%20Generative%20AI%20%26%20Autonomous%20Agent%20Engineering%20Course%20in%20${citySuffix}%20(PKR%206,000/mo).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enroll via WhatsApp (0332 2137898)</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-gray-500">
                  Official Account Holder: <span className="font-bold text-gray-800">{BUSINESS_INFO.accountHolder}</span>
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  JazzCash / Zindigi Raast ID: <span className="font-bold text-gray-800">{BUSINESS_INFO.formattedPhone}</span>
                </p>
              </div>
            </div>

            {/* Lead Mentor Profile Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-700 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                  FSL
                </div>
                <div>
                  <h4 className="font-bold text-gray-950 text-base">Fazal Shahid Latif</h4>
                  <p className="text-xs text-purple-700 font-bold">Lead Mentor &amp; Systems Architect</p>
                  <p className="text-[11px] text-gray-500">30+ Years Industrial Engineering Lineage</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                "Modern AI is not about memorizing magic prompts—it is software architecture. When you master deterministic schemas, vector chunking, and multi-agent state machines, you build software that operates autonomously at scale."
              </p>
              <button 
                onClick={() => navigateTo('/about')}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full Mentor Profile</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
