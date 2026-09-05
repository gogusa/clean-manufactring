import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { 
  Package, 
  Palette, 
  Box, 
  Droplet, 
  Factory, 
  Calculator, 
  User, 
  BookmarkCheck, 
  Menu, 
  X, 
  ArrowRight,
  Phone,
  Sparkles
} from 'lucide-react';

export default function Header({ onOpenSaveModal }) {
  const location = useLocation();
  const { savedProjects, brandName, activeBottle } = useProject();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/sourcing", label: "1. Sourcing", icon: Package, subtitle: "Bottles, Caps & Labels" },
    { to: "/design-print", label: "2. Print House", icon: Palette, subtitle: "Package Design & Foils" },
    { to: "/case-box-design", label: "3. Case & Box", icon: Box, subtitle: "Corrugated & Shrink" },
    { to: "/formulation", label: "4. Water Chemistry", icon: Droplet, subtitle: "Alkaline, H2, RO" },
    { to: "/manufacturing", label: "5. Co-Packing Lines", icon: Factory, subtitle: "1,200 BPM & Cleanroom" },
    { to: "/quote", label: "Turnkey RFQ", icon: Calculator, subtitle: "Master Cost Matrix" },
  ];

  return (
    <>
      {/* Top Telemetry & Customer Bar */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 sm:px-8 border-b border-brand-navyDark">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono">
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan text-brand-navyDark uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-navy animate-ping"></span>
              ISO CLASS 7 CLEANROOM
            </span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              Turnkey Beverage Co-Packing • High-Speed Line Speeds to 1,200 BPM
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <a href="tel:866-244-1003" className="flex items-center gap-1.5 text-brand-cyan hover:underline">
              <Phone className="w-3 h-3" />
              Plant Direct: 866-244-1003
            </a>
            
            <Link to="/account" className="flex items-center gap-1.5 text-white hover:text-brand-cyan font-bold bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10 transition-colors">
              <User className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Customer Portal</span>
              {savedProjects.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-brand-cyan text-brand-navyDark text-[10px] flex items-center justify-center font-bold">
                  {savedProjects.length}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>

      {/* Main Glass Header */}
      <header className="sticky top-0 z-40 glass-header py-3.5 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-navy via-brand-blue to-brand-sky flex items-center justify-center text-white shadow-md shadow-brand-navy/10 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <div className="text-xl font-extrabold font-display tracking-tight text-brand-navy flex items-center gap-1">
                CLEAN <span className="text-brand-blue font-light">MANUFACTURING</span>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                Turnkey Co-Packing & Packaging Studios
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-slate-700 hover:text-brand-blue hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-cyan' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSaveModal}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
              title="Save current configuration to your account"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-brand-blue" />
              <span>Save Spec</span>
            </button>

            <Link
              to="/quote"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-navy to-brand-blue text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-glow-blue transition-all flex items-center gap-1.5"
            >
              <span>Instant RFQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="xl:hidden mt-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                    isActive ? 'bg-brand-navy text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-cyan' : 'text-brand-blue'}`} />
                    <div>
                      <div>{link.label}</div>
                      <div className={`text-[11px] font-normal ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{link.subtitle}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 text-center rounded-xl bg-slate-100 text-slate-800 text-xs font-bold font-mono"
              >
                Customer Portal ({savedProjects.length})
              </Link>
              <Link
                to="/quote"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 text-center rounded-xl bg-brand-navy text-white text-xs font-bold font-mono uppercase"
              >
                Master RFQ
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
