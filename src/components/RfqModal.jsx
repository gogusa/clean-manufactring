import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Printer, FileText, Send, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RfqModal({ isOpen, onClose, rfqData }) {
  const [submitted, setSubmitted] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadEmail, setLeadEmail] = useState('');

  if (!isOpen) return null;

  const refId = `CMI-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-steel-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-steel-900 border border-clean-cyan/40 max-w-2xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl relative my-8 text-steel-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-steel-800 text-steel-400 hover:text-white hover:bg-steel-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-display text-white">Production RFQ Submitted!</h3>
              <p className="text-xs sm:text-sm text-steel-300">
                Your formal contract manufacturing spec sheet has been queued. Reference Code: <strong className="text-clean-cyan font-mono">{refId}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-steel-950 border border-steel-800 text-xs font-mono space-y-2 text-left">
              <div className="flex justify-between text-steel-400">
                <span>Account Lead:</span>
                <span className="text-white font-bold">{leadName} ({leadCompany})</span>
              </div>
              <div className="flex justify-between text-steel-400">
                <span>Target Volume:</span>
                <span className="text-clean-cyan font-bold">{rfqData?.volume?.toLocaleString()} Units</span>
              </div>
              <div className="flex justify-between text-steel-400">
                <span>Est. Unit Price:</span>
                <span className="text-emerald-400 font-bold">${rfqData?.unitPrice?.toFixed(3)} / Unit</span>
              </div>
              <div className="flex justify-between text-steel-400">
                <span>Pallet Count:</span>
                <span className="text-white font-bold">{rfqData?.totalPallets} Pallets</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 rounded-xl bg-steel-800 text-white font-mono text-xs font-bold hover:bg-steel-700 transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-clean-cyan text-steel-950 font-mono text-xs font-bold hover:bg-clean-sky transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-mono text-clean-cyan uppercase font-bold">Formal Quote Generator</div>
              <h3 className="text-2xl font-bold font-display text-white mt-1">Contract Manufacturing RFQ</h3>
              <p className="text-xs text-steel-400 mt-1">
                Generated based on live line allocation, volume tiering, and formulation selection.
              </p>
            </div>

            {/* Spec Snapshot Card */}
            <div className="p-4 rounded-2xl bg-steel-950 border border-steel-800 text-xs font-mono space-y-2">
              <div className="flex justify-between border-b border-steel-800 pb-2">
                <span className="text-steel-400">Production Volume:</span>
                <span className="text-white font-bold">{rfqData?.volume?.toLocaleString()} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-steel-400">Est. Price Per Unit:</span>
                <span className="text-clean-cyan font-bold">${rfqData?.unitPrice?.toFixed(3)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-steel-400">Est. Total Run:</span>
                <span className="text-emerald-400 font-bold">${rfqData?.totalPrice?.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-steel-400">Pallet Requirement:</span>
                <span className="text-white font-bold">{rfqData?.totalPallets} Pallets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-steel-400">Estimated Lead Time:</span>
                <span className="text-white font-bold">{rfqData?.leadTime}</span>
              </div>
            </div>

            {/* Contact Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-steel-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full bg-steel-950 border border-steel-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-clean-cyan focus:outline-none"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-steel-400 mb-1">Company / Brand *</label>
                  <input
                    type="text"
                    required
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    className="w-full bg-steel-950 border border-steel-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-clean-cyan focus:outline-none"
                    placeholder="Brand Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-steel-400 mb-1">Email For Formal Spec Sheet *</label>
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="w-full bg-steel-950 border border-steel-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-clean-cyan focus:outline-none"
                  placeholder="name@brand.com"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-clean-cyan to-clean-blue text-steel-950 font-bold font-mono text-xs uppercase tracking-wider hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-steel-950" />
                <span>Confirm & Request Formal Quote</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
