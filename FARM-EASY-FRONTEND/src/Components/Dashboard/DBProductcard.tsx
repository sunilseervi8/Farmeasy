import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Modal,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns'; // For date formatting

// Data structure for product
interface Product {
  id: number;
  ProductName: string;
  ProductDescription: string;
  ProductPrice: number;
  SellerId: string;
  ProductDatePosted: Date;
  ProductImageUrl: string;
  Productcategory: string;
  ProductStock: number;
}

// Modal styling for editing
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ProductTable: React.FC = () => {
  const initialData: Product[] = [
    {
      id: 1,
      ProductName: 'Tractor',
      ProductDescription: 'Powerful farming equipment',
      ProductPrice: 10000,
      SellerId: 'Seller123',
      ProductDatePosted: new Date(),
      ProductImageUrl: 'https://via.placeholder.com/50',
      Productcategory: 'Agriculture',
      ProductStock: 50,
    },
    // Additional mock data can be added here
  ];

  const [products, setProducts] = useState<Product[]>(initialData);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Handle Delete
  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Handle Edit
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setOpenModal(true);
  };

  // Handle Save after Editing
  const handleSave = () => {
    if (editProduct) {
      setProducts(products.map(p => (p.id === editProduct.id ? editProduct : p)));
    }
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        '& .MuiTableCell-head': {
          backgroundColor: '#000d6b', // Header background color
          color: '#ffffff', // Header text color (white for contrast)
        },
        '& .MuiTableCell-body': {
          backgroundColor: '#f0f0f0', // Light cell background color
        },
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: '#000d6b' }}>
        Product Table
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Seller ID</TableCell>
              <TableCell>Date Posted</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar src={product.ProductImageUrl} alt={product.ProductName} />
                </TableCell>
                <TableCell>{product.ProductName}</TableCell>
                <TableCell>{product.ProductDescription}</TableCell>
                <TableCell>{product.ProductPrice}</TableCell>
                <TableCell>{product.SellerId}</TableCell>
                <TableCell>{format(new Date(product.ProductDatePosted), 'MM/dd/yyyy')}</TableCell>
                <TableCell>{product.Productcategory}</TableCell>
                <TableCell>{product.ProductStock}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product)}>
                    <EditIcon sx={{ color: '#000d6b' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <DeleteIcon sx={{ color: '#FF6B35' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit Product
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            value={editProduct?.ProductName}
            onChange={(e) => setEditProduct({ ...editProduct, ProductName: e.target.value } as Product)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product Price"
            type="number"
            value={editProduct?.ProductPrice}
            onChange={(e) => setEditProduct({ ...editProduct, ProductPrice: Number(e.target.value) } as Product)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product Stock"
            type="number"
            value={editProduct?.ProductStock}
            onChange={(e) => setEditProduct({ ...editProduct, ProductStock: Number(e.target.value) } as Product)}
          />
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: '#000d6b', color: '#ffffff' }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductTable;
