"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { CheckCircle2, Truck, Star } from 'lucide-react';

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);

  // Clear the cart once the user lands here, so they don't see old items in the bag
  useEffect(() => {
    // We clear the entire cart by iterating or using a clear method if you added one
    cart.forEach(item => clearCart(item._id));
  }, [clearCart, cart]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center pt-20 px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle2 size={80} className="text-blue-600 animate-in zoom-in duration-500" />
            <div className="absolute inset-0 bg-blue-100 rounded-full scale-150 -z-10 opacity-20 animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-luxury text-4xl text-black lowercase">Thank you for your trust</h1>
          <h2 className="font-playfair text-3xl md:text-5xl uppercase tracking-tight text-black">
            Order Confirmed
          </h2>
          <p className="font-serif text-zinc-500 max-w-md mx-auto leading-relaxed">
            Your payment was successful. Our master craftsmen are now preparing your selection for its journey to you.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
          <div className="border border-zinc-100 p-6 flex flex-col items-center gap-3">
            <Truck size={24} className="text-black" />
            <p className="text-[10px] uppercase tracking-widest font-bold">Insured Shipping</p>
            <p className="text-xs text-zinc-400">Your tracking number will be sent via email within 24 hours.</p>
          </div>
          <div className="border border-zinc-100 p-6 flex flex-col items-center gap-3">
            <Star size={24} className="text-black" />
            <p className="text-[10px] uppercase tracking-widest font-bold">Authenticity Guaranteed</p>
            <p className="text-xs text-zinc-400">Every piece comes with a GIA certificate and lifetime warranty.</p>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/products" 
            className="bg-black text-white px-10 py-4 uppercase text-[10px] tracking-widest font-bold hover:bg-zinc-800 transition-all"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="border border-black text-black px-10 py-4 uppercase text-[10px] tracking-widest font-bold hover:bg-zinc-50 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}