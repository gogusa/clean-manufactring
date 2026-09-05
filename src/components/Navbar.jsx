import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, Zap, Phone, ArrowRight, Layers, FileText } from 'lucide-react';

export default function Navbar({ onOpenRfq }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Plant Telemetry Ticker */}
      <div className="bg-steel-950 border-b border-clean-cyan/20 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-steel-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-clean-cyan/15 text-clean-cyan border border-clean-cyan/30">
              <span className="w-1.5 h-1.5 rounded-full bg-clean-cyan animate-ping"></span>
              FACILITY STATUS: OPERATIONAL
            </span>
            <span className="hidden sm:inline text-steel-300 font-mono text-[11px]">
              High-Speed Line Speeds up to 1,200 BPM | SQF Level 3 Certified
            </span>
          </div>
          <div className="flex items-center gap-5 text-[11px] font-mono">
            <span className="hidden md:flex items-center gap-1.5 text-steel-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ISO Class 7 Cleanroom
            </span>
            <a href="tel:866-244-1003" className="flex items-center gap-1.5 text-clean-cyan hover:text-white transition-colors">
              <Phone className="w-3 h-3" />
              Plant Direct: 866-244-1003
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-header shadow-2xl py-3' : 'bg-steel-950/90 backdrop-blur-md py-4 border-b border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-clean-navy via-steel-900 to-steel-950 border border-clean-cyan/40 flex items-center justify-center shadow-glow-cyan/20 group-hover:border-clean-cyan transition-colors">
              <svg className="w-6 h-6 text-clean-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-extrabold font-display tracking-tight text-white flex items-center gap-1.5">
                CLEAN <span className="text-clean-cyan font-light">MANUFACTURING</span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-steel-400 uppercase">
                Turnkey Beverage Co-Packing
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-steel-300 uppercase tracking-wider font-mono">
            <a href="#capabilities" className="hover:text-clean-cyan transition-colors">Line Capabilities</a>
            <a href="#water-tech" className="hover:text-clean-cyan transition-colors">Water & Formulations</a>
            <a href="#studio" className="hover:text-clean-cyan transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-clean-cyan animate-pulse"></span>
              Bottle Studio
            </a>
            <a href="#estimator" className="hover:text-clean-cyan transition-colors">RFQ Estimator</a>
            <a href="#quality" className="hover:text-clean-cyan transition-colors">Quality & Certs</a>
            <a href="#contact" className="hover:text-clean-cyan transition-colors">Plant Tour</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenRfq}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-clean-blue to-clean-cyan text-steel-950 font-bold text-xs uppercase font-mono tracking-wider hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Instant RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-steel-900 border border-steel-800 text-steel-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pb-6 pt-2 bg-steel-950 border-b border-steel-800 space-y-3 font-mono text-sm">
            <a onClick={() => setMobileMenuOpen(false)} href="#capabilities" className="block py-2 text-steel-300 hover:text-clean-cyan">Line Capabilities</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#water-tech" className="block py-2 text-steel-300 hover:text-clean-cyan">Water & Formulations</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#studio" className="block py-2 text-clean-cyan">★ 3D Bottle Studio</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#estimator" className="block py-2 text-steel-300 hover:text-clean-cyan">RFQ Cost Matrix</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#quality" className="block py-2 text-steel-300 hover:text-clean-cyan">Quality & Certifications</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#contact" className="block py-2 text-steel-300 hover:text-clean-cyan">Plant Tours & Contact</a>
            <div className="pt-3 border-t border-steel-800 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenRfq(); }}
                className="w-full py-3 rounded-xl bg-clean-cyan text-steel-950 font-bold uppercase text-xs"
              >
                Instant RFQ Quote
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
