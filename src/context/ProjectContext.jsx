import React, { createContext, useContext, useState, useEffect } from 'react';
import { bottleModels, capTypes } from '../data/sourcingCatalog';
import { printMaterials, colorProcesses } from '../data/printHouseData';
import { caseFormats, boxMaterials } from '../data/casePackagingData';
import { waterFormulas } from '../data/formulasData';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  // 1. Current Active Design State
  const [activeBottle, setActiveBottle] = useState(bottleModels[0]);
  const [activeCap, setActiveCap] = useState(capTypes[0]);
  const [activeCapColor, setActiveCapColor] = useState('#0B2545');
  
  // 2. Print House State
  const [brandName, setBrandName] = useState('HYDRO PURE');
  const [tagline, setTagline] = useState('9.5+ pH ALKALINE WATER');
  const [activePrintMaterial, setActivePrintMaterial] = useState(printMaterials[0]);
  const [activeColorProcess, setActiveColorProcess] = useState(colorProcesses[0]);
  const [specialEffects, setSpecialEffects] = useState(['metallic-foil-hologram', 'soft-touch-matte']);

  // 3. Case & Box Design State
  const [activeCaseFormat, setActiveCaseFormat] = useState(caseFormats[0]);
  const [activeBoxMaterial, setActiveBoxMaterial] = useState(boxMaterials[0]);
  const [caseBrandText, setCaseBrandText] = useState('HYDRO PURE • 12-PACK');

  // 4. Formulation & Volume State
  const [activeFormula, setActiveFormula] = useState(waterFormulas[0]);
  const [volume, setVolume] = useState(100000);

  // 5. Customer Account & Saved Projects State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cm_user_account');
      return saved ? JSON.parse(saved) : {
        name: 'Jordan Miller',
        company: 'Aura Beverage Group',
        email: 'jordan@aurabev.com',
        phone: '480-555-0144',
        isLoggedIn: true
      };
    } catch {
      return { isLoggedIn: false };
    }
  });

  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('cm_saved_projects');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'proj-001',
          name: 'Aura Alkaline 500ml Retail Launch',
          date: '2026-09-02',
          bottle: bottleModels[0],
          cap: capTypes[0],
          capColor: '#0077B6',
          brandName: 'AURA 9.5+',
          tagline: 'ALKALINE IONIZED WATER',
          printMaterial: printMaterials[0],
          caseFormat: caseFormats[0],
          formula: waterFormulas[0],
          volume: 100000,
          estUnitCost: 0.625,
          totalEst: 62500
        }
      ];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cm_saved_projects', JSON.stringify(savedProjects));
  }, [savedProjects]);

  useEffect(() => {
    localStorage.setItem('cm_user_account', JSON.stringify(currentUser));
  }, [currentUser]);

  // Save current configuration
  const saveCurrentProject = (customName) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: customName || `${brandName} ${activeBottle.capacity}`,
      date: new Date().toISOString().split('T')[0],
      bottle: activeBottle,
      cap: activeCap,
      capColor: activeCapColor,
      brandName,
      tagline,
      printMaterial: activePrintMaterial,
      colorProcess: activeColorProcess,
      caseFormat: activeCaseFormat,
      boxMaterial: activeBoxMaterial,
      caseBrandText,
      formula: activeFormula,
      volume,
      estUnitCost: 0.585,
      totalEst: volume * 0.585
    };

    setSavedProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const loadProject = (project) => {
    if (!project) return;
    if (project.bottle) setActiveBottle(project.bottle);
    if (project.cap) setActiveCap(project.cap);
    if (project.capColor) setActiveCapColor(project.capColor);
    if (project.brandName) setBrandName(project.brandName);
    if (project.tagline) setTagline(project.tagline);
    if (project.printMaterial) setActivePrintMaterial(project.printMaterial);
    if (project.caseFormat) setActiveCaseFormat(project.caseFormat);
    if (project.formula) setActiveFormula(project.formula);
    if (project.volume) setVolume(project.volume);
  };

  const deleteProject = (id) => {
    setSavedProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProjectContext.Provider
      value={{
        activeBottle,
        setActiveBottle,
        activeCap,
        setActiveCap,
        activeCapColor,
        setActiveCapColor,
        brandName,
        setBrandName,
        tagline,
        setTagline,
        activePrintMaterial,
        setActivePrintMaterial,
        activeColorProcess,
        setActiveColorProcess,
        specialEffects,
        setSpecialEffects,
        activeCaseFormat,
        setActiveCaseFormat,
        activeBoxMaterial,
        setActiveBoxMaterial,
        caseBrandText,
        setCaseBrandText,
        activeFormula,
        setActiveFormula,
        volume,
        setVolume,
        currentUser,
        setCurrentUser,
        savedProjects,
        saveCurrentProject,
        loadProject,
        deleteProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
