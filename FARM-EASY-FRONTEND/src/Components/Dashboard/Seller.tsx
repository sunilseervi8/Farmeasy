import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  CardActions,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

// Seller interface
interface Seller {
  FullName: string;
  IsVerified: boolean;
  ProfileImg?: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  updateAt: Date;
}

const SellerCard: React.FC = () => {
  const [seller, setSeller] = useState<Seller>({
    FullName: 'John Doe',
    IsVerified: false, // Change to true if the seller is already verified
    ProfileImg: 'https://via.placeholder.com/100',
    Address: '123 Main St',
    City: 'New York',
    State: 'NY',
    ZipCode: '10001',
    Country: 'USA',
    updateAt: new Date(),
  });

  // Function to handle approving the seller
  const handleApprove = () => {
    setSeller((prevSeller) => ({ ...prevSeller, IsVerified: true }));
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 3,
        boxShadow: 3,
        backgroundColor: seller.IsVerified ? '#E0F7FA' : '#FDEDEC',
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              src={seller.ProfileImg}
              alt={seller.FullName}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" component="div">
              {seller.FullName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {seller.Address}, {seller.City}, {seller.State}, {seller.ZipCode},{' '}
              {seller.Country}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Last updated: {seller.updateAt.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          {seller.IsVerified ? (
            <Typography
              variant="h6"
              sx={{ color: '#388E3C', display: 'flex', alignItems: 'center' }}
            >
              <CheckCircleOutlineIcon sx={{ mr: 1 }} />
              Verified Seller
            </Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{ color: '#E53935', display: 'flex', alignItems: 'center' }}
            >
              <CancelIcon sx={{ mr: 1 }} />
              Not Verified
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Card Actions for Approval Button */}
      <CardActions>
        {!seller.IsVerified && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApprove}
            sx={{
              backgroundColor: '#1A659E',
              '&:hover': { backgroundColor: '#004E89' },
            }}
          >
            Approve Seller
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SellerCard;
