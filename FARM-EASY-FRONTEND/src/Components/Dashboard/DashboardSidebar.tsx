import React, { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  useMediaQuery,
  Fab,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'; // Floating button icon
import AgricultureIcon from '@mui/icons-material/Agriculture'; // Icon for Crops
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // Icon for Rentals
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ResponsiveSidebar = () => {
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeRoute, setActiveRoute] = useState('home'); // Track the active route

  const dispatch = useDispatch();

  // Media Queries for different screen sizes
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery('(min-width: 380px) and (max-width: 1200px)'); // Medium screens (phones and small tablets)
  const isSmallScreen = useMediaQuery('(max-width: 380px)');

  // Sidebar content with routing
  const sidebarContent = (
    <>
      {/* Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#f0f0f0' }}>
        <Avatar src="path/to/avatar.jpg" alt="Profile Image" sx={{ width: 48, height: 48, marginRight: 2 }} />
        <Typography variant="body1" sx={{ color: '#000d6b', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Alice-Doe
        </Typography>
      </Box>

      {/* Sidebar Menu */}
      <List>
        <ListItem
          component={Link}
          to="overview"
          onClick={() => setActiveRoute('home')}
          sx={{
            backgroundColor: activeRoute === 'home' ? '#000d6b' : 'inherit',
            color: activeRoute === 'home' ? 'white' : '#000d6b',
          }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: activeRoute === 'home' ? 'white' : '#000d6b'}} />
          </ListItemIcon>
          {!isMediumScreen && <ListItemText primary="Home" sx={{ color: activeRoute === 'home' ? 'white' : '#000d6b' }} />}
        </ListItem>

        {/* Other items */}
        <ListItem
          component={Link}
          to="sellerProduct"
          onClick={() => setActiveRoute('products')}
          sx={{
            backgroundColor: activeRoute === 'products' ? '#000d6b' : 'inherit',
            color: activeRoute === 'products' ? 'white' : '#000d6b',
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: activeRoute === 'products' ? 'white' : '#000d6b', '&:hover': { color: 'white' } }} />
          </ListItemIcon>
          {!isMediumScreen && (
            <ListItemText primary="Products" sx={{ color: activeRoute === 'products' ? 'white' : '#000d6b' }} />
          )}
        </ListItem>

        <ListItem
          component={Link}
          to="sellerCard"
          onClick={() => setActiveRoute('seller')}
          sx={{
            backgroundColor: activeRoute === 'seller' ? '#000d6b' : 'inherit',
            color: activeRoute === 'seller' ? 'white' : '#000d6b',
          }}
        >
          <ListItemIcon>
            <PeopleIcon sx={{ color: activeRoute === 'seller' ? 'white' : '#000d6b', '&:hover': { color: 'white' } }} />
          </ListItemIcon>
          {!isMediumScreen && (
            <ListItemText primary="Seller" sx={{ color: activeRoute === 'seller' ? 'white' : '#000d6b' }} />
          )}
        </ListItem>

        {/* Rentals Item (replacing Settings) */}
        <ListItem
          component={Link}
          to="rentals"
          onClick={() => setActiveRoute('rentals')}
          sx={{
            backgroundColor: activeRoute === 'rentals' ? '#000d6b' : 'inherit',
            color: activeRoute === 'rentals' ? 'white' : '#000d6b',
          }}
        >
          <ListItemIcon>
            <DirectionsCarIcon sx={{ color: activeRoute === 'rentals' ? 'white' : '#000d6b', '&:hover': { color: 'white' } }} />
          </ListItemIcon>
          {!isMediumScreen && (
            <ListItemText primary="Rentals" sx={{ color: activeRoute === 'rentals' ? 'white' : '#000d6b' }} />
          )}
        </ListItem>

        {/* New Route for Crops */}
        <ListItem
          component={Link}
          to="crops"
          onClick={() => setActiveRoute('crops')}
          sx={{
            backgroundColor: activeRoute === 'crops' ? '#000d6b' : 'inherit',
            color: activeRoute === 'crops' ? 'white' : '#000d6b',
          }}
        >
          <ListItemIcon>
            <AgricultureIcon sx={{ color: activeRoute === 'crops' ? 'white' : '#000d6b', '&:hover': { color: 'white' } }} />
          </ListItemIcon>
          {!isMediumScreen && (
            <ListItemText primary="Crops" sx={{ color: activeRoute === 'crops' ? 'white' : '#000d6b' }} />
          )}
        </ListItem>

        <ListItem
          component={Link}
          to="/profile"
          onClick={() => setActiveRoute('profile')}
          sx={{
            backgroundColor: activeRoute === 'profile' ? '#000d6b' : 'inherit',
            color: activeRoute === 'profile' ? 'white' : '#000d6b',
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: activeRoute === 'profile' ? 'white' : '#000d6b', '&:hover': { color: 'white' } }} />
          </ListItemIcon>
          {!isMediumScreen && (
            <ListItemText primary="Profile" sx={{ color: activeRoute === 'profile' ? 'white' : '#000d6b' }} />
          )}
        </ListItem>
      </List>
    </>
  );

  return (
    <div>
      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: isLargeScreen ? 240 : isMediumScreen ? 80 : 240, // Full width on large, icon-only on medium, default width on small
            boxSizing: 'border-box',
            backgroundColor: '#f0f0f0', // Light background
          },
        }}
      >
        {sidebarContent}
      </Drawer>
      {/* Floating Action Button for Small Screens (less than 380px) */}
      {isSmallScreen && (
        <Fab
          color="primary"
          aria-label="open sidebar"
          onClick={() => setOpenSidebar(true)}
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            backgroundColor: '#000d6b',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#003366', // Darker hover effect
            },
          }}
        >
          <AccessibilityNewIcon /> {/* Floating Button Icon */}
        </Fab>
      )}

      {/* Main Content */}
      <Box
        sx={{
          marginLeft: isLargeScreen ? '50px' : isMediumScreen ? '80px' : '0',
          width: isSmallScreen ? '100%' : 'auto',
        }}
      >
        {/* Content goes here */}
      </Box>
    </div>
  );
};

export default ResponsiveSidebar;
