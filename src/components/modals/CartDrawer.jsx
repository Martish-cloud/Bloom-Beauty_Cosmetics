import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ onCheckout }) {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    totalItems,
    subtotal,
    productSavings,
    shippingFee,
    isFreeShipping,
    freeShippingProgress,
    amountNeededForFreeShipping,
    appliedPromo,
    promoError,
    promoDiscount,
    applyPromo,
    removePromo,
    finalTotal
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromo(inputCode)) {
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b border-[#FCE4F0] flex items-center justify-between bg-[#FFF0F5]/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D61C7C] flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#751437]">
                Shopping Bag
              </h3>
              <p className="text-xs text-stone-500">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Calculator Bar */}
        <div className="p-3.5 bg-[#FFF5F8] border-b border-[#F8BBD0]/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-stone-700">
              <Truck className="w-3.5 h-3.5 text-[#D61C7C]" />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-semibold">
                  🎉 You unlocked FREE standard shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#D61C7C]">₹{amountNeededForFreeShipping}</strong> more for FREE Shipping!
                </span>
              )}
            </span>
            <span className="text-[11px] font-bold text-stone-500">
              {freeShippingProgress}%
            </span>
          </div>
          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#E0268F] to-[#D61C7C] h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center text-[#D61C7C]">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-800">Your bag is empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Discover our clean skincare, makeup & fragrance bestsellers to begin your glow.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#D61C7C] hover:bg-[#BF156C] text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-md transition-all"
              >
                Explore Bestsellers
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#FCE4F0] shadow-2xs hover:border-[#F8BBD0] transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FFF0F5] shrink-0 border border-stone-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#751437] uppercase tracking-wider block">
                    {item.product.brand}
                  </span>
                  <h4 className="text-xs font-semibold text-stone-800 truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-[#4A0E22]">
                      ₹{item.product.price}
                    </span>
                    {item.product.oldPrice && (
                      <span className="text-[11px] text-stone-400 line-through">
                        ₹{item.product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 text-stone-600 hover:text-stone-900"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-semibold text-stone-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 text-stone-600 hover:text-stone-900"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors mt-0.5"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary (only if cart has items) */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#FFFDFE] border-t border-[#FCE4F0] space-y-3">
            
            {/* Coupon Code Section */}
            {appliedPromo ? (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                <span className="flex items-center gap-1.5 font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  Code <strong>{appliedPromo.code}</strong> applied (-₹{promoDiscount})
                </span>
                <button
                  onClick={removePromo}
                  className="text-stone-400 hover:text-rose-600 p-0.5"
                  aria-label="Remove coupon"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter coupon (e.g. BLOOM10)"
                    className="flex-1 bg-[#FFF0F5]/60 border border-[#F8BBD0] focus:border-[#D61C7C] text-xs uppercase text-stone-800 rounded-xl px-3 py-2 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-stone-900 hover:bg-[#D61C7C] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[10px] text-rose-600">{promoError}</p>
                )}
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">₹{subtotal}</span>
              </div>

              {productSavings > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Product Savings</span>
                  <span>-₹{productSavings}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-[#D61C7C]">
                  <span>Coupon Discount</span>
                  <span>-₹{promoDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-[#4A0E22] text-base">₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onCheckout();
              }}
              className="w-full bg-[#D61C7C] hover:bg-[#BF156C] text-white text-sm font-semibold py-3.5 rounded-2xl shadow-lg shadow-[#D61C7C]/25 hover:shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
