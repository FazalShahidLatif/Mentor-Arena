import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  CreditCard,
  Building2,
  Calendar,
  User,
  Phone,
  BookOpen
} from 'lucide-react';
import { BUSINESS_INFO, PRICING } from '../constants';
import { InvoiceData, downloadInvoicePDF, generateInvoiceNumber } from '../utils/invoiceGenerator';

interface InvoiceReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<InvoiceData>;
}

export const InvoiceReceiptModal: React.FC<InvoiceReceiptModalProps> = ({
  isOpen,
  onClose,
  initialData
}) => {
  const [formData, setFormData] = useState<InvoiceData>({
    studentName: initialData?.studentName || '',
    whatsapp: initialData?.whatsapp || '',
    email: initialData?.email || '',
    city: initialData?.city || 'Karachi, Pakistan',
    courseTitle: initialData?.courseTitle || '14-Week Full-Stack MERN Web Development',
    planTitle: initialData?.planTitle || 'Monthly Tuition Plan (14-Week Cohort)',
    amount: initialData?.amount || 'PKR 6,000 / month',
    paymentGateway: initialData?.paymentGateway || 'jazzcash',
    paymentStatus: initialData?.paymentStatus || 'PENDING CONFIRMATION',
    invoiceNumber: initialData?.invoiceNumber || generateInvoiceNumber('MA-INV'),
    receiptNumber: initialData?.receiptNumber || generateInvoiceNumber('MA-REC'),
    date: initialData?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    timeSlot: initialData?.timeSlot || 'Evening Session (6 PM - 12 AM)',
    notes: initialData?.notes || ''
  });

  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        studentName: initialData.studentName ?? prev.studentName,
        whatsapp: initialData.whatsapp ?? prev.whatsapp,
        email: initialData.email ?? prev.email,
        courseTitle: initialData.courseTitle ?? prev.courseTitle,
        planTitle: initialData.planTitle ?? prev.planTitle,
        amount: initialData.amount ?? prev.amount,
        paymentGateway: initialData.paymentGateway ?? prev.paymentGateway,
        paymentStatus: initialData.paymentStatus ?? prev.paymentStatus,
        city: initialData.city ?? prev.city,
        notes: initialData.notes ?? prev.notes
      }));
    }
  }, [isOpen, initialData]);

  const [copied, setCopied] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      downloadInvoicePDF(formData);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  const handlePrint = () => {
    downloadInvoicePDF(formData);
  };

  const courseOptions = [
    '14-Week Full-Stack MERN Web Development',
    'Technical & Local Search Engine Optimization (SEO)',
    'UI/UX Design Systems & Conversion Architecture',
    'Advance Excel, Financial Modeling & Power BI',
    'Computerized Accounting (QuickBooks, Xero, Tally)',
    'Generative AI & Agentic Automation'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden my-8"
        >
          {/* Top Bar */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Course Booking Invoice &amp; Payment Receipt</h3>
                  <span className="text-[10px] font-mono font-bold bg-brand-green/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">
                    Official Document
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mentor Arena Pakistan · Authorized by Fazal Shahid Latif (Lead Mentor)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Quick Actions Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-blue" />
                <span className="text-xs font-bold text-gray-800">
                  Invoice Ref: <span className="font-mono text-brand-blue">{formData.invoiceNumber}</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-xs text-gray-600">
                  Date: <span className="font-semibold text-gray-800">{formData.date}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-4 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Generating PDF...' : 'Download PDF Invoice'}</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(`Hi Fazal Shahid Latif, I have generated my course invoice/receipt for ${formData.courseTitle} (Ref: ${formData.invoiceNumber}). Student: ${formData.studentName || 'Student'}, Phone: ${formData.whatsapp}. Payment Gateway: ${formData.paymentGateway === 'jazzcash' ? 'JazzCash' : 'Zindigi'}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Editable Details Form & Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-5 space-y-4 bg-slate-50 p-5 rounded-3xl border border-gray-200">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  Customize Invoice Details
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Muhammad Raza"
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="e.g. 0332 2137898"
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Enrolled Course Track</label>
                    <select
                      value={formData.courseTitle}
                      onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-blue"
                    >
                      {courseOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Official Payment Gateway</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentGateway: 'jazzcash' })}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all text-center ${
                          formData.paymentGateway === 'jazzcash'
                            ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        ● JazzCash
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentGateway: 'zindigi' })}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all text-center ${
                          formData.paymentGateway === 'zindigi'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-xs'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        ● Zindigi (Raast)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Payment Status</label>
                    <select
                      value={formData.paymentStatus}
                      onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-blue font-semibold"
                    >
                      <option value="PENDING CONFIRMATION">PENDING CONFIRMATION (Unverified)</option>
                      <option value="PAID">PAID &amp; ENROLLED (Official Receipt)</option>
                      <option value="OFFICIAL QUOTATION">OFFICIAL QUOTATION / PRO-FORMA</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Printable Invoice Card Preview */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
                {/* Invoice Paper Header */}
                <div className="border-b border-gray-100 pb-4 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-widest block">
                      Official Receipt
                    </span>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">MENTOR ARENA</h4>
                    <p className="text-[11px] text-gray-500">26/792 Cantt Bazar, Drigh Road, Karachi</p>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      formData.paymentStatus === 'PAID'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {formData.paymentStatus}
                    </span>
                    <span className="block font-mono text-[11px] text-gray-600 mt-1">{formData.invoiceNumber}</span>
                  </div>
                </div>

                {/* Student & Course Summary */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block font-bold">Student Name:</span>
                    <strong className="text-gray-900 text-sm block mt-0.5">{formData.studentName || 'Student Name Pending'}</strong>
                    <span className="text-gray-600 block mt-0.5">WhatsApp: {formData.whatsapp || 'Pending WhatsApp'}</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block font-bold">Course / Track:</span>
                    <strong className="text-gray-900 block mt-0.5 leading-snug">{formData.courseTitle}</strong>
                    <span className="text-emerald-700 font-bold block mt-0.5">14 Weeks (150 Hours 1-on-1)</span>
                  </div>
                </div>

                {/* Breakdown Table */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full">
                    <thead className="bg-slate-100 text-slate-700 font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5 text-left">Item Description</th>
                        <th className="p-2.5 text-center">Duration</th>
                        <th className="p-2.5 text-right">Tuition Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-2.5 font-medium text-gray-900">
                          {formData.courseTitle}
                          <span className="block text-[10px] text-gray-500">Live 1-to-1 Screentime with Fazal Shahid Latif</span>
                        </td>
                        <td className="p-2.5 text-center font-mono text-gray-600">14 Weeks</td>
                        <td className="p-2.5 text-right font-bold text-gray-900">PKR 6,000</td>
                      </tr>
                      <tr className="bg-gray-50/50 text-[11px] text-gray-600">
                        <td className="p-2.5 font-medium">1st Class 100% Refund Exemption</td>
                        <td className="p-2.5 text-center">Session 1</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">INCLUDED</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-slate-900 text-white font-bold">
                      <tr>
                        <td colSpan={2} className="p-2.5 text-right text-xs">Total Monthly Installment:</td>
                        <td className="p-2.5 text-right text-sm text-emerald-400 font-black">PKR 6,000</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Gateway Instructions Box */}
                <div className="p-4 bg-red-50/60 border border-red-200/70 rounded-2xl text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <strong className="text-red-900 flex items-center gap-1.5 font-bold">
                      <span>Gateway:</span>
                      <span className="font-mono text-red-700">{formData.paymentGateway === 'jazzcash' ? 'JazzCash' : 'Zindigi (by JS Bank / Raast)'}</span>
                    </strong>
                    <button
                      type="button"
                      onClick={() => handleCopy(BUSINESS_INFO.accountNumber, 'gateway-account')}
                      className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded hover:bg-red-200 transition-colors"
                    >
                      {copied === 'gateway-account' ? '✓ Copied' : 'Copy 03322137898'}
                    </button>
                  </div>
                  <p className="text-[11px] text-red-850">
                    Account: <strong>{BUSINESS_INFO.accountNumber}</strong> · Title: <strong>{BUSINESS_INFO.accountHolder}</strong>
                  </p>
                  <p className="text-[10px] text-gray-600 italic">
                    * Transfer PKR 6,000 and share transaction receipt on WhatsApp at <strong>+92 332 2137898</strong> for instant calendar slot activation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>Protected by 1st Class Money-Back Refund Exemption Guarantee</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-6 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Receipt</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
