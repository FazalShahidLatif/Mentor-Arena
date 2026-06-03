import React from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, ArrowRight, Code, Cpu, Database, Layout, Shield, Server } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface WebDevelopmentPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({ onBackToHome, onBookCall, selectedCity }) => {
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="web-dev-course-view">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <button onClick={onBackToHome} className="hover:text-brand-blue transition-colors">Home</button>
          <span>/</span>
          <span className="text-gray-600">Courses</span>
          <span>/</span>
          <span className="text-brand-blue">Web Development</span>
        </div>

        {/* Hero Area */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest animate-pulse font-mono">
            🎓 14-Week Immersive Coding Accelerator ({citySuffix})
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
            Master Full-Stack Web Development via 1-to-1 Real, Live Projects in {citySuffix}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl font-medium mb-10">
            Build your professional software developer trajectory in Pakistan during this high-engagement summer cohort. Learn modern Web Systems from Fazal Shahid Latif with 30+ years of industrial code-shipping lineage. Limited to max 6 students to guard raw attention.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button 
              onClick={onBookCall}
              className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/95 transition-all text-center shadow-lg shadow-brand-blue/10"
            >
              Secure Your Seats (Book Clarity Call)
            </button>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hi%2C%20I'm%20interested%20in%20the%20MERN%20Stack%20Web%20Dev%20course%20in%20${citySuffix}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              WhatsApp Lead Instructor
            </a>
          </div>
        </div>

        {/* Dense Text Section (1,500+ Words for deep SEO & Semantic value) */}
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              1. The Absolute Core Problem of Modern Computing Academies in Pakistan
            </h2>
            <p className="text-base">
              The Pakistani educational system is saturated with standard coding bootcamps, generic YouTube tutorials, and legacy institutes that continue to force students to memorize slides or copy-paste basic tasks that templates easily create. These antiquated processes do not equip ambitious young brains with logical problem-solving systems, professional system design patterns, or technical autonomy.
            </p>
            <p className="text-base">
              At <strong>Mentor Arena</strong>, we bypass conventional playbooks. Our 1-to-1 core framework ensures that every line of code you write is vetted, reviewed, and engineered side-by-side with professional developers. You do not absorb basic definitions—you create robust APIs, write reliable database pipelines, manage complex application states, and deploy production-ready code directly to fast cloud environments.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              2. Core Technologies You Will Deeply Command In 150 Live Hours
            </h2>
            <p className="text-base">
              This is an intensive, rigorous full-stack syllabus centered entirely around the MERN (MongoDB, Express.js, React, Node.js) architecture, modern styling libraries, and web protocols:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Layout size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Modern Frontend & UI State</h3>
                <p className="text-sm text-gray-600">
                  Master HTML5, CSS3 Grid, Flexbox, Tailwind CSS, JavaScript ES6+, React.js components, hooks (useState, useEffect, useContext), and clean custom states.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Server size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Robust Backends & API Rest Systems</h3>
                <p className="text-sm text-gray-600">
                  Build scalable server targets using Node.js and Express.js framework, implement professional REST APIs, configure CORS settings, and run backend debug mechanisms.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Database size={20} />
                </div>
                <h3 className="font-bold text-gray-900">NoSQL Databases & Modeling</h3>
                <p className="text-sm text-gray-600">
                  Structure flexible NoSQL setups in MongoDB with Mongoose, run complex query pipelines, manage relations, and maintain persistent storage engines.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center">
                  <Cpu size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Deployment & DevOps Lifecycle</h3>
                <p className="text-sm text-gray-600">
                  Deploy live builds on Vercel, Railway, Render, or Vercel Serverless platforms. Wire real custom domains, manage environment configuration, and version control via GitHub.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              3. Dynamic Local Career Targets & Industry Demands
            </h2>
            <p className="text-base">
              The software developer market in Karachi, Lahore, and Islamabad is begging for self-motivated engineering minds who can construct real software systems. In our regional tracks, we specifically tune your portfolio to address the distinct industrial clusters:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>
                <strong>Karachi Hub:</strong> Tailor your projects for the financial, e-commerce, and SaaS agencies headquartered around Shahrah-e-Faisal and Clifton (Clifton Dev Houses, retail ERPs).
              </li>
              <li>
                <strong>Lahore Corridor:</strong> Structure high-capacity web targets fitting Arfa Software Technology Park standards, Gulberg remote dev agencies, and local Punjab startup requirements.
              </li>
              <li>
                <strong>Islamabad Capital:</strong> Focus on high-ticket international freelancing structures, Blue Area IT consultancies, and remote engineering partnerships across US/UK timezones.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              4. Complete Syllabus Architecture — 14 Intense Weeks
            </h2>
            <div className="space-y-6">
              {[
                { week: "Weeks 1–3", title: "Modern Design Languages & Static Prototyping", desc: "Understand structure. Learn standard HTML5 Semantic structures, fluid CSS layouts with Flexbox and CSS Grid, and responsive utility frameworks like Tailwind CSS. You will construct 3 responsive static page portfolios." },
                { week: "Weeks 4–6", title: "Deep Logical Javascript (ES6+) & React Components", desc: "Inject programmatic intelligence. Command variables, asynchronous requests, fetch patterns, ES6 features, React Hooks, modular component trees, and reactive state systems." },
                { week: "Weeks 7–10", title: "Scale Upward: Node API Backends & DB Aggregation", desc: "Tackle backend servers. Build custom Express routes, design secure REST API targets, connect to live MongoDB clusters, and execute user authentication tokens (JWT)." },
                { week: "Weeks 11–14", title: "The Shipped Project: Production Tuning & Climax", desc: "Compile your core workspace project. Tackle real production bugs, configure cross-origin safety, wire ENV configurations securely, and push active builds to Railway, Render, and Vercel. Write a professional README detailing your system design." }
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
              🛠️ The Hero Project Target: What You Will Actually Ship
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              By the end of your 150 hours of intensive training, you will not have simple certificates. You will possess a <strong>live, highly functional full-stack web application</strong> hosted on a dynamic cloud domain (e.g., custom e-commerce marketplace, student tracking CRM, collaborative workspace platform) featuring fully functioning local database connections, secure dashboard panels for authorization, interactive user paths, and pixel-perfect design grids. This project is what lands remote contracts and sets you apart at software house interviews.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              5. Frequently Asked Questions (Web Dev Path)
            </h2>
            <div className="space-y-4">
              {[
                { q: "Is this course accessible to absolute beginners?", a: "Yes, our customized 1-to-1 format adapts directly to your level. If you are starting from zero code, we spending additional live hours stabilizing your base logic. If you already have tech experience, we accelerate straight into system architecture." },
                { q: "Do I need an extremely high-end laptop?", a: "Any standard working laptop with 8GB RAM, an i5 processor (or equivalent), and stable internet of at least 10Mbps is sufficient to run local IDEs, VSCode, and connect with live environments." },
                { q: "Why choice Mentor Arena over free YouTube alternatives?", a: "YouTube provides tutorials but lacks critical execution support. When your backend drops connection or user state resets continuously, static videos can't provide corrective answers. At Mentor Arena, you receive direct real-time feedback on every line, bypassing hours of stack-overflow frustration." }
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
          <h2 className="text-2xl md:text-3xl font-black mb-4">Leverage Your Summer Holidays for Professional Web Mastery</h2>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Gain high income technical confidence under direct peer-to-peer developer workspace guidance. Book your 20-min Clarity Session before spots are completely allocated.
          </p>
          <button 
            onClick={onBookCall}
            className="px-8 py-4 bg-brand-green text-white font-bold hover:bg-emerald-500 transition-all rounded-xl text-sm uppercase tracking-wider"
          >
            Schedule Free Clarity Session Now
          </button>
        </div>

      </div>
    </div>
  );
};
