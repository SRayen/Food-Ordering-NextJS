import React from "react";
import { Input, Button } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
export default function ExtraIngredientPricesForm({
  formik,
  index,
  setExtraIngredientPrices,
  extraIngredientPrices,
  selectedMenu,
  setSelectedMenu,
}) {
  const deleteField = () => {
    if (selectedMenu?.extraIngredientPrices) {
      const newExtraIngredientPrices =
        selectedMenu.extraIngredientPrices.filter(
          (extraIngredientPrice) =>
            selectedMenu.extraIngredientPrices.indexOf(extraIngredientPrice) !==
            index
        );

      setSelectedMenu({
        ...selectedMenu,
        extraIngredientPrices: newExtraIngredientPrices,
      });
    } else {
      const newExtraIngredientPrices = extraIngredientPrices.filter(
        (extraIngredientPrice) =>
          extraIngredientPrices.indexOf(extraIngredientPrice) !== index
      );
      setExtraIngredientPrices(newExtraIngredientPrices);
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
        id={`extraIngredientPrices${index}.name`} // Correct name attribute for array element
        name={`extraIngredientPrices[${index}].name`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.extraIngredientPrices[index]?.name}
        disabled={formik.isSubmitting}
      />
      <Input
        type="text"
        label="price"
        placeholder="Enter your price"
        radius={"full"}
        size={"md"}
        id={`extraIngredientPrices${index}.price`} // Correct name attribute for array element
        name={`extraIngredientPrices[${index}].price`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.extraIngredientPrices[index]?.price}
        disabled={formik.isSubmitting}
      />
      <DeleteIcon
        onClick={() => deleteField()}
        className="w-16 h-6 text-[#F54180] cursor-pointer"
      />
    </div>
  );
}
