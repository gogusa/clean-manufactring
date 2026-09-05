import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productionLines } from '../data/facilityData';
import { plantCertifications, labCapabilities } from '../data/certificationsData';
import PlantHud from '../components/PlantHud';
import { 
  Factory, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Calculator, 
  ArrowRight, 
  Calendar, 
  Award,
  BookmarkCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ManufacturingPage({ onOpenSaveModal }) {
  const navigate = useNavigate();
  const [activeLine, setActiveLine] = useState(productionLines[0]);
  const [tourBooked, setTourBooked] = useState(false);

  const handleBookTour = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTourBooked(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 space-y-16 font-sans">
      
      {/* Department Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="badge-tech">
            <Factory className="w-3.5 h-3.5 text-brand-blue" />
            DEPARTMENT 05 • HIGH-SPEED CO-PACKING LINES & AUTOMATION
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-navy uppercase tracking-tight">
            AUTOMATED CO-PACKING <br />
            <span className="gradient-text-navy">LINES & CLEANROOM FACILITY</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Four specialized high-speed bottling and canning monoblocks. Operating under positive-pressure ISO Class 7 HEPA cleanrooms with liquid nitrogen dosing, online laser coding, and SQF Level 3 validation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/quote')}
            className="px-6 py-3 rounded-2xl bg-brand-navy text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-brand-blue shadow-md transition-all flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-brand-cyan" />
            <span>Generate Master Turnkey RFQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-Time Plant Telemetry HUD Bar */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md">
        <PlantHud />
      </div>

      {/* Production Lines Interactive Explorer */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-display text-brand-navy flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-blue" />
            Production Monoblock Lines
          </h2>
          <span className="text-xs font-mono text-slate-500 font-bold">
            Average OEE: <strong className="text-emerald-700">98.4%</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Line Selection Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {productionLines.map((line) => {
              const isSelected = activeLine.id === line.id;
              return (
                <div
                  key={line.id}
                  onClick={() => setActiveLine(line)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-50/80 border-brand-blue shadow-md ring-2 ring-brand-blue/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-blue">{line.speed}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      OEE: {line.oee}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900 mt-1">{line.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{line.fillType}</div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Line Engineering Spec Card */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-brand-blue font-bold">Engineering Specifications</span>
                <h3 className="text-2xl font-bold font-display text-brand-navy mt-1">{activeLine.name}</h3>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-500">Rated Speed</div>
                <div className="text-xl font-bold font-mono text-brand-blue">{activeLine.speed}</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-600 font-bold uppercase block">Filling Technology</span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 font-bold flex items-center gap-3">
                <Zap className="w-4 h-4 text-brand-blue shrink-0" />
                <span>{activeLine.fillType}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-600 font-bold uppercase block">Compatible Formats</span>
              <div className="flex flex-wrap gap-2">
                {activeLine.sizes.map((size, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 font-semibold">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-600 font-bold uppercase block">In-Line Automation Highlights</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeLine.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Certifications & Quality Benchmarks Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="badge-tech mx-auto">
            <Award className="w-3.5 h-3.5 text-brand-blue" />
            REGULATORY CREDENTIALS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-brand-navy">
            Plant Certifications & Audit Ratings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plantCertifications.map((cert) => (
            <div key={cert.id} className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-brand-blue bg-sky-50 px-2 py-0.5 rounded">
                  {cert.badge}
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold font-display text-brand-navy">{cert.name}</h3>
              <div className="text-xs font-mono text-slate-500 font-semibold">{cert.authority}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Plant Walkthrough & Audit Form */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-sky-200 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-blue font-bold uppercase">
            <Calendar className="w-4 h-4" />
            On-Site Facility Walkthrough
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-brand-navy">
            Book an Executive Plant Tour & Cleanroom Audit
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Inspect our high-speed monoblock lines, cleanrooms, and testing laboratory in person. Tours are hosted Monday through Friday by our Lead Manufacturing Engineer.
          </p>

          {tourBooked ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <div className="text-2xl">✓</div>
              <div className="font-bold text-emerald-900">Plant Tour Request Received!</div>
              <p className="text-xs text-emerald-700">Our engineering coordinator will reach out within 24 hours to confirm your scheduled walkthrough date.</p>
            </div>
          ) : (
            <form onSubmit={handleBookTour} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <input
                type="text"
                required
                placeholder="Full Name"
                className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:border-brand-blue focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Corporate Email"
                className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:border-brand-blue focus:outline-none"
              />
              <button
                type="submit"
                className="py-3 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-mono text-xs uppercase font-bold tracking-wider transition-all"
              >
                Schedule Tour
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
