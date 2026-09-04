import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Code, 
  HelpCircle, 
  ExternalLink,
  MessageSquare,
  Zap,
  TrendingUp,
  Award,
  Layers,
  Info
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface CompetitivePositioningMatrixProps {
  onBookCall?: () => void;
  onNavigate?: (path: string) => void;
  onOpenSyllabusMagnet?: (trackName?: string) => void;
  selectedCity?: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

type QuadrantId = 'mentor-arena' | 'traditional' | 'mass-market' | 'overseas';

interface QuadrantInfo {
  id: QuadrantId;
  name: string;
  badge: string;
  tagline: string;
  xLabel: string;
  yLabel: string;
  color: string;
  accentBorder: string;
  bgLight: string;
  players: string[];
  metrics: {
    ratio: string;
    instructor: string;
    codeAudit: string;
    support: string;
    price: string;
    risk: string;
  };
  pros: string[];
  cons: string[];
  verdict: string;
}

const QUADRANTS: Record<QuadrantId, QuadrantInfo> = {
  'mentor-arena': {
    id: 'mentor-arena',
    name: 'Mentor Arena',
    badge: '★ The Winning Quadrant',
    tagline: 'High-Touch 1-to-1 Live + Elite Technical Rigor',
    xLabel: 'Elite Technical (Real MERN Coding, Programmatic SEO, APIs)',
    yLabel: 'High-Touch / 1-to-1 Live (Personalized, Direct Screen Review)',
    color: 'emerald',
    accentBorder: 'border-emerald-500 shadow-emerald-500/20',
    bgLight: 'bg-emerald-950/40 text-emerald-300',
    players: ['Mentor Arena (1-to-1 with Fazal Shahid Latif)'],
    metrics: {
      ratio: '1-to-1 (Zero crowd, 100% focused on your screen)',
      instructor: '30+ Years Veteran Solutions Architect',
      codeAudit: 'Live line-by-line syntax & git commit audits',
      support: 'Direct WhatsApp line with Principal Mentor 24/7',
      price: 'PKR 6,000 / month (No huge lump sums)',
      risk: '100% First-Session Refund Exemption Guarantee'
    },
    pros: [
      'Tailored velocity: slow down or accelerate to match your comprehension',
      'Production-grade stack: Next.js 15, Node/Express, PostgreSQL, Tailwind, GenAI',
      '100% remote: zero hours lost in traffic or petrol commutes',
      'Real production deployments shipped directly to your personal domain'
    ],
    cons: [
      'Strictly limited enrollment (max 6 active students per cohort window to protect focus)'
    ],
    verdict: 'The ideal model for serious learners who refuse to get lost in crowded Zoom calls and demand verified enterprise-grade skill delivery.'
  },
  'traditional': {
    id: 'traditional',
    name: 'Traditional IT Institutes',
    badge: 'Mass-Batch Campus',
    tagline: 'Elite Technical Curriculum + Mass-Batch Lab Instruction',
    xLabel: 'Elite Technical (Agency & Coding Syllabus)',
    yLabel: 'Mass-Batch Classroom (30-60 Students per Lab)',
    color: 'blue',
    accentBorder: 'border-blue-500/50 shadow-blue-500/10',
    bgLight: 'bg-blue-950/30 text-blue-300',
    players: ['PNY Trainings', 'IDM Pakistan', 'Omni Academy', 'Corvit'],
    metrics: {
      ratio: '1-to-35 or 1-to-60 per physical computer lab',
      instructor: 'Hired junior trainers or fresh graduates',
      codeAudit: 'Group slide demos with minimal individual screen audits',
      support: 'Limited to brief Q&A after class hours or ticket portal',
      price: 'PKR 35,000 – 85,000 upfront full payment',
      risk: 'Non-refundable registration & strict policies'
    },
    pros: [
      'Physical campus atmosphere if you prefer a physical room',
      'Standardized institute certificates'
    ],
    cons: [
      '2–3 hours wasted daily in heavy traffic jams (Shahrah-e-Faisal, Arfa Tower, Blue Area)',
      'High upfront tuition fees before verifying instructor chemistry',
      'Instructors often teach standardized legacy slides without live architecture audits'
    ],
    verdict: 'High cost with rigid batch schedules and low individual screen attention due to lab crowding.'
  },
  'mass-market': {
    id: 'mass-market',
    name: 'Mass-Market Platforms',
    badge: 'Mass-Market Recorded',
    tagline: 'Introductory Basics + Massive 500-1,000 Student Batches',
    xLabel: 'Mass-Market / Fluff (Recorded Videos & Surface Basics)',
    yLabel: 'Mass-Batch Recorded (500–1,000 Student Zoom Webinars)',
    color: 'amber',
    accentBorder: 'border-amber-500/40 shadow-amber-500/10',
    bgLight: 'bg-amber-950/30 text-amber-300',
    players: ['DigiSkills (Government program)', 'iSkills (SEBT cohorts)', 'Coursera/Udemy prerecorded'],
    metrics: {
      ratio: '1-to-500 or 1-to-1,000+ (microphones locked muted)',
      instructor: 'Single presenter broadcasting to massive auditoriums',
      codeAudit: 'Zero code inspection; standardized multiple-choice quizzes',
      support: 'Public Facebook groups with volunteer TAs (days to reply)',
      price: 'Free to PKR 25,000 per cohort',
      risk: 'Generally non-refundable once batch starts'
    },
    pros: [
      'Low monetary barrier to test basic interest',
      'Large peer community groups'
    ],
    cons: [
      'Over 85% dropout rate due to lack of personal accountability',
      'Questions get buried in rapidly scrolling Zoom chat screens',
      'Superficial concepts that fail to clear technical software house interviews'
    ],
    verdict: 'Good for introductory awareness, but ineffective for securing high-paying remote developer roles.'
  },
  'overseas': {
    id: 'overseas',
    name: 'Overseas Private Tutors',
    badge: 'High-Priced Boutique',
    tagline: 'High-Touch 1-to-1 Attention + Prohibitive International Fees',
    xLabel: 'Varied / Generalist Focus',
    yLabel: 'High-Touch / 1-to-1 Private Sessions',
    color: 'purple',
    accentBorder: 'border-purple-500/40 shadow-purple-500/10',
    bgLight: 'bg-purple-950/30 text-purple-300',
    players: ['US/UK Private Tutors', 'Wyzant / Codementor', 'Boutique Freelance Consultants'],
    metrics: {
      ratio: '1-to-1 Private Session',
      instructor: 'International freelance engineers or general tutors',
      codeAudit: 'Available per paid hourly increment',
      support: 'Strictly charged by the billable hour',
      price: '$50 – $150 USD per hour (PKR 14,000 – 42,000 per hour)',
      risk: 'Strict hourly lock-in with currency conversion markup'
    },
    pros: [
      'Personal attention and international perspective',
      'Native English communication training'
    ],
    cons: [
      'Financially out of reach for 99% of Pakistani university students and career switchers',
      'Timezone friction (US Pacific / Eastern schedules midnight in Pakistan)',
      'Lacks local Pakistani market hiring context and affordable payment gateways'
    ],
    verdict: 'Personalized but prohibitively expensive on an hourly billing model.'
  }
};

export const CompetitivePositioningMatrix: React.FC<CompetitivePositioningMatrixProps> = ({
  onBookCall,
  onNavigate,
  onOpenSyllabusMagnet,
  selectedCity = 'all'
}) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantId>('mentor-arena');
  const [activeTab, setActiveTab] = useState<'matrix' | 'table'>('matrix');

  const cityLabel = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);
  const activeInfo = QUADRANTS[selectedQuadrant];

  return (
    <section id="positioning-matrix" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#090E14] text-white relative overflow-hidden border-t border-b border-zinc-800">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Market Benchmark &amp; Value Proposition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Competitive Positioning Matrix
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            Where Mentor Arena stands compared to mass-market recorded programs and crowded computer labs in {cityLabel}.
          </p>

          {/* View Toggle */}
          <div className="mt-8 inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-inner">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Interactive 2x2 Value Map</span>
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'table'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Head-to-Head Comparison</span>
            </button>
          </div>
        </div>

        {activeTab === 'matrix' ? (
          /* ========================================================
             INTERACTIVE 2X2 VISUAL COORDINATE MATRIX
             ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left/Main Column: Coordinate Diagram (7 cols) */}
            <div className="lg:col-span-7 bg-zinc-950/80 border border-zinc-800 rounded-3xl p-5 sm:p-8 relative shadow-2xl backdrop-blur-sm">
              
              {/* Vertical Y-Axis Label (High-Touch vs Mass-Batch) */}
              <div className="text-center mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-wider">
                  <span>▲ High-Touch / 1-to-1 Live</span>
                </span>
                <p className="text-[11px] text-zinc-400 mt-1">Personalized Pace, Private Google Meet, Direct Screen Review</p>
              </div>

              {/* Matrix Coordinate Container */}
              <div className="relative aspect-[4/3] sm:aspect-square w-full max-w-lg mx-auto bg-zinc-900/60 border border-zinc-700/60 rounded-2xl overflow-hidden p-3 sm:p-4">
                
                {/* Axes Crosshair lines */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-px h-[2px] bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 z-10 opacity-70" />
                <div className="absolute inset-y-0 left-1/2 -translate-x-px w-[2px] bg-gradient-to-b from-zinc-700 via-zinc-400 to-zinc-700 z-10 opacity-70" />

                {/* Subtle Grid Markings */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-25" />

                {/* --- 4 QUADRANT CLICKABLE REGIONS --- */}
                <div className="relative h-full w-full grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 z-20">
                  
                  {/* TOP-LEFT: Overseas Tutors */}
                  <div
                    onClick={() => setSelectedQuadrant('overseas')}
                    className={`relative p-3 sm:p-4 rounded-xl transition-all cursor-pointer flex flex-col justify-between border ${
                      selectedQuadrant === 'overseas'
                        ? 'bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/40'
                        : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-800/40 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Top-Left Quadrant</div>
                      <div className="text-xs sm:text-sm font-bold text-zinc-200 mt-0.5">Overseas 1-on-1</div>
                      <p className="text-[10px] text-zinc-400 leading-tight mt-1 hidden sm:block">
                        High-touch 1-to-1, but prohibitive international pricing ($100/hr)
                      </p>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-medium">
                      • Wyzant / Codementor<br />
                      • Foreign Mentors
                    </div>
                  </div>

                  {/* TOP-RIGHT: ★ MENTOR ARENA (THE WINNER) */}
                  <div
                    onClick={() => setSelectedQuadrant('mentor-arena')}
                    className={`relative p-3 sm:p-4 rounded-xl transition-all cursor-pointer flex flex-col justify-between border ${
                      selectedQuadrant === 'mentor-arena'
                        ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-900/40'
                        : 'bg-emerald-950/30 border-emerald-500/40 hover:bg-emerald-950/50'
                    }`}
                  >
                    <div className="absolute top-2 right-2">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                        <Star className="w-3 h-3 fill-emerald-400" />
                        <span>THE SWEET SPOT</span>
                      </div>
                      <div className="text-sm sm:text-base font-black text-white mt-0.5 tracking-tight flex items-center gap-1">
                        ★ MENTOR ARENA
                      </div>
                      <p className="text-[11px] text-emerald-200/90 leading-tight mt-1 font-medium">
                        Personalized 1-to-1 + Direct Screen Review + Real MERN &amp; Technical SEO
                      </p>
                    </div>
                    <div className="bg-emerald-900/40 border border-emerald-600/30 rounded-lg p-1.5 text-[10px] text-emerald-300 font-bold flex items-center justify-between">
                      <span>PKR 6,000 / mo</span>
                      <span className="text-[9px] bg-emerald-500 text-black px-1.5 py-0.5 rounded font-black">1-TO-1</span>
                    </div>
                  </div>

                  {/* BOTTOM-LEFT: DigiSkills, iSkills */}
                  <div
                    onClick={() => setSelectedQuadrant('mass-market')}
                    className={`relative p-3 sm:p-4 rounded-xl transition-all cursor-pointer flex flex-col justify-between border ${
                      selectedQuadrant === 'mass-market'
                        ? 'bg-amber-950/50 border-amber-500 ring-2 ring-amber-500/40'
                        : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-800/40 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Bottom-Left Quadrant</div>
                      <div className="text-xs sm:text-sm font-bold text-zinc-200 mt-0.5">Mass-Market / Fluff</div>
                      <p className="text-[10px] text-zinc-400 leading-tight mt-1 hidden sm:block">
                        Recorded video portals &amp; 500-student webinar broadcasts
                      </p>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-medium">
                      • DigiSkills (Recorded)<br />
                      • iSkills SEBT (Mass Zoom)
                    </div>
                  </div>

                  {/* BOTTOM-RIGHT: PNY Trainings, IDM Pakistan */}
                  <div
                    onClick={() => setSelectedQuadrant('traditional')}
                    className={`relative p-3 sm:p-4 rounded-xl transition-all cursor-pointer flex flex-col justify-between border ${
                      selectedQuadrant === 'traditional'
                        ? 'bg-blue-950/50 border-blue-500 ring-2 ring-blue-500/40'
                        : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-800/40 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Bottom-Right Quadrant</div>
                      <div className="text-xs sm:text-sm font-bold text-zinc-200 mt-0.5">Traditional Institutes</div>
                      <p className="text-[10px] text-zinc-400 leading-tight mt-1 hidden sm:block">
                        Agency topics, but 40+ students packed into lab sessions
                      </p>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-medium">
                      • PNY Trainings<br />
                      • IDM Pakistan / Omni
                    </div>
                  </div>

                </div>
              </div>

              {/* Horizontal X-Axis Labels */}
              <div className="flex items-center justify-between mt-4 text-[11px] font-semibold text-zinc-400 px-2">
                <div className="text-left">
                  <span className="text-amber-400 font-bold block">◄ Mass-Market / Fluff</span>
                  <span className="text-[10px] text-zinc-500">Recorded videos, 500-student webinars</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold block">Elite Technical ►</span>
                  <span className="text-[10px] text-zinc-500">Real MERN Coding, Programmatic SEO, APIs</span>
                </div>
              </div>

              {/* Vertical Bottom Y-Axis Label */}
              <div className="text-center mt-3 pt-3 border-t border-zinc-800">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800/80 border border-zinc-700 rounded-full text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <span>▼ Mass-Batch Recorded</span>
                </span>
                <p className="text-[10px] text-zinc-500 mt-0.5">Pre-recorded videos, muted zoom webinars, crowded computer labs</p>
              </div>

              {/* Interactive Help Hint */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-400">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Click any quadrant on the chart to inspect verified metrics and tradeoffs.</span>
              </div>
            </div>

            {/* Right Column: Dynamic Deep-Dive Breakdown (5 cols) */}
            <div className="lg:col-span-5 bg-zinc-950/90 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                    selectedQuadrant === 'mentor-arena' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {activeInfo.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 flex items-center gap-2">
                    {activeInfo.name}
                  </h3>
                </div>
                {selectedQuadrant === 'mentor-arena' && (
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                    <Award className="w-6 h-6" />
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 mt-3 font-medium leading-relaxed">
                {activeInfo.tagline}
              </p>

              {/* Key Players In Quadrant */}
              <div className="mt-4 bg-zinc-900/80 rounded-xl p-3 border border-zinc-800/80">
                <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider block mb-1">
                  Representative Providers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeInfo.players.map((p, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-200 rounded-md font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metric Breakdown Cards */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-start justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-850 text-xs">
                  <span className="text-zinc-400 font-medium">Attention Ratio:</span>
                  <span className="font-bold text-white text-right max-w-[60%]">{activeInfo.metrics.ratio}</span>
                </div>
                <div className="flex items-start justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-850 text-xs">
                  <span className="text-zinc-400 font-medium">Instructor Level:</span>
                  <span className="font-bold text-white text-right max-w-[60%]">{activeInfo.metrics.instructor}</span>
                </div>
                <div className="flex items-start justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-850 text-xs">
                  <span className="text-zinc-400 font-medium">Code/Project Review:</span>
                  <span className="font-bold text-white text-right max-w-[60%]">{activeInfo.metrics.codeAudit}</span>
                </div>
                <div className="flex items-start justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-850 text-xs">
                  <span className="text-zinc-400 font-medium">Support Channel:</span>
                  <span className="font-bold text-white text-right max-w-[60%]">{activeInfo.metrics.support}</span>
                </div>
                <div className="flex items-start justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-850 text-xs">
                  <span className="text-zinc-400 font-medium">Tuition Structure:</span>
                  <span className="font-bold text-emerald-400 text-right max-w-[60%]">{activeInfo.metrics.price}</span>
                </div>
                <div className="flex items-start justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-850 text-xs">
                  <span className="text-zinc-400 font-medium">Risk Protection:</span>
                  <span className="font-bold text-white text-right max-w-[60%]">{activeInfo.metrics.risk}</span>
                </div>
              </div>

              {/* Pros & Cons summary */}
              <div className="mt-5 space-y-3 pt-4 border-t border-zinc-800">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                    Key Advantages
                  </span>
                  <ul className="space-y-1">
                    {activeInfo.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 block mb-1.5">
                    Critical Drawbacks / Tradeoffs
                  </span>
                  <ul className="space-y-1">
                    {activeInfo.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action CTAs */}
              <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2">
                <button
                  onClick={() => onBookCall ? onBookCall() : (onNavigate ? onNavigate('/contact') : null)}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book Free 1-to-1 Strategy Session</span>
                </button>

                {onOpenSyllabusMagnet && (
                  <button
                    onClick={() => onOpenSyllabusMagnet('Full-Stack Web Development (MERN)')}
                    className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-zinc-700/60 cursor-pointer"
                  >
                    <span>Download 2026 16-Week Roadmap (PDF)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>
        ) : (
          /* ========================================================
             HEAD-TO-HEAD COMPARISON TABLE VIEW
             ======================================================== */
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80">
                    <th className="p-4 sm:p-5 text-zinc-400 font-bold uppercase tracking-wider text-xs">Evaluation Dimension</th>
                    <th className="p-4 sm:p-5 text-emerald-400 font-black text-sm bg-emerald-950/40 border-l border-r border-emerald-500/30">
                      ★ Mentor Arena (1-to-1)
                    </th>
                    <th className="p-4 sm:p-5 text-zinc-300 font-bold">Traditional Institutes (PNY / IDM)</th>
                    <th className="p-4 sm:p-5 text-zinc-300 font-bold">Mass-Market (DigiSkills / iSkills)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-300">Instruction Format</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-emerald-950/20 border-l border-r border-emerald-500/20">
                      1-to-1 Private Screen Sharing via Google Meet
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400">30–60 students per crowded physical computer lab</td>
                    <td className="p-4 sm:p-5 text-zinc-400">Pre-recorded video lectures or 500-student Zoom webinars</td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-300">Lead Mentor Profile</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-300 bg-emerald-950/20 border-l border-r border-emerald-500/20">
                      Fazal Shahid Latif (30+ Years Enterprise Solutions Architect)
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400">Hired junior trainers or fresh course graduates</td>
                    <td className="p-4 sm:p-5 text-zinc-400">Single figurehead instructor with volunteer assistants</td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-300">Individual Code Audits</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-emerald-950/20 border-l border-r border-emerald-500/20">
                      Live line-by-line editor debugging &amp; Git audits every single session
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400">Generic projector demos; no line-by-line review of your code</td>
                    <td className="p-4 sm:p-5 text-zinc-400">Zero individual review; automated multiple choice tests</td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-300">Daily Commute &amp; Fuel</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-300 bg-emerald-950/20 border-l border-r border-emerald-500/20">
                      Zero commute (100% remote from your desk, saving 2 hrs/day)
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400">Daily 2-hour traffic jams in Karachi, Lahore, or Islamabad</td>
                    <td className="p-4 sm:p-5 text-zinc-400">Zero commute (self-paced online)</td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-300">Tuition &amp; Risk Guarantee</td>
                    <td className="p-4 sm:p-5 font-bold text-white bg-emerald-950/20 border-l border-r border-emerald-500/20">
                      PKR 6,000/mo + 100% 1st-Session Money-Back Refund Guarantee
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400">PKR 35,000–85,000 upfront lump sum (non-refundable)</td>
                    <td className="p-4 sm:p-5 text-zinc-400">Free to PKR 25,000 per cohort (strict refund restrictions)</td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-300">Direct Support Channel</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-300 bg-emerald-950/20 border-l border-r border-emerald-500/20">
                      Direct 24/7 WhatsApp emergency line with Lead Mentor
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400">Reception desk tickets or brief Q&amp;A after lab class</td>
                    <td className="p-4 sm:p-5 text-zinc-400">Public Facebook groups; wait 24–72 hours for volunteer replies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table Footer Navigation */}
            <div className="p-6 bg-zinc-900/90 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400">
                Want detailed breakdowns against specific competitors?
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {onNavigate && (
                  <>
                    <button
                      onClick={() => onNavigate('/compare/traditional-institute-vs-1-to-1')}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Compare Traditional Institutes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate('/compare/iskills-vs-mentorarena')}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Compare iSkills vs. Mentor Arena</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => onBookCall ? onBookCall() : (onNavigate ? onNavigate('/contact') : null)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30 cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Book 1-to-1 Strategy Session</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
