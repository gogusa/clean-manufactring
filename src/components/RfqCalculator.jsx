import React, { useState, useMemo } from 'react';
import { packagingSubstrates, labelFinishes } from '../data/packagingData';
import { waterFormulas } from '../data/formulasData';
import { calculateRFQEstimate } from '../data/rfqPricingTiers';
import { Calculator, Gauge, ShieldCheck, ArrowRight, FileSpreadsheet, Sparkles } from 'lucide-react';

export default function RfqCalculator({ initialConfig, onOpenRfqWithData }) {
  const [volume, setVolume] = useState(100000);
  const [substrateId, setSubstrateId] = useState(initialConfig?.substrateId || 'aluminum-bottle');
  const [formulaId, setFormulaId] = useState(initialConfig?.formulaId || 'alkaline');
  const [finishId, setFinishId] = useState(initialConfig?.finishId || 'gloss');
  const [nitrogenDosing, setNitrogenDosing] = useState(true);

  // Synchronize if initialConfig changes
  React.useEffect(() => {
    if (initialConfig?.substrateId) setSubstrateId(initialConfig.substrateId);
    if (initialConfig?.formulaId) setFormulaId(initialConfig.formulaId);
    if (initialConfig?.finishId) setFinishId(initialConfig.finishId);
  }, [initialConfig]);

  const estimate = useMemo(() => {
    return calculateRFQEstimate({
      volume,
      substrateId,
      formulaId,
      finishId,
      liquidNitrogenDosing: nitrogenDosing
    });
  }, [volume, substrateId, formulaId, finishId, nitrogenDosing]);

  const handleLaunchModal = () => {
    if (onOpenRfqWithData) {
      onOpenRfqWithData({
        ...estimate,
        substrateId,
        formulaId,
        finishId,
        nitrogenDosing
      });
    }
  };

  return (
    <section id="estimator" className="py-24 px-4 sm:px-8 bg-steel-900/60 border-b border-steel-800 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clean-cyan/10 border border-clean-cyan/30 text-clean-cyan text-xs font-mono font-bold uppercase">
              <Calculator className="w-3.5 h-3.5" />
              DYNAMIC TURNKEY COST MATRIX
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight uppercase">
              PRODUCTION ESTIMATOR & <br />
              <span className="gradient-text-cyan">RFQ PRICING ENGINE</span>
            </h2>
            <p className="text-sm sm:text-base text-steel-400 leading-relaxed">
              Transparent, volume-tiered contract manufacturing quotes with live pallet calculation, container yield, and turnaround schedule.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-steel-950 border border-steel-800 text-xs font-mono text-steel-300 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-white font-bold">100% Quality Guarantee</div>
              <div className="text-steel-400">COA & Micro Clearance Included</div>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Variables */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-steel-700/80 space-y-8">
            
            {/* Volume Range Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-xs font-mono uppercase text-steel-400 font-bold">Production Volume (Units):</label>
                  <div className="text-3xl sm:text-4xl font-extrabold font-display text-clean-cyan mt-1">
                    {volume.toLocaleString()} <span className="text-sm font-mono text-steel-400 font-normal">Units</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  {estimate.discountTier}
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

              <div className="flex justify-between text-[11px] font-mono text-steel-500">
                <span>25K (Pilot Run)</span>
                <span>100K (Commercial)</span>
                <span>500K</span>
                <span>1M+ (Enterprise Scale)</span>
              </div>
            </div>

            {/* Substrate Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-steel-400 font-bold">Packaging Substrate:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {packagingSubstrates.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSubstrateId(s.id)}
                    className={`p-3 rounded-xl border text-xs font-mono transition-all text-left ${
                      substrateId === s.id
                        ? 'bg-clean-navy border-clean-cyan text-white shadow-glow-cyan/20'
                        : 'bg-steel-950 border-steel-800 text-steel-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold font-display">{s.name}</div>
                    <div className="text-[10px] text-clean-cyan mt-0.5">{s.capacity}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-steel-400 font-bold">Water Formula Profile:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {waterFormulas.slice(0, 3).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormulaId(f.id)}
                    className={`p-3 rounded-xl border text-xs font-mono transition-all text-left ${
                      formulaId === f.id
                        ? 'bg-clean-navy border-clean-cyan text-white shadow-glow-cyan/20'
                        : 'bg-steel-950 border-steel-800 text-steel-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold font-display">{f.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Liquid Nitrogen Dosing Switch */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-steel-950 border border-steel-800">
              <div>
                <div className="text-xs font-mono text-white font-bold">Liquid Nitrogen (LN2) Dosing & Deoxygenation</div>
                <div className="text-[11px] text-steel-400">Maintains structural bottle rigidity and prevents dissolved oxygen degradation</div>
              </div>
              <input
                type="checkbox"
                checked={nitrogenDosing}
                onChange={(e) => setNitrogenDosing(e.target.checked)}
                className="w-5 h-5 accent-clean-cyan rounded"
              />
            </div>

          </div>

          {/* Right: Live Calculated Output Card */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-clean-cyan/40 space-y-6 relative shadow-2xl bg-steel-950/90">
            <div className="flex items-center justify-between border-b border-steel-800 pb-4">
              <span className="text-xs font-mono uppercase text-clean-cyan font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-clean-cyan" />
                ESTIMATED UNIT ECONOMICS
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Tier: -{estimate.discountPercent}%
              </span>
            </div>

            {/* Main Price Headline */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-steel-400">Est. Price Per Unit (Ex-Works):</div>
              <div className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                ${estimate.unitPrice.toFixed(3)}
                <span className="text-sm font-mono text-steel-400 font-normal ml-2">/ Unit</span>
              </div>
              <div className="text-xs font-mono text-steel-400 pt-1">
                Total Production Run: <strong className="text-clean-cyan font-bold">${estimate.totalPrice.toLocaleString()} USD</strong>
              </div>
            </div>

            {/* Logistics & Pallet Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-steel-900/80 border border-steel-800">
                <div className="text-[11px] font-mono text-steel-400">Total Pallet Footprint</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">{estimate.totalPallets} Pallets</div>
                <div className="text-[10px] text-steel-500 font-mono mt-0.5">({estimate.unitsPerPallet} units/pallet)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-steel-900/80 border border-steel-800">
                <div className="text-[11px] font-mono text-steel-400">Est. Lead Time</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{estimate.leadTime}</div>
                <div className="text-[10px] text-steel-500 font-mono mt-0.5">Upon art approval</div>
              </div>
            </div>

            {/* Setup & Inclusions */}
            <div className="p-4 rounded-xl bg-steel-900/40 border border-steel-800/80 space-y-1.5 text-xs text-steel-300 font-mono">
              <div className="flex justify-between">
                <span>Setup & Plate Tooling:</span>
                <span className="text-white font-bold">{estimate.toolingSetup === 0 ? 'FREE ($0)' : `$${estimate.toolingSetup}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Container Loading QA:</span>
                <span className="text-emerald-400 font-bold">Included</span>
              </div>
              <div className="flex justify-between">
                <span>Batch COA Certificate:</span>
                <span className="text-emerald-400 font-bold">Included</span>
              </div>
            </div>

            {/* Action Trigger */}
            <button
              onClick={handleLaunchModal}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-clean-cyan to-clean-blue text-steel-950 font-extrabold text-sm uppercase font-mono tracking-wider hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Submit Formal Production RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
