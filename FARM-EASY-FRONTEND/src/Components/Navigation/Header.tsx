import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem,
  Box, Button, Drawer, List, ListItem, ListItemText,
  Divider,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Dropdown icon
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { logout } from '../../Redux/Slicer/AuthSlice'; // Import the logout action
import { Sync, AccountCircle, Logout } from '@mui/icons-material';

const NavbarWithProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [productAnchorEl, setProductAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Open Drawer for mobile menu
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Open and close the dropdown on click
  const handleProductClick = (event: React.MouseEvent<HTMLElement>) => {
    setProductAnchorEl(event.currentTarget);
  };

  const handleProductClose = () => {
    setProductAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    handleProductClose();
  };
  
  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  // Extract user initials
  const getInitials = (name: string | undefined): string => {
    if (!name) return '';
    const nameParts = name.trim().split(' ');
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  // Mobile drawer menu for navigation
  const mobileMenu: JSX.Element = (
    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
      <List>
        <ListItem component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" sx={{ textTransform: 'capitalize' }} />
        </ListItem>
        <ListItem component={Link} to="/about" onClick={handleDrawerToggle}>
          <ListItemText primary="About" sx={{ textTransform: 'capitalize' }} />
        </ListItem>
        <ListItem component={Link} to="/sell-rent" onClick={handleDrawerToggle}>
          <ListItemText primary="Sell/Rent" sx={{ textTransform: 'capitalize' }} />
        </ListItem>
        <ListItem component={Link} to="/contact" onClick={handleDrawerToggle}>
          <ListItemText primary="Contact" sx={{ textTransform: 'capitalize' }} />
        </ListItem>
        <ListItem
          color="inherit"
          component={Link}
          to="producthome"
          onClick={handleProductClick}
          sx={{ textTransform: 'capitalize' }}>
          Products
        </ListItem>
        <ListItem color="inherit" component={Link} to="/sell-rent" sx={{ textTransform: 'capitalize' }}>Rental</ListItem>
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(0, 173, 255, 0.2)', // Light blue tint with transparency
          backdropFilter: 'blur(10px)', // Adds a blur effect to enhance the transparent look
          borderBottom: '1px solid rgba(0, 173, 255, 0.5)', // Blue-tinted border at the bottom
          paddingY: 0,
          boxShadow: 'none',
        
          overflowX: 'hidden' // Prevent overflow
        }}
      >
        <Toolbar sx={{ minHeight: '48px', paddingX: { xs: 1, sm: 2 },  }}> {/* Ensure no overflow */}
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Farm Easy</Typography>
              {mobileMenu}
              {isAuthenticated ? (
                <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
                  {user?.profileUrl ? (
                    <Avatar sx={{ width: 32, height: 32 }} src={user.profileUrl} alt={user?.username} />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32 }}>{getInitials(user?.username)}</Avatar>
                  )}
                </IconButton>
              ) : (
                <Button component={Link} to="/login" sx={{ backgroundColor: "#48CD50", color: "#fff" }}>Sign In</Button>
              )}
            </>
          ) : (
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" noWrap> {/* Ensure text does not overflow */}
                Farm Easy
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}> {/* Added flex properties */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{
                    textTransform: 'capitalize',
                    color: '#fff',
                    '&:hover': { color: 'rgba(0, 173, 255, 0.8)' }
                  }}
                >Home</Button>

                {/* Dropdown Trigger for "Products" */}
                <Button
                  onClick={handleProductClick}
                  endIcon={<ArrowDropDownIcon />} // Add a dropdown icon
                  sx={{
                    textTransform: 'capitalize',
                    color: '#fff',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: 'rgba(0, 173, 255, 0.8)' }
                  }}
                >
                  Services
                </Button>

                {/* Dropdown Menu */}
                <Menu
                  id="product-submenu"
                  anchorEl={productAnchorEl}
                  open={Boolean(productAnchorEl)}
                  onClose={handleProductClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center', // Centered horizontally under the button
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  sx={{
                    '& .MuiPaper-root': {
                      backgroundColor: '#f0f4f8', // Light, modern background color
                      color: '#1a202c', // Dark text for readability
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px', // Adjust padding for a clean look
                      transition: 'all 0.3s ease',
                    }
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/producthome"
                    sx={{
                      textTransform: 'capitalize',
                      padding: '10px 20px', // Clean padding for items
                      transition: 'color 0.3s ease',
                      '&:hover': { backgroundColor: '#e0f7fa', color: '#00796b' } // Modern hover effect
                    }}
                  >Products</MenuItem>
                  <MenuItem
                    component={Link}
                    to="/rentals"
                    sx={{
                      textTransform: 'capitalize',
                      padding: '10px 20px',
                      transition: 'color 0.3s ease',
                      '&:hover': { backgroundColor: '#e0f7fa', color: '#00796b' }
                    }}
                  >Rental</MenuItem>
                  <MenuItem
                    component={Link}
                    to="/crops"
                    sx={{
                      textTransform: 'capitalize',
                      padding: '10px 20px',
                      transition: 'color 0.3s ease',
                      '&:hover': { backgroundColor: '#e0f7fa', color: '#00796b' }
                    }}
                  >Crops</MenuItem>
                </Menu>
                
                <Button color="inherit" component={Link} to="/About" sx={{ textTransform: 'capitalize', color: '#fff', '&:hover': { color: 'rgba(0, 173, 255, 0.8)' } }}>About</Button>
                <Button color="inherit" component={Link} to="/contact" sx={{ textTransform: 'capitalize', color: '#fff', '&:hover': { color: 'rgba(0, 173, 255, 0.8)' } }}>Contact</Button>
                <Button color="inherit" component={Link} to="/awarenessvideos" sx={{ textTransform: 'capitalize', color: '#fff', '&:hover': { color: 'rgba(0, 173, 255, 0.8)' } }}>Awareness</Button>
              </Box>
              {isAuthenticated ? (
                <IconButton color="inherit" onClick={handleMenuClick}>
                  {user?.profileUrl ? (
                    <Avatar sx={{ width: 34, height: 34 }} src={user?.profileUrl} alt={user?.username} />
                  ) : (
                    <Avatar sx={{ width: 34, height: 34 }}>{getInitials(user?.username)}</Avatar>
                  )}
                </IconButton>
              ) : (
                <Button component={Link} to="/login" sx={{ backgroundColor: "#000d6b", color: "#fff", fontWeight: '600' }}>Sign In</Button>
              )}
            </Box> 
          )}
          {/* Profile Dropdown Menu */}
          {isAuthenticated && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 4,
                sx: { width: 300, borderRadius: '8px', marginTop: '8px' },
              }}
            >
              {/* Profile Info Section */}
              <Box sx={{ textAlign: 'center', padding: '16px 0', marginBottom: '20px', backgroundColor: '#ffe0b2', marginTop: '-8px' }}>
                {user?.profileUrl ? (
                  <Avatar sx={{ width: 64, height: 64, margin: 'auto' }} src={user.profileUrl} alt={user?.username} />
                ) : (
                  <Avatar sx={{ width: 64, height: 64, margin: 'auto' }}>{getInitials(user?.username)}</Avatar>
                )}
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '8px', textTransform: 'capitalize' }}>{user?.username}</Typography>
                <Typography variant="body2" color="textSecondary">{user?.email}</Typography>
              </Box>
              {/* Sync and Manage Account Section */}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Sync fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" sx={{ textTransform: 'capitalize' }}>madastake sike ayitu</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" sx={{ textTransform: 'capitalize' }}>Manage Profile</Typography>
              </MenuItem>
              {/* Divider */}
              <Divider />
              {/* Other Profiles Section */}
              <Box sx={{ padding: '0px 16px' }}>
                <Typography variant="body2" color="textSecondary" sx={{ textTransform: 'capitalize' }}>Other profiles</Typography>
                {/* Example Profiles */}
                <MenuItem>
                  <Avatar sx={{ width: 24, height: 24 }}>C</Avatar>
                  <Typography sx={{ marginLeft: '8px', textTransform: 'capitalize' }}>Color Themes</Typography>
                </MenuItem>
                <MenuItem>
                  <Avatar sx={{ width: 24, height: 24, backgroundColor: '#2196f3' }}>
                    <AccountCircle fontSize="small" />
                  </Avatar>
                  <Typography sx={{ marginLeft: '8px', textTransform: 'capitalize' }}>Want to be Seller</Typography>
                </MenuItem>
                {/* Logout Button */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit" sx={{ textTransform: 'capitalize' }}>Logout</Typography>
                </MenuItem>
              </Box>
            </Menu>
          )}
       
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingBottom: '64px', backgroundColor: 'black',  overflow: 'hidden' } } /> {/* Ensures no content underflows */}
    </>
  );
};

export default NavbarWithProfile;
