import React, { useState } from 'react';
import { HelpCircle, ChevronRight, MessageSquare, ArrowRight, Shield, RefreshCw } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface FAQPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const FAQPage: React.FC<FAQPageProps> = ({ 
  onBackToHome, 
  onBookCall, 
  selectedCity 
}) => {
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const detailedFAQS = [
    {
      q: "1. What exactly makes Mentor Arena different from conventional software academies in Pakistan?",
      a: "The difference lies in our absolute rejection of mass-production, lecture-based learning. In traditional academies (like Aptech, arena multimedia, or university labs), a single instructor lectures to a room of 30 to 50 students, reading slide decks. Students copy-paste lines without grasping the underlying logic. At Mentor Arena, we restrict cohorts to a maximum of 6 students. Our interaction is completely 1-to-1: we directly check your Git repositories, examine your code patterns, debug database connection errors side-by-side, and challenge your analytical system-design decisions. You do not graduate with paper certificates; you graduate with an active full-stack web application, functioning database pipelines, or high-fidelity Figma prototypes deployed live on client-accessible test domains."
    },
    {
      q: "2. Why do you focus so heavily on the 1st Class Refund Exemption / Refund Policy?",
      a: "Trust is the fundamental currency of modern peer-to-peer mentoring. Many Pakistani students have previously experienced low-value online bootcamps and fear wasting their hard-earned money. To address this concern, we maintain an unyielding 1st Class Refund Exemption. If, during your first scheduled live feedback session with Fazal Shahid Latif, you decide that our coaching styles, custom curriculum depth, scheduling cadences, or direct support vectors do not perfectly match your ambitious expectations, simply trigger a request to hello@mentorarena.online or message our support manager within 24 hours. We will immediately process a 100% refund of your session tuition, without any questions asked, administration deductions, or delay hurdles."
    },
    {
      q: "3. Do you provide job guarantees upon course completion?",
      a: "No. We do not make false promises of '100% job guarantees' because no ethical educational institution can control external recruitment decisions. However, we do something much more powerful: we equip you with a high-fidelity, production-ready portfolio that forces hiring managers to pay attention. In today's software house ecosystem (including Arfa in Lahore, Shahrah-e-Faisal setups, or US remote teams), employers do not care about CV lines or certificates. They care about active software projects. When you show up to an interview with a live React app, a functioning Node backend database connection, structured XML schemas, and an organized dynamic codebase rather than static screenshots, you instantly rank in the top 5% of candidate lists. We also teach cold-pitching, Upwork positioning, and portfolio presentation to ensure you possess maximum client attraction power."
    },
    {
      q: "4. What computer specifications and local connection requirements do I need?",
      a: "No high-end computing rig is needed. Our workflows are optimized to run comfortably on standard, accessible laptops. Your computer should possess at least 8GB of DDR4 RAM, a standard Intel Core i5 processor (or AMD equivalent, Gen 6 or higher), and 50GB of free physical storage space to manage IDE repositories (like VSCode). On the connectivity end, you require a reliable home internet connection with a minimum download speed of 10Mbps (such as standard fiber or stable LTE packages), ensuring latency remains low during live screen-sharing and system deployment sessions."
    },
    {
      q: "5. Can I join if I have absolutely zero background in computer programming or mathematical logic?",
      a: "Absolutely! Our specialized structure is custom-tailored to accommodate absolute beginners. Because our classes run in very small slots under a direct 1-to-1 layout, we adapt our pace to match your exact baseline. If you are starting from zero code, we invest additional hours stabilizing your fundamentals (variables, conditionals, loops, basic HTML layouts) before moving to advanced stacks. If you are already intermediate, we bypass the basics and jump directly into React architecture and NoSQL aggregation targets."
    },
    {
      q: "6. How do payment installment schedules align with middle-class budgets?",
      a: "To make our academy accessible to middle-class Pakistani families, we refuse to charge massive upfront tuition fees. Instead, your total 14-week course fee is distributed into a simple, convenient monthly payment of PKR 6,000. These payments can be made comfortably through local fintech solutions like Easypaisa, JazzCash, or standard Pakistani bank transfers, ensuring your academic path remains free of financial strain."
    },
    {
      q: "7. How are missed classes and individual scheduling adjustments managed?",
      a: "With a maximum of 6 students per cohort, we do not follow a rigid, unforgiving corporate schedule. If you have an emergency, university exams, or load-shedding issues, you can coordinate with your mentor via our dedicated WhatsApp group at least 4 hours before the slot. We will simply postpone your 1-to-1 code review to our next makeup block, ensuring you never fall behind or lose direct access to your instructor."
    },
    {
      q: "8. Why is local SEO and Google Maps pack optimization part of your marketing syllabus?",
      a: "Because Local SEO represents one of the fastest ways to generate software and marketing revenue from local Pakistani businesses. Local healthcare clinics, lawyers, real estate agencies, and manufacturing houses are willing to pay handsome monthly retainers (from PKR 30,000 to 80,000) for a top-3 spot in Google's Map pack. We show you exactly how to build local NAP (Name, Address, Phone) consistency charts, claim Google Profiles, generate authentic reviews, and dominate local search territories."
    },
    {
      q: "9. What is structural SILO content mapping, and why is it essential?",
      a: "SILO mapping is an advanced on-page SEO structural design pattern designed to establish deep search engine ranking contextual relevance. Instead of randomly throwing blog articles on a root URL, we organize content folders into structured vertical directories (linking supporting subpages directly back to parent course blocks). If you want search engine crawlers to label you as a high-authority domain, your content siloing must remain immaculate."
    },
    {
      q: "10. What software systems, libraries, and design frameworks are taught?",
      a: "For web development, we focus on the MERN stack (MongoDB NoSQL, Express API routing, React interface architecture, Node runtime) along with Tailwind CSS. For UI/UX, we use Figma (components, variants, design tokens, responsive auto-layouts). For SEO, we use Semrush, Ahrefs, Screaming Frog crawlers, Google Search Console, and Google Analytics 4."
    },
    {
      q: "11. Is Mentor Arena registered physically, or is it purely online?",
      a: "We maintain our physical headquarters in Cantt Bazar, Drigh Road, Karachi, Sindh. Although 90% of our student reviews and mentorship interactions run digitally to support students across Lahore, Rawalpindi, and Islamabad, having a physical hub ensures maximum operational accountability, local NAP compliance, and trust."
    },
    {
      q: "12. How do I start the enrollment process today?",
      a: "The enrollment process is simple. First, click on the 'Book Clarity Call' button to schedule a free, 15-minute diagnostic session. During this call, we will review your background, evaluate your technical goals, explain the syllabus details, and confirm if our small cohort slots have available openings. If there is a mutual match, we will activate raw workspace access and initiate your billing verification."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="comprehensive-faq-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <button onClick={onBackToHome} className="hover:text-brand-blue transition-colors">Home</button>
          <span>/</span>
          <span className="text-brand-blue font-bold">Frequently Asked Questions</span>
        </div>

        {/* Hero Title */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest font-mono">
            💬 Exhaustive Objection Handling Directory
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
            Detailed Answers to Every Student Concern in {citySuffix}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            Read over 1,500 words of technical, operational, and financial specifications. We maintain complete transparency so you can make informed career choices.
          </p>
        </div>

        {/* Interactive FAQ Directory */}
        <div className="space-y-4 mb-16">
          {detailedFAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="border border-gray-100 rounded-3xl overflow-hidden bg-gray-50/30 hover:bg-gray-50/70 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-gray-950 hover:text-brand-blue transition-colors text-base md:text-lg">
                    {faq.q}
                  </span>
                  <span className={`w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-90 text-brand-blue' : ''}`}>
                    <ChevronRight size={16} />
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 text-gray-650 leading-relaxed text-sm md:text-base border-t border-gray-100/50 pt-4 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="p-8 md:p-12 bg-blue-900 text-white rounded-[2.5rem] relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl md:text-3xl font-black mb-4">Have Any Unanswered Technical Queries?</h2>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Reach out directly to Fazal Shahid Latif. Ask your questions about the syllabus, payment parameters, or custom projects via a brief call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onBookCall}
              className="px-8 py-4 bg-brand-green text-white font-bold hover:bg-emerald-500 transition-all rounded-xl text-sm uppercase tracking-wider"
            >
              Book Placement Call
            </button>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hi%2C%20I%20have%20questions%20about%20the%20courses%20at%20Mentor%20Arena`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 text-white font-bold hover:bg-white/20 transition-all rounded-xl text-sm uppercase tracking-wider border border-white/10"
            >
              Direct WhatsApp chat
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
