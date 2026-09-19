import React from 'react';
import { X, Search, Heart, ShoppingBag, Sparkles, ChevronRight, Phone } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  onSelectCategory, 
  activeCategory,
  onOpenSearch,
  currentView = 'home',
  onGoToShop,
  onGoToHome
}) {
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { totalItems, setIsCartOpen } = useCart();

  if (!isOpen) return null;

  const navItems = [
    { label: 'Shop All', id: 'all' },
    { label: 'Skincare', id: 'skincare' },
    { label: 'Makeup', id: 'makeup' },
    { label: 'Haircare', id: 'haircare' },
    { label: 'Fragrances', id: 'fragrances' },
    { label: 'New Arrivals', id: 'new-arrivals' },
    { label: 'Offers & Discounts', id: 'offers' },
    { label: 'Beauty Blog & Tips', id: 'blog' },
  ];

  const handleItemClick = (id) => {
    if (id === 'all' && onGoToShop) {
      onGoToShop('all');
      onClose();
      return;
    }
    if (currentView === 'shop' && onGoToShop) {
      onGoToShop(id);
      onClose();
      return;
    }
    onSelectCategory(id);
    onClose();
    const el = document.getElementById('bestsellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-[#FCE4F0] flex items-center justify-between bg-[#FFF0F5]/50">
          <button 
            onClick={() => {
              if (onGoToHome) onGoToHome();
              onClose();
            }}
            className="flex items-center gap-2 text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#D61C7C] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#751437] block leading-none">
                BLOOM BEAUTY
              </span>
              <span className="text-[7.5px] font-semibold text-stone-400 tracking-widest uppercase">
                BEAUTY LIVES HERE
              </span>
            </div>
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search */}
        <div className="p-4 border-b border-stone-100">
          <button
            onClick={() => {
              onClose();
              onOpenSearch('');
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#FFF0F5] text-stone-500 text-xs hover:border-[#D61C7C] border border-transparent transition-all text-left"
          >
            <Search className="w-4 h-4 text-[#D61C7C]" />
            <span>Search skincare, serums, makeup...</span>
          </button>
        </div>

        {/* Quick Action Badges */}
        <div className="grid grid-cols-2 gap-2 p-4 border-b border-stone-100 bg-stone-50/50">
          <button
            onClick={() => {
              onClose();
              setIsWishlistOpen(true);
            }}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-[#F8BBD0]/60 text-xs font-medium text-stone-700 hover:bg-[#FFF0F5]"
          >
            <Heart className="w-4 h-4 text-[#D61C7C]" />
            <span>Wishlist ({wishlistCount})</span>
          </button>
          <button
            onClick={() => {
              onClose();
              setIsCartOpen(true);
            }}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#D61C7C] text-white text-xs font-medium shadow-sm hover:bg-[#BF156C]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart ({totalItems})</span>
          </button>
        </div>

        {/* Navigation list */}
        <div className="py-2 flex-1">
          <p className="px-5 py-2 text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
            Categories & Collections
          </p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-5 py-3 text-sm text-left transition-colors ${
                activeCategory === item.id 
                  ? 'text-[#D61C7C] bg-[#FFF0F5] font-semibold border-l-4 border-[#D61C7C]' 
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#FFF0F5]/50 border-t border-[#FCE4F0] text-xs text-stone-600 space-y-2">
          <div className="flex items-center gap-2 text-[#751437] font-medium">
            <Phone className="w-4 h-4 text-[#D61C7C]" />
            <span>Need Help? Call +91 1800-BLOOM</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Free Delivery on orders above ₹499 • 100% Authentic
          </p>
        </div>

      </div>
    </div>
  );
}
