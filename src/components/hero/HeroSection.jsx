import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles, Heart } from 'lucide-react';

export default function HeroSection({ onShopNowClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FFF5F8] via-[#FDF0F5] to-[#FFF0F5] border-b border-[#FCE4F0]/60">
      
      {/* Decorative background ambient blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#F8BBD0]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#D61C7C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Text Column (approx 5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10 text-left">
            
            {/* Small uppercase tag */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#8E1843] uppercase">
                NATURAL BEAUTY. REAL YOU.
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#4A0E22] tracking-tight leading-[1.08] mb-4">
              Reveal Your<br />
              <span className="italic font-normal text-[#D61C7C]">Natural Beauty</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg font-medium text-[#751437] tracking-wide mb-3">
              Skincare. Makeup. Selfcare.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed max-w-md mb-8">
              Discover premium beauty essentials for glowing skin, confident you. Because you deserve the best.
            </p>

            {/* CTA Button */}
            <div className="mb-10">
              <button
                onClick={onShopNowClick}
                className="inline-flex items-center gap-3 bg-[#D61C7C] hover:bg-[#BF156C] text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#D61C7C]/25 hover:shadow-xl hover:shadow-[#D61C7C]/30 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust points row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#F8BBD0]/50 max-w-lg">
              
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C] mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">100% Original</h4>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">Authentic Products</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C] mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">Free Shipping</h4>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">On Orders Above ₹499</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center shrink-0 text-[#D61C7C] mt-0.5">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">Easy Returns</h4>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">Hassle Free</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Visual / Model Column with Handwritten Notes (approx 7 cols on lg) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            {/* Handwritten overlay 1: Glow Confident Be You ♡ (Left of model) */}
            <div className="absolute left-0 sm:left-4 top-1/4 z-20 pointer-events-none transform -rotate-6 hidden sm:block">
              <div className="text-center font-script text-3xl sm:text-4xl text-[#5C122C] leading-none tracking-wide select-none drop-shadow-sm">
                <p>Glow</p>
                <p>Confident</p>
                <p className="flex items-center justify-center gap-1">
                  Be You
                </p>
                <span className="text-2xl text-[#D61C7C] inline-block mt-1">♡</span>
              </div>
            </div>

            {/* Handwritten overlay 2: Selfcare Looks Good On You ♡ (Top right) */}
            <div className="absolute right-2 sm:right-6 top-6 sm:top-10 z-20 pointer-events-none transform rotate-3 hidden sm:block">
              <div className="text-center font-script text-2xl sm:text-3xl text-[#5C122C] leading-tight select-none drop-shadow-sm">
                <p>Selfcare</p>
                <p>Looks Good</p>
                <p>On You</p>
                <span className="text-2xl text-[#D61C7C] inline-block mt-0.5">♡</span>
              </div>
            </div>

            {/* Model visual container with soft aura */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              
              {/* Soft pink gradient backdrop circle */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FAD1DF] via-[#FCE7EE] to-[#FFF0F5] rounded-full filter blur-xl scale-95 opacity-80" />

              {/* Main Model Photography */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#D61C7C]/15 border-4 border-white aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] bg-[#FFF0F5]">
                <img
                  src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85"
                  alt="Radiant beauty model holding skincare product with glowing skin"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Subtle soft gradient fade at base */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E22]/30 via-transparent to-transparent pointer-events-none" />

                {/* Floating beauty badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#FCE4F0] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#D61C7C]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900">Award-Winning Radiance</p>
                      <p className="text-[10px] text-stone-500">Formulated with botanical ceramides</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D61C7C] bg-[#FFF0F5] px-2.5 py-1 rounded-full">
                    ★ 4.9
                  </span>
                </div>
              </div>

              {/* Decorative mini flowers / floating petal badges */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-white shadow-lg border border-[#F8BBD0] flex items-center justify-center p-2 transform rotate-12">
                <span className="text-2xl">🌸</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
