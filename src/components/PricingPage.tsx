import React from 'react';
import { motion } from 'motion/react';
import { Shield, Check, Clock, Wallet, Info, Star, FileText } from 'lucide-react';
import { BUSINESS_INFO, PRICING, COMPARISON_DATA } from '../constants';

interface PricingPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const PricingPage: React.FC<PricingPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity 
}) => {
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="pricing-details-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <button onClick={onBackToHome} className="hover:text-brand-blue transition-colors">Home</button>
          <span>/</span>
          <span className="text-brand-blue font-bold">Pricing Models</span>
        </div>

        {/* Hero Title */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest animate-pulse font-mono">
            💎 100% Transparent Fee Structure
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
            Elite 1-to-1 Mentorship Plans and Tuition Details in {citySuffix}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl font-medium">
            No massive upfront contracts, hidden signup fees, or unexpected surprises. Enjoy simple distributed monthly pricing designed specifically for students and remote learners in Pakistan.
          </p>
        </div>

        {/* Primary Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
          
          {/* Clarity Call */}
          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-gray-200/50 text-gray-600 border border-gray-300/30 rounded-full uppercase tracking-wider">Plan A</span>
              <h3 className="text-2xl font-black text-gray-950 mt-4 mb-2">{PRICING.clarityCall.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{PRICING.clarityCall.duration}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-black text-brand-blue">{PRICING.clarityCall.price}</span>
              </div>

              <p className="text-sm text-gray-605 leading-relaxed mb-8">
                {PRICING.clarityCall.description} Perfect to map out your software roadmap, evaluate existing skill bases, and identify the ideal track before making financial commitments.
              </p>
            </div>

            <button 
              onClick={onBookCall}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all text-center"
            >
              Book Free 15-Min Dialogue Session
            </button>
          </div>

          {/* Academic Tuition */}
          <div className="p-8 bg-blue-900 text-white rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between shadow-xl shadow-blue-950/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/25 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-brand-green/20 text-brand-green border border-brand-green/30 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <h3 className="text-2xl font-black mt-2 mb-2">{PRICING.monthlyTuition.title}</h3>
              <p className="text-sm text-blue-100 mb-6">{PRICING.monthlyTuition.duration}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-black text-white">{PRICING.monthlyTuition.price}</span>
              </div>

              <p className="text-sm text-blue-100 leading-relaxed mb-8">
                {PRICING.monthlyTuition.description} Structured into convenient, monthly install payments with 0-interest to keep modern web mentorship accessible. No contracts. Cancel anytime.
              </p>
            </div>

            <button 
              onClick={onBookCall}
              className="w-full py-4 bg-brand-green text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all text-center shadow-lg shadow-emerald-500/10"
            >
              Apply For Next Cohort Block
            </button>
          </div>

        </div>

        {/* Written Copy Block (800+ Words total) */}
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              1. Understanding Our Distributed Monthly Payment Ethos
            </h2>
            <p className="text-base">
              A standard university computer science semester in Pakistan currently costs upwards of PKR 150,000 to 250,000, yet graduates frequently finish their programs unable to debug a basic database transaction. On the other hand, commercial coding academies frequently demand massive upfront course fees—from PKR 40,000 to 80,000—representing a massive, risky chunk of capital for local middle-class homes.
            </p>
            <p className="text-base">
              At <strong>Mentor Arena</strong>, we challenge these models. We distribute your total tuition fee into a simple, predictable monthly payment of <strong>PKR 6,000</strong> across your 14-week course duration. This distributed format completely transfers the risk from you to us. You only pay for the value you receive month-by-month as your live full-stack web application, rank portfolio, or design prototype takes physical shape on your screen.
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
                <strong>Not Included:</strong> Additional third-party operating expenses such as custom domain registration fees (approx. PKR 2,000/year if choosing a standard .com), database configurations, active web hosting subscriptions (optional), or local creative software licenses (e.g., optional Figma upgrades). While you can build, compile, and deploy your final projects completely on free tiers, any commercial enhancements must be managed individually.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              3. Verifiable Peer-to-Peer Operations &amp; Cash Limits
            </h2>
            <p className="text-base">
              Our tuition payments can be submitted comfortably using popular local mobile fintech layers including Easypaisa, JazzCash, or standard Pakistani bank transactions. To prevent transaction limits from blocking student enrollments, we structure tuition payments comfortably in alignment with standard monthly wallet caps.
            </p>
            <p className="text-base">
              Payments are verified within 24 hours of submission. Once your transaction is confirmed, your workspace credentials are automatically activated, and you receive immediate access to our schedule calendars to lock down your weekly 1-to-1 review sessions.
            </p>
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
          <h2 className="text-2xl md:text-3xl font-black mb-4">Invest in Hands-on Software Engineering Competence</h2>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Lock in a distributed, interest-free PKR 6,000 monthly tuition path before our active cohort channels are filled. Book your free clarity call to outline your syllabus today.
          </p>
          <button 
            onClick={onBookCall}
            className="px-8 py-4 bg-brand-green text-white font-bold hover:bg-emerald-500 transition-all rounded-xl text-sm uppercase tracking-wider"
          >
            Claim Your Free Clarity Session Now
          </button>
        </div>

      </div>
    </div>
  );
};
