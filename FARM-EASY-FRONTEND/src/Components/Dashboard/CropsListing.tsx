import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';

interface Crop {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  imageUrl: string;
}

const CropTable: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('FOOD GRAINS');

  const crops: Crop[] = [
    { id: 1, name: 'Wheat', category: 'FOOD GRAINS', quantity: 100, unit: 'kg', price: 1200, imageUrl: 'wheat.jpg' },
    { id: 2, name: 'Rice', category: 'FOOD GRAINS', quantity: 200, unit: 'kg', price: 1800, imageUrl: 'rice.jpg' },
    { id: 3, name: 'Cotton', category: 'COMMERCIAL CROPS', quantity: 150, unit: 'kg', price: 2500, imageUrl: 'cotton.jpg' },
    { id: 4, name: 'Sunflower', category: 'OIL SEEDS', quantity: 300, unit: 'kg', price: 900, imageUrl: 'sunflower.jpg' },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredCrops = crops.filter(crop => crop.category === selectedCategory);

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Category Filter Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Button
          onClick={() => handleCategoryChange('COMMERCIAL CROPS')}
          sx={{
            backgroundColor: selectedCategory === 'COMMERCIAL CROPS' ? '#000d6b' : '#f0f0f0',
            color: selectedCategory === 'COMMERCIAL CROPS' ? 'white' : '#000d6b',
            margin: '0 10px',
            padding: '10px 20px',
            '&:hover': { backgroundColor: '#000d6b', color: 'white' },
          }}
        >
          COMMERCIAL CROPS
        </Button>
        <Button
          onClick={() => handleCategoryChange('FOOD GRAINS')}
          sx={{
            backgroundColor: selectedCategory === 'FOOD GRAINS' ? '#000d6b' : '#f0f0f0',
            color: selectedCategory === 'FOOD GRAINS' ? 'white' : '#000d6b',
            margin: '0 10px',
            padding: '10px 20px',
            '&:hover': { backgroundColor: '#000d6b', color: 'white' },
          }}
        >
          FOOD GRAINS
        </Button>
        <Button
          onClick={() => handleCategoryChange('OIL SEEDS')}
          sx={{
            backgroundColor: selectedCategory === 'OIL SEEDS' ? '#000d6b' : '#f0f0f0',
            color: selectedCategory === 'OIL SEEDS' ? 'white' : '#000d6b',
            margin: '0 10px',
            padding: '10px 20px',
            '&:hover': { backgroundColor: '#000d6b', color: 'white' },
          }}
        >
          OIL SEEDS
        </Button>
      </Box>

      {/* Crop Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#000d6b' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Category</TableCell>
              <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
              <TableCell sx={{ color: 'white' }}>Unit</TableCell>
              <TableCell sx={{ color: 'white' }}>Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCrops.map((crop) => (
              <TableRow key={crop.id}>
                <TableCell>{crop.name}</TableCell>
                <TableCell>{crop.category}</TableCell>
                <TableCell>{crop.quantity}</TableCell>
                <TableCell>{crop.unit}</TableCell>
                <TableCell>{crop.price}</TableCell>
                <TableCell>
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CropTable;
