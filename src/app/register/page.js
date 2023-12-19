"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Register</h1>

      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 my-4">
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          radius={"full"}
          size={"lg"}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          radius={"full"}
          size={"lg"}
        />
        <Button color="danger" variant="shadow">
          Register
        </Button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center border p-3 rounded-xl mx-auto hover:bg-green-300 duration-150 ease-in-out">
          <Image
            src={"/google.png"}
            alt={"google icon"}
            width={24}
            height={24}
          />
          Login with google
        </button>
      </div>
    </section>
  );
}
