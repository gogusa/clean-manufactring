import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { 
  User, 
  Building2, 
  BookmarkCheck, 
  Package, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  FileText,
  Sparkles,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AccountPage({ onOpenSaveModal }) {
  const navigate = useNavigate();
  const { 
    currentUser, 
    setCurrentUser, 
    savedProjects, 
    loadProject, 
    deleteProject 
  } = useProject();

  const [sampleKitRequested, setSampleKitRequested] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '4400 N Scottsdale Rd, Suite 308',
    city: 'Scottsdale',
    state: 'AZ',
    zip: '85251',
    kitType: 'Complete Packaging & Substrate Sample Kit (Free)'
  });

  const handleLoadProject = (project) => {
    loadProject(project);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 }
    });
    navigate('/sourcing');
  };

  const handleRequestKit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    setSampleKitRequested(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 space-y-12 font-sans">
      
      {/* Account Profile Header Card */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-sky-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-brand-navy flex items-center justify-center text-white text-2xl font-bold font-display shadow-lg shadow-brand-navy/10">
            {currentUser.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-brand-navy">
                {currentUser.name || 'Customer Account'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Active Client
              </span>
            </div>
            <div className="text-xs font-mono text-slate-500 mt-1 flex flex-wrap items-center gap-4">
              <span>Company: <strong className="text-slate-800">{currentUser.company || 'Beverage Brand'}</strong></span>
              <span>Email: <strong className="text-slate-800">{currentUser.email || 'partner@brand.com'}</strong></span>
              <span>Phone: <strong className="text-slate-800">{currentUser.phone || '866-244-1003'}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSaveModal}
            className="px-5 py-3 rounded-2xl bg-brand-navy hover:bg-brand-blue text-white font-mono text-xs uppercase font-bold tracking-wider shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-brand-cyan" />
            <span>Save Current Spec</span>
          </button>
        </div>
      </div>

      {/* Saved Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-display text-brand-navy flex items-center gap-2">
              <BookmarkCheck className="w-6 h-6 text-brand-blue" />
              Saved Specifications & Orders ({savedProjects.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Saved container models, print house finishes, case packaging, and estimated production quotes.
            </p>
          </div>
        </div>

        {savedProjects.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl border border-slate-200 text-center space-y-4">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">No Saved Projects Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Configure your bottle in Sourcing or the Print House and click "Save Spec" to keep your project in your account.
            </p>
            <button
              onClick={() => navigate('/sourcing')}
              className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-mono font-bold uppercase"
            >
              Start in Sourcing Studio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProjects.map((proj) => (
              <div
                key={proj.id}
                className="glass-card p-6 rounded-3xl border border-slate-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded font-bold">
                      {proj.date}
                    </span>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete saved project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold font-display text-brand-navy leading-tight">
                    {proj.name}
                  </h3>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-1 text-slate-600">
                    <div>Container: <strong className="text-slate-900">{proj.bottle?.name}</strong></div>
                    <div>Print Finish: <strong className="text-brand-blue">{proj.printMaterial?.name}</strong></div>
                    <div>Master Case: <strong className="text-slate-900">{proj.caseFormat?.name}</strong></div>
                    <div>Run Volume: <strong className="text-slate-900">{proj.volume?.toLocaleString()} Units</strong></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400">Est. Total Run</div>
                    <div className="text-base font-bold font-mono text-emerald-700">
                      ${(proj.totalEst || (proj.volume * 0.585)).toLocaleString()} USD
                    </div>
                  </div>

                  <button
                    onClick={() => handleLoadProject(proj)}
                    className="px-4 py-2 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Load Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Physical Sample Proof Kit */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-sky-50/30 to-slate-50 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-blue font-bold uppercase">
              <Truck className="w-4 h-4" />
              PHYSICAL PACKAGING SAMPLES
            </div>
            <h3 className="text-2xl font-bold font-display text-brand-navy mt-1">
              Request Physical Sample Kit & Finish Swatches
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold border border-emerald-200">
            Free Courier Delivery (US & Canada)
          </span>
        </div>

        {sampleKitRequested ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <div className="text-2xl text-emerald-600">✓</div>
            <div className="font-bold text-emerald-900">Sample Kit Dispatch Scheduled!</div>
            <p className="text-xs text-slate-600">Your sample pack containing physical aluminum bottles, can finishes, metallic foil swatches, and case box cuts has been queued for FedEx 2-day delivery.</p>
          </div>
        ) : (
          <form onSubmit={handleRequestKit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="sm:col-span-2">
              <label className="block text-slate-600 mb-1 font-bold">Delivery Street Address *</label>
              <input
                type="text"
                required
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-bold">City / State / Zip *</label>
              <input
                type="text"
                required
                value={`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  setShippingAddress({ ...shippingAddress, city: parts[0] || '' });
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3 pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs uppercase font-mono tracking-wider shadow-md transition-all flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-brand-cyan" />
                <span>Order Physical Sample Proof Kit</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
