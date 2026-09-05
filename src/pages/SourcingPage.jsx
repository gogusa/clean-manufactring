import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { bottleModels, bottleCategories, capTypes, labelApplicationTypes } from '../data/sourcingCatalog';
import ThreeBottleViewer from '../components/ThreeBottleViewer';
import { 
  Package, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  BookmarkCheck, 
  Sparkles, 
  Ruler, 
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SourcingPage({ onOpenSaveModal }) {
  const navigate = useNavigate();
  const { 
    activeBottle, 
    setActiveBottle, 
    activeCap, 
    setActiveCap, 
    activeCapColor, 
    setActiveCapColor,
    brandName 
  } = useProject();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLabelType, setSelectedLabelType] = useState(labelApplicationTypes[0]);

  const filteredBottles = selectedCategory === 'all' 
    ? bottleModels 
    : bottleModels.filter(b => b.category === selectedCategory);

  const handlePushToPrintHouse = () => {
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 }
    });
    navigate('/design-print');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 space-y-12 font-sans">
      
      {/* Department Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="badge-tech">
            <Package className="w-3.5 h-3.5 text-brand-blue" />
            DEPARTMENT 01 • CONTAINER SOURCING & 3D MODELS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-navy uppercase tracking-tight">
            BEVERAGE CONTAINER <br />
            <span className="gradient-text-navy">CATALOG & 3D MODELS</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Select from our certified inventory of sleek aluminum bottles, slimline cans, heavy-base flint glass, and 100% PCR eco rPET. Complete with neck finishes, closure compatibility, and label dimension specs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSaveModal}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-4 h-4 text-brand-blue" />
            <span>Save Sourcing Spec</span>
          </button>
        </div>
      </div>

      {/* Main Studio View: 3D WebGL Viewer Left, Catalog Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Photorealistic 3D Three.js Bottle Viewer */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-center">
            
            <ThreeBottleViewer
              bottle={activeBottle}
              capColor={activeCapColor}
              brandName={brandName}
              tagline="9.5+ pH ALKALINE WATER"
              printMaterialId="soft-touch-matte"
            />

            {/* Quick Sourcing Data */}
            <div className="space-y-1.5 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Selected Container:</span>
                <span className="text-slate-900 font-bold">{activeBottle.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Neck Closure:</span>
                <span className="text-brand-blue font-bold">{activeCap.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tare Weight:</span>
                <span className="text-slate-900 font-bold">{activeBottle.tareWeight}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Pallet Yield:</span>
                <span className="text-emerald-700 font-bold">{activeBottle.palletYield}</span>
              </div>
            </div>

            {/* Jump to Design Studio */}
            <button
              onClick={handlePushToPrintHouse}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-navy to-brand-blue text-white font-mono text-xs uppercase font-bold tracking-wider shadow-md hover:shadow-glow-blue transition-all flex items-center justify-center gap-2"
            >
              <Palette className="w-4 h-4 text-brand-cyan" />
              <span>Push to Package Design & Print House</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Right: Sourcing Catalog & Configurator */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            {bottleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-brand-navy shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Bottle Cards Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-blue" />
              1. Select Container Format & Capacity:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredBottles.map((bottle) => {
                const isSelected = activeBottle.id === bottle.id;
                return (
                  <div
                    key={bottle.id}
                    onClick={() => setActiveBottle(bottle)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50/80 border-brand-blue shadow-md ring-2 ring-brand-blue/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-brand-blue">{bottle.capacity}</span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs">
                          ✓
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold font-display text-slate-900 mt-1">{bottle.name}</h4>
                    <div className="text-[11px] font-mono text-slate-500 mt-1">{bottle.dimensions}</div>

                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-600">
                      <div>MOQ: <strong className="text-slate-900">{bottle.moq}</strong></div>
                      <div>Tare: <strong className="text-slate-900">{bottle.tareWeight}</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cap & Closure Selector */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-blue" />
                2. Select Cap Closure & Color:
              </h3>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                Tamper-Evident Certified
              </span>
            </div>

            {/* Cap Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {capTypes.map((cap) => {
                const isSelected = activeCap.id === cap.id;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveCap(cap)}
                    className={`p-3 rounded-xl border text-left text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-brand-blue text-brand-navy font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div>{cap.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Color Swatches */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-slate-600 font-semibold block">Cap Color Finish:</span>
              <div className="flex flex-wrap gap-2">
                {activeCap.colors.map((colorHex) => (
                  <button
                    key={colorHex}
                    onClick={() => setActiveCapColor(colorHex)}
                    className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all ${
                      activeCapColor === colorHex ? 'border-brand-blue scale-110 shadow-md' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: colorHex }}
                  >
                    {activeCapColor === colorHex && <span className="text-white text-xs font-bold drop-shadow">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Label Dimensions & Engineering Specs */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-brand-blue" />
              3. Label Dimensions & Application Type:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {labelApplicationTypes.map((labelType) => {
                const isSelected = selectedLabelType.id === labelType.id;
                return (
                  <div
                    key={labelType.id}
                    onClick={() => setSelectedLabelType(labelType)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-brand-blue shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold font-display text-slate-900">{labelType.name}</div>
                    <div className="text-[11px] font-mono text-brand-blue mt-0.5">Best For: {labelType.bestFor}</div>
                    <p className="text-[11px] text-slate-500 mt-1">{labelType.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
              Target Dipline Label Template: <strong className="text-slate-900">{activeBottle.labelDimensions}</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
