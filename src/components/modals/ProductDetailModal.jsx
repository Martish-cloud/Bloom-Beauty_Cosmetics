import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';
import RatingStars from '../common/RatingStars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    addToast({
      title: 'Added to Cart',
      message: `${quantity}x ${product.brand} ${product.name} added to your bag.`,
      type: 'cart'
    });
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast({
      title: isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
      message: `${product.brand} ${product.name} ${isFavorited ? 'removed' : 'added to favorites'}.`,
      type: 'wishlist'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 border border-[#FCE4F0] animate-fade-in max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image */}
        <div className="md:w-1/2 bg-[#FFF5F8] p-6 sm:p-8 flex items-center justify-center relative">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md bg-white border border-[#F8BBD0]/60">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discount && (
              <span className="absolute top-3 left-3 bg-[#D61C7C] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                {product.discount}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between text-left">
          <div>
            
            {/* Brand & Category */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold tracking-wider text-[#751437] uppercase">
                {product.brand}
              </span>
              <span className="text-[11px] font-semibold text-[#D61C7C] bg-[#FFF0F5] px-2 py-0.5 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-2">
              {product.name}
            </h2>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
              {product.size && (
                <span className="text-xs text-stone-400 border-l border-stone-200 pl-3">
                  {product.size}
                </span>
              )}
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-4 p-3 rounded-2xl bg-[#FFF0F5]/50 border border-[#F8BBD0]/40">
              <span className="text-2xl font-bold text-[#4A0E22]">
                ₹{product.price}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ₹{product.oldPrice}
                </span>
              )}
              {product.discount && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Save ₹{product.oldPrice - product.price}
                </span>
              )}
            </div>

            {/* Tabs for Description, Benefits, Ingredients */}
            <div className="flex border-b border-[#FCE4F0] mb-3 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2 mr-4 transition-colors ${
                  activeTab === 'description'
                    ? 'text-[#D61C7C] border-b-2 border-[#D61C7C]'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 mr-4 transition-colors ${
                  activeTab === 'benefits'
                    ? 'text-[#D61C7C] border-b-2 border-[#D61C7C]'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Key Benefits
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2 transition-colors ${
                  activeTab === 'ingredients'
                    ? 'text-[#D61C7C] border-b-2 border-[#D61C7C]'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Ingredients
              </button>
            </div>

            {/* Tab content */}
            <div className="text-xs text-stone-600 mb-6 min-h-[70px] leading-relaxed">
              {activeTab === 'description' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'benefits' && (
                <ul className="space-y-1.5">
                  {product.benefits?.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D61C7C] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'ingredients' && (
                <p className="italic text-stone-500">{product.ingredients}</p>
              )}
            </div>

          </div>

          {/* Action Row: Quantity & Add to Cart & Wishlist */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-center gap-3">
              
              {/* Quantity Selector */}
              <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D61C7C] hover:bg-[#BF156C] text-white hover:shadow-lg shadow-[#D61C7C]/25'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (₹{product.price * quantity})</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors ${
                  isFavorited
                    ? 'border-[#D61C7C] bg-[#FFF0F5] text-[#D61C7C]'
                    : 'border-stone-200 text-stone-400 hover:text-[#D61C7C] hover:border-[#D61C7C]'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#D61C7C]' : ''}`} />
              </button>

            </div>

            {/* Quick trust strip */}
            <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D61C7C]" /> 100% Genuine
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#D61C7C]" /> Free Shipping &gt; ₹499
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-[#D61C7C]" /> 7-Day Easy Return
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
