import React, { useState } from 'react';
import { Droplet, Sparkles, Shield, Cpu, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Raw Water Intake & Micro-Purification",
    icon: Droplet,
    subtitle: "7-Stage Reverse Osmosis & Deionization",
    desc: "Municipal and mountain artesian source water passes through dual-pass reverse osmosis, sub-micron carbon beds, and 254nm UV sterilization, reducing TDS to < 1 ppm with zero contaminants.",
    specs: ["Dual-Pass RO Membranes", "Sub-Micron UV Polish", "Continuous TDS Telemetry"]
  },
  {
    step: "02",
    title: "Molecular Infusion & Formulation",
    icon: Sparkles,
    subtitle: "Alkaline Ionization or Nanobubble H₂",
    desc: "Proprietary titanium-platinum electrolysis generates high-pH alkaline water (8.8–9.5+ pH), or acoustic cavitation infuses 1.6+ PPM dissolved molecular hydrogen with long-term shelf stability.",
    specs: ["Titanium-Platinum Electrolysis", "Acoustic H₂ Cavitation", "Isotonic Mineral Balancing"]
  },
  {
    step: "03",
    title: "Cleanroom Class 10k Aseptic Fill",
    icon: Cpu,
    subtitle: "1,200 BPM Rotary Monoblock Filling",
    desc: "Bottles and cans are ionized air rinsed, filled in a positive pressure HEPA cleanroom, and dosed with liquid nitrogen (LN2) to eliminate oxygen and ensure maximum structural rigidity.",
    specs: ["Positive Pressure HEPA (ISO 7)", "Liquid Nitrogen (LN2) Dosing", "Rotary Flowmeter Monoblock"]
  },
  {
    step: "04",
    title: "In-Line Laser QA & Seal Validation",
    icon: Shield,
    subtitle: "Vision Inspection & Micro Clearance",
    desc: "High-speed camera vision inspection rejects fill volume variations, torque anomalies, or damaged closures. Every production lot undergoes on-site microbiological PCR clearance and COA generation.",
    specs: ["100% Vision Rejection", "Microbiological PCR Clearance", "Torque & Hermetic Seal Audits"]
  },
  {
    step: "05",
    title: "Robotic Palletizing & 3PL Dispatch",
    icon: Truck,
    subtitle: "Automated Stretch Wrapping & EDI Sync",
    desc: "Cases are automatically palletized with corner board protection, shrink wrapped, barcoded with GS1 labels, and staged for temperature-controlled 3PL freight pickup or 2-day ground delivery.",
    specs: ["Robotic Case Packing", "GS1 Barcode Compliance", "Direct 3PL & Rail Intake"]
  }
];

export default function ProcessPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-4 sm:px-8 bg-steel-950 border-b border-steel-800 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clean-cyan/10 border border-clean-cyan/30 text-clean-cyan text-xs font-mono font-bold uppercase">
            <Cpu className="w-3.5 h-3.5" />
            END-TO-END MANUFACTURING LIFECYCLE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight uppercase">
            TURNKEY CO-PACKING <br />
            <span className="gradient-text-cyan">PROCESS PIPELINE</span>
          </h2>
          <p className="text-sm sm:text-base text-steel-400 leading-relaxed">
            A fully automated, cleanroom-enclosed process pipeline from raw ingredient intake to final distributor dispatch.
          </p>
        </div>

        {/* Interactive 5-Step Pipeline Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-b from-clean-navy to-steel-900 border-clean-cyan shadow-glow-cyan/20'
                    : 'bg-steel-900/60 border-steel-800 hover:border-steel-700 text-steel-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-clean-cyan' : 'text-steel-500'}`}>
                    PHASE {s.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-clean-cyan' : 'text-steel-500'}`} />
                </div>
                <div className="text-xs font-bold font-display text-white line-clamp-2">{s.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-clean-cyan/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs text-clean-cyan uppercase font-bold">
              <span className="px-2.5 py-1 rounded bg-clean-cyan/15 border border-clean-cyan/30">
                STAGE {steps[activeStep].step}
              </span>
              <span>{steps[activeStep].subtitle}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              {steps[activeStep].title}
            </h3>

            <p className="text-sm sm:text-base text-steel-300 leading-relaxed">
              {steps[activeStep].desc}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {steps[activeStep].specs.map((spec, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-steel-900 border border-steel-700 text-xs font-mono text-clean-cyan">
                  <CheckCircle2 className="w-3.5 h-3.5 text-clean-cyan" />
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-steel-950 rounded-2xl border border-steel-800 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-clean-cyan/10 border border-clean-cyan/30 flex items-center justify-center text-clean-cyan shadow-glow-cyan/20">
              {React.createElement(steps[activeStep].icon, { className: "w-8 h-8" })}
            </div>
            <div className="text-xs font-mono text-steel-400">Total Quality Control</div>
            <div className="text-base font-bold font-display text-white">Zero-Defect Standard</div>
            <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              100% In-Line Telemetry
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
