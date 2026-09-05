export const bottleCategories = [
  { id: "all", name: "All Formats" },
  { id: "aluminum-bottle", name: "Aluminum Bottles" },
  { id: "aluminum-can", name: "Aluminum Cans" },
  { id: "glass", name: "Flint Glass" },
  { id: "rpet", name: "100% Eco rPET" }
];

export const bottleModels = [
  {
    id: "alum-500-sleek",
    category: "aluminum-bottle",
    name: "500ml Sleek Aluminum Bottle",
    capacity: "500ml (16.9 fl oz)",
    dimensions: "Height: 215mm • Diameter: 66mm • Neck: 28mm ROPP",
    tareWeight: "28.5g",
    material: "99.7% Pure Recycled Aluminum (BPANI Liner)",
    barrier: "100% Light & Gas Impermeable (H2 & CO2 Safe)",
    moq: "25,000 Units",
    palletYield: "2,160 Units/Pallet (48x40 Standard)",
    baseColor: "#E2E8F0",
    compatibleCaps: ["roop-aluminum", "crown-cap", "sports-cap"],
    labelDimensions: "Wrap: 204mm W x 140mm H (or Direct Screen)",
    features: ["Resealable Threaded Neck", "Rapid Chill Conductance", "Zero Plastic Contact", "Infinitely Recyclable"],
    recommendedFor: ["Alkaline 9.5+ Water", "Molecular Hydrogen H2", "Energy RTDs", "Luxury Water Brands"]
  },
  {
    id: "alum-330-sleek",
    category: "aluminum-bottle",
    name: "330ml Compact Aluminum Bottle",
    capacity: "330ml (11.2 fl oz)",
    dimensions: "Height: 175mm • Diameter: 58mm • Neck: 28mm ROPP",
    tareWeight: "22.0g",
    material: "99.7% Pure Recycled Aluminum",
    barrier: "Maximum UV & Gas Barrier",
    moq: "25,000 Units",
    palletYield: "2,880 Units/Pallet",
    baseColor: "#E2E8F0",
    compatibleCaps: ["roop-aluminum", "crown-cap"],
    labelDimensions: "Wrap: 180mm W x 110mm H",
    features: ["Pocket & Grab-and-Go Ready", "High Cold Retention", "Sleek Hand Feel"],
    recommendedFor: ["Hospitality Minibars", "Aviation & Travel", "Premium Wellness Shots"]
  },
  {
    id: "alum-750-reseal",
    category: "aluminum-bottle",
    name: "750ml Executive Aluminum Bottle",
    capacity: "750ml (25.4 fl oz)",
    dimensions: "Height: 260mm • Diameter: 73mm • Neck: 28mm ROPP",
    tareWeight: "38.0g",
    material: "High-Strength Aluminum Monobloc",
    barrier: "Heavy-Duty Pressure Rated (3.5 Bar)",
    moq: "20,000 Units",
    palletYield: "1,440 Units/Pallet",
    baseColor: "#CBD5E1",
    compatibleCaps: ["roop-aluminum", "synthetic-cork"],
    labelDimensions: "Wrap: 226mm W x 175mm H",
    features: ["Large Format Statement", "Table-Ready Silhouette", "Ergonomic Grip"],
    recommendedFor: ["Fine Dining Water", "Sparkling Botanical Infusions", "Fitness Gyms"]
  },
  {
    id: "can-355-slim",
    category: "aluminum-can",
    name: "12oz (355ml) Sleek Aluminum Can",
    capacity: "355ml (12 fl oz Sleek)",
    dimensions: "Height: 157mm • Diameter: 58mm • End: 202 Dia",
    tareWeight: "13.2g",
    material: "Aluminum Alloy 3104 Body / 5182 End",
    barrier: "Hermetic Double Seam Lock",
    moq: "50,000 Units (Direct Printed) / 10k (Sleeved)",
    palletYield: "2,880 Units/Pallet",
    baseColor: "#94A3B8",
    compatibleCaps: ["stay-on-tab", "laser-etched-tab", "resealable-can-end"],
    labelDimensions: "Body: 184mm W x 140mm H (or 360° Shrink Sleeve)",
    features: ["Industry Standard Sleek Format", "High-Speed Filling (800 CPM)", "Maximum Shelf Space Efficiency"],
    recommendedFor: ["Molecular Hydrogen RTD", "Sparkling Clean Water", "Functional Nootropics"]
  },
  {
    id: "can-473-tall",
    category: "aluminum-can",
    name: "16oz (473ml) Standard Tallboy Can",
    capacity: "473ml (16 fl oz Standard)",
    dimensions: "Height: 157mm • Diameter: 66mm • End: 202 Dia",
    tareWeight: "15.8g",
    material: "Aluminum Alloy Body with Polymer Internal Barrier",
    barrier: "Hermetic Seam",
    moq: "50,000 Units",
    palletYield: "2,160 Units/Pallet",
    baseColor: "#94A3B8",
    compatibleCaps: ["stay-on-tab", "colored-tab"],
    labelDimensions: "Body: 204mm W x 142mm H",
    features: ["High Volume Grab & Go", "Rugged Durability", "Full Can Graphics Canvas"],
    recommendedFor: ["Athletic Performance Drinks", "Electrolyte Hydration", "Club Stores"]
  },
  {
    id: "glass-750-flint",
    category: "glass",
    name: "750ml Ultra-Clear Flint Glass",
    capacity: "750ml (25.4 fl oz)",
    dimensions: "Height: 285mm • Diameter: 76mm • Heavy Base: 18mm",
    tareWeight: "520g",
    material: "Super-Flint Crystal Clear Silica Glass",
    barrier: "Zero Leaching / 100% Chemical Inertness",
    moq: "15,000 Units",
    palletYield: "1,080 Units/Pallet",
    baseColor: "#BAE6FD",
    compatibleCaps: ["crown-cap", "synthetic-cork", "roop-aluminum"],
    labelDimensions: "Front/Back: 80mm W x 130mm H (or Direct Screen)",
    features: ["Substantial Luxury Weight", "Crystal Prism Clarity", "Tabletop Centerpiece Quality"],
    recommendedFor: ["Michelin Dining Waters", "Reserve Artesian Spring", "Premium Spirits Blenders"]
  },
  {
    id: "glass-330-flint",
    category: "glass",
    name: "330ml Flint Glass Heritage Bottle",
    capacity: "330ml (11.2 fl oz)",
    dimensions: "Height: 210mm • Diameter: 60mm • Neck: Crown 26mm",
    tareWeight: "260g",
    material: "Flint Glass",
    barrier: "Pure Glass Purity",
    moq: "18,000 Units",
    palletYield: "2,160 Units/Pallet",
    baseColor: "#BAE6FD",
    compatibleCaps: ["crown-cap", "twist-off-crown"],
    labelDimensions: "Front/Back: 65mm W x 95mm H",
    features: ["Classic Bistro Aesthetic", "Crisp Clean Pour", "Recyclable Glass"],
    recommendedFor: ["Artisanal Bottled Water", "Hotel Guest Rooms", "Boutique Cafes"]
  },
  {
    id: "rpet-500-eco",
    category: "rpet",
    name: "500ml 100% Recycled Eco rPET",
    capacity: "500ml (16.9 fl oz)",
    dimensions: "Height: 205mm • Diameter: 64mm • Neck: 28mm PCO 1881",
    tareWeight: "18.5g",
    material: "100% Post-Consumer Recycled Ocean/Land PET",
    barrier: "Standard Aqueous Liquid Barrier",
    moq: "20,000 Units",
    palletYield: "2,160 Units/Pallet",
    baseColor: "#E0F2FE",
    compatibleCaps: ["tethered-hdpe", "sports-cap"],
    labelDimensions: "Wrap-Around: 200mm W x 55mm H",
    features: ["75% Lower Carbon Footprint", "Lightweight Transport", "Shatterproof Durability"],
    recommendedFor: ["Mass Retail Distribution", "Concerts & Stadiums", "Everyday Pure Water"]
  }
];

