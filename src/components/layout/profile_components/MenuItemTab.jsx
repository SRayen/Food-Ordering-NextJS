"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";

import axios from "axios";
import toast from "react-hot-toast";
import {
  Card,
  CardBody,
  Button,
  Divider,
  CardHeader,
  Avatar,
  Input,
  Textarea,
} from "@nextui-org/react";
import { CameraIcon } from "@/components/icons/CameraIcon";
import SizesForm from "@/components/layout/profile_components/menu_comonents/SizesForm";
import ExtraIngredientPricesForm from "@/components/layout/profile_components/menu_comonents/ExtraIngredientPricesForm";
import MenuList from "@/components/layout/profile_components/menu_comonents/MenuList";
import useSWR, { mutate } from "swr";
import ChevronDown from "@/components/icons/ChevronDown";
export default function MenuItemTab({ user }) {
  const session = useSession();
  const [selectedMenu, setSelectedMenu] = useState({});
  const [apiError, setApiError] = useState("");
  const [saved, setSaved] = useState(false);
  const [imagefile, setImageFile] = useState(null);

  const [menuImage, setMenuImage] = useState("");

  const [sizeDisplay, setSizeDisplay] = useState(false);

  const [enable, setEnable] = useState(false);

  const [IngredientDisplay, setIngredientDisplay] = useState(false);

  const fetcher = async () => {
    const response = await axios.get("/api/category");
    return response.data;
  };

  // Get categories data from server with SWR
  const { data: categories, error, isLoading } = useSWR("categories", fetcher);

  const [sizes, setSizes] = useState(
    selectedMenu?.sizes || [{ name: "", price: "" }]
  );

  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    selectedMenu?.extraIngredientPrices || [{ name: "", price: "" }]
  );

  const addSizeField = () => {
    if (selectedMenu?.sizes) {
      setSelectedMenu({
        ...selectedMenu,
        sizes: [...selectedMenu.sizes, { name: "", price: "" }],
      });
    } else {
      setSizes([...sizes, { name: "", price: "" }]);
    }
  };

  const addIngredientField = () => {
    if (selectedMenu?.extraIngredientPrices) {
      setSelectedMenu({
        ...selectedMenu,
        extraIngredientPrices: [
          ...selectedMenu.extraIngredientPrices,
          { name: "", price: "" },
        ],
      });
    } else {
      setExtraIngredientPrices([
        ...extraIngredientPrices,
        { name: "", price: "" },
      ]);
    }
  };

  const handleFileChange = async (e) => {
    const file = e?.target?.files[0];
    setImageFile(file);
    if (file) {
      setMenuImage(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    let imageURL;
    if (
      imagefile &&
      (imagefile.type === "image/jpeg" ||
        imagefile.type === "image/jpg" ||
        imagefile.type === "image/png")
    ) {
      const image = new FormData();
      image.append("file", imagefile);
      image.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME); //From Cloudinary Account
      image.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET); //From Cloudinary Account

      //First Save Image to Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ray-cloud/image/upload",
        { method: "post", body: image }
      );

      const imgData = await response.json();
      imageURL = imgData?.url?.toString();
    }
    return imageURL;
  };

  // Update Menu item
  const updateMenuItem = async (id) => {
    const {
      itemName,
      description,
      basePrice,
      sizes,
      category,
      extraIngredientPrices,
    } = formik?.values;

    const imageURL = menuImage && (await uploadImage());
    try {
      const response = await axios.put(`/api/menu/${id}`, {
        name: itemName,
        description: description,
        image: menuImage && imageURL,
        category: category,
        basePrice: basePrice,
        sizes: sizes,
        extraIngredientPrices: extraIngredientPrices,
      });

      if (response.status === 200) {
        toast.success("Category has been updated successfully!");
        mutate("menuItems");
        setSaved(!saved);
        formik.resetForm();
        setSelectedMenu({});
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

  const formik = useFormik({
    enableReinitialize: enable, //to enable reinitialization //Rq:here enable is a state (true when an item is selected)
    initialValues: {
      itemName: selectedMenu?.name,
      description: selectedMenu?.description,
      basePrice: selectedMenu?.basePrice,
      category: selectedMenu?.category,
      sizes: selectedMenu?.sizes || sizes,
      extraIngredientPrices:
        selectedMenu?.extraIngredientPrices || extraIngredientPrices,
    },
    validationSchema: Yup.object({
      itemName: Yup.string().required("Required field"),
      description: Yup.string().required("Required field"),
      basePrice: Yup.number().positive().required("Required field"),
      category: Yup.string()
      .required("Category is required"),
    }),
    onSubmit: async (values) => {
      setApiError("");
      // Upload Image:
      const imageURL = await uploadImage();
      const {
        itemName,
        description,
        basePrice,
        sizes,
        category,
        extraIngredientPrices,
      } = values;

      try {
        const response = await axios.post("/api/menu", {
          name: itemName,
          image: imageURL,
          description,
          basePrice: +basePrice,
          category,
          sizes,
          extraIngredientPrices,
        });

        if (response.status === 201) {
          toast.success("Data has been saved successfully!");
          setSaved(!saved);
          formik.resetForm();
          formik.setFieldValue("itemName", "");
          formik.setFieldValue("description", "");
          formik.setFieldValue("basePrice", "");
          mutate("menuItems");
          setMenuImage("");
          // window.location.reload();
        } else {
          const errorData = response.data;
          setApiError(errorData.message);
        }
      } catch (error) {
        error?.response?.data?.message
          ? setApiError(error.response.data.message)
          : setApiError(
              "An unexpected error occurred. Please try again later."
            );
      }
    },
  });

  const { status } = session;

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  const userEmail = session?.data?.user?.email;

  return (
    <>
      {/* Add - Edit Menu */}
      <section className="mt-5 w-full mx-auto font-semibold">
        <Card shadow="lg" disableAnimation="true" className="bg-green-50">
          <CardBody>
            <p className="text-center font-bold text-xl">Menu Item</p>
          </CardBody>
        </Card>
        {saved && (
          <h2 className="mt-2 text-center bg-green-100 p-4 rounded-lg border-4 border-green-300">
            Menu item saved!
          </h2>
        )}

        <div className="flex flex-col md:flex-row  mx-1">
          <div className="my-8 flex flex-col gap-4 p-1">
            <Avatar
              className="mx-auto my-1"
              size="lg"
              isBordered
              radius="md"
              fallback={
                <CameraIcon
                  className="animate-pulse w-6 h-6 text-default-500"
                  fill="currentColor"
                  size={40}
                />
              }
              src={menuImage ? menuImage : selectedMenu?.image}
            />

            <label>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
              />
              <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer font-bold hover:bg-green-400">
                Add
              </span>
            </label>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex mr-1 flex-col gap-2"
          >
            <div className="flex flex-col justify-between w-full md:flex-nowrap  mt-8 mx-1 ">
              <div className="flex flex-col gap-3 my-3 ">
                <div className="flex flex-col gap-3 ">
                  {/* itemName */}
                  <Input
                    type="text"
                    label="Item name"
                    placeholder="Item name"
                    radius={"full"}
                    size={"md"}
                    id="itemName"
                    name="itemName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.itemName}
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.itemName && formik.errors.itemName ? (
                    <div className="text-red-500">{formik.errors.itemName}</div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-5">
                  {/* description */}
                  <Textarea
                    minRows={3}
                    type="text"
                    label="Description"
                    placeholder="Description"
                    radius={"full"}
                    size={"md"}
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-5">
                  {/* basePrice */}
                  <Input
                    type="text"
                    label="Base price"
                    placeholder="Base price"
                    radius={"full"}
                    size={"md"}
                    id="basePrice"
                    name="basePrice"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.basePrice}
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.basePrice && formik.errors.basePrice ? (
                    <div className="text-red-500">
                      {formik.errors.basePrice}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-5">
                  {/* categories */}
                  <div className="flex gap-6 items-center">
                    <label htmlFor="category">Category:</label>
                    <select
                      value={selectedMenu?.category?._id}
                      id="category"
                      name="category"
                      onChange={formik.handleChange}
                      className="border p-3 rounded-lg bg-gray-50 hover:to-blue-50 cursor-pointer"
                    >
                      <option value="">--Please choose an option--</option>
                      {categories?.length > 0 &&
                        categories?.map((category) => {
                          return (
                            <>
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                  {formik.touched.category && formik.errors.category ? (
                    <div className="text-red-500">{formik.errors.category}</div>
                  ) : null}
                </div>
              </div>

              {/* Loading and Error handling */}
              {formik.isSubmitting && (
                <span className="mr-2">
                  <Loading />
                </span>
              )}
              {apiError && (
                <div className="text-red-500 mx-auto">{apiError}</div>
              )}
            </div>
            {/* Sizes Card */}
            <Card className="p-0">
              <CardHeader
                className="justify-center cursor-pointer hover:bg-blue-50"
                onClick={() => setSizeDisplay(!sizeDisplay)}
              >
                <ChevronDown />
                <h1>Sizes</h1>
              </CardHeader>
              <Divider />
              <CardBody
                className={`bg-green-50 ${sizeDisplay ? "block" : "hidden"} `}
              >
                <Button
                  color="success"
                  size={"md"}
                  variant="shadow"
                  className="my-1 disabled:bg-gray-500  mx-auto"
                  disabled={formik.isSubmitting}
                  onClick={() => addSizeField()}
                >
                  Add item size
                </Button>
                {selectedMenu?.sizes
                  ? selectedMenu?.sizes?.map((size, index) => (
                      <SizesForm
                        key={index}
                        formik={formik}
                        index={index}
                        setSizes={setSizes}
                        sizes={sizes}
                        selectedMenu={selectedMenu}
                        setSelectedMenu={setSelectedMenu}
                      />
                    ))
                  : sizes?.map((size, index) => (
                      <SizesForm
                        key={index}
                        formik={formik}
                        index={index}
                        setSizes={setSizes}
                        sizes={sizes}
                      />
                    ))}
              </CardBody>
              <Divider />
            </Card>

            {/* ExtraIngredientPricesForm Card */}
            <Card className="p-0">
              <CardHeader
                className="justify-center cursor-pointer hover:bg-blue-50"
                onClick={() => setIngredientDisplay(!IngredientDisplay)}
              >
                <ChevronDown />
                <h1>Extra Ingredient Prices</h1>
              </CardHeader>
              <Divider />
              <CardBody
                className={`bg-green-50 ${
                  IngredientDisplay ? "block" : "hidden"
                } `}
              >
                <Button
                  color="success"
                  size={"md"}
                  variant="shadow"
                  className="my-1 disabled:bg-gray-500  mx-auto"
                  disabled={formik.isSubmitting}
                  onClick={() => addIngredientField()}
                >
                  Add ingredients prices
                </Button>

                {selectedMenu?.extraIngredientPrices
                  ? selectedMenu?.extraIngredientPrices?.map((size, index) => (
                      <ExtraIngredientPricesForm
                        key={index}
                        formik={formik}
                        index={index}
                        setExtraIngredientPrices={setExtraIngredientPrices}
                        extraIngredientPrices={extraIngredientPrices}
                        selectedMenu={selectedMenu}
                        setSelectedMenu={setSelectedMenu}
                      />
                    ))
                  : extraIngredientPrices?.map((size, index) => (
                      <ExtraIngredientPricesForm
                        key={index}
                        formik={formik}
                        index={index}
                        setExtraIngredientPrices={setExtraIngredientPrices}
                        extraIngredientPrices={extraIngredientPrices}
                      />
                    ))}
              </CardBody>
              <Divider />
            </Card>
            <div className="flex flex-col gap-3  md:flex-row ">
              {Object.keys(selectedMenu).length > 0 && (
                <>
                  <Button
                    color="danger"
                    size={"lg"}
                    variant="shadow"
                    className="my-3 disabled:bg-gray-500 mx-auto w-full"
                    disabled={formik.isSubmitting}
                    onPress={() => updateMenuItem(selectedMenu._id)}
                  >
                    Update
                  </Button>

                  <Button
                    color="secondary"
                    size={"lg"}
                    variant="shadow"
                    className="my-3 disabled:bg-gray-500 mx-auto  w-full"
                    disabled={formik.isSubmitting}
                    onPress={() => setSelectedMenu({})}
                  >
                    Clear
                  </Button>
                </>
              )}

              <Button
                color="success"
                size={"lg"}
                variant="shadow"
                type="submit"
                className="my-3 disabled:bg-gray-500 mx-auto  w-full"
                disabled={formik.isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* List of Menus */}
      <section className="mt-5 w-full mx-auto font-semibold">
        <MenuList
          setSelectedMenu={setSelectedMenu}
          setEnable={setEnable}
          setApiError={setApiError}
          formik={formik}
          toast={toast}
          setMenuImage={setMenuImage}
        />
      </section>
    </>
  );
}
