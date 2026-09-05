import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { caseFormats, boxMaterials, calculateCaseQuote } from '../data/casePackagingData';
import ThreeCaseViewer from '../components/ThreeCaseViewer';
import { 
  Box, 
  Layers, 
  Truck, 
  Calculator, 
  BookmarkCheck, 
  ArrowRight, 
  CheckCircle2, 
  Droplets,
  PackageCheck,
  Sparkles,
  Type
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CaseDesignPage({ onOpenSaveModal }) {
  const navigate = useNavigate();
  const { 
    activeBottle, 
    brandName, 
    activeCaseFormat, 
    setActiveCaseFormat, 
    activeBoxMaterial, 
    setActiveBoxMaterial, 
    caseBrandText, 
    setCaseBrandText,
    volume 
  } = useProject();

  const caseQuote = calculateCaseQuote({
    totalUnits: volume,
    caseFormatId: activeCaseFormat.id,
    boxMaterialId: activeBoxMaterial.id
  });

  const handlePushToFormulation = () => {
    confetti({
      particleCount: 65,
      spread: 55,
      origin: { y: 0.8 }
    });
    navigate('/formulation');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 space-y-12 font-sans">
      
      {/* Department Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="badge-tech">
            <Box className="w-3.5 h-3.5 text-brand-blue" />
            DEPARTMENT 03 • SECONDARY PACKAGING & CASE DESIGN CENTER
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-navy uppercase tracking-tight">
            MASTER CASE & <br />
            <span className="gradient-text-navy">SECONDARY PACKAGING STUDIO</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Engineer retail-ready corrugated shipper cartons, registered printed multi-pack shrink film bundles, club warehouse display trays (Costco/Sam's Club spec), and DTC e-commerce shippers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSaveModal}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-4 h-4 text-brand-blue" />
            <span>Save Case Spec</span>
          </button>
        </div>
      </div>

      {/* Main Studio View: Canvas Left, Catalog Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: 3D Master Case & Shrink Bundle Viewer */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-center">
            
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-100 pb-3">
              <span className="text-brand-blue font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
                3D SECONDARY PACKAGING PROOF
              </span>
              <span className="bg-sky-50 text-brand-blue px-2 py-0.5 rounded border border-sky-200 font-bold">{activeCaseFormat.category}</span>
            </div>

            <ThreeCaseViewer
              caseFormat={activeCaseFormat}
              boxMaterial={activeBoxMaterial}
              caseBrandText={caseBrandText || `${brandName} ${activeCaseFormat.unitsPerCase}-PACK`}
              bottleCapacity={activeBottle.capacity}
            />

            {/* Quick Case Metrics */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono space-y-1.5 text-left">
              <div className="flex justify-between text-slate-500">
                <span>Case Format:</span>
                <span className="text-slate-900 font-bold">{activeCaseFormat.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Cases Needed:</span>
                <span className="text-brand-blue font-bold">{caseQuote.totalCasesNeeded.toLocaleString()} Cases</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Cost / Case:</span>
                <span className="text-emerald-700 font-bold">${caseQuote.costPerCase.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Pallet Requirement:</span>
                <span className="text-slate-900 font-bold">{caseQuote.totalPallets} Pallets</span>
              </div>
            </div>

            <button
              onClick={handlePushToFormulation}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-navy to-brand-blue text-white font-mono text-xs uppercase font-bold tracking-wider shadow-md hover:shadow-glow-blue transition-all flex items-center justify-center gap-2"
            >
              <Droplets className="w-4 h-4 text-brand-cyan" />
              <span>Next: Water Chemistry & Formulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Case Packaging Configurator */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Custom Branding On Case */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-brand-blue" />
              1. Master Case Branding & Print Text:
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-600 font-semibold mb-1">
                Custom Case Box Graphics Text
              </label>
              <input
                type="text"
                value={caseBrandText}
                onChange={(e) => setCaseBrandText(e.target.value)}
                maxLength={32}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 font-display focus:border-brand-blue focus:outline-none"
                placeholder="HYDRO PURE • 12-PACK MASTER CASE"
              />
            </div>
          </div>

          {/* Case Formats Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
              <Box className="w-4 h-4 text-brand-blue" />
              2. Select Secondary Case & Bundle Format:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caseFormats.map((format) => {
                const isSelected = activeCaseFormat.id === format.id;
                return (
                  <div
                    key={format.id}
                    onClick={() => setActiveCaseFormat(format)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50/80 border-brand-blue shadow-md ring-2 ring-brand-blue/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-brand-blue">{format.unitsPerCase} Units / Case</span>
                      <span className="text-xs font-mono font-bold text-slate-700">${format.baseCostPerCase.toFixed(2)}/case</span>
                    </div>

                    <h4 className="text-base font-bold font-display text-slate-900 mt-2">{format.name}</h4>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">{format.dimensions}</div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{format.desc}</p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-[11px] font-mono text-slate-500">
                      <span>Fluting: <strong className="text-slate-900">{format.fluting.split('(')[0]}</strong></span>
                      <span>Stack: <strong className="text-emerald-700">{format.palletStack.split('(')[0]}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Box Board Material & Coating */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-blue" />
              3. Select Corrugated Board Finish & Coating:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {boxMaterials.map((mat) => {
                const isSelected = activeBoxMaterial.id === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => setActiveBoxMaterial(mat)}
                    className={`p-4 rounded-xl border cursor-pointer text-xs font-mono transition-all flex items-center justify-between ${
                      isSelected ? 'bg-sky-50 border-brand-blue text-brand-navy font-bold' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{mat.name}</span>
                    <span className="text-brand-blue font-bold">{mat.extraFee === 0 ? 'Standard' : `+$${mat.extraFee.toFixed(2)}/case`}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logistics & Pallet Breakdown */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 bg-gradient-to-br from-slate-50 to-sky-50/40">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-blue" />
                Case Logistics & Pallet Calculation:
              </h3>
              <span className="text-xs font-mono text-brand-blue font-bold">
                Volume: {volume.toLocaleString()} Units
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">Total Cases</div>
                <div className="text-base font-bold text-brand-navy mt-0.5">{caseQuote.totalCasesNeeded.toLocaleString()}</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">Cost / Case</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">${caseQuote.costPerCase.toFixed(2)}</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">Total Case Cost</div>
                <div className="text-base font-bold text-emerald-700 mt-0.5">${caseQuote.totalCaseCost.toLocaleString()}</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">Total Pallets</div>
                <div className="text-base font-bold text-brand-blue mt-0.5">{caseQuote.totalPallets} Pallets</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
