import { Backdrop, Dialog, IconButton } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add'; // Import AddIcon
import AddRentalsMultilstep from './AddRentalsMutilstep';
const RentalModel: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="relative">
            {/* Button to open dialog */}
            <div className="fixed bottom-10 right-10  color-txt-blue"> {/* Position the button to bottom-right corner */}
                <IconButton  
                    edge="end"
                    aria-label="add rental" 
                    onClick={handleClickOpen}
                    sx={{
                        backgroundColor: '#000d6b',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#000d4b', // Change the background color on hover
                        },
                        width: 60,
                        height: 60,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                    size="large"
                >
                    <AddIcon  fontSize="large" />
                </IconButton>
            </div>

            {/* Dialog for adding rental */}
            <Dialog open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    sx: { backdropFilter: 'blur(5px)' },
                }}>
                <AddRentalsMultilstep handleClose={handleClose} />
            </Dialog>
        </div>
    );
}
export default RentalModel;
