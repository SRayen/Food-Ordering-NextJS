"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();

  const [apiError, setApiError] = useState("");
  const formik = useFormik({
    initialValues: {
      user_name: "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required("Required field"),
    }),
    onSubmit: async (values) => {
      setApiError("");
      try {
        const response = await axios.put("/api/profile", values);
        if (response.status === 200) {
          console.log("wiii");
          toast.success("Data has been updated successfully!");
          formik.resetForm();
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
  const userImage = session?.data?.user?.image;

  return (
    <section className="mt-14 max-w-lg mx-auto">
      <h1 className="text-center text-primary text-4xl">Profile</h1>

      <div className="flex gap-2">
        <div className="my-8 flex flex-col gap-4 p-3 ">
          <Avatar
            isBordered
            radius="md"
            src={userImage}
            className="w-20 h-30 text-large"
          />
          <Button color="primary" variant="ghost">
            Edit
          </Button>
        </div>

        <form onSubmit={formik.handleSubmit} className="w-full mr-2">
          <div className="flex flex-col justify-between w-full md:flex-nowrap  mt-8 mx-2">
            <div className="flex flex-col gap-3 my-3">
              <div className="flex flex-col gap-5">
                {/* user_name */}
                <Input
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  radius={"full"}
                  size={"lg"}
                  id="user_name"
                  name="user_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.user_name}
                  disabled={formik.isSubmitting}
                />
                {formik.touched.user_name && formik.errors.user_name ? (
                  <div className="text-red-500">{formik.errors.user_name}</div>
                ) : null}
              </div>

              <div className="flex flex-col gap-5">
                {/* mail */}
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  radius={"full"}
                  size={"lg"}
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={userEmail}
                  disabled={true}
                  color="danger"
                />
              </div>
            </div>

            {/* Loading and Error handling */}
            {formik.isSubmitting && (
              <span className="mr-2">
                <Loading />
              </span>
            )}
            {apiError && <div className="text-red-500 mx-auto">{apiError}</div>}

            <Button
              color="danger"
              size={"lg"}
              variant="shadow"
              type="submit"
              className="my-10 disabled:bg-gray-500"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
