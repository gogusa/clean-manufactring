import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';

export default function Hero({ onOpenStudio, onOpenEstimator }) {
  return (
    <section className="relative pt-12 pb-24 px-4 sm:px-8 overflow-hidden bg-tech-grid border-b border-steel-800">
      
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-clean-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-clean-blue/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* Top Tagline Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-steel-900/90 border border-clean-cyan/30 shadow-glow-cyan/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-clean-cyan animate-ping"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-clean-cyan">
              High-Speed Contract Bottling & Canning Facility
            </span>
          </div>
        </div>

        {/* Master Heading & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white uppercase leading-[1.08]">
            ENGINEERED FOR <br />
            <span className="gradient-text-cyan">PRECISION BEVERAGE</span> SCALE
          </h1>

          <p className="text-base sm:text-xl text-steel-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Clean Manufacturing is a premier contract manufacturing partner for high-speed <strong className="text-white">Alkaline 9.5+ pH</strong>, <strong className="text-white">Molecular Hydrogen Infusion</strong>, and <strong className="text-white">Ultra-Pure RTD</strong> beverages. From micro-batch pilot runs to 150M+ annual unit scale.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#studio"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-clean-cyan to-clean-blue text-steel-950 font-extrabold text-sm uppercase font-mono tracking-wider hover:shadow-glow-cyan transition-all transform hover:-translate-y-1 flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-steel-950" />
              <span>Launch 3D Bottle Studio</span>
              <ArrowRight className="w-4 h-4 text-steel-950" />
            </a>

            <a
              href="#estimator"
              className="px-8 py-4 rounded-xl bg-steel-900 hover:bg-steel-800 text-white border border-steel-700 hover:border-clean-cyan/50 font-bold text-sm uppercase font-mono tracking-wider transition-all flex items-center gap-2"
            >
              <Gauge className="w-4 h-4 text-clean-cyan" />
              <span>Calculate Production RFQ</span>
            </a>
          </div>
        </div>

        {/* Real-Time Facility Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div className="glass-panel p-5 rounded-2xl border border-steel-800 hover:border-clean-cyan/40 transition-all">
            <div className="flex items-center justify-between text-steel-400 mb-2">
              <span className="text-[11px] font-mono uppercase font-bold text-clean-cyan">Max Line Speed</span>
              <Zap className="w-4 h-4 text-clean-cyan" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">1,200 BPM</div>
            <div className="text-xs text-steel-400 mt-1">Aseptic Cold Fill & Nitrogen Dosing</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-steel-800 hover:border-clean-cyan/40 transition-all">
            <div className="flex items-center justify-between text-steel-400 mb-2">
              <span className="text-[11px] font-mono uppercase font-bold text-clean-sky">Annual Throughput</span>
              <Gauge className="w-4 h-4 text-clean-sky" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">150M+ Units</div>
            <div className="text-xs text-steel-400 mt-1">Multi-Shift Turnkey Co-Packing</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-steel-800 hover:border-clean-cyan/40 transition-all">
            <div className="flex items-center justify-between text-steel-400 mb-2">
              <span className="text-[11px] font-mono uppercase font-bold text-emerald-400">Quality Benchmark</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">SQF Level 3</div>
            <div className="text-xs text-steel-400 mt-1">99/100 Excellent GFSI Audit Rating</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-steel-800 hover:border-clean-cyan/40 transition-all">
            <div className="flex items-center justify-between text-steel-400 mb-2">
              <span className="text-[11px] font-mono uppercase font-bold text-sky-300">Cleanroom Standard</span>
              <CheckCircle2 className="w-4 h-4 text-sky-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">ISO Class 7</div>
            <div className="text-xs text-steel-400 mt-1">HEPA Filtered Positive Pressure Enclosure</div>
          </div>
        </div>

      </div>
    </section>
  );
}
