import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Receipt, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  CreditCard, 
  Wallet, 
  ArrowRight, 
  PhoneCall, 
  Zap, 
  Award, 
  ChevronDown, 
  Check, 
  Sparkles,
  DollarSign,
  Globe
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';

interface ComputerizedAccountingPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const ComputerizedAccountingPage: React.FC<ComputerizedAccountingPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity 
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const modules = [
    {
      week: "Weeks 1–2",
      title: "Core Accounting Framework & Chart of Accounts Architecture",
      focus: "Setting Up Multi-Entity Accounting Systems from Scratch",
      topics: [
        "Double-entry bookkeeping review: Debit & Credit logic, General Journal, and General Ledger",
        "Designing an optimized Chart of Accounts (COA) tailored for Trading, Manufacturing, and Service firms",
        "Company setup parameters: Fiscal years, tax IDs, multi-currency conversion, and cost centers",
        "Opening balance migrations, inventory valuation rules (FIFO vs. Weighted Average), and debtor ledgers",
        "Internal controls, audit trails, and financial segregation of duties"
      ],
      milestone: "Configure a Fully Audited Chart of Accounts & Company Master Profile"
    },
    {
      week: "Weeks 3–6",
      title: "QuickBooks Online & Desktop Professional Mastery",
      focus: "The Industry Standard for Global Corporate Bookkeeping",
      topics: [
        "QuickBooks Online ecosystem navigation, company preferences, and user permission hierarchies",
        "Managing the Sales Cycle: Customer management, estimates, sales orders, invoicing, and receiving payments",
        "Managing the Purchase Cycle: Vendors, purchase orders, bill creation, bill payments, and expense categorization",
        "Automated Bank Feeds: Connecting bank statements, rules-based categorization, and zero-difference Bank Reconciliation",
        "Inventory tracking, assembly items, purchase discounts, credit memos, and write-offs"
      ],
      milestone: "Complete 1-Year Multi-Currency Commercial Ledger Audit in QuickBooks Online"
    },
    {
      week: "Weeks 7–9",
      title: "Xero Cloud Accounting & Modern SaaS Bookkeeping",
      focus: "UK, Australian & US Cloud Accounting Standards",
      topics: [
        "Xero dashboard, organization settings, financial settings, and chart of accounts mapping",
        "Bank feeds and smart matching algorithms: Setting up bank rules, transfers, and batch reconciliations",
        "Invoicing workflows: Repeating invoices, online payment gateway integrations (Stripe/PayPal), and customer reminders",
        "Bills, purchase orders, expense claims, and fixed asset register tracking with depreciation schedules",
        "Tracking categories: Departmental P&L reporting and project profitability tracking"
      ],
      milestone: "End-to-End Xero Setup for an International Remote Agency with Automated Reconciliations"
    },
    {
      week: "Weeks 10–11",
      title: "Tally Prime & Zoho Books for Local & Regional Enterprises",
      focus: "Middle East & South Asian Corporate Enterprise Workflows",
      topics: [
        "Tally Prime installation, company creation, voucher entry (Payment, Receipt, Journal, Contra, Sales, Purchase)",
        "GST / VAT configuration, e-invoicing compliance, and statutory report generation",
        "Zoho Books cloud ecosystem: Multi-currency handling, client portal setup, and vendor automation",
        "Payroll processing basics: Salary structures, allowances, deductions, and pay slip generation",
        "Inventory batch tracking, manufacturing cost sheets, and bill of materials (BOM)"
      ],
      milestone: "Dual Implementation: Tally Prime Manufacturing Books + Zoho Books Cloud System"
    },
    {
      week: "Weeks 12–14",
      title: "Tax Compliance, Financial Reporting & International Freelancing",
      focus: "P&L, Balance Sheet, Tax Audits & High-Ticket Remote Clients",
      topics: [
        "Generating & interpreting 3 Core Financial Statements: Profit & Loss Statement, Balance Sheet, and Statement of Cash Flows",
        "Sales Tax, Withholding Tax (WHT) calculations, and tax ledger reconciliations for Pakistan (FBR/SRB/PRA) and international jurisdictions",
        "Month-end and Year-end closing procedures: Accruals, prepayments, bad debt provisions, and depreciation adjustments",
        "International freelance bookkeeping strategy: Setting up Upwork & Fiverr profiles, bidding on US/UK/Gulf accounting contracts",
        "Conducting pre-audit assessments and delivering executive financial health summaries to business owners"
      ],
      milestone: "Complete Financial Audit Report (P&L + Balance Sheet) & Live Freelance Client Proposal"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-blue-600/10 selection:text-blue-900" id="accounting-course-view">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="hover:text-blue-700 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-500">Courses</span>
          <span>/</span>
          <span className="text-blue-700">Computerized Accounting</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3.5 py-1 text-xs font-bold text-blue-900 bg-blue-50 rounded-full border border-blue-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              150 Live Hours · 1-to-1 Practical Training
            </span>
            <span className="px-3.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-full border border-emerald-200 uppercase tracking-wider font-mono">
              QuickBooks · Xero · Tally · Zoho ({citySuffix})
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
            Computerized Accounting &amp; ERP Masterclass in <span className="text-blue-700">{citySuffix}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl font-normal mb-8">
            Master the top enterprise accounting software that powers local Pakistani corporations and international US/UK remote bookkeeping clients. Learn hands-on <strong>QuickBooks Online &amp; Desktop, Xero, Tally Prime, Zoho Books, Automated Bank Feeds, Tax Compliance, and Financial Statement Auditing</strong> under senior veteran mentor <strong>Fazal Shahid Latif</strong> (30+ years in commercial systems). Max 6 students per cohort.
          </p>

          {/* Quick Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <div className="text-2xl font-black text-gray-950">4 Softwares</div>
              <div className="text-xs text-gray-500 font-medium">QuickBooks, Xero, Tally, Zoho</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <div className="text-2xl font-black text-blue-700">PKR 6,000</div>
              <div className="text-xs text-gray-500 font-medium">Monthly Installment Fee</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <div className="text-2xl font-black text-gray-950">14 Weeks</div>
              <div className="text-xs text-gray-500 font-medium">150 Live Practice Hours</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
              <div className="text-2xl font-black text-emerald-700">Audit Project</div>
              <div className="text-xs text-gray-500 font-medium">Real Multi-Company Books</div>
            </div>
          </div>

          {/* Commercial & Transitional CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <button 
              onClick={onBookCall}
              className="px-8 py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-all text-center shadow-lg shadow-blue-700/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Enroll in Next Batch (PKR 6,000/mo)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={onBookCall}
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-brand-blue" />
              <span>Book Free Diagnostic Clarity Call</span>
            </button>

            <a 
              href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(`Hi Mentor Arena, I would like to register for the Computerized Accounting course (QuickBooks/Xero) in ${citySuffix}. Please share the batch timings.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>WhatsApp Fazal Shahid Latif</span>
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="my-16 p-8 md:p-12 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full uppercase tracking-wider">
              Industrial Grade Curriculum
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-4 tracking-tight">
              Real Corporate Books. Zero Textbook Simulation.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Generic institutes make you write manual journal entries in notebooks for months. At <strong>Mentor Arena</strong>, we log you directly into real cloud software used by companies across Karachi, Lahore, Islamabad, Dubai, London, and New York. You reconcile real bank statements, manage complex inventory batches, generate automated P&amp;L reports, and file tax summaries.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Receipt className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">QuickBooks &amp; Xero Core</h3>
                <p className="text-xs text-slate-300">Master automated feeds, recurring invoices, vendor bills, and multi-currency reconciliations without balance mismatches.</p>
              </div>
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Building2 className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">Tally Prime &amp; Zoho Books</h3>
                <p className="text-xs text-slate-300">Set up manufacturing cost sheets, inventory bill of materials, VAT/sales tax registers, and corporate payroll ledgers.</p>
              </div>
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Globe className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-bold text-white text-base mb-1">High-Ticket Freelancing</h3>
                <p className="text-xs text-slate-300">Step-by-step guidance on winning remote bookkeeping clients on Upwork ($25-$60/hr) and managing overseas accounts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 14-Week Module Accordion */}
        <section className="my-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                14-Week Syllabus
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 mt-3 tracking-tight">
                Computerized Accounting Module Breakdown
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              150 hours of live screen-sharing instruction, ledger audits, case studies, and 1-on-1 weekly mentor inspection.
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((mod, idx) => {
              const isOpen = openModuleIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-blue-600 bg-blue-50/20 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-bold px-3 py-1.5 bg-blue-700 text-white rounded-xl shrink-0">
                        {mod.week}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-950">{mod.title}</h3>
                        <p className="text-xs text-blue-800 font-medium">{mod.focus}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180 text-blue-700' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-blue-100 bg-white/70 space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">Core Concepts Mastered:</h4>
                        <ul className="space-y-2">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200/80 flex items-center gap-3">
                        <Award className="w-5 h-5 text-blue-700 shrink-0" />
                        <div className="text-xs text-blue-950 font-semibold">
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

        {/* Portfolio Outcomes */}
        <section className="my-16 p-8 bg-slate-50 rounded-3xl border border-gray-200">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-100 text-blue-800 rounded-full uppercase tracking-wider">
              Graduation Portfolio
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-950 mt-3 mb-3">
              Audited Case Studies You Will Complete
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              When you apply for corporate finance roles or freelance bookkeeping jobs, you will present real, verified ledger files:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Complete QuickBooks Online Company File</h4>
                  <p className="text-xs text-gray-600">Reconciled bank statements, customer invoices, vendor bills, and payroll.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Xero Multi-Currency Setup</h4>
                  <p className="text-xs text-gray-600">Automated bank rules, Stripe payment sync, and departmental P&amp;L tracking.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Audited Financial Statements (P&amp;L &amp; Balance Sheet)</h4>
                  <p className="text-xs text-gray-600">Closing adjustments, depreciation schedules, and tax ledger reconciliations.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Upwork &amp; Remote Bookkeeper Launchpad</h4>
                  <p className="text-xs text-gray-600">Optimized profile, client proposal frameworks, and accounting intake questionnaires.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Verified Payment Gateways */}
        <section className="my-16 p-8 md:p-12 bg-white rounded-3xl border-2 border-blue-600 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Transparent Fee Structure
              </span>
              <h2 className="text-3xl font-black text-gray-950 mt-3 mb-2 tracking-tight">
                Computerized Accounting Tuition
              </h2>
              <div className="flex items-baseline gap-2 my-4">
                <span className="text-5xl font-black text-blue-700">PKR 6,000</span>
                <span className="text-gray-500 font-semibold text-sm">/ month (14 Weeks)</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Distributed into affordable monthly installments. Includes 150 hours of live mentor-led screen sharing, practice accounting datasets, certificate of completion, and direct WhatsApp mentorship.
              </p>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>100% Risk-Free 1st Class Full Refund Exemption</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Max 6 students per cohort for screen-by-screen auditing</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Flexible afternoon and evening slots for working professionals</span>
                </div>
              </div>
            </div>

            {/* Payment Box */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-bold text-gray-950 text-sm flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-700" />
                Official Verified Gateways
              </h3>
              <p className="text-xs text-gray-600">
                Tuition fee of <strong>PKR 6,000</strong> is payable directly to lead mentor Fazal Shahid Latif:
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
                  className="w-full py-3.5 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-all text-center text-sm shadow-md"
                >
                  Confirm Accounting Registration
                </button>
                <p className="text-[11px] text-center text-gray-500 italic">
                  Instant confirmation via WhatsApp: <strong>0332 2137898</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="my-16">
          <h2 className="text-3xl font-black text-gray-950 mb-8 tracking-tight">
            Frequently Asked Questions — Computerized Accounting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">Do I need an Commerce / B.Com / ACCA background?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                While basic commerce knowledge is helpful, we cover double-entry foundations from day one. Anyone willing to practice ledger rules can master these software tools.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">Do you provide software access / demo companies?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Yes! We guide you on setting up free QuickBooks Online Accountant trial accounts, Xero demo sandbox environments, and desktop software setups.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">How much do freelance bookkeepers earn?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Entry-level remote bookkeepers earn $15–$25/hr on Upwork. Experienced QuickBooks ProAdvisors and Xero certified consultants charge $40–$75/hr for monthly reconciliation retainers.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-950 text-base mb-2">Can I attend if I am working full-time?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Yes. We run evening mentorship batches (8 PM – 12 AM PKT) and weekend slots specifically for working professionals and university students.
              </p>
            </div>
          </div>
        </section>

        {/* Final Conversion Action */}
        <div className="text-center pt-8 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-black text-gray-950 mb-3">
            Start Your Professional Accounting Career Today
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto mb-8">
            Speak directly with Fazal Shahid Latif to align on batch schedule, software prerequisites, and career goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onBookCall}
              className="px-8 py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-all text-sm shadow-lg shadow-blue-700/20"
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
