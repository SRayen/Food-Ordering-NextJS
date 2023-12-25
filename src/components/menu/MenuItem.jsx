import Image from "next/image";
export default function MenuItem() {
  return (
    <div className="bg-gray-300 p-4 rounded-lg text-center flex flex-col items-center cursor-pointer hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="h-48 w-48 relative">
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={""}
        />
      </div>

      <h4 className="font-semibold my-2 text-xl">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga temporibus
        velit.
      </p>
      <button className="bg-primary text-white rounded-full px-6 py-2">
        Add to cart 12$
      </button>
    </div>
  );
}
