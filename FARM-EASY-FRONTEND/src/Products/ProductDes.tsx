import React from "react";

interface ProductCardProps {
    productData: {
    productName: string;
    productDescription: string;
    productPrice: string;
    sellerId: string;
    datePosted: string;
    productImageUrl: string;
    productCategory: string;
    productStock: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  const {
    productName,
    productDescription,
    productPrice,
    sellerId,
    datePosted,
    productImageUrl,
    productCategory,
    productStock,
  } = productData;

  return (
    <div className="flex flex-row shadow-lg p-4 gap-10 bg-white max-w-screen">
      <div className="text-center">
        {/* Image */}
        <img
          src={productImageUrl}
          alt={`${productName}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="mt-4">
          {/* Product Details */}
          <h3 className="text-lg font-bold text-gray-800">{productName}</h3>
          <p className="text-xl font-semibold text-green-600">₹ {productPrice}</p>
          <ul className="mt-3 space-y-1">
            <li>
              <span className="font-semibold">Category:</span> {productCategory}
            </li>
            <li>
              <span className="font-semibold">Stock:</span> {productStock} units
            </li>
            <li>
              <span className="font-semibold">Seller ID:</span> {sellerId}
            </li>
            <li>
              <span className="font-semibold">Posted On:</span> {datePosted}
            </li>
            <li>
              <span className="font-semibold">Description:</span> {productDescription}
            </li>
          </ul>
          <button
            className="mt-4 w-full bg-teal-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
