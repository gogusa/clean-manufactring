import React, { useState } from 'react';
import { MapPin, Phone, Mail, Building2, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    volumeInterest: '100,000 – 250,000 Units',
    timeline: 'Within 30 Days',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 }
    });
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 bg-steel-900/40 border-b border-steel-800 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clean-cyan/10 border border-clean-cyan/30 text-clean-cyan text-xs font-mono font-bold uppercase">
            <Building2 className="w-3.5 h-3.5" />
            PLANT CONSULTATION & FACILITY AUDITS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight uppercase">
            REQUEST A PLANT AUDIT OR <br />
            <span className="gradient-text-cyan">TURNKEY CONTRACT QUOTE</span>
          </h2>
          <p className="text-sm sm:text-base text-steel-400 leading-relaxed">
            Schedule an on-site facility walkthrough or speak with our beverage engineering team to reserve high-speed line allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Plant Details & Operations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-steel-800 space-y-6">
              <h3 className="text-2xl font-bold font-display text-white">Clean Manufacturing</h3>
              
              <div className="space-y-4 text-sm text-steel-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-clean-cyan/10 border border-clean-cyan/30 text-clean-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white font-mono text-xs uppercase">Manufacturing Headquarters</div>
                    <div className="text-steel-300 text-xs mt-0.5">4400 N Scottsdale Rd, Ste. 308</div>
                    <div className="text-steel-400 text-xs">Scottsdale, AZ 85251</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-clean-sky/10 border border-clean-sky/30 text-clean-sky flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white font-mono text-xs uppercase">Plant Engineering Direct Line</div>
                    <a href="tel:866-244-1003" className="text-clean-cyan font-mono font-bold text-sm hover:underline">
                      866-244-1003
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white font-mono text-xs uppercase">Co-Packing & RFQ Desk</div>
                    <a href="mailto:manufacturing@cleanbottling.com" className="text-clean-cyan font-mono text-xs hover:underline">
                      manufacturing@cleanbottling.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-steel-950 border border-steel-800 space-y-2 text-xs text-steel-400 font-mono">
                <div className="flex items-center gap-2 text-clean-cyan font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  Operating Shifts
                </div>
                <div>24/7 Multi-Shift High-Speed Operations</div>
                <div>Scheduled Plant Audits: Mon – Fri (8AM – 5PM MST)</div>
              </div>

            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-steel-700/80">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">Inquiry Received!</h3>
                  <p className="text-sm text-steel-300 max-w-md mx-auto">
                    Thank you, <strong className="text-clean-cyan">{formData.name || 'Partner'}</strong>. Our Lead Manufacturing Engineer will review your requirements and respond within 1 business day with line availability.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-steel-800 text-steel-300 font-mono text-xs hover:bg-steel-700 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-steel-400 font-bold mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-steel-950 border border-steel-700 rounded-xl px-4 py-3 text-sm text-white focus:border-clean-cyan focus:outline-none"
                        placeholder="Sarah Jenkins"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-steel-400 font-bold mb-1.5">
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-steel-950 border border-steel-700 rounded-xl px-4 py-3 text-sm text-white focus:border-clean-cyan focus:outline-none"
                        placeholder="Beverage Co. Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-steel-400 font-bold mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-steel-950 border border-steel-700 rounded-xl px-4 py-3 text-sm text-white focus:border-clean-cyan focus:outline-none"
                        placeholder="s.jenkins@brand.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-steel-400 font-bold mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-steel-950 border border-steel-700 rounded-xl px-4 py-3 text-sm text-white focus:border-clean-cyan focus:outline-none"
                        placeholder="800-555-0199"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-steel-400 font-bold mb-1.5">
                        Expected Volume Run
                      </label>
                      <select
                        value={formData.volumeInterest}
                        onChange={(e) => setFormData({ ...formData, volumeInterest: e.target.value })}
                        className="w-full bg-steel-950 border border-steel-700 rounded-xl px-4 py-3 text-xs font-mono text-white focus:border-clean-cyan focus:outline-none"
                      >
                        <option>25,000 – 50,000 Units (Pilot)</option>
                        <option>100,000 – 250,000 Units (Commercial)</option>
                        <option>500,000 – 1,000,000+ Units (Enterprise)</option>
                        <option>Custom Formulation R&D Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-steel-400 font-bold mb-1.5">
                        Target Production Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-steel-950 border border-steel-700 rounded-xl px-4 py-3 text-xs font-mono text-white focus:border-clean-cyan focus:outline-none"
                      >
                        <option>Immediate (Within 30 Days)</option>
                        <option>Q1 Production Run</option>
                        <option>Q2 Production Run</option>
                        <option>Q3 / Q4 Long-Term Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-steel-400 font-bold mb-1.5">
                      Production Specs & Inquiries *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-steel-950 border border-steel-700 rounded-xl px-4 py-3 text-sm text-white focus:border-clean-cyan focus:outline-none"
                      placeholder="Specify container size (e.g. 500ml aluminum bottle, 12oz can), formula requirements, target line speed, or plant tour request..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-clean-cyan to-clean-blue text-steel-950 font-extrabold text-sm uppercase font-mono tracking-wider hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-steel-950" />
                    <span>Send Engineering Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
