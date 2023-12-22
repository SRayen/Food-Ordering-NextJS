"use client";
import React, { useState, useEffect } from "react";
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
  const [saved, setSaved] = useState(false);
  const [imagefile, setImageFile] = useState(null);

  const [userImage, setUserImage] = useState(session?.data?.user?.image);
  const [userName, setUserName] = useState(session?.data?.user?.name);

  useEffect(() => {
    if (session.status === "authenticated") {
      setUserName(session?.data?.user?.name);
      setUserImage(session?.data?.user?.image);
    }
  }, [session.status, session?.data?.user?.image, session?.data?.user?.name]);

  const handleFileChange = async (e) => {
    const file = e?.target?.files[0];
    setImageFile(file);
    if (file) {
      setUserImage(URL.createObjectURL(file));
    }

  };

    const formik = useFormik({
    initialValues: {
      user_name: userName,
    },
    validationSchema: Yup.object({
      user_name: Yup.string(),
    }),
    onSubmit: async (values) => {
      setApiError("");

      //Upload Image:
      let imageURL;
      if (
        imagefile &&
        (imagefile.type === "image/jpeg" ||
          imagefile.type === "image/jpg" ||
          imagefile.type === "image/png")
      ) {

        const image = new FormData();
        image.append("file", imagefile);
        image.append("cloud_name", "ray-cloud"); //From Cloudinary Account
        image.append("upload_preset", "im5qrbmt"); //From Cloudinary Account

        //First Save Image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ray-cloud/image/upload",
          { method: "post", body: image }
        );

        const imgData = await response.json();
        imageURL = imgData?.url?.toString();
      }

      try {
        const response = await axios.put("/api/profile", {
          user_name: values.user_name,
          image: imageURL,
        });
        if (response.status === 200) {
          toast.success("Data has been updated successfully!");
          setSaved(!saved);

          window.location.reload();
        } else {
          const errorData = response.data;
          setApiError(errorData.message);
        }
      } catch (error) {
        console.log("off===>", error);
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
    <section className="mt-14 max-w-lg mx-auto">
      <h1 className="text-center text-primary text-4xl">Profile</h1>

      {saved && (
        <h2 className="mt-2 text-center bg-green-100 p-4 rounded-lg border-4 border-green-300">
          Profile saved!
        </h2>
      )}

      <div className="flex gap-2">
        <div className="my-8 flex flex-col gap-4 p-3 ">
          <Avatar
            isBordered
            radius="md"
            src={userImage}
            className="w-20 h-30 text-large"
          />

          <label>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e)}
            />
            <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer font-bold hover:bg-green-400">
              Edit
            </span>
          </label>
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
