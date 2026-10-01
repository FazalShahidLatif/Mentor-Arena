import React from 'react';
import { motion } from 'motion/react';
import {
  Calendar, CreditCard, LifeBuoy, ArrowRight, Clock, Users,
  CheckCircle, AlertCircle, Plus, Send, FileText, Home,
} from 'lucide-react';

/**
 * Student dashboard — everything scoped to the signed-in student.
 *
 * Sections:
 *   Overview   next class, what's owed, open tickets
 *   Schedule   timetable + Zoom links for the student's own batch(es)
 *   Invoices   monthly billing history and payment status
 *   Support    open a ticket, read and reply to a thread
 *
 * All data comes from /api/my/* and /api/invoices?email= — never from
 * admin-only endpoints.
 */

interface StudentDashboardProps {
  onBackToHome: () => void;
  onNavigate: (path: string) => void;
  userEmail?: string;
  userName?: string;
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
  course?: string;
  schedule?: {
    dayOfWeek: string;
    time: string;
    session1: string;
    break: string;
    session2: string;
    timeZone: string;
  };
  zoomLinks?: { session1?: string; session2?: string };
  syllabus?: string[];
}

interface Invoice {
  id: string;
  monthLabel: string;
  month: string;
  amount: number;
  currency: string;
  status: 'paid' | 'unpaid';
  batchName: string;
  issuedAt: string;
  dueDate: string;
  paidAt: string | null;
}

interface TicketMessage {
  id: string;
  from: string;
  fromRole: 'student' | 'admin';
  body: string;
  at: string;
}

