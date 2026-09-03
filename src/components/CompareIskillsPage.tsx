import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Code, 
  HelpCircle, 
  Flame, 
  Clock, 
  Zap, 
  Layers, 
  Check, 
  Award,
  ChevronRight,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface CompareIskillsPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  onNavigate: (path: string) => void;
  selectedCity?: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const CompareIskillsPage: React.FC<CompareIskillsPageProps> = ({
  onBackToHome,
  onBookCall,
  onNavigate,
  selectedCity = 'all'
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const cityName = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const comparisonRows = [
    {
      feature: "Class Delivery Format",
      category: "Instruction",
      mentorArena: {
        text: "1-to-1 Private Live Screen Sharing (or micro-batch max 6)",
        highlight: true,
        note: "Direct Google Meet session where mentor observes your actual screen"
      },
      iskills: {
        text: "Mass Zoom Webinars (300 to 1,000+ students per cohort)",
        highlight: false,
        note: "1 instructor broadcasting to hundreds with microphones muted"
      }
    },
    {
      feature: "Question & Doubt Resolution",
      category: "Support",
      mentorArena: {
        text: "Instant live verbal & screen resolution in real time",
        highlight: true,
        note: "Never wait; ask anything immediately as you write code or audit sites"
      },
      iskills: {
        text: "Questions get buried in rapid webinar chat scroll",
        highlight: false,
        note: "Learners instructed to post in Facebook groups and wait days for replies"
      }
    },
    {
      feature: "Code & Assignment Reviews",
      category: "Feedback",
      mentorArena: {
        text: "Line-by-line inspection of your live editor & git commits",
        highlight: true,
        note: "Fazal Shahid Latif reviews your exact syntax, performance, and architecture"
      },
      iskills: {
        text: "Generic group assignments with peer or TA spot checks",
        highlight: false,
        note: "No personalized deep-dive into your individual project codebase"
      }
    },
    {
      feature: "Direct Support Channel",
      category: "Support",
      mentorArena: {
        text: "Direct WhatsApp emergency line with Lead Mentor",
        highlight: true,
        note: "Direct message Fazal Shahid Latif when you get stuck between classes"
      },
      iskills: {
        text: "Public Facebook group threads & volunteer teaching assistants",
        highlight: false,
        note: "Replies depend on busy volunteer availability in massive groups"
      }
    },
    {
      feature: "Curriculum Scope & Depth",
      category: "Curriculum",
      mentorArena: {
        text: "Full MERN Stack + Technical & Programmatic SEO + GenAI",
        highlight: true,
        note: "Build real React/Node.js web apps, live databases, and production systems"
      },
      iskills: {
        text: "Primarily WordPress affiliate blogging & surface AI prompts",
        highlight: false,
        note: "Heavy focus on niche websites and AdSense/Amazon affiliate models"
      }
    },
    {
      feature: "Learning Pace & Customization",
      category: "Instruction",
      mentorArena: {
        text: "100% customized to your absorption speed & background",
        highlight: true,
        note: "Slow down on complex algorithms or speed through familiar basics"
      },
      iskills: {
        text: "Rigid fixed calendar batch schedule",
        highlight: false,
        note: "If you fall sick or miss 2 sessions, the batch moves forward without you"
      }
    },
    {
      feature: "Real Shipped Outcome",
      category: "Outcomes",
      mentorArena: {
        text: "Custom deployed production app or verified live client ranking",
        highlight: true,
        note: "Unique portfolio piece you can pitch to global employers or Upwork clients"
      },
      iskills: {
        text: "Standard template blog or affiliate site",
        highlight: false,
        note: "Thousands of students build identical niche blog frameworks"
      }
    },
    {
      feature: "Student Completion Rate",
      category: "Accountability",
      mentorArena: {
        text: "94% hands-on project completion rate",
        highlight: true,
        note: "Because your mentor is waiting on screen every week, you finish"
      },
      iskills: {
        text: "~12% to 15% typical industry webinar completion rate",
        highlight: false,
        note: "Most students drop out or consume recordings passively without building"
      }
    },
    {
      feature: "Tuition & Payment Risk",
      category: "Investment",
      mentorArena: {
        text: "Transparent PKR 6,000 / month pay-as-you-learn",
        highlight: true,
        note: "Zero large upfront risk; pay in convenient monthly installments"
      },
      iskills: {
        text: "Upfront lump sum (typically PKR 30,000 to 50,000+)",
        highlight: false,
        note: "Large upfront capital required before attending a single lecture"
      }
    },
    {
      feature: "Risk-Free Trial & Refund",
      category: "Investment",
      mentorArena: {
        text: "100% Money-Back Guarantee on 1st Live Session",
        highlight: true,
        note: "If our style doesn't fit your expectations, immediate zero-friction refund"
      },
      iskills: {
        text: "Strict non-refundable batch enrollment policy",
        highlight: false,
        note: "Once cohort commences, fees are generally forfeited"
      }
    }
  ];

  const faqs = [
    {
      q: "What is the primary difference between iSkills and Mentor Arena?",
      a: "The difference comes down to cohort size and pedagogical depth. iSkills (founded by Tanveer Nandla) runs massive webinar batches where 300 to 1,000+ students listen to one trainer on Zoom, primarily teaching WordPress blogging, Amazon affiliate marketing, and prompt generation. Mentor Arena is an elite 1-to-1 mentorship studio led by 30+ year veteran Fazal Shahid Latif, where the mentor sits directly on screen with you, conducting line-by-line code reviews, teaching full MERN development, technical SEO, and building deployed client-ready software."
    },
    {
      q: "Why do webinar-style courses have low completion rates?",
      a: "Industry data reveals that large webinar courses experience dropout rates exceeding 85%. When an instructor cannot see your screen or notice that you are stuck on an error, students quietly fall behind. In contrast, Mentor Arena's 1-to-1 model maintains a 94% completion rate because you have dedicated private appointments and direct WhatsApp access to troubleshoot any hurdle immediately."
    },
    {
      q: "Is Mentor Arena cheaper or more expensive than iSkills?",
      a: "Mentor Arena is significantly safer and more cost-effective. While iSkills requires an upfront lump-sum payment of PKR 30,000 to PKR 50,000+ for SEBT/SEBT NEXT, Mentor Arena charges a transparent monthly tuition of just PKR 6,000/month. You pay as you learn with zero long-term lock-in and a 100% refund guarantee on your first live session."
    },
    {
      q: "Can I learn full software development and programming at iSkills?",
      a: "No. iSkills specializes in content blogging, niche affiliate sites, and digital marketing workflows. If your goal is to become an employable full-stack software engineer (React, Node.js, Express, MongoDB, Tailwind, Next.js, Git) or a technical SEO engineer who understands site architecture and server performance, Mentor Arena provides the rigorous technical foundation required by global tech companies."
    },
    {
      q: "How does the direct WhatsApp support at Mentor Arena work?",
      a: "Unlike crowded Facebook groups where questions wait days for volunteer teaching assistants, every Mentor Arena student has direct WhatsApp access to Lead Mentor Fazal Shahid Latif. If your code breaks or your campaign fails between sessions, you send a screenshot and receive prompt voice note guidance or screen-share debugging."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Banner Navigation & Breadcrumbs */}
      <section className="bg-slate-950 text-white pt-10 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.15),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-6">
            <button 
              onClick={onBackToHome}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight size={12} />
            <span className="text-gray-400">Comparisons</span>
            <ChevronRight size={12} />
            <span className="text-emerald-400 font-bold">iSkills vs. Mentor Arena</span>
          </div>

          {/* Quick Comparison Toggle */}
          <div className="inline-flex p-1 bg-zinc-900/90 border border-zinc-800 rounded-2xl mb-8">
            <button
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
            >
              iSkills vs. Mentor Arena
            </button>
            <button
              onClick={() => onNavigate('/compare/traditional-institute-vs-1-to-1')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
            >
              Traditional Institutes vs. 1-to-1
            </button>
          </div>

          {/* Hero Header */}
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> 2026 Objective Training Comparison
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              iSkills vs. Mentor Arena: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                1-to-1 Live Screen Mentorship vs. 500-Student Webinars
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
              Considering iSkills (SEBT) for your digital career? See how direct 1-to-1 screen sharing, live code reviews, and customized pacing compare against massive 300–500 student webinar cohorts. Learn where your time and tuition achieve the fastest real-world return.
            </p>
          </div>

          {/* Metric Highlights Pill Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8">
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-semibold mb-1">Mentor Arena</div>
              <div className="text-emerald-400 font-bold text-lg">1-to-1 Private</div>
              <div className="text-[11px] text-gray-500">Zero crowded Zoom rooms</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-semibold mb-1">Feedback Loop</div>
              <div className="text-blue-400 font-bold text-lg">Live Screen Review</div>
              <div className="text-[11px] text-gray-500">Line-by-line debugging</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-semibold mb-1">Support Channel</div>
              <div className="text-emerald-400 font-bold text-lg">Direct WhatsApp</div>
              <div className="text-[11px] text-gray-500">No buried Facebook threads</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-semibold mb-1">Tuition Model</div>
              <div className="text-emerald-400 font-bold text-lg">PKR 6,000 / mo</div>
              <div className="text-[11px] text-gray-500">Zero big upfront risk</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Matrix Comparison Table */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 mb-3 inline-block">
            Feature-by-Feature Matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            The Detailed Comparison: Mentor Arena vs. iSkills
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            An objective side-by-side audit comparing learning models, student attention, curriculum scope, and pricing.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-extrabold text-gray-700 uppercase tracking-wider w-1/3">
                  Dimension / Feature
                </th>
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50/80 w-1/3 border-l border-r border-emerald-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <span>Mentor Arena (1-to-1)</span>
                  </div>
                </th>
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-extrabold text-gray-600 uppercase tracking-wider w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>iSkills (SEBT Batch)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 sm:p-6 align-top">
                    <div className="font-bold text-gray-900 text-sm sm:text-base">{row.feature}</div>
                    <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {row.category}
                    </span>
                  </td>

                  {/* Mentor Arena Column */}
                  <td className="p-4 sm:p-6 align-top bg-emerald-50/40 border-l border-r border-emerald-100">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 block leading-snug">
                          {row.mentorArena.text}
                        </span>
                        <span className="text-xs text-emerald-800 mt-1 block">
                          {row.mentorArena.note}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* iSkills Column */}
                  <td className="p-4 sm:p-6 align-top text-gray-600">
                    <div className="flex items-start gap-2.5">
                      <XCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-700 block leading-snug">
                          {row.iskills.text}
                        </span>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {row.iskills.note}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4 Critical Dilemmas (Deep-Dive Analysis) */}
      <section className="py-16 px-4 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/10 mb-3 inline-block">
              Why 1-to-1 Matters
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              The 4 Unspoken Flaws of 500-Student Webinars
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Before enrolling in an online academy batch, understand what actually happens after the promotional webinar ends.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Dilemma 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg mb-5">
                <HelpCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                1. The "Questions Lost in Chat" Dilemma
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                In a Zoom meeting with 300 to 800 participants, the chat box flies by at 50 messages per minute. If you hit a roadblock understanding an algorithm, an API call, or a technical canonical tag, your message is swallowed. You are left pretending to understand or instructed to post on Facebook.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                <strong className="text-emerald-800">At Mentor Arena:</strong> It is just you and Fazal Shahid Latif. You interrupt anytime, ask five times until it clicks, and get immediate voice & screen clarity.
              </div>
            </div>

            {/* Dilemma 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-5">
                <Code size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                2. Surface Blogging vs. Real Software Engineering
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                iSkills heavily focuses on WordPress blogging and affiliate websites. While blogging is a legitimate skill, Google's Helpful Content Updates have crushed cookie-cutter affiliate sites. High-income careers in 2026 require full-stack coding (MERN), programmatic SEO engines, and custom web applications.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                <strong className="text-emerald-800">At Mentor Arena:</strong> You build real software: React, Node.js, MongoDB, Next.js, and technical programmatic SEO architectures that stand the test of time.
              </div>
            </div>

            {/* Dilemma 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-lg mb-5">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                3. The 85% Silent Drop-Out Rate
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                When you are just a silent avatar among 500 attendees, no one notices when you don't show up. Life gets busy, you miss a class, watch the recording at 1.5x speed without doing the homework, and abandon the course within 3 weeks with your money gone.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                <strong className="text-emerald-800">At Mentor Arena:</strong> With 1-to-1 appointments, there is 100% accountability. Your mentor is waiting for you, tracks your progress each session, and ensures you ship your portfolio project.
              </div>
            </div>

            {/* Dilemma 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-5">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                4. The PKR 40,000 Upfront Capital Risk
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Paying PKR 30,000 to PKR 50,000+ upfront creates immense financial anxiety, especially for students and career switchers. If the batch doesn't match your learning speed or you find the material too generic, there are no refunds.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                <strong className="text-emerald-800">At Mentor Arena:</strong> You pay a simple PKR 6,000 / month. You can pause or cancel anytime, and your very first live session has an unconditional 100% money-back guarantee.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Scenario Walkthrough */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60 mb-4 inline-block">
              A Real Learning Day Scenario
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
              What Happens When Your Code or SEO Breaks at 11:00 PM?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-3">
                <XCircle size={18} /> In a Mass Webinar Cohort
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>You encounter an unresolved bug or search console indexing error.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>You post a screenshot in a Facebook group with 50,000 members.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Other confused beginners reply with contradictory guesses or jokes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>You wait 48 hours for a TA reply that says "please re-watch lecture 7".</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span className="text-red-300 font-semibold">Result: Frustration, wasted time, and lost momentum.</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-700/50 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
                <CheckCircle2 size={18} /> At Mentor Arena (1-to-1)
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>You send a direct WhatsApp message to Lead Mentor Fazal Shahid Latif.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Fazal sends back a personalized voice note or audio breakdown within hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>In your next scheduled session, Fazal opens your screen and walks through the fix step-by-step.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>You understand the root cause and never make that error again.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 font-semibold">Result: Zero downtime, accelerated mastery, real confidence.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/10 mb-3 inline-block">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions: iSkills vs. Mentor Arena
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div 
                key={i} 
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-brand-blue transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span className={`text-xl transition-transform ${isOpen ? 'rotate-45 text-emerald-600' : 'text-gray-400'}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action Block */}
      <section className="py-16 px-4 bg-emerald-700 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
            Experience The Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Stop Being a Face in a 500-Person Webinar.
          </h2>
          <p className="text-base sm:text-lg text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Get private 1-to-1 attention, live code debugging, and a veteran mentor dedicated entirely to your success in {cityName}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-900 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              <span>Book Free 20-Min Clarity Call</span>
            </button>
            <a
              href={`https://api.whatsapp.com/send?phone=${BUSINESS_INFO.phone.replace(/\s/g, '')}&text=${encodeURIComponent(`Hi Fazal, I'm reading the iSkills vs Mentor Arena comparison and would like to ask a few questions about 1-to-1 mentorship.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/40 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-emerald-200/80 pt-2">
            Tuition is PKR 6,000/month. 100% money-back refund guarantee on your 1st live session.
          </p>
        </div>
      </section>
    </div>
  );
};
