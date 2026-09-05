import React, { useState, useEffect } from 'react';
import { Activity, Gauge, Droplets, ShieldCheck, Thermometer, Zap } from 'lucide-react';

export default function PlantHud() {
  const [bpm, setBpm] = useState(1184);
  const [dailyUnits, setDailyUnits] = useState(412850);
  const [h2Ppm, setH2Ppm] = useState(1.84);
  const [tds, setTds] = useState(0.2);

  // Subtle live telemetry fluctuation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => Math.min(1200, Math.max(1160, prev + Math.floor((Math.random() - 0.48) * 8))));
      setDailyUnits(prev => prev + 12);
      setH2Ppm(prev => +(1.80 + Math.random() * 0.08).toFixed(2));
      setTds(prev => +(0.1 + Math.random() * 0.2).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-steel-950/90 border-y border-clean-cyan/20 py-4 px-4 sm:px-8 backdrop-blur-xl relative z-20 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center font-mono">
          
          {/* 1. Facility Status */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-steel-900/80 border border-steel-800">
            <div className="w-2.5 h-2.5 rounded-full bg-clean-cyan animate-ping"></div>
            <div>
              <div className="text-[10px] text-steel-400 uppercase font-bold">PLANT STATUS</div>
              <div className="text-xs font-bold text-clean-cyan flex items-center gap-1">
                <span>ONLINE 24/7</span>
              </div>
            </div>
          </div>

          {/* 2. Active Run Rate */}
          <div className="p-2.5 rounded-xl bg-steel-900/80 border border-steel-800">
            <div className="text-[10px] text-steel-400 uppercase flex items-center justify-between">
              <span>LINE SPEED</span>
              <Zap className="w-3 h-3 text-clean-cyan" />
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white">
              {bpm} <span className="text-[10px] text-steel-400 font-normal">BPM</span>
            </div>
          </div>

          {/* 3. Daily Production Output */}
          <div className="p-2.5 rounded-xl bg-steel-900/80 border border-steel-800">
            <div className="text-[10px] text-steel-400 uppercase flex items-center justify-between">
              <span>TODAY OUTPUT</span>
              <Gauge className="w-3 h-3 text-clean-sky" />
            </div>
            <div className="text-sm sm:text-base font-extrabold text-clean-sky">
              {dailyUnits.toLocaleString()} <span className="text-[10px] text-steel-400 font-normal">UNITS</span>
            </div>
          </div>

          {/* 4. Dissolved H2 Telemetry */}
          <div className="p-2.5 rounded-xl bg-steel-900/80 border border-steel-800">
            <div className="text-[10px] text-steel-400 uppercase flex items-center justify-between">
              <span>H₂ SENSOR</span>
              <Activity className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-sm sm:text-base font-extrabold text-emerald-400">
              {h2Ppm} <span className="text-[10px] text-steel-400 font-normal">PPM</span>
            </div>
          </div>

          {/* 5. Pure Water TDS Level */}
          <div className="p-2.5 rounded-xl bg-steel-900/80 border border-steel-800">
            <div className="text-[10px] text-steel-400 uppercase flex items-center justify-between">
              <span>PURITY TDS</span>
              <Droplets className="w-3 h-3 text-sky-400" />
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white">
              {tds} <span className="text-[10px] text-steel-400 font-normal">PPM (99.99%)</span>
            </div>
          </div>

          {/* 6. Cleanroom ISO 7 Spec */}
          <div className="p-2.5 rounded-xl bg-steel-900/80 border border-steel-800 col-span-2 md:col-span-1 lg:col-span-1">
            <div className="text-[10px] text-steel-400 uppercase flex items-center justify-between">
              <span>CLEANROOM</span>
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-sm sm:text-base font-extrabold text-emerald-400">
              ISO-7 <span className="text-[10px] text-steel-400 font-normal">+35Pa</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
