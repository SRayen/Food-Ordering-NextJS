import React from "react";
import { Input, Button } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
export default function SizesForm({
  formik,
  index,
  setSizes,
  sizes,
  selectedMenu,
  setSelectedMenu,
}) {
  const deleteField = () => {
    if (selectedMenu?.sizes) {
      const newSizes = selectedMenu.sizes.filter(
        (size) => selectedMenu.sizes.indexOf(size) !== index
      );

      setSelectedMenu({ ...selectedMenu, sizes: newSizes });
    } else {
      const newSizes = sizes.filter((size) => sizes.indexOf(size) !== index);
      setSizes(newSizes);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between items-center w-full md:flex-nowrap  mt-6">
      <Input
        type="text"
        label="name"
        placeholder="Enter name"
        radius={"full"}
        size={"md"}
        id={`sizes${index}.name`} // Correct name attribute for array element
        name={`sizes[${index}].name`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.sizes[index]?.name}
        disabled={formik.isSubmitting}
      />
      <Input
        type="text"
        label="price"
        placeholder="Enter your price"
        radius={"full"}
        size={"md"}
        id={`sizes${index}.price`} // Correct name attribute for array element
        name={`sizes[${index}].price`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.sizes[index]?.price}
        disabled={formik.isSubmitting}
      />
      <DeleteIcon
        onClick={() => deleteField()}
        className="w-16 h-6 text-[#F54180] cursor-pointer"
      />
    </div>
  );
}
