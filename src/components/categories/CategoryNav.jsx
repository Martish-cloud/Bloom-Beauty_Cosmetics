import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { Percent, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const scrollContainerRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (id) => {
    onSelectCategory(id);
    const el = document.getElementById('bestsellers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-white border-b border-[#FCE4F0]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Scroll navigation arrows for desktop */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-[#F8BBD0] items-center justify-center text-stone-600 hover:text-[#D61C7C] hover:scale-105 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-[#F8BBD0] items-center justify-center text-stone-600 hover:text-[#D61C7C] hover:scale-105 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Categories container */}
        <div
          ref={scrollContainerRef}
          className="flex items-start justify-start md:justify-between gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group flex flex-col items-center shrink-0 text-center transition-all focus:outline-none"
              >
                {/* Circle Container */}
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-[#D61C7C] ring-offset-2 scale-105 shadow-md shadow-[#D61C7C]/20'
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#FFF0F5] border-2 border-[#F8BBD0]/80 flex items-center justify-center relative">
                    
                    {cat.isOfferBadge ? (
                      // Special Offers Circle with % sign matching reference
                      <div className="w-full h-full bg-gradient-to-tr from-[#D61C7C] to-[#E0268F] flex items-center justify-center text-white">
                        <Percent className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                      </div>
                    ) : (
                      // Real category image
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}

                    {/* Subtle inner highlight */}
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5 pointer-events-none" />
                  </div>
                </div>

                {/* Category Label */}
                <span
                  className={`mt-2 text-xs sm:text-[13px] font-medium tracking-tight transition-colors line-clamp-1 max-w-[80px] sm:max-w-[90px] ${
                    isSelected
                      ? 'text-[#D61C7C] font-semibold'
                      : 'text-stone-700 group-hover:text-[#D61C7C]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
