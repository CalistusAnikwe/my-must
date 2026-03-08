// app/checkout/page.tsx
import CheckoutForm from '@/components/CheckoutForm';
import { ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-1440px mx-auto px-6">
        {/* Header Progress Stepper */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <div className="flex flex-col items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600">Shipping</span>
          </div>
          <div className="w-24 h-1px bg-gray-200" />
          <div className="flex flex-col items-center gap-2 opacity-30">
            <span className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center font-bold">2</span>
            <span className="text-[10px] uppercase tracking-widest font-bold">Payment</span>
          </div>
          <div className="w-24 h-1px bg-gray-200" />
          <div className="flex flex-col items-center gap-2 opacity-30">
            <span className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center font-bold">3</span>
            <span className="text-[10px] uppercase tracking-widest font-bold">Review</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1">
            <h2 className="font-playfair text-3xl mb-8">Shipping Details</h2>
            <CheckoutForm />
          </div>

          {/* Sidebar Summary Placeholder (Handled inside CheckoutForm for state) */}
        </div>
      </div>
    </main>
  );
}