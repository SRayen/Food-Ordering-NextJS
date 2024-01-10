import SectionHeaders from "./SectionHeaders";

export default function AboutUs() {
  return (
    <section className="text-center my-16">
      <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p className="max-w-2xl  mt-4 font-lemon ">
          We are passionate foodies on a mission to bring you the best. Our
          platform curates a delicious selection of handcrafted pizzas, made
          with fresh, local ingredients and time-honored recipes. Every bite is
          a celebration of flavor, delivered with a smile.
        </p>
      </div>
    </section>
  );
}
