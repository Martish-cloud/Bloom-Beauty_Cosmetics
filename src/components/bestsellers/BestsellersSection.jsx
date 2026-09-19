import React from 'react';
import ProductCard from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function BestsellersSection({ 
  products, 
  activeCategory, 
  onQuickView, 
  onViewAll,
  onShopSkincare 
}) {
  // Filter products based on activeCategory if specified, otherwise show bestsellers
  const displayedProducts = React.useMemo(() => {
    if (activeCategory && activeCategory !== 'all') {
      const filtered = products.filter(p => p.category === activeCategory);
      if (filtered.length > 0) return filtered;
    }
    // Default to bestsellers
    return products.filter(p => p.isBestseller).slice(0, 6);
  }, [products, activeCategory]);

  return (
    <section id="bestsellers-section" className="py-12 bg-[#FFFDFE]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & View All */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#4A0E22] tracking-tight">
              {activeCategory && activeCategory !== 'all' 
                ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('-', ' ')} Collection` 
                : 'Bestsellers'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Most loved beauty essentials by over 50,000+ radiant customers
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#D61C7C] hover:text-[#BF156C] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Layout: Products Grid (Left) + Skincare That Cares Banner (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Product cards container (approx 9 cols on xl, or 8 on lg) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4 h-full">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>

          {/* Featured Skincare Banner (Right side - approx 4 cols on lg, 3 cols on xl) */}
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <div className="w-full relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#FCE7F0] via-[#FDF2F7] to-[#FFF0F5] border border-[#F8BBD0]/70 p-6 sm:p-7 flex flex-col justify-between shadow-soft-card group hover:shadow-soft-hover transition-all duration-500">
              
              {/* Background floral decoration */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#D61C7C]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Banner Text Content */}
              <div className="relative z-10 text-left">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#8E1843] uppercase block mb-1">
                  FEATURED CURATION
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#4A0E22] leading-tight mb-3">
                  Skincare<br />
                  <span className="italic font-normal text-[#D61C7C]">That Cares</span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed mb-1">
                  Clean Ingredients.
                </p>
                <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed mb-6">
                  Visible Results.
                </p>

                <button
                  onClick={onShopSkincare}
                  className="inline-flex items-center gap-2 bg-[#D61C7C] hover:bg-[#BF156C] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-[#D61C7C]/20 hover:shadow-lg transition-all group-hover:scale-102"
                >
                  <span>Shop Skincare</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Banner Image Composition matching screenshot */}
              <div className="relative mt-6 z-10 rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 aspect-[4/3] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85"
                  alt="Luxury skincare bottles with pink roses"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#751437]/25 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#751437]">
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
