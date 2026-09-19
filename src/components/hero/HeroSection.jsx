import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function HeroSection({ onShopNowClick }) {
  return (
    <section className="relative w-full bg-[#FFF5F8] border-b border-[#FCE4F0] overflow-hidden min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] xl:min-h-[620px] flex items-center">
      
      {/* Full Hero Section Background Visual Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <picture>
          <source srcSet="/hero-bg-clean.webp" type="image/webp" />
          <img
            src="/hero-bg-clean.jpg"
            alt="Bloom Beauty Campaign Ambassador holding pink skincare product with glowing natural skin and blooming camellia flowers"
            className="w-full h-full object-cover object-[72%_center] sm:object-[68%_center] md:object-[65%_center] lg:object-[62%_center] xl:object-[60%_center]"
            fetchPriority="high"
            loading="eager"
            width="2048"
            height="1150"
          />
        </picture>

        {/* Soft, seamless feathered blush wash on the left to guarantee 100% typography contrast & readability */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[85%] md:w-[65%] lg:w-[55%] xl:w-[50%] bg-gradient-to-r from-[#FFF5F8]/95 via-[#FFF5F8]/85 to-transparent z-1" />

        {/* Subtle bottom edge blend into category section */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/40 to-transparent z-1" />
      </div>

      <div className="bloom-container relative z-10 py-10 sm:py-12 md:py-14 lg:py-16 w-full">
        <div className="max-w-xl lg:max-w-lg xl:max-w-xl flex flex-col justify-center text-left">
          
          {/* Eyebrow kicker */}
          <div className="mb-2 sm:mb-2.5">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#8E1843] uppercase">
              NATURAL BEAUTY. REAL YOU.
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[56px] font-medium text-[#4A0E22] tracking-tight leading-[1.08] mb-2 sm:mb-2.5">
            Reveal Your<br />
            <span className="italic font-normal text-[#D61C7C]">Natural Beauty</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg font-medium text-[#751437] tracking-wide mb-2 sm:mb-2.5">
            Skincare. Makeup. Selfcare.
          </p>

          {/* Description */}
          <p className="text-xs sm:text-[13px] md:text-sm text-stone-700 leading-relaxed max-w-md mb-5 sm:mb-6 font-normal">
            Discover premium beauty essentials for glowing skin, confident you. Because you deserve the best.
          </p>

          {/* Shop Now CTA Button */}
          <div className="mb-6 sm:mb-7">
            <button
              onClick={onShopNowClick}
              className="inline-flex items-center gap-2.5 bg-[#8E1843] hover:bg-[#751437] text-white text-xs sm:text-sm font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Trust Points Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-5 border-t border-[#F8BBD0]/60 max-w-md">
            
            <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C] shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">100% Original</h4>
                <p className="text-[9.5px] sm:text-[10px] text-stone-600 mt-0.5 leading-tight">Authentic Products</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C] shadow-2xs">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">Free Shipping</h4>
                <p className="text-[9.5px] sm:text-[10px] text-stone-600 mt-0.5 leading-tight">On Orders Above ₹499</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C] shadow-2xs">
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">Easy Returns</h4>
                <p className="text-[9.5px] sm:text-[10px] text-stone-600 mt-0.5 leading-tight">Hassle Free</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
