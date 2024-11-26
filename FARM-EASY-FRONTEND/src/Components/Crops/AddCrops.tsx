import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface AddProductFormProps {
  handleClose: () => void;
}

interface FormValues {
  cropName: string;
  category: string;
  quantity: number | string;
  unit: string;
  price: number | string;
  image: File | null;
}

const AddCropForm: React.FC<AddProductFormProps> = ({ handleClose }) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      cropName: "",
      category: "",
      quantity: "",
      unit: "Select Unit",
      price: "",
      image: null,
    },
    validationSchema: Yup.object({
      cropName: Yup.string()
        .required("Crop Name is required")
        .min(2, "Crop Name must be at least 2 characters"),
      category: Yup.string().required("Category is required"),
      quantity: Yup.number()
        .required("Quantity is required")
        .positive("Quantity must be a positive number"),
      unit: Yup.string().required("Unit is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be a positive number"),
      image: Yup.mixed().required("Image is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Replace with real submission logic
      handleClose(); // Close the modal after form submission
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    formik.setFieldValue("image", file);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto border border-gray-300 my-5">
      <h2 className="text-txt-blue text-2xl font-bold flex items-center mb-2">
        <span role="img" aria-label="package" className="mr-2">
          📦
        </span>
        Add Your Crops
      </h2>
      <p className="text-gray-500 mb-1">
        It will just take{" "}
        <span className="text-txt-blue font-semibold">2 minutes</span> of your
        time{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </p>
      <p className="text-gray-700 mb-4">
        Just give us a little more details and you are good to go.
      </p>

      <form onSubmit={formik.handleSubmit}>
        {/* Crop Name */}
        <div className="mb-4">
          <label
            htmlFor="cropName"
            className="block text-sm font-medium text-gray-700"
          >
            Crop Name
          </label>
          <input
            type="text"
            id="cropName"
            {...formik.getFieldProps("cropName")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
          />
          {formik.touched.cropName && formik.errors.cropName ? (
            <div className="text-red-500 text-sm">{formik.errors.cropName}</div>
          ) : null}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            {...formik.getFieldProps("category")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          ) : null}
        </div>

        {/* Quantity and Unit */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Quantity */}
          <div className="col-span-1">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              {...formik.getFieldProps("quantity")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
            ) : null}
          </div>

          {/* Unit */}
          <div className="col-span-1">
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700"
            >
              Unit
            </label>
            <select
              id="unit"
              {...formik.getFieldProps("unit")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            >
              <option value="Select Unit">Select Unit</option>
              <option value="Kilograms">Kilograms</option>
              <option value="Grams">Grams</option>
              <option value="Lakh Tonnes">Lakh Tonnes</option>
              <option value="Pieces">Pieces</option>
            </select>
            {formik.touched.unit && formik.errors.unit ? (
              <div className="text-red-500 text-sm">{formik.errors.unit}</div>
            ) : null}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            {...formik.getFieldProps("price")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          ) : null}
        </div>

        {/* Upload Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <label className="border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-md p-4 flex justify-center items-center cursor-pointer transition-colors duration-200 ease-in-out">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-center">
              <span className="block text-lg">🖼️</span>
              <span className="mt-2">Upload Image</span>
            </div>
          </label>
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-custom-blue text-white p-3 rounded-md shadow hover:bg-hover-blue transition duration-300"
        >
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddCropForm;
