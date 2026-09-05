import React from 'react';
import { plantCertifications, labCapabilities } from '../data/certificationsData';
import { ShieldCheck, FileCheck, CheckCircle2, Award, TestTubes } from 'lucide-react';

export default function QualityHub() {
  return (
    <section id="quality" className="py-24 px-4 sm:px-8 bg-steel-950 border-b border-steel-800 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            UNCOMPROMISING REGULATORY STANDARDS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight uppercase">
            QUALITY ASSURANCE & <br />
            <span className="gradient-text-cyan">PLANT CERTIFICATIONS</span>
          </h2>
          <p className="text-sm sm:text-base text-steel-400 leading-relaxed">
            Our cleanroom facility operates under the world's most stringent food safety benchmarks, validated by independent third-party GFSI audits and continuous in-line lab analytics.
          </p>
        </div>

        {/* 6 Certification Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plantCertifications.map((cert) => (
            <div key={cert.id} className="glass-panel p-6 sm:p-8 rounded-2xl border border-steel-800 hover:border-clean-cyan/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-clean-cyan bg-clean-cyan/10 px-2.5 py-1 rounded border border-clean-cyan/20">
                  {cert.badge}
                </span>
                <Award className="w-5 h-5 text-clean-cyan" />
              </div>

              <h3 className="text-lg font-bold font-display text-white">{cert.name}</h3>
              <div className="text-xs font-mono text-steel-400 font-semibold">{cert.authority}</div>
              <p className="text-xs text-steel-300 leading-relaxed pt-1">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Real-Time Laboratory Testing Protocols */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-steel-700/80 space-y-6 bg-steel-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-800 pb-4">
            <div>
              <span className="text-xs font-mono text-clean-cyan uppercase font-bold flex items-center gap-2">
                <TestTubes className="w-4 h-4 text-clean-cyan" />
                ON-SITE TESTING & BATCH VALIDATION
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-1">In-Line Laboratory Operations</h3>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-bold">
              100% Pallet Hold & Release Protocol
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {labCapabilities.map((lab, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-steel-950 border border-steel-800/80 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-clean-cyan shrink-0" />
                  <span>{lab.name}</span>
                </div>
                <div className="text-[11px] font-mono text-clean-sky pl-5">
                  Freq: {lab.freq}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
