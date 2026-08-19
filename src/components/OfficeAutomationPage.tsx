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
  Printer
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';
import { HeroBanner } from './HeroBanner';

interface OfficeAutomationPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const OfficeAutomationPage: React.FC<OfficeAutomationPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity 
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const modules = [
    {
      week: "Weeks 1–2",
      title: "Advanced Word Processing & Document Architecture",
      focus: "From Basic Typing to Corporate Style Hierarchies",
      topics: [
        "Mastering the Microsoft Word Ribbon, Quick Access Toolbar & Custom Shortcuts",
        "Document Anatomy: Margins, Gutters, Page Breaks, Section Breaks (Continuous vs. Next Page), and Headers/Footers",
        "Custom Style Hierarchies: Defining Heading 1–5, Body, Caption, and Callout styles for rapid 1-click reformatting",
        "Advanced Typography in Word: Kerning, Ligatures, Paragraph Spacing, and Tab Stops with dot leaders",
        "Complex Page Setups: Mixing Portrait and Landscape orientations within a single document using Section Breaks"
      ],
      milestone: "Create a Standardized Corporate Document Template with Custom Style Guides"
    },
    {
      week: "Weeks 3–5",
      title: "Long Document Engineering: TOCs, Indexes & Research Citations",
      focus: "Handling 100+ Page Reports, Theses & Policy Manuals",
      topics: [
        "Automated Multi-Level Numbering linked directly to Heading Styles (1.1, 1.1.1, 1.1.2)",
        "Generating Dynamic Tables of Contents (TOC), List of Figures, and List of Tables with 1-click updates",
        "Footnotes, Endnotes, Bookmarks, and Cross-Referencing across chapters without broken links",
        "Academic & Corporate Citation Management (APA, Harvard, IEEE) using built-in Source Managers",
        "Master Document & Subdocument Architecture for massive multi-author projects"
      ],
      milestone: "Construct a 50-Page Enterprise Policy Manual with Dynamic Cross-Referencing"
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
      milestone: "Deploy an Automated 1-Click Mail Merge Certificate & Invoice Distribution Pipeline"
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
      milestone: "Build a Custom Corporate Slide Master Template Suite with 15 Distinct Layouts"
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
      milestone: "Deliver a High-Stakes 25-Slide Interactive Investor Pitch Deck with Cinematic Morph"
    }
  ];

  const tools = [
    { name: "Microsoft Word", role: "Document Automation & Styles", level: "Primary Word Engine" },
    { name: "Microsoft PowerPoint", role: "Slide Master & Pitch Decks", level: "Executive Presentations" },
    { name: "Microsoft 365 Cloud", role: "Collaborative Real-time Editing", level: "Cloud Ecosystem" },
    { name: "Excel Data Link", role: "Mail Merge & Chart Feed", level: "Cross-App Automation" },
    { name: "Adobe Acrobat Pro", role: "PDF Pre-Press & Form Security", level: "Digital Archiving" }
  ];

  const targetRoles = [
    { title: "Executive Assistant / Office Manager", salary: "PKR 70k - 140k / mo", type: "Corporate / MNCs" },
    { title: "Document Controller / Specialist", salary: "PKR 85k - 160k / mo", type: "Construction / Engineering" },
    { title: "Freelance Presentation Designer", salary: "$25 - $80 / slide", type: "Upwork & Global Startups" },
    { title: "Operations & Admin Officer", salary: "PKR 60k - 120k / mo", type: "Banking / Education / NGOs" }
  ];

  const faqs = [
    {
      q: "What makes this Office Automation course different from basic computer courses?",
      a: "Most local courses only teach basic typing and simple copy-pasting. Our 1-to-1 mentorship focuses on industrial-grade automation: custom Style hierarchies, automated 100-page Table of Contents, Excel-linked Mail Merge pipelines, Slide Master engineering, and cinematic PowerPoint Morph transitions."
    },
    {
      q: "Which software versions are covered?",
      a: "We train you on the latest Microsoft 365 Apps for Enterprise (as well as Office 2021/2024), covering both desktop and cloud collaborative workflows across Windows and Mac environments."
    },
    {
      q: "Can I use these skills for freelance work on Upwork or Fiverr?",
      a: "Absolutely! Presentation design and corporate document formatting are among the highest-paid hourly micro-services on Upwork, with professional presentation designers earning $25 to $100 per slide from international startups and venture capital funds."
    },
    {
      q: "How does 1-to-1 mentorship work for Office Automation?",
      a: "Lead mentor Fazal Shahid Latif shares live screens, conducts line-by-line document inspections, debugs section breaks in real time, and demonstrates keyboard shortcuts that increase your daily corporate output by 5x."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
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
              "jobTitle": "Lead Tech Mentor"
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
        badge="1-to-1 Executive Productivity Mentorship · 14 Weeks (150 Hours)"
        title="Office Automation"
        highlightText="Master Advanced Word Processing & C-Suite PowerPoint"
        subtitle={`Elevate corporate documentation and presentation design to executive standards. Learn automated styling, Mail Merge pipelines, Slide Master architecture, and cinematic pitch decks with 1-to-1 guidance in ${citySuffix}.`}
        primaryCtaText="Book Free Diagnostic Call"
        secondaryCtaText="Direct WhatsApp Admission"
        onPrimaryCta={onBookCall}
        onSecondaryCta={() => window.open(`https://wa.me/${BUSINESS_INFO.phone}?text=Hi%20Mentor%20Arena,%20I%20want%20to%20enroll%20in%20the%20Office%20Automation%20(Word%20%26%20PowerPoint)%20Course%20(PKR%206,000/mo).`, '_blank')}
        trustStats={[
          { label: "Mentorship Format", value: "Direct 1-to-1" },
          { label: "Live Hours", value: "150 Hours" },
          { label: "Tuition Fee", value: "PKR 6,000/mo" },
          { label: "Shipped Deliverable", value: "Executive Doc Suite" }
        ]}
      />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button onClick={onBackToHome} className="hover:text-brand-blue font-medium transition-colors">Home</button>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Courses</span>
          <span>/</span>
          <span className="text-brand-blue font-semibold">Office Automation (Word &amp; PowerPoint)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Syllabus & Learning Pillars */}
          <div className="lg:col-span-2 space-y-12">
            {/* Value Proposition Highlights */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <FileText className="text-brand-blue" size={28} />
                Executive Office Automation: Beyond Basic Typing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                In modern corporate environments, slow manual formatting wastes countless hours. This 14-week 1-to-1 mentorship equips you with advanced productivity engineering: automated styles that reformat 200-page proposals in one click, Mail Merge engines that generate hundreds of customized letters instantly, and Slide Master pitch decks that command attention in the boardroom.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <Sliders className="text-brand-blue shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Custom Style Hierarchies</h3>
                    <p className="text-xs text-gray-600 mt-1">Master Heading styles, multi-level numbering, and automated TOC generation with zero formatting drift.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                  <Send className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Mail Merge Automation</h3>
                    <p className="text-xs text-gray-600 mt-1">Generate personalized letters, certificates, contracts, and emails fed directly from Excel datasets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50">
                  <Presentation className="text-purple-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Slide Master Architecture</h3>
                    <p className="text-xs text-gray-600 mt-1">Design unified corporate templates with locked layouts, custom fonts, and brand color palettes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                  <Sparkles className="text-amber-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Cinematic Morph &amp; Infographics</h3>
                    <p className="text-xs text-gray-600 mt-1">Transform dense business data into smooth, animated pitch decks that win investors and executive buy-in.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Curriculum Accordion */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">14-Week Intensive Curriculum</h2>
                  <p className="text-sm text-gray-500 mt-1">Structured 150-hour hands-on progression from advanced formatting to C-Suite pitch decks.</p>
                </div>
                <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/20">
                  5 Core Milestones
                </span>
              </div>

              <div className="space-y-4">
                {modules.map((mod, index) => {
                  const isOpen = openModuleIndex === index;
                  return (
                    <div 
                      key={index}
                      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen ? 'border-brand-blue/40 shadow-md ring-2 ring-brand-blue/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? null : index)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue">
                              {mod.week}
                            </span>
                            <span className="text-xs font-semibold text-gray-500">
                              {mod.focus}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">{mod.title}</h3>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-brand-blue' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 space-y-4 animate-in fade-in duration-200">
                          <ul className="space-y-2.5">
                            {mod.topics.map((topic, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2.5 text-sm text-gray-600">
                                <Check size={16} className="text-brand-green shrink-0 mt-0.5" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 flex items-center gap-3 mt-4">
                            <Award size={18} className="text-amber-500 shrink-0" />
                            <div className="text-xs font-medium text-gray-700">
                              <span className="font-bold text-gray-900">Shipped Milestone: </span>
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

            {/* Software & Toolchain Stack */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <MonitorCheck className="text-brand-blue" size={26} />
                Software &amp; Productivity Toolchain
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((tool, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.role}</div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-brand-blue shadow-xs">
                      {tool.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities & Corporate Roles */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <Briefcase className="text-brand-blue" size={26} />
                Corporate Demand &amp; Freelance Opportunities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {targetRoles.map((role, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-slate-50/50 space-y-2">
                    <div className="text-xs font-bold text-brand-blue uppercase tracking-wider">{role.type}</div>
                    <div className="text-base font-bold text-gray-900">{role.title}</div>
                    <div className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                      <Wallet size={16} />
                      {role.salary}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <HelpCircle className="text-brand-blue" size={26} />
                Course FAQs
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-2">
                    <h3 className="text-sm font-bold text-gray-900">{faq.q}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Enrollment Card, Pricing & Mentor Profile */}
          <div className="space-y-8">
            {/* Enrollment Summary Card */}
            <div className="bg-white rounded-3xl p-8 border-2 border-brand-blue/30 shadow-xl space-y-6 sticky top-28">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full">
                  Admission Open · 2026 Batch
                </span>
                <h3 className="text-2xl font-black text-gray-900">Office Automation</h3>
                <p className="text-xs text-gray-500">14-Week Live Mentorship (150 Hours) · Max 6 Students</p>
              </div>

              <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-1">
                <div className="text-xs font-semibold text-gray-600">Monthly Tuition Installment</div>
                <div className="text-3xl font-black text-brand-blue">PKR 6,000 <span className="text-sm font-medium text-gray-500">/ month</span></div>
                <div className="text-[11px] text-gray-500 font-medium pt-1">Total 14-Week Program Duration · 0% Interest Installments</div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                  <span>Direct 1-to-1 screen reviews with Fazal Shahid Latif</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                  <span>Advanced Word styles, dynamic TOC &amp; Mail Merge</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                  <span>C-Suite Slide Master design &amp; Morph animations</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                  <span>Verified payment via JazzCash &amp; Zindigi Raast</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <button
                  onClick={onBookCall}
                  className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall size={18} />
                  Book Free 15-Min Diagnostic Call
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hello%20Mentor%20Arena,%20I%20would%20like%20to%20enroll%20in%20the%20Office%20Automation%20(Word%20%26%20PowerPoint)%20Course%20(PKR%206,000/mo).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-brand-green text-white rounded-xl font-bold text-sm hover:bg-brand-green/90 transition-all shadow-md shadow-brand-green/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Enroll via WhatsApp (0332 2137898)
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
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white font-bold text-xl flex items-center justify-center shadow-md">
                  FSL
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Fazal Shahid Latif</h4>
                  <p className="text-xs text-brand-blue font-semibold">Lead Mentor &amp; Systems Architect</p>
                  <p className="text-[11px] text-gray-500">30+ Years Industrial Engineering Lineage</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                "Speed and visual clarity are the ultimate workplace superpowers. When you can automate 100-page documentation and design boardroom-level pitch decks, your value to any organization multiplies exponentially."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
