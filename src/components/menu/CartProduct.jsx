"use client";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import Image from "next/image";

export default function CartProduct({ product, onRemove }) {
  return (
    <div className="flex items-center gap-4 border-b py-4 px-2 hover:bg-green-50 duration-150 ease-in-out">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt={""} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm mb-1">
            <span className="font-extrabold"> Size:</span>
            <span className="font-semibold text-red-500">
              {product.size.name}
            </span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra.name}>
                <span className="font-extrabold"> {extra.name}:</span>
                <span className="font-semibold"> ${extra.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold text-green-900">
        $ {product.product_price}
      </div>
      {!!onRemove && (
        <div>
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <DeleteIcon onClick={() => onRemove()} />
          </span>
        </div>
      )}
    </div>
  );
}
