import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { X, BookmarkCheck, CheckCircle2, User, Building2, Mail, Phone, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SaveProjectModal({ isOpen, onClose }) {
  const { 
    saveCurrentProject, 
    brandName, 
    activeBottle, 
    activePrintMaterial, 
    activeCaseFormat, 
    currentUser, 
    setCurrentUser 
  } = useProject();

  const [projectName, setProjectName] = useState(`${brandName} ${activeBottle.capacity} Production Spec`);
  const [userName, setUserName] = useState(currentUser.name || '');
  const [company, setCompany] = useState(currentUser.company || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser({
      name: userName,
      company,
      email,
      phone,
      isLoggedIn: true
    });
    saveCurrentProject(projectName);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setSavedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-xl w-full p-8 rounded-3xl shadow-2xl relative my-8 text-slate-800">
        
        <button
          onClick={() => { setSavedSuccess(false); onClose(); }}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {savedSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display text-brand-navy">Project Saved to Your Account!</h3>
              <p className="text-xs text-slate-500">
                You can access, edit, or request physical sample proofs for <strong className="text-brand-blue">{projectName}</strong> in your Customer Portal.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => { setSavedSuccess(false); onClose(); }}
                className="w-full py-3 rounded-xl bg-brand-navy text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-brand-blue transition-colors"
              >
                Continue Configuring
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-blue font-bold uppercase mb-1">
                <BookmarkCheck className="w-4 h-4" />
                Customer Project Vault
              </div>
              <h3 className="text-2xl font-bold font-display text-brand-navy">Save Spec Configuration</h3>
              <p className="text-xs text-slate-500 mt-1">
                Save your custom bottle setup, print material options, and case packaging to your account.
              </p>
            </div>

            {/* Current Spec Snapshot */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Selected Bottle:</span>
                <span className="text-slate-900 font-bold">{activeBottle.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Print Material:</span>
                <span className="text-brand-blue font-bold">{activePrintMaterial.name}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Case Format:</span>
                <span className="text-slate-900 font-bold">{activeCaseFormat.name}</span>
              </div>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-xs font-mono text-slate-700 uppercase font-bold mb-1.5">Project Name *</label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-bold focus:border-brand-blue focus:outline-none"
              />
            </div>

            {/* Account Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-700 uppercase font-bold mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-brand-blue focus:outline-none"
                  placeholder="Jordan Miller"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-700 uppercase font-bold mb-1.5">Company / Brand *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-brand-blue focus:outline-none"
                  placeholder="Aura Beverage Co."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-700 uppercase font-bold mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-brand-blue focus:outline-none"
                  placeholder="jordan@aurabev.com"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-700 uppercase font-bold mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-brand-blue focus:outline-none"
                  placeholder="480-555-0144"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-navy to-brand-blue text-white font-mono text-xs uppercase font-bold tracking-wider shadow-md hover:shadow-glow-blue transition-all flex items-center justify-center gap-2"
            >
              <span>Save Spec & Create Portal Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
