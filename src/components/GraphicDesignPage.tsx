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
  Share2
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';
import { HeroBanner } from './HeroBanner';

interface GraphicDesignPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const GraphicDesignPage: React.FC<GraphicDesignPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity 
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

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
    { title: "Brand Identity Designer", salary: "PKR 90k - 180k / mo", type: "Agencies / Global Remote" },
    { title: "Freelance Logo Specialist", salary: "$300 - $1,500 / project", type: "Upwork & Direct Clients" },
    { title: "Senior Graphic Designer", salary: "PKR 120k - 220k / mo", type: "Corporate / Software Houses" },
    { title: "Social Media Creative Lead", salary: "PKR 80k - 150k / mo", type: "E-Commerce & Digital Marketing" }
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
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
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
        badge="1-to-1 Live Creative Mentorship · 14 Weeks (150 Hours)"
        title="Logo & Graphic Designing"
        highlightText="Master Brand Identity, Vector Marks & Adobe Suite"
        subtitle={`Transform creative concepts into high-paying corporate brand identities. Learn vector logo architecture, color psychology, and advertising creatives with 1-to-1 guidance in ${citySuffix}.`}
        primaryCtaText="Book Free Diagnostic Call"
        secondaryCtaText="Direct WhatsApp Admission"
        onPrimaryCta={onBookCall}
        onSecondaryCta={() => window.open(`https://wa.me/${BUSINESS_INFO.phone}?text=Hi%20Mentor%20Arena,%20I%20want%20to%20enroll%20in%20the%20Logo%20and%20Graphic%20Designing%20Course%20(PKR%206,000/mo).`, '_blank')}
        trustStats={[
          { label: "Mentorship Format", value: "Direct 1-to-1" },
          { label: "Live Hours", value: "150 Hours" },
          { label: "Tuition Fee", value: "PKR 6,000/mo" },
          { label: "Shipped Deliverable", value: "Brand Identity Kit" }
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
          <span className="text-brand-blue font-semibold">Logo &amp; Graphic Designing</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Syllabus & Learning Pillars */}
          <div className="lg:col-span-2 space-y-12">
            {/* Value Proposition Highlights */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <Palette className="text-brand-blue" size={28} />
                Why This 1-to-1 Graphic Design Program Delivers Real Results
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Most design institutes teach superficial software tools without explaining the mathematical geometry, color psychology, and commercial strategy required to create timeless brand marks. In this 14-week 1-to-1 mentorship, you work directly on real-world briefs, learning vector precision, typography systems, and print pre-press standards that command premium freelance retainers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <Shapes className="text-brand-blue shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Mathematical Vector Grids</h3>
                    <p className="text-xs text-gray-600 mt-1">Master Golden Ratio, geometric alignment, and optical balance for iconic brand marks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                  <Layout className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Complete Brand Guidelines</h3>
                    <p className="text-xs text-gray-600 mt-1">Learn to produce 20+ page corporate identity manuals with exact color and font specifications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50">
                  <ImageIcon className="text-purple-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Photoshop &amp; Social Creatives</h3>
                    <p className="text-xs text-gray-600 mt-1">Design high-CTR Facebook/Instagram ad creatives, realistic 3D product mockups, and banners.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                  <Briefcase className="text-amber-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Freelance Portfolio on Behance</h3>
                    <p className="text-xs text-gray-600 mt-1">Publish polished case studies and pitch international clients on Upwork with confidence.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Curriculum Accordion */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">14-Week Intensive Curriculum</h2>
                  <p className="text-sm text-gray-500 mt-1">Structured 150-hour hands-on progression from fundamentals to commercial branding.</p>
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
                <PenTool className="text-brand-blue" size={26} />
                Professional Software &amp; Toolchain Mastery
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

            {/* Career Opportunities & Freelance Potential */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <Briefcase className="text-brand-blue" size={26} />
                Career Trajectories &amp; Earning Potential
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
                <h3 className="text-2xl font-black text-gray-900">Logo &amp; Graphic Design</h3>
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
                  <span>Complete Adobe Illustrator &amp; Photoshop mastery</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                  <span>Published Behance brand identity case studies</span>
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
                  href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hello%20Mentor%20Arena,%20I%20would%20like%20to%20enroll%20in%20the%20Logo%20and%20Graphic%20Designing%20Course%20(PKR%206,000/mo).`}
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
                "Great design is not just ornamentation—it is visual problem-solving that creates immediate commercial trust. I will personally critique every vector curve and font pairing to make your portfolio stand out internationally."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
