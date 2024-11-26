import React from "react";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

const ProductCards: React.FC<{
   productData: {
    productName: string;
    productDescription: string;
    productPrice: string;
    sellerId: string;
    datePosted: string;
    productImageUrl: string;
    productCategory: string;
    ProductStock:number;
  }[];
}> = ({ productData }) => {
  // console.log("product",productData[0].productImageUrl)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-4 p-4 xl:mr-[15px]">
      {productData.map((product, index) => (
        <div
          key={index}
          className="shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
        >
          {/* Product Image */}
          <img
            src={product.productImageUrl}
            alt={product.productName}
            className="w-full p-3  bg-white h-40 object-cover"/>
          {/* Product Details */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-txt-blue truncate">
              {product.productName}
            </h3>
            
            <p className="text-xl font-semibold text-txt-blue mt-2">
              ${product.productPrice}
            </p>
            <p className="text-gray-500 mt-1">Category: {product.productCategory}</p> 
           <p className="text-gray-500">Stock: {product.ProductStock}</p>
            <p className="text-gray-500">Seller ID: {product.sellerId}</p>
            <p className="text-gray-500">
              Posted on: {new Date(product.datePosted).toLocaleDateString()}
            </p>

            {/* Contact Supplier Button */}
            <button className="flex items-center justify-center text-white py-2 px-4 mt-4 bg-custom-blue rounded-md hover:bg-hover-blue transition-all duration-200 ease-in-out w-full">
              <AddIcCallIcon sx={{ fontSize: 18, marginRight: "8px", }} />
              Contact Supplier
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