export const capTypes = [
  {
    id: "roop-aluminum",
    name: "ROPP Aluminum Screw Cap (28mm)",
    material: "Anodized Aluminum with EPE / Saranex Liner",
    colors: ["#0B2545", "#00B4D8", "#E2E8F0", "#0F172A", "#F59E0B", "#DC2626"],
    desc: "Roll-On Pilfer-Proof threaded cap providing a tight seal with tamper-evident breakaway band.",
    tamperEvident: true
  },
  {
    id: "crown-cap",
    name: "Pry-Off Crown Closure (26mm)",
    material: "Tinplate Steel with Oxygen-Scavenging Liner",
    colors: ["#E2E8F0", "#F59E0B", "#0B2545", "#0F172A", "#00B4D8"],
    desc: "Aesthetic traditional crown cap engineered for carbonated or still glass bottling.",
    tamperEvident: true
  },
  {
    id: "sports-cap",
    name: "Push-Pull Sports Cap (28mm)",
    material: "BPA-Free Polypropylene with Dust Cover",
    colors: ["#00B4D8", "#0B2545", "#E2E8F0", "#10B981"],
    desc: "High-flow athletic cap for active on-the-go hydration.",
    tamperEvident: true
  },
  {
    id: "stay-on-tab",
    name: "Can Stay-On Tab (202 SOT)",
    material: "Aluminum Alloy with Laser-Etched Code Option",
    colors: ["#94A3B8", "#00B4D8", "#0B2545", "#F59E0B"],
    desc: "Hermetic sanitary opening tab for high-speed automated canning lines.",
    tamperEvident: true
  },
  {
    id: "synthetic-cork",
    name: "Luxury Synthetic T-Top Cork",
    material: "Micro-Agglomerated Polymer with Aluminum/Wood Head",
    colors: ["#F59E0B", "#78350F", "#0B2545", "#0F172A"],
    desc: "Premium table presence with a satisfying pop on opening for luxury 750ml glass bottles.",
    tamperEvident: true
  }
];

