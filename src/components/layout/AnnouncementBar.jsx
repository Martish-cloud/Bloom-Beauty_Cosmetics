import React from 'react';
import { Truck, Smartphone } from 'lucide-react';

export default function AnnouncementBar({ onOpenCombos }) {
  return (
    <div className="bg-[#8E1843] text-white text-[11px] sm:text-xs font-medium tracking-wide py-2 shadow-xs relative z-30 w-full overflow-hidden">
      <div className="bloom-container flex items-center justify-between gap-4">
        
        {/* Left item */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Truck className="w-3.5 h-3.5 opacity-90 text-[#F8BBD0]" />
          <span>Free Shipping on Orders Above ₹499</span>
        </div>

        {/* Center message - Interactive Flash Sale Callout */}
        <div className="hidden md:flex items-center gap-2 text-white/95 font-normal tracking-wider text-[11px] mx-auto text-center truncate">
          <button 
            onClick={onOpenCombos}
            className="hover:underline inline-flex items-center gap-2 text-[#FCE7EE] font-semibold cursor-pointer transition-opacity hover:opacity-95"
          >
            <span>⚡ LIMITED TIME: 30%–35% OFF Beauty Combos & Sets</span>
            <span className="bg-[#D61C7C] hover:bg-[#BF156C] text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-2xs">
              Shop Deals →
            </span>
          </button>
        </div>

        {/* Right item */}
        <div className="flex items-center gap-1 shrink-0">
          <a
            href="#download-app"
            onClick={(e) => {
              e.preventDefault();
              alert("The Bloom Beauty mobile app is launching soon on iOS & Android! Use code GLOW50 on your order today.");
            }}
            className="flex items-center gap-1 hover:text-[#F8BBD0] transition-colors cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Download Our App</span>
          </a>
        </div>

      </div>
    </div>
  );
}
