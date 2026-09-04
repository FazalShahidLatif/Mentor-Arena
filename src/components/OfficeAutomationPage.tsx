import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Presentation, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Wallet, 
  ArrowRight, 
  Download, 
  Users, 
  ShieldCheck, 
  HelpCircle,
  Briefcase,
  ChevronDown,
  Award,
  PhoneCall,
  Check,
  Send,
  Sliders,
  FileSpreadsheet,
  MonitorCheck,
  Printer,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  GraduationCap,
  Building2,
  UserCheck,
  Star,
  MapPin,
  Laptop
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';
import { HeroBanner } from './HeroBanner';
import { ProToolkitSection } from './ProToolkitSection';
import { TrackId } from './SyllabusViewerModal';

interface OfficeAutomationPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
  onNavigate?: (path: string) => void;
  onOpenSyllabus?: (track: TrackId) => void;
  onOpenSyllabusMagnet?: (trackName?: string) => void;
}

export const OfficeAutomationPage: React.FC<OfficeAutomationPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity,
  onNavigate,
  onOpenSyllabus,
  onOpenSyllabusMagnet
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
      title: "Advanced Word Processing & Document Architecture",
      focus: "From Basic Typing to Corporate Style Hierarchies",
      topics: [
        "Mastering the Microsoft Word Ribbon, Quick Access Toolbar & Custom Productivity Shortcuts",
        "Document Anatomy: Margins, Gutters, Page Breaks, Section Breaks (Continuous vs. Next Page), and Unlinked Headers/Footers",
        "Custom Style Hierarchies: Defining Heading 1–5, Body Text, Bullet List, Caption, and Callout styles for rapid 1-click reformatting",
        "Advanced Typography in Word: Kerning, Ligatures, Paragraph Spacing, and Tab Stops with custom dot/dash leaders",
        "Complex Page Setups: Seamlessly mixing Portrait and Landscape orientations within a single document using Section Breaks"
      ],
      milestone: "Standardized Corporate Document Template with Custom Style Guides & Grid Layout"
    },
    {
      week: "Weeks 3–5",
      title: "Long Document Engineering: TOCs, Indexes & Research Citations",
      focus: "Handling 100+ Page Reports, Theses, Audits & Policy Manuals",
      topics: [
        "Automated Multi-Level Numbering linked directly to Heading Styles (1.1, 1.1.1, 1.1.2) with zero formatting drift",
        "Generating Dynamic Tables of Contents (TOC), List of Figures, and List of Tables with 1-click automated updates",
        "Footnotes, Endnotes, Bookmarks, and Cross-Referencing across chapters without broken links",
        "Academic & Corporate Citation Management (APA, Harvard, IEEE) using built-in Source Managers & Bibliographies",
        "Master Document & Subdocument Architecture for massive multi-author projects and annual reports"
      ],
      milestone: "A 50-Page Enterprise Policy Manual with Dynamic Multi-Level Cross-Referencing"
    },
    {
      week: "Weeks 6–8",
      title: "Mail Merge Automation, Forms & Collaborative Review",
      focus: "Automating Bulk Document Generation & Corporate Security",
      topics: [
        "Mail Merge Engine: Linking Word with Excel spreadsheets and Outlook for automated personalized letters & emails",
        "Generating Bulk Invoices, Personalized Event Passes, Certificates, and Mailing Labels in minutes",
        "Interactive Form Controls: Checkboxes, Dropdown lists, Date pickers, and Restricted Editing fields",
        "Track Changes, Inline Comments, Document Compare, and Multi-Author Version Merging",
        "Document Protection: Password encryption, Watermarking, Metadata stripping, and PDF/A archiving"
      ],
      milestone: "An Automated 1-Click Mail Merge Certificate & Invoice Distribution Pipeline"
    },
    {
      week: "Weeks 9–11",
      title: "PowerPoint Slide Master Architecture & Data Storytelling",
      focus: "C-Suite Presentation Engineering & Visual Hierarchy",
      topics: [
        "Slide Master Engineering: Custom layouts, theme fonts, global color palettes, and locked placeholders",
        "Visual Storytelling: Cognitive Load Reduction, 3-Second Rule, and High-Impact Headline Writing",
        "Data Visualization in PowerPoint: Transforming complex Excel tables into dynamic native charts & infographics",
        "SmartArt Customization, Vector Icon integration, and Custom Shape Building",
        "Slide Sorter Optimization: Structuring executive presentations for investor pitches vs. training workshops"
      ],
      milestone: "A Custom Corporate Slide Master Template Suite with 15 Distinct Layouts"
    },
    {
      week: "Weeks 12–14",
      title: "Advanced PowerPoint Transitions, Morph & Pitch Decks",
      focus: "Motion Graphics, Interactive Kiosks & Executive Pitch Delivery",
      topics: [
        "Mastering the Morph Transition for fluid cinematic object movement, zooming, and 3D rotations",
        "Complex Animation Timing: Triggered sequences, emphasis effects, and motion paths without visual clutter",
        "Interactive Non-Linear Presentations: Hyperlinked navigation menus, summary zooms, and branching agendas",
        "Creating Investor Pitch Decks, Annual Shareholder Reports, and Boardroom Presentations",
        "Live Presentation Delivery: Presenter View, Subtitles, Laser pointer tools, and Broadcast Sharing"
      ],
      milestone: "A High-Stakes 25-Slide Interactive Investor Pitch Deck with Cinematic Morph Transitions"
    }
  ];

  const tools = [
    { name: "Microsoft Word 365", role: "Document Automation & Styles", level: "Primary Word Engine" },
    { name: "Microsoft PowerPoint 365", role: "Slide Master & Pitch Decks", level: "Executive Presentations" },
    { name: "Microsoft 365 Cloud", role: "Collaborative Real-time Editing", level: "Cloud Ecosystem" },
    { name: "Excel Data Link", role: "Mail Merge & Chart Feed", level: "Cross-App Automation" },
    { name: "Adobe Acrobat Pro", role: "PDF Pre-Press & Form Security", level: "Digital Archiving" }
  ];

  const targetRoles = [
    { title: "Executive Assistant / Office Manager", salary: "PKR 70k - 140k / mo", type: "Corporate / MNCs", desc: "Run executive office correspondence, board meeting presentations, and automated documentation." },
    { title: "Document Controller / Specialist", salary: "PKR 85k - 160k / mo", type: "Construction / Engineering / Oil & Gas", desc: "Manage multi-chapter technical specifications, tender manuals, and revision tracking systems." },
    { title: "Freelance Presentation Designer", salary: "$25 - $80 / slide", type: "Upwork & Global Startups", desc: "Design high-converting pitch decks and investor slide decks for global founders and executives." },
    { title: "Operations & Admin Lead", salary: "PKR 60k - 120k / mo", type: "Banking / Education / NGOs", desc: "Automate company reporting, multi-recipient Mail Merge circulars, and standard operating procedures." }
  ];

  const relatedCourses = [
    {
      title: "Advance Excel & Financial Modeling",
      path: "/courses/advance-excel",
      badge: "Best Combined Pair",
      desc: "Master Dynamic Arrays, Power Query ETL, and C-Suite KPI Dashboards to feed live data into Word & PowerPoint.",
      icon: FileSpreadsheet,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      title: "Logo & Graphic Designing",
      path: "/courses/graphic-design",
      badge: "Creative Visuals",
      desc: "Learn Adobe Illustrator and Photoshop to create custom vector brand assets and visuals for your slide decks.",
      icon: Layers,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      title: "Computerized Accounting & ERP",
      path: "/courses/computerized-accounting",
      badge: "Corporate Finance",
      desc: "Master QuickBooks Online, Xero, and VAT bookkeeping for comprehensive office and financial administration.",
      icon: Briefcase,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "Generative AI & Agentic Automation",
      path: "/courses/generative-ai",
      badge: "AI Productivity",
      desc: "Supercharge your document writing and presentation drafting using advanced LLM prompt frameworks and AI agents.",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50 border-purple-200"
    }
  ];

  const faqs = [
    {
      q: "What makes this Office Automation course different from basic typing classes in Pakistan?",
      a: "Most local institutes only teach slow manual typing and basic copy-pasting. At Mentor Arena, 30+ year veteran mentor Fazal Shahid Latif trains you in high-speed corporate productivity: custom Style hierarchies, automated 100-page Table of Contents, Excel-linked Mail Merge pipelines that generate 500+ customized letters in 1 minute, and Slide Master pitch decks with cinematic PowerPoint Morph."
    },
    {
      q: "Which software versions are taught?",
      a: "We train you on the latest Microsoft 365 Apps for Enterprise (as well as Office 2021/2024), covering both desktop and cloud collaborative workflows across Windows and Mac environments."
    },
    {
      q: "Can I earn as a freelance presentation designer or document formatter on Upwork?",
      a: "Yes! High-level presentation design is one of the most lucrative micro-skills on Upwork, Fiverr, and LinkedIn. International founders and venture capitalists regularly pay $25 to $100 per slide for polished, investor-ready pitch decks, and $50–$200 for clean formatting of long business proposals."
    },
    {
      q: "How does 1-to-1 mentorship work for Office Automation?",
      a: "You receive direct live screen-sharing instruction from Fazal Shahid Latif. Your mentor reviews your document templates line by line, debugs tricky section break anomalies in real time, and demonstrates keyboard shortcuts that increase your daily workplace output by 5x."
    },
    {
      q: "What are the admission requirements and installment schedule?",
      a: "No prior technical background is required. Tuition is a transparent PKR 6,000 per month across the 14-week program (total 150 hours), payable via JazzCash Business or Zindigi Raast with zero hidden fees and a full 100% money-back guarantee after your first orientation session."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24" id="office-automation-page">
      {/* Dynamic SEO JSON-LD Course Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": `Office Automation (Word Processing & PowerPoint) Course in ${citySuffix}`,
          "description": `Master advanced Microsoft Word document formatting, dynamic Table of Contents, Mail Merge automation, and C-Suite PowerPoint presentation design with 1-to-1 mentorship in ${citySuffix}.`,
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
              "jobTitle": "Lead Tech Mentor",
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
        id="office-automation-hero-banner"
        theme="indigo"
        badge={{
          text: `📄 150 Live Hours · 1-to-1 Executive Productivity (${citySuffix})`,
          icon: FileText
        }}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigateTo('/') },
          { label: 'Courses', onClick: () => navigateTo('/courses') },
          { label: 'Office Automation' }
        ]}
        title={
          <>
            Office Automation &amp; Executive Presentation Course in <span className="text-indigo-400">{citySuffix}</span>
          </>
        }
        description={
          <>
            Transform your everyday office productivity into an elite workplace superpower. Master industrial-grade Microsoft Word formatting, dynamic multi-level Table of Contents, automated Excel-linked Mail Merge pipelines, and cinematic PowerPoint Morph investor pitch decks under 1-to-1 guidance from 30+ year veteran mentor <strong>Fazal Shahid Latif</strong>. Limited to <strong>max 6 students per cohort</strong>.
          </>
        }
        stats={[
          { label: "Duration", value: "14 Weeks", subtext: "150 Live Hours" },
          { label: "Tuition", value: "PKR 6,000", subtext: "Monthly Plan" },
          { label: "Mentorship", value: "1-to-1", subtext: "Max 6 Students" },
          { label: "Cap Project", value: "Pitch Deck & Docs", subtext: "Live Suite" }
        ]}
        primaryCta={{
          text: "Enroll in Next Batch (PKR 6,000/mo)",
          onClick: onBookCall
        }}
        secondaryCta={{
          text: "WhatsApp Fazal Shahid Latif",
          whatsappMessage: `Hi Mentor Arena, I want to enroll in the Office Automation (Word & PowerPoint) Course in ${citySuffix} (PKR 6,000/mo). Please share the schedule.`
        }}
        syllabusCta={{
          text: "Download 2026 Comprehensive 16-Week Roadmap & Lecture Plan (PDF)",
          onClick: () => onOpenSyllabusMagnet ? onOpenSyllabusMagnet('Office Automation (Word & PowerPoint)') : null,
          badge: "Includes Free Pro SEO & Dev Toolkit ($1,400 Value)"
        }}
        image={{
          src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
          alt: "Office Automation and PowerPoint Presentation Mentorship Pakistan",
          badgeText: "Microsoft 365 Certified Mastery",
          badgeSubtext: "Word Styles · Mail Merge · PPT Morph"
        }}
      />

      {/* Course Silo Fast Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar text-xs font-semibold">
            <span className="text-gray-400 uppercase tracking-wider shrink-0 font-mono text-[11px]">Jump to:</span>
            <div className="flex items-center gap-2 shrink-0">
              <a href="#curriculum" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">14-Week Curriculum</a>
              <a href="#deliverables" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Shipped Deliverables</a>
              <a href="#careers" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Career &amp; Freelancing</a>
              <a href="#pricing" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Tuition &amp; Payment</a>
              <a href="#faqs" className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Course FAQs</a>
              <a href="#related" className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">Related Programs</a>
            </div>
            <button 
              onClick={onBookCall}
              className="ml-auto hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shrink-0 shadow-xs"
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
          
          {/* Left Column: Syllabus, Pillars & Deliverables */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Core Value Proposition */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full uppercase tracking-wider">
                Industrial-Grade Office Productivity
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight flex items-center gap-3">
                <FileText className="text-indigo-600 shrink-0" size={30} />
                <span>Executive Office Automation: Beyond Basic Typing</span>
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                In corporate boardrooms, multinational banks, engineering consultancies, and remote startups, manual document formatting wastes hundreds of billable hours. This 14-week 1-to-1 mentorship program equips you with advanced productivity engineering: automated styles that reformat 200-page proposals in one click, Mail Merge engines that generate hundreds of customized certificates and contracts in seconds, and Slide Master pitch decks that command executive attention.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                  <Sliders className="text-indigo-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Custom Style Hierarchies</h3>
                    <p className="text-xs text-gray-600 mt-1">Master Heading styles, multi-level numbering, and automated Table of Contents with zero formatting drift.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                  <Send className="text-emerald-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Mail Merge Automation</h3>
                    <p className="text-xs text-gray-600 mt-1">Generate personalized letters, certificates, contracts, and emails fed directly from Excel datasets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
                  <Presentation className="text-purple-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Slide Master Architecture</h3>
                    <p className="text-xs text-gray-600 mt-1">Design unified corporate templates with locked layouts, custom typography, and corporate color palettes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
                  <Sparkles className="text-amber-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Cinematic Morph &amp; Infographics</h3>
                    <p className="text-xs text-gray-600 mt-1">Transform dense business spreadsheets into fluid, animated pitch decks that win investors and executive buy-in.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Curriculum Accordion */}
            <div id="curriculum" className="space-y-6 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    150 Live Instruction Hours
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mt-2">
                    14-Week Modular Deep Dive
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Step-by-step 1-to-1 progression from Word styles to high-stakes investor pitch decks.</p>
                </div>
                {onOpenSyllabus && (
                  <button
                    onClick={() => onOpenSyllabus('office-automation')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition-all shrink-0 cursor-pointer"
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
                        isOpen ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/10' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? null : index)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono font-bold px-3 py-1.5 bg-indigo-700 text-white rounded-xl shrink-0">
                            {mod.week}
                          </span>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-950">{mod.title}</h3>
                            <p className="text-xs text-indigo-700 font-semibold">{mod.focus}</p>
                          </div>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-indigo-600' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 border-t border-indigo-100 bg-slate-50/50 space-y-4 animate-in fade-in duration-200">
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

                          <div className="bg-white p-4 rounded-xl border border-indigo-100 flex items-center gap-3 mt-4">
                            <Award size={20} className="text-indigo-600 shrink-0" />
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

            {/* Shipped Deliverable Card */}
            <div id="deliverables" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 scroll-mt-28">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
                  Tangible Portfolio Assets
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 tracking-tight">
                  What You Will Build &amp; Own Upon Graduation
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  You leave with a verified, ready-to-deploy portfolio of executive document templates and investor pitch decks:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">50-Page Enterprise Policy Manual</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Automated multi-level TOC, List of Figures, dynamic cross-references, and unlinked header/footer sections.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Automated Mail Merge Pipeline</h4>
                    <p className="text-xs text-gray-600 mt-0.5">1-click Excel-fed engine to generate customized invoices, certificates, and personalized email dispatches.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Corporate Slide Master Suite</h4>
                    <p className="text-xs text-gray-600 mt-0.5">15 locked layout designs, unified corporate font pairs, custom color palettes, and foolproof placeholders.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">25-Slide Cinematic Investor Pitch Deck</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Smooth PowerPoint Morph transitions, data-driven infographics, and non-linear hyperlinked navigation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Software Stack */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-950 tracking-tight flex items-center gap-3">
                <MonitorCheck className="text-indigo-600" size={26} />
                <span>Productivity &amp; Software Toolchain</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((tool, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-950">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.role}</div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-indigo-700 shadow-xs">
                      {tool.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities & Corporate Roles */}
            <div id="careers" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 scroll-mt-28">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-100 text-blue-800 rounded-full uppercase tracking-wider">
                  High-Demand Market Careers
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 tracking-tight flex items-center gap-3">
                  <Briefcase className="text-indigo-600" size={28} />
                  <span>Corporate Salaries &amp; Upwork Freelance Rates</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {targetRoles.map((role, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-gray-200 bg-slate-50/60 space-y-2">
                    <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">{role.type}</div>
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

            {/* Pricing & Verified Payment Gateways */}
            <div id="pricing" className="p-8 md:p-10 bg-white rounded-3xl border-2 border-indigo-600 shadow-xl scroll-mt-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    100% Transparent Tuition
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 mb-2 tracking-tight">
                    Tuition &amp; Installment Schedule
                  </h2>
                  <div className="flex items-baseline gap-2 my-4">
                    <span className="text-4xl sm:text-5xl font-black text-indigo-700">PKR 6,000</span>
                    <span className="text-gray-500 font-semibold text-sm">/ month (14 Weeks)</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    Structured in easy monthly payments. Includes 150 hours of live 1-to-1 screen instruction, private recorded archives, templates, and lifelong WhatsApp mentor mentorship.
                  </p>

                  <div className="space-y-2.5 text-xs text-gray-700">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Full Refund Guarantee after the first live orientation</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct 1-to-1 screen code/doc reviews with Fazal Shahid Latif</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Flexible evening and weekend batches for working professionals</span>
                    </div>
                  </div>
                </div>

                {/* Local Verified Gateways Box */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 space-y-4">
                  <h3 className="font-bold text-gray-950 text-sm flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-indigo-700" />
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
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all text-center text-sm shadow-md cursor-pointer"
                    >
                      Book Free 15-Min Diagnostic Call
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
                <HelpCircle className="text-indigo-600" size={28} />
                <span>Frequently Asked Questions — Office Automation</span>
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
                <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full uppercase tracking-wider">
                  Complete Learning Pathway
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 tracking-tight">
                  Related Programs &amp; Complementary Skill Tracks
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Multiply your market earnings by combining Office Automation with data analytics, graphic design, and artificial intelligence:
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
                      className="p-5 rounded-2xl border border-gray-200 bg-slate-50/50 hover:bg-white hover:border-indigo-400 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${course.color}`}>
                            {course.badge}
                          </span>
                          <Icon size={18} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        </div>
                        <h3 className="font-bold text-base text-gray-950 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                          <span>{course.title}</span>
                          <ArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {course.desc}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center text-xs font-bold text-indigo-600 gap-1 mt-2">
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
                  <GraduationCap className="text-indigo-600" size={20} />
                  <span>Personalized Pathways for Different Learners</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => navigateTo('/audiences/students')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50/60 hover:border-indigo-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-gray-950 group-hover:text-indigo-600 flex items-center justify-between">
                      <span>For College Students</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Acquire real workplace tools and build job-ready portfolios before graduating.</p>
                  </button>

                  <button
                    onClick={() => navigateTo('/audiences/parents')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50/60 hover:border-indigo-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-gray-950 group-hover:text-indigo-600 flex items-center justify-between">
                      <span>For Concerned Parents</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">100% verified 1-to-1 mentorship with transparent weekly progress updates.</p>
                  </button>

                  <button
                    onClick={() => navigateTo('/audiences/employers')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50/60 hover:border-indigo-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-gray-950 group-hover:text-indigo-600 flex items-center justify-between">
                      <span>For Corporate Employers</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Upskill your executive staff in corporate styling, Mail Merge, and pitch decks.</p>
                  </button>
                </div>
              </div>

              {/* Related Knowledge Base Blog Cross-Links */}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
                  <BookOpen className="text-indigo-600" size={20} />
                  <span>Free Guides &amp; Industry Articles</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => navigateTo('/blog/receiving-foreign-remittances-pakistan-alternatives-paypal')}
                    className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50/60 hover:border-indigo-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-gray-900 group-hover:text-indigo-600">Receiving Foreign Client Payments in Pakistan</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">How to withdraw Upwork and freelance presentation fees via Payoneer, Wise &amp; Raast.</div>
                  </button>

                  <button
                    onClick={() => navigateTo('/blog/remote-react-developer-job-lahore-karachi')}
                    className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50/60 hover:border-indigo-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-gray-900 group-hover:text-indigo-600">Landing High-Paying Remote Tech Jobs in Pakistan</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Strategies to bypass local low-wage traps and secure international corporate contracts.</div>
                  </button>
                </div>
              </div>

              {/* Core Site Pages Navigation */}
              <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-gray-600">
                <div className="flex flex-wrap items-center gap-4">
                  <button onClick={() => navigateTo('/about')} className="hover:text-indigo-600 transition-colors cursor-pointer">About Fazal Shahid Latif</button>
                  <span>·</span>
                  <button onClick={() => navigateTo('/pricing')} className="hover:text-indigo-600 transition-colors cursor-pointer">All Tuition Fees</button>
                  <span>·</span>
                  <button onClick={() => navigateTo('/reviews')} className="hover:text-indigo-600 transition-colors cursor-pointer">Student Reviews &amp; Case Studies</button>
                  <span>·</span>
                  <button onClick={() => navigateTo('/faq')} className="hover:text-indigo-600 transition-colors cursor-pointer">General FAQs</button>
                  <span>·</span>
                  <button onClick={() => navigateTo('/contact')} className="hover:text-indigo-600 transition-colors cursor-pointer">Contact Admissions</button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Enrollment Card, Tuition & Mentor Card */}
          <div className="space-y-8">
            
            {/* Enrollment Action Card */}
            <div className="bg-white rounded-3xl p-8 border-2 border-indigo-600 shadow-xl space-y-6 sticky top-28">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Admission Open · 2026 Cohort
                </span>
                <h3 className="text-2xl font-black text-gray-950">Office Automation</h3>
                <p className="text-xs text-gray-500">14-Week Live Mentorship (150 Hours) · Max 6 Students</p>
              </div>

              <div className="p-5 bg-indigo-50/70 rounded-2xl border border-indigo-100 space-y-1">
                <div className="text-xs font-semibold text-gray-600">Monthly Tuition Installment</div>
                <div className="text-3xl font-black text-indigo-700">PKR 6,000 <span className="text-sm font-medium text-gray-500">/ month</span></div>
                <div className="text-[11px] text-gray-500 font-medium pt-1">Total 14-Week Program Duration · 0% Interest Installments</div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Direct 1-to-1 screen reviews with Fazal Shahid Latif</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Advanced Word styles, dynamic TOC &amp; Mail Merge</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>C-Suite Slide Master design &amp; Morph animations</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Verified payment via JazzCash &amp; Zindigi Raast</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <button
                  onClick={onBookCall}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall size={18} />
                  <span>Book Free 15-Min Clarity Call</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hello%20Mentor%20Arena,%20I%20would%20like%20to%20enroll%20in%20the%20Office%20Automation%20(Word%20%26%20PowerPoint)%20Course%20in%20${citySuffix}%20(PKR%206,000/mo).`}
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

            {/* Lead Mentor Bio Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-700 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                  FSL
                </div>
                <div>
                  <h4 className="font-bold text-gray-950 text-base">Fazal Shahid Latif</h4>
                  <p className="text-xs text-indigo-700 font-bold">Lead Mentor &amp; Systems Architect</p>
                  <p className="text-[11px] text-gray-500">30+ Years Industrial Engineering Lineage</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                "Speed, structural consistency, and visual clarity are the ultimate workplace superpowers. When you can automate 100-page corporate documentation and design boardroom-level pitch decks, your value to any company multiplies exponentially."
              </p>
              <button 
                onClick={() => navigateTo('/about')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full Mentor Profile</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Nationwide City Badges */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                <MapPin size={16} className="text-indigo-600" />
                <span>Live Interactive Training Nationwide</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Live interactive Google Meet screen-sharing cohorts available for students and working professionals in:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Overseas Pakistanis'].map((city, cIdx) => (
                  <span key={cIdx} className="text-[11px] px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium">
                    {city}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bundled Free Pro SEO & Dev Toolkit Section ($1,400+ Value) */}
        <div className="mt-16">
          <ProToolkitSection
            onOpenSyllabusModal={() => onOpenSyllabusMagnet ? onOpenSyllabusMagnet('Office Automation (Word & PowerPoint)') : null}
            courseTrackName="Office Automation (Word & PowerPoint)"
          />
        </div>
      </div>
    </div>
  );
};
