import React, { useState, useEffect } from 'react';
import '../Components/Crops/Crops.css';
import CropsCard from '../Components/Crops/CropsCard';
import AddCropModel from '../Components/Crops/AddCropsModel';
import { Grid } from '@mui/material';
import { GetAllCrops } from '../Service/CropService';

// Define Crop type
interface Crop {
  price:any;
  currency:any;
  name: string;
  quantity: string;
  unit: string;
  rating:any;
  imageUrl: string;
  category: string; // Added category field
}

const CropGrid: React.FC = () => {
  // Initial local crop data with categories
  const localCrops: Crop[] = [
    { name: 'RICE', quantity: '1,378.25', unit: 'Lakh Tonnes', imageUrl: 'https://upag.gov.in/assets/png/2.png', category: 'Food Grains', currency:'INR',price:'20000', rating:'' },
    { name: 'WHEAT', quantity: '1,132.92', unit: 'Lakh Tonnes', imageUrl: 'https://upag.gov.in/assets/png/1.png', category: 'Food Grains',currency:'INR', price:'20000', rating:''},
    { name: 'MAIZE', quantity: '376.65', unit: 'Lakh Tonnes', imageUrl: 'https://upag.gov.in/assets/png/3.png', category: 'Food Grains', currency:'INR', price:'20000', rating:''},
    { name: 'GRAM', quantity: '110.39', unit: 'Lakh Tonnes', imageUrl: 'https://upag.gov.in/assets/png/5.png', category: 'Food Grains',currency:'INR',price:'20000', rating:''},
    { name: 'BAJRA', quantity: '107.16', unit: 'Lakh Tonnes', imageUrl: 'https://upag.gov.in/assets/png/4.png', category: 'Food Grains',currency:'INR', price:'20000', rating:''},
    { name: 'JOWAR', quantity: '50.34', unit: 'Lakh Tonnes', imageUrl: 'https://upag.gov.in/assets/png/6.png', category: 'Food Grains',price:'20000',currency:'INR', rating:''},
    { name: 'COTTON', quantity: '200.50', unit: 'Lakh Tonnes', imageUrl: 'https://upag.gov.in/assets/png/7.png', category: 'Commercial Crops',currency:'INR', price:'20000', rating:''},
    { name: 'SOYBEAN', quantity: '300.45', unit: 'Lakh Tonnes', imageUrl: 'https://upag.gov.in/assets/png/8.png', category: 'Oil Seeds',currency:'INR', price:'20000', rating:''},
  ];

  const [crops, setCrops] = useState<Crop[]>(localCrops);
  const [selectedCategory, setSelectedCategory] = useState<string>('Food Grains'); // State to track selected category

  // Fetch data from server and combine it with local data
  useEffect(() => {
    GetAllCrops().then((serverCrops: Crop[]) => {
      // Combine server crops with local crops
      setCrops([...localCrops, ...serverCrops]);
    });
  }, []);

  // Filter crops based on selected category
  const filteredCrops = crops.filter((crop) => crop.category === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-[#E0F2FE] p-8">
  <div className="max-w-full mx-auto">
    <Grid className="text-center mb-8">
      <h1 className="text-4xl font-bold text-[#000d6b] ">Crop Production</h1>
    </Grid>

    {/* Floating AddCropModel button in the bottom-right corner */}
    <div className="fixed bottom-8 right-8 z-30">
      <button className="bg-[#000d6b] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#000a56] transition-all">
        <AddCropModel />
      </button>
    </div>

    {/* Navigation buttons */}
    <Grid className="text-center mb-10">
      <div className="button-group flex justify-center space-x-6">
        <Grid>
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold ${
              selectedCategory === 'Commercial Crops' ? 'bg-[#000d6b] text-white' : 'bg-white text-[#000d6b] border border-[#000d6b]'
            } hover:bg-[#000d6b] hover:text-white transition-all`}
            onClick={() => setSelectedCategory('Commercial Crops')}
          >
            COMMERCIAL CROPS
          </button>
        </Grid>
        <Grid>
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold ${
              selectedCategory === 'Food Grains' ? 'bg-[#000d6b] text-white' : 'bg-white text-[#000d6b] border border-[#000d6b]'
            } hover:bg-[#000d6b] hover:text-white transition-all`}
            onClick={() => setSelectedCategory('Food Grains')}
          >
            FOOD GRAINS
          </button>
        </Grid>
        <Grid>
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold ${
              selectedCategory === 'Oil Seeds' ? 'bg-[#000d6b] text-white' : 'bg-white text-[#000d6b] border border-[#000d6b]'
            } hover:bg-[#000d6b] hover:text-white transition-all`}
            onClick={() => setSelectedCategory('Oil Seeds')}
          >
            OIL SEEDS
          </button>
        </Grid>
      </div>
    </Grid>

    {/* Pass the filtered crops data to the CropsCard component */}
    <CropsCard cropsData={filteredCrops} />
  </div>
</div>
  )
};

export default CropGrid;
