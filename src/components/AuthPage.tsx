import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogIn, UserPlus, Mail, Lock, Eye, EyeOff, Check, X,
  Facebook, Apple, BookOpen, Users, Code, Calendar, Shield,
  GraduationCap, ChevronRight
} from 'lucide-react';

// --- Dark split-screen Auth Page ---
// Replicates the design image: dark background, left marketing panel,
// right floating form panel with Login/Create Account tabs.
// Uses brand kit colors: brand blue (#1A4A7C) primary, slate (#0F172A) dark bg.

interface AuthPageProps {
  onBackToHome: () => void;
  onBookCall: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
  onLoginSuccess?: (user: any) => void;
  onNavigate?: (path: string) => void;
}

const cityLabel = (city: string) => {
  if (city === 'all') return 'Pakistan';
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export const AuthPage: React.FC<AuthPageProps> = ({
  onBackToHome,
  onBookCall,
  selectedCity,
  onLoginSuccess,
  onNavigate,
}) => {
  const citySuffix = cityLabel(selectedCity);

  // Auth form state
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regTrack, setRegTrack] = useState('web-dev');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const tracks = [
    { value: 'web-dev', label: 'Web Development (MERN)' },
    { value: 'seo', label: 'SEO & GEO' },
    { value: 'uiux', label: 'UI/UX & Digital Marketing' },
    { value: 'excel', label: 'Advance Excel & Finance' },
    { value: 'accounting', label: 'Computerized Accounting' },
    { value: 'genai', label: 'Generative AI Agents' },
    { value: 'graphic', label: 'Graphic Design' },
    { value: 'office', label: 'Office Automation' },
  ];

  const handleFillDemo = (type: 'student' | 'admin') => {
    setErrorMessage('');
    if (type === 'student') {
      setLoginEmail('student@mentorarena.online');
      setLoginPassword('mentorship2025');
    } else {
      setLoginEmail('admin@mentorarena.online');
      setLoginPassword('admin123');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    const isAdmin = loginEmail.toLowerCase().includes('admin') || loginPassword === 'admin123';
    const rawName = loginEmail.split('@')[0];
    const capitalized = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const userData = {
      email: loginEmail,
      role: isAdmin ? 'admin' : 'student',
      name: isAdmin ? 'Authority Admin' : capitalized,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    };

    try {
      localStorage.setItem('ma_session', JSON.stringify(userData));
    } catch (err) {
      console.warn('LocalStorage unavailable', err);
    }

    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }
    setSuccessMessage(`Welcome back, ${userData.name}! Redirecting to dashboard...`);
    setTimeout(() => {
      onBackToHome();
    }, 700);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userData = {
        email: `${provider.toLowerCase()}.student@mentorarena.online`,
        role: 'student',
        name: `${provider} Student`,
        provider,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      };
      try {
        localStorage.setItem('ma_session', JSON.stringify(userData));
      } catch (err) {
        console.warn('LocalStorage unavailable', err);
      }
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
      setSuccessMessage(`Signed in via ${provider}! Redirecting...`);
      setTimeout(() => onBackToHome(), 600);
    }, 500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirm) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);

    const userData = {
      email: regEmail,
      role: 'student',
      name: regName.trim(),
      phone: regPhone,
      track: regTrack,
      isNewStudent: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    };

    try {
      localStorage.setItem('ma_session', JSON.stringify(userData));
    } catch (err) {
      console.warn('LocalStorage unavailable', err);
    }

    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }
    setSuccessMessage('Account created! Welcome to Mentor Arena. Launching your student portal...');
    setTimeout(() => {
      onBackToHome();
    }, 700);
  };

  const features = [
    { icon: Users, title: 'Expert Mentors', desc: 'Learn from industry professionals' },
    { icon: Users, title: '1-to-1 & Group Classes', desc: 'Flexible learning options' },
    { icon: Code, title: 'Practical Projects', desc: 'Build real-world skills' },
    { icon: Calendar, title: 'Flexible Timings', desc: 'Learn at your convenience' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ===== Top Nav Bar ===== */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-10">
        <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }}
          className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center shrink-0">
            <GraduationCap size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <span className="text-sm font-black text-white tracking-tight">Mentor Arena</span>
            <span className="text-[10px] text-brand-green font-semibold block -mt-0.5">Learn | Build | Grow</span>
          </div>
        </a>

        <div className="hidden sm:flex items-center gap-6">
          {['Home', 'Courses', 'About', 'Why Us', 'Contact'].map((item) => (
            <a key={item} href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }}
              className="text-xs font-bold text-gray-300 hover:text-white transition-colors cursor-pointer uppercase tracking-wider">
              {item}
            </a>
          ))}
        </div>

        <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer border border-white/10">
          <Shield size={14} />
          Login / Register
        </a>
      </nav>

      {/* ===== Split Screen Content ===== */}
      <div className="flex flex-col lg:flex-row overflow-hidden">
        {/* ===== LEFT PANEL — Marketing Content ===== */}
        <div className="relative w-full lg:w-1/2 flex items-center px-8 lg:px-16 py-12 lg:py-0 overflow-hidden">
          {/* Background books stack decoration */}
          <div className="absolute left-0 top-20 lg:top-32 flex lg:block gap-1.5 -ml-2 lg:ml-0 z-0">
            {['Web Development', 'SEO', 'Excel', 'Mobile Apps', 'Digital Accounting'].map((topic, i) => (
              <div key={topic} className="bg-brand-blue/20 backdrop-blur-sm border border-brand-blue/30 rounded-lg px-3 py-2 text-[10px] font-bold text-brand-blue uppercase tracking-wider rotate-[-2deg] lg:rotate-0 lg:bg-brand-blue/10 lg:border-brand-blue/20 lg:text-[11px]">
                {topic}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-lg"
          >
            {/* Logo large */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center">
                <GraduationCap size={30} className="text-white" />
              </div>
              <div>
                <div className="text-xl font-black text-white tracking-tight">Mentor Arena</div>
                <div className="text-[11px] text-brand-green font-semibold uppercase tracking-wider">Learn | Build | Grow</div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
              Your 1-to-1
              <br />
              <span className="text-brand-green">Digital Skill</span> Mentor
            </h1>
            <p className="text-lg text-gray-300 font-medium mb-8 leading-relaxed">
              Personalized online classes. Real skills. A brighter future.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((f) => (
                <div key={f.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-blue/20 rounded-lg flex items-center justify-center shrink-0">
                    <f.icon size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">{f.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tagline Script */}
            <div className="text-brand-green text-2xl font-serif italic -mt-2" style={{ fontFamily: 'serif' }}>
              Your Skills Our Mission
            </div>
          </motion.div>
        </div>

        {/* ===== RIGHT PANEL — Background Image + Form ===== */}
        <div className="relative w-full lg:w-1/2 bg-brand-blue/10 flex items-center justify-center p-6 lg:p-12 overflow-hidden">
          {/* Subtle background pattern — person working motif as abstract shapes */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-10 bottom-10 w-64 h-64 rounded-full bg-brand-blue/30 blur-3xl" />
            <div className="absolute right-20 top-20 w-48 h-48 rounded-full bg-brand-green/20 blur-2xl" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-white/5 blur-2xl" />
          </div>

          {/* Neon-style text in background */}
          <div className="absolute right-8 top-20 lg:right-16 lg:top-32 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green/30 whitespace-nowrap" style={{ fontFamily: 'monospace' }}>
            LEARN · PRACTICE · IMPROVE · SUCCEED
          </div>

          {/* Floating Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40"
          >
            {/* Tabs: Login / Create Account */}
            <div className="flex border-b border-white/10 mb-6 shrink-0">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setErrorMessage(''); setSuccessMessage(''); }}
                className={`flex-1 py-3.5 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
                  activeTab === 'login'
                    ? 'text-white border-brand-blue font-black bg-brand-blue/5'
                    : 'text-gray-400 hover:text-gray-200 border-transparent py-3'
                }`}
              >
                <LogIn size={14} />
                Login
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setErrorMessage(''); setSuccessMessage(''); }}
                className={`flex-1 py-3.5 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
                  activeTab === 'register'
                    ? 'text-white border-brand-green font-black bg-brand-green/5'
                    : 'text-gray-400 hover:text-gray-200 border-transparent py-3'
                }`}
              >
                <UserPlus size={14} />
                Create Account
              </button>
            </div>

            {/* Messages */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300 font-medium"
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-brand-green/10 border border-brand-green/20 rounded-xl text-xs text-brand-green font-medium"
                >
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===== LOGIN FORM ===== */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-brand-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <LogIn size={24} className="text-brand-blue" />
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight">Welcome Back!</h2>
                  <p className="text-xs text-gray-400 mt-1">Sign in to continue your learning journey</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleFillDemo('student')}
                        className="text-[11px] text-brand-green hover:underline font-semibold cursor-pointer"
                      >
                        Demo Student
                      </button>
                      <span className="text-gray-600 text-xs">·</span>
                      <button
                        type="button"
                        onClick={() => handleFillDemo('admin')}
                        className="text-[11px] text-amber-400 hover:underline font-semibold cursor-pointer"
                      >
                        Demo Admin
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-brand-blue focus:ring-brand-blue/30 cursor-pointer"
                    />
                    <span className="text-[11px] text-gray-400 font-medium">Remember me</span>
                  </label>
                  <a href="/" onClick={(e) => { e.preventDefault(); handleFillDemo('student'); }}
                    className="text-[11px] text-gray-400 hover:text-brand-green font-medium cursor-pointer">
                    Need instant access?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn size={15} />
                      <span>Login &rarr;</span>
                    </>
                  )}
                </button>

                {/* Quick Social in Login */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-slate-900/95 px-3">
                    OR QUICK SIGN IN
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="py-2.5 bg-white text-gray-900 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Apple')}
                    className="py-2.5 bg-zinc-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-700 transition-all cursor-pointer"
                  >
                    <Apple size={14} className="text-white" />
                    Apple
                  </button>
                </div>

                <div className="text-center pt-3 border-t border-white/10">
                  <p className="text-[11px] text-gray-400">
                    Don&apos;t have an account?{' '}
                    <button type="button" onClick={() => { setActiveTab('register'); setErrorMessage(''); setSuccessMessage(''); }}
                      className="text-brand-blue font-bold hover:underline cursor-pointer">
                      Create Account
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* ===== REGISTER FORM ===== */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div className="text-center mb-5">
                  <div className="w-12 h-12 bg-brand-green/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <UserPlus size={24} className="text-brand-green" />
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight">Create Account</h2>
                  <p className="text-xs text-gray-400 mt-1">Join Mentor Arena — start your mentorship today</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Muhammad Bilal"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Target Track
                    </label>
                    <select
                      value={regTrack}
                      onChange={(e) => setRegTrack(e.target.value)}
                      className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all appearance-none cursor-pointer"
                    >
                      {tracks.map((t) => (
                        <option key={t.value} value={t.value} className="bg-slate-900 text-white">
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Create Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    placeholder="Repeat your password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-green hover:bg-brand-green/90 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20 cursor-pointer disabled:opacity-60 mt-1"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserPlus size={15} />
                      <span>Create Account &rarr;</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-2.5 border-t border-white/10">
                  <p className="text-[11px] text-gray-400">
                    Already have an account?{' '}
                    <button type="button" onClick={() => { setActiveTab('login'); setErrorMessage(''); setSuccessMessage(''); }}
                      className="text-brand-blue font-bold hover:underline cursor-pointer">
                      Sign in here
                    </button>
                  </p>
                </div>

                {/* Divider OR with social login */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-slate-900/95 px-3">
                    OR
                  </div>
                </div>

                {/* Social Login Buttons */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="w-full py-3 bg-white border border-gray-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all cursor-pointer mb-2.5 text-gray-800"
                >
                  <Facebook size={15} className="text-blue-600" />
                  Continue with Facebook
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="w-full py-3 bg-black border border-white/10 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-900 transition-all cursor-pointer text-gray-300 mb-2.5"
                >
                  <Apple size={15} className="text-white" />
                  Continue with Apple
                </button>

                <div className="text-center pt-1">
                  <p className="text-[11px] text-gray-500">
                    By creating an account, you agree to our{' '}
                    <a href="/" onClick={(e) => { e.preventDefault(); }}
                      className="text-brand-blue font-bold hover:underline cursor-pointer">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/" onClick={(e) => { e.preventDefault(); }}
                      className="text-brand-blue font-bold hover:underline cursor-pointer">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* ===== Bottom Footer ===== */}
      <footer className="bg-slate-950 border-t border-white/5 px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-500">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-brand-blue rounded flex items-center justify-center">
              <GraduationCap size={10} className="text-white" />
            </div>
            <span className="font-bold text-gray-400">Mentor Arena</span>
            <span className="text-gray-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline">Learn | Build | Grow</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-gray-500">1-to-1 Digital Skill Mentor</span>
            <span className="mx-1.5 text-gray-600">|</span>
            <span className="text-gray-500">MERN · SEO · Excel · Mobile Apps · Digital Accounting</span>
          </div>
          <div className="text-brand-green font-serif italic" style={{ fontFamily: 'serif' }}>
            Learn Today Lead Tomorrow
          </div>
        </div>
      </footer>
    </div>
  );
};
