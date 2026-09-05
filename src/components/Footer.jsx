import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-steel-950 text-steel-400 py-16 px-4 sm:px-8 border-t border-steel-800 text-xs font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-steel-800">
        
        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-display font-extrabold text-lg tracking-tight">
            CLEAN <span className="text-clean-cyan font-light">MANUFACTURING</span>
          </div>
          <p className="text-xs text-steel-400 leading-relaxed font-sans">
            High-speed contract beverage manufacturing, custom water chemistry (Alkaline, Molecular H2, Pure RO), and turnkey co-packing services engineered for precision and scale.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
            <ShieldCheck className="w-4 h-4" />
            SQF Level 3 • FDA Registered
          </div>
        </div>

        {/* Manufacturing Lines */}
        <div className="space-y-3">
          <div className="font-bold text-white uppercase tracking-wider text-xs">Production Lines</div>
          <ul className="space-y-2 text-steel-400">
            <li><a href="#capabilities" className="hover:text-clean-cyan transition-colors">Line 1: 1,200 BPM Aluminum Bottle/Can</a></li>
            <li><a href="#capabilities" className="hover:text-clean-cyan transition-colors">Line 2: 600 BPM Flint Glass Luxury</a></li>
            <li><a href="#capabilities" className="hover:text-clean-cyan transition-colors">Line 3: 1,000 BPM 100% Eco rPET</a></li>
            <li><a href="#capabilities" className="hover:text-clean-cyan transition-colors">Line 4: Pilot R&D / Micro-Batches</a></li>
          </ul>
        </div>

        {/* Formulation Technologies */}
        <div className="space-y-3">
          <div className="font-bold text-white uppercase tracking-wider text-xs">Formulations</div>
          <ul className="space-y-2 text-steel-400">
            <li><a href="#water-tech" className="hover:text-clean-cyan transition-colors">Alkaline 9.5+ pH Ionized</a></li>
            <li><a href="#water-tech" className="hover:text-clean-cyan transition-colors">Molecular Hydrogen (H2) Infused</a></li>
            <li><a href="#water-tech" className="hover:text-clean-cyan transition-colors">Pharmaceutical 7-Stage RO</a></li>
            <li><a href="#water-tech" className="hover:text-clean-cyan transition-colors">Natural Artesian Spring</a></li>
          </ul>
        </div>

        {/* Plant Location & Contact */}
        <div className="space-y-3">
          <div className="font-bold text-white uppercase tracking-wider text-xs">Plant Contact</div>
          <div className="space-y-2 text-steel-400">
            <p className="text-white">Clean Manufacturing Inc.</p>
            <p>4400 N Scottsdale Rd, Ste. 308<br />Scottsdale, AZ 85251</p>
            <p className="text-clean-cyan font-bold">Tel: 866-244-1003</p>
            <p className="text-steel-300">manufacturing@cleanbottling.com</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-steel-500 text-[11px]">
        <div>&copy; {new Date().getFullYear()} Clean Manufacturing, Inc. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <span>cGMP 21 CFR Part 117</span>
          <span>ISO Class 7 Cleanroom</span>
          <span>Terms of Contract</span>
        </div>
      </div>
    </footer>
  );
}
