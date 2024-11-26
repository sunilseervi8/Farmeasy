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
  Avatar,
  Typography,
  Card,
  CardContent,
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

interface Rental {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  numberPlate: string;
  image: string;
}

interface Seller {
  id: number;
  fullName: string;
  isVerified: boolean;
  profileImg: string;
  city: string;
  state: string;
  country: string;
}

const AdminDashboard: React.FC = () => {
  // Sample data for crops, rentals, and sellers
  const [crops, setCrops] = useState<Crop[]>([
    { id: 1, name: 'Wheat', category: 'FOOD GRAINS', quantity: 100, unit: 'kg', price: 1200, imageUrl: 'wheat.jpg' },
    { id: 2, name: 'Cotton', category: 'COMMERCIAL CROPS', quantity: 50, unit: 'kg', price: 2200, imageUrl: 'cotton.jpg' },
  ]);

  const [rentals, setRentals] = useState<Rental[]>([
    { id: 1, title: 'Tractor Rental', description: 'High-powered tractor', price: 5000, location: 'Texas', numberPlate: 'TX12 ABC', image: 'tractor.jpg' },
    { id: 2, title: 'Plow Rental', description: 'Heavy-duty plow', price: 1500, location: 'California', numberPlate: 'CA10 XYZ', image: 'plow.jpg' },
  ]);

  const [sellers, setSellers] = useState<Seller[]>([
    { id: 1, fullName: 'John Doe', isVerified: false, profileImg: 'john.jpg', city: 'Austin', state: 'TX', country: 'USA' },
    { id: 2, fullName: 'Jane Smith', isVerified: true, profileImg: 'jane.jpg', city: 'San Francisco', state: 'CA', country: 'USA' },
  ]);

  const approveSeller = (id: number) => {
    setSellers((prevSellers) =>
      prevSellers.map((seller) =>
        seller.id === id ? { ...seller, isVerified: true } : seller
      )
    );
  };

  const deleteRental = (id: number) => {
    setRentals((prevRentals) => prevRentals.filter((rental) => rental.id !== id));
  };

  const deleteCrop = (id: number) => {
    setCrops((prevCrops) => prevCrops.filter((crop) => crop.id !== id));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Crop Listings Section */}
      <Typography variant="h5" gutterBottom sx={{ color: '#000d6b', fontWeight: 'bold' }}>
        Crop Listings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#000d6b' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Category</TableCell>
              <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
              <TableCell sx={{ color: 'white' }}>Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crops.map((crop) => (
              <TableRow key={crop.id}>
                <TableCell>{crop.name}</TableCell>
                <TableCell>{crop.category}</TableCell>
                <TableCell>{crop.quantity}</TableCell>
                <TableCell>${crop.price}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => deleteCrop(crop.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Rental Listings Section */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: '30px', color: '#000d6b', fontWeight: 'bold' }}>
        Rental Listings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#000d6b' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Title</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Location</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map((rental) => (
              <TableRow key={rental.id}>
                <TableCell>{rental.title}</TableCell>
                <TableCell>{rental.description}</TableCell>
                <TableCell>${rental.price}</TableCell>
                <TableCell>{rental.location}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => deleteRental(rental.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Seller Management Section */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: '30px', color: '#000d6b', fontWeight: 'bold' }}>
        Seller Management
      </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap="20px">
        {sellers.map((seller) => (
          <Card key={seller.id} sx={{ width: '300px', backgroundColor: seller.isVerified ? '#d4edda' : '#f8d7da' }}>
            <CardContent>
              <Box display="flex" justifyContent="center">
                <Avatar src={seller.profileImg} sx={{ width: 56, height: 56 }} />
              </Box>
              <Typography variant="h6" textAlign="center">{seller.fullName}</Typography>
              <Typography textAlign="center" color="textSecondary">{seller.city}, {seller.state}, {seller.country}</Typography>
              {!seller.isVerified && (
                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '10px' }} onClick={() => approveSeller(seller.id)}>
                  Approve Seller
                </Button>
              )}
              {seller.isVerified && (
                <Typography textAlign="center" sx={{ marginTop: '10px', color: '#28a745' }}>Verified</Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
