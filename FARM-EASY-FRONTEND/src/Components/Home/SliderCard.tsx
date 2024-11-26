import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const SProduct = ({ Image, Description }) => {
  return (
    <Card sx={{  boxShadow: 3 }}>
      <CardMedia
        component="img"
        image={Image}
        alt="Product Image"
        sx={{ width: 100, height: 100, mx: 'auto', mt: 2 }} // Adjusted size to 40px
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="center">
          {Description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SProduct;
