import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  PenTool, 
  Layers, 
  Image as ImageIcon, 
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
  Layout,
  Shapes,
  Maximize2,
  Share2,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  GraduationCap,
  FileSpreadsheet,
  FileText,
  MapPin,
  Laptop
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';
import { HeroBanner } from './HeroBanner';
import { ProToolkitSection } from './ProToolkitSection';
import { TrackId } from './SyllabusViewerModal';

interface GraphicDesignPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
  onNavigate?: (path: string) => void;
  onOpenSyllabus?: (track: TrackId) => void;
  onOpenSyllabusMagnet?: (trackName?: string) => void;
}

export const GraphicDesignPage: React.FC<GraphicDesignPageProps> = ({ 
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
      title: "Design Principles, Color Psychology & Visual Grids",
      focus: "From Creative Intuition to Mathematical Design Frameworks",
      topics: [
        "Core Visual Principles: Contrast, Hierarchy, Alignment, Proximity, Balance, and Whitespace",
        "Color Theory: RGB vs. CMYK vs. Pantone, Chromatic Harmony, Contrast Ratios, and Emotional Triggers",
        "Typography Mastery: Serif vs. Sans-Serif vs. Display, Kerning, Leading, Tracking, and Font Pairing",
        "Golden Ratio & Geometric Grid Systems for Timeless Iconography",
        "Introduction to Adobe Illustrator Workspace, Vector Pen Tool & Bezier Curve Control"
      ],
      milestone: "Master the Precision Vector Pen Tool and Construct Geometric Grid Icons"
    },
    {
      week: "Weeks 3–5",
      title: "Logo Architecture & Vector Mark Crafting",
      focus: "Creating Distinctive, Memorable & Scalable Brand Marks",
      topics: [
        "The 7 Core Logo Classifications: Wordmarks, Lettermarks/Monograms, Pictorial Marks, Abstract, Mascots, Emblems, and Combination",
        "The Professional Logo Design Workflow: Client Brief, Mind Mapping, Pencil Sketching, and Vectorization",
        "Shape Builder Tool, Pathfinder operations, and Precision Anchor Point manipulation",
        "Negative Space Design: Hidden meanings and optical illusion techniques",
        "Scalability Testing: Ensuring flawless legibility from 16px Favicon to 50ft Billboard"
      ],
      milestone: "Ship 3 Complete Commercial Vector Logo Concepts with Grid Presentations"
    },
    {
      week: "Weeks 6–8",
      title: "Corporate Brand Identity Systems & Stationery",
      focus: "Building Cohesive 360° Visual Ecosystems",
      topics: [
        "Corporate Brand Guidelines (Brand Style Guide): Logo clearance zones, minimum sizes, and forbidden usage",
        "Designing Corporate Stationery: Business Cards, Letterheads, Envelopes, and ID Badges with print bleed",
        "Brand Color Palettes with exact HEX, RGB, CMYK, and Pantone swatch codes",
        "Packaging Design & Die-Cut lines for boxes, pouches, labels, and bottles",
        "Brand Asset Management: Organizing master files for client delivery (.AI, .EPS, .SVG, .PDF, .PNG)"
      ],
      milestone: "A 20-Page Corporate Brand Identity Guidelines Manual (PDF)"
    },
    {
      week: "Weeks 9–11",
      title: "Adobe Photoshop Mastery & Marketing Creatives",
      focus: "High-Converting Social Media Ads & Photo Manipulation",
      topics: [
        "Photoshop Workspace: Layer Styles, Smart Objects, Non-Destructive Editing, and Adjustment Layers",
        "Advanced Masking, Hair Extraction, Pen Tool Selections, and Background Removal",
        "High-End Photo Retouching: Frequency Separation, Dodge & Burn, and Color Grading",
        "High-CTR Social Media Creatives for Facebook, Instagram, LinkedIn & YouTube Thumbnails",
        "Realistic 3D Product Mockups: Smart Object displacement mapping on apparel, packaging, and digital devices"
      ],
      milestone: "A 10-Piece Commercial Social Media Advertising Campaign & Product Mockup Suite"
    },
    {
      week: "Weeks 12–14",
      title: "Print Production, Portfolio Presentation & Freelance Pitching",
      focus: "Commercial Monetization & Client Acquisition",
      topics: [
        "Pre-Press & Commercial Printing: Color separations, Bleeds, Crops, Overprint, and DPI resolutions (300 DPI)",
        "Building an Irresistible Behance & Dribbble Portfolio Case Study that attracts international clients",
        "Freelance Client Acquisition on Upwork, Fiverr, and LinkedIn: Writing winning proposals that convert",
        "Pricing Your Work: Hourly vs. Value-Based Flat Rates, Contracts, Revisions Policy & Copyright Transfer",
        "Live 1-to-1 Final Portfolio Defense & Commercial Readiness Certification"
      ],
      milestone: "A Live Published Behance Portfolio with 3 Comprehensive Brand Identity Case Studies"
    }
  ];

  const tools = [
    { name: "Adobe Illustrator", role: "Vector Logo & Identity", level: "Primary Vector Suite" },
    { name: "Adobe Photoshop", role: "Photo Retouch & Ad Creatives", level: "Raster & Mockups" },
    { name: "Figma", role: "Vector Prototyping & Layouts", level: "Digital Interface" },
    { name: "Pantone Color Bridge", role: "Physical Color Matching", level: "Print Standards" },
    { name: "Behance & Dribbble", role: "Commercial Portfolio", level: "Client Acquisition" }
  ];

  const targetRoles = [
    { title: "Brand Identity Designer", salary: "PKR 90k - 180k / mo", type: "Agencies / Global Remote", desc: "Design full brand guidelines, vector logos, and design language for startups and corporations." },
    { title: "Freelance Logo Specialist", salary: "$300 - $1,500 / project", type: "Upwork & Direct Clients", desc: "Deliver custom vector marks and brand toolkits directly to US/UK founders." },
    { title: "Senior Graphic Designer", salary: "PKR 120k - 220k / mo", type: "Corporate / Software Houses", desc: "Lead brand marketing visual assets, web illustrations, and physical packaging." },
    { title: "Social Media Creative Lead", salary: "PKR 80k - 150k / mo", type: "E-Commerce & Digital Marketing", desc: "Produce high-converting ad sets, product mockups, and promotional creatives." }
  ];

  const relatedCourses = [
    {
      title: "UI/UX Design & Growth Marketing",
      path: "/courses/uiux-digital-marketing",
      badge: "Natural Next Step",
      desc: "Advance from static graphic design to interactive product design in Figma, wireframing, and usability testing.",
      icon: Layout,
      color: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      title: "Office Automation (Word & PPT)",
      path: "/courses/office-automation",
      badge: "Executive Design",
      desc: "Apply your visual hierarchy and branding skills to C-Suite presentation decks and corporate documents.",
      icon: FileText,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      title: "MERN Stack Web Development",
      path: "/courses/web-development",
      badge: "Code Your Designs",
      desc: "Learn React, Tailwind CSS, and Node.js to turn your graphic design assets into live interactive web apps.",
      icon: Laptop,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "Generative AI & Agentic Design",
      path: "/courses/generative-ai",
      badge: "AI Creatives",
      desc: "Integrate Midjourney, Stable Diffusion, and Gemini into your design workflow for rapid concept iteration.",
      icon: Sparkles,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    }
  ];

  const faqs = [
    {
      q: "Do I need prior drawing or sketching skills to learn Logo & Graphic Design?",
      a: "No! Professional graphic design relies on visual geometry, grid structures, color theory, and software tool mastery. We teach you from the absolute ground up, beginning with fundamental shapes, pen tool mechanics, and digital grid systems."
    },
    {
      q: "What software will I learn in this mentorship program?",
      a: "You will receive deep 1-to-1 instruction in Adobe Illustrator (vector logo creation, typography, print design) and Adobe Photoshop (photo manipulation, social media ads, mockups), alongside industry workflow standards like Figma and Pantone matching."
    },
    {
      q: "Will I build a real portfolio to get freelance clients?",
      a: "Yes! By the end of 14 weeks, you will have designed 3 complete corporate brand identity case studies, 10 high-converting marketing creatives, and a live Behance portfolio that you can immediately send to Upwork, Fiverr, or international remote clients."
    },
    {
      q: "How does 1-to-1 mentorship differ from recorded YouTube videos or crowded institutes?",
      a: "In our 1-to-1 sessions with Fazal Shahid Latif, the mentor reviews your screen live, inspects your vector bezier handles, corrects optical kerning in real time, and critiques your layouts line by line. You get personalized feedback that eliminates years of trial and error."
    },
    {
      q: "What are the tuition and payment options?",
      a: "Tuition is PKR 6,000 per month across the 14-week program (total 150 hours), payable via JazzCash Business or Zindigi Raast with zero hidden fees and a full 100% money-back guarantee after your first orientation session."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24" id="graphic-design-page">
      {/* Dynamic SEO JSON-LD Course Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": `Logo & Graphic Designing Course (1-on-1 Mentorship in ${citySuffix})`,
          "description": `Master vector logo design, brand identity systems, Adobe Illustrator, and Photoshop through 150 hours of intensive 1-to-1 mentorship in ${citySuffix}.`,
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
        id="graphic-design-hero-banner"
        theme="purple"
        badge={{
          text: `🎨 150 Live Hours · 1-to-1 Creative Mentorship (${citySuffix})`,
          icon: Palette
        }}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigateTo('/') },
          { label: 'Courses', onClick: () => navigateTo('/courses') },
          { label: 'Logo & Graphic Design' }
        ]}
        title={
          <>
            Logo &amp; Brand Identity Design Masterclass in <span className="text-purple-400">{citySuffix}</span>
          </>
        }
        description={
          <>
            Master vector logo architecture, corporate brand identity manuals, commercial ad creatives, and print pre-press production in Adobe Illustrator and Photoshop. Guided directly by 30+ year veteran mentor <strong>Fazal Shahid Latif</strong>. Strictly limited to <strong>max 6 students per cohort</strong>.
          </>
        }
        stats={[
          { label: "Duration", value: "14 Weeks", subtext: "150 Live Hours" },
          { label: "Tuition", value: "PKR 6,000", subtext: "Monthly Plan" },
          { label: "Mentorship", value: "1-to-1", subtext: "Max 6 Students" },
          { label: "Cap Project", value: "Behance Kit", subtext: "3 Live Brands" }
        ]}
        primaryCta={{
          text: "Enroll in Next Batch (PKR 6,000/mo)",
          onClick: onBookCall
        }}
        secondaryCta={{
          text: "WhatsApp Fazal Shahid Latif",
          whatsappMessage: `Hi Mentor Arena, I want to enroll in the Logo & Graphic Designing Course in ${citySuffix} (PKR 6,000/mo). Please share batch timings.`
        }}
        syllabusCta={{
          text: "Download 2026 Comprehensive 16-Week Roadmap & Lecture Plan (PDF)",
          onClick: () => onOpenSyllabusMagnet ? onOpenSyllabusMagnet('Logo & Graphic Designing (Illustrator, Photoshop)') : null,
          badge: "Includes Free Pro SEO & Dev Toolkit ($1,400 Value)"
        }}
        image={{
          src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
          alt: "Logo & Graphic Design Mentorship Pakistan Adobe Illustrator Photoshop",
          badgeText: "Commercial Portfolio Shipped",
          badgeSubtext: "Illustrator · Photoshop · Behance Case Studies"
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
          
          {/* Left Column: Syllabus, Pillars & Deliverables */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Core Value Proposition */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full uppercase tracking-wider">
                Precision Vector Mastery
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight flex items-center gap-3">
                <Palette className="text-purple-600 shrink-0" size={30} />
                <span>Why This 1-to-1 Graphic Design Program Delivers Real Results</span>
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Most institutes teach superficial tool clicks without explaining the mathematical geometry, color psychology, and commercial strategy required to create timeless brand marks. In this 14-week 1-to-1 mentorship, you work directly on real-world briefs, learning vector precision, typography systems, and print pre-press standards that command premium freelance retainers ($300–$1,500/project).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
                  <Shapes className="text-purple-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Mathematical Vector Grids</h3>
                    <p className="text-xs text-gray-600 mt-1">Master Golden Ratio, geometric alignment, and optical balance for iconic brand marks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                  <Layout className="text-emerald-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Complete Brand Guidelines</h3>
                    <p className="text-xs text-gray-600 mt-1">Learn to produce 20+ page corporate identity manuals with exact color and font specifications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                  <ImageIcon className="text-blue-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Photoshop &amp; Social Creatives</h3>
                    <p className="text-xs text-gray-600 mt-1">Design high-CTR Facebook/Instagram ad creatives, realistic 3D product mockups, and banners.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
                  <Briefcase className="text-amber-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">Freelance Portfolio on Behance</h3>
                    <p className="text-xs text-gray-600 mt-1">Publish polished case studies and pitch international clients on Upwork with confidence.</p>
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
                  <p className="text-sm text-gray-600 mt-1">Structured progression from vector fundamentals to commercial brand guidelines.</p>
                </div>
                {onOpenSyllabus && (
                  <button
                    onClick={() => onOpenSyllabus('graphic-design')}
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
                  Tangible Creative Deliverables
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 tracking-tight">
                  What You Will Build &amp; Own Upon Graduation
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  You will leave with a verified, live published portfolio that wins international client trust:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">3 Commercial Vector Logo Packages</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Geometric grid presentations, color variants, dark/light modes, and export files.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">20-Page Corporate Brand Style Guide</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Logo safety zones, typography hierarchy, Pantone color formulas, and stationery layouts.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">10-Piece High-CTR Ad Creative Suite</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Photoshop photo manipulation, 3D product mockups, and high-converting marketing banners.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Live Behance Portfolio Case Study</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Complete project narratives and Upwork proposal templates ready for global bidding.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Software Toolchain */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-950 tracking-tight flex items-center gap-3">
                <PenTool className="text-purple-600" size={26} />
                <span>Creative Software &amp; Toolchain Stack</span>
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

            {/* Careers & Salary Rates */}
            <div id="careers" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 scroll-mt-28">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full uppercase tracking-wider">
                  Monetization &amp; Career Demand
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

            {/* Pricing & Official Gateways */}
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
                    Structured into monthly installments. Includes 150 hours of live 1-to-1 instruction, vector critique sessions, project assets, and lifelong WhatsApp group support.
                  </p>

                  <div className="space-y-2.5 text-xs text-gray-700">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Full Refund Guarantee after the first live orientation</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Live 1-to-1 vector bezier handle inspection &amp; feedback</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct WhatsApp access to lead mentor Fazal Shahid Latif</span>
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
                      After payment, send receipt screenshot on WhatsApp to <strong>0332 2137898</strong> for immediate registration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course FAQs */}
            <div id="faqs" className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight flex items-center gap-3">
                <HelpCircle className="text-purple-600" size={28} />
                <span>Frequently Asked Questions — Graphic Design Track</span>
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
                  Multiply your creative income by combining graphic design with UI/UX product design, web development, and executive presentation engineering:
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

              {/* Target Audience Portals */}
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
                      <span>For Creative Students</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Build an international Behance portfolio and start freelancing during college.</p>
                  </button>

                  <button
                    onClick={() => navigateTo('/audiences/parents')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-gray-950 group-hover:text-purple-600 flex items-center justify-between">
                      <span>For Concerned Parents</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Direct safe 1-to-1 mentorship with transparent weekly milestone progress.</p>
                  </button>

                  <button
                    onClick={() => navigateTo('/audiences/employers')}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-gray-950 group-hover:text-purple-600 flex items-center justify-between">
                      <span>For Design Agencies</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Hire job-ready designers trained in print bleed, packaging, and brand manuals.</p>
                  </button>
                </div>
              </div>

              {/* Related Knowledge Base Blog Cross-Links */}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
                  <BookOpen className="text-purple-600" size={20} />
                  <span>Free Guides &amp; Career Playbooks</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => navigateTo('/blog/receiving-foreign-remittances-pakistan-alternatives-paypal')}
                    className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-gray-900 group-hover:text-purple-600">Receiving Foreign Design Payments in Pakistan</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">How to withdraw Upwork logo design and brand identity retainers via Payoneer &amp; Raast.</div>
                  </button>

                  <button
                    onClick={() => navigateTo('/blog/remote-react-developer-job-lahore-karachi')}
                    className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-purple-50/60 hover:border-purple-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-gray-900 group-hover:text-purple-600">Winning International Remote Design Retainers</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Bidding frameworks to secure $1,000+ monthly client retainers from the US, UK, and GCC.</div>
                  </button>
                </div>
              </div>

              {/* Core Site Navigation */}
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

          {/* Right Column: Sticky Enrollment Card, Tuition & Mentor Profile */}
          <div className="space-y-8">
            
            {/* Enrollment Action Card */}
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-600 shadow-xl space-y-6 sticky top-28">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  Admission Open · 2026 Cohort
                </span>
                <h3 className="text-2xl font-black text-gray-950">Logo &amp; Graphic Design</h3>
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
                  <span>Vector logo design, geometric grids &amp; brand manuals</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Adobe Illustrator, Photoshop &amp; Behance portfolio</span>
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
                  href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hello%20Mentor%20Arena,%20I%20would%20like%20to%20enroll%20in%20the%20Logo%20%26%20Graphic%20Designing%20Course%20in%20${citySuffix}%20(PKR%206,000/mo).`}
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

            {/* Lead Mentor Profile */}
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
                "Great design is not subjective decoration—it is visual logic, optical hierarchy, and mathematical discipline. When you master geometric grids and brand identity systems, you stop competing with amateur freelancers."
              </p>
              <button 
                onClick={() => navigateTo('/about')}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full Mentor Profile</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Nationwide City Badges */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                <MapPin size={16} className="text-purple-600" />
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
            onOpenSyllabusModal={() => onOpenSyllabusMagnet ? onOpenSyllabusMagnet('Logo & Graphic Designing (Illustrator, Photoshop)') : null}
            courseTrackName="Logo & Graphic Designing (Illustrator, Photoshop)"
          />
        </div>
      </div>
    </div>
  );
};
