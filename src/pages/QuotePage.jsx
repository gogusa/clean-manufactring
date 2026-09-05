import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { calculatePrintQuote } from '../data/printHouseData';
import { calculateCaseQuote } from '../data/casePackagingData';
import { 
  Calculator, 
  Printer, 
  BookmarkCheck, 
  CheckCircle2, 
  ShieldCheck, 
  Package, 
  Palette, 
  Box, 
  Droplets,
  Send,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuotePage({ onOpenSaveModal }) {
  const { 
    activeBottle, 
    activeCap, 
    activePrintMaterial, 
    activeColorProcess,
    activeCaseFormat, 
    activeBoxMaterial,
    activeFormula, 
    volume, 
    setVolume,
    brandName,
    currentUser
  } = useProject();

  const [nitrogenDosing, setNitrogenDosing] = useState(true);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // 1. Sourcing Base Rate
  const bottleBaseRate = activeBottle.category === 'glass' ? 0.72 : activeBottle.category === 'aluminum-can' ? 0.28 : activeBottle.category === 'rpet' ? 0.24 : 0.58;
  const capRate = 0.04;

  // 2. Print Rate
  const printQuote = calculatePrintQuote({
    volume,
    materialId: activePrintMaterial.id,
    colorProcessId: activeColorProcess.id
  });

  // 3. Case Rate
  const caseQuote = calculateCaseQuote({
    totalUnits: volume,
    caseFormatId: activeCaseFormat.id,
    boxMaterialId: activeBoxMaterial.id
  });

  // 4. Formulation Rate
  const formulaRate = activeFormula.id === 'hydrogen' ? 0.14 : activeFormula.id === 'alkaline' ? 0.08 : activeFormula.id === 'electrolyte-enhanced' ? 0.11 : 0.04;

  // Processing / Nitrogen
  const processingRate = nitrogenDosing ? 0.025 : 0.015;

  // Raw combined unit rate
  const rawUnitRate = bottleBaseRate + capRate + printQuote.unitCost + caseQuote.costPerUnit + formulaRate + processingRate;

  // Volume discount tier
  let discountTier = "Standard (0%)";
  let discountMultiplier = 1.0;
  let leadTime = "4-5 Weeks";

  if (volume >= 500000) {
    discountMultiplier = 0.76;
    discountTier = "Enterprise Mega-Scale (24% Off)";
    leadTime = "2-3 Weeks (Priority Line)";
  } else if (volume >= 250000) {
    discountMultiplier = 0.82;
    discountTier = "National Scale (18% Off)";
    leadTime = "3 Weeks";
  } else if (volume >= 100000) {
    discountMultiplier = 0.88;
    discountTier = "Commercial Tier (12% Off)";
    leadTime = "3-4 Weeks";
  } else if (volume >= 50000) {
    discountMultiplier = 0.94;
    discountTier = "Mid-Volume Tier (6% Off)";
    leadTime = "4 Weeks";
  }

  const finalUnitPrice = parseFloat((rawUnitRate * discountMultiplier).toFixed(4));
  const finalTotalRun = parseFloat((finalUnitPrice * volume).toFixed(2));
  const totalPallets = caseQuote.totalPallets;

  const handlePrint = () => {
    window.print();
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
    setQuoteSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 space-y-12 font-sans">
      
      {/* Department Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="badge-tech">
            <Calculator className="w-3.5 h-3.5 text-brand-blue" />
            DEPARTMENT 06 • CONSOLIDATED TURNKEY RFQ PRICING ENGINE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-navy uppercase tracking-tight">
            MASTER CO-PACKING <br />
            <span className="gradient-text-navy">SPEC & TURNKEY COST MATRIX</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Consolidated turnkey pricing combining Container Sourcing, Package Print House, Secondary Case Packaging, and Water Chemistry into an itemized, volume-discounted quote.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-brand-blue" />
            <span>Print Spec PDF</span>
          </button>

          <button
            onClick={onOpenSaveModal}
            className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-4 h-4 text-brand-cyan" />
            <span>Save to Account</span>
          </button>
        </div>
      </div>

      {/* Main Quote Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Volume Slider & Inclusions */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Volume Control Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-mono uppercase text-slate-500 font-bold">Total Production Run:</span>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-brand-navy mt-1">
                  {volume.toLocaleString()} <span className="text-sm font-mono text-slate-500 font-normal">Units</span>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg font-bold border border-emerald-200">
                {discountTier}
              </span>
            </div>

            <input
              type="range"
              min="25000"
              max="1000000"
              step="25000"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>25K (Pilot Run)</span>
              <span>100K (Commercial)</span>
              <span>500K</span>
              <span>1M+ (Mega-Scale)</span>
            </div>
          </div>

          {/* Itemized Specification Breakdown Table */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-brand-blue" />
              Itemized Spec & Unit Cost Breakdown:
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-blue" />
                  <span>1. Container Sourcing ({activeBottle.name} + {activeCap.name})</span>
                </div>
                <span className="font-bold text-slate-900">${(bottleBaseRate + capRate).toFixed(3)}/unit</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-brand-blue" />
                  <span>2. Print House ({activePrintMaterial.name} + {activeColorProcess.name.split('(')[0]})</span>
                </div>
                <span className="font-bold text-slate-900">${printQuote.unitCost.toFixed(4)}/unit</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-brand-blue" />
                  <span>3. Secondary Case ({activeCaseFormat.name} • {caseQuote.totalCasesNeeded} cases)</span>
                </div>
                <span className="font-bold text-slate-900">${caseQuote.costPerUnit.toFixed(3)}/unit</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-brand-blue" />
                  <span>4. Water Formulation ({activeFormula.name})</span>
                </div>
                <span className="font-bold text-slate-900">${formulaRate.toFixed(3)}/unit</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-blue" />
                  <span>5. Cleanroom Filling, LN2 Dosing & QA COA</span>
                </div>
                <span className="font-bold text-slate-900">${processingRate.toFixed(3)}/unit</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Master Output Card & Lead Handoff */}
        <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-brand-blue/40 space-y-6 shadow-xl bg-gradient-to-b from-white via-sky-50/20 to-white">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-xs font-mono uppercase text-brand-blue font-bold">
              Consolidated Turnkey Quote
            </span>
            <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Tier: -{Math.round((1 - discountMultiplier) * 100)}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500">Estimated Turnkey Price Per Unit:</div>
            <div className="text-4xl sm:text-5xl font-extrabold font-display text-brand-navy">
              ${finalUnitPrice.toFixed(3)}
              <span className="text-sm font-mono text-slate-500 font-normal ml-2">/ Unit</span>
            </div>
            <div className="text-xs font-mono text-slate-600 pt-1">
              Total Production Run: <strong className="text-brand-blue font-bold">${finalTotalRun.toLocaleString()} USD</strong>
            </div>
          </div>

          {/* Pallets & Logistics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
              <div className="text-slate-500 text-[10px]">Total Pallet Footprint</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">{totalPallets} Pallets</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
              <div className="text-slate-500 text-[10px]">Est. Turnaround</div>
              <div className="text-lg font-bold text-emerald-700 mt-0.5">{leadTime}</div>
            </div>
          </div>

          {/* Form / Direct Handoff */}
          {quoteSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 text-xs font-mono">
              <div className="text-2xl text-emerald-600">✓</div>
              <div className="font-bold text-emerald-900">Formal RFQ Transmitted!</div>
              <p className="text-slate-600">Our engineering lead will review your specifications and issue the official production contract within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleFinalSubmit} className="space-y-3 pt-2">
              <input
                type="text"
                required
                defaultValue={currentUser.name || ''}
                placeholder="Full Name *"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-brand-blue focus:outline-none"
              />
              <input
                type="email"
                required
                defaultValue={currentUser.email || ''}
                placeholder="Corporate Email *"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-brand-blue focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-navy to-brand-blue text-white font-mono text-xs uppercase font-bold tracking-wider shadow-md hover:shadow-glow-blue transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Master RFQ to Engineering</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
