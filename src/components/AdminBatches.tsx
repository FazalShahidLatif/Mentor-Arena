import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Edit3, CheckCircle, X, Link as LinkIcon, Clock, Trash2, Save, AlertCircle } from 'lucide-react';

interface AdminBatchesProps {
  onBackToHome: () => void;
  onNavigate: (path: string) => void;
}

interface Batch {
  id: string;
  name: string;
  maxSeats: number;
  enrolled: number;
  course: string;
  schedule: any;
  zoomLinks: {
    session1: string;
    session2: string;
  };
  syllabus: string[];
  enrolledStudents?: any[];
}

interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  batchId: string;
  batchName: string;
  status: string;
  enrolledAt: string;
  paidAt: string | null;
  note?: string;
}

export const AdminBatches: React.FC<AdminBatchesProps> = ({ onBackToHome, onNavigate }) => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editLinks, setEditLinks] = useState<Record<string, { session1: string; session2: string }>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = async () => {
    try {
      const [batRes, enrRes] = await Promise.all([
        fetch('/api/admin/batches'),
        fetch('/api/admin/enrollments'),
      ]);
      if (batRes.ok) setBatches(await batRes.json());
      if (enrRes.ok) setEnrollments(await enrRes.json());
    } catch (e) {
      console.error('Failed to load:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Admin — Batch Manager · Mentor Arena';
    loadData();
    return () => { document.title = 'Mentor Arena'; };
  }, []);

  const showMsg = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSaveLinks = async (batchId: string) => {
    setSaving(batchId);
    try {
      const res = await fetch(`/api/admin/batches/${batchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editLinks[batchId]),
      });
      if (res.ok) {
        showMsg('success', 'Zoom links updated successfully.');
        setEditLinks((prev) => delete prev[batchId]);
        // Reload to get fresh data
        loadData();
      } else {
        showMsg('error', 'Failed to update. Check the links and try again.');
      }
    } catch (e) {
      showMsg('error', 'Network error. Please try again.');
    }
    setSaving(null);
  };

  const handleConfirmPayment = async (enrollmentId: string) => {
    try {
      const res = await fetch('/api/admin/enrollment/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId }),
      });
      if (res.ok) {
        showMsg('success', 'Payment confirmed! The student will now see their Zoom links.');
        loadData();
      } else {
        showMsg('error', 'Failed to confirm payment.');
      }
    } catch (e) {
      showMsg('error', 'Network error.');
    }
  };

  const getEnrollmentsForBatch = (batchId: string) =>
    enrollments.filter((e) => e.batchId === batchId);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020815] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020815] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Batch Manager
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage batches, update Zoom links, confirm student payments
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-brand-red/10 border-brand-red/20 text-brand-red'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-white">{batches.length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Batches</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-white">
              {enrollments.filter((e) => e.status === 'confirmed').length}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Confirmed</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-amber-400">
              {enrollments.filter((e) => e.status === 'pending_payment').length}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Pending Payment</p>
          </div>
        </div>

        {/* Batches */}
        <div className="space-y-6">
          {batches.map((batch) => {
            const batchEnrollments = getEnrollmentsForBatch(batch.id);
            const available = batch.maxSeats - batch.enrolled;
            const isEditing = !!editLinks[batch.id];
            const editForm = editLinks[batch.id];

            return (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                {/* Batch header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                          {batch.course}
                        </span>
                        <span className="text-xs text-gray-600">
                          · {available} seat{available !== 1 ? 's' : ''} available
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{batch.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {batch.schedule.dayOfWeek}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {batch.schedule.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-white">
                        {batch.enrolled} / {batch.maxSeats}
                      </p>
                      <p className="text-xs text-gray-500">enrolled</p>
                    </div>
                  </div>
                </div>

                {/* Enrollment list */}
                <div className="p-6">
                  {batchEnrollments.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No students enrolled yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {batchEnrollments.map((enrollment) => (
                        <div
                          key={enrollment.id}
                          className={`flex items-center justify-between p-3 rounded-xl border ${
                            enrollment.status === 'confirmed'
                              ? 'bg-emerald-500/5 border-emerald-500/10'
                              : 'bg-amber-500/5 border-amber-500/10'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{enrollment.name}</p>
                            <p className="text-xs text-gray-500 truncate">{enrollment.email}</p>
                            {enrollment.phone && (
                              <p className="text-xs text-gray-600 mt-0.5">{enrollment.phone}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {enrollment.status === 'pending_payment' && (
                              <button
                                onClick={() => handleConfirmPayment(enrollment.id)}
                                disabled={saving === enrollment.id}
                                className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg hover:bg-emerald-500/30 transition-all flex items-center gap-1 disabled:opacity-50"
                              >
                                {saving === enrollment.id ? (
                                  <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 border border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                                    Confirming...
                                  </span>
                                ) : (
                                  <>
                                    <CheckCircle className="w-3 h-3" />
                                    Confirm
                                  </>
                                )}
                              </button>
                            )}
                            {enrollment.status === 'confirmed' && enrollment.paidAt && (
                              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Paid {new Date(enrollment.paidAt).toLocaleDateString('en-PK')}
                              </span>
                            )}
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              enrollment.status === 'confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {enrollment.status === 'confirmed' ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Zoom link editor */}
                <div className="border-t border-white/10 p-6 bg-white/[0.01]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Zoom Links
                    </h4>
                    {!isEditing && (
                      <button
                        onClick={() =>
                          setEditLinks((prev) => ({
                            ...prev,
                            [batch.id]: { ...batch.zoomLinks },
                          }))
                        }
                        className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs font-bold rounded-lg hover:bg-white/10 transition-all flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-16 font-medium">Session 1</span>
                        <input
                          type="url"
                          value={editForm?.session1 || ''}
                          onChange={(e) =>
                            setEditLinks((prev) => ({
                              ...prev,
                              [batch.id]: { ...prev[batch.id], session1: e.target.value },
                            }))
                          }
                          placeholder={batch.zoomLinks.session1}
                          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-16 font-medium">Session 2</span>
                        <input
                          type="url"
                          value={editForm?.session2 || ''}
                          onChange={(e) =>
                            setEditLinks((prev) => ({
                              ...prev,
                              [batch.id]: { ...prev[batch.id], session2: e.target.value },
                            }))
                          }
                          placeholder={batch.zoomLinks.session2}
                          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 outline-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditLinks((prev) => delete prev[batch.id])}
                          className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 text-xs font-bold rounded-lg hover:bg-white/10 transition-all flex items-center gap-1"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveLinks(batch.id)}
                          disabled={saving !== null}
                          className="px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-lg hover:bg-brand-blue/95 transition-all flex items-center gap-1 disabled:opacity-50"
                        >
                          {saving === batch.id ? (
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                              Saving...
                            </span>
                          ) : (
                            <>
                              <Save className="w-3 h-3" />
                              Save Links
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <LinkIcon className="w-4 h-4 text-brand-blue" />
                        <span className="flex-1truncate">{batch.zoomLinks.session1}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <LinkIcon className="w-4 h-4 text-emerald-400" />
                        <span className="flex-1 truncate">{batch.zoomLinks.session2}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
