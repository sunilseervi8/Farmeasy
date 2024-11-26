import React, { useState } from 'react';
import { Dialog, Backdrop } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Use correct import for Grid2
import AddProductForm from '../Crops/AddCrops'; // Import the form component

const CropModal: React.FC = () => {
  const [open, setOpen] = useState(false); // Modal state

  // Open/Close modal handlers
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Button to open the modal */}
      <Grid2>
        <button
          className="bg-custom-blue text-white rounded-xl px-5 py-2 float-right hover:bg-hover-blue transition duration-300"
          onClick={handleClickOpen}
        >
          Add Crop
        </button>
      </Grid2>

      {/* Modal with backdrop blur */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backdropFilter: 'blur(5px)' }, // Apply blur effect
        }}
      >
        {/* Pass handleClose to AddProductForm to close the modal after form submission */}
        <AddProductForm handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default CropModal;
