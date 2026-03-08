// "use client";

// import { useCartStore } from '@/lib/store';

// export default function AddToCartDetails({ product }: { product: any }) {
//   const addToCart = useCartStore((state) => state.addToCart);

//   const handleAddToCart = () => {
//     // This connects the description data to the Zustand store
//     addToCart(product);
//     // Visual feedback for the user
//     alert(`${product.name} has been added to your bag.`);
//   };

//   return (
//     <button 
//       onClick={handleAddToCart}
//       className="w-full bg-black text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-zinc-900 transition-colors"
//     >
//       Add to Bag
//     </button>
//   );
// }

















"use client";

import { useCartStore } from '@/lib/store';
import Link from 'next/link'; // Added for navigation

export default function AddToCartDetails({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    // When clicked, it moves the count from 0 to 1 (or increments if already there)
    addToCart(product);
    
    // Luxury visual feedback
    alert(`${product.name} has been added to your bag.`);
  };

  return (
    <div className="flex flex-col gap-3">
      <button 
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-zinc-900 transition-colors"
      >
        Add to Bag
      </button>

      {/* Pure crisp blue button to take users to the cart page */}
      <Link 
        href="/cart"
        className="w-full bg-blue-600 text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-blue-700 transition-colors text-center"
      >
        View Bag & Checkout
      </Link>
    </div>
  );
}