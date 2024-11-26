import React from 'react';

const CarSearchHeader = () => {
  return (
    <div className="relative h-[60vh]" style={{backgroundRepeat:'no-repeat', backgroundPosition:'no-repeat',background: 'linear-gradient(rgb(0, 13, 107, 0.6), rgb(0, 13, 107, 0.6))', backgroundImage: "url('https://cdn.pixabay.com/photo/2023/07/28/10/17/machinery-8154964_1280.jpg')"  }}>
      {/* Overlay to darken the image */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content centered over the background image */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Find the right product</h1>

        {/* Search bar container */}
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
          {/* Dropdown menu */}
          <select className="border-none bg-gray-100 p-3 text-gray-700 outline-none">
            <option>New</option>
            <option>Used</option>
          </select>

          {/* Input field */}
          <input
            type="text"
            placeholder="Type to select car name, e.g. John Deere Tractor"
            className="flex-grow p-3 outline-none bg-blue text-black"
          />

          {/* Search button */}
          <button className="bg-custom-blue text-white px-6 py-3 font-semibold hover:bg-hover-blue">
            Search
          </button>
        </div>

        {/* Extra navigation links (optional) */}
        <div className="flex space-x-4 text-sm mt-3">
          <a href="#" className="hover:underline">New product Discounts</a>
          <a href="#" className="hover:underline">Help Me Find A Rental</a>
        </div>
      </div>
    </div>
  );
};

export default CarSearchHeader;
