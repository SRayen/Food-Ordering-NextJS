"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import { EyeSlashFilledIcon } from "../../../src/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../src/components/icons/EyeFilledIcon";
import Loading from "../loading";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [apiError, setApiError] = useState("");
  const [created, setCreated] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Required field"),
      password: Yup.string()
        .min(8, "Phone number must be at least 8 characters")
        .required("Required field"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      await signIn("credentials", { email, password, callbackUrl: "/" });
    },
  });

  return (
    <section className="mt-14 max-w-md mx-auto">
      <h1 className="text-center text-primary text-4xl">Login</h1>
      {created && (
        <p className="text-center mt-6 text-lg font-poppins font-bold">
          User created. Now you can &nbsp;
          <Link
            href={"/login"}
            className="underline text-warning hover:text-green-800 cursor-pointer"
          >
            Login &raquo;
          </Link>
        </p>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-between w-full md:flex-nowrap  mt-8 mx-2">
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
              value={formik.values.email}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}

            {/* password */}
            <Input
              label="Password"
              placeholder="Enter your password"
              radius={"full"}
              size={"lg"}
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              disabled={formik.isSubmitting}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
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
            Login
          </Button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex gap-4 justify-center border p-3 rounded-xl mx-auto hover:bg-green-300 duration-150 ease-in-out"
          >
            <Image
              src={"/google.png"}
              alt={"google icon"}
              width={24}
              height={24}
            />
            Login with google
          </button>
          <p className="text-center mt-6 text-lg font-poppins font-bold">
            Existing account ?{" "}
            <Link
              href={"/login"}
              className="underline text-warning hover:text-green-800 cursor-pointer"
            >
              Login here &raquo;
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
