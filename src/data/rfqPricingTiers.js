export const calculateRFQEstimate = ({
  volume,
  substrateId,
  formulaId,
  finishId,
  liquidNitrogenDosing = true,
  customPalletWrap = false
}) => {
  // Base cost matrix per substrate
  const baseSubstrateRates = {
    "aluminum-bottle": 0.58,
    "aluminum-can": 0.28,
    "flint-glass": 0.72,
    "eco-rpet": 0.24
  };

  // Formula cost per unit
  const formulaRates = {
    "alkaline": 0.08,
    "hydrogen": 0.14,
    "ultra-pure": 0.04,
    "artesian-spring": 0.07,
    "electrolyte-enhanced": 0.11
  };

  // Label finish costs
  const finishRates = {
    "gloss": 0.00,
    "matte": 0.02,
    "foil": 0.04,
    "clear": 0.03
  };

  const substrateCost = baseSubstrateRates[substrateId] || 0.35;
  const formulaCost = formulaRates[formulaId] || 0.06;
  const finishCost = finishRates[finishId] || 0.00;
  const nitrogenCost = liquidNitrogenDosing ? 0.015 : 0.00;

  // Base raw cost
  let rawUnitCost = substrateCost + formulaCost + finishCost + nitrogenCost;

  // Volume discount multiplier
  let discountTier = "Standard Run (0% Discount)";
  let discountMultiplier = 1.0;
  let leadTime = "4-5 Weeks";

  if (volume >= 500000) {
    discountMultiplier = 0.76; // 24% discount
    discountTier = "Enterprise Mega-Run (24% Discount)";
    leadTime = "2-3 Weeks (Priority Line)";
  } else if (volume >= 250000) {
    discountMultiplier = 0.82; // 18% discount
    discountTier = "National Scale (18% Discount)";
    leadTime = "3 Weeks";
  } else if (volume >= 100000) {
    discountMultiplier = 0.88; // 12% discount
    discountTier = "Commercial Volume (12% Discount)";
    leadTime = "3-4 Weeks";
  } else if (volume >= 50000) {
    discountMultiplier = 0.94; // 6% discount
    discountTier = "Mid-Volume Tier (6% Discount)";
    leadTime = "4 Weeks";
  }

  const estimatedUnitPrice = (rawUnitCost * discountMultiplier).toFixed(3);
  const estimatedTotal = (parseFloat(estimatedUnitPrice) * volume).toFixed(2);

  // Pallet Calculations (approx 2,400 units per standard 48x40 pallet)
  const unitsPerPallet = substrateId === "flint-glass" ? 1440 : substrateId === "aluminum-can" ? 2880 : 2160;
  const totalPallets = Math.ceil(volume / unitsPerPallet);

  // Setup / plate tooling cost
  const toolingSetup = volume >= 250000 ? 0 : 750;

  return {
    volume,
    unitPrice: parseFloat(estimatedUnitPrice),
    totalPrice: parseFloat(estimatedTotal),
    discountTier,
    discountPercent: Math.round((1 - discountMultiplier) * 100),
    unitsPerPallet,
    totalPallets,
    leadTime,
    toolingSetup,
    breakdown: {
      packaging: substrateCost,
      formula: formulaCost,
      finishing: finishCost,
      processing: nitrogenCost
    }
  };
};
