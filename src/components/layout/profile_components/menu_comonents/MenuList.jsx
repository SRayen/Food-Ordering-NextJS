"use client";
import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { Modal } from "antd";
export default function MenuList({
  setSelectedMenu,
  setApiError,
  formik,
  toast,
  setEnable,
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [menuItemToDelete, setMenuItemToDeleteToDelete] = useState({});
  const fetcher = async () => {
    const response = await axios.get("/api/menu");
    return response.data;
  };

  // Get categories data from server with SWR
  const { data: menuItems, error, isLoading } = useSWR("menuItems", fetcher);

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  const setVisibleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const deleteMenuItem = async (id) => {
    try {
      const response = await axios.delete(`/api/menu/${id}`);

      if (response.status === 200) {
        formik.resetForm();
        toast.success("Menu item has been deleted successfully!");
        mutate("menuItems");
      } else {
        const errorData = response.data;
        setApiError(errorData.message);
      }
    } catch (error) {
      error?.response?.data?.message
        ? setApiError(error.response.data.message)
        : setApiError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>MenuList</h1>
      <h2></h2>

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-2 ">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Card
              className=" w-36 md:w-40"
              shadow="sm"
              isPressable
              onPress={() => {
                setSelectedMenu(item);
                setEnable(true);
              }}
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
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon
                    onClick={() => {
                      setVisibleDeleteModal();
                      // setMenuItemToDeleteToDelete(item);
                    }}
                  />
                </span>
              </CardFooter>
            </Card>
            <Modal
              className="mt-40"
              title="Delete menu item"
              open={openDeleteModal}
              onOk={() => {
                deleteMenuItem(item._id);
                setOpenDeleteModal(!openDeleteModal);
              }}
              okButtonProps={{
                style: {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
              onCancel={setVisibleDeleteModal}
            >
              <div>
                <p>Are you sure to delete this menu item?</p>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
