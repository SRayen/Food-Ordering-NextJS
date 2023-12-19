"use client";

import AboutUs from "@/components/layout/AboutUs";
import ContactUs from "@/components/layout/ContactUs";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

import { NextUIProvider } from "@nextui-org/react";
export default function Home() {
  return (
    <NextUIProvider>
      <>
        <Hero />
        <HomeMenu />
        <AboutUs />
        <ContactUs />
      </>
    </NextUIProvider>
  );
}
