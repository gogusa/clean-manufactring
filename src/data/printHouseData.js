export const printMaterials = [
  {
    id: "soft-touch-matte",
    name: "Soft-Touch Velvet Matte",
    category: "Coated Film",
    feePerUnit: 0.025,
    setupFee: 150,
    desc: "Silky, non-glare tactile matte finish that resists fingerprints and creates an ultra-premium velvet hand-feel.",
    badge: "Trending"
  },
  {
    id: "ultra-gloss-uv",
    name: "High-Gloss UV Varnish",
    category: "Clear Coat",
    feePerUnit: 0.00,
    setupFee: 0,
    desc: "Standard high-luster glass-like reflection that maximizes color saturation and vibrant graphic depth.",
    badge: "Standard Included"
  },
  {
    id: "metallic-foil-hologram",
    name: "Cold Foil Metallic & Holographic",
    category: "Specialty Embellishment",
    feePerUnit: 0.045,
    setupFee: 350,
    desc: "In-line metallic gold, silver, rose gold, or prism holographic foil transfer that catches light on store shelves.",
    badge: "Luxury Tier"
  },
  {
    id: "transparent-no-label",
    name: "Ultra-Clear (No-Label Look)",
    category: "Clear BoPP",
    feePerUnit: 0.030,
    setupFee: 200,
    desc: "Crystal-clear transparent substrate with opaque white underprint, making graphics look printed directly on the container.",
    badge: "Minimalist Aesthetic"
  },
  {
    id: "spot-tactile-varnish",
    name: "Raised Spot UV & Tactile Emboss",
    category: "Textured Finish",
    feePerUnit: 0.038,
    setupFee: 280,
    desc: "3D raised clear gloss varnish applied selectively over brand logos and water droplet patterns for touchable texture.",
    badge: "High-Impact"
  },
  {
    id: "kraft-textured",
    name: "Eco Uncoated Textured Kraft",
    category: "Natural Fiber",
    feePerUnit: 0.020,
    setupFee: 120,
    desc: "FSC-certified natural textured paper with subtle organic grain for artisanal and spring water brands.",
    badge: "Eco-Friendly"
  }
];

export const colorProcesses = [
  { id: "cmyk-extended", name: "7-Color Extended Gamut (CMYK + OGV)", plateCost: 450, desc: "Ultra-wide color fidelity matching 95% of Pantone formulas without spot ink mixing." },
  { id: "pantone-spot", name: "Custom Spot Pantone Matching (PMS)", plateCost: 600, desc: "Exact brand color formulation with continuous spectrophotometer density verification." },
  { id: "fluorescent-neon", name: "UV Reactive / Fluorescent Inks", plateCost: 750, desc: "Neon pigments that glow under blacklight for nightlife, fitness, and festival RTD positioning." }
];

export const calculatePrintQuote = ({ volume, materialId, colorProcessId, proofType = 'digital' }) => {
  const material = printMaterials.find(m => m.id === materialId) || printMaterials[0];
  const process = colorProcesses.find(p => p.id === colorProcessId) || colorProcesses[0];

  // Base print rate per unit based on volume curve
  let baseUnitRate = 0.08;
  if (volume >= 500000) baseUnitRate = 0.035;
  else if (volume >= 250000) baseUnitRate = 0.045;
  else if (volume >= 100000) baseUnitRate = 0.055;
  else if (volume >= 50000) baseUnitRate = 0.068;

  const totalUnitPrintCost = baseUnitRate + material.feePerUnit;
  const plateCost = volume >= 250000 ? 0 : (material.setupFee + process.plateCost);
  const proofCost = proofType === 'physical-press-proof' ? 350 : 0;

  const totalPrintCost = (totalUnitPrintCost * volume) + plateCost + proofCost;

  return {
    volume,
    unitCost: parseFloat(totalUnitPrintCost.toFixed(4)),
    totalCost: parseFloat(totalPrintCost.toFixed(2)),
    plateCost,
    proofCost,
    materialName: material.name,
    processName: process.name,
    turnaround: volume >= 100000 ? "10-12 Business Days" : "7-9 Business Days"
  };
};
