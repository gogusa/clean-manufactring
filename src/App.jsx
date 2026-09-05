import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CapabilitiesSection from './components/CapabilitiesSection';
import WaterTechSection from './components/WaterTechSection';
import BottleStudio from './components/BottleStudio';
import RfqCalculator from './components/RfqCalculator';
import QualityHub from './components/QualityHub';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RfqModal from './components/RfqModal';
import { calculateRFQEstimate } from './data/rfqPricingTiers';

export default function App() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [activeConfig, setActiveConfig] = useState({
    substrateId: 'aluminum-bottle',
    formulaId: 'alkaline',
    finishId: 'gloss',
    brandName: 'PURE FORMULA'
  });
  const [activeRfqData, setActiveRfqData] = useState(() => {
    return calculateRFQEstimate({
      volume: 100000,
      substrateId: 'aluminum-bottle',
      formulaId: 'alkaline',
      finishId: 'gloss',
      liquidNitrogenDosing: true
    });
  });

  const handleStudioConfigApplied = (config) => {
    setActiveConfig(config);
    const updated = calculateRFQEstimate({
      volume: activeRfqData.volume || 100000,
      substrateId: config.substrateId,
      formulaId: config.formulaId,
      finishId: config.finishId,
      liquidNitrogenDosing: true
    });
    setActiveRfqData(updated);
  };

  const handleOpenRfqWithData = (data) => {
    setActiveRfqData(data);
    setRfqModalOpen(true);
  };

  const handleOpenDefaultRfq = () => {
    setRfqModalOpen(true);
  };

  return (
    <div className="bg-steel-950 min-h-screen text-steel-100 flex flex-col selection:bg-clean-cyan selection:text-steel-950">
      
      {/* Top Navigation */}
      <Navbar onOpenRfq={handleOpenDefaultRfq} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenStudio={() => {
            const el = document.getElementById('studio');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenEstimator={() => {
            const el = document.getElementById('estimator');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <CapabilitiesSection />

        <WaterTechSection />

        <BottleStudio onConfigureForRfq={handleStudioConfigApplied} />

        <RfqCalculator
          initialConfig={activeConfig}
          onOpenRfqWithData={handleOpenRfqWithData}
        />

        <QualityHub />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive RFQ Modal */}
      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        rfqData={activeRfqData}
      />

    </div>
  );
}
