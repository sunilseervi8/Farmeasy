import { useState, useEffect } from 'react';
import VideoCards from '../Awarness/VideoCards'; 

const FarmingCourses = () => {
  // State to keep track of the active card and active button
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(1);
   const [query, setQuery] = useState<string>('Farming Machineries'); 


  const handleCardClick = (index: number) => {
    setActiveCard(index);   };

  const handleButtonClick = (index: number, newQuery: string) => {
    setActiveButton(index); 
    setQuery(newQuery); 
  };

  useEffect(() => {
    console.log(`Query updated: ${query}`);
  }, [query]); 

  return (
    <div className="bg-white text-gray-900 p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl  text-txt-blue font-bold">Unlock the Power of Modern Farming</h1>
        <p className="text-lg mt-2">Learn to Revolutionize Agriculture with the Latest Technology</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`py-2 px-4 rounded-full transition-transform duration-300 ${
            activeButton === 1 ? 'bg-blue-100 transform scale-105 text-txt-blue font-bold' : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleButtonClick(1, 'Farming Machineries related ')}
        >
          Machines
        </button>
        <button
          className={`py-2 px-4 rounded-full transition-transform duration-300 ${
            activeButton === 2 ? 'bg-blue-100 transform scale-105 text-txt-blue font-bold' : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleButtonClick(2,'Modern farming methods for different crops')}
        >
          Crops
        </button>
        <button
          className={`py-2 px-4 rounded-full transition-transform duration-300 ${
            activeButton === 3 ? 'bg-blue-100 transform scale-105 text-txt-blue font-bold' : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleButtonClick(3, 'farmer Loans')}
        >
          Loan
        </button>
        <button
          className={`py-2 px-4 rounded-full transition-transform duration-300 ${
            activeButton === 4 ? 'bg-blue-100 transform scale-105 text-txt-blue' : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleButtonClick(4, 'farmer Insurance ')}
        >
          Insurance
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 - Farming Machinery */}
        <div
          className={`p-6 rounded-lg shadow-lg transition-transform duration-300 cursor-pointer ${
            activeCard === 1 ? 'bg-blue-100 transform scale-105  text-txt-blue' : 'bg-white'
          }`}
          onClick={() => handleCardClick(1)}
        >
          <h2 className="text-xl  font-semibold mb-4">Farming Machinery</h2>
          <p className="text-gray-700 mb-6">
            This course covers the basics of modern farming machinery, including tractors, harvesters, and plowing machines.
          </p>
          <div className="flex justify-between items-center border-t border-gray-300 pt-4">
            <span className="text-sm text-gray-500">Machinery</span>
            <span className="text-sm text-gray-500">View More</span>
          </div>
        </div>

        {/* Card 2 - Modern Agriculture Techniques */}
        <div
          className={`p-6 rounded-lg shadow-lg transition-transform duration-300 cursor-pointer ${
            activeCard === 2 ? 'bg-blue-100 transform scale-105 text-txt-blue' : 'bg-white'
          }`}
          onClick={() => handleCardClick(2)}
        >
          <h2 className="text-xl font-semibold mb-4">Modern Agriculture Techniques</h2>
          <p className="text-gray-700 mb-6">
            Explore advanced agricultural techniques like precision farming, irrigation systems, and sustainable practices.
          </p>
          <div className="flex justify-between items-center border-t border-gray-300 pt-4">
            <span className="text-sm text-gray-500">Modern Farming</span>
            <span className="text-sm text-gray-500">View More</span>
          </div>
        </div>

        {/* Card 3 - Sustainable Cultivation Techniques */}
        <div
          className={`p-6 rounded-lg shadow-lg transition-transform duration-300 cursor-pointer ${
            activeCard === 3 ? 'bg-blue-100 transform scale-105  text-txt-blue' : 'bg-white'
          }`}
          onClick={() => handleCardClick(3)}
        >
          <h2 className="text-xl font-semibold mb-4">Sustainable Cultivation Techniques</h2>
          <p className="text-gray-700 mb-6">
            This course focuses on sustainable cultivation techniques, such as crop rotation, no-till farming, and organic fertilizers.
          </p>
          <div className="flex justify-between items-center border-t border-gray-300 pt-4">
            <span className="text-sm text-gray-500">Crops</span>
            <span className="text-sm text-gray-500">View More</span>
          </div>
        </div>
      </div>
      {/* Video Cards Section */}
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center">Farming Videos</h1>
        <VideoCards query={query} /> {/* Pass the updated query to VideoCards */}
      </div>
    </div>
  );
};

export default FarmingCourses;
