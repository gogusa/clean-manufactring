import React, { useState } from 'react';
import { productionLines } from '../data/facilityData';
import { Layers, Zap, CheckCircle2, ShieldCheck, ArrowUpRight, Cpu } from 'lucide-react';

export default function CapabilitiesSection() {
  const [activeLine, setActiveLine] = useState(productionLines[0]);

  return (
    <section id="capabilities" className="py-24 px-4 sm:px-8 bg-steel-900/50 border-b border-steel-800 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clean-cyan/10 border border-clean-cyan/30 text-clean-cyan text-xs font-mono font-bold uppercase">
              <Cpu className="w-3.5 h-3.5" />
              PLANT AUTOMATION & HARDWARE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              HIGH-SPEED PRODUCTION LINES
            </h2>
            <p className="text-sm sm:text-base text-steel-400 leading-relaxed">
              Engineered with world-class German & Italian rotary filling monoblocks, automated palletizers, and laser vision inspection systems designed for zero-defect output.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-steel-400 bg-steel-950 p-2 rounded-xl border border-steel-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Overall Equipment Effectiveness (OEE): <strong className="text-emerald-400">98.4%</strong></span>
          </div>
        </div>

        {/* Interactive Line Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Line Switchers */}
          <div className="lg:col-span-5 space-y-3">
            {productionLines.map((line) => {
              const isActive = activeLine.id === line.id;
              return (
                <button
                  key={line.id}
                  onClick={() => setActiveLine(line)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-clean-navy to-steel-900 border-clean-cyan shadow-glow-cyan/20'
                      : 'bg-steel-950/80 border-steel-800 hover:border-steel-700 hover:bg-steel-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-clean-cyan">{line.speed}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      OEE: {line.oee}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1.5 font-display">{line.name}</h3>
                  <p className="text-xs text-steel-400 mt-1 line-clamp-1">{line.fillType}</p>
                </button>
              );
            })}
          </div>

          {/* Right Line Detailed Spec Panel */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-clean-cyan/30 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-clean-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-steel-800 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-clean-cyan">Engineering Specifications</span>
                  <h3 className="text-2xl font-bold font-display text-white mt-1">{activeLine.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-steel-400">Throughput</div>
                  <div className="text-xl font-bold text-clean-cyan font-mono">{activeLine.speed}</div>
                </div>
              </div>

              {/* Fill Architecture */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-steel-400 font-bold">Filling Technology</span>
                <div className="p-4 rounded-xl bg-steel-950/80 border border-steel-800 text-sm text-steel-200 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-clean-cyan shrink-0" />
                  <span>{activeLine.fillType}</span>
                </div>
              </div>

              {/* Container Sizes Supported */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-steel-400 font-bold">Compatible Formats</span>
                <div className="flex flex-wrap gap-2">
                  {activeLine.sizes.map((size, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-steel-800/80 border border-steel-700 text-xs font-mono text-steel-200">
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Automation Highlights */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-steel-400 font-bold">In-Line Quality Assurance & Automation</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeLine.features.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-steel-950/50 border border-steel-800/80 flex items-center gap-2.5 text-xs text-steel-300">
                      <CheckCircle2 className="w-4 h-4 text-clean-cyan shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking CTA */}
              <div className="pt-4 border-t border-steel-800 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-steel-400 font-mono">
                  Line allocation available for Q1–Q4 co-packing contracts.
                </div>
                <a
                  href="#estimator"
                  className="px-5 py-2.5 rounded-xl bg-clean-cyan/15 hover:bg-clean-cyan/25 border border-clean-cyan/40 text-clean-cyan font-mono text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Reserve Capacity</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
