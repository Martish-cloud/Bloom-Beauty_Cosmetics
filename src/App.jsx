import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

// Layout & Sections
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import MobileMenu from './components/layout/MobileMenu';
import HeroSection from './components/hero/HeroSection';
import CategoryNav from './components/categories/CategoryNav';
import BestsellersSection from './components/bestsellers/BestsellersSection';
import PromoBanners from './components/promo/PromoBanners';
import TrustSection from './components/trust/TrustSection';
import Footer from './components/layout/Footer';

// Modals
import ProductDetailModal from './components/modals/ProductDetailModal';
import CartDrawer from './components/modals/CartDrawer';
import WishlistDrawer from './components/modals/WishlistDrawer';
import SearchModal from './components/modals/SearchModal';
import CheckoutModal from './components/modals/CheckoutModal';

// Data
import { PRODUCTS } from './data/products';

function Storefront() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleOpenSearch = (initial = '') => {
    setSearchInitialQuery(initial);
    setIsSearchOpen(true);
  };

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleShopNow = () => {
    const el = document.getElementById('bestsellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShopSkincare = () => {
    setActiveCategory('skincare');
    const el = document.getElementById('bestsellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFE]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Sticky Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={handleOpenSearch}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={handleOpenSearch}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onShopNowClick={handleShopNow} />

        {/* 10 Circular Category Items */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Bestsellers Row + Skincare That Cares Banner */}
        <BestsellersSection
          products={PRODUCTS}
          activeCategory={activeCategory}
          onQuickView={handleQuickView}
          onViewAll={() => setActiveCategory('all')}
          onShopSkincare={handleShopSkincare}
        />

        {/* 3 Promotional Category Banners: Makeup, Haircare, Fragrances */}
        <PromoBanners onSelectCategory={handleSelectCategory} />

        {/* 5-item Trust & USP Section */}
        <TrustSection />
      </main>

      {/* Rich Footer with Newsletter, Links, and Handwritten Accent */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Interactive Modals and Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />

      <WishlistDrawer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        initialQuery={searchInitialQuery}
        onSelectProduct={handleQuickView}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <Storefront />
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
