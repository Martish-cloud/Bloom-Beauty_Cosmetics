import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Leaf, 
  Award, 
  Headphones 
} from 'lucide-react';

export default function TrustSection() {
  const uspItems = [
    {
      icon: HeartHandshake,
      title: 'Cruelty Free',
      subtitle: 'Kind to Animals'
    },
    {
      icon: ShieldCheck,
      title: 'Dermatologically Tested',
      subtitle: 'Safe for Your Skin'
    },
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      subtitle: 'Pure & Effective'
    },
    {
      icon: Award,
      title: 'Premium Brands',
      subtitle: 'Top Global Labels'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      subtitle: "We're Here to Help"
    }
  ];

  return (
    <section className="py-9 sm:py-10 bg-white border-y border-[#FCE4F0] w-full overflow-hidden">
      <div className="bloom-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-center text-center">
          {uspItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className={`flex flex-col items-center group transition-transform hover:-translate-y-0.5 duration-300 ${
                  idx === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                {/* Circular Outline Icon Container */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFF5F8] border-2 border-[#F8BBD0] flex items-center justify-center text-[#D61C7C] group-hover:bg-[#D61C7C] group-hover:text-white group-hover:border-[#D61C7C] transition-all duration-300 mb-2.5 shadow-2xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                </div>

                <h4 className="text-xs sm:text-[13px] font-bold text-[#751437] tracking-tight mb-0.5">
                  {item.title}
                </h4>

                <p className="text-[10.5px] sm:text-[11.5px] text-stone-500 font-normal">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
