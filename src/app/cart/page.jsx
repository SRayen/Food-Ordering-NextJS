"use client";

import AddressInputs from "@/components/layout/cart-components/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";

import { useEffect, useState } from "react";
import { useCartProductsStore } from "@/store/CartProductStore";
import { useUserStore } from "@/store/UserStore";
export default function CartPage() {

  const [cartProductsClient, setCartProductsClient] = useState([]);

  const cartProducts = useCartProductsStore((state) => state.cartProducts);
  const user = useUserStore((state) => state.user);
  const deletedFromCart = useCartProductsStore(
    (state) => state.deletedFromCart
  );
  //The use of useEffect is to prevent the hydration problem:
  useEffect(() => {
    setCartProductsClient(cartProducts);
  }, [cartProducts]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += p.product_price;
  }

  if (cartProductsClient?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="flex gap-2 justify-between flex-col mt-8 md:flex-row">
        <div className="border flex-grow">
          {cartProductsClient?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProductsClient?.length > 0 &&
            cartProductsClient.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                onRemove={() => deletedFromCart(index)}
              />
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subtotal}
              <br />
              $5
              <br />${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <AddressInputs user={user} total={subtotal + 5} />
        </div>
      </div>
    </section>
  );
}
