import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define what a Product looks like
export interface Product {
  _id: string;
  name: string;
  price: number;
  image: any;
  category?: string;
  metal?: string;
  stoneShape?: string;
  quantity: number; 
}

// 2. Updated Interface to include clearCart
interface CartState {
  cart: Product[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void; // Added for post-purchase cleanup
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item._id === product._id);

        if (existingItem) {
          // If product exists, increase quantity
          set({
            cart: currentCart.map((item) =>
              item._id === product._id 
                ? { ...item, quantity: (item.quantity || 0) + 1 } 
                : item
            ),
          });
        } else {
          // If new product, add with quantity 1
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => 
        set({ cart: get().cart.filter((item) => item._id !== productId) }),

      updateQuantity: (productId, quantity) =>
        set({
          cart: get().cart.map((item) =>
            item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }),

      getTotalPrice: () => {
        return get().cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
      },

      // 3. The added clearCart action
      clearCart: () => set({ cart: [] }),
    }),
    { 
      name: 'shopping-bag-storage', 
    }
  )
);