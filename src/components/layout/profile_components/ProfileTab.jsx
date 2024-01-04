"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Checkbox,
  Input,
  Avatar,
  Card,
  CardBody,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { useUserStore } from "@/store/UserStore";
export default function ProfileTab({ user }) {
  const session = useSession();
  const [apiError, setApiError] = useState("");
  const [saved, setSaved] = useState(false);
  const [imagefile, setImageFile] = useState(null);

  const [newUserImage, setNewUserImage] = useState("");

  useEffect(() => {
    setNewUserImage("");
  }, [user?.image]);

  const currentUser = useUserStore((state) => state.user);
  const handleFileChange = async (e) => {
    const file = e?.target?.files[0];
    setImageFile(file);
    if (file) {
      setNewUserImage(URL.createObjectURL(file));
    }
  };
  const formik = useFormik({
    enableReinitialize: true, //to enable reinitialization
    initialValues: {
      user_name: user?.name,
      phone_number: user?.phone,
      street_address: user?.streetAddress,
      postal_code: user?.postalCode,
      city: user?.city,
      country: user?.country,
      isAdmin: user?.admin,
    },
    validationSchema: Yup.object({
      user_name: Yup.string(),
      phone_number: Yup.string().matches(
        /^\+?\d{0,3}[- .]?\(?\d{3}\)?[- .]?\d{3}[- .]?\d{4}$/,
        {
          message: "Please enter valid phone number.",
          excludeEmptyString: false,
        }
      ),
      street_address: Yup.string(),
      postal_code: Yup.string(),
      city: Yup.string(),
      country: Yup.string(),
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
        image.append(
          "cloud_name",
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        ); //From Cloudinary Account
        image.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET); //From Cloudinary Account

        //First Save Image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ray-cloud/image/upload",
          { method: "post", body: image }
        );

        const imgData = await response.json();
        imageURL = imgData?.url?.toString();
      }
      const {
        user_name,
        phone_number,
        street_address,
        postal_code,
        city,
        country,
        isAdmin,
      } = values;
      try {
        const response = await axios.put(`/api/profile/${user?._id}`, {
          user_name: user_name,
          image: imageURL,
          phone: phone_number,
          streetAddress: street_address,
          postalCode: postal_code,
          city,
          country,
          isAdmin,
        });

        if (response.status === 200) {
          toast.success("Data has been updated successfully!");
          mutate("user");
          setSaved(!saved);
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
  const userEmail = user?.email;

  return (
    <section className="mt-5 w-full mx-auto font-semibold">
      <Card shadow="lg" disableAnimation="true" className="bg-green-50">
        <CardBody>
          <p className="text-center font-bold text-xl">Profile</p>
        </CardBody>
      </Card>
      {saved && (
        <h2 className="mt-2 text-center bg-green-100 p-4 rounded-lg border-4 border-green-300">
          Profile saved!
        </h2>
      )}

      <div className="flex">
        <div className="my-8 flex flex-col gap-4 p-3 ">
          <Avatar
            isBordered
            radius="md"
            src={newUserImage ? newUserImage : user?.image}
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

        <form onSubmit={formik.handleSubmit} className="w-full mr-1 ">
          <div className="flex flex-col justify-between w-full md:flex-nowrap  mt-8 mx-1 ">
            <div className="flex flex-col gap-3 my-3 ">
              <div className="flex flex-col gap-3 ">
                {/* user_name */}
                <Input
                  type="text"
                  label="Username"
                  placeholder="Username"
                  radius={"full"}
                  size={"md"}
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
                  placeholder="Email"
                  radius={"full"}
                  size={"md"}
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={userEmail}
                  disabled={true}
                  color="danger"
                />
              </div>

              <div className="flex flex-col gap-5">
                {/* phone_number */}
                <Input
                  type="text"
                  label="Phone number"
                  placeholder="Phone number"
                  radius={"full"}
                  size={"md"}
                  id="phone_number"
                  name="phone_number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone_number}
                  disabled={formik.isSubmitting}
                />
                {formik.touched.phone_number && formik.errors.phone_number ? (
                  <div className="text-red-500">
                    {formik.errors.phone_number}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-5">
                {/* street_address */}
                <Input
                  type="text"
                  label="Street address"
                  placeholder="Street address"
                  radius={"full"}
                  size={"md"}
                  id="street_address"
                  name="street_address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street_address}
                  disabled={formik.isSubmitting}
                />
                {formik.touched.street_address &&
                formik.errors.street_address ? (
                  <div className="text-red-500">
                    {formik.errors.street_address}
                  </div>
                ) : null}
              </div>

              {/* Postal code & City */}

              <div className="flex flex-col gap-2 md:flex-row w-full ">
                <div className="flex flex-col gap-5 w-full">
                  {/* postal_code */}
                  <Input
                    type="text"
                    label="Postal code"
                    placeholder="Postal code"
                    radius={"full"}
                    size={"md"}
                    id="postal_code"
                    name="postal_code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postal_code}
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.postal_code && formik.errors.postal_code ? (
                    <div className="text-red-500">
                      {formik.errors.postal_code}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-5 w-full">
                  {/* city */}
                  <Input
                    type="text"
                    label="City"
                    placeholder="City"
                    radius={"full"}
                    size={"md"}
                    id="city"
                    name="city"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div className="text-red-500">{formik.errors.city}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full">
                {/* country */}
                <Input
                  type="text"
                  label="Country"
                  placeholder="Country"
                  radius={"full"}
                  size={"md"}
                  id="country"
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  disabled={formik.isSubmitting}
                />
                {formik.touched.country && formik.errors.country ? (
                  <div className="text-red-500">{formik.errors.country}</div>
                ) : null}
              </div>
            </div>
            {currentUser?.admin && (
              <Checkbox
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isAdmin}
                isSelected={formik.values.isAdmin}
              >
                Admin
              </Checkbox>
            )}

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
