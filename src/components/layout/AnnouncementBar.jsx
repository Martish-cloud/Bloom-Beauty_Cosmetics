import React from 'react';
import { Truck, Smartphone, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#D61C7C] text-white text-[11px] sm:text-xs font-medium tracking-wide py-2 px-4 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left item */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Truck className="w-3.5 h-3.5 opacity-90" />
          <span>Free Shipping on Orders Above ₹499</span>
        </div>

        {/* Center message - hidden on smallest screens, visible on md+ */}
        <div className="hidden md:flex items-center gap-2 text-white/95 font-normal tracking-wider text-[11px] mx-auto text-center truncate">
          <span>Glow Naturally</span>
          <span className="opacity-60">|</span>
          <span>Beauty for a Better You</span>
          <span className="opacity-60">|</span>
          <span>100% Original Products</span>
        </div>

        {/* Right item */}
        <div className="flex items-center gap-1 shrink-0">
          <a
            href="#download-app"
            onClick={(e) => {
              e.preventDefault();
              alert("The Bloom Beauty mobile app is launching soon on iOS & Android! Use code GLOW50 on your web order today.");
            }}
            className="flex items-center gap-1 hover:underline hover:text-white/90 transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Download Our App</span>
          </a>
        </div>

      </div>
    </div>
  );
}
