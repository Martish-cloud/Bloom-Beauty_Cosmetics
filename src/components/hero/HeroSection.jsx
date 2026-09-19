import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function HeroSection({ onShopNowClick }) {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#FFF5F8] via-[#FDF0F5] to-[#FCE7EE] border-b border-[#FCE4F0] overflow-hidden">
      
      {/* Decorative left roses background element */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 lg:w-40 bg-contain bg-no-repeat bg-left-top opacity-70 pointer-events-none z-0"
        style={{ backgroundImage: "url('/hero-roses-left.png')" }}
      />

      <div className="bloom-container relative z-10 py-8 sm:py-12 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Content Column (5 cols on lg, 6 cols on md) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center text-left relative z-10">
            
            {/* Eyebrow kicker */}
            <div className="mb-2 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#8E1843] uppercase">
                NATURAL BEAUTY. REAL YOU.
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[56px] font-medium text-[#4A0E22] tracking-tight leading-[1.08] mb-2 sm:mb-3">
              Reveal Your<br />
              <span className="italic font-normal text-[#D61C7C]">Natural Beauty</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg font-medium text-[#751437] tracking-wide mb-2 sm:mb-3">
              Skincare. Makeup. Selfcare.
            </p>

            {/* Description */}
            <p className="text-xs sm:text-[13px] md:text-sm text-stone-600 leading-relaxed max-w-md mb-6 sm:mb-7">
              Discover premium beauty essentials for glowing skin, confident you. Because you deserve the best.
            </p>

            {/* Shop Now CTA Button */}
            <div className="mb-7 sm:mb-8">
              <button
                onClick={onShopNowClick}
                className="inline-flex items-center gap-2.5 bg-[#8E1843] hover:bg-[#751437] text-white text-xs sm:text-sm font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 3 Trust Points Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 border-t border-[#F8BBD0]/60 max-w-md">
              
              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C]">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">100% Original</h4>
                  <p className="text-[9.5px] sm:text-[10px] text-stone-500 mt-0.5 leading-tight">Authentic Products</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C]">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">Free Shipping</h4>
                  <p className="text-[9.5px] sm:text-[10px] text-stone-500 mt-0.5 leading-tight">On Orders Above ₹499</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C]">
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">Easy Returns</h4>
                  <p className="text-[9.5px] sm:text-[10px] text-stone-500 mt-0.5 leading-tight">Hassle Free</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Visual Column (7 cols on lg, 6 cols on md) */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-soft-card border border-[#F8BBD0]/50 bg-white/40">
              <img
                src="/hero-model-blended.png"
                alt="Radiant beauty model holding pink skincare bottle with glowing skin"
                className="w-full h-auto object-contain object-center block"
                fetchPriority="high"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
