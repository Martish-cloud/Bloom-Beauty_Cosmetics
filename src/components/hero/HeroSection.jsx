import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function HeroSection({ onShopNowClick }) {
  const [activeTrustTooltip, setActiveTrustTooltip] = useState(null);

  const handleTrustClick = (type, message) => {
    setActiveTrustTooltip(activeTrustTooltip === type ? null : type);
  };

  return (
    <section className="relative w-full bg-[#FFF5F8] border-b border-[#FCE4F0]/80 overflow-hidden select-none">
      
      {/* Maximum fidelity wrapper */}
      <div className="max-w-[1480px] mx-auto relative">
        
        {/* Main Graphic Banner (1024x200 original aspect ratio 5.12:1) */}
        <div className="relative w-full aspect-[1024/200] min-h-[160px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[260px] xl:min-h-[290px] overflow-hidden">
          <img
            src="/hero-banner.png"
            alt="Reveal Your Natural Beauty — Bloom Beauty Hero"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
          />

          {/* Interactive "Shop Now →" Hotspot Overlay */}
          <button
            onClick={onShopNowClick}
            aria-label="Shop Now"
            title="Shop Now"
            className="absolute z-20 cursor-pointer rounded-full transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#D61C7C] hover:ring-2 hover:ring-[#D61C7C]/60 hover:bg-[#D61C7C]/10"
            style={{
              left: '6.2%',
              top: '71.5%',
              width: '12%',
              height: '18%'
            }}
          >
            {/* Subtle glow highlight on hover */}
            <span className="sr-only">Shop Now</span>
            <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/15 transition-colors" />
          </button>

          {/* Interactive Trust Point 1: 100% Original (approx left: 16% to 23%, top: 82% to 98%) */}
          <button
            onClick={() => handleTrustClick('original', '100% Original: Directly sourced from verified global beauty brands')}
            className="absolute z-20 cursor-pointer rounded-lg hover:bg-black/5 transition-colors focus:outline-none"
            style={{
              left: '16%',
              top: '80%',
              width: '8%',
              height: '18%'
            }}
            title="100% Original Products"
          >
            <span className="sr-only">100% Original Authentic Products</span>
          </button>

          {/* Interactive Trust Point 2: Free Shipping (approx left: 24.5% to 33.5%, top: 82% to 98%) */}
          <button
            onClick={() => handleTrustClick('shipping', 'Free Shipping: Available on all orders above ₹499 across India')}
            className="absolute z-20 cursor-pointer rounded-lg hover:bg-black/5 transition-colors focus:outline-none"
            style={{
              left: '24.5%',
              top: '80%',
              width: '9%',
              height: '18%'
            }}
            title="Free Shipping on orders above ₹499"
          >
            <span className="sr-only">Free Shipping on Orders Above ₹499</span>
          </button>

          {/* Interactive Trust Point 3: Easy Returns (approx left: 34.5% to 42%, top: 82% to 98%) */}
          <button
            onClick={() => handleTrustClick('returns', 'Easy Returns: 7-day hassle-free return and exchange policy')}
            className="absolute z-20 cursor-pointer rounded-lg hover:bg-black/5 transition-colors focus:outline-none"
            style={{
              left: '34.5%',
              top: '80%',
              width: '7.5%',
              height: '18%'
            }}
            title="Easy Returns Hassle Free"
          >
            <span className="sr-only">Easy Returns Hassle Free</span>
          </button>

        </div>

        {/* Mobile Quick Action Bar (shown on small phones where banner text might be small) */}
        <div className="sm:hidden px-4 py-3 bg-[#FFF0F5] border-t border-[#F8BBD0]/60 flex items-center justify-between gap-3">
          <div className="text-left">
            <p className="text-xs font-serif font-bold text-[#751437]">Reveal Your Natural Beauty</p>
            <p className="text-[10px] text-stone-500">Skincare • Makeup • Selfcare</p>
          </div>
          <button
            onClick={onShopNowClick}
            className="bg-[#D61C7C] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </section>
  );
}
