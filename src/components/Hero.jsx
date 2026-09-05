import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles, CheckCircle2, ChevronRight, Gauge, Cpu, Box, Flame } from 'lucide-react';

export default function Hero({ onOpenStudio, onOpenEstimator }) {
  return (
    <section className="relative pt-16 pb-28 px-4 sm:px-8 overflow-hidden bg-tech-grid border-b border-steel-800">
      
      {/* Laser Gradient Accent Beam */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-clean-cyan to-transparent"></div>

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-clean-cyan/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-clean-blue/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Top Tagline Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-steel-900/90 border border-clean-cyan/40 shadow-glow-cyan/25 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-clean-cyan animate-ping"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-clean-cyan">
              High-Speed Contract Bottling & Turnkey Co-Packing
            </span>
          </div>
        </div>

        {/* Master Heading & Value Proposition */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display tracking-tight text-white uppercase leading-[1.02]">
            PRECISION BEVERAGE <br />
            <span className="gradient-text-cyan">CONTRACT MANUFACTURING</span>
          </h1>

          <p className="text-base sm:text-xl text-steel-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Turnkey co-packing engineered for <strong className="text-white">Alkaline 9.5+ pH</strong>, <strong className="text-white">Molecular Hydrogen Infusion</strong>, and <strong className="text-white">Aseptic RTD Scale</strong>. Multi-format lines supporting Sleek Aluminum, Slim Cans, Flint Glass, and Eco rPET.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#studio"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-clean-cyan via-clean-sky to-clean-blue text-steel-950 font-extrabold text-sm uppercase font-mono tracking-wider hover:shadow-glow-cyan transition-all transform hover:-translate-y-1 flex items-center gap-2.5 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-steel-950" />
              <span>Launch 3D Packaging Studio</span>
              <ArrowRight className="w-4 h-4 text-steel-950" />
            </a>

            <a
              href="#estimator"
              className="px-8 py-4 rounded-2xl bg-steel-900 hover:bg-steel-800 text-white border border-steel-700 hover:border-clean-cyan/60 font-bold text-sm uppercase font-mono tracking-wider transition-all flex items-center gap-2 shadow-lg"
            >
              <Gauge className="w-4 h-4 text-clean-cyan" />
              <span>Calculate Production RFQ</span>
            </a>
          </div>
        </div>

        {/* Real-Time Facility Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-steel-800 hover:border-clean-cyan/50 transition-all group">
            <div className="flex items-center justify-between text-steel-400 mb-2">
              <span className="text-[11px] font-mono uppercase font-bold text-clean-cyan">Max Line Speed</span>
              <div className="w-8 h-8 rounded-xl bg-clean-cyan/10 border border-clean-cyan/20 flex items-center justify-center text-clean-cyan group-hover:bg-clean-cyan group-hover:text-steel-950 transition-colors">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-white">1,200 <span className="text-lg font-mono text-clean-cyan font-normal">BPM</span></div>
            <div className="text-xs text-steel-400 mt-1">Aseptic Cold Fill & Nitrogen Dosing</div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-steel-800 hover:border-clean-sky/50 transition-all group">
            <div className="flex items-center justify-between text-steel-400 mb-2">
              <span className="text-[11px] font-mono uppercase font-bold text-clean-sky">Annual Plant Scale</span>
              <div className="w-8 h-8 rounded-xl bg-clean-sky/10 border border-clean-sky/20 flex items-center justify-center text-clean-sky group-hover:bg-clean-sky group-hover:text-steel-950 transition-colors">
                <Gauge className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-white">150M+ <span className="text-lg font-mono text-clean-sky font-normal">Units</span></div>
            <div className="text-xs text-steel-400 mt-1">Multi-Shift Turnkey Co-Packing</div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-steel-800 hover:border-emerald-500/50 transition-all group">
            <div className="flex items-center justify-between text-steel-400 mb-2">
              <span className="text-[11px] font-mono uppercase font-bold text-emerald-400">Quality Benchmark</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-steel-950 transition-colors">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-white">SQF-3 <span className="text-lg font-mono text-emerald-400 font-normal">99/100</span></div>
            <div className="text-xs text-steel-400 mt-1">GFSI Excellent Audit Rating</div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-steel-800 hover:border-sky-400/50 transition-all group">
            <div className="flex items-center justify-between text-steel-400 mb-2">
              <span className="text-[11px] font-mono uppercase font-bold text-sky-300">Cleanroom Standard</span>
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-300 group-hover:bg-sky-300 group-hover:text-steel-950 transition-colors">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-white">ISO-7 <span className="text-lg font-mono text-sky-300 font-normal">Class 10k</span></div>
            <div className="text-xs text-steel-400 mt-1">HEPA Filtered Positive Enclosure</div>
          </div>

        </div>

      </div>
    </section>
  );
}
