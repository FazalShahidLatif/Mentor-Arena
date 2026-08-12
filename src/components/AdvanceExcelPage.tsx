import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileSpreadsheet, 
  Database, 
  TrendingUp, 
  BarChart3, 
  Layers, 
  Zap, 
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
  Sparkles,
  Award,
  PhoneCall,
  Check
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';

interface AdvanceExcelPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const AdvanceExcelPage: React.FC<AdvanceExcelPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity 
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const modules = [
    {
      week: "Weeks 1–2",
      title: "Advanced Formula Architecture & Dynamic Arrays",
      focus: "From Basic VLOOKUP to Modern Array Engines",
      topics: [
        "Dynamic Array formulas: XLOOKUP, FILTER, UNIQUE, SORT, SORTBY, SEQUENCE, RANDARRAY",
        "Mastering nested logic: LET and LAMBDA custom user-defined formula functions",
        "Advanced two-way lookups: INDEX & MATCH with multi-criteria condition matching",
        "Text and Date manipulation: TEXTSPLIT, TEXTJOIN, DATEDIF, NETWORKDAYS, EDATE",
        "Error handling, formula auditing, trace precedents/dependents, and calculation speed optimization"
      ],
      milestone: "Construct an Automated Dynamic Search & Multi-Criteria Filtering Engine"
    },
    {
      week: "Weeks 3–5",
      title: "Power Query ETL (Extract, Transform, Load) & Data Cleanliness",
      focus: "Zero-Code Automation of Messy Raw Data",
      topics: [
        "Connecting to external data sources: Multiple Excel sheets, CSV, Web APIs, SQL tables, Folders",
        "Data transformation: Unpivoting columns, splitting delimiters, merging queries, appending tables",
        "Custom Column logic, conditional columns, and date dimension tables",
        "Introduction to Power Query M-Code syntax and query parameterization",
        "Setting up one-click automated refresh pipelines for recurring monthly/weekly business imports"
      ],
      milestone: "A 100% Automated Multi-Branch Sales & Inventory Consolidation Pipeline"
    },
    {
      week: "Weeks 6–8",
      title: "Power Pivot, Data Modeling & DAX Formulas",
      focus: "Handling 1,000,000+ Rows Without Excel Freezing",
      topics: [
        "Relational Data Modeling: Creating Star Schema relationships (1-to-Many, Fact vs. Dimension tables)",
        "Introduction to DAX (Data Analysis Expressions): CALCULATE, RELATED, RELATEDTABLE, ALL, FILTER",
        "Creating explicit DAX measures vs. calculated columns for optimal memory performance",
        "Time Intelligence functions in DAX: YTD, MTD, QTD, SAMEPERIODLASTYEAR, Rolling 12-Month Averages",
        "Hierarchies, KPI status flags, and custom sorting configuration"
      ],
      milestone: "Enterprise-Grade Multi-Table Data Model with Custom DAX Metrics"
    },
    {
      week: "Weeks 9–11",
      title: "Executive Interactive Dashboards & Data Storytelling",
      focus: "C-Suite Presentation & Visual Decision Systems",
      topics: [
        "Advanced Pivot Tables, Pivot Charts, Slicers, and interactive Timelines connected to Data Models",
        "Executive Dashboard Layout design: Visual hierarchy, clean color psychology, and zero-clutter grids",
        "Conditional formatting rules, dynamic KPI cards, sparklines, and progress gauges",
        "Dynamic chart switching using form controls, slicers, and dynamic ranges",
        "Protecting workbooks, locking formulas, and preparing executive-ready PDF exports"
      ],
      milestone: "An Interactive C-Suite Financial & Operations KPI Dashboard"
    },
    {
      week: "Weeks 12–14",
      title: "Financial Modeling (3-Statement & DCF) & VBA Automation",
      focus: "Commercial Valuation & Macro Scripting",
      topics: [
        "Building Integrated 3-Statement Financial Models: Income Statement, Balance Sheet, and Cash Flow",
        "Discounted Cash Flow (DCF) valuation, WACC calculation, Sensitivity Tables, and Scenario Manager",
        "Loan amortization schedules, CapEx depreciation modeling, and working capital forecasts",
        "Introduction to VBA & Macro Recorder: Writing automated macros for repetitive report formatting",
        "Building user forms, automated email triggers via Outlook, and custom automation buttons"
      ],
      milestone: "Complete Integrated 3-Statement Financial Valuation Model + Shipped Portfolio"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-emerald-500/20 selection:text-emerald-900" id="advance-excel-course-view">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="hover:text-emerald-700 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-500">Courses</span>
          <span>/</span>
          <span className="text-emerald-700">Advance Excel</span>
        </nav>

        {/* Hero Section with High-Intent SERP Keywords */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-full border border-emerald-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              150 Live Hours · 1-to-1 Mentorship
            </span>
            <span className="px-3.5 py-1 text-xs font-bold text-blue-800 bg-blue-50 rounded-full border border-blue-200 uppercase tracking-wider font-mono">
              2026 Professional Cohort ({citySuffix})
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
            Advance Excel &amp; Financial Modeling Masterclass in <span className="text-emerald-700">{citySuffix}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl font-normal mb-8">
            Transform from a casual spreadsheet user into a high-earning financial modeler and data automation consultant. Learn modern Dynamic Arrays, Power Query ETL pipelines, Power Pivot DAX modeling, interactive C-Suite KPI dashboards, and 3-statement financial valuation from 30+ year veteran mentor <strong>Fazal Shahid Latif</strong>. Strictly limited to <strong>max 6 students per cohort</strong> for direct screen-by-screen code review.
          </p>

          {/* Value Props Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <div className="text-2xl font-black text-gray-950">14 Weeks</div>
              <div className="text-xs text-gray-500 font-medium">150 Live Practical Hours</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <div className="text-2xl font-black text-emerald-700">PKR 6,000</div>
              <div className="text-xs text-gray-500 font-medium">Monthly Installment Plan</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <div className="text-2xl font-black text-gray-950">1-to-1</div>
              <div className="text-xs text-gray-500 font-medium">Max 6 Students / Cohort</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <div className="text-2xl font-black text-blue-700">Live Project</div>
              <div className="text-xs text-gray-500 font-medium">C-Suite Model &amp; Dashboard</div>
            </div>
          </div>

          {/* High-Converting SERP Commercial & Transitional CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <button 
              onClick={onBookCall}
              className="px-8 py-4 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all text-center shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Enroll in Next Batch (PKR 6,000/mo)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={onBookCall}
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-brand-blue" />
              <span>Book Free 15-Min Clarity Call</span>
            </button>

            <a 
              href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(`Hi Mentor Arena, I am interested in enrolling in the Advance Excel & Financial Modeling course in ${citySuffix}. Please share the batch start date.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>WhatsApp Fazal Shahid Latif</span>
            </a>
          </div>
        </div>

        {/* Why This Course Outperforms Conventional Generic Bootcamps */}
        <section className="my-16 p-8 md:p-12 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full uppercase tracking-wider">
              The Real-World Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-4 tracking-tight">
              Stop Copying Syntax. Start Architecting Enterprise Financial Engines.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Most local computer centers teach Excel like it’s 2005—forcing you to memorize obsolete functions like standard VLOOKUP without handling errors, manual copying of monthly sheets, or sluggish unlinked tables. At <strong>Mentor Arena</strong>, we teach modern, enterprise-grade business analytics used by top investment banking teams, corporate audit houses, and international remote consultants on Upwork.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <FileSpreadsheet className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">Modern Dynamic Arrays</h3>
                <p className="text-xs text-slate-300">Replace 50-step lookup formulas with clean single-cell formulas using XLOOKUP, FILTER, LET, and custom LAMBDAs.</p>
              </div>
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Database className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">Power Query Automation</h3>
                <p className="text-xs text-slate-300">Automate recurring data imports. Transform 500k rows across multiple branches in seconds with 1-click refresh.</p>
              </div>
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <BarChart3 className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">Interactive KPI Dashboards</h3>
                <p className="text-xs text-slate-300">Design stunning, high-contrast C-level reports that answer executive business questions at a glance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed 14-Week Module Accordion */}
        <section className="my-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                In-Depth Syllabus
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 mt-3 tracking-tight">
                14-Week Modular Deep Dive (150 Live Hours)
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              Every single module combines live screen-sharing instruction, real datasets from Pakistani and multinational firms, and weekly 1-to-1 milestone reviews.
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((mod, idx) => {
              const isOpen = openModuleIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-emerald-500 bg-emerald-50/20 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-bold px-3 py-1.5 bg-emerald-700 text-white rounded-xl shrink-0">
                        {mod.week}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-950">{mod.title}</h3>
                        <p className="text-xs text-emerald-800 font-medium">{mod.focus}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180 text-emerald-700' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-emerald-100 bg-white/70 space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">Core Concepts Mastered:</h4>
                        <ul className="space-y-2">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center gap-3">
                        <Award className="w-5 h-5 text-emerald-700 shrink-0" />
                        <div className="text-xs text-emerald-950 font-semibold">
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

        {/* Shipped Deliverable Card */}
        <section className="my-16 p-8 bg-slate-50 rounded-3xl border border-gray-200">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
              Tangible Portfolio Deliverable
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-950 mt-3 mb-3">
              What You Will Build &amp; Own Upon Graduation
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              You will not leave with just a paper certificate. You will leave with a verified, functional portfolio containing:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Integrated 3-Statement Financial Model</h4>
                  <p className="text-xs text-gray-600">Dynamic P&amp;L, Balance Sheet &amp; Cash Flow linked to live assumption controls.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Power Query ETL Automation Pipeline</h4>
                  <p className="text-xs text-gray-600">Multi-source automated data cleaning pipeline with zero-code refresh.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Interactive C-Suite KPI Dashboard</h4>
                  <p className="text-xs text-gray-600">Custom DAX metrics, dynamic slicers, revenue heatmaps, and executive charts.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Upwork &amp; LinkedIn Freelance Profile</h4>
                  <p className="text-xs text-gray-600">High-ticket financial consulting proposal templates and client audit playbooks.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Official Payment Gateways */}
        <section className="my-16 p-8 md:p-12 bg-white rounded-3xl border-2 border-emerald-600 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                100% Transparent Fee
              </span>
              <h2 className="text-3xl font-black text-gray-950 mt-3 mb-2 tracking-tight">
                Enrollment &amp; Pricing Structure
              </h2>
              <div className="flex items-baseline gap-2 my-4">
                <span className="text-5xl font-black text-emerald-700">PKR 6,000</span>
                <span className="text-gray-500 font-semibold text-sm">/ month (14 Weeks)</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Distributed into easy monthly installments. No hidden administrative charges. Includes 150 hours of live instruction, 1-to-1 weekly screen code reviews, project assets, and lifelong WhatsApp group support.
              </p>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Full Refund Exemption after first live orientation session</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Live sessions recorded and shared with your batch privately</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp access to lead mentor Fazal Shahid Latif</span>
                </div>
              </div>
            </div>

            {/* Payment Box */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-bold text-gray-950 text-sm flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-700" />
                Official Verified Gateways
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
                  className="w-full py-3.5 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-all text-center text-sm shadow-md"
                >
                  Confirm Registration Online
                </button>
                <p className="text-[11px] text-center text-gray-500 italic">
                  After payment, send receipt screenshot on WhatsApp to <strong>0332 2137898</strong> for immediate activation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="my-16">
          <h2 className="text-3xl font-black text-gray-950 mb-8 tracking-tight">
            Frequently Asked Questions — Advance Excel Track
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">Do I need prior coding or accounting knowledge?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                No. We start from intermediate Excel navigation and methodically build up your logic. Because sessions are 1-to-1 or max 6 students, your mentor customizes every concept to your exact background.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">What version of Microsoft Excel is required?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Microsoft 365 or Excel 2021+ is recommended so you can utilize Dynamic Array functions (XLOOKUP, FILTER, LET) and Power Query without version limitations.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">How will this help my freelancing career?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Clients in the US, UK, and GCC pay $30–$80/hour on Upwork for custom financial models, automated inventory sheets, and C-suite KPI dashboards. We guide you through bidding on live projects.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">Can I join if I am from Lahore, Islamabad, or overseas?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Yes! All sessions run live via interactive Google Meet screen-sharing with crystal-clear audio, recorded replays, and flexible evening/weekend timing.
              </p>
            </div>
          </div>
        </section>

        {/* Final Conversion Callout */}
        <div className="text-center pt-8 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-black text-gray-950 mb-3">
            Ready to Master Advance Excel &amp; Financial Modeling?
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto mb-8">
            Book your free 15-minute diagnostic call with Fazal Shahid Latif today to evaluate your current spreadsheet skills and secure your cohort slot.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onBookCall}
              className="px-8 py-4 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all text-sm shadow-lg shadow-emerald-700/20"
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
