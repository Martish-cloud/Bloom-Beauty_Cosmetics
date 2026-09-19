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
    <section className="py-10 bg-white border-y border-[#FCE4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center text-center">
          {uspItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className={`flex flex-col items-center group transition-transform hover:-translate-y-1 duration-300 ${
                  idx === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                {/* Circular Outline Icon Container matching screenshot */}
                <div className="w-14 h-14 rounded-full bg-[#FFF0F5] border-2 border-[#F8BBD0] flex items-center justify-center text-[#D61C7C] group-hover:bg-[#D61C7C] group-hover:text-white group-hover:border-[#D61C7C] transition-all duration-300 mb-3 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-[#751437] tracking-tight mb-0.5">
                  {item.title}
                </h4>

                <p className="text-[11px] sm:text-xs text-stone-500 font-normal">
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
