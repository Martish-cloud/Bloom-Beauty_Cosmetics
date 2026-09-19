import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

export default function BestsellersSection({ 
  products, 
  activeCategory, 
  onQuickView, 
  onViewAll,
  onShopSkincare 
}) {
  const displayedProducts = useMemo(() => {
    if (activeCategory && activeCategory !== 'all') {
      const filtered = products.filter(p => p.category === activeCategory);
      if (filtered.length > 0) return filtered;
    }
    return products.filter(p => p.isBestseller).slice(0, 6);
  }, [products, activeCategory]);

  return (
    <section id="bestsellers-section" className="py-10 sm:py-12 bg-[#FFFDFE] w-full overflow-hidden">
      <div className="bloom-container">
        
        {/* Section Heading & View All */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#4A0E22] tracking-tight">
              {activeCategory && activeCategory !== 'all' 
                ? `${activeCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Collection` 
                : 'Bestsellers'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Most loved beauty essentials by over 50,000+ radiant customers
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#D61C7C] hover:text-[#BF156C] transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bestseller Grid: 6 Products on Left + Skincare That Cares Banner on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* Product cards container */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>

          {/* Featured Skincare Banner (Compact & Balanced with Product Row) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="w-full relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#FCE7F0] via-[#FDF2F7] to-[#FFF0F5] border border-[#F8BBD0] p-4 sm:p-5 flex flex-col shadow-soft-card group hover:shadow-soft-hover transition-all duration-300">
              
              {/* Banner Text Content */}
              <div className="relative z-10 text-left">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8E1843] uppercase block mb-1">
                  FEATURED CURATION
                </span>

                <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-[#4A0E22] leading-tight mb-1.5">
                  Skincare<br />
                  <span className="italic font-normal text-[#D61C7C]">That Cares</span>
                </h3>

                <p className="text-xs text-stone-600 font-medium leading-tight">
                  Clean Ingredients. Visible Results.
                </p>

                <div className="mt-2.5 mb-3">
                  <button
                    onClick={onShopSkincare}
                    className="inline-flex items-center gap-1.5 bg-[#D61C7C] hover:bg-[#BF156C] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-xs transition-all group-hover:scale-102 cursor-pointer"
                  >
                    <span>Shop Skincare</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Banner Product Photography Composition */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xs border border-[#F8BBD0]/60 aspect-[16/10] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85"
                  alt="Luxury skincare bottles with pink roses"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#751437]/20 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-1.5 left-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-semibold text-[#751437] shadow-2xs">
                  100% Dermat-Approved
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
