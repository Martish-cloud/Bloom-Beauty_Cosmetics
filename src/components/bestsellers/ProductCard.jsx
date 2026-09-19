import React from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import RatingStars from '../common/RatingStars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const [isAdded, setIsAdded] = React.useState(false);

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
    setTimeout(() => setIsAdded(false), 1800);
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
      className="group bg-white rounded-2xl border border-[#F8BBD0]/50 hover:border-[#D61C7C]/60 p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-soft-hover hover:-translate-y-1 cursor-pointer relative"
    >
      {/* Top Image area */}
      <div className="relative w-full aspect-[4/4.5] rounded-xl overflow-hidden bg-[#FFF5F8] mb-3 flex items-center justify-center">
        
        {/* Wishlist toggle button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-stone-400 hover:text-[#D61C7C] hover:scale-110 transition-all"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'text-[#D61C7C] fill-[#D61C7C]' : ''
            }`}
          />
        </button>

        {/* Discount badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 z-10 bg-[#FFF0F5] border border-[#F8BBD0] text-[#D61C7C] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            {product.discount}
          </span>
        )}

        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View hover overlay on desktop */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#D61C7C]" />
            Quick View
          </span>
        </div>
      </div>

      {/* Info content */}
      <div className="flex flex-col flex-1">
        {/* Brand */}
        <span className="text-[11px] font-bold tracking-wider text-[#751437] uppercase mb-0.5">
          {product.brand}
        </span>

        {/* Product Name */}
        <h3 className="text-xs sm:text-[13px] font-medium text-stone-800 line-clamp-2 leading-snug group-hover:text-[#D61C7C] transition-colors mb-1.5 h-8">
          {product.name}
        </h3>

        {/* Price & Old Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm sm:text-base font-bold text-stone-900">
            ₹{product.price}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-stone-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="mb-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-3 rounded-xl text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#D61C7C] hover:bg-[#BF156C] text-white hover:shadow-md hover:shadow-[#D61C7C]/25'
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
    </div>
  );
}
