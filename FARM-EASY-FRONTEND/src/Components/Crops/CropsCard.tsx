import React, { useState } from "react";
import ContactSupplier from "./ContactSuplier-1"; // Import the ContactSupplier component

interface CropData {
  price: any;
  currency: any;
  rating: number;
  name: string;
  quantity: string;
  unit: string;
  imageUrl: string;
}

const CropsCard = ({ cropsData }: { cropsData: CropData[] }) => {
  const [open, setOpen] = useState(false); // Modal state
  const [selectedCrop, setSelectedCrop] = useState({
    name: "",
    imageUrl: "",
  }); // Store selected crop's name and image URL

  // Open/Close modal handlers
  const handleOpenModal = (cropName: string, imageUrl: string) => {
    setSelectedCrop({ name: cropName, imageUrl }); // Set crop name and image URL
    setOpen(true); // Open modal
  };

  const handleCloseModal = () => setOpen(false); // Close modal

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
  {cropsData.map((crop, index) => (
    <div
      key={index}
      className="shadow-lg rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition duration-300"
    >
      {/* Unique Image Section */}
      <div className="relative group">
        <img
          src={crop.imageUrl}
          alt={crop.name}
          className="w-full h-44  p-4 rounded-t-lg transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-bold">{crop.name}</p>
          <p className="text-sm">{crop.quantity} {crop.unit}</p>
        </div>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{crop.name}</h3>

        {/* Star Rating */}
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((star, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                i < crop.rating ? "text-yellow-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.058 3.247a1 1 0 00.95.691h3.416c.969 0 1.371 1.24.588 1.81l-2.762 2.004a1 1 0 00-.364 1.118l1.058 3.247c.3.921-.755 1.688-1.54 1.118l-2.762-2.004a1 1 0 00-1.175 0l-2.762 2.004c-.784.57-1.839-.197-1.54-1.118l1.058-3.247a1 1 0 00-.364-1.118L2.06 8.675c-.784-.57-.38-1.81.588-1.81h3.416a1 1 0 00.95-.691l1.058-3.247z" />
            </svg>
          ))}
        </div>

        {/* Price and Quantity */}
        <p className="text-lg font-semibold text-green-600 mb-1">
          {crop.price} {crop.currency}
        </p>
        <p className="text-sm text-gray-500">{crop.quantity} {crop.unit}</p>

        {/* Add to Cart Button */}
        {/* <button
          className="mt-4 w-full py-2 bg-[#FF9900] text-white font-semibold rounded hover:bg-[#FF7700] transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h18l-2 10H5L3 3zm3 12a3 3 0 106 0 3 3 0 00-6 0zM21 15a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Add to Cart
        </button> */}

        {/* Contact Supplier Button */}
        <button
          className="mt-3 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          onClick={() => handleOpenModal(crop.name, crop.imageUrl)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6V5a2 2 0 10-4 0v9m0 4h10m0 0l-2 2m2-2l-2-2"
            />
          </svg>
          Contact Supplier
        </button>
      </div>
    </div>
  ))}

  {/* Render the modal */}
  <ContactSupplier
    open={open}
    handleClose={handleCloseModal}
    cropName={selectedCrop.name}
    imageUrl={selectedCrop.imageUrl} // Pass the image URL to the modal
  />
</div>
</>
  );
};

export default CropsCard;