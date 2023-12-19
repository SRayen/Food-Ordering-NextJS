"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function RegisterPage() {
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Register</h1>

      <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
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
      </div>
    </section>
  );
}
