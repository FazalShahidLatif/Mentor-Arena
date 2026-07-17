import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Users, 
  BookOpen, 
  Zap, 
  CheckCircle, 
  MessageSquare, 
  ArrowRight, 
  Menu, 
  X,
  Clock,
  Wallet,
  Calendar,
  User,
  Award,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Edit3,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Download,
  FileText,
  Linkedin,
  Star,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter as TwitterIcon,
  Globe,
  Cpu,
  Target,
  Lock,
  LogOut,
  ChevronRight,
  GraduationCap,
  Settings
} from 'lucide-react';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
import { 
  BUSINESS_INFO, 
  PRICING, 
  SKILL_PATHS, 
  TIME_SLOTS, 
  COMPARISON_DATA, 
  FAQ_DATA, 
  DAILY_SCHEDULE, 
  COURSE_DETAILS,
  CURRICULUM_FRAMEWORK
} from './constants';
import { SyllabusViewerModal } from './components/SyllabusViewerModal';
import { WebDevelopmentPage } from './components/WebDevelopmentPage';
import { SEOPage } from './components/SEOPage';
import { UIUXPage } from './components/UIUXPage';
import { AboutPage } from './components/AboutPage';
import { PricingPage } from './components/PricingPage';
import { FAQPage } from './components/FAQPage';
import { ReviewsPage } from './components/ReviewsPage';
import { ContactPage } from './components/ContactPage';
import { BlogHubPage } from './components/BlogHubPage';
import { TargetAudiencePortals } from './components/TargetAudiencePortals';
// import { AdminPanel } from './components/AdminPanel';

const LOGO_SVG = "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' rx='20' fill='%231A4A7C'/%3E%3Cpath d='M30 70V30L50 50L70 30V70' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M46 54L54 46' stroke='%234CAF50' stroke-width='6' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='50' r='4' fill='%234CAF50'/%3E%3C/svg%3E";

// Lazy load large components for performance
const AdminPanel = React.lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));

// --- Types & Defaults ---

interface LayoutConfig {
  sections: {
    hero: boolean;
    who: boolean;
    courses: boolean;
    method: boolean;
    comparison: boolean;
    pricing: boolean;
    how: boolean;
    schedule: boolean;
    booking: boolean;
    about: boolean;
    faq: boolean;
    cta: boolean;
  };
  images: {
    mentor: string;
    guestMentor?: string;
    caseStudy?: string;
    heroBg?: string;
    methodVideo?: string;
    methodPoster?: string;
  };
  availability: {
    clarityCalls: boolean[];
    mentorshipSessions: boolean[];
  };
  content: {
    skillPaths: string[];
    timeSlots: string[];
  };
}

const DEFAULT_LAYOUT: LayoutConfig = {
  sections: {
    hero: true,
    who: true,
    courses: true,
    method: true,
    comparison: true,
    pricing: true,
    how: true,
    schedule: true,
    booking: true,
    about: true,
    faq: true,
    cta: true,
  },
    images: {
    mentor: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=60&w=600&h=750",
    guestMentor: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=60&w=600&h=600",
    caseStudy: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=1000&h=600",
    heroBg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=60&w=1280",
    methodVideo: "https://www.youtube.com/watch?v=cTSjAZoXudc",
    methodPoster: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=60&w=1000",
  },
  availability: {
    clarityCalls: [true, true],
    mentorshipSessions: [true, true],
  },
  content: {
    skillPaths: [...SKILL_PATHS],
    timeSlots: [...TIME_SLOTS]
  }
};

// --- Components ---

