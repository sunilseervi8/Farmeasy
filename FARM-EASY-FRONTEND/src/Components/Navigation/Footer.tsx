import { Box, Grid,IconButton, Typography, Button, Link } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
const Footer = () => {
  return (
    <Box component="footer" sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#001f3f', color: '#ffffff', py: 10, px: 4 }}>
  {/* Creative Wave Separator */}
  <Box
    sx={{
      position: 'absolute',
      top: '-40px',
      left: 0,
      width: '100%',
      height: '80px',
      background: 'radial-gradient(circle, rgba(0,130,255,1) 0%, rgba(0,31,63,1) 100%)',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 60%)',
    }}
  />

  <Grid container spacing={6} justifyContent="center" sx={{ zIndex: 1, position: 'relative' }}>
    {/* Service Links */}
    <Grid item xs={12} sm={6} md={3}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00aaff', fontWeight: 'bold' }}>
        Services
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
        <li>
          <Link href="#" color="inherit" underline="none" sx={{ transition: 'color 0.3s', '&:hover': { color: '#00aaff', fontWeight: '600' } }}>
            Training
          </Link>
        </li>
        <li>
          <Link href="#" color="inherit" underline="none" sx={{ transition: 'color 0.3s', '&:hover': { color: '#00aaff', fontWeight: '600' } }}>
            Coaching
          </Link>
        </li>
        <li>
          <Link href="#" color="inherit" underline="none" sx={{ transition: 'color 0.3s', '&:hover': { color: '#00aaff', fontWeight: '600' } }}>
            Consulting
          </Link>
        </li>
      </Box>
    </Grid>

    {/* Contact Links */}
    <Grid item xs={12} sm={6} md={3}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00aaff', fontWeight: 'bold' }}>
        Contact
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
        <li>
          <Link href="#" color="inherit" underline="none" sx={{ transition: 'color 0.3s', '&:hover': { color: '#00aaff', fontWeight: '600' } }}>
            Home
          </Link>
        </li>
        <li>
          <Link href="#" color="inherit" underline="none" sx={{ transition: 'color 0.3s', '&:hover': { color: '#00aaff', fontWeight: '600' } }}>
            About
          </Link>
        </li>
        <li>
          <Link href="#" color="inherit" underline="none" sx={{ transition: 'color 0.3s', '&:hover': { color: '#00aaff', fontWeight: '600' } }}>
            Contact
          </Link>
        </li>
      </Box>
    </Grid>

    {/* Contact Info */}
    <Grid item xs={12} sm={6} md={3}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00aaff', fontWeight: 'bold' }}>
        Contact Info
      </Typography>
      <Typography variant="body1">
        Mobile: <Link href="tel:+917897424250" color="inherit" underline="none" sx={{ '&:hover': { color: '#00aaff' } }}>
          +91 78974 24250
        </Link>
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Email: <Link href="mailto:farmeasy@gmail.com" color="inherit" underline="none" sx={{ '&:hover': { color: '#00aaff' } }}>
          farmeasy@gmail.com
        </Link>
      </Typography>
    </Grid>

    {/* Newsletter */}
    <Grid item xs={12} sm={6} md={3}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00aaff', fontWeight: 'bold' }}>
        Newsletter
      </Typography>
      <form>
        <input
          type="email"
          placeholder="Your email"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '20px',
            border: '2px solid #00aaff',
            marginBottom: '12px',
            backgroundColor: '#ffffff',
            color: '#000',
          }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 1,
            backgroundColor: '#00aaff',
            fontWeight: '600',
            color: '#fff',
            borderRadius: '20px',
            '&:hover': { backgroundColor: '#007acc' },
          }}
        >
          Subscribe
        </Button>
      </form>
    </Grid>

    {/* Social Media Icons */}
    <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
      <IconButton href="#" aria-label="WhatsApp" sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
        <WhatsAppIcon sx={{ color: '#25D366' }} />
      </IconButton>
      <IconButton href="#" aria-label="YouTube" sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
        <YouTubeIcon sx={{ color: '#FF0000' }} />
      </IconButton>
      <IconButton href="#" aria-label="Instagram" sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
        <InstagramIcon sx={{ color: '#C13584' }} />
      </IconButton>
      <IconButton href="#" aria-label="Facebook" sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
        <FacebookIcon sx={{ color: '#4267B2' }} />
      </IconButton>
      <IconButton href="#" aria-label="LinkedIn" sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
        <LinkedInIcon sx={{ color: '#0077b5' }} />
      </IconButton>
      <IconButton href="#" aria-label="Twitter" sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
        <TwitterIcon sx={{ color: '#1DA1F2' }} />
      </IconButton>
    </Grid>
  </Grid>

  <hr className="mt-6" style={{ borderColor: '#00aaff', opacity: 0.5 }} />

  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant="body2" sx={{ color: '#ffffff' }}>
      &copy; 2024 farmeasy. All rights reserved.
    </Typography>
  </Box>
</Box>

  )
};

export default Footer;
