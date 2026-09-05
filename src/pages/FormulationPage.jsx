import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { waterFormulas } from '../data/formulasData';
import { 
  Droplets, 
  Sparkles, 
  ShieldCheck, 
  Atom, 
  Activity, 
  BookmarkCheck, 
  ArrowRight, 
  Factory,
  TestTubes,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FormulationPage({ onOpenSaveModal }) {
  const navigate = useNavigate();
  const { activeFormula, setActiveFormula } = useProject();
  const [activeTab, setActiveTab] = useState(activeFormula.id);

  const currentFormula = waterFormulas.find(f => f.id === activeTab) || waterFormulas[0];

  const handleSelectFormula = (formula) => {
    setActiveTab(formula.id);
    setActiveFormula(formula);
  };

  const handlePushToManufacturing = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 }
    });
    navigate('/manufacturing');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 space-y-12 font-sans">
      
      {/* Department Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="badge-tech">
            <Droplets className="w-3.5 h-3.5 text-brand-blue" />
            DEPARTMENT 04 • WATER CHEMISTRY & FORMULATION R&D
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-navy uppercase tracking-tight">
            WATER CHEMISTRY & <br />
            <span className="gradient-text-navy">MOLECULAR INFUSION R&D</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Proprietary water science and formulation chemistry. From titanium-platinum ionized alkaline water (8.8–9.5+ pH) to acoustic cavitation molecular hydrogen (H₂) infusion and sub-micron 7-stage reverse osmosis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSaveModal}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-4 h-4 text-brand-blue" />
            <span>Save Formulation Spec</span>
          </button>
        </div>
      </div>

      {/* Formula Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
        {waterFormulas.map((f) => {
          const isSelected = activeTab === f.id;
          return (
            <button
              key={f.id}
              onClick={() => handleSelectFormula(f)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{f.name}</span>
              {f.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                  isSelected ? 'bg-brand-blue text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {f.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Formula Profile Deep-Dive */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {currentFormula.tagline}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-navy">
              {currentFormula.name}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {currentFormula.description}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-700 font-bold block">
              Commercial Beverage Applications:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentFormula.applications.map((app, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-mono text-brand-blue font-bold">
                  ✓ {app}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handlePushToManufacturing}
              className="px-7 py-3.5 rounded-2xl bg-brand-navy hover:bg-brand-blue text-white font-mono text-xs uppercase font-bold tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <Factory className="w-4 h-4 text-brand-cyan" />
              <span>Next: Select Co-Packing Line</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate of Analysis (COA) Technical Box */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-navy uppercase">
              <TestTubes className="w-4 h-4 text-brand-blue" />
              Certificate of Analysis (COA)
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="space-y-3">
            {Object.entries(currentFormula.specs).map(([key, val], idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 font-mono">{key}:</span>
                <span className="font-mono font-bold text-slate-900 text-right">{val}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            100% On-site PCR microbiological clearance & batch release protocol.
          </div>
        </div>

      </div>

    </div>
  );
}
