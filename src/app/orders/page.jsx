"use client";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardBody } from "@nextui-org/react";
import { dbTimeForHuman } from "@/libs/dateTime";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  getKeyValue,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { Modal } from "antd";
import useSWR from "swr";
import Error from "@/app/error";
import { useCategories } from "@/Hooks/useCategories";
import ProductsList from "@/components/layout/cart-components/ProductsList";
export default function OrdersTab() {
  const [order, setOrder] = useState({});
  const fetcher = async () => {
    const response = await axios.get("/api/orders");
    return response.data;
  };

  const { data, isLoading } = useSWR(`/api/orders`, fetcher);

  // Reverse the order of the data
  const reversedData = useMemo(() => {
    if (data) {
      return [...data].reverse();
    }
    return [];
  }, [data]);

  const loadingState = isLoading;
  let subtotal = 0;
  if (order?.cartProducts?.length > 0) {
    for (const p of order.cartProducts) {
      subtotal += p.product_price;
    }
  }

  return (
    <>
      <section className="mt-5 w-full mx-auto font-semibold">
        <Card shadow="lg" disableAnimation="true" className="bg-green-50">
          <CardBody>
            <div className="flex justify-center items-center gap-4">
              <p className="text-center font-bold text-xl">Orders</p>
            </div>
          </CardBody>
        </Card>

        <div>
          <Table
            aria-label="Example table with client async pagination"
            className="h-48"
          >
            <TableHeader>
              <TableColumn key="userEmail">Email</TableColumn>
              <TableColumn key="createdAt">Date</TableColumn>
              <TableColumn key="paid">Status</TableColumn>
              <TableColumn key="cartProducts">Items</TableColumn>
            </TableHeader>
            <TableBody
              items={reversedData ?? []}
              loadingContent={<Spinner />}
              loadingState={loadingState}
            >
              {(item) => (
                <TableRow
                  key={item?._id}
                  onClick={() => setOrder(item)}
                  className="cursor-pointer hover:bg-green-50"
                >
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "paid" ? (
                        <Chip
                          className="capitalize"
                          color={item.paid ? "success" : "danger"}
                          size="sm"
                          variant="flat"
                        >
                          {item.paid ? "Paid" : "Not Paid"}
                        </Chip>
                      ) : columnKey === "createdAt" ? (
                        <Chip
                          className="capitalize"
                          color={"primary"}
                          size="sm"
                          variant="flat"
                        >
                          {dbTimeForHuman(getKeyValue(item, columnKey))}
                        </Chip>
                      ) : columnKey === "cartProducts" ? (
                        <Chip
                          className="capitalize"
                          color={"secondary"}
                          size="sm"
                          variant="flat"
                        >
                          {getKeyValue(item, columnKey).length}
                        </Chip>
                      ) : (
                        getKeyValue(item, columnKey)
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {Object.keys(order).length > 0 ? (
        <ProductsList
          cartProductsClient={order.cartProducts}
          subtotal={subtotal}
        />
      ) : (
        <Card shadow="lg" disableAnimation="true" className="bg-green-50">
          <CardBody>
            <div className="flex justify-center items-center gap-4">
              <p className="text-center font-bold text-xl">SELECT AN ORDER</p>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
