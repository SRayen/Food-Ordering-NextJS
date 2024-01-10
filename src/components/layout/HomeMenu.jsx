"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import useSWR, { mutate } from "swr";
import axios from "axios";
export default function HomeMenu() {
  const fetcher = async () => {
    const response = await axios.get("/api/menu");
    const latestMenuItems = response.data.slice(-3);
    return latestMenuItems;
  };

  const { data: menuItems, error, isLoading } = useSWR("menuItems", fetcher);
  return (
    <section className="">
      <div className="flex justify-between -mx-14 -mt-14 ">
        <div className="h-48 w-48 relative -z-10">
          <Image
            src={"/sallad1.png"}
            layout={"fill"}
            objectFit={"contain"}
            alt={"salad"}
          />
        </div>

        <div className="h-48 w-48 -mt-16 -z-10 relative">
          <Image
            src={"/sallad2.png"}
            layout={"fill"}
            objectFit={"contain"}
            alt={"salad"}
          />
        </div>
      </div>

      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our newest dishes"}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        {menuItems?.length > 0 &&
          menuItems.map((item) => <MenuItem {...item} key={item._id} />)}
      </div>
    </section>
  );
}
