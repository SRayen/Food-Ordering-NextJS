// cartProducts.store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export function calctPrice(cartProduct, selectedSize, selectedExtras) {
  let price = cartProduct.basePrice;
  if (selectedSize) {
    price += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      price += extra.price;
    }
  }
  return price;
}

export const useCartProductsStore = create(
  persist(
    (set, get) => ({
      cartProducts: [],
      addToCart: (product, selectedSize, selectedExtras) =>
        set((state) => ({
          cartProducts: [
            ...state.cartProducts,
            {
              ...product,
              size: selectedSize,
              extras: selectedExtras,
              product_price: calctPrice(product, selectedSize, selectedExtras),
            },
          ],
        })),

      clearCart: () => set({ cartProducts: [] }),
      deletedFromCart: (indexToRemove) =>
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (product, index) => index !== indexToRemove
          ),
        })),
    }),

    {
      name: "cartProduct-storage",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
