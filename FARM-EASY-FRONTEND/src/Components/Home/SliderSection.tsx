import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Veg1 from '/Images/login1.jpg';
import Veg2 from '/Images/login1.jpg';
import Veg3 from '/Images/login1.jpg';
import Veg4 from '/Images/login1.jpg';
import Veg5 from '/Images/login1.jpg';
import Veg6 from '/Images/login1.jpg';
import Veg7 from '/Images/login1.jpg';
import SProduct from './SliderCard';
import Slider from "react-slick";
import { Box, Typography, Container } from '@mui/material';
import {settings} from '../../Features/ReactCorosel';

const ProductSlider = () => {
  return (
    <Box sx={{ py: 2, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 'bold',
          color: 'black',
          padding: '16px',
        }}
      >
        Popular products      
      </Typography>
      {/* Slider Section */}
      <Container sx={{ mt: 5 }}>
        <Slider {...settings}>
          {[Veg1, Veg2, Veg3, Veg4, Veg5, Veg6, Veg7].map((image, index) => (
            <Box key={index} sx={{ p: 1 }}>
              <SProduct
                Image={image}
                Description="Celery potato scallion desert raisin horseradish spinach carrot"
              />
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default ProductSlider;