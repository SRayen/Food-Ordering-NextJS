"use client";
import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Loading from "@/app/loading";
import Error from "@/app/error";
export default function MenuList({ setSelectedMenu }) {
  const fetcher = async () => {
    const response = await axios.get("/api/menu");
    return response.data;
  };

  // Get categories data from server with SWR
  const { data: menuItems, error, isLoading } = useSWR("menuItems", fetcher);

  if (error) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <div>
      <h1>MenuList</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {menuItems.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => setSelectedMenu(item)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[140px]"
                src={item.image}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.name}</b>
              <p className="text-default-500">{item.basePrice} $</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
