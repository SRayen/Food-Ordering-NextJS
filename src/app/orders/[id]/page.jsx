"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import React, { useEffect } from "react";
import { useCartProductsStore } from "@/store/CartProductStore";
import { useParams } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import ProductsList from "@/components/layout/cart-components/ProductsList";
import AddressInputs from "@/components/layout/cart-components/AddressInputs";
import { useUserStore } from "@/store/UserStore";

export default function OrderPage() {
  const clearCart = useCartProductsStore((state) => state.clearCart);
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (window.location.href.includes("clear-cart=1")) {
      clearCart();
    }
  }, [clearCart]);

  const fetcher = async () => {
    const response = await axios.get("/api/orders?_id=" + id);
    return response.data;
  };

  const { data: orders, error, isLoading } = useSWR("orders", fetcher);

  let subtotal = 0;
  if (orders?.cartProducts.length > 0) {
    for (const p of orders.cartProducts) {
      subtotal += p.product_price;
    }
  }

  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="my-4">
          <p>Thanks for your order</p>
          <p>We will call your order will be on the way.</p>
        </div>
      </div>
      {orders && (
        <div>
          <div className="flex gap-2 justify-between flex-col mt-8 md:flex-row">
            <ProductsList
              cartProductsClient={orders.cartProducts}
              subtotal={subtotal}
              // deletedFromCart={deletedFromCart}
            />
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs
                disabled={true}
                user={user}
                total={subtotal + 5}
                cartProductsClient={orders.cartProducts}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
