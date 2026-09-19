import React from 'react';
import { Truck, Smartphone } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#8E1843] text-white text-[11px] sm:text-xs font-medium tracking-wide py-2 shadow-xs relative z-30 w-full overflow-hidden">
      <div className="bloom-container flex items-center justify-between gap-4">
        
        {/* Left item */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Truck className="w-3.5 h-3.5 opacity-90 text-[#F8BBD0]" />
          <span>Free Shipping on Orders Above ₹499</span>
        </div>

        {/* Center message - hidden on smaller screens */}
        <div className="hidden md:flex items-center gap-2 text-white/90 font-normal tracking-wider text-[11px] mx-auto text-center truncate">
          <span>Glow Naturally</span>
          <span className="opacity-50">|</span>
          <span>Beauty for a Better You</span>
          <span className="opacity-50">|</span>
          <span>100% Original Products</span>
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
