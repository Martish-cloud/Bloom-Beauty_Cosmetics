import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  ShoppingBag, 
  Check, 
  Eye, 
  ArrowRight,
  Flame
} from 'lucide-react';
import RatingStars from '../common/RatingStars';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { COMBO_OFFERS } from '../../data/products';

export default function ComboOffersSection({ onQuickView, onViewAllCombos }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [addedIds, setAddedIds] = useState({});

  // Dynamic countdown timer for authentic limited-time urgency
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddCombo = (e, combo) => {
    e.stopPropagation();
    addToCart(combo, 1);
    setAddedIds(prev => ({ ...prev, [combo.id]: true }));
    addToast({
      title: 'Combo Deal Added to Bag!',
      message: `${combo.name} (${combo.discount}) added with full combo savings.`,
      type: 'cart'
    });
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [combo.id]: false }));
    }, 1600);
  };

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <section id="combo-offers-section" className="py-12 sm:py-16 bg-gradient-to-b from-[#FFF5F8] via-[#FFFDFE] to-white border-y border-[#FCE4F0] relative overflow-hidden w-full">
      
      {/* Background soft ambient glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#F8BBD0]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#FFF0F5] rounded-full blur-3xl pointer-events-none" />

      <div className="bloom-container relative z-10">
        
        {/* Section Header with Urgency Timer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D61C7C]/15 to-[#8E1843]/15 border border-[#F8BBD0] text-[#8E1843] text-[11px] font-bold tracking-wider uppercase mb-2.5 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-[#D61C7C] animate-pulse" />
              <span>SPECIAL LIMITED TIME OFFERS • UP TO 35% OFF</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#4A0E22] tracking-tight">
              Curated Beauty Combos & Value Sets
            </h2>

            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Multi-step radiance, full-face glam, and restorative selfcare routines bundled at steep discounts. Stock is strictly limited.
            </p>
          </div>

          {/* Flash Countdown Timer Pill */}
          <div className="flex items-center gap-3 bg-white border border-[#F8BBD0] px-4 py-2.5 rounded-2xl shadow-soft-card shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8E1843]">
              <Clock className="w-4 h-4 text-[#D61C7C]" />
              <span className="hidden sm:inline">Deal Ends In:</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#4A0E22]">
              <span className="bg-[#FFF0F5] border border-[#F8BBD0] px-2 py-0.5 rounded-md">
                {formatDigit(timeLeft.hours)}h
              </span>
              <span>:</span>
              <span className="bg-[#FFF0F5] border border-[#F8BBD0] px-2 py-0.5 rounded-md">
                {formatDigit(timeLeft.minutes)}m
              </span>
              <span>:</span>
              <span className="bg-[#D61C7C] text-white px-2 py-0.5 rounded-md shadow-2xs">
                {formatDigit(timeLeft.seconds)}s
              </span>
            </div>
          </div>
        </div>

        {/* 3 Deluxe Combo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {COMBO_OFFERS.map((combo) => {
            const isAdded = !!addedIds[combo.id];

            return (
              <div
                key={combo.id}
                onClick={() => onQuickView(combo)}
                className="group relative bg-white rounded-3xl border border-[#F8BBD0]/80 hover:border-[#D61C7C] p-4 sm:p-5 flex flex-col justify-between shadow-soft-card hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                
                {/* Top Corner Discount Callout Ribbon */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#D61C7C] to-[#E0268F] text-white text-[10.5px] font-bold px-2.5 py-1 rounded-full shadow-xs tracking-wide">
                    <Sparkles className="w-3 h-3" />
                    {combo.discount}
                  </span>

                  <span className="text-[11px] font-semibold text-[#8E1843] bg-[#FFF0F5] border border-[#F8BBD0]/70 px-2.5 py-0.5 rounded-full">
                    {combo.comboType}
                  </span>
                </div>

                {/* Combo Image Container */}
                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#FFF5F8] mb-3.5 border border-[#F8BBD0]/40 flex items-center justify-center">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E22]/25 via-transparent to-transparent pointer-events-none" />

                  {/* Savings pill overlay */}
                  <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10.5px] font-bold text-emerald-700 shadow-xs border border-emerald-100 flex items-center gap-1">
                    <span>✓</span>
                    <span>{combo.savings}</span>
                  </div>

                  {/* Quick View Hover overlay */}
                  <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white/95 text-stone-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#D61C7C]" />
                      Quick View Combo
                    </span>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="flex-1 flex flex-col text-left">
                  <span className="text-[10px] font-bold tracking-widest text-[#8E1843] uppercase block mb-1">
                    {combo.brand}
                  </span>

                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#4A0E22] group-hover:text-[#D61C7C] transition-colors leading-tight mb-2">
                    {combo.name}
                  </h3>

                  {/* What's Inside List */}
                  <div className="bg-[#FFF5F8]/90 border border-[#F8BBD0]/60 rounded-xl p-2.5 mb-3 text-left">
                    <span className="text-[9.5px] font-bold text-[#751437] uppercase tracking-wider block mb-1">
                      INCLUDED IN THIS VALUE SET:
                    </span>
                    <div className="space-y-1">
                      {combo.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#D61C7C] shrink-0 mt-0.5" />
                          <span className="line-clamp-1 leading-tight font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="mb-3">
                    <RatingStars rating={combo.rating} reviewCount={combo.reviewCount} size="sm" />
                  </div>

                  {/* Pricing Box */}
                  <div className="flex items-baseline justify-between pt-2 border-t border-[#F8BBD0]/40 mb-3.5">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-[#4A0E22]">
                        ₹{combo.price}
                      </span>
                      <span className="text-xs text-stone-400 line-through ml-2 font-normal">
                        ₹{combo.oldPrice}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {combo.discount}
                    </span>
                  </div>
                </div>

                {/* Claim Deal Button */}
                <button
                  onClick={(e) => handleAddCombo(e, combo)}
                  className={`w-full py-2.5 sm:py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#D61C7C] hover:bg-[#BF156C] text-white hover:shadow-lg hover:shadow-[#D61C7C]/25'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Combo Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Claim Combo Deal (₹{combo.price})</span>
                    </>
                  )}
                </button>

              </div>
            );
          })}
        </div>

        {/* View All Combos / Catalog Footer link */}
        <div className="mt-8 text-center">
          <button
            onClick={onViewAllCombos}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D61C7C] hover:text-[#8E1843] transition-colors cursor-pointer group"
          >
            <span>Explore all beauty combinations & gift sets</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
