"use client";
import { useState, useEffect } from 'react';
import { useCartStore, Product } from '@/lib/store';
import { urlFor } from '@/lib/sanity.image';
import Image from 'next/image';

export default function CheckoutForm() {
  // Casting to 'any' to bypass strict Type mismatches between CartItem and Product
  const { cart, getTotalPrice, clearCart } = useCartStore() as any;
  
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    address: '', 
    city: '', 
    postal: '', 
    phone: ''
  });

  // Ensure the component only renders on the client
  useEffect(() => setIsClient(true), []);

  const subtotal = getTotalPrice();
  const vat = subtotal * 0.20; 
  const total = subtotal + vat;

  const handlePaystack = async () => {
    if (!formData.email) {
      alert("Please enter your email address first.");
      return;
    }

    try {
      // DYNAMIC IMPORT: Fixes the 'window is not defined' error
      const PaystackPop = (await import('@paystack/inline-js')).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '', 
        email: formData.email,
        amount: Math.round(total * 100), 
        currency: "NGN",
        onSuccess: async (transaction: any) => {
          try {
            // 1. SAVE TO SANITY
            const response = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customerDetails: formData,
                cartItems: cart,
                totalAmount: total,
                reference: transaction.reference
              })
            });

            if (response.ok) {
              // 2. TRIGGER TRANSACTIONAL EMAIL
              await fetch('/api/send-confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: formData.email,
                  firstName: formData.firstName,
                  total: total,
                  items: cart
                })
              });

              // 3. CLEAR CART & REDIRECT
              clearCart();
              window.location.href = "/success";
            } else {
              console.error("Order recording failed");
              alert("Payment successful, but order recording failed. Reference: " + transaction.reference);
            }
          } catch (error) {
            console.error("Critical Error:", error);
            window.location.href = "/success"; 
          }
        },
        onCancel: () => alert("Transaction Cancelled"),
      });
    } catch (err) {
      console.error("Failed to load Paystack:", err);
      alert("There was an error initializing the payment system.");
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-16 w-full">
      {/* Form Fields */}
      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-black">First Name</label>
            <input 
              type="text" 
              placeholder="e.g. Elizabeth" 
              className="w-full border border-gray-300 p-4 outline-none focus:border-black transition-all text-black" 
              onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-black">Last Name</label>
            <input 
              type="text" 
              placeholder="e.g. Windsor" 
              className="w-full border border-gray-300 p-4 outline-none focus:border-black transition-all text-black" 
              onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-black">Email Address</label>
          <input 
            type="email" 
            placeholder="email@example.com" 
            className="w-full border border-gray-300 p-4 outline-none focus:border-black transition-all text-black" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-black">Address</label>
          <input 
            type="text" 
            placeholder="123 Diamond Avenue" 
            className="w-full border border-gray-300 p-4 outline-none focus:border-black transition-all text-black" 
            onChange={(e) => setFormData({...formData, address: e.target.value})} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-black">City</label>
            <input 
              type="text" 
              placeholder="London" 
              className="w-full border border-gray-300 p-4 outline-none focus:border-black transition-all text-black" 
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-black">Postal Code</label>
            <input 
              type="text" 
              placeholder="SW1A 1AA" 
              className="w-full border border-gray-300 p-4 outline-none focus:border-black transition-all text-black" 
              onChange={(e) => setFormData({...formData, postal: e.target.value})}
            />
          </div>
        </div>

        <div className="p-6 border-2 border-blue-600 bg-blue-50/30 flex justify-between items-center rounded-md">
           <div className="flex gap-4 items-center">
              <div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-black">Insured White-Glove Delivery</p>
                <p className="text-[10px] text-gray-500">2-3 Business Days • Complimentary</p>
              </div>
           </div>
           <span className="text-blue-600 text-xl">🚚</span>
        </div>
      </div>

      {/* Sidebar Summary */}
      <aside className="w-full lg:w-450px">
        <div className="border border-gray-100 p-8 sticky top-32 bg-white">
          <h3 className="font-playfair text-xl mb-6 text-black">Order Summary</h3>
          <div className="space-y-4 mb-8">
            {cart.map((item: Product) => (
              <div key={item._id} className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-50 relative">
                  {item.image && (
                    <Image 
                      src={urlFor(item.image).url()} 
                      alt={item.name} 
                      fill 
                      className="object-contain p-2" 
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-tight text-black">{item.name}</p>
                  <p className="text-[10px] text-gray-400">{item.quantity} × ${item.price.toLocaleString()}</p>
                </div>
                <p className="text-xs font-bold text-black">${(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4 text-[10px]">
            <div className="flex justify-between text-gray-500 uppercase"><span>Subtotal</span> <span>${subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-500 uppercase"><span>VAT (20%)</span> <span>${vat.toLocaleString()}</span></div>
            <div className="flex justify-between border-t border-black pt-4 text-lg font-bold text-black font-playfair uppercase">
                <span>Total</span> <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={handlePaystack}
            className="w-full bg-blue-600 text-white py-5 mt-8 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-blue-700 transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-200"
          >
            Proceed to Payment <span className="text-lg">→</span>
          </button>
          
          <p className="text-[9px] text-center text-gray-400 mt-4 flex items-center justify-center gap-1 uppercase tracking-widest">
            <span className="text-sm">🔒</span> 100% Secure & Encrypted Transaction
          </p>
        </div>
      </aside>
    </div>
  );
}