import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Header({ 
  onOpenSearch, 
  onOpenMobileMenu, 
  onSelectCategory,
  activeCategory 
}) {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');

  const navItems = [
    { label: 'Shop', id: 'all' },
    { label: 'Skincare', id: 'skincare' },
    { label: 'Makeup', id: 'makeup' },
    { label: 'Haircare', id: 'haircare' },
    { label: 'Fragrances', id: 'fragrances' },
    { label: 'New Arrivals', id: 'new-arrivals' },
    { label: 'Offers', id: 'offers' },
    { label: 'Blog', id: 'blog' },
  ];

  const handleNavClick = (id, e) => {
    e.preventDefault();
    if (id === 'blog') {
      const el = document.getElementById('newsletter-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    onSelectCategory(id);
    const el = document.getElementById('bestsellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearch) {
      onOpenSearch(quickSearchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#FCE4F0]/80 shadow-[0_2px_15px_-3px_rgba(214,28,124,0.05)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu toggle & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-[#D61C7C] hover:bg-[#FFF0F5] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Bloom Beauty Logo */}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              {/* Floral Logo Icon */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#D61C7C] to-[#E84E9F] flex items-center justify-center text-white shadow-md shadow-[#D61C7C]/25 group-hover:scale-105 transition-transform duration-300">
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" fill="white" fillOpacity="0.3" />
                  <circle cx="12" cy="9" r="3" fill="white" />
                  <path d="M12 2v20" stroke="white" strokeWidth="1.5" />
                  <path d="M2 12h20" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.08em] text-[#751437] group-hover:text-[#D61C7C] transition-colors leading-none">
                  BLOOM
                </span>
                <span className="font-serif text-lg sm:text-xl font-medium tracking-[0.14em] text-[#D61C7C] leading-none mt-0.5">
                  BEAUTY
                </span>
                <span className="text-[7.5px] sm:text-[8px] font-semibold tracking-[0.28em] text-stone-400 mt-1 uppercase">
                  BEAUTY LIVES HERE
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`relative text-xs xl:text-[13px] font-medium tracking-wider uppercase transition-colors py-1 cursor-pointer ${
                    isActive 
                      ? 'text-[#D61C7C] font-semibold' 
                      : 'text-stone-700 hover:text-[#D61C7C]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D61C7C] rounded-full animate-fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Search Box */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Desktop Search Input */}
            <form 
              onSubmit={handleQuickSearchSubmit}
              onClick={() => onOpenSearch && onOpenSearch('')}
              className="hidden md:flex items-center relative w-48 lg:w-60 xl:w-64 group cursor-pointer"
            >
              <input
                type="text"
                placeholder="Search for skincare, makeup..."
                value={quickSearchQuery}
                onChange={(e) => setQuickSearchQuery(e.target.value)}
                readOnly
                className="w-full bg-[#FFF0F5]/70 hover:bg-[#FFF0F5] border border-[#F8BBD0]/60 focus:border-[#D61C7C] text-xs text-stone-800 placeholder-stone-400 rounded-full pl-3.5 pr-10 py-2 transition-all outline-none cursor-pointer"
              />
              <button
                type="button"
                className="absolute right-1 w-7 h-7 rounded-full bg-[#D61C7C] hover:bg-[#BF156C] text-white flex items-center justify-center transition-transform group-hover:scale-95 shadow-sm"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Mobile Search Button */}
            <button
              onClick={() => onOpenSearch && onOpenSearch('')}
              className="md:hidden p-2 text-stone-700 hover:text-[#D61C7C] hover:bg-[#FFF0F5] rounded-xl transition-colors"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account with dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="hidden sm:flex items-center gap-1.5 text-stone-700 hover:text-[#D61C7C] p-2 rounded-xl transition-colors"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-medium tracking-wide">Account</span>
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#FCE4F0] py-3 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-900">Welcome to Bloom Beauty</p>
                    <p className="text-[11px] text-stone-500">Sign in to access exclusive member perks</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => {
                        setAccountMenuOpen(false);
                        alert("Welcome back to Bloom Beauty! Account profile loaded.");
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-[#FFF0F5] hover:text-[#D61C7C] rounded-lg transition-colors"
                    >
                      Sign In / Register
                    </button>
                    <button 
                      onClick={() => {
                        setAccountMenuOpen(false);
                        alert("Your orders: You have 1 order currently processing: Lakmé 9 to 5 Primer!");
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-[#FFF0F5] hover:text-[#D61C7C] rounded-lg transition-colors"
                    >
                      Orders & Tracking
                    </button>
                    <button 
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setIsWishlistOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-[#FFF0F5] hover:text-[#D61C7C] rounded-lg transition-colors"
                    >
                      My Saved Wishlist
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Heart Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-stone-700 hover:text-[#D61C7C] hover:bg-[#FFF0F5] rounded-xl transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D61C7C] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 p-2 text-stone-700 hover:text-[#D61C7C] hover:bg-[#FFF0F5] rounded-xl transition-colors"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] bg-[#D61C7C] text-white text-[10px] font-bold rounded-full px-1 flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-xs font-medium text-stone-700">
                Cart
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
