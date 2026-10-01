import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard, Users, CreditCard, LifeBuoy, Shield, ArrowRight,
  RefreshCw, Send, Check, AlertCircle, TrendingUp, UserPlus, Download,
} from 'lucide-react';

/**
 * Admin dashboard — the operational side.
 *
 * Sections:
 *   Overview   money in, seats filled, outstanding fees, open tickets
 *   Students   enrollments, approve, mark paid, see contact details
 *   Billing    generate this month's invoices, mark paid, remind unpaid
 *   Support    reply to tickets in a thread, close them
 *   Access     superadmin only — assign roles, create admin accounts
 *
 * Everything here is admin-scoped; students cannot reach these endpoints.
 */

interface AdminDashboardProps {
  onBackToHome: () => void;
  onNavigate: (path: string) => void;
}

interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  batchId: string;
  batchName: string;
  status: string;
  enrolledAt: string;
  paidAt: string | null;
  note?: string;
}

interface Batch {
  id: string;
  name: string;
  maxSeats: number;
  enrolled: number;
  course?: string;
  monthlyFee?: number;
  zoomLinks?: { session1?: string; session2?: string };
}

interface Invoice {
  id: string;
  studentEmail: string;
  studentName: string;
  batchName: string;
  month: string;
  monthLabel: string;
  amount: number;
  status: 'paid' | 'unpaid';
  issuedAt: string;
  dueDate: string;
  paidAt: string | null;
  remindedAt: string | null;
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
  studentEmail: string;
  subject: string;
  priority: 'low' | 'normal' | 'high';
  status: 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

interface User {
  email: string;
  name?: string;
  role?: string;
  status?: string;
  createdAt?: string;
}

type Tab = 'overview' | 'students' | 'billing' | 'support' | 'access';

const money = (n: number) => new Intl.NumberFormat('en-PK').format(n);
const shortDate = (s?: string | null) =>
  s ? new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const shortTime = (s?: string | null) =>
  s ? new Date(s).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—';

const ROLES = ['student', 'mentor', 'staff', 'admin', 'superadmin'];
const INVITABLE = ['mentor', 'staff', 'admin'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onNavigate }) => {
  const [tab, setTab] = React.useState<Tab>('overview');
  const [enrollments, setEnrollments] = React.useState<Enrollment[]>([]);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [busy, setBusy] = React.useState('');
  const [flash, setFlash] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [query, setQuery] = React.useState('');

  const [replyDrafts, setReplyDrafts] = React.useState<Record<string, string>>({});

  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState('admin');
  const [roleEmail, setRoleEmail] = React.useState('');
  const [roleValue, setRoleValue] = React.useState('student');

  const notify = (type: 'success' | 'error', text: string) => {
    setFlash({ type, text });
    setTimeout(() => setFlash(null), 5000);
  };

  React.useEffect(() => {
    document.title = 'Admin Dashboard — Mentor Arena';
    return () => { document.title = 'Mentor Arena'; };
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const [enrRes, batRes, invRes, tktRes, usrRes] = await Promise.all([
        fetch('/api/admin/enrollments'),
        fetch('/api/admin/batches'),
        fetch('/api/invoices'),
        fetch('/api/tickets'),
        fetch('/api/admin/users'),
      ]);

      if (enrRes.status === 401 || enrRes.status === 503) {
        notify('error', enrRes.status === 503
          ? 'Admin password is not configured yet.'
          : 'Your admin session expired — please sign in again.');
      }
      setEnrollments(enrRes.ok ? await enrRes.json() : []);
      setBatches(batRes.ok ? await batRes.json() : []);
      setInvoices(invRes.ok ? await invRes.json() : []);
      setTickets(tktRes.ok ? await tktRes.json() : []);
      setUsers(usrRes.ok ? await usrRes.json() : []);
    } catch {
      notify('error', 'Could not load the dashboard.');
    }
    setLoading(false);
  };

  React.useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const json = async (url: string, opts: RequestInit = {}) => {
    const r = await fetch(url, {
      ...opts,
      headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    });
    const body = await r.json().catch(() => ({}));
    return { ok: r.ok, status: r.status, body };
  };

  // ---------- actions ----------

  const markEnrollmentPaid = async (id: string) => {
    setBusy(id);
    const r = await json('/api/admin/enrollment/pay', {
      method: 'POST',
      body: JSON.stringify({ enrollmentId: id }),
    });
    if (r.ok) {
      setEnrollments((list) => list.map((e) =>
        e.id === id ? { ...e, status: 'confirmed', paidAt: new Date().toISOString() } : e));
      notify('success', 'Payment recorded.');
    } else {
      notify('error', r.body.error || 'Could not record payment.');
    }
    setBusy('');
  };

  const generateInvoices = async () => {
    setBusy('generate');
    const r = await json('/api/admin/invoices/generate', { method: 'POST' });
    if (r.ok) {
      const inv = await json('/api/invoices');
      if (inv.ok) setInvoices(inv.body);
      notify('success',
        r.body.created > 0
          ? `Generated ${r.body.created} invoice(s) for ${r.body.monthLabel}.`
          : r.body.message || `No new invoices needed for ${r.body.monthLabel}.`);
    } else {
      notify('error', r.body.error || 'Could not generate invoices.');
    }
    setBusy('');
  };

  const toggleInvoice = async (inv: Invoice) => {
    setBusy(inv.id);
    const next = inv.status === 'paid' ? 'unpaid' : 'paid';
    const r = await json(`/api/admin/invoices/${inv.id}`, {
      method: 'POST',
      body: JSON.stringify({ status: next }),
    });
    if (r.ok) {
      setInvoices((list) => list.map((i) =>
        i.id === inv.id
          ? { ...i, status: next, paidAt: next === 'paid' ? new Date().toISOString() : null }
          : i));
      notify('success', `Invoice marked ${next}.`);
    } else {
      notify('error', r.body.error || 'Could not update invoice.');
    }
    setBusy('');
  };

  const sendReminders = async () => {
    setBusy('remind');
    const r = await json('/api/admin/invoices/remind', { method: 'POST', body: JSON.stringify({}) });
    if (r.ok) {
      const inv = await json('/api/invoices');
      if (inv.ok) setInvoices(inv.body);
      if (r.body.total === 0) notify('success', r.body.message || 'No unpaid invoices.');
      else notify('success', `Reminder sent to ${r.body.sent} of ${r.body.total} unpaid student(s).`);
    } else {
      notify('error', r.body.error || 'Could not send reminders.');
    }
    setBusy('');
  };

  const replyToTicket = async (t: Ticket, close: boolean) => {
    const body = (replyDrafts[t.id] || '').trim();
    if (!body && !close) return;
    setBusy(t.id);
    const r = await json(`/api/tickets/${t.id}/reply`, {
      method: 'POST',
      body: JSON.stringify({
        body: body || 'Closing this ticket.',
        status: close ? 'closed' : undefined,
      }),
    });
    if (r.ok) {
      setReplyDrafts((d) => ({ ...d, [t.id]: '' }));
      const list = await json('/api/tickets');
      if (list.ok) setTickets(list.body);
      notify('success', close ? 'Ticket closed.' : 'Reply sent and emailed to the student.');
    } else {
      notify('error', r.body.error || 'Could not reply.');
    }
    setBusy('');
  };

  const assignRole = async () => {
    if (!roleEmail.trim()) return;
    setBusy('role');
    const r = await json('/api/admin/users/role', {
      method: 'POST',
      body: JSON.stringify({ email: roleEmail.trim(), role: roleValue }),
    });
    if (r.ok) {
      const list = await json('/api/admin/users');
      if (list.ok) setUsers(list.body);
      setRoleEmail('');
      notify('success', `${r.body.email} is now ${r.body.role}.`);
    } else {
      notify('error', r.body.error || 'Could not assign role.');
    }
    setBusy('');
  };

  const inviteAdmin = async () => {
    if (!inviteEmail.trim()) return;
    setBusy('invite');
    const r = await json('/api/admin/users/invite', {
      method: 'POST',
      body: JSON.stringify({ email: inviteEmail.trim(), role: inviteRole }),
    });
    if (r.ok) {
      const list = await json('/api/admin/users');
      if (list.ok) setUsers(list.body);
      setInviteEmail('');
      notify('success', `${r.body.email} invited as ${r.body.role}.`);
    } else {
      notify('error', r.body.error || 'Could not create the account.');
    }
    setBusy('');
  };

  // ---------- derived ----------

  const confirmed = enrollments.filter((e) => e.status === 'confirmed');
  const pending = enrollments.filter((e) => e.status !== 'confirmed');
  const collected = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status === 'unpaid');
  const outstandingTotal = outstanding.reduce((s, i) => s + i.amount, 0);
  const openTickets = tickets.filter((t) => t.status === 'open');
  const totalSeats = batches.reduce((s, b) => s + (b.maxSeats || 0), 0);
  const seatsTaken = batches.reduce((s, b) => s + (b.enrolled || 0), 0);

  const filteredEnrollments = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enrollments;
    return enrollments.filter((e) =>
      [e.name, e.email, e.phone, e.city, e.batchName].some((v) => (v || '').toLowerCase().includes(q)));
  }, [enrollments, query]);

  const TABS: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users, badge: pending.length || undefined },
    { id: 'billing', label: 'Billing', icon: CreditCard, badge: outstanding.length || undefined },
    { id: 'support', label: 'Support', icon: LifeBuoy, badge: openTickets.length || undefined },
    { id: 'access', label: 'Access', icon: Shield },
  ];

  // ---------- shells ----------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020815] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Mentor Arena operations</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={load}
          className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
        <button
          onClick={onBackToHome}
          className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Site
        </button>
      </div>
    </div>
  );

  const flashBar = flash && (
    <div className={`mb-6 p-4 rounded-xl text-sm flex items-center gap-2 border ${
      flash.type === 'success'
        ? 'bg-green-500/10 border-green-500/30 text-green-300'
        : 'bg-red-500/10 border-red-500/30 text-red-300'
    }`}>
      {flash.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      {flash.text}
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
            <span className="ml-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black">{t.badge}</span>
          ) : null}
        </button>
      ))}
    </div>
  );

  // ---------- views ----------

  const overview = (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Collected', value: `PKR ${money(collected)}`, sub: `${invoices.filter((i) => i.status === 'paid').length} paid invoice(s)`, tone: 'text-green-400' },
          { label: 'Outstanding', value: `PKR ${money(outstandingTotal)}`, sub: `${outstanding.length} unpaid`, tone: outstandingTotal ? 'text-amber-400' : 'text-gray-400' },
          { label: 'Seats filled', value: `${seatsTaken} / ${totalSeats}`, sub: `${totalSeats - seatsTaken} open`, tone: 'text-brand-blue' },
          { label: 'Active students', value: String(confirmed.length), sub: `${pending.length} awaiting payment`, tone: 'text-white' },
        ].map((s) => (
          <div key={s.label} className="p-5 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{s.label}</p>
            <p className={`text-xl font-black ${s.tone}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-blue" /> Needs your attention
          </h3>
          {pending.length === 0 && outstanding.length === 0 && openTickets.length === 0 ? (
            <p className="text-gray-400 text-sm">Nothing outstanding. All clear.</p>
          ) : (
            <ul className="space-y-2">
              {pending.length > 0 && (
                <li className="text-sm text-amber-300">
                  {pending.length} enrollment{pending.length > 1 ? 's' : ''} awaiting payment confirmation
                </li>
              )}
              {outstanding.length > 0 && (
                <li className="text-sm text-amber-300">{outstanding.length} unpaid invoice(s) — PKR {money(outstandingTotal)}</li>
              )}
              {openTickets.length > 0 && (
                <li className="text-sm text-blue-300">{openTickets.length} open support ticket(s)</li>
              )}
            </ul>
          )}
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">This month's billing</h3>
          <p className="text-gray-400 text-sm mb-5">
            Generates one invoice per confirmed student for the current month. Safe to run more than once.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={generateInvoices}
              disabled={busy === 'generate'}
              className="px-5 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-40 inline-flex items-center gap-2"
            >
              {busy === 'generate' ? 'Generating...' : <><CreditCard className="w-4 h-4" /> Generate invoices</>}
            </button>
            <button
              onClick={sendReminders}
              disabled={busy === 'remind'}
              className="px-5 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-all disabled:opacity-40 inline-flex items-center gap-2"
            >
              {busy === 'remind' ? 'Sending...' : <><Send className="w-4 h-4" /> Remind unpaid ({outstanding.length})</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const students = (
    <div className="space-y-6">
      <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, phone, city or batch..."
          aria-label="Search enrollments"
          className="flex-1 min-w-[240px] px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
        />
        <p className="text-sm text-gray-400">
          {filteredEnrollments.length} of {enrollments.length} enrollment(s)
        </p>
      </div>

      {filteredEnrollments.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <Users className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">
            {enrollments.length === 0 ? 'No enrollments yet. They will appear here as students sign up.' : 'No matches for that search.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEnrollments.map((e) => {
            const confirmedRow = e.status === 'confirmed';
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 border rounded-2xl flex flex-wrap items-center justify-between gap-4 ${
                  confirmedRow ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="min-w-[220px] flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-white font-bold">{e.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      confirmedRow ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {confirmedRow ? 'Confirmed' : 'Awaiting payment'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{e.email}{e.phone ? ` · ${e.phone}` : ''}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {e.batchName}{e.city ? ` · ${e.city}` : ''} · joined {shortDate(e.enrolledAt)}
                  </p>
                  {e.note && <p className="text-xs text-gray-400 italic mt-2">“{e.note}”</p>}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${e.email}`}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-sm hover:bg-white/10 transition-all"
                  >
                    Email
                  </a>
                  {!confirmedRow && (
                    <button
                      onClick={() => markEnrollmentPaid(e.id)}
                      disabled={busy === e.id}
                      className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-bold hover:bg-brand-blue/95 transition-all disabled:opacity-40"
                    >
                      {busy === e.id ? '...' : 'Mark paid'}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );

  const billing = (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Monthly invoices</h3>
          <p className="text-gray-400 text-sm">
            {invoices.length} invoice(s) · PKR {money(collected)} collected · PKR {money(outstandingTotal)} outstanding
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={generateInvoices}
            disabled={busy === 'generate'}
            className="px-5 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-40"
          >
            {busy === 'generate' ? 'Generating...' : 'Generate this month'}
          </button>
          <button
            onClick={sendReminders}
            disabled={busy === 'remind' || outstanding.length === 0}
            className="px-5 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-all disabled:opacity-40 inline-flex items-center gap-2"
          >
            {busy === 'remind' ? 'Sending...' : <><Send className="w-4 h-4" /> Remind unpaid</>}
          </button>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <CreditCard className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-sm mb-5">
            No invoices yet. Confirm a student's payment, then generate this month's invoices.
          </p>
          <button
            onClick={generateInvoices}
            disabled={busy === 'generate'}
            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-40"
          >
            Generate now
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices.map((inv) => {
            const overdue = inv.status === 'unpaid' && new Date(inv.dueDate) < new Date();
            return (
              <div
                key={inv.id}
                className={`p-5 border rounded-2xl flex flex-wrap items-center justify-between gap-4 ${
                  inv.status === 'paid'
                    ? 'bg-green-500/5 border-green-500/20'
                    : overdue ? 'bg-red-500/5 border-red-500/30' : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="min-w-[220px] flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-white font-bold">{inv.studentName}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      inv.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {inv.status === 'paid' ? 'Paid' : overdue ? 'Overdue' : 'Unpaid'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{inv.studentEmail} · {inv.batchName}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {inv.monthLabel} · due {shortDate(inv.dueDate)}
                    {inv.remindedAt && ` · reminded ${shortDate(inv.remindedAt)}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-xl font-black text-white">PKR {money(inv.amount)}</p>
                  <button
                    onClick={() => toggleInvoice(inv)}
                    disabled={busy === inv.id}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-40 ${
                      inv.status === 'paid'
                        ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                        : 'bg-brand-blue text-white hover:bg-brand-blue/95'
                    }`}
                  >
                    {busy === inv.id ? '...' : inv.status === 'paid' ? 'Mark unpaid' : 'Mark paid'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const support = (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white">
        Support tickets {openTickets.length > 0 && <span className="text-brand-blue">({openTickets.length} open)</span>}
      </h3>

      {tickets.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <LifeBuoy className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">No support tickets. Students can raise one from their dashboard.</p>
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
                  <p className="text-xs text-gray-500">{t.studentEmail} · opened {shortTime(t.createdAt)}</p>
                </div>
                <a
                  href={`mailto:${t.studentEmail}`}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-sm hover:bg-white/10 transition-all"
                >
                  Email student
                </a>
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
                      {m.fromRole === 'admin' ? 'You' : m.from} · {shortTime(m.at)}
                    </p>
                    <p className="text-sm text-gray-200 whitespace-pre-wrap break-words">{m.body}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={replyDrafts[t.id] || ''}
                  onChange={(e) => setReplyDrafts((d) => ({ ...d, [t.id]: e.target.value }))}
                  placeholder="Write a reply — it will be emailed to the student"
                  aria-label={`Reply to ${t.subject}`}
                  className="flex-1 min-w-[220px] px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
                />
                <button
                  onClick={() => replyToTicket(t, false)}
                  disabled={busy === t.id || !(replyDrafts[t.id] || '').trim()}
                  className="px-5 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-40"
                >
                  {busy === t.id ? '...' : 'Reply'}
                </button>
                {t.status === 'open' && (
                  <button
                    onClick={() => replyToTicket(t, true)}
                    disabled={busy === t.id}
                    className="px-5 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-all disabled:opacity-40"
                  >
                    Close ticket
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const access = (
    <div className="space-y-6">
      <div className="p-5 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-200">
          Only the superadmin (the holder of the admin password) can assign roles or create admin accounts.
          Changes take effect immediately.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Assign a role</h3>
          <div className="space-y-3">
            <input
              type="email"
              value={roleEmail}
              onChange={(e) => setRoleEmail(e.target.value)}
              placeholder="student@example.com"
              aria-label="Email to assign a role to"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
            />
            <select
              value={roleValue}
              onChange={(e) => setRoleValue(e.target.value)}
              aria-label="Role to assign"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-blue transition-colors"
            >
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button
              onClick={assignRole}
              disabled={busy === 'role' || !roleEmail.trim()}
              className="px-5 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-40 w-full"
            >
              {busy === 'role' ? 'Saving...' : 'Assign role'}
            </button>
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-brand-blue" /> Create an admin account
          </h3>
          <div className="space-y-3">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="teammate@example.com"
              aria-label="Email to invite as admin"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              aria-label="Role for the new admin"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-blue transition-colors"
            >
              {INVITABLE.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button
              onClick={inviteAdmin}
              disabled={busy === 'invite' || !inviteEmail.trim()}
              className="px-5 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-40 w-full"
            >
              {busy === 'invite' ? 'Creating...' : 'Create account'}
            </button>
            <p className="text-xs text-gray-500">
              Superadmin cannot be granted by invite — that role is reserved for you.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4">People with accounts</h3>
        {users.length === 0 ? (
          <div className="text-center py-10 bg-white/5 border border-white/10 rounded-2xl">
            <Users className="w-10 h-10 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No accounts yet. Roles you assign will appear here.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((u) => (
              <div
                key={u.email}
                className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <p className="text-white font-semibold text-sm">{u.name || u.email}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  u.role === 'superadmin' ? 'bg-purple-500/20 text-purple-300'
                    : u.role === 'admin' ? 'bg-brand-blue/20 text-brand-blue'
                      : 'bg-white/10 text-gray-400'
                }`}>
                  {u.role || 'student'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020815] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {header}
        {flashBar}
        {tabs}
        {tab === 'overview' && overview}
        {tab === 'students' && students}
        {tab === 'billing' && billing}
        {tab === 'support' && support}
        {tab === 'access' && access}
      </div>
    </div>
  );
};
