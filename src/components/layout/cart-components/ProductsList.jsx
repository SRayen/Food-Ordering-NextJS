import React from "react";
import CartProduct from "@/components/menu/CartProduct";
export default function ProductsList({
  cartProductsClient,
  subtotal,
  deletedFromCart,
}) {
  return (
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
  );
}
