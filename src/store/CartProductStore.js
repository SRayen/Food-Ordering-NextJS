// cartProducts.store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartProductsStore = create(
  persist(
    (set, get) => ({
      cartProducts: [],
      addToCart: (product, selectedSize, selectedExtras) =>
        set((state) => ({
          cartProducts: [
            ...state.cartProducts,
            { ...product, size: selectedSize, extras: selectedExtras },
          ],
        })),
      clearCart: () => set({ cartProducts: [] }),
      deletedFromCart: (productId) =>
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (product) => product.id !== productId
          ),
        })),
    }),

    {
      name: "cartProduct-storage",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
