import React from "react";
import SectionHeaders from "./SectionHeaders";

export default function AboutUs() {
  return (
    <section className="text-center my-16">
      <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p className="max-w-2xl  mt-4 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis
          facere distinctio, non saepe neque optio ea perferendis quidem velit
          porro, dignissimos nihil odit laudantium vero beatae dolorum
          blanditiis. Rem, quaerat?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          quo, repellendus consequuntur iste rem optio maiores iusto vel, quis
          ipsa, quam praesentium ipsum dolorum in officiis autem?
        </p>
      </div>
    </section>
  );
}