interface Ticket {
  id: string;
  subject: string;
  priority: 'low' | 'normal' | 'high';
  status: 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

type Tab = 'overview' | 'schedule' | 'invoices' | 'support';

const money = (n: number) => new Intl.NumberFormat('en-PK').format(n);
const shortDate = (s?: string | null) =>
  s ? new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const shortTime = (s?: string | null) =>
  s ? new Date(s).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—';

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onBackToHome, onNavigate, userEmail, userName,
}) => {
  const [tab, setTab] = React.useState<Tab>('overview');
  const [email, setEmail] = React.useState(userEmail || '');

  const [enrollments, setEnrollments] = React.useState<Enrollment[]>([]);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  // new ticket form
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [priority, setPriority] = React.useState<'low' | 'normal' | 'high'>('normal');
  const [ticketBusy, setTicketBusy] = React.useState(false);
  const [ticketNote, setTicketNote] = React.useState('');

  // reply box, keyed by ticket id
  const [replyDrafts, setReplyDrafts] = React.useState<Record<string, string>>({});
  const [replyBusy, setReplyBusy] = React.useState('');

  const name = userName || enrollments[0]?.name || 'Student';

  React.useEffect(() => {
    document.title = 'My Dashboard — Mentor Arena';
    return () => { document.title = 'Mentor Arena'; };
  }, []);

  React.useEffect(() => {
    // Fall back to the session cookie / localStorage if no prop was passed in.
    if (!email) {
      try {
        const c = document.cookie.split('; ').find((r) => r.startsWith('ma_session='));
        if (c) setEmail(JSON.parse(decodeURIComponent(c.split('=').slice(1).join('='))).email || '');
      } catch { /* not signed in */ }
      try {
        const e = localStorage.getItem('mentor_arena_student_email');
        if (e) setEmail(e);
      } catch { /* ignore */ }
    }
  }, [email]);

  React.useEffect(() => {
    if (email) load();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [enrRes, batRes, invRes, tktRes] = await Promise.all([
        fetch('/api/my/enrollments'),
        fetch('/api/my/batches'),
        fetch(`/api/invoices?email=${encodeURIComponent(email)}`),
        fetch('/api/tickets'),
      ]);

      // A 401 here means the session cookie is missing or expired.
      if (enrRes.status === 401) {
        setError('Your session has expired. Please sign in again.');
        setLoading(false);
        return;
      }

      setEnrollments(enrRes.ok ? await enrRes.json() : []);
      setBatches(batRes.ok ? await batRes.json() : []);
      setInvoices(invRes.ok ? await invRes.json() : []);
      setTickets(tktRes.ok ? await tktRes.json() : []);
    } catch (e) {
      setError('Could not load your dashboard. Please refresh and try again.');
    }
    setLoading(false);
  };

  const activeEnrollment = enrollments.find((e) => e.status === 'confirmed') || enrollments[0];
  const myBatch = batches.find((b) => b.id === activeEnrollment?.batchId);
  const unpaid = invoices.filter((i) => i.status === 'unpaid');
  const openTickets = tickets.filter((t) => t.status === 'open');

  const submitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketBusy(true);
    setTicketNote('');
    try {
      const r = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message, priority }),
      });
      const body = await r.json();
      if (!r.ok) {
        setTicketNote(body.error || 'Could not create the ticket.');
        return;
      }
      setSubject(''); setMessage(''); setPriority('normal');
      const list = await (await fetch('/api/tickets')).json();
      setTickets(list);
    } catch {
      setTicketNote('Network error — please try again.');
    }
    setTicketBusy(false);
  };

  const sendReply = async (ticketId: string) => {
    const body = (replyDrafts[ticketId] || '').trim();
    if (!body) return;
    setReplyBusy(ticketId);
    try {
      const r = await fetch(`/api/tickets/${ticketId}/reply-student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      if (r.ok) {
        setReplyDrafts((d) => ({ ...d, [ticketId]: '' }));
        const list = await (await fetch('/api/tickets')).json();
        setTickets(list);
      }
    } finally {
      setReplyBusy('');
    }
  };

  const TABS: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'schedule', label: 'My Schedule', icon: Calendar },
    { id: 'invoices', label: 'Billing', icon: CreditCard, badge: unpaid.length || undefined },
    { id: 'support', label: 'Support', icon: LifeBuoy, badge: openTickets.length || undefined },
  ];

  // ---------- shells ----------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020815] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-[#020815] flex items-center justify-center p-4">
        <div className="max-w-md text-center bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="p-4 bg-gray-800/50 rounded-full w-16 h-16 mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to continue</h2>
          <p className="text-gray-400 text-sm mb-6">
            Your dashboard is tied to your account, so we need you signed in first.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => onNavigate('/auth')}
              className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-blue/95 transition-all flex items-center gap-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">My Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">{name} · {email}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={load}
          className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-all"
        >
          Refresh
        </button>
        <button
          onClick={onBackToHome}
          className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Home
        </button>
      </div>
    </div>
  );

  const tabs = (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`relative px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            tab === t.id
              ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
          }`}
        >
          <t.icon className="w-4 h-4" />
          {t.label}
          {t.badge ? (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black">
              {t.badge}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );

  const empty = (
    <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
      <div className="p-4 bg-gray-800/50 rounded-full w-16 h-16 mx-auto mb-4">
        <Users className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Nothing here yet</h3>
      <p className="text-gray-400 text-sm mb-6">
        {error || 'Enroll in a batch to unlock your schedule, billing and support.'}
      </p>
      <button
        onClick={() => onNavigate('/enroll')}
        className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-blue/95 transition-all inline-flex items-center gap-2"
      >
        Enroll Now <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );

  // ---------- overview ----------

  const overview = (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {enrollments.length === 0 ? empty : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Enrolled batch</p>
              <p className="text-lg font-black text-white">{activeEnrollment?.batchName || '—'}</p>
              <p className="text-xs text-gray-400 mt-1">
                Status: <span className={activeEnrollment?.status === 'confirmed' ? 'text-green-400 font-bold' : 'text-amber-400 font-bold'}>
                  {activeEnrollment?.status || 'pending'}
                </span>
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Outstanding</p>
              <p className="text-lg font-black text-white">
                PKR {money(unpaid.reduce((s, i) => s + i.amount, 0))}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {unpaid.length === 0 ? 'All paid — thank you' : `${unpaid.length} invoice${unpaid.length > 1 ? 's' : ''} due`}
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Open tickets</p>
              <p className="text-lg font-black text-white">{openTickets.length}</p>
              <p className="text-xs text-gray-400 mt-1">
                {openTickets.length === 0 ? 'No pending support requests' : 'We usually reply within a day'}
              </p>
            </div>
          </div>

          {myBatch?.schedule && (
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-brand-blue" />
                <h3 className="text-lg font-bold text-white">Next session</h3>
              </div>
              <p className="text-white font-semibold">{myBatch.schedule.dayOfWeek}</p>
              <p className="text-gray-400 text-sm mt-1">{myBatch.schedule.time} · {myBatch.schedule.timeZone}</p>
              <div className="flex flex-wrap gap-3 mt-5">
                {myBatch.zoomLinks?.session1 && (
                  <a
                    href={myBatch.zoomLinks.session1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all"
                  >
                    Join Session 1 · {myBatch.schedule.session1}
                  </a>
                )}
                {myBatch.zoomLinks?.session2 && (
                  <a
                    href={myBatch.zoomLinks.session2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
                  >
                    Join Session 2 · {myBatch.schedule.session2}
                  </a>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  // ---------- schedule ----------

  const schedule = (
    <div className="space-y-6">
      {batches.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
          <Calendar className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">No timetable yet. Enroll in a batch to see your sessions.</p>
        </div>
      ) : batches.map((b) => (
        <div key={b.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-1">{b.name}</h3>
          {b.course && <p className="text-brand-blue text-sm font-semibold mb-4">{b.course}</p>}

          {b.schedule ? (
            <div className="grid gap-3 sm:grid-cols-3 mb-5">
              <div className="p-4 bg-black/20 rounded-xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Days</p>
                <p className="text-white font-semibold text-sm">{b.schedule.dayOfWeek}</p>
              </div>
              <div className="p-4 bg-black/20 rounded-xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Session 1</p>
                <p className="text-white font-semibold text-sm">{b.schedule.session1}</p>
              </div>
              <div className="p-4 bg-black/20 rounded-xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Session 2</p>
                <p className="text-white font-semibold text-sm">{b.schedule.session2}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-4">Schedule not published yet.</p>
          )}

          <div className="flex flex-wrap gap-3">
            {b.zoomLinks?.session1 && (
              <a
                href={b.zoomLinks.session1}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all"
              >
                Join Session 1
              </a>
            )}
            {b.zoomLinks?.session2 && (
              <a
                href={b.zoomLinks.session2}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
              >
                Join Session 2
              </a>
            )}
            {!b.zoomLinks?.session1 && !b.zoomLinks?.session2 && (
              <p className="text-xs text-gray-500">Zoom links will appear here once published.</p>
            )}
          </div>

          {b.syllabus && b.syllabus.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" /> What you'll cover
              </h4>
              <ul className="space-y-2">
                {b.syllabus.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-400">
                    <span className="text-brand-green font-bold">{i + 1}.</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // ---------- invoices ----------

  const billing = (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Billing summary</h3>
          <p className="text-gray-400 text-sm">
            {invoices.length === 0
              ? 'No invoices issued yet.'
              : `${invoices.length} invoice${invoices.length > 1 ? 's' : ''} · ${unpaid.length} unpaid · PKR ${money(invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0))} settled`}
          </p>
        </div>
        {unpaid.length > 0 && (
          <div className="text-right">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Amount due</p>
            <p className="text-2xl font-black text-amber-400">
              PKR {money(unpaid.reduce((s, i) => s + i.amount, 0))}
            </p>
          </div>
        )}
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <CreditCard className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">
            Once your first payment is confirmed, your monthly invoice will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices.map((inv) => {
            const overdue = inv.status === 'unpaid' && new Date(inv.dueDate) < new Date();
            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 border rounded-2xl flex flex-wrap items-center justify-between gap-4 ${
                  inv.status === 'paid'
                    ? 'bg-green-500/5 border-green-500/20'
                    : overdue
                      ? 'bg-red-500/5 border-red-500/30'
                      : 'bg-white/5 border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold">{inv.monthLabel}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      inv.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {inv.status === 'paid' ? 'Paid' : overdue ? 'Overdue' : 'Due'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{inv.batchName} · Issued {shortDate(inv.issuedAt)}</p>
                  {inv.status === 'unpaid' && (
                    <p className="text-xs text-gray-500 mt-1">
                      Due {shortDate(inv.dueDate)} · Pay via JazzCash or Zindigi on the booking page
                    </p>
                  )}
                  {inv.status === 'paid' && inv.paidAt && (
                    <p className="text-xs text-green-500/80 mt-1">Settled {shortDate(inv.paidAt)}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-white">PKR {money(inv.amount)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ---------- support ----------

  const support = (
    <div className="space-y-6">
      <form onSubmit={submitTicket} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
        <div className="flex items-center gap-2 mb-5">
          <LifeBuoy className="w-5 h-5 text-brand-blue" />
          <h3 className="text-lg font-bold text-white">Ask for help</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="ticket-subject" className="block text-sm font-semibold text-gray-300 mb-2">Subject</label>
            <input
              id="ticket-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Session 2 Zoom link is not opening"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <div>
            <label htmlFor="ticket-priority" className="block text-sm font-semibold text-gray-300 mb-2">Priority</label>
            <select
              id="ticket-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-blue transition-colors"
            >
              <option value="low">Low — no rush</option>
              <option value="normal">Normal</option>
              <option value="high">High — blocking my work</option>
            </select>
          </div>

          <div>
            <label htmlFor="ticket-message" className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
            <textarea
              id="ticket-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Describe the problem and I'll get back to you."
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors resize-y"
            />
          </div>

          {ticketNote && (
            <p className="text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {ticketNote}
            </p>
          )}

          <button
            type="submit"
            disabled={ticketBusy || !subject.trim() || !message.trim()}
            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {ticketBusy ? 'Sending...' : <><Send className="w-4 h-4" /> Send ticket</>}
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">Your tickets</h3>
        {tickets.length === 0 ? (
          <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
            <LifeBuoy className="w-10 h-10 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No support tickets yet. Raise one above if you need help.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((t) => (
              <div key={t.id} className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-white font-bold">{t.subject}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        t.status === 'open' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {t.status}
                      </span>
                      {t.priority === 'high' && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-wider">
                          High
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Opened {shortTime(t.createdAt)}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {t.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-4 rounded-xl ${
                        m.fromRole === 'admin'
                          ? 'bg-brand-blue/10 border border-brand-blue/20'
                          : 'bg-black/20 border border-white/5'
                      }`}
                    >
                      <p className="text-xs font-bold text-gray-400 mb-1">
                        {m.fromRole === 'admin' ? 'Mentor Arena' : 'You'} · {shortTime(m.at)}
                      </p>
                      <p className="text-sm text-gray-200 whitespace-pre-wrap break-words">{m.body}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyDrafts[t.id] || ''}
                    onChange={(e) => setReplyDrafts((d) => ({ ...d, [t.id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') sendReply(t.id); }}
                    placeholder="Add a reply..."
                    aria-label={`Reply to ${t.subject}`}
                    className="flex-1 px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
                  />
                  <button
                    onClick={() => sendReply(t.id)}
                    disabled={replyBusy === t.id || !(replyDrafts[t.id] || '').trim()}
                    className="px-5 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {replyBusy === t.id ? '...' : 'Reply'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020815] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {header}
        {tabs}
        {tab === 'overview' && overview}
        {tab === 'schedule' && schedule}
        {tab === 'invoices' && billing}
        {tab === 'support' && support}
      </div>
    </div>
  );
};
