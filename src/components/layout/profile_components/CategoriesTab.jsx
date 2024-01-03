"use client";
import { useState } from "react";
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
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { Modal } from "antd";
import { mutate } from "swr";
import Error from "@/app/error";
import { useCategories } from "@/Hooks/useCategories";

export default function CategoriesTab({ user }) {
  const session = useSession();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [apiError, setApiError] = useState("");
  const [saved, setSaved] = useState(false);
  const [categorieToEdit, setCategorieToEdit] = useState({});
  const [categorieToDelete, setCategorieToDelete] = useState({});

  const { categories, error, isLoading } = useCategories();

  const updateCategory = async (id) => {
    try {
      const response = await axios.put(`/api/category/${id}`, {
        name: categorieToEdit.name,
      });

      if (response.status === 200) {
        toast.success("Category has been updated successfully!");
        mutate("categories");
        setSaved(!saved);
        formik.resetForm();
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

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`/api/category/${id}`);

      if (response.status === 200) {
        toast.success("Category has been deleted successfully!");
        mutate("categories");
        setSaved(!saved);
        formik.resetForm();
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
    enableReinitialize: true, //to enable reinitialization
    initialValues: {
      category_name: "",
    },
    validationSchema: Yup.object({
      category_name: Yup.string(),
    }),
    onSubmit: async (values) => {
      setApiError("");
      const { category_name } = values;
      try {
        const response = await axios.post("/api/category", {
          name: category_name,
        });

        if (response.status === 201) {
          toast.success("Category has been saved successfully!");
          mutate("categories");
          setSaved(!saved);
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

  const setVisibleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const setVisibleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <section className="mt-5 w-full mx-auto font-semibold">
      <Card shadow="lg" disableAnimation="true" className="bg-green-50">
        <CardBody>
          <div className="flex justify-center items-center gap-4">
            <p className="text-center font-bold text-xl">Categories</p>
            <Chip size="sm" variant="bordered" color="primary">
              <span className="m-1 font-extrabold text-medium">
                {categories.length}
              </span>
            </Chip>
          </div>
        </CardBody>
      </Card>
      {saved && (
        <h2 className="mt-2 text-center bg-green-100 p-4 rounded-lg border-4 border-green-300">
          Category saved!
        </h2>
      )}

      <div className="flex">
        <form onSubmit={formik.handleSubmit} className="w-full mr-1 ">
          <div className="flex flex-col justify-between w-full md:flex-nowrap  mt-8 mx-1 ">
            <div className="flex flex-col gap-3 my-3 ">
              <div className="flex flex-col gap-3 ">
                {/* category_name */}
                <Input
                  type="text"
                  label="Category"
                  placeholder="Category"
                  radius={"full"}
                  size={"md"}
                  id="category_name"
                  name="category_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category_name}
                  disabled={formik.isSubmitting}
                />
                {formik.touched.category_name && formik.errors.category_name ? (
                  <div className="text-red-500">
                    {formik.errors.category_name}
                  </div>
                ) : null}
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
              Add categorie
            </Button>

            <div className="mx-auto min-w-unit-24">
              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn minWidth={"100"}>NAME</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat._id}>
                      <TableCell>
                        <>{cat.name}</>
                      </TableCell>
                      <TableCell className="flex gap-8">
                        <Tooltip content="Edit categorie">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon
                              onClick={() => {
                                setVisibleEditModal();
                                setCategorieToEdit(cat);
                              }}
                            />
                          </span>
                        </Tooltip>

                        <Tooltip color="danger" content="Delete categorie">
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon
                              onClick={() => {
                                setVisibleDeleteModal();
                                setCategorieToDelete(cat);
                              }}
                            />
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Modal
                className=" mt-44"
                title="Edit categorie"
                open={openEditModal}
                onOk={() => {
                  setOpenEditModal(!openEditModal);
                  updateCategory(categorieToEdit._id);
                }}
                okButtonProps={{
                  style: {
                    backgroundColor: "green",
                    color: "white",
                  },
                }}
                onCancel={setVisibleEditModal}
              >
                <div className="border-1 border-gray-100">
                  <input
                    type="text"
                    value={categorieToEdit.name}
                    onChange={(e) =>
                      setCategorieToEdit({
                        ...categorieToEdit,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </Modal>

              <Modal
                className=" mt-44"
                title="Delete categorie"
                open={openDeleteModal}
                onOk={() => {
                  deleteCategory(categorieToDelete._id);
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
                  <p>Are you sure to delete this categorie?</p>
                </div>
              </Modal>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
