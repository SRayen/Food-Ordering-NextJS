"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import React, { useEffect } from "react";
import { useCartProductsStore } from "@/store/CartProductStore";
import { useParams } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
export default function OrderPage() {

  const clearCart = useCartProductsStore((state) => state.clearCart);
  const { id } = useParams();
  useEffect(() => {
    if (window.location.href.includes("clear-cart=1")) {
      clearCart();
    }
  }, [clearCart]);

  const fetcher = async () => {
    const response = await axios.get("/api/orders?_id=" + id);
    return response.data;
  };

  // Get categories data from server with SWR
  const { data: orders, error, isLoading } = useSWR("orders", fetcher);

  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="my-4">
          <p>Thanks for your order</p>
          <p>We will call your order will be on the way.</p>
        </div>
      </div>
      {orders && <div></div>}
    </section>
  );
}
