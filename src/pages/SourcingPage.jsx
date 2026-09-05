import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { bottleModels, bottleCategories, capTypes, labelApplicationTypes } from '../data/sourcingCatalog';
import { 
  Package, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  BookmarkCheck, 
  Sparkles, 
  Scale, 
  Ruler, 
  Grid,
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
  const canvasRef = useRef(null);

  const filteredBottles = selectedCategory === 'all' 
    ? bottleModels 
    : bottleModels.filter(b => b.category === selectedCategory);

  // Render Realistic 2D Bottle Visualization Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // Subtle soft background radial glow
    const glow = ctx.createRadialGradient(cx, cy, 30, cx, cy, 200);
    glow.addColorStop(0, 'rgba(0, 119, 182, 0.08)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    const isCan = activeBottle.category === 'aluminum-can';
    const isGlass = activeBottle.category === 'glass';
    const isRpet = activeBottle.category === 'rpet';

    // Width & height scaling based on bottle capacity
    let bw = isCan ? 100 : isGlass ? 92 : 88;
    let bh = isCan ? 220 : isGlass ? 290 : 260;

    if (activeBottle.capacity.includes('330ml')) {
      bh = isCan ? 190 : 220;
      bw = isCan ? 94 : 82;
    } else if (activeBottle.capacity.includes('750ml')) {
      bh = 300;
      bw = 96;
    }

    const bx = cx - bw / 2;
    const by = cy - bh / 2 + 15;

    // 1. Draw Cap / Neck
    if (!isCan) {
      const capW = isGlass ? 32 : 36;
      const capH = isGlass ? 24 : 32;
      const capX = cx - capW / 2;
      const capY = by - capH - 4;

      // Cap
      ctx.fillStyle = activeCapColor;
      ctx.beginPath();
      ctx.roundRect(capX, capY, capW, capH, [6, 6, 2, 2]);
      ctx.fill();

      // Cap ridges
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      for (let rx = capX + 4; rx < capX + capW - 2; rx += 5) {
        ctx.beginPath();
        ctx.moveTo(rx, capY + 2);
        ctx.lineTo(rx, capY + capH - 2);
        ctx.stroke();
      }

      // Neck
      const neckW = isGlass ? 28 : 32;
      const neckH = 28;
      const neckX = cx - neckW / 2;
      const neckY = by - 4;

      const neckGrad = ctx.createLinearGradient(neckX, 0, neckX + neckW, 0);
      neckGrad.addColorStop(0, '#FFFFFF');
      neckGrad.addColorStop(0.5, activeBottle.baseColor);
      neckGrad.addColorStop(1, '#94A3B8');

      ctx.fillStyle = neckGrad;
      ctx.fillRect(neckX, neckY, neckW, neckH);
    } else {
      // Can Rim
      const rimW = bw - 8;
      const rimH = 14;
      const rimX = cx - rimW / 2;
      const rimY = by - 8;

      ctx.fillStyle = '#CBD5E1';
      ctx.beginPath();
      ctx.ellipse(cx, rimY + rimH / 2, rimW / 2, rimH / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Colored Tab
      ctx.fillStyle = activeCapColor;
      ctx.fillRect(cx - 6, rimY + 2, 12, 16);
    }

    // 2. Bottle / Can Body
    const bodyGrad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    if (isGlass) {
      bodyGrad.addColorStop(0, 'rgba(186, 230, 253, 0.5)');
      bodyGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
      bodyGrad.addColorStop(0.7, 'rgba(186, 230, 253, 0.4)');
      bodyGrad.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
    } else if (activeBottle.category === 'aluminum-bottle') {
      bodyGrad.addColorStop(0, '#E2E8F0');
      bodyGrad.addColorStop(0.25, '#FFFFFF');
      bodyGrad.addColorStop(0.65, '#94A3B8');
      bodyGrad.addColorStop(1, '#475569');
    } else if (isCan) {
      bodyGrad.addColorStop(0, '#94A3B8');
      bodyGrad.addColorStop(0.3, '#F8FAFC');
      bodyGrad.addColorStop(0.7, '#64748B');
      bodyGrad.addColorStop(1, '#334155');
    } else {
      bodyGrad.addColorStop(0, 'rgba(224, 242, 254, 0.7)');
      bodyGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.9)');
      bodyGrad.addColorStop(0.8, 'rgba(186, 230, 253, 0.6)');
      bodyGrad.addColorStop(1, 'rgba(15, 23, 42, 0.35)');
    }

    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.roundRect(bx, by + 16, bw, bh - 24, isCan ? 16 : isGlass ? 22 : 24);
    ctx.fill();

    ctx.strokeStyle = 'rgba(15, 23, 42, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 3. Label Band
    const labelW = bw - 6;
    const labelH = isCan ? 130 : 140;
    const labelX = cx - labelW / 2;
    const labelY = cy - labelH / 2 + 20;

    ctx.fillStyle = '#0B2545';
    ctx.beginPath();
    ctx.roundRect(labelX, labelY, labelW, labelH, 8);
    ctx.fill();

    // Cyan highlight strip
    ctx.fillStyle = '#00B4D8';
    ctx.fillRect(labelX + 8, labelY + 10, labelW - 16, 3);

    // Label Typography
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(brandName || 'CLEAN BOTTLING', cx, labelY + 44);

    ctx.font = 'bold 8px "JetBrains Mono", monospace';
    ctx.fillStyle = '#00F0FF';
    ctx.fillText(activeBottle.capacity.toUpperCase(), cx, labelY + 65);

    ctx.font = '6px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('SQF LEVEL 3 CERTIFIED', cx, labelY + 85);
    ctx.restore();

    // 4. Specular Highlight / Gloss Glare
    const glare = ctx.createLinearGradient(bx, 0, bx + 22, 0);
    glare.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    glare.addColorStop(1, 'transparent');
    ctx.fillStyle = glare;
    ctx.fillRect(bx + 4, by + 18, 16, bh - 30);

    // Base Shadow
    ctx.beginPath();
    ctx.ellipse(cx, by + bh - 2, bw / 2 + 10, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(11, 37, 69, 0.08)';
    ctx.fill();

  }, [activeBottle, activeCapColor, brandName]);

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
            DEPARTMENT 01 • CONTAINER SOURCING & PACKAGING MODELS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-navy uppercase tracking-tight">
            BEVERAGE CONTAINER <br />
            <span className="gradient-text-navy">CATALOG & SOURCING MODELS</span>
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

      {/* Main Studio View: Canvas Left, Catalog Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Interactive 2D/3D Container Canvas */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="glass-card p-8 rounded-3xl border border-slate-200 space-y-6 text-center">
            
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-100 pb-3">
              <span className="text-brand-blue font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
                ACTIVE SOURCING MODEL
              </span>
              <span>{activeBottle.capacity}</span>
            </div>

            <canvas
              ref={canvasRef}
              width={340}
              height={400}
              className="w-full max-w-[300px] h-auto mx-auto"
            />

            <div className="space-y-1 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono">
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
                <span>Pallet Stack:</span>
                <span className="text-emerald-700 font-bold">{activeBottle.palletYield}</span>
              </div>
            </div>

            {/* Quick Jumper to Next Studio */}
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
                        ? 'bg-sky-50/70 border-brand-blue shadow-md ring-2 ring-brand-blue/20'
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
