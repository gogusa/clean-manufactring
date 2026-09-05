import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SaveProjectModal from './components/SaveProjectModal';

// Pages
import HomePage from './pages/HomePage';
import SourcingPage from './pages/SourcingPage';
import DesignPrintPage from './pages/DesignPrintPage';
import CaseDesignPage from './pages/CaseDesignPage';
import FormulationPage from './pages/FormulationPage';
import ManufacturingPage from './pages/ManufacturingPage';
import QuotePage from './pages/QuotePage';
import AccountPage from './pages/AccountPage';

export default function App() {
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  return (
    <ProjectProvider>
      <Router>
        <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col selection:bg-sky-200 selection:text-slate-900 font-sans antialiased">
          
          {/* Main Bright Glass Navigation Header */}
          <Header onOpenSaveModal={() => setSaveModalOpen(true)} />

          {/* Multi-Page Routes */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage onOpenSaveModal={() => setSaveModalOpen(true)} />} />
              <Route path="/sourcing" element={<SourcingPage onOpenSaveModal={() => setSaveModalOpen(true)} />} />
              <Route path="/design-print" element={<DesignPrintPage onOpenSaveModal={() => setSaveModalOpen(true)} />} />
              <Route path="/case-box-design" element={<CaseDesignPage onOpenSaveModal={() => setSaveModalOpen(true)} />} />
              <Route path="/formulation" element={<FormulationPage onOpenSaveModal={() => setSaveModalOpen(true)} />} />
              <Route path="/manufacturing" element={<ManufacturingPage onOpenSaveModal={() => setSaveModalOpen(true)} />} />
              <Route path="/quote" element={<QuotePage onOpenSaveModal={() => setSaveModalOpen(true)} />} />
              <Route path="/account" element={<AccountPage onOpenSaveModal={() => setSaveModalOpen(true)} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Master Clean Minimal Footer */}
          <Footer />

          {/* Customer Spec Vault & Save Modal */}
          <SaveProjectModal
            isOpen={saveModalOpen}
            onClose={() => setSaveModalOpen(false)}
          />

        </div>
      </Router>
    </ProjectProvider>
  );
}
