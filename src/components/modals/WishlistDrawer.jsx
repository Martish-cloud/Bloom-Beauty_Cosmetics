import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function WishlistDrawer() {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    addToast({
      title: 'Moved to Cart',
      message: `${product.brand} ${product.name} transferred to your shopping bag.`,
      type: 'cart'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b border-[#FCE4F0] flex items-center justify-between bg-[#FFF0F5]/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center text-[#D61C7C]">
              <Heart className="w-4 h-4 fill-[#D61C7C]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#751437]">
                Saved Wishlist
              </h3>
              <p className="text-xs text-stone-500">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'saved product' : 'saved products'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center text-[#D61C7C]">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-800">Your wishlist is empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Save items you love by tapping the heart icon on any product card!
                </p>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="bg-[#D61C7C] hover:bg-[#BF156C] text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-md transition-all"
              >
                Browse Products
              </button>
            </div>
          ) : (
            wishlistItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#FCE4F0] shadow-2xs hover:border-[#F8BBD0] transition-colors"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FFF5F8] shrink-0 border border-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#751437] uppercase tracking-wider block">
                    {product.brand}
                  </span>
                  <h4 className="text-xs font-semibold text-stone-800 truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-[#4A0E22]">
                      ₹{product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[11px] text-stone-400 line-through">
                        ₹{product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-white bg-[#D61C7C] hover:bg-[#BF156C] px-3 py-1.5 rounded-lg shadow-xs transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Move to Cart</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="p-4 bg-[#FFFDFE] border-t border-[#FCE4F0] flex items-center justify-between">
            <button
              onClick={clearWishlist}
              className="text-xs text-stone-500 hover:text-rose-600 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
            <button
              onClick={() => {
                wishlistItems.forEach(item => addToCart(item, 1));
                clearWishlist();
                addToast({
                  title: 'All Items Added to Cart',
                  message: 'Your wishlist items are now in your shopping bag!',
                  type: 'cart'
                });
              }}
              className="bg-stone-900 hover:bg-[#D61C7C] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Add All to Cart
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
