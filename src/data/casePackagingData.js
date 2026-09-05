export const caseFormats = [
  {
    id: "corrugated-12",
    name: "12-Pack RSC Master Shipper Carton",
    category: "Corrugated Box",
    unitsPerCase: 12,
    dimensions: "320mm L x 240mm W x 220mm H",
    fluting: "B-Flute 32 ECT (Heavy Stacking Strength)",
    printType: "Flexographic / Litho-Laminated Full Color",
    baseCostPerCase: 0.65,
    palletStack: "108 Cases / Pallet (1,296 Units)",
    desc: "Heavy-duty standard wholesale master carton with internal partitions to prevent bottle collision scuffing."
  },
  {
    id: "corrugated-24",
    name: "24-Pack Master Distribution Carton",
    category: "Corrugated Box",
    unitsPerCase: 24,
    dimensions: "440mm L x 300mm W x 220mm H",
    fluting: "C-Flute 44 ECT (Double Wall Option)",
    printType: "Direct Flexo Print (Up to 4 Colors)",
    baseCostPerCase: 0.95,
    palletStack: "54 Cases / Pallet (1,296 Units)",
    desc: "National retail distribution case engineered for grocery chain cross-docking and warehouse racking."
  },
  {
    id: "shrink-wrap-6",
    name: "6-Pack Registered Printed Shrink Bundle",
    category: "Shrink Wrap",
    unitsPerCase: 6,
    dimensions: "195mm L x 130mm W x 215mm H",
    fluting: "60-Micron Low-Density Polyethylene (LDPE)",
    printType: "High-Definition Registered Flexo Print",
    baseCostPerCase: 0.28,
    palletStack: "216 Bundles / Pallet",
    desc: "Multi-pack retail bundle with full 360° photographic graphics, thumb holes, or integrated carry handle tape."
  },
  {
    id: "shrink-wrap-12",
    name: "12-Pack Pad + Shrink Film Bundle",
    category: "Shrink Wrap",
    unitsPerCase: 12,
    dimensions: "260mm L x 195mm W x 215mm H",
    fluting: "75-Micron LDPE with Corrugated Base Pad",
    printType: "Full Color Printed Film",
    baseCostPerCase: 0.42,
    palletStack: "108 Bundles / Pallet",
    desc: "Clean, modern beverage retail wrap with sturdy kraft corrugated underpad for bottom rigidity."
  },
  {
    id: "club-tray-rrd",
    name: "Retail Ready Display (RRD) Club Store Tray",
    category: "Display Tray",
    unitsPerCase: 24,
    dimensions: "400mm L x 300mm W x 100mm H",
    fluting: "E-Flute High-Density White Laminated",
    printType: "Full Gloss Litho-Label 6-Color Print",
    baseCostPerCase: 0.85,
    palletStack: "60 Trays / Pallet (Costco / Sam's Club Spec)",
    desc: "Tear-away front lip for instant pallet-to-shelf display without box cutters. Approved for major club warehouse retailers."
  },
  {
    id: "ecom-shipper",
    name: "DTC E-Commerce Custom Insulated Shipper",
    category: "E-Commerce",
    unitsPerCase: 12,
    dimensions: "340mm L x 250mm W x 230mm H",
    fluting: "Custom Molded Pulp Dividers + E-Flute Box",
    printType: "Inside & Outside Custom Brand Print",
    baseCostPerCase: 1.45,
    palletStack: "90 Shippers / Pallet",
    desc: "Drop-test certified (ISTA 3A) direct-to-consumer unboxing experience with custom interior print."
  }
];

export const boxMaterials = [
  { id: "white-bleached", name: "Premium White Kraft (Vibrant Print)", extraFee: 0.12 },
  { id: "natural-kraft", name: "Classic Natural Brown Kraft (Eco Look)", extraFee: 0.00 },
  { id: "litho-laminated", name: "High-Gloss Litho-Laminated (Photo Quality)", extraFee: 0.28 },
  { id: "matte-softtouch", name: "Velvet Soft-Touch Coated Case", extraFee: 0.35 }
];

export const calculateCaseQuote = ({ totalUnits, caseFormatId, boxMaterialId }) => {
  const format = caseFormats.find(f => f.id === caseFormatId) || caseFormats[0];
  const material = boxMaterials.find(m => m.id === boxMaterialId) || boxMaterials[0];

  const totalCasesNeeded = Math.ceil(totalUnits / format.unitsPerCase);
  const costPerCase = format.baseCostPerCase + material.extraFee;
  const totalCaseCost = totalCasesNeeded * costPerCase;
  const costPerUnit = totalCaseCost / totalUnits;

  const totalPallets = Math.ceil(totalCasesNeeded / (format.palletStack.includes('108') ? 108 : format.palletStack.includes('54') ? 54 : 90));

  return {
    totalUnits,
    totalCasesNeeded,
    costPerCase: parseFloat(costPerCase.toFixed(2)),
    totalCaseCost: parseFloat(totalCaseCost.toFixed(2)),
    costPerUnit: parseFloat(costPerUnit.toFixed(3)),
    totalPallets,
    formatName: format.name,
    materialName: material.name,
    unitsPerCase: format.unitsPerCase
  };
};
