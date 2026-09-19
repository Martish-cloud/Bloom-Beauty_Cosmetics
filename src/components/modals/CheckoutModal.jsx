import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Smartphone, 
  Banknote, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, finalTotal, subtotal, shippingFee, promoDiscount, clearCart } = useCart();

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: 'Ananya Sharma',
    phone: '9876543210',
    address: 'Flat 402, Lotus Bloom Apartments, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    paymentMethod: 'upi'
  });

  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedId = 'BB-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setStep('success');
    clearCart();
  };

  const handleCloseAndReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleCloseAndReset}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl z-10 border border-[#FCE4F0] overflow-hidden animate-fade-in max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={handleCloseAndReset}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-left">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D61C7C] text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#4A0E22]">
                  Express Checkout
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Enter delivery details to complete your Bloom Beauty order.
              </p>
            </div>

            {/* Address fields */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Shipping Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#D61C7C] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#D61C7C] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Street Address & Flat / Building
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#D61C7C] outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#D61C7C] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#D61C7C] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#D61C7C] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Select Payment Method
              </h4>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <label className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-[#D61C7C] bg-[#FFF0F5] text-[#D61C7C]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className="hidden"
                  />
                  <Smartphone className="w-5 h-5 mb-1" />
                  <span className="text-xs font-semibold">UPI / GPay</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#D61C7C] bg-[#FFF0F5] text-[#D61C7C]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="hidden"
                  />
                  <CreditCard className="w-5 h-5 mb-1" />
                  <span className="text-xs font-semibold">Cards / Net</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#D61C7C] bg-[#FFF0F5] text-[#D61C7C]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="hidden"
                  />
                  <Banknote className="w-5 h-5 mb-1" />
                  <span className="text-xs font-semibold">Cash On Delivery</span>
                </label>
              </div>
            </div>

            {/* Total summary snippet */}
            <div className="p-4 rounded-2xl bg-[#FFF5F8] border border-[#F8BBD0] flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500">Total Payable Amount</p>
                <p className="text-xl font-bold text-[#4A0E22]">₹{finalTotal}</p>
              </div>
              <div className="text-right text-[11px] text-emerald-700 font-semibold">
                <span>Free Delivery Applied ✓</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#D61C7C] hover:bg-[#BF156C] text-white text-sm font-semibold py-3.5 rounded-2xl shadow-lg shadow-[#D61C7C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Place Order (₹{finalTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Order Confirmed Screen */
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#FFF0F5] border-2 border-[#F8BBD0] mx-auto flex items-center justify-center text-[#D61C7C] shadow-lg animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#D61C7C] tracking-widest uppercase bg-[#FFF0F5] px-3 py-1 rounded-full">
                Order Placed Successfully!
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#4A0E22] mt-3">
                Thank You, {formData.name.split(' ')[0]}!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Order Reference: <strong className="text-stone-800 font-mono">{orderId}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs text-stone-600 space-y-1.5">
              <p><strong>Deliver To:</strong> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
              <p><strong>Contact:</strong> +91 {formData.phone}</p>
              <p><strong>Payment Method:</strong> {formData.paymentMethod.toUpperCase()}</p>
              <p className="text-emerald-700 font-semibold pt-1">
                Estimated Delivery: In 2 to 3 Business Days with tracking SMS.
              </p>
            </div>

            <button
              onClick={handleCloseAndReset}
              className="w-full bg-[#D61C7C] hover:bg-[#BF156C] text-white text-sm font-semibold py-3.5 rounded-2xl shadow-md transition-all"
            >
              Continue Exploring Bloom Beauty
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
