import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PromoBanners({ onSelectCategory }) {
  const banners = [
    {
      id: 'makeup',
      category: 'makeup',
      title: 'Makeup',
      subtitle: 'For Every You',
      tagline: 'Express. Enhance. Empower.',
      buttonText: 'Shop Makeup',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
      alt: 'Luxury makeup, red lipsticks, and beauty powder'
    },
    {
      id: 'haircare',
      category: 'haircare',
      title: 'Haircare',
      subtitle: 'For Stronger You',
      tagline: 'Nourish. Repair. Shine.',
      buttonText: 'Shop Haircare',
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85',
      alt: 'Nourishing hair treatment oils and botanical shampoo'
    },
    {
      id: 'fragrances',
      category: 'fragrances',
      title: 'Fragrances',
      subtitle: 'That Stay With You',
      tagline: 'Scents for Every Story.',
      buttonText: 'Shop Fragrances',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
      alt: 'Artisanal luxury perfume bottles with delicate flower petals'
    }
  ];

  const handleBannerClick = (catId) => {
    onSelectCategory(catId);
    const el = document.getElementById('bestsellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-7 sm:py-9 bg-[#FFFDFE] w-full overflow-hidden">
      <div className="bloom-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              onClick={() => handleBannerClick(banner.category)}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF5F8] via-[#FDF2F7] to-[#FFF0F5] border border-[#F8BBD0]/70 p-5 sm:p-6 flex items-center justify-between shadow-soft-card hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Left content */}
              <div className="flex-1 pr-3 text-left z-10">
                <h3 className="font-serif text-2xl lg:text-[26px] font-medium text-[#4A0E22] leading-tight mb-1">
                  {banner.title}<br />
                  <span className="italic font-normal text-[#D61C7C]">
                    {banner.subtitle}
                  </span>
                </h3>

                <p className="text-xs text-stone-600 font-medium mb-3.5">
                  {banner.tagline}
                </p>

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D61C7C] bg-white group-hover:bg-[#D61C7C] group-hover:text-white border border-[#F8BBD0] px-3.5 py-1.5 rounded-full shadow-2xs transition-all duration-300"
                >
                  <span>{banner.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right image with controlled contain/cover so products aren't sliced */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 shrink-0 rounded-xl overflow-hidden border border-[#F8BBD0]/70 shadow-xs relative bg-white">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Subtle floral glow */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#F8BBD0]/20 rounded-full blur-xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
