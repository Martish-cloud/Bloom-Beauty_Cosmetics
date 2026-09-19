import React, { useRef } from 'react';
import { CATEGORIES } from '../../data/categories';
import { Percent, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (id) => {
    onSelectCategory(id);
    if (id === 'offers' || id === 'gift-sets') {
      const el = document.getElementById('combo-offers-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    const el = document.getElementById('bestsellers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-5 sm:py-6 bg-white border-b border-[#FCE4F0] relative w-full overflow-hidden">
      <div className="bloom-container relative">
        
        {/* Scroll navigation arrow left */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-1 top-[40%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-[#F8BBD0] items-center justify-center text-stone-600 hover:text-[#D61C7C] hover:scale-105 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scroll navigation arrow right */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-1 top-[40%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-[#F8BBD0] items-center justify-center text-stone-600 hover:text-[#D61C7C] hover:scale-105 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Categories horizontal row */}
        <div
          ref={scrollContainerRef}
          className="flex items-start justify-start md:justify-between gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group flex flex-col items-center shrink-0 text-center transition-all focus:outline-none cursor-pointer"
                style={{ width: '84px' }}
              >
                {/* Circle Container (normalized to 76px / 80px) */}
                <div
                  className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-0.5 transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-[#D61C7C] ring-offset-2 scale-105 shadow-md shadow-[#D61C7C]/20'
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#FFF5F8] border border-[#F8BBD0] flex items-center justify-center relative shadow-xs">
                    
                    {cat.isOfferBadge ? (
                      // Special Offers Circle with % sign matching reference
                      <div className="w-full h-full bg-gradient-to-tr from-[#D61C7C] to-[#E0268F] flex items-center justify-center text-white">
                        <Percent className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                      </div>
                    ) : (
                      // Category transparent product cutout
                      <div className="w-full h-full p-1.5 sm:p-2 flex items-center justify-center">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_2px_6px_rgba(214,28,124,0.08)]"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=85';
                          }}
                        />
                      </div>
                    )}

                    {/* Subtle highlight */}
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5 pointer-events-none" />
                  </div>
                </div>

                {/* Category Label - wraps to 2 lines if needed without truncation */}
                <span
                  className={`mt-2 text-xs sm:text-[12.5px] font-medium leading-tight transition-colors text-center w-full px-0.5 min-h-[28px] whitespace-pre-line flex items-center justify-center ${
                    isSelected
                      ? 'text-[#D61C7C] font-semibold'
                      : 'text-stone-700 group-hover:text-[#D61C7C]'
                  }`}
                >
                  {cat.displayName || cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
