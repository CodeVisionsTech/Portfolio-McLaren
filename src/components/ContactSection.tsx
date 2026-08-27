import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight, Clock, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';
import { playTick, playSuccessChime, playHoverWhoosh } from '../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const { data, submitContactMessage, isContactModalOpen, setIsContactModalOpen, preselectedService, setPreselectedService } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Flagship Interactive Web Experiences',
    budget: '$25,000 — $50,000',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  // Live London Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' GMT'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playTick();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and project message.');
      return;
    }

    setSubmitting(true);
    setError('');

    const res = await submitContactMessage(formData);
    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      playSuccessChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E2FD52', '#000000', '#FFFFFF']
      });
    } else {
      setError(res.error || 'Failed to deliver message. Please try again.');
    }
  };

  return (
    <>
      <section id="contact" className="py-20 sm:py-32 bg-[#0D0E12] text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-10 right-0 w-96 h-96 bg-[#E2FD52]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#E2FD52] uppercase tracking-widest mb-6">
            <span className="w-8 h-[1px] bg-[#E2FD52]/50" />
            <span>08 // INITIATE TRANSMISSION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Headline, Direct Channels, Socials */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h2 className="font-syne font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95]">
                  LET'S BUILD <br />
                  <span className="text-[#E2FD52]">SOMETHING</span> <br />
                  UNREASONABLY FAST<span className="text-[#E2FD52]">.</span>
                </h2>

                <p className="mt-6 text-base sm:text-lg text-white/70 font-sans max-w-lg leading-relaxed">
                  Have a high-stakes product launch, bespoke WebGL experience, or motorsport-grade dashboard in mind? Send an inquiry or book a strategy brief.
                </p>

                {/* Direct info list */}
                <div className="mt-10 space-y-4 font-sans text-sm sm:text-base">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#E2FD52]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <a
                      href={`mailto:${data.contact.email}`}
                      className="hover:text-[#E2FD52] transition-colors font-mono text-sm font-semibold"
                    >
                      {data.contact.email}
                    </a>
                  </div>

                  {data.contact.directPhone && (
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#E2FD52]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-sm">{data.contact.directPhone}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#E2FD52]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs">{data.contact.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#E2FD52]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-[#E2FD52]">
                      PADDOCK LOCAL CLOCK: {timeString}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-10 mt-10 border-t border-white/15">
                <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
                  OFFICIAL SOCIAL FEEDS
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {data.contact.socials.map((soc) => (
                    <a
                      key={soc.id}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverWhoosh}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#E2FD52] hover:text-black border border-white/10 text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      <span>{soc.platform}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Embedded Interactive Inquiry Form */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#E2FD52] text-black flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-syne font-black text-3xl uppercase tracking-tight text-white">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="text-sm text-white/70 font-sans max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your commission brief has been routed directly to Leo Vance's private terminal. Expect a response within 12 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'Flagship Interactive Web Experiences',
                        budget: '$25,000 — $50,000',
                        message: ''
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="font-syne font-extrabold text-xl uppercase tracking-tight text-white mb-2">
                    COMMISSION BRIEF
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm font-sans placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                        BUSINESS EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm font-sans placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                      SERVICE / COLLABORATION CATEGORY
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1C23] border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm font-sans"
                    >
                      <option value="Flagship Interactive Web Experiences">Flagship Interactive Web Experiences</option>
                      <option value="High-Frequency Dashboards & Telemetry">High-Frequency Dashboards & Telemetry</option>
                      <option value="Design Systems & Motion Tooling">Design Systems & Motion Tooling</option>
                      <option value="Experimental 3D / WebGL Shader Engineering">Experimental 3D / WebGL Shader Engineering</option>
                      <option value="Advisory / Creative Direction Retainer">Advisory / Creative Direction Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                      ESTIMATED BUDGET TIER
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        '$10k — $25k',
                        '$25k — $50k',
                        '$50k+',
                        'Advisory Retainer',
                        'To Be Discussed'
                      ].map((tier) => (
                        <button
                          type="button"
                          key={tier}
                          onClick={() => {
                            playTick();
                            setFormData({ ...formData, budget: tier });
                          }}
                          className={`py-2 px-2.5 rounded-lg font-mono text-xs text-center border transition-colors ${
                            formData.budget === tier
                              ? 'bg-[#E2FD52] text-black border-[#E2FD52] font-bold'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                      PROJECT VISION & TIMELINE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline key project deliverables, desired launch target, and technical challenges..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm font-sans placeholder:text-white/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    onMouseEnter={playHoverWhoosh}
                    className="w-full py-4 rounded-xl bg-[#E2FD52] hover:bg-white text-black font-syne font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>TRANSMITTING TELEMETRY...</span>
                    ) : (
                      <>
                        <span>TRANSMIT BRIEF</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E2FD52]" />
              <span>LEO VANCE PORTFOLIO // ALL RIGHTS RESERVED 2026</span>
            </div>

            <div className="flex items-center gap-4">
              <span>DESIGN REFERENCE: LANDO NORRIS ARCHITECTURE</span>
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#E2FD52] hover:underline"
              >
                BACK TO TOP [↑]
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Modal Contact Form (Triggered from anywhere) */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0D0E12] text-white border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="font-mono text-xs text-[#E2FD52] uppercase">COMMISSION INITIATION</div>
                  <h3 className="font-syne font-black text-2xl uppercase tracking-tight text-white mt-0.5">
                    START A PROJECT
                  </h3>
                </div>

                <button
                  onClick={() => {
                    playTick();
                    setIsContactModalOpen(false);
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-[#E2FD52] hover:text-black text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#E2FD52] mx-auto" />
                  <h4 className="font-syne font-extrabold text-xl text-white uppercase">BRIEF DELIVERED</h4>
                  <p className="text-xs text-white/70">We will review your inquiry and follow up shortly.</p>
                  <button
                    onClick={() => {
                      setIsContactModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="mt-4 px-6 py-2 rounded-full bg-[#E2FD52] text-black font-syne font-bold text-xs"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/20 text-red-200 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-white/60 mb-1">NAME *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-white/60 mb-1">EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-white/60 mb-1">SERVICE</label>
                    <input
                      type="text"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-white/60 mb-1">MESSAGE *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Project vision, timeline, deliverables..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#E2FD52] focus:outline-none text-white text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#E2FD52] text-black font-syne font-black text-xs uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    {submitting ? 'SENDING...' : 'TRANSMIT BRIEF NOW'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
