import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />

      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p className="max-w-2xl  mt-4 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis facere distinctio, non saepe neque optio ea perferendis
            quidem velit porro, dignissimos nihil odit laudantium vero beatae
            dolorum blanditiis. Rem, quaerat?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
            quo, repellendus consequuntur iste rem optio maiores iusto vel, quis
            ipsa, quam praesentium ipsum dolorum in officiis autem?
          </p>
        </div>
      </section>

      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            href="tel:+21678456456"
            className="text-4xl underline text-gray-500"
          >
            +216 78 456 456
          </a>
        </div>
      </section>

      <footer
        className="border-t p-8 text-center text-gray-500 mt-16"
      >
        <span className="font-bold">SRayen</span> &copy;{" "}
        <span className="font-medium">2023 All rights reserved</span>
      </footer>
    </>
  );
}
