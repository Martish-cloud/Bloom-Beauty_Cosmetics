import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  X, 
  RotateCcw,
  ShieldCheck,
  Truck
} from 'lucide-react';
import ProductCard from '../bestsellers/ProductCard';

export default function ShopPage({ 
  products, 
  onQuickView, 
  onBackToHome, 
  initialCategory = 'all' 
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Available Category Filter Options with Counts
  const categoriesList = useMemo(() => {
    const counts = { all: products.length };
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return [
      { id: 'all', label: 'All Products', count: counts['all'] || 0 },
      { id: 'skincare', label: 'Skincare', count: counts['skincare'] || 0 },
      { id: 'makeup', label: 'Makeup', count: counts['makeup'] || 0 },
      { id: 'haircare', label: 'Haircare', count: counts['haircare'] || 0 },
      { id: 'fragrances', label: 'Fragrances', count: counts['fragrances'] || 0 },
      { id: 'face-masks', label: 'Face Masks', count: counts['face-masks'] || 0 },
      { id: 'body-care', label: 'Body Care', count: counts['body-care'] || 0 },
    ];
  }, [products]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        list.sort((a, b) => {
          const discA = parseInt(a.discount) || 0;
          const discB = parseInt(b.discount) || 0;
          return discB - discA;
        });
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="w-full bg-[#FFFDFE] min-h-screen py-6 sm:py-8 lg:py-10">
      <div className="bloom-container">
        
        {/* Breadcrumb & Back button */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <button 
              onClick={onBackToHome}
              className="hover:text-[#D61C7C] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#D61C7C] font-semibold">Shop Catalog</span>
          </nav>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D61C7C] hover:text-[#BF156C] bg-[#FFF0F5] hover:bg-[#FCE4F0] px-3.5 py-1.5 rounded-full transition-all border border-[#F8BBD0]/60 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Storefront</span>
          </button>
        </div>

        {/* Page Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#FFF0F5] via-[#FDF2F7] to-[#FCE7EE] border border-[#F8BBD0]/70 p-6 sm:p-8 lg:p-10 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F8BBD0]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#F8BBD0] text-[#D61C7C] text-[11px] font-bold tracking-widest uppercase mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Beauty Catalog</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#4A0E22] tracking-tight mb-3">
              All Beauty Essentials
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
              Explore our full curated range of dermatologist-tested skincare, high-pigment makeup, nourishing haircare, and artisanal fragrances formulated for radiant confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#751437]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D61C7C]" />
                100% Authentic Brands
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#D61C7C]" />
                Free Shipping Above ₹499
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#D61C7C]" />
                7-Day Easy Returns
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-[#FCE4F0] p-4 sm:p-5 shadow-soft-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by product name, brand, or ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFF5F8] border border-[#F8BBD0]/60 focus:border-[#D61C7C] text-xs text-stone-800 placeholder-stone-400 rounded-xl pl-10 pr-9 py-2.5 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3 shrink-0">
              <label htmlFor="sort-dropdown" className="text-xs font-medium text-stone-600 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D61C7C]" />
                <span>Sort by:</span>
              </label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FFF5F8] border border-[#F8BBD0]/70 text-xs font-medium text-stone-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#D61C7C] cursor-pointer"
              >
                <option value="featured">Featured & Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 mt-4 border-t border-stone-100">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#D61C7C] text-white shadow-xs'
                      : 'bg-[#FFF5F8] text-stone-700 hover:bg-[#FFF0F5] hover:text-[#D61C7C] border border-[#F8BBD0]/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-stone-200/60 text-stone-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Active Filter Notice */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm font-medium text-stone-600">
            Showing <span className="font-bold text-[#4A0E22]">{filteredProducts.length}</span> of {products.length} products
            {selectedCategory !== 'all' && (
              <span className="ml-1 text-stone-500">
                in <strong className="text-[#D61C7C] capitalize">{selectedCategory.replace('-', ' ')}</strong>
              </span>
            )}
            {searchQuery && (
              <span className="ml-1 text-stone-500">
                matching "<strong>{searchQuery}</strong>"
              </span>
            )}
          </p>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[#D61C7C] hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 mb-12">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#F8BBD0]/60 max-w-md mx-auto my-8 shadow-soft-card">
            <div className="w-14 h-14 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center mx-auto mb-4 text-[#D61C7C]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#4A0E22] mb-1">
              No matching products found
            </h3>
            <p className="text-xs text-stone-500 mb-5 leading-relaxed">
              We couldn't find any beauty items matching your search criteria. Try adjusting your keywords or clearing the category filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-[#D61C7C] hover:bg-[#BF156C] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>View All Products</span>
            </button>
          </div>
        )}

        {/* Bottom Back to Storefront Navigation */}
        <div className="flex justify-center pt-8 border-t border-[#FCE4F0]">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 bg-[#8E1843] hover:bg-[#751437] text-white text-xs sm:text-sm font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </button>
        </div>

      </div>
    </div>
  );
}
