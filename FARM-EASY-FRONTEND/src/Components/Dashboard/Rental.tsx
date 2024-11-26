import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Rental {
  id: number;
  rentalTitle: string;
  rentalDescription: string;
  rentalPrice: number;
  rentalLocation: string;
  rentalNumberPlate: string;
  rentalImage: string;
}

const RentalTable: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([
    {
      id: 1,
      rentalTitle: 'Tractor',
      rentalDescription: 'Powerful tractor for rent',
      rentalPrice: 1200,
      rentalLocation: 'Farmville',
      rentalNumberPlate: 'MH12AB1234',
      rentalImage: 'tractor.jpg',
    },
    {
      id: 2,
      rentalTitle: 'Tiller',
      rentalDescription: 'High-performance tiller',
      rentalPrice: 800,
      rentalLocation: 'Greenfield',
      rentalNumberPlate: 'MH13CD5678',
      rentalImage: 'tiller.jpg',
    },
  ]);

  const handleEdit = (id: number) => {
    console.log('Edit rental with ID:', id);
    // Logic to handle edit can be added here
  };

  const handleDelete = (id: number) => {
    setRentals(rentals.filter((rental) => rental.id !== id));
  };

  const handleAddRental = () => {
    console.log('Add new rental');
    // Logic to handle adding a new rental
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="rental table">
        <TableHead sx={{ backgroundColor: '#000d6b' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Rental Title</TableCell>
            <TableCell sx={{ color: 'white' }}>Description</TableCell>
            <TableCell sx={{ color: 'white' }}>Price</TableCell>
            <TableCell sx={{ color: 'white' }}>Location</TableCell>
            <TableCell sx={{ color: 'white' }}>Number Plate</TableCell>
            <TableCell sx={{ color: 'white' }}>Image</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentals.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell>{rental.rentalTitle}</TableCell>
              <TableCell>{rental.rentalDescription}</TableCell>
              <TableCell>{rental.rentalPrice}</TableCell>
              <TableCell>{rental.rentalLocation}</TableCell>
              <TableCell>{rental.rentalNumberPlate}</TableCell>
              <TableCell>
                <img src={rental.rentalImage} alt={rental.rentalTitle} style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(rental.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(rental.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ margin: '20px' }}
        onClick={handleAddRental}
      >
        Add Rental
      </Button>
    </TableContainer>
  );
};

export default RentalTable;
