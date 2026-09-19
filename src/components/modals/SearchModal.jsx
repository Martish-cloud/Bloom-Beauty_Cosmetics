import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function SearchModal({ isOpen, onClose, products, initialQuery = '', onSelectProduct }) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef(null);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  const quickTags = [
    'Niacinamide',
    'Vitamin C',
    'Primer',
    'Hair Oil',
    'Hyaluronic',
    'Matte Foundation',
    'Fragrance'
  ];

  const filteredProducts = products.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    addToast({
      title: 'Added to Cart',
      message: `${product.brand} ${product.name} added to your bag.`,
      type: 'cart'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Modal Content */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl z-10 border border-[#FCE4F0] overflow-hidden animate-fade-in flex flex-col max-h-[80vh]">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#FCE4F0] bg-[#FFF0F5]/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#D61C7C] flex items-center justify-center text-white shrink-0">
            <Search className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for serums, primers, brands, skincare..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder-stone-400 outline-none font-medium"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 p-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-2 py-1 rounded-lg hover:bg-stone-100 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Quick Search Tags */}
        <div className="px-5 py-3 border-b border-stone-100 bg-white flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider shrink-0">
            Trending:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="shrink-0 text-xs text-stone-600 hover:text-[#D61C7C] bg-[#FFF0F5] hover:bg-[#FCE4F0] px-3 py-1 rounded-full transition-colors font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {!query.trim() ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-[#D61C7C]/60" />
              <p className="text-xs sm:text-sm text-stone-500 font-medium">
                Type something to search across our luxury skincare, makeup & fragrances.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-stone-800">
                No products found for "{query}"
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Check your spelling or explore our popular categories like Skincare or Makeup.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 px-1 mb-2">
                <span>Found {filteredProducts.length} results</span>
              </div>

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl border border-[#FCE4F0] hover:border-[#D61C7C]/60 hover:bg-[#FFF5F8]/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-[#FFF0F5] shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#751437] uppercase">
                        {product.brand}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-[#D61C7C] transition-colors truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-stone-900">
                          ₹{product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-[11px] text-stone-400 line-through">
                            ₹{product.oldPrice}
                          </span>
                        )}
                        <span className="text-[10px] text-[#D61C7C] font-semibold bg-[#FFF0F5] px-1.5 py-0.2 rounded-md">
                          ★ {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="p-2.5 rounded-xl bg-[#FFF0F5] hover:bg-[#D61C7C] text-[#D61C7C] hover:text-white transition-colors shrink-0 ml-2"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