const CurriculumModule = ({ id, title, description, outcome, icon: IconName }: any) => {
  const Icon = { Globe, Cpu, Target }[IconName] || Globe;
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
      <div className="flex items-start gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 font-mono text-[10px] font-bold uppercase tracking-widest">{id}</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-green to-transparent opacity-30"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
              <Icon size={20} />
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">{title}</h4>
          </div>
          <p className="text-white/70 mb-6 text-sm leading-relaxed">{description}</p>
          <div className="pt-6 border-t border-white/5">
            <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest block mb-2 opacity-70">Outcome</span>
            <p className="text-white font-medium text-sm italic">"{outcome}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MilestoneFramework = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
    {CURRICULUM_FRAMEWORK.pillars.map((pillar: any) => (
      <div key={pillar.id} className="relative group">
        <div className="absolute inset-0 bg-brand-green/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative border-l border-white/10 pl-8 py-4">
          <span className="text-[10px] font-bold text-brand-green tracking-[0.3rem] uppercase block mb-4">
            {pillar.focus}
          </span>
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tighter">{pillar.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed">{pillar.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const AuthoritySyllabus = ({ onOpenSyllabus }: { onOpenSyllabus: (track: 'web-dev' | 'seo' | 'uiux') => void }) => (
  <section id="curriculum" className="py-24 px-4 bg-[#0A1118] relative overflow-hidden">
    {/* Background Decorative Elements */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-brand-blue/15 to-transparent opacity-50 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-brand-green/15 to-transparent opacity-50 pointer-events-none"></div>
    
    <div className="max-w-7xl mx-auto relative text-white">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 rounded-full border border-brand-green/20 text-brand-green text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
            Professional Curriculum
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">The 150-Hour Milestone Framework</h2>
          <p className="text-gray-300 text-lg">We don't just teach theory. We build the <span className="text-white font-semibold">Creator Mindset</span> needed to design, optimize, and ship working projects.</p>
        </div>
        
        <div className="hidden lg:block h-px flex-1 bg-gradient-to-r from-brand-green/20 to-transparent mx-12 mb-6"></div>
      </div>

      <MilestoneFramework />

      <div className="mb-12 flex items-center gap-4">
        <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.5rem]">Deep Dive Modules</h3>
        <div className="h-px flex-1 bg-white/10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {CURRICULUM_FRAMEWORK.modules.map((module: any) => (
          <CurriculumModule key={module.id} {...module} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="p-1 px-1 bg-white/5 border border-white/10 rounded-3xl inline-flex items-center gap-4 group hover:bg-white/10 transition-all">
          <div className="px-6 py-4">
            <p className="text-white/60 text-sm italic">Want the full 24-module roadmap?</p>
          </div>
          <button 
            type="button"
            onClick={() => onOpenSyllabus('web-dev')}
            className="bg-brand-green text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 group-hover:shadow-lg shadow-brand-green/20 transition-all cursor-pointer"
          >
            <Download size={20} /> Access Full 24-Module Interactive Roadmap
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Navbar = ({ 
  onAdminClick, 
  onLoginClick, 
  onLogout, 
  user,
  selectedCity,
  onCityChange,
  activePath,
  onNavigate
}: { 
  onAdminClick: () => void, 
  onLoginClick: () => void, 
  onLogout: () => void, 
  user: any,
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad',
  onCityChange: (city: 'all' | 'karachi' | 'lahore' | 'islamabad') => void,
  activePath: string,
  onNavigate: (path: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed top-0 w-full z-50 flex flex-col">
      {/* Summer Campaign & Semantical Tagline Area with Long Tail Keywords */}
      <div className="bg-gradient-to-r from-brand-blue via-indigo-950 to-neutral-950 text-white text-[10px] md:text-xs font-bold py-2.5 px-4 shadow-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-center md:text-left">
            <span className="bg-brand-green/20 text-brand-green border border-brand-green/35 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold shrink-0 animate-pulse">
              ☀️ Summer IT Accelerator 2026
            </span>
            <span className="text-gray-300">
              Personalized 1-to-1 Web Development, Figma UI/UX, and Advanced SEO coaching.
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider hidden lg:inline">Select City context:</span>
            <div className="flex bg-white/10 rounded-lg p-0.5 border border-white/10">
              {(['all', 'karachi', 'lahore', 'islamabad'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => onCityChange(c)}
                  className={`px-2 py-1 rounded-md text-[9px] md:text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                    selectedCity === c 
                      ? 'bg-brand-blue text-white shadow-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {c === 'all' ? 'All Pakistan' : c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }} 
              className="flex items-center gap-2 group cursor-pointer mr-8 text-left bg-transparent border-0 p-0"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-blue/20 overflow-hidden bg-brand-blue shrink-0">
                <img 
                  src={LOGO_SVG} 
                  alt="Mentor Arena Logo - 1-to-1 Digital Skills Mentorship Academy in Pakistan" 
                  width="40"
                  height="40"
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-bold text-brand-blue tracking-tighter whitespace-nowrap">Mentor <span className="text-brand-green">Arena</span></span>
                <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase whitespace-nowrap">Karachi · Pakistan · Since 2019</span>
              </div>
            </a>
            
            <div className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 ml-auto">
              <div className="flex items-center gap-2.5 lg:gap-4 xl:gap-6 mr-1 lg:mr-3 text-xs lg:text-sm">
                <a 
                  href="/" 
                  onClick={(e) => { e.preventDefault(); onNavigate('/'); }} 
                  className={`transition-all font-bold duration-200 cursor-pointer pb-2 border-b-2 -mb-[2px] ${
                    activePath === '/' 
                      ? 'text-brand-blue border-brand-blue' 
                      : 'text-gray-600 border-transparent hover:text-brand-blue'
                  }`}
                >
                  Home
                </a>
                
                <div className="relative group">
                  <span 
                    className={`transition-all font-bold duration-200 flex items-center gap-1 pb-2 border-b-2 -mb-[2px] cursor-pointer ${
                      activePath.startsWith('/courses') 
                        ? 'text-brand-blue border-brand-blue' 
                        : 'text-gray-600 border-transparent hover:text-brand-blue'
                    }`}
                  >
                    Courses
                    <ChevronRight size={14} className="rotate-90 group-hover:rotate-270 transition-transform text-gray-400 group-hover:text-brand-blue" />
                  </span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-64 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl p-2">
                      <a 
                        href="/courses/web-development" 
                        onClick={(e) => { e.preventDefault(); onNavigate('/courses/web-development'); }} 
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 hover:text-brand-blue rounded-xl transition-all text-xs font-bold text-gray-800 flex items-center justify-between group/item cursor-pointer"
                      >
                        MERN Web Development
                        <span className="text-[10px] px-2 py-0.5 bg-brand-blue/5 text-brand-blue rounded-full font-bold opacity-0 group-hover/item:opacity-100 transition-opacity">Full Stack</span>
                      </a>
                      <a 
                        href="/courses/seo" 
                        onClick={(e) => { e.preventDefault(); onNavigate('/courses/seo'); }} 
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 hover:text-brand-blue rounded-xl transition-all text-xs font-bold text-gray-800 flex items-center justify-between group/item cursor-pointer"
                      >
                        Advanced SEO Training
                        <span className="text-[10px] px-2 py-0.5 bg-brand-green/5 text-brand-green rounded-full font-bold opacity-0 group-hover/item:opacity-100 transition-opacity">SEO Rank</span>
                      </a>
                      <a 
                        href="/courses/uiux-digital-marketing" 
                        onClick={(e) => { e.preventDefault(); onNavigate('/courses/uiux-digital-marketing'); }} 
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 hover:text-brand-blue rounded-xl transition-all text-xs font-bold text-gray-800 flex items-center justify-between group/item cursor-pointer"
                      >
                        UI/UX &amp; Marketing
                        <span className="text-[10px] px-2 py-0.5 bg-yellow-500/5 text-yellow-600 rounded-full font-bold opacity-0 group-hover/item:opacity-100 transition-opacity">Design</span>
                      </a>
                    </div>
                  </div>
                </div>

                <a 
                  href="/pricing" 
                  onClick={(e) => { e.preventDefault(); onNavigate('/pricing'); }} 
                  className={`transition-all font-bold duration-200 cursor-pointer pb-2 border-b-2 -mb-[2px] ${
                    activePath === '/pricing' 
                      ? 'text-brand-blue border-brand-blue' 
                      : 'text-gray-600 border-transparent hover:text-brand-blue'
                  }`}
                >
                  Tuition Fee
                </a>

                <a 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }} 
                  className={`transition-all font-bold duration-200 cursor-pointer pb-2 border-b-2 -mb-[2px] ${
                    activePath === '/contact' 
                      ? 'text-brand-blue border-brand-blue' 
                      : 'text-gray-600 border-transparent hover:text-brand-blue'
                  }`}
                >
                  Contact
                </a>
              </div>
              
              <div className="h-4 w-px bg-gray-200"></div>

              {!user ? (
                <button 
                  onClick={onLoginClick}
                  className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand-blue transition-colors cursor-pointer"
                >
                  <User size={18} /> Student Login
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  {user.role === 'admin' && (
                    <button 
                      onClick={onAdminClick}
                      className="flex items-center gap-2 text-xs font-bold text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full border border-brand-blue/20 hover:bg-brand-blue/10 transition-colors"
                    >
                      <Settings size={14} /> Manage Site
                    </button>
                  )}
                  <span className="text-xs font-bold text-brand-green bg-brand-green/5 px-3 py-1 rounded-full border border-brand-green/20">
                    {user.role === 'admin' ? 'SuperAdmin' : 'Student'}
                  </span>
                  <button 
                    onClick={onLogout}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              )}

              <a 
                href="/contact" 
                onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }} 
                className="bg-brand-blue text-white px-8 py-3 rounded-xl hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/10 font-bold text-sm"
              >
                Start Your Mentorship
              </a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600" aria-label="Toggle navigation menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-6 pt-2 pb-8 space-y-4">
                <a 
                  href="/" 
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); onNavigate('/'); }} 
                  className="block w-full text-left py-2 text-gray-700 font-medium"
                >
                  Home
                </a>
                <div className="border-l-2 border-gray-100 pl-4 space-y-2">
                  <a 
                    href="/courses/web-development" 
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); onNavigate('/courses/web-development'); }} 
                    className="block w-full text-left py-1 text-xs text-gray-600 font-medium"
                  >
                    MERN Web Dev
                  </a>
                  <a 
                    href="/courses/seo" 
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); onNavigate('/courses/seo'); }} 
                    className="block w-full text-left py-1 text-xs text-gray-600 font-medium"
                  >
                    Advanced SEO
                  </a>
                  <a 
                    href="/courses/uiux-digital-marketing" 
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); onNavigate('/courses/uiux-digital-marketing'); }} 
                    className="block w-full text-left py-1 text-xs text-gray-600 font-medium"
                  >
                    UI/UX &amp; Marketing
                  </a>
                </div>
                <a 
                  href="/pricing" 
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); onNavigate('/pricing'); }} 
                  className="block w-full text-left py-2 text-gray-700 font-medium"
                >
                  Tution Fee
                </a>
                <a 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); onNavigate('/contact'); }} 
                  className="block w-full text-left py-2 text-gray-700 font-medium font-bold text-brand-blue"
                >
                  Contact Us
                </a>
                
                {!user ? (
                  <button onClick={() => { setIsOpen(false); onLoginClick(); }} className="block w-full text-left py-2 text-brand-blue font-bold">Student Login</button>
                ) : (
                  <button onClick={() => { setIsOpen(false); onLogout(); }} className="block w-full text-left py-2 text-red-500 font-bold">Logout</button>
                )}
                <a 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); onNavigate('/contact'); }} 
                  className="block w-full py-4 bg-brand-blue text-white rounded-xl text-center font-bold"
                >
                  Join Arena Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

const HeroSection = ({ 
  heroBg, 
  onLoginClick, 
  onAdminClick, 
  user,
  selectedCity
}: { 
  heroBg?: string, 
  onLoginClick: () => void, 
  onAdminClick: () => void, 
  user: any,
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad'
}) => {
  // Localized headlines rich with long-tail keywords for semantic SEO
  const headingText = {
    all: <>Build one real, deployed project in <span className="text-brand-blue">150 live hours</span> — with 1-to-1 mentorship in Pakistan.</>,
    lahore: <>Best MERN Stack Web Development &amp; SEO Mentorship in <span className="text-brand-blue">Lahore</span> — Summer IT Academy</>,
    islamabad: <>Premium Full-Stack Coding &amp; UI/UX Bootcamps in <span className="text-brand-blue">Islamabad &amp; Rawalpindi</span> — 1-to-1 Coaching</> ,
    karachi: <>Master Professional Full-Stack Coding &amp; SEO in <span className="text-brand-blue">Karachi HQ</span> — Build a Real Portfolio</>
  };

  const descText = {
    all: "Mentor Arena is Pakistan's premier small-batch digital skills academy. Whether you are during your student summer vacation in Karachi, Lahore, or Islamabad, our 1-to-1 Web Development, SEO, and Digital Marketing tracks are taught by Fazal Shahid Latif (30+ years in code) with a maximum of 6 students per cohort. You ship a real local business website with google-vetted guidelines.",
    lahore: "Transform your summer vacation 2026 into a professional launchpad in Lahore. Our customized Punjab curriculum focuses on building production-ready apps for local Lahore software houses and remote international startups. Awais Ghani (Lahore-based international SEO strategist) runs guest SEO modules on live ranking hacks inside Gulberg and DHA business niches.",
    islamabad: "Designed for ambitious twin-cities students looking to build highly-paid freelance streams online. Study frontend React apps and modern Figma interactive outlines. Get direct mentorship adjacent to modern Rawalpindi tech initiatives. Use your summer holidays to land agency positions or international remote engineering roles.",
    karachi: "Enforce deep practical mastery in Karachi’s fast-moving software arena. We train you directly inside our MERN structure to craft localized SaaS dashboards. Gain first-class experience conducting rigorous technical SEO audits for Karachi-based real estate and e-commerce startups. You don't read slides—you craft software code blocks."
  };

  const badgeText = {
    all: "Premium Digital Mentorship in Pakistan",
    lahore: "Special Summer Vacation Cohort in Lahore, Punjab",
    islamabad: "Twin Cities (Islamabad/Rawalpindi) Student Accelerator Program",
    karachi: "Karachi HQ — Direct Industrial Code Mentorship"
  };

  return (
    <section className="pt-36 pb-20 px-4 relative overflow-hidden bg-gradient-to-b from-blue-50/20 via-white to-white">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest">
             {user ? `Welcome back, ${user.name}` : badgeText[selectedCity]}
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-950 mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            {headingText[selectedCity]}
          </h1>
          
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            {descText[selectedCity]}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
            {[
              { label: "150 live hours", icon: Clock },
              { label: "1-to-1 + small batch", icon: User },
              { label: "Max 6 students/cohort", icon: Users },
              { label: "1 deployed project", icon: CheckCircle },
              { label: "PKR pricing in local currency", icon: Wallet }
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm text-gray-700 font-medium">
                <feat.icon className="w-4 h-4 text-brand-blue shrink-0" />
                <span>{feat.label}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a 
              href="#booking"
              className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/95 transition-all text-center shadow-lg shadow-brand-blue/10"
            >
              Book a free 20-min clarity call
            </a>
            <a 
              href="https://wa.me/923322137898?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Mentor%20Arena"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} /> WhatsApp us
            </a>
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-gray-50 text-gray-800 border border-gray-200 rounded-xl font-bold hover:bg-gray-100 transition-all text-center"
            >
              See pricing
            </a>
          </div>

          {/* Google Reviews rating element */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600 font-medium">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-yellow-800">4.9/5 from 47 Google reviews</span>
            </div>
            <span className="hidden sm:inline text-gray-300">·</span>
            <span className="text-gray-600">
              {selectedCity === 'all' && "Mentored students in Karachi, Lahore, Islamabad & online across Pakistan"}
              {selectedCity === 'lahore' && "Specifically focused on Lahore students & agency networks in Punjab"}
              {selectedCity === 'islamabad' && "Supporting Islamabad & Rawalpindi twin-city freelancers and SaaS developer cohorts"}
              {selectedCity === 'karachi' && "Empowering modern developers at Clifton & Shahrah-e-Faisal HQ"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const WhoThisIsFor = () => (
  <>
    {/* Why Mentor Arena Section */}
    <section id="why" className="py-24 bg-white px-4 border-b border-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 mb-4 inline-block">
            Our Core Differentiation
          </span>
          <h2 className="text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">Why Mentor Arena</h2>
          <p className="text-lg text-brand-blue font-bold tracking-tight mb-6">
            Small batch. Real project. One mentor who has actually shipped code.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Most online courses give you 40 hours of video and a certificate nobody asks for. University gives you theory without a deployed artifact. Bootcamps run 100-person cohorts where nobody reviews your code. We are built for the student who wants to actually build something real and have a mentor look at their work, week by week, until it ships.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "You ship one real project",
              desc: "Not slides, not theory. You graduate with a deployed web app, a documented SEO audit, or a Figma prototype plus a Meta Ads campaign. Publicly accessible. Portfolio-ready.",
              icon: CheckCircle
            },
            {
              title: "Maximum 6 students per cohort",
              desc: "Small enough that your mentor reviews your code, your design, your campaign. Big enough to learn from your peers. Never a 100-person Zoom where you're a face in a grid.",
              icon: Users
            },
            {
              title: "Taught by a self-taught developer",
              desc: "Fazal Shahid Latif built his first website in the 1990s and has been shipping code, ranking websites, and running digital campaigns ever since. Not a corporate trainer. A practitioner.",
              icon: User
            }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center mb-6">
                <item.icon className="text-brand-blue w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-4">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Key Takeaways Section */}
    <section className="py-24 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/10 mb-4 inline-block">
            In A Nutshell
          </span>
          <h2 className="text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">Key Takeaways</h2>
          <p className="text-gray-600 text-base">What you get from Mentor Arena, in one minute</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "3 Live Programs",
              desc: "Choose from Full-Stack Web Development, SEO, or UI/UX + Digital Marketing."
            },
            {
              title: "150 Live Hours",
              desc: "150 live hours per program, scheduled around your availability in PKT."
            },
            {
              title: "Cohort Size: 1-to-1 or Max 6",
              desc: "Small groups or customized 1-to-1 format fits your exact pace. You pick the format."
            },
            {
              title: "One Deployed Artifact",
              desc: "One deployed, real-world project per student by the end of the program."
            },
            {
              title: "PKR Pricing & Easy Pay",
              desc: "Payment via PKR with convenient JazzCash, EasyPaisa, or direct bank transfer."
            },
            {
              title: "100% Online Delivery",
              desc: "Accessible anywhere in Pakistan via Google Meet / Zoom sessions."
            },
            {
              title: "Practitioner Mentorship",
              desc: "Led by Fazal Shahid Latif with 30+ years of raw development experience."
            },
            {
              title: "Free 20-min Clarity Call",
              desc: "Begin with a free, no-obligation conversation first."
            }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 border-l-2 border-emerald-600 pl-3 mb-3 text-sm">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const SyllabusDownload = ({ onOpenSyllabus }: { onOpenSyllabus?: (track: 'web-dev' | 'seo' | 'uiux') => void }) => {
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const saveLead = async (data: any) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Failed to save lead:', err);
    }
  };

  const generatePDF = async () => {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Dynamic imports for heavy libraries to improve initial load time
      const { jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      
      const getBase64 = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      };
      
      const logoBase64 = LOGO_SVG;
      
      const doc = new jsPDF();
    
    const addThemeBlocks = (pdf: any) => {
      pdf.setFillColor(76, 175, 80); // Brand Green
      pdf.rect(0, 0, 4, 297, 'F');
      pdf.setFillColor(26, 74, 124); // Brand Blue
      pdf.rect(0, 0, 210, 45, 'F');
      
      if (logoBase64) {
        pdf.addImage(logoBase64, 'PNG', 20, 12, 12, 12);
      } else {
        pdf.setFillColor(76, 175, 80); // Brand Green
        pdf.rect(20, 12, 12, 12, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('M', 26, 21, { align: 'center' });
      }
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('MENTOR ARENA', 38, 22);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Premium Digital Mentorship in Pakistan', 38, 30);
    };

    // --- PAGE 1: COVER PAGE ---
    addThemeBlocks(doc);
    let yPos = 100;
    doc.setTextColor(26, 74, 124);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    const title = doc.splitTextToSize('Mentor Arena – 14-Week Digital Skills Mentorship Syllabus', 160);
    doc.text(title, 20, yPos);
    yPos += (title.length * 12) + 10;

    doc.setFontSize(18);
    doc.setTextColor(76, 175, 80);
    doc.text('Web Development · SEO · Content & Digital Marketing', 20, yPos);
    yPos += 20;

    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'italic');
    const promise = doc.splitTextToSize('“A practical, project-based path to your first real portfolio and digital income skills.”', 160);
    doc.text(promise, 20, yPos);
    yPos += 30;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(`Mentored by ${BUSINESS_INFO.accountHolder}`, 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('Based in Karachi, mentoring students across Pakistan (online only).', 20, yPos + 7);
    
    doc.text(`Year: 2026`, 20, 270);

    // --- PAGE 2: OVERVIEW ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('What This Program Is', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const whatIs = [
      '• 1-to-1 or small-batch live mentorship (max 3 students).',
      '• Entirely project-based: you build while you learn.',
      '• 14-week intensive duration with 150+ live hours of coaching.',
      '• Focused on real-world skills that the digital economy actually pays for.'
    ];
    whatIs.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 5;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Who This Is For', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const whoIs = [
      '• University students wanting practical skills alongside their degree.',
      '• Fresh graduates struggling to find work due to lack of experience.',
      '• Career switchers looking to enter the tech or digital marketing space.',
      '• Self-taught learners who feel stuck and need professional direction.',
      '• Anyone in Pakistan wanting to earn in USD through global remote work.'
    ];
    whoIs.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 5;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('By the End, You Will', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const outcomes = [
      '• Have a professional portfolio with at least 3 real-world projects.',
      '• Master industry-standard tools (VS Code, React, Search Console, etc.).',
      '• Understand how to find, pitch, and manage freelance or remote clients.',
      '• Possess the confidence to solve technical problems independently.',
      '• Have a clear roadmap for your specific digital career path.'
    ];
    outcomes.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 5;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Weekly Time Commitment', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const commitment = doc.splitTextToSize('Expect to spend 10–15 hours per week. This includes 4–6 hours of live mentorship sessions and 6–10 hours of independent practice and project work. Consistency is the only secret to success here.', 160);
    doc.text(commitment, 20, yPos);
    yPos += (commitment.length * 5) + 10;

    // --- PAGE 3: WHAT IT IS NOT & PREREQUISITES ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFillColor(255, 240, 240);
    doc.rect(20, yPos, 170, 45, 'F');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(200, 0, 0);
    doc.text('What This Program Is NOT', 25, yPos + 10);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const isNot = [
      '• Not a get-rich-quick scheme or "magic" button.',
      '• Not a pre-recorded video course (it is 100% live).',
      '• Not a guaranteed job placement agency.',
      '• Not for people who won’t practice outside of live sessions.'
    ];
    isNot.forEach((line, i) => {
      doc.text(line, 30, yPos + 20 + (i * 6));
    });
    yPos += 55;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Prerequisites', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const prereqs = [
      '• Basic understanding of English (to read documentation).',
      '• A working laptop (minimum 8GB RAM recommended).',
      '• A stable internet connection for live video calls.',
      '• Willingness to practice at least 10 hours per week.',
      '• An open mind and a thick skin for honest feedback.'
    ];
    prereqs.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 15;

    // --- PAGE 4+: PROGRAM STRUCTURE (PHASES) ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Program Structure (14-Week Roadmap)', 20, yPos);
    yPos += 15;

    const phases = [
      {
        title: 'Phase 1: Foundations & Digital Literacy',
        duration: 'Weeks 1–2',
        topics: ['Internet fundamentals', 'How search engines work', 'Basic HTML/CSS', 'Setting up a professional environment'],
        practice: ['Building your first static page', 'Setting up GitHub', 'Keyword research basics'],
        outcome: 'A live, personal landing page and a professional digital setup.'
      },
      {
        title: 'Phase 2: Web Development Essentials',
        duration: 'Weeks 3–7',
        topics: ['Advanced CSS & Flexbox', 'JavaScript Fundamentals', 'React.js Basics', 'Responsive Design'],
        practice: ['Coding interactive components', 'Cloning a popular UI', 'Debugging real errors'],
        outcome: 'A fully responsive website built from scratch.'
      },
      {
        title: 'Phase 3: SEO, UI/UX & Content Strategy',
        duration: 'Weeks 8–11',
        topics: ['Technical SEO audits', 'On-page optimization', 'Content SILO structures', 'Figma prototypes'],
        practice: ['Optimizing a live site', 'Writing SEO-ready articles', 'Using Search Console & Analytics'],
        outcome: 'A documented SEO audit and optimized pages ranking for specific keywords.'
      },
      {
        title: 'Phase 4: Marketing Automation & Freelancing',
        duration: 'Weeks 12–14',
        topics: ['Email marketing funnels', 'Zapier/Automation', 'Portfolio building', 'Freelance platform mastery'],
        practice: ['Setting up an automated funnel', 'Optimizing LinkedIn/Upwork', 'Mock client pitching'],
        outcome: 'A complete professional portfolio and a ready-to-launch freelance profile.'
      }
    ];

    phases.forEach((phase, i) => {
      if (yPos > 220) {
        doc.addPage();
        addThemeBlocks(doc);
        yPos = 60;
      }

      doc.setFillColor(245, 247, 250);
      doc.rect(20, yPos - 6, 170, 8, 'F');
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 74, 124);
      doc.text(`${phase.title} (${phase.duration})`, 24, yPos);
      yPos += 10;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Topics Covered:', 25, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(phase.topics.join(', '), 55, yPos);
      yPos += 7;

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Practice:', 25, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(phase.practice.join(' • '), 45, yPos);
      yPos += 7;

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(76, 175, 80);
      doc.text('Project Outcome:', 25, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(phase.outcome, 55, yPos);
      yPos += 15;
    });

    // --- PAGE: HOW IT WORKS & EXPECTATIONS ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('How Mentorship Works', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const howWorks = [
      '• Live 1-to-1 or small-batch sessions via Google Meet/Zoom.',
      '• Direct feedback on every assignment you submit.',
      '• Weekly accountability check-ins to ensure you aren’t falling behind.',
      '• 24/7 access to a private WhatsApp group for quick questions.',
      '• We adjust the pace based on your speed—no one gets left behind.',
      '• Real-world simulations: we treat your projects like real client work.'
    ];
    howWorks.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 10;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Student Expectations', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const studentExpect = [
      '• Show up on time for every live session.',
      '• Complete assignments before the deadline.',
      '• Be proactive: ask questions when you are stuck.',
      '• Be honest about your struggles so we can help.',
      '• Respect the mentor’s time and the learning process.'
    ];
    studentExpect.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });

    // --- PAGE: TUITION FEE & FINANCIAL TRANSPARENCY ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Tuition Fee & Financial Transparency', 20, yPos);
    yPos += 12;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const tuitionIntro = doc.splitTextToSize('Our intensive career mentorship program runs for a complete duration of 14 weeks. To support students in Pakistan and make expert-led counseling highly accessible, the tuition fees are transparent and distributed over a monthly payment schedule:', 160);
    doc.text(tuitionIntro, 20, yPos);
    yPos += (tuitionIntro.length * 5) + 10;

    doc.setFillColor(245, 247, 250);
    doc.rect(20, yPos, 170, 42, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Monthly Tuition Structure', 25, yPos + 10);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('• Tuition Fee:', 25, yPos + 18);
    doc.setFont('helvetica', 'bold');
    doc.text('PKR 6,000 per month (per student)', 55, yPos + 18);
    
    doc.setFont('helvetica', 'normal');
    doc.text('• Cycle Schedule:', 25, yPos + 25);
    doc.text('Distributed monthly over the 14-week course active duration.', 55, yPos + 25);

    doc.text('• Payment Methods:', 25, yPos + 32);
    doc.text('Convenient mobile transfer via Easypaisa or JazzCash.', 60, yPos + 32);

    yPos += 52;

    doc.setFillColor(255, 248, 240);
    doc.rect(20, yPos, 170, 32, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(184, 115, 51);
    doc.text('Tuition Fee Notice / Disclaimer', 25, yPos + 8);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const disclaimerLines = doc.splitTextToSize('Please note that the tuition fee does not include any additional charges of personal software licenses, paid subscriptions, domain registration, or web hosting. These external services, if requested or required for your customized live project setup, are to be managed separately.', 160);
    doc.text(disclaimerLines, 25, yPos + 14);

    // --- PAGE: FAQ ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Frequently Asked Questions', 20, yPos);
    yPos += 12;

    const faqs = [
      { q: 'Is this beginner-friendly?', a: 'Yes. We start from the absolute basics of how the internet works.' },
      { q: 'What if I miss a session?', a: 'Since it’s 1-to-1, we can reschedule. However, frequent misses are discouraged.' },
      { q: 'Do I need to know coding before starting?', a: 'No. We will teach you everything you need to know from scratch.' },
      { q: 'Can I focus more on SEO or Web Dev?', a: 'Yes. The mentorship is personalized to your career goals.' },
      { q: 'Will I get help with my portfolio or CV?', a: 'Absolutely. Building your portfolio is a core part of the final phase.' }
    ];

    faqs.forEach(faq => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      const qText = doc.splitTextToSize(`Q: ${faq.q}`, 160);
      doc.text(qText, 20, yPos);
      yPos += (qText.length * 5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const aText = doc.splitTextToSize(`A: ${faq.a}`, 160);
      doc.text(aText, 20, yPos);
      yPos += (aText.length * 5) + 5;
    });

    // --- PAGE: FINAL CTA ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 100;

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Ready to Start?', 20, yPos);
    yPos += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const finalCta = doc.splitTextToSize('If this syllabus feels right for you, the next step is to book a clarity call. We will discuss your goals, answer your questions, and see if we are a good fit for each other.', 160);
    doc.text(finalCta, 20, yPos);
    yPos += (finalCta.length * 6) + 20;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(76, 175, 80);
    doc.text('[Visit mentorarena.online to book your clarity call]', 20, yPos);
    yPos += 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Note: Policies (Privacy, Terms, Refunds) are available on the website.', 20, yPos);

    // Footer for all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(26, 74, 124);
      doc.rect(0, 287, 210, 10, 'F');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('© Mentor Arena - Karachi, Pakistan. All rights reserved.', 105, 293, { align: 'center' });
      doc.text(`Page ${i} of ${pageCount}`, 190, 293, { align: 'right' });
    }

      doc.save('Mentor-Arena-Syllabus.pdf');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
      if (!error) {
        setShowForm(false);
        setEmail('');
      }
    }
    
    // Save lead
    saveLead({ type: 'syllabus_download', email });
  };

  return (
    <div className="mt-12 text-center">
      {!showForm ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-emerald-600 text-emerald-800 rounded-xl font-bold hover:bg-emerald-50 transition-all"
          >
            <Download size={20} /> Download PDF Syllabus
          </button>
          
          <button 
            type="button"
            onClick={() => onOpenSyllabus && onOpenSyllabus('web-dev')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20 group cursor-pointer"
          >
            <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" /> 
            <span>View Interactive Course Explorer</span>
            <div className="ml-2 px-2 py-0.5 bg-emerald-700 text-[10px] rounded-full text-white animate-pulse">LIVE</div>
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-xl"
        >
          <h4 className="font-bold text-gray-900 mb-4">Enter your email to download</h4>
          {error && <p className="text-red-500 text-xs mb-4 p-2 bg-red-50 rounded-lg">{error}</p>}
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none"
            />
            <button 
              onClick={generatePDF}
              disabled={isGenerating}
              className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 disabled:opacity-50"
            >
              {isGenerating ? '...' : 'Download'}
            </button>
          </div>
          <button 
            onClick={() => setShowForm(false)}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Cancel
          </button>
        </motion.div>
      )}
    </div>
  );
};

const CoursesOffered = ({ 
  paths, 
  onSelectTrack, 
  onOpenSyllabus 
}: { 
  paths: string[], 
  onSelectTrack?: (track: 'web-dev' | 'seo' | 'uiux') => void,
  onOpenSyllabus?: (track: 'web-dev' | 'seo' | 'uiux') => void
}) => (
  <section id="courses" className="py-20 px-4 relative overflow-hidden bg-white">
    {/* Decorative Live Line (matches Interactive Course Outline aesthetic) */}
    <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-brand-green to-transparent opacity-20 hidden lg:block"></div>
    <div className="absolute left-8 top-1/2 -rotate-90 origin-left text-[10px] font-bold tracking-[0.5rem] uppercase text-brand-green/30 hidden lg:block">
      Curriculum Framework
    </div>

    <div className="max-w-7xl mx-auto relative bg-white">
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/10 mb-4 inline-block">
          Our Programs
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Three tracks, one principle: ship a real project.</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Pick the program that matches the outcome you want. Every program is 150 live hours, every program ends with a deployed project you can show employers or clients.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          { 
            id: "web-dev",
            title: "Full-Stack Web Development", 
            details: "Build a working MERN-stack web application — React, Node.js, Tailwind CSS, MongoDB. Deployed on Vercel or Railway with a custom domain and a GitHub repo you can show employers.",
            outcome: "A deployed, working web app in your chosen domain."
          },
          { 
            id: "seo",
            title: "Search Engine Optimization (SEO)", 
            details: "Audit, optimize, and rank a real local business website. Learn keyword research, on-page SEO, technical SEO, and backlink strategies — applied to a live site, not a sandbox.",
            outcome: "A documented before/after SEO audit for a real Karachi or Lahore business."
          },
          { 
            id: "uiux",
            title: "UI/UX Design & Digital Marketing", 
            details: "Design a Figma prototype, then build a 4-week Meta Ads campaign plan for a real local business. Creative assets included. Ready to pitch, ready to run.",
            outcome: "A Figma prototype + a Meta Ads campaign plan + creative assets."
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-gray-50 border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-brand-blue mb-4">{item.title}</h3>
              <div className="space-y-4 text-sm mb-6">
                <p><span className="font-bold text-gray-900">What you learn & build:</span> <span className="text-gray-600">{item.details}</span></p>
                <div className="pt-4 border-t border-gray-200/50">
                  <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">Shipped Outcome</span>
                  <p className="text-gray-900 font-semibold leading-relaxed">{item.outcome}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onSelectTrack && onSelectTrack(item.id as any)}
                className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:text-brand-blue/80 transition-all cursor-pointer"
              >
                See full curriculum <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <SyllabusDownload onOpenSyllabus={onOpenSyllabus} />
    </div>
  </section>
);

const MethodSection = ({ videoUrl, posterUrl }: { videoUrl?: string, posterUrl?: string }) => {
  const isEmbed = videoUrl && (
    videoUrl.includes('youtube.com') || 
    videoUrl.includes('youtu.be') || 
    videoUrl.includes('vimeo.com') || 
    videoUrl.includes('embed')
  );

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('embed/')) return url;
    let videoId = '';
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      if (parts[1]) videoId = parts[1].split('?')[0];
    } else if (url.includes('v=')) {
      const parts = url.split('v=');
      if (parts[1]) videoId = parts[1].split('&')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : url;
  };

  const embedUrl = videoUrl ? (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? getYouTubeEmbedUrl(videoUrl) : videoUrl) : '';

  return (
    <section id="method" className="py-20 bg-brand-blue text-white px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">The "Real-World" Mentorship Method</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">1-to-1 Guidance</h3>
                  <p className="text-blue-50">You aren't just a number in a crowded Zoom room. It’s just you and your mentor, focused entirely on your progress.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Project-First Learning</h3>
                  <p className="text-blue-50">We explain the theory while we build your project. No boring long lectures—just immediate application.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Constant Feedback</h3>
                  <p className="text-blue-50">Every line of code or piece of content you write gets reviewed immediately. You learn the right way from day one.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Real Accountability</h3>
                  <p className="text-blue-50">We set milestones together. If you get stuck, your mentor is there to pull you through and keep you on track.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
            {videoUrl ? (
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                {isEmbed ? (
                  <iframe
                    src={embedUrl}
                    title="Mentor Arena Mentorship Method Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <video 
                    src={videoUrl} 
                    poster={posterUrl}
                    className="w-full h-full object-cover" 
                    controls 
                    muted 
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            ) : (
              <div className="aspect-video bg-brand-blue/50 rounded-xl flex items-center justify-center italic text-blue-50 text-center px-6">
                "Mentor Arena cuts the noise so your effort becomes productive. Every project is unique, like human DNA."
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => (
  <section id="comparison" className="py-20 px-4 bg-gray-50 border-t border-b border-gray-100">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full border border-brand-blue/10 mb-4 inline-block">
          Program Matrix
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare the programs</h2>
        <p className="text-gray-600">Which one is right for you?</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-150">
          <thead>
            <tr className="bg-brand-blue text-white text-left">
              <th className="p-6 font-bold text-sm uppercase tracking-wider">Program</th>
              <th className="p-6 font-bold text-sm uppercase tracking-wider">Live Hours</th>
              <th className="p-6 font-bold text-sm uppercase tracking-wider">Cohort Size</th>
              <th className="p-6 font-bold text-sm uppercase tracking-wider">Tech Stack</th>
              <th className="p-6 font-bold text-sm uppercase tracking-wider">Shipped Project</th>
              <th className="p-6 font-bold text-sm uppercase tracking-wider">Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                prog: "Full-Stack Web Development",
                hours: "150",
                cohort: "1-to-1 or max 6",
                stack: "React, Node.js, MongoDB, Tailwind",
                project: "Deployed web app",
                best: "Aspiring full-stack developers, freelancers"
              },
              {
                prog: "SEO",
                hours: "150",
                cohort: "1-to-1 or max 6",
                stack: "Ahrefs, GSC, Screaming Frog, GA4",
                project: "Local business SEO audit",
                best: "Marketers, agency owners, bloggers"
              },
              {
                prog: "UI/UX & Digital Marketing",
                hours: "150",
                cohort: "1-to-1 or max 6",
                stack: "Figma, Meta Ads Manager, Canva",
                project: "Prototype + ad campaign",
                best: "Designers, founders, brand marketers"
              }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">
                <td className="p-6 font-bold text-gray-950 text-sm">{row.prog}</td>
                <td className="p-6 text-gray-700 text-sm font-medium">{row.hours} live hours</td>
                <td className="p-6 text-gray-600 text-sm">{row.cohort}</td>
                <td className="p-6 text-gray-600 font-mono text-xs">{row.stack}</td>
                <td className="p-6 text-brand-blue font-semibold text-sm">{row.project}</td>
                <td className="p-6 text-gray-600 text-sm leading-relaxed">{row.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="py-20 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing and Plans</h2>
        <p className="text-gray-600 mb-4">Invest in a Skill That Pays for Itself</p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">We offer premium live digital skills mentorship in Pakistan. Simple, direct pricing with no hidden surprises.</p>
      </div>
      <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-8">
        {[
          {
            title: "Clarity Call",
            price: "FREE",
            duration: "15-min session (Office Hours only)",
            desc: "Discuss your background, choose which skill path fits you best, and align goals.",
            features: [
              "Direct career alignment counseling",
              "1-to-1 track recommendation",
              "Mon-Sat 10:00-20:00 PKT slots",
              "No commitment necessary"
            ]
          },
          {
            title: "Monthly Tuition Fee",
            price: "PKR 6,000 / month",
            duration: "14-Week Digital Mentorship",
            desc: "Join our comprehensive practical code & strategy coaching, distributed safely over a monthly payment plan.",
            features: [
              "150 Live Hours of Expert Coaching",
              "In-depth tracks (Web Dev, SEO, or UI/UX)",
              "Ultra-small batches or 1-to-1 options",
              "Daily updates & line-by-line code review",
              "Figma assets & sample code packages",
              "Certificate of Completion upon shipping your project"
            ],
            disclaimer: "Note: Tuition fee does not include additional charges of software license/subscription, domain, or hosting.",
            popular: true
          }
        ].map((plan, i) => (
          <div key={i} className={`floating-card p-8 flex flex-col ${plan.popular ? 'border-brand-blue ring-4 ring-brand-blue/5 scale-105 z-10' : ''} relative`}>
            {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">Mentorship Program</span>}
            <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</div>
            <div className="flex items-center gap-2 text-gray-500 mb-6 text-sm">
              <Clock size={16} /> {plan.duration}
            </div>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">{plan.desc}</p>
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-brand-green mt-0.5 shrink-0" /> 
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {plan.disclaimer && (
              <p className="mb-8 p-3 bg-red-50 text-red-800 text-xs rounded-xl border border-red-100 font-medium leading-relaxed">
                ⚠️ {plan.disclaimer}
              </p>
            )}
            <a href="#booking" className={`w-full py-3 rounded-xl font-bold text-center transition-all ${plan.popular ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
              Select {plan.title} Plan
            </a>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-gray-500 italic text-sm">Easypaisa and JazzCash are supported. Everything is double-confirmed on WhatsApp.</p>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-gray-50 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How Enrollment Works</h2>
        <p className="text-gray-600">Follow these simple steps to start your digital future.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        {[
          { title: "Book a Clarity Call", desc: "Pick a time that works for you." },
          { title: "Discuss Goals", desc: "We talk background and skill paths." },
          { title: "Confirm Plan", desc: "Agree on timing and intensity." },
          { title: "Secure Spot", desc: "Pay via Easypaisa or JazzCash." },
          { title: "WhatsApp Proof", desc: "Share screenshot for confirmation." },
          { title: "Start Learning", desc: "Get dashboard access and schedule." }
        ].map((step, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg shadow-brand-blue/20">
              {i + 1}
            </div>
            <h3 className="font-bold mb-2 text-sm text-gray-950">{step.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 p-8 bg-white rounded-3xl border border-gray-100 text-center max-w-2xl mx-auto">
        <p className="text-gray-600 mb-6">Easypaisa and JazzCash are our standard payment methods. All payment details and schedules are double-confirmed over WhatsApp for your peace of mind.</p>
        <div className="flex justify-center items-center gap-10 opacity-70 transition-all duration-500">
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="text-sm font-black text-gray-850 tracking-tighter">easy<span className="text-emerald-800">paisa</span></span>
          </div>
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="text-sm font-black text-gray-850 tracking-tighter">Jazz<span className="text-red-700">Cash</span></span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ScheduleSection = ({ availability }: { availability: LayoutConfig['availability'] }) => (
  <section className="py-20 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Schedule</h2>
        <p className="text-gray-600">We offer flexible slots for clarity calls and intensive mentorship sessions.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-brand-blue/5 p-8 rounded-3xl border border-brand-blue/10">
          <h3 className="text-xl font-bold text-brand-blue mb-6 flex items-center gap-2">
            <MessageSquare className="text-brand-blue" /> Clarity Calls
          </h3>
          <div className="space-y-4">
            {DAILY_SCHEDULE.clarityCalls.map((time, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <span className="font-semibold text-gray-700">{time}</span>
                {availability.clarityCalls[i] ? (
                  <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full uppercase">Available</span>
                ) : (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase">Fully Booked</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-brand-blue font-semibold italic">
            * Clarity calls are 15-minute focused sessions to align your goals.
          </p>
        </div>

        <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Zap className="text-emerald-750" /> Mentorship Sessions
          </h3>
          <div className="space-y-4">
            {DAILY_SCHEDULE.mentorshipSessions.map((session, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <div>
                  <span className="font-semibold text-gray-700 block">{session.time}</span>
                  <span className="text-xs text-gray-500">{session.duration} Intensive Session</span>
                </div>
                {availability.mentorshipSessions[i] ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">Live</span>
                ) : (
                  <span className="text-xs font-bold text-red-750 bg-red-50 px-3 py-1 rounded-full uppercase">Closed</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-emerald-800 font-semibold italic">
            * 2 sessions daily. Each session is 4 hours of hands-on mentorship.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const BookingSection = ({ paths, slots }: { paths: string[], slots: string[] }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    path: '',
    slot: '',
    plan: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Save lead to server
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          ...formData
        }),
      });
    } catch (err) {
      console.error('Failed to save lead:', err);
    }

    setSubmitted(true);
    setIsSubmitting(false);
    
    const mailBody = `
      Full Name: ${formData.name}
      WhatsApp: ${formData.whatsapp}
      Skill Path: ${formData.path}
      Time Slot: ${formData.slot}
      Plan: ${formData.plan}
      Notes: ${formData.notes}
    `;
    
    window.location.href = `mailto:${BUSINESS_INFO.adminEmail}?subject=New Booking Request - ${formData.name}&body=${encodeURIComponent(mailBody)}`;
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 px-4 bg-brand-blue/5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto bg-white p-12 rounded-3xl text-center shadow-xl border border-brand-blue/10"
        >
          <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Request Submitted!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We have received your details. A mentor will reach out to you on WhatsApp within 24 hours to confirm your slot and guide you through the next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`https://api.whatsapp.com/send?phone=${BUSINESS_INFO.phone.replace(/\s/g, '')}&text=${encodeURIComponent("Hi Mentor Arena, I just submitted the booking form on your website. Looking forward to connecting!")}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-brand-green text-white rounded-xl font-bold hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} /> Confirm on WhatsApp
            </a>
            <button onClick={() => { setSubmitted(false); setStep(1); }} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all">
              Back to Start
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 px-4 bg-brand-blue/5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-brand-blue/10">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <div className="h-px flex-grow bg-gray-100"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {step === 1 ? 'Step 1: Basic Information' : 'Step 2: Plan & Details'}
            </h2>
            <p className="text-gray-600">
              {step === 1 
                ? 'Tell us who you are and what you want to learn. We\'ll use your WhatsApp to coordinate.' 
                : 'Choose your mentorship track and view coordination details below.'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="booking-name" className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input 
                    id="booking-name"
                    required
                    type="text" 
                    value={formData.name}
                    placeholder="Enter your full name"
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-whatsapp" className="text-sm font-semibold text-gray-700">WhatsApp Number</label>
                  <input 
                    id="booking-whatsapp"
                    required
                    type="tel" 
                    value={formData.whatsapp}
                    placeholder="e.g. 0300 1234567"
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="skill-path-select" className="text-sm font-semibold text-gray-700">Preferred Skill Path</label>
                  <select 
                    id="skill-path-select"
                    required
                    value={formData.path}
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white transition-all"
                    onChange={(e) => setFormData({...formData, path: e.target.value})}
                  >
                    <option value="">Select a path</option>
                    {paths.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="call-slot-select" className="text-sm font-semibold text-gray-700">Preferred Call Slot</label>
                  <select 
                    id="call-slot-select"
                    required
                    value={formData.slot}
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white transition-all"
                    onChange={(e) => setFormData({...formData, slot: e.target.value})}
                  >
                    <option value="">Select a slot</option>
                    {slots.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Choose Your Plan</label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { id: 'Clarity Call', label: 'Clarity Call', price: 'FREE' },
                      { id: 'Monthly Tuition Fee', label: 'Monthly Tuition Fee', price: 'PKR 6,000/mo' }
                    ].map(plan => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setFormData({...formData, plan: plan.id})}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${formData.plan === plan.id ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-100 hover:border-gray-200'}`}
                      >
                        <div className="font-bold text-gray-900">{plan.label}</div>
                        <div className="text-sm text-brand-blue font-bold">{plan.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.plan === 'Clarity Call' ? (
                  <div className="p-6 bg-brand-blue/5 rounded-3xl border border-brand-blue/10">
                    <h4 className="font-bold text-brand-blue mb-3 flex items-center gap-2">
                      <Clock size={18} /> Booking Confirmation (Free session)
                    </h4>
                    <p className="text-sm text-brand-blue/80 leading-relaxed">
                      Our Clarity Calls are <strong>100% FREE</strong> and scheduled during office hours: <strong>Mon-Sat 10:00-20:00 PKT only</strong>. We will contact you over WhatsApp to align on your preferred 15-minute slot and share the Google Meet conference link.
                    </p>
                  </div>
                ) : (
                  <div className="p-6 bg-brand-blue/5 rounded-3xl border border-brand-blue/10 space-y-4">
                    <div>
                      <h4 className="font-bold text-brand-blue mb-3 flex items-center gap-2">
                        <Wallet size={18} /> Payment Instructions
                      </h4>
                      <p className="text-sm text-brand-blue/80 mb-4 leading-relaxed flex items-center flex-wrap gap-2">
                        Please send the monthly fee of <strong>PKR 6,000</strong> to <strong>{BUSINESS_INFO.phone}</strong> ({BUSINESS_INFO.accountHolder}) via:
                        <span className="inline-flex items-center gap-3 bg-white/50 px-3 py-1 rounded-full border border-brand-blue/10">
                          <span className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase">Easypaisa</span>
                          <span className="text-[10px] font-bold opacity-30">|</span>
                          <span className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase">JazzCash</span>
                        </span>
                      </p>
                    </div>
                    
                    <p className="p-3 bg-red-50 text-red-800 text-xs rounded-xl border border-red-100 font-medium leading-relaxed">
                      ⚠️ <strong>Note:</strong> Tuition fee does not include additional charges of software license/subscription, domain, or hosting.
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Upload Payment Proof (Optional)</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-brand-blue/90"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const whatsappUrl = `https://api.whatsapp.com/send?phone=${BUSINESS_INFO.phone.replace(/\s/g, '')}&text=${encodeURIComponent(`Hi Mentor Arena, I have just uploaded my payment proof for the ${formData.plan} (${formData.path}). Here is my name: ${formData.name}`)}`;
                              window.open(whatsappUrl, '_blank');
                            }
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 italic">
                        * After selecting your screenshot, you can also send it directly to our WhatsApp for instant verification.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Additional Notes (Optional)</label>
                  <textarea 
                    rows={3}
                    value={formData.notes}
                    placeholder="Anything else you'd like us to know?"
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {step === 2 && (
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  Back to Step 1
                </button>
              )}
              <button 
                type="submit" 
                disabled={isSubmitting || (step === 2 && !formData.plan)}
                className="flex-grow py-4 bg-brand-blue text-white rounded-2xl font-bold text-lg hover:bg-brand-blue/90 shadow-xl shadow-brand-blue/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  step === 1 ? 'Continue' : 'Confirm Booking'
                )}
              </button>
            </div>
            <p className="text-center text-xs text-gray-600 font-medium">
              {step === 1
                ? 'Your information is secure. We only use it to coordinate your mentorship.'
                : 'By confirming, you agree to our terms. We will contact you on WhatsApp to finalize onboarding.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = ({ caseStudyImage }: { caseStudyImage?: string }) => (
  <section className="py-24 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Verified Success on Google</h2>
        <p className="text-lg text-gray-600">See what our students are saying about their journey at Mentor Arena.</p>
      </div>

      {/* Google Trust Banner */}
      <div className="mb-16 bg-gray-50/50 border border-gray-100 rounded-[3rem] p-8 md:p-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Verified Google Reviews of Mentor Arena Lahore & Karachi" 
                width="24"
                height="24"
                className="w-6 h-6"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/30 text-yellow-400'}`} />
                ))}
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">4.8/5 Rating on Google</div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-700 leading-relaxed italic">
              "Mentor Arena holds a top-tier 4.8-star rating with verified reviews. Our commitment to 1-to-1 practical mentorship ensures every student gets the attention they deserve."
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://www.google.com/search?q=Mentor+Arena+Karachi+Reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20"
            >
              Check Live Google Reviews
              <ExternalLink size={16} />
            </a>
            <div className="px-6 py-3 bg-white border border-gray-100 rounded-full text-sm font-semibold text-gray-600 flex items-center gap-2">
              <CheckCircle size={16} className="text-brand-green" />
              Verified via Google Business
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {[
          { 
            quote: "Fazal Sahib's approach is unique. He doesn't just teach code; he teaches you how to think like a product owner. After 12 weeks, I built a custom SaaS MVP that I'm now pitching to clients.",
            name: "Arsalan Malik",
            city: "Karachi",
            path: "Full-Stack Web Dev",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
          },
          { 
            quote: "The 1-to-1 mentorship is a game-changer. Awais Ghani's guest sessions on SEO provided insights you can't find in any online course. My project is now ranking on page 1 for targeted keywords.",
            name: "Mariam Tariq",
            city: "Lahore",
            path: "SEO Specialist",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
          }
        ].map((t, i) => (
          <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 relative group hover:bg-white hover:shadow-xl transition-all duration-300">
            <MessageSquare className="absolute top-6 right-8 text-brand-blue/10 w-12 h-12" />
            
            <div className="flex gap-4 items-center mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
                <img 
                  src={t.image} 
                  alt={`Review of Mentor Arena by ${t.name} from ${t.city} - ${t.path} Mentorship Student`} 
                  width="64"
                  height="64"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 group-hover:text-brand-blue transition-colors">{t.name}</div>
                <div className="text-sm text-gray-600 font-medium">{t.city} • {t.path}</div>
              </div>
            </div>

            <p className="text-lg text-gray-800 italic leading-relaxed relative z-10">"{t.quote}"</p>
          </div>
        ))}
      </div>

      {/* Case Study Placeholder */}
      <div className="bg-brand-blue rounded-[3rem] p-8 md:p-16 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">Student Case Study</div>
            <h3 className="text-3xl font-bold mb-6">From Zero to SaaS MVP in 4 Months</h3>
            <p className="text-blue-50 mb-8 leading-relaxed">
              Junaid joined Mentor Arena with limited technical knowledge. Through our 1-to-1 project-based track, he built and deployed a fully functional Sales Dashboard for a local Karachi agency. He now works as a Junior Full-Stack Developer while scaling his own freelance business.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold overflow-hidden border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=60&w=100&h=100" 
                  alt="Junaid S. from Karachi - Mentor Arena Full-Stack Web Development Student Success Story Profile Portrait" 
                  width="48"
                  height="48"
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                  decoding="async"
                />
              </div>
              <div>
                <div className="font-bold">Junaid S.</div>
                <div className="text-sm text-blue-200">Karachi • Full-Stack Dev</div>
              </div>
            </div>
          </div>
          <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <img 
              src={caseStudyImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800"} 
              alt="SaaS Analytics Dashboard Project Built by Mentor Arena Student in Karachi Pakistan - Digital Skills Development Success" 
              width="600"
              height="337"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const resolvePhotoUrl = (url?: string) => {
  if (!url) return "";
  if (url.includes("photos.google.com") || url.includes("photos.app.goo.gl")) {
    return `/api/resolve-photo?url=${encodeURIComponent(url)}`;
  }
  return url;
};

const AboutMentor = ({ image, guestImage }: { image: string, guestImage?: string }) => (
  <section id="about" className="py-24 px-4 bg-gray-50 border-t border-b border-gray-100">
    <div className="max-w-7xl mx-auto">
      {/* Main Mentor: Fazal Shahid Latif */}
      <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
        <div className="order-2 lg:order-1">
          <div className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
            Lead Mentor
          </div>
          <h2 className="text-4xl font-extrabold text-gray-950 mb-3 tracking-tight leading-tight">Fazal Shahid Latif — Karachi, 30+ years in code</h2>
          <p className="text-brand-blue font-semibold text-base mb-6">Fazal Shahid Latif, web development mentor and founder of Mentor Arena, Karachi</p>
          <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              I built my first website in the 1990s, when the web was plain HTML and a dial-up modem. I never went to a coding bootcamp. I never had a CS degree. I learned by shipping, breaking, and shipping again. I have been doing this for over 30 years now, and I have been mentoring students remotely across Pakistan since 2019.
            </p>
            <p>
              What I offer is not a curriculum I read about. It is the actual practice of building things, ranking things, and teaching others how to do the same. My goal is to bridge the gap between academic learning and what a real project actually demands — and to do it in small groups where every student gets a real look at their work.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-gray-150 shadow-sm">
              <span className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Background</span>
              <span className="font-semibold text-gray-900 text-sm">Self-taught developer since 1990s</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-150 shadow-sm">
              <span className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Mentoring Track</span>
              <span className="font-semibold text-gray-900 text-sm">Mentoring since 2019</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-150 shadow-sm">
              <span className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Base</span>
              <span className="font-semibold text-gray-900 text-sm">Karachi, Pakistan</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-150 shadow-sm">
              <span className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Domain Expertise</span>
              <span className="font-semibold text-gray-900 text-sm">Full-stack, SEO, Digital Marketing</span>
            </div>
          </div>

          <div className="mt-8">
            <a 
              href="https://www.linkedin.com/in/fazal-shahid-mentor/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-brand-blue font-bold px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-sm"
            >
              <Linkedin size={18} className="text-[#0A66C2]" /> Read full mentor profile &rarr;
            </a>
          </div>
        </div>
        <div className="order-1 lg:order-2 sticky top-24">
          <div className="aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden relative shadow-2xl">
            <img 
              src={resolvePhotoUrl(image)} 
              alt="Fazal Shahid Latif - Lead Mentor, Educator & Full Stack Web Developer at Mentor Arena Karachi Pakistan" 
              width="600"
              height="750"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Guest Mentor: Awais Ghani */}
      <div className="bg-gray-100 rounded-[3rem] p-8 md:p-12 border border-gray-200/50">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white mx-auto max-w-xs lg:max-w-none">
              <img 
                src={resolvePhotoUrl(guestImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=800")} 
                alt="Awais Ghani - Guest Mentor and Search Engine Optimization (SEO) Specialist at Mentor Arena Lahore Pakistan" 
                width="400"
                height="400"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
              Guest Mentor
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950 mb-2 leading-tight">Guest mentor: Awais Ghani — Lahore, SEO specialist</h3>
            <p className="text-gray-600 font-semibold text-sm md:text-base mb-4">Awais Ghani, SEO specialist and guest mentor at Mentor Arena, Lahore</p>
            <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
              Awais started his SEO journey with Fazal Shahid Latif through 1-to-1 remote mentoring almost five years ago. He now works on international SEO projects and returns as a guest mentor to help students sharpen their search strategies and stay current on Google's algorithm changes.
            </p>
            <a 
              href="https://www.linkedin.com/in/awais-ghani-seo" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm group text-sm"
            >
              <Linkedin size={18} className="text-[#0A66C2]" />
              View LinkedIn Profile
              <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section id="faq" className="py-20 bg-gray-50 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions about Mentorship in Pakistan</h2>
        <p className="text-gray-600">Everything you need to know about our project-based learning model.</p>
      </div>
      <div className="space-y-4">
        {FAQ_DATA.map((item, i) => (
          <details key={i} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <summary className="p-6 cursor-pointer flex justify-between items-center font-bold text-gray-800 list-none">
              {item.question}
              <span className="transition-transform group-open:rotate-180">
                <HelpCircle size={20} className="text-gray-400" />
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const RegionalSEOHub = ({ 
  selectedCity, 
  onCitySelect 
}: { 
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad', 
  onCitySelect: (city: 'all' | 'karachi' | 'lahore' | 'islamabad') => void 
}) => {
  const hubs = [
    {
      id: 'lahore',
      city: 'Lahore',
      title: 'Punjab’s High-Growth Coding Corridor',
      description: 'Supercharge your summer vacation with advanced React & Node coding systems or industry-vetted SEO strategies targeting Lahore’s elite digital agencies.',
      opportunities: 'High demand for developers & analysts in Gulberg, DHA, Johar Town, and Arfa Software Technology Park.',
      entrySalary: 'PKR 80,000 – 180,000/month',
      keywords: [
        'web development course in Lahore with hands-on coding',
        'best SEO training institute in Lahore with live client projects',
        'learn React JS and Express backend with top Lahore developers',
        'Lahore software house internship training and MERN stack certifications'
      ],
      linkText: 'Activate Lahore Track Targeting'
    },
    {
      id: 'islamabad',
      city: 'Islamabad & Rawalpindi',
      title: 'Capital’s Freelance & SaaS Hub',
      description: 'Acquire direct remote tech mastery. Learn professional Figma modern interfaces and Meta Ad budgets to secure high-ticket Upwork / Fiverr contract accounts.',
      opportunities: 'Exceptional for universities (NUST, FAST, COMSATS) students seeking remote international US/UK clients & active Blue Area SaaS positions.',
      entrySalary: 'USD 800 – 3,000/month (Freelance/Remote)',
      keywords: [
        'UI UX design and Figma training bootcamp in Islamabad Rawalpindi',
        'premium MERN stack software developer courses in Islamabad',
        'how to learn digital marketing and run local Meta ads in Islamabad',
        'summer vacation computer short courses for students in Rawalpindi'
      ],
      linkText: 'Activate Islamabad & Rwp Targeting'
    },
    {
      id: 'karachi',
      city: 'Karachi HQ',
      title: 'Financial Capital Enterprise Stack',
      description: 'Tackle heavy backends and database dynamics. Conduct technical SEO audits for Karachi’s fast-moving high-conversion e-commerce agencies.',
      opportunities: 'Build localized API dashboard infrastructures for tech centers in Clifton, Shahrah-e-Faisal, and Gulshan-e-Iqbal.',
      entrySalary: 'PKR 100,000 – 250,000/month',
      keywords: [
        'advanced full stack web developer bootcamps in Karachi Pakistan',
        'karachi e-commerce digital marketing and local SEO specialist course',
        '1-to-1 physical location or online coding mentorship in Karachi',
        'how to become high income developer in Karachi without CS degree'
      ],
      linkText: 'Activate Karachi HQ Targeting'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white px-4 border-t border-b border-gray-100 relative overflow-hidden">
      {/* Abstract background mesh for high quality aesthetic */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-4 py-1.5 rounded-full border border-brand-blue/10 mb-4 inline-block">
            ☀️ Pakistan Summer Vacation 2026 Campaigns
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight leading-tight">
            Targeting Local Tech Ecosystems
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-medium">
            Select your region to inspect localized tech salary indicators, target software houses, and summer vacation modules with search-optimized long tail frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {hubs.map((hub) => {
            const isActive = selectedCity === hub.id;
            return (
              <div 
                key={hub.id}
                className={`flex flex-col rounded-3xl p-8 border hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${
                  isActive 
                    ? 'bg-blue-950 text-white border-brand-blue shadow-brand-blue/10' 
                    : 'bg-white text-gray-900 border-gray-100 hover:border-gray-300'
                }`}
              >
                {isActive && (
                  <div className="absolute top-4 right-4 bg-brand-green text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    Currently Selected View
                  </div>
                )}
                
                <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${isActive ? 'text-brand-green' : 'text-brand-blue'}`}>
                  {hub.city}
                </span>
                
                <h3 className="text-xl font-black tracking-tight mb-4">{hub.title}</h3>
                
                <p className={`text-sm leading-relaxed mb-6 ${isActive ? 'text-blue-100' : 'text-gray-600'}`}>
                  {hub.description}
                </p>

                <div className={`p-4 rounded-2xl mb-6 text-xs leading-relaxed space-y-2 ${isActive ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div>
                    <strong className={isActive ? 'text-white' : 'text-gray-900'}>🚀 Local Career Path: </strong>
                    <span className={isActive ? 'text-blue-200' : 'text-gray-600'}>{hub.opportunities}</span>
                  </div>
                  <div className="pt-2 border-t border-brand-blue/10">
                    <strong className={isActive ? 'text-white' : 'text-gray-900'}>💰 Avg Entry Salary: </strong>
                    <span className={`${isActive ? 'text-emerald-400' : 'text-emerald-800'} font-bold text-sm`}>{hub.entrySalary}</span>
                  </div>
                </div>

                {/* Long Tail Semantic Keywords section for crawlers and semantic value */}
                <div className="mt-auto space-y-3">
                  <h4 className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                    🎯 Frequently Searched Career Keywords
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    {hub.keywords.map((kw, idx) => (
                      <li key={idx} className={`flex items-start gap-1.5 font-mono italic leading-normal ${isActive ? 'text-blue-200/80' : 'text-gray-600'}`}>
                        <span className={`${isActive ? 'text-emerald-400' : 'text-emerald-700'} font-bold shrink-0`}>✓</span>
                        {kw}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      onCitySelect(hub.id as any);
                      const targetElem = document.getElementById('why');
                      if (targetElem) {
                        targetElem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`mt-6 w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 ${
                      isActive 
                        ? 'bg-brand-green text-white hover:bg-emerald-500 shadow-md' 
                        : 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/15'
                    }`}
                  >
                    {isActive ? '✓ Selected Region Loaded' : hub.linkText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Semantic SEO Target Panel explaining 'why' to students */}
        <div className="p-8 md:p-12 bg-gray-50 border border-gray-100 rounded-[2.5rem] leading-relaxed relative overflow-hidden">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-brand-blue/5 to-transparent pointer-events-none"></div>
          <h3 className="text-xl md:text-2xl font-black text-gray-950 tracking-tight mb-4">
            🎓 Leveraging Your Summer Break in Pakistan: Academic &amp; Career Benefits
          </h3>
          <p className="text-sm text-gray-600 max-w-4xl mb-6">
            School, college, and university holidays throughout Karachi, Lahore, and Islamabad offer a critical, high-value window of opportunity. While typical academies run theoretical 50-person classes, Mentor Arena connects you 1-to-1 with lead engineers to master modern web stacks, semantic rank engineering, and client pipelines in 150 project-based live hours.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-gray-700">
            <div className="space-y-2">
              <strong className="text-gray-900 block font-bold text-sm">✓ High Engagement Semantic Modules</strong>
              <p className="text-gray-500 leading-normal">Learn the underlying science of how Google Crawlers think. Master semantic on-page silos and technical code delivery to easily rank local business portfolios.</p>
            </div>
            <div className="space-y-2">
              <strong className="text-gray-900 block font-bold text-sm">✓ Zero Tech-Larping, Raw Portfolio Power</strong>
              <p className="text-gray-500 leading-normal">Skip empty certification lines. Build and deploy real production targets, write clean READMEs, and document your source code on public GitHub spaces.</p>
            </div>
            <div className="space-y-2">
              <strong className="text-gray-900 block font-bold text-sm">✓ Direct High-Income Consulting Setup</strong>
              <p className="text-gray-500 leading-normal">Whether you target high-ticket remote Upwork contracts in Islamabad, or locally pitch medical clinics in Lahore, you learn real business-client acquisition.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MapSection = () => (
  <section className="py-24 px-4 bg-white border-t border-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Visit Us in Karachi</h2>
        <p className="text-lg text-gray-600">While our mentorship is primarily online, we are based in the heart of Karachi.</p>
      </div>
      
      <div className="relative group">
        {/* Decorative corner accents */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl group-hover:bg-brand-blue/10 transition-colors"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-green/5 rounded-full blur-2xl group-hover:bg-brand-green/10 transition-colors"></div>
        
        <div className="relative bg-white rounded-[3rem] p-3 shadow-2xl border border-gray-100 overflow-hidden group-hover:shadow-brand-blue/5 transition-all duration-500">
          <div className="aspect-[21/9] min-h-[450px] w-full rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14479.802035!2d67.0681!3d24.8601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ee2d80d2105%3A0xe54e24eb3e961962!2sMentor%20Arena!5e0!3m2!1sen!2spk!4v1714332000000!5m2!1sen!2spk"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mentor Arena Karachi Location"
              className="w-full h-full"
            ></iframe>
          </div>
          
          {/* Floating Address Card */}
          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-80 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Karachi HQ</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Serving ambitious students across Pakistan with 1-to-1 digital excellence.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
              <Clock size={14} /> Open 11:00 AM - 12:00 AM
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto bg-brand-blue rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-blue/20">
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Start Your Journey Today</h2>
        <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
          You have the potential. You have the hard-work. All you need now is the right channel. Let’s build your digital future together, 1-to-1.
        </p>
        <a href="#booking" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-brand-blue rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all shadow-xl mb-8">
          Book a Free Clarity Call <ArrowRight />
        </a>

        <div className="flex flex-col items-center gap-2 opacity-80">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={`fill-white ${i < 4 ? 'text-white' : 'text-white/30'}`} />
            ))}
          </div>
          <p className="text-xs font-bold tracking-widest text-blue-100 italic uppercase">
            Rated 4.8/5 by Verified Students on Google
          </p>
        </div>
      </div>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </div>
  </section>
);

const ChatbotLauncher = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <button 
      onClick={() => window.open(`https://api.whatsapp.com/send?phone=${BUSINESS_INFO.phone.replace(/\s/g, '')}`, '_blank')}
      className="w-14 h-14 bg-brand-green text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 cursor-pointer focus:ring-4 focus:ring-brand-green/20 outline-none"
      title="Chat with us on WhatsApp"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageSquare />
    </button>
  </div>
);

const LegalModal = ({ type: initialType, onClose }: { type: 'privacy' | 'terms' | 'cookies' | 'refund', onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies' | 'refund'>(initialType);

  const legalDocs = {
    privacy: {
      title: "Privacy Policy",
      effectiveDate: "Last Updated & Effective: 3 June 2026",
      purpose: "This Privacy Policy dictates our rigorous data protection standards, ensuring full-scope clarity around how Mentor Arena processes visitor and student information. In accordance with Pakistan's Personal Data Protection Bill (2023) and standard international regulations (GDPR), we enforce absolute confidentiality and strict data security protocols.",
      who: "Mentor Arena Academy as the primary Data Controller, alongside any authorized technical mentors who coordinate live sessions, and you (the student or website visitor) as the Data Subject.",
      what: "Personal identification numbers, WhatsApp contact logs, emails, homework repositories, project code blocks, attendance records, financial payment receipts, and basic localized browser device telemetry.",
      why: "To schedule the required 150 hours of intensive digital skill coaching, coordinate line-by-line developer reviews, administer project-based assessments, communicate schedule adjustments, and process transaction verifications securely.",
      when: "Data is actively collected from your very first interaction with the booking or form flow, throughout the active 14-week mentor program, and is securely retained for graduation records and portfolio queries.",
      where: "Data is processed with end-to-end industry encryptions on secure region-isolated cloud partitions. We maintain a zero-adversary policy—there are zero marketing trackers, zero data exchanges, and zero external sales.",
      details: [
        {
          title: "1. Comprehensive Information Collection",
          paragraphs: [
            "We collect information that allows us to authenticate identity, organize customized schedule pathways, and gauge educational learning speed. This is classified into two distinct vectors: Active Student Data and Passive Usage Telemetry.",
            "Active Student Data includes Name, primary Email, WhatsApp configuration, home city/country, current experience level, homework updates, direct repo links, and code commits.",
            "Passive Usage Telemetry consists of anonymous statistics such as device types, raw screen dimensions, IP address location blocks (strictly restricted to city/provincial level), and core analytics tracking."
          ]
        },
        {
          title: "2. The Legal Grounds of Processing Information",
          paragraphs: [
            "Contractual Accountability: When you enroll, we enter into a mutual educational contract. We require your contact indicators and progress reviews to fulfill our 150 live-hour academic obligation.",
            "Verified Explicit Consent: For all digital showcasing of reviews, portfolio achievements, student testimonials, and graduation certificates, we operate solely on your proactive, explicit permissions.",
            "Platform Security: To prevent abusive access, double submissions, or digital harassment, we maintain automatic secure server validations of visitor headers."
          ]
        },
        {
          title: "3. Retention of Records & Security Thresholds",
          paragraphs: [
            "We do not hold on to redundant details. Student contact logs are archived 12 months post-graduation, while code reviews and project links are kept indefinitely within your accessible personal dashboard.",
            "All databases are guarded behind multi-layered authentication keys and restricted IP ranges, so that unauthorized personnel can never read or copy your data structure."
          ]
        },
        {
          title: "4. Full Disclosure of User Rights",
          paragraphs: [
            "Under both national and global legal benchmarks, you retain full ownership of your data parameters. At any time, you can ask to review everything we have stored, update your files, or request immediate complete deletion of your records.",
            "To execute any of these data operations, simply trigger a request to hello@mentorarena.online, and our verification team will clear or process your data profile inside 5 business days."
          ]
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      effectiveDate: "Last Updated & Effective: 3 June 2026",
      purpose: "These comprehensive Terms of Service constitute a legally binding agreement between you ('the User', 'Student') and Mentor Arena ('the Academy', 'We', 'Us'). They define the boundaries of service, the parameters of the course curricula, the intellectual assets protection rules, and the code of conduct governing live sessions in Pakistan.",
      who: "Enrolled student cohorts, website visitors, and the mentor administrative office coordinating the 14-week digital tracks.",
      what: "Access to private Google Meet or Zoom interfaces, shared code modules, personalized assignments feedback, portfolio assets review, and final digital validation certification.",
      why: "To establish standard expectations regarding class attendance, academic integrity, copyright parameters, payment installments, and community-guided codes of conduct.",
      when: "Binding and in active force from the moment a user creates an account, books a Clarity Call, or submits an enrollment form. These terms govern throughout active study and subsequent post-course certificate validation.",
      where: "Conducted over digital audio-video panels and private collaboration suites. For legal disputes, the ultimate governing authority rests with the laws and courts of the Islamic Republic of Pakistan.",
      details: [
        {
          title: "1. Strict Code of Conduct & Communication Boundaries",
          paragraphs: [
            "Mentor Arena operates on mutual respect, high dedication, and a professional, positive environment. We enforce an absolute zero-tolerance policy against any form of digital harassment, abusive communication, or toxic remarks.",
            "Students are expected to maintain professional courtesy inside all live Google Meet calls, shared WhatsApp panels, and class feedback segments.",
            "Failure to support these expectations will result in immediate suspension with a full review, and potentially a permanent ban from active cohort groups with zero refund eligibility."
          ]
        },
        {
          title: "2. Protection of Copyrighted Intellectual Property",
          paragraphs: [
            "All curriculum structures, interactive guides, proprietary source code repositories, code blocks, custom slides, and video reviews provided throughout the 14 weeks are the exclusive intellectual property of Mentor Arena.",
            "Enrolling grants you a personal, single-license, non-transferor right of learning. Any commercial distribution, unauthorized public uploading of video recordings, or sharing of study assets with non-enrolled individuals is strictly forbidden.",
            "Violating these copyright guidelines constitutes a material breach of contract, resulting in immediate termination of academy access and complete legal proceedings under copyright preservation statutes."
          ]
        },
        {
          title: "3. Enrollment Specifications & Installment Schedule",
          paragraphs: [
            "Enrolling requires an active commitment to practice at least 10 hours per week outside live calls to keep up with the intense, practical training pace.",
            "Any agreed installment plan must be fully honored on or before the specified due dates to secure your slot. Access to live sessions, review feedback, and project-based assets is automatically paused if an installment remains pending beyond 3 days."
          ]
        },
        {
          title: "4. Legal Adjustments & Liability Boundaries",
          paragraphs: [
            "Mentor Arena provides real-world expert advice based on 30+ years of digital experience. However, individual success depends on practice, local market factors, and personal application. We do not provide empty 'guaranteed job' promises.",
            "If any clause of these Terms is determined to be unenforceable, all other clauses will continue to be in full force. We reserve the right to revise or adjust these terms periodically, and updates are effective immediately upon online publication."
          ]
        }
      ]
    },
    cookies: {
      title: "Cookie Policy",
      effectiveDate: "Last Updated & Effective: 3 June 2026",
      purpose: "This Cookie Policy explains our transparent and non-intrusive approach to utilizing small browser data files (cookies) to secure, optimize, and customize your experience. We do not engage with invasive data harvesting—our cookie structures are lean and focus strictly on operational optimization.",
      who: "The web host servers of mentorarena.online and the client-side system browser utilized by the visiting user.",
      what: "Small text files cached inside the browser partition to store basic operational inputs or access identifiers.",
      why: "To maintain encrypted user session states, safeguard against spam, optimize load times on mobile connections, and monitor basic core usage metrics anonymously.",
      when: "Instantly placed when hitting the landing page, and automatically deleted based on set parameters (session vs. persistent).",
      where: "Stored safely inside your device's private browser sandbox. You can easily clean, delete, or deactivate them directly via standard configuration settings.",
      details: [
        {
          title: "1. Detailed Classification of Cookies We Use",
          paragraphs: [
            "Essential Security Cookies: Absolutely necessary to run our basic web platform safely. These authorize dynamic security variables and keep you logged into personal panels without constant login prompts.",
            "Preference Retention Cookies: These remember your specific choices—such as your preferred digital skills track, active navigation points, or localized parameters—providing a smooth, custom flow.",
            "Anonymous Telemetry Cookies: Handled through secure partners (like Google Analytics) to check loading performance across different provinces in Pakistan. We do not link these to individual identities."
          ]
        },
        {
          title: "2. Why Do We Avoid Ad-Tracking Networks?",
          paragraphs: [
            "Unlike typical platforms that integrate bloated marketing pixels to bombard you with retargeted social ads, Mentor Arena stands for client comfort and privacy.",
            "We have zero pixel trackers from overseas consumer profiles. Your browse history inside our directory remains fully private to you and is never sold to retargeting providers."
          ]
        },
        {
          title: "3. Absolute User Autonomy & Control",
          paragraphs: [
            "Your browser, your decision. You are always under full control of cookie files inside your software preferences.",
            "You can choose to block all cookies, reject third-party cookies, or configure alerts, though blocking essential cookies might affect security and dashboard state preservation."
          ]
        }
      ]
    },
    refund: {
      title: "Refund Policy",
      effectiveDate: "Last Updated & Effective: 3 June 2026",
      purpose: "This Refund Policy establishes complete economic transparency, balancing risk-free introduction options for students with the strict class capacity structures of our academy. At Mentor Arena, we prioritize high-quality practical mentorship, keeping our cohorts ultra-small (typically max 3 to 6 seats). This policy ensures mutually fair commitment between professional instructors and enrolled participants.",
      who: "Enrolled candidates in Pakistan and the Mentor Arena treasury department validating program transactions.",
      what: "All transactions including tuition fees, distributed monthly installments, and Clarity Call schedules.",
      why: "Because we reserve and schedule an instructor's expert hour allocations 14 weeks in advance. Once regular coursework commences, seats cannot be reallocated or filled, representing dedicated capital.",
      when: "The 100% full refund exemption is open solely from registration until immediately after your 1st introduction class. No refunds are possible after regular classes begin.",
      where: "Applicable universally to local mobile transfers (JazzCash, Easypaisa) and direct Pakistani bank-to-bank transactions.",
      details: [
        {
          title: "1. The 100% Risk-Free 1st Class Exemption",
          paragraphs: [
            "To remove all barriers and ensure you are confident in your learning investment, your very first introduction session serves as an active trial run.",
            "If you decide immediately after this first session that our environment, pedagogical pace, or course curriculum is not a perfect fit, you are entitled to a 100% full refund with zero explanation required.",
            "This gives you a risk-free test drive to observe our live mentoring before officially locking in your 14-week track seat."
          ]
        },
        {
          title: "2. Commencement of Regular Course Classes",
          paragraphs: [
            "Once regular classes commence (starting with the second session), we can no longer offer any refunds or dynamic transfers.",
            "Because we maintain small-batch settings, seats are booked far in advance. The assigned expert is allocated and compensated to support your exact learning trajectory, and empty seats midway are impossible to re-allocate.",
            "By proceeding past the 1st introduction class, you commit to completing the coursework and acknowledge that tuition fees cannot be refunded under any context."
          ]
        },
        {
          title: "3. Transparent Refund Request Steps",
          paragraphs: [
            "To execute your refund request under the 1st Class Exemption, send a brief email to hello@mentorarena.online with your full name, mobile transaction receipt, and chosen track name.",
            "Requests must be submitted within 24 hours of completing that 1st introduction class session to be verified.",
            "Approved requests are routed and credited directly back to the original source (Easypaisa mobile wallet, JazzCash number, or standard digital bank transfer) within 14 business days, with zero admin fees deducted."
          ]
        }
      ]
    }
  };

  const active = legalDocs[activeTab];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[100] flex items-center justify-center md:p-6 p-0"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white md:rounded-3xl w-full h-full md:max-h-[92vh] max-w-6xl flex flex-col overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header with Interactive Tabs */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-brand-blue/10 text-brand-blue rounded-2xl">
              <Shield size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black text-gray-900 leading-tight">Legal & Compliance Center</h2>
              <p className="text-xs text-gray-500 font-medium">Clear trust parameters & code guidelines built for Pakistan</p>
            </div>
          </div>
          
          {/* Quick tab switch buttons inside the Legal Center */}
          <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-2xl">
            {(['privacy', 'terms', 'cookies', 'refund'] as const).map((docId) => (
              <button
                key={docId}
                onClick={() => setActiveTab(docId)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === docId 
                    ? 'bg-white text-brand-blue shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {docId === 'privacy' && 'Privacy Policy'}
                {docId === 'terms' && 'Terms of Service'}
                {docId === 'cookies' && 'Cookie Policy'}
                {docId === 'refund' && 'Refund Policy'}
              </button>
            ))}
          </div>

          <button 
            onClick={onClose} 
            className="hidden lg:flex p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            aria-label="Close Legal Center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable central document layout */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8">
          <div>
            <span className="inline-block px-3 py-1 bg-brand-blue/5 text-brand-blue text-xs font-bold tracking-widest uppercase rounded-full mb-3">
              {active.effectiveDate}
            </span>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-4">
              {active.title}
            </h1>
            
            {/* The primary Purpose Section highlighting the 'Why' of the agreement */}
            <div className="p-6 md:p-8 bg-blue-50/40 border border-blue-100/50 rounded-3xl text-sm text-gray-700 leading-relaxed mb-8">
              <strong className="block text-brand-blue font-bold mb-2 text-xs uppercase tracking-widest">📚 Legal Purpose & Obligation</strong>
              {active.purpose}
            </div>
          </div>

          {/* Grid Bento Blocks answering the 5 W's comprehensively */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Core Dimensions (The 5 W's)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase mb-2 tracking-wider">
                  <User size={14} className="text-brand-green" /> Who
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{active.who}</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase mb-2 tracking-wider">
                  <FileText size={14} className="text-brand-green" /> What
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{active.what}</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase mb-2 tracking-wider">
                  <HelpCircle size={14} className="text-brand-green" /> Why
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{active.why}</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase mb-2 tracking-wider">
                  <Clock size={14} className="text-brand-green" /> When
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{active.when}</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase mb-2 tracking-wider">
                  <Globe size={14} className="text-brand-green" /> Where
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{active.where}</p>
              </div>
            </div>
          </div>

          {/* Long-form detailed subsections */}
          <div className="space-y-8 border-t border-gray-100 pt-8">
            {active.details.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">{section.title}</h3>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm text-gray-600 leading-relaxed font-normal">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Bottom control panel */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider text-center sm:text-left">
            🔒 Official Document — Encrypted and Signed at Karachi, Pakistan 
          </div>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 bg-brand-blue text-white rounded-2xl font-black hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/10 transition-all text-sm uppercase tracking-wider"
          >
            Acknowledge & Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Footer = ({ 
  onOpenLegal,
  onNavigate 
}: { 
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies' | 'refund') => void;
  onNavigate: (path: string) => void;
}) => (
  <footer className="py-16 border-t border-gray-100 px-4 bg-gray-50/30">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        {/* Column 1: Info and Brand */}
        <div className="flex flex-col gap-3 lg:col-span-2 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <img 
              src={LOGO_SVG} 
              alt="Mentor Arena Logo - 1-to-1 Digital Skills Mentorship Academy in Pakistan" 
              width="32"
              height="32"
              className="w-8 h-8 object-contain" 
              loading="lazy"
              decoding="async"
            />
            <span className="text-xl font-bold text-gray-900 tracking-tight">Mentor Arena</span>
          </div>
          <p className="text-xs text-gray-600 max-w-sm">Based in Karachi, mentoring students across Pakistan. Transform your career with 1-on-1 premium digital skills coaching.</p>
          <a href="https://saasskul.com" target="_blank" rel="noreferrer" className="mt-4 block transition-all group/badge max-w-fit mx-auto md:mx-0">
            <div className="flex items-center gap-3 bg-brand-blue/[0.03] rounded-xl px-4 py-3 border border-brand-blue/10 hover:bg-brand-blue/[0.06] transition-all">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-blue group-hover/badge:bg-brand-blue transition-colors group-hover/badge:text-white">
                <Shield size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-gray-600 font-bold uppercase leading-none tracking-wider">A product of</span>
                <span className="text-sm font-black text-brand-blue leading-tight tracking-tight">SaaSSkul</span>
              </div>
            </div>
          </a>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="text-xs font-bold text-gray-900 uppercase tracking-widest text-[#1A4A7C] font-mono">Menu</div>
          <div className="flex flex-col gap-3 text-sm font-medium">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer block">Home</a>
            <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate('/about'); }} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer block">About Mentor</a>
            <a href="/pricing" onClick={(e) => { e.preventDefault(); onNavigate('/pricing'); }} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer block">Tuition Fee</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer block">Contact Us</a>
            <div className="h-px bg-gray-100 my-0.5"></div>
            <a href="/audiences/students" onClick={(e) => { e.preventDefault(); onNavigate('/audiences/students'); }} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer text-xs font-bold block">• For Students</a>
            <a href="/audiences/parents" onClick={(e) => { e.preventDefault(); onNavigate('/audiences/parents'); }} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer text-xs font-bold block">• For Parents</a>
            <a href="/audiences/employers" onClick={(e) => { e.preventDefault(); onNavigate('/audiences/employers'); }} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer text-xs font-bold block">• For Employers</a>
          </div>
        </div>

        {/* Column 3: Courses Offered & Resources */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="text-xs font-bold text-gray-900 uppercase tracking-widest text-[#1A4A7C] font-mono">Courses &amp; Resources</div>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
            <a href="/courses/web-development" onClick={(e) => { e.preventDefault(); onNavigate('/courses/web-development'); }} className="hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer text-xs block">MERN Web Dev</a>
            <a href="/courses/seo" onClick={(e) => { e.preventDefault(); onNavigate('/courses/seo'); }} className="hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer text-xs block">Advanced SEO</a>
            <a href="/courses/uiux-digital-marketing" onClick={(e) => { e.preventDefault(); onNavigate('/courses/uiux-digital-marketing'); }} className="hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer text-xs block">UI/UX &amp; Marketing</a>
            <div className="h-px bg-gray-100 my-1"></div>
            <a href="/reviews" onClick={(e) => { e.preventDefault(); onNavigate('/reviews'); }} className="hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer block">Reviews</a>
            <a href="/blog" onClick={(e) => { e.preventDefault(); onNavigate('/blog'); }} className="hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer font-bold text-emerald-800 block">Blog (Generative SEO)</a>
            <a href="/faq" onClick={(e) => { e.preventDefault(); onNavigate('/faq'); }} className="hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer block">FAQ</a>
          </div>
        </div>

        {/* Column 4: Legal & Social */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="text-xs font-bold text-gray-900 uppercase tracking-widest text-[#1A4A7C] font-mono">Legal &amp; Social</div>
          <div className="flex flex-col gap-3 text-sm font-medium mb-3">
            <button onClick={() => onOpenLegal('privacy')} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer" aria-label="View Privacy Policy">Privacy Policy</button>
            <button onClick={() => onOpenLegal('terms')} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer" aria-label="View Terms of Service">Terms of Service</button>
            <button onClick={() => onOpenLegal('refund')} className="text-gray-600 hover:text-brand-blue transition-colors text-center md:text-left w-full cursor-pointer" aria-label="View Refund Policy">Refund Policy</button>
          </div>
          <div className="flex flex-row gap-2.5 flex-wrap justify-center md:justify-start">
            {[
              { Icon: MessageSquare, href: `https://api.whatsapp.com/send?phone=${BUSINESS_INFO.phone.replace(/\s/g, '')}`, label: "WhatsApp Chat", color: "hover:text-green-500" },
              { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61572334738737", label: "Facebook Page", color: "hover:text-blue-600" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/fazal-shahid-mentor/", label: "LinkedIn Profile", color: "hover:text-blue-700" },
              { Icon: Instagram, href: "https://www.instagram.com/bookmethat/", label: "Instagram Profile", color: "hover:text-pink-600" },
              { Icon: Star, href: "https://www.google.com/search?q=Mentor+Arena+Karachi+Reviews", label: "Google Reviews", color: "hover:text-yellow-500" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-[0_2px_0_0_rgba(0,0,0,0.05)] border border-gray-100 ${social.color} transition-all group relative`}
                title={social.label}
              >
                <social.Icon size={16} className="transition-colors" />
                <div className="absolute inset-px rounded-full border border-white/50 pointer-events-none"></div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs pt-8 border-t border-gray-100">
        © {new Date().getFullYear()} Mentor Arena. All rights reserved. Built for 1-to-1 modern coaching in Pakistan.
      </div>
    </div>
  </footer>
);

const LoginPortal = ({ isOpen, onClose, onLoginSuccess }: { isOpen: boolean, onClose: () => void, onLoginSuccess: (user: any) => void }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for student login
    setTimeout(() => {
      onLoginSuccess({ email, role: 'student', name: email.split('@')[0] });
      setLoading(false);
      onClose();
    }, 1200);
  };

  const handleGitHubLogin = async () => {
    setLoading(true);
    // Simulation of GitHub OAuth for SuperAdmin
    setTimeout(() => {
      onLoginSuccess({ 
        email: 'admin@mentorarena.online', 
        role: 'admin', 
        name: 'Authority Admin' 
      });
      setLoading(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="flex">
          <button 
            onClick={() => setActiveTab('student')}
            className={`flex-1 py-6 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'student' ? 'bg-white text-brand-blue border-b-4 border-brand-green' : 'bg-gray-50 text-gray-400'}`}
          >
            Student Access
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-6 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'admin' ? 'bg-white text-brand-blue border-b-4 border-brand-green' : 'bg-gray-50 text-gray-400'}`}
          >
            SuperAdmin
          </button>
        </div>

        <div className="p-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-brand-blue/5 rounded-3xl flex items-center justify-center text-brand-blue mx-auto mb-6">
              {activeTab === 'student' ? <GraduationCap size={40} /> : <Lock size={40} />}
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {activeTab === 'student' ? 'Student Portal' : 'Admin Authority'}
            </h2>
            <p className="text-gray-600 text-sm">
              {activeTab === 'student' 
                ? 'Welcome back! Ready to continue your project?' 
                : 'Secure entry for Mentor Arena content managers.'}
            </p>
          </div>

          {activeTab === 'student' ? (
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-brand-blue text-white rounded-2xl font-black text-lg hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Enter Portal'}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <p className="text-center text-sm text-gray-400 leading-relaxed bg-gray-50 p-6 rounded-2xl">
                SuperAdmin access is restricted to authorized owners. Managed via GitHub.
              </p>
              <button 
                onClick={handleGitHubLogin}
                disabled={loading}
                className="w-full py-5 bg-[#24292F] text-white rounded-2xl font-black text-lg hover:bg-[#24292F]/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/20"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (
                  <>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    Continue as SuperAdmin
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'cookies' | 'refund' | null>(null);
  const [config, setConfig] = useState<LayoutConfig>(DEFAULT_LAYOUT);
  const [selectedSyllabusTrack, setSelectedSyllabusTrack] = useState<'web-dev' | 'seo' | 'uiux' | null>(null);
  const [selectedCity, setSelectedCity] = useState<'all' | 'karachi' | 'lahore' | 'islamabad'>('all');
  const [activePath, setActivePath] = useState<string>(window.location.pathname);

  const validPaths = [
    '/',
    '/courses/web-development',
    '/courses/seo',
    '/courses/uiux-digital-marketing',
    '/about',
    '/pricing',
    '/faq',
    '/reviews',
    '/contact'
  ];
  const isPostOrBlog = activePath === '/blog' || activePath.startsWith('/blog/') || activePath.startsWith('/blog?');
  const isAudienceRoute = activePath.startsWith('/audiences');
  const isPathMatched = validPaths.includes(activePath) || isPostOrBlog || isAudienceRoute;

  // Sync active path with popstate event of browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setActivePath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (path: string) => {
    setActivePath(path);
    window.history.pushState(null, '', path + window.location.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state with URL parameter for targeting CPC campaigns
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cityParam = params.get('city')?.toLowerCase();
    if (cityParam && ['karachi', 'lahore', 'islamabad', 'all'].includes(cityParam)) {
      setSelectedCity(cityParam as any);
    }
  }, []);

  // Dynamically update document title, description, keywords, canonical links, social sharing Open Graph tags, and multi-schema structures reactively to prevent search index errors!
  useEffect(() => {
    const currentOrigin = window.location.origin;
    const currentUrl = currentOrigin + activePath;
    const cityLabel = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

    // Default metadata values (Home Page)
    let title = `1-to-1 Premium Web Development, SEO & UI/UX Mentorship ${cityLabel} | Mentor Arena`;
    let desc = `Accelerate your tech career with premium 1-to-1 web development, SEO, and UI/UX design mentorship in ${cityLabel}. Direct training from field authorities.`;
    let schemaMarkup: any = null;

    if (selectedCity === 'lahore') {
      title = `1-to-1 MERN Web Development & SEO Mentorship in Lahore | Mentor Arena Punjab`;
      desc = `Looking for the best MERN stack web development training or SEO course in Lahore, Punjab? Mentor Arena coordinates intensive 1-to-1 coding mentors to target local software house jobs and international remote contracts.`;
    } else if (selectedCity === 'islamabad') {
      title = `1-to-1 Web Development, Figma UI/UX & Freelance Mentorship in Islamabad | Mentor Arena`;
      desc = `Premium software developer skills coaching and UI/UX bootcamps in Islamabad & Rawalpindi. Learn MERN Stack coding during school summer vacations and launch your freelance career in the capital.`;
    } else if (selectedCity === 'karachi') {
      title = `1-to-1 Web Development & Digital Marketing Mentorship Karachi | Mentor Arena HQ`;
      desc = `Kickstart your professional modern developer journey in Karachi, Sindh. Build a live, production-grade Web App or conduct hands-on SEO audits for local Karachi tech startup agencies.`;
    }

    // Specialize metadata by exact pathname for absolute page-level precision
    if (activePath === '/courses/web-development') {
      title = `1-to-1 MERN Stack Web Development Course & Bootcamp ${cityLabel} | Mentor Arena`;
      desc = `Master React.js, Node.js, Express, MongoDB, and full-stack architecture through intensive, direct 1-to-1 mentorship in ${cityLabel}. Get live environment credentials and job support.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `MERN Stack Full-Stack Developer Mentorship (${cityLabel})`,
        "description": desc,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Mentor Arena",
          "url": currentOrigin,
          "logo": currentOrigin + "/logo_placeholder.svg"
        },
        "offers": {
          "@type": "Offer",
          "category": "Premium Personal Mentorship",
          "priceCurrency": "PKR",
          "price": "Negotiable"
        },
        "timeRequired": "P3M"
      };
    } else if (activePath === '/courses/seo') {
      title = `Practical Technical SEO Audits & SILO Strategy Mentorship ${cityLabel} | Mentor Arena`;
      desc = `Obtain absolute SEO mastery in ${cityLabel}. Learn modern GSC crawler audits, Screaming Frog techniques, SILO semantic content trees, and rank high-ticket agency client sites.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `Advanced Technical SEO & Silo Strategy Mentorship (${cityLabel})`,
        "description": desc,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Mentor Arena",
          "url": currentOrigin
        }
      };
    } else if (activePath === '/courses/uiux-digital-marketing') {
      title = `1-to-1 Figma UI/UX Design & Growth Marketing Course ${cityLabel} | Mentor Arena`;
      desc = `Bridge the gap between design and high conversions. Conduct high-fidelity prototyping, advanced Figma auto-layout, wireframing, and interactive token schemes.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `Figma UI/UX & Growth Marketing Mentorship (${cityLabel})`,
        "description": desc,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Mentor Arena",
          "url": currentOrigin
        }
      };
    } else if (activePath === '/about') {
      title = `About Our Principal Coach Fazal Shahid Latif & Mentors | Mentor Arena`;
      desc = `Learn from Fazal Shahid Latif, boasting 30+ years of active high-performance system engineering. Discover the ultimate personalized 1-to-1 educational philosophy.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
          "@type": "Person",
          "name": "Fazal Shahid Latif",
          "jobTitle": "Lead Coach & Solutions Architect",
          "worksFor": {
            "@type": "EducationalOrganization",
            "name": "Mentor Arena"
          },
          "email": "hello@mentorarena.online",
          "telephone": "+92 332 2137898"
        }
      };
    } else if (activePath === '/pricing') {
      title = `Clear 1-to-1 Tuition Pricing & Refund Exemptions | Mentor Arena`;
      desc = `Flexible tuition schedules for expert system engineering mentorship in Pakistan. Fully protected by our legendary, instant 1st Class Refund Exemption scheme.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Tuition Pricing Schemas",
        "description": desc,
        "publisher": {
          "@type": "EducationalOrganization",
          "name": "Mentor Arena"
        }
      };
    } else if (activePath === '/faq') {
      title = `Frequently Asked Questions (FAQ) - Mentorship in ${cityLabel} | Mentor Arena`;
      desc = `Everything you need to know about MERN stack pathways, laptop parameters, class slot frequencies, payment methods, and certified coaching schedules.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the 1st Class Refund Exemption?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If, during your first scheduled live feedback session with Fazal Shahid Latif, you decide that our coaching styles do not match your expectations, we will immediately process a 100% refund of your tuition, without any questions."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need coding experience for SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Our methodology trains you completely from the absolute ground up, using custom curriculum pacing matched to your high-performance growth."
            }
          }
        ]
      };
    } else if (activePath === '/reviews') {
      title = `Success Testimonials & Real Student Landing Case Studies | Mentor Arena`;
      desc = `Browse verified WhatsApp chat logs and LinkedIn case studies of past students securing high-ticket jobs and remote US projects directly out of Pakistan computing lanes.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Student Reviews",
        "description": desc
      };
    } else if (activePath === '/contact') {
      title = `Contact Us & Book Free Clarifying Call in ${cityLabel} | Mentor Arena`;
      desc = `Ready to accelerate? Submit a lead form to schedule a direct, free technical planning strategy chat with our leads department.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact support",
        "description": desc
      };
    } else if (activePath === '/blog' || activePath.startsWith('/blog?')) {
      title = `The Generative SEO Search Strategy & Tech Blog | Mentor Arena`;
      desc = `Discover high-authority guides concerning SILO content pillars, local budget computer specs, Figma plugins, and tax exemptions for freelancers in Pakistan.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Generative SEO Blog",
        "description": desc
      };
    } else if (activePath.startsWith('/blog/')) {
      const blogSlug = activePath.substring(6);
      const cleanSlug = blogSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      title = `${cleanSlug} | Mentor Arena Premium Blog`;
      desc = `Deep dive technical guide: Learn about ${cleanSlug.toLowerCase()}. Complete layout, execution steps, and expert systems analysis for local Pakistani professionals.`;
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": cleanSlug,
        "description": desc,
        "datePublished": "2026-06-03",
        "author": {
          "@type": "Person",
          "name": "Fazal Shahid Latif",
          "jobTitle": "Lead Solutions Architect"
        },
        "publisher": {
          "@type": "EducationalOrganization",
          "name": "Mentor Arena",
          "logo": {
            "@type": "ImageObject",
            "url": currentOrigin + "/logo_placeholder.svg"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": currentUrl
        }
      };
    } else if (activePath.startsWith('/audiences')) {
      if (activePath === '/audiences/parents') {
        title = `Future Skills & Career Guidance for Teenagers ${cityLabel} | Mentor Arena`;
        desc = `Equip your child with safe high-income future skills. Direct online learning with mentor Fazal Shahid Latif. Project-based education for long-term certified success.`;
      } else if (activePath === '/audiences/employers') {
        title = `Hire Pre-Trained Interns & Job-Ready Junior Grads | Mentor Arena`;
        desc = `Skip long training loops. Onboard job-ready project-based graduates who have shipped fully-live responsive software applications.`;
      } else {
        // students
        title = `Project-Based Learning & Career Mentorship for Students in ${cityLabel}`;
        desc = `Ditch academic theories. Join our high-performance digital skills training. Master coding, marketing, and the freelance course Pakistan roadmap.`;
      }
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": desc
      };
    } else {
      // Unhandled / Unmatched path placeholder (Recovery safe view)
      title = "Safe Arena Recovery Portal - Broken Link Normalizer | Mentor Arena";
      desc = "This route reference has been safely consolidated into our primary 301 structural paths. Find premium 1-to-1 mentorship tracks here.";
    }

    // 1. Update general titles and descriptions
    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', `mentor arena, ${selectedCity !== 'all' ? selectedCity : 'pakistan'}, web development lahore, seo training islamabad, summer vacation bootcamps, figma coding rawalpind, mern stack mentor karachi, freelance training pakistan`);

    // 2. Update canonical links
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 3. Update alternate links to match the current domain
    const alternates = document.querySelectorAll('link[rel="alternate"]');
    alternates.forEach(alt => {
      alt.setAttribute('href', currentOrigin + '/');
    });

    // 4. Update Open Graph elements (SEO Social representation)
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', currentUrl);
    }
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', currentUrl);
    }

    // 5. Inject Structured JSON-LD schemas
    let schemaScript = document.getElementById('seo-json-ld');
    if (schemaScript) {
      schemaScript.remove();
    }
    
    // If no custom schema was formulated by page type, fallback to organizational default
    if (!schemaMarkup) {
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Mentor Arena",
        "url": currentOrigin,
        "logo": LOGO_SVG,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "26/792 Cantt Bazar, Drigh Road",
          "addressLocality": "Karachi",
          "addressRegion": "Sindh",
          "postalCode": "75350",
          "addressCountry": "PK"
        },
        "description": desc,
        "offers": {
          "@type": "Offer",
          "category": "Education & Job Bootcamps",
          "priceCurrency": "PKR"
        }
      };
    }

    schemaScript = document.createElement('script');
    schemaScript.setAttribute('id', 'seo-json-ld');
    schemaScript.setAttribute('type', 'application/ld+json');
    schemaScript.innerHTML = JSON.stringify(schemaMarkup, null, 2);
    document.head.appendChild(schemaScript);

  }, [activePath, selectedCity]);

  const handleCityUpdate = (city: 'all' | 'karachi' | 'lahore' | 'islamabad') => {
    setSelectedCity(city);
    const params = new URLSearchParams(window.location.search);
    if (city === 'all') {
      params.delete('city');
    } else {
      params.set('city', city);
    }
    const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.pushState(null, '', newRelativePathQuery);
  };

  // Check for stored user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('ma_session');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('ma_session');
      }
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('ma_session', JSON.stringify(userData));
    if (userData.role === 'admin') {
      setShowAdmin(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowAdmin(false);
    localStorage.removeItem('ma_session');
  };

  // Initial fetch from server
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setConfig({
              ...DEFAULT_LAYOUT,
              ...data,
              sections: { ...DEFAULT_LAYOUT.sections, ...(data.sections || {}) },
              images: { ...DEFAULT_LAYOUT.images, ...(data.images || {}) },
              availability: { ...DEFAULT_LAYOUT.availability, ...(data.availability || {}) },
              content: { ...DEFAULT_LAYOUT.content, ...(data.content || {}) },
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch config from server');
      }
    };
    fetchConfig();
  }, []);

  const handleUpdateConfig = async (newConfig: LayoutConfig) => {
    setConfig(newConfig);
    try {
      await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
    } catch (err) {
      console.error('Failed to save config to server');
    }
  };

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue">
      <Navbar 
        onAdminClick={() => setShowAdmin(true)} 
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
        user={user}
        selectedCity={selectedCity}
        onCityChange={handleCityUpdate}
        activePath={activePath}
        onNavigate={handleNavigate}
      />
      
      <main>
        {activePath === '/' && (
          <>
            {config.sections.hero && (
              <HeroSection 
                heroBg={config.images.heroBg} 
                onLoginClick={() => setShowLogin(true)}
                onAdminClick={() => setShowAdmin(true)}
                user={user}
                selectedCity={selectedCity}
              />
            )}
            {config.sections.who && <WhoThisIsFor />}
            <AuthoritySyllabus onOpenSyllabus={setSelectedSyllabusTrack} />
            {config.sections.courses && (
              <CoursesOffered 
                paths={config.content.skillPaths} 
                onSelectTrack={(track) => {
                  if (track === 'web-dev') handleNavigate('/courses/web-development');
                  else if (track === 'seo') handleNavigate('/courses/seo');
                  else if (track === 'uiux') handleNavigate('/courses/uiux-digital-marketing');
                }} 
                onOpenSyllabus={setSelectedSyllabusTrack}
              />
            )}
            {config.sections.method && <MethodSection videoUrl={config.images.methodVideo} posterUrl={config.images.methodPoster} />}
            {config.sections.comparison && <ComparisonSection />}
            {config.sections.pricing && <PricingSection />}
            {config.sections.how && <HowItWorks />}
            <TestimonialsSection caseStudyImage={config.images.caseStudy} />
            {config.sections.schedule && <ScheduleSection availability={config.availability} />}
            {config.sections.booking && <BookingSection paths={config.content.skillPaths} slots={config.content.timeSlots} />}
            {config.sections.about && <AboutMentor image={config.images.mentor} guestImage={config.images.guestMentor} />}
            {config.sections.faq && <FAQSection />}
            {config.sections.cta && <FinalCTA />}
            <RegionalSEOHub selectedCity={selectedCity} onCitySelect={handleCityUpdate} />
            <MapSection />
          </>
        )}

        {activePath === '/courses/web-development' && (
          <WebDevelopmentPage 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            selectedCity={selectedCity}
          />
        )}

        {activePath === '/courses/seo' && (
          <SEOPage 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            selectedCity={selectedCity}
          />
        )}

        {activePath === '/courses/uiux-digital-marketing' && (
          <UIUXPage 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            selectedCity={selectedCity}
          />
        )}

        {activePath === '/about' && (
          <AboutPage 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            selectedCity={selectedCity}
            customMentorImage={config.images.mentor}
            customGuestMentorImage={config.images.guestMentor}
          />
        )}

        {activePath === '/pricing' && (
          <PricingPage 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            selectedCity={selectedCity}
          />
        )}

        {activePath === '/faq' && (
          <FAQPage 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            selectedCity={selectedCity}
          />
        )}

        {activePath === '/reviews' && (
          <ReviewsPage 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            selectedCity={selectedCity}
          />
        )}

        {activePath === '/contact' && (
          <ContactPage 
            onBackToHome={() => handleNavigate('/')}
            selectedCity={selectedCity}
          />
        )}

        {(activePath === '/blog' || activePath.startsWith('/blog')) && (
          <BlogHubPage 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            selectedCity={selectedCity}
          />
        )}

        {activePath.startsWith('/audiences') && (
          <TargetAudiencePortals 
            onBackToHome={() => handleNavigate('/')}
            onBookCall={() => handleNavigate('/contact')}
            onNavigate={handleNavigate}
            selectedCity={selectedCity}
          />
        )}

        {!isPathMatched && (
          <div className="min-h-[75vh] flex items-center justify-center bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Ambient Background Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.08),transparent_50%)]" />
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative max-w-4xl w-full text-center space-y-10 bg-zinc-900/40 backdrop-blur-md p-8 md:p-14 rounded-3xl border border-zinc-800"
            >
              <div className="flex justify-center">
                <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-400">
                  <HelpCircle className="w-12 h-12 stroke-[1.5]" />
                </div>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full">
                  Redirecting to safety
                </span>
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                  Looking for something in the Arena?
                </h1>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  This target link has been dynamically consolidated into our principal 301 structured paths. Rather than displaying an error page, we have pre-routed you to our main high-performance tracks below:
                </p>
              </div>

              {/* Cards Grid of Valid Tracks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Track 1 */}
                <div 
                  onClick={() => handleNavigate('/courses/web-development')} 
                  className="group cursor-pointer bg-zinc-950 p-6 rounded-2xl border border-zinc-850 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-mono text-zinc-400 group-hover:text-blue-400 tracking-wider uppercase bg-zinc-900 px-2 py-0.5 rounded">
                      Coding
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-blue-400 transition-colors mb-2">
                    MERN Web Dev
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    1-to-1 fullstack training. Direct software house skills and remote deal building.
                  </p>
                </div>

                {/* Track 2 */}
                <div 
                  onClick={() => handleNavigate('/courses/seo')} 
                  className="group cursor-pointer bg-zinc-950 p-6 rounded-2xl border border-zinc-850 hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-mono text-zinc-400 group-hover:text-emerald-400 tracking-wider uppercase bg-zinc-900 px-2 py-0.5 rounded">
                      SEO
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-emerald-400 transition-colors mb-2">
                    Advanced SEO
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Technical audits, crawling mechanics, and content architectures.
                  </p>
                </div>

                {/* Track 3 */}
                <div 
                  onClick={() => handleNavigate('/courses/uiux-digital-marketing')} 
                  className="group cursor-pointer bg-zinc-950 p-6 rounded-2xl border border-zinc-850 hover:border-amber-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-mono text-zinc-400 group-hover:text-amber-400 tracking-wider uppercase bg-zinc-900 px-2 py-0.5 rounded">
                      Design
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-amber-500 transition-colors mb-2">
                    Figma UI/UX & Growth
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Figma auto-layout, wireframing, high-fidelity prototypes, and growth hacking.
                  </p>
                </div>
              </div>

              {/* Recovery Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => handleNavigate('/')}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-zinc-950 text-sm font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
                >
                  Go to Arena Dashboard
                </button>
                <button 
                  onClick={() => handleNavigate('/contact')}
                  className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-750 text-white text-sm font-semibold px-8 py-3.5 rounded-xl border border-zinc-700 hover:border-zinc-650 transition-all cursor-pointer"
                >
                  Schedule Strategy Session
                </button>
              </div>

              <div className="pt-2 border-t border-zinc-850 text-xs text-zinc-500 font-mono">
                Questions? Send an email to hello@mentorarena.online or call +92 332 2137898
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showAdmin && (
          <React.Suspense fallback={
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
              <div className="bg-white p-8 rounded-2xl animate-pulse text-brand-blue font-bold">Loading Admin...</div>
            </div>
          }>
            <AdminPanel 
              onClose={() => setShowAdmin(false)} 
              config={config}
              onUpdate={handleUpdateConfig}
            />
          </React.Suspense>
        )}
        {showLogin && (
          <LoginPortal 
            isOpen={showLogin} 
            onClose={() => setShowLogin(false)} 
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {legalType && (
          <LegalModal type={legalType} onClose={() => setLegalType(null)} />
        )}
        {selectedSyllabusTrack && (
          <SyllabusViewerModal 
            isOpen={selectedSyllabusTrack !== null} 
            initialTrack={selectedSyllabusTrack} 
            onClose={() => setSelectedSyllabusTrack(null)} 
            onBookClick={() => {
              setSelectedSyllabusTrack(null);
              handleNavigate('/contact');
            }}
          />
        )}
      </AnimatePresence>

      <Footer onOpenLegal={setLegalType} onNavigate={handleNavigate} />
      <ChatbotLauncher />
    </div>
  );
}
