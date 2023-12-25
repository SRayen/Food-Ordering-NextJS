import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-8">
        <h1 className="text-4xl font-semibold text-center leading-tight">
          Welcome to Our Delicious <span className="text-primary">Pizza</span>
          World
        </h1>
        <p className="my-6 text-gray-400">
          <span className="pr-4"></span> Indulge in the finest selection of
          handcrafted pizzas made with the freshest ingredients and traditional
          recipes.
        </p>
        <div className="flex gap-4 text-sm  justify-center">
          <button className="bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 uppercase ">
            Order now
            <Right />
          </button>
          <button className="flex gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>

      <div className="relative">
        <Image
          src={"/pizza.png"}
          alt={"pizza"}
          layout={"fill"}
          objectFit={"contain"}
        />
      </div>
    </section>
  );
}
