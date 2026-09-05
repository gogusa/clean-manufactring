import React, { useState, useEffect, useRef } from 'react';
import { packagingSubstrates, capOptions, labelFinishes } from '../data/packagingData';
import { waterFormulas } from '../data/formulasData';
import { Sparkles, Layers, Sliders, Check, Download, ArrowDown, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BottleStudio({ onConfigureForRfq }) {
  const [substrate, setSubstrate] = useState(packagingSubstrates[0]);
  const [formula, setFormula] = useState(waterFormulas[0]);
  const [cap, setCap] = useState(capOptions[0]);
  const [finish, setFinish] = useState(labelFinishes[0]);
  const [brandName, setBrandName] = useState('PURE FORMULA');
  const [subText, setSubText] = useState('9.5+ pH ALKALINE WATER');

  const canvasRef = useRef(null);

  // Render dynamic 2D bottle simulation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // Ambient radial back-glow
    const glowGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
    glowGrad.addColorStop(0, `${formula.color}25`);
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    // Bottle geometry based on substrate
    const isCan = substrate.category === 'Can';
    const isGlass = substrate.category === 'Glass';
    const isBottle = substrate.id === 'aluminum-bottle';

    const bottleW = isCan ? 100 : isGlass ? 90 : 86;
    const bottleH = isCan ? 220 : isGlass ? 280 : 260;
    const bottleX = cx - bottleW / 2;
    const bottleY = cy - bottleH / 2 + 20;

    // 1. Draw Cap / Neck
    if (!isCan) {
      const capW = isGlass ? 32 : 36;
      const capH = isGlass ? 24 : 32;
      const capX = cx - capW / 2;
      const capY = bottleY - capH - 4;

      // Cap fill
      ctx.fillStyle = cap.hex;
      ctx.beginPath();
      ctx.roundRect(capX, capY, capW, capH, [6, 6, 2, 2]);
      ctx.fill();

      // Cap ridges / texture
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      for (let rx = capX + 4; rx < capX + capW - 2; rx += 5) {
        ctx.beginPath();
        ctx.moveTo(rx, capY + 2);
        ctx.lineTo(rx, capY + capH - 2);
        ctx.stroke();
      }

      // Bottle neck
      const neckW = isGlass ? 28 : 32;
      const neckH = 30;
      const neckX = cx - neckW / 2;
      const neckY = bottleY - 4;

      const neckGrad = ctx.createLinearGradient(neckX, 0, neckX + neckW, 0);
      neckGrad.addColorStop(0, 'rgba(255,255,255,0.2)');
      neckGrad.addColorStop(0.5, substrate.baseColor);
      neckGrad.addColorStop(1, 'rgba(0,0,0,0.3)');

      ctx.fillStyle = neckGrad;
      ctx.fillRect(neckX, neckY, neckW, neckH);
    } else {
      // Can top rim
      const rimW = bottleW - 8;
      const rimH = 14;
      const rimX = cx - rimW / 2;
      const rimY = bottleY - 8;

      ctx.fillStyle = '#CBD5E1';
      ctx.beginPath();
      ctx.ellipse(cx, rimY + rimH / 2, rimW / 2, rimH / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Tab
      ctx.fillStyle = cap.hex;
      ctx.fillRect(cx - 6, rimY + 2, 12, 16);
    }

    // 2. Main Bottle / Can Body
    const bodyGrad = ctx.createLinearGradient(bottleX, 0, bottleX + bottleW, 0);
    if (substrate.id === 'flint-glass') {
      bodyGrad.addColorStop(0, 'rgba(186, 230, 253, 0.45)');
      bodyGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
      bodyGrad.addColorStop(0.7, 'rgba(186, 230, 253, 0.3)');
      bodyGrad.addColorStop(1, 'rgba(15, 23, 42, 0.6)');
    } else if (substrate.id === 'aluminum-bottle') {
      bodyGrad.addColorStop(0, '#E2E8F0');
      bodyGrad.addColorStop(0.2, '#FFFFFF');
      bodyGrad.addColorStop(0.6, '#94A3B8');
      bodyGrad.addColorStop(1, '#334155');
    } else if (isCan) {
      bodyGrad.addColorStop(0, '#94A3B8');
      bodyGrad.addColorStop(0.3, '#F8FAFC');
      bodyGrad.addColorStop(0.7, '#64748B');
      bodyGrad.addColorStop(1, '#1E293B');
    } else {
      bodyGrad.addColorStop(0, 'rgba(224, 242, 254, 0.6)');
      bodyGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
      bodyGrad.addColorStop(0.8, 'rgba(186, 230, 253, 0.5)');
      bodyGrad.addColorStop(1, 'rgba(15, 23, 42, 0.5)');
    }

    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.roundRect(bottleX, bottleY + 16, bottleW, bottleH - 24, isCan ? 16 : isGlass ? 20 : 24);
    ctx.fill();

    // Subtle Outline
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3. Label Band
    const labelW = bottleW - 6;
    const labelH = isCan ? 130 : 140;
    const labelX = cx - labelW / 2;
    const labelY = cy - labelH / 2 + 20;

    // Label Finish Styling
    if (finish.id === 'matte') {
      ctx.fillStyle = '#071322';
    } else if (finish.id === 'foil') {
      const foilGrad = ctx.createLinearGradient(labelX, labelY, labelX + labelW, labelY + labelH);
      foilGrad.addColorStop(0, '#0B2545');
      foilGrad.addColorStop(0.5, '#00F0FF');
      foilGrad.addColorStop(1, '#023E8A');
      ctx.fillStyle = foilGrad;
    } else if (finish.id === 'clear') {
      ctx.fillStyle = 'rgba(11, 37, 69, 0.35)';
    } else {
      ctx.fillStyle = '#0B2545';
    }

    ctx.beginPath();
    ctx.roundRect(labelX, labelY, labelW, labelH, 8);
    ctx.fill();

    // Label Border
    ctx.strokeStyle = finish.id === 'foil' ? '#00F0FF' : 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Formula indicator stripe on label
    ctx.fillStyle = formula.color;
    ctx.fillRect(labelX + 6, labelY + 8, labelW - 12, 4);

    // 4. Custom Brand Typography onto Label
    ctx.save();
    ctx.textAlign = 'center';
    
    // Main Brand Name
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(brandName.toUpperCase() || 'CUSTOM BRAND', cx, labelY + 42);

    // Subtitle / Water Spec
    ctx.font = '600 8px "JetBrains Mono", monospace';
    ctx.fillStyle = formula.color;
    ctx.fillText(subText.toUpperCase(), cx, labelY + 62);

    // Formula Tag
    ctx.font = 'bold 7px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(formula.name.toUpperCase(), cx, labelY + 82);

    // Volume & Origin stamp
    ctx.font = '6px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748B';
    ctx.fillText(`${substrate.capacity} • SQF CERTIFIED`, cx, labelY + 104);

    ctx.restore();

    // 5. Specular Gloss Reflection Layer
    const gloss = ctx.createLinearGradient(bottleX, 0, bottleX + 25, 0);
    gloss.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
    gloss.addColorStop(1, 'transparent');
    ctx.fillStyle = gloss;
    ctx.fillRect(bottleX + 4, bottleY + 18, 18, bottleH - 30);

    // Shadow at base
    ctx.beginPath();
    ctx.ellipse(cx, bottleY + bottleH - 2, bottleW / 2 + 10, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();

  }, [substrate, formula, cap, finish, brandName, subText]);

  const handleApplyToRfq = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.8 }
    });
    if (onConfigureForRfq) {
      onConfigureForRfq({
        substrateId: substrate.id,
        formulaId: formula.id,
        finishId: finish.id,
        brandName
      });
    }
  };

  return (
    <section id="studio" className="py-24 px-4 sm:px-8 bg-steel-950 border-b border-steel-800 relative">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clean-cyan/10 border border-clean-cyan/30 text-clean-cyan text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE PACKAGING & PRODUCT PROTOTYPING
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight uppercase">
            CUSTOM BOTTLE & <br />
            <span className="gradient-text-cyan">FORMULATION STUDIO</span>
          </h2>
          <p className="text-sm sm:text-base text-steel-400 leading-relaxed">
            Customize your packaging substrate, cap closure, formula chemistry, and branding in real time to generate your formal manufacturing spec sheet.
          </p>
        </div>

        {/* Studio Layout: Canvas on Left, Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 2D/3D Bottle Visualizer Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-clean-cyan/30 w-full flex flex-col items-center relative overflow-hidden bg-dot-matrix shadow-2xl">
              
              <div className="w-full flex items-center justify-between text-xs font-mono text-steel-400 border-b border-steel-800 pb-3 mb-2">
                <span className="text-clean-cyan flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-clean-cyan animate-pulse"></span>
                  LIVE 2D RENDERING
                </span>
                <span className="text-steel-400">{substrate.capacity}</span>
              </div>

              <canvas
                ref={canvasRef}
                width={360}
                height={440}
                className="w-full max-w-[340px] h-auto rounded-2xl"
              />

              <div className="w-full pt-4 border-t border-steel-800 flex items-center justify-between text-xs font-mono text-steel-400">
                <span>Substrate: <strong className="text-white">{substrate.name}</strong></span>
                <span>Closure: <strong className="text-clean-cyan">{cap.name}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Studio Customization Panel */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-steel-700/80 space-y-6">
            
            {/* 1. Brand Name Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-steel-300 font-bold mb-1.5">
                  Brand Name On Label
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  maxLength={18}
                  className="w-full bg-steel-900 border border-steel-700 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:border-clean-cyan focus:outline-none font-display"
                  placeholder="Your Brand Name"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-steel-300 font-bold mb-1.5">
                  Descriptor / Subtitle
                </label>
                <input
                  type="text"
                  value={subText}
                  onChange={(e) => setSubText(e.target.value)}
                  maxLength={28}
                  className="w-full bg-steel-900 border border-steel-700 rounded-xl px-4 py-2.5 text-xs font-mono text-steel-200 focus:border-clean-cyan focus:outline-none"
                  placeholder="e.g. 9.5+ pH Alkaline Water"
                />
              </div>
            </div>

            {/* 2. Substrate Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-steel-300 font-bold">
                1. Select Packaging Substrate:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {packagingSubstrates.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSubstrate(s)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      substrate.id === s.id
                        ? 'bg-clean-navy border-clean-cyan text-white shadow-glow-cyan/20'
                        : 'bg-steel-900 border-steel-800 text-steel-400 hover:text-white hover:border-steel-700'
                    }`}
                  >
                    <div className="text-xs font-bold font-display leading-tight">{s.name}</div>
                    <div className="text-[10px] font-mono text-clean-cyan mt-1">{s.capacity}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Water Formula Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-steel-300 font-bold">
                2. Select Water Chemistry & Formula:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {waterFormulas.slice(0, 3).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormula(f)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formula.id === f.id
                        ? 'bg-clean-navy border-clean-cyan text-white shadow-glow-cyan/20'
                        : 'bg-steel-900 border-steel-800 text-steel-400 hover:text-white hover:border-steel-700'
                    }`}
                  >
                    <div className="text-xs font-bold font-display">{f.name}</div>
                    <div className="text-[10px] font-mono text-steel-400 mt-0.5 line-clamp-1">{f.tagline}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Cap & Closure Color */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-steel-300 font-bold">
                3. Closure & Cap Color:
              </label>
              <div className="flex flex-wrap gap-2">
                {capOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCap(c)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all ${
                      cap.id === c.id
                        ? 'border-clean-cyan bg-steel-900 text-white'
                        : 'border-steel-800 bg-steel-950 text-steel-400 hover:border-steel-700'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }}></span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Label Finish */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-steel-300 font-bold">
                4. Label Finish & Embellishment:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {labelFinishes.map((lf) => (
                  <button
                    key={lf.id}
                    onClick={() => setFinish(lf)}
                    className={`p-2.5 rounded-xl border text-xs font-mono transition-all text-center ${
                      finish.id === lf.id
                        ? 'bg-clean-cyan text-steel-950 font-bold border-clean-cyan'
                        : 'bg-steel-900 border-steel-800 text-steel-400 hover:text-white'
                    }`}
                  >
                    {lf.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Export To RFQ Button */}
            <div className="pt-4 border-t border-steel-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-steel-400">
                Min. Commercial Run: <strong className="text-white">{substrate.minRun}</strong>
              </div>

              <a
                href="#estimator"
                onClick={handleApplyToRfq}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-clean-cyan to-clean-blue text-steel-950 font-extrabold text-xs uppercase font-mono tracking-wider hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2"
              >
                <span>Export Configuration to RFQ</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
