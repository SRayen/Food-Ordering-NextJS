"use client";

import { useCartProductsStore } from "@/store/CartProductStore";
import { useState } from "react";
import MenuItemBox from "@/components/menu/MenuItemBox";
import Image from "next/image";
import FlyingButton from "react-flying-item";
export default function MenuItem(menuItem) {
  const [showPopup, setShowPopup] = useState(false);

  const { basePrice, name, image, description, sizes, extraIngredientPrices } =
    menuItem;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const addToCart = useCartProductsStore((state) => state.addToCart);

  const handleAddToCard = async () => {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowPopup(false);
  };

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  //Price:
  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {/* RQ:inset-0: It sets the top, right, bottom, and left positions of the element to 0,
       effectively making the element cover the entire viewport. */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-30"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(extraThing._id)}
                        name={extraThing.name}
                      />
                      {extraThing.name} +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <div className="flex justify-around items-center">
                <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
                  <div
                    className="primary sticky bottom-2 bg-primary text-white rounded-full px-6 py-2 hover:bg-red-500"
                    onClick={handleAddToCard}
                  >
                    Add to cart ${selectedPrice}
                  </div>
                </FlyingButton>

                <button
                  className="bg-gray-500 text-white rounded-full px-6 py-2 hover:bg-red-500"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MenuItemBox handleAddToCard={handleAddToCard} menuItem={menuItem} />
    </>
  );
}
