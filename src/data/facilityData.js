export const facilityStats = [
  {
    id: "speed",
    label: "High-Speed Bottling",
    value: "1,200 BPM",
    subtext: "Rotary Isobaric & Flowmeter Filling",
    icon: "Zap",
    color: "text-clean-cyan"
  },
  {
    id: "canning",
    label: "High-Speed Canning",
    value: "800 CPM",
    subtext: "Aseptic & Cold-Dosed Lines",
    icon: "Layers",
    color: "text-clean-sky"
  },
  {
    id: "capacity",
    label: "Annual Plant Throughput",
    value: "150M+ Units",
    subtext: "Scalable Multi-Shift Operations",
    icon: "Gauge",
    color: "text-emerald-400"
  },
  {
    id: "cleanroom",
    label: "Cleanroom Standard",
    value: "ISO Class 7",
    subtext: "Positive Pressure HEPA Enclosure",
    icon: "ShieldCheck",
    color: "text-sky-300"
  }
];

export const productionLines = [
  {
    id: "line-1",
    name: "Line 1: High-Speed Aluminum Bottle / Can Line",
    speed: "1,200 units/min",
    fillType: "Aseptic Cold Fill + Liquid Nitrogen Dosing",
    sizes: ["250ml", "330ml Sleek", "500ml", "16oz (473ml)", "750ml Resealable"],
    features: ["Online Ionized Air Rinser", "Laser Date & Lot Coding", "Vision Inspection Rejector", "Automated Case Packer"],
    status: "Active / Scheduled",
    oee: "98.4%"
  },
  {
    id: "line-2",
    name: "Line 2: Pure Flint Glass & Luxury Beverage Line",
    speed: "600 bottles/min",
    fillType: "Sterile Isobaric Cold Fill + Vacuum Capper",
    sizes: ["330ml", "500ml", "750ml Bordeaux/Burgundy", "1.0L Heavy Base"],
    features: ["Crown & ROOP Cap Compatible", "Pressure Sensitive Front/Back Labeler", "Shrink Sleeve Tunnel", "Robot Palletizer"],
    status: "Active",
    oee: "97.8%"
  },
  {
    id: "line-3",
    name: "Line 3: Eco rPET (100% Recycled) Water Line",
    speed: "1,000 bottles/min",
    fillType: "Ozone Sanitized High-Speed Rotary Fill",
    sizes: ["12oz (355ml)", "500ml Standard", "700ml Sports Cap", "1.0L", "1.5L"],
    features: ["Integrated Blow Molding", "Tamper-Evident Screw Capping", "Wrap-Around Labeling", "High-Speed Tray Wrapper"],
    status: "Active",
    oee: "99.1%"
  },
  {
    id: "line-4",
    name: "Line 4: Pilot & Custom Formulation Line",
    speed: "150–300 units/min",
    fillType: "Hot Fill / Tunnel Pasteurization / Micro-Batches",
    sizes: ["2oz Energy Shots", "8oz Mini Cans", "12oz Sleek", "16oz Bottles"],
    features: ["Batch Pasteurizer (190°F)", "Multi-Stage Agitation Tanks", "Inline CO2 & H2 Infuser", "Rapid Prototype Run Mode"],
    status: "Ready for Pilot Runs",
    oee: "96.5%"
  }
];
