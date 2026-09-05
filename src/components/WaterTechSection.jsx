import React, { useState } from 'react';
import { waterFormulas } from '../data/formulasData';
import { Sparkles, Droplets, Check, ShieldCheck, Atom, Activity } from 'lucide-react';

export default function WaterTechSection() {
  const [selectedFormula, setSelectedFormula] = useState(waterFormulas[0]);

  return (
    <section id="water-tech" className="py-24 px-4 sm:px-8 bg-steel-950 border-b border-steel-800 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clean-cyan/10 border border-clean-cyan/30 text-clean-cyan text-xs font-mono font-bold uppercase">
            <Atom className="w-3.5 h-3.5" />
            PROPRIETARY FORMULATION & PURIFICATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight uppercase">
            WATER PURIFICATION & <br />
            <span className="gradient-text-cyan">MOLECULAR ENRICHMENT</span>
          </h2>
          <p className="text-sm sm:text-base text-steel-400 leading-relaxed">
            From medical-grade 7-stage RO filtration to patent-pending dissolved molecular hydrogen (H₂) saturation and titanium-platinum ionized alkaline water.
          </p>
        </div>

        {/* Formula Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-steel-900 border border-steel-800 max-w-4xl mx-auto">
          {waterFormulas.map((formula) => {
            const isSelected = selectedFormula.id === formula.id;
            return (
              <button
                key={formula.id}
                onClick={() => setSelectedFormula(formula)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-clean-cyan text-steel-950 shadow-glow-cyan/50'
                    : 'text-steel-400 hover:text-white hover:bg-steel-800'
                }`}
              >
                <span>{formula.name}</span>
                {formula.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${isSelected ? 'bg-steel-950 text-clean-cyan' : 'bg-steel-800 text-steel-300'}`}>
                    {formula.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Formula Profile Showcase */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-steel-700/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-clean-cyan uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-clean-cyan" />
                {selectedFormula.tagline}
              </span>
              <h3 className="text-3xl font-extrabold font-display text-white">
                {selectedFormula.name}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-steel-300 leading-relaxed">
              {selectedFormula.description}
            </p>

            {/* Target Applications */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-steel-400 font-bold">Target Commercial Segments:</span>
              <div className="flex flex-wrap gap-2">
                {selectedFormula.applications.map((app, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-steel-900 border border-steel-700 text-xs text-clean-cyan font-mono">
                    ✓ {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Specs Dashboard Card */}
          <div className="lg:col-span-5 bg-steel-950 p-6 sm:p-8 rounded-2xl border border-steel-800 space-y-4">
            <div className="flex items-center justify-between border-b border-steel-800 pb-3">
              <span className="text-xs font-mono text-steel-400 uppercase font-bold">Certificate of Analysis (COA) Specs</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-3">
              {Object.entries(selectedFormula.specs).map(([key, val], idx) => (
                <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-steel-900/60 border border-steel-800/80">
                  <span className="text-steel-400 font-mono">{key}</span>
                  <span className="font-mono font-bold text-white text-right">{val}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-steel-500 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-clean-cyan"></span>
              Full batch validation & micro clearance included with every pallet.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
