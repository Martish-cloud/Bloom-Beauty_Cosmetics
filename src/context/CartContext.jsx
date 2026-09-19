import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'bloom_beauty_cart_v1';
const FREE_SHIPPING_THRESHOLD = 499;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return false;
    
    if (cleanCode === 'BLOOM10') {
      setAppliedPromo({ code: 'BLOOM10', discountPercent: 10, name: '10% Off Special' });
      setPromoError('');
      return true;
    } else if (cleanCode === 'GLOW50') {
      setAppliedPromo({ code: 'GLOW50', flatDiscount: 50, name: 'Flat ₹50 Off' });
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid coupon code. Try BLOOM10 or GLOW50');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const rawOldPriceTotal = cartItems.reduce(
    (sum, item) => sum + (item.product.oldPrice || item.product.price) * item.quantity,
    0
  );

  const productSavings = Math.max(0, rawOldPriceTotal - subtotal);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartItems.length === 0 || isFreeShipping ? 0 : 50;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      promoDiscount = Math.round((subtotal * appliedPromo.discountPercent) / 100);
    } else if (appliedPromo.flatDiscount) {
      promoDiscount = Math.min(subtotal, appliedPromo.flatDiscount);
    }
  }

  const finalTotal = Math.max(0, subtotal + shippingFee - promoDiscount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
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
        finalTotal,
        FREE_SHIPPING_THRESHOLD
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
