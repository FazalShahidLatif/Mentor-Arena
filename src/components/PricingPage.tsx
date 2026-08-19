import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Check, 
  Clock, 
  Wallet, 
  Info, 
  Star, 
  FileText, 
  ArrowRight, 
  PhoneCall, 
  Zap, 
  CheckCircle2, 
  Terminal, 
  Globe, 
  Target, 
  FileSpreadsheet, 
  Calculator, 
  Bot,
  Award,
  CreditCard,
  Download
} from 'lucide-react';
import { BUSINESS_INFO, PRICING, COMPARISON_DATA } from '../constants';
import { HeroBanner } from './HeroBanner';
import { InvoiceReceiptModal } from './InvoiceReceiptModal';
import { InvoiceData } from '../utils/invoiceGenerator';

interface PricingPageProps {
  onBackToHome: () => void;
  onBookCall: (courseTrack?: string) => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const PricingPage: React.FC<PricingPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity 
}) => {
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<Partial<InvoiceData>>({
    courseTitle: '14-Week Full-Stack MERN Web Development',
    amount: 'PKR 6,000 / month'
  });

  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const handleOpenInvoice = (courseTitle: string = '14-Week Full-Stack MERN Web Development') => {
    setInvoiceData({
      courseTitle,
      amount: 'PKR 6,000 / month',
      paymentGateway: 'jazzcash'
    });
    setInvoiceModalOpen(true);
  };

  const trackIcons: Record<string, any> = {
    'web-dev': Terminal,
    'seo': Globe,
    'uiux': Target,
    'advance-excel': FileSpreadsheet,
    'computerized-accounting': Calculator,
    'generative-ai': Bot
  };

  return (
    <div className="bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="pricing-details-page">
      
      {/* Full Width Hero Banner */}
      <HeroBanner
        id="pricing-hero-banner"
        theme="emerald"
        badge={{
          text: `💎 100% Transparent Fee Structure (${citySuffix})`,
          icon: CreditCard
        }}
        breadcrumbs={[
          { label: 'Home', onClick: onBackToHome },
          { label: 'Tuition & Pricing' }
        ]}
        title={
          <>
            Simple, Accessible 1-to-1 Tuition Plans in <span className="text-emerald-400">{citySuffix}</span>
          </>
        }
        description={
          <>
            No massive upfront contracts, high registration fees, or hidden charges. Every track at <strong>Mentor Arena</strong> is structured into an accessible monthly installment of <strong>PKR 6,000</strong> across 14 weeks (150 live hours) with strictly 1-to-1 or max 6 students per cohort.
          </>
        }
        stats={[
          { label: 'Tuition', value: 'PKR 6,000', subtext: 'Per Month Flat' },
          { label: 'Clarity Call', value: 'PKR 0', subtext: '15-Min Free Session' },
          { label: 'Live Practice', value: '150 Hours', subtext: '14 Weeks Duration' },
          { label: 'Registration', value: 'PKR 0', subtext: 'Zero Hidden Fees' }
        ]}
        primaryCta={{
          text: 'Book Free 15-Min Diagnostic Call',
          onClick: () => onBookCall()
        }}
        secondaryCta={{
          text: 'WhatsApp Pricing Desk',
          whatsappMessage: `Hi Mentor Arena, I would like to inquire about course tuition and installment schedules in ${citySuffix}.`
        }}
        image={{
          src: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=1200',
          alt: `Affordable 1-to-1 IT and software engineering tuition plans in ${citySuffix} at PKR 6,000 monthly with Fazal Shahid Latif`,
          badgeText: 'Transparent PKR 6,000/mo Plan',
          badgeSubtext: '150 Live Hours · 1-to-1 Mentorship · No Hidden Fees'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Primary Pricing Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
          
          {/* Clarity Call */}
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 bg-gray-200 text-gray-700 rounded-full uppercase tracking-wider">
                  Diagnostic Session
                </span>
                <span className="text-xs text-gray-500 font-medium">100% Free</span>
              </div>
              <h3 className="text-2xl font-black text-gray-950 mt-2 mb-2">{PRICING.clarityCall.title}</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">{PRICING.clarityCall.duration}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-black text-brand-blue">{PRICING.clarityCall.price}</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                {PRICING.clarityCall.description} Map out your software roadmap, evaluate existing skill bases, and identify the ideal track before making any financial commitment.
              </p>

              <div className="space-y-2 mb-8 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1-on-1 dialogue with Fazal Shahid Latif</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Personalized skill &amp; track recommendation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero pressure, honest suitability audit</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onBookCall()}
              className="w-full py-4 bg-gray-950 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-brand-blue" />
              <span>Book Free 15-Min Clarity Call</span>
            </button>
          </div>

          {/* Academic Tuition */}
          <div className="p-8 bg-blue-900 text-white rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between shadow-xl shadow-blue-950/20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 bg-brand-green/20 text-brand-green border border-brand-green/30 rounded-full uppercase tracking-wider">
                  Flagship Mentorship
                </span>
                <span className="text-xs text-blue-200 font-medium">14-Week Cohort</span>
              </div>
              <h3 className="text-2xl font-black mt-2 mb-2">{PRICING.monthlyTuition.title}</h3>
              <p className="text-sm text-blue-100 mb-6 font-medium">{PRICING.monthlyTuition.duration}</p>
              
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{PRICING.monthlyTuition.price}</span>
              </div>

              <p className="text-sm text-blue-100 leading-relaxed mb-8">
                {PRICING.monthlyTuition.description} Pay monthly as you build your live portfolio. No contracts, zero interest, and full 1st class money-back exemption.
              </p>

              <div className="space-y-2 mb-8 text-xs text-blue-100 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>150 live hours of hands-on screen reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Strictly max 6 students per cohort</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Official JazzCash &amp; Zindigi Raast Gateways</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button 
                onClick={() => onBookCall()}
                className="w-full py-4 bg-brand-green text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all text-center shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll in Next Cohort (PKR 6,000/mo)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleOpenInvoice('14-Week Full-Stack MERN Web Development')}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all text-xs text-center flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Pro-Forma Invoice &amp; Receipt (PDF)</span>
              </button>
            </div>
          </div>

        </div>

        {/* All 6 Course Pricing Breakdown */}
        <section className="my-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-3 py-1 rounded-full border border-brand-blue/10">
              Complete Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-950 mt-3 tracking-tight">
              All 6 Specialized 1-to-1 Tracks &amp; Deliverables
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Every course follows the same transparent PKR 6,000/month installment plan and finishes with a live, verified portfolio deliverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRICING.plansByTrack.map((track) => {
              const IconComp = trackIcons[track.id] || Terminal;
              return (
                <div 
                  key={track.id}
                  className="p-6 bg-slate-50 hover:bg-white rounded-3xl border border-gray-200 hover:border-brand-blue/30 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-2xl bg-brand-blue/10 text-brand-blue">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-500 font-mono">
                        {track.duration}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      {track.category}
                    </span>

                    <h3 className="text-lg font-black text-gray-950 mt-2 mb-2">
                      {track.title}
                    </h3>

                    <div className="my-4 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-brand-blue">{track.monthlyFee}</span>
                      <span className="text-xs text-gray-500 font-medium">/ month</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-gray-200/80 mb-4">
                      <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Shipped Deliverable:
                      </div>
                      <p className="text-xs text-gray-700 font-medium leading-snug">
                        {track.shippedDeliverable}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => onBookCall(track.title)}
                      className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-all text-xs text-center cursor-pointer shadow-sm"
                    >
                      Book Free Clarity Call
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenInvoice(track.title)}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold transition-all text-xs text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Download {track.title.split(' ')[0]} Receipt / Invoice</span>
                    </button>
                    <a
                      href={track.slug}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, '', track.slug);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="text-xs text-center font-bold text-gray-600 hover:text-brand-blue transition-colors py-1"
                    >
                      View 14-Week Module Details →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Written Copy Block */}
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-8 my-16">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              1. Understanding Our Distributed Monthly Payment Ethos
            </h2>
            <p className="text-base">
              A standard university computer science or commerce semester in Pakistan currently costs upwards of PKR 150,000 to 250,000, yet graduates frequently finish their programs unable to debug a basic database transaction or reconcile a real corporate ledger. On the other hand, commercial coding academies frequently demand massive upfront course fees—from PKR 40,000 to 80,000—representing a massive, risky chunk of capital for local middle-class homes.
            </p>
            <p className="text-base">
              At <strong>Mentor Arena</strong>, we challenge these models. We distribute your total tuition fee into a simple, predictable monthly payment of <strong>PKR 6,000</strong> across your 14-week course duration. This distributed format completely transfers the risk from you to us. You only pay for the value you receive month-by-month as your live full-stack web application, rank portfolio, design prototype, Excel dashboard, accounting ledger, or AI agent takes physical shape on your screen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              2. What is Included (and Not Included) in Your Tuition Fee
            </h2>
            <p className="text-base">
              To avoid confusion, we maintain strict clarity on the boundaries of what your PKR 6,000 monthly distributed payment covers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>
                <strong>Included:</strong> 150 hours of interactive live reviews, direct code inspection, customized syllabus adjustments, Git pull-request feedback, weekly progress checks, and a lifetime membership in our peer developer network.
              </li>
              <li>
                <strong>Not Included:</strong> Additional third-party operating expenses such as custom domain registration fees (approx. PKR 2,000/year if choosing a standard .com), database configurations, active web hosting subscriptions (optional), or local creative software licenses. While you can build, compile, and deploy your final projects completely on free tiers, any commercial enhancements must be managed individually.
              </li>
            </ul>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue">
                <Wallet className="w-6 h-6" />
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                3. Official Payment Gateways (Local &amp; International Receiving)
              </h2>
            </div>
            
            <p className="text-base text-gray-700 leading-relaxed">
              To make tuition payments simple, secure, and instant, <strong>Mentor Arena</strong> (also recognized as <strong>Mentora</strong> / <strong>Mantor Academy</strong>) accepts local tuition installments and international student remittances via official digital gateways registered under lead mentor <strong>Fazal Shahid Latif</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* JazzCash Account */}
              <div className="p-6 bg-gradient-to-br from-red-50/70 via-white to-amber-50/40 rounded-3xl border border-red-200/80 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-red-600 text-white rounded-full uppercase tracking-wider">
                      Official Gateway
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Local &amp; Remittance</span>
                </div>
                <h3 className="text-xl font-bold text-gray-950 mb-1 flex items-center gap-2">
                  <span>JazzCash</span>
                </h3>
                <p className="text-xs text-gray-600 mb-4">Instant mobile wallet, JazzCash Till, and foreign remittance partner transfers.</p>
                
                <div className="space-y-2 bg-white/90 p-4 rounded-2xl border border-red-100 font-mono text-sm">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Account Number:</span>
                    <span className="font-bold text-gray-900 text-base">{BUSINESS_INFO.accountNumber}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Account Title:</span>
                    <span className="font-bold text-gray-900">{BUSINESS_INFO.accountHolder}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Gateway Type:</span>
                    <span className="text-red-700 font-semibold">JazzCash</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="text-[11px] text-gray-500 italic">
                    * Overseas students: Select JazzCash / Pakistan Remittance on Payoneer, Remitly, or Wise to transfer to 03322137898.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenInvoice('All 6 Mentorship Tracks')}
                    className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Get Receipt
                  </button>
                </div>
              </div>

              {/* Zindigi by JS Bank */}
              <div className="p-6 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 rounded-3xl border border-emerald-200/80 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-emerald-600 text-white rounded-full uppercase tracking-wider">
                      Digital Banking &amp; Raast
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Global Remittance</span>
                </div>
                <h3 className="text-xl font-bold text-gray-950 mb-1 flex items-center gap-2">
                  <span>Zindigi (by JS Bank)</span>
                </h3>
                <p className="text-xs text-gray-600 mb-4">Zero-fee Raast transfers, digital app wallet, and direct JS Bank international remittances.</p>
                
                <div className="space-y-2 bg-white/90 p-4 rounded-2xl border border-emerald-100 font-mono text-sm">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Account Number:</span>
                    <span className="font-bold text-gray-900 text-base">{BUSINESS_INFO.accountNumber}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Raast ID:</span>
                    <span className="font-bold text-emerald-800">{BUSINESS_INFO.accountNumber}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Account Title:</span>
                    <span className="font-bold text-gray-900">{BUSINESS_INFO.accountHolder}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="text-[11px] text-gray-500 italic">
                    * Supports instant 0-fee Raast transfers from any Pakistani banking app, plus worldwide wire remittances.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenInvoice('All 6 Mentorship Tracks')}
                    className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Get Receipt
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
              <Info className="w-5 h-5 shrink-0 text-brand-blue mt-0.5" />
              <div>
                <strong>Instant WhatsApp Verification:</strong> After transferring your monthly tuition of <strong>PKR 6,000</strong>, share your transaction receipt or screenshot directly on WhatsApp at <strong>+92 332 2137898</strong>. Your mentor dashboard credentials and calendar review slot will be activated within 2 hours.
              </div>
            </div>
          </section>

          {/* Comparison table */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              4. Mentor Arena vs. Saturated Alternatives
            </h2>
            <div className="overflow-hidden border border-gray-100 rounded-3xl pt-2">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-800 font-bold uppercase text-xs font-mono">
                  <tr>
                    <th className="p-4">Feature Metric</th>
                    <th className="p-4">Conventional Academies</th>
                    <th className="p-4 text-brand-blue bg-blue-50/50">Mentor Arena (1-on-1)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-600">
                  {COMPARISON_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-950">{item.feature}</td>
                      <td className="p-4">{item.conventional}</td>
                      <td className="p-4 text-gray-900 font-medium bg-blue-50/20">{item.mentorArena}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 md:p-12 bg-blue-950 rounded-[3rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl md:text-3xl font-black mb-4">Invest in Hands-on Digital Career Competence</h2>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Lock in a distributed, interest-free PKR 6,000 monthly tuition path before our active cohort channels are filled. Book your free clarity call to outline your syllabus today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onBookCall()}
              className="px-8 py-4 bg-brand-green text-white font-bold hover:bg-emerald-500 transition-all rounded-xl text-sm uppercase tracking-wider cursor-pointer"
            >
              Claim Your Free Clarity Session Now
            </button>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(`Hi Fazal Shahid Latif, I have a query about the PKR 6,000/mo tuition plans for Mentor Arena in ${citySuffix}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 text-white font-bold hover:bg-white/20 transition-all rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>WhatsApp Admission Desk</span>
            </a>
          </div>
        </div>

        {/* Invoice & Receipt Generator Modal */}
        <InvoiceReceiptModal
          isOpen={invoiceModalOpen}
          onClose={() => setInvoiceModalOpen(false)}
          initialData={invoiceData}
        />

      </div>
    </div>
  );
};
