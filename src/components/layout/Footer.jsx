import React, { useState } from 'react';
import { 
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

// Clean brand SVG icons
const InstagramIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" fill="currentColor" />
  </svg>
);

export default function Footer({ onSelectCategory, onGoToShop }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setIsSubscribed(true);
    addToast({
      title: 'Subscribed to Newsletter!',
      message: 'Welcome to the Bloom Beauty family. Enjoy 10% off with code BLOOM10 on your next order.',
      type: 'success'
    });
  };

  const handleCategoryNav = (catId, e) => {
    e.preventDefault();
    if (onGoToShop) {
      onGoToShop(catId);
    } else if (onSelectCategory) {
      onSelectCategory(catId);
      const el = document.getElementById('bestsellers-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="newsletter-section" className="bg-[#FFFDFE] border-t border-[#FCE4F0] pt-14 pb-8 text-stone-700 relative overflow-hidden w-full">
      <div className="bloom-container relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-[#FCE4F0]">
          
          {/* Col 1: Logo & Brand statement (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <a href="#" className="inline-block">
              <img
                src="/bloom-logo-transparent.png"
                alt="Bloom Beauty - Beauty Lives Here"
                className="h-10 w-auto object-contain"
              />
            </a>

            <p className="text-xs text-stone-500 leading-relaxed pr-2">
              Bloom Beauty curates the purest, dermatologist-tested cosmetics and skincare products crafted to let your natural radiance shine through effortlessly.
            </p>

            <div className="text-[11px] font-semibold text-[#8E1843]">
              100% Certified Original • Made with Love in India
            </div>
          </div>

          {/* Col 2: SHOP (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold tracking-wider text-[#751437] uppercase">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#skincare" 
                  onClick={(e) => handleCategoryNav('skincare', e)}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Skincare
                </a>
              </li>
              <li>
                <a 
                  href="#makeup" 
                  onClick={(e) => handleCategoryNav('makeup', e)}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Makeup
                </a>
              </li>
              <li>
                <a 
                  href="#haircare" 
                  onClick={(e) => handleCategoryNav('haircare', e)}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Haircare
                </a>
              </li>
              <li>
                <a 
                  href="#fragrances" 
                  onClick={(e) => handleCategoryNav('fragrances', e)}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Fragrances
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: HELP (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold tracking-wider text-[#751437] uppercase">
              HELP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#track" 
                  onClick={(e) => { e.preventDefault(); alert("Tracking: Enter your Order ID on the tracking portal or email support@bloombeauty.in"); }}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a 
                  href="#returns" 
                  onClick={(e) => { e.preventDefault(); alert("Returns Policy: 7-day hassle-free returns on all non-opened cosmetic items."); }}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a 
                  href="#shipping" 
                  onClick={(e) => { e.preventDefault(); alert("Shipping Policy: Free standard shipping on orders above ₹499 across all pin codes in India."); }}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a 
                  href="#faqs" 
                  onClick={(e) => { e.preventDefault(); alert("FAQs: 100% genuine products directly sourced from verified brands."); }}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: ABOUT (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold tracking-wider text-[#751437] uppercase">
              ABOUT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#story" 
                  onClick={(e) => { e.preventDefault(); alert("Bloom Beauty was founded to champion clean, inclusive, science-backed beauty."); }}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a 
                  href="#sustainability" 
                  onClick={(e) => { e.preventDefault(); alert("Sustainability: 100% recyclable shipping boxes, zero cruelty, ethically sourced ingredients."); }}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a 
                  href="#careers" 
                  onClick={(e) => { e.preventDefault(); alert("Careers: We are hiring beauty editors, digital storytellers, and logistics coordinators."); }}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); alert("Contact us anytime at hello@bloombeauty.in or call +91 1800-BLOOM."); }}
                  className="hover:text-[#D61C7C] transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter & Handwritten Script (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold tracking-wider text-[#751437] uppercase mb-1">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-xs text-stone-500 mb-3">
                Get exclusive offers, beauty tips & new arrivals.
              </p>

              {isSubscribed ? (
                <div className="p-2.5 rounded-xl bg-[#FFF0F5] border border-[#F8BBD0] flex items-center gap-2 text-xs text-[#751437] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D61C7C] shrink-0" />
                  <span>Code BLOOM10 saved to your cart!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 bg-[#FFF0F5]/80 border border-[#F8BBD0] focus:border-[#D61C7C] focus:bg-white text-xs text-stone-800 placeholder-stone-400 rounded-xl px-3 py-2 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-[#D61C7C] hover:bg-[#BF156C] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-[10.5px] text-rose-600 font-medium">{emailError}</p>
                  )}
                </form>
              )}

              {/* Follow Us social links */}
              <div className="mt-4">
                <span className="text-[10.5px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                  Follow Us
                </span>
                <div className="flex items-center gap-2">
                  <a href="#instagram" aria-label="Instagram" className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center text-[#751437] hover:text-[#D61C7C] hover:bg-white transition-colors">
                    <InstagramIcon />
                  </a>
                  <a href="#facebook" aria-label="Facebook" className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center text-[#751437] hover:text-[#D61C7C] hover:bg-white transition-colors">
                    <FacebookIcon />
                  </a>
                  <a href="#youtube" aria-label="YouTube" className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center text-[#751437] hover:text-[#D61C7C] hover:bg-white transition-colors">
                    <YoutubeIcon />
                  </a>
                  <a href="#pinterest" aria-label="Pinterest" className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center text-[#751437] hover:text-[#D61C7C] hover:bg-white transition-colors">
                    <span className="font-bold text-xs">P</span>
                  </a>
                  <a href="#tiktok" aria-label="TikTok" className="w-7 h-7 rounded-full bg-[#FFF0F5] border border-[#F8BBD0] flex items-center justify-center text-[#751437] hover:text-[#D61C7C] hover:bg-white transition-colors">
                    <span className="font-bold text-xs">♪</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Handwritten decorative text: "Beauty Blooms Within ♡" */}
            <div className="mt-5 text-right">
              <div className="font-script text-2xl sm:text-3xl text-[#751437] leading-tight select-none">
                Beauty<br />
                <span className="text-[#D61C7C]">Blooms Within</span>
                <span className="text-lg text-[#D61C7C] ml-1">♡</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © 2024 Bloom Beauty. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions: Standard terms apply."); }} className="hover:text-[#D61C7C] transition-colors">
              Terms & Conditions
            </a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: Your data is secure."); }} className="hover:text-[#D61C7C] transition-colors">
              Privacy Policy
            </a>
            <a href="#sitemap" onClick={(e) => { e.preventDefault(); alert("Sitemap: Browse full product catalog."); }} className="hover:text-[#D61C7C] transition-colors">
              Sitemap
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
