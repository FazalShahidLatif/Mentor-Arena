import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Users, 
  BookOpen, 
  Zap, 
  CheckCircle, 
  MessageSquare, 
  ArrowRight, 
  Menu, 
  X,
  Clock,
  Wallet,
  Calendar,
  Award,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Edit3,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Plus,
  Trash2
} from 'lucide-react';
import { BUSINESS_INFO, PRICING, SKILL_PATHS, TIME_SLOTS, COMPARISON_DATA, FAQ_DATA, DAILY_SCHEDULE } from './constants';

// --- Types & Defaults ---

interface LayoutConfig {
  sections: {
    hero: boolean;
    who: boolean;
    courses: boolean;
    method: boolean;
    comparison: boolean;
    pricing: boolean;
    how: boolean;
    schedule: boolean;
    booking: boolean;
    about: boolean;
    faq: boolean;
    cta: boolean;
  };
  images: {
    mentor: string;
    heroBg?: string;
    methodVideo?: string;
    methodPoster?: string;
  };
  availability: {
    clarityCalls: boolean[];
    mentorshipSessions: boolean[];
  };
  content: {
    skillPaths: string[];
    timeSlots: string[];
  };
}

const DEFAULT_LAYOUT: LayoutConfig = {
  sections: {
    hero: true,
    who: true,
    courses: true,
    method: true,
    comparison: true,
    pricing: true,
    how: true,
    schedule: true,
    booking: true,
    about: true,
    faq: true,
    cta: true,
  },
  images: {
    mentor: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=800",
    heroBg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920&h=1080",
    methodVideo: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
    methodPoster: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
  },
  availability: {
    clarityCalls: [true, true],
    mentorshipSessions: [true, true],
  },
  content: {
    skillPaths: [...SKILL_PATHS],
    timeSlots: [...TIME_SLOTS]
  }
};

// --- Components ---

