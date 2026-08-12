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
  Workflow
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';
import { HeroBanner } from './HeroBanner';
import heroGenAiImg from '../assets/images/hero_generative_ai_1786510052247.jpg';

interface GenerativeAIPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const GenerativeAIPage: React.FC<GenerativeAIPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity 
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

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

  return (
    <div className="bg-white text-gray-900 selection:bg-purple-600/10 selection:text-purple-900" id="generative-ai-course-view">
      
      {/* Full Width Hero Banner */}
      <HeroBanner
        id="generative-ai-hero-banner"
        theme="purple"
        badge={{
          text: `🤖 LLMs · RAG · LangGraph · CrewAI (${citySuffix})`,
          icon: Brain
        }}
        breadcrumbs={[
          { label: 'Home', onClick: onBackToHome },
          { label: 'Courses' },
          { label: 'Generative AI & Agent Engineering' }
        ]}
        title={
          <>
            Generative AI &amp; Autonomous Agent Engineering in <span className="text-purple-400">{citySuffix}</span>
          </>
        }
        description={
          <>
            Don’t just prompt chatbots—learn to architect autonomous AI agents, multi-modal RAG systems, and custom LLM applications. Master <strong>Advanced Prompt Engineering, OpenAI &amp; Gemini APIs, Vector Databases (Pinecone/Chroma), LangChain, CrewAI, and Automated Python AI Workflows</strong> under veteran systems architect <strong>Fazal Shahid Latif</strong>. Strictly 1-to-1 or max 6 students per batch.
          </>
        }
        stats={[
          { label: 'Duration', value: '14 Weeks', subtext: '150 Live Coding Hours' },
          { label: 'Tuition', value: 'PKR 6,000', subtext: 'Monthly Installment' },
          { label: 'Mentorship', value: '1-to-1', subtext: 'Max 6 Students' },
          { label: 'Cap Project', value: 'Multi-Agent', subtext: 'Live RAG Production' }
        ]}
        primaryCta={{
          text: 'Enroll in AI Cohort (PKR 6,000/mo)',
          onClick: onBookCall
        }}
        secondaryCta={{
          text: 'WhatsApp Fazal Shahid Latif',
          whatsappMessage: `Hi Mentor Arena, I want to join the Generative AI & Agent Engineering track in ${citySuffix}. Please share the admission details.`
        }}
        image={{
          src: heroGenAiImg,
          alt: `AI generated full-width hero banner visualizing autonomous multi-agent neural network workflows, LLM reasoning pipelines, and vector database embeddings for 1-to-1 mentorship in ${citySuffix} with Fazal Shahid Latif`,
          badgeText: 'Autonomous Multi-Agent Systems & RAG',
          badgeSubtext: 'LangChain, CrewAI, Pinecone & Gemini APIs'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Feature Grid */}
        <section className="my-16 p-8 md:p-12 bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full uppercase tracking-wider">
              Beyond Superficial Chatbots
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-4 tracking-tight">
              Move from AI Consumer to AI Systems Architect.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Typing casual questions into a chat window is not a high-earning skill. Modern tech companies and freelance clients need engineers who know how to connect LLMs to vector databases, build multi-agent autonomous loops, enforce deterministic JSON schemas, and deploy scalable cloud AI pipelines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Brain className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">RAG Architecture</h3>
                <p className="text-xs text-slate-300">Ground LLMs with vector search, embeddings, and re-ranking to chat accurately with massive private documents.</p>
              </div>
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Workflow className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">Autonomous AI Agents</h3>
                <p className="text-xs text-slate-300">Build autonomous multi-agent teams using CrewAI and LangGraph that research, write, code, and debug automatically.</p>
              </div>
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Code className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">Production AI APIs</h3>
                <p className="text-xs text-slate-300">Integrate OpenAI, Gemini, and Claude APIs with function calling, structured schemas, and cloud deployment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 14-Week Module Deep Dive */}
        <section className="my-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                14-Week Syllabus
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 mt-3 tracking-tight">
                Generative AI Curriculum (150 Live Hours)
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              Step-by-step code walkthroughs, private GitHub repositories, live API implementations, and weekly 1-to-1 code architecture reviews.
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((mod, idx) => {
              const isOpen = openModuleIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-purple-600 bg-purple-50/20 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-bold px-3 py-1.5 bg-purple-700 text-white rounded-xl shrink-0">
                        {mod.week}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-950">{mod.title}</h3>
                        <p className="text-xs text-purple-800 font-medium">{mod.focus}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180 text-purple-700' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-purple-100 bg-white/70 space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">Core Competencies Mastered:</h4>
                        <ul className="space-y-2">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-xl border border-purple-200/80 flex items-center gap-3">
                        <Award className="w-5 h-5 text-purple-700 shrink-0" />
                        <div className="text-xs text-purple-950 font-semibold">
                          <strong>Shipped Milestone:</strong> {mod.milestone}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Shipped Deliverables */}
        <section className="my-16 p-8 bg-slate-50 rounded-3xl border border-gray-200">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full uppercase tracking-wider">
              Shipped Deliverables
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-950 mt-3 mb-3">
              What You Will Build &amp; Deploy Live
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              You will graduate with working, deployed AI applications hosted on the cloud with full GitHub documentation:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Enterprise Document RAG Bot</h4>
                  <p className="text-xs text-gray-600">Vector database search, hybrid filtering, and source citation generator.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Autonomous Multi-Agent Crew</h4>
                  <p className="text-xs text-gray-600">CrewAI team that conducts automated research, writes reports, and executes tasks.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Custom LLM SaaS Web App</h4>
                  <p className="text-xs text-gray-600">Deployed live on Vercel/Railway with user authentication and token quotas.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Upwork &amp; AI Consultant Portfolio</h4>
                  <p className="text-xs text-gray-600">Proposals for high-ticket AI workflow automation contracts ($50-$100/hr).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Verified Gateways */}
        <section className="my-16 p-8 md:p-12 bg-white rounded-3xl border-2 border-purple-600 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Transparent Fee Structure
              </span>
              <h2 className="text-3xl font-black text-gray-950 mt-3 mb-2 tracking-tight">
                Generative AI Tuition Plan
              </h2>
              <div className="flex items-baseline gap-2 my-4">
                <span className="text-5xl font-black text-purple-700">PKR 6,000</span>
                <span className="text-gray-500 font-semibold text-sm">/ month (14 Weeks)</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Structured into easy monthly installments. Includes 150 hours of live mentor-led screen sharing, API code templates, GitHub repos, and lifelong WhatsApp group support.
              </p>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>100% Full Refund Exemption after first live class</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Max 6 students per cohort for direct architecture review</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>API credits setup guidance &amp; cost-saving local models</span>
                </div>
              </div>
            </div>

            {/* Payment Box */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-bold text-gray-950 text-sm flex items-center gap-2">
                <Wallet className="w-4 h-4 text-purple-700" />
                Official Verified Gateways
              </h3>
              <p className="text-xs text-gray-600">
                Tuition fee of <strong>PKR 6,000</strong> is payable directly to lead mentor Fazal Shahid Latif:
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-white rounded-xl border border-red-200">
                  <div className="flex justify-between items-center text-red-700 font-bold mb-1">
                    <span>JazzCash Business:</span>
                    <span>03322137898</span>
                  </div>
                  <div className="text-[11px] text-gray-500">Title: Fazal Shahid Latif</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <div className="flex justify-between items-center text-emerald-800 font-bold mb-1">
                    <span>Zindigi (JS Bank / Raast):</span>
                    <span>03322137898</span>
                  </div>
                  <div className="text-[11px] text-gray-500">Title: Fazal Shahid Latif (0% Raast Fee)</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onBookCall}
                  className="w-full py-3.5 bg-purple-700 text-white rounded-xl font-bold hover:bg-purple-800 transition-all text-center text-sm shadow-md"
                >
                  Confirm AI Track Registration
                </button>
                <p className="text-[11px] text-center text-gray-500 italic">
                  Confirmation on WhatsApp: <strong>0332 2137898</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="my-16">
          <h2 className="text-3xl font-black text-gray-950 mb-8 tracking-tight">
            Frequently Asked Questions — Generative AI Track
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">Do I need to be a Python or AI PhD expert?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                No. Basic programming knowledge (JavaScript, Python, or even general scripting) is sufficient. We build your AI engineering fundamentals step by step.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">Are API keys / tokens expensive to use?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                No. Modern models like Gemini 1.5 Flash and GPT-4o-mini cost only a few pennies per million tokens. We teach you cost-caching and efficient token management so your monthly practice costs remain under $3–$5.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">What kind of jobs or freelance gigs can I land?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                AI Automation Specialist, Prompt Engineer, LangChain/CrewAI Developer, RAG Pipeline Engineer, and custom AI SaaS founder. Rates on Upwork range from $40 to $100+/hr.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">Is the course fully live or pre-recorded?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                100% LIVE interactive screen-sharing sessions with lead mentor Fazal Shahid Latif. Every line of code is written and debugged together live.
              </p>
            </div>
          </div>
        </section>

        {/* Final Conversion Action */}
        <div className="text-center pt-8 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-black text-gray-950 mb-3">
            Build the Future with Generative AI &amp; Agents
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto mb-8">
            Schedule a free 15-minute diagnostic call with Fazal Shahid Latif to discuss your background, batch schedule, and custom AI project goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onBookCall}
              className="px-8 py-4 bg-purple-700 text-white rounded-2xl font-bold hover:bg-purple-800 transition-all text-sm shadow-lg shadow-purple-700/20"
            >
              Book Free Clarity Call
            </button>
            <button 
              onClick={onBackToHome}
              className="px-8 py-4 bg-gray-100 text-gray-800 rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm"
            >
              Explore All Courses
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
