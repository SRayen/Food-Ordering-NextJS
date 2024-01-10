"use client";
import Image from "next/image";
import Right from "../icons/Right";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="hero mt-4 ">
      <div className="py-8  w-full">
        <h1 className="text-4xl font-semibold text-center leading-tight">
          Welcome to Our Delicious <span className="text-primary">Pizza</span>
          World
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mx-14 my-2">
          <div className="font-lemon md:text-justify">
            <p className="my-6 text-green-800">
              IIndulge in the finest selection of handcrafted pizzas made with
              the freshest local ingredients and traditional recipes.{" "}
            </p>
            <p className="my-6 ml-16 text-orange-600">
              Our simple platform lets you explore a world of culinary delights,
              from classic margherita to innovative gourmet creations.
            </p>
            <p className="my-6 text-green-800">
              Order with a few clicks and savor the magic of artisanal pizza
              delivered straight to your door.
            </p>
            <div className="flex gap-4 text-sm  justify-center">
              <button
                onClick={() => router.push("/menu")}
                className="bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 uppercase"
              >
                Order now
                <Right />
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="flex gap-2 py-2 text-gray-600 font-semibold"
              >
                Visit Profile
                <Right />
              </button>
            </div>
          </div>

          <Image src={"/pizza.png"} alt={"pizza"} height={50} width={180} />
        </div>
      </div>
    </section>
  );
}
