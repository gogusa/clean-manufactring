import React from 'react';
import { Link } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { 
  Package, 
  Palette, 
  Box, 
  Droplets, 
  Factory, 
  Calculator, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Cpu,
  Layers,
  Award
} from 'lucide-react';

export default function HomePage({ onOpenSaveModal }) {
  const { savedProjects } = useProject();

  const departments = [
    {
      to: "/sourcing",
      number: "01",
      title: "Sourcing & Packaging Models",
      icon: Package,
      badge: "Shapes & Sizes",
      desc: "Explore realistic visual models of sought-after sleek aluminum bottles, slimline cans, flint glass, and eco rPET with technical neck finishes and cap closures.",
      features: ["Aluminum Bottles (330ml, 500ml, 750ml)", "Cans (250ml slim to 16oz tallboy)", "Flint Glass (Heavy Base 750ml)", "Caps: ROPP, Crown, Sports & Tabs"]
    },
    {
      to: "/design-print",
      number: "02",
      title: "Package Design & Print House",
      icon: Palette,
      badge: "Print Finishes & Foils",
      desc: "Full-scale packaging print house. Customize label artwork, select metallic foils, soft-touch velvet matte, raised spot UV, or transparent no-label look with instant print quotes.",
      features: ["Cold Foil Metallic & Holographic", "Soft-Touch Matte & High Gloss", "Raised Spot UV Tactile Texture", "Instant Plate & Unit Print Matrix"]
    },
    {
      to: "/case-box-design",
      number: "03",
      title: "Case & Secondary Box Design",
      icon: Box,
      badge: "Corrugated & Shrink",
      desc: "Interactive case packaging studio. Design 12/24-pack master RSC cartons, registered printed shrink wrap bundles, retail-ready display (RRD) trays, and DTC shipper boxes.",
      features: ["12/24 Master Corrugated Boxes", "Printed Shrink Film Bundles", "Club Store Pallet Display Trays", "Pallet Yield & Stacking Math"]
    },
    {
      to: "/formulation",
      number: "04",
      title: "Water Chemistry & Formulation",
      icon: Droplets,
      badge: "Proprietary R&D",
      desc: "Proprietary beverage chemistry: Titanium-platinum ionized Alkaline (8.8–9.5+ pH), dissolved Molecular Hydrogen (H₂ nanobubbles), 7-Stage RO, and custom electrolyte profiling.",
      features: ["Alkaline 9.5+ pH Ionization", "Molecular Hydrogen (1.6+ PPM)", "Pharmaceutical 7-Stage RO", "Custom Electrolytes & Minerals"]
    },
    {
      to: "/manufacturing",
      number: "05",
      title: "High-Speed Co-Packing Lines",
      icon: Factory,
      badge: "1,200 BPM Capacity",
      desc: "High-speed automated monoblocks with ISO Class 7 cleanroom positive-pressure enclosure, liquid nitrogen dosing, and automated robotic case packing.",
      features: ["1,200 BPM Aluminum / Can Line", "600 BPM Luxury Flint Glass Line", "1,000 BPM 100% Eco rPET Line", "Pilot R&D Micro-Batch Line"]
    },
    {
      to: "/quote",
      number: "06",
      title: "Consolidated Turnkey RFQ",
      icon: Calculator,
      badge: "Instant Cost Matrix",
      desc: "Master turnkey pricing combining your container sourcing, print house finishes, secondary case packaging, and formulation volume into an itemized formal quote.",
      features: ["Dynamic Volume Discount Curve", "Itemized Cost Breakdown", "Printable PDF Spec Sheet", "Direct Engineering Handoff"]
    }
  ];

  return (
    <div className="space-y-20 py-12 px-4 sm:px-8 bg-minimal-grid">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center space-y-8 pt-6 pb-12">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sky/10 border border-brand-sky/30 text-brand-blue text-xs font-mono font-bold uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
          Turnkey Beverage Co-Packing & Packaging Design Ecosystem
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-brand-navy uppercase leading-[1.08] max-w-5xl mx-auto">
          CRAFTING THE FUTURE OF <br />
          <span className="gradient-text-navy">BEVERAGE MANUFACTURING</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          From bottle sourcing and full-service label print finishes to automated secondary case design, water formulation chemistry, and 1,200 BPM cleanroom co-packing.
        </p>

        {/* Quick Jumper CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/sourcing"
            className="px-7 py-3.5 rounded-2xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-brand-navy/10 transition-all flex items-center gap-2"
          >
            <Package className="w-4 h-4 text-brand-cyan" />
            <span>1. Sourcing Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/design-print"
            className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs font-mono uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-brand-blue" />
            <span>2. Print House</span>
          </Link>

          <Link
            to="/case-box-design"
            className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs font-mono uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
          >
            <Box className="w-4 h-4 text-brand-blue" />
            <span>3. Case Design</span>
          </Link>

          <Link
            to="/quote"
            className="px-7 py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-sky text-white font-bold text-xs font-mono uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Instant Master RFQ</span>
          </Link>
        </div>

        {/* Real-Time Plant Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200 max-w-5xl mx-auto">
          <div className="glass-card p-5 rounded-2xl text-left">
            <div className="flex justify-between items-center text-slate-500 text-xs font-mono">
              <span>LINE SPEED</span>
              <Zap className="w-4 h-4 text-brand-blue" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-brand-navy mt-1">1,200 BPM</div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">Rotary Cold-Fill & LN2</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-left">
            <div className="flex justify-between items-center text-slate-500 text-xs font-mono">
              <span>CLEANROOM</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-700 mt-1">ISO Class 7</div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">HEPA Positive Pressure</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-left">
            <div className="flex justify-between items-center text-slate-500 text-xs font-mono">
              <span>QUALITY SCORE</span>
              <Award className="w-4 h-4 text-brand-sky" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-brand-navy mt-1">SQF-3 (99/100)</div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">GFSI Benchmark Rating</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-left">
            <div className="flex justify-between items-center text-slate-500 text-xs font-mono">
              <span>PRINT ACCURACY</span>
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-brand-blue mt-1">7-Color OGV</div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">95% Pantone Matching</div>
          </div>
        </div>

      </section>

      {/* 6 Specialized Department Grid */}
      <section className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="badge-tech mx-auto">
            <Layers className="w-3.5 h-3.5" />
            DEPARTMENT SUITE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-navy uppercase tracking-tight">
            EXPLORE OUR SPECIALIZED DIVISIONS
          </h2>
          <p className="text-sm text-slate-600">
            Each department operates as a dedicated turnkey center providing live interactive modeling, specification export, and direct cost calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Link
                key={dept.to}
                to={dept.to}
                className="glass-card p-8 rounded-3xl space-y-5 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-blue bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      DEPT {dept.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">{dept.badge}</span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-brand-navy text-brand-navy group-hover:text-brand-cyan flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-brand-blue transition-colors">
                    {dept.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dept.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {dept.features.map((feat, i) => (
                      <div key={i} className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-brand-blue"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-mono font-bold text-brand-blue group-hover:translate-x-1 transition-transform">
                  <span>Enter Department Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Customer Account & Saved Projects Banner */}
      <section className="max-w-7xl mx-auto glass-card p-8 sm:p-12 rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-50/50 via-white to-blue-50/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              CUSTOMER SPEC VAULT & SAMPLE KIT DESK
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-brand-navy">
              Save Your Custom Configurations & Order Proofs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Create a free Customer Portal account to save your customized bottle setups, print material finishes, case wrap graphics, and volume pricing estimates. Request physical sample kits shipped directly to your office.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSaveModal}
              className="px-6 py-3.5 rounded-2xl bg-brand-navy text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-brand-blue shadow-md transition-all"
            >
              Save Current Spec
            </button>
            <Link
              to="/account"
              className="px-6 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider hover:bg-slate-50 shadow-sm transition-all"
            >
              View Saved Projects ({savedProjects.length})
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
