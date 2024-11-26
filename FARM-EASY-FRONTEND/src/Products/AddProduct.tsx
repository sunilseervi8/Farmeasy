import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { product } from '../Service/Product';

interface ProductFormValues {
  productName: string;
  productDescription: string;
  productPrice: string;
  sellerId: string;
  productImageUrl: string;
  productCategory: string;
  productStock: string;
}

const AddProductForm: React.FC = () => {
  const category = [
    'Select',
    'Tractors',
    'Tillage Equipment',
    'Seeding Equipment',
    'Ladndscape',
    'Crop Protection',
    'Harvest Equipment',
    'Post Harvest',
    'Haulage',
  ];

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      productName: '',
      productDescription: '',
      productPrice: '',
      sellerId: '',
      productImageUrl: '',
      productCategory: 'Select',
      productStock: '',
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product Name is required'),
      productDescription: Yup.string(),
      productPrice: Yup.number().required('Product Price is required').typeError('Product Price must be a number'),
      // sellerId: Yup.string().required('Seller ID is required'),
      productImageUrl: Yup.string().url('Invalid URL format'),
      productCategory: Yup.string().required('Product Category is required').notOneOf(['Select'], 'Please select a category'),
      productStock: Yup.number().required('Product Stock is required').typeError('Stock must be a number'),
    }),
    
    
    onSubmit: (values, { resetForm }) => {
      console.log('Form Submitted:', values);
      product(values);
      resetForm();
    },
  });

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       formik.setFieldValue('productImageUrl', reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center">Add New Product</h2>

        {/* Product Name */}
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formik.touched.productName && formik.errors.productName ? (
            <div className="text-red-600 text-sm">{formik.errors.productName}</div>
          ) : null}
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productDescription}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          ></textarea>
          {formik.touched.productDescription && formik.errors.productDescription ? (
            <div className="text-red-500 text-sm">{formik.errors.productDescription}</div>
          ) : null}
        </div>

        {/* Product Price */}
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productPrice}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formik.touched.productPrice && formik.errors.productPrice ? (
            <div className="text-red-600 text-sm">{formik.errors.productPrice}</div>
          ) : null}
        </div>

        {/* Product Category */}
        <div>
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
            Product Category
          </label>
          <select
            id="productCategory"
            name="productCategory"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productCategory}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            {category.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {formik.touched.productCategory && formik.errors.productCategory ? (
            <div className="text-red-600 text-sm">{formik.errors.productCategory}</div>
          ) : null}
        </div>

        {/* Product Stock */}
        <div>
          <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
            Product Stock
          </label>
          <input
            type="number"
            id="productStock"
            name="productStock"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productStock}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formik.touched.productStock && formik.errors.productStock ? (
            <div className="text-red-600 text-sm">{formik.errors.productStock}</div>
          ) : null}
        </div>

        {/* Display Image Preview */}
        {formik.values.productImageUrl && (
          <div className="mt-4">
            <img src={formik.values.productImageUrl} alt="Product Preview" className="w-full h-48 object-cover rounded-md" />
          </div>
        )}

        {/* Product Image Upload */}
        <div>
          <label htmlFor="uploadImage" className="block text-sm font-medium text-gray-700">
            Upload Product Image
          </label>
          <input
            type="file"
            id="uploadImage"
            name="uploadImage"
            accept="image/*"
            // onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-custom-blue text-white font-bold rounded-md hover:bg-hover-blue focus:outline-none"
          >
            Add Product
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
