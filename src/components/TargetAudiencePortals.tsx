import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, User, Users, Compass, Award, Shield, CheckCircle, ArrowRight, MessageSquare, Briefcase, FileText, ArrowUpRight, GraduationCap } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface TargetAudiencePortalsProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  onNavigate: (path: string) => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
  initialTab?: 'students' | 'parents' | 'employers';
}

export const TargetAudiencePortals: React.FC<TargetAudiencePortalsProps> = ({
  onBackToHome,
  onBookCall,
  onNavigate,
  selectedCity,
  initialTab = 'students'
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'parents' | 'employers'>(initialTab);
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  // Sync tab with URL paths if necessary
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/audiences/students') {
      setActiveTab('students');
    } else if (path === '/audiences/parents') {
      setActiveTab('parents');
    } else if (path === '/audiences/employers') {
      setActiveTab('employers');
    }
  }, [window.location.pathname]);

  const handleTabChange = (tab: 'students' | 'parents' | 'employers') => {
    setActiveTab(tab);
    onNavigate(`/audiences/${tab}`);
  };

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="audience-portals-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="hover:text-brand-blue transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-400">Target Audiences</span>
          <span>/</span>
          <span className="text-brand-blue capitalize">{activeTab}</span>
        </div>

        {/* Title and Top intro */}
        <div className="mb-12 text-center md:text-left">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest font-mono">
            🎯 Tailored Career Acceleration Tracks in {citySuffix}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[1.1] mb-4">
            Custom Career Target Portals
          </h1>
          <p className="text-base text-gray-650 max-w-3xl leading-relaxed">
            Whether you are an ambitious student aiming to break into modern development, a parent seeking reliable career guidance for your teenager, or an employer looking to onboard pre-evaluated junior creators, our transparent project-based environment meets you exactly where you are.
          </p>
        </div>

        {/* Beautiful Segment Selector Tabs */}
        <div className="flex bg-gray-50 border border-gray-100 p-1.5 rounded-2xl mb-12 max-w-xl mx-auto md:mx-0">
          {[
            { id: 'students', label: 'For Students', icon: GraduationCap },
            { id: 'parents', label: 'For Parents', icon: User },
            { id: 'employers', label: 'For Employers', icon: Briefcase }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as 'students' | 'parents' | 'employers')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={{ minHeight: '44px' }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Portal Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-gray-950 tracking-tight leading-snug">
                    Learn Real Skills with <span className="text-brand-blue">Project-Based Learning</span> in {citySuffix}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Are you tired of endless theoretical slideshows in college and university that don’t translate into real-world code or design? Our <strong>online mentorship program</strong> is designed as a direct bridge into professional tech. We specialize in 1-to-1 and small-batch <strong>digital skills training</strong> where you don't memorize templates—you deploy systems.
                  </p>
                  
                  <div className="space-y-3.5 pt-2">
                    {[
                      "Master Web Dev, Figma UI/UX, or Advanced SEO through real live execution.",
                      "Learn AI practical projects, integrating live server-side APIs securely.",
                      "Formulate comprehensive digital marketing projects with actual meta-ad mockups.",
                      "Acquire direct, actionable career mentor for students advice that lands clients."
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm font-medium text-gray-700">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-8 rounded-[2rem] space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl" />
                  <span className="text-[10px] font-bold text-brand-blue bg-blue-50 border border-brand-blue/10 rounded-full px-3 py-1 font-mono uppercase tracking-wider">
                    Student Career Blueprint
                  </span>
                  <h3 className="text-xl font-bold text-gray-950 tracking-tight">The Freelance & Code Accelerator</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    We prepare students in Pakistan to tap into high-yielding international markets. By training you on modern tools and the exact communication parameters required, you build a stellar global-grade presence.
                  </p>
                  <div className="h-px bg-gray-200" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100">
                      <div>
                        <span className="block text-xs font-bold text-brand-blue uppercase">Freelancing Course Pakistan</span>
                        <span className="text-[10px] text-gray-500 font-medium">Bypass typical Upwork failures and build client channels.</span>
                      </div>
                      <ArrowUpRight className="text-gray-300 w-5 h-5 shrink-0" />
                    </div>
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100">
                      <div>
                        <span className="block text-xs font-bold text-brand-green uppercase">Student Internship Program</span>
                        <span className="text-[10px] text-gray-500 font-medium">We hook qualified students to local/remote SaaS agencies.</span>
                      </div>
                      <ArrowUpRight className="text-gray-300 w-5 h-5 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative Grid */}
              <div className="bg-gray-50 rounded-[2.5rem] border border-gray-100 p-8 md:p-12 space-y-8">
                <h3 className="text-2xl font-black text-gray-950 tracking-tight text-center md:text-left">
                  Four Critical Milestones for Every Student Developer
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { title: "One Live Project", desc: "No random copies. You'll architect, build, and deploy a custom system live on a real web host." },
                    { title: "GitHub Authority", desc: "Craft clean repositories loaded with consistent, meaningful git commits that satisfy tech recruiters." },
                    { title: "High-Intent SEO", desc: "Understand canonical tags, semantic data schema, and technical page audits that secure organic traffic." },
                    { title: "Client Acquisition", desc: "Bypass typical Fiverr competition and secure your first foreign contract." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 space-y-2">
                      <span className="text-xs font-bold text-brand-blue bg-blue-50/75 px-2.5 py-1 rounded-md">Step 0{idx+1}</span>
                      <strong className="block text-gray-950 font-black text-base">{item.title}</strong>
                      <p className="text-xs text-gray-500 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Active Interaction */}
              <div className="p-8 bg-zinc-950 text-white rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none" />
                <div className="space-y-2 text-center md:text-left relative z-10">
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-widest font-mono">🚀 Build the Future Today</span>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">Need a professional roadmap to break the cycle?</h3>
                  <p className="text-xs text-zinc-400 max-w-lg">
                    Schedule a completely free, 20-minute 1-on-1 strategy call with 30-year veteran Fazal Shahid Latif. Map out your goals, evaluate laptop requirements, and unlock true skill dignity.
                  </p>
                </div>
                <button
                  onClick={onBookCall}
                  className="px-8 py-3.5 bg-brand-green hover:bg-emerald-500 transition-all text-gray-950 rounded-xl font-bold flex items-center justify-center gap-2 shrink-0 md:text-sm text-xs relative z-10"
                >
                  Start Your Clarity Call <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'parents' && (
            <motion.div
              key="parents"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Parents Hero Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center font-sans">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-gray-950 tracking-tight leading-snug">
                    Premium <span className="text-[#1A4A7C]">Online Learning with Mentor</span> for Ambitious Teenagers
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    As parents, we want to provide our children with realistic, safe opportunities to stand out in a competitive job market. Traditional academic programs are slow and detached from industry operations. We offer direct certified <strong>skills for teenagers</strong> inside Pakistan.
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/5 border border-brand-blue/15 flex items-center justify-center shrink-0 text-brand-blue">
                        <Shield size={18} />
                      </div>
                      <div>
                        <strong className="block text-gray-950 text-sm font-bold">100% Safe Offline/Online Environment</strong>
                        <p className="text-xs text-gray-500">Every lesson is tracked, and small batches of maximum 6 students ensure high behavioral standards.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0 text-brand-green">
                        <Compass size={18} />
                      </div>
                      <div>
                        <strong className="block text-gray-950 text-sm font-bold">Ethical Career Guidance for Students</strong>
                        <p className="text-xs text-gray-500">No hollow promises of automatic success. We teach high-income work habits, self-discipline, and direct accountability.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
                    <span className="text-[10px] font-bold text-brand-blue bg-blue-50 border border-brand-blue/10 rounded-full px-3 py-1 font-mono uppercase tracking-wider">
                      Parent Priorities
                    </span>
                    <h3 className="text-xl font-bold text-gray-950 tracking-tight">Future Skills for Children</h3>
                    <p className="text-xs text-gray-650 leading-relaxed">
                      We focus on teaching your child the underlying logic of modern software—not just memorizing buttons. They transition into real creators who code with purpose and security.
                    </p>
                    
                    <div className="space-y-3 pt-2">
                      <div className="bg-white p-4 border border-gray-100 rounded-xl">
                        <span className="block text-xs font-bold text-gray-900">Project-Based Education</span>
                        <span className="text-[10px] text-gray-500">Completing physical systems that give structural confidence before university or hiring.</span>
                      </div>
                      <div className="bg-white p-4 border border-gray-100 rounded-xl">
                        <span className="block text-xs font-bold text-gray-900">Transparent Cohort Cost structure</span>
                        <span className="text-[10px] text-gray-500">Affordable monthly fees of PKR 6,000. No massive debt or sudden upfront bills.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative Parent Section */}
              <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 space-y-6 max-w-4xl mx-auto">
                <h3 className="text-2xl font-black text-gray-950 tracking-tight text-center">
                  Why Pakistani Families Count on lead Mentor Fazal Shahid
                </h3>
                <p className="text-sm text-gray-650 text-center max-w-2xl mx-auto leading-relaxed">
                  "I don't sell course slides. I run a digital skill workshop. I help teenagers learn to build, compile, audit, and think logically. Rather than getting lost in crowded 100-person classrooms, they learn 1-on-1 under my direct supervision so that their effort results in real, visible, and persistent technical skill."
                </p>
                <div className="flex justify-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">— FAZAL SHAHID LATIF, Mentor Arena Lead</span>
                </div>
              </div>

              {/* Call to Active Interaction */}
              <div className="p-8 bg-zinc-950 text-white rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none" />
                <div className="space-y-2 text-center md:text-left relative z-10">
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-widest font-mono">🌟 Invest in Their Future</span>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">Need an objective academic review for your child?</h3>
                  <p className="text-xs text-zinc-400 max-w-lg">
                    Book a free, 20-minute, zero-pressure virtual guidance session together. Map student tracks, analyze correct digital careers, and verify what high-income skills are best.
                  </p>
                </div>
                <button
                  onClick={onBookCall}
                  className="px-8 py-3.5 bg-brand-green hover:bg-emerald-500 transition-all text-gray-950 rounded-xl font-bold flex items-center justify-center gap-2 shrink-0 md:text-sm text-xs relative z-10"
                >
                  Schedule Clarity Call <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'employers' && (
            <motion.div
              key="employers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Employers Hero Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-gray-950 tracking-tight leading-snug">
                    Hire <span className="text-brand-green">Job-Ready Students</span> & Project-Based Graduates
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Pakistani tech houses face massive overhead training college grads who lack standard engineering disciplines. We produce thoroughly evaluated, pre-audited, <strong>project-based graduates</strong> who understand git, server proxies, clean APIs, and SEO compliance guidelines.
                  </p>
                  
                  <div className="space-y-3.5 pt-2">
                    {[
                      "Bypass raw academic theory and acquire remote internship talent directly.",
                      "Onboard pre-trained creators who understand clean folder structures.",
                      "Verify student profiles containing real-world live deployed projects.",
                      "Accelerate your talent line while keeping training costs to zero."
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm font-medium text-gray-700">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
                    <span className="text-[10px] font-bold text-brand-green bg-emerald-50 border border-brand-green/10 rounded-full px-3 py-1 font-mono uppercase tracking-wider">
                      Employer Talent Channels
                    </span>
                    <h3 className="text-xl font-bold text-gray-950 tracking-tight">Hire Trained Interns Instantly</h3>
                    <p className="text-xs text-gray-650 leading-relaxed">
                      We maintain a robust internal directory of active student projects representing our cohorts in Karachi, Lahore, and Islamabad. Inspect and recruit talent that fits your stack instantly.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-4 border border-gray-100 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="block text-xs font-bold text-gray-900">MERN Developer Grads</span>
                          <span className="text-[10px] text-gray-500">React, Node, Express, MongoDB, Tailwind.</span>
                        </div>
                        <span className="text-[10px] bg-blue-50 text-brand-blue font-bold px-2 py-0.5 rounded">Full Stack</span>
                      </div>

                      <div className="bg-white p-4 border border-gray-100 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="block text-xs font-bold text-gray-900">SEO & Core Analytics Experts</span>
                          <span className="text-[10px] text-gray-500">Deep structural audits, silo map content, GSC integration.</span>
                        </div>
                        <span className="text-[10px] bg-green-50 text-brand-green font-bold px-2 py-0.5 rounded">SEO Rank</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Active Interaction */}
              <div className="p-8 bg-zinc-950 text-white rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none" />
                <div className="space-y-2 text-center md:text-left relative z-10">
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-widest font-mono">💼 Build Your Tech Team</span>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">Need reliable, pre-vetted coding or SEO interns?</h3>
                  <p className="text-xs text-zinc-400 max-w-lg">
                    Contact us to explore active student profiles. We offer employers free vetting, project audits, and secure communication lines directly to top graduates.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hi%2C%20I'm%20an%20employer%20and%20interested%20in%20hiring%20pre-vetted%20interns%20from%20Mentor%20Arena`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 transition-all text-white rounded-xl font-bold flex items-center justify-center gap-2 shrink-0 md:text-sm text-xs relative z-10"
                >
                  <MessageSquare size={16} /> Onboard Talent via WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
