// "use client";
// import { useState, useEffect } from 'react'; // Added for hydration safety
// import Image from 'next/image';
// import Link from 'next/link';
// import { useCartStore } from '@/lib/store';
// import { urlFor } from '@/lib/sanity.image';

// // 1. Define the Interface to solve the "item" red underline problem
// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: any;
//   metal?: string;
// }

// export default function ShoppingBagPage() {
//   const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  
//   // 2. Hydration fix: ensures the cart matches the client's local storage
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const subtotal = getTotalPrice();
//   const tax = subtotal * 0.08; // Example 8% tax
//   const total = subtotal + tax;

//   if (!isClient) return null; // Prevents layout flicker

//   return (
//     /* Changed max-w-1440px to max-w-[1440px] for valid Tailwind syntax */
//     <main className="max-w-1440px mx-auto px-6 py-12 md:py-24">
//       <h1 className="font-playfair text-4xl mb-2">Your Shopping Bag</h1>
//       <p className="text-gray-400 text-sm mb-12">{cart.length} items in your selection</p>

//       <div className="flex flex-col lg:flex-row gap-16">
//         {/* Left: Cart Items */}
//         <div className="flex-1 space-y-12">
//           {cart.length === 0 ? (
//             <div className="py-20 text-center border-t border-gray-100">
//               <p className="font-serif italic text-gray-500">Your bag is empty.</p>
//               <Link href="/products" className="text-black underline text-sm mt-4 block">Continue Shopping</Link>
//             </div>
//           ) : (
//             /* item: CartItem specifically solves the TypeScript error */
//             cart.map((item: CartItem) => (
//               <div key={item._id} className="flex gap-6 pb-12 border-b border-gray-100">
//                 <div className="w-32 h-32 bg-[#F9F9F9] relative overflow-hidden">
//                   <Image src={urlFor(item.image).url()} alt={item.name} fill className="object-contain p-4" />
//                 </div>
                
//                 <div className="flex-1 flex justify-between">
//                   <div className="space-y-1">
//                     <h3 className="font-playfair text-lg">{item.name}</h3>
//                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">SKU: {item._id.slice(0, 8)} • {item.metal}</p>
                    
//                     <div className="flex items-center gap-4 mt-6 border border-gray-200 w-fit px-3 py-1">
//                       <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="text-gray-400 px-1">-</button>
//                       <span className="text-xs w-4 text-center">{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="text-gray-400 px-1">+</button>
//                     </div>
//                   </div>
                  
//                   <div className="text-right flex flex-col justify-between">
//                     <p className="font-bold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
//                     <button 
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-1"
//                     >
//                       <span>×</span> Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//           <div className="pt-4 flex items-center gap-2 text-gray-400 cursor-pointer hover:text-black">
//              <span className="text-lg">🏷</span>
//              <span className="text-[10px] uppercase tracking-widest">Add a promotional code</span>
//           </div>
//         </div>

//         {/* Right: Order Summary Sidebar */}
//         {/* Changed lg:w-400px to lg:w-[400px] for valid Tailwind syntax */}
//         <aside className="w-full lg:w-400px">
//           <div className="bg-[#FBFBFB] p-8 space-y-8">
//             <h2 className="font-playfair text-2xl">Order Summary</h2>
            
//             <div className="space-y-4 text-xs tracking-wide">
//               <div className="flex justify-between">
//                 <span className="text-gray-500 uppercase">Subtotal</span>
//                 <span>${subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500 uppercase">Estimated Shipping</span>
//                 <span className="text-green-600">Complimentary</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500 uppercase">Estimated Tax</span>
//                 <span>${tax.toLocaleString()}</span>
//               </div>
//             </div>

//             <div className="border-t border-gray-200 pt-6 flex justify-between items-baseline">
//               <span className="font-playfair text-xl">Total</span>
//               <span className="text-2xl font-bold">${total.toLocaleString()}</span>
//             </div>

//             <button className="w-full bg-black text-white py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-zinc-900 transition-all">
//               Proceed to Checkout
//             </button>

//             <div className="space-y-4 pt-4 border-t border-gray-100">
//                {[
//                  { icon: "🛡", text: "Secure & Encrypted Checkout" },
//                  { icon: "✈", text: "Free Insured Shipping" },
//                  { icon: "↺", text: "30-Day Easy Returns" }
//                ].map((item, idx) => (
//                  <div key={idx} className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-500">
//                    <span className="text-sm">{item.icon}</span>
//                    {item.text}
//                  </div>
//                ))}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }

















"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { urlFor } from '@/lib/sanity.image';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
  metal?: string;
}

export default function ShoppingBagPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (!isClient) return null;

  return (
    <main className="max-w-1440px mx-auto px-6 py-12 md:py-24">
      <h1 className="font-playfair text-4xl mb-2">Your Shopping Bag</h1>
      <p className="text-gray-400 text-sm mb-12">{cart.length} items in your selection</p>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-12">
          {cart.length === 0 ? (
            <div className="py-20 text-center border-t border-gray-100">
              <p className="font-serif italic text-gray-500">Your bag is empty.</p>
              <Link href="/products" className="text-black underline text-sm mt-4 block">Continue Shopping</Link>
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item._id} className="flex gap-6 pb-12 border-b border-gray-100">
                <div className="w-32 h-32 bg-[#F9F9F9] relative overflow-hidden">
                  <Image src={urlFor(item.image).url()} alt={item.name} fill className="object-contain p-4" />
                </div>
                
                <div className="flex-1 flex justify-between">
                  <div className="space-y-1">
                    <h3 className="font-playfair text-lg">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">SKU: {item._id.slice(0, 8)} • {item.metal}</p>
                    
                    <div className="flex items-center gap-4 mt-6 border border-gray-200 w-fit px-3 py-1">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="text-gray-400 px-1">-</button>
                      <span className="text-xs w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="text-gray-400 px-1">+</button>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col justify-between">
                    <p className="font-bold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                    
                    {/* ENTIRE REMOVE BUTTON LOGIC */}
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-1 group"
                    >
                      <span className="text-lg group-hover:rotate-90 transition-transform duration-300">×</span> 
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="pt-4 flex items-center gap-2 text-gray-400 cursor-pointer hover:text-black">
             <span className="text-lg">🏷</span>
             <span className="text-[10px] uppercase tracking-widest">Add a promotional code</span>
          </div>
        </div>

        <aside className="w-full lg:w-400px">
          <div className="bg-[#FBFBFB] p-8 space-y-8">
            <h2 className="font-playfair text-2xl">Order Summary</h2>
            
            <div className="space-y-4 text-xs tracking-wide">
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">Estimated Shipping</span>
                <span className="text-green-600">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">Estimated Tax</span>
                <span>${tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex justify-between items-baseline">
              <span className="font-playfair text-xl">Total</span>
              <span className="text-2xl font-bold">${total.toLocaleString()}</span>
            </div>

            {/* CONNECTED: This button now leads to the Paystack-enabled Checkout page */}
            <Link 
              href="/checkout" 
              className="w-full bg-black text-white py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-zinc-900 transition-all block text-center"
            >
              Proceed to Checkout
            </Link>

            <div className="space-y-4 pt-4 border-t border-gray-100">
               {[
                 { icon: "🛡", text: "Secure & Encrypted Checkout" },
                 { icon: "✈", text: "Free Insured Shipping" },
                 { icon: "↺", text: "30-Day Easy Returns" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-500">
                   <span className="text-sm">{item.icon}</span>
                   {item.text}
                 </div>
               ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}