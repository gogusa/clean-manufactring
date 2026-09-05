import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { printMaterials, colorProcesses, calculatePrintQuote } from '../data/printHouseData';
import { 
  Palette, 
  Sparkles, 
  Layers, 
  Calculator, 
  BookmarkCheck, 
  ArrowRight, 
  CheckCircle2, 
  Box,
  Printer,
  Sliders,
  Type
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DesignPrintPage({ onOpenSaveModal }) {
  const navigate = useNavigate();
  const { 
    activeBottle, 
    activeCapColor, 
    brandName, 
    setBrandName, 
    tagline, 
    setTagline,
    activePrintMaterial,
    setActivePrintMaterial,
    activeColorProcess,
    setActiveColorProcess,
    volume,
    setVolume
  } = useProject();

  const [proofType, setProofType] = useState('digital');
  const [flavorNote, setFlavorNote] = useState('ELECTROLYTE IONIZED');
  const canvasRef = useRef(null);

  const printQuote = calculatePrintQuote({
    volume,
    materialId: activePrintMaterial.id,
    colorProcessId: activeColorProcess.id,
    proofType
  });

  // Render High-Resolution Print Mockup Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // Ambient studio background
    const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
    bgGrad.addColorStop(0, 'rgba(0, 180, 216, 0.1)');
    bgGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    const isCan = activeBottle.category === 'aluminum-can';
    const isGlass = activeBottle.category === 'glass';

    const bw = isCan ? 110 : isGlass ? 96 : 90;
    const bh = isCan ? 230 : isGlass ? 290 : 270;
    const bx = cx - bw / 2;
    const by = cy - bh / 2 + 10;

    // 1. Cap
    if (!isCan) {
      const capW = isGlass ? 34 : 38;
      const capH = isGlass ? 26 : 32;
      const capX = cx - capW / 2;
      const capY = by - capH - 4;

      ctx.fillStyle = activeCapColor;
      ctx.beginPath();
      ctx.roundRect(capX, capY, capW, capH, [6, 6, 2, 2]);
      ctx.fill();

      // Cap ridges
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      for (let rx = capX + 4; rx < capX + capW - 2; rx += 5) {
        ctx.beginPath();
        ctx.moveTo(rx, capY + 2);
        ctx.lineTo(rx, capY + capH - 2);
        ctx.stroke();
      }

      // Neck
      const neckW = 32;
      const neckH = 28;
      const neckX = cx - neckW / 2;
      ctx.fillStyle = activeBottle.baseColor;
      ctx.fillRect(neckX, by - 4, neckW, neckH);
    } else {
      // Can Rim
      const rimW = bw - 8;
      const rimH = 14;
      ctx.fillStyle = '#CBD5E1';
      ctx.beginPath();
      ctx.ellipse(cx, by - 2, rimW / 2, rimH / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Tab
      ctx.fillStyle = activeCapColor;
      ctx.fillRect(cx - 6, by - 6, 12, 16);
    }

    // 2. Container Body
    const bodyGrad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    bodyGrad.addColorStop(0, '#E2E8F0');
    bodyGrad.addColorStop(0.3, '#FFFFFF');
    bodyGrad.addColorStop(0.7, '#94A3B8');
    bodyGrad.addColorStop(1, '#334155');

    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.roundRect(bx, by + 16, bw, bh - 24, isCan ? 16 : isGlass ? 22 : 24);
    ctx.fill();

    // 3. Dynamic Label based on Selected Material Finish
    const labelW = bw - 4;
    const labelH = isCan ? 140 : 150;
    const labelX = cx - labelW / 2;
    const labelY = cy - labelH / 2 + 18;

    if (activePrintMaterial.id === 'metallic-foil-hologram') {
      const foil = ctx.createLinearGradient(labelX, labelY, labelX + labelW, labelY + labelH);
      foilGrad(foil);
      ctx.fillStyle = foil;
    } else if (activePrintMaterial.id === 'soft-touch-matte') {
      ctx.fillStyle = '#071A2F';
    } else if (activePrintMaterial.id === 'transparent-no-label') {
      ctx.fillStyle = 'rgba(11, 37, 69, 0.4)';
    } else if (activePrintMaterial.id === 'kraft-textured') {
      ctx.fillStyle = '#D97706';
    } else {
      ctx.fillStyle = '#0B2545';
    }

    ctx.beginPath();
    ctx.roundRect(labelX, labelY, labelW, labelH, 8);
    ctx.fill();

    // Border & Foil Trim
    ctx.strokeStyle = activePrintMaterial.id === 'metallic-foil-hologram' ? '#00F0FF' : 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cyan brand accent stripe
    ctx.fillStyle = '#00F0FF';
    ctx.fillRect(labelX + 8, labelY + 10, labelW - 16, 3);

    // Custom Brand Typography On Label
    ctx.save();
    ctx.textAlign = 'center';
    
    // Main Brand Name
    ctx.font = 'bold 14px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText((brandName || 'BRAND NAME').toUpperCase(), cx, labelY + 44);

    // Subtitle
    ctx.font = '600 8px "JetBrains Mono", monospace';
    ctx.fillStyle = '#00B4D8';
    ctx.fillText((tagline || 'PREMIUM HYDRATION').toUpperCase(), cx, labelY + 64);

    // Flavor / Origin Note
    ctx.font = 'bold 7px "JetBrains Mono", monospace';
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText(flavorNote.toUpperCase(), cx, labelY + 84);

    // Finish Tag
    ctx.font = '6px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(`${activePrintMaterial.name.toUpperCase()} • ${activeBottle.capacity}`, cx, labelY + 106);

    ctx.restore();

    // 4. Glare Layer
    const glare = ctx.createLinearGradient(bx, 0, bx + 24, 0);
    glare.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    glare.addColorStop(1, 'transparent');
    ctx.fillStyle = glare;
    ctx.fillRect(bx + 4, by + 18, 18, bh - 30);

    function foilGrad(g) {
      g.addColorStop(0, '#0B2545');
      g.addColorStop(0.3, '#00B4D8');
      g.addColorStop(0.6, '#00F0FF');
      g.addColorStop(1, '#023E8A');
    }

  }, [activeBottle, activeCapColor, brandName, tagline, flavorNote, activePrintMaterial]);

  const handlePushToCaseDesign = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.8 }
    });
    navigate('/case-box-design');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 space-y-12 font-sans">
      
      {/* Department Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="badge-tech">
            <Palette className="w-3.5 h-3.5 text-brand-blue" />
            DEPARTMENT 02 • PACKAGE DESIGN & PRINT HOUSE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-navy uppercase tracking-tight">
            PACKAGE DESIGN & <br />
            <span className="gradient-text-navy">PRINT FINISH HOUSE</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A full-scale turnkey print house for beverage packaging. Select specialty print substrates, metallic holographic cold foil, soft-touch velvet matte, raised spot UV, and extended color gamut matching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSaveModal}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-4 h-4 text-brand-blue" />
            <span>Save Print Spec</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Interactive Live Print Mockup Canvas */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="glass-card p-8 rounded-3xl border border-slate-200 space-y-6 text-center">
            
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-100 pb-3">
              <span className="text-brand-blue font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
                LIVE PACKAGE PRINT PROOF
              </span>
              <span>{activePrintMaterial.category}</span>
            </div>

            <canvas
              ref={canvasRef}
              width={340}
              height={410}
              className="w-full max-w-[300px] h-auto mx-auto drop-shadow-lg"
            />

            {/* Quick Print Cost Overview */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono space-y-1 text-left">
              <div className="flex justify-between text-slate-500">
                <span>Print Substrate:</span>
                <span className="text-slate-900 font-bold">{activePrintMaterial.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Color Gamut:</span>
                <span className="text-brand-blue font-bold">{activeColorProcess.name.split('(')[0]}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Est. Print / Unit:</span>
                <span className="text-emerald-700 font-bold">${printQuote.unitCost.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Proof Turnaround:</span>
                <span className="text-slate-900 font-bold">{printQuote.turnaround}</span>
              </div>
            </div>

            {/* Jump to Case Design Studio */}
            <button
              onClick={handlePushToCaseDesign}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-navy to-brand-blue text-white font-mono text-xs uppercase font-bold tracking-wider shadow-md hover:shadow-glow-blue transition-all flex items-center justify-center gap-2"
            >
              <Box className="w-4 h-4 text-brand-cyan" />
              <span>Next: Design Master Case & Boxes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Right: Print House Studio Controls */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Label Typography & Brand Text Editor */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-brand-blue" />
              1. Brand & Label Copy Typography:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 font-semibold mb-1">Primary Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  maxLength={18}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 font-display focus:border-brand-blue focus:outline-none"
                  placeholder="HYDRO PURE"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 font-semibold mb-1">Descriptor / Subtitle</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  maxLength={26}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-800 focus:border-brand-blue focus:outline-none"
                  placeholder="9.5+ pH Alkaline Water"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-600 font-semibold mb-1">Sub-Header / Chemistry Note</label>
              <input
                type="text"
                value={flavorNote}
                onChange={(e) => setFlavorNote(e.target.value)}
                maxLength={32}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-mono text-slate-800 focus:border-brand-blue focus:outline-none"
                placeholder="Molecular Hydrogen H2 Nano-Infusion"
              />
            </div>
          </div>

          {/* 2. Print Materials & Special Effects Selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              2. Select Print Material & Specialty Embellishments:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {printMaterials.map((mat) => {
                const isSelected = activePrintMaterial.id === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => setActivePrintMaterial(mat)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50/80 border-brand-blue shadow-md ring-2 ring-brand-blue/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-brand-blue bg-sky-100 px-2 py-0.5 rounded">
                        {mat.badge}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        {mat.feePerUnit === 0 ? 'Included' : `+${mat.feePerUnit.toFixed(3)}/unit`}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-display text-slate-900 mt-2">{mat.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Color Gamut & Plate Processes */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-4 h-4 text-brand-blue" />
              3. Color Matching Process & Press Proofing:
            </h3>

            <div className="space-y-3">
              {colorProcesses.map((proc) => {
                const isSelected = activeColorProcess.id === proc.id;
                return (
                  <div
                    key={proc.id}
                    onClick={() => setActiveColorProcess(proc)}
                    className={`p-4 rounded-xl border cursor-pointer text-xs font-mono transition-all flex items-start justify-between gap-4 ${
                      isSelected ? 'bg-sky-50 border-brand-blue text-brand-navy font-bold' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <div>
                      <div className="text-slate-900 font-bold">{proc.name}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5 font-normal">{proc.desc}</div>
                    </div>
                    <span className="text-brand-blue font-bold shrink-0">Plate: ${proc.plateCost}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Live Print Quote Engine */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 bg-gradient-to-br from-slate-50 to-sky-50/40">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-mono uppercase font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-brand-blue" />
                Live Print House Quote Breakdown:
              </h3>
              <span className="text-xs font-mono text-brand-blue font-bold">
                Run Volume: {volume.toLocaleString()} Units
              </span>
            </div>

            <div className="space-y-4">
              <input
                type="range"
                min="25000"
                max="500000"
                step="25000"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full"
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px]">Print / Unit</div>
                  <div className="text-base font-bold text-brand-navy mt-0.5">${printQuote.unitCost.toFixed(4)}</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px]">Plate / Setup</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">${printQuote.plateCost}</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px]">Total Print Run</div>
                  <div className="text-base font-bold text-emerald-700 mt-0.5">${printQuote.totalCost.toLocaleString()}</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px]">Proof Lead Time</div>
                  <div className="text-xs font-bold text-brand-blue mt-1">{printQuote.turnaround}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
