import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import RatingStars from '../common/RatingStars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    addToast({
      title: 'Added to Cart',
      message: `${product.brand} ${product.name} is now in your shopping bag.`,
      type: 'cart'
    });
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    addToast({
      title: isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
      message: `${product.brand} ${product.name} ${isFavorited ? 'removed' : 'added to your favorites'}.`,
      type: 'wishlist'
    });
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-2xl border border-[#F8BBD0]/60 hover:border-[#D61C7C]/60 p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-soft-hover hover:-translate-y-1 cursor-pointer relative h-full"
    >
      <div>
        {/* Top Product Image Container (Consistent 1:1 Aspect Ratio with Subtle Padding) */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#FFF5F8] mb-2.5 p-2.5 flex items-center justify-center">
          
          {/* Wishlist toggle heart button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs shadow-xs flex items-center justify-center text-stone-400 hover:text-[#D61C7C] hover:scale-110 transition-all"
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorited ? 'text-[#D61C7C] fill-[#D61C7C]' : ''
              }`}
            />
          </button>

          {/* Discount badge */}
          {product.discount && (
            <span className="absolute top-2 left-2 z-10 bg-[#FFF0F5] border border-[#F8BBD0] text-[#D61C7C] text-[9.5px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
              {product.discount}
            </span>
          )}

          {/* Product Image - object-contain so bottles, tubes, labels are 100% visible */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Quick View hover overlay on desktop */}
          <div className="absolute inset-0 bg-stone-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Eye className="w-3 h-3 text-[#D61C7C]" />
              Quick View
            </span>
          </div>
        </div>

        {/* Brand */}
        <span className="text-[10px] font-bold tracking-wider text-[#8E1843] uppercase block mb-1">
          {product.brand}
        </span>

        {/* Product Name (Fixed 2 lines max with uniform line-height) */}
        <h3 className="text-xs font-medium text-stone-800 line-clamp-2 leading-snug group-hover:text-[#D61C7C] transition-colors mb-1.5 min-h-[32px]">
          {product.name}
        </h3>

        {/* Price & Original Price */}
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-sm font-bold text-stone-900">
            ₹{product.price}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-stone-400 line-through font-normal">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="mb-2.5">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>
      </div>

      {/* Add to Cart button (sits directly below the content with NO blank space) */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer ${
          isAdded
            ? 'bg-emerald-600 text-white'
            : 'bg-[#D61C7C] hover:bg-[#BF156C] text-white hover:shadow-sm'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Added!</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
}
