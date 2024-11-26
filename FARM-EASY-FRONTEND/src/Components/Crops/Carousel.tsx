import React, { useState } from 'react';
import { FaHeart, FaArrowRight, FaComment, FaUser } from 'react-icons/fa'; // Importing icons

const CardGrid: React.FC<{
  productData: {
    productName: string;
    productDescription: string;
    productPrice: string;
    sellerId: string;
    productDatePosted: string;
    productImageUrl: string;
    productCategory: string;
    ProductStock: number;
  }[];
}> = ({ productData }) => {
  const [visibleCards, setVisibleCards] = useState(3);

  const loadMoreCards = () => {
    setVisibleCards((prev) => prev + 3);
  };
  // console.log("color"+productData[0].productPostedDate); 
  // Function to truncate the product name if it's too long
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  return (
    <section className="py-12 bg-gray-50 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold text-gray-800">Farm Machineries</h2>
        <button className="bg-custom-blue text-white p-2 rounded-full hover:bg-hover-blue transition duration-300">
          <FaArrowRight />
        </button>
      </div>
      <div className="container mx-auto px-4">
        {/* Cards Grid */}
        <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productData.slice(0, visibleCards).map((card, index) => (
            <div
              key={index}
              onClick={() => alert(`Navigating to ${card.productName}`)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <img
                src={card.productImageUrl}
                alt={card.productName}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 relative">
                {/* Date and Like Button */}
                <div className="flex justify-between items-center">
                  <span className="block text-sm text-txt-blue">
                  {card.productDatePosted.slice(0,10)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering card click
                    }}
                    className="text-red-500"
                  >
                    <FaHeart className="text-gray-400" />
                  </button>
                </div>

                {/* Truncated Title with Smaller Font Size */}
                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                  {truncateText(card.productName, 26)} {/* Limit to 20 characters */}
                </h3>

                {/* Author and Comments */}
                <div className="flex justify-between space-x-2 mt-3 text-grey-700 text-sm">
                  <span className="flex items-center">
                    <FaUser className="mr-1" /> Seller: {card.sellerId}
                  </span>
                  <span className="flex items-center ml-4">
                    <FaComment className="mr-1" /> Comments: 3
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Load More Button */}
        {visibleCards < productData.length && (
          <div className="absolute bottom-0 right-0 mb-8 mr-8">
            <button
              onClick={loadMoreCards}
              className="px-8 py-3 bg-custom-blue text-white rounded-full hover:bg-hover-blue transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardGrid;
