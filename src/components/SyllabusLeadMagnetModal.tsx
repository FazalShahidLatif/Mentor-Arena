import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Phone, 
  Mail, 
  User, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Users, 
  Layers, 
  Zap, 
  Check,
  MessageSquare
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import { generateSyllabusPDF, SyllabusLeadData } from '../utils/syllabusPdfGenerator';

interface SyllabusLeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrack?: string;
  onBookCall?: () => void;
}

const AVAILABLE_TRACKS = [
  "Full-Stack Web Development (MERN)",
  "Search Engine Optimization (SEO & AIO)",
  "UI/UX Design & Digital Marketing",
  "Advance Excel & Financial Modeling",
  "Computerized Accounting (QuickBooks, Xero)",
  "Generative AI & Agentic Automation",
  "Logo & Graphic Designing (Illustrator, Photoshop)",
  "Office Automation (Word & PowerPoint)"
];

export const SyllabusLeadMagnetModal: React.FC<SyllabusLeadMagnetModalProps> = ({
  isOpen,
  onClose,
  defaultTrack = "Full-Stack Web Development (MERN)",
  onBookCall
}) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(defaultTrack);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync default track if changed
  React.useEffect(() => {
    if (defaultTrack) {
      setSelectedTrack(defaultTrack);
    }
  }, [defaultTrack]);

  if (!isOpen) return null;

  const validateInputs = () => {
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please provide your full name.");
      return false;
    }
    
    // Validate WhatsApp (digits check)
    const cleanWa = whatsapp.replace(/\D/g, '');
    if (!cleanWa || cleanWa.length < 10) {
      setErrorMessage("Please enter a valid WhatsApp number (e.g. 0332 2137898 or +92 332 2137898).");
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address to receive your verification receipt.");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const leadData: SyllabusLeadData = {
      studentName: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      selectedTrack: selectedTrack,
      requestDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    try {
      // 1. Save lead to localStorage
      try {
        const existingLeads = JSON.parse(localStorage.getItem('ma_syllabus_leads') || '[]');
        existingLeads.unshift({
          ...leadData,
          id: `LEAD-${Date.now()}`,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('ma_syllabus_leads', JSON.stringify(existingLeads.slice(0, 100)));
      } catch (err) {
        console.warn("Could not write lead to localStorage:", err);
      }

      // 2. Generate and download PDF
      setTimeout(() => {
        try {
          const doc = generateSyllabusPDF(leadData);
          doc.save(`MentorArena-2026-Comprehensive-16-Week-Syllabus.pdf`);
          setIsSubmitting(false);
          setIsSuccess(true);
        } catch (pdfErr) {
          console.error("PDF Generation error:", pdfErr);
          setIsSubmitting(false);
          setErrorMessage("PDF generation completed with warning. Please click Download Again.");
          setIsSuccess(true);
        }
      }, 600);
    } catch (err: any) {
      console.error("Lead submission error:", err);
      setIsSubmitting(false);
      setErrorMessage("An error occurred while preparing your download. Please retry.");
    }
  };

  const handleDownloadAgain = () => {
    const leadData: SyllabusLeadData = {
      studentName: name.trim() || 'Prospective Student',
      whatsapp: whatsapp.trim() || 'Verified WhatsApp',
      email: email.trim() || 'Verified Candidate',
      selectedTrack: selectedTrack,
      requestDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    const doc = generateSyllabusPDF(leadData);
    doc.save(`MentorArena-2026-Comprehensive-16-Week-Syllabus.pdf`);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/75 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row my-auto"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-gray-100/90 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* LEFT PANEL: Visual Syllabus Preview & Toolkit Bundle (38% width on desktop) */}
        <div className="md:w-5/12 bg-gradient-to-br from-brand-navy via-[#132c52] to-[#0a182e] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-bold tracking-wide">
              <Sparkles size={13} className="text-emerald-400" />
              <span>2026 OFFICIAL CURRICULUM</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                Download 16-Week Roadmap & Lecture Plan (PDF)
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                150 hours of intensive 1-to-1 live screen mentorship, live code debugging, and practical freelancing frameworks with Fazal Shahid Latif.
              </p>
            </div>

            {/* Visual Document Card Preview (Mirroring iSkills Syllabus layout) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
                    PDF
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">MentorArena_Syllabus_2026.pdf</span>
                    <span className="block text-[10px] text-emerald-300 font-mono">2-Page Verified Blueprint (A4)</span>
                  </div>
                </div>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded font-mono">1.2 MB</span>
              </div>

              {/* Snapshot metrics */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-black/20 p-2 rounded-xl">
                  <span className="block text-[10px] text-slate-400">Format</span>
                  <strong className="text-white font-bold">1-to-1 Private Screen</strong>
                </div>
                <div className="bg-black/20 p-2 rounded-xl">
                  <span className="block text-[10px] text-slate-400">Total Hours</span>
                  <strong className="text-emerald-300 font-bold">150 Live Hours</strong>
                </div>
                <div className="bg-black/20 p-2 rounded-xl">
                  <span className="block text-[10px] text-slate-400">Tuition</span>
                  <strong className="text-white font-bold">PKR 6,000 / mo</strong>
                </div>
                <div className="bg-black/20 p-2 rounded-xl">
                  <span className="block text-[10px] text-slate-400">Cohort Limit</span>
                  <strong className="text-amber-300 font-bold">Max 6 Students</strong>
                </div>
              </div>
            </div>

            {/* Bundled Toolkit Highlight Box */}
            <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Zap size={14} className="text-emerald-400" />
                <span>Included: Free Pro SEO & Dev Toolkit</span>
              </div>
              <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                Enrolled students receive shared access to <strong>$1,400+ in professional diagnostics</strong>: Ahrefs reports, Semrush audit templates, premium Figma UI kits, and Tailwind UI blocks.
              </p>
            </div>
          </div>

          {/* Bottom Security Assurance */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span>Zero Spam Guarantee · Direct mentor WhatsApp dispatch</span>
          </div>
        </div>

        {/* RIGHT PANEL: Auto-Collect Form & Direct Download Trigger (62% width on desktop) */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between bg-white">
          {!isSuccess ? (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2.5 py-1 rounded-md">
                  Instant Direct Download
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight mt-2">
                  Where should we send your lecture roadmap?
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Enter your verified contact details below. Your high-resolution 16-Week Syllabus & Pro Toolkit summary PDF will download immediately.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <User size={14} className="text-brand-blue" />
                    <span>Your Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} className="text-emerald-600" />
                      <span>Verified WhatsApp Number</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Pakistan (+92) / Overseas
                    </span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0332 2137898 or +92 332 2137898"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-mono"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Used to send class orientation details and verify mentor availability.
                  </span>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Mail size={14} className="text-brand-blue" />
                    <span>Active Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>

                {/* Track of Interest */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-brand-blue" />
                    <span>Specialized Track of Interest</span>
                  </label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all bg-white text-gray-800"
                  >
                    {AVAILABLE_TRACKS.map((track, i) => (
                      <option key={i} value={track}>{track}</option>
                    ))}
                  </select>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Compiling 2026 PDF Syllabus...</span>
                      </>
                    ) : (
                      <>
                        <Download size={18} />
                        <span>Download 2026 Comprehensive Syllabus (PDF)</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-2">
                    Free Instant Download · No credit card required · Includes Pro SEO & Dev Toolkit voucher
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-6 sm:py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Download Initiated
                </span>
                <h4 className="text-2xl font-black text-gray-950 tracking-tight">
                  Your 2026 16-Week Syllabus is Ready!
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>! Your download has started automatically. If your browser prevented the popup, click the button below.
                </p>
              </div>

              {/* Download Again & WhatsApp CTA */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800">Track: {selectedTrack}</span>
                  <span className="text-emerald-700 font-semibold">150 Live Hours</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  Candidate: {email} · {whatsapp}
                </div>
                <div className="border-t border-gray-200 pt-3 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleDownloadAgain}
                    className="flex-1 py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Download size={14} /> Download Again
                  </button>
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(
                      `Assalam-o-Alaikum Fazal Shahid Latif, I just downloaded the 2026 16-Week Syllabus for ${selectedTrack}. My name is ${name}. I want to check availability for the upcoming 1-to-1 cohort.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <MessageSquare size={14} /> WhatsApp Mentor
                  </a>
                </div>
              </div>

              {/* Diagnostic Clarity Call Offer */}
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 text-left space-y-2">
                <h5 className="text-xs font-bold text-brand-navy">Want personalized roadmap advice?</h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Book a free 15-minute diagnostic call with Lead Mentor Fazal Shahid Latif to review your career path.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onBookCall) onBookCall();
                  }}
                  className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>Book Free Clarity Call Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}

          {/* Quick Footer Notes */}
          <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-between">
            <span>Official Admissions: Cantt Bazar, Drigh Road, Karachi</span>
            <span>Ref: MA-2026-SYL</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
