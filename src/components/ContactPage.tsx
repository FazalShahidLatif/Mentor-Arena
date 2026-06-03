import React, { useState } from 'react';
import { Mail, Clock, MapPin, MessageSquare, Shield, Check, Phone, HelpCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface ContactPageProps {
  onBackToHome: () => void;
  selectedCity: 'all' | 'karachi' | 'lahore' | 'islamabad';
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  onBackToHome, 
  selectedCity 
}) => {
  const citySuffix = selectedCity === 'all' ? 'Pakistan' : selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTrack, setFormTrack] = useState('Web Development');
  const [formNotes, setFormNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    const leadData = {
      name: formName,
      email: formEmail,
      phone: formPhone,
      track: formTrack,
      notes: formNotes,
      city: selectedCity,
      source: "Contact Page Form"
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting contact lead:", err);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue" id="contact-hub-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
          <button onClick={onBackToHome} className="hover:text-brand-blue transition-colors">Home</button>
          <span>/</span>
          <span className="text-brand-blue font-bold">Contact &amp; Support</span>
        </div>

        {/* Hero Title */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest font-mono">
            📞 NAP Consistent Contact Directory
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-3xl font-black text-gray-950 tracking-tight leading-[1.1] mb-6">
            Get in Touch with Mentor Arena Pakistan Hub
          </h1>
          <p className="text-lg text-gray-650 max-w-3xl leading-relaxed">
            Have questions about student scheduling, distributed monthly installment codes, or course specifications? Connect via direct message protocols below.
          </p>
        </div>

        {/* Primary Layout Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
          
          {/* NAP Information Block */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] space-y-6">
              <h3 className="text-xl font-bold text-gray-950">Authoritative NAP Details:</h3>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white shadow-sm border border-gray-100/60 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                  <Shield size={18} />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-mono">Corporate Entity Name</strong>
                  <p className="text-sm text-gray-900 font-bold">Mentor Arena</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white shadow-sm border border-gray-100/60 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-mono">Registered Street Address</strong>
                  <p className="text-sm text-gray-900 font-bold leading-relaxed">
                    Office 2, Ground Floor, Plot SB-11, Block 13-C, Gulshan-e-Iqbal, Karachi, Sindh, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white shadow-sm border border-gray-100/60 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-mono">Verified Phone Support</strong>
                  <p className="text-sm text-gray-900 font-bold">+92 332 2137898</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white shadow-sm border border-gray-100/60 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-mono">Support Email Communication</strong>
                  <p className="text-sm text-gray-900 font-bold">hello@mentorarena.online</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white shadow-sm border border-gray-100/60 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-gray-500 font-mono">Operational Schedule</strong>
                  <p className="text-sm text-gray-900 font-bold">Mon–Sat 10:00 AM – 8:00 PM PKT</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed px-4">
              *Note concerning co-working spaces: Our physical headquarters is fully open during business hours. Physical visits should be coordinated with the mentorship desk via WhatsApp beforehand to prevent class noise overlaps.
            </p>
          </div>

          {/* Core Interactive Message Form */}
          <div className="md:col-span-7 p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-black text-gray-950 mb-2">Write a Support or Placement Request</h3>
            <p className="text-xs text-gray-500 mb-8 leading-normal">
              Need assistance with an active cohort enrollment, or seeking information on custom-structured syllabus parameters? We respond within 4 business hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <strong className="block text-emerald-900 text-lg">Message Successfully Enqueued!</strong>
                <p className="text-xs text-emerald-750">Fazal Shahid Latif will initiate a direct WhatsApp or email follow-up shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-800 mb-2 font-mono tracking-wider">Full Name:</label>
                  <input 
                    type="text" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="e.g. Muhammad Raza"
                    className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-800 mb-2 font-mono tracking-wider">Email Address:</label>
                    <input 
                      type="email" 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      required
                      placeholder="e.g. raza@domain.com"
                      className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-800 mb-2 font-mono tracking-wider">Active Mobile (WhatsApp):</label>
                    <input 
                      type="text" 
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      required
                      placeholder="e.g. 0332XXXXXXX"
                      className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-800 mb-2 font-mono tracking-wider">Skill Track Selection Of Interest:</label>
                  <select 
                    value={formTrack}
                    onChange={(e) => setFormTrack(e.target.value)}
                    className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors appearance-none"
                  >
                    <option value="Web Development">Full Stack Web Development</option>
                    <option value="SEO (Search Engine Optimization)">Technical &amp; Local SEO</option>
                    <option value="Digital Marketing">UI/UX Design &amp; Digital Marketing</option>
                    <option value="General Questions">General Operational Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-800 mb-2 font-mono tracking-wider">Questions or Custom Schedule Notes:</label>
                  <textarea 
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    rows={4}
                    placeholder="Detail any specific software building background, custom learning goals, or preferred timeslots."
                    className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/95 transition-all text-sm uppercase tracking-widest font-mono"
                >
                  Submit Support Ticket
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Detailed Copy Text (500+ Words total tracking count) */}
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              1. Verifiable Communication Protocols &amp; Accountabilities
            </h2>
            <p className="text-base">
              At Mentor Arena, we believe that education centers must remain completely accessible and answerable to their students. While anonymous online channels often mask low-tier operations, we display our verified registered NAP details with absolute pride. Physical visits can be organized cleanly at our office SB-11 in Gulshan-e-Iqbal during dedicated office slots to ensure complete alignment (Mon-Sat 10:00–20:00).
            </p>
            <p className="text-base">
              Our support team reviews customer tickets with extreme focus. Whether dealing with curriculum queries or installment codes, your request is reviewed by humans (rather than automated scrapers), ensuring your support outcomes remain fast and constructive.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              2. Strategic Direct Connection Guidelines via WhatsApp
            </h2>
            <p className="text-base">
              If your inquiry requires immediate technical clarification, a direct WhatsApp dialog is highly recommended. You can trigger an interactive chat with the lead mentor desk at <strong>+92 332 2137898</strong>. Feel free to outline your existing portfolio, share git link profiles, or request custom-tailored syllabus models.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
