import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Clock, Users, Link as LinkIcon, CreditCard, Send, Check, X } from 'lucide-react';

interface EnrollmentFormProps {
  onBackToHome: () => void;
  onNavigate: (path: string) => void;
}

interface Batch {
  id: string;
  name: string;
  maxSeats: number;
  enrolled: number;
  course: string;
  schedule: {
    dayOfWeek: string;
    time: string;
    session1: string;
    break: string;
    session2: string;
    timeZone: string;
  };
  zoomLinks: {
    session1: string;
    session2: string;
  };
  syllabus: string[];
}

const FEE = 'PKR 6,000';
const FEE_MONTH = 'PKR 6,000/month';

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ onBackToHome, onNavigate }) => {
  const [step, setStep] = useState<'info' | 'batch' | 'payment' | 'success'>('info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [batches, setBatches] = useState<Batch[]>([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    batchId: '',
    note: '',
  });

  const fetchBatches = async () => {
    try {
      const res = await fetch('/api/batches');
      const data = await res.json();
      setBatches(data);
      if (data.length > 0 && !form.batchId) {
        setForm((f) => ({ ...f, batchId: data[0].id }));
      }
    } catch (e) {
      console.error('Failed to fetch batches:', e);
    }
  };

  React.useEffect(() => {
    document.title = 'Enroll at Mentor Arena — Pick Your Batch';
    fetchBatches();
    return () => { document.title = 'Mentor Arena'; };
  }, []);

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const nextStep = () => {
    if (step === 'info') {
      if (!form.name.trim() || !form.email.trim()) {
        setError('Please fill in your name and email to continue.');
        return;
      }
      setError('');
      setStep('batch');
    } else if (step === 'batch') {
      if (!form.batchId) {
        setError('Please pick a batch to continue.');
        return;
      }
      setError('');
      setStep('payment');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          city: form.city,
          batchId: form.batchId,
          note: form.note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      setStep('success');
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    }

    setLoading(false);
  };

  const selectedBatch = batches.find((b) => b.id === form.batchId);

  const renderInfoStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest mb-4 rounded-full border border-brand-blue/20">
          Step 1 of 3 — Your Details
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3">
          Tell us who you are
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          We'll use this to create your student account and send your Zoom links after payment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Your Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Enter your full name as it appears on your ID"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none transition-all text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Email Address <span className="text-brand-red">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com — we'll send your login details here"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none transition-all text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="0300 1234567 — for WhatsApp updates about your class"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            City
          </label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
            placeholder="Karachi, Lahore, Islamabad, or anywhere"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Anything else you want us to know?
          </label>
          <textarea
            value={form.note}
            onChange={(e) => update('note', e.target.value)}
            placeholder="Your current experience level, specific goals, or questions you have..."
            rows={4}
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none transition-all text-sm resize-none"
          />
        </div>

        {error && (
          <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl text-brand-red text-sm font-medium flex items-center gap-2">
            <X className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBackToHome}
            className="px-6 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="flex-1 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-blue/95 transition-all flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderBatchStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 rounded-full border border-emerald-500/20">
          Step 2 of 3 — Pick Your Batch
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3">
          Choose your class schedule
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Each batch has max 6 students. Classes are 2 hours — two 50-minute sessions with a 20-minute break. Pick the batch that fits your routine.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {batches.map((batch) => {
          const available = batch.maxSeats - batch.enrolled;
          const isSelected = form.batchId === batch.id;
          const isFull = available <= 0;

          return (
            <label
              key={batch.id}
              className={`
                block p-6 rounded-2xl border transition-all cursor-pointer mb-3
                ${isSelected
                  ? 'border-brand-blue bg-brand-blue/10 shadow-lg shadow-brand-blue/10'
                  : isFull
                    ? 'border-gray-700 bg-gray-900/30 opacity-60'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {isFull && (
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Full
                      </span>
                    )}
                    <span className={`text-xs font-bold uppercase tracking-widest ${
                      isSelected ? 'text-brand-blue' : 'text-gray-500'
                    }`}>
                      {batch.course}
                    </span>
                    {!isFull && (
                      <span className="text-xs text-gray-500">
                        · {available} seat{available !== 1 ? 's' : ''} left
                      </span>
                    )}
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {batch.name}
                  </h3>
                  <div className="flex flex-col gap-1 text-sm text-gray-400 mt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{batch.schedule.dayOfWeek}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-gray-300 font-medium">{batch.schedule.time}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {batch.schedule.session1} → Break {batch.schedule.break} → {batch.schedule.session2}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected
                      ? 'border-brand-blue bg-brand-blue'
                      : isFull
                        ? 'border-gray-600'
                        : 'border-white/20 hover:border-brand-blue/50'
                    }
                  `}>
                    {isSelected && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="batchId"
                value={batch.id}
                checked={isSelected}
                onChange={(e) => update('batchId', e.target.value)}
                disabled={isFull}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>

      {error && (
        <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl text-brand-red text-sm font-medium flex items-center gap-2 mb-6">
          <X className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep('info')}
          className="px-6 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="flex-1 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-blue/95 transition-all flex items-center justify-center gap-2"
        >
          Continue to Payment
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  const renderPaymentStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 rounded-full border border-amber-500/20">
          Step 3 of 3 — Make Payment
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3">
          Pay your first month
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Fee: <span className="text-white font-bold text-lg">{FEE_MONTH}</span> · One month upfront · Refund available within 24 hours
        </p>
      </div>

      {/* Selected batch summary */}
      {selectedBatch && (
        <div className="mb-8 p-5 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your selected batch</span>
          </div>
          <p className="text-white font-bold text-lg mb-1">{selectedBatch.name}</p>
          <p className="text-sm text-gray-400">
            {selectedBatch.schedule.dayOfWeek} · {selectedBatch.schedule.time} (PKT)
          </p>
        </div>
      )}

      {/* Payment methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* JazzCash */}
        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-brand-blue" />
            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">JazzCash / Raast</span>
          </div>
          <img
            src="/payment-assets/jazzcash-qr.png"
            alt="JazzCash Raast QR Code"
            className="w-full max-w-[180px] mx-auto mb-3 rounded-lg shadow-lg"
          />
          <div className="text-xs text-gray-400 space-y-1">
            <p className="font-medium text-gray-300">Till ID: 984148029</p>
            <p>Dial <span className="font-mono text-brand-green">*786*10#</span> and enter Till ID</p>
            <p className="text-gray-500 text-[10px] mt-1">Scan QR with any Raast-enabled app</p>
          </div>
        </div>

        {/* Zindigi / JS Bank */}
        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">JS Bank / Zindigi / Raast</span>
          </div>
          <img
            src="/payment-assets/zindigi-qr.png"
            alt="Zindigi JS Bank Raast QR Code"
            className="w-full max-w-[180px] mx-auto mb-3 rounded-lg shadow-lg"
          />
          <div className="text-xs text-gray-400 space-y-1">
            <p className="font-medium text-gray-300">Account: 03322137898</p>
            <p>IBAN: PK28JSBL9999903322137898</p>
            <p className="font-medium text-gray-300">Till ID: 946424865</p>
            <p className="text-gray-500 text-[10px] mt-1">Scan QR with Zindigi or any banking app</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-5 mb-6">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Send className="w-4 h-4 text-brand-blue" />
          After you pay — 3 simple steps:
        </h4>
        <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
          <li>Take a <strong>screenshot</strong> of your payment receipt (show amount, date, and your account)</li>
          <li>Send it to us via <strong>WhatsApp: +92 332 2137898</strong> or email <strong>info@mentorarena.online</strong></li>
          <li>We'll confirm within minutes and send your <strong>Zoom class links</strong> to your email</li>
        </ol>
      </div>

      <p className="text-xs text-gray-500 text-center mb-6">
        No online payment gateway — just scan the QR, pay through your banking app, and send the screenshot.
        Both JazzCash and JS Bank/Zindigi use Pakistan's Raast system — instant and free.
      </p>

      {error && (
        <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl text-brand-red text-sm font-medium flex items-center gap-2 mb-4">
          <X className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep('batch')}
          className="px-6 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-blue/95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            <>
              Submit Enrollment
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto text-center py-8"
    >
      <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-emerald-400" />
      </div>

      <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 rounded-full border border-emerald-500/20">
        Enrollment Submitted
      </span>

      <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3 mb-4">
        You're in! Here's what happens next
      </h2>

      <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 mb-8">
        <div className="flex gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-400 flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Enrollment received</p>
            <p className="text-gray-400 text-xs">
              {form.name} — {selectedBatch?.name || 'your batch'} · {FEE_MONTH}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="p-2 bg-amber-500/10 rounded-full text-amber-400 flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Step 1: Pay your first month</p>
            <p className="text-gray-400 text-xs">
              Scan either QR code above (JazzCash or JS Bank/Zindigi), pay {FEE_MONTH}, and send us the screenshot via WhatsApp or email.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="p-2 bg-brand-blue/10 rounded-full text-brand-blue flex-shrink-0">
            <LinkIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Step 2: Get your Zoom links</p>
            <p className="text-gray-400 text-xs">
              Once we confirm your payment, we'll email you both Zoom links for your batch's two weekly sessions.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="p-2 bg-purple-500/10 rounded-full text-purple-400 flex-shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Step 3: Join your first class</p>
            <p className="text-gray-400 text-xs">
              Show up on time with your Zoom link. Max 6 students per batch — personal attention guaranteed.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-xl p-4 mb-6 text-sm text-gray-300">
        <p className="font-medium text-white mb-1">💬 Need help before paying?</p>
        <p>Chat with us on WhatsApp: <strong>+92 332 2137898</strong> or email <strong>info@mentorarena.online</strong></p>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => { setStep('info'); setForm({ name: '', email: '', phone: '', city: '', batchId: '', note: '' }); }}
          className="px-6 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Start Over
        </button>
        <button
          onClick={onBackToHome}
          className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-blue/95 transition-all flex items-center gap-2"
        >
          Back to Home
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#020815] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </button>
      </div>

      {/* Form content */}
      <div className="w-full max-w-2xl relative z-10">
        {step === 'info' && renderInfoStep()}
        {step === 'batch' && renderBatchStep()}
        {step === 'payment' && renderPaymentStep()}
        {step === 'success' && renderSuccessStep()}
      </div>
    </div>
  );
};
