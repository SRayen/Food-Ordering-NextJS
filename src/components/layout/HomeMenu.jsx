import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  return (
    <section className="">
      <div className="flex justify-between -mx-14 -mt-14 ">
        <div className="h-48 w-48 relative -z-10">
          <Image
            // className=" -m-16 -z-10"
            src={"/sallad1.png"}
            layout={"fill"}
            objectFit={"contain"}
            alt={"salad"}
          />
        </div>

        <div className="h-48 w-48 -mt-16 -z-10 relative">
          <Image
            //    className="right-0 -z-10"
            src={"/sallad2.png"}
            layout={"fill"}
            objectFit={"contain"}
            alt={"salad"}
          />
        </div>
      </div>

      <div className="text-center mb-4">
        <SectionHeaders subHeader={"check out"} mainHeader={"Menu"} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
