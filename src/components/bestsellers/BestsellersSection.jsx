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
                ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('-', ' ')} Collection` 
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

        {/* Bestseller Grid: 6 Products on Left (9 cols on xl) + Skincare That Cares Banner on Right (3 cols on xl) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* Product cards container */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 h-full">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>

          {/* Featured Skincare Banner */}
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <div className="w-full relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#FCE7F0] via-[#FDF2F7] to-[#FFF0F5] border border-[#F8BBD0] p-5 sm:p-6 flex flex-col justify-between shadow-soft-card group hover:shadow-soft-hover transition-all duration-300">
              
              {/* Banner Text Content */}
              <div className="relative z-10 text-left">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8E1843] uppercase block mb-1">
                  FEATURED CURATION
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A0E22] leading-tight mb-2">
                  Skincare<br />
                  <span className="italic font-normal text-[#D61C7C]">That Cares</span>
                </h3>

                <p className="text-xs text-stone-600 font-medium leading-relaxed mb-0.5">
                  Clean Ingredients.
                </p>
                <p className="text-xs text-stone-600 font-medium leading-relaxed mb-4">
                  Visible Results.
                </p>

                <button
                  onClick={onShopSkincare}
                  className="inline-flex items-center gap-2 bg-[#D61C7C] hover:bg-[#BF156C] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xs transition-all group-hover:scale-102 cursor-pointer"
                >
                  <span>Shop Skincare</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Banner Product Photography Composition */}
              <div className="relative mt-4 z-10 rounded-xl overflow-hidden shadow-sm border border-[#F8BBD0]/60 aspect-[4/3] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85"
                  alt="Luxury skincare bottles with pink roses"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#751437]/20 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9.5px] font-semibold text-[#751437] shadow-2xs">
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
