import * as Yup from "yup";
import { useFormik } from "formik";
import Loading from "@/app/loading";
import { Button, Input, Card, CardBody } from "@nextui-org/react";

export default function AddressInputs({ user, total }) {
  const formik = useFormik({
    enableReinitialize: true, //to enable reinitialization
    initialValues: {
      phone_number: user?.phone,
      street_address: user?.streetAddress,
      postal_code: user?.postalCode,
      city: user?.city,
      country: user?.country,
    },
    validationSchema: Yup.object({
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
    onSubmit: async (values) => {},
  });

  return (
    <section className="mt-5 w-full mx-auto font-semibold">
      <Card shadow="lg" disableAnimation="true" className="bg-green-50">
        <CardBody>
          <p className="text-center font-bold text-xl">Checkout</p>
        </CardBody>
      </Card>

      <div className="flex">
        <form onSubmit={formik.handleSubmit} className="w-full mr-1 ">
          <div className="flex flex-col justify-between w-full md:flex-nowrap  mt-8 mx-1 ">
            <div className="flex flex-col gap-3 my-3 ">
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

            {/* Loading and Error handling */}
            {formik.isSubmitting && (
              <span className="mr-2">
                <Loading />
              </span>
            )}

            <Button
              color="danger"
              size={"lg"}
              variant="shadow"
              type="submit"
              className="my-10 disabled:bg-gray-500"
              disabled={formik.isSubmitting}
            >
              Pay $ {total}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
