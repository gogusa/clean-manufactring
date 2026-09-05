import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 py-16 px-4 sm:px-8 border-t border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
        
        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-navy flex items-center justify-center text-brand-cyan shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-display font-extrabold text-lg text-brand-navy">
              CLEAN <span className="text-brand-blue font-light">MANUFACTURING</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Premier turnkey beverage co-packing, packaging design print house, secondary case packaging engineering, and water formulation platform.
          </p>

          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            SQF Level 3 • FDA cGMP Part 117
          </div>
        </div>

        {/* Specialized Department Portals */}
        <div className="space-y-3 font-mono">
          <div className="font-bold text-brand-navy uppercase tracking-wider text-xs">Department Portals</div>
          <ul className="space-y-2 text-slate-500">
            <li><Link to="/sourcing" className="hover:text-brand-blue transition-colors">1. Sourcing & Packaging Models</Link></li>
            <li><Link to="/design-print" className="hover:text-brand-blue transition-colors">2. Package Design & Print House</Link></li>
            <li><Link to="/case-box-design" className="hover:text-brand-blue transition-colors">3. Case & Box Design Center</Link></li>
            <li><Link to="/formulation" className="hover:text-brand-blue transition-colors">4. Water Chemistry & R&D</Link></li>
            <li><Link to="/manufacturing" className="hover:text-brand-blue transition-colors">5. 1,200 BPM Co-Packing Lines</Link></li>
          </ul>
        </div>

        {/* Client Tools & Portal */}
        <div className="space-y-3 font-mono">
          <div className="font-bold text-brand-navy uppercase tracking-wider text-xs">Client Tools</div>
          <ul className="space-y-2 text-slate-500">
            <li><Link to="/account" className="hover:text-brand-blue transition-colors">Customer Account & Saved Specs</Link></li>
            <li><Link to="/quote" className="hover:text-brand-blue transition-colors">Consolidated RFQ Cost Matrix</Link></li>
            <li><Link to="/account" className="hover:text-brand-blue transition-colors">Request Physical Sample Kit</Link></li>
            <li><Link to="/manufacturing" className="hover:text-brand-blue transition-colors">Plant Tour & Cleanroom Audit</Link></li>
          </ul>
        </div>

        {/* Plant Headquarters & Contact */}
        <div className="space-y-3 font-mono">
          <div className="font-bold text-brand-navy uppercase tracking-wider text-xs">Plant Contact</div>
          <div className="space-y-2 text-slate-600 text-xs">
            <p className="font-bold text-slate-900">Clean Manufacturing, Inc.</p>
            <p className="text-slate-500">4400 N Scottsdale Rd, Ste. 308<br />Scottsdale, AZ 85251</p>
            <p className="text-brand-blue font-bold">Tel: 866-244-1003</p>
            <p className="text-slate-500">manufacturing@cleanbottling.com</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px] font-mono">
        <div>&copy; {new Date().getFullYear()} Clean Manufacturing, Inc. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <span>ISO Class 7 Cleanroom</span>
          <span>GFSI SQF Benchmark</span>
          <span>Privacy & Terms</span>
        </div>
      </div>
    </footer>
  );
}
