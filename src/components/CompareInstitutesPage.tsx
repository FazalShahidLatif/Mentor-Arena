import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  HelpCircle, 
  Clock, 
  MapPin, 
  BookOpen, 
  DollarSign, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Monitor,
  Car,
  AlertTriangle
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface CompareInstitutesPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  onNavigate: (path: string) => void;
  selectedCity?: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const CompareInstitutesPage: React.FC<CompareInstitutesPageProps> = ({
  onBackToHome,
  onBookCall,
  onNavigate,
  selectedCity = 'all'
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const cityName = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const comparisonRows = [
    {
      feature: "Classroom Attention & Format",
      category: "Environment",
      mentorArena: {
        text: "1-to-1 Private Screen Share (100% focused on you)",
        note: "Zero distractions; your exact screen and editor are front and center"
      },
      traditional: {
        text: "30 to 60 students packed in a lab or 200 on Zoom",
        note: "Instructor lectures to the room; individual attention is near zero"
      }
    },
    {
      feature: "Instructor Caliber & Experience",
      category: "Instruction",
      mentorArena: {
        text: "30+ Years Veteran Solutions Architect (Fazal Shahid Latif)",
        note: "Learn directly from an active practitioner who builds enterprise systems"
      },
      traditional: {
        text: "Hired junior trainers or fresh grads reading standard slides",
        note: "Institutes often hire low-cost junior instructors who teach theory"
      }
    },
    {
      feature: "Commute & Time Efficiency",
      category: "Lifestyle",
      mentorArena: {
        text: "Zero Commute (100% online from your desk)",
        note: "Save 2–3 hours every day on traffic, petrol, and fatigue"
      },
      traditional: {
        text: "Daily 2-hour traffic jams to physical campuses",
        note: "Wasted time commuting to Arfa Tower, Shahrah-e-Faisal, or Blue Area"
      }
    },
    {
      feature: "Code & Practical Review",
      category: "Pedagogy",
      mentorArena: {
        text: "Live line-by-line debugging & production deployments",
        note: "Your code is audited in real-time, committed to Git, and shipped live"
      },
      traditional: {
        text: "Theoretical slide decks & generic dummy templates",
        note: "Copying code off a projector screen with zero deep review"
      }
    },
    {
      feature: "Curriculum Modernity",
      category: "Curriculum",
      mentorArena: {
        text: "2026 Production Tech: MERN, Next.js, GenAI, Technical SEO",
        note: "Updated weekly to reflect the latest hiring standards and AI workflows"
      },
      traditional: {
        text: "Outdated legacy syllabus (often unchanged since 2018)",
        note: "Heavy on outdated PHP, static HTML/CSS, and obsolete SEO tactics"
      }
    },
    {
      feature: "Schedule Flexibility",
      category: "Convenience",
      mentorArena: {
        text: "Customizable private time slots (Mon–Sat 10:00–20:00 PKT)",
        note: "Reschedule when exams, family, or work deadlines intervene"
      },
      traditional: {
        text: "Rigid fixed batch schedules (miss a class = lose it forever)",
        note: "Inflexible timing; if you miss a lecture, nobody repeats it for you"
      }
    },
    {
      feature: "Between-Class Support",
      category: "Support",
      mentorArena: {
        text: "Direct WhatsApp emergency access to Lead Mentor",
        note: "Get stuck on an error? Receive voice note guidance within hours"
      },
      traditional: {
        text: "No contact outside class; wait until the next week's lab",
        note: "Trainers leave the premises immediately after the lecture ends"
      }
    },
    {
      feature: "Cost & Hidden Fees",
      category: "Investment",
      mentorArena: {
        text: "Transparent PKR 6,000 / month pay-as-you-learn",
        note: "Zero registration fees, zero hidden exam charges, cancel anytime"
      },
      traditional: {
        text: "PKR 45,000 to 120,000 upfront + admission & exam fees",
        note: "Institutes charge steep lump sums plus fees for certificates"
      }
    },
    {
      feature: "Money-Back Guarantee",
      category: "Investment",
      mentorArena: {
        text: "100% Refund Exemption on your 1st live session",
        note: "If our mentorship doesn't match your goals, zero-questions refund"
      },
      traditional: {
        text: "Strict non-refundable deposit & registration policies",
        note: "Once you sign the fee slip, fees are strictly non-refundable"
      }
    }
  ];

  const faqs = [
    {
      q: "Why is 1-to-1 mentorship more effective than physical computer institutes like PNY or Omni?",
      a: "In a physical computer training institute, 30 to 50 students sit in a crowded computer lab. The instructor lectures from a podium for 40 minutes, and during the remaining 20 minutes, they attempt to answer questions from 40 different learners. Most students wait 15 minutes with their hand raised just to get a 30-second explanation. With 1-to-1 mentorship, 100% of the 150 hours is focused solely on your screen, your code, and your understanding."
    },
    {
      q: "Do employers care whether I have an institute diploma or a 1-to-1 portfolio?",
      a: "In 2026, global tech companies, software agencies, and freelance clients on Upwork/Fiverr do not hire based on a printed cardboard diploma from a local Pakistani institute. They evaluate your GitHub repositories, your deployed live applications (Vercel/Railway), and your documented live SEO ranking case studies. Mentor Arena focuses 100% on shipping production-grade proof of work."
    },
    {
      q: "What about the commute to institutes in Karachi, Lahore, or Islamabad?",
      a: "Commuting across cities like Karachi (Shahrah-e-Faisal/Clifton), Lahore (Arfa Tower/Gulberg), or Rawalpindi/Islamabad (Blue Area) wastes 2 to 3 hours in traffic and costs thousands in fuel or Careem/Indrive fares every week. You arrive at class mentally exhausted. Mentor Arena delivers ultra-high-definition screen sharing from your home desk, saving you time, energy, and money."
    },
    {
      q: "Who is teaching me at Mentor Arena versus traditional institutes?",
      a: "Traditional institutes frequently employ recent graduates or junior contractors whom they pay modest hourly rates, while charging students high tuition. At Mentor Arena, you are mentored directly by Fazal Shahid Latif, a veteran solutions architect and systems engineer with over 30 years of active industry experience."
    },
    {
      q: "Can I try a session before committing to the whole course?",
      a: "Yes! Traditional institutes demand non-refundable registration and multi-month fees before you even meet the trainer. At Mentor Arena, you pay an affordable PKR 6,000/month, and your very first live screen session is backed by an unconditional 100% money-back refund guarantee."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Header Section */}
      <section className="bg-slate-950 text-white pt-10 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15),transparent_50%)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
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
            <span className="text-blue-400 font-bold">Traditional Institutes vs. 1-to-1</span>
          </div>

          {/* Quick Comparison Toggle */}
          <div className="inline-flex p-1 bg-zinc-900/90 border border-zinc-800 rounded-2xl mb-8">
            <button
              onClick={() => onNavigate('/compare/iskills-vs-mentorarena')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
            >
              iSkills vs. Mentor Arena
            </button>
            <button
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-blue text-white shadow-md shadow-blue-900/40"
            >
              Traditional Institutes vs. 1-to-1
            </button>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Traditional Training Academies vs. 1-to-1 Mentorship
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Traditional IT Institutes vs. 1-to-1 Mentorship: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Crowded Computer Labs vs. Dedicated Private Screen Coaching
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
              Tired of 2-hour traffic jams, 40-student crowded computer labs, junior slide-readers, and generic theoretical certificates? Compare traditional computer institutes (PNY, Omni, IDM, local academies) with personalized 1-to-1 direct screen mentorship.
            </p>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8">
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-semibold mb-1">Attention Model</div>
              <div className="text-blue-400 font-bold text-lg">100% Private</div>
              <div className="text-[11px] text-gray-500">No sharing instructor</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-semibold mb-1">Time Saved</div>
              <div className="text-emerald-400 font-bold text-lg">Zero Commute</div>
              <div className="text-[11px] text-gray-500">Save 10+ hrs/week traffic</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-semibold mb-1">Mentor Profile</div>
              <div className="text-blue-400 font-bold text-lg">30+ Years Veteran</div>
              <div className="text-[11px] text-gray-500">Fazal Shahid Latif</div>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 font-semibold mb-1">Monthly Cost</div>
              <div className="text-emerald-400 font-bold text-lg">PKR 6,000 / mo</div>
              <div className="text-[11px] text-gray-500">Pay as you learn</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/10 mb-3 inline-block">
            Comprehensive Audit Matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Mentor Arena vs. Traditional Pakistani Institutes
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            See how the 1-to-1 modern digital mentorship model compares directly with legacy physical computer training centers.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-extrabold text-gray-700 uppercase tracking-wider w-1/3">
                  Dimension / Attribute
                </th>
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-extrabold text-blue-900 uppercase tracking-wider bg-blue-50/80 w-1/3 border-l border-r border-blue-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-blue"></span>
                    <span>Mentor Arena (1-to-1)</span>
                  </div>
                </th>
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-extrabold text-gray-600 uppercase tracking-wider w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                    <span>Traditional Institutes (PNY / Omni)</span>
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
                  <td className="p-4 sm:p-6 align-top bg-blue-50/40 border-l border-r border-blue-100">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 block leading-snug">
                          {row.mentorArena.text}
                        </span>
                        <span className="text-xs text-blue-800 mt-1 block">
                          {row.mentorArena.note}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Traditional Institutes Column */}
                  <td className="p-4 sm:p-6 align-top text-gray-600">
                    <div className="flex items-start gap-2.5">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-700 block leading-snug">
                          {row.traditional.text}
                        </span>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {row.traditional.note}
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

      {/* 3 Real Truths of Traditional Institutes */}
      <section className="py-16 px-4 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 mb-3 inline-block">
              Inside The Classroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              The 3 Frustrations Every Institute Student Experiences
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Why thousands of learners in Karachi, Lahore, and Islamabad leave traditional computer academies disappointed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Frustration 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-5">
                  <Monitor size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  The "Hand Raised in the Lab" Trap
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  In a 40-student computer lab, you get a syntax error. You raise your hand. The instructor is helping three students on the other side of the room. You wait 15 minutes doing nothing. By the time the instructor reaches your screen, class is ending and they rush to leave.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 font-medium">
                <strong>At Mentor Arena:</strong> Zero wait time. Your mentor watches your screen continuously as you write every single line of code.
              </div>
            </div>

            {/* Frustration 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg mb-5">
                  <Car size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Commute Exhaustion & Burnout
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Navigating Karachi or Lahore traffic at 5:00 PM to reach Shahrah-e-Faisal or Arfa Software Park burns 2 to 3 hours of your day. You spend PKR 10,000+ per month on petrol or ride-hailing, and arrive in the classroom drained of mental focus.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 font-medium">
                <strong>At Mentor Arena:</strong> Open your laptop at your scheduled slot time. 100% of your energy is dedicated to deep learning and building.
              </div>
            </div>

            {/* Frustration 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-5">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  The "Slide-Reader" Instructor
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Most institutes pay low hourly wages to junior trainers who simply read bullet points off vendor slide decks. When you ask real-world questions about high-concurrency Node.js microservices or complex programmatic SEO crawling, they change the topic.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 font-medium">
                <strong>At Mentor Arena:</strong> Fazal Shahid Latif brings 30+ years of raw software architecture, having built production systems that serve real global users.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost & Value Comparison */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60 mb-3 inline-block">
              Financial Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Real Cost: Institute Diploma vs. Mentor Arena
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Calculate the true total financial commitment before signing an institute registration slip.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Institute Calculation */}
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
              <div className="text-red-400 font-bold text-base mb-4 flex items-center gap-2">
                <XCircle size={18} /> Traditional Physical Institute (3-Month Diploma)
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>Upfront Course Tuition:</span>
                  <span className="font-bold text-white">PKR 45,000 – 60,000</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>Non-refundable Admission / Registration Fee:</span>
                  <span className="font-bold text-white">PKR 5,000 – 10,000</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>3 Months Petrol / Careem / Transit:</span>
                  <span className="font-bold text-white">PKR 25,000 – 35,000</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span>Exam &amp; Printed Certificate Charges:</span>
                  <span className="font-bold text-white">PKR 3,000 – 5,000</span>
                </div>
                <div className="flex justify-between pt-2 text-sm sm:text-base font-extrabold text-amber-400">
                  <span>Total Realistic Cost:</span>
                  <span>PKR 78,000 – 110,000+</span>
                </div>
                <div className="text-[11px] text-red-300 pt-1">
                  *Non-refundable once batch starts, regardless of satisfaction.
                </div>
              </div>
            </div>

            {/* Mentor Arena Calculation */}
            <div className="bg-emerald-950/40 border border-emerald-700/60 p-6 rounded-2xl">
              <div className="text-emerald-400 font-bold text-base mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} /> Mentor Arena 1-to-1 Mentorship (3 Months)
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-gray-200">
                <div className="flex justify-between pb-2 border-b border-emerald-900/60">
                  <span>Monthly Tuition (PKR 6,000 × 3):</span>
                  <span className="font-bold text-white">PKR 18,000</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-emerald-900/60">
                  <span>Admission &amp; Registration Fee:</span>
                  <span className="font-bold text-emerald-400">PKR 0 (Free)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-emerald-900/60">
                  <span>Commute &amp; Transport Cost:</span>
                  <span className="font-bold text-emerald-400">PKR 0 (100% Online)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-emerald-900/60">
                  <span>Exam &amp; Verification Badge Fee:</span>
                  <span className="font-bold text-emerald-400">PKR 0 (Included)</span>
                </div>
                <div className="flex justify-between pt-2 text-sm sm:text-base font-extrabold text-emerald-300">
                  <span>Total Net Investment:</span>
                  <span>PKR 18,000</span>
                </div>
                <div className="text-[11px] text-emerald-300 pt-1">
                  *Pay monthly. 100% money-back refund on your 1st live session.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/10 mb-3 inline-block">
            Straightforward Truths
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions: Institutes vs. 1-to-1
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
                  <span className={`text-xl transition-transform ${isOpen ? 'rotate-45 text-brand-blue' : 'text-gray-400'}`}>
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

      {/* Bottom CTA Block */}
      <section className="py-16 px-4 bg-brand-blue text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
            Personal Attention That Matters
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Choose Private 1-to-1 Mentorship Over Crowded Labs.
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
            Get personalized live guidance from Fazal Shahid Latif with zero commute and zero upfront risk in {cityName}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto px-8 py-4 bg-white text-brand-blue rounded-xl font-bold text-sm hover:bg-blue-50 transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              <span>Book Free 20-Min Clarity Call</span>
            </button>
            <a
              href={`https://api.whatsapp.com/send?phone=${BUSINESS_INFO.phone.replace(/\s/g, '')}&text=${encodeURIComponent(`Hi Fazal, I'm comparing traditional computer institutes with 1-to-1 mentorship at Mentor Arena. I'd like to discuss my learning path.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
            >
              <MessageSquare size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-blue-200/80 pt-2">
            Tuition is PKR 6,000/month. 100% refund guarantee on your 1st live session.
          </p>
        </div>
      </section>
    </div>
  );
};
