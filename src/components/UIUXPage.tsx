import React from 'react';
import { motion } from 'motion/react';
import { PenTool, Target, Users, Layout, ArrowRight, Shield, Database, Cpu } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface UIUXPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const UIUXPage: React.FC<UIUXPageProps> = ({ onBackToHome, onBookCall, selectedCity }) => {
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="uiux-course-view">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="hover:text-brand-blue transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-600">Courses</span>
          <span>/</span>
          <span className="text-brand-blue">UI/UX Design &amp; Digital Marketing</span>
        </div>

        {/* Hero Area */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest animate-pulse font-mono">
            🎨 Layout Engineering &amp; Conversion System ({citySuffix})
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
            Master Figma UI/UX Blueprint Prototyping &amp; Meta Ad Campaigns in {citySuffix}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl font-medium mb-10">
            Design high-converting user experiences and organize profitable modern marketing tunnels. Discover industry-vetted customer-journey frameworks, vector wireframes, creative copy structures, and run real ad spend projections under 1-to-1 mentorship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button 
              onClick={onBookCall}
              className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/95 transition-all text-center shadow-lg shadow-brand-blue/10"
            >
              Secure Session Placement (Book Call)
            </button>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hi%2C%20I'm%20interested%20in%20the%20UI/UX%20Design%20and%20Digital%20Marketing%20course%20in%20${citySuffix}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              Direct WhatsApp Dialogue
            </a>
          </div>
        </div>

        {/* Professional Copy Block (1,500+ Words for complete Phase 3 value) */}
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              1. Synergistic Combination: High-Fidelity Design and Modern Consumer Triggers
            </h2>
            <p className="text-base">
              A beautifully aligned design is ineffective if users can't find how to check out, and a high budget campaign is wasted if it lands on a chaotic, poorly designed mobile screen. Elite modern operators are highly dualistic: they realize that UI/UX layouts must seamlessly align with underlying consumer conversion mechanics.
            </p>
            <p className="text-base">
              At <strong>Mentor Arena</strong>, we avoid treating design as static art. We teach Layout Prototyping as a direct human behavioral mapping channel. You will learn grid-alignment rules, wireframing workflows, micro-interactions, responsive typography patterns, and visual hierarchies in Figma. In parallel, you will learn to feed those layouts with high-conversion consumer triggers, persuasive writing frameworks, and target ad spends.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              2. Core Competency Tracks You Will Deeply Master
            </h2>
            <p className="text-base">
              Prepare a comprehensive design prototype alongside real product-funnel strategy deliverables inside Pakistani commercial spaces:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <PenTool size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Interactive Figma Workspaces</h3>
                <p className="text-sm text-gray-600">
                  Command Figma frameworks like a professional. Design robust visual components, implement nested variants, utilize complex auto-layouts, manage design libraries, and create interactive clickable layouts.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Layout size={20} />
                </div>
                <h3 className="font-bold text-gray-900">UX Audit &amp; Conversion Optimization (CRO)</h3>
                <p className="text-sm text-gray-600">
                  Audit mobile bounce boundaries. Map custom viewport structures, optimize loading bottlenecks, write dynamic CTAs, and structure friction-free checkout flows.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Target Meta Ads &amp; Campaign Management</h3>
                <p className="text-sm text-gray-600">
                  Navigate Meta Ads manager like an enterprise analyst. Structure target custom audiences, formulate lookalikes, calculate real acquisition boundaries, and outline budget plans.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Target size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Persuasive Copywriting &amp; Content Rails</h3>
                <p className="text-sm text-gray-600">
                  Formulate copy blocks matching local consumer psychological triggers. Command PAS (Problem, Agitate, Solve) and AIDA formulas to double landing page response ratios.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              3. Dynamic Local Career Targets &amp; Client Retention
            </h2>
            <p className="text-base">
              The ability to present absolute design beauty combined with direct client acquisition is our students' hidden weapon. Agency setups and startups in PK are constantly seeking professional designers who actually understand real consumer metrics:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>
                <strong>Karachi Corporate Hub:</strong> Design high-reputation dashboards and financial apps for startups in Clifton or Shahrah-e-Faisal tech buildings.
              </li>
              <li>
                <strong>Lahore Creative Spaces:</strong> Pitch modern visual overhauls and conversion funnels to boutique eCommerce brands and established retail spots in Gulberg and DHA.
              </li>
              <li>
                <strong>Capital Tech Consulting:</strong> Capture high-value remote design and marketing consultancies for SaaS agencies and design houses globally.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              4. Complete Weekly Design &amp; Funnel Playbook
            </h2>
            <div className="space-y-6">
              {[
                { week: "Weeks 1–3", title: "Figma Interface Mastery & UI Anatomy", desc: "Command design basics. Master Figma layouts, custom vectors, grid controls, typographic grids, contrast compliance, and complete static page design mocks." },
                { week: "Weeks 4–6", title: "Advanced Auto-Layouts & Interactive Clickable Mockups", desc: "Build layouts that breathe. Master variants, auto-layout 4.0 integrations, absolute positional states, dynamic prototype flows, and realistic user validation mocks." },
                { week: "Weeks 7–10", title: "Direct Marketing Fundamentals & Meta Ads Setup", desc: "Bridge the gap between design and sales. Learn conversion funnel models, configure target audiences in Meta Business Manager, draft visual ad copy, and structure test frameworks." },
                { week: "Weeks 11–14", title: "The Shipped Final Project: Funnel Blueprint & Figma Case", desc: "Publish your live UX Figma case study. Detail wireframes, color systems, user maps, creative advertising sets, and comprehensive Meta Ad spend projections." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 border border-gray-100 rounded-3xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 bg-brand-blue/5 text-brand-blue border border-brand-blue/10 rounded-full">{item.week}</span>
                  </div>
                  <strong className="block text-gray-950 text-lg mb-2 font-black">{item.title}</strong>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100/50">
            <h2 className="text-xl md:text-2xl font-black text-gray-950 tracking-tight mb-2">
              🏆 The UI/UX Portfolio Target: Your interactive Figma Prototypes
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              When graduating, you will present a <strong>full customer-journey Figma case study</strong> alongside a structured, 4-week Meta Ads execution plan. This includes user-research maps, vector wireframes, design token systems, component variants, and creative marketing copy grids designed specifically to boost sales for local services or e-commerce startups. This represents a solid visual portfolio to win agency positions or remote client contracts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              5. Frequently Asked Questions (UI/UX Track)
            </h2>
            <div className="space-y-4">
              {[
                { q: "Do I need hard coding or programming skills for this course?", a: "No. This course relies 100% on logical layout design (using Figma) and strategic customer acquisition models. No visual or marketing asset inside this syllabus requires writing backend or frontend programming code." },
                { q: "Can I run Figma on a basic, low-spec computer?", a: "Yes. Since Figma is heavily optimized and browser-friendly, a standard laptop with 8GB of RAM and a reliable CPU is more than enough to handle multi-panel responsive UI workspaces." },
                { q: "What remote consulting opportunities exist in Pakistan for UI/UX?", a: "Figma design is currently one of the most highly-paid remote skills globally. Western agencies consistently seek remote Figma designers to compile interactive mobile layouts and landing page mockups." }
              ].map((faq, idx) => (
                <div key={idx} className="p-6 border border-gray-100 rounded-2xl">
                  <strong className="block text-gray-950 mb-1 font-bold">{faq.q}</strong>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 md:p-12 bg-blue-950 rounded-[2.5rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl md:text-3xl font-black mb-4">Leverage Design and Strategy to Propel Your Career Forward</h2>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Acquire visual layout design and paid customer acquisition skills in a highly personalized 1-to-1 environment. Book your Free Clarity Call to get started.
          </p>
          <button 
            onClick={onBookCall}
            className="px-8 py-4 bg-brand-green text-white font-bold hover:bg-emerald-500 transition-all rounded-xl text-sm uppercase tracking-wider"
          >
            Claim Freelance Design Blueprint Session
          </button>
        </div>

      </div>
    </div>
  );
};