const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-bold text-brand-blue">Mentor <span className="text-brand-green">Arena</span></span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Online 1x1 Coaching</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#courses" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Courses</a>
            <a href="#method" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Method</a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-blue transition-colors font-medium">Pricing</a>
            <a href="#booking" className="bg-brand-blue text-white px-6 py-2.5 rounded-full hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 font-bold">Book Now</a>
            <button onClick={onAdminClick} className="text-gray-400 hover:text-brand-blue transition-colors">
              <LayoutDashboard size={20} />
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#courses" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600">Courses</a>
              <a href="#method" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600">Method</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600">Pricing</a>
              <a href="#booking" onClick={() => setIsOpen(false)} className="block px-3 py-2 bg-brand-blue text-white rounded-lg text-center font-bold">Book Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = ({ heroBg }: { heroBg?: string }) => (
  <section className="pt-32 pb-20 px-4 relative overflow-hidden">
    {heroBg && (
      <div className="absolute inset-0 -z-10 opacity-5">
        <img src={heroBg} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
    )}
    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10">
          Premium Digital Mentorship in Pakistan
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
          Turn Your Effort Into <br />
          <span className="text-brand-blue relative inline-block">
            Real Digital Skills
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-1 left-0 h-2 bg-brand-green/30 -z-10 rounded-full"
            ></motion.span>
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Students are raw power like flowing water. Mentor Arena provides the channel so your hard work becomes real projects and career opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#booking" className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-blue/20">
            Start Your Journey <ArrowRight size={20} />
          </a>
          <a href="#courses" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all">
            View Courses
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const WhoThisIsFor = () => (
  <section className="py-20 bg-gray-50 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Who This Is For</h2>
        <p className="text-gray-600">Designed for the ambitious youth of Pakistan.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Users, title: "Students", desc: "University students looking to gain practical skills that degrees don't teach." },
          { icon: Zap, title: "Career Switchers", desc: "Young professionals wanting to move into the high-demand digital economy." },
          { icon: Award, title: "Self-Starters", desc: "Anyone with a laptop and a dream to build their own digital niche." }
        ].map((item, i) => (
          <div key={i} className="floating-card p-8">
            <item.icon className="text-brand-blue mb-6 w-10 h-10" />
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CoursesOffered = ({ paths }: { paths: string[] }) => (
  <section id="courses" className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Skill Paths We Master</h2>
        <p className="text-gray-600">Choose your niche. We adapt our mentorship to your goal.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 bg-white border border-gray-100 rounded-xl hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-2 transition-all flex items-center gap-4 cursor-default"
          >
            <div className="w-12 h-12 bg-brand-blue/5 rounded-lg flex items-center justify-center group-hover:bg-brand-blue transition-colors">
              <CheckCircle className="text-brand-blue group-hover:text-white transition-colors" />
            </div>
            <span className="font-semibold text-gray-800">{path}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const MethodSection = ({ videoUrl, posterUrl }: { videoUrl?: string, posterUrl?: string }) => (
  <section id="method" className="py-20 bg-brand-blue text-white px-4 overflow-hidden relative">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The "Real-World" Method</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Student-Owned Projects</h4>
                <p className="text-blue-50">You don't follow a dummy tutorial. You choose a real project or niche you care about, and we build it together.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Parallel Theory & Practice</h4>
                <p className="text-blue-50">No boring long lectures. We explain a concept and apply it immediately to your project. Learning by doing is the only way.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="text-xl font-bold mb-2">The Ultimate Certificate</h4>
                <p className="text-blue-50">“One real, working project built by the student is the certificate that truly matters.” Your portfolio is your proof.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
          {videoUrl ? (
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              <video 
                src={videoUrl} 
                poster={posterUrl}
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                muted 
                loop 
                playsInline
                preload="auto"
              />
            </div>
          ) : (
            <div className="aspect-video bg-brand-blue/50 rounded-xl flex items-center justify-center italic text-blue-50 text-center px-6">
              "Mentor Arena cuts the noise so your effort becomes productive. Every project is unique, like human DNA."
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Mentor Arena?</h2>
        <p className="text-gray-600">How we differ from conventional institutes.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-4 border-b border-gray-200 font-bold">Feature</th>
              <th className="p-4 border-b border-gray-200 font-bold text-red-600">Conventional</th>
              <th className="p-4 border-b border-gray-200 font-bold text-brand-green">Mentor Arena</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b border-gray-100 font-semibold">{row.feature}</td>
                <td className="p-4 border-b border-gray-100 text-gray-500 text-sm">{row.conventional}</td>
                <td className="p-4 border-b border-gray-100 text-gray-900 font-medium">{row.mentorArena}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="py-20 bg-gray-50 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Honest Pricing</h2>
        <p className="text-gray-600">No hidden fees. Invest in your future.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[PRICING.clarityCall, PRICING.oneToOne, PRICING.group].map((plan, i) => (
          <div key={i} className={`floating-card p-8 flex flex-col ${i === 1 ? 'border-brand-blue ring-4 ring-brand-blue/5 scale-105 z-10' : ''} relative`}>
            {i === 1 && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Most Popular</span>}
            <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</div>
            <div className="flex items-center gap-2 text-gray-500 mb-6 text-sm">
              <Clock size={16} /> {plan.duration}
            </div>
            <p className="text-gray-600 mb-8 flex-grow">{plan.description}</p>
            <a href="#booking" className={`w-full py-3 rounded-xl font-bold text-center transition-all ${i === 1 ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
              Select Plan
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600">Four simple steps to start your career.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "Clarity Call", desc: "Book a 15-min call to discuss your goals." },
          { title: "Payment", desc: "Pay via Easypaisa/JazzCash and upload proof." },
          { title: "Schedule", desc: "Pick your preferred time slot from our daily schedule." },
          { title: "First Class", desc: "Start building your real-world project." }
        ].map((step, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg shadow-brand-blue/20">
              {i + 1}
            </div>
            <h4 className="font-bold mb-2">{step.title}</h4>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ScheduleSection = ({ availability }: { availability: LayoutConfig['availability'] }) => (
  <section className="py-20 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Schedule</h2>
        <p className="text-gray-600">We offer flexible slots for clarity calls and intensive mentorship sessions.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-brand-blue/5 p-8 rounded-3xl border border-brand-blue/10">
          <h3 className="text-xl font-bold text-brand-blue mb-6 flex items-center gap-2">
            <MessageSquare className="text-brand-blue" /> Clarity Calls
          </h3>
          <div className="space-y-4">
            {DAILY_SCHEDULE.clarityCalls.map((time, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <span className="font-semibold text-gray-700">{time}</span>
                {availability.clarityCalls[i] ? (
                  <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full uppercase">Available</span>
                ) : (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase">Fully Booked</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-brand-blue/70 italic">
            * Clarity calls are 15-minute focused sessions to align your goals.
          </p>
        </div>

        <div className="bg-brand-green/5 p-8 rounded-3xl border border-brand-green/10">
          <h3 className="text-xl font-bold text-brand-green mb-6 flex items-center gap-2">
            <Zap className="text-brand-green" /> Mentorship Sessions
          </h3>
          <div className="space-y-4">
            {DAILY_SCHEDULE.mentorshipSessions.map((session, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <div>
                  <span className="font-semibold text-gray-700 block">{session.time}</span>
                  <span className="text-xs text-gray-500">{session.duration} Intensive Session {session.note && `(${session.note})`}</span>
                </div>
                {availability.mentorshipSessions[i] ? (
                  <span className="text-xs font-bold text-brand-green bg-brand-green/5 px-3 py-1 rounded-full uppercase">Live</span>
                ) : (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase">Closed</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-brand-green/70 italic">
            * 2 sessions daily. Each session is 4 hours of hands-on mentorship.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const BookingSection = ({ paths, slots }: { paths: string[], slots: string[] }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    plan: '',
    path: '',
    slot: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    const mailBody = `
      Full Name: ${formData.name}
      Email: ${formData.email}
      WhatsApp: ${formData.whatsapp}
      Plan: ${formData.plan}
      Skill Path: ${formData.path}
      Time Slot: ${formData.slot}
      Notes: ${formData.notes}
    `;
    
    window.location.href = `mailto:${BUSINESS_INFO.adminEmail}?subject=New Booking Request - ${formData.name}&body=${encodeURIComponent(mailBody)}`;
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 px-4 bg-brand-blue/5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto bg-white p-12 rounded-3xl text-center shadow-xl border border-brand-blue/10"
        >
          <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Booking Received!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Thank you for your interest. We have received your details. Please ensure you have sent the payment screenshot to our WhatsApp or Email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20">
              Send Another Request
            </button>
            <a href="#" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all">
              Back to Home
            </a>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 px-4 bg-brand-blue/5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-brand-blue/10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your Slot</h2>
            <p className="text-gray-600">Fill in your details and we'll get back to you to finalize the schedule.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="your@email.com"
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">WhatsApp Number</label>
              <input 
                required
                type="tel" 
                placeholder="e.g. 0300 1234567"
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none"
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Choose Your Plan</label>
              <select 
                required
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                onChange={(e) => setFormData({...formData, plan: e.target.value})}
              >
                <option value="">Select a plan</option>
                <option value="Clarity Call">Clarity Call – PKR 1,000</option>
                <option value="1-to-1 Mentorship">1-to-1 Mentorship – PKR 30,000</option>
                <option value="Group Mentorship">Group Mentorship – PKR 15,000</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Preferred Skill Path</label>
              <select 
                required
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                onChange={(e) => setFormData({...formData, path: e.target.value})}
              >
                <option value="">Select a path</option>
                {paths.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Preferred Time Slot</label>
              <select 
                required
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                onChange={(e) => setFormData({...formData, slot: e.target.value})}
              >
                <option value="">Select a slot</option>
                {slots.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            <div className="md:col-span-2 p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
              <h4 className="font-bold text-brand-blue mb-3 flex items-center gap-2">
                <Wallet size={18} /> Payment Instructions
              </h4>
              <p className="text-sm text-brand-blue/80 mb-4">
                Please send the fee to <strong>{BUSINESS_INFO.phone}</strong> ({BUSINESS_INFO.accountHolder}) via Easypaisa or JazzCash.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Upload Payment Proof (Screenshot)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-brand-blue/90"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-gray-700">Additional Notes (Optional)</label>
              <textarea 
                rows={3}
                placeholder="Anything else you'd like us to know?"
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none"
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold text-lg hover:bg-brand-blue/90 shadow-xl shadow-brand-blue/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  'Submit Booking Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const AboutMentor = ({ image }: { image: string }) => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Your Mentor</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            I am Fazal Shahid Latif, a 60‑year‑old self‑taught web developer and mentor from Karachi. I’ve seen how much untapped potential exists in students across Pakistan, especially those who never got a clear path.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            At Mentor Arena, I’m not here just to teach you software or tools. My role is to help you think like an owner, solve real problems, and build something that is truly yours. I cut through the noise and give you a clear, practical route inside the digital niche you choose—so your effort turns into visible skills, projects, and opportunities.
          </p>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold">F</div>
            <div>
              <div className="font-bold text-gray-900">Fazal Shahid Latif</div>
              <div className="text-sm text-gray-500">Lead Mentor & Founder</div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="aspect-square bg-gray-200 rounded-3xl overflow-hidden relative">
            <img 
              src={image} 
              alt="Mentor" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="py-20 bg-gray-50 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {FAQ_DATA.map((item, i) => (
          <details key={i} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <summary className="p-6 cursor-pointer flex justify-between items-center font-bold text-gray-800 list-none">
              {item.question}
              <span className="transition-transform group-open:rotate-180">
                <HelpCircle size={20} className="text-gray-400" />
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto bg-brand-blue rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-blue/20">
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Build Your Future?</h2>
        <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto">
          Don't let your potential go to waste. Join Mentor Arena and start building real-world projects today.
        </p>
        <a href="#booking" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-brand-blue rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all shadow-xl">
          Book Your Slot Now <ArrowRight />
        </a>
      </div>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </div>
  </section>
);

const ChatbotLauncher = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <button 
      onClick={() => window.open(`https://wa.me/${BUSINESS_INFO.phone.replace(/\s/g, '')}`, '_blank')}
      className="w-14 h-14 bg-brand-green text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 cursor-pointer"
      title="Chat with us on WhatsApp"
    >
      <MessageSquare />
    </button>
  </div>
);

const Footer = () => (
  <footer className="py-12 border-t border-gray-100 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <Shield className="text-brand-blue w-6 h-6" />
        <span className="text-lg font-bold text-gray-900">Mentor Arena</span>
      </div>
      <div className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Mentor Arena. All rights reserved. Built for Pakistan.
      </div>
      <div className="flex gap-6">
        <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">WhatsApp</a>
        <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">Facebook</a>
        <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">LinkedIn</a>
      </div>
    </div>
  </footer>
);

// --- Admin View ---

const AdminView = ({ 
  onBack, 
  config, 
  onUpdate 
}: { 
  onBack: () => void; 
  config: LayoutConfig; 
  onUpdate: (newConfig: LayoutConfig) => void;
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'schedule' | 'email' | 'media'>('courses');
  const [emailData, setEmailData] = useState({ studentName: '', plan: '1-to-1 Mentorship' });

  const toggleSection = (section: keyof LayoutConfig['sections']) => {
    onUpdate({
      ...config,
      sections: { ...config.sections, [section]: !config.sections[section] }
    });
  };

  const toggleAvailability = (type: 'clarityCalls' | 'mentorshipSessions', index: number) => {
    const newAvailability = [...config.availability[type]];
    newAvailability[index] = !newAvailability[index];
    onUpdate({
      ...config,
      availability: { ...config.availability, [type]: newAvailability }
    });
  };

  const updateImage = (key: keyof LayoutConfig['images'], value: string) => {
    onUpdate({
      ...config,
      images: { ...config.images, [key]: value }
    });
  };

  const generateEmail = () => {
    return `Subject: Booking Confirmation - Mentor Arena

Dear ${emailData.studentName || '[Student Name]'},

I am pleased to confirm your booking for the ${emailData.plan} at Mentor Arena. 

We have received your details and are excited to have you on board. Your journey towards mastering digital skills starts here.

Next Steps:
1. We will finalize your specific start date based on the ${emailData.plan} requirements.
2. You will receive a link to our private Discord/WhatsApp group.
3. Prepare your laptop and ensure a stable internet connection for our first live session.

If you have any questions before we start, feel free to reach out.

Best regards,
Fazal Shahid Latif
Mentor Arena`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-5xl mx-auto pb-20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="px-2 py-1 bg-brand-green/10 text-brand-green text-[10px] font-bold rounded uppercase tracking-wider">Auto-Saving</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (window.confirm('Reset all settings to default? This will overwrite your current configuration.')) {
                  onUpdate(DEFAULT_LAYOUT);
                }
              }}
              className="text-xs font-bold text-gray-400 hover:text-brand-blue transition-colors uppercase tracking-wider"
            >
              Reset to Defaults
            </button>
            <button 
              onClick={onBack} 
              className="text-brand-blue font-semibold flex items-center gap-2 hover:text-brand-blue/80 transition-colors p-2 rounded-lg hover:bg-brand-blue/5 active:scale-95"
            >
              <ArrowRight className="rotate-180" size={18} /> Back to Site
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'media', label: 'Media & Layout', icon: ImageIcon },
              { id: 'email', label: 'Email Composer', icon: Mail }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-semibold flex items-center gap-2 whitespace-nowrap relative transition-colors ${activeTab === tab.id ? 'text-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <tab.icon size={18} /> {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold mb-4">Manage Course List</h3>
                {config.content.skillPaths.map((path, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <input 
                      type="text" 
                      value={path} 
                      onChange={(e) => {
                        const newPaths = [...config.content.skillPaths];
                        newPaths[i] = e.target.value;
                        onUpdate({ ...config, content: { ...config.content, skillPaths: newPaths } });
                      }}
                      className="flex-grow p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none" 
                    />
                    <button 
                      onClick={() => {
                        const newPaths = config.content.skillPaths.filter((_, idx) => idx !== i);
                        onUpdate({ ...config, content: { ...config.content, skillPaths: newPaths } });
                      }}
                      className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    onUpdate({ ...config, content: { ...config.content, skillPaths: [...config.content.skillPaths, "New Skill Path"] } });
                  }}
                  className="text-brand-blue font-bold flex items-center gap-2 hover:bg-brand-blue/5 p-2 rounded-lg transition-colors"
                >
                  <Plus size={18} /> Add New Path
                </button>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Clarity Call Availability</h3>
                  <div className="space-y-4">
                    {DAILY_SCHEDULE.clarityCalls.map((time, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <span className="font-medium text-gray-700">{time}</span>
                        <button 
                          onClick={() => toggleAvailability('clarityCalls', i)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${config.availability.clarityCalls[i] ? 'bg-brand-green/10 text-brand-green' : 'bg-red-50 text-red-600'}`}
                        >
                          {config.availability.clarityCalls[i] ? 'Available' : 'Booked'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Mentorship Session Availability</h3>
                  <div className="space-y-4">
                    {DAILY_SCHEDULE.mentorshipSessions.map((session, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div>
                          <span className="font-medium text-gray-700 block">{session.time}</span>
                          <span className="text-xs text-gray-500">{session.duration}</span>
                        </div>
                        <button 
                          onClick={() => toggleAvailability('mentorshipSessions', i)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${config.availability.mentorshipSessions[i] ? 'bg-brand-green/10 text-brand-green' : 'bg-red-50 text-red-600'}`}
                        >
                          {config.availability.mentorshipSessions[i] ? 'Live' : 'Closed'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-lg font-bold mb-4">Section Visibility</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(Object.keys(config.sections) as Array<keyof LayoutConfig['sections']>).map((section) => (
                      <button 
                        key={section}
                        onClick={() => toggleSection(section)}
                        className={`p-4 rounded-xl border flex items-center justify-between transition-all ${config.sections[section] ? 'bg-brand-blue/5 border-brand-blue/20 text-brand-blue' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
                      >
                        <span className="capitalize font-medium">{section}</span>
                        {config.sections[section] ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Image Management</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Mentor Image URL</label>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          value={config.images.mentor}
                          onChange={(e) => updateImage('mentor', e.target.value)}
                          className="flex-grow p-3 rounded-xl border border-gray-200"
                        />
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                          <img src={config.images.mentor} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Hero Background URL</label>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          value={config.images.heroBg}
                          onChange={(e) => updateImage('heroBg', e.target.value)}
                          className="flex-grow p-3 rounded-xl border border-gray-200"
                        />
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                          <img src={config.images.heroBg} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Method Section Video URL</label>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          value={config.images.methodVideo}
                          onChange={(e) => updateImage('methodVideo', e.target.value)}
                          className="flex-grow p-3 rounded-xl border border-gray-200"
                        />
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                          <Zap size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Student Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter name"
                      className="w-full p-3 rounded-xl border border-gray-200"
                      onChange={(e) => setEmailData({...emailData, studentName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Plan</label>
                    <select 
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white"
                      onChange={(e) => setEmailData({...emailData, plan: e.target.value})}
                    >
                      <option>1-to-1 Mentorship</option>
                      <option>Group Mentorship</option>
                      <option>Clarity Call</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Generated Template</label>
                  <textarea 
                    rows={12}
                    readOnly
                    value={generateEmail()}
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 font-mono text-sm"
                  ></textarea>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generateEmail());
                    alert('Copied to clipboard!');
                  }}
                  className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20 transition-all"
                >
                  <Edit3 size={18} /> Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [config, setConfig] = useState<LayoutConfig>(() => {
    const saved = localStorage.getItem('mentor_arena_config');
    if (!saved) return DEFAULT_LAYOUT;
    try {
      const parsed = JSON.parse(saved);
      // Deep merge with default to handle schema changes
      return {
        ...DEFAULT_LAYOUT,
        ...parsed,
        sections: { ...DEFAULT_LAYOUT.sections, ...(parsed.sections || {}) },
        images: { ...DEFAULT_LAYOUT.images, ...(parsed.images || {}) },
        availability: { ...DEFAULT_LAYOUT.availability, ...(parsed.availability || {}) },
        content: { ...DEFAULT_LAYOUT.content, ...(parsed.content || {}) },
      };
    } catch {
      return DEFAULT_LAYOUT;
    }
  });

  useEffect(() => {
    localStorage.setItem('mentor_arena_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  if (isAdmin) {
    return (
      <AdminView 
        onBack={() => setIsAdmin(false)} 
        config={config}
        onUpdate={setConfig}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue">
      <Navbar onAdminClick={() => setIsAdmin(true)} />
      
      <main>
        {config.sections.hero && <HeroSection heroBg={config.images.heroBg} />}
        {config.sections.who && <WhoThisIsFor />}
        {config.sections.courses && <CoursesOffered paths={config.content.skillPaths} />}
        {config.sections.method && <MethodSection videoUrl={config.images.methodVideo} posterUrl={config.images.methodPoster} />}
        {config.sections.comparison && <ComparisonSection />}
        {config.sections.pricing && <PricingSection />}
        {config.sections.how && <HowItWorks />}
        {config.sections.schedule && <ScheduleSection availability={config.availability} />}
        {config.sections.booking && <BookingSection paths={config.content.skillPaths} slots={config.content.timeSlots} />}
        {config.sections.about && <AboutMentor image={config.images.mentor} />}
        {config.sections.faq && <FAQSection />}
        {config.sections.cta && <FinalCTA />}
      </main>

      <Footer />
      <ChatbotLauncher />
    </div>
  );
}