export const labelApplicationTypes = [
  {
    id: "pressure-sensitive",
    name: "Pressure Sensitive (PS) Die-Cut Labels",
    bestFor: "Aluminum Bottles & Glass",
    desc: "High precision front, back, or wrap-around self-adhesive labels with ultra-crisp registration.",
    finishOptions: ["Soft-Touch Matte", "High Gloss UV", "Metallic Foil", "Clear No-Label Look"]
  },
  {
    id: "shrink-sleeve",
    name: "360° Full-Body Shrink Sleeve",
    bestFor: "Cans & Contoured Bottles",
    desc: "Full height 360-degree graphics with steam-tunnel contouring, tamper-evident neck perforations.",
    finishOptions: ["Matte/Gloss Combo", "Holographic Iridescent", "Tactile Micro-Emboss"]
  },
  {
    id: "direct-screen",
    name: "Direct UV Screen & Pad Printing",
    bestFor: "Flint Glass & Premium Aluminum",
    desc: "Ink applied directly to the bottle substrate and UV cured, eliminating label edges entirely.",
    finishOptions: ["Enamel Gloss", "Precious Metal Gold/Silver", "Frosted Acid Etch Effect"]
  },
  {
    id: "wrap-bopp",
    name: "Roll-Fed Wrap-Around BoPP",
    bestFor: "rPET Water Bottles",
    desc: "High-speed continuous roll-fed BOPP film label for cost-effective, high-volume retail runs.",
    finishOptions: ["High-Gloss Clear", "Pearlized White", "Matte Metallic"]
  }
];
