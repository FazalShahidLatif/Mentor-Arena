import React from 'react';
import { motion } from 'motion/react';
import { Link as LinkIcon, Clock, Users, CheckCircle, ArrowRight, Download } from 'lucide-react';

interface StudentDashboardProps {
  onBackToHome: () => void;
  onNavigate: (path: string) => void;
}

interface Enrollment {
  id: string;
  name: string;
  email: string;
  batchId: string;
  batchName: string;
  status: string;
  enrolledAt: string;
  paidAt: string | null;
}

interface Batch {
  id: string;
  name: string;
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

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onBackToHome, onNavigate }) => {
  const [enrollments, setEnrollments] = React.useState<Enrollment[]>([]);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [studentName, setStudentName] = React.useState('');

  React.useEffect(() => {
    document.title = 'My Dashboard — Mentor Arena';
    loadData();
    return () => { document.title = 'Mentor Arena'; };
  }, []);

  const loadData = async () => {
    try {
      // Try to get student info from localStorage (set after login)
      const stored = localStorage.getItem('mentor_arena_student');
      if (stored) {
        try { setStudentName(JSON.parse(stored).name || 'Student'); } catch {}
      }

      const [enrRes, batRes] = await Promise.all([
        fetch('/api/admin/enrollments'),
        fetch('/api/batches'),
      ]);

      if (enrRes.ok) {
        const enrData = await enrRes.json();
        // Filter to only this student's enrollments (if we have email)
        const storedEmail = localStorage.getItem('mentor_arena_student_email');
        if (storedEmail) {
          setEnrollments(enrData.filter((e: Enrollment) => e.email === storedEmail));
        } else {
          setEnrollments(enrData.slice(0, 5));
        }
      }

      if (batRes.ok) {
        const batData = await batRes.json();
        setBatches(batData);
      }
    } catch (e) {
      console.error('Failed to load dashboard:', e);
    }
    setLoading(false);
  };

  const getBatch = (batchId: string) => batches.find((b) => b.id === batchId);

  const renderLoading = () => (
    <div className="min-h-screen bg-[#020815] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );

  const renderEmpty = () => (
    <div className="min-h-screen bg-[#020815] flex items-center justify-center p-4">
      <div className="max-w-lg text-center">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-6">
          <div className="p-4 bg-gray-800/50 rounded-full w-16 h-16 mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to Mentor Arena</h2>
          <p className="text-gray-400 text-sm">
            You don't have any enrollments yet. Fill out the enrollment form to pick your batch and get started.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onNavigate('/enroll')}
            className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-blue/95 transition-all flex items-center gap-2"
          >
            Enroll Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onBackToHome}
            className="px-6 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-[#020815] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              My Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {studentName || 'Student'} · Your enrolled batches and class links
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Home
          </button>
        </div>

        {loading ? (
          renderLoading()
        ) : enrollments.length === 0 ? (
          renderEmpty()
        ) : (
          <div className="space-y-6">
            {enrollments.map((enrollment) => {
              const batch = getBatch(enrollment.batchId);
              const isConfirmed = enrollment.status === 'confirmed';
              const isPaid = !!enrollment.paidAt;

              return (
                <motion.div
                  key={enrollment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    rounded-2xl border p-6 transition-all
                    ${isConfirmed
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-white/5 border-white/10'
                    }
                  `}
                >
                  {/* Batch header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {isConfirmed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">
                            <CheckCircle className="w-3 h-3" />
                            Confirmed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-500/20">
                            Pending Payment
                          </span>
                        )}
                        <span className="text-xs text-gray-500 font-mono">
                          {new Date(enrollment.enrolledAt).toLocaleDateString('en-PK', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {enrollment.batchName || 'Batch'}
                      </h3>
                      {batch && (
                        <p className="text-sm text-gray-400 mt-1">
                          {batch.schedule.dayOfWeek} · {batch.schedule.time} (PKT)
                        </p>
                      )}
                    </div>
                    {isPaid && (
                      <span className="text-xs text-emerald-400 font-medium">
                        Paid on {new Date(enrollment.paidAt!).toLocaleDateString('en-PK')}
                      </span>
                    )}
                  </div>

                  {/* Zoom links (only if confirmed) */}
                  {isConfirmed && batch && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <a
                        href={batch.zoomLinks.session1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-xl hover:bg-brand-blue/20 transition-all group"
                      >
                        <div className="p-2 bg-brand-blue/20 rounded-lg">
                          <LinkIcon className="w-5 h-5 text-brand-blue" />
                        </div>
                        <div>
                          <p className="text-xs text-brand-blue font-bold uppercase tracking-wider mb-0.5">
                            Session 1
                          </p>
                          <p className="text-white text-sm font-medium">
                            {batch.schedule.session1}
                          </p>
                          <p className="text-gray-400 text-xs mt-1 group-hover:text-brand-blue transition-colors">
                            Click to join
                          </p>
                        </div>
                      </a>
                      <a
                        href={batch.zoomLinks.session2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all group"
                      >
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                          <LinkIcon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
                            Session 2
                          </p>
                          <p className="text-white text-sm font-medium">
                            {batch.schedule.session2}
                          </p>
                          <p className="text-gray-400 text-xs mt-1 group-hover:text-emerald-400 transition-colors">
                            Click to join
                          </p>
                        </div>
                      </a>
                    </div>
                  )}

                  {/* Syllabus preview */}
                  {batch && (
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        Syllabus Preview
                      </p>
                      <ul className="space-y-1">
                        {batch.syllabus.slice(0, 4).map((topic, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-gray-600 mt-0.5">→</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Payment status */}
                  {!isConfirmed && (
                    <div className="mt-4 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                      <p className="text-sm text-amber-400 font-medium mb-1">
                        ⚠️ Payment not confirmed yet
                      </p>
                      <p className="text-xs text-gray-400">
                        Pay {FEE_MONTH} using either QR code on the enrollment page, then send the screenshot to us via WhatsApp or email.
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return renderDashboard();
};
